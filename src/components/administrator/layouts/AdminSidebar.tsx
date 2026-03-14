'use client'

import {
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
} from '@heroui/react'
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
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { INTERNAL_URLS } from '../../../lib'
import Logo from '../../../shared/components/Logo'

// 1. Refactor into grouped sections
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
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-[#0B0F19] text-slate-400 flex flex-col h-full overflow-y-auto">
            {/* Logo Area */}
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

            <Divider className="bg-border/30" />

            {/* User Profile & Notifications Section */}
            <div className="px-4 py-5 flex items-center justify-between gap-2 border-b border-white/5">
                <Dropdown
                    placement="bottom-start"
                    classNames={{ content: 'min-w-[200px]' }}
                >
                    <DropdownTrigger>
                        <button className="flex-1 flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-slate-800/50 transition-colors text-left outline-none">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                JD
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">
                                    John Doe
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    Admin
                                </p>
                            </div>
                            <ChevronDown
                                size={14}
                                className="text-slate-500 shrink-0"
                            />
                        </button>
                    </DropdownTrigger>

                    <DropdownMenu aria-label="User Actions" variant="flat">
                        {/* Theme Selector Item */}
                        <DropdownItem
                            key="theme"
                            isReadOnly
                            className="cursor-default py-2"
                        >
                            <Select
                                size="sm"
                                label="Theme"
                                labelPlacement="outside-left"
                                defaultSelectedKeys={['system']}
                                classNames={{
                                    base: 'items-center justify-between w-full',
                                    label: 'text-slate-600 text-xs font-medium',
                                    trigger:
                                        'w-[100px] shadow-none bg-default-100',
                                }}
                            >
                                <SelectItem
                                    key="light"
                                    startContent={<Sun size={14} />}
                                >
                                    Light
                                </SelectItem>
                                <SelectItem
                                    key="dark"
                                    startContent={<Moon size={14} />}
                                >
                                    Dark
                                </SelectItem>
                                <SelectItem
                                    key="system"
                                    startContent={<Monitor size={14} />}
                                >
                                    System
                                </SelectItem>
                            </Select>
                        </DropdownItem>

                        {/* Logout Item */}
                        <DropdownItem
                            key="logout"
                            color="danger"
                            className="text-danger mt-1"
                            startContent={<LogOut size={16} />}
                        >
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                {/* Notification Bell */}
                <Button
                    isIconOnly
                    variant="light"
                    className="text-slate-400 hover:text-white shrink-0 relative"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    {/* Optional: Red notification dot */}
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0F19]"></span>
                </Button>
            </div>

            {/* Main Navigation with Groups */}
            <nav className="flex-1 px-4 pt-6 pb-4 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.title} className="space-y-1">
                        {/* Section Header */}
                        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            {group.title}
                        </h3>

                        {/* Section Items */}
                        {group.items.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-slate-800 text-white font-medium'
                                            : 'hover:bg-slate-800/50 hover:text-white'
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        className={
                                            isActive ? 'text-blue-400' : ''
                                        }
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </div>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 space-y-1 mt-auto border-t border-slate-800/50">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors"
                >
                    <Settings size={18} /> Settings
                </Link>
                <Link
                    href="/dashboard/help"
                    className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 hover:text-white rounded-lg transition-colors"
                >
                    <HelpCircle size={18} /> Help
                </Link>
            </div>
        </aside>
    )
}
