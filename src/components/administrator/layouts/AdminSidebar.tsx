'use client'

import {
    Button,
    Dropdown,
    ListBox,
    Select,
    Separator,
} from '@heroui/react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import {
    BarChart2,
    Bell,
    ChevronDown,
    CreditCard,
    FileText,
    FolderOpen,
    HelpCircle,
    Home,
    LogOut,
    Mail,
    Monitor,
    Moon,
    Settings,
    Sun,
    Users,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'
import { INTERNAL_URLS } from '../../../lib'
import Logo from '../../../shared/components/Logo'

const navGroups = [
    {
        title: 'Overview',
        items: [
            { name: 'Home', href: INTERNAL_URLS.admin.dashboard, icon: Home },
            {
                name: 'Posts',
                href: INTERNAL_URLS.admin.management.posts,
                icon: FileText,
            },
            {
                name: 'Our services',
                href: INTERNAL_URLS.admin.management.services.all,
                icon: FolderOpen,
            },
        ],
    },
    {
        title: 'Commerce & Users',
        items: [
            { name: 'Customers', href: '/dashboard/customers', icon: Users },
            { name: 'Payouts', href: '/dashboard/payouts', icon: CreditCard },
            {
                name: 'Analytics',
                href: '/dashboard/analytics',
                icon: BarChart2,
            },
        ],
    },
    {
        title: 'Communication',
        items: [
            {
                name: 'Email',
                href: INTERNAL_URLS.admin.management.email,
                icon: Mail,
            },
        ],
    },
]

export default function AdminSidebar() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate({ to: '/login' })
    }

    return (
        <aside className="w-64 bg-[#0B0F19] text-slate-400 flex flex-col h-full overflow-y-auto">
            <div className="w-full flex items-center justify-start">
                <Logo
                    classNames={{
                        root: 'py-3 flex items-center justify-start pl-6',
                        logo: 'w-24',
                    }}
                    logoTheme="white"
                />
                <div className="ml-2">
                    <p className="text-2xl font-saira text-white">CMS</p>
                    <div className="w-full h-0.5 bg-white" />
                </div>
            </div>

            <Separator className="bg-border/30" />

            <div className="px-4 py-5 flex items-center justify-between gap-2 border-b border-white/5">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="flex-1 flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/50 transition-colors text-left outline-none">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                AD
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">
                                    Admin
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    Administrator
                                </p>
                            </div>
                            <ChevronDown
                                size={14}
                                className="text-slate-500 shrink-0"
                            />
                        </button>
                    </Dropdown.Trigger>

                    <Dropdown.Popover>
                        <Dropdown.Menu aria-label="User Actions">
                            <Dropdown.Item id="theme" className="cursor-default py-2">
                                <div className="flex items-center justify-between w-full gap-2">
                                    <span className="text-slate-600 text-xs font-medium">Theme</span>
                                    <Select defaultSelectedKey="system" className="w-[120px]">
                                        <Select.Trigger className="w-[120px] bg-default-100 shadow-none">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="light">
                                                    <Sun size={14} className="mr-1 inline" /> Light
                                                </ListBox.Item>
                                                <ListBox.Item id="dark">
                                                    <Moon size={14} className="mr-1 inline" /> Dark
                                                </ListBox.Item>
                                                <ListBox.Item id="system">
                                                    <Monitor size={14} className="mr-1 inline" /> System
                                                </ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item
                                id="logout"
                                className="text-danger mt-1"
                                onPress={handleLogout}
                            >
                                <LogOut size={16} className="mr-2 inline" />
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>

                <Button
                    isIconOnly
                    variant="ghost"
                    className="text-slate-400 hover:text-white shrink-0 relative"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0F19]"></span>
                </Button>
            </div>

            <nav className="flex-1 px-4 pt-6 pb-4 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.title} className="space-y-1">
                        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            {group.title}
                        </h3>
                        {group.items.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-slate-800 text-white font-medium'
                                            : 'hover:bg-slate-800/50 hover:text-white'
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        className={isActive ? 'text-blue-400' : ''}
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>
                ))}
            </nav>

            <div className="p-4 space-y-1 mt-auto border-t border-slate-800/50">
                <button
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors"
                >
                    <Settings size={18} /> Settings
                </button>
                <button
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors"
                >
                    <HelpCircle size={18} /> Help
                </button>
            </div>
        </aside>
    )
}
