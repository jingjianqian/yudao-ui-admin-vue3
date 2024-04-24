import request from '@/config/axios'

// 小程序清单 VO
export interface AppsListVO {
  id: number // 主键ID;主键iD
  weappName: string // 小程序名称;小程序名称
  weappOpenid: string // 小程序OPENID;小程序OPENID
  classId: string // 分类ID;所属分类ID
  description: string // 小程序简介;小程序说明
  logoImg: string // 小程序图标;小程序图标
  status: string // 状态;状态
  updatedBy: string // 更新人;更新人
  updatedTime: Date // 更新时间;数据更新时间
}

// 小程序清单 API
export const AppsListApi = {
  // 查询小程序清单分页
  getAppsListPage: async (params: any) => {
    return await request.get({ url: `/weapp/apps-list/page`, params })
  },

  // 查询小程序清单详情
  getAppsList: async (id: number) => {
    return await request.get({ url: `/weapp/apps-list/get?id=` + id })
  },

  // 新增小程序清单
  createAppsList: async (data: AppsListVO) => {
    return await request.post({ url: `/weapp/apps-list/create`, data })
  },

  // 修改小程序清单
  updateAppsList: async (data: AppsListVO) => {
    return await request.put({ url: `/weapp/apps-list/update`, data })
  },

  // 删除小程序清单
  deleteAppsList: async (id: number) => {
    return await request.delete({ url: `/weapp/apps-list/delete?id=` + id })
  },

  // 导出小程序清单 Excel
  exportAppsList: async (params) => {
    return await request.download({ url: `/weapp/apps-list/export-excel`, params })
  },
}