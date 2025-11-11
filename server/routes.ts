import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  loginSchema,
  createPaymentOrderSchema,
  insertPlanSchema,
} from "@shared/schema";
import { z } from "zod";
import crypto from "crypto";

// Cashfree configuration
const CASHFREE_ENV = process.env.CASHFREE_ENV || "sandbox";
const CASHFREE_BASE_URL =
  CASHFREE_ENV === "prod"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

interface CashfreeOrderResponse {
  cf_order_id: string;
  order_id: string;
  payment_session_id: string;
  order_status: string;
}

// Simple session storage for admin auth (in-memory for MVP)
const adminSessions = new Map<string, { adminId: string; expiresAt: Date }>();

function generateSessionId(): string {
  return crypto.randomBytes(32).toString("hex");
}

function isAuthenticated(sessionId: string | undefined): boolean {
  if (!sessionId) return false;
  const session = adminSessions.get(sessionId);
  if (!session) return false;
  if (session.expiresAt < new Date()) {
    adminSessions.delete(sessionId);
    return false;
  }
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to parse JSON
  app.use(express.json());

  // Get all plans
  app.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getAllPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({ message: "Failed to fetch plans" });
    }
  });

  // Create payment order with Cashfree
  app.post("/api/payments/create", async (req, res) => {
    try {
      const validatedData = createPaymentOrderSchema.parse(req.body);
      const plan = await storage.getPlan(validatedData.planId);

      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }

      // Generate unique order ID
      const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

      // Create payment record in database
      const payment = await storage.createPayment({
        orderId,
        amount: plan.price,
        currency: "INR",
        status: "PENDING",
        planId: plan.id,
        planName: plan.name,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        paymentMethod: null,
        utr: null,
        transactionId: null,
        completedAt: null,
      });

      // Create Cashfree order
      const cashfreeOrder = {
        order_id: orderId,
        order_amount: parseFloat(plan.price),
        order_currency: "INR",
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_name: validatedData.customerName || "Customer",
          customer_email: validatedData.customerEmail || "customer@example.com",
          customer_phone: validatedData.customerPhone || "9999999999",
        },
        order_meta: {
          return_url: `${process.env.PUBLIC_BASE || "http://localhost:5000"}/payment-status?order_id=${orderId}`,
          notify_url: `${process.env.PUBLIC_BASE || "http://localhost:5000"}/api/payment/webhook`,
        },
      };

      const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_CLIENT_ID!,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET!,
          "x-api-version": "2023-08-01",
        },
        body: JSON.stringify(cashfreeOrder),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cashfree API error:", errorText);
        throw new Error(`Cashfree API error: ${response.status}`);
      }

      const cashfreeData: CashfreeOrderResponse = await response.json();

      // Generate payment URL
      const paymentUrl = `${CASHFREE_BASE_URL}/orders/${cashfreeData.payment_session_id}/payments`;

      res.json({ paymentUrl, orderId });
    } catch (error) {
      console.error("Error creating payment:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create payment" });
    }
  });

  // Cashfree webhook endpoint
  app.post("/api/payment/webhook", async (req, res) => {
    try {
      console.log("Webhook received:", req.body);

      const { order_id, order_status, payment } = req.body;

      if (!order_id) {
        return res.status(400).json({ message: "Missing order_id" });
      }

      // Find payment record
      const paymentRecord = await storage.getPaymentByOrderId(order_id);

      if (!paymentRecord) {
        console.error("Payment record not found for order:", order_id);
        return res.status(404).json({ message: "Payment not found" });
      }

      // Update payment status
      const updates: any = {
        status: order_status === "PAID" ? "SUCCESS" : order_status,
      };

      if (payment) {
        updates.paymentMethod = payment.payment_method || null;
        updates.utr = payment.utr || null;
        updates.transactionId = payment.cf_payment_id || null;
      }

      if (order_status === "PAID") {
        updates.completedAt = new Date();
      }

      await storage.updatePayment(paymentRecord.id, updates);

      res.json({ success: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  // Verify payment status
  app.get("/api/payments/verify/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      const payment = await storage.getPaymentByOrderId(orderId);

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.json(payment);
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Failed to verify payment" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const admin = await storage.getAdminByUsername(validatedData.username);

      if (!admin || admin.password !== validatedData.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create session
      const sessionId = generateSessionId();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      adminSessions.set(sessionId, { adminId: admin.id, expiresAt });

      res.json({ success: true, sessionId });
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data" });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin logout
  app.post("/api/admin/logout", async (req, res) => {
    try {
      const sessionId = req.headers.authorization?.replace("Bearer ", "");
      if (sessionId) {
        adminSessions.delete(sessionId);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Get all payments (admin only)
  app.get("/api/admin/payments", async (req, res) => {
    try {
      const sessionId = req.headers.authorization?.replace("Bearer ", "");

      if (!isAuthenticated(sessionId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Seed initial data
  app.post("/api/seed", async (req, res) => {
    try {
      // Check if plans already exist
      const existingPlans = await storage.getAllPlans();
      if (existingPlans.length > 0) {
        return res.json({ message: "Data already seeded" });
      }

      // Create default admin
      await storage.createAdmin({
        username: "admin",
        password: "admin123",
        email: "admin@promotionx.com",
      });

      // Create plans
      await storage.createPlan({
        name: "1 Day Pass",
        duration: "24 hours",
        price: "99",
        features: [
          "Instant channel promotions",
          "Basic analytics",
          "Email support",
          "Up to 5 campaigns",
        ],
        popular: 0,
      });

      await storage.createPlan({
        name: "1 Week Pro",
        duration: "7 days",
        price: "499",
        features: [
          "Everything in 1 Day",
          "Auto message scheduler",
          "Advanced analytics",
          "Priority support",
          "Up to 25 campaigns",
          "Smart targeting",
        ],
        popular: 1,
      });

      await storage.createPlan({
        name: "1 Month Premium",
        duration: "30 days",
        price: "1499",
        features: [
          "Everything in 1 Week",
          "Unlimited campaigns",
          "AI-powered insights",
          "24/7 premium support",
          "Custom automation",
          "Dedicated account manager",
        ],
        popular: 0,
      });

      res.json({ message: "Data seeded successfully" });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ message: "Failed to seed data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
