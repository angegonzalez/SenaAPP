import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    window.sessionStorage.removeItem("token");
    window.location.reload();
    setAnchorEl(null);
  };

  const Text = styled(Typography)(({ theme }) => ({
    fontFamily: ["Work Sans", "sans-serif"].join(","),
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Text
            variant="h6"
            gutterBottom
            component="div"
            style={{ fontWeight: "500", color: "black" }}
            sx={{ flexGrow: 1 }}
          >
            Instructor
          </Text>
          <Box component="div" sx={{ display: "flex", alignItems: "center" }}>
            <Text variant="subtitle1" gutterBottom>
              <Link
                to="/admin/view-meetings"
                style={{
                  textDecoration: "none",
                  fontWeight: "400",
                  color: "black",
                  marginRight: "10px",
                }}
              >
                Ver citas
              </Link>
            </Text>
            <Text variant="subtitle1" gutterBottom>
              <Link
                to="/admin/add-meetings"
                style={{
                  textDecoration: "none",
                  fontWeight: "400",
                  color: "black",
                }}
              >
                Agregar citas
              </Link>
            </Text>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                style={{ padding: "5px", width: "100px" }}
              >
                Salir
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
