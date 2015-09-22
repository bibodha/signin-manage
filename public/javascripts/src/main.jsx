import React from 'react';
import NavBar from './components/navbar.jsx';
import {AddModal} from './components/modals.jsx';
import Signin from './signin.js';

class GridBox extends React.Component {
    constructor() {
        super();
        let signin = new Signin();
        this.state = {data: signin.getKids()}
    }

    componentDidMount() {
        $.ajax({
            url: '/kids/',
            dataType: 'json',
            type: 'GET',
            success: data => {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: (xhr, status, err) => {
                console.error('/kids/', status, err.toString());
            }.bind(this)
        })
    }

    render() {
        return (
            <div>
                <NavBar />
                <button className="btn btn-primary" data-toggle="modal" data-target="#addModal">Add</button>
                <AddModal />
                <GridList kids={this.state.data}/>
            </div>
        );
    }
}

class GridList extends React.Component {
    render() {
        let items = this.props.kids.map(item => {
            return (
                <GridItem edit={this.props.edit} delete={this.props.delete} data={this.props.kids} />
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
        <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>Mark Otto</td>
            <td>123 Some Street</td>
            <td>Salt Lake City</td>
            <td>UT</td>
            <td>84111</td>
            <td>Male</td>
            <td>East High School</td>
            <td>
                <span className="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;
                <span className="glyphicon glyphicon-trash"></span>
            </td>
        </tr>
    }
}

React.render(<GridBox/>, document.getElementById('content'));
