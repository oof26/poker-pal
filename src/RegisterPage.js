import logo from "./bluffBathLogo.png";
import React from "react";

// TODO: CURRENTLY OBSOLETE FILE, POSSIBLY DELETE WHEN SORTED HOW SWITCH BETWEEN LOGIN AND REGISTER OCCURS

export function RegisterPage() {
    return (
        <div className="App">

            <div className="custom-header">
                <b>Bluff Bath</b>
            </div>

            <div className="section">
                <div className="leftSection">
                    <img src={logo} className="App-logo" alt="logo" width="500" height="500" />
                </div>

                <div className="rightSection">
                    <p>LOGIN</p>
                    <form className="form1">
                        <input type="text" id="firstName" className="Input-box" placeholder="Email"/>
                        <br/><br/>
                        <input type="text" id="lastName" className="Input-box" placeholder="Email"/>
                        <br/><br/>
                        <input type="password" id="pin" className="Input-box" placeholder="Password"/>
                        <br/><br/>
                        <button type="button" className="Login-button" onClick={postUserDetails}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function postUserDetails(){
    const method = "GET";
    const url = "https://localhost:5001/users/1";
    let request = new XMLHttpRequest();
    request.open(method, url);
    request.onload = function(){
        console.log(request.responseText)
    };
    request.send()
}

function clicked() {
    let request = new XMLHttpRequest();
    request.open('GET', "https://localhost:5001/users/1");
    request.onload = function(){
        var data = JSON.parse(this.response);
        if (data.error == null) {
            console.log(data.value.id);
            console.log(data.value.name);
            console.log(data.value.email);
            console.log(data.value.joined);
            console.log(data.value.authLevel);
        }

    };
    request.send();

}