const initState = {
    user: {}
}

const authReducer = (state=initState, action) => {
    switch(action.type){
        case "USER_CREATE_SUCCESS":
            console.log("User created")
            return state
        case "USER_CREATE_ERROR":
            console.log("User not created. ")
            return state
        case "USER_LOGIN_SUCCESS":
            console.log("User logged")
            return state
        case "USER_LOGIN_ERROR":
            console.log("User not logged. " + action.err.message)
            return state
        case "USER_SIGNOUT_SUCCES":
            console.log("User logged out")
            return state
        case "USER_SIGNOUT_ERROR":
            console.log("User not logged out " + action.err.message)
            return state
        default:
            return state
    }
} 

export default authReducer