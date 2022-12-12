import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { BodyDemo } from "./component/Body/body";
import NavBar from "./component/Navbar/NavBar"

function App() {

  return (
    <main className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes> 
          <Route path ="/" exact element = {<BodyDemo/>}/>
          <Route path ="/Login" exact element = {<Login/>}/>
          <Route path ="/Register" exact element = {<Register/>}/>
        </Routes>
      </BrowserRouter>
     </main>
  );
}

export default App;

