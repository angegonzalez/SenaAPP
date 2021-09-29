import Box from "@mui/material/Box";
import React from "react";
import { useHistory } from "react-router";
import API from "../../api";
import AppBar from "../Components/AppBar";
import Calendar from "../../Components/Calendar";
const ViewMeetings = () => {
  const [meetingsData, setmeetingsData] = React.useState([]);
  const token = window.sessionStorage.getItem("token");
  const history = useHistory();

  React.useEffect(() => {
    if (!token) {
      history.replace("/login");
      window.location.reload();
    }
    API.get("/meeting/", {}).then((data) => {
      setmeetingsData(data.data);
    });
  }, []);

  return (
    <>
      <AppBar />
      <Box
        sx={{ m: 7, boxShadow: 2, p: 5, borderRadius: "10px" }}
        style={{ height: "70vh" }}
      >
        {meetingsData.length !== 0 ? (
          <Calendar schedulerData={meetingsData} />
        ) : null}
      </Box>
    </>
  );
};

export default ViewMeetings;
