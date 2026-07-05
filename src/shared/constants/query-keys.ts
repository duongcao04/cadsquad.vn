export const queryKeys = {
    cadServices: {
        all: ['cad-services'] as const,
        lists: () => [...queryKeys.cadServices.all, 'list'] as const,
        list: (params?: Record<string, unknown>) =>
            [...queryKeys.cadServices.lists(), params ?? {}] as const,
        details: () => [...queryKeys.cadServices.all, 'detail'] as const,
        detail: (slug: string) =>
            [...queryKeys.cadServices.details(), slug] as const,
    },
    digitalServices: {
        all: ['digital-services'] as const,
        lists: () => [...queryKeys.digitalServices.all, 'list'] as const,
        list: (params?: Record<string, unknown>) =>
            [...queryKeys.digitalServices.lists(), params ?? {}] as const,
        details: () => [...queryKeys.digitalServices.all, 'detail'] as const,
        detail: (slug: string) =>
            [...queryKeys.digitalServices.details(), slug] as const,
    },
    posts: {
        all: ['posts'] as const,
        lists: () => [...queryKeys.posts.all, 'list'] as const,
        list: (params?: Record<string, unknown>) =>
            [...queryKeys.posts.lists(), params ?? {}] as const,
        featured: () => [...queryKeys.posts.all, 'featured'] as const,
        recent: () => [...queryKeys.posts.all, 'recent'] as const,
        details: () => [...queryKeys.posts.all, 'detail'] as const,
        detail: (slug: string) => [...queryKeys.posts.details(), slug] as const,
    },
    partners: {
        all: ['partners'] as const,
        list: () => [...queryKeys.partners.all, 'list'] as const,
    },
    testimonials: {
        all: ['testimonials'] as const,
        list: () => [...queryKeys.testimonials.all, 'list'] as const,
    },
} as const
