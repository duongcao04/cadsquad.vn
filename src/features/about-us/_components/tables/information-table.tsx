import React from 'react'

import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { ABOUT_CADSQUAD_INFO } from '@/shared/constants/company-table'

export default function InformationTable() {
    const t = useTranslations('landing.aboutUs.companyInfo')

    return (
        <table className="w-full border border-gray-300 shadow-md text-sm lg:text-base">
            <tbody>
                {ABOUT_CADSQUAD_INFO.map((row) => {
                    return (
                        <tr
                            key={row.key}
                            className="grid grid-cols-[100px_1fr] items-center lg:grid-cols-[360px_1fr] last:border-none border-b border-[#dee2e6a1]"
                        >
                            <th className="h-full text-left px-4 py-2 lg:py-5 lg:px-10 font-semibold uppercase align-middle bg-[#f6f6f6]">
                                {t(`${row.key}.label`)}
                            </th>
                            <td className="h-full px-4 py-2 lg:px-8 lg:py-5">
                                {!row.items && (
                                    <p className="tracking-wide align-middle">
                                        {t(`${row.key}.value`)}
                                    </p>
                                )}
                                {row.items && (
                                    <ul className="ml-8 space-y-2 list-disc">
                                        {row.items.map((item) => {
                                            const value = t(
                                                `${row.key}.items.${item.key}`
                                            )
                                            return (
                                                <li
                                                    key={item.key}
                                                    className="tracking-wide"
                                                >
                                                    <Link
                                                        href={`/cad-services/${item.href}`}
                                                        title={value}
                                                        className="block transition duration-200 hover:underline underline-offset-2"
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
