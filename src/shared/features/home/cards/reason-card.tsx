import Image from 'next/image'

import { Reason } from '@/shared/constants/whyChooseUs'

type Props = {
    data: Reason
}
export default function ReasonCard({ data }: Props) {
    return (
        <div className="py-2 px-10 lg:p-4 duration-300 border border-gray-300 border-solid size-full group rounded-xl hover:border-foreground dark:hover:border-primary hover:shadow-xl">
            <Image
                src={data.icon}
                alt={data.title}
                title={data.title}
                loading="eager"
                width="70"
                height="70"
                className="mx-auto my-2 lg:my-6 rounded-2xl"
                unoptimized
            />
            <p className="text-lg font-bold text-center">{data.title}</p>
            <p className="mt-2 text-sm leading-normal text-center group-hover:text-text dark:group-hover:text-primary-900 opacity-70">
                {data.description}
            </p>
        </div>
    )
}
