

export const LogError_r=(state = {error:null},action)=>{
    switch(action.type)
    {
        case 'log': 
            return {...state,error:action.payload.Error}
        default:
            return state
    }
}