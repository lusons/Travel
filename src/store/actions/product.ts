export const createProductAction = (value)=> {
    return {type: 'get', payLoad: value}
}

export const createAsyncProductAction = ()=> {
    return {type: 'reqProduct'}
}