import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Cookies from 'universal-cookie';

import './adminPages.css';

export function StartNewSession() {
  return (
    <div>
      <br/>
      <Router>
        <Switch>
          <Route exact path="/adminOptions/createNewSession">
            <p><b>CREATE NEW SESSION</b></p>
            <NewSessionForm/>
            <br/>
            <br/><button className="Login-button"><a className="backLink" href="/adminOptions">Back</a></button>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

function CheckLeagueDetails(sessionIDCookie,leagueIDforCookie) {
  const cookies = new Cookies();
  const method = "GET";
  const url = "http://localhost:5000/leagues/"+leagueIDforCookie;

  let request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function(){
    console.log(request.responseText);
    let data = JSON.parse(this.response);
    let type = data.value.type;

    if(type === "Points") {
      cookies.set('mainSessionID', sessionIDCookie, {path: '/'});
    } else if (type === "Cash"){
      cookies.set('sideSessionID', sessionIDCookie, {path: '/'});
    }
    document.getElementById("startDate").value = '';
    document.getElementById("endDate").value = '';
    document.getElementById("freq").value = '';
    document.getElementById("venue").value = '';
    document.getElementById("leagueID").value = '';
  };
  request.send();
}

function SendDataToAPI(pars,leagueIDforCookie) {
  const cookies = new Cookies();
  console.log("SendDataToAPI");
  console.log(pars);
  const method = "POST";
  const url = "http://localhost:5000/sessions";
  let request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function(){
    console.log(request.responseText);
    let data = JSON.parse(this.response);
    console.log("DATA: ",data);
    let sessionIDforCookie = data.value.id;

    CheckLeagueDetails(sessionIDforCookie,leagueIDforCookie)
  };
  request.send(pars);

  cookies.set('sessionID', '1', { path: '/' });
  alert("Session created!");

}

class NewSessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      frequency: '',
      venue: '',
      leagueID: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log("huge fart");
    event.preventDefault();
    let valid = true;
    if (this.state.startDate.length === 0
      || this.state.endDate.length === 0
      || this.state.frequency.length === 0
      || this.state.venue.length === 0
      || this.state.leagueID.length === 0) {
      window.alert("Please fill in all fields");
      valid = false;
    }

    if (valid) {
      SendDataToAPI("{" +
        "\"startDate\":\""+ this.state.startDate + "\"," +
        "\"endDate\":\""+ this.state.endDate + "\"," +
        "\"frequency\":"+this.state.frequency + "," +
        "\"venue\":\""+this.state.venue + "\"," +
        "\"leagueID\":"+this.state.leagueID+ "" +
        "}",this.state.leagueID);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="startDate" type="date" name="startDate" className="Input-box" placeholder="Start Date" value={this.state.startDate} onChange={this.handleChange}/> <br/>
          <input id="endDate" type="date" name="endDate" className="Input-box" placeholder="End Date" value={this.state.endDate} onChange={this.handleChange}/> <br/>
          <input id="freq" type="number" name="frequency" className="Input-box" placeholder="Frequency" value={this.state.frequency} onChange={this.handleChange}/> <br/>
          <input id="venue" type="text" name="venue" className="Input-box" placeholder="Venue" value={this.state.venue} onChange={this.handleChange}/> <br/>
          <input id="leagueID" type="number" name="leagueID" className="Input-box" placeholder="League ID" value={this.state.leagueID} onChange={this.handleChange}/> <br/> <br/>
          <button type="submit" value="Submit" className="Login-button" >Create</button>
        </form>
      </div>
    );
  }
}