import React, {useState} from "react";
import { Detail } from "../Body/detailTask";
import LoginForm from "./LoginForm";

function LoginApp() {
    const admin = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        if (details.email == admin.email && details.password == admin.password){
            console.log("Login");
            setUser({
                name: details.name,
                email: details.email,
            });
        } 
        else {
            console.log("do not match");
            setError("wrong");
        }
    }

    const Logout = () => {
        setUser({name:"", email:""});
    }

    return (
        <div className="Login">
        {(user.email != "") ? (
            <div className="welcome">
                <h2 >welcome, <span> {user.name}</span></h2>
                <button onClick={Logout}> Logout </button>
            </div>
        ) : (
            <LoginForm Login = {Login} error={error}/>
        )}
        </div>
    );
}
export default LoginApp;