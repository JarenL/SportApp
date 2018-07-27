import React, { Component } from 'react';
import Match from '../Components/Match.js';
import MatchContract from '../../build/contracts/Match.json';
import getWeb3 from '../utils/getWeb3';

class MatchContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      matchAddress: props.address,
      team1Address: null,
      team1Name: null,
      team2Address: null,
      team2Name: null
    }

    getWeb3
    .then(results => {
      console.log('Succesful finding web3.')
      this.setState({
        web3: results.web3
      })
      this.instantiateContract()  
    })
    .catch(() => {
      console.log('Error finding web3.')
    }) 

    this.instantiateContract = this.instantiateContract.bind(this);
}

  instantiateContract() {
    const contract = require('truffle-contract')
    const match = contract(MatchContract)
    match.setProvider(this.state.web3.currentProvider)
    match.at(this.state.matchAddress).then((instance) => {
        const teamCreateEvent = instance.allEvents({fromBlock: 0, toBlock: 'latest'});
        teamCreateEvent.watch((error, result) => {
            if (!error) {
                    this.setState ({
                        team1Address: result[0].args.teamAddress,
                        team1Name: result[0].args.teamName,
                        team2Address: result[1].args.team1Address,
                        team2Name: result[1].args.teamName
                    })
            } else {
                console.log(error)
            }
        })     
    })
  }

  render() {
    return (
        <Match 
            team1Address={this.state.team1Address}
            team2Address={this.state.team2Address}
            team1Name={this.state.team1Name}
            team2Name={this.state.team2Name}
            web3={this.state.web3}
        />
    );
  }
}

export default MatchContainer;