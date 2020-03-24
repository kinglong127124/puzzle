export const tableColumns = {
  listColumns: [
    {
      text: '审核状态',
      value: 'validateStatus',
      width: '80',
      align: 'center'
    }, {
      text: '是否处理',
      value: 'isHandle',
      width: '80',
      align: 'center',
      showOverflowTooltip: true
    }, {
      text: '处理时间',
      value: 'handleTime',
      width: 160,
      align: 'left',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '申请单位',
      value: 'appOrgName',
      minWidth: 200,
      align: 'left',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '申请日期',
      value: 'appTime',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '申请人员',
      value: 'appPerson',
      width: '100',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '申请人员电话',
      value: 'appPersonPhone',
      width: '150',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }],
  before: [
    {
      text: '授权模式',
      value: 'beforAuthModel',
      width: '80',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '授权方式',
      value: 'beforAuthWay',
      width: '80',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '授权数量',
      value: 'beforAuthNum',
      width: '100',
      align: 'right',
      headerAlign: 'center',
      showOverflowTooltip: true
    }
  ],
  after: [
    {
      text: '授权模式',
      value: 'afterAuthModel',
      width: '80',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '授权方式',
      value: 'afterAuthWay',
      width: '80',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '授权数量',
      value: 'afterAuthNum',
      width: '100',
      align: 'right',
      headerAlign: 'center',
      showOverflowTooltip: true
    }
  ],
  contract: [
    {
      text: '原始合同号',
      value: 'contractOrignalCode',
      width: '130',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '签约日期',
      value: 'signDate',
      width: '100',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '签约金额',
      value: 'signPrice',
      width: '100',
      align: 'right',
      headerAlign: 'center',
      showOverflowTooltip: true
    }, {
      text: '商务人员',
      value: 'busPerson',
      width: '100',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true
    }
  ]
};
