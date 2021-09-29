import {
  Autocomplete,
  Button,
  createTheme,
  Grid,
  InputBase,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import data from "../Data/data.json";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import API from "../api";

const SignupCard = () => {
  const theme = createTheme({});

  const inputStyle = {
    width: "100%",
    "label + &": {
      marginTop: theme.spacing(0),
      fontFamily: ["Work Sans", "sans-serif"].join(","),
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 20,
      height: "50px",
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      fontSize: 16,
      fontWeight: "500",
      padding: "0px 15px",
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
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const Text = styled(Typography)(({ theme }) => ({
    fontFamily: ["Work Sans", "sans-serif"].join(","),
  }));

  const TextError = styled(Typography)(({ theme }) => ({
    fontFamily: ["Work Sans", "sans-serif"].join(","),
    color: theme.palette.error.main,
  }));

  const Input = styled(TextField)(inputStyle);

  const ButtonLogin = styled(Button)(({ theme }) => ({
    fontFamily: ["Work Sans", "sans-serif"].join(","),
    border: "1.5px",
    fontSize: 16,
    borderRadius: 20,
  }));

  const onSubmit = async (data) => {
    const signupData = {
      username: data["username"],
      email: data["username"] + "@misena.edu.co",
      password: data["password"],
      role: ["user"],
    };

    console.log(signupData);
    const signupResponse = await API.post("/auth/signup", signupData);
    delete data["password"];
    delete data["password_repeat"];
    delete data["username"];


    const learnerData = {
      userId: signupResponse.data.id,
      ...data,
    };
    await API.post("/learner/", learnerData);
  };

  const password = React.useRef({});
  password.current = watch("password", "");

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
          Regístrate!
        </Text>
        <Text
          variant="h5"
          gutterBottom
          component="div"
          style={{ fontWeight: "400", marginBottom: "40px" }}
        >
          Completa los datos de tu usuario
        </Text>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              placeholder="Usuario"
              required
              type="text"
              {...register("username", {
                required: "Este campo es requerido",
              })}
              sx={inputStyle}
            />
            {errors.username && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.username.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={7}>
            <Input
              placeholder="Correo"
              disabled
              required
              type="text"
              value={(watch("username") || "") + "@misena.edu.co"}
              readOnly
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Contraseña"
              required
              type="password"
              {...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 5,
                  message: "La contraseña debe tener más de 5 caracteres",
                },
              })}
              sx={inputStyle}
            />
            {errors.password && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.password.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={6}>
            <Input
              placeholder="Repite la contraseña"
              required
              type="password"
              {...register("password_repeat", {
                validate: (value) =>
                  value === password.current || "Las contraseñas no coinciden ",
              })}
            />
            {errors.password_repeat && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.password_repeat.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={12}>
            <Input
              placeholder="Nombres y apellidos"
              required
              type="text"
              {...register("name", {
                required: "Este campo es requerido",
              })}
            />
            {errors.name && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.name.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={7}>
            <Input
              placeholder="N. de identificación"
              required
              type="number"
              id="user-input"
              {...register("identificationNumber", {
                required: "Este campo es requerido",
              })}
            />
            {errors.identificationNumber && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.identificationNumber.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={5}>
            <Input
              placeholder="Télefono/celular"
              required
              type="number"
              {...register("phone", {
                required: "Este campo es requerido",
              })}
            />
            {errors.phone && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.phone.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={data.courseNames}
              renderInput={(params) => (
                <Input
                  {...params}
                  placeholder="Programa"
                  required
                  type="text"
                  {...register("courseName", {
                    required: "Este campo es requerido",
                  })}
                />
              )}
            />
            {errors.courseName && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.courseName.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={data.courseNumbers}
              renderInput={(params) => (
                <Input
                  {...params}
                  placeholder="Ficha"
                  required
                  type="text"
                  {...register("courseNumber", {
                    required: "Este campo es requerido",
                  })}
                />
              )}
            />
            {errors.courseNumber && (
              <TextError
                component="div"
                sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                spacing={2}
              >
                <ErrorOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                {errors.courseNumber.message}
              </TextError>
            )}
          </Grid>
          <Grid item xs={4}>
            <ButtonLogin fullWidth variant="outlined">
              Volver
            </ButtonLogin>
          </Grid>
          <Grid item xs={8}>
            <ButtonLogin fullWidth type="submit" variant="contained">
              Registrarse
            </ButtonLogin>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SignupCard;
