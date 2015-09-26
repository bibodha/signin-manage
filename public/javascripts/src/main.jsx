import React from 'react';
import NavBar from './components/navbar.jsx';
import {AddModal} from './components/modals.jsx';
import Search from './components/search.jsx';

class GridBox extends React.Component {
    constructor() {
        super();
        this.state = {data: []}
        this.addKid = this.addKid.bind(this);
    }

    componentDidMount() {
        var promise = new Promise((resolve, reject) => {
            this.getKids(data => {
                return resolve(data);
            });
        });
        promise.then(data => {
            this.setState({data: data});
        });
    }

    getKids(done) {
        $.ajax({
            url: '/kids/',
            dataType: 'json',
            type: 'GET',
            success: data => {
                return done(data);
            },
            error: (xhr, status, err) => {
                console.error('/kids/', status, err.toString());
            }
        });
    }

    addKid() {
        let kid = {
            firstName : $('#firstName').val(),
            lastName : $('#lastName').val(),
            street : $('#street').val(),
            city : $('#city').val(),
            state : $('#state').val(),
            zip : $('#zip').val(),
            dateOfBirth : $('#dateOfBirth').val(),
            gender: $('#gender').val(),
            school : $('#school').val()
        };

        $.ajax({
            url: '/kids/add',
            dataType: 'json',
                    type: 'POST',
            data: kid,
            success: data => {
                var oldState = this.state.data;
                oldState.push(data);
                this.setState({data: oldState});
                $('#addModal').modal('hide');
            }.bind(this),
            error: (xhr, status, err) => {
                console.error('/kids/add', status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <AddModal addKid={this.addKid}/>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <button id="addButton" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#addModal">Add</button>
                    </div>
                    <div className="col-md-8">
                        <Search />
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <GridList kids={this.state.data} edit={this.edit} delete={this.delete}/>
            </div>
        );
    }
}

class GridList extends React.Component {
    render() {
        let items = this.props.kids.map(kid=> {
            return (
                <GridItem edit={this.props.edit} delete={this.props.delete} data={kid} key={kid._id} />
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
                    {items}
                </tbody>
            </table>
        );
    }
}

class GridItem extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.data.firstname}</td>
                <td>{this.props.data.lastname}</td>
                <td>{this.props.data.username}</td>
                <td>{this.props.data.street}</td>
                <td>{this.props.data.city}</td>
                <td>{this.props.data.state}</td>
                <td>{this.props.data.zip}</td>
                <td>{this.props.data.gender}</td>
                <td>{this.props.data.school}</td>
                <td>
                    <span id="editIcon" className="glyphicon glyphicon-edit" onClick={this.props.edit}></span>&nbsp;&nbsp;
                    <span id="deleteIcon" className="glyphicon glyphicon-trash" onClick={this.props.delete}></span>
                </td>
            </tr>
        );
    }
}

React.render(<GridBox/>, document.getElementById('content'));
