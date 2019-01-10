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
                this.setState({ users: res.data });
            })
    }
    render() {
        const items= this.state.users.noteItems;
        console.log("Items outside!!! >>>>>",items);

        let getItems = () => {
            const items= this.state.users.noteItems;
            return Object.values(items).map((x,val) => {
               return( <li key={x}>{ Object.values(x) }</li>)
             });
        }
        return (
            <div>
                <div>
                    <h3>{this.state.users.username} Account</h3>
                     <ul>
                        {items && getItems()}
                     </ul>
                </div>
            </div>
        );
    }
}
export default Welcome;