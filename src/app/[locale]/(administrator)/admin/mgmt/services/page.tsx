'use client'

import { useState } from 'react'

import { Button, Tab, Tabs } from '@heroui/react'
import { useSuspenseQueries } from '@tanstack/react-query'
import { Edit, FileText, Globe, Layers, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

import {
    AdminPageBody,
    AdminPageContainer,
    AdminPageHeading,
} from '@/components'
import { INTERNAL_URLS } from '@/lib'
import { serviceListOptions, serviceTypesListOptions } from '@/queires'

export default function ServicesListPage() {
    const [
        {
            data: { services },
        },
        {
            data: { serviceTypes },
        },
    ] = useSuspenseQueries({
        queries: [serviceListOptions, serviceTypesListOptions],
    })

    console.log(serviceTypes)

    // State to track which tab is currently active
    const [activeTab, setActiveTab] = useState('services')

    return (
        <AdminPageContainer>
            <AdminPageHeading
                title="Manage Our Services"
                description="View, edit, and organize your service offerings and their categories."
                actions={
                    activeTab === 'services' ? (
                        <Link
                            href={
                                INTERNAL_URLS.admin.management.services
                                    .createService
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                        >
                            <Plus size={16} /> Create Service
                        </Link>
                    ) : (
                        <Link
                            href={
                                INTERNAL_URLS.admin.management.services
                                    .createServiceType
                            }
                            className="flex items-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-sm font-medium shadow-sm"
                        >
                            <Plus size={16} /> Create Category
                        </Link>
                    )
                }
            />

            <AdminPageBody>
                {/* ========================================== */}
                {/* STATS CARDS SECTION */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">
                                Total Services
                            </p>
                            <h3 className="text-2xl font-bold text-slate-900">
                                {services.length}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                            <Layers size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">
                                Service Categories
                            </p>
                            <h3 className="text-2xl font-bold text-slate-900">
                                {serviceTypes.length}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                            <Globe size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">
                                Active Languages
                            </p>
                            <h3 className="text-2xl font-bold text-slate-900">
                                2{' '}
                                <span className="text-sm font-normal text-slate-400">
                                    / EN, VI
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* ========================================== */}
                {/* TABS FOR SWITCHING VIEWS */}
                {/* ========================================== */}
                <Tabs
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList:
                            'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                        tab: 'max-w-fit px-0 h-12',
                        cursor: 'w-full bg-blue-600',
                        tabContent:
                            'group-data-[selected=true]:text-blue-600 font-medium',
                    }}
                >
                    {/* TAB 1: SERVICES TABLE */}
                    <Tab key="services" title="All Services">
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-4 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="text-slate-500 bg-slate-50 border-b border-slate-200 font-medium">
                                    <tr>
                                        <th className="px-6 py-4 w-16">
                                            Order
                                        </th>
                                        <th className="px-6 py-4">
                                            Title (EN)
                                        </th>
                                        <th className="px-6 py-4">Slug</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {services.map((service) => {
                                        const enTranslation =
                                            service.translations.find(
                                                (t) => t.language === 'EN'
                                            )
                                        return (
                                            <tr
                                                key={service.id}
                                                className="hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-slate-500">
                                                    {service.orderNumber}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    {enTranslation?.title ||
                                                        'Untranslated'}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    /{enTranslation?.slug}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    <span className="px-2.5 py-1 bg-slate-100 rounded-full text-xs font-medium">
                                                        {service.serviceType
                                                            ?.code || 'None'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <div className="flex justify-end gap-3">
                                                            <Link
                                                                href={INTERNAL_URLS.admin.management.services.editService(
                                                                    service.id
                                                                )}
                                                            >
                                                                <Button
                                                                    isIconOnly
                                                                    variant="light"
                                                                >
                                                                    <Edit
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                isIconOnly
                                                                color="danger"
                                                                variant="light"
                                                            >
                                                                <Trash2
                                                                    size={16}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {services.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-slate-500"
                                            >
                                                No services found. Create one to
                                                get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Tab>

                    {/* TAB 2: SERVICE TYPES TABLE */}
                    <Tab key="types" title="Service Categories">
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mt-4 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="text-slate-500 bg-slate-50 border-b border-slate-200 font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Code</th>
                                        <th className="px-6 py-4">
                                            Display Name (EN)
                                        </th>
                                        <th className="px-6 py-4">
                                            Description
                                        </th>
                                        <th className="px-6 py-4">
                                            Services Linked
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {serviceTypes.map((type) => {
                                        const enTranslation =
                                            type.translations?.find(
                                                (t) => t.language === 'EN'
                                            )
                                        return (
                                            <tr
                                                key={type.id}
                                                className="hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-mono font-semibold tracking-wider">
                                                        {type.code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-900">
                                                    {enTranslation?.displayName ||
                                                        'Untranslated'}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 truncate max-w-xs">
                                                    {enTranslation?.description ||
                                                        'No description'}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 font-medium">
                                                    {type?.services.length || 0}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <Link
                                                            href={INTERNAL_URLS.admin.management.services.editServiceType(
                                                                type.id
                                                            )}
                                                        >
                                                            <Button
                                                                isIconOnly
                                                                variant="light"
                                                            >
                                                                <Edit
                                                                    size={16}
                                                                />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            isIconOnly
                                                            color="danger"
                                                            variant="light"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {serviceTypes.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-slate-500"
                                            >
                                                No service categories found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                </Tabs>
            </AdminPageBody>
        </AdminPageContainer>
    )
}
