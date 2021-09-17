import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import Cookies from 'universal-cookie';

export function MLI() {
  return (
    <div>
      <p><b>MAIN LEAGUE DATA INPUT</b></p>
      <MainLeagueDataEntryForm/>
    </div>
  )
}

function SendToBackEnd(un,place) {
  console.log("STUFF TO SEND TO BACKEND");
  console.log(un);
  console.log(place);
  let request = new XMLHttpRequest();
  let q = "?q=" + un;
  request.open('GET', "http://localhost:5000/users" + q, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function () {
    let data = JSON.parse(this.response);
    if (data.error == null) {
      push(data.value[0].id,place)
    }
  };
  request.send();
}

function push(id,place){
  const cookies = new Cookies();
  let MainSeshID = cookies.get('mainSessionID');
  let request = new XMLHttpRequest();
  let pars = "{\n" +
    "  \"userId\": " + id + ",\n" +
    "  \"totalScore\": " + place + "\n" +
    "}";
  request.open('GET', "http://localhost:5000/sessions/"+MainSeshID+"/users", true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function () {
    let data = JSON.parse(this.response);
    if (data.error == null) {
      alert("details sent")
      document.getElementById("mName").value = '';
      document.getElementById("mPlace").value = '';
    }
  };
  request.send(pars);
}


/**
 * @return {string}
 */
async function GetUNamesFromBE() {
  console.log("HUGE FART");
  let request = new XMLHttpRequest();
  let q = "?q=" + "j";
  request.open('GET', "http://localhost:5000/users" + q, true);
  request.setRequestHeader('Content-type', 'application/json');
  let dataReturn = [];
  request.onload = function () {
    let data = JSON.parse(this.response);
    if (data.error == null) {
      let numEntries = data.value.length; // how many users
      console.log("numEntries: ",numEntries);
      console.log("data.value: ",data.value);
      console.log("data.value[0].name: ",data.value[0].name);
      let dataReturn = [];
      for (let i = 0;i<numEntries;i++){
        dataReturn.push(data.value[i])
      }
      console.log("typeof dataReturn: ",typeof dataReturn)
      return dataReturn
    }
  };
  request.send("{}");
  await sleep(500);
  console.log("MLI get names");
  console.log(dataReturn);
  return dataReturn;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


let userNames = GetUNamesFromBE();
console.log("userNamessssssssssss:",userNames);
userNames = [
{id: 1, email: "ja853@bath.ac.uk", name: "James Austen", joined: "2020-04-08T12:53:09.6840892+01:00", authLevel: "User"},
{id: 2, email: "lsg38@bath.ac.uk", name: "Lucy Green", joined: "2020-04-08T12:53:09.7889493+01:00", authLevel: "User"},
{id: 3, email: "jm2787@bath.ac.uk", name: "Jake Mifsud", joined: "2020-04-08T12:53:09.8037499+01:00", authLevel: "User"},
{id: 4, email: "snm48@bath.ac.uk", name: "Soren Mortensen", joined: "2020-04-08T12:53:09.8199115+01:00", authLevel: "User"},
{id: 5, email: "oof26@bath.ac.uk", name: "Oisin OFlaherty", joined: "2020-04-08T12:53:09.8358016+01:00", authLevel: "User"},
{id: 6, email: "sr2058@bath.ac.uk", name: "Sam Rosenthal", joined: "2020-04-08T12:53:09.8519434+01:00", authLevel: "User"},
{id: 7, email: "gjcr20@bath.ac.uk", name: "Geordie Ross", joined: "2020-04-08T12:53:09.8681587+01:00", authLevel: "User"}
];
console.log("DATA ASDFASDF2:",userNames);

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : userNames.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class MainLeagueDataEntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      place: '',
      value: '',
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);

  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange(event) { // FROM LOGIN
    console.log("userNamessssssssssss:",userNames);
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    let valid = true;
    if (this.state.value.length === 0
      || this.state.place.length === 0) {
      window.alert("Please fill in all fields");
      valid = false;
    }

    event.preventDefault();
    if (valid) {
      SendToBackEnd(this.state.value, this.state.place)
      this.state.value = '';
      this.state.place = '';
    }

  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      id:'mName',
      placeholder: 'Enter a username',
      value,
      onChange: this.onChange,
      className: 'Input-box'
    };

    return (
      <div>
        <br/>
        <form onSubmit={this.handleSubmit} id={"mliForm"}>
          <p><b>Enter Name:</b></p>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <p><b>Enter Place: </b></p>
          <input id="mPlace" type="number" name="place" className="Input-box" placeholder="Place" value={this.state.place} onChange={this.handleChange}/> <br/> <br/>
          <button type="submit" value="Submit" className="Login-button">Submit</button>
        </form>
      </div>
    );
  }
}