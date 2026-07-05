import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/lib/motion'
import { WHY_CHOOSE_US } from '@/shared/constants/why-choose-us'
import { Section, fadeInUp } from '@/shared/components/section'

import ReasonCard from './cards/reason-card'

export default function WhyChooseUs() {
    const tHome = useTranslations('landing.home')
    const tItems = useTranslations('landing.home.sections.whyChooseUs.items')

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
                {WHY_CHOOSE_US.map((reason, idx) => (
                    <MotionDiv
                        key={reason.key}
                        {...fadeInUp(idx * 0.1)}
                        className="size-full"
                    >
                        <ReasonCard
                            icon={reason.icon}
                            title={tItems(`${reason.key}.title`)}
                            description={tItems(`${reason.key}.description`)}
                        />
                    </MotionDiv>
                ))}
            </Section.Wrapper>
        </Section.Wrapper>
    )
}
