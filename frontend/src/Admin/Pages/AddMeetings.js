import React from "react";

import Grid from "@mui/material/Grid";
import Calendar from "../../Components/Calendar";
import InputCard from "../Components/InputCard";
import { Box } from "@mui/system";
import { Card } from "@mui/material";
import AppBar from "../Components/AppBar";

const AddMeetings = () => {
  const [calendarAppointments, setcalendarAppointments] = React.useState([]);
  return (
    <>
      <AppBar />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justify="center"
        height="100%"
      >
        <Grid item xs={12} md={4}>
          <InputCard
            calendarAppointments={calendarAppointments}
            setcalendarAppointments={setcalendarAppointments}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {calendarAppointments.length !== 0 ? (
            <Card sx={{ m: 7, p: 7 }} style={{ height: "70vh" }}>
              <Calendar schedulerData={calendarAppointments} />
            </Card>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default AddMeetings;
