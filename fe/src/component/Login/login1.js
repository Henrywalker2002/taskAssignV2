import React, {useState} from "react";
import { Detail } from "../Body/detailTask";
import LoginForm from "./LoginForm";

export function Login1() {
    const admin = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);
    }

    const Logout = () => {
        console.log("Logout");
    }

    return (
        <div className="Login">
        {(user.email != "") ? (
            <div className="welcome">
                <h2>welcome, <span> {user.name}</span></h2>
                <button> Logout </button>
            </div>
        ) : (
            <LoginForm Login1 = {Login1} error={error}/>
        )}
        </div>
    );
}