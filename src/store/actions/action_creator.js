export const setForms=(object)=>{
    return (dispatch)=>{
        dispatch({
            type:"SET_FORMS",
            payload:{...object}
        })
    }
}