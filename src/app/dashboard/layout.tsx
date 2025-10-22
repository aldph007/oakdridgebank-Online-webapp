"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowRightLeft,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Landmark,
  Settings,
  Wallet,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { findImage } from "@/lib/placeholder-images"

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <Landmark className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold font-headline text-primary whitespace-nowrap">
        OAKridgebank
      </h1>
    </Link>
  )
}

function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const userAvatar = findImage("user-avatar-1");

  const getPageTitle = () => {
    switch (pathname) {
        case '/dashboard':
            return 'Overview';
        case '/dashboard/transactions':
            return 'Transactions';
        case '/dashboard/transfers':
            return 'Transfers';
        case '/dashboard/deposit':
            return 'Deposit';
        case '/dashboard/settings':
            return 'Settings';
        default:
            return 'Dashboard';
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="items-center justify-between">
            <Logo />
            <SidebarTrigger className="hidden group-data-[collapsible=icon]:flex" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <NavItem href="/dashboard" icon={LayoutDashboard}>
                Overview
              </NavItem>
              <NavItem href="/dashboard/transactions" icon={Wallet}>
                Transactions
              </NavItem>
              <NavItem href="/dashboard/transfers" icon={ArrowRightLeft}>
                Transfers
              </NavItem>
              <NavItem href="/dashboard/deposit" icon={Upload}>
                Deposit
              </NavItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <NavItem href="/dashboard/settings" icon={Settings}>
                    Settings
                </NavItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 sticky top-0 z-30">
             <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold font-headline">{getPageTitle()}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 rounded-full p-1 h-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar?.imageUrl} alt={userAvatar?.description} data-ai-hint={userAvatar?.imageHint} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-muted-foreground">john.doe@example.com</span>
                    </div>
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/dashboard/settings">Settings</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
