import React from 'react';

export class AddModal extends React.Component {
    render() {
        return (
            <div className="modal fade" id="addModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Add Child</h4>
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
                                <div className="form-group form-inline">
                                    <label htmlFor="city">City</label>&nbsp;
                                    <input type="text" className="form-control" id="city" size="36" placeholder="City"/>&nbsp;&nbsp;
                                    <label htmlFor="state">State</label>&nbsp;
                                    <input type="text" className="form-control" maxLength="2" size="3" id="state" />&nbsp;&nbsp;
                                    <label htmlFor="zip">Zip</label>&nbsp;
                                    <input type="text" className="form-control" id="zip" maxLength="5" size="3" placeholder="Zip"/>&nbsp;
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                                    <input type="text" className="form-control" id="dateOfBirth" placeholder="Date Of Birth"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <select className="form-control">
                                        <option>--</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
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
