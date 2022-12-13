import { BrowserRouter, Routes, Route, a } from "react-router-dom";
import Login from './Login';
import { BodyDemo } from "./component/Body/body";
import {Detail} from "./component/Body/detailTask";
import NavBar from "./component/Navbar/NavBar";


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
     </main>
  );
}

export default App;