import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import ButtonDownloadBrochure from '@/components/ButtonDownloadBrochure'

import AboutUsImage from '@/assets/images/about-us-banner.webp'
import { Link } from '@/i18n/navigation'
import { MotionH1 } from '@/lib/motion'
import { INTERNAL_URLS } from '@/lib/utils'

export default function AboutUsHeading() {
    const tAboutUs = useTranslations('landing.aboutUs')

    return (
        <section className="relative w-full h-[450px] lg:h-[520px] overflow-hidden">
            {/* Background Image - Tối ưu SEO và Hiệu năng */}
            <Image
                src={AboutUsImage}
                alt="About Us Banner"
                fill
                priority
                placeholder="blur"
                className="object-cover object-center"
            />

            {/* Gradient Overlay - Đã gộp Responsive vào 1 dòng */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 lg:from-black/50 lg:to-black/80" />

            {/* Content Container */}
            <div className="absolute inset-0">
                <div className="container mx-auto px-4 md:px-6 h-full flex flex-col items-start justify-center text-white font-saira font-semibold">
                    <PageBreadcrumbs />

                    <MotionH1 className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-[60px] uppercase leading-tight">
                        {tAboutUs('heading.title')}
                    </MotionH1>

                    <p className="mt-2 md:mt-3 text-lg md:text-2xl lg:text-4xl text-danger font-medium tracking-wide">
                        {tAboutUs('heading.slogan')}
                    </p>

                    <div className="mt-4 lg:mt-6 text-sm md:text-base lg:text-lg font-medium tracking-wide text-gray-200 lg:max-w-[75%] leading-relaxed">
                        {tAboutUs.rich('heading.description', {
                            paragraph: (chunk) => (
                                <p className="mb-2 last:mb-0">{chunk}</p>
                            ),
                        })}
                    </div>

                    <div className="mt-8">
                        <ButtonDownloadBrochure />
                    </div>
                </div>
            </div>
        </section>
    )
}

function PageBreadcrumbs() {
    return (
        <Breadcrumbs
            itemClasses={{
                item: 'text-white/70 data-[current=true]:text-white font-medium hover:text-white transition-colors',
                separator: 'text-white/50',
            }}
        >
            <BreadcrumbItem>
                <Link href={INTERNAL_URLS.home}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>About us</BreadcrumbItem>
        </Breadcrumbs>
    )
}
