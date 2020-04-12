import {fetch} from 'cross-fetch'
const baseUrl='http://localhost:3001/'
export const addcomment=(Name,Comment)=>
({
    type:'add_comment',
    payload:{
             name:Name,
             comment:Comment
    }
})

export const addnumber=(Name,Number)=>
({
    type:'add_number',
    payload:{
             name:Name,
             number:Number
    }
})
export const LogChange =()=>
({
    type:'log',
    payload:{

    }
})

export const  loginError=(error)=>
({
    type:'loginerror',
    payload:{
        Error:error
    }
})


export const loginUser = (creds) => (dispatch) => {
    // Thunk
    // We dispatch requestLogin to kickoff the call to the API
    console.log('in thunk')
    fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            console.log(response.token)
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(LogChange());
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => {console.log(error.message);
        dispatch(loginError(error.message))})
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(LogChange())
}
