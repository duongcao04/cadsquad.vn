import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import appConfig from '@/config/app.config'
import {
    type SupportLanguages,
    defaultLocale,
    getLocaleFromPathname,
    removeLocaleFromPathname,
    isValidLocale,
    routing,
} from '@/i18n/routing'

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing)

// Helper function to detect user's preferred language
function detectLanguage(req: NextRequest): SupportLanguages {
    // 1. Check for language preference in cookies
    const languageCookie = req.cookies.get('NEXT_LOCALE')?.value
    if (languageCookie && isValidLocale(languageCookie)) {
        return languageCookie
    }

    // 2. Check Accept-Language header
    const acceptLanguage = req.headers.get('accept-language')
    if (acceptLanguage) {
        const preferredLangs = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0].trim().toLowerCase())

        for (const lang of preferredLangs) {
            // Check for exact match
            if (isValidLocale(lang)) {
                return lang
            }
            // Check for language code only (e.g., 'vi' from 'vi-VN')
            const langCode = lang.split('-')[0]
            if (isValidLocale(langCode)) {
                return langCode
            }
        }
    }

    // 3. Return default locale
    return defaultLocale
}

// Helper function to check if a path already has a locale prefix
function hasLocalePrefix(pathname: string): boolean {
    return getLocaleFromPathname(pathname) !== null
}

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const useLocalePrefix =
        appConfig.language.isEnable && appConfig.language.useUrl

    if (!useLocalePrefix) {
        const pathnameWithoutLocale = removeLocaleFromPathname(path)

        if (pathnameWithoutLocale !== path) {
            const newUrl = new URL(pathnameWithoutLocale, req.url)
            newUrl.search = req.nextUrl.search
            return NextResponse.redirect(newUrl)
        }

        return intlMiddleware(req)
    }

    // Check if a path already has a locale prefix
    if (!hasLocalePrefix(path)) {
        // Detect user's preferred language
        const preferredLocale = detectLanguage(req)

        // Create new URL with language prefix
        const newUrl = new URL(`/${preferredLocale}${path}`, req.url)

        // Preserve search parameters
        newUrl.search = req.nextUrl.search

        // Redirect to a path with language prefix
        return NextResponse.redirect(newUrl)
    }

    // Apply internationalization middleware
    return intlMiddleware(req)
}

// Combine both matchers to exclude paths from both middleware
export const config = {
    matcher: [
        // Exclude API, static assets, sites, and file extensions
        '/((?!api|trpc|_next|_vercel|sites|_next/static|_next/image|.*\\.png$|.*\\..*).*)',
    ],
}
