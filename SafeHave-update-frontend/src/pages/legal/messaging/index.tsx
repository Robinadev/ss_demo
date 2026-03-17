import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Inbox, Send, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messaging = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Messaging</h1>
        <p className="text-muted-foreground">
          Communicate securely with clients, colleagues, and court officials.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Inbox */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              View received messages.
            </p>
            <Link to="/legal/messaging/inbox">
              <Button className="w-full" variant="outline">
                Open Inbox
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Threads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              View conversation threads.
            </p>
            <Link to="/legal/messaging/message-thread">
              <Button className="w-full" variant="outline">
                View Threads
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Composer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Compose Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Send new messages.
            </p>
            <Link to="/legal/messaging/message-composer">
              <Button className="w-full" variant="outline">
                Compose
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              Attachments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Manage message attachments.
            </p>
            <Link to="/legal/messaging/attachments">
              <Button className="w-full" variant="outline">
                View Attachments
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xs font-medium">JD</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Jane Doe</h4>
                <p className="text-muted-foreground text-sm">
                  Updated case documents are ready for review...
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <span className="text-xs font-medium">MG</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Maria Garcia</h4>
                <p className="text-muted-foreground text-sm">
                  Thank you for the consultation. When is our next meeting?
                </p>
                <p className="text-muted-foreground mt-1 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messaging;
