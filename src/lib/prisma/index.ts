import { envConfig } from "@/config"
import { PrismaClient } from "../../generated/prisma/client"

// Khởi tạo function tạo Prisma Client
const prismaClientSingleton = () => {
	return new PrismaClient({
		datasources: {
			db: {
				url: envConfig.database.url
			}
		},
		log: ['query', 'info', 'warn', 'error'], // Log các query ra console
	})
}

// Khai báo kiểu cho biến global (tránh lỗi TypeScript)
declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

// Sử dụng instance có sẵn trong global (nếu có), nếu không thì tạo mới
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export { prisma }

// Trong môi trường dev, gán instance vào biến global để giữ lại sau khi hot-reload
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma