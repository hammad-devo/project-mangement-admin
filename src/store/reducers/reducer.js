const initialState = {
    name:'',
    email:'',
    password:'',
    confirm_password:'',
}
const initialLogin={
    email:'',
    password:'',
}
export const reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_FORMS':
            return {
              ...state,
              [action.payload.name]: action.payload.value
            }
            default:
                return state
    }
}
export const reducer2=(state=initialLogin,action)=>{
    switch(action.type){
        case 'SET_FORMS':
            return {
             ...state,
              [action.payload.name]: action.payload.value
            }
            default:
                return state
        }
}