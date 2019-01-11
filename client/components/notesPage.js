"use strict"
import React, { Component } from "react";
import axios from 'axios';
import "./style.scss";

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
               return( <div key={x} className="list-items">
                            { Object.values(x) }
                            <button type="submit" value={x}>Edit</button>
                            <button type="submit" value={x} onClick={this.Delete}>Delete</button>
                        </div>)
             });
        }
        return (
            <div>
                <div className="account-body">
                    <h3>{this.state.users.username} Account</h3>
                     <div className="note-card">
                        {items && getItems()}
                     </div>
                </div>
            </div>
        );
    }
}
export default Welcome;