import { useState, useEffect } from "react";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn, ENV } from "@/utils";
import { useCart } from "@/hooks";
import { WishlistIcon } from "@/components/Shared";
import styles from "./Panel.module.scss";
import { Inventory } from "@/api/inventory";
import { map } from "lodash";

const inventoryCtrl = new Inventory();

export function Panel(props) {
  const { productId, product } = props;
  const [sizes, setSizes] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inventId, setInventId] = useState(null);
  const { addCart } = useCart();

  const brand = product.brand.data;
  const buyPrice = fn.calcDiscountedPrice(product.price, product.discount);

  const addCartWrapper = () => {
    setLoading(true);
    addCart(inventId, selectedSize);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await inventoryCtrl.getSizes(productId);

        setSizes(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await inventoryCtrl.getByInventoryId(
          productId,
          selectedSize
        );

        setInventId(response.data[0].id);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [selectedSize]);

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

          <div className={styles.sizes}>
            {map(sizes, (size) => (
              <div key={size.id} className={styles.sizes}>
                <Button
                  primary
                  fluid
                  disabled={size.attributes.quantity < 1}
                  onClick={() => handleSizeChange(size.attributes.size.data.id)}
                >
                  {size.attributes.size.data.attributes.Talla}
                </Button>
              </div>
            ))}
          </div>

          <Button
            primary
            fluid
            onClick={addCartWrapper}
            loading={loading}
            disabled={!selectedSize}
          >
            Comprar ahora
          </Button>

          <WishlistIcon productId={productId} className={styles.heart} />
        </div>
      </div>
    </Container>
  );
}
