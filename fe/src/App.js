import { BrowserRouter, Routes, Route, a } from "react-router-dom";
import Login from './component/Login/login';
import { BodyDemo } from "./component/Body/body";
import {Detail} from "./component/Body/detailTask";
import NavBar from "./component/Navbar/NavBar";
import { Login1 } from "./component/Login/login1";


function App() {
  return (
    <main className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes> 
          <Route path ="/detail" exact element = {<Detail/>}/>
          <Route path ="/" exact element = {<BodyDemo/>}/>
          <Route path ="/Login" exact element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Login1/> */}
     </main>
  );
}

export default App;