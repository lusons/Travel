export const countReducer = (preState=0, action)=> {
    const { type, payLoad } = action
    switch (type) {
        case 'increment':
            return preState + payLoad
    
        default:
            return preState
    }
}