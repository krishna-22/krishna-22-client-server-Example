

export const Login_r=(state = {logged_in:false},action)=>{
    switch(action.type)
    {
        case 'log': 
            const status = state.logged_in
            return {...state,logged_in:!status}
        default:
            return state
    }
}