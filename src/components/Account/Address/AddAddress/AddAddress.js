import styles from "./AddAddress.module.scss";
import { Button } from "semantic-ui-react";
import { useState } from "react";
import { AddressForm } from "../AddressForm";
import { BasicModal } from "@/components/Shared";

export function AddAddress(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <Button primary className={styles.addBtn} onClick={onOpenClose}>
        Crear
      </Button>

      <BasicModal show={show} onClose={onOpenClose} title="Nueva dirección">
        <AddressForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}
