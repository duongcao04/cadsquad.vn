import { useLocale, useTranslations } from 'next-intl'

import { MotionDiv } from '@/lib/motion'
import { VI_WHY_CHOOSE_US, WHY_CHOOSE_US } from '@/shared/constants/whyChooseUs'
import { Section, fadeInUp } from '@/shared/features/home/section'

import ReasonCard from './cards/reason-card'

export default function WhyChooseUs() {
    const tHome = useTranslations('landing.home')
    const locale = useLocale()

    const whyChooseCadsquad = locale === 'vi' ? VI_WHY_CHOOSE_US : WHY_CHOOSE_US

    return (
        <Section.Wrapper className="gap-5 lg:gap-8">
            <Section.Title className="!text-center">
                {tHome.rich('sections.whyChooseUs.title', {
                    highlight: (chunk) => (
                        <span className="text-primary">{chunk}</span>
                    ),
                })}
            </Section.Title>
            <Section.Wrapper
                layout="grid"
                cols={{ base: 1, md: 2, lg: 3, xl: 4 }}
                gap={7}
                fluid
                className="px-4 lg:px-3"
            >
                {whyChooseCadsquad.map((reason, idx) => (
                    <MotionDiv
                        key={idx}
                        {...fadeInUp(idx * 0.1)}
                        className="size-full"
                    >
                        <ReasonCard data={reason} />
                    </MotionDiv>
                ))}
            </Section.Wrapper>
        </Section.Wrapper>
    )
}
