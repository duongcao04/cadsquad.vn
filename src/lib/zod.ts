import { z } from 'zod'

// Helper: Mimics the DTO @Transform for splitting comma-separated strings
// This allows the schema to handle both ?type=A,B (URL param) and ['A', 'B'] (Form state)
export const arrayToString = z
	.union([z.string(), z.array(z.string())])
	.optional()
	.transform((val) => {
		if (!val) return undefined
		if (Array.isArray(val)) return val.join(',')
		return val
	})

export const optionalIsoDate = z
	.string()
	.datetime({ message: 'Invalid ISO 8601 date' })
	.optional()
	.or(z.literal(''))


// --- Helper for Zod Validation (Same as before) ---
export const toFormikValidate = <T extends z.ZodType<any, any>>(schema: T) => {
	return (values: any) => {
		const result = schema.safeParse(values)
		if (!result.success) {
			const errors: Record<string, string> = {}
			result.error.issues.forEach((issue) => {
				const path = issue.path[0]
				if (path) errors[path.toString()] = issue.message
			})
			return errors
		}
		return {}
	}
}



/**
 * Helper để parse một Object đơn lẻ.
 * Nếu parse lỗi, trả về giá trị mặc định của Schema đó.
 */
export const parseData = <T>(schema: z.ZodType<T>, data: any): T => {
	const result = schema.safeParse(data ?? {});
	if (!result.success) {
		console.warn("⚠️ Zod Parse Object Error:", result.error.format());
		// Fallback về object default đã định nghĩa trong schema
		return schema.parse({});
	}
	return result.data;
};

/**
 * Helper để parse một Mảng.
 * Cơ chế: Duyệt từng phần tử, cái nào lỗi thì 'rào' bằng giá trị default 
 * để không làm chết cả danh sách.
 */
export const parseList = <T>(schema: z.ZodType<T>, data: any): T[] => {
	const rawList = Array.isArray(data) ? data : [];

	return rawList.map((item) => {
		const result = schema.safeParse(item);
		if (!result.success) {
			console.warn("⚠️ Zod Parse Item in List Error:", result.error._zod.def);
			return schema.parse({}); // Gán giá trị an toàn cho item lỗi
		}
		return result.data;
	});
};