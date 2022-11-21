import { Box } from "@mui/material";
import Nav from "./Nav";

function ComponentWithNav({ children, ...props }) {
  return (
    <Box>
      <Nav />
      {children}
    </Box>
  );
}

export default ComponentWithNav;
