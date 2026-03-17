'use client'

import { Suspense } from 'react'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Image } from 'antd'

import { HtmlReactParser } from '@/components'
import { MotionSection } from '@/lib/motion'
import { serviceBySlugOptions } from '@/queires'
import { TServiceTranslation } from '@/types'

import OurServices from '../../../app/[locale]/(pages)/(landing)/(home)/_components/OurServices'
import { PageBreadcumbs } from './PageBreadcumbs'
import { ServiceNavigate } from './ServiceNavigate'

export const DetailClientPage = ({
    slug,
    locale,
}: {
    slug: string
    locale: string
}) => {
    const {
        data: { service },
    } = useSuspenseQuery(serviceBySlugOptions(slug))
    const serviceTranslation = (service?.translations.find(
        (it) => it.language === locale.toUpperCase()
    ) ??
        service?.translations.find(
            (it) => it.language === 'EN'
        )) as TServiceTranslation

    return (
        <>
            <section className="relative w-full overflow-hidden h-[350px] lg:h-[500px]">
                <div className="relative size-full">
                    <Image
                        src={
                            service?.backgroundCover?.url ??
                            service?.thumbnail?.url
                        }
                        alt="Image"
                        className="!object-cover !size-full"
                        rootClassName="!object-cover !size-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                </div>
                <div className="absolute top-[50%] translate-y-[-50%] left-0 w-screen">
                    <div className="container" style={{ color: 'white' }}>
                        <PageBreadcumbs pageName={serviceTranslation.title} />
                        <h2 className="mt-5 text-3xl lg:text-6xl font-bold font-saira mb-3">
                            {serviceTranslation.title}
                        </h2>
                        <p className="leading-normal lg:leading-relaxed !text-sm lg:!text-lg !opacity-85">
                            {serviceTranslation.description}
                        </p>
                    </div>
                </div>
            </section>

            <MotionSection
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="container min-h-40 mt-16"
            >
                <Suspense fallback={<p>Loading...</p>}>
                    {/* Use antd Image and replace bold middle paraph */}
                    <HtmlReactParser htmlString={serviceTranslation.content} />
                    {/* <MDXRemote
                        source={source
                            .replaceAll('img', 'Image')
                            .replaceAll('**', '')}
                        components={{
                            Image,
                            wrapper: ({ children }) => (
                                <div suppressHydrationWarning>{children}</div>
                            ),
                        }}
                        onError={(err) => (
                            <p>{`Couldn't load content!${JSON.stringify(err)}`}</p>
                        )}
                    /> */}
                </Suspense>
            </MotionSection>

            <MotionSection className="container mt-24 mb-16 flex items-center justify-end lg:justify-between gap-5">
                <ServiceNavigate service={service} />
            </MotionSection>

            <MotionSection>
                <OurServices />
            </MotionSection>
        </>
    )
}
