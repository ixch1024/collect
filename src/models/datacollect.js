import { queryDeviceData, removeDevice, addDevice,queryDeviceTypes,queryProtocol} from '../services/api';

export default {
  namespace: 'datacollect',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    types: [],
    protocols:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDeviceData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDevice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDevice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },

    *fetchTypes(_, { call, put }) {
      const response = yield call(queryDeviceTypes);
      yield put({
        type: 'getTypes',
        payload: response,
      });
    },

    *fetchProtocols(_, { call, put }) {
      const response = yield call(queryProtocol);
      yield put({
        type: 'getProtocols',
        payload: response,
      });

    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    getTypes(state, action) {
      return {
        ...state,
        types: action.payload,
      };
    },

    getProtocols(state, action) {
      return {
        ...state,
        protocols: action.payload,
      };
    },

  },
};
