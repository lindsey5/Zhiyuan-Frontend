import * as z from 'zod';

export const paymentSchema = z.object({
    payment_method: z
        .string()
        .min(1, "Payment method is required"),
    payment: z.number().positive('Payment is required')

});

export type PaymentFormData = z.infer<typeof paymentSchema>;