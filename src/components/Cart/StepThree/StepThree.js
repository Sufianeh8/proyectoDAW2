import styles from "./StepThree.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";

export function StepThree() {
  return (
    <div className={styles.stepThree}>
      <Icon name="check circle outline" />

      <h2>Compra realizada con éxito</h2>
      <Button as={Link} href="/account" primary>
        Ver pedido
      </Button>
    </div>
  );
}
