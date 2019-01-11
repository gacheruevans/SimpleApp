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
        let getItems = () => {
            const items= this.state.users.noteItems;
            return Object.values(items).map((x,val) => {
                console.log("values extracted >>>>>", Object.values(x).slice(3,-2));
               return( 
                <div key={x} className="list-items">
                    <div className="note-body">
                        <div className="note-title">
                            <div>{Object.values(x).slice(1,-4)}</div>
                        </div>
                        <div className="note-row">
                            <div>{Object.values(x).slice(2,-3)}</div>
                        </div>
                        <div className="note-row">
                            <button type="submit" value={x} className="editBtn">Edit</button>
                            <button type="submit" value={x} className="deleteBtn" onClick={this.Delete}>Delete</button>
                        </div>
                    </div>
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