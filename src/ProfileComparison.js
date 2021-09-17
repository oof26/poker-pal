import React, {Component} from 'react';

import Checkbox from "./Checkbox";

let playerList = [
    {ranking: 1, name: 'Oisin', balance: 20},
    {ranking: 2, name: 'James', balance: 15},
    {ranking: 3, name: 'Jake', balance: 10},
    {ranking: 4, name: 'Lucy', balance: 5},
    {ranking: 5, name: 'Geordie', balance: 4},
    {ranking: 6, name: 'Sam', balance: 3},
    {ranking: 7, name: 'Soren', balance: 2}
    ];

let displayBools = Array(playerList.length).fill(true);

let saveClicked;

class ProfileComparison extends Component {
    constructor(props) {
        super(props);
        saveClicked = false;

        this.renderTableData = this.renderTableData.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.createCheckbox = this.createCheckbox.bind(this);
    }

    renderTableData(){
        return playerList.map((student, index) => {
            const {ranking, name} = student;
            if(displayBools[index]) {
                return (
                    <tr key={name}>
                        <td>{ranking}</td>
                        <td>{name}</td>
                        <td>{this.createCheckbox(index)}</td>
                        {displayBools[index] = false}
                    </tr>
                )
            }
        })
    }
    renderTableHeader() {
        let header = Object.keys((({ ranking, name, display }) => ({ ranking, name, display}))(playerList[0]));
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    state = {
        checkboxes: playerList.reduce(
            (options, option) => ({
                ...options,
                [option]: true
            }),
            {}
        )
    };

    handleCheckboxChange = index => {
        displayBools[index] = !displayBools[index];
    };

    handleFormSubmit(){
        saveClicked = true;
        this.forceUpdate();
    };

    createCheckbox = option => (
        <Checkbox
            isSelected={this.state.checkboxes[true]}
            onCheckboxChange={()=>this.handleCheckboxChange(option)}
        />
    );

    render(){
        if(saveClicked){
            return <DisplayChoices/>
        } else {
            return (
                <div className="players">
                    <table id='leaderboardEntry'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            );
        }
    }

}

class DisplayChoices extends Component {

    constructor(props) {
        super(props);
        saveClicked = false;

        this.renderChoices = this.renderChoices.bind(this);
        this.renderChoicesHeader = this.renderChoicesHeader.bind(this);
        this.clearChoices = this.clearChoices.bind(this);
    }

    renderChoices() {
        return playerList.map((student, index) => {
            const {ranking, name, balance} = student;
            if (displayBools[index]) {
                return (
                    <tr key={name}>
                        <td>{ranking}</td>
                        <td>{name}</td>
                        <td>{balance}</td>
                    </tr>
                )
            }
        })
    }

    renderChoicesHeader() {
        let header = Object.keys((({ ranking, name, balance }) => ({ ranking, name, balance}))(playerList[0]));
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    clearChoices(){
        saveClicked = true;
        displayBools.fill(true);
        this.forceUpdate();
    }

    render(){
        if(saveClicked){
            return <ProfileComparison/>
        } else {
            return (
                <div className="players">
                    <table id='leaderboardEntry'>
                        <tbody>
                        <tr>{this.renderChoicesHeader()}</tr>
                        {this.renderChoices()}
                        </tbody>
                    </table>
                    <button onClick={this.clearChoices} type="clear" className="btn btn-primary">
                        Clear
                    </button>
                </div>
            );
        }
    }
}

export default ProfileComparison