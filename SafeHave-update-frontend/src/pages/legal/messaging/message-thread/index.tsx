import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Reply, Paperclip } from 'lucide-react';

const MessageThread = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Message Thread</h1>
        <p className="text-muted-foreground">
          Conversation with Jane Doe regarding Case #2024-001.
        </p>
      </div>

      {/* Thread Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Jane Doe</CardTitle>
              <p className="text-muted-foreground text-sm">
                Case #2024-001 - Protection Order
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <div className="mb-6 space-y-4">
        {/* Received Message */}
        <div className="flex gap-3">
          <Avatar className="mt-1">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium">Jane Doe</span>
                  <span className="text-muted-foreground text-sm">
                    2 hours ago
                  </span>
                </div>
                <p className="text-sm">
                  Hi Sarah, I wanted to update you on the status of my
                  protection order case. The hearing is scheduled for next week,
                  and I'm feeling nervous about it. Can you walk me through what
                  I should expect during the hearing?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex justify-end gap-3">
          <div className="max-w-[70%] flex-1">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-end gap-2">
                  <span className="text-muted-foreground text-sm">
                    1 hour ago
                  </span>
                  <span className="font-medium">You</span>
                </div>
                <p className="text-sm">
                  Hi Jane, I understand this can be stressful. During the
                  hearing, the judge will review the evidence and listen to both
                  sides. You don't need to present anything - your attorney will
                  handle that. Just be honest and calm. I'll be there to support
                  you.
                </p>
              </CardContent>
            </Card>
          </div>
          <Avatar className="mt-1">
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>

        {/* Received Message */}
        <div className="flex gap-3">
          <Avatar className="mt-1">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium">Jane Doe</span>
                  <span className="text-muted-foreground text-sm">
                    30 minutes ago
                  </span>
                </div>
                <p className="text-sm">
                  Thank you for the reassurance. What should I wear to court?
                  And should I bring any documents with me?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex justify-end gap-3">
          <div className="max-w-[70%] flex-1">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-end gap-2">
                  <span className="text-muted-foreground text-sm">
                    15 minutes ago
                  </span>
                  <span className="font-medium">You</span>
                </div>
                <p className="text-sm">
                  Dress conservatively and professionally. You don't need to
                  bring any documents - we have everything. Just bring a valid
                  ID. We'll meet at the courthouse 30 minutes before the
                  hearing.
                </p>
              </CardContent>
            </Card>
          </div>
          <Avatar className="mt-1">
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Reply Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Reply className="h-5 w-5" />
            Reply to Jane Doe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Type your reply..." rows={4} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="mr-2 h-4 w-4" />
                Attach File
              </Button>
              <span className="text-muted-foreground text-sm">
                Attach documents or evidence
              </span>
            </div>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageThread;
