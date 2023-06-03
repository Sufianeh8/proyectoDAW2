import styles from "./BannerAd.module.scss";
import { Button, Container, Image } from "semantic-ui-react";
import Link from "next/link";

export function BannerAd(props) {

    const {title, subtitle, btnTitle, btnLink, image} = props;

  return (
    <div className={styles.container}>

        <Image src={image} className={styles.img}/>

        <div className={styles.infoContainer}>
            <Container>
                <h2>{title}</h2>
                <h3>{subtitle}</h3>

                <Button as={Link} href={btnLink} primary>
                    {btnTitle}
                </Button>
            </Container>
        </div>
    </div>
  )
}
