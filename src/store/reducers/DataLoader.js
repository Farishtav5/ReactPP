export const DataLoader = (state={}, action) =>{
    let newState = {...state}
    switch(action.type ) {
        case 'LOAD_DATA':
            newState = {
                ...state,
                [Object.keys(action.payload.data)[0]]: action.payload.data[Object.keys(action.payload.data)[0]]
            }
            break;
        case 'UNSUBSCRIBE':
            clearInterval(state.unsubscribe)
            newState ={
                ...state,
                unsubscribe : undefined
            }
            break;
        default:
            newState = {}
    }
    return newState

}