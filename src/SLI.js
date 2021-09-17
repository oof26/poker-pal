import React, {Component} from "react";
import Autosuggest from "react-autosuggest";
import Cookies from "universal-cookie";

export function SLI() {
  return (
    <div>
      <p><b>SIDE LEAGUE DATA INPUT</b></p>
      <CurrencyIOControl/>
    </div>
  )
}

function SendToBackEnd(un,amount) {
  let request = new XMLHttpRequest();
  let q = "?q=" + un;
  request.open('GET', "http://localhost:5000/users" + q, true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function () {
    let data = JSON.parse(this.response);
    if (data.error == null) {
      push(data.value[0].id,amount)

    }
  };
  request.send();
}

function push(id,amount){
  const cookies = new Cookies();
  let SideSeshID = cookies.get('sideSessionID');
  let request = new XMLHttpRequest();
  let pars = "{\n" +
    "  \"userId\": " + id + ",\n" +
    "  \"totalScore\": " + amount + "\n" +
    "}";
  request.open('GET', "http://localhost:5000/sessions/"+SideSeshID+"/users", true);
  request.setRequestHeader('Content-type', 'application/json');
  request.onload = function () {
    let data = JSON.parse(this.response);
    if (data.error == null) {
      alert("details sent")
      document.forms["mliForm"].reset();
      document.getElementById("sName").value = '';
      document.getElementById("sAmount").value = '';



    }
  };
  request.send(pars);
}

/**
 * @return {string}
 */
function GetUNamesFromBE() {
  /*let request = new XMLHttpRequest();
  request.open('GET', "http://localhost:5000/users", false);
  let dataReturn;
  request.onload = function () {
    let data = JSON.parse(this.response);
    if (data.error == null) {
      let numEntries = data.value.length; // how many users
      console.log(data.value);
      console.log(data.value[0].name);
      dataReturn = data.value;
      return data.value;
    }
  };
  request.send();*/
  console.log("SLI get names");
  return "";
}

const userNames = GetUNamesFromBE();
console.log("userNames:",userNames);


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

function LoginButton(props) {
  return (
    <div>
      <br/>
      OUT
      <label className="switch">
        <input type="checkbox" id="logRegToggle" onClick={props.onClick} />
        <span className="slider round"/>
      </label>
      IN
    </div>
  );
}

function RegisterButton(props) {
  return (
    <div>
      <br/>
      OUT
      <label className="switch">
        <input type="checkbox" checked={true} id="logRegToggle" onClick={props.onClick} />
        <span className="slider round"/>
      </label>
      IN
    </div>
  );
}

class CurrencyIOControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeToLogin = this.handleChangeToLogin.bind(this);
    this.handleChangeToRegister = this.handleChangeToRegister.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleChangeToLogin() {
    this.setState({isLoggedIn: true});
  }

  handleChangeToRegister() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <RegisterButton onClick={this.handleChangeToRegister} />;
    } else {
      button = <LoginButton onClick={this.handleChangeToLogin} />;
    }

    return (
      <div>
        {button}
        <Greeting isLoggedIn={!isLoggedIn} />
      </div>
    );
  }
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <CurrencyOut/>;
  }
  return <CurrencyIn/>;
}

class CurrencyOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      value: '',
      amountOut: 10000,
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmits = this.handleSubmits.bind(this);
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
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmits(event) {
    let valid = true;
    if (this.state.value.length === 0
      || this.state.amountOut.length === 0) {
      window.alert("Please fill in all fields");
      valid = false;
    }

    event.preventDefault();
    if (valid) {
      SendToBackEnd(this.state.value, this.state.amountOut)
    }

  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      id: "sName",
      placeholder: 'Enter a username',
      value,
      onChange: this.onChange,
      className: 'Input-box'
    };

    return (
      <div>
        <br/>
        <p><b>Enter Name: </b></p>
        <form onSubmit={this.handleSubmits}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <p><b>Amount out: </b></p>
          <input id="sAmount" type="number" name="amountOut" className="Input-box" placeholder="10000" value={this.state.amountOut} onChange={this.handleChange}/> <br/> <br/>
          <button type="submit" value="Submit" className="Login-button">OUT</button>
        </form>
      </div>
    );
  }
}

class CurrencyIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      value: '',
      amountIn: '',
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmits = this.handleSubmits.bind(this);
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
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmits(event) {
    let valid = true;
    if (this.state.value.length === 0
      || this.state.amountIn.length === 0) {
      window.alert("Please fill in all fields");
      valid = false;
    }

    event.preventDefault();
    if (valid) {
      SendToBackEnd(this.state.value, this.state.amountIn)
    }
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      id: "sName",
      placeholder: 'Enter a username',
      value,
      onChange: this.onChange,
      className: 'Input-box'
    };

    return (
      <div>
        <br/>
        <p><b>Enter Name: </b></p>
        <form onSubmit={this.handleSubmits}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <p><b>Amount in: </b></p>
          <input id="sAmount" type="number" name="amountIn" className="Input-box" placeholder="Currency In" value={this.state.amountIn} onChange={this.handleChange}/> <br/> <br/>
          <button type="submit" value="Submit" className="Login-button">IN</button>
        </form>
      </div>
    );
  }
}