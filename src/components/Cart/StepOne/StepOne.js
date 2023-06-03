import styles from "./StepOne.module.scss";
import { Cesta } from "./Cesta";
import { Resume } from "./Resume";

export function StepOne(props) {
  const { products } = props;

  return (
    <div className={styles.stepOne}>
      <div className={styles.center}>
        <Cesta products={products} />
      </div>
      <div className={styles.right}>
        <Resume products={products} />
      </div>
    </div>
  );
}
