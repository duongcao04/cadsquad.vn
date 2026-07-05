import { SupportLanguages } from '@/i18n/routing'

/**
 * Nav entries carry either an i18n key (`labelKey`) or a per-locale text map
 * (`label`) for dynamic data. Resolve to a display string.
 */
type Labeled = {
    labelKey?: string
    label?: Record<SupportLanguages, string>
}

export function resolveNavLabel(
    item: Labeled,
    t: (key: string) => string,
    locale: SupportLanguages
): string {
    if (item.labelKey) return t(item.labelKey)
    return item.label?.[locale] ?? ''
}
