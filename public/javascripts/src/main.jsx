import React from 'react';
import NavBar from './components/navbar.jsx';
import {AddModal} from './components/modals.jsx';
import Signin from './signin.js';

class GridBox extends React.Component {
    constructor() {
        super();
        this.state = {data: []}
    }

    componentDidMount() {
        let signin = new Signin();
        signin.getKids();
    }

    addKid() {
        let signin = new Signin();
        let kids = signin.addKid();
        if(kids.length !== 0) {
            this.setState({data : kids});
            $('#addModal').modal('hide');
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <button className="btn btn-primary" data-toggle="modal" data-target="#addModal">Add</button>
                <AddModal addKid={this.addKid}/>
                <GridList kids={this.state.data}/>
            </div>
        );
    }
}

class GridList extends React.Component {
    render() {
        let items = this.props.kids.map(kid=> {
            return (
                <GridItem edit={this.props.edit} delete={this.props.delete} data={this.props.kid} />
            );
        });
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Gender</th>
                        <th>School</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <div className="itemList">
                        {items}
                    </div>
                </tbody>
            </table>
        );
    }
}

class GridItem extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.data.firstName}</td>
                <td>{this.props.data.lastName}</td>
                <td>{this.props.data.userName}</td>
                <td>{this.props.data.streetName}</td>
                <td>{this.props.data.city}</td>
                <td>{this.props.data.state}</td>
                <td>{this.props.data.zip}</td>
                <td>{this.props.data.gender}</td>
                <td>{this.props.data.school}</td>
                <td>
                    <span className="glyphicon glyphicon-edit" onClick={this.props.edit}></span>&nbsp;&nbsp;
                    <span className="glyphicon glyphicon-trash" onClick={this.props.delete}></span>
                </td>
            </tr>
        );
    }
}

React.render(<GridBox/>, document.getElementById('content'));
