import React from 'react';

class SigninBox extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <Grid />
            </div>
        );
    }
}

class NavBar extends React.Component {
   render() {
       return (
           <nav className="navbar navbar-default">
               <div className="container-fluid">
                   <div className="navbar-header">
                       <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                           <span className="sr-only">Toggle navigation</span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                       </button>
                       <a className="navbar-brand" href="#">Sign In</a>
                   </div>

                   <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                       <ul className="nav navbar-nav">
                           <li className="active"><a href="#">Kids<span className="sr-only">(current)</span></a></li>
                           <li><a href="#">Report</a></li>
                       </ul>
                       <ul className="nav navbar-nav navbar-right">
                           <li className="dropdown">
                               <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">User<span className="caret"></span></a>
                               <ul className="dropdown-menu" role="menu">
                                   <li><a href="/logout">Logout</a></li>
                                   <li><a href="/account">Account</a></li>
                               </ul>
                           </li>
                       </ul>
                   </div>
               </div>
           </nav>
        );
   }
}

class Grid extends React.Component {
    render() {
        return (
            <div>
                <div>
                    I am a grid
                    <GridRow />
                </div>
            </div>
        );
    }
}

class GridRow extends React.Component {
    render() {
        return (
            <div>I am a grid Row</div>
        );
    }
}

React.render(<SigninBox />, document.getElementById('content'));
