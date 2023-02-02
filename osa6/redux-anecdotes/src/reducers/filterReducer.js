import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        // dispatch(setFilter('howdy'))
        setFilter(state, action) { // action.type = 'filter/setFilter', action.payload = 'howdy'
            return action.payload
        },
    }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer