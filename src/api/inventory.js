import { ENV, authFetch } from "@/utils";

export class Inventory {
  async getById(id) {
    try {
      const filters = `filters[id][$eq][0]=${id}`;
      const populate = `populate[0]=size&populate[1]=product`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.INVENTORY}?${filters}&${populate}`;

      const response = await fetch(url);

      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async putNewQuantity(id, newQuantity) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.INVENTORY}/${id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            quantity: newQuantity,
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

  async getByProductId(id) {
    try {
      const filters = `filters[id][$eq][0]=${id}`;
      const populate = `populate[0]=product`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.INVENTORY}?${filters}&${populate}`;

      const response = await fetch(url);

      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSizes(id) {
    try {
      const filters = `filters[product][id][$eq][0]=${id}`;
      const populate = `populate[0]=product&populate[1]=size`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.INVENTORY}?${filters}&${populate}`;

      const response = await fetch(url);

      const result = await response.json();
      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getByInventoryId(id, size) {
    try {
      const filters = `filters[product][id][$eq][0]=${id}&filters[size][id][$eq][1]=${size}`;
      const populate = `populate[0]=product`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.INVENTORY}?${filters}&${populate}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
