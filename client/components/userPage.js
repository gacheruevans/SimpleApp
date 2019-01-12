"use strict"
import React, { Component } from "react";
import axios from 'axios';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        let header = { 
            headers: {'Content-Type': undefined }
        };
        axios.get('http://localhost:3000/api/notes/users', header)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }

    render() {
        return (
            <ul>
                {this.state.users.map(users => <li>{users.username}</li>)}
            </ul>
        );
    }
}
export default Welcome;