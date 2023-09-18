/**
 *
 * @export
 * @interface CreateOrderRequest
 */
export interface CreateOrderRequest {
  /**
   *
   * @type {MoneyAmount}
   * @memberof CreateOrderRequest
   */
  amount: MoneyAmount;
  /**
   * Description of the order
   * @type {string}
   * @memberof CreateOrderRequest
   */
  description: string;
  /**
   * Url to redirect after paying order
   * @type {string}
   * @memberof CreateOrderRequest
   */
  returnUrl?: string;
  /**
   * Url to redirect after unsuccessful order completion (expiration/cancelation/etc)
   * @type {string}
   * @memberof CreateOrderRequest
   */
  failReturnUrl?: string;
  /**
   *
   * @type {CustomData}
   * @memberof CreateOrderRequest
   */
  customData?: CustomData;
  /**
   *
   * @type {ExternalId}
   * @memberof CreateOrderRequest
   */
  externalId: ExternalId;
  /**
   * Order TTL, if the order is not paid within the timeout period
   * @type {number}
   * @memberof CreateOrderRequest
   */
  timeoutSeconds: number;
  /**
   * The customer's telegram id (`User_id`). For more details please follow the link https://core.telegram.org/bots/api#available-types
   * @type {number}
   * @memberof CreateOrderRequest
   */
  customerTelegramUserId: number;
}
/**
 *
 * @export
 * @interface CreateOrderResponse
 */
export interface CreateOrderResponse {
  /**
   * `SUCCESS` - new order created; `data` is present. `ALREADY` - order with completely same parameters including externalId already exists; `data` is present. `CONFLICT` - order with different parameters but same externalId already exists; `data` is absent. `ACCESS_DENIED` - you're not permitted to create orders, contact support in this case; `data` is absent. `INVALID_REQUEST` - we failed to handle your request, check that all required fields sent properly. `INTERNAL_ERROR` - unexpected error on our side
   * @type {string}
   * @memberof CreateOrderResponse
   */
  status: OrderStatusEnum;
  /**
   * Verbose reason of non-success result
   * @type {string}
   * @memberof CreateOrderResponse
   */
  message?: string;
  /**
   *
   * @type {OrderPreview}
   * @memberof CreateOrderResponse
   */
  data?: OrderPreview;
}

/**
 * @export
 * @enum {string}
 */
export enum OrderStatusEnum {
  SUCCESS = "SUCCESS",
  ALREADY = "ALREADY",
  CONFLICT = "CONFLICT",
  ACCESSDENIED = "ACCESS_DENIED",
  INVALIDREQUEST = "INVALID_REQUEST",
  INTERNALERROR = "INTERNAL_ERROR",
}
/**
 * Any custom string, will be provided through webhook and order status polling
 * @export
 */
export type CustomData = string;
/**
 * Order ID in Merchant system. Use to prevent orders duplication due to request retries
 * @export
 */
export type ExternalId = string;
/**
 *
 * @export
 * @interface GetOrderPreviewResponse
 */
export interface GetOrderPreviewResponse {
  /**
   * Operation result status, always present
   * @type {string}
   * @memberof GetOrderPreviewResponse
   */
  status: StatusEnum;
  /**
   * Verbose reason of non-success result
   * @type {string}
   * @memberof GetOrderPreviewResponse
   */
  message?: string;
  /**
   *
   * @type {OrderPreview}
   * @memberof GetOrderPreviewResponse
   */
  data?: OrderPreview;
}

/**
 *
 * @export
 * @interface GetOrderReconciliationListResponse
 */
export interface GetOrderReconciliationListResponse {
  /**
   * Operation result status, always present
   * @type {string}
   * @memberof GetOrderReconciliationListResponse
   */
  status: StatusEnum;
  /**
   * Verbose reason of non-success result
   * @type {string}
   * @memberof GetOrderReconciliationListResponse
   */
  message?: string;
  /**
   *
   * @type {OrderReconciliationList}
   * @memberof GetOrderReconciliationListResponse
   */
  data?: OrderReconciliationList;
}

/**
 *
 * @export
 * @interface MoneyAmount
 */
export interface MoneyAmount {
  /**
   * Currency code
   * @type {string}
   * @memberof MoneyAmount
   */
  currencyCode: CurrencyCodeEnum;
  /**
   * Big decimal string representation
   * @type {string}
   * @memberof MoneyAmount
   */
  amount: string;
}

/**
 * @export
 * @enum {string}
 */
export enum CurrencyCodeEnum {
  TON = "TON",
  BTC = "BTC",
  USDT = "USDT",
  EUR = "EUR",
  USD = "USD",
  RUB = "RUB",
}
/**
 * Response payload, present if status is SUCCESS
 * @export
 * @interface OrderAmount
 */
export interface OrderAmount {
  /**
   * Store orders total amount
   * @type {number}
   * @memberof OrderAmount
   */
  totalAmount: number;
}
/**
 *
 * @export
 * @interface OrderAmountResponse
 */
export interface OrderAmountResponse {
  /**
   * Operation result status, always present
   * @type {string}
   * @memberof OrderAmountResponse
   */
  status: StatusEnum;
  /**
   * Verbose reason of non-success result
   * @type {string}
   * @memberof OrderAmountResponse
   */
  message?: string;
  /**
   *
   * @type {OrderAmount}
   * @memberof OrderAmountResponse
   */
  data?: OrderAmount;
}

/**
 * @export
 * @namespace OrderAmountResponse
 */
export enum StatusEnum {
  SUCCESS = "SUCCESS",
  INVALIDREQUEST = "INVALID_REQUEST",
  INTERNALERROR = "INTERNAL_ERROR",
}
/**
 * Order id
 * @export
 */
export type OrderId = number;
/**
 * Human-readable short order id shown to a customer
 * @export
 */
export type OrderNumber = string;
/**
 * Response payload, present if status is SUCCESS
 * @export
 * @interface OrderPreview
 */
export interface OrderPreview {
  /**
   * Order id
   * @type {string}
   * @memberof OrderPreview
   */
  id: string;
  /**
   *
   * @type {OrderStatus}
   * @memberof OrderPreview
   */
  status: OrderStatus;
  /**
   *
   * @type {OrderNumber}
   * @memberof OrderPreview
   */
  number: OrderNumber;
  /**
   *
   * @type {MoneyAmount}
   * @memberof OrderPreview
   */
  amount: MoneyAmount;
  /**
   * ISO-8601 date time when order was created
   * @type {Date}
   * @memberof OrderPreview
   */
  createdDateTime: Date;
  /**
   * ISO-8601 date time when order timeout expires
   * @type {Date}
   * @memberof OrderPreview
   */
  expirationDateTime: Date;
  /**
   * ISO-8601 date time when order was completed (paid/expired/etc)
   * @type {Date}
   * @memberof OrderPreview
   */
  completedDateTime?: Date;
  /**
   * URL to be shown to the payer by the store. Сan be used in 'Telegram Bot' only.  **Important:** this link can be opened ONLY in dialog with Telegram-bot specified in your Store, ONLY by user with `telegramUserId` specified in the Order.
   * @type {string}
   * @memberof OrderPreview
   */
  payLink: string;
  /**
   * URL to be shown to the payer by the store. Can be used in 'Telegram Bot' and 'Telegram Web App'.  **Important:** this link can be opened ONLY in dialog with Telegram-bot specified in your Store, ONLY by user with `telegramUserId` specified in the Order.
   * @type {string}
   * @memberof OrderPreview
   */
  directPayLink: string;
}
export interface OrderPreviewQueryParams {
  /**
   * Order id
   * @type {string}
   * @memberof OrderPreviewQueryParams
   */
  id: string;
}
/**
 *
 * @export
 * @interface OrderReconciliationItem
 */
export interface OrderReconciliationItem {
  /**
   *
   * @type {OrderId}
   * @memberof OrderReconciliationItem
   */
  id: OrderId;
  /**
   *
   * @type {OrderStatus}
   * @memberof OrderReconciliationItem
   */
  status: OrderStatus;
  /**
   *
   * @type {MoneyAmount}
   * @memberof OrderReconciliationItem
   */
  amount: MoneyAmount;
  /**
   *
   * @type {string}
   * @memberof OrderReconciliationItem
   */
  externalId: string;
  /**
   * The order customer telegram id
   * @type {number}
   * @memberof OrderReconciliationItem
   */
  customerTelegramUserId?: number;
  /**
   * ISO-8601 date time when order was created
   * @type {Date}
   * @memberof OrderReconciliationItem
   */
  createdDateTime: Date;
  /**
   * ISO-8601 date time when order timeout expires
   * @type {Date}
   * @memberof OrderReconciliationItem
   */
  expirationDateTime: Date;
  /**
   * ISO-8601 date time when order was paid
   * @type {Date}
   * @memberof OrderReconciliationItem
   */
  paymentDateTime?: Date;
  /**
   *
   * @type {PaymentOption}
   * @memberof OrderReconciliationItem
   */
  selectedPaymentOption?: PaymentOption;
}
/**
 * Response payload, present if status is SUCCESS
 * @export
 * @interface OrderReconciliationList
 */
export interface OrderReconciliationList {
  /**
   *
   * @type {Array<OrderReconciliationItem>}
   * @memberof OrderReconciliationList
   */
  items: Array<OrderReconciliationItem>;
}
export interface OrderReconciliationListQueryParams {
  /**
   * Specifying the amount of excluded from a response the first N orders
   * @type {number}
   * @memberof OrderReconciliationListQueryParams
   */
  offset: number;
  /**
   * Specifying the limit of orders for the request
   * @type {number}
   * @memberof OrderReconciliationListQueryParams
   */
  count: number;
}

/**
 * Order status
 * @export
 * @enum {string}
 */
export enum OrderStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}
/**
 * User selected payment option. Payer paid the `amount`; you received the `amountNet`; our service took the `amountFee`;   The `amount` here may differ from `amount` in the Order because payer can choose in which currency he wants to pay  (similar to a situation when price in a shop is written in USD, but you can pay with your EUR debit card)  Currently autoconvertation is not implemented, so you’ll receive the currency that payer has chosen
 * @export
 * @interface PaymentOption
 */
export interface PaymentOption {
  /**
   *
   * @type {MoneyAmount}
   * @memberof PaymentOption
   */
  amount: MoneyAmount;
  /**
   *
   * @type {MoneyAmount}
   * @memberof PaymentOption
   */
  amountFee: MoneyAmount;
  /**
   *
   * @type {MoneyAmount}
   * @memberof PaymentOption
   */
  amountNet: MoneyAmount;
  /**
   * Exchange rate of `order.currency` to `payment.currency`
   * @type {string}
   * @memberof PaymentOption
   */
  exchangeRate: string;
}
/**
 * Notification about completed Order
 * @export
 * @interface WebhookMessage
 */
export interface WebhookMessage {
  /**
   * ISO-8601 when order was completed
   * @type {Date}
   * @memberof WebhookMessage
   */
  eventDateTime: Date;
  /**
   * Idempotency key. We send a max of one type of webhook message for one event.
   * @type {number}
   * @memberof WebhookMessage
   */
  eventId: number;
  /**
   *
   * @type {WebhookMessageType}
   * @memberof WebhookMessage
   */
  type: WebhookMessageType;
  /**
   *
   * @type {WebhookPayload}
   * @memberof WebhookMessage
   */
  payload: WebhookPayload;
}
/**
 * Type of webhook message
 * @export
 * @enum {string}
 */
export enum WebhookMessageType {
  FAILED = "ORDER_FAILED",
  PAID = "ORDER_PAID",
}
/**
 * Order data. SelectedPaymentOption is absent for failed orders. Status is absent for paid orders.
 * @export
 * @interface WebhookPayload
 */
export interface WebhookPayload {
  /**
   *
   * @type {OrderId}
   * @memberof WebhookPayload
   */
  id: OrderId;
  /**
   *
   * @type {OrderNumber}
   * @memberof WebhookPayload
   */
  number: OrderNumber;
  /**
   *
   * @type {ExternalId}
   * @memberof WebhookPayload
   */
  externalId: ExternalId;
  /**
   *
   * @type {OrderStatus}
   * @memberof WebhookPayload
   */
  status?: OrderStatus;
  /**
   *
   * @type {CustomData}
   * @memberof WebhookPayload
   */
  customData?: CustomData;
  /**
   *
   * @type {MoneyAmount}
   * @memberof WebhookPayload
   */
  orderAmount: MoneyAmount;
  /**
   *
   * @type {PaymentOption}
   * @memberof WebhookPayload
   */
  selectedPaymentOption?: PaymentOption;
  /**
   * ISO 8601 timestamp indicating the time of order completion, in UTC
   * @type {Date}
   * @memberof WebhookPayload
   */
  orderCompletedDateTime: Date;
}
