import { BasicLayout } from "@/layouts/BasicLayout";
import { Game } from "@/components/Game";
import { Separator, Seo } from "@/components/Shared";

export default function ProductPage(props) {
  const { product } = props;

  const wallpaper = product.attributes.wallpaper;

  return (
    <>
      <Seo title={product.attributes.title} />
      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaper.data.attributes.url} />
        <Game.Panel productId={product.id} product={product.attributes} />
        <Separator height={50} />
        <Game.Media
          video={product.attributes.video}
          gallery={product.attributes.gallery.data}
        />
        <Separator height={90} />
        <Game.Info product={product.attributes} />
        <Separator height={50} />
      </BasicLayout>
    </>
  );
}

/* 

*/
