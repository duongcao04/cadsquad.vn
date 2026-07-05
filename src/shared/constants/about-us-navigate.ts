/**
 * About-us section anchors. Labels live in the message files under
 * `landing.aboutUs.navigate.<key>`; only the anchor href is kept here.
 */
export type AboutUsNavItem = {
    key: string
    href: string
}

export const ABOUT_US_NAVIGATE: AboutUsNavItem[] = [
    { key: 'overview', href: '/about-us/#overview' },
    { key: 'ourJourney', href: '/about-us/#our-journey' },
    { key: 'clientPartner', href: '/about-us/#client-partner' },
]
