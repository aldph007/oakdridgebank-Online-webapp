
'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { notifications as allNotifications, type Notification } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MailOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';

function PinIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M20.33 3.67a1.48 1.48 0 0 0-2.09 0l-9.47 9.47-1.7-1.7a1.48 1.48 0 0 0-2.09 2.09l1.7 1.7-3.92 3.92a1.48 1.48 0 0 0 2.09 2.09l3.92-3.92 1.7 1.7a1.48 1.48 0 0 0 2.09-2.09l-1.7-1.7 9.47-9.47a1.48 1.48 0 0 0 0-2.09z" />
            <path d="m13.26 3.19-2.45 2.45 2.09 2.09 2.45-2.45a.74.74 0 0 0-2.09-2.09z" />
        </svg>
    );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [displayNotifications, setDisplayNotifications] = useState<DisplayNotification[]>([]);

  useEffect(() => {
    // Format dates on the client to avoid hydration mismatch
    const sorted = [...notifications].sort((a, b) => {
        if (a.id === 'n4') return -1; // Pinned to top
        if (b.id === 'n4') return 1;
        if (a.id === 'n6') return -1; // Then pending
        if (b.id === 'n6') return 1;
        return parseISO(b.date).getTime() - parseISO(a.date).getTime();
    });

    setDisplayNotifications(
      sorted.map(n => ({
        ...n,
        formattedDate: format(parseISO(n.date), "MMM d, yyyy 'at' h:mm a")
      }))
    );
  }, [notifications]);


  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline flex items-center gap-2">
            <Bell className="h-6 w-6" />
            All Notifications
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {displayNotifications.length > 0 ? (
             <Accordion type="multiple" className="w-full">
                {displayNotifications.map((notification) => (
                    <AccordionItem key={notification.id} value={notification.id}>
                        <AccordionTrigger
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 rounded-lg transition-colors hover:bg-muted/50 ${!notification.read ? 'bg-muted/50' : ''}`}
                        >
                            <div className="flex items-center gap-4 w-full">
                                {notification.id === 'n4' ? (
                                    <PinIcon className="h-5 w-5 text-destructive" />
                                ) : notification.read ? (
                                    <MailOpen className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                    <Mail className="h-5 w-5 text-primary" />
                                )}
                                <div className="flex-1 text-left">
                                    <p className={`font-semibold ${!notification.read ? 'text-primary' : ''} ${notification.id === 'n4' || notification.id === 'n6' ? 'font-bold' : ''}`}>
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.formattedDate}
                                    </p>
                                </div>
                                {notification.id === 'n4' && (
                                    <Badge variant="destructive">Important</Badge>
                                )}
                                {notification.id === 'n6' && (
                                    <Badge variant="warning">Action Required</Badge>
                                )}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className={`p-4 pt-0 text-sm text-muted-foreground whitespace-pre-wrap ${notification.id === 'n4' || notification.id === 'n6' ? 'font-medium text-foreground' : ''}`}>
                             {(notification.id === 'n4' || notification.id === 'n6') && (
                                <p className="text-destructive font-bold mb-2">Disclaimer: Important Notice</p>
                            )}
                            {notification.description}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold">No notifications yet</h3>
              <p>We'll let you know when there's something new.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
