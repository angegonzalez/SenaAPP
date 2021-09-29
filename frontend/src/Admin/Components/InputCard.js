import * as React from "react";
import moment from "moment/min/moment-with-locales";
import API from "../../api";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

moment.locale("es");

const CardAux = ({ calendarAppointments, setcalendarAppointments }) => {
  const [calendarSpaces, setcalendarSpaces] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setalertOpen] = React.useState(false);
  let appointments = [];

  const loadDates = (event) => {
    event.preventDefault();
    let datesString = calendarSpaces.split("\n");

    datesString.forEach((date, index) => {
      let token;
      let tokenDate;
      let tokenHour;
      try {
        token = date.split("\t");
        tokenDate = token[0];
        tokenHour = token[1].replace(/\s/g, "").split(/[de ,a]/);
        const initialDate = moment(
          tokenDate + " " + tokenHour[2],
          "ddd, MMMM DD, YYYY, HH:mm:ss"
        );
        const finalDate = moment(
          tokenDate + " " + tokenHour[3],
          "ddd, MMMM DD, YYYY, HH:mm:ss"
        );
        const appointment = {
          startDate: initialDate.format("YYYY-MM-DDTHH:mm"),
          endDate: finalDate.format("YYYY-MM-DDTHH:mm"),
          title: "Visita seguimiento etapa productiva",
          state: "available",
        };
        appointments.push(appointment);
      } catch (error) {
        setalertOpen(true);
        setTimeout(() => {
          setalertOpen(false);
        }, 5000);
      }
    });
    setcalendarAppointments(appointments);
    setcalendarSpaces("");
  };

  const sendCalendar = async () => {
    for (let appointment of calendarAppointments) {
      await API.post(`meeting/`, appointment, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
        },
      });
    }
  };

  const sendCalendarAux = async () => {
    deleteDates();
    sendCalendar().then(() => {
      console.log("breves");
      setOpen(true);
    });
  };

  const deleteDates = () => {
    setcalendarAppointments([]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <Box component={"div"} sx={{ p: 2 }}>
      <form onSubmit={loadDates}>
        <CardContent>
          <TextField
            id="filled-multiline-static"
            placeholder="Ingresa aquí las franjas disponibles para el agendamiento de aprendices"
            label="Franjas horarias"
            fullWidth
            multiline
            rows={10}
            defaultValue=""
            required
            onChange={(e) => {
              setcalendarSpaces(e.target.value);
            }}
            value={calendarSpaces}
          />
        </CardContent>
        <CardActions spacing={5}>
          {calendarSpaces.length !== 0 ? (
            <Button size="small" type="submit">
              {" "}
              Cargar fechas
            </Button>
          ) : null}
          <Button size="small" onClick={deleteDates}>
            {" "}
            Eliminar fechas
          </Button>
          {calendarAppointments.length !== 0 ? (
            <ConfirmationButton
              type="submit"
              buttonText="Confirmar calendario"
              title="¿Está seguro de continuar?"
              description="Esta acción es irreversible, por favor confirme la agenda de su calendario antes de continuar"
              okOperation={sendCalendarAux}
            />
          ) : null}
        </CardActions>
      </form>
      {alertOpen ? (
        <Alert variant="outlined" severity="warning" sx={{ m: 2 }}>
          Problema al leer las fechas, asegúrese que estén en el formato
          correcto
        </Alert>
      ) : null}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="El calendario se ha ingresado correctamente!"
        TransitionComponent={SlideTransition}
      />
    </Box>
  );
};

const InputCard = ({ calendarAppointments, setcalendarAppointments }) => {
  return (
    <Box sx={{ m: 5 }}>
      <Card variant="outlined">
        <CardAux
          calendarAppointments={calendarAppointments}
          setcalendarAppointments={setcalendarAppointments}
        />
      </Card>
    </Box>
  );
};

const ConfirmationButton = ({
  buttonText,
  title,
  description,
  okOperation,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              okOperation();
              handleClose();
            }}
            autoFocus
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputCard;
