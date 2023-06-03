import { BasicLayout } from "@/layouts/BasicLayout";
import { Home } from "@/components/Home";
import { Container } from "semantic-ui-react";
import { Separator, InfoBar, BannerAd, Seo } from "@/components/Shared";

const brandsId = {
  nike: 1,
  adidas: 2,
  converse: 3,
};

export default function HomePage() {
  return (
    <>
      <Seo />
      <BasicLayout>
        <Home.BannerLastProductPublished />
        <Separator height={100} />

        <Container>
          <Home.LatestProducts title="Últimos lanzamientos" />
        </Container>

        <Separator height={100} />

        <InfoBar />

        <Separator height={100} />

        <Container>
          <Home.LatestProducts title="Nike" limit={3} brandId={brandsId.nike} />
        </Container>

        <Separator height={100} />

        <BannerAd
          title="DROPS"
          btnTitle="Entrar"
          btnLink="/account"
          image="/images/blog.jpg"
        />

        <Separator height={50} />

        <Container>
          <Home.LatestProducts
            title="Adidas"
            limit={3}
            brandId={brandsId.adidas}
          />
        </Container>

        <Separator height={100} />
      </BasicLayout>
    </>
  );
}
