import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  Shield,
  Compass,
  Users,
  Scale,
  Search,
  ArrowRight,
  Lock,
  Clock,
  FileText,
  CheckCircle,
  TrendingUp,
  Award,
  Heart,
  Phone,
  Mail,
} from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';

const sections = [
  {
    id: 'report',
    title: 'Report an Incident',
    shortTitle: 'Report',
    icon: Shield,
    color: 'var(--colors-primary-cta)',
    description: 'Confidential and secure reporting',
    stats: { value: '10,847', label: 'Reports Processed' },
  },
  {
    id: 'help',
    title: 'Get Help',
    shortTitle: 'Help',
    icon: Compass,
    color: 'var(--colors-terracotta-6)',
    description: '24/7 support and resources',
    stats: { value: '24/7', label: 'Always Available' },
  },
  {
    id: 'community',
    title: 'Community & Forums',
    shortTitle: 'Community',
    icon: Users,
    color: 'var(--colors-olive-7)',
    description: 'Safe space to connect',
    stats: { value: '5,432', label: 'Active Members' },
  },
  {
    id: 'support',
    title: 'Legal & Medical Support',
    shortTitle: 'Support',
    icon: Scale,
    color: 'var(--colors-olive-8)',
    description: 'Professional assistance',
    stats: { value: '200+', label: 'Verified Professionals' },
  },
  {
    id: 'missing',
    title: 'Missing Persons',
    shortTitle: 'Missing',
    icon: Search,
    color: 'var(--colors-terracotta-9)',
    description: 'Report and search',
    stats: { value: '89%', label: 'Success Rate' },
  },
];

export function SectionPreviews() {
  const [activeSection, setActiveSection] = useState('report');
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-hover)] to-[var(--color-background)] px-6 py-20 md:px-12"
    >
      {/* Animated background particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--color-primary)]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header with advanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-block"
          >
            <Badge
              variant="secondary"
              className="border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-4 py-2 text-[var(--color-primary)]"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trusted by 10,000+ Community Members
            </Badge>
          </motion.div>

          <div className="mb-8">
            <h2 className="inline-flex items-baseline">
              <span className="mx-2 text-4xl text-[var(--color-foreground)] md:text-6xl">
                How We{' '}
              </span>
              <span className="relative">
                <span className="text-4xl font-bold text-[var(--color-primary)] md:text-6xl">
                  Support You
                </span>
                <motion.span
                  className="absolute right-0 -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)]"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </span>
            </h2>
          </div>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--color-foreground)]/80 md:text-xl">
            Access comprehensive services designed to protect, support, and
            empower every member of our community
          </p>
        </motion.div>

        {/* Advanced Navigation Cards Grid */}
        <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {sections.map((section, index) => (
            <NavigationCard
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
            />
          ))}
        </div>

        {/* Advanced Content Preview Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {activeSection === 'report' && (
              <ReportPreview onNavigate={() => navigate('/report')} />
            )}
            {activeSection === 'help' && (
              <HelpPreview onNavigate={() => navigate('/resources')} />
            )}
            {activeSection === 'community' && (
              <CommunityPreview
                onNavigate={() => navigate('/community-forum')}
              />
            )}
            {activeSection === 'support' && (
              <LegalPreview onNavigate={() => navigate('/support')} />
            )}
            {activeSection === 'missing' && (
              <MissingPreview
                onReport={() => navigate('/missing-persons')}
                onSearch={() => navigate('/missing-persons/view')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Advanced Navigation Card Component with 3D effects
function NavigationCard({ section, index, isActive, onClick }: any) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isActive ? 0 : rotateX,
        rotateY: isActive ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        backgroundColor: isActive
          ? `color-mix(in srgb, ${section.color}, transparent 92%)`
          : undefined,
      }}
      className={`relative rounded-2xl p-5 transition-all duration-500 md:p-6 ${
        isActive
          ? 'shadow-2xl'
          : 'bg-[var(--color-background)]/70 hover:bg-[var(--color-background)]/90 hover:shadow-xl'
      } `}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, color-mix(in srgb, ${section.color}, transparent 75%), transparent 70%)`,
        }}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Active border animation */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: section.color }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${section.color}, transparent 85%), color-mix(in srgb, ${section.color}, transparent 95%))`,
            }}
          />
        </motion.div>
      )}

      <div
        className="relative z-10 flex flex-col items-center gap-3"
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Icon with particle effect */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="relative"
        >
          <motion.div
            className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl md:h-14 md:w-14"
            style={{
              backgroundColor: `color-mix(in srgb, ${section.color}, transparent ${isActive ? '75%' : '85%'})`,
            }}
            animate={{
              boxShadow: isActive
                ? `0 0 30px color-mix(in srgb, ${section.color}, transparent 75%)`
                : '0 0 0px rgba(0,0,0,0)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${section.color}, transparent 80%), transparent)`,
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />

            <section.icon
              className="relative z-10 h-6 w-6 md:h-7 md:w-7"
              style={{ color: section.color }}
            />
          </motion.div>

          {/* Pulse rings on active */}
          {isActive && (
            <>
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2"
                  style={{ borderColor: section.color }}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{
                    scale: [1, 1.5, 1.8],
                    opacity: [0.5, 0.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 1,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Title and stats */}
        <div className="text-center">
          <motion.p
            className="mb-1 text-xs text-[var(--color-foreground)] md:text-sm"
            animate={{
              color: isActive ? section.color : 'var(--color-foreground)',
            }}
          >
            {section.shortTitle}
          </motion.p>
          <p className="line-clamp-1 text-[10px] text-[var(--color-foreground)]/70 md:text-xs">
            {section.description}
          </p>

          {/* Stat badge */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 rounded-full px-2 py-1 text-[10px] font-medium"
              style={{
                backgroundColor: `color-mix(in srgb, ${section.color}, transparent 85%)`,
                color: section.color,
              }}
            >
              {section.stats.value}
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// Enhanced Preview Components
function ReportPreview({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Card className="relative overflow-hidden border-2 border-[var(--colors-primary-cta)]/20 bg-[var(--color-background)]/90 p-8 shadow-2xl backdrop-blur-xl md:p-12">
      {/* Animated background pattern */}
      <div className="absolute top-0 right-0 h-64 w-64 opacity-[0.03]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Shield className="h-full w-full text-[var(--colors-primary-cta)]" />
        </motion.div>
      </div>

      <div className="relative z-10 grid items-start gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--colors-primary-cta)]/15">
                <Shield className="h-8 w-8 text-[var(--colors-primary-cta)]" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--colors-primary-cta)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-4 w-4 text-white" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl text-[var(--color-foreground)] md:text-3xl">
                Report an Incident
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Lock className="h-4 w-4 text-[var(--colors-primary-cta)]" />
                <p className="text-sm text-[var(--colors-primary-cta)]">
                  100% Confidential & Encrypted
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mb-6 leading-relaxed text-[var(--color-foreground)]/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Our advanced reporting system uses end-to-end encryption to protect
            your identity and ensure complete confidentiality. Report incidents
            safely, track case progress, and access support resources.
          </motion.p>

          <div className="mb-8 space-y-4">
            {[
              { icon: Lock, text: 'Military-grade encryption', progress: 100 },
              {
                icon: FileText,
                text: 'Anonymous submission option',
                progress: 100,
              },
              {
                icon: Clock,
                text: '24/7 submission availability',
                progress: 100,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--colors-primary-cta)]/10">
                  <item.icon className="h-5 w-5 text-[var(--colors-primary-cta)]" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-sm text-[var(--color-foreground)]">
                    {item.text}
                  </p>
                  <Progress value={item.progress} className="h-1.5" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              className="group w-full bg-[var(--colors-primary-cta)] px-8 py-6 text-white shadow-xl transition-all hover:bg-[var(--colors-terracotta-6)] hover:shadow-2xl md:w-auto"
              onClick={onNavigate}
            >
              <Shield className="mr-2 h-5 w-5" />
              Start Confidential Report
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-primary)]/20 bg-gradient-to-br from-[var(--color-primary)]/8 to-[var(--color-primary)]/15 p-8"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="mb-6 flex items-center gap-2 text-lg text-[var(--color-foreground)]">
            <Award className="h-5 w-5 text-[var(--colors-primary-cta)]" />
            What You Can Report:
          </h4>
          <div className="space-y-3">
            {[
              'Physical violence or assault',
              'Sexual harassment or abuse',
              'Workplace bullying or discrimination',
              'Domestic violence',
              'Child abuse or neglect',
              'Online harassment or cyberbullying',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="group flex items-start gap-3"
              >
                <motion.div
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--colors-terracotta-9)]/20 transition-colors group-hover:bg-[var(--colors-terracotta-9)]/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <CheckCircle className="h-4 w-4 text-[var(--colors-terracotta-9)]" />
                </motion.div>
                <span className="text-sm text-[var(--color-foreground)]">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

function HelpPreview({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Card className="relative overflow-hidden border-2 border-[var(--colors-terracotta-6)]/20 bg-[var(--color-background)]/90 p-8 shadow-2xl backdrop-blur-xl md:p-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--colors-terracotta-6)]/15">
              <Compass className="h-8 w-8 text-[var(--colors-terracotta-6)]" />
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-[var(--colors-terracotta-6)]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="text-2xl text-[var(--color-foreground)] md:text-3xl">
                Get Help
              </h3>
              <p className="flex items-center gap-1 text-sm text-[var(--colors-terracotta-6)]">
                <Heart className="h-4 w-4" />
                24/7 Support Available
              </p>
            </div>
          </motion.div>

          <p className="mb-8 leading-relaxed text-[var(--color-foreground)]/80">
            Connect with trained counselors, crisis intervention specialists,
            and support services. Our multilingual team is here to listen,
            guide, and support you through difficult times.
          </p>

          <div className="grid gap-4">
            {[
              {
                title: 'Emergency Hotline',
                value: '911',
                icon: Phone,
                desc: 'Immediate danger',
                color: 'var(--colors-terracotta-10)',
              },
              {
                title: 'Support Line',
                value: '8080',
                icon: Phone,
                desc: '24/7 counseling',
                color: 'var(--colors-terracotta-6)',
              },
              {
                title: 'Text Support',
                value: '7070',
                icon: Mail,
                desc: 'SMS assistance',
                color: 'var(--colors-olive-8)',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group cursor-pointer rounded-xl border-2 border-[var(--color-border)] bg-gradient-to-br from-[var(--color-background)] to-[var(--color-hover)] p-5 transition-all hover:border-[var(--colors-terracotta-6)]/40 hover:shadow-lg"
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={onNavigate}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon
                      className="h-6 w-6"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-xs text-[var(--color-foreground)]/70">
                      {item.title}
                    </p>
                    <p
                      className="mb-0.5 text-2xl"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </p>
                    <p className="text-xs text-[var(--color-foreground)]/60">
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[var(--color-foreground)]/40 transition-all group-hover:translate-x-1 group-hover:text-[var(--colors-terracotta-6)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border-2 border-[var(--colors-terracotta-6)]/20 bg-gradient-to-br from-[var(--colors-terracotta-6)]/8 to-[var(--colors-terracotta-6)]/15 p-8"
        >
          <h4 className="mb-6 text-lg text-[var(--color-foreground)]">
            Support Services:
          </h4>
          <div className="space-y-4">
            {[
              'Crisis intervention counseling',
              'Trauma-informed therapy',
              'Legal consultation referrals',
              'Medical assistance coordination',
              'Safe shelter information',
              'Financial aid guidance',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-3 rounded-lg bg-[var(--color-background)]/50 p-3 transition-colors hover:bg-[var(--color-background)]/80"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-[var(--colors-terracotta-6)]" />
                <span className="text-sm text-[var(--color-foreground)]">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Card>
  );
}

function CommunityPreview({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Card className="relative overflow-hidden border-2 border-[var(--colors-olive-7)]/20 bg-[var(--color-background)]/90 p-8 shadow-2xl backdrop-blur-xl md:p-12">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--colors-olive-7)]/15">
              <Users className="h-8 w-8 text-[var(--colors-olive-7)]" />
            </div>
            <div>
              <h3 className="text-2xl text-[var(--color-foreground)] md:text-3xl">
                Community & Forums
              </h3>
              <p className="text-sm text-[var(--colors-olive-7)]">
                5,432 Active Members
              </p>
            </div>
          </motion.div>

          <p className="mb-8 text-[var(--color-foreground)]/80">
            Join moderated forums where survivors share experiences, offer
            support, and build meaningful connections in a safe, respectful, and
            culturally sensitive environment.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Survivor Support Groups',
                members: '1,234',
                icon: Heart,
              },
              { title: 'Parenting & Family', members: '892', icon: Users },
              {
                title: 'Mental Health Resources',
                members: '1,567',
                icon: Compass,
              },
              { title: 'Recovery Stories', members: '743', icon: Award },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                  className="group cursor-pointer rounded-xl border-2 border-[var(--colors-olive-7)]/20 bg-gradient-to-br from-[var(--color-background)] to-[var(--colors-olive-7)]/5 p-5"
                  onClick={onNavigate}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <Icon className="h-6 w-6 text-[var(--colors-olive-7)]" />
                    <Badge
                      variant="secondary"
                      className="bg-[var(--colors-olive-7)]/10 text-xs text-[var(--colors-olive-7)]"
                    >
                      {item.members}
                    </Badge>
                  </div>
                  <p className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--colors-olive-7)]">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border-2 border-[var(--colors-olive-7)]/20 bg-gradient-to-br from-[var(--colors-olive-7)]/8 to-[var(--colors-olive-7)]/15 p-6"
        >
          <h4 className="mb-4 text-sm text-[var(--color-foreground)]">
            Recent Activity
          </h4>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="mb-4 rounded-lg bg-[var(--color-background)]/60 p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[var(--colors-olive-7)]/20" />
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-foreground)]">
                    Anonymous User
                  </p>
                  <p className="text-[10px] text-[var(--color-foreground)]/60">
                    2 hours ago
                  </p>
                </div>
              </div>
              <p className="line-clamp-2 text-xs text-[var(--color-foreground)]/80">
                Thank you all for the support...
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}

function LegalPreview({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Card className="border-2 border-[var(--colors-olive-8)]/20 bg-[var(--color-background)]/90 p-8 shadow-2xl backdrop-blur-xl md:p-12">
      <motion.div
        className="mb-6 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--colors-olive-8)]/15">
          <Scale className="h-8 w-8 text-[var(--colors-olive-8)]" />
        </div>
        <div>
          <h3 className="text-2xl text-[var(--color-foreground)] md:text-3xl">
            Legal & Medical Support
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <Badge className="border-green-500/20 bg-green-500/10 px-2 py-0 text-[10px] font-bold tracking-tighter text-green-500 uppercase">
              Admin Verified
            </Badge>
            <p className="text-sm text-[var(--colors-olive-8)]">
              200+ Vetted Professionals
            </p>
          </div>
        </div>
      </motion.div>

      <p className="mb-8 text-[var(--color-foreground)]/80">
        Access our network of vetted legal professionals, medical practitioners,
        and licensed counselors who specialize in supporting survivors with
        compassion and expertise.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: 'Legal Aid', count: '85', icon: Scale },
          { title: 'Medical Care', count: '67', icon: Heart },
          { title: 'Counseling', count: '48', icon: Users },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative cursor-pointer rounded-xl border-2 border-[var(--colors-olive-8)]/20 bg-gradient-to-br from-[var(--colors-olive-8)]/5 to-[var(--colors-olive-8)]/10 p-6 text-center transition-all hover:shadow-lg"
            onClick={onNavigate}
          >
            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <item.icon className="mx-auto mb-3 h-8 w-8 text-[var(--colors-olive-8)]" />
            <p className="mb-1 text-3xl text-[var(--colors-olive-8)]">
              {item.count}+
            </p>
            <p className="text-sm text-[var(--color-foreground)]">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

function MissingPreview({
  onReport,
  onSearch,
}: {
  onReport: () => void;
  onSearch: () => void;
}) {
  return (
    <Card className="border-2 border-[var(--colors-terracotta-9)]/20 bg-[var(--color-background)]/90 p-8 shadow-2xl backdrop-blur-xl md:p-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--colors-terracotta-9)]/15">
                <Search className="h-8 w-8 text-[var(--colors-terracotta-9)]" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--colors-terracotta-9)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="h-4 w-4 text-white" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl text-[var(--color-foreground)] md:text-3xl">
                Missing Persons
              </h3>
              <p className="text-sm text-[var(--colors-terracotta-9)]">
                89% Success Rate
              </p>
            </div>
          </motion.div>

          <p className="mb-8 text-[var(--color-foreground)]/80">
            Report missing persons or search our comprehensive database. Every
            report helps reunite families and keeps our community safe and
            informed.
          </p>

          <div className="mb-6 space-y-4">
            {[
              { icon: Search, text: '24/7 Emergency Reporting', available: true },
              { icon: Shield, text: 'Anonymous Reporting Option', available: true },
              { icon: Users, text: 'Family Support Services', available: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--colors-terracotta-9)]/10">
                  <item.icon className="h-5 w-5 text-[var(--colors-terracotta-9)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-foreground)]">
                    {item.text}
                  </p>
                </div>
                {item.available && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              className="h-14 flex-1 bg-[var(--colors-terracotta-9)] text-white hover:bg-[var(--colors-terracotta-9)]/90 shadow-lg"
              onClick={onReport}
            >
              <Search className="mr-2 h-5 w-5" />
              Report Missing Person
            </Button>
            <Button
              variant="outline"
              className="group h-14 flex-1 border-2 border-[var(--colors-accent-highlight)] bg-gradient-to-r from-[var(--colors-accent-highlight)]/5 to-[var(--colors-golden-1)]/5 px-8 font-[Inter] text-base font-medium text-[var(--colors-accent-highlight)] shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[var(--colors-accent-highlight)]/15 hover:to-[var(--colors-golden-2)]/15 hover:border-[var(--colors-accent-highlight)] hover:shadow-lg hover:text-[var(--colors-accent-highlight)]"
              onClick={onSearch}
            >
              <Search className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              Browse Database
              <ArrowRight className="ml-3 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border-2 border-[var(--colors-terracotta-9)]/20 bg-gradient-to-br from-[var(--colors-terracotta-9)]/5 to-[var(--colors-terracotta-9)]/10 p-8"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="mb-6 flex items-center gap-2 text-lg text-[var(--color-foreground)]">
            <Award className="h-5 w-5 text-[var(--colors-terracotta-9)]" />
            Recent Success Stories
          </h4>
          <div className="space-y-4">
            {[
              {
                name: 'Sarah M.',
                age: '27',
                location: 'Addis Ababa',
                status: 'Found Safe',
                days: '3',
                icon: '✓',
              },
              {
                name: 'John D.',
                age: '45',
                location: 'Dire Dawa',
                status: 'Reunited',
                days: '7',
                icon: '✓',
              },
              {
                name: 'Maria K.',
                age: '19',
                location: 'Bahir Dar',
                status: 'Located',
                days: '2',
                icon: '✓',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="group cursor-pointer rounded-xl border border-[var(--colors-terracotta-9)]/20 bg-[var(--color-background)]/80 p-4 transition-all hover:border-[var(--colors-terracotta-9)]/40 hover:shadow-lg"
                onClick={onSearch}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--colors-terracotta-9)]/20">
                      <span className="text-lg font-bold text-[var(--colors-terracotta-9)]">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-foreground)]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[var(--color-foreground)]/70">
                        Age {item.age} • {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-green-600">
                      {item.status}
                    </p>
                    <p className="text-[10px] text-[var(--color-foreground)]/60">
                      {item.days} days
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-[var(--colors-terracotta-9)]/20 bg-[var(--color-background)]/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl text-[var(--colors-terracotta-9)]">247</p>
                <p className="text-xs text-[var(--color-foreground)]/70">
                  Active Cases
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl text-green-600">89%</p>
                <p className="text-xs text-[var(--color-foreground)]/70">
                  Success Rate
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
}
