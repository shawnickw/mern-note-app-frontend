import { configureStore } from '@reduxjs/toolkit'
import newTextReducer from './newTextSlice'
import updateTextReducer from './updateTextSlice'

export default configureStore({
  reducer: {
    newText: newTextReducer,
    updateText: updateTextReducer,
  },
})