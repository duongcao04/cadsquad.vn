import { SVGProps } from 'react'

import { AlgeriaFlag } from '@/shared/components/icons/flags/algeria-flag'
import { CanadaFlag } from '@/shared/components/icons/flags/canada-flag'
import { ColombiaFlag } from '@/shared/components/icons/flags/colombia-flag'
import { GermanyFlag } from '@/shared/components/icons/flags/germany-flag'
import { IndiaFlag } from '@/shared/components/icons/flags/india-flag'
import { UKFlag } from '@/shared/components/icons/flags/uk-flag'
import { USFlag } from '@/shared/components/icons/flags/us-flag'

export type Testimonial = {
    quote: string
    name: string
    designation: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
    destinationName: string
    src: string
}
export const TESTIMONIALS: Testimonial[] = [
    {
        name: 'bazzyman62',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: CanadaFlag,
        destinationName: 'Canada',
        quote: 'INCREDIBLE work ethic, design ability and communication. Very proficient i his craft. I took a chance on him knowing he was new on fiverr. It was a great decision. I would highly recommend and will use them for 3 more projects. I trust them fully.',
    },
    {
        name: 'dhruvalpatel113',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/u2hou7kubmxjhdh3thwf.webp',
        designation: IndiaFlag,
        destinationName: 'India',
        quote: 'It was very convenient to work with phong. I would definitely recommend this mans effort to fulfill the requirements and urgency of the projects. I really appreciate the work done. awesome guy to work with.',
    },
    {
        name: 'bayronalexan157',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: ColombiaFlag,
        destinationName: 'Colombia',
        quote: 'Excellent person to work with very good communication understood the design from isomertric image and was able to make 3 model for fabrication. I very please to work with PHONG highly recommended by me - as and true engineer and look forward to completing many project in the future he is definitely someone to be part of your design team.',
    },
    {
        name: 'deboudek',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: GermanyFlag,
        destinationName: 'Germany',
        quote: 'Excellent service, beyond expectations, great results, earlier than the promised date. He has much experience in mechanical design, you need to give him instructions and wait for the result without any more complications. 100% recommended, we definitely will keep working together.',
    },
    {
        name: 'alfrednorrls365',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/cfkizp1lwzmmipaezn1u.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: "Absolutetly phenomenal work. Fast, accurate, easy to communicate with. Very respectful and professional. Will use again. Do not hesitate to use him if you are thinking about doing it. You won't regret it. Made revisions without being defensive or complaining.",
    },
    {
        name: 'kemelkheloulati',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: AlgeriaFlag,
        destinationName: 'Algeria',
        quote: 'I recently had the privilege of utilizing the CAD services provided by Phong, and I must say they were truly excoptional. He demonstrated an unparalleled lovel of professionalism and expertise, translating my requirements into precise and detailed CAD designs. Ther attention to detail was remarkabl.',
    },
    {
        name: 'praxmarket',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: UKFlag,
        destinationName: 'United Kingdom',
        quote: 'I was 50 pleased with the service. I received from Phong. He went above and beyond to help me find the. I perfoct design. I was very impressed with the quality of the product I received. I wil definitely place my next order with Phong.',
    },
    {
        name: 'jonjapltana',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ctdf8kifakw6u4rk4vyw.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: 'Phamtienphong s a very talented and resourceful individual its always a pleasure working with him. Will continue to work with him in the future.',
    },
    {
        name: 'amara_vayder',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/qcdcgzd31oxxsvetsel8.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: 'He was such a pleasure to work with. He delivered the work on time. He was very communicative and helpful. He was attentive and patient. He exceeded my expectations. Would definitely work with him again. Fantastic work very detailed.',
    },
    {
        name: 'the7express',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/xudvt3ceeqripq8m2pwk.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: "After 3 other sellers couldn't build the train exactly as I wanted, I gave CSD a chance and they were on point with every detail and made the train exactly as real life. Will order from again!",
    },
    {
        name: 'panther343',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: 'An absolutely amazing job. Final rendering came out better than expected. Csd.phongpham pays close attention to detail and s very patient with all your request, would definitely be using him again!',
    },
    {
        name: 'novoal',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/gpnp3gqqo4e9xfu2djfc.webp',
        designation: GermanyFlag,
        destinationName: 'Germany',
        quote: "phamtienphong is a mastermind in CAD design for injection molds, seamlessly blending years of experlence into each intricate detail. Their designs aren't just functional; they're optimized masterpieces that simplify the molding process. Throughout our collaboration, communication was top-notch, with every design choice backed by sound rationale. If expertise and precision are what you seek in mold design, look no further than phamtienphong. Their work is the gold standard in the industry. Thank you again!",
    },
    {
        name: 'theaaronestrada',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/yxfucwh8sij8bn6vrket.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: 'I am very impressed with the CAD drawing I received. The drawings are clear, accurate, and well- Iabeled. The dimensions are precise, and the overall quality is excellent. I would highly recommend this company to anyone who needs CAD drawings. I especially appreciate the fact that the company was able to accommodate my specific requests. They were very responsive to my questions and concerns, and they were always willing to go the extra mile to make sure that I was happy with the final product. I would definitely use this company again in the future, and I would not hesitate to recommend them to others.',
    },
    {
        name: 'jemueljeremlah',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/m77qczlfl2feceniyjkl.webp',
        designation: USFlag,
        destinationName: 'United State',
        quote: "I Am very very satisfied with the work done for me. He delivered the most excellent diagrams and I explanations of them. He was so thorough and timely he delivered his work on time just like he said he I would. He is one that can bring your imagination to real life and he's the man for any job in this :category, in this field. I highly recommend him!",
    },
]

export const VI_TESTIMONIALS: Testimonial[] = [
    {
        name: 'bazzyman62',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: CanadaFlag,
        destinationName: 'Canada',
        quote: 'Tác phong làm việc, khả năng thiết kế và giao tiếp tuyệt vời. Rất thành thạo trong lĩnh vực của mình. Tôi đã mạo hiểm hợp tác với anh ấy dù biết đây là người mới trên Fiverr, và đó là quyết định đúng đắn. Tôi hoàn toàn tin tưởng, sẽ tiếp tục hợp tác cho 3 dự án nữa. Rất đáng để giới thiệu.',
    },
    {
        name: 'dhruvalpatel113',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/u2hou7kubmxjhdh3thwf.webp',
        designation: IndiaFlag,
        destinationName: 'India',
        quote: 'Làm việc với Phong rất thuận tiện. Tôi chắc chắn sẽ giới thiệu vì anh ấy rất nỗ lực đáp ứng yêu cầu và tiến độ gấp của dự án. Tôi thực sự đánh giá cao công việc đã làm, một người tuyệt vời để hợp tác.',
    },
    {
        name: 'bayronalexan157',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: ColombiaFlag,
        destinationName: 'Colombia',
        quote: 'Một người tuyệt vời để làm việc cùng, giao tiếp tốt, hiểu được thiết kế từ hình ảnh isometric và có thể tạo mô hình 3D để gia công. Tôi rất hài lòng khi làm việc với PHONG, đánh giá anh ấy là một kỹ sư thực thụ và mong được hợp tác cho nhiều dự án trong tương lai. Anh ấy chắc chắn là người bạn nên có trong đội thiết kế.',
    },
    {
        name: 'deboudek',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: GermanyFlag,
        destinationName: 'Germany',
        quote: 'Dịch vụ xuất sắc, vượt ngoài mong đợi, kết quả tuyệt vời và hoàn thành sớm hơn dự kiến. Anh ấy có nhiều kinh nghiệm trong thiết kế cơ khí, bạn chỉ cần đưa yêu cầu và chờ kết quả mà không cần lo lắng. 100% khuyến nghị, chúng tôi chắc chắn sẽ tiếp tục hợp tác.',
    },
    {
        name: 'alfrednorrls365',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/cfkizp1lwzmmipaezn1u.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Công việc thật sự xuất sắc. Nhanh, chính xác, giao tiếp dễ dàng. Rất tôn trọng và chuyên nghiệp. Sẽ tiếp tục hợp tác. Đừng ngần ngại hợp tác nếu bạn đang cân nhắc. Anh ấy sẵn sàng chỉnh sửa mà không hề phàn nàn.',
    },
    {
        name: 'kemelkheloulati',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: AlgeriaFlag,
        destinationName: 'Algeria',
        quote: 'Tôi vừa có cơ hội sử dụng dịch vụ CAD của Phong và thực sự ấn tượng. Anh ấy thể hiện sự chuyên nghiệp và chuyên môn tuyệt vời, chuyển đổi yêu cầu của tôi thành bản thiết kế CAD chi tiết và chính xác. Khả năng chú ý đến từng chi tiết thật đáng kinh ngạc.',
    },
    {
        name: 'praxmarket',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: UKFlag,
        destinationName: 'Vương Quốc Anh',
        quote: 'Tôi hoàn toàn hài lòng với dịch vụ từ Phong. Anh ấy đã nỗ lực vượt mong đợi để giúp tôi tìm ra thiết kế hoàn hảo. Chất lượng sản phẩm khiến tôi rất ấn tượng. Chắc chắn tôi sẽ tiếp tục đặt hàng lần tới.',
    },
    {
        name: 'jonjapltana',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ctdf8kifakw6u4rk4vyw.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Phamtienphong là một người tài năng và sáng tạo, luôn là niềm vui khi làm việc cùng. Tôi sẽ tiếp tục hợp tác trong tương lai.',
    },
    {
        name: 'amara_vayder',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/qcdcgzd31oxxsvetsel8.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Làm việc với anh ấy thật tuyệt vời. Giao đúng hạn, giao tiếp tốt, nhiệt tình và kiên nhẫn. Vượt xa mong đợi của tôi. Công việc chi tiết và chất lượng cao.',
    },
    {
        name: 'the7express',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/xudvt3ceeqripq8m2pwk.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Sau khi 3 người bán khác không thể làm đúng mô hình tàu như tôi muốn, tôi đã cho CSD cơ hội và họ làm chính xác từng chi tiết, y như thật. Sẽ tiếp tục đặt hàng!',
    },
    {
        name: 'panther343',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/ol0t3wcphollovv1qssm.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Một công việc tuyệt vời. Bản dựng cuối cùng đẹp hơn mong đợi. Csd.phongpham chú ý từng chi tiết và rất kiên nhẫn với mọi yêu cầu. Chắc chắn sẽ hợp tác lần nữa!',
    },
    {
        name: 'novoal',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/gpnp3gqqo4e9xfu2djfc.webp',
        designation: GermanyFlag,
        destinationName: 'Germany',
        quote: 'Phamtienphong là bậc thầy thiết kế CAD cho khuôn ép nhựa, kết hợp hoàn hảo nhiều năm kinh nghiệm vào từng chi tiết tinh xảo. Thiết kế không chỉ hoạt động tốt mà còn tối ưu hóa quy trình sản xuất. Giao tiếp xuất sắc, mỗi lựa chọn thiết kế đều có lý do rõ ràng. Đây là tiêu chuẩn vàng của ngành!',
    },
    {
        name: 'theaaronestrada',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/yxfucwh8sij8bn6vrket.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Tôi rất ấn tượng với bản vẽ CAD nhận được: rõ ràng, chính xác, nhãn mác đầy đủ, kích thước chuẩn. Công ty sẵn sàng đáp ứng yêu cầu đặc biệt, phản hồi nhanh chóng và luôn cố gắng để tôi hài lòng. Chắc chắn sẽ hợp tác tiếp và giới thiệu cho người khác.',
    },
    {
        name: 'jemueljeremlah',
        src: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1750334916/Cadsquad/Testimonials/m77qczlfl2feceniyjkl.webp',
        designation: USFlag,
        destinationName: 'Hoa Kỳ',
        quote: 'Tôi cực kỳ hài lòng với công việc đã nhận. Bản vẽ chi tiết, giải thích rõ ràng, hoàn thành đúng hạn như cam kết. Anh ấy có thể biến ý tưởng thành hiện thực và là người phù hợp cho mọi dự án CAD. Rất đáng để giới thiệu!',
    },
]
