import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Nabar";
import Clusters from "./Components/Clusters/Clusters";
import Login from "./Components/Login/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";

function App() {
 
  return (
    <Router>
      <div id="wrapper">
      <Navbar/>
     
       

        <Routes>
             <Route path="/" element={<Login/>} exact={true}></Route>
             <Route path="/home" element={<Home/>} exact={true}></Route>
             <Route path="/cluster/:clusterName" element={<Clusters/>} exact={true}></Route>         
      </Routes>
      </div>
    </Router>
  );
}

export default App;
