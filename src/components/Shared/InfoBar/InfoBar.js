import { Container, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { data } from "./InfoBar.data";
import styles from "./InfoBar.module.scss";

const key = 90;

export function InfoBar() {

  return (
    <div className={styles.infoBar}>
      <Container className={styles.content}>
        {map(data, (item, index) => (
          <div className={styles.block} key={index}>
            <Icon name={item.icon} />
            <div>
              <h5>{item.title}</h5>
              <span>{item.description}</span>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}