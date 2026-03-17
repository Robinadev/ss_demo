import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Search,
  Filter,
  Reply,
  Send,
  Paperclip,
  User,
} from 'lucide-react';
import { useState } from 'react';

const Messaging = () => {
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);

  // Mock messages data
  const messages = [
    {
      id: 'M001',
      from: 'Dr. Sarah Smith',
      subject: 'Follow-up on Patient P001',
      preview:
        "Hi Dr. Johnson, I wanted to follow up on Sarah's recent appointment. Her spirometry results show...",
      date: '2024-02-20',
      time: '10:30 AM',
      priority: 'Normal',
      status: 'Unread',
      hasAttachments: false,
    },
    {
      id: 'M002',
      from: 'Legal Department',
      subject: 'Forensic Report Review - Case P001',
      preview:
        'Please review the attached forensic report for patient Sarah Johnson. We need your input on...',
      date: '2024-02-19',
      time: '03:15 PM',
      priority: 'High',
      status: 'Unread',
      hasAttachments: true,
    },
    {
      id: 'M003',
      from: 'Dr. Michael Chen',
      subject: 'Consultation Request',
      preview:
        'Would you be available for a telemedicine consultation regarding a patient with complex trauma?',
      date: '2024-02-18',
      time: '09:45 AM',
      priority: 'Normal',
      status: 'Read',
      hasAttachments: false,
    },
    {
      id: 'M004',
      from: 'Pharmacy Department',
      subject: 'Medication Adjustment - P002',
      preview:
        "Regarding Michael Chen's medication regimen, we've noticed some potential interactions that...",
      date: '2024-02-17',
      time: '02:20 PM',
      priority: 'Urgent',
      status: 'Read',
      hasAttachments: true,
    },
    {
      id: 'M005',
      from: 'Admin Office',
      subject: 'Schedule Update',
      preview:
        'This is to inform you that the clinic hours have been updated for next week due to...',
      date: '2024-02-16',
      time: '11:00 AM',
      priority: 'Normal',
      status: 'Read',
      hasAttachments: false,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
      case 'Urgent':
        return 'medical-badge-high';
      case 'Normal':
        return 'medical-badge-medium';
      case 'Low':
        return 'medical-badge-low';
      default:
        return 'medical-badge-medium';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unread':
        return 'medical-badge-high';
      case 'Read':
        return 'medical-badge-medium';
      default:
        return 'medical-badge-low';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 medical-theme-bg">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold medical-theme-text">Secure Messaging</h1>
            <p className="text-muted-foreground">
              Communicate securely with colleagues, legal teams, and other
              healthcare providers.
            </p>
          </div>
          <Dialog
            open={isComposeDialogOpen}
            onOpenChange={setIsComposeDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="medical-button-primary">
                <Mail className="mr-2 h-4 w-4" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Compose New Message</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="recipient"
                    className="text-right text-sm font-medium"
                  >
                    To
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal">Legal Department</SelectItem>
                      <SelectItem value="counseling">
                        Counseling Services
                      </SelectItem>
                      <SelectItem value="pharmacy">
                        Pharmacy Department
                      </SelectItem>
                      <SelectItem value="admin">Admin Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="subject"
                    className="text-right text-sm font-medium"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Message subject"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="priority"
                    className="text-right text-sm font-medium"
                  >
                    Priority
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <label
                    htmlFor="message"
                    className="pt-2 text-right text-sm font-medium"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="col-span-3"
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium">
                    Attachments
                  </label>
                  <div className="col-span-3">
                    <Button variant="outline" size="sm">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Add Attachment
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsComposeDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsComposeDialogOpen(false)} className="medical-button-primary">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search messages by subject or sender..."
              className="pl-10"
            />
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Messages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <Mail className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-muted-foreground text-xs">In inbox</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Mail className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messages.filter((msg) => msg.status === 'Unread').length}
            </div>
            <p className="text-muted-foreground text-xs">New messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Mail className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                messages.filter(
                  (msg) => msg.priority === 'High' || msg.priority === 'Urgent'
                ).length
              }
            </div>
            <p className="text-muted-foreground text-xs">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              With Attachments
            </CardTitle>
            <Paperclip className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messages.filter((msg) => msg.hasAttachments).length}
            </div>
            <p className="text-muted-foreground text-xs">Messages with files</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-shadow hover:shadow-md ${message.status === 'Unread' ? 'border-l-4 border-l-[var(--role-urgent)]' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--role-stable)]">
                      <User className="h-5 w-5 text-[var(--role-medical)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <h4 className="truncate font-medium">
                            {message.from}
                          </h4>
                          {message.status === 'Unread' && (
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(message.status)}`}>
                              {message.status}
                            </span>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(message.priority)}`}>
                            {message.priority}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {message.time}
                          </span>
                        </div>
                      </div>
                      <h5 className="mb-1 truncate text-sm font-medium">
                        {message.subject}
                      </h5>
                      <p className="text-muted-foreground mb-2 line-clamp-2 text-sm">
                        {message.preview}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground flex items-center gap-4 text-xs">
                          <span>{message.date}</span>
                          {message.hasAttachments && (
                            <div className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              <span>Attachment</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Reply className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="text-muted-foreground py-8 text-center">
              No messages found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
