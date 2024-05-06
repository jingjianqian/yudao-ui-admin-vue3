import request from '@/config/axios'

// 小程序分类 VO
export interface AppsClassVO {
  id: number // 主键ID
  className: string // 分类名
  status: string // 状态
}

// 小程序分类 API
export const AppsClassApi = {
  // 查询小程序分类分页
  getAppsClassPage: async (params: any) => {
    return await request.get({ url: `/weapp/apps-class/page`, params })
  },

  // 查询小程序分类详情
  getAppsClass: async (id: number) => {
    return await request.get({ url: `/weapp/apps-class/get?id=` + id })
  },

  // 新增小程序分类
  createAppsClass: async (data: AppsClassVO) => {
    return await request.post({ url: `/weapp/apps-class/create`, data })
  },

  // 修改小程序分类
  updateAppsClass: async (data: AppsClassVO) => {
    return await request.put({ url: `/weapp/apps-class/update`, data })
  },

  // 删除小程序分类
  deleteAppsClass: async (id: number) => {
    return await request.delete({ url: `/weapp/apps-class/delete?id=` + id })
  },

  // 导出小程序分类 Excel
  exportAppsClass: async (params) => {
    return await request.download({ url: `/weapp/apps-class/export-excel`, params })
  },
}