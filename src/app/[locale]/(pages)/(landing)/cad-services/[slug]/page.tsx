import { getLocale } from 'next-intl/server'

import { CADServiceDetailClient } from './client-page'

export default async function CADServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const locale = await getLocale()
    const { slug } = await params

    /**
     * Use for create new content with this template
     */
    // const templateContent = `<div className="grid grid-cols-2 gap-5">
    //                     <div className="leading-relaxed text-base">
    //                         <h1 className="font-bold text-2xl mb-1">⚙️ Our Capabilities</h1>
    //                         <ul className="list-disc ml-10">
    //                             <li>Design of **non-standard parts and mechanical equipment**</li>
    //                             <li>**2D/3D factory layout design** for machines, conveyors, and pipelines</li>
    //                             <li>**Mechatronic integration** - sensor brackets, control cabinets, motor supports</li>
    //                             <li>**Industrial piping design** based on P&ID or 3D layout requirements</li>
    //                             <li>Custom design of **jigs, fixtures, dies, and specialized tooling**</li>
    //                             <li>**Redesign and optimization** of legacy or outdated machines</li>
    //                             <li>CAD support for **cross-functional engineering teams or outsourced projects**</li>
    //                         </ul>
    //                         <br />
    //                         <h1 className="font-bold text-2xl mb-1">✅ Why Choose Us</h1>
    //                         <ul className="list-disc ml-10">
    //                             <li>One-stop solution for unique engineering challenges</li>
    //                             <li>We work from **sketches, specs, or physical samples**</li>
    //                             <li>Seamless collaboration with **your internal design teams**</li>
    //                             <li>Shorter development time and lower costs</li>
    //                             <li>Fully documented and ready for **manufacturing or fabrication**</li>
    //                         </ul>
    //                         <br />
    //                         <br />
    //                         <h1 className="font-bold text-2xl mb-1">📐 Supported Formats & Software</h1>
    //                         <ul className="list-disc ml-10">
    //                             <li>**AutoCAD** - DWG, DXF</li>
    //                             <li>**Autodesk Inventor** - IPT, IAM, IDW</li>
    //                             <li>**SolidWorks** - SLDPRT, SLDDRW</li>
    //                             <li>**Revit**- piping and layout (on request)</li>
    //                             <li>**Neutral formats** - STEP, IGES, PDF (if required)</li>

    //                         </ul>
    //                         <br />
    //                         <h1 className="font-bold text-2xl mb-1">📩 Have a special design request?</h1>
    //                             Send us your concept, sketch, or challenge—we'll deliver a **tailored CAD solution** that fits your industry, budget, and timeline.
    //                     </div>
    //                     <div className="flex flex-col items-center gap-1">
    //                         <img
    //                             src="https://res.cloudinary.com/dqx1guyc0/image/upload/v1750845543/Cadsquad/services/rmdjfgx5vjavnujo5zs2.png"
    //                             alt="input"
    //                             className="border shadow-lg w-full object-cover"
    //                         />
    //                         <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             width="140"
    //                             height="140"
    //                             viewBox="0 0 24 24"
    //                             fill="#f47a1f"
    //                             stroke="#1b1564"
    //                             strokeWidth="0.25"
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             className="lucide lucide-arrow-big-down-icon lucide-arrow-big-down"
    //                         >
    //                             <path d="M15 6v6h4l-7 7-7-7h4V6h6z" />
    //                         </svg>
    //                         <img
    //                             src="https://res.cloudinary.com/dqx1guyc0/image/upload/v1750845543/Cadsquad/services/pomzhvgrsw8wfjfuhqdf.png"
    //                             alt="output"
    //                             className="border shadow-lg w-full object-cover"
    //                         />
    //                     </div>
    //                 </div>`

    // console.log(JSON.stringify(templateContent.replaceAll('  ', '')))

    // const source = cleanMarkdownString(serviceTranslation.content)

    return (
        <div className="min-h-screen pb-20 max-w-screen">
            <CADServiceDetailClient slug={slug} locale={locale} />
        </div>
    )
}
