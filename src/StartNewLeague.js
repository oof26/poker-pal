import React, {Component} from "react";


export function StartNewLeague() {
  return (
    <div>
      <br/>
      <p><b>CREATE NEW LEAGUE</b></p>
      <NewLeagueForm/>
      <br/>
      <button className="Login-button"><a className="backLink" href="/adminOptions">Back</a></button>
    </div>
  )
}

function SendDataToAPI(pars) {
  console.log("SendDataToAPI");
  console.log(pars);
    const method = "POST";
    const url = "http://localhost:5000/leagues";
    let request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-type', 'application/json');
    request.onload = function(){
      console.log(request.responseText)
      document.getElementById("leagueName").value = '';
      document.getElementById("startAmount").value = '';
      document.getElementById("changes").value = '';
      document.getElementById("type").value = '';
    };
    request.send(pars)
}

class NewLeagueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startingAmount: '',
      allowChanges: '',
      type: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let valid = true;
    if (this.state.name.length === 0
      || this.state.startingAmount.length === 0
      || this.state.allowChanges.length === 0
      || this.state.type.length === 0) {
      window.alert("Please fill in all fields");
      valid = false;
    }
    let type = this.state.type;
    let changes = this.state.allowChanges;
    if (type !== "Cash" && type !== "Points") {
      window.alert("Please enter 'Cash' or 'Points' ");
      valid = false;
    } else if (changes !== "true" && changes !== "false"){
      window.alert("Please enter 'true' or 'false' ");
      valid = false;
    }

    if (valid) {
      SendDataToAPI("{" +
        "\"name\":\""+ this.state.name + "\"," +
        "\"startingAmount\":"+ this.state.startingAmount + "," +
        "\"allowChanges\":"+this.state.allowChanges + "," +
        "\"type\":\""+this.state.type + "\"" +
        "}");
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id="leagueName" type="text" name="name" className="Input-box" placeholder="League Name" value={this.state.name} onChange={this.handleChange}/> <br/>
          <input id="startAmount" type="number" name="startingAmount" className="Input-box" placeholder="Starting Amount" value={this.state.startingAmount} onChange={this.handleChange}/> <br/>
          <input id="changes" type="text" name="allowChanges" className="Input-box" placeholder="Allow Changes?" value={this.state.allowChanges} onChange={this.handleChange}/> <br/>
          <input id="type" type="text" name="type" className="Input-box" placeholder="Type" value={this.state.type} onChange={this.handleChange}/> <br/>
          <button type="submit" value="Submit" className="Login-button" >Create</button>
        </form>
      </div>
    );
  }
}