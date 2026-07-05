'use client'

import React, { useEffect, useState } from 'react'

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@heroui/react'
import { Icon, addCollection } from '@iconify/react'
import { PressEvent } from '@react-types/shared'
import { ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

import { AppLanguage, LANGUAGE_LIST } from '@/config/app.config'
import { FLAG_ICONS } from '@/config/flag-icons'
import { useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

// Register the offline flag icons once so <Icon icon="flagpack:vn" /> resolves
// without hitting the Iconify API at runtime.
addCollection(FLAG_ICONS)

export default function ChangeLanguage() {
    const locale = useLocale()
    const getPathname = usePathname().slice(1)
    const router = useRouter()

    const [currentLanguage, setCurrentLanguage] = useState<AppLanguage | null>(
        null
    )

    const onChangeLanguage = (event: PressEvent) => {
        const locale = (event.target as HTMLElement).dataset.key

        const hasLocale = routing.locales.some((locale) =>
            getPathname.startsWith(locale)
        )
        const pathname = hasLocale
            ? '/' + getPathname.split('/').slice(1).join('/')
            : '/' + getPathname

        router.push(pathname, { locale })
    }

    useEffect(() => {
        const findLanguage = LANGUAGE_LIST.find((lang) => lang.code === locale)
        setCurrentLanguage(findLanguage ?? null)
    }, [locale])

    return (
        <Dropdown>
            <DropdownTrigger className="p-0">
                <Button
                    variant="bordered"
                    className="rounded-xl"
                    endContent={<ChevronDown size={15} />}
                >
                    {currentLanguage && (
                        <Icon
                            icon={currentLanguage.flag}
                            width={24}
                            height={24}
                            className="w-6"
                            aria-label={currentLanguage.name}
                        />
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                {LANGUAGE_LIST.map((lang) => (
                    <DropdownItem key={lang.code} onPress={onChangeLanguage}>
                        <div className="flex items-center justify-start gap-3">
                            <Icon
                                icon={lang.flag}
                                width={24}
                                height={24}
                                className="w-6"
                                aria-label={lang.name}
                            />
                            <p>{lang.name}</p>
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
