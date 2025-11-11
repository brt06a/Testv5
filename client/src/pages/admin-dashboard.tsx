import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
  LogOut,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Loader2,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Payment } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: payments, isLoading } = useQuery<Payment[]>({
    queryKey: ['/api/admin/payments'],
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/admin/logout', {});
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation('/admin/login');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleExportCSV = () => {
    if (!payments || payments.length === 0) {
      toast({
        title: 'No Data',
        description: 'No payment data available to export',
        variant: 'destructive',
      });
      return;
    }

    const headers = ['Date', 'Order ID', 'Plan', 'Amount', 'Status', 'Customer Email', 'UTR'];
    const rows = payments.map(p => [
      format(new Date(p.createdAt), 'yyyy-MM-dd HH:mm'),
      p.orderId,
      p.planName,
      `₹${p.amount}`,
      p.status,
      p.customerEmail || 'N/A',
      p.utr || 'N/A',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Export Successful',
      description: 'Payment data has been exported to CSV',
    });
  };

  const stats = payments ? {
    totalRevenue: payments
      .filter(p => p.status === 'SUCCESS')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    totalTransactions: payments.length,
    successfulPayments: payments.filter(p => p.status === 'SUCCESS').length,
    todayRevenue: payments
      .filter(p => {
        const today = new Date().toDateString();
        const paymentDate = new Date(p.createdAt).toDateString();
        return paymentDate === today && p.status === 'SUCCESS';
      })
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
  } : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient" data-testid="text-dashboard-title">
            PromotionX Admin
          </h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            data-testid="button-logout"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover-elevate" data-testid="card-total-revenue">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient" data-testid="text-total-revenue">
                  ₹{stats?.totalRevenue.toFixed(2) || '0.00'}
                </div>
                <p className="text-xs text-muted-foreground">All time earnings</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover-elevate" data-testid="card-today-revenue">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient" data-testid="text-today-revenue">
                  ₹{stats?.todayRevenue.toFixed(2) || '0.00'}
                </div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover-elevate" data-testid="card-total-transactions">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient" data-testid="text-total-transactions">
                  {stats?.totalTransactions || 0}
                </div>
                <p className="text-xs text-muted-foreground">All payment attempts</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover-elevate" data-testid="card-successful-payments">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Payments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gradient" data-testid="text-successful-payments">
                  {stats?.successfulPayments || 0}
                </div>
                <p className="text-xs text-muted-foreground">Completed purchases</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle data-testid="text-payments-table-title">Payment History</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              data-testid="button-export-csv"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>UTR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments && payments.length > 0 ? (
                    payments.map((payment, index) => (
                      <TableRow key={payment.id} data-testid={`row-payment-${index}`}>
                        <TableCell data-testid={`text-payment-date-${index}`}>
                          {format(new Date(payment.createdAt), 'MMM dd, yyyy HH:mm')}
                        </TableCell>
                        <TableCell className="font-mono text-sm" data-testid={`text-payment-order-${index}`}>
                          {payment.orderId}
                        </TableCell>
                        <TableCell data-testid={`text-payment-plan-${index}`}>
                          {payment.planName}
                        </TableCell>
                        <TableCell className="font-semibold" data-testid={`text-payment-amount-${index}`}>
                          ₹{payment.amount}
                        </TableCell>
                        <TableCell data-testid={`badge-payment-status-${index}`}>
                          <Badge
                            variant={payment.status === 'SUCCESS' ? 'default' : 'destructive'}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell data-testid={`text-payment-customer-${index}`}>
                          {payment.customerEmail || 'N/A'}
                        </TableCell>
                        <TableCell className="font-mono text-sm" data-testid={`text-payment-utr-${index}`}>
                          {payment.utr || 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No payments yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
