export const defaultState  ={
    creds:[],
    user:null
}

export const reducer = (state=defaultState,action)=>{
    switch (action.type){      
        case "GET_DATA":
            return{
                ...state,
                creds:action.data
            }
        
        
        case "LOGIN":
            return{
                ...state,
                user:action.data
            }
        case "LOGOUT":
            return{
                ...state,
                user:null
            }
        default:
            return{
                ...state
            }
    }
}