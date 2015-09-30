import React from 'react';
import NavBar from './components/navbar.jsx';
import {AddModal, DeleteConfirmModal, EditModal} from './components/modals.jsx';
import Search from './components/search.jsx';
import _ from 'lodash';

class GridBox extends React.Component {
    constructor() {
        super();
        this.state = {data: []}
        this.addKid = this.addKid.bind(this);
        this.deleteKid = this.deleteKid.bind(this);
        this.editKid = this.editKid.bind(this);
        this.setForm = this.setForm.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        Promise.resolve(this.getKids())
        .then(data => {
            this.setState({data: data});
        });
    }

    setForm(prefix, item) {
        let inputs = ['FirstName', 'LastName', 'Street', 'City', 'State', 'Zip', 'DateOfBirth', 'Gender', 'School'];
        item = item || [];
        _.forEach(inputs, input => {
            if(input === 'Gender') {
                if(!item.length){
                    $('#' + prefix + 'Gender option:first').attr('selected','selected');
                }
            }
            else{
                $('#' + prefix + input).val(item[input]);
            }
        });
    }


    deleteKid(event){
        let id = $(event.currentTarget).data('id');
        $.ajax({
            url: '/kids/delete',
            dataType: 'json',
            type: 'POST',
            data: {id: id},
            success: data => {
                let state = this.state.data;
                _.remove(state, item => {
                    return item._id == id;
                });
                this.setState({data: state});
            },
            error: (xhr, status, err) => {
                var status = '/kids/delete ' + status + err.toString();
                console.error(status);
            }
        });
    }

    edit(item) {
        setForm('edit', item);

        $('#editModal').modal('show');
    }

    editKid() {
        
    }

    getKids(done) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/kids/',
                dataType: 'json',
                type: 'GET',
                success: data => {
                    resolve(data);
                },
                error: (xhr, status, err) => {
                    reject('/kids/', status, err.toString());
                }
            });
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
                setForm('add');
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
                <AddModal addKid={this.addKid} clearForm={this.setForm.bind(this, 'add', '')}/>
                <DeleteConfirmModal delete={this.deleteKid.bind(this)}/>
                <EditModal edit={this.editKid.bind(this)}/>
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
                <GridList kids={this.state.data} edit={this.edit} delete={this.deleteKid.bind(this)}/>
            </div>
        );
    }
}

class GridList extends React.Component {
    render() {
        let items = this.props.kids.map(kid=> {
            return (
                <GridItem edit={this.props.edit} data={kid} key={kid._id} />
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
        var fullName = this.props.data.firstname + ' ' + this.props.data.lastname;
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
                    <span id="editIcon" className="glyphicon glyphicon-edit" onClick={this.props.edit.bind(this, this.props.data)}></span>&nbsp;&nbsp;
                    <span id="deleteIcon" className="glyphicon glyphicon-trash" data-id={this.props.data._id} data-name={fullName} data-toggle="modal" data-target="#deleteConfirmModal"></span>
                </td>
            </tr>
        );
    }
}

React.render(<GridBox/>, document.getElementById('content'));
