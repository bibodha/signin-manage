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
                                    <label htmlFor="add-firstName">First Name</label>
                                    <input type="text" className="form-control" id="add-firstName" placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-lastName">Last Name</label>
                                    <input type="text" className="form-control" id="add-lastName" placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-street">Street</label>
                                    <input type="text" className="form-control" id="add-street" placeholder="Street"/>
                                </div>
                                <div className="form-group form-inline">
                                    <label htmlFor="add-city">City</label>&nbsp;
                                    <input type="text" className="form-control" id="add-city" size="30" placeholder="City"/>&nbsp;&nbsp;
                                    <label htmlFor="add-state">State</label>&nbsp;
                                    <input type="text" className="form-control" maxLength="2" size="3" id="add-state" />&nbsp;&nbsp;
                                    <label htmlFor="add-zip">Zip</label>&nbsp;
                                    <input type="text" className="form-control" id="add-zip" maxLength="5" size="5" placeholder="Zip"/>&nbsp;
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-dateOfBirth">Date Of Birth</label>
                                    <input type="text" className="form-control" id="add-dateOfBirth" placeholder="Date Of Birth"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-gender">Gender</label>
                                    <select id="add-gender" className="form-control">
                                        <option>--</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add-school">School</label>
                                    <input type="text" className="form-control" id="add-school" placeholder="School"/>
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
        $('#editModal').on('show.bs.modal', event => {
            let button = $(event.relatedTarget),
                id = button.data('id');

            $('#edit-id').html(id);
            $('#edit-id').val(id);
        });
        return (
            <div className="modal fade" id="editModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 className="modal-title">Edit Child</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input type="hidden" id="edit-id" />
                                <div className="form-group">
                                    <label htmlFor="edit-firstName">First Name</label>
                                    <input type="text" className="form-control" id="edit-firstName" placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-lastName">Last Name</label>
                                    <input type="text" className="form-control" id="edit-lastName" placeholder="Last Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-street">Street</label>
                                    <input type="text" className="form-control" id="edit-street" placeholder="Street" />
                                </div>
                                <div className="form-group form-inline">
                                    <label htmlFor="edit-city">City</label>&nbsp;
                                    <input type="text" className="form-control" id="edit-city" size="30" placeholder="City" />&nbsp;&nbsp;
                                    <label htmlFor="edit-state">State</label>&nbsp;
                                    <input type="text" className="form-control" maxLength="2" size="3" id="editState" />&nbsp;&nbsp;
                                    <label htmlFor="edit-zip">Zip</label>&nbsp;
                                    <input type="text" className="form-control" id="edit-zip" maxLength="5" size="5" placeholder="Zip" />&nbsp;
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-dateOfBirth">Date Of Birth</label>
                                    <input type="text" className="form-control" id="edit-dateOfBirth" placeholder="Date Of Birth" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-gender">Gender</label>
                                    <select id="edit-gender" className="form-control" >
                                        <option>--</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-school">School</label>
                                    <input type="text" className="form-control" id="edit-school" placeholder="School" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.props.clearForm} className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.props.edit} className="btn btn-primary">Save changes</button>
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

