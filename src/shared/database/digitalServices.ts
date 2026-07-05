import { CadService } from '@/validationSchemas/cad-service.schema'

/**
 * Draft placeholder data for CSD Digital services. Shares the CadService shape
 * so the existing service card/detail rendering can be reused. Thumbnails point
 * at generic placeholder images — replace with real digital assets / Supabase
 * data (`digital_services` table) when available.
 */
const PLACEHOLDER_THUMB_A =
    'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750655051/Cadsquad/services/agme8joqrrctlvcxaz3q.webp'
const PLACEHOLDER_THUMB_B =
    'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750655141/Cadsquad/services/qyc9zoe89qk4vtjvdd8q.webp'

export const DIGITAL_SERVICES: CadService[] = [
    {
        id: 1,
        order: 1,
        slug: 'website-development',
        title: {
            original: 'Website Development',
            vi: 'Phát Triển Website',
        },
        description: {
            original:
                '<p>Fast, responsive corporate and product websites built to convert visitors into customers.</p>',
            vi: '<p>Website doanh nghiệp và sản phẩm nhanh, chuẩn responsive, biến khách truy cập thành khách hàng.</p>',
        },
        plainDescription: {
            original:
                'Fast, responsive corporate and product websites built to convert visitors into customers.',
            vi: 'Website doanh nghiệp và sản phẩm nhanh, chuẩn responsive, biến khách truy cập thành khách hàng.',
        },
        shortDescription: {
            original:
                'Corporate and product websites designed and developed for speed, SEO and conversion — on modern, maintainable tech.',
            vi: 'Website doanh nghiệp và sản phẩm được thiết kế và phát triển tối ưu tốc độ, SEO và chuyển đổi — trên nền công nghệ hiện đại, dễ bảo trì.',
        },
        thumbnail: { vertical: PLACEHOLDER_THUMB_A },
        images: [],
        content: {
            original:
                '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">🌐 Website Development</h1><p>We design and build corporate websites, landing pages and product sites focused on speed, SEO and conversion.</p></div>',
            vi: '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">🌐 Phát Triển Website</h1><p>Chúng tôi thiết kế và xây dựng website doanh nghiệp, landing page và trang sản phẩm tối ưu tốc độ, SEO và chuyển đổi.</p></div>',
        },
    },
    {
        id: 2,
        order: 2,
        slug: 'e-commerce',
        title: {
            original: 'E-commerce',
            vi: 'Thương Mại Điện Tử',
        },
        description: {
            original:
                '<p>Online stores and business platforms that scale with your sales.</p>',
            vi: '<p>Cửa hàng trực tuyến và nền tảng kinh doanh mở rộng theo doanh số.</p>',
        },
        plainDescription: {
            original:
                'Online stores and business platforms that scale with your sales.',
            vi: 'Cửa hàng trực tuyến và nền tảng kinh doanh mở rộng theo doanh số.',
        },
        shortDescription: {
            original:
                'End-to-end e-commerce: storefront, checkout, payments and integrations built to grow with your business.',
            vi: 'Thương mại điện tử trọn gói: gian hàng, thanh toán và tích hợp, mở rộng cùng doanh nghiệp của bạn.',
        },
        thumbnail: { vertical: PLACEHOLDER_THUMB_B },
        images: [],
        content: {
            original:
                '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">🛒 E-commerce</h1><p>We build online stores and business platforms with secure checkout, payment integration and room to scale.</p></div>',
            vi: '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">🛒 Thương Mại Điện Tử</h1><p>Chúng tôi xây dựng cửa hàng trực tuyến và nền tảng kinh doanh với thanh toán an toàn, tích hợp và khả năng mở rộng.</p></div>',
        },
    },
    {
        id: 3,
        order: 3,
        slug: 'branding-and-digital-design',
        title: {
            original: 'Branding & Digital Design',
            vi: 'Thương Hiệu & Thiết Kế Số',
        },
        description: {
            original:
                '<p>Visual identity and digital design that make your brand stand out.</p>',
            vi: '<p>Bộ nhận diện và thiết kế số giúp thương hiệu của bạn nổi bật.</p>',
        },
        plainDescription: {
            original:
                'Visual identity and digital design that make your brand stand out.',
            vi: 'Bộ nhận diện và thiết kế số giúp thương hiệu của bạn nổi bật.',
        },
        shortDescription: {
            original:
                'Logo, visual identity, UI and digital assets crafted to give your brand a consistent, memorable presence.',
            vi: 'Logo, bộ nhận diện, UI và tài nguyên số được thiết kế để thương hiệu của bạn nhất quán và ấn tượng.',
        },
        thumbnail: { vertical: PLACEHOLDER_THUMB_A },
        images: [],
        content: {
            original:
                '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">🎨 Branding & Digital Design</h1><p>We craft logos, visual identities and digital assets for a consistent, memorable brand.</p></div>',
            vi: '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">🎨 Thương Hiệu & Thiết Kế Số</h1><p>Chúng tôi thiết kế logo, bộ nhận diện và tài nguyên số cho thương hiệu nhất quán, ấn tượng.</p></div>',
        },
    },
    {
        id: 4,
        order: 4,
        slug: 'digital-optimization',
        title: {
            original: 'Digital Optimization',
            vi: 'Tối Ưu Số',
        },
        description: {
            original:
                '<p>SEO, performance and analytics to keep growing after launch.</p>',
            vi: '<p>SEO, hiệu năng và phân tích để tiếp tục tăng trưởng sau khi ra mắt.</p>',
        },
        plainDescription: {
            original:
                'SEO, performance and analytics to keep growing after launch.',
            vi: 'SEO, hiệu năng và phân tích để tiếp tục tăng trưởng sau khi ra mắt.',
        },
        shortDescription: {
            original:
                'Ongoing SEO, performance tuning and analytics so your digital products keep improving after go-live.',
            vi: 'SEO, tối ưu hiệu năng và phân tích liên tục để sản phẩm số của bạn cải thiện sau khi vận hành.',
        },
        thumbnail: { vertical: PLACEHOLDER_THUMB_B },
        images: [],
        content: {
            original:
                '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">📈 Digital Optimization</h1><p>We improve SEO, performance and analytics so your site keeps converting and growing.</p></div>',
            vi: '<div className="leading-relaxed text-base"><h1 className="font-bold text-2xl mb-1">📈 Tối Ưu Số</h1><p>Chúng tôi cải thiện SEO, hiệu năng và phân tích để website tiếp tục chuyển đổi và tăng trưởng.</p></div>',
        },
    },
]
