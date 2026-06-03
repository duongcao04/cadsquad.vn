import { createFileRoute } from '@tanstack/react-router'
import { Variants } from 'motion'
import { MotionSection } from '@/lib/motion'
import Banner from '@/app/[locale]/(pages)/(landing)/(home)/_components/Banner'
import ContactUs from '@/app/[locale]/(pages)/(landing)/(home)/_components/ContactUs'
import CustomerReview from '@/app/[locale]/(pages)/(landing)/(home)/_components/CustomerReview'
import OurServices from '@/app/[locale]/(pages)/(landing)/(home)/_components/OurServices'
import Partner from '@/app/[locale]/(pages)/(landing)/(home)/_components/Partner'
import WhyChooseUs from '@/app/[locale]/(pages)/(landing)/(home)/_components/WhyChooseUs'
import Workflow from '@/app/[locale]/(pages)/(landing)/(home)/_components/Workflow'

export const Route = createFileRoute('/_landing/')({
    component: HomePage,
})

function HomePage() {
    const sectionVariants: Variants = {
        init: { opacity: 0 },
        animate: { opacity: 1 },
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
