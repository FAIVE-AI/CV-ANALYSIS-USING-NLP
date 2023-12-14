import "./App.scss";
import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginRegister from "./components/login-register/LoginRegister";
import CandidateHome from "./components/candidate-home/CandidateHome";
import HRExecHome from "./components/hr-exec-home/HRExecHome";
import CandidateRegister from "./components/candidate-register/CandidateRegister";
import AptitudeTest from "./components/aptitude-test/AptitudeTest";
import HRJobCreation from "./components/hr-job-creation/HRJobCreation";
import HRViewJobs from "./components/hr-view-jobs/HRViewJobs";
import HrRanklist from "./components/hr-ranklist/HrRanklist";
import CandidateHeader from "./components/shared/candidate-header/CandidateHeader";
import CandidateViewJobs from "./components/candidate-view-jobs/CandidateViewJobs";
import HRHeader from "./components/shared/hr-header/HrHeader";

function App() {
  const location = useLocation();
  const [locationState, setLocationState] = useState(location);
  const [candidateState, setCandidateState] = useState(null);

  useEffect(() => {
    setLocationState(location);
  }, [location]);

  const setCandidate = (candidate) => {
    console.log("candidate from App.js", candidate);
    setCandidateState(candidate);
  };

  return (
    <div>
      {(locationState.pathname === "/candidate-home" ||
        locationState.pathname === "/open-jobs" ||
        locationState.pathname === "/my-applications") && (
        <CandidateHeader></CandidateHeader>
      )}
      {(locationState.pathname === "/hr-exec-home" ||
        locationState.pathname === "/post-jobs") && (
        <HRHeader hrDetails={candidateState}></HRHeader>
      )}
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/candidate-login"
          element={
            <LoginRegister
              setCandidate={setCandidate}
              isCandidate={true}
            ></LoginRegister>
          }
        ></Route>
        <Route
          path="/hr-exec-login"
          element={
            <LoginRegister
              setCandidate={setCandidate}
              isCandidate={false}
            ></LoginRegister>
          }
        ></Route>
        <Route
          path="/candidate-home"
          element={
            <CandidateHome candidateDetails={candidateState}></CandidateHome>
          }
        ></Route>
        <Route
          path="/open-jobs"
          element={
            <CandidateViewJobs
              candidateDetails={candidateState}
            ></CandidateViewJobs>
          }
        ></Route>
        <Route path="/hr-exec-home" element={<HRExecHome></HRExecHome>}></Route>
        <Route
          path="/candidate-register"
          element={
            <CandidateRegister setCandidate={setCandidate}></CandidateRegister>
          }
        ></Route>
        <Route
          path="/hr-job-create"
          element={<HRJobCreation hrDetails={candidateState}></HRJobCreation>}
        ></Route>
        <Route
          path="/hr-view-jobs"
          element={
            <HRViewJobs
              hrDetails={candidateState}
              jobDetails={{ jobTitle: "Software Developer" }}
              candidateDetails={{
                name: "Sairaj",
                skillsetscore: "59",
                personalityscore: "75",
                aptitudescore: "80",
                overallscore: "78",
                personalitydescription: "Nice guy",
                skillset: "Python",
                personality: "Leader",
                experience: "4.5 Years"
              }}
            ></HRViewJobs>
          }
        ></Route>
        <Route
          path="/AptitudeTest"
          element={<AptitudeTest></AptitudeTest>}
        ></Route>
        <Route path="/hr-ranklist" element={<HrRanklist></HrRanklist>}></Route>
      </Routes>
    </div>
  );
}

export default App;
