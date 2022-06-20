
export class OrderModel
{
  constructor(
    public orderID: number,
    public itemName: string,
    public itemQty: number,
    public orderCreator: number,
    public orderCutoffDate: Date,
    public orderTeaID: number
    ) { }
}