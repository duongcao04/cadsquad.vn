import { envConfig } from '@/config'

export const INTERNAL_URLS = {
    home: '/',
    aboutUs: {
        overview: '/about-us',
        vision: '/about-us/vision',
        ourJourney: '/about-us/our-journey',
    },
    admin: {
        dashboard: '/admin',
        management: {
            posts: '/admin/mgmt/posts',
            services: {
                all: '/admin/mgmt/services',
                createService: '/admin/mgmt/services/create?mode=create',
                editService: (id: string) =>
                    `/admin/mgmt/services/create?mode=edit&id=${id}`,
                types: '/admin/mgmt/services/types',
                createServiceType:
                    '/admin/mgmt/services/types?mode=create',
                editServiceType: (id: string) =>
                    `/admin/mgmt/services/types?mode=edit&id=${id}`,
            },
            email: '/admin/mgmt/email',
        },
    },
    cadServices: '/cad-services',
    cadServiceDetail: (slug: string) => `/cad-services/${slug}`,
    digitalServices: '/digital-services',
    digitalServiceDetail: (slug: string) => `/digital-services/${slug}`,
    academy: '/academy',
    newsAndMedia: '/news-and-media',
}

export const EXTERNAL_URLS = {
    academy: 'https://www.courses.cadsquad.vn/',
}

export const CONTACT = {
    email: 'contact@cadsquad.vn',
    phone: '+84 765 279 228',
    zalo: 'Zalo.me/0765279228',
    fiverr: 'Fiverr.com/vietnamcsd',
}

export const baseUrl = envConfig.appUrl
