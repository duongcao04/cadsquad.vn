import { CallIcon } from '@/shared/components/icons/CallIcon'
import { FacebookIcon } from '@/shared/components/icons/FacebookIcon'
import { FiverrIcon } from '@/shared/components/icons/FiverrIcon'
import { MailIcon } from '@/shared/components/icons/MailIcon'
import { TiktokIcon } from '@/shared/components/icons/TiktokIcon'
import { YoutubeIcon } from '@/shared/components/icons/YoutubeIcon'
import { ZaloIcon } from '@/shared/components/icons/ZaloIcon'

import { ABOUT_US_NAVIGATE } from './aboutUsNavigate'
import { FLOAT_CONTACTS } from './floatContact'
import { HEADER_NAVIGATES } from './headerNavigate'
import { WHY_CHOOSE_US } from './whyChooseUs'
import { WORKFLOW } from './workflow'

export const ourSlogan = [
    'Professional CAD Services',
    'Unique and creative',
    'Reaching the world',
    'Shaping the Future of Mechanical Design',
]

export const SOCIALS = [
    {
        name: 'Facebook',
        icon: FacebookIcon,
        brandColor: '#0866ff',
        href: 'https://www.facebook.com/CSD.Vie',
    },
    {
        name: 'Youtube',
        icon: YoutubeIcon,
        color: '#ff0133',
        href: 'https://www.youtube.com/@CSDVietnam',
    },
    {
        name: 'Tiktok',
        icon: TiktokIcon,
        color: '#000000',
        href: 'https://www.tiktok.com/@csdvietnam',
    },
]
export type Social = (typeof SOCIALS)[0]

export const CONTACT_INFORMATIONS = [
    {
        icon: CallIcon,
        contactName: 'Call',
        name: '+84 765 279 228',
        path: 'tel:+84765279228',
        color: '#000000',
    },
    {
        icon: MailIcon,
        contactName: 'Mail',
        name: 'Contact@cadsquad.vn',
        path: 'mailto:contact@cadsquad.vn',
        color: '#888888',
    },
    {
        icon: ZaloIcon,
        contactName: 'Zalo',
        name: 'Zalo.me/0765279228',
        path: 'https://zalo.me/0765279228',
        color: '#0068ff',
    },
    {
        icon: FiverrIcon,
        contactName: 'Fiverr',
        name: 'Fiverr.com/vietnamcsd',
        path: 'https://www.fiverr.com/vietnamcsd',
        color: '#24d366',
    },
]
export type ContactInfor = (typeof CONTACT_INFORMATIONS)[0]

export {
    ABOUT_US_NAVIGATE,
    HEADER_NAVIGATES,
    WHY_CHOOSE_US,
    FLOAT_CONTACTS,
    WORKFLOW,
}
