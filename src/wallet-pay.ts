import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderReconciliationListResponse,
  OrderAmountResponse,
  OrderPreviewQueryParams,
  OrderReconciliationListQueryParams,
} from "./types";
import { RequiredError } from "./errors";

export class WalletPay {
  private readonly AUTH_KEY = "Wpay-Store-Api-Key";
  private readonly BASE_URL = "https://pay.wallet.tg/wpay/store-api/v1";
  constructor(private readonly storeApiKey: string) {}

  /**
   * Create an order
   * @param {CreateOrderRequest} order
   * @returns {Promise<CreateOrderResponse>}
   * @throws {RequiredError}
   * @memberof WalletPay
   * @see https://docs.wallet.tg/pay/#tag/Order/operation/create
   */
  public async createOrder(
    order: CreateOrderRequest
  ): Promise<CreateOrderResponse> {
    if (!order) throw new RequiredError("request is required");
    if (!order.amount) throw new RequiredError("amount is required");
    if (!order.amount.amount)
      throw new RequiredError("amount.amount is required");
    if (!order.amount.currencyCode)
      throw new RequiredError("amount.currencyCode is required");
    if (!order.externalId) throw new RequiredError("externalId is required");
    if (!order.timeoutSeconds)
      throw new RequiredError("timeoutSeconds is required");
    if (!order.description) throw new RequiredError("description is required");
    if (!order.customerTelegramUserId)
      throw new RequiredError("customerTelegramUserId is required");

    return await this.request<CreateOrderResponse, never, CreateOrderRequest>({
      path: `/order`,
      method: "POST",
      body: order,
    });
  }

  /**
   * Retrieve the order information
   * @param {string} id Order id
   * @throws {RequiredError}
   * @memberof WalletPay
   * @see https://docs.wallet.tg/pay/#tag/Order/operation/getPreview
   */
  public async getOrderPreview(id: string): Promise<CreateOrderResponse> {
    if (!id) throw new RequiredError("id is required");

    return await this.request<
      CreateOrderResponse,
      OrderPreviewQueryParams,
      CreateOrderRequest
    >({
      path: `/order/preview`,
      method: "GET",
      params: { id },
    });
  }

  /**
   * Returns total count of all created orders in the Store, including all - paid and unpaid
   * @throws {RequiredError}
   * @memberof WalletPay
   * @see https://docs.wallet.tg/pay/#tag/Order-Reconciliation/operation/getOrderAmount
   */
  public async getOrderAmount(): Promise<OrderAmountResponse> {
    return await this.request<OrderAmountResponse>({
      path: `/reconciliation/order-amount`,
      method: "GET",
    });
  }

  /**
   * Return list of store orders sorted by creation time in ascending order
   * @throws {RequiredError}
   * @memberof WalletPay
   * @see https://docs.wallet.tg/pay/#tag/Order-Reconciliation/operation/getOrderList
   */
  public async getOrderList(
    params: OrderReconciliationListQueryParams
  ): Promise<GetOrderReconciliationListResponse> {
    if (!params) throw new RequiredError("params is required");

    return await this.request<
      GetOrderReconciliationListResponse,
      OrderReconciliationListQueryParams
    >({
      path: `/reconciliation/order-list`,
      method: "GET",
      params,
    });
  }

  private async request<T, P = never, B = never>({
    path,
    method,
    params,
    body,
  }: {
    path: string;
    method: string;
    params?: P;
    body?: B;
  }): Promise<T> {
    let url = `${this.BASE_URL}${path}`;
    const request: RequestInit = {
      method,
      headers: {
        [this.AUTH_KEY]: this.storeApiKey,
        "Content-Type": "application/json",
      },
    };

    if (body) request.body = JSON.stringify(body);
    if (params) url += `?${new URLSearchParams(params).toString()}`;

    const response = await fetch(url, request);

    return await response.json();
  }
}
