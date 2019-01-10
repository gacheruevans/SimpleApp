"use strict"
import React, { Component } from "react";
import axios from 'axios';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usersId: '47',
            users: []
         };
    }

    componentDidMount() {
        let userId = this.state.usersId;
        let header = { 
            headers: {'Content-Type': undefined }
        };
        axios.get('http://localhost:3000/api/notes/users/'+ userId , header)
            .then(res => {
                const users = res.data;
                console.log("note Itemsdata >>>>>", this.state.users.noteItems);
                this.setState({ users });
            })
    }

    render() {
        return (
            <div>
                <div>
                    <h3>{this.state.users.username} Account</h3>
                  
                        {JSON.stringify(this.state.users.noteItems, null, 8)}
                        {/* {this.state.users.noteItems.item} */}
                
                </div>
            </div>
        );
    }
}
export default Welcome;