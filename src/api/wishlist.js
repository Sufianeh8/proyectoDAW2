import { ENV, authFetch } from "@/utils";

export class Wishlist {
  async check(userId, productId) {
    try {
      const filterUser = `filters[user][id][$eq][0]=${userId}`;
      const filterProduct = `filters[product][id][$eq][1]=${productId}`;
      const urlParams = `${filterUser}&${filterProduct}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      if (result.data.length === 0) {
        return false;
      }

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async add(userId, productId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            user: userId,
            product: productId,
          },
        }),
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${id}`;
      const params = {
        method: "DELETE",
      };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const populate = `populate[0]=product&populate[1]=product.cover`;
      const urlParams = `${filters}&${populate}`;

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;
      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
