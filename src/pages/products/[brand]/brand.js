import {
  NoResult,
  Pagination,
  Separator,
  GridProducts,
  Seo,
} from "@/components/Shared";
import { BasicLayout } from "@/layouts/BasicLayout";
import { size } from "lodash";
import { Container, Grid } from "semantic-ui-react";

export default function Brand(props) {
  const { products, brand, pagination } = props;
  const hasProducts = size(products) > 0;

  return (
    <>
      <Seo title={`OVO Shop - ${brand.attributes.title}`} />
      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{brand.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridProducts products={products} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoría ${brand.attributes.title}`}
              aún
              no
              tiene
              productos
            />
          )}
        </Container>
      </BasicLayout>
    </>
  );
}
