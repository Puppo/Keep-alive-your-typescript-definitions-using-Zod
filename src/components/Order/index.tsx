import { ReactElement } from 'react';
import { z } from 'zod'
import DeliveryOrder from './DeliveryOrder';
import DraftOrder from './DraftOrder';
import InProgressOrder from './InProgressOrder';
import ShipOrder from './ShipOrder';
import { OrderSchema } from '../../core/schemas';
import { withZodValidation } from '../../utils';

const OrderPropsSchema = z.object({
    order: OrderSchema,
    onView: z.function().args(OrderSchema).returns(z.void()),
    onDelete: z.function().args(OrderSchema).returns(z.void()),
})

function Order({ order, onView, onDelete }: z.infer<typeof OrderPropsSchema>): ReactElement | null {
    switch (order.type) {
        case 'draft':
            return <DraftOrder onView={onView} onDelete={onDelete} order={order} />;
        case 'progress':
            return <InProgressOrder order={order} onView={onView} />;
        case 'ship':
            return <ShipOrder order={order} onView={onView} />;
        case 'delivery':
            return <DeliveryOrder order={order} onView={onView} />;
    }
}

export default withZodValidation(OrderPropsSchema)(Order)