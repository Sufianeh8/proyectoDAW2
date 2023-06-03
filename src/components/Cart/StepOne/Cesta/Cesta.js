import styles from "./Cesta.module.scss";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn, ENV } from "@/utils";
import { useCart } from "@/hooks";

export function Cesta(props) {
  const { products } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    return {
      key: number,
      text: String(number),
      value: number,
      disabled: number > 3,
    };
  });

  return (
    <div className={styles.cesta}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {map(products, (product) => (
          <div key={product[0].id} className={styles.item}>
            <Image
              src={ENV.SERVER_HOST + product.product.cover.data.attributes.url}
            />
            <div>
              <div className={styles.info}>
                <div>
                  <p>{product.product.data.attributes.title}</p>
                  <p>
                    Talla {product[0].attributes.size.data.attributes.Talla}
                  </p>
                  <p>{product.product.brand.data.attributes.title}</p>
                </div>

                <Icon
                  name="trash alternate outline"
                  link
                  onClick={() => deleteItem(product[0].id)}
                />
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className="number"
                  options={Array.from({ length: 10 }, (_, index) => {
                    const number = index + 1;
                    return {
                      key: number,
                      text: String(number),
                      value: number,
                      disabled: number > product[0].attributes.quantity,
                    };
                  })}
                  selection
                  value={product.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(product[0].id, data.value)
                  }
                />

                <span>
                  {fn.calcDiscountedPrice(
                    product.product.data.attributes.price,
                    product.product.data.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
