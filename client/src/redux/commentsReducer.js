const Comments_=
[
    {
        name:"saikiran",
        comment:"movie is funny"
    },
    {
        name:"bindu",
        comment:"movie is lovely"
    }
]

export const Comments_r=(state = Comments_ ,action)=>{
    switch(action.type)
    {
        case 'add_comment':
            var comment=action.payload
            return state.concat(comment)
        default:
            return state
    }
}