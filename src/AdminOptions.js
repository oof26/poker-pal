import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie";

import './App.css'
import './adminPages.css'

import {SLI} from './SLI'
import {MLI} from "./MLI";
import {StartNewSession} from "./StartNewSession";
import {StartNewLeague} from "./StartNewLeague";
import {DeleteUser} from './DeleteUser'


export function AdminOptions() {
  return (
    <div>

      <Router>
        <Switch>
          <Route exact path="/adminOptions">
            <MainScreen />
          </Route>

          <Route exact path="/adminOptions/createNewSession">
            <StartNewSession />
          </Route>

          <Route exact path="/adminOptions/createNewLeague">
            <StartNewLeague />
          </Route>

          <Route exact path="/adminOptions/deleteUser">
            <DeleteUser />
          </Route>



        </Switch>
      </Router>

    </div>


  );
}

function MainScreen() {
  return(
    <div>
      <br/>
      <div className="adminLeftSection">
        <div>
          <p><b>ADMIN OPTIONS</b></p> <br/>

          <div className="break-line-right"/> <br/>

          <label className="adminButtons"><a href="/adminOptions/createNewSession">Create New Session</a></label> <br/> <br/>

          <CurrentSessionID/>
          <button type="submit" value="Submit" className="Login-button" onClick={EndMainSession}>Finish Main Session</button> <br/> <br/>
          <button type="submit" value="Submit" className="Login-button" onClick={EndSideSession}>Finish Side Session</button> <br/> <br/>

          <div className="break-line-right"/> <br/>

          <label className="adminButtons"><a href="/adminOptions/createNewLeague">Create New League</a></label> <br/> <br/>

          <div className="break-line-right"/> <br/>

          <label className="adminButtons"><a className="backLink" href="/adminOptions/deleteUser">Delete User </a></label> <br/> <br/>

          <div className="break-line-right"/> <br/>

        </div>
      </div>

      <div className="adminRightSection">
        <DisplayLIs/>
      </div>

      <br/>
    </div>
  )
}
function EndMainSession() {
  const cookies = new Cookies();
  let MainSeshID = cookies.get('mainSessionID');
  cookies.remove('mainSessionID');
  EndSession(MainSeshID)
}
function EndSideSession() {
  const cookies = new Cookies();
  let SideSeshID = cookies.get('sideSessionID');
  cookies.remove('sideSessionID');
  EndSession(SideSeshID)
}

function EndSession(idToEnd) {
  const cookies = new Cookies();
  const method = "POST";
  const url = "http://localhost:5000/sessions/" + idToEnd + "/finalize";

  let request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function(){
    console.log(request.responseText)

  };
  request.send();

  window.location.reload(true)
}

/**
 * @return {null}
 */
function DisplayLIs() {
  const cookies = new Cookies();
  let MainSeshID = cookies.get('mainSessionID');
  let SideSeshID = cookies.get('sideSessionID');
  if (MainSeshID !== undefined && SideSeshID !== undefined){
    return (
      <div>
        <MLI/>
        <br/><div className="break-line-left"/>
        <SLI/>
        <br/>
      </div>
    )
  } else if (MainSeshID !== undefined && SideSeshID === undefined) {
    return (
      <div>
        <MLI/>
        <br/><div className="break-line-left"/>

        <br/>
      </div>
    )
  } else if (MainSeshID === undefined && SideSeshID !== undefined) {
    return (
      <div>

        <br/><div className="break-line-left"/>
        <SLI/>
        <br/>
      </div>
    )
  } else{
    return null
  }
}

function CurrentSessionID() {
  const cookies = new Cookies();
  let MseshID = cookies.get('mainSessionID');
  let SseshID = cookies.get('sideSessionID');
  if (MseshID === undefined){
    MseshID = "No Session in Current Use"
  }
  if (SseshID === undefined){
    SseshID = "No Session in Current Use"
  }
  return (
    <div>
      <p>Current Main League Session ID: {MseshID}</p>
      <p>Current Side League Session ID: {SseshID}</p>
    </div>
  )
}
