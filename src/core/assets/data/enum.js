/**
 * 使用该文件条件：后端自定义枚举数据，通过API能获取数据Enum
 * 就使用该文件定义对应静态数据
 */
export const staticDataEnum = {
  validateStatus: [{
    code: 1,
    name: '已审核'
  },
  {
    code: 2,
    name: '未审核'
  }, {
    code: 3,
    name: '审核中'
  }],
  type: [{
    code: 1,
    name: '机构'
  },
  {
    code: 2,
    name: '部门'
  },
  {
    code: 3,
    name: '岗位'
  }],
  enable: [{
    code: 1,
    name: '启用'
  },
  {
    code: 2,
    name: '禁用'
  }],
  isOrNot: [{
    code: 1,
    name: '是'
  },
  {
    code: 2,
    name: '否'
  }],
  gender: [{
    code: '1',
    name: '男'
  },
  {
    code: '2',
    name: '女'
  }],
  readStatus: [{
    code: 1,
    name: '已阅读'
  },
  {
    code: 2,
    name: '未阅读'
  }],
  operate: [{
    code: 1,
    name: '自营'
  },
  {
    code: 2,
    name: '联营'
  }],
  itemStage: [{
    code: 1,
    name: '前期'
  },
  {
    code: 2,
    name: '中期'
  }, {
    code: 3,
    name: '后期'
  }, {
    code: 4,
    name: '结束'
  }],
  siginStatus: [{
    code: 1,
    name: '已签约'
  },
  {
    code: 2,
    name: '未签约'
  }],
  useEnterpriseType: [
    {
      code: 1,
      name: '内部机构'
    },
    {
      code: 2,
      name: '外部单位'
    }
  ],
  inPutType: [
    {
      code: 1,
      name: '直进直出'
    },
    {
      code: 2,
      name: '采购入库'
    },
    {
      code: 3,
      name: '其他入库'
    },
    {
      code: 8,
      name: '调拨入库'
    },
    {
      code: 12,
      name: '项目退货'
    }
  ],
  logType: [
    {
      code: 1,
      name: '登录'
    },
    {
      code: 2,
      name: '操作'
    },
    {
      code: 3,
      name: '注销'
    }
  ],
  videoType: [
    {
      code: 1,
      name: '枪机'
    },
    {
      code: 2,
      name: '球机'
    },
    {
      code: 3,
      name: '网络录像机'
    }
  ],
  bindStatus: [
    {
      code: 1,
      name: '已关联'
    },
    {
      code: 2,
      name: '已解绑'
    }
  ],
  contractType: [
    {
      code: 1,
      name: '实习合同'
    },
    {
      code: 2,
      name: '试用合同'
    },
    {
      code: 3,
      name: '正式合同'
    }
  ],
  jobStatusUser: [
    {
      code: 1,
      name: '实习'
    },
    {
      code: 2,
      name: '试用'
    },
    {
      code: 3,
      name: '正式'
    },
    {
      code: 4,
      name: '离职'
    }
  ],
  sex: [{
    code: '1',
    name: '男'
  },
  {
    code: '2',
    name: '女'
  }],
  maritalStatus: [
    {
      code: 1,
      name: '已婚'
    },
    {
      code: 2,
      name: '未婚'
    },
    {
      code: 3,
      name: '离异'
    }
  ],
  politicalAppearance: [
    {
      code: 1,
      name: '党员'
    },
    {
      code: 2,
      name: '群众'
    }
  ],
  education: [
    {
      code: 1,
      name: '博士'
    },
    {
      code: 2,
      name: '硕士'
    },
    {
      code: 3,
      name: '本科'
    },
    {
      code: 4,
      name: '专科'
    },
    {
      code: 5,
      name: '高中'
    },
    {
      code: 6,
      name: '小学'
    }
  ],
  status: [
    {
      code: 1,
      name: '存续'
    },
    {
      code: 2,
      name: '解约'
    },
    {
      code: 3,
      name: '续签'
    }
  ],
  way: [
    {
      code: 1,
      name: '外训'
    },
    {
      code: 2,
      name: '内训'
    }
  ],
  assume: [
    {
      name: '我方',
      code: 1
    },
    {
      name: '对方',
      code: 2
    }
  ],
  typeNameClass: [
    {
      name: '电脑',
      code: 1
    },
    {
      name: '空调',
      code: 2
    }, {
      name: '投影仪',
      code: 3
    }
  ],
  authMode: [
    {
      name: '试用',
      code: 1
    },
    {
      name: '租赁',
      code: 2
    },
    {
      name: '永久',
      code: 3
    }
  ],
  authModeType: [
    {
      name: '人员',
      code: 1
    },
    {
      name: '项目',
      code: 2
    }
  ],
  menuTreeType: [{
    code: 'dirt',
    name: '目录'
  },
  {
    code: 'menu',
    name: '菜单'
  }],
  iconBackgroudColor: [{
    code: '#3396FB',
    name: '蓝色'
  },
  {
    code: '#FEAC00',
    name: '黄色'
  },
  {
    code: '#F15642',
    name: '红色'
  },
  {
    code: '#1EC6A2',
    name: '绿色'
  }],
  isShowMenu: [{
    code: '1',
    name: 'PC'
  },
  {
    code: '2',
    name: 'APP'
  },
  {
    code: '3',
    name: 'PC+APP'
  }]
};
