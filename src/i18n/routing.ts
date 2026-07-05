import { defineRouting } from 'next-intl/routing'

import appConfig, { LanguageCode, LANGUAGE_LIST } from '@/config/app.config'

const configuredLocales = LANGUAGE_LIST.map((language) => language.code) as [
    LanguageCode,
    ...LanguageCode[],
]

const enabledLocales = (
    appConfig.language.isEnable
        ? appConfig.language.available
        : [appConfig.language.default]
) as [LanguageCode, ...LanguageCode[]]

export type SupportLanguages = LanguageCode

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: enabledLocales,

    // Used when no locale matches
    defaultLocale: appConfig.language.default,

    // Optional: Define path patterns for locale detection
    localePrefix:
        appConfig.language.isEnable && appConfig.language.useUrl
            ? 'always'
            : 'never',

    // Optional: Define alternate domains for locales (if needed)
    // domains: [
    //     {
    //         domain: 'example.com',
    //         defaultLocale: 'en'
    //     },
    //     {
    //         domain: 'example.vn',
    //         defaultLocale: 'vi'
    //     }
    // ]
})

// Export the locales array for use in middleware
export const locales = routing.locales
export const defaultLocale = routing.defaultLocale

// Helper function to check if a locale is supported
export function isValidLocale(locale: string): locale is SupportLanguages {
    return (locales as readonly string[]).includes(locale)
}

export function isConfiguredLocale(locale: string): locale is SupportLanguages {
    return (configuredLocales as readonly string[]).includes(locale)
}

// Helper function to get locale from pathname
export function getLocaleFromPathname(
    pathname: string
): SupportLanguages | null {
    const segments = pathname.split('/')
    const potentialLocale = segments[1]

    if (potentialLocale && isValidLocale(potentialLocale)) {
        return potentialLocale
    }

    return null
}

export function getConfiguredLocaleFromPathname(
    pathname: string
): SupportLanguages | null {
    const segments = pathname.split('/')
    const potentialLocale = segments[1]

    if (potentialLocale && isConfiguredLocale(potentialLocale)) {
        return potentialLocale
    }

    return null
}

// Helper function to remove locale from pathname
export function removeLocaleFromPathname(pathname: string): string {
    const locale = getConfiguredLocaleFromPathname(pathname)
    if (locale) {
        return pathname.slice(`/${locale}`.length) || '/'
    }
    return pathname
}
