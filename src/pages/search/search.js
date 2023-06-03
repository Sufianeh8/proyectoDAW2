import { BasicLayout } from "@/layouts/BasicLayout";
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import {
  GridProducts,
  NoResult,
  Pagination,
  Separator,
  Seo,
} from "@/components/Shared";
import { useEffect } from "react";

export default function SearchPage(props) {
  const { products, pagination, searchText } = props;
  const hasResult = size(products) > 0;

  useEffect(() => {
    document.getElementById("search-products").focus();
  }, []);

  return (
    <>
      <Seo title={"Buscando:  " + searchText} />
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Buscando: {searchText}</h2>
          {hasResult ? (
            <>
              <GridProducts products={products} />
              <Separator height={30} />
              <Pagination totalPages={pagination.pageCount} />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}
        </Container>
        <Separator height={50} />
      </BasicLayout>
    </>
  );
}
