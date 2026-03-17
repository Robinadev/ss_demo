import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Bell, Save } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@legal-aid.org',
    role: 'LEGAL_PROVIDER',
    language: 'ENG',
    timezone: 'UTC+3',
    bio: 'Experienced legal advocate specializing in domestic violence and family law cases.',
    notifications: {
      emailReports: true,
      emailAlerts: true,
      pushNotifications: false,
      weeklyDigest: true,
    },
    preferences: {
      theme: 'system',
      autoSave: true,
      showOnlineStatus: false,
    },
  });

  const handleInputChange = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile:', profile);
    // In real implementation, this would call an API
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Legal Provider Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <User className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <h3 className="font-medium">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-muted-foreground text-sm">{profile.email}</p>
                <Badge variant="default" className="mt-1">
                  <Shield className="mr-1 h-3 w-3" />
                  {profile.role}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{profile.bio}</p>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('firstName', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange('lastName', e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('email', e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleInputChange('bio', e.target.value)
                  }
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value: string) =>
                      handleInputChange('language', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ENG">English</SelectItem>
                      <SelectItem value="AMH">Amharic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value: string) =>
                      handleInputChange('timezone', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC+3">UTC+3 (EAT)</SelectItem>
                      <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                      <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={profile.preferences.theme}
                  onValueChange={(value: string) =>
                    handlePreferenceChange('theme', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailReports">Email Reports</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive weekly case reports
                  </p>
                </div>
                <Switch
                  id="emailReports"
                  checked={profile.notifications.emailReports}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('emailReports', checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailAlerts">Email Alerts</Label>
                  <p className="text-muted-foreground text-sm">
                    Get notified of urgent case updates
                  </p>
                </div>
                <Switch
                  id="emailAlerts"
                  checked={profile.notifications.emailAlerts}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('emailAlerts', checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-muted-foreground text-sm">
                    Browser push notifications for alerts
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={profile.notifications.pushNotifications}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('pushNotifications', checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                  <p className="text-muted-foreground text-sm">
                    Weekly summary of legal activities
                  </p>
                </div>
                <Switch
                  id="weeklyDigest"
                  checked={profile.notifications.weeklyDigest}
                  onCheckedChange={(checked: boolean) =>
                    handleNotificationChange('weeklyDigest', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
