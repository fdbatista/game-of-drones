import React, { Component } from 'react';
import { Button } from 'element-react';
import './Home.css';
import { Link } from 'react-router-dom';
import { GiSpinningSword } from 'react-icons/gi';
import { GiCauldron } from 'react-icons/gi';
import { Animated } from "react-animated-css";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <Animated animationIn="fadeIn">
                <div className="text-center pit pt-2">
                    <h3 className="mt-3">Welcome to the Arena, strangers.</h3>
                    <h4>Are you brave enough to challenge the Gods' will?</h4>
                    <Animated animationIn="slideInUp">
                        <Link to="/new-game">
                            <Button className="linkBtn mt-3 mb-4 mr-3 default text-light"><GiSpinningSword size="1.5em" /> Yes! Take me to the Fighting Pit</Button>
                        </Link>
                        <Link to="/statistics">
                            <Button className="linkBtn mb-4 default text-light"><GiCauldron size="1.5em" /> Wait, show me other fighters' results</Button>
                        </Link>
                    </Animated>
                </div>
            </Animated>
        );
    }
}
