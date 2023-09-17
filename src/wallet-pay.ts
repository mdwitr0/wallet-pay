import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderReconciliationListResponse,
  OrderAmountResponse,
  OrderReconciliationListQueryParams,
} from "./types";
import { RequiredError } from "./errors";

export class WalletPay {
  private readonly AUTH_KEY = "Wpay-Store-Api-Key";
  private readonly BASE_URL = "https://pay.wallet.tg/wpay/store-api/v1";
  constructor(private readonly storeApiKey: string) {}

  /**
   * Create an order
   * @param {CreateOrderRequest} body
   * @returns {Promise<CreateOrderResponse>}
   * @throws {RequiredError}
   * @memberof WalletPay
   * @see https://docs.wallet.tg/pay/#tag/Order/operation/create
   */
  public async createOrder(
    body: CreateOrderRequest
  ): Promise<CreateOrderResponse> {
    if (!body) throw new RequiredError("request is required");
    if (!body.amount) throw new RequiredError("amount is required");
    if (!body.amount.amount)
      throw new RequiredError("amount.amount is required");
    if (!body.amount.currencyCode)
      throw new RequiredError("amount.currencyCode is required");
    if (!body.externalId) throw new RequiredError("externalId is required");
    if (!body.timeoutSeconds)
      throw new RequiredError("timeoutSeconds is required");
    if (!body.description) throw new RequiredError("description is required");
    if (!body.customerTelegramUserId)
      throw new RequiredError("customerTelegramUserId is required");

    return await this.request<CreateOrderResponse, never, CreateOrderRequest>({
      path: `/order`,
      method: "POST",
      body,
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

    return await this.request<CreateOrderResponse, never, CreateOrderRequest>({
      path: `/order/${id}`,
      method: "GET",
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
