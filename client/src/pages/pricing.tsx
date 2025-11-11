import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Plan } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { ThreeBackground } from '@/components/ThreeBackground';

export default function Pricing() {
  const { toast } = useToast();
  const { data: plans, isLoading } = useQuery<Plan[]>({
    queryKey: ['/api/plans'],
  });

  const createPaymentMutation = useMutation({
    mutationFn: async (planId: string) => {
      const response = await apiRequest('POST', '/api/payments/create', { planId });
      return response;
    },
    onSuccess: (data: { paymentUrl: string }) => {
      window.location.href = data.paymentUrl;
    },
    onError: (error: Error) => {
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to create payment. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handlePayNow = (planId: string) => {
    createPaymentMutation.mutate(planId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ThreeBackground />
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <ThreeBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text" data-testid="text-pricing-heading">
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="text-pricing-subheading">
            Start growing your Telegram presence today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans?.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={plan.popular === 1 ? 'md:scale-110 md:z-10' : ''}
            >
              <Card
                className={`h-full hover-elevate active-elevate-2 transition-all duration-300 ${
                  plan.popular === 1 ? 'glow-border' : ''
                }`}
                data-testid={`card-plan-${index}`}
              >
                <CardHeader className="text-center pb-8">
                  {plan.popular === 1 && (
                    <Badge className="w-fit mx-auto mb-4 gradient-primary" data-testid="badge-popular">
                      Most Popular
                    </Badge>
                  )}
                  <h3 className="text-2xl font-bold mb-2" data-testid={`text-plan-name-${index}`}>
                    {plan.name}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-4" data-testid={`text-plan-duration-${index}`}>
                    {plan.duration}
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-gradient" data-testid={`text-plan-price-${index}`}>
                      ₹{plan.price}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pb-8">
                  <ul className="space-y-3">
                    {plan.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3" data-testid={`text-plan-feature-${index}-${i}`}>
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular === 1 ? 'gradient-primary glow-border' : ''
                    }`}
                    size="lg"
                    onClick={() => handlePayNow(plan.id)}
                    disabled={createPaymentMutation.isPending}
                    data-testid={`button-pay-${index}`}
                  >
                    {createPaymentMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-muted-foreground"
        >
          <p data-testid="text-pricing-footer">
            All plans include 24/7 support and instant activation
          </p>
        </motion.div>
      </div>
    </div>
  );
}
