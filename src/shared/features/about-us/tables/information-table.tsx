import React from 'react'

import { useLocale } from 'next-intl'

import { Link } from '@/i18n/navigation'
import {
    ABOUT_CADSQUAD_INFO,
    VI_ABOUT_CADSQUAD_INFO,
} from '@/shared/constants/companyTable'

export default function InformationTable() {
    const locale = useLocale()

    const aboutCadsquadInfo =
        locale === 'vi' ? VI_ABOUT_CADSQUAD_INFO : ABOUT_CADSQUAD_INFO

    return (
        <table className="w-full border border-gray-300 shadow-md text-sm lg:text-base">
            <tbody>
                {aboutCadsquadInfo.map((item, index) => {
                    return (
                        <tr
                            key={item.title + index}
                            className="grid grid-cols-[100px_1fr] items-center lg:grid-cols-[360px_1fr] last:border-none border-b border-[#dee2e6a1]"
                        >
                            <th className="h-full text-left px-4 py-2 lg:py-5 lg:px-10 font-semibold uppercase align-middle bg-[#f6f6f6]">
                                {item.title}
                            </th>
                            <td className="h-full px-4 py-2 lg:px-8 lg:py-5">
                                {item.value && (
                                    <p className="tracking-wide align-middle">
                                        {item.value}
                                    </p>
                                )}
                                {item.values && (
                                    <ul className="ml-8 space-y-2 list-disc">
                                        {item.values?.map((item, index) => {
                                            return (
                                                <li
                                                    key={item.value + index}
                                                    className="tracking-wide"
                                                >
                                                    <Link
                                                        href={`/cad-services/${item.href}`}
                                                        title={item.value}
                                                        className="block transition duration-200 hover:underline underline-offset-2"
                                                    >
                                                        {item.value}
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
