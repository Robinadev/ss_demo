import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Shield,
  Edit,
  Save,
  X,
  Camera,
  Lock,
  Bell,
  Settings,
  FileText,
  Clock as ClockIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Grace Thompson',
    title: 'Licensed Clinical Social Worker',
    email: 'grace.thompson@safehaven.org',
    phone: '+1 (555) 123-4567',
    location: 'Downtown Counseling Center',
    bio: 'Licensed clinical social worker with 8+ years of experience specializing in trauma recovery and domestic violence support. Certified in EMDR and CBT approaches.',
    certifications: [
      'Licensed Clinical Social Worker (LCSW)',
      'Eye Movement Desensitization and Reprocessing (EMDR)',
      'Cognitive Behavioral Therapy (CBT)',
      'Trauma-Focused Cognitive Behavioral Therapy',
    ],
    languages: ['English', 'Spanish'],
    specializations: [
      'Domestic Violence',
      'Trauma Recovery',
      'PTSD',
      'Anxiety Disorders',
    ],
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    caseUpdates: true,
    appointmentReminders: true,
    securityAlerts: true,
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Profile Settings
            </h1>
            <p className="mt-1 text-slate-600">
              Manage your professional profile and preferences
            </p>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[var(--role-counselor-primary)] hover:bg-[var(--role-counselor-primary)]/90"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Overview */}
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--role-counselor-secondary)]/30">
                    <User className="h-12 w-12 text-[var(--role-counselor-text)]" />
                    {isEditing && (
                      <button
                        className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--role-counselor-primary)]"
                        aria-label="Change profile picture"
                      >
                        <Camera className="h-4 w-4 text-white" />
                      </button>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {profileData.name}
                  </h2>
                  <p className="text-slate-600">{profileData.title}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Sessions Conducted
                  </span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Cases</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Client Satisfaction
                  </span>
                  <span className="font-semibold text-emerald-600">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Response Time</span>
                  <span className="font-semibold text-emerald-600">
                    &lt; 2hrs
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="text-slate-800">{profileData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Professional Title
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.title}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            title: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="text-slate-800">{profileData.title}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Bio
                  </label>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      rows={3}
                    />
                  ) : (
                    <p className="text-slate-600">{profileData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700">
                        Email
                      </label>
                      {isEditing ? (
                        <Input
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-slate-600">{profileData.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700">
                        Phone
                      </label>
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <p className="text-slate-600">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700">
                      Location
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="text-slate-600">{profileData.location}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Specializations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Certifications
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Award className="h-3 w-3" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Languages
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((lang, index) => (
                      <Badge key={index} className="bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Specializations
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specializations.map((spec, index) => (
                      <Badge
                        key={index}
                        className="bg-[var(--role-counselor-accent)]/20 text-[var(--role-counselor-accent)]"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="font-medium">Email Alerts</p>
                      <p className="text-sm text-slate-600">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        emailAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-slate-600">
                        Receive urgent notifications via SMS
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, smsAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="font-medium">Case Updates</p>
                      <p className="text-sm text-slate-600">
                        Notifications for case status changes
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.caseUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        caseUpdates: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-4 w-4 text-slate-500" />
                    <div>
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-slate-600">
                        Reminders for upcoming appointments
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        appointmentReminders: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
