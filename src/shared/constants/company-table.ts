/**
 * Company information table rows. All text (labels + values) lives in the
 * message files under `landing.aboutUs.companyInfo.<key>`. Rows with a nested
 * `items` list render a bulleted list of links; the `href` is kept here since
 * it is not translatable.
 */
export type CompanyInfoItem = {
    key: string
    href: string
}

export type CompanyInfoRow = {
    key: string
    items?: CompanyInfoItem[]
}

export const ABOUT_CADSQUAD_INFO: CompanyInfoRow[] = [
    { key: 'taxId' },
    { key: 'companyName' },
    { key: 'address' },
    { key: 'phone' },
    { key: 'email' },
    { key: 'founder' },
    {
        key: 'ourEcosystem',
        items: [
            {
                key: 'cadServices',
                href: 'cad-services',
            },
            {
                key: 'csdAcademy',
                href: 'academy',
            },
            {
                key: 'csdDigital',
                href: 'digital',
            },
        ],
    },
]
