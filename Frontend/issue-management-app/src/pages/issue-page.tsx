import { Box, Button, TextField, Typography } from "@oxygen-ui/react";
import { AccessControl } from "../providers/access-control-provider/access-control";
import { useEffect, useMemo, useState } from "react";
import { createIssue, getIssues } from "../api/issues";
import { IssueInterface } from "../models/issues";
import { DataGrid } from "@mui/x-data-grid";
import { SnackbarComponent } from "../components/snackbar";
import { Modal } from "@mui/material";
import { IssueListActions } from "../components/issue-list-actions";
import { Spinner } from "../components/spinner";
import { ErrorPage } from "./error-page";
import { IssueAPI } from "../configs/api";

export const IssuePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadFailed, setLoadFailed] = useState<boolean>(null);
  const [needRefresh, setNeedRefresh] = useState<boolean>(true);

  const [openNewIssue, setOpenNewIssue] = useState<boolean>(false);
  const [newIssue, setNewIssue] = useState<string>("");

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<any>("");

  const [issueList, setIssueList] = useState<IssueInterface[]>([]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (needRefresh) {
      getIssueList();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  const getIssueList = async () => {
    try {
      const result = await getIssues();
      setIssueList(result);
    } catch (e) {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createIssue(newIssue);
      setNeedRefresh(true);
      setAlertMessage("Issue Created Successfully");
      setAlertSeverity("success");
    } catch (e) {
      setAlertMessage("Failed to create the issue");
      setAlertSeverity("error");
    } finally {
      setNewIssue("");
      setOpenNewIssue(false);
      setOpenAlert(true);
    }
  };

  const handleClose = () => {
    setNewIssue("");
    setOpenNewIssue(false);
  };

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Issues", flex: 9 },
      {
        field: "actions",
        headerName: "Status",
        type: "actions",
        flex: 1,
        renderCell: (params) => (
          <IssueListActions
            params={params}
            setOpenAlert={setOpenAlert}
            setAlertMessage={setAlertMessage}
            setAlertSeverity={setAlertSeverity}
            setNeedRefresh={setNeedRefresh}
          />
        ),
      },
    ],
    []
  );

  const NewIssueButton = () => (
    <div className="left-container">
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => {
          setOpenNewIssue(true);
        }}
      >
        + New Issue
      </Button>
    </div>
  );

  const IssueList = () => (
    <Box m={4}>
      <DataGrid
        columns={columns}
        rows={issueList}
        loading={isLoading}
        getRowId={(row) => row.id}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          display: "flex",
          width: "100%",
          height: 350,
        }}
      />
    </Box>
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (loadFailed) {
    return <ErrorPage />;
  }

  return (
    <div>
      <AccessControl requiredScope={IssueAPI.permissions.create}>
        <NewIssueButton />
      </AccessControl>
      <IssueList />
      <Modal open={openNewIssue} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3 }}
          >
            Create New Issue
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={newIssue}
            label="Describe the Issue"
            onChange={(e) => setNewIssue(e.target.value)}
            sx={{ width: 300, mb: 3 }}
          />
          <Box>
            <Button variant="contained" sx={{ mr: 2 }} onClick={handleCreate}>
              Create
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      <SnackbarComponent
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
      />
    </div>
  );
};
