
'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { notifications as allNotifications } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Mail, MailOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);

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
          {notifications.length > 0 ? (
             <Accordion type="multiple" className="w-full">
                {notifications.map((notification) => (
                    <AccordionItem key={notification.id} value={notification.id}>
                        <AccordionTrigger
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 rounded-lg transition-colors hover:bg-muted/50 ${!notification.read ? 'bg-muted/50' : ''}`}
                        >
                            <div className="flex items-center gap-4 w-full">
                                {notification.read ? (
                                    <MailOpen className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                    <Mail className="h-5 w-5 text-primary" />
                                )}
                                <div className="flex-1 text-left">
                                    <p className={`font-semibold ${!notification.read ? 'text-primary' : ''}`}>
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {format(parseISO(notification.date), "MMM d, yyyy 'at' h:mm a")}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0 text-sm text-muted-foreground whitespace-pre-wrap">
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
