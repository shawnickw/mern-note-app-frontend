import { createSlice } from '@reduxjs/toolkit'

export const updateTextSlice = createSlice({
  name: 'updateText',
  initialState: {
    value: "",
  },
  reducers: {
    setUpdateText: (state, action) => {
        state.value = action.payload
    },
  },
})

export const { setUpdateText } = updateTextSlice.actions

export default updateTextSlice.reducer