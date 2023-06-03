import styles from "./Addresses.module.scss";
import { useState, useEffect } from "react";
import { map } from "lodash";
import classNames from "classnames";
import { Address } from "@/api";
import { useAuth } from "@/hooks";

const addressCtrl = new Address();

export function Addresses(props) {
  const [addresses, setAddresses] = useState(null);
  const { addressSelected, setAddressSelected } = props;
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h2>Dirección</h2>

      {map(addresses, (address) => (
        <div
          key={address.id}
          className={classNames(styles.address, {
            [styles.active]: address.id === addressSelected?.id,
          })}
          onClick={() => setAddressSelected(address)}
        >
          <p>
            {address.attributes.name} ({address.attributes.title})
          </p>
          <p>
            {address.attributes.address}, {address.attributes.postalCode},
            {address.attributes.state}, {address.attributes.city}
          </p>
        </div>
      ))}
    </div>
  );
}
