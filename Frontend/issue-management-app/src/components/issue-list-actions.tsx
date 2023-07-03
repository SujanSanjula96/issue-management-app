import { useState } from "react";
import React from "react";
import { Popover } from "@mui/material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Tooltip,
  Typography,
} from "@oxygen-ui/react";
import { updateIssue } from "../api/issues";
import { AccessControl } from "../providers/access-control-provider/access-control";
import { IssueAPI } from "../configs/api";

export const IssueListActions = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  function DeleteDialog() {
    return (
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to close the issue?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  const handleUpdate = async () => {
    try {
      await updateIssue(props.params.row.id);
      props.setNeedRefresh(true);
      props.setAlertMessage("Issue closed successfully");
      props.setAlertSeverity("success");
    } catch (e) {
      props.setAlertMessage("Failed to close the issue");
      props.setAlertSeverity("error");
    } finally {
      props.setOpenAlert(true);
      setOpenDialog(false);
    }
  };

  const CloseButton = () => {
    return (
      <Box>
        <Tooltip title="Close the issue">
          <Button variant="contained" onClick={handleDialogOpen}>
            CLOSE
          </Button>
        </Tooltip>
        <DeleteDialog />
      </Box>
    );
  };

  const DisabledCloseButton = () => {
    return (
      <>
        <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
          <Button variant="contained" disabled>
            CLOSE
          </Button>
        </Box>
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            You are not authorized to close the issue.
          </Typography>
        </Popover>
      </>
    );
  };

  if (props.params.row.status === "Closed") {
    return (
      <Box>
        <Typography> CLOSED </Typography>
      </Box>
    );
  }

  if (props.params.row.status === "Open") {
    return (
      <AccessControl
        requiredScope={IssueAPI.permissions.close}
        fallback={<DisabledCloseButton />}
      >
        <CloseButton />
      </AccessControl>
    );
  }
};
