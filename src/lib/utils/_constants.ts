import { envConfig } from "@/config"

export const INTERNAL_URLS = {
	home: ['', ''].join('/'),
	aboutUs: {
		overview: ['', 'about-us'].join('/'),
		vision: ['', 'about-us', 'vision'].join('/'),
		ourJourney: ['', , 'about-us', 'our-journey'].join('/')
	},
	admin: {
		dashboard: ['', 'admin'].join('/'),
		management: {
			posts: ['', 'admin', 'mgmt', 'posts'].join('/'),
			services: {
				all: ['', 'admin', 'mgmt', 'services'].join('/'),
				createService: ['', 'admin', 'mgmt', 'services', 'create?mode=create'].join('/'),
				editService: (id: string) => ['', 'admin', 'mgmt', 'services', `create?mode=edit&id=${id}`].join('/'),
				types: ['', 'admin', 'mgmt', 'services', 'types'].join('/'),
				createServiceType: ['', 'admin', 'mgmt', 'services', 'types?mode=create'].join('/'),
				editServiceType: (id: string) => ['', 'admin', 'mgmt', 'services', `types?mode=edit&id=${id}`].join('/'),
			},
			email: ['', 'admin', 'mgmt', 'email'].join('/'),
		}
	},
	cadServices: ['', 'cad-services'].join('/'),
	cadServiceDetail: (slug: string) => ['', 'cad-services', slug].join('/'),
	digitalServices: ['', 'digital-services'].join('/'),
	digitalServiceDetail: (slug: string) => ['', 'digital-services', slug].join('/'),
	academy: ['', 'academy'].join('/'),
	newsAndMedia: ['', 'news-and-media'].join('/')
}

export const EXTERNAL_URLS = {
	academy: 'https://www.courses.cadsquad.vn/',
}

export const CONTACT = {
	email: 'contact@cadsquad.vn',
	phone: '+84 765 279 228',
	zalo: 'Zalo.me/0765279228',
	fiverr: 'Fiverr.com/vietnamcsd'
}

export const baseUrl = envConfig.appUrl ?? 'http://localhost'
export const apiBaseUrl = envConfig.apiEndpoint
	? `${envConfig.apiEndpoint}`
	: 'http://localhost/api'