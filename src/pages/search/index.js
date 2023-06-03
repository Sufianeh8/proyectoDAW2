import { Product } from "@/api";

export { default } from "./search";

export async function getServerSideProps(context) {
  const {
    query: { s, page = 1 },
  } = context;

  const productCtrl = new Product();
  const response = await productCtrl.searchProducts(s, page);

  return {
    props: {
      products: response.data,
      pagination: response.meta.pagination,
      searchText: s,
    },
  };
}
