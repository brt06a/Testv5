import { motion } from 'framer-motion';
import { Rocket, Zap, Users, MessageSquare, Clock, Target, Mail, Instagram, Youtube } from 'lucide-react';
import { SiTelegram } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ThreeBackground } from '@/components/ThreeBackground';
import { AutoTyping } from '@/components/AutoTyping';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const features = [
  {
    icon: Zap,
    title: 'Instant Channel Promotions',
    description: 'Promote your channel across multiple Telegram communities instantly with smart targeting.',
  },
  {
    icon: Clock,
    title: 'Auto Message Scheduler',
    description: 'Schedule and automate your messages to reach your audience at the perfect time.',
  },
  {
    icon: Target,
    title: 'Smart Audience Tools',
    description: 'Advanced analytics and targeting tools to grow your Telegram presence effectively.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Launch our Telegram bot and connect your account',
  },
  {
    number: '02',
    title: 'Configure',
    description: 'Set up your promotion strategy and target audience',
  },
  {
    number: '03',
    title: 'Automate',
    description: 'Let PromotionX handle the rest while you grow',
  },
  {
    number: '04',
    title: 'Grow',
    description: 'Watch your reach and engagement skyrocket',
  },
];

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Community Manager',
    content: 'PromotionX helped us grow from 500 to 50,000 members in just 3 months. The automation is incredible!',
    initial: 'AC',
  },
  {
    name: 'Sarah Williams',
    role: 'Digital Marketer',
    content: 'Best investment for our Telegram marketing. Smart scheduling and instant promotions are game-changers.',
    initial: 'SW',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Channel Owner',
    content: 'The analytics and targeting tools are extremely powerful. We reached our growth goals 2x faster.',
    initial: 'MR',
  },
];

const faqs = [
  {
    question: 'How does PromotionX work?',
    answer: 'PromotionX is a Telegram bot that automates your promotion and engagement activities. Simply connect through our bot, set your preferences, and let our smart algorithms handle the rest.',
  },
  {
    question: 'Is it safe to use?',
    answer: 'Absolutely! We follow Telegram\'s API guidelines strictly and use secure authentication. Your account safety is our top priority.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods through Cashfree including cards, UPI, net banking, and digital wallets.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime. There are no long-term commitments, and you only pay for the duration you use.',
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Most users see increased engagement within 24-48 hours. Significant growth typically occurs within the first week of consistent use.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ThreeBackground />

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text" data-testid="text-hero-heading">
              Grow Faster on Telegram
              <br />
              <span className="text-gradient">With PromotionX</span> <Rocket className="inline-block h-12 w-12 md:h-16 md:w-16 text-primary animate-float" />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4"
            data-testid="text-hero-subheading"
          >
            Smart automation, real reach, and seamless upgrades.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl mb-12 h-12"
          >
            <AutoTyping phrases={['Promote.', 'Grow.', 'Automate.']} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary text-lg px-8 py-6 glow-border"
              data-testid="button-launch-bot"
            >
              <a href="https://t.me/Alright_dear_bot" target="_blank" rel="noopener noreferrer">
                <SiTelegram className="mr-2 h-5 w-5" />
                Launch Telegram Bot
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              data-testid="button-join-community"
            >
              <a href="https://t.me/Alright_dear_bot" target="_blank" rel="noopener noreferrer">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 px-4 bg-card/50" id="features">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-features-heading">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to dominate Telegram
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-8">
                    <div className="mb-6 inline-block p-4 rounded-lg gradient-primary">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3" data-testid={`text-feature-title-${index}`}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-how-it-works-heading">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes, not hours
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
                data-testid={`step-${index}`}
              >
                <div className="relative mb-6">
                  <div className="text-7xl font-bold text-gradient opacity-20">
                    {step.number}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold glow-border">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3" data-testid={`text-step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-step-description-${index}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-card/50" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-testimonials-heading">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied Telegram power users
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate active-elevate-2" data-testid={`card-testimonial-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarFallback className="gradient-primary text-primary-foreground">
                          {testimonial.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold" data-testid={`text-testimonial-name-${index}`}>
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${index}`}>
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic" data-testid={`text-testimonial-content-${index}`}>
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-faq-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Got questions? We've got answers
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger className="text-left hover:no-underline" data-testid={`button-faq-${index}`}>
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-4 bg-card/50" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-heading">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions or need help? We're here for you
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button asChild size="lg" variant="outline" data-testid="button-contact-email">
                <a href="mailto:support@promotionx.com">
                  <Mail className="mr-2 h-5 w-5" />
                  support@promotionx.com
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="button-contact-telegram">
                <a href="https://t.me/Alright_dear_bot" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Message on Telegram
                </a>
              </Button>
            </div>

            <div className="flex gap-6 justify-center">
              <a
                href="https://t.me/Alright_dear_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-telegram"
              >
                <SiTelegram className="h-8 w-8" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-instagram"
              >
                <Instagram className="h-8 w-8" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-youtube"
              >
                <Youtube className="h-8 w-8" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p data-testid="text-footer-copyright">
            © 2025 PromotionX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
