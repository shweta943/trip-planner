import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./destinationSlice";

const store = configureStore({
    reducer: {
      destinations: destinationReducer, // Add more reducers if needed
    }
  });
  
  export default store;
