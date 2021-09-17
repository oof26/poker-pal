import React, {Component} from 'react';

import './Tournaments.css'

class LargeSLLeaderboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            leaderboardEntry:[
                { ranking: 1, name: 'Oisin', balance: 21},
                { ranking: 2, name: 'Soren', balance: 19},
                { ranking: 3, name: 'Sam', balance: 16},
                { ranking: 4, name: 'Geordie', balance: 10}
            ]
        }
    }
    sortBy(key){
        //SORT DATA 
    }
    renderTableData(){
        return this.state.leaderboardEntry.map((student,index) => {
            const {id, name, ranking, balance} = student  
            return(
                <tr key={id}>
                    <td>{ranking}</td>
                    <td>{name}</td>
                    <td>{balance}</td>
                    
                </tr>
            )
        })
    }
    renderTableHeader() {
        let header = Object.keys(this.state.leaderboardEntry[0])
        return header.map((key, index) => {
           return <th key={index} onClick={() => this.sortBy(key.toUpperCase())}>{key.toUpperCase()}</th>
        })
     }
  
    render(){
        return (
            <div>
               <table id='leaderboardEntry'>
                  <tbody>
                     <tr>{this.renderTableHeader()}</tr>
                     {this.renderTableData()}
                  </tbody>
               </table>
            </div>
         )
    }
}

export default LargeSLLeaderboard;