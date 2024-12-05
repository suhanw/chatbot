import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

// interface IState {
//   data: {
//     auth: IResponseUser;
//     conversations: { id: string; title: string; createdAt: Date }[];
//     currentConversation: {
//       id: string;
//       title: string;
//       createdAt: Date;
//       messages: {
//         role: "user" | "assistant";
//         content: string;
//       }[];
//     } | null;
//   };
//   ui: {
//     isSideBarOpen: boolean;
//   };
// }

const dataReducer = combineReducers({
  auth: authReducer,
});

const uiReducer = combineReducers({
  isSideBarOpen: (state = false, action: any) => state,
});

export const store = configureStore({
  reducer: {
    data: dataReducer,
    ui: uiReducer,
  },
});
