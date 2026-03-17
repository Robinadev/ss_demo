import { useState, useMemo } from 'react';
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Phone,
  Video,
  Paperclip,
  MoreVertical,
  Lock,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const mockMessages = [
  {
    id: 'msg-1',
    sender: 'Sarah M.',
    senderRole: 'Client',
    subject: 'Session Follow-up',
    content:
      "Thank you for today's session. I wanted to follow up on the coping strategies we discussed. I've been trying the breathing exercises and they really help. When should we schedule our next session?",
    timestamp: '2024-01-20T14:30:00Z',
    isRead: false,
    priority: 'Normal',
    attachments: [],
    thread: [
      {
        id: 'reply-1',
        sender: 'Grace Thompson',
        senderRole: 'Counselor',
        content:
          "Hi Sarah, I'm glad to hear the breathing exercises are helping. That's wonderful progress! Let's schedule our next session for next Tuesday at 2 PM. Does that work for you?",
        timestamp: '2024-01-20T15:45:00Z',
        attachments: [],
      },
    ],
  },
  {
    id: 'msg-2',
    sender: 'Maria G.',
    senderRole: 'Client',
    subject: 'Support Group Question',
    content:
      "I was wondering if the trauma survivors support group is still meeting on Thursdays. I've been thinking about joining but wanted to check the current schedule.",
    timestamp: '2024-01-20T11:15:00Z',
    isRead: true,
    priority: 'Normal',
    attachments: [],
    thread: [],
  },
  {
    id: 'msg-3',
    sender: 'Legal Team',
    senderRole: 'Legal Advisor',
    subject: 'Protection Order Filed - Case #2847',
    content:
      'The protection order has been successfully filed for case #2847. The court hearing is scheduled for January 25th at 10 AM. Please ensure the client is prepared for the proceedings.',
    timestamp: '2024-01-20T09:00:00Z',
    isRead: true,
    priority: 'High',
    attachments: [
      { name: 'court_order.pdf', type: 'PDF', size: '2.4 MB' },
      { name: 'hearing_schedule.docx', type: 'DOCX', size: '145 KB' },
    ],
    thread: [],
  },
  {
    id: 'msg-4',
    sender: 'Dr. Johnson',
    senderRole: 'Medical Professional',
    subject: 'Patient Care Coordination',
    content:
      "Following up on Anonymous-928's medical care. The patient has completed their initial assessment and is ready for ongoing treatment. Please coordinate the next steps in their care plan.",
    timestamp: '2024-01-19T16:20:00Z',
    isRead: true,
    priority: 'Normal',
    attachments: [{ name: 'medical_report.pdf', type: 'PDF', size: '1.8 MB' }],
    thread: [],
  },
];

function MessagingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  const filteredMessages = useMemo(() => {
    return mockMessages.filter((msg) => {
      const matchesSearch =
        msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        filterType === 'All' ||
        (filterType === 'Unread' && !msg.isRead) ||
        (filterType === 'Read' && msg.isRead) ||
        msg.senderRole === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Normal':
        return 'text-slate-600 bg-slate-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const unreadCount = mockMessages.filter((msg) => !msg.isRead).length;

  return (
    <div className="min-h-screen bg-[var(--role-counselor-bg)] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Message List */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emerald-500" />
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    Secure Messaging
                  </h1>
                  <p className="mt-1 text-slate-600">
                    End-to-end encrypted communication
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {unreadCount > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {unreadCount} unread
                  </Badge>
                )}
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Compose
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      aria-label="Filter messages by type"
                    >
                      <option value="All">All Messages</option>
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                      <option value="Client">Clients</option>
                      <option value="Medical Professional">Medical</option>
                      <option value="Legal Advisor">Legal</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages List */}
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !message.isRead ? 'border-blue-200 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="font-semibold text-slate-800">
                            {message.sender}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {message.senderRole}
                          </Badge>
                          <Badge className={getPriorityColor(message.priority)}>
                            {message.priority}
                          </Badge>
                          {!message.isRead && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <h4 className="mb-1 font-medium text-slate-700">
                          {message.subject}
                        </h4>
                        <p className="mb-3 line-clamp-2 text-sm text-slate-600">
                          {message.content}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{formatTimestamp(message.timestamp)}</span>
                          {message.attachments.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Paperclip className="h-3 w-3" />
                              {message.attachments.length} attachment
                              {message.attachments.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredMessages.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="mx-auto mb-4 h-12 w-12 text-slate-400" />
                  <h3 className="mb-2 text-lg font-medium text-slate-600">
                    No messages found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Message Detail/Compose */}
          <div className="space-y-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald-500" />
                  Message Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span>End-to-end encryption active</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <EyeOff className="h-4 w-4 text-emerald-500" />
                  <span>Messages automatically deleted after 30 days</span>
                </div>
                <div className="text-xs text-slate-500">
                  All communications are HIPAA compliant and stored securely.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Start Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Secure Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach File
                </Button>
              </CardContent>
            </Card>

            {/* Message Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Message Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Unread Messages
                  </span>
                  <span className="font-semibold">{unreadCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Messages</span>
                  <span className="font-semibold">{mockMessages.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Response Time</span>
                  <span className="font-semibold text-emerald-600">
                    &lt; 2 hours
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagingPage;
