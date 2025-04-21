import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./destinationSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
      destinations: destinationReducer,
      user: userReducer // Add more reducers if needed
    }
  });
  
  export default store;
