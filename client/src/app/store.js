import {configureStore} from '@reduxjs/toolkit';
import plannerReducer from '../features/plannerSlice.js'

export const store = configureStore(
    {
        reducer: {
            planner: plannerReducer
        }
    }
)

