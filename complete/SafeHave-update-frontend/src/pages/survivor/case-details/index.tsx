import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  CheckCircle2,
  PlusCircle,
  XCircle,
  MessageSquare,
  ArrowLeft,
  User,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const STATUS_STEPS = [
  'Received',
  'Under Review',
  'Assigned',
  'In Support',
  'Closed',
];

// Mock case data - in a real app, this would come from an API based on the case ID
const getCaseById = (id: string) => {
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

  return cases.find(caseItem => caseItem.id === id);
};

export function CaseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(false);

  const caseItem = id ? getCaseById(id) : null;

  const handleSafetyExit = () => {
    window.location.replace('https://www.google.com');
  };

  const handleSave = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Case Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The case you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate('/survivor/my-cases')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Cases
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 font-sans dark:bg-slate-900" style={{ backgroundColor: 'var(--role-survivor-bg)' }}>
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
              Case Details
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/survivor/my-cases')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Button>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl leading-tight font-medium text-slate-900 md:text-5xl dark:text-white"
          >
            Case <span className="font-semibold" style={{ color: 'var(--role-survivor-accent)' }}>{caseItem.id}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg leading-relaxed font-normal text-slate-500 dark:text-slate-400"
          >
            Detailed view of your case progress and communication history.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Case Details */}
          <div className="space-y-8 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-2xl shadow-slate-200/40 dark:bg-slate-900">
                <CardHeader className="border-b border-slate-50 bg-[#F8FAF8] p-8 md:p-10 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Submitted on {caseItem.date}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-12 p-8 md:p-10">
                  {/* Progress Indicator */}
                  <div className="space-y-8">
                    <div className="flex items-end justify-between px-1">
                      <div className="space-y-1">
                        <h4 className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                          Overall Progress
                        </h4>
                        <p className="text-2xl font-normal text-slate-800 dark:text-white">
                          Moving{' '}
                          <span className="font-semibold" style={{ color: 'var(--role-survivor-accent)' }}>
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
                      <div className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-slate-100 dark:bg-slate-800" />
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
                                } ${isActive ? 'scale-125' : ''}`}
                                style={{
                                  borderColor: isActive ? 'var(--role-survivor-accent)' : undefined,
                                  backgroundColor: isCompleted ? 'var(--role-survivor-accent)' : undefined,
                                  boxShadow: isCompleted ? 'var(--role-survivor-shadow)' : undefined
                                }}
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

                  {/* Updates Timeline */}
                  <div className="rounded-[2rem] border border-slate-50 bg-[#FAF9F6] p-8 md:p-10 dark:border-slate-800 dark:bg-slate-800/40">
                    <div className="mb-10 flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-700">
                        <Clock className="h-5 w-5" style={{ color: 'var(--role-survivor-accent)' }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black tracking-[0.2em] text-slate-500 uppercase">
                          Case Updates
                        </h3>
                        <p className="text-[10px] font-medium text-slate-400">
                          Complete case history and communications
                        </p>
                      </div>
                    </div>

                    <div className="relative space-y-10">
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
                      Contact Support
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
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="space-y-8 rounded-[2rem] border-none bg-white p-8 shadow-2xl dark:bg-slate-900" style={{ boxShadow: 'var(--role-survivor-shadow)' }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)' }}>
                      <Shield className="h-5 w-5" style={{ color: 'var(--role-survivor-accent)' }} />
                    </div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      Case Information
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Status
                      </span>
                      <Badge className="rounded-lg px-3 py-1 text-[9px] font-black tracking-widest uppercase" style={{ backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)', color: 'var(--role-survivor-primary)', border: 'none' }}>
                        {caseItem.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Case ID
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
                        {caseItem.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Submitted
                      </span>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {caseItem.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Updates
                      </span>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        {caseItem.updates.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleSave}
                    className="h-14 w-full rounded-2xl border-none text-base font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: 'var(--role-survivor-accent)', boxShadow: 'var(--role-survivor-shadow)' }}
                  >
                    Save Changes
                  </Button>

                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-center text-xs font-bold"
                      style={{ color: 'var(--role-survivor-accent)' }}
                    >
                      <CheckCircle2 className="h-3 w-3" /> Settings Updated
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}
