import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./destinationSlice";
import userReducer from "./userSlice";
import stepperFormReducer from './stepperFormSlice';

export const store = configureStore({
    reducer: {
      destinations: destinationReducer,
      user: userReducer,
      stepperFormData: stepperFormReducer
    }
  });
  
 // Infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
