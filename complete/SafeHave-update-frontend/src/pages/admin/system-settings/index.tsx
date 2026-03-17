import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

export function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'SafeHaven',
      siteDescription: 'A platform for survivor support and resources',
      contactEmail: 'admin@safehaven.org',
      timezone: 'UTC',
      language: 'en',
    },
    security: {
      enableTwoFactor: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      enableAuditLogs: true,
      maxLoginAttempts: 5,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      weeklyReports: true,
      incidentAlerts: true,
    },
    maintenance: {
      maintenanceMode: false,
      backupFrequency: 'daily',
      logRetentionDays: 90,
      autoUpdates: true,
    },
  });

  const handleSave = (category: string) => {
    // TODO: Implement save functionality
    console.log(
      `Saving ${category} settings:`,
      settings[category as keyof typeof settings]
    );
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system preferences and global settings.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="border-border flex space-x-1 border-b bg-transparent p-0">
          <TabsTrigger
            value="general"
            className="text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-primary px-4 py-2 text-sm font-medium transition-colors data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-primary px-4 py-2 text-sm font-medium transition-colors data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-primary px-4 py-2 text-sm font-medium transition-colors data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="maintenance"
            className="text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-primary px-4 py-2 text-sm font-medium transition-colors data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Maintenance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) =>
                      updateSetting('general', 'siteName', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) =>
                      updateSetting('general', 'contactEmail', e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) =>
                      updateSetting('general', 'timezone', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) =>
                      updateSetting('general', 'language', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="am">Amharic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    updateSetting('general', 'siteDescription', e.target.value)
                  }
                  rows={3}
                />
              </div>
              <Button
                onClick={() => handleSave('general')}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-muted-foreground text-sm">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.enableTwoFactor}
                    onCheckedChange={(checked) =>
                      updateSetting('security', 'enableTwoFactor', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Audit Logs</Label>
                    <p className="text-muted-foreground text-sm">
                      Log all administrative actions
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.enableAuditLogs}
                    onCheckedChange={(checked) =>
                      updateSetting('security', 'enableAuditLogs', checked)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      updateSetting(
                        'security',
                        'sessionTimeout',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">
                    Minimum Password Length
                  </Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) =>
                      updateSetting(
                        'security',
                        'passwordMinLength',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) =>
                      updateSetting(
                        'security',
                        'maxLoginAttempts',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSave('security')}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Send email notifications for important events
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        'notifications',
                        'emailNotifications',
                        checked
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Send SMS alerts for critical incidents
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        'notifications',
                        'smsNotifications',
                        checked
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-muted-foreground text-sm">
                      Enable browser push notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        'notifications',
                        'pushNotifications',
                        checked
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-muted-foreground text-sm">
                      Send weekly summary reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      updateSetting('notifications', 'weeklyReports', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Incident Alerts</Label>
                    <p className="text-muted-foreground text-sm">
                      Immediate alerts for new incidents
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.incidentAlerts}
                    onCheckedChange={(checked) =>
                      updateSetting('notifications', 'incidentAlerts', checked)
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSave('notifications')}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-muted-foreground text-sm">
                      Put the site in maintenance mode
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenance.maintenanceMode}
                    onCheckedChange={(checked) =>
                      updateSetting('maintenance', 'maintenanceMode', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Updates</Label>
                    <p className="text-muted-foreground text-sm">
                      Automatically install security updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenance.autoUpdates}
                    onCheckedChange={(checked) =>
                      updateSetting('maintenance', 'autoUpdates', checked)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.maintenance.backupFrequency}
                    onValueChange={(value) =>
                      updateSetting('maintenance', 'backupFrequency', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logRetentionDays">Log Retention (days)</Label>
                  <Input
                    id="logRetentionDays"
                    type="number"
                    value={settings.maintenance.logRetentionDays}
                    onChange={(e) =>
                      updateSetting(
                        'maintenance',
                        'logRetentionDays',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSave('maintenance')}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Maintenance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
