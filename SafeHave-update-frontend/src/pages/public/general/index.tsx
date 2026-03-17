import {
  Shield,
  Users,
  Heart,
  Target,
  Eye,
  Lock,
  Globe2,
  Star,
  Award,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // ← THIS IS THE CORRECT PATH

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-2">
              <Shield className="h-4 w-4 text-[var(--color-primary)]" />
              <span className="text-sm font-semibold tracking-wider text-[var(--color-primary)] uppercase">
                About Safe Ethiopia
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold text-[var(--color-foreground)] md:text-6xl">
              Building a{' '}
              <span className="text-[var(--color-primary)]">
                Safer Ethiopia
              </span>
              <br />
              Together
            </h1>

            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[var(--color-foreground)]/80">
              We are a trauma-informed platform dedicated to creating safe
              spaces for reporting, healing, and community support across
              Ethiopia. Our mission is to empower every Ethiopian with the tools
              and resources needed to break the cycle of violence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl border-2 border-[var(--color-primary)]/20 bg-[var(--color-background)] p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                  <Target className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                  Our Mission
                </h2>
              </div>
              <p className="mb-6 leading-relaxed text-[var(--color-foreground)]/80">
                To provide a secure, confidential, and culturally-sensitive
                platform that empowers Ethiopians to report violence, access
                support services, and build resilient communities free from
                abuse and discrimination.
              </p>
              <div className="space-y-3">
                {[
                  'Create safe reporting channels for all Ethiopians',
                  'Provide immediate access to trauma-informed support',
                  'Build community networks for lasting protection',
                  'Advocate for systemic change through data-driven insights',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-[var(--color-primary)]" />
                    <span className="text-[var(--color-foreground)]/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border-2 border-[var(--color-secondary)]/20 bg-[var(--color-background)] p-8 shadow-lg">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10">
                  <Eye className="h-6 w-6 text-[var(--color-secondary)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                  Our Vision
                </h2>
              </div>
              <p className="mb-6 leading-relaxed text-[var(--color-foreground)]/80">
                We envision an Ethiopia where every person feels safe, heard,
                and supported where communities are empowered to prevent
                violence and create environments where all citizens can thrive
                with dignity and respect.
              </p>
              <div className="space-y-3">
                {[
                  'An Ethiopia free from violence and abuse',
                  'Communities that protect and support each other',
                  'Systems that respond with compassion and efficiency',
                  'A culture of safety and mutual respect',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Star className="h-5 w-5 flex-shrink-0 text-[var(--color-secondary)]" />
                    <span className="text-[var(--color-foreground)]/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gradient-to-br from-[var(--color-hover)] to-[var(--color-background)] py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
              Our Core Values
            </h2>
            <p className="text-lg text-[var(--color-foreground)]/80">
              These principles guide every decision we make and every feature we
              build
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: 'Safety First',
                description:
                  'Every feature is designed with user safety and emotional well-being as the top priority',
                color: 'var(--color-primary)',
              },
              {
                icon: Lock,
                title: 'Absolute Confidentiality',
                description:
                  'Military-grade encryption ensures complete privacy and anonymity for all users',
                color: 'var(--color-primary)',
              },
              {
                icon: Heart,
                title: 'Trauma-Informed',
                description:
                  'Our approach is built on understanding and responding to the needs of trauma survivors',
                color: 'var(--color-accent)',
              },
              {
                icon: Users,
                title: 'Community-Led',
                description:
                  'Solutions are co-designed with Ethiopian communities to ensure cultural relevance',
                color: 'var(--color-secondary)',
              },
              {
                icon: Globe2,
                title: 'Cultural Sensitivity',
                description:
                  'We honor and incorporate Ethiopian traditions, languages, and social structures',
                color: 'var(--color-accent)',
              },
              {
                icon: Award,
                title: 'Excellence in Service',
                description:
                  'Committed to providing the highest quality support and resources to every user',
                color: 'var(--color-secondary)',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-lg"
              >
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${value.color}15`,
                  }}
                >
                  <value.icon
                    className="h-7 w-7"
                    style={{ color: value.color }}
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-foreground)]">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-[var(--color-foreground)]/80">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
                Our Story
              </h2>
              <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"></div>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border-2 border-[var(--color-primary)]/20 bg-[var(--color-background)] p-8">
                <h3 className="mb-4 text-2xl font-bold text-[var(--color-foreground)]">
                  How We Began
                </h3>
                <p className="mb-4 leading-relaxed text-[var(--color-foreground)]/80">
                  Safe Ethiopia was born from a simple but powerful realization:
                  too many Ethiopians were suffering in silence without access
                  to safe reporting channels or trauma-informed support.
                </p>
                <p className="leading-relaxed text-[var(--color-foreground)]/80">
                  Founded in 2025 by a team of Ethiopian psychologists, tech
                  experts, and social workers, we set out to create a platform
                  that would bridge the gap between those needing help and the
                  resources available to support them.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-2xl border-2 border-[var(--color-secondary)]/20 bg-[var(--color-background)] p-6">
                  <h4 className="mb-3 text-xl font-bold text-[var(--color-foreground)]">
                    The Problem
                  </h4>
                  <p className="leading-relaxed text-[var(--color-foreground)]/80">
                    Many barriers prevent Ethiopians from seeking help: fear of
                    stigma, lack of confidentiality, cultural taboos, and
                    limited access to trusted support systems.
                  </p>
                </div>

                <div className="rounded-2xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-background)] p-6">
                  <h4 className="mb-3 text-xl font-bold text-[var(--color-foreground)]">
                    Our Solution
                  </h4>
                  <p className="leading-relaxed text-[var(--color-foreground)]/80">
                    A comprehensive platform that combines secure technology
                    with deep cultural understanding, creating safe pathways to
                    support and healing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="mb-16 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
              Our Impact in Numbers
            </h2>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  number: '10,847',
                  label: 'Reports Processed',
                  icon: Shield,
                },
                {
                  number: '250K+',
                  label: 'Lives Impacted',
                  icon: Users,
                },
                {
                  number: '98%',
                  label: 'Success Rate',
                  icon: Award,
                },
                {
                  number: '24/7',
                  label: 'Support Available',
                  icon: Clock,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-background)] p-6"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
                    <stat.icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </div>
                  <div className="mb-2 text-2xl font-bold text-[var(--color-foreground)] md:text-3xl">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[var(--color-foreground)]/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--color-foreground)] md:text-4xl">
              Our Team
            </h2>
            <p className="text-lg text-[var(--color-foreground)]/80">
              A diverse team of professionals united by a common mission
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                role: 'Mental Health Professionals',
                description:
                  'Licensed psychologists and counselors providing trauma-informed support',
                count: '15+',
              },
              {
                role: 'Technology Experts',
                description:
                  'Ethiopian developers ensuring secure and accessible platform design',
                count: '12+',
              },
              {
                role: 'Community Advocates',
                description:
                  'Local leaders bridging cultural understanding and community trust',
                count: '25+',
              },
              {
                role: 'Legal Advisors',
                description:
                  'Experts in Ethiopian law ensuring proper protocols and user rights',
                count: '8+',
              },
              {
                role: 'Medical Professionals',
                description:
                  'Doctors and nurses providing health guidance and referrals',
                count: '10+',
              },
              {
                role: 'Research Team',
                description:
                  'Data analysts and researchers measuring impact and improving services',
                count: '6+',
              },
            ].map((team, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-background)] p-6 transition-all duration-300 hover:border-[var(--color-primary)]/40"
              >
                <div className="mb-2 text-2xl font-bold text-[var(--color-primary)]">
                  {team.count}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[var(--color-foreground)]">
                  {team.role}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-foreground)]/80">
                  {team.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Join Us in Building a Safer Ethiopia
            </h2>
            <p className="mb-8 text-xl leading-relaxed opacity-90">
              Whether you need support, want to volunteer, or are looking to
              partner with us, there's a place for you in our mission.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/report">
                <Button className="bg-[var(--color-card)] px-8 py-3 text-[var(--color-primary)] hover:bg-[var(--color-hover)]">
                  Get Help Now
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button
                  variant="outline"
                  className="border-[var(--color-card-foreground)] px-8 py-3 text-[var(--color-card-foreground)] hover:bg-[var(--color-card)]/10"
                >
                  Become a Volunteer
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-[var(--color-card-foreground)] px-8 py-3 text-[var(--color-card-foreground)] hover:bg-[var(--color-card)]/10"
                >
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
