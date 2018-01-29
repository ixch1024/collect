import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
  //return request('/api/citys');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


export async function queryPlayers() {
  return request('/api/players');
}

export async function queryDeviceTypes() {
  //return request('pfpcode/loadItem?codeSortId=1000000110000010');
  return request('/api/queryDeviceTypes');
}

export async function queryProtocol() {;
  return request('/api/queryProtocol');
}

export async function queryDeviceData(params) {
  //return request(`/task/eqp/queryPeqpTerminal?${stringify(params)}`);
  return request(`/api/queryDeviceData?${stringify(params)}`);
}

export async function removeDevice(params) {
  return request('/api/queryDeviceData', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDevice(params) {
  return request('/api/queryDeviceData', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}