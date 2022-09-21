import { configureStore } from "@reduxjs/toolkit";

// import todosReducer from "./features/todos/todosSlice";
// import filtersReducer from "./features/filters/filtersSlice";

import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
