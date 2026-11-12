import { z } from "zod";

export const createParcelSchema = z.object({
  receiverName: z
    .string()
    .min(2, "Receiver name must be at least 2 characters"),

  receiverPhone: z
    .string()
    .min(7, "Please enter a valid receiver phone number"),

  pickupAddress: z
    .string()
    .min(5, "Pickup address is required"),

  deliveryAddress: z
    .string()
    .min(5, "Delivery address is required"),

  weight: z
    .number()
    .positive("Weight must be greater than zero"),

  deliveryFee: z
    .number()
    .positive("Delivery fee must be greater than zero"),
});

export const updateParcelStatusSchema = z.object({
  status: z.enum([
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ]),

  location: z.string().optional(),

  note: z.string().optional(),
});

export type CreateParcelFormValues = z.infer<
  typeof createParcelSchema
>;

export type UpdateParcelStatusFormValues = z.infer<
  typeof updateParcelStatusSchema
>;