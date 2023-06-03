import styles from "./Resume.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { forEach, toArray } from "lodash";
import { fn, ENV } from "@/utils";
import { useAuth } from "@/hooks";

export function Resume(props) {
  const { products } = props;
  const router = useRouter();
  const { user } = useAuth();
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(products, (product) => {
      const price = fn.calcDiscountedPrice(
        product.product.data.attributes.price,
        product.product.data.attributes.discount
      );

      totals = {
        original:
          totals.original +
          product.product.data.attributes.price * product.quantity,
        discount:
          totals.discount +
          (product.product.data.attributes.price - price) * product.quantity,
        price: totals.price + price * product.quantity,
      };

      setTotals(totals);
    });
  }, [products]);

  const goToStepTwo = () => {
    router.replace({ query: { ...router.query, step: 2 } });
  };

  const goToLoginPage = () => {
    router.push("/join/sign-in");
  };

  if (!totals) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.price}>
          <div>
            <span>Precio oficial</span>
            <span>{totals.original.toFixed(2)}€</span>
          </div>
          <div>
            <span>Descuento</span>
            <span>{totals.discount.toFixed(2)}€</span>
          </div>
          <div>
            <span>Subtotal</span>
            <span>{totals.price.toFixed(2)}€</span>
          </div>
        </div>

        {user ? (
          <Button primary fluid onClick={goToStepTwo}>
            Pagar
          </Button>
        ) : (
          <Button primary fluid onClick={goToLoginPage}>
            Inicia sesión para continuar con el pedido
          </Button>
        )}

        <Link href="/">Continuar comprando</Link>
      </div>
    </div>
  );
}
