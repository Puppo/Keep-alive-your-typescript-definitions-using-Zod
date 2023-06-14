import { z } from 'zod';

export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const ShippingSchema = z.object({
  date: z.coerce.date(),
  trackingNumber: z.string(),
  company: z.string(),
});

export const DeliverySchema = z.object({
  date: z.coerce.date(),
  signedBy: z.string(),
});

export const CurrencySchema = z.object({
  amount: z.number(),
  currency: z.union([z.literal('USD'), z.literal('EUR')]),
});

export const DraftOrderSchema = z.object({
  type: z.literal('draft'),
  id: z.number(),
  createdAt: z.coerce.date(),
  customer: CustomerSchema,
  total: CurrencySchema,
});

export const InProgressOrderSchema = z.object({
  type: z.literal('progress'),
  id: z.number(),
  createdAt: z.coerce.date(),
  customer: CustomerSchema,
  date: z.coerce.date(),
  total: CurrencySchema,
});

export const ShipOrderSchema = z.object({
  type: z.literal('ship'),
  id: z.number(),
  createdAt: z.coerce.date(),
  customer: CustomerSchema,
  date: z.coerce.date(),
  total: CurrencySchema,
  ship: ShippingSchema,
});

export const DeliveryOrderSchema = z.object({
  type: z.literal('delivery'),
  id: z.number(),
  createdAt: z.coerce.date(),
  date: z.coerce.date(),
  customer: CustomerSchema,
  total: CurrencySchema,
  ship: ShippingSchema,
  delivery: DeliverySchema,
});

export const OrderSchema = z.union([
  DraftOrderSchema,
  InProgressOrderSchema,
  ShipOrderSchema,
  DeliveryOrderSchema,
]);

export const OrderArraySchema = z.array(OrderSchema);
