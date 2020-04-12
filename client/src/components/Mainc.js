import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Main from './MainComponent'
import Side from './SideComponent'
import Header from './HeaderComponent'
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
class Mainc extends Component {
    render()
    {
        return(
            <>
            <Header/>
<Switch>
<Route path='/home' component={Main} />
<Route path='/about' component={Side} />
<Redirect to="/home" />
</Switch>
        </> ) }
}
export default Mainc