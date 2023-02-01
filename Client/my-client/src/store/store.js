import { configureStore } from "@reduxjs/toolkit";
import userDetailsSclice from "../state/state";

const useAuthStore = configureStore({
  reducer: { userDetailsSclice },
});

export default useAuthStore;
