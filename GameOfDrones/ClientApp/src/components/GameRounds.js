import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import { GiSpinningSword } from 'react-icons/gi';

export class GameRounds extends Component {
    static displayName = GameRounds.name;

    constructor(props) {
        super(props);

        this.state = {
            currentPlayerIndex: 0,
            weapons: ["Rock", "Paper", "Scissors"],
            rounds: [],
            currentRound: { weapons: ["", ""], winner: "", finished: 0 },
            gameFinished: 0,
            playerVictories: [0, 0]
        };

        this.handleChange = this.handleChange.bind(this);
        this.setWeapon = this.setWeapon.bind(this);
        this.difference = this.difference.bind(this);
    }

    componentDidMount() {
        let rounds = Object.assign([], this.state.rounds);
        rounds.push(this.state.currentRound);
        this.setState({ rounds });
    }

    setWeapon() {
        if (this.state.currentPlayerIndex < Object.keys(this.props.players).length - 1) {
            this.setState({ currentPlayerIndex: this.state.currentPlayerIndex + 1 });
        } else {
            let currentRound = Object.assign({}, this.state.currentRound);
            let winnerIndex, difference = this.difference(currentRound.weapons[0], currentRound.weapons[1]);
            if (difference === 1) {
                winnerIndex = currentRound.weapons[0] > currentRound.weapons[1] ? 0 : 1;
            }
            else if (difference > 1) {
                winnerIndex = currentRound.weapons[0] < currentRound.weapons[1] ? 0 : 1;
            } else {
                winnerIndex = -1
            }
            currentRound.weapons[0] = this.state.weapons[currentRound.weapons[0]];    //Setting weapon name instead of its index
            currentRound.weapons[1] = this.state.weapons[currentRound.weapons[1]];    //Setting weapon name instead of its index
            currentRound.winnerIndex = winnerIndex;
            currentRound.winner = winnerIndex > -1 ? this.props.players[winnerIndex].name : "Tie";
            currentRound.finished = 1;
            this.setState({ currentRound });

            let rounds = Object.assign([], this.state.rounds);
            rounds.splice(rounds.length - 1, 1, currentRound);
            currentRound = { weapons: ["", ""], winner: "", finished: 0 };
            rounds.push(currentRound);
            this.setState({ currentRound });
            this.setState({ currentPlayerIndex: 0 });
            this.setState({ rounds });
            //this.props.gameFinishedCallback(currentRound);
        }
    }

    difference(a, b) {
        return Math.abs(a - b);
    }

    handleChange(event) {
        let round = Object.assign({}, this.state.currentRound);
        round.weapons[this.state.currentPlayerIndex] = parseInt(event.target.value, 10);
        this.setState({ round });
    }

    render() {
        let weaponForm;
        if (this.state.gameFinished === 0) {
            weaponForm =
                <div className="row">
                <div className="col-sm-12 col-lg-5 bordered mt-2">
                        <Animated animationIn="fadeIn">
                            <div>
                                <span className="badge default text-light text-uppercase">Round {this.state.rounds.length}</span>
                                <h5>{this.props.players[this.state.currentPlayerIndex].name}</h5>
                                <hr />
                                <select className="form-control mb-2" value={this.state.currentRound.weapons[this.state.currentPlayerIndex]} onChange={this.handleChange}>
                                    <option defaultValue value="">Select a weapon</option>
                                    {
                                        this.state.weapons.map((item, index) => {
                                            return (
                                                <option key={index} value={index}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button disabled={this.state.currentRound.weapons[this.state.currentPlayerIndex] === ""} className="btn btn-primary form-control" onClick={this.setWeapon}><GiSpinningSword size="1.3em" /> OK</button>
                            </div>
                        </Animated>
                    </div>
                    <div className="col-sm-12 mt-2 col-lg-5 offset-lg-2 bordered mt-2">
                        {
                            [1, 2, 3, 4].map((item, index) => {
                                return (
                                    <div key={index}>
                                        <h3 className="text-center">{item}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        }
        return (
            <div className="container">
                {weaponForm}
            </div>
        );
    }
}
