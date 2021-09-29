import {
  Alert,
  Button,
  createTheme,
  InputBase,
  InputLabel,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import API from "../api";

const Input = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "label + &": {
    marginTop: theme.spacing(0),
    fontFamily: ["Work Sans", "sans-serif"].join(","),
  },
  "& .MuiInputBase-input": {
    borderRadius: 20,
    height: "auto",
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1.5px solid #ced4da",
    fontSize: 16,
    fontWeight: "500",
    padding: "15px 20px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: ["Work Sans", "sans-serif"].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const TextError = styled(Typography)(({ theme }) => ({
  fontFamily: ["Work Sans", "sans-serif"].join(","),
  color: theme.palette.error.main,
}));

const Text = styled(Typography)(({ theme }) => ({
  fontFamily: ["Work Sans", "sans-serif"].join(","),
}));

const ButtonLogin = styled(Button)(({ theme }) => ({
  fontFamily: ["Work Sans", "sans-serif"].join(","),
  border: "1.5px solid #ced4da",
  fontSize: 16,
  borderRadius: 20,
  color: theme.palette.getContrastText(theme.palette.secondary.light),
  backgroundColor: theme.palette.primary.light,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const LoginCard = ({ setalert, setviewAlert, handleClose, auth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const doLogin = async (data) => {
    try {
      const response = await API.post("/auth/signin", data);

      if (response.status === 200) {
        setviewAlert(true);
        setalert(
          <Alert
            severity="success"
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            Bienvenido de nuevo <b>{data.username}</b> !
          </Alert>
        );
        window.sessionStorage.setItem("token", response.data.accessToken);
        if (response.data.roles[0] === "ROLE_ADMIN") {
          setTimeout(() => {
            history.replace("/admin/view-meetings");
            window.location.reload();
          }, 3000);
        } else {
          setTimeout(() => {
            history.replace("/user/take-meetings");
          }, 3000);
        }
      }
    } catch (error) {
      setviewAlert(true);
      switch (error.response.status) {
        case 401:
          setalert(
            <Alert
              severity="warning"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Ocurrió un error, por favor revisa tus credenciales e intenta de
              nuevo
            </Alert>
          );
          break;
        default:
          setalert(
            <Alert
              severity="error"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Ocurrió un error inesperado
            </Alert>
          );
          break;
      }
    }

    // setviewAlert(true);
  };

  const onSubmit = (data) => doLogin(data);

  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          padding: 15,
          width: "50%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text
          variant="h2"
          gutterBottom
          component="div"
          style={{ fontWeight: "700" }}
        >
          Bienvenido!
        </Text>
        <Text
          variant="h5"
          gutterBottom
          component="div"
          style={{ fontWeight: "400", marginBottom: "40px" }}
        >
          Ingresa con tus credenciales
        </Text>
        <InputLabel htmlFor="user-input">Usuario</InputLabel>
        <Input
          required
          type="text"
          id="user-input"
          {...register("username", {
            required: "Este campo es requerido",
          })}
        />
        {errors.username && (
          <TextError
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={2}
          >
            <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
            {errors.username.message}
          </TextError>
        )}

        <InputLabel htmlFor="password-input">Contraseña</InputLabel>
        <Input
          label="Outlined"
          variant="outlined"
          id="password-input"
          type="password"
          required
          {...register("password", { required: "Este campo es requerido" })}
        />

        {errors.password && (
          <TextError
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
            spacing={2}
          >
            <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
            {errors.password.message}
          </TextError>
        )}

        <ButtonLogin fullWidth type="submit">
          Login{" "}
        </ButtonLogin>
      </Box>
    </ThemeProvider>
  );
};
export default LoginCard;
