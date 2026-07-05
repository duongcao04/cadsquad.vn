import { Variants } from 'motion'

import { MotionSection } from '@/lib/motion'
import Banner from '@/features/home/_components/banner'
import ContactUs from '@/features/home/_components/contact-us'
import CustomerReview from '@/features/home/_components/customer-review'
import EcosystemServices from '@/features/home/_components/ecosystem-services'
import Partner from '@/features/home/_components/partner'
import WhyChooseUs from '@/features/home/_components/why-choose-us'
import Workflow from '@/features/home/_components/workflow'

export default function HomePage() {
    const sectionVariants: Variants = {
        init: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
    }
    return (
        <div className="max-w-screen overflow-hidden">
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="h-full max-w-screen"
            >
                <Banner />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="mt-8 pb-10 lg:pt-10 lg:pb-16"
            >
                <EcosystemServices />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="mt-8 pb-10 lg:pt-10 lg:pb-16"
            >
                <WhyChooseUs />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="mt-8 pb-10 lg:pt-10 lg:pb-16"
            >
                <Workflow />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="py-4"
            >
                <Partner />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="pt-12 pb-16"
            >
                <CustomerReview />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="mb-10"
            >
                <ContactUs />
            </MotionSection>
        </div>
    )
}
