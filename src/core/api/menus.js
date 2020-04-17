export default [
  {
    id: "test",
    name: "PRODUCT 测试页面",
    leaf: false,
    children: [
      {
        id: "test1",
        name: "测试页面 KeepAlive",
        leaf: true,
        page: "/test1",
        product: "test"
      },
      // {
      //   id: "test2",
      //   name: "测试长页面记录滚动条位置",
      //   leaf: true,
      //   page: "/test2",
      //   product: "test"
      // },
      // {
      //   id: "productsDetail",
      //   name: "模块加载详情",
      //   leaf: true,
      //   page: "/productsDetail",
      //   product: "test"
      // },
      // {
      //   id: "changeFrame",
      //   name: "切换基座（灰度测试）",
      //   leaf: true,
      //   page: "/changeFrame",
      //   product: "test"
      // }
    ],
    icon: "product",
    product: "test"
  },
  {
        id: "custormManager",
        name: "客户管理",
        leaf: false,
        children: [
            {
                id: "sysInfoIndex",
                name: "信息管理",
                leaf: false,
                icon: "product",
                product: "custormManager",
                children: [
                    {
                        id: "productManager",
                        name: "产品管理",
                        leaf: true,
                        page: "/sysInfo/productManager/index",
                        product: "sysInfoIndex"
                    },
                    {
                        id: "productManagerDetail",
                        name: "产品管理-详情",
                        leaf: true,
                        page: "/sysInfo/productManager/detail",
                        product: "sysInfoIndex",
                        hide: true
                    }
                ]
            }
        ],
        icon: "product",
        product: "custormManager"
    },
  // {
  //   id: "elastic",
  //   name: "弹性计算",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "ecs",
  //       name: "云服务器 ECS",
  //       leaf: true,
  //       page: "/ecs",
  //       product: "elastic"
  //     },
  //     {
  //       id: "slb",
  //       name: "负载均衡",
  //       leaf: true,
  //       page: "/slb",
  //       product: "elastic"
  //     },
  //     {
  //       id: "ess",
  //       name: "弹性伸缩",
  //       leaf: true,
  //       page: "/ess",
  //       product: "elastic"
  //     },
  //     {
  //       id: "cs",
  //       name: "容器服务",
  //       leaf: true,
  //       page: "/cs",
  //       product: "elastic"
  //     },
  //     {
  //       id: "csk",
  //       name: "容器服务 Kubernetes 版",
  //       leaf: true,
  //       page: "/csk",
  //       product: "elastic"
  //     },
  //     {
  //       id: "cr",
  //       name: "容器镜像服务",
  //       leaf: true,
  //       page: "/cr",
  //       product: "elastic"
  //     },
  //     {
  //       id: "ros",
  //       name: "资源编排",
  //       leaf: true,
  //       page: "/ros",
  //       product: "elastic"
  //     },
  //     {
  //       id: "batchcompute",
  //       name: "批量计算",
  //       leaf: true,
  //       page: "/batchcompute",
  //       product: "elastic"
  //     },
  //     {
  //       id: "fc",
  //       name: "函数计算",
  //       leaf: true,
  //       page: "/fc",
  //       product: "elastic"
  //     },
  //     {
  //       id: "ehpc",
  //       name: "弹性高性能计算",
  //       leaf: true,
  //       page: "/ehpc",
  //       product: "elastic"
  //     },
  //     {
  //       id: "swas",
  //       name: "轻量应用服务器",
  //       leaf: true,
  //       page: "/swas",
  //       product: "elastic"
  //     },
  //     {
  //       id: "gws",
  //       name: "图形工作站",
  //       leaf: true,
  //       page: "/gws",
  //       product: "elastic"
  //     },
  //     {
  //       id: "eci",
  //       name: "弹性容器实例 ECI",
  //       leaf: true,
  //       page: "/eci",
  //       product: "elastic"
  //     }
  //   ],
  //   icon: "cpu",
  //   product: "elastic"
  // },
  // {
  //   id: "database",
  //   name: "数据库",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "polarDB",
  //       name: "云数据库 POLARDB",
  //       leaf: true,
  //       page: "/polarDB",
  //       product: "database"
  //     },
  //     {
  //       id: "rds",
  //       name: "云数据库 RDS 版",
  //       leaf: true,
  //       page: "/rds",
  //       product: "database"
  //     },
  //     {
  //       id: "dds",
  //       name: "云数据库 MongoDB 版",
  //       leaf: true,
  //       page: "/dds",
  //       product: "database"
  //     },
  //     {
  //       id: "kvstore",
  //       name: "云数据库 Redis 版",
  //       leaf: true,
  //       page: "/kvstore",
  //       product: "database"
  //     },
  //     {
  //       id: "memcache",
  //       name: "云数据库 Memcache 版",
  //       leaf: true,
  //       page: "/memcache",
  //       product: "database"
  //     },
  //     {
  //       id: "petadata",
  //       name: "云数据库 HybridDB for MySQL ",
  //       leaf: true,
  //       page: "/petadata",
  //       product: "database"
  //     },
  //     {
  //       id: "hbase",
  //       name: "云数据库 HBase 版",
  //       leaf: true,
  //       page: "/hbase",
  //       product: "database"
  //     },
  //     {
  //       id: "tsdb",
  //       name: "时序时空数据库 TSDB",
  //       leaf: true,
  //       page: "/tsdb",
  //       product: "database"
  //     },
  //     {
  //       id: "gpdb",
  //       name: "分析型数据库 PostgreSQL版",
  //       leaf: true,
  //       page: "/gpdb",
  //       product: "database"
  //     },
  //     {
  //       id: "oce",
  //       name: "云数据库 OceanBase",
  //       leaf: true,
  //       page: "/oce",
  //       product: "database"
  //     },
  //     {
  //       id: "dts",
  //       name: "数据传输服务 DTS",
  //       leaf: true,
  //       page: "/dts",
  //       product: "database"
  //     },
  //     {
  //       id: "dms",
  //       name: "数据管理 DMS",
  //       leaf: true,
  //       page: "/dms",
  //       product: "database"
  //     },
  //     {
  //       id: "dbs",
  //       name: "数据库备份 DBS",
  //       leaf: true,
  //       page: "/dbs",
  //       product: "database"
  //     },
  //     {
  //       id: "hdm",
  //       name: "混合云数据库管理 HDM",
  //       leaf: true,
  //       page: "/hdm",
  //       product: "database"
  //     },
  //     {
  //       id: "drds",
  //       name: "分布式关系型数据库 DRDS",
  //       leaf: true,
  //       page: "/drds",
  //       product: "database"
  //     },
  //     {
  //       id: "gds",
  //       name: "图数据库 GDB",
  //       leaf: true,
  //       page: "/gds",
  //       product: "database"
  //     },
  //     {
  //       id: "adam",
  //       name: "数据库和应用迁移",
  //       leaf: true,
  //       page: "/adam",
  //       product: "database"
  //     }
  //   ],
  //   icon: "database",
  //   product: "database"
  // },
  // {
  //   id: "cdn",
  //   name: "存储与CDN",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "oss",
  //       name: "对象存储 OSS",
  //       leaf: true,
  //       page: "/oss",
  //       product: "cdn"
  //     },
  //     {
  //       id: "nas",
  //       name: "文件存储 NAS",
  //       leaf: true,
  //       page: "/nas",
  //       product: "cdn"
  //     },
  //     {
  //       id: "ots",
  //       name: "表格存储",
  //       leaf: true,
  //       page: "/ots",
  //       product: "cdn"
  //     },
  //     {
  //       id: "oas",
  //       name: "归档存储",
  //       leaf: true,
  //       page: "/oas",
  //       product: "cdn"
  //     },
  //     {
  //       id: "cdn",
  //       name: "CDN",
  //       leaf: true,
  //       page: "",
  //       product: "cdn"
  //     },
  //     {
  //       id: "pcdn",
  //       name: "PCDN",
  //       leaf: true,
  //       page: "/pcdn",
  //       product: "cdn"
  //     },
  //     {
  //       id: "dcdn",
  //       name: "全站加速",
  //       leaf: true,
  //       page: "/dcdn",
  //       product: "cdn"
  //     },
  //     {
  //       id: "sgw",
  //       name: "云存储网关",
  //       leaf: true,
  //       page: "/sgw",
  //       product: "cdn"
  //     },
  //     {
  //       id: "cloudphoto",
  //       name: "智能云相册",
  //       leaf: true,
  //       page: "/cloudphoto",
  //       product: "cdn"
  //     },
  //     {
  //       id: "hbr",
  //       name: "混合云备份",
  //       leaf: true,
  //       page: "/hbr",
  //       product: "cdn"
  //     },
  //     {
  //       id: "hdr",
  //       name: "混合云容灾",
  //       leaf: true,
  //       page: "/hdr",
  //       product: "cdn"
  //     },
  //     {
  //       id: "scdn",
  //       name: "安全加速 SCDN",
  //       leaf: true,
  //       page: "/scdn",
  //       product: "cdn"
  //     },
  //     {
  //       id: "imm",
  //       name: "智能媒体管理",
  //       leaf: true,
  //       page: "/imm",
  //       product: "cdn"
  //     },
  //     {
  //       id: "hcs_mgw",
  //       name: "闪电立方",
  //       leaf: true,
  //       page: "/hcs_mgw",
  //       product: "cdn"
  //     },
  //     {
  //       id: "ens",
  //       name: "边缘节点服务 ENS",
  //       leaf: true,
  //       page: "/ens",
  //       product: "cdn"
  //     },
  //     {
  //       id: "alidfs",
  //       name: "文件存储HDFS",
  //       leaf: true,
  //       page: "/alidfs",
  //       product: "cdn"
  //     }
  //   ],
  //   icon: "download-cloud",
  //   product: "cdn"
  // },
  // {
  //   id: "network",
  //   name: "网络",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "vpc",
  //       name: "专有网络 VPC",
  //       leaf: true,
  //       page: "/vpc",
  //       product: "network"
  //     },
  //     {
  //       id: "nat_gw",
  //       name: "NAT 网关",
  //       leaf: true,
  //       page: "/nat_gw",
  //       product: "network"
  //     },
  //     {
  //       id: "stp",
  //       name: "共享流量包",
  //       leaf: true,
  //       page: "/stp",
  //       product: "network"
  //     },
  //     {
  //       id: "ip",
  //       name: "弹性公网 IP",
  //       leaf: true,
  //       page: "/ip",
  //       product: "network"
  //     },
  //     {
  //       id: "ri",
  //       name: "高速通道",
  //       leaf: true,
  //       page: "/ri",
  //       product: "network"
  //     },
  //     {
  //       id: "vpn",
  //       name: "VPN 网关",
  //       leaf: true,
  //       page: "/vpn",
  //       product: "network"
  //     },
  //     {
  //       id: "cbwp",
  //       name: "共享带宽",
  //       leaf: true,
  //       page: "/cbwp",
  //       product: "network"
  //     },
  //     {
  //       id: "ga",
  //       name: "全球加速",
  //       leaf: true,
  //       page: "/ga",
  //       product: "network"
  //     },
  //     {
  //       id: "smartag",
  //       name: "智能接入网关",
  //       leaf: true,
  //       page: "/smartag",
  //       product: "network"
  //     },
  //     {
  //       id: "ipv6trans",
  //       name: "IPv6 转换服务",
  //       leaf: true,
  //       page: "/ipv6trans",
  //       product: "network"
  //     },
  //     {
  //       id: "cbn",
  //       name: "云企业网",
  //       leaf: true,
  //       page: "/cbn",
  //       product: "network"
  //     }
  //   ],
  //   icon: "globe",
  //   product: "network"
  // },
  // {
  //   id: "analysis",
  //   name: "分析",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "emr",
  //       name: "E-MapReduce",
  //       leaf: true,
  //       page: "/emr",
  //       product: "analysis"
  //     },
  //     {
  //       id: "odps",
  //       name: "MaxCompute",
  //       leaf: true,
  //       page: "/odps",
  //       product: "analysis"
  //     },
  //     {
  //       id: "ads",
  //       name: "分析型数据库",
  //       leaf: true,
  //       page: "/ads",
  //       product: "analysis"
  //     },
  //     {
  //       id: "cdp",
  //       name: "数据集成（旧版）",
  //       leaf: true,
  //       page: "/cdp",
  //       product: "analysis"
  //     },
  //     {
  //       id: "openanalytics",
  //       name: "Data Lake Analytics",
  //       leaf: true,
  //       page: "/openanalytics",
  //       product: "analysis"
  //     }
  //   ],
  //   icon: "pie-chart",
  //   product: "analysis"
  // },
  // {
  //   id: "yuntongxin",
  //   name: "云通信",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "dyvms",
  //       name: "语音服务",
  //       leaf: true,
  //       page: "/dyvms",
  //       product: "yuntongxin"
  //     },
  //     {
  //       id: "dycdp",
  //       name: "流量服务",
  //       leaf: true,
  //       page: "/dycdp",
  //       product: "yuntongxin"
  //     },
  //     {
  //       id: "dysms",
  //       name: "短信服务",
  //       leaf: true,
  //       page: "/dysms",
  //       product: "yuntongxin"
  //     },
  //     {
  //       id: "dyiot",
  //       name: "物联网无线连接服务",
  //       leaf: true,
  //       page: "/dyiot",
  //       product: "yuntongxin"
  //     },
  //     {
  //       id: "dypls",
  //       name: "号码隐私保护",
  //       leaf: true,
  //       page: "/dypls",
  //       product: "yuntongxin"
  //     },
  //     {
  //       id: "dypns",
  //       name: "号码认证服务",
  //       leaf: true,
  //       page: "/dypns",
  //       product: "yuntongxin"
  //     },
  //     {
  //       id: "snsu",
  //       name: "云通信网络加速",
  //       leaf: true,
  //       page: "/snsu",
  //       product: "yuntongxin"
  //     }
  //   ],
  //   icon: "mail",
  //   product: "yuntongxin"
  // },
  // {
  //   id: "jkgl",
  //   name: "监控与管理",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "cms",
  //       name: "云监控",
  //       leaf: true,
  //       page: "/cms",
  //       product: "jkgl"
  //     },
  //     {
  //       id: "ram",
  //       name: "访问控制",
  //       leaf: true,
  //       page: "/ram",
  //       product: "jkgl"
  //     },
  //     {
  //       id: "actiontrail",
  //       name: "操作审计",
  //       leaf: true,
  //       page: "/actiontrail",
  //       product: "jkgl"
  //     },
  //     {
  //       id: "kms",
  //       name: "密钥管理服务",
  //       leaf: true,
  //       page: "/kms",
  //       product: "jkgl"
  //     },
  //     {
  //       id: "advisor",
  //       name: "智能顾问",
  //       leaf: true,
  //       page: "/advisor",
  //       product: "jkgl"
  //     }
  //   ],
  //   icon: "aperture",
  //   product: "jkgl"
  // },
  // {
  //   id: "apps",
  //   name: "应用服务",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "sls",
  //       name: "日志服务",
  //       leaf: true,
  //       page: "/sls",
  //       product: "apps"
  //     },
  //     {
  //       id: "opensearch",
  //       name: "开放搜索",
  //       leaf: true,
  //       page: "/opensearch",
  //       product: "apps"
  //     },
  //     {
  //       id: "pts",
  //       name: "性能测试服务",
  //       leaf: true,
  //       page: "/pts",
  //       product: "apps"
  //     },
  //     {
  //       id: "dm",
  //       name: "邮件推送",
  //       leaf: true,
  //       page: "/dm",
  //       product: "apps"
  //     },
  //     {
  //       id: "apigateway",
  //       name: "API 网关",
  //       leaf: true,
  //       page: "/apigateway",
  //       product: "apps"
  //     },
  //     {
  //       id: "iot",
  //       name: "物联网平台",
  //       leaf: true,
  //       page: "/iot",
  //       product: "apps"
  //     },
  //     {
  //       id: "sca",
  //       name: "智能对话分析",
  //       leaf: true,
  //       page: "/sca",
  //       product: "apps"
  //     },
  //     {
  //       id: "rdc",
  //       name: "云效",
  //       leaf: true,
  //       page: "/rdc",
  //       product: "apps"
  //     },
  //     {
  //       id: "cloudap",
  //       name: "云 AP",
  //       leaf: true,
  //       page: "/cloudap",
  //       product: "apps"
  //     },
  //     {
  //       id: "clouddesktop",
  //       name: "云桌面",
  //       leaf: true,
  //       page: "/clouddesktop",
  //       product: "apps"
  //     },
  //     {
  //       id: "codepipeline",
  //       name: "CodePipeline",
  //       leaf: true,
  //       page: "/codepipeline",
  //       product: "apps"
  //     },
  //     {
  //       id: "ccs",
  //       name: "云客服",
  //       leaf: true,
  //       page: "/ccs",
  //       product: "apps"
  //     },
  //     {
  //       id: "beebot",
  //       name: "云小蜜",
  //       leaf: true,
  //       page: "/beebot",
  //       product: "apps"
  //     },
  //     {
  //       id: "ccc",
  //       name: "云呼叫中心",
  //       leaf: true,
  //       page: "/ccc",
  //       product: "apps"
  //     },
  //     {
  //       id: "npp",
  //       name: "Node.js 性能平台",
  //       leaf: true,
  //       page: "/npp",
  //       product: "apps"
  //     },
  //     {
  //       id: "developer",
  //       name: "API 控制台",
  //       leaf: true,
  //       page: "/developer",
  //       product: "apps"
  //     },
  //     {
  //       id: "iovcc",
  //       name: "智联车管理云平台",
  //       leaf: true,
  //       page: "/iovcc",
  //       product: "apps"
  //     },
  //     {
  //       id: "baas",
  //       name: "区块链服务",
  //       leaf: true,
  //       page: "/baas",
  //       product: "apps"
  //     },
  //     {
  //       id: "airec",
  //       name: "智能推荐",
  //       leaf: true,
  //       page: "/airec",
  //       product: "apps"
  //     },
  //     {
  //       id: "linkwan",
  //       name: "物联网络管理平台",
  //       leaf: true,
  //       page: "/linkwan",
  //       product: "apps"
  //     },
  //     {
  //       id: "iotid",
  //       name: "IoT 设备身份认证",
  //       leaf: true,
  //       page: "/iotid",
  //       product: "apps"
  //     },
  //     {
  //       id: "yida",
  //       name: "宜搭",
  //       leaf: true,
  //       page: "/yida",
  //       product: "apps"
  //     }
  //   ],
  //   icon: "grid",
  //   product: "apps"
  // },
  // {
  //   id: "hlwzjj",
  //   name: "互联网中间件",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "edas",
  //       name: "企业级分布式应用服务 EDAS",
  //       leaf: true,
  //       page: "/edas",
  //       product: "hlwzjj"
  //     },
  //     {
  //       id: "csb",
  //       name: "云服务总线",
  //       leaf: true,
  //       page: "/csb",
  //       product: "hlwzjj"
  //     },
  //     {
  //       id: "arms",
  //       name: "业务实时监控服务",
  //       leaf: true,
  //       page: "/arms",
  //       product: "hlwzjj"
  //     },
  //     {
  //       id: "gts",
  //       name: "全局事务服务",
  //       leaf: true,
  //       page: "/gts",
  //       product: "hlwzjj"
  //     },
  //     {
  //       id: "acms",
  //       name: "应用配置管理",
  //       leaf: true,
  //       page: "/acms",
  //       product: "hlwzjj"
  //     },
  //     {
  //       id: "xtrace",
  //       name: "链路追踪",
  //       leaf: true,
  //       page: "/xtrace",
  //       product: "hlwzjj"
  //     },
  //     {
  //       id: "ahas",
  //       name: "应用高可用服务",
  //       leaf: true,
  //       page: "/ahas",
  //       product: "hlwzjj"
  //     }
  //   ],
  //   icon: "layers",
  //   product: "hlwzjj"
  // },
  // {
  //   id: "mq",
  //   name: "消息队列 MQ",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "ons",
  //       name: "消息队列 RocketMQ",
  //       leaf: true,
  //       page: "/ons",
  //       product: "mq"
  //     },
  //     {
  //       id: "alikafka",
  //       name: "消息队列 Kafka",
  //       leaf: true,
  //       page: "/alikafka",
  //       product: "mq"
  //     },
  //     {
  //       id: "amqp",
  //       name: "消息队列 AMQP",
  //       leaf: true,
  //       page: "/amqp",
  //       product: "mq"
  //     },
  //     {
  //       id: "mq4iot",
  //       name: "微消息队列 for IoT",
  //       leaf: true,
  //       page: "/mq4iot",
  //       product: "mq"
  //     },
  //     {
  //       id: "mns",
  //       name: "消息服务 MNS",
  //       leaf: true,
  //       page: "/mns",
  //       product: "mq"
  //     }
  //   ],
  //   icon: "message-square",
  //   product: "mq"
  // },
  // {
  //   id: "yidongyun",
  //   name: "移动云",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "httpdns",
  //       name: "HTTPDNS",
  //       leaf: true,
  //       page: "/httpdns",
  //       product: "yidongyun"
  //     },
  //     {
  //       id: "mqc",
  //       name: "移动测试",
  //       leaf: true,
  //       page: "/mqc",
  //       product: "yidongyun"
  //     },
  //     {
  //       id: "hotfix",
  //       name: "移动热修复",
  //       leaf: true,
  //       page: "/hotfix",
  //       product: "yidongyun"
  //     },
  //     {
  //       id: "cps",
  //       name: "移动推送",
  //       leaf: true,
  //       page: "/cps",
  //       product: "yidongyun"
  //     },
  //     {
  //       id: "man",
  //       name: "移动数据分析",
  //       leaf: true,
  //       page: "/man",
  //       product: "yidongyun"
  //     },
  //     {
  //       id: "feedback",
  //       name: "移动用户反馈",
  //       leaf: true,
  //       page: "/feedback",
  //       product: "yidongyun"
  //     }
  //   ],
  //   icon: "smartphone",
  //   product: "yidongyun"
  // },
  // {
  //   id: "dtplus",
  //   name: "大数据（数加）",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "dtplus_overview",
  //       name: "数加控制台概览",
  //       leaf: true,
  //       page: "/dtplus_overview",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "dide",
  //       name: "DataWorks",
  //       leaf: true,
  //       page: "/dide",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "quickbi",
  //       name: "Quick BI",
  //       leaf: true,
  //       page: "/quickbi",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "pai",
  //       name: "机器学习",
  //       leaf: true,
  //       page: "/pai",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "receng",
  //       name: "推荐引擎",
  //       leaf: true,
  //       page: "/receng",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "prophet",
  //       name: "公众趋势分析",
  //       leaf: true,
  //       page: "/prophet",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "dataphin",
  //       name: "智能数据构建与管理 Dataphin",
  //       leaf: true,
  //       page: "/dataphin",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "datav",
  //       name: "DataV 数据可视化",
  //       leaf: true,
  //       page: "/datav",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "nls",
  //       name: "智能语音交互",
  //       leaf: true,
  //       page: "/nls",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "stream",
  //       name: "实时计算",
  //       leaf: true,
  //       page: "/stream",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "portrait",
  //       name: "画像分析",
  //       leaf: true,
  //       page: "/portrait",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "eprofile",
  //       name: "企业图谱",
  //       leaf: true,
  //       page: "/eprofile",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "datai",
  //       name: "数据集成",
  //       leaf: true,
  //       page: "/datai",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "face",
  //       name: "人脸识别",
  //       leaf: true,
  //       page: "/face",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "image",
  //       name: "图像识别",
  //       leaf: true,
  //       page: "/image",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "elasticsearch",
  //       name: "阿里云 Elasticsearch",
  //       leaf: true,
  //       page: "/elasticsearch",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "nlp",
  //       name: "自然语言处理",
  //       leaf: true,
  //       page: "/nlp",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "alimt",
  //       name: "机器翻译",
  //       leaf: true,
  //       page: "/alimt",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "iplus",
  //       name: "I+ 关系网络分析",
  //       leaf: true,
  //       page: "/iplus",
  //       product: "dtplus"
  //     },
  //     {
  //       id: "imagesearch",
  //       name: "图像搜索",
  //       leaf: true,
  //       page: "/imagesearch",
  //       product: "dtplus"
  //     }
  //   ],
  //   icon: "codesandbox",
  //   product: "dtplus"
  // },
  // {
  //   id: "yundun",
  //   name: "安全（云盾）",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "sas",
  //       name: "云安全中心（态势感知）",
  //       leaf: true,
  //       page: "/sas",
  //       product: "yundun"
  //     },
  //     {
  //       id: "ddos",
  //       name: "DDoS 基础防护",
  //       leaf: true,
  //       page: "/ddos",
  //       product: "yundun"
  //     },
  //     {
  //       id: "ddospro",
  //       name: "DDoS 高防",
  //       leaf: true,
  //       page: "/ddospro",
  //       product: "yundun"
  //     },
  //     {
  //       id: "gameshield",
  //       name: "游戏盾",
  //       leaf: true,
  //       page: "/gameshield",
  //       product: "yundun"
  //     },
  //     {
  //       id: "waf",
  //       name: "Web 应用防火墙（网络安全）",
  //       leaf: true,
  //       page: "/waf",
  //       product: "yundun"
  //     },
  //     {
  //       id: "aqs",
  //       name: "云安全中心（安骑士）",
  //       leaf: true,
  //       page: "/aqs",
  //       product: "yundun"
  //     },
  //     {
  //       id: "cas",
  //       name: "SSL 证书（应用安全）",
  //       leaf: true,
  //       page: "/cas",
  //       product: "yundun"
  //     },
  //     {
  //       id: "dbaudit",
  //       name: "数据库审计（数据安全）",
  //       leaf: true,
  //       page: "/dbaudit",
  //       product: "yundun"
  //     },
  //     {
  //       id: "hsm",
  //       name: "加密服务（数据安全）",
  //       leaf: true,
  //       page: "/hsm",
  //       product: "yundun"
  //     },
  //     {
  //       id: "saf",
  //       name: "风险识别（业务安全）",
  //       leaf: true,
  //       page: "/saf",
  //       product: "yundun"
  //     },
  //     {
  //       id: "cts",
  //       name: "内容安全（业务安全）",
  //       leaf: true,
  //       page: "/cts",
  //       product: "yundun"
  //     },
  //     {
  //       id: "bastion",
  //       name: "堡垒机（安全管理）",
  //       leaf: true,
  //       page: "/bastion",
  //       product: "yundun"
  //     },
  //     {
  //       id: "mss",
  //       name: "安全管家（安全服务）",
  //       leaf: true,
  //       page: "/mss",
  //       product: "yundun"
  //     },
  //     {
  //       id: "xz",
  //       name: "先知（安全服务）",
  //       leaf: true,
  //       page: "/xz",
  //       product: "yundun"
  //     },
  //     {
  //       id: "cfw",
  //       name: "云防火墙",
  //       leaf: true,
  //       page: "/cfw",
  //       product: "yundun"
  //     },
  //     {
  //       id: "cloudauth",
  //       name: "实人认证",
  //       leaf: true,
  //       page: "/cloudauth",
  //       product: "yundun"
  //     },
  //     {
  //       id: "avds",
  //       name: "网站威胁扫描（应用安全）",
  //       leaf: true,
  //       page: "/avds",
  //       product: "yundun"
  //     },
  //     {
  //       id: "afs",
  //       name: "数据风控（业务安全）",
  //       leaf: true,
  //       page: "/afs",
  //       product: "yundun"
  //     },
  //     {
  //       id: "antibot",
  //       name: "爬虫风险管理",
  //       leaf: true,
  //       page: "/antibot",
  //       product: "yundun"
  //     },
  //     {
  //       id: "sddp",
  //       name: "敏感数据保护（数据安全）",
  //       leaf: true,
  //       page: "/sddp",
  //       product: "yundun"
  //     },
  //     {
  //       id: "idaas",
  //       name: "应用身份服务",
  //       leaf: true,
  //       page: "/idaas",
  //       product: "yundun"
  //     }
  //   ],
  //   icon: "shield",
  //   product: "yundun"
  // },
  // {
  //   id: "netcn",
  //   name: "域名与网站（万网）",
  //   leaf: false,
  //   children: [
  //     {
  //       id: "domain",
  //       name: "域名",
  //       leaf: true,
  //       page: "/domain",
  //       product: "netcn"
  //     },
  //     {
  //       id: "dns",
  //       name: "云解析 DNS",
  //       leaf: true,
  //       page: "/dns",
  //       product: "netcn"
  //     },
  //     {
  //       id: "host",
  //       name: "云虚拟主机",
  //       leaf: true,
  //       page: "/host",
  //       product: "netcn"
  //     },
  //     {
  //       id: "mail",
  //       name: "企业邮箱",
  //       leaf: true,
  //       page: "/mail",
  //       product: "netcn"
  //     },
  //     {
  //       id: "website",
  //       name: "标准建站",
  //       leaf: true,
  //       page: "/website",
  //       product: "netcn"
  //     },
  //     {
  //       id: "ews",
  //       name: "弹性 Web 托管",
  //       leaf: true,
  //       page: "/ews",
  //       product: "netcn"
  //     },
  //     {
  //       id: "trademark",
  //       name: "商标服务",
  //       leaf: true,
  //       page: "/trademark",
  //       product: "netcn"
  //     }
  //   ],
  //   icon: "server",
  //   product: "netcn"
  // },
  // {
  //   id: "others",
  //   name: "其他服务",
  //   leaf: false,
  //   icon: "box",
  //   product: "others",
  //   children: [
  //     {
  //       id: "video",
  //       name: "视频服务",
  //       leaf: false,
  //       children: [
  //         {
  //           id: "mts",
  //           name: "媒体处理",
  //           leaf: true,
  //           page: "/mts",
  //           product: "others"
  //         },
  //         {
  //           id: "vod",
  //           name: "视频点播",
  //           leaf: true,
  //           page: "/vod",
  //           product: "others"
  //         },
  //         {
  //           id: "live",
  //           name: "视频直播",
  //           leaf: true,
  //           page: "/live",
  //           product: "others"
  //         },
  //         {
  //           id: "rtc",
  //           name: "音视频通信 RTC",
  //           leaf: true,
  //           page: "/rtc",
  //           product: "others"
  //         },
  //         {
  //           id: "ivision",
  //           name: "智能视觉（模型训练预测）",
  //           leaf: true,
  //           page: "/ivision",
  //           product: "others"
  //         },
  //         {
  //           id: "vs",
  //           name: "视频监控",
  //           leaf: true,
  //           page: "/vs",
  //           product: "others"
  //         }
  //       ],
  //       icon: "film",
  //       product: "others"
  //     },
  //     {
  //       id: "market",
  //       name: "云市场",
  //       leaf: false,
  //       children: [
  //         {
  //           id: "market",
  //           name: "云市场",
  //           leaf: true,
  //           page: "/market",
  //           product: "others"
  //         }
  //       ],
  //       icon: "cloud",
  //       product: "others"
  //     },
  //     {
  //       id: "spc",
  //       name: "支持与服务",
  //       leaf: false,
  //       children: [
  //         {
  //           id: "spc",
  //           name: "支持与服务",
  //           leaf: true,
  //           page: "/spc",
  //           product: "others"
  //         }
  //       ],
  //       icon: "help-circle",
  //       product: "others"
  //     }
  //   ]
  // }
];
