import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Mail,
  Shield,
  AlertCircle,
  Building2,
  PieChart,
  ArrowRight,
  Heart,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// Section wrapper for consistent spacing
const Section = ({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-12 md:py-16 lg:py-20 ${className}`}>
    {children}
  </section>
);

const emergencyContacts = [
  {
    icon: Phone,
    label: 'Crisis Hotline',
    value: '1-800-273-8255',
    href: 'tel:1-800-273-8255',
    buttonText: 'Call Now',
    bgColor: 'bg-red-500',
    hoverColor: 'text-red-500',
  },
  {
    icon: MessageCircle,
    label: 'Crisis Text Line',
    value: 'Text HOME to 741741',
    href: 'sms:741741',
    buttonText: 'Text',
    bgColor: 'bg-[var(--color-primary)]',
    hoverColor: 'text-[var(--color-primary)]',
  },
  {
    icon: Mail,
    label: 'Email Support',
    value: 'crisis@safehaven.org',
    href: 'mailto:crisis@safehaven.org',
    buttonText: 'Email',
    bgColor: 'bg-[var(--color-secondary)]',
    hoverColor: 'text-[var(--color-secondary)]',
  },
];

export function SupportServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 py-20">
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-2">
              <Shield className="h-4 w-4 text-[var(--color-primary)]" />
              <span className="text-sm font-semibold tracking-wider text-[var(--color-primary)] uppercase">
                Support & Resources
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-[var(--color-foreground)] md:text-6xl">
              You Are{' '}
              <span className="text-[var(--color-primary)]">Not Alone</span>.
              <br />
              Help is Available.
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-[var(--color-foreground)]/80">
              Access immediate crisis intervention, trauma-informed support, and
              professional resources designed to help you navigate your journey
              to safety and healing.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#hotlines">
                <Button
                  size="lg"
                  className="min-w-[200px] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90"
                >
                  Crisis Hotlines
                </Button>
              </a>
              <Link to="/public-support-directory">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] border-[var(--color-primary)] text-[var(--color-primary)]"
                >
                  Browse Directory
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -z-0 h-full w-1/3 bg-gradient-to-l from-[var(--color-primary)]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 -z-0 h-1/2 w-1/4 bg-gradient-to-tr from-[var(--color-secondary)]/5 to-transparent" />
      </section>

      {/* Immediate Assistance / Hotlines */}
      <Section id="hotlines" className="bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-500">
                <AlertCircle className="h-3 w-3" />
                IMMEDIATE ASSISTANCE
              </div>
              <h2 className="mb-6 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
                Crisis Hotlines
              </h2>
              <div className="mx-auto max-w-2xl rounded-xl border border-red-500/20 bg-red-500/5 p-4 backdrop-blur-sm">
                <p className="text-sm leading-relaxed font-medium text-red-600/90">
                  <strong>Note:</strong> SafeHaven is an anonymous reporting
                  platform and is not a real-time emergency dispatch system. For
                  life-threatening emergencies requiring immediate intervention,
                  please contact the services below.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {emergencyContacts.map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden border border-[var(--color-primary)]/10 bg-[var(--color-background)]/50 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <CardContent className="relative z-10 flex h-full flex-col p-8">
                      <div className="mb-6 flex items-center gap-4">
                        <div
                          className={`h-14 w-14 ${contact.bgColor} flex items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110`}
                        >
                          <contact.icon className="h-7 w-7 text-white" />
                        </div>
                        <span className="font-[Inter] text-sm font-bold tracking-widest text-[var(--color-foreground)]/60 uppercase">
                          {contact.label}
                        </span>
                      </div>
                      <div className="mb-8 text-2xl font-bold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-primary)]">
                        {contact.value}
                      </div>
                      <div className="mt-auto">
                        <a href={contact.href}>
                          <Button
                            className={`h-12 w-full ${contact.bgColor} font-bold text-white hover:opacity-90`}
                          >
                            {contact.buttonText}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Stakeholder Resources */}
      <Section className="border-y border-[var(--color-primary)]/10 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold text-[var(--color-primary)]">
                    <Building2 className="h-3 w-3" />
                    PARTNERSHIPS
                  </div>
                  <h2 className="mb-6 font-[Inter] text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
                    Institutional & Stakeholder Resources
                  </h2>
                  <p className="mb-8 text-lg leading-relaxed text-[var(--color-foreground)]/80">
                    We collaborate with government agencies, NGOs, and
                    healthcare providers to create a comprehensive safety net.
                    We provide critical, anonymized data insights to better
                    understand community safety trends.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: 'NGOs',
                      desc: 'Collaborate on victim support and community programs.',
                    },
                    {
                      title: 'Legal Aid',
                      desc: 'Connect with survivors needing legal representation.',
                    },
                    {
                      title: 'Government',
                      desc: 'Access anonymized data for policy and resource allocation.',
                    },
                    {
                      title: 'Health Centers',
                      desc: 'Integrated referral systems for medical assistance.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <div>
                        <h4 className="text-sm font-bold text-[var(--color-foreground)]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-[var(--color-foreground)]/60">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group overflow-hidden border border-[var(--color-primary)]/20 bg-[var(--color-card)] shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-hover)] px-8 py-4">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--color-foreground)]/40 uppercase">
                        Partner Portal Preview
                      </span>
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-400" />
                        <div className="h-2 w-2 rounded-full bg-amber-400" />
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10">
                          <PieChart className="h-8 w-8 text-[var(--color-primary)]" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-[var(--color-foreground)]">
                          Anonymized Analytics
                        </h3>
                        <p className="text-sm text-[var(--color-foreground)]/60">
                          Secure dashboards for data-driven insights.
                        </p>
                      </div>

                      <Button className="h-12 w-full gap-2 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90">
                        Become a Partner <ArrowRight className="h-4 w-4" />
                      </Button>

                      <div className="mt-8 space-y-4">
                        <a
                          href="#"
                          className="group/link flex items-center justify-between text-sm font-semibold text-[var(--color-primary)] hover:underline"
                        >
                          NGO Partnership Guide{' '}
                          <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                        </a>
                        <div className="h-px bg-[var(--color-border)]" />
                        <a
                          href="#"
                          className="group/link flex items-center justify-between text-sm font-semibold text-[var(--color-primary)] hover:underline"
                        >
                          Government Compliance{' '}
                          <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust and Safety Section */}
      <Section>
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-6 font-[Inter] text-3xl font-bold">
              Why Trust Our Services?
            </h2>
            <p className="text-lg text-[var(--color-foreground)]/70">
              Your safety and privacy are baked into every connection we
              facilitate.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                icon: Lock,
                title: 'Confidentiality',
                desc: 'We never share your personal information with partners without your explicit consent.',
              },
              {
                icon: CheckCircle2,
                title: 'Vetted Partners',
                desc: 'Every organization in our directory undergoes a rigorous verification process.',
              },
              {
                icon: Heart,
                title: 'Trauma-Informed',
                desc: 'All support services prioritize your emotional well-being and recovery.',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                  <feature.icon className="h-8 w-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="leading-relaxed text-[var(--color-foreground)]/60">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] py-20 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">
            Ready to take the next step?
          </h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/public-support-directory">
              <Button
                size="lg"
                className="h-14 min-w-[220px] bg-[var(--color-card)] text-lg text-[var(--color-primary)] hover:bg-[var(--color-hover)]"
              >
                View Full Directory
              </Button>
            </Link>
            <Link to="/report">
              <Button
                variant="outline"
                size="lg"
                className="h-14 min-w-[220px] border-2 border-[var(--color-card-foreground)] text-lg font-bold text-[var(--color-card-foreground)] hover:bg-[var(--color-card)]/10"
              >
                Submit A Report
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
