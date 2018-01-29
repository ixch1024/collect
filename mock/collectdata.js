import { getUrlParams } from './utils';
import { message } from 'antd';
// mock DeviceTypesDataSource

export const getTypes = (req, res) => {
  res.json([
    {
      no: '1',
      name: '照明控制终端',
    },
    {
      no: '2',
      name: '配变终端',
    },
    {
      no: '3',
      name: '实时终端',
    },
    {
      no: '4',
      name: '调试终端',
    },
  ]);
}

export const getProtocols = (req, res) => {
  res.json([
    {
      no: '1',
      name: 'GDW1376_2013',
    },
    {
      no: '2',
      name: 'IEC60870_5_104',
    },
  ]);
}


let DeviceDataSource = [];
let meter = [];

const types = ['照明控制终端', '配变终端', '实时终端', '调试终端'];
const protocols = ['GDW1376_2013', 'IEC60870_5_104'];

for (let i = 0; i < 55; i += 1) {
  DeviceDataSource.push({
    key:i,
    no: `No ${i}`,
    xzqh: '320106',
    zdmc: `内部测试集中器${i}`,
    zddz: i,
    sblx: types[Math.floor(Math.random() * 10) % 4],
    gnyt: '监控',
    gylx: protocols[Math.floor(Math.random() * 10) % 2],
    ipdz: '127.0.0.1',
    dk: '8001',
    hdms: Math.floor(Math.random() * 10) % 2,
    ywbm: '15000',
    scbm: '00A1931',
    zcbm: '11112222',
    cld: [{title:`${i}测量点 1`,key:`${i}c1`},{title:`${i}测量点 2`,key:`${i}c2`},{title:`${i}测量点 3`,key:`${i}c3`},{title:`${i}测量点 4`,key:`${i}c4`},{title:`${i}测量点 5`,key:`${i}c5`},],
  });
}

export function getDeviceData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...DeviceDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.hdms) {
    const hdms = params.hdms.split(',');
    let filterDataSource = [];
    hdms.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.hdms, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  if (params.sblx) {
    dataSource = dataSource.filter(data => data.sblx === params.sblx);
  }

  if (params.gylx) {
    dataSource = dataSource.filter(data => data.gylx === params.gylx);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postDevice(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, zdmc } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      DeviceDataSource = DeviceDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      DeviceDataSource.unshift({
        key:i,
        no: i,
        xzqh: '320106',
        zdmc,
        zddz: i,
        sblx: types[Math.floor(Math.random() * 10) % 4],
        gnyt: '监控',
        gylx: protocols[Math.floor(Math.random() * 10) % 2],
        ipdz: '127.0.0.1',
        dk: '8001',
        hdms: Math.floor(Math.random() * 10) % 2,
        ywbm: '15000',
        scbm: '00A1931',
        zcbm: '11112222',
      });
      break;
    default:
      break;
  }

  const result = {
    list: DeviceDataSource,
    pagination: {
      total: DeviceDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export default {
  getTypes,
  getDeviceData,
  postDevice,
};