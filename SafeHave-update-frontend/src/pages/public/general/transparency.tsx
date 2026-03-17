import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  ShieldAlert,
  CheckCircle2,
  Globe,
  Database,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function TransparencyPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Zero-Knowledge Encryption',
      description:
        'We use E2EE for all reports. Even our database administrators cannot read the contents of your confidential submissions.',
    },
    {
      icon: EyeOff,
      title: 'Automatic Metadata Stripping',
      description:
        'All uploaded images and documents have EXIF and GPS data automatically removed before being stored on our secure servers.',
    },
    {
      icon: Database,
      title: 'IP Masking',
      description:
        'We do not log user IP addresses. Your geographic location is never recorded during the reporting process.',
    },
  ];

  const auditLogs = [
    {
      date: 'Jan 2025',
      type: 'Security Audit',
      result: 'Passed',
      auditor: 'independent Third Party',
    },
    {
      date: 'Dec 2024',
      type: 'Privacy Impact Assessment',
      result: 'Completed',
      auditor: 'Legal Oversight Commitee',
    },
    {
      date: 'Oct 2024',
      type: 'System Integrity Check',
      result: 'Verified',
      auditor: 'Global Safety Alliance',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-secondary)] pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,transparent_40%)] opacity-10"></div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/5 px-4 py-2 text-sm font-bold text-[var(--color-primary)]"
            >
              <ShieldCheck className="h-4 w-4" />
              TRUST & INTEGRITY
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-5xl leading-tight font-black text-white md:text-7xl"
            >
              Transparency <br />
              Report <span className="text-[var(--color-primary)]">2025</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-xl leading-relaxed text-white/70"
            >
              At SafeHaven, transparency isn't just a policy ,it's our
              foundation. Discover how we protect your data, handle requests,
              and maintain the highest standards of anonymity.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-[var(--color-border)] py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                label: 'Reports Protected',
                value: '14,200+',
                icon: ShieldAlert,
              },
              { label: 'Data Requests Denied', value: '100%', icon: Lock },
              { label: 'Security Uptime', value: '99.99%', icon: Globe },
              { label: 'Verified Partners', value: '850+', icon: CheckCircle2 },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-sm"
              >
                <stat.icon className="mb-4 h-8 w-8 text-[var(--color-primary)]" />
                <p className="mb-1 text-4xl font-black text-[var(--color-foreground)]">
                  {stat.value}
                </p>
                <p className="text-sm font-bold tracking-widest text-[var(--color-muted-foreground)] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="bg-[var(--color-hover)] py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-[var(--color-foreground)]">
              Our Security Architecture
            </h2>
            <p className="mx-auto max-w-2xl text-[var(--color-muted-foreground)]">
              How we lead the industry in private reporting and community
              safety.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {securityFeatures.map((feature, i) => (
              <div
                key={i}
                className="group rounded-[40px] border border-[var(--color-border)] bg-[var(--color-card)] p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 transition-transform group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="mb-4 text-2xl font-black">{feature.title}</h3>
                <p className="leading-relaxed text-[var(--color-muted-foreground)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit History */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] bg-[var(--color-secondary)] p-12">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <FileText className="h-64 w-64 text-white" />
            </div>
            <div className="relative z-10">
              <h2 className="mb-12 text-3xl font-black text-white">
                System Audit History
              </h2>
              <div className="space-y-4">
                {auditLogs.map((log, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/5 p-6 backdrop-blur-sm md:flex-row"
                  >
                    <div className="mb-4 flex items-center gap-6 md:mb-0">
                      <span className="text-lg font-black text-[var(--color-primary)]">
                        {log.date}
                      </span>
                      <div>
                        <p className="font-bold text-white">{log.type}</p>
                        <p className="text-sm text-white/40">{log.auditor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-6 py-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-bold tracking-widest uppercase">
                        {log.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="mb-6 text-sm font-bold tracking-widest text-white/50 uppercase">
                  Request full report (Approved Organizations Only)
                </p>
                <Link to="/contact">
                  <button className="rounded-2xl bg-[var(--color-card)] px-10 py-4 font-black text-[var(--color-secondary)] transition-all hover:bg-[var(--color-hover)]">
                    Contact Oversight Committee
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-hover)] py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="mb-6 text-3xl font-black">
            Have more questions about your privacy?
          </h2>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 font-black text-[var(--color-primary)] transition-all hover:gap-4"
          >
            See our Detailed FAQ <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
