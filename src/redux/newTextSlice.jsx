import { createSlice } from '@reduxjs/toolkit'

export const newTextSlice = createSlice({
  name: 'newText',
  initialState: {
    value: "",
  },
  reducers: {
    setNewText: (state, action) => {
        state.value = action.payload
    },
  },
})

export const { setNewText } = newTextSlice.actions

export default newTextSlice.reducer