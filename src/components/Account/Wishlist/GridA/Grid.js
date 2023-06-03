import styles from "./Grid.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn, ENV } from "@/utils";

export function Grid(props) {
  const { wishlist, onReload } = props;

  return (
    <div className={styles.grid}>
      {map(wishlist, (item) => {
        const product = item.attributes.product.data;
        const cover = product.attributes.cover.data;

        return (
          <div key={item.id} className={styles.product}>
            <Link href={`/${product.attributes.slug}`}>
              <div>
                <img src={ENV.SERVER_HOST + cover.attributes.url}></img>

                {product.attributes.discount > 0 && (
                  <Label.Discount className={styles.discount}>
                    {`-${product.attributes.discount} %`}
                  </Label.Discount>
                )}
              </div>

              <div>
                <span>{product.attributes.title}</span>
                <span className={styles.price}>
                  {fn.calcDiscountedPrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                  €
                </span>
              </div>
            </Link>

            <WishlistIcon
              productId={product.id}
              className={styles.wishlistIcon}
              removeCallback={onReload}
            />
          </div>
        );
      })}
    </div>
  );
}
