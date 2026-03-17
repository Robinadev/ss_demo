import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  CheckCircle2,
  PlusCircle,
  XCircle,
  ChevronRight,
  MessageSquare,
  FileText,
  User,
  Heart,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const STATUS_STEPS = [
  'Received',
  'Under Review',
  'Assigned',
  'In Support',
  'Closed',
];

const cases = [
  {
    id: 'SH-89241',
    status: 'Assigned',
    date: 'Jan 15, 2024',
    title: 'Anonymous Incident Report',
    updates: [
      {
        date: 'Jan 20',
        text: 'Assigned to counselor Sarah for trauma-informed support.',
      },
      { date: 'Jan 16', text: 'Case verified and moved to review phase.' },
      {
        date: 'Jan 15',
        text: 'Report received securely via end-to-end encryption.',
      },
    ],
  },
  {
    id: 'SH-77102',
    status: 'In Support',
    date: 'Dec 28, 2023',
    title: 'Legal Advice & Protection',
    updates: [
      { date: 'Jan 10', text: 'Legal consultation scheduled for Jan 25.' },
      { date: 'Jan 05', text: 'Assigned to Legal Advocate Dawit.' },
    ],
  },
];

export function MyCases() {
  const navigate = useNavigate();

  const handleSafetyExit = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="min-h-screen pb-20 font-sans selection:bg-[#E1F2E1] dark:bg-[#020617]" style={{ backgroundColor: 'var(--role-survivor-bg)' }}>
      {/* Safety Exit Button */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="destructive"
          onClick={handleSafetyExit}
          className="rounded-full border-none bg-[#D9534F] px-6 shadow-xl transition-transform hover:scale-105 hover:bg-[#C9302C]"
        >
          <Shield className="mr-2 h-4 w-4" />
          Safety Exit
        </Button>
      </div>

      <main className="mx-auto max-w-5xl px-6 pt-24 pb-12">
        {/* Header */}
        <header className="mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase"
              style={{
                borderColor: 'var(--role-survivor-accent)',
                backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)',
                color: 'var(--role-survivor-primary)'
              }}
            >
              Secure Environment
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl leading-tight font-medium text-slate-900 md:text-5xl dark:text-white"
          >
            My <span className="font-semibold" style={{ color: 'var(--role-survivor-accent)' }}>Cases</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg leading-relaxed font-normal text-slate-500 dark:text-slate-400"
          >
            Track your progress and access the support you deserve in total
            anonymity. Your journey to healing is our priority.
          </motion.p>
        </header>

        {/* Case List */}
        <div className="grid grid-cols-1 gap-12">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
            >
              <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-2xl shadow-slate-200/40 dark:bg-slate-900">
                <CardHeader className="border-b border-slate-50 bg-[#F8FAF8] p-8 md:p-10 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                          ID: {caseItem.id}
                        </span>
                        <Badge className="rounded-lg px-2.5 py-1 text-[10px] font-black tracking-tighter uppercase" style={{ backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)', color: 'var(--role-survivor-primary)', border: 'none' }}>
                          {caseItem.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl font-medium text-slate-800 dark:text-white">
                        {caseItem.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden border-r border-slate-100 pr-6 text-right sm:block dark:border-slate-700">
                        <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                          Submitted
                        </p>
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {caseItem.date}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 rounded-2xl border-none shadow-none transition-all"
                        style={{
                          color: 'var(--role-survivor-accent)',
                          backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)'
                        }}
                        className="hover:bg-[rgba(var(--role-survivor-accent-rgb),0.2)]"
                        onClick={() => navigate(`/survivor/case/${caseItem.id}`)}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-12 p-8 md:p-10">
                  {/* Large Progress Indicator */}
                  <div className="space-y-8">
                    <div className="flex items-end justify-between px-1">
                      <div className="space-y-1">
                        <h4 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                          Overall Progress
                        </h4>
                        <p className="text-2xl font-normal text-slate-800 dark:text-white">
                          Moving{' '}
                          <span className="font-semibold text-[#81C784]">
                            Forward
                          </span>
                        </p>
                      </div>
                      <p className="rounded-full px-3 py-1.5 text-xs font-black tracking-[0.2em] uppercase" style={{ backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)', color: 'var(--role-survivor-accent)' }}>
                        {Math.round(
                          ((STATUS_STEPS.indexOf(caseItem.status) + 1) /
                            STATUS_STEPS.length) *
                            100
                        )}
                        % Verified
                      </p>
                    </div>

                    <div className="relative py-10">
                      {/* Connection Line Background */}
                      <div className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800" />

                      {/* Progress Active Line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(STATUS_STEPS.indexOf(caseItem.status) / (STATUS_STEPS.length - 1)) * 100}%`,
                        }}
                        transition={{
                          duration: 2,
                          ease: 'circOut',
                          delay: 0.5,
                        }}
                        className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2"
                        style={{ backgroundColor: 'var(--role-survivor-accent)' }}
                      />

                      {/* Steps Container */}
                      <div className="relative flex h-4 items-center justify-between">
                        {STATUS_STEPS.map((step, stepIndex) => {
                          const isCompleted =
                            stepIndex <= STATUS_STEPS.indexOf(caseItem.status);
                          const isActive =
                            stepIndex === STATUS_STEPS.indexOf(caseItem.status);

                          return (
                            <div
                              key={step}
                              className="relative flex flex-col items-center gap-4"
                            >
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.15 * stepIndex + 1 }}
                                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 transition-all duration-700 ${
                                  isCompleted
                                    ? 'border-white shadow-xl dark:border-slate-900'
                                    : 'border-slate-50 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800'
                                } ${isActive ? 'scale-125 !border-[var(--role-survivor-accent)]/20 ring-8 ring-[rgba(var(--role-survivor-accent-rgb),0.05)]' : ''}`}
                                style={isCompleted ? {
                                  backgroundColor: 'var(--role-survivor-accent)',
                                  boxShadow: 'var(--role-survivor-shadow)'
                                } : undefined}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-white" />
                                ) : (
                                  <div className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                                )}
                              </motion.div>
                              <span
                                className={`absolute -bottom-10 text-[9px] font-black tracking-widest whitespace-nowrap uppercase ${
                                  isCompleted
                                    ? ''
                                    : 'text-slate-400'
                                } ${isActive ? 'text-[10px]' : ''}`}
                                style={isCompleted ? { color: 'var(--role-survivor-accent)' } : undefined}
                              >
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Active Case Timeline View */}
                  <div className="rounded-[2rem] border border-slate-50 bg-[#FAF9F6] p-8 md:p-10 dark:border-slate-800 dark:bg-slate-800/40">
                    <div className="mb-10 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-700">
                        <Clock className="h-5 w-5" style={{ color: 'var(--role-survivor-accent)' }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black tracking-[0.2em] text-slate-500 uppercase">
                          Milestones
                        </h3>
                        <p className="text-[10px] font-medium text-slate-400">
                          Detailed progress log
                        </p>
                      </div>
                    </div>

                    <div className="relative space-y-10">
                      {/* Timeline vertical line */}
                      <div className="absolute top-2 bottom-2 left-[11px] w-[1px] bg-slate-100 dark:bg-slate-700" />

                      {caseItem.updates.map((update, uIndex) => (
                        <motion.div
                          key={uIndex}
                          className="relative flex items-start gap-8"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 * uIndex + 1.2 }}
                        >
                          <div
                            className={`z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                              uIndex === 0
                                ? 'shadow-lg'
                                : 'bg-slate-100 dark:bg-slate-800'
                            }`}
                            style={uIndex === 0 ? {
                              backgroundColor: 'var(--role-survivor-accent)',
                              boxShadow: 'var(--role-survivor-shadow)'
                            } : undefined}
                          >
                            <div
                              className={`h-1.5 w-1.5 rounded-full ${uIndex === 0 ? 'bg-white' : 'bg-slate-400'}`}
                            />
                          </div>
                          <div className="space-y-2 pt-0.5">
                            <Badge
                              variant="outline"
                              className="rounded-full border border-slate-50 bg-white px-2 py-0.5 text-[9px] font-black tracking-wider text-slate-400 shadow-none dark:border-slate-600 dark:bg-slate-700"
                            >
                              {update.date}
                            </Badge>
                            <p className="max-w-2xl text-sm leading-relaxed font-normal text-slate-700 dark:text-slate-300">
                              {update.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-5 pt-6">
                    <Button className="h-14 min-w-[200px] flex-1 gap-3 rounded-[1.25rem] border-none text-base font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: 'var(--role-survivor-accent)', boxShadow: 'var(--role-survivor-shadow)' }}>
                      <PlusCircle className="h-5 w-5" />
                      Add Update
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 min-w-[200px] flex-1 gap-3 rounded-[1.25rem] border-slate-100 font-bold text-slate-600 transition-all hover:bg-[#F8FAF8] dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Request Change
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 min-w-[200px] flex-1 gap-3 rounded-[1.25rem] border-none font-bold text-slate-400 shadow-none transition-all hover:bg-[#FFF5F5] hover:text-[#D9534F]"
                    >
                      <XCircle className="h-5 w-5" />
                      Close Case
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Informational Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          <div className="space-y-4 rounded-[2.5rem] border-none bg-[#F1F8E9]/40 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm dark:bg-slate-800">
              <Shield className="h-6 w-6" style={{ color: 'var(--role-survivor-accent)' }} />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              Empowered Privacy
            </h4>
            <p className="text-sm leading-relaxed font-normal text-slate-500/80 dark:text-slate-400">
              Your data is protected by military-grade encryption. No one,
              including government entities, can access your identity without
              your explicit consent.
            </p>
          </div>
          <div className="space-y-4 rounded-[2.5rem] border-none bg-[#F5F5F5]/50 p-8 dark:bg-slate-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm dark:bg-slate-800">
              <FileText className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              Expert Advocacy
            </h4>
            <p className="text-sm leading-relaxed font-normal text-slate-500/80 dark:text-slate-400">
              Every assigned professional is a verified expert in
              trauma-informed care and legal advocacy within the Ethiopian legal
              ecosystem.
            </p>
          </div>
          <div className="space-y-4 rounded-[2.5rem] border-none bg-[#F5F5F5]/50 p-8 dark:bg-slate-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm dark:bg-slate-800">
              <User className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              Constant Progress
            </h4>
            <p className="text-sm leading-relaxed font-normal text-slate-500/80 dark:text-slate-400">
              We ensure transparent tracking so you never feel left behind in
              your pursuit of justice and healing. Your case matters to us.
            </p>
          </div>
        </motion.div>

        {/* Motivational Footer */}
        <footer className="mt-32 space-y-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-slate-100 dark:bg-slate-800" />
            <Heart className="h-4 w-4 animate-pulse" style={{ color: 'var(--role-survivor-accent)' }} />
            <div className="h-[1px] w-12 bg-slate-100 dark:bg-slate-800" />
          </div>
          <p className="mx-auto max-w-lg text-2xl leading-relaxed font-normal text-slate-400 italic">
            "Your strength matters. Progress is being made."
          </p>
          <div className="pt-4">
            <p className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase">
              SafeHaven Protection System
            </p>
            <div className="mt-3 flex justify-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="h-1.5 w-1.5 rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        </footer>
      </main>

      {/* Trust Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        className="fixed bottom-10 left-10 hidden lg:block"
      >
        <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 px-5 py-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="relative">
            <div className="absolute h-3 w-3 animate-ping rounded-full opacity-40" style={{ backgroundColor: 'var(--role-survivor-accent)' }} />
            <div className="relative h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--role-survivor-accent)' }} />
          </div>
          <span className="text-[10px] font-black tracking-widest whitespace-nowrap text-slate-500 uppercase">
            Encryption Active & Secure
          </span>
        </div>
      </motion.div>
    </div>
  );
}
