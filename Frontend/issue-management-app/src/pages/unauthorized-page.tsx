import { Box, Typography } from "@oxygen-ui/react";

export const UnauthorizedPage = () => {
  return (
    <Box sx={{ backgroundColor: "#eeeeee" }}>
      <Box
        component="span"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 100, mt: 5 }}
      >
        <Typography variant="h4">You are not authorized!</Typography>
      </Box>
    </Box>
  );
};
