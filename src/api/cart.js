import { forEach } from "lodash";
import { ENV, authFetch } from "@/utils";

export class Cart {
  /*
  add(productId) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === productId);

    if (objIndex < 0) {
      products.push({ id: productId, quantity: 1 });
    } else {
      const product = products[objIndex];
      products[objIndex].quantity = product.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }
  */

  add(inventId, size) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === inventId);

    if (objIndex < 0) {
      products.push({ id: inventId, size: size, quantity: 1 });
    } else {
      const product = products[objIndex];
      products[objIndex].quantity = product.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (item) => {
      count += item.quantity;
    });

    return count;
  }

  changeQuantity(productId, quantity) {
    const products = this.getAll();
    const objIndex = products.findIndex((product) => product.id === productId);

    products[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(products));
  }

  delete(productId) {
    const products = this.getAll();
    console.log(products);
    const updateGames = products.filter((product) => product.id !== productId);

    localStorage.setItem(ENV.CART, JSON.stringify(updateGames));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENY_ORDER}`;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping: address,
        }),
      };

      const response = await authFetch(url, params);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
