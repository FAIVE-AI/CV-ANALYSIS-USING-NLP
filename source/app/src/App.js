import "./App.scss";
import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginRegister from "./components/login-register/LoginRegister";
import CandidateHome from "./components/candidate-home/CandidateHome";
import HRExecHome from "./components/hr-exec-home/HRExecHome";
import CandidateRegister from "./components/candidate-register/CandidateRegister";
import AptitudeTest from "./components/aptitude-test/AptitudeTest";
import HrRanklist from "./components/hr-ranklist/HrRanklist";
import CandidateHeader from "./components/shared/candidate-header/CandidateHeader";

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
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/candidate-login"
          element={<LoginRegister isCandidate={true}></LoginRegister>}
        ></Route>
        <Route
          path="/hr-exec-login"
          element={<LoginRegister isCandidate={false}></LoginRegister>}
        ></Route>
        <Route
          path="/candidate-home"
          element={
            <CandidateHome candidateDetails={candidateState}></CandidateHome>
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
          path="/AptitudeTest"
          element={<AptitudeTest></AptitudeTest>}
        ></Route>
        <Route path="/hr-ranklist" element={<HrRanklist></HrRanklist>}></Route>
      </Routes>
    </div>
  );
}

export default App;
