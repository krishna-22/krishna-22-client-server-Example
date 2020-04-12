import React, { Component } from 'react';

import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import {loginUser } from '../redux/ActionCreators';
import { logoutUser} from '../redux/ActionCreators';
const mapStateToProps = store => {
    return {
      login:store.login,
    }
  };
const mapDispatchToProps = dispatch => ({
    LoginUser: (creds) => dispatch(loginUser(creds)),
  LogoutUser: () => dispatch(logoutUser()),
  });
  
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            story:'hi'
        
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.story = this.story.bind(this);
    }
 story(){
     console.log('in story call')
       const BaseUrl='http://localhost:3001/';
       const bearer = 'Bearer ' + localStorage.getItem('token');
    fetch(BaseUrl + 'story', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        //credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(data=>{this.setState({...this.state,
        story:data.text
    })})
    .catch(error => { console.log(error.message)});
        
 }

  
   
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.LoginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleLogout() {
        this.props.LogoutUser();
    }
   
    render() {
        
        return(
            
            <React.Fragment>
                <Navbar dark>
                    <div className="container">
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.login.logged_in?
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            
                                        </Button>
                                        :
                                        <div>
                                      
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            
                                        </Button>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                    </div>
                </Navbar><br/>
                {this.state.story}<br/>
                <Button onClick={this.story}>story</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));