import { Grid } from "@chakra-ui/react";

export default function MarketPlaceView({ children }) {
  return (
    <Grid
      w="100%"
      gap="0.63rem"
      templateColumns="repeat(3, 1fr)"
      justifyItems="start"
    >
      {children}
    </Grid>
  );
}
