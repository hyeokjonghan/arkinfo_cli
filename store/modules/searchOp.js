import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    operatorList:[],
    searchOption:{
        page:1,
        rarity:[],
        name:'',
        profession:[]
    },
    lastSearchOption: {
        page:1,
        rarity:[],
        name:'',
        profession:[]
    }
}

const operatorSlice = createSlice({
    name: 'operatorList',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.searchOption.page = action.payload
        },
        setOperatorList: (state, action) => {
            state.operatorList = action.payload
        },
        setSearchOptionProfession: (state, action) => {
            state.searchOption.profession = action.payload
        },
        setSearchOptionName: (state, action) => {
            state.searchOption.name = action.payload
        },
        setSearchOptionRarity: (state, action) => {
            state.searchOption.rarity = action.payload
        },
        setClearSearchOption: (state) => {
            state.searchOption = {
                rarity:[],
                name:'',
                profession:[]
            }
        },
        setLastSearchOption: (state) => {
            state.lastSearchOption = state.searchOption
        }
    }
})

export const {setPage, setOperatorList, setClearSearchOption, setSearchOptionRarity, setSearchOptionProfession, setSearchOptionName, setLastSearchOption} = operatorSlice.actions
export default operatorSlice.reducer