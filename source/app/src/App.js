import "./App.scss";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./components/login-register/LoginRegister";
import CandidateHome from "./components/candidate-home/CandidateHome";
import HRExecHome from "./components/hr-exec-home/HRExecHome";
import CandidateRegister from "./components/candidate-register/CandidateRegister";
import HRJobCreation from "./components/hr-job-creation/HRJobCreation";
import HRViewJobs from "./components/hr-view-jobs/HRViewJobs";
import HrRanklist from "./components/hr-ranklist/HrRanklist";

function App() {
  return (
    <div>
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
          element={<CandidateHome></CandidateHome>}
        ></Route>
        <Route path="/hr-exec-home" element={<HRExecHome></HRExecHome>}></Route>
        <Route
          path="/candidate-register"
          element={<CandidateRegister></CandidateRegister>}
        ></Route>
        <Route
          path="/hr-job-create"
          element={<HRJobCreation hrDetails={{ name: "CK", id: 9000001 }}></HRJobCreation>}
        ></Route>
        <Route
          path="/hr-view-jobs"
          element={<HRViewJobs 
          hrDetails={{ name: "CK", id: 9000001 }} 
          jobDetails={{ jobTitle: "Software Developer"}} 
          candidateDetails={{name:"Sairaj",skillsetscore:"59",personalityscore:"75",aptitudescore:"80",overallscore:"78",personalitydescription:"Nice guy",skillset:"Python",personality:"Leader",experience:"4.5 Years"}}>
          </HRViewJobs>}
        ></Route>
          <Route
          path="/hr-ranklist"
          element={<HrRanklist></HrRanklist>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
