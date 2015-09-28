import React from 'react';

export class AddModal extends React.Component {
    render() {
        return (
            <div className="modal fade" id="addModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 className="modal-title">Add Child</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="addFirstName">First Name</label>
                                    <input type="text" className="form-control" id="addFirstName" placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addLastName">Last Name</label>
                                    <input type="text" className="form-control" id="addLastName" placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addStreet">Street</label>
                                    <input type="text" className="form-control" id="addStreet" placeholder="Street"/>
                                </div>
                                <div className="form-group form-inline">
                                    <label htmlFor="addCity">City</label>&nbsp;
                                    <input type="text" className="form-control" id="addCity" size="30" placeholder="City"/>&nbsp;&nbsp;
                                    <label htmlFor="addState">State</label>&nbsp;
                                    <input type="text" className="form-control" maxLength="2" size="3" id="addState" />&nbsp;&nbsp;
                                    <label htmlFor="addZip">Zip</label>&nbsp;
                                    <input type="text" className="form-control" id="addZip" maxLength="5" size="5" placeholder="Zip"/>&nbsp;
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addDateOfBirth">Date Of Birth</label>
                                    <input type="text" className="form-control" id="addDateOfBirth" placeholder="Date Of Birth"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addGender">Gender</label>
                                    <select id="addGender" className="form-control">
                                        <option>--</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addSchool">School</label>
                                    <input type="text" className="form-control" id="addSchool" placeholder="School"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.props.clearForm} className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.props.addKid} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class EditModal extends React.Component {
    render() {
        return (
            <div className="modal fade" id="editModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 className="modal-title">Edit Child</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input type="hidden" id="editId" />
                                <div className="form-group">
                                    <label htmlFor="editFirstName">First Name</label>
                                    <input type="text" className="form-control" id="editFirstName" placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editLastName">Last Name</label>
                                    <input type="text" className="form-control" id="editLastName" placeholder="Last Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editStreet">Street</label>
                                    <input type="text" className="form-control" id="editStreet" placeholder="Street" />
                                </div>
                                <div className="form-group form-inline">
                                    <label htmlFor="editCity">City</label>&nbsp;
                                    <input type="text" className="form-control" id="editCity" size="30" placeholder="City" />&nbsp;&nbsp;
                                    <label htmlFor="editState">State</label>&nbsp;
                                    <input type="text" className="form-control" maxLength="2" size="3" id="editState" />&nbsp;&nbsp;
                                    <label htmlFor="editZip">Zip</label>&nbsp;
                                    <input type="text" className="form-control" id="editZip" maxLength="5" size="5" placeholder="Zip" />&nbsp;
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editDateOfBirth">Date Of Birth</label>
                                    <input type="text" className="form-control" id="editDateOfBirth" placeholder="Date Of Birth" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editGender">Gender</label>
                                    <select id="editGender" className="form-control" >
                                        <option>--</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editSchool">School</label>
                                    <input type="text" className="form-control" id="editSchool" placeholder="School" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.props.clearForm} className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.props.editKid} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class DeleteConfirmModal extends React.Component {
    render() {
        $('#deleteConfirmModal').on('show.bs.modal', event => {
            let button = $(event.relatedTarget),
                fullName = button.data('name'),
                id = button.data('id');

            $('#fullName').html(fullName);
            $('#confirmDeleteButton').attr('data-id', id);
        });

        return(
            <div id="deleteConfirmModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Confirm Delete</h4>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete <span id="fullName"></span>?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" id="confirmDeleteButton" className="btn btn-danger" data-dismiss="modal" onClick={this.props.delete.bind(this)}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

