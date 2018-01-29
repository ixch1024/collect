import { queryProjectNotice } from '../services/api';
import { queryPlayers } from '../services/api';

export default {
  namespace: 'project',

  state: {
    notice: [],
  },

  effects: {
    *fetchNotice(_, { call, put }) {
      const response = yield call(queryPlayers);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
  },
};
