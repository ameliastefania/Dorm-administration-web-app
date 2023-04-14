import LogIn from './Components/LogIn.js';
import Student from './Components/Student.js'
import Unauthorized from './Components/Unauthorized.js';
import RequireAuth from './Components/RequireAuth.js';
import Cereri from './Components/Cereri.js'
import VizualizareCereri from './Components/VizualizareCereri.js';
import CandidatSefCamin from './Components/CandidatSefCamin.js';
import VotarePage from './Components/VotarePage.js';
import CandidatProxy from './Components/CandidatProxy.js';
import DejaCandidat from './Components/DejaCandidat.js';


import Administrator from './Components/Administrator_camin/Administrator.js';
import VizualizareStudenti from './Components/Administrator_camin/VizualizareStudenti.js';
import VizualizareCereriStud from './Components/Administrator_camin/VizualizareCereriStud.js';
import EvidentaVoturi from './Components/Administrator_camin/EvidentaVoturi.js';
import StatisticiGenerale from './Components/Administrator_camin/StatisticiGenerale.js';
import InternalError from './Components/InternalError.js'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

function App() {

  const ROLES = ["student","admin_camin"]

  return (
    <div > 
      <Routes>
     
          <Route path='/' element={<LogIn/>} /> 
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/internal-error" element={<InternalError />} />
          <Route path="/already-candidate" element={<DejaCandidat />} />
        
          
       
          <Route element={<RequireAuth allowedRoles={ROLES[0]}/>} >
        
              <Route path='/student-main-page' element={<Student/>} />
              <Route path='/student-cereri-page' element={<Cereri />} />
              <Route path='/student-vizualizare-cereri' element={<VizualizareCereri />} />

              <Route element={<CandidatProxy/>} >
                <Route path='/student-candideaza' element={<CandidatSefCamin />} />
              </Route>

              <Route path='/student-candideaza' element={<CandidatSefCamin />} />
              <Route path='/student-voteaza' element={<VotarePage />} />
          
              </Route>
          
          <Route element={<RequireAuth allowedRoles={ROLES[1]}/>} >
            <Route path='/admin_camin-main-page' element={<Administrator/>} />
              <Route path='/admin_camin-vizualizare-studenti' element={<VizualizareStudenti/>} />
              <Route path='/admin_camin-vizualizare-cereri-studenti' element={<VizualizareCereriStud/>} />
              <Route path='/admin_camin-evidenta-voturi' element={<EvidentaVoturi/>} />
              <Route path='/admin_camin-statistici-generale' element={<StatisticiGenerale/>} />
            
          </Route>
          
      </Routes>
  
    </div>
  );
}

export default App;
