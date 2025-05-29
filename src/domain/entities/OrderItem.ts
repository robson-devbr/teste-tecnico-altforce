
export class OrderItem {
    constructor(
        public readonly id: string, 
        public readonly orderId: string,
        public readonly productId: string,
        public quantity: number
    ) { }
}