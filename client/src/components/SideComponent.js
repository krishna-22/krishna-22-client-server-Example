import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
class Side extends Component {
    render()
    {
        return(
            <>
        <div className='container'>
            <h1>welcome to aboutus page</h1><br/>
            <Link to='/home'>Home</Link>
        </div>
        </> ) }
}
export default Side