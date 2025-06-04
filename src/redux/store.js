import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./destinationSlice";
import userReducer from "./userSlice";
import stepperFormReducer from './formDataSlice';

const store = configureStore({
    reducer: {
      destinations: destinationReducer,
      user: userReducer,
      stepperFormData: stepperFormReducer
    }
  });
  
  export default store;
