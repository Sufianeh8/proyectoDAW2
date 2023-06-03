import { useState } from "react";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn, ENV } from "@/utils";
import { useCart } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import styles from "./Panel.module.scss";

export function Panel(props) {
  const { productId, product } = props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();

  const brand = product.brand.data;
  const buyPrice = fn.calcDiscountedPrice(product.price, product.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(productId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <Image src={ENV.SERVER_HOST + product.cover.data.attributes.url} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{product.title}</h2>

          <div className={styles.moreInfo}>
            <span>
              <Image
                src={
                  ENV.SERVER_HOST + brand.attributes.icon.data.attributes.url
                }
              />
              {brand.attributes.title}
            </span>
            <span>
              <Icon name="check" />
              En stock
            </span>
          </div>

          <div className={styles.price}>
            {product.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {product.price}€
                </span>

                <span className={styles.discount}>-{product.discount}%</span>
              </>
            )}

            <span className={styles.price}>{buyPrice}€</span>
          </div>

          <Button primary fluid onClick={addCartWrapper} loading={loading}>
            Comprar ahora
          </Button>

          <WishlistIcon productId={productId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
