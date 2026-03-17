import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  User,
  Bell,
  Shield,
  Eye,
  Moon,
  Sun,
  Globe,
  Save,
  Trash2,
} from 'lucide-react';

export function SettingsPage() {
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20 dark:bg-[#020617]">
      <main className="mx-auto max-w-4xl px-6 pt-8 pb-20">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg p-2">
              <Settings className="text-primary h-5 w-5" />
            </div>
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-wider uppercase"
            >
              Account Settings
            </Badge>
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-slate-900 md:text-4xl dark:text-white">
            Settings & <span className="text-primary">Preferences</span>
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
            Manage your account settings and privacy preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Settings */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Settings */}
            <Card className="border-none bg-white shadow-xl dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-none bg-white shadow-xl dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="privacy">Anonymous Mode</Label>
                    <p className="text-sm text-slate-500">
                      Keep your identity private
                    </p>
                  </div>
                  <Switch
                    id="privacy"
                    checked={privacy}
                    onCheckedChange={setPrivacy}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="visibility">Profile Visibility</Label>
                    <p className="text-sm text-slate-500">
                      Control who can see your profile
                    </p>
                  </div>
                  <Switch id="visibility" />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-none bg-white shadow-xl dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-slate-500">
                      Receive important updates
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-sm text-slate-500">
                      Get updates via email
                    </p>
                  </div>
                  <Switch id="email-notif" />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="border-none bg-white shadow-xl dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="theme">Dark Mode</Label>
                    <p className="text-sm text-slate-500">
                      Switch to dark theme
                    </p>
                  </div>
                  <Switch
                    id="theme"
                    checked={isDark}
                    onCheckedChange={setIsDark}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <p className="text-sm text-slate-500">
                      Choose your preferred language
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">English</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-none bg-white shadow-xl dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <Eye className="h-4 w-4" />
                  Preview Profile
                </Button>
                <Button
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                  variant="outline"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="from-primary/10 to-accent/5 border-none bg-gradient-to-br shadow-xl">
              <CardContent className="space-y-4 p-6 text-center">
                <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                  <Shield className="text-primary h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Account Verified
                  </h3>
                  <p className="text-sm text-slate-500">
                    Your account is secure and verified
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
