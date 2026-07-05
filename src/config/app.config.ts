/**
 * Application-level configuration.
 *
 * Single source of truth for supported languages. Multi-language content is
 * stored as an open locale-map (JSONB `{ [code]: string }`), so adding a new
 * language is just:
 *   1. add an entry to LANGUAGE_LIST below,
 *   2. add public/messages/<code>/*.json for the UI strings.
 * No database migration or schema change required.
 *
 * `default` is the fallback language used when a translation is missing
 * (currently English).
 */

export interface AppLanguage {
    code: string
    urlCode: string
    name: string
    flag: string
}

// NOTE: keep `as const` so `LanguageCode` stays a precise union.
export const LANGUAGE_LIST = [
    { code: 'en', urlCode: '/en', name: 'English', flag: 'flagpack:gb-ukm' },
    { code: 'vi', urlCode: '/vi', name: 'Tiếng Việt', flag: 'flagpack:vn' },
    // Add more languages here later, e.g.:
    // { code: 'fr', urlCode: '/fr', name: 'Français', flag: 'flagpack:fr' },
] as const

export type LanguageCode = (typeof LANGUAGE_LIST)[number]['code']

const appConfig = {
    language: {
        isEnable: true,
        useUrl: true,
        availableUrls: LANGUAGE_LIST.map((l) => l.urlCode),
        available: LANGUAGE_LIST.map((l) => l.code) as LanguageCode[],
        /** Fallback language for content + default URL locale. */
        default: 'en' as LanguageCode,
        list: LANGUAGE_LIST as readonly AppLanguage[],
    },
}

/** Convenience export: the fallback/default language code. */
export const defaultLanguage: LanguageCode = appConfig.language.default

/** All enabled language codes. */
export const availableLanguages = appConfig.language.available

export function isSupportedLanguage(code: string): code is LanguageCode {
    return (availableLanguages as string[]).includes(code)
}

export default appConfig