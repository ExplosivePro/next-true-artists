// External import
import React from "react";

// Material UI Component
import Container from "@material-ui/core/Container";

// Custom components
import Item from "./Item";

export default function ArtistProfileItem({ data }: Props) {
  return (
    <Container>
      {data.map((item, index) => {
        return <Item data={item} key={index} />;
      })}
    </Container>
  );
}

interface Props {
  data: Resource.ArtistDetail[];
}
