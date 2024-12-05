import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserSuccess } from "../auth";
import {
  getConversationByIdApi,
  getConversationsApi,
} from "../../api/conversations";

interface IConversationsState {
  list: { _id: string; title: string; updatedAt: Date }[];
  currentConversation: {
    _id: string;
    title: string;
    messages: { role: "user" | "assistant"; content: string }[];
  } | null;
}

const initialState: IConversationsState = {
  list: [],
  currentConversation: null,
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    getConversationsSuccess: (state, action) => {
      state.list = action.payload;
    },
    clearConversations: (state) => {
      state.list = [];
    },
    setCurrentConversationId: (state, action) => {
      state.currentConversation = {
        _id: action.payload,
        title: "",
        messages: [],
      };
    },
    getCurrentConversationSuccess: (state, action) => {
      state.currentConversation = action.payload;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUserSuccess, (state, action) => {
      // clear conversations if current user is null
      if (!action.payload) {
        state.list = [];
        state.currentConversation = null;
      }
    });
  },
});

export const {
  getConversationsSuccess,
  clearConversations,
  getCurrentConversationSuccess,
  clearCurrentConversation,
  setCurrentConversationId,
} = conversationsSlice.actions;

export const conversationsReducer = conversationsSlice.reducer;

export const useGetConversationList = (isLoggedIn: boolean) => {
  const conversationList = useSelector(
    (state: any) => state.data.conversations.list
  );

  const dispatch = useDispatch();
  const [error, setError] = useState<any>(null);

  const getConversationList = async () => {
    try {
      const response = await getConversationsApi();
      dispatch(getConversationsSuccess(response.data));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getConversationList();
    }
  }, [isLoggedIn]);

  return { conversationList, getConversationList, error };
};

export const useSetCurrentConversationId = () => {
  const currentConversationId = useSelector(
    (state: any) => state.data.conversations.currentConversation?._id
  );
  const dispatch = useDispatch();
  return {
    currentConversationId,
    setCurrentConversationId: (conversationId: string) => {
      dispatch(setCurrentConversationId(conversationId));
    },
  };
};

export const useGetCurrentConversation = () => {
  const currentConversation = useSelector(
    (state: any) => state.data.conversations.currentConversation
  );

  const dispatch = useDispatch();
  const [error, setError] = useState<any>(null);

  const getCurrentConversation = async (conversationId: string) => {
    try {
      const response = await getConversationByIdApi(conversationId);
      dispatch(getCurrentConversationSuccess(response.data));
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (currentConversation?._id) {
      getCurrentConversation(currentConversation?._id);
    }
  }, [currentConversation?._id]);

  return { getCurrentConversation, currentConversation, error };
};
