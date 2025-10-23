"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { user } from "@/lib/data"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { findImage } from "@/lib/placeholder-images"

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
    return (
        <div className="flex items-center gap-3 p-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar?.imageUrl} alt={userAvatar?.description} data-ai-hint={userAvatar?.imageHint} />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-semibold text-sidebar-primary">{user.fullName}</span>
                <span className="text-sidebar-foreground/80">{user.email}</span>
            </div>
        </div>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname.startsWith('/dashboard/transactions')) return 'Transactions';
    if (pathname.startsWith('/dashboard/transfers')) return 'Transfers';
    if (pathname.startsWith('/dashboard/deposit')) return 'Deposit';
    if (pathname.startsWith('/dashboard/history')) return 'History';
    if (pathname.startsWith('/dashboard/cards')) return 'Cards';
    if (pathname.startsWith('/dashboard/statements')) return 'Statements';
    if (pathname.startsWith('/dashboard/settings')) return 'Settings';
    return 'Dashboard';
  }
  
  const getPageDescription = () => {
      if (pathname === '/dashboard') return "A snapshot of your financial health.";
      if (pathname.startsWith('/dashboard/transactions')) return 'View, search, and filter all your transactions.';
      if (pathname.startsWith('/dashboard/transfers')) return 'Move money securely between your accounts or to others.';
      if (pathname.startsWith('/dashboard/deposit')) return 'Deposit checks by uploading an image. Powered by AI.';
      if (pathname.startsWith('/dashboard/history')) return 'Review your detailed transaction history.';
      if (pathname.startsWith('/dashboard/cards')) return 'Manage your debit and credit cards.';
      if (pathname.startsWith('/dashboard/statements')) return 'Access and download your monthly statements.';
      if (pathname.startsWith('/dashboard/settings')) return 'Manage your account settings and personal information.';
      return 'A snapshot of your financial health.';
  }

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
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border">
            <UserProfile />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-20 items-center justify-between bg-background px-4 md:px-6">
             <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <div>
                    <h1 className="text-2xl font-bold font-headline">{getPageTitle()}</h1>
                    <p className="text-muted-foreground">{getPageDescription()}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
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
