import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { ThreeBackground } from '@/components/ThreeBackground';

export default function PaymentStatus() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get('order_id');
  const status = searchParams.get('status');

  const { data: payment, isLoading } = useQuery({
    queryKey: ['/api/payments/verify', orderId],
    enabled: !!orderId,
  });

  useEffect(() => {
    if (!orderId) {
      setTimeout(() => setLocation('/pricing'), 3000);
    }
  }, [orderId, setLocation]);

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ThreeBackground />
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No order information found. Redirecting...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ThreeBackground />
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Verifying payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSuccess = payment?.status === 'SUCCESS' || status === 'success';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <ThreeBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full relative z-10"
      >
        <Card className={isSuccess ? 'glow-border' : ''}>
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="mx-auto mb-6"
            >
              {isSuccess ? (
                <CheckCircle className="h-24 w-24 text-green-500" data-testid="icon-success" />
              ) : (
                <XCircle className="h-24 w-24 text-destructive" data-testid="icon-failure" />
              )}
            </motion.div>

            <h1 className="text-4xl font-bold mb-2" data-testid="text-status-heading">
              {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-status-message">
              {isSuccess
                ? 'Your premium plan has been activated'
                : 'There was an issue processing your payment'}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {payment && (
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono font-semibold" data-testid="text-order-id">
                    {payment.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span className="font-semibold" data-testid="text-plan-name">
                    {payment.planName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold text-lg" data-testid="text-amount">
                    ₹{payment.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`font-semibold ${
                      isSuccess ? 'text-green-500' : 'text-destructive'
                    }`}
                    data-testid="text-status"
                  >
                    {payment.status}
                  </span>
                </div>
                {payment.utr && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">UTR:</span>
                    <span className="font-mono text-sm" data-testid="text-utr">
                      {payment.utr}
                    </span>
                  </div>
                )}
                {payment.transactionId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono text-sm" data-testid="text-transaction-id">
                      {payment.transactionId}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                asChild
                className="flex-1 gradient-primary"
                size="lg"
                data-testid="button-go-to-telegram"
              >
                <a href="https://t.me/Alright_dear_bot" target="_blank" rel="noopener noreferrer">
                  Go to Telegram Bot
                </a>
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={() => setLocation('/')}
                data-testid="button-back-home"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
