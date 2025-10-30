

"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ArrowRightLeft,
  Bell,
  CreditCard,
  LayoutDashboard,
  Landmark,
  Settings,
  Upload,
  History,
  FileText,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { user, notifications } from "@/lib/data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { findImage } from "@/lib/placeholder-images"
import { DarkModeToggle } from "@/components/dark-mode-toggle"

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <Landmark className="h-7 w-7 text-sidebar-primary" />
      <h1 className="text-xl font-bold font-headline text-white whitespace-nowrap">
        OAKridgebank
      </h1>
    </Link>
  )
}

function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))


  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={{ children: <>{children}</>, side: "right", align: "center" }}
      >
        <Link href={href}>
          <Icon />
          <span>{children}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function UserProfile() {
    const userAvatar = findImage("user-avatar-1");
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return names[0].substring(0, 2).toUpperCase();
    }

    return (
        <div className="flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar?.imageUrl} alt={userAvatar?.description} data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold text-sidebar-primary">{user.fullName}</span>
                <span className="text-sidebar-foreground/80">{user.email}</span>
            </div>
        </div>
    )
}

function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Button variant="ghost" size="icon" className="rounded-full relative" asChild>
      <Link href="/dashboard/notifications">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
            {unreadCount}
          </span>
        )}
        <span className="sr-only">View notifications</span>
      </Link>
    </Button>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname.startsWith('/dashboard/transfers')) return 'Transfers';
    if (pathname.startsWith('/dashboard/deposit')) return 'Deposit';
    if (pathname.startsWith('/dashboard/history')) return 'History';
    if (pathname.startsWith('/dashboard/cards')) return 'Cards';
    if (pathname.startsWith('/dashboard/statements')) return 'Statements';
    if (pathname.startsWith('/dashboard/settings')) return 'Settings';
    if (pathname.startsWith('/dashboard/notifications')) return 'Notifications';
    return 'Dashboard';
  }
  
  const getPageDescription = () => {
      if (pathname === '/dashboard') return "A snapshot of your financial health.";
      if (pathname.startsWith('/dashboard/transfers')) return 'Move money securely between your accounts or to others.';
      if (pathname.startsWith('/dashboard/deposit')) return 'Deposit checks by uploading an image. Powered by AI.';
      if (pathname.startsWith('/dashboard/history')) return 'Review your detailed transaction history.';
      if (pathname.startsWith('/dashboard/cards')) return 'Manage your debit and credit cards.';
      if (pathname.startsWith('/dashboard/statements')) return 'Access and download your monthly statements.';
      if (pathname.startsWith('/dashboard/settings')) return 'Manage your account settings and personal information.';
      if (pathname.startsWith('/dashboard/notifications')) return 'View your account alerts and updates.';
      return 'A snapshot of your financial health.';
  }

  const handleLogout = () => {
    // In a real app, you'd clear session/token here
    router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar variant="sidebar" collapsible="icon" className="bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="items-center justify-between p-4">
            <Logo />
            <SidebarTrigger className="hidden text-sidebar-foreground group-data-[collapsible=icon]:flex" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <NavItem href="/dashboard" icon={LayoutDashboard}>
                Dashboard
              </NavItem>
              <NavItem href="/dashboard/transfers" icon={ArrowRightLeft}>
                Transfers
              </NavItem>
              <NavItem href="/dashboard/deposit" icon={Upload}>
                Deposits
              </NavItem>
              <NavItem href="/dashboard/history" icon={History}>
                History
              </NavItem>
              <NavItem href="/dashboard/cards" icon={CreditCard}>
                Cards
              </NavItem>
              <NavItem href="/dashboard/statements" icon={FileText}>
                Statements
              </NavItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip={{ children: "Log Out", side: "right", align: "center" }}
                >
                  <LogOut />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border">
            <UserProfile />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-20 items-center justify-between bg-background px-4 md:px-6">
             <div className="flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8 md:hidden" />
                <div>
                    <h1 className="text-2xl font-bold font-headline">{getPageTitle()}</h1>
                    <p className="text-muted-foreground">{getPageDescription()}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
              <Notifications />
              <DarkModeToggle />
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-0">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
