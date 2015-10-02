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
        this.getForm = this.getForm.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        Promise.resolve(this.getKids())
        .then(data => {
            this.setState({data: data});
        });
    }

    setForm(prefix, item) {
        let inputs = ['id', 'firstName', 'lastName', 'userName', 'street', 'city', 'state', 'zip', 'dateOfBirth', 'gender', 'school'];
        item = item || [];
        _.forEach(inputs, input => {
            if(input === 'id'){
                $('#' + prefix + '-id').val(item['_id']);
            }
            else if(input === 'gender') {
                if(!item){
                    $('#' + prefix + '-gender option:first').attr('selected','selected');
                }
                else {
                    $('#' + prefix + '-gender option:contains(' + item[input] + ')').attr('selected', true);
                }
            }
            else if(input === 'dateOfBirth'){
                $('#' + prefix + '-' + input).val(new Date(item[input]).toLocaleDateString());
            }
            else{
                $('#' + prefix + '-' + input).val(item[input]);
            }
        });
    }

    getForm(prefix){
        let inputs = ['id', 'firstName', 'lastName', 'userName', 'street', 'city', 'state', 'zip', 'dateOfBirth', 'gender', 'school'];

        let kid = {};

        inputs.forEach(input => {
            if(input === 'id'){
                kid['_id'] = $('#' + prefix + '-' + input).val();
            }
            kid[input] = $('#' + prefix + '-' + input).val();
        });

        return kid;
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
        this.setForm('edit', item);

        $('#editModal').modal('show');
    }

    editKid() {
        var kid = this.getForm('edit');
        $.ajax({
            url: '/kids/edit',
            dataType: 'json',
            data: kid,
            type: 'POST',
            success: () => {
                var newState = _.map(this.state.data, item => {
                    if(item._id === kid._id){
                        return kid;
                    }
                    else{
                        return item;
                    }
                });
                this.setState({data: newState});
            },
            error: (xhr, status, err) => {
                console.error('/kids/edit', status, err.toString());
            }
        });
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

        let kid = this.getForm('add');
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
                this.setForm('add');
            }.bind(this),
            error: (xhr, status, err) => {
                console.error('/kids/add', status, err.toString());
            }.bind(this)
        });
    }

    render(){
        return(
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
                <GridList kids={this.state.data} edit={this.edit} editKid={this.editKid} delete={this.deleteKid.bind(this)}/>
            </div>
        );
    }
}

class GridList extends React.Component {
    render() {
        let items = this.props.kids.map(kid=> {
            return (
                <GridItem edit={this.props.edit} editKid={this.props.editKid} data={kid} key={kid._id} />
            );
        });
        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Date Of Birth</th>
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
        var fullName = this.props.data.firstName + ' ' + this.props.data.lastName;
        return(
            <tr>
                <td>{this.props.data.firstName}</td>
                <td>{this.props.data.lastName}</td>
                <td>{this.props.data.userName}</td>
                <td>{new Date(this.props.data.dateOfBirth).toLocaleDateString()}</td>
                <td>{this.props.data.street}</td>
                <td>{this.props.data.city}</td>
                <td>{this.props.data.state.toUpperCase()}</td>
                <td>{this.props.data.zip}</td>
                <td>{this.props.data.gender}</td>
                <td>{this.props.data.school}</td>
                <td>
                    <span id="editIcon" className="glyphicon glyphicon-edit" data-id={this.props.data._id} edit={this.props.editKid.bind(this)} onClick={this.props.edit.bind(this, this.props.data)}></span>&nbsp;&nbsp;
                    <span id="deleteIcon" className="glyphicon glyphicon-trash" data-id={this.props.data._id} data-name={fullName} data-toggle="modal" data-target="#deleteConfirmModal"></span>
                </td>
            </tr>
        );
    }
}

React.render(<GridBox/>, document.getElementById('content'));
