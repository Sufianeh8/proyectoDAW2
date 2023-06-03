import { Brand, Product } from "@/api";

export { default } from "./brand";

export async function getServerSideProps(context) {
  const {
    params: { brand },
    query: { page = 1 },
  } = context;

  const brandCtrl = new Brand();
  const responseBrand = await brandCtrl.getBySlug(brand);

  const productCtrl = new Product();
  const responseProducts = await productCtrl.getProductsByBrandSlug(
    brand,
    page
  );

  return {
    props: {
      brand: responseBrand,
      products: responseProducts.data,
      pagination: responseProducts.meta.pagination,
    },
  };
}
