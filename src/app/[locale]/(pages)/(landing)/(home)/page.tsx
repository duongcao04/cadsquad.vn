import { Variants } from 'motion'

import { MotionSection } from '@/lib/motion'
import Banner from '@/shared/features/home/banner'
import ContactUs from '@/shared/features/home/contact-us'
import CustomerReview from '@/shared/features/home/customer-review'
import OurServices from '@/shared/features/home/our-services'
import Partner from '@/shared/features/home/partner'
import WhyChooseUs from '@/shared/features/home/why-choose-us'
import Workflow from '@/shared/features/home/workflow'

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
                className="py-4"
            >
                <Partner />
            </MotionSection>
            <MotionSection
                variants={sectionVariants}
                initial="init"
                whileInView="animate"
                className="mt-8 pb-10 lg:pt-10 lg:pb-16"
            >
                <OurServices />
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
