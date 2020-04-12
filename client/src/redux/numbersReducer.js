export const Numbers_=
[
    {
        name:"saikiran",
        number:"7013751741"
    },
    {
        name:"bindu",
        number:"8765389809"
    }
]


export const Numbers_r=(state=Numbers_,action)=>{
    switch(action.type)
    {
        case 'add_number':
            var number=action.payload
            return state.concat(number)
        default:
            return state
    }
}