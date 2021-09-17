import React from "react";
import axios from 'axios'
import {Line} from 'react-chartjs-2';
import Cookies from 'universal-cookie';

import './Tournaments.css';

export class MainLeagueGraph extends React.Component{
    constructor(props){
        super(props);
        let cookies = new Cookies();
        this.state = {
            lastUpdate: -1,
            userID: cookies.get('userID'),
            sessionIDs:-1,
            sessionValues: [-1],
            pHistory : {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label : 'Place History',
                    backgroundColor: '#0013ae',
                    fill: false,
                    borderColor: '#0013ae',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }],
            },
            graphOptions : {
                scales: {
                    yAxes: [
                        {ticks: 
                            {reverse: false}
                        }
                    ]
                },
        
            }
        }
    }
    
    async componentDidMount(){
        axios.get('http://localhost:5000/leagues/1/user/'+this.state.userID+'/history')
          .then((response) => {
              let sessions = response.data.value
              let sessionVal = sessions.map(sessions=>sessions.totalScore)
              this.setState({
                sessionIDs: sessions.map(sessions => sessions.sessionId), //GET FROM API
                sessionValues: sessionVal
              })    
          }, (error) => {
            console.log(error);
          });
          axios.get('http://localhost:5000/users/'+this.state.userID+'/sessions')
          .then((response) => {
              let sessions = response.data.value
              let inclSessions = this.state.sessionIDs
              let validSessions = sessions.filter((sessions) => inclSessions.includes(sessions.id));
              validSessions = validSessions.map(sessions => sessions.endDate)
              validSessions = validSessions.map(function(item) { 
                item = new Date(item)
                return item.toDateString();
              });
              this.setState({
                pHistory:{
                    labels: validSessions,
                    datasets:[{
                        label : 'Place History',
                        backgroundColor: '#0013ae',
                        fill: false,
                        borderColor: '#0013ae',
                        data: this.state.sessionValues
                    }]
                }
              })
          }, (error) => {
            console.log(error);
          });
    }
    render(){
        return(
            <Line data={this.state.pHistory} options={this.state.graphOptions}/> 
        );
    }
}

export default MainLeagueGraph