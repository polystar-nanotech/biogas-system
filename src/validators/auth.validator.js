import { z } from 'zod';

export const RegisterUserObject = z.object({
  names: z.string().min(3, { message: 'Names must be at least 3 characters long' }),
  telephone: z.string().min(1, { message: 'Telephone number is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  address: z.object({
    cell: z.string().min(1, { message: 'Cell field is required' }),
    sector: z.string().min(1, { message: 'Sector field is required' }),
    district: z.string().min(1, { message: 'District field is required' }),
    province: z.string().min(1, { message: 'Province field is required' }),
    village: z.string().min(1, { message: 'Village field is required' }),
    latitude: z.string().refine((value) => /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/.test(value), {
      message: 'Invalid latitude format'
    }),
    longitude: z
      .string()
      .refine((value) => /^[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/.test(value), {
        message: 'Invalid longitude format'
      })
  })
});

export const LoginUserObject = z.object({
  telephone: z.string().min(1, { message: 'Telephone number is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});