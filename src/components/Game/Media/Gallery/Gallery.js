import { useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import Slider from "react-slick";
import { FullModal } from "@/components/Shared";
import styles from "./Gallery.module.scss";
import { ENV } from "@/utils";

export function Gallery(props) {
  const { gallery } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  const galleryClone = [...gallery];
  const principalImage = galleryClone.shift();

  const settings = {
    dots: true,
    dotsClass: styles.dots,
    infinite: true,
    slidersToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: function (index) {
      return <Image src={ENV.SERVER_HOST + gallery[index].attributes.url} />;
    },
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image
            src={ENV.SERVER_HOST + principalImage.attributes.url}
            onClick={onOpenClose}
          />
        </div>

        <div className={styles.grid}>
          {map(galleryClone, (gallery) => (
            <div key={gallery.id}>
              <Image
                src={ENV.SERVER_HOST + gallery.attributes.url}
                onClick={onOpenClose}
              />
            </div>
          ))}
        </div>
      </div>

      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {map(gallery, (gallery2) => (
              <div key={gallery2.id}>
                <Image src={ENV.SERVER_HOST + gallery2.attributes.url} />
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  );
}
