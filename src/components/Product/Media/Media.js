import { Container } from "semantic-ui-react";
import { Gallery } from "./Gallery";
import { Separator } from "@/components/Shared";

export function Media(props) {
  const { gallery } = props;

  return (
    <Container>
      <Gallery gallery={gallery} />
      <Separator height={30} />
    </Container>
  );
}
