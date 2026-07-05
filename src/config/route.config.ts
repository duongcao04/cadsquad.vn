const ROUTES = {
    home: '/',
    about_us: {
        overview: '/about-us#overview',
        vision: '/about-us/vision',
        our_journey: '/about-us#our-journey',
    },
    cad_services: {
        list: '/cad-services',
        detail: (slug: string) => `/cad-services/${slug}`,
    },
    digital_services: {
        list: '/digital-services',
        detail: (slug: string) => `/digital-services/${slug}`,
    },
    academy: '/academy',
    news_and_media: '/news-and-media',
    post_detail: (slug: string) => `/news-and-media/${slug}`,
}
export const ROUTE_CONFIG = {
    routes: ROUTES,
}
