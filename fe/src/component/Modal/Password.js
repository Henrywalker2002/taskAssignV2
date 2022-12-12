import React, {useRef} from "react";
// import bcrypt from 'bcryptjs';

export const Password = () => {
    const emailInput = useRef();
    const passInput = useRef();

    const signup = (e)=> {
        e.preventDefault();
        const email = emailInput.current.value;
        const pass = passInput.current.value;

        // const hashedPass = bcrypt.hashSync(pass, 10);
        // const hashedMail = bcrypt.hashSync(email, 15);

        window.localStorage.setItem('login', JSON.stringify({email, pass}))
    }

    const login = (e)=> {
        e.preventDefault();
        const email = emailInput.current.value;
        const pass = passInput.current.value;

        const getpass = JSON.parse(window.localStorage.getItem('login')).pass;
        const getmail = JSON.parse(window.localStorage.getItem('login')).email;

        if (pass === getpass && email === getmail ){
            console.log("qua da luon");
        }
        else{console.log("sai mat roi");}
    }

    
    return (
        <form>
            <input type = "email" placeholder="email" ref = {emailInput}></input>
            <input type = "pass" placeholder="pass" ref = {passInput}></input>
            <button type ="submit" onClick= {(e) => signup(e)}>
                Sign up
            </button>
            <button type ="submit" onClick= {(e) => login(e)}>
                Log in
            </button>
        </form>
    )
}

export default Password;