import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageCircle,
  Send,
  Phone,
  Shield,
  Users,
  Paperclip,
  Bell,
  CheckCheck,
  Search,
  X,
  AlertTriangle,
  Clock,
  Lock,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';

export function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    {
      id: 1,
      recipient: {
        name: 'Counselor Alem',
        role: 'Trauma Specialist',
        isVerified: true,
        isOnline: true,
        avatar: 'CA',
        specialization: 'PTSD & Trauma Recovery',
      },
      lastMessage: "I'm here to listen whenever you're ready to talk",
      timestamp: '2h ago',
      unread: 2,
      isPinned: true,
      counselors: ['Counselor Alem', 'Dr. Sarah'],
    },
    {
      id: 2,
      recipient: {
        name: 'Legal Support Team',
        role: 'Legal Advisors',
        isVerified: true,
        isOnline: false,
        avatar: 'LS',
        specialization: 'Legal Rights & Protection',
      },
      lastMessage: "We've received your documentation",
      timestamp: '1d ago',
      unread: 0,
      isPinned: false,
      counselors: ['Advocate Maria', 'Lawyer John', 'Paralegal Lisa'],
    },
    {
      id: 3,
      recipient: {
        name: 'Medical Support',
        role: 'Healthcare Team',
        isVerified: true,
        isOnline: true,
        avatar: 'MS',
        specialization: 'Medical Care & Recovery',
      },
      lastMessage: 'Your health and wellbeing are our priority',
      timestamp: '3d ago',
      unread: 0,
      isPinned: false,
      counselors: ['Dr. Meron', 'Nurse Hanan'],
    },
    {
      id: 4,
      recipient: {
        name: 'Crisis Support',
        role: '24/7 Emergency',
        isVerified: true,
        isOnline: true,
        avatar: 'CS',
        specialization: 'Immediate Crisis Response',
      },
      lastMessage: "We're available 24/7 for urgent support",
      timestamp: '5d ago',
      unread: 0,
      isPinned: false,
      counselors: ['Crisis Team Alpha', 'Crisis Team Beta'],
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'counselor',
      content:
        "Hello, I'm Alem. I'll be supporting you through this process. How are you feeling today?",
      timestamp: '10:30 AM',
      isRead: true,
    },
    {
      id: 2,
      sender: 'user',
      content:
        "I'm feeling a bit nervous but also relieved to have someone to talk to.",
      timestamp: '10:32 AM',
      isRead: true,
    },
    {
      id: 3,
      sender: 'counselor',
      content:
        "That's completely understandable. It takes courage to reach out. Remember, this is a safe space and you can share at your own pace.",
      timestamp: '10:33 AM',
      isRead: true,
    },
    {
      id: 4,
      sender: 'counselor',
      content:
        "I'm here to listen whenever you're ready to talk. There's no pressure to share anything you're not comfortable with.",
      timestamp: '12:45 PM',
      isRead: false,
    },
  ];

  const activeConversation = conversations.find((c) => c.id === selectedChat);

  return (
    <div className="min-h-screen dark:bg-slate-900" style={{ backgroundColor: 'var(--role-survivor-bg)' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid h-[calc(100vh-120px)] grid-cols-12 gap-4">
          {/* Support Team List - Left Sidebar */}
          <Card className="col-span-12 flex flex-col overflow-hidden shadow-sm lg:col-span-4">
            <CardContent className="flex h-full flex-col p-0">
              {/* Search Bar */}
              <div className="border-b border-slate-200 p-4 dark:border-slate-700">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                  <Input
                    placeholder="Search support team..."
                    className="bg-slate-50 pl-10 dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Support Team Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`cursor-pointer border-b border-slate-200 p-4 transition-colors dark:border-slate-700 ${
                      selectedChat === conv.id
                        ? 'border-l-4 bg-opacity-10 dark:bg-opacity-20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    style={selectedChat === conv.id ? {
                      borderLeftColor: 'var(--role-survivor-primary)',
                      backgroundColor: 'rgba(var(--role-survivor-primary-rgb), 0.1)'
                    } : undefined}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600 text-sm font-medium text-white dark:bg-slate-500">
                          {conv.recipient.avatar}
                        </div>
                        {conv.recipient.isOnline && (
                          <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-800"></div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-medium text-slate-900 dark:text-white">
                              {conv.recipient.name}
                            </h3>
                            {conv.recipient.isVerified && (
                              <UserCheck className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                          {conv.unread > 0 && (
                            <Badge className="h-4 px-1.5 text-xs text-white" style={{ backgroundColor: 'var(--role-survivor-primary)' }}>
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="mb-1 text-xs text-slate-500">
                          {conv.recipient.specialization}
                        </p>
                        <p className="mb-1 truncate text-sm text-slate-600 dark:text-slate-300">
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-400">
                            {conv.timestamp}
                          </p>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              {conv.counselors.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Support */}
              <div className="border-t border-slate-200 p-4 dark:border-slate-700">
                <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Emergency Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chat Area - Right Side */}
          <Card className="col-span-12 flex flex-col overflow-hidden shadow-sm lg:col-span-8">
            {/* Chat Header */}
            <div className="border-b border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600 text-sm font-medium text-white dark:bg-slate-500">
                      {activeConversation?.recipient.avatar}
                    </div>
                    {activeConversation?.recipient.isOnline && (
                      <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-800"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-medium text-slate-900 dark:text-white">
                        {activeConversation?.recipient.name}
                      </h2>
                      {activeConversation?.recipient.isVerified && (
                        <UserCheck className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-slate-500">
                      {activeConversation?.recipient.isOnline
                        ? 'Available now'
                        : 'Will respond soon'}{' '}
                      • {activeConversation?.counselors.length} counselors
                      assigned
                    </p>
                  </div>
                </div>

                <Badge className="border-green-200 bg-green-100 text-green-700">
                  <Shield className="mr-1 h-3 w-3" />
                  Secure
                </Badge>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {/* Date Divider */}
              <div className="flex items-center justify-center">
                <Badge variant="outline" className="text-slate-500">
                  Today
                </Badge>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}
                  >
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'border border-slate-300 text-slate-900 dark:border-slate-600 dark:text-white'
                          : 'border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div
                      className={`mt-1 flex items-center gap-2 px-2 ${
                        message.sender === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <span className="text-xs text-slate-400">
                        {message.timestamp}
                      </span>
                      {message.sender === 'user' && (
                        <CheckCheck
                          className={`h-3 w-3 ${message.isRead ? '' : 'text-slate-400'}`}
                          style={message.isRead ? { color: 'var(--role-survivor-primary)' } : undefined}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <div className="flex justify-start">
                <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-end gap-3">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1">
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="max-h-32 min-h-[40px] resize-none"
                    rows={1}
                  />
                </div>

                <Button
                  size="icon"
                  className="flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--role-survivor-primary)',
                    '--tw-ring-color': 'var(--role-survivor-primary)'
                  }}
                  className="hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 flex items-center justify-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>End-to-end encrypted</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Auto-delete in 30 days</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
