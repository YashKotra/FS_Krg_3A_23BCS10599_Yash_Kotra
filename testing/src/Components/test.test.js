import { render, screen, waitFor } from "@testing-library/react";
import Product from "./Product";
import * as api from "../api/ProductApi";
jest.mock("../api/ProductApi");

describe("Product Component", () => {
  test("render Product with list of products", async () => {
    const mockProducts = [
      {
        id: 1,
        name: "Laptop",
        price: 999.99,
      },
    ];

    api.getProducts.mockResolvedValue(mockProducts);

    render(<Product />);
    await waitFor(() => {
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();

    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });
});
