import Image from 'next/image'

type Props = {
    icon: string
    title: string
    description: string
}
export default function ReasonCard({ icon, title, description }: Props) {
    return (
        <div className="py-2 px-10 lg:p-4 duration-300 border border-gray-300 border-solid size-full group rounded-xl hover:border-foreground dark:hover:border-primary hover:shadow-xl">
            <Image
                src={icon}
                alt={title}
                title={title}
                loading="eager"
                width="70"
                height="70"
                className="mx-auto my-2 lg:my-6 rounded-2xl"
                unoptimized
            />
            <p className="text-lg font-bold text-center">{title}</p>
            <p className="mt-2 text-sm leading-normal text-center group-hover:text-text dark:group-hover:text-primary-900 opacity-70">
                {description}
            </p>
        </div>
    )
}
