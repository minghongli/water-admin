import Mock from 'mockjs2'
import { builder,getQueryParameters } from '../util'

const info = (options) => {
  console.log('options', options)
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'name': '天野远子',
    'username': 'admin',
    'password': '',
    'avatar': '/avatar2.jpg',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'merchantCode': 'TLif2btpzg079h15bk',
    'deleted': 0,
    'roleId': 'admin',
    'role': {}
  }
  // role
  const roleObj = {
    'id': 'admin',
    'name': '管理员',
    'describe': '拥有所有权限',
    'status': 1,
    'creatorId': 'system',
    'createTime': 1497160610259,
    'deleted': 0,
    'permissions': [{
      'roleId': 'admin',
      'permissionId': 'dashboard',
      'permissionName': '仪表盘',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'exception',
      'permissionName': '异常页面权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'result',
      'permissionName': '结果权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'profile',
      'permissionName': '详细页权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'table',
      'permissionName': '表格权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'import',
        'describe': '导入',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'form',
      'permissionName': '表单权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'order',
      'permissionName': '订单管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'permission',
      'permissionName': '权限管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'role',
      'permissionName': '角色管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'table',
      'permissionName': '桌子管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'user',
      'permissionName': '用户管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'import',
        'describe': '导入',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }, {
        'action': 'export',
        'describe': '导出',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }]
  }

  roleObj.permissions.push({
    'roleId': 'admin',
    'permissionId': 'support',
    'permissionName': '超级模块',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'import',
      'describe': '导入',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }, {
      'action': 'export',
      'describe': '导出',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

Mock.mock(/\/api\/user\/info/, 'get', info)


import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 12

const memberList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: 'No ' + tmpKey,
      description: '这是一段描述',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
