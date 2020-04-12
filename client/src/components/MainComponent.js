import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {fetch} from 'cross-fetch'
import { Switch, Route, Redirect,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { addcomment } from '../redux/ActionCreators';
import { addnumber } from '../redux/ActionCreators';
const mapStateToProps = store => {
  return {
    Numbers:store.numbers,
    Comments:store.comments,
  }
};

const mapDispatchToProps = dispatch => ({
  
  AddComment: (name,comment) => dispatch(addcomment(name,comment)),
  AddNumber: (name,number) => dispatch(addnumber(name,number)),
  
});


class Main extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      Data:'',
      ErrorMessage:''
    }
    this.handle=this.handle.bind(this)
  }
  componentDidMount()
  {
       const BaseUrl ='http://localhost:3001/';
       fetch(BaseUrl+'roll')
       .then((response)=>{
          if (response.ok)
          return response
          else
          {
            var error = new Error(response.status)
            error.response=response
            throw error
          }
       },(error)=>{
         var err = new Error(error.message)
         throw err
       })
       .then((response)=>{return response.json()})
       .then(data=>{
        this.setState({
          ErrorMessage:null,
          Data:data
        })
       })
       .catch(error=>{
         this.setState({
           ErrorMessage:error.message,
           Data:''
         })
       })
      }
       

   
  handle()
  {
    this.props.AddComment('krishna','testing it');
    this.props.AddNumber('krishna','1234567890');
  
  }
   render()
   {
    
     var num=[]
     for(let i=0;i<this.props.Numbers.length;i++)
     num.push(<div className='col-12'> {this.props.Numbers[i].name}: {this.props.Numbers[i].number}</div>)
     var com=[]
     for(let i=0;i<this.props.Comments.length;i++)
     com.push(<div className='col-12'> {this.props.Comments[i].name}: {this.props.Comments[i].comment}</div>)
      return(
      <>
    
         <div className ='container'>
         <div className='row'>
             {}
           </div><br/>
           <div className='row'>
             {num}
           </div><br/>
           <div className='row'>
             {com}
           </div>
           <div className='row'>
            krishna : {this.state.Data['krishna']}<br/>
            saikiran: {this.state.Data['saikiran']}<br/>
            bindu   : {this.state.Data['bindu']}<br/>
           </div>
         </div>
         <br/>
        <button onClick={this.handle}>Iam will change store</button>
        <Link to='/about'>About Us</Link>
    </>);
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));