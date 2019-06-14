import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContainer from '../containers/user';
import UserAuth from '../containers/auth';
import CustomerAuth from '../containers/authCustomer';
import CustomerContainer from '../containers/customer';
import Landing from '../components/Landing';
export class Routes extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/user/approve" component={UserContainer.List} />
          <Route
            exact
            path="/user/ticketsystem"
            component={UserContainer.Listticket}
          />
          <Route
            exact
            path="/user/ticketdetail"
            component={UserContainer.TicketDetail}
          />
          <Route
            exact
            path="/user/uploadticket"
            component={UserContainer.UploadTicket}
          />
          <Route exact path="/user/profile" component={UserContainer.Profile} />
          <Route exact path="/user/signin" component={UserAuth.Signin} />

          <Route exact path="/user/signup" component={UserAuth.Signup} />
          <Route
            exact
            path="/customer/signin"
            component={CustomerAuth.SigninCustomer}
          />

          <Route
            exact
            path="/customer/signup"
            component={CustomerAuth.SignupCustomer}
          />
          <Route
            exact
            path="/customer/ticket"
            component={CustomerContainer.Ticket}
          />
          <Route
            exact
            path="/customer/viewticket"
            component={CustomerContainer.Viewticket}
          />
          <Route
            exact
            path="/customer/ticketdetail"
            component={CustomerContainer.detailTicket}
          />
          <Route exact path="/" component={Landing} />
        </div>
      </Router>
    );
  }
}

export default Routes;
