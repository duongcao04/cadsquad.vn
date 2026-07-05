import FacebookMessenger from '@/assets/images/brands/facebook-messenger.webp'
import Whatsapp from '@/assets/images/brands/whatsapp.webp'
import Zalo from '@/assets/images/brands/zalo.webp'

export const FLOAT_CONTACTS = [
    {
        icon: FacebookMessenger,
        title: 'Facebook',
        href: 'https://www.messenger.com/t/CSD.Vie',
        description: '(8h00 - 24h00)',
    },
    {
        icon: Zalo,
        title: '076.527.9228',
        href: 'https://www.zalo.me/0765279228',
        description: '(8h00 - 24h00)',
    },
    {
        icon: Whatsapp,
        title: '076.527.9228',
        href: 'tel:0765279228',
        description: '(8h00 - 24h00)',
    },
]

export type FloatContact = (typeof FLOAT_CONTACTS)[0]
