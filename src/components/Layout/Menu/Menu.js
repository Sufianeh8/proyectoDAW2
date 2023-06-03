import { useState, useEffect } from "react";
import { Image, Icon, Input, ImageGroup } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { map } from "lodash";
import classNames from "classnames";
import { Brand } from "@/api";
import styles from "./Menu.module.scss";
import { ENV } from "@/utils";

const brandCtrl = new Brand();

export function Menu(props) {
  const { isOpenSearch } = props;
  const [brands, setBrands] = useState(null);
  const [showSearch, setShowSearch] = useState(isOpenSearch);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const openCloseSearch = () => setShowSearch((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await brandCtrl.getAll();
        setBrands(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setSearchText(router.query.s || "");
  }, []);

  const onSearch = (text) => {
    setSearchText(text);
    router.replace(`/search?s=${text}`);
  };

  return (
    <div className={styles.brands}>
      {map(brands, (brand) => (
        <Link key={brand.id} href={`/products/${brand.attributes.slug}`}>
          <Image
            src={ENV.SERVER_HOST + brand.attributes.icon.data.attributes.url}
          />
          {brand.attributes.title}
        </Link>
      ))}

      <button className={styles.search} onClick={openCloseSearch}>
        <Icon name="search" />
      </button>

      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <Input
          id="search-products"
          placeholder="Buscador"
          className={styles.input}
          focus={true}
          value={searchText}
          onChange={(_, data) => onSearch(data.value)}
        />
        <Icon
          name="close"
          className={styles.closeInput}
          onClick={openCloseSearch}
        />
      </div>
    </div>
  );
}
