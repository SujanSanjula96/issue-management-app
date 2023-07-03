import { useAuthContext } from "@asgardeo/auth-react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
} from "@oxygen-ui/react";
import { useEffect, useState } from "react";
import { IssuePage } from "../pages/issue-page";
import { AccessControl } from "../providers/access-control-provider/access-control";
import { IssueAPI } from "../configs/api";
import { UnauthorizedPage } from "../pages/unauthorized-page";

export const Dashboard = () => {
  const { state, getBasicUserInfo, signOut } = useAuthContext();

  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    if (state?.isAuthenticated) {
      getData();
    }
  }, [state?.isAuthenticated]);

  const getData = async () => {
    const basicUserInfo = await getBasicUserInfo();
    if (basicUserInfo.hasOwnProperty("displayName")) {
      setDisplayName(basicUserInfo.displayName);
    } else {
      const username = basicUserInfo.username.match(/^([^@]*)@/)[1];
      setDisplayName(username);
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent" sx={{ height: 75 }}>
        <Toolbar>
          <Typography variant="h4" flex={1}>
            Issue Management Application
          </Typography>
          <Box
            display={"flex"}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mr: 4,
            }}
          >
            <Avatar sx={{ mr: 1 }}>{displayName[0]}</Avatar>
            <Typography variant="h6">{displayName}</Typography>
          </Box>
          <Button variant="contained" onClick={() => signOut()}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <AccessControl
        requiredScope={IssueAPI.permissions.view}
        fallback={<UnauthorizedPage />}
      >
        <IssuePage />
      </AccessControl>
    </>
  );
};
