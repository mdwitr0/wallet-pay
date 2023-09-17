import createFetchMock from "vitest-fetch-mock";
import { expect, test, vi } from "vitest";
import {
  CreateOrderRequest,
  CurrencyCodeEnum,
  OrderReconciliationListQueryParams,
  WalletPay,
} from "../src";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("createOrder creates an order successfully", async () => {
  const wallet = new WalletPay("test_api_key");

  const order: CreateOrderRequest = {
    amount: { currencyCode: CurrencyCodeEnum.RUB, amount: "120" },
    description: "Test order",
    externalId: "ext123",
    timeoutSeconds: 300,
    customerTelegramUserId: 123456,
  };

  fetchMocker.mockResponseOnce(
    JSON.stringify({ status: "SUCCESS", data: { id: "order123" } })
  );

  const result = await wallet.createOrder(order);

  expect(result.status).toEqual("SUCCESS");
  expect(result.data?.id).toEqual("order123");
});

test("getOrderPreview retrieves order information", async () => {
  const wallet = new WalletPay("test_api_key");

  // Emulate server response
  fetchMocker.mockOnce(
    JSON.stringify({ status: "SUCCESS", data: { id: "order123" } })
  );

  const result = await wallet.getOrderPreview("order123");

  expect(result.status).toEqual("SUCCESS");
  expect(result.data?.id).toEqual("order123");
});

test("getOrderAmount retrieves the total count of orders", async () => {
  const wallet = new WalletPay("test_api_key");

  // Emulate server response
  fetchMocker.mockOnce(
    JSON.stringify({ status: "SUCCESS", data: { totalAmount: 5 } })
  );

  const result = await wallet.getOrderAmount();

  expect(result.status).toEqual("SUCCESS");
  expect(result.data?.totalAmount).toEqual(5);
});

test("getOrderList retrieves a list of store orders", async () => {
  const wallet = new WalletPay("test_api_key");

  // Emulate server response
  fetchMocker.mockOnce(
    JSON.stringify({ status: "SUCCESS", data: { items: [] } })
  );

  const params: OrderReconciliationListQueryParams = { offset: 0, count: 5 };
  const result = await wallet.getOrderList(params);

  expect(result.status).toEqual("SUCCESS");
  expect(Array.isArray(result.data?.items)).toEqual(true);
});
