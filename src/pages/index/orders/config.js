/**
 * OrderStateDeleted = 0,  //已删除   （左：无，右：无）
  OrderStateWaitPay = 10,  //待付款（左：取消，右：去支付）
  
  OrderStatePayed = 20,   //已付款       （左：无，右：催发货）
  OrderStateWaitShip = 30,    //待发货  （左：无，右：催发货）
  OrderStateWaitRecv = 40,    //待收货 （左：查看物流，右：确认收货）
  
  OrderStateDone = 50,  //交易完成       （左：无，右：删除订单）
  OrderStateClose = 60,   //交易关闭     （左：无，右：删除订单）
  OrderStateWaitReview = 70,   //待评价（左：删除订单，右：去评价）
  OrderStateReviewed = 80,    //已评价  （左：删除订单，查看评价）
  */
export const btnKey = {
  10: ['cancel', 'toPay'],
  20: ['driver'],
  30: ['driver', 'confirm'],
  40: ['logistics', 'confirm'],
  50: ['delorder', 'evaluation'],
  60: ['delorder'],
  70: ['delorder', 'evaluation'],
  80: ['delorder', 'seeEvaluation']
}
export const btnTexts = {
  10: ['取消', '去支付'],
  20: ['催发货'],
  30: ['催发货'],
  40: ['物流信息', '确认收货'],
  50: ['删除订单'],
  60: ['删除订单'],
  70: ['删除订单', '去评价'],
  80: ['删除订单', '查看评价']
}
export const statusObj = {
  10:'待付款',
  20:'已付款',
  30:'待发货',
  40:'待收货',
  50:'交易完成',
  60:'交易关闭',
  70:'待评价',
  80:'已评价'
}
export const redirectUri = 'https%3A%2F%2Fstarmall.ipxmall.com%2Forder%2Forders'