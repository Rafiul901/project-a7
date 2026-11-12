import { z } from "zod";

export const createPaymentSchema = z.object({
  parcelId: z
    .number()
    .int("Invalid parcel ID")
    .positive("Please select a valid parcel"),
});

export type CreatePaymentFormValues = z.infer<
  typeof createPaymentSchema
>;