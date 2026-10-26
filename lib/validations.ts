import { z } from "zod";

export const BookingEnquirySchema = z.object({
  vehicleId: z.string().min(1, "Vehicle selection is required"),
  customerName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name is too long"),
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(25, "Phone number is too long"),
  pickupLocationId: z.string().min(1, "Pickup location is required"),
  pickupLocationName: z.string().min(1, "Pickup location name is required"),
  returnLocationId: z.string().min(1, "Return location is required"),
  returnLocationName: z.string().min(1, "Return location name is required"),
  pickupDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid pickup date format",
  }),
  pickupTime: z.string().min(1, "Pickup time is required"),
  returnDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid return date format",
  }),
  returnTime: z.string().min(1, "Return time is required"),
  customerNotes: z.string().max(1000).optional().default(""),
  driverAgeConfirmed: z.boolean().refine((val) => val === true, {
    message: "You must confirm the driver meets the minimum age requirement",
  }),
  policyAcknowledged: z.boolean().refine((val) => val === true, {
    message: "You must agree to the rental terms and cancellation policy",
  }),
});

export type BookingEnquiryInput = z.infer<typeof BookingEnquirySchema>;
