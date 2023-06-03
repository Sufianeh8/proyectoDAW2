import styles from "./HeaderWallpaper.module.scss";
import { Image } from "semantic-ui-react";
import { ENV } from "@/utils";

export function HeaderWallpaper(props) {
  const { image } = props;

  return (
    <div className={styles.headerWallpaper}>
      <Image src={ENV.SERVER_HOST + image} />
    </div>
  );
}
