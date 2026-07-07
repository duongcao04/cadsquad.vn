import React from 'react'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { ABOUT_CADSQUAD_INFO } from '@/shared/constants/company-table'

export default function InformationTable() {
    const t = useTranslations('landing.aboutUs.companyInfo')

    return (
        <table className="w-full text-xs border border-gray-300 shadow-md sm:text-sm lg:text-base">
            <tbody>
                {ABOUT_CADSQUAD_INFO.map((row) => {
                    return (
                        <tr
                            key={row.key}
                            className="grid grid-cols-[110px_1fr] items-center sm:grid-cols-[180px_1fr] lg:grid-cols-[360px_1fr] last:border-none border-b border-[#dee2e6a1]"
                        >
                            <th className="h-full text-left px-3 py-3 sm:px-4 lg:py-5 lg:px-10 font-semibold uppercase align-middle break-words bg-[#f6f6f6]">
                                {t(`${row.key}.label`)}
                            </th>
                            <td className="h-full px-3 py-3 sm:px-4 lg:px-8 lg:py-5">
                                {!row.items && (
                                    <p className="align-middle tracking-wide break-words">
                                        {t(`${row.key}.value`)}
                                    </p>
                                )}
                                {row.items && (
                                    <ul className="ml-4 space-y-1.5 list-disc sm:ml-6 sm:space-y-2 lg:ml-8">
                                        {row.items.map((item) => {
                                            const value = t(
                                                `${row.key}.items.${item.key}`
                                            )
                                            return (
                                                <li
                                                    key={item.key}
                                                    className="tracking-wide break-words"
                                                >
                                                    <Link
                                                        href={`/${item.href}`}
                                                        title={value}
                                                        className="inline-block transition duration-200 hover:underline underline-offset-2"
                                                    >
                                                        {value}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
