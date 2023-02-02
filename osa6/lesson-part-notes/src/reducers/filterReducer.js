const filterReducer = (state = 'ALL', action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return state
    }
}

export const setFilter = (filterValue) => ({
  type: 'SET_FILTER',
  filter: filterValue,
})

export default filterReducer