import { BrowserRouter, Routes, Route, a } from "react-router-dom";
// import Login from './component/Login/login';
import { BodyDemo } from "./component/Body/body";
import {Detail} from "./component/Body/detailTask";
import NavBar from "./component/Navbar/NavBar";
import LoginApp from "./component/Login/login1";
import { Mcp } from "./component/Body/mcp";
import { Staff } from "./component/Body/staff";
import { Truck } from "./component/Body/truck";


function App() {
  return (
    <main className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes> 
          <Route path ="/detail" exact element = {<Detail/>}/>
          <Route path ="/" exact element = {<BodyDemo/>}/>
          <Route path ="/Login" exact element = {<LoginApp/>}/>
          <Route path ="/mcp" exact element = {<Mcp/>}/>
          <Route path ="/staff" exact element = {<Staff/>}/>
          <Route path ="/truck" exact element = {<Truck/>}/>
        </Routes>
      </BrowserRouter>
     </main>
  );
}

export default App;