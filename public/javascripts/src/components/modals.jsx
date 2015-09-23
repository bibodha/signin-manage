import React from 'react';

export class AddModal extends React.Component {
    render() {
        return (
            <div className="modal fade" id="addModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Add Kid</h4>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">Street</label>
                                    <input type="text" className="form-control" id="street" placeholder="Street"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <input type="text" className="form-control" id="city" placeholder="City"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <input type="text" className="form-control" id="state" placeholder="State"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="Zip"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                                    <input type="text" className="form-control" id="dateOfBirth" placeholder="Date Of Birth"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" className="form-control" id="gender" placeholder="Gender"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="school">School</label>
                                    <input type="text" className="form-control" id="school" placeholder="School"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.props.addKid} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
