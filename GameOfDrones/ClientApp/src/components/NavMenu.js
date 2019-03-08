import React, { Component } from 'react';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import 'element-theme-default';
import Sound from 'react-sound';
import soundfile from './../assets/snd/got.mp3';

import { GiCrossedSwords } from 'react-icons/gi';
import { GiCauldron } from 'react-icons/gi';
import { GiBrutalHelm } from 'react-icons/gi';
import { GiCastle } from 'react-icons/gi';
import { MdVolumeUp } from "react-icons/md";
import { MdVolumeOff } from "react-icons/md";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
        this.state = {
            collapsed: true,
            playSound: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleSound() {
        this.setState(
            {
                playSound: !this.state.playSound
            }
        );
    }

    render() {
        let playSoundIcon;
        if (this.state.playSound) {
            playSoundIcon = <MdVolumeUp size="1.3em" />;
        } else {
            playSoundIcon = <MdVolumeOff size="1.3em" />;
        }

        return (
            <header>
                <Sound autoLoad={true} loop={true} url={soundfile} playStatus={this.state.playSound ? Sound.status.PLAYING : Sound.status.PAUSED} />
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 navbar-dark dark">
                    <Container>
                        <NavbarBrand className="text-light" tag={Link} to="/">
                            <GiBrutalHelm size="1.3em" /> Game of Drones
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2 text-light" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/"><GiCastle /> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/new-game"><GiCrossedSwords /> New Game</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/statistics"><GiCauldron /> Statistics</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={this.toggleSound} className="text-light handCursor">{playSoundIcon}</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
