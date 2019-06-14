import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Navbar from './components/navbar/index';
import Sidebar from './components/Sidebar';
import UserContainer from './containers/user';
import UserAuth from './containers/auth';
import CustomerAuth from './containers/authCustomer';
import CustomerContainer from './containers/customer';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const { Content } = Layout;

class App extends Component {
  state = {
    current: 'home',
  };

  logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
    this.props.history.push(`/`);
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  _renderNavbarCustomer = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const NAVBAR_MAPPING_ROLES = {
      customer: <Navbar.NavbarCustomer />,
      admin: <Navbar.NavbarUser />,
      superadmin: <Navbar.NavbarUser />,
      developer: <Navbar.NavbarUser />,
    };
    return NAVBAR_MAPPING_ROLES[role] || <Navbar.NavbarComponent />;
  };

  render() {
    return (
      <Router>
        <div className="App">
          {this._renderNavbarCustomer()}
          <Layout>
            <Sidebar />

            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                height: '100%',
              }}
            >
              <div className="container">
                <Route
                  exact
                  path="/user/approve"
                  component={UserContainer.List}
                />
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
                <Route
                  exact
                  path="/user/profile"
                  component={UserContainer.Profile}
                />
                <Route
                  exact
                  path="/user/problem"
                  component={UserContainer.subject}
                />
                  <Route
                  exact
                  path="/user/company"
                  component={UserContainer.Company}
                />
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
                <Route exact path="/" component={UserAuth.Signin} />
              </div>
            </Content>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
