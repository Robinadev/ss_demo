import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  Lock,
  EyeOff,
  Bell,
  History,
  HardDriveDownload,
  Trash2,
  RefreshCcw,
  CheckCircle2,
  LifeBuoy,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function SafetySettings() {
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSafetyExit = () => {
    window.location.replace('https://www.google.com');
  };

  const handleSave = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const safetySections = [
    {
      id: 'anonymity',
      title: 'Anonymity Controls',
      desc: 'Manage how your identity is protected',
      icon: EyeOff,
      color: 'var(--role-survivor-accent)',
      bgColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)',
      controls: [
        {
          id: 'ghost-mode',
          label: 'Private Identity Mode',
          desc: 'Hides your name and metadata from counselors and other users until you choose to reveal it.',
          defaultChecked: true,
        },
        {
          id: 'enc-reporting',
          label: 'Anonymous Reporting',
          desc: 'All incident reports will be submitted without any link to your account identity.',
          defaultChecked: true,
        },
      ],
    },
    {
      id: 'vault',
      title: 'Privacy Preferences',
      desc: 'Session security and data retention',
      icon: History,
      color: 'var(--role-survivor-primary)',
      bgColor: 'rgba(var(--role-survivor-primary-rgb), 0.1)',
      controls: [
        {
          id: 'auto-wipe',
          label: 'Clear History on Exit',
          desc: 'Automatically clear your search history and local platform cache when you log out.',
          defaultChecked: true,
        },
        {
          id: 'auto-logout',
          label: 'Inactivity Timeout',
          desc: 'Log out automatically after 15 minutes of inactivity for your protection.',
          defaultChecked: false,
        },
      ],
    },
    {
      id: 'alerts',
      title: 'Safety Notifications',
      desc: 'Choose how you want to be alerted',
      icon: Bell,
      color: 'var(--role-survivor-text)',
      bgColor: 'rgba(var(--role-survivor-text-rgb), 0.1)',
      controls: [
        {
          id: 'stealth-notif',
          label: 'Stealth Notifications',
          desc: "Receive alerts with generic titles like 'System Update' to hide the nature of the message.",
          defaultChecked: true,
        },
        {
          id: 'emergency-override',
          label: 'Critical SOS Alerts',
          desc: 'Allow vital safety alerts to bypass silent mode in case of immediate danger.',
          defaultChecked: true,
        },
      ],
    },
  ];

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
            Safety{' '}
            <span className="font-semibold" style={{ color: 'var(--role-survivor-accent)' }}>& Identity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg leading-relaxed font-normal text-slate-500 dark:text-slate-400"
          >
            Control your privacy and how you interact with the platform. Your
            safety and comfort are our highest priority.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Controls */}
          <div className="space-y-12 lg:col-span-8">
            {safetySections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.3 }}
              >
                <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white shadow-2xl shadow-slate-200/40 dark:bg-slate-900">
                  <CardHeader className="border-b border-slate-50 bg-[#F8FAF8] p-8 md:p-10 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-2xl p-3 ${section.bgColor} ${section.color}`}
                      >
                        <section.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-medium text-slate-800 dark:text-white">
                          {section.title}
                        </CardTitle>
                        <p className="text-xs font-medium text-slate-400">
                          {section.desc}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8 md:p-10">
                    {section.controls.map((control) => (
                      <div
                        key={control.id}
                        className="flex items-start justify-between gap-6 rounded-2xl p-4 transition-colors hover:bg-[#FAF9F6] dark:hover:bg-slate-800/50"
                      >
                        <div className="space-y-1">
                          <Label
                            htmlFor={control.id}
                            className="cursor-pointer text-base font-semibold text-slate-800 dark:text-slate-200"
                          >
                            {control.label}
                          </Label>
                          <p className="max-w-lg text-sm leading-relaxed font-normal text-slate-500 dark:text-slate-400">
                            {control.desc}
                          </p>
                        </div>
                        <Switch
                          id={control.id}
                          defaultChecked={control.defaultChecked}
                          className="data-[state=checked]:bg-[var(--role-survivor-accent)]"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar Status & Tools */}
          <aside className="space-y-8 lg:col-span-4">
            {/* Live Identity Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="space-y-8 rounded-[2rem] border-none bg-white p-8 shadow-2xl dark:bg-slate-900" style={{ boxShadow: 'var(--role-survivor-shadow)' }}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)' }}>
                      <ShieldCheck className="h-5 w-5" style={{ color: 'var(--role-survivor-accent)' }} />
                    </div>
                    <div className="font-bold text-slate-800 dark:text-white">
                      Status Dashboard
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Network Privacy
                      </span>
                      <Badge className="rounded-lg border-none bg-[#E1F2E1] px-3 py-1 text-[9px] font-black tracking-widest text-[#2E7D32] uppercase">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        Session Key
                      </span>
                      <Badge className="rounded-lg border-none px-3 py-1 text-[9px] font-black tracking-widest uppercase" style={{ backgroundColor: 'rgba(var(--role-survivor-accent-rgb), 0.1)', color: 'var(--role-survivor-accent)' }}>
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleSave}
                    className="h-14 w-full rounded-2xl border-none bg-[#81C784] font-bold text-white shadow-xl shadow-[#81C784]/20 transition-all hover:bg-[#66BB6A] active:scale-95"
                  >
                    Save Changes
                  </Button>

                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 text-center text-xs font-bold text-[#81C784]"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Settings Updated
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Quick Tools */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h4 className="px-4 text-[10px] font-black tracking-widest text-slate-300 uppercase">
                Data Management
              </h4>

              <Button
                variant="outline"
                className="group flex h-16 w-full items-center justify-between rounded-2xl border-none bg-white px-6 shadow-sm transition-all hover:bg-[#81C784] hover:text-white dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <HardDriveDownload className="h-5 w-5 text-[#81C784] group-hover:text-white" />
                  <span className="text-sm font-semibold">
                    Download My Data
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-30" />
              </Button>

              <Button
                variant="outline"
                className="group flex h-16 w-full items-center justify-between rounded-2xl border-none bg-white px-6 shadow-sm transition-all hover:bg-[#D9534F] hover:text-white dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <Trash2 className="h-5 w-5 text-[#D9534F] group-hover:text-white" />
                  <span className="text-sm font-semibold">Delete Account</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-30" />
              </Button>

              <Button
                variant="outline"
                className="group h-16 w-full rounded-2xl border-none bg-white px-6 font-semibold text-slate-400 shadow-sm transition-all hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <RefreshCcw className="mr-3 h-4 w-4" />
                Reset Defaults
              </Button>
            </motion.div>
          </aside>
        </div>

        {/* Informational Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-2"
        >
          <div className="space-y-4 rounded-[2.5rem] border-none bg-[#F1F8E9]/40 p-8 dark:bg-slate-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#81C784] shadow-sm dark:bg-slate-800">
              <Lock className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              Your data stays local
            </h4>
            <p className="text-sm leading-relaxed font-normal text-slate-500/80 dark:text-slate-400">
              We use advanced local-first encryption. This means your private
              keys never leave your device, ensuring that not even our team can
              access your personal identifiers.
            </p>
          </div>
          <div className="space-y-4 rounded-[2.5rem] border-none bg-[#F5F5F5]/50 p-8 dark:bg-slate-900/40">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm dark:bg-slate-800">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              Verified Protection
            </h4>
            <p className="text-sm leading-relaxed font-normal text-slate-500/80 dark:text-slate-400">
              Our safety protocols are reviewed by legal and trauma experts to
              ensure they meet the highest standards for survivors in the
              Ethiopian digital landscape.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Trust Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-10 left-10 hidden lg:block"
      >
        <div className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 px-5 py-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
          <div className="relative">
            <div className="absolute h-3 w-3 animate-ping rounded-full bg-[#81C784] opacity-40" />
            <div className="relative h-3 w-3 rounded-full bg-[#81C784]" />
          </div>
          <span className="text-[10px] font-black tracking-widest whitespace-nowrap text-slate-500 uppercase">
            Encryption Active & Secure
          </span>
        </div>
      </motion.div>
    </div>
  );
}
