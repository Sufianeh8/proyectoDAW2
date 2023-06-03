import styles from "./Info.module.scss";
import { Container } from "semantic-ui-react";

export function Info(props) {
  const { product } = props;

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
        <p>{product.summary}</p>
      </div>

      <div className={styles.more}>
        <ul>
          <li>
            <span>Fecha de lanzamiento:</span> {product.releaseDate}
          </li>
        </ul>
      </div>
    </Container>
  );
}
