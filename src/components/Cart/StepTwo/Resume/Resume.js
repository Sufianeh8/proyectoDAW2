import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import { Cart, Inventory } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();
const inventoryCtrl = new Inventory();

export function Resume(props) {
  const { products, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;

    forEach(products, (product) => {
      const price = fn.calcDiscountedPrice(
        product.product.data.attributes.price,
        product.product.data.attributes.discount
      );
      totalTemp += price * product.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    forEach(products, (product) => {
      (async () => {
        try {
          const newQuantity = product[0].attributes.quantity - product.quantity;
          const response = await inventoryCtrl.putNewQuantity(
            product[0].id,
            newQuantity
          );
        } catch (error) {
          console.error(error);
        }
      })();
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      const response = await cartCtrl.paymentCart(
        result.token,
        products,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        deleteAllItems();
        goToStepEnd();
      } else {
        console.error("Error al realizar el pedido");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(products, (product) => (
            <div key={product[0].id} className={styles.product}>
              <div>
                <p>{product.product.data.attributes.title}</p>
                <p>Talla {product[0].attributes.size.data.attributes.Talla}</p>
                <span>{product.product.brand.data.attributes.title}</span>
              </div>
              <span>
                {product.quantity > 0 && `${product.quantity}x`}
                {fn.calcDiscountedPrice(
                  product.product.data.attributes.price,
                  product.product.data.attributes.discount
                )}
                €
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}€</span>
        </div>

        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
