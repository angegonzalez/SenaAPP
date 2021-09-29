import { Box } from "@mui/system";
import React from "react";

import Grid from "@mui/material/Grid";
import LoginCard from "../Components/LoginCard";
import { Snackbar } from "@mui/material";

const Login = () => {
  const [alert, setalert] = React.useState(null);
  const [viewAlert, setviewAlert] = React.useState(false);
  const handleClose = () => {
    setviewAlert(false);
  };
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container alignItems="center" style={{ height: "100%" }}>
        <Grid item xs={12}  lg={6}>
          <LoginCard
            setalert={setalert}
            setviewAlert={setviewAlert}
            handleClose={handleClose}
          />
        </Grid>
        <Snackbar
          open={viewAlert}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          {alert}
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default Login;
