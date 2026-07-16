import React from 'react'
import { Suspense } from 'react'

import { Image } from 'antd'
import { getLocale } from 'next-intl/server'
import { MDXRemote } from 'next-mdx-remote-client/rsc'

import PageBreadcumbs from '@/features/services/digital-service/_components/detail/page-breadcumbs'

import { MotionSection } from '@/lib/motion'
import { cleanMarkdownString } from '@/lib/utils'
import { DIGITAL_SERVICES } from '@/shared/database/digitalServices'

export default async function DigitalServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const locale = await getLocale()
    const { slug } = await params
    const data = DIGITAL_SERVICES.filter((item) => item.slug === slug)?.[0]

    const descriptionSource = (
        locale === 'vi' ? data?.description?.vi : data?.description?.original
    ) as string
    const contentSource = (
        locale === 'vi' ? data?.content?.vi : data?.content?.original
    ) as string
    const description = cleanMarkdownString(descriptionSource)
    const source = cleanMarkdownString(contentSource)

    const title = locale === 'vi' ? data?.title?.vi : data?.title?.original

    return (
        <div className="min-h-screen pb-20 max-w-screen">
            <section className="relative w-full overflow-hidden h-[350px] lg:h-[500px]">
                <div className="relative size-full">
                    <Image
                        src={
                            data?.thumbnail.horizontal ??
                            (data?.thumbnail.vertical as string)
                        }
                        alt="Image"
                        className="!object-cover !size-full"
                        rootClassName="!object-cover !size-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                </div>
                <div className="absolute top-[50%] translate-y-[-50%] left-0 w-screen">
                    <div className="container" style={{ color: 'white' }}>
                        <PageBreadcumbs pageName={title as string} />
                        <h2 className="mt-5 text-3xl lg:text-6xl font-bold font-saira mb-3">
                            {title}
                        </h2>
                        <MDXRemote
                            source={description}
                            components={{
                                wrapper({ children }) {
                                    return (
                                        <div className="leading-normal lg:leading-relaxed !text-sm lg:!text-lg !opacity-85">
                                            {children}
                                        </div>
                                    )
                                },
                            }}
                            onError={() => <p></p>}
                        />
                    </div>
                </div>
            </section>

            <MotionSection
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="container min-h-40 mt-16"
            >
                <Suspense fallback={<p>Loading...</p>}>
                    <MDXRemote
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
                    />
                </Suspense>
            </MotionSection>
        </div>
    )
}
