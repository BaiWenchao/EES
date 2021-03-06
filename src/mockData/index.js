// 超级管理员列表信息
export const userInfo = [
  { id: 1, account: '223', password: '12345', sex: '男', age: '133', staffNumber: '444', type: '工作人员', state: '正常' },
  { id: 2, account: '233', password: '12345', sex: '女', age: '13', staffNumber: '484', type: '超级管理员', state: '停用' },
  { id: 2, account: '233', password: '12345', sex: '男', age: '13', staffNumber: '484', type: '专家', state: '正常' },
  { id: 2, account: '233', password: '12345', sex: '女', age: '13', staffNumber: '484', type: '工作人员', state: '正常' },
  { id: 2, account: '233', password: '12345', sex: '女', age: '13', staffNumber: '484', type: '工作人员', state: '正常' },
  { id: 2, account: '233', password: '12345', sex: '男', age: '13', staffNumber: '484', type: '专家', state: '停用' },
  { id: 2, account: '233', password: '12345', sex: '女', age: '13', staffNumber: '484', type: '工作人员', state: '停用' },
  { id: 2, account: '233', password: '12345', sex: '男', age: '13', staffNumber: '484', type: '工作人员', state: '正常' },
  { id: 2, account: '233', password: '12345', sex: '女', age: '13', staffNumber: '484', type: '指挥人员', state: '正常' }

]
// 管理人员接报信息
export const reportInfo = [
  {
    id: '001',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gg',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '通过'
  },
  {
    id: '002',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'rr',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '待审批'
  },
  {
    id: '003',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gd',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '通过'
  },
  {
    id: '004',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gd',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '待审批'
  },
  {
    id: '001',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gd',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '驳回'
  },
  {
    id: '001',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gd',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '驳回'
  },
  {
    id: '001',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gd',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '通过'
  },
  {
    id: '001',
    eventName: '火灾',
    number: '001',
    processNumber: '001',
    callerName: '刘德华',
    callerTelephone: '234567890',
    callTime: '2021/5/11',
    processCreater: 'gd',
    processCreateTime: '2021/5/11',
    updaterNumber: '001',
    updateTime: '2021/5/11',
    state: '驳回'
  }
]
// 管理人员物资信息
export const materialInfo = [
  {
    id: '27',
    name: '矿泉水',
    amount: '50',
    type: '生命救助',
    counter: 'Apple',
    counterTelephone: '110810992',
    number: '2343',
    countTime: '2021.7.8',
    nearest: '东北大学浑南校区'
  },
  {
    id: '34',
    name: '面包',
    amount: '50',
    type: '生命救助',
    counter: 'Apple',
    counterTelephone: '110810992',
    number: '2343',
    countTime: '2021.7.8',
    nearest: '东北大学浑南校区'
  },
  {
    id: '66',
    name: '压缩饼干',
    amount: '50',
    type: '生命救助',
    counter: 'Apple',
    counterTelephone: '110810992',
    number: '2343',
    countTime: '2021.7.8',
    nearest: '东北大学浑南校区'
  }
]

// 工作人员流程维护信息
export const processMaintainInfo = [
  {
    id: '001',
    processName: '流程一',
    type: '事故灾害一级',
    typeNumber: '10',
    content: '塌方'
  },
  {
    id: '002',
    processName: '流程二',
    type: '自然灾害二级',
    typeNumber: '81',
    content: '泥石流'
  },
  {
    id: '003',
    processName: '流程一',
    type: '自然灾害一级',
    typeNumber: '002',
    content: '地震'
  },
  {
    id: '004',
    processName: '流程五',
    type: '水污染二级',
    typeNumber: '708',
    content: '外来物种入侵'
  },
  {
    id: '005',
    processName: '流程三',
    type: '事故灾害三级',
    typeNumber: '112',
    content: '交通事故'
  }
]

// 风险企业信息
export const enterpriseMaintainInfo = [
  {
    id: '8',
    enterpriseName: '腾讯',
    enterpriseLocation: '深圳',
    corporate: '马化腾',
    corporateTelephone: '110',
    enterpriseType: '互联网'
  },
  {
    id: '4',
    enterpriseName: '老干妈',
    enterpriseLocation: '中国',
    corporate: '马云',
    corporateTelephone: '110',
    enterpriseType: '食品'
  },
  {
    id: '9',
    enterpriseName: '百度',
    enterpriseLocation: '北京',
    corporate: '老李',
    corporateTelephone: '113',
    enterpriseType: '互联网'
  },
  {
    id: '8',
    enterpriseName: '腾讯',
    enterpriseLocation: '深圳',
    corporate: '马化腾',
    corporateTelephone: '110',
    enterpriseType: '互联网'
  }
]

// 物资点信息维护
export const materialLocationInfo = [
  {
    id: '001',
    locationName: '东北大学',
    locationDirector: '笑死',
    address: '浑南区'
  },
  {
    id: '002',
    locationName: '东北大学',
    locationDirector: '笑死',
    address: '浑南区'
  },
  {
    id: '003',
    locationName: '东北大学',
    locationDirector: '笑死',
    address: '浑南区'
  },
  {
    id: '004',
    locationName: '东北大学',
    locationDirector: '笑死',
    address: '浑南区'
  }
]

// 物资信息
export const materialMaintainInfo = [
  {
    id: '1',
    materialName: '签字笔',
    materialAmount: '90',
    materialType: '器材工具',
    materialCounter: '小苏',
    counterTelephone: '123',
    materialNumber: '234',
    date: '2021/9/1'
  },
  {
    id: '2',
    materialName: '签字笔',
    materialAmount: '90',
    materialType: '器材工具',
    materialCounter: '小苏',
    counterTelephone: '123',
    materialNumber: '234',
    date: '2021/9/1'
  },
  {
    id: '3',
    materialName: '签字笔',
    materialAmount: '90',
    materialType: '器材工具',
    materialCounter: '小苏',
    counterTelephone: '123',
    materialNumber: '234',
    date: '2021/9/1'
  },
  {
    id: '4',
    materialName: '签字笔',
    materialAmount: '90',
    materialType: '器材工具',
    materialCounter: '小苏',
    counterTelephone: '123',
    materialNumber: '234',
    date: '2021/9/1'
  }
]

// 事件维护信息
export const eventMaintainInfo = {
  naturalDisaster: [
    {
      id: '1',
      disasterName: '洪涝灾害',
      disasterLevel: '2',
      remarks: '处理及时，未造成伤亡'
    },
    {
      id: '2',
      disasterName: '地震',
      disasterLevel: '1',
      remarks: '根本没办法'
    }
  ],
  humanDisaster: [
    {
      id: '1',
      disasterName: '高速追尾',
      disasterLevel: '2',
      remarks: '处理及时，未造成伤亡'
    },
    {
      id: '2',
      disasterName: '溺水',
      disasterLevel: '1',
      remarks: '处理及时，未造成伤亡'
    },
    {
      id: '2',
      disasterName: '建筑火灾',
      disasterLevel: '1',
      remarks: '处理及时，未造成伤亡'
    }
  ]
}

// 城市信息
export const cityMaintainInfo = [
  {
    id: '1',
    cityName: '沈阳',
    cityNumber: '23',
    province: '辽宁',
    people: '1000',
    vehicle: '200'
  },
  {
    id: '2',
    cityName: '纽约',
    cityNumber: '23',
    province: '辽宁',
    people: '1000',
    vehicle: '200'
  }
]

// 交通信息
export const transportInfo = [
  {
    id: '1',
    routeName: '安全一号通道',
    routeStart: '浑南',
    routeEnd: '和平',
    length: '20km'
  },
  {
    id: '2',
    routeName: '安全2号通道',
    routeStart: '浑南',
    routeEnd: '和平',
    length: '20km'
  },
  {
    id: '3',
    routeName: '安全3号通道',
    routeStart: '浑南',
    routeEnd: '和平',
    length: '20km'
  }
]
