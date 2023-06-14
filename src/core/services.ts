import { OrderModel } from './models';
import { OrderArraySchema } from './schemas';

export default async function getOrders(): Promise<OrderModel[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}/api/orders.json`);
  const data: unknown = await response.json();
  return OrderArraySchema.parse(data);
}
