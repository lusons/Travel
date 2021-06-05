interface productState {
    productList: any[];
    loading: boolean;
}

const defaultState: productState = {
    loading: true,
    productList: []
}

export default function productReducer(preState=defaultState, {type, payLoad}) {    
    switch (type) {
        case 'get':
            return {loading: false, productList: payLoad}
    
        default:
            return preState
    }
}