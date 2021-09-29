import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  MonthView,
  DateNavigator,
  TodayButton,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Button, Chip, Grid, Modal, Typography } from "@material-ui/core";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import API from "../api";
import { Box } from "@mui/system";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { convertHelper } from "../Utils/fileConverter";
import { fs } from "fs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Calendar = ({ schedulerData, user, setselectedAppointment }) => {
  const [data, setdata] = React.useState(schedulerData);
  const [mainResourceName, setmainResourceName] = React.useState("state");
  const [resources, setresources] = React.useState([
    {
      fieldName: "state",
      title: "State",
      instances: [
        { id: "available", text: "Disponible" },
        { id: "closed", text: "Finalizada" },
        { id: "taken", text: "Reservada" },
      ],
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [openModal, setopenModal] = React.useState(false);
  const [appointmentData, setappointmentData] = React.useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const downloadFile = (id, fileType) => {
    API.get(`/meeting/${id}/${fileType}`, {
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `acta_visita_${id}.docx`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const generatePDF = (id, fileType) => {
    API.get(`/meeting/${id}/${fileType}`, {
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf; charset=utf-8" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `acta_visita_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const Appointment = ({ ...restProps }) => {
    return (
      <>
        <Appointments.Appointment
          {...restProps}
          onDoubleClick={() => {
            if (restProps.data["state"] === "available") {
              setappointmentData(restProps.data);
              setselectedAppointment(restProps.data);
            } else {
              handleClick();
            }
          }}
        ></Appointments.Appointment>
      </>
    );
  };

  const Content = ({ children, appointmentData, classes, ...restProps }) => {
    setappointmentData(appointmentData);

    const resetMeeting = () => {
      API.post(`/meeting/${appointmentData["id"]}`).then(() => {
        window.location.reload(false);
      });
    };

    if (appointmentData["state"] === "taken") {
      return (
        <AppointmentTooltip.Content
          {...restProps}
          appointmentData={appointmentData}
        >
          <Grid
            spacing={1}
            container
            alignItems="center"
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <Chip
                variant="outlined"
                color="info"
                label="Acta inicial.docx"
                size="small"
                sx={{ m: 23 }}
                icon={<AttachFileRoundedIcon />}
                onClick={() => {
                  downloadFile(appointmentData["id"], "initialFile");
                }}
              />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setopenModal(true)}
              >
                Finalizar cita
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => resetMeeting()}
              >
                Cancelar cita
              </Button>
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
      );
    } else if (appointmentData["state"] === "closed") {
      return (
        <AppointmentTooltip.Content
          {...restProps}
          appointmentData={appointmentData}
        >
          <Grid
            spacing={1}
            container
            alignItems="center"
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={2}></Grid>
            <Grid item>
              <Chip
                variant="outlined"
                color="info"
                label="Acta final.docx"
                size="small"
                sx={{ m: 23 }}
                icon={<AttachFileRoundedIcon />}
                onClick={() => {
                  downloadFile(appointmentData["id"], "finalFile");
                }}
              />
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                color="info"
                label="Acta final.pdf"
                size="small"
                icon={<AttachFileRoundedIcon />}
                onClick={() => {
                  generatePDF(appointmentData["id"], "finalFilePDF");
                }}
              />
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
      );
    } else {
      return (
        <AppointmentTooltip.Content
          {...restProps}
          appointmentData={appointmentData}
        />
      );
    }
  };

  return (
    <>
      <Scheduler data={data} locale="es-CO" height="auto">
        <ViewState
          defaultCurrentDate={moment().format("YYYY-MM-DD")}
          defaultCurrentViewName="Week"
        />

        <DayView startDayHour={8} endDayHour={17} displayName={"Día"} />
        <WeekView
          startDayHour={8}
          endDayHour={17}
          excludedDays={[0, 6]}
          displayName={"Semana"}
        />
        <MonthView startDayHour={8} endDayHour={17} displayName={"Mes"} />

        <Toolbar />
        <ViewSwitcher />
        {user ? (
          <Appointments appointmentComponent={Appointment} />
        ) : (
          <Appointments />
        )}
        {user ? null : <AppointmentTooltip contentComponent={Content} />}

        <DateNavigator />
        <TodayButton messages={{ today: "HOY" }} />
        <Resources
          data={resources}
          mainResourceName={mainResourceName}
          palette={["#30CB83", "#F1C40F", "#54A0FF"]}
        />
      </Scheduler>
      <AlertModal
        openModal={openModal}
        setopenModal={setopenModal}
        appointmentData={appointmentData}
      />

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Esta cita ya fue reservada!
        </Alert>
      </Snackbar>
    </>
  );
};

const AlertModal = ({ openModal, setopenModal, appointmentData }) => {
  const appointment = appointmentData;
  const handleClose = () => {
    setopenModal(false);
  };

  const [file, setfile] = React.useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "white",
    borderRadius: "9px",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = () => {
    appointment["initialFile"] = null;
    appointment["state"] = "closed";
    let newMeeting = new Blob([JSON.stringify(appointment)], {
      type: "application/json",
    });
    let formData = new FormData();

    formData.append("newMeeting", newMeeting);
    formData.append("finalFile", file);

    API.put(`/meeting/${appointment["id"]}/finish`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Finalizar visita de seguimiento
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "20px" }}
          >
            A continuación, suba el archivo de acta correspondiente a la cita en
            formato <code>.docx</code>, este archivo estará disponible en
            formato <code>.pdf</code> automáticamente
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
            }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="file"
              required
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
            }}
          >
            {/* <Button onClick={handleClose}>Cancelar</Button> */}
            <Button autoFocus type="submit" variant="contained" color="primary">
              Continuar
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};
export default Calendar;
