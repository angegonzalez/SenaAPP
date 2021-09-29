import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import moment from "moment/min/moment-with-locales";

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const fileGenerator = async (
  meetingData,
  meetingDetailData,
  setInitialFile
) => {
  // console.log(meetingData, meetingDetailData);
  let out;
  loadFile("/resources/format.docx", function (error, content) {
    if (error) {
      throw error;
    }
    let zip = new PizZip(content);
    let doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    //TODO: Add learner information

    console.log(meetingData);

    doc.setData({
      date: moment(meetingData["startDate"]).format("DD 'de' MMMM 'de' YYYY"),
      startHour: moment(meetingData["startDate"]).format("HH:mm"),
      endHour: moment(meetingData["endDate"]).format("HH:mm"),
      name: "Gonzalez Bejarano Angel",
      identificationNumber: "190283921",
      courseName: "ASESORÍA COMERCIAL Y OPERACIONES DE ENTIDADES FINANCIERAS",
      courseNumber: "123466789",
      phone: "12345678",
      email: "am.gonzalez@misena.edu.co",
      initialDatePS: meetingDetailData["initialDatePS"],
      finalDatePS: meetingDetailData["finalDatePS"],
      alternativePS: meetingDetailData["alternativePS"],
      companyName: meetingDetailData["companyName"],
      workingArea: meetingDetailData["workingArea"],
      companyAddress: meetingDetailData["companyAddress"],
      managerPhone: meetingDetailData["managerPhone"],
      managerName: meetingDetailData["managerName"],
      managerPosition: meetingDetailData["managerPosition"],
      managerMail: meetingDetailData["managerMail"],
    });
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
            error,
            key
          ) {
            error[key] = value[key];
            return error;
          },
          {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join("\n");
        console.log("errorMessages", errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    setInitialFile(out);
  });
};

export default fileGenerator;
