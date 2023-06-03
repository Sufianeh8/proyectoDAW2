import styles from "./BannerLastProductPublished.module.scss";
import { useState, useEffect } from "react";
import { Product } from "@/api";
import { Container, Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import { ENV, fn } from "@/utils";
import { Label } from "@/components/Shared";
import Link from "next/link";

const productCtrl = new Product();

export function BannerLastProductPublished() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getLastPublished();
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!product) return null;

  const wallpaper = product.attributes.wallpaper;
  const releaseDate = new Date(product.attributes.releaseDate).toISOString();

  const price = fn.calcDiscountedPrice(
    product.attributes.price,
    product.attributes.discount
  );

  const lastPhoto =
    product.attributes.gallery.data[product.attributes.gallery.data.length - 1];

  //{ENV.SERVER_HOST + wallpaper.data.attributes.url}

  return (
    <div className={styles.container}>
      <Image
        src={ENV.SERVER_HOST + lastPhoto.attributes.url}
        className={styles.wallpaper}
      />

      <Link
        className={styles.infoContainer}
        href={`/${product.attributes.slug}`}
      >
        <Container>
          <span className={styles.date}>
            {DateTime.fromISO(releaseDate).minus({ days: 1 }).toRelative()}
          </span>
          <h2>{product.attributes.title}</h2>

          <p className={styles.price}>
            {product.attributes.discount ? (
              <Label.Discount>-{product.attributes.discount}%</Label.Discount>
            ) : null}
            <span className={styles.finalPrice}>{price}€</span>
          </p>
        </Container>
      </Link>
    </div>
  );
}
