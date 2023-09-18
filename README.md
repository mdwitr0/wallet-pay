# Wallet Pay client for TS/JS

It's a client for [Wallet Pay](https://wallet.tg) API written in TypeScript.

## Installation

```bash
npm install telegram-wallet-pay
```

## Usage

Create a new instance of `WalletPay` class and pass the token as a parameter. You can get the token on [Wallet Pay](https://wallet.tg).

```typescript
import { WalletPay } from "telegram-wallet-pay";

const wallet = new WalletPay("Store token");
```

Create a new order using `createOrder` method. You can pass the `order` object as a parameter.

<details>
  <summary>Order object interface:</summary>

```typescript
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
```

</details>

```typescript
import { WalletPay } from "telegram-wallet-pay";

async function main() {
  const wallet = new WalletPay("Store token");

  const order = await wallet.createOrder({
    amount: {
      currencyCode: "USD",
      amount: "1.00",
    },
    description: "VPN for 1 month",
    returnUrl: "https://t.me/wallet",
    failReturnUrl: "https://t.me/wallet",
    customData: "client_ref=4E89",
    externalId: "ORD-5023-4E89",
    timeoutSeconds: 10800,
    customerTelegramUserId: 0,
  });

  console.log(order);
  // Response:
  // {
  //     "status": "SUCCESS",
  //     "message": "",
  //     "data": {
  //         "id": 2703383946854401,
  //         "status": "ACTIVE",
  //         "number": "9aeb581c",
  //         "amount": {},
  //         "createdDateTime": "2019-08-24T14:15:22Z",
  //         "expirationDateTime": "2019-08-24T14:15:22Z",
  //         "completedDateTime": "2019-08-24T14:15:22Z",
  //         "payLink": "https://t.me/wallet?startattach=wpay_order_2703383946854401",
  //         "directPayLink": "https://t.me/wallet/start?startapp=wpay_order-orderId__2703383946854401"
  //     }
  // }
}
```

<details>
  <summary>Response order interface:</summary>

```ts
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

export enum OrderStatusEnum {
  SUCCESS = "SUCCESS",
  ALREADY = "ALREADY",
  CONFLICT = "CONFLICT",
  ACCESSDENIED = "ACCESS_DENIED",
  INVALIDREQUEST = "INVALID_REQUEST",
  INTERNALERROR = "INTERNAL_ERROR",
}
```

</details>

Get order by id using `getOrderPreview` method. You can pass the `orderId` as a parameter.

```ts
import { WalletPay } from "telegram-wallet-pay";

async function main() {
  const wallet = new WalletPay("Store token");

  const order = await wallet.getOrderPreview("Order id");

  console.log(order);
  // Response:
  // {
  //   "status": "SUCCESS",
  //   "message": "",
  //   "data": {
  //     "id": 2703383946854401,
  //     "status": "ACTIVE",
  //     "number": "9aeb581c",
  //     "amount": {
  //       "currencyCode": "USD",
  //       "amount": "1.00"
  //     },
  //     "createdDateTime": "2019-08-24T14:15:22Z",
  //     "expirationDateTime": "2019-08-24T14:15:22Z",
  //     "completedDateTime": "2019-08-24T14:15:22Z",
  //     "payLink": "https://t.me/wallet?startattach=wpay_order_2703383946854401",
  //     "directPayLink": "https://t.me/wallet/start?startapp=wpay_order-orderId__2703383946854401"
  //   }
  // }
}
```

### Webhook

For using webhook you need to implement http server and endpoint by yourself. For this, the library provides webhook interfaces.
Webhook documentation: [https://docs.wallet.tg/pay/#operation/completedOrder](https://docs.wallet.tg/pay/#operation/completedOrder)

<details>
  <summary>Webhook interfaces:</summary>

```ts
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
```

</details>

Other methods are similar to the methods described above.
