import React from "react";
import axios from 'axios'
import Cookies from "universal-cookie";
import LargeMLLeaderboard from "./largeMLLeaderboard";

export function Dashboard() {
  const cookies = new Cookies();
  cookies.set('id', '1234', { path: '/' });
  let userID  = cookies.get('id');
  let mlPlace = 10; //NEED TO GET FROM API
  let slBalance = 300000; //NEED TO GET FROM API
  let lastUpdate = "11/10/20";

  return (
    <div className="Tournament">
      <div className="dashboard-header">
        <b>Welcome</b>
      </div>
      <body>
        <div>
          <div className="tournamentLeftSection">
            <br/> <br/>
            <p><strong>Current Main League Points</strong></p>
            <CurrPlace/>
            <p><strong>Current Side League Balance</strong></p>
            <BalanceValues/>
            <p><strong>Last Updated</strong></p>
            <LastUpdated/>
          </div>
          <div className="tournamentRightSection">
            <LargeMLLeaderboard/>
          </div>
        </div>
      </body>
    </div>
  );
}
class BalanceValues extends React.Component{
  constructor(props){
      super(props);
      let cookies = new Cookies();
      this.state = {
          currBal: "User has not joined any sessions",
          userID: cookies.get('userID')
      }
  }
  
  async componentDidMount(){
      this.setState({currPlace:2})
      axios.get('http://localhost:5000/leagues/2/user/'+this.state.userID+'/history')
        .then((response) => {
            let sessions = response.data.value
            let currBalance = response.data.value[sessions.length-1].totalScore
            this.setState({
                currBal: currBalance
              });
        }, (error) => {
          console.log(error);
        });
      
  }
  render(){
      return(
          <div>
              <p>
                  {this.state.currBal}
              </p>
          </div>
         
      );
      }
}
class CurrPlace extends React.Component{
  constructor(props){
      super(props);
      let cookies = new Cookies();
      this.state = {
          currPlace: "User has not joined any sessions",
          userID: cookies.get('userID')
      }
  }
  async componentDidMount(){
      axios.get('http://localhost:5000/leagues/1/user/'+this.state.userID)
        .then((response) => {
          this.setState({currPlace: response.data.value[0].totalScore});
        }, (error) => {
          console.log(error);
        });
      
  }
  render(){
      return(
          <p>
              {this.state.currPlace}
          </p>
      );
  }
}
class LastUpdated extends React.Component{
  constructor(props){
      super(props);
      let cookies = new Cookies();
      this.state = {
          lastUpdate: "User has not joined any sessions",
          userID: cookies.get('userID')
      }
  }
  
  async componentDidMount(){
      this.setState({currPlace:2})
      axios.get('http://localhost:5000/users/'+this.state.userID+'/sessions/')
        .then((response) => {
            let sessions = response.data.value
            let recentSession = new Date(response.data.value[response.data.value.length-1].startDate)
            this.setState({lastUpdate: recentSession.toDateString()});
        }, (error) => {
          console.log(error);
        });
      
  }
  render(){
      return(
          <p>
              {this.state.lastUpdate}
          </p>
      );
  }
}