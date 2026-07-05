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
    { key: 'location' },
    { key: 'phone' },
    { key: 'email' },
    { key: 'founder' },
    { key: 'address' },
    {
        key: 'businessActivities',
        items: [
            {
                key: 'technicalDrawing',
                href: 'technical-drawing-digitization-and-cad-data-creation',
            },
            {
                key: 'partExtraction',
                href: 'part-extraction-from-assembly-drawings',
            },
            {
                key: 'customMachine',
                href: 'custom-machine-design-for-food-and-material-handling-systems',
            },
            {
                key: 'steelStructure',
                href: '3d-and-2d-for-steel-structure',
            },
            {
                key: 'sheetMetal',
                href: 'cad-for-sheet-metal-manufacturing',
            },
            {
                key: 'machineDesignSupport',
                href: 'machine-design-support-from-concept-to-manufacturing',
            },
            {
                key: 'structuralAnalysis',
                href: 'structural-analysis-(-fea-)',
            },
            {
                key: 'motionSimulation',
                href: 'mechanical-motion-simulation',
            },
            {
                key: 'customDesign',
                href: 'custom-design-services-on-request',
            },
        ],
    },
]
