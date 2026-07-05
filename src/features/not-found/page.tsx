'use client'

import { Button } from '@heroui/react'
import { HomeIcon } from 'lucide-react'
import Image from 'next/image'

import NotFoundImg from '@/assets/images/not-found.webp'
import { Link } from '@/i18n/navigation'
import Footer from '@/shared/components/layouts/footer'
import Header from '@/shared/components/layouts/header'

export default function CatchAllPage() {
    return (
        <div id="404">
            <Header />
            <main className="pt-[102px] pb-32">
                <div className="container text-center min-h-[calc(100vh-696px)] grid place-items-center">
                    <div className="mt-20 flex flex-col items-center">
                        <h1 className="text-4xl font-saira font-bold tracking-wide">
                            Whoops!! Something went wrong.
                        </h1>
                        <Image
                            src={NotFoundImg}
                            alt="Not found img"
                            width={600}
                            height={200}
                        />
                        <p className="mt-5 text-lg font-saira">{`Sorry, We can't find the page. It might have been removed or doesn't exist anymore.`}</p>
                        <Link href={'/'} className="block w-fit">
                            <Button
                                color="secondary"
                                startContent={<HomeIcon size={20} />}
                                className="mt-8"
                            >
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
