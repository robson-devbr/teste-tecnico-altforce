
export interface CreateOrderItemDTO {
    productId: string;
    quantity: number;
}

export interface CreateOrderDTO {
    userId: string;
    items: CreateOrderItemDTO[];
}
// 