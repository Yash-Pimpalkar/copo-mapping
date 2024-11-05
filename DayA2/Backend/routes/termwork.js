import express from "express";
import {
  AttendanceLimit,
  AttendanceUpload,
  fetchTermworkLabels,
  GdLimit,
  GdUpload,
  getAssignmentsAndCOs,
  getExperimentAndCOs,
  getExperimentData,
  getTermworkAssignment,
  getTermworkData,
  JournalLimit,
  JournalUpload,
  MajorProjectLimit,
  MajorProjectUpload,
  PPTLimit,
  PPTUpload,
  ReportLimit,
  ReportUpload,
  SciLabLimit,
  SciLabUpload,
  showAttendanceData,
  showGdData,
  showJournalData,
  showMajorProjectData,
  showPPTData,
  showReportData,
  showSciLabData,
  showTradeData,
  submitTermworkId,
  Termwork_Attainment,
  TradeLimit,
  TradeUpload,
  updateAssignments,
  updateExperiments,
  showjournalcodata,
  showcoPptData,
  showReportcoData,
  showSciLabcoData,
  showReportTradeCoData,
  GetMiniProject,
  getMiniProjectAndCOs,
  updateMiniProject,
} from "../controller/termwork.js";
const router = express.Router();

// main termwork
router.get("/checkboxlabels/:userCourseId", fetchTermworkLabels);
router.post("/submit", submitTermworkId);
router.get("/gettermworkdata/:usercourseid", getTermworkData);

// assignment route
router.get("/gettwassignmentdata/:usercourseid", getTermworkAssignment);
router.get("/getassignments/:usercourseid", getAssignmentsAndCOs);
router.put("/assignment/update", updateAssignments);

//Experimnet routes
router.get("/getexperimentdata/:usercourseid", getExperimentData);
// Route to get assignments related to experiments for a specific user course ID
router.get("/getexperiment/:usercourseid", getExperimentAndCOs);
// Route to update experiments
router.put("/experiment/update", updateExperiments);

router.get("/show/attendance/:uid", showAttendanceData);
router.put("/attendance/update", AttendanceUpload);
router.get("/attendance/limit/:uid", AttendanceLimit);
// GD Routes
router.get("/show/gd/:uid", showGdData);
router.put("/gd/update", GdUpload);
router.get("/gd/limit/:uid", GdLimit);

// Scilab Route
router.get("/show/scilab/:uid", showSciLabData);
router.get("/show/scilabco/:uid", showSciLabcoData);
router.put("/scilab/update", SciLabUpload);
router.get("/scilab/limit/:uid", SciLabLimit);

//jornal Route
router.get("/show/journal/:uid", showJournalData);
router.get("/show/journalco/:uid", showjournalcodata);
router.put("/journal/update", JournalUpload);
router.get("/journal/limit/:uid", JournalLimit);

// major project
router.get("/show/majorpro/:uid", showMajorProjectData);
router.put("/majorpro/update", MajorProjectUpload);
router.get("/majorpro/limit/:uid", MajorProjectLimit);

// mini project
// router.get("/show/minipro/:usercourseid", showMiniProjectData);
// router.put("/minipro/update", MiniProjectUpload);
// router.get("/minipro/limit/:uid", MiniProjectLimit);
router.get("/show/minipro/:usercourseid", GetMiniProject);
router.get("/show/miniproco/:usercourseid", getMiniProjectAndCOs);
router.put("/minipro/update", updateMiniProject);

// ppt
router.get("/show/ppt/:uid", showPPTData);
router.get("/showco/ppt/:uid", showcoPptData);
router.put("/ppt/update", PPTUpload);
router.get("/ppt/limit/:uid", PPTLimit);

// report

router.get("/show/report/:uid", showReportData);
router.get("/show/reportco/:uid", showReportcoData);
router.put("/report/update", ReportUpload);
router.get("/report/limit/:uid", ReportLimit);

// trade
router.get("/show/trade/:uid", showTradeData);
router.get("/show/tradeco/:uid", showReportTradeCoData);
router.put("/trade/update", TradeUpload);
router.get("/trade/limit/:uid", TradeLimit);

router.put("/update-attainment", Termwork_Attainment);

export default router;
