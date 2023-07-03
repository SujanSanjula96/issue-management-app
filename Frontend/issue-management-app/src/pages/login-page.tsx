import { useAuthContext } from "@asgardeo/auth-react";
import { Box, Button, Typography } from "@oxygen-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/spinner";

export const LoginPage = () => {
  const { state, signIn } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    } else {
      navigate("/issues");
    }
  }, [state?.isAuthenticated]);

  const handleLogin = () => {
    setIsLoading(true);
    signIn();
  };

  if (isLoading || state?.isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "30%",
          height: "40%",
          backgroundColor: "#eeeeee",
          borderRadius: 5,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            ISSUE MANAGEMENT
          </Typography>
          <Typography variant="h4" sx={{ mb: 12 }}>
            APPLICATION
          </Typography>
          <Button onClick={handleLogin} variant="contained">
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
