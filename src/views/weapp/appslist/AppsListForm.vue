<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="小程序名称" prop="weappName">
        <el-input v-model="formData.weappName" placeholder="请输入小程序名称" />
      </el-form-item>
      <el-form-item label="小程序OPENID" prop="weappOpenid">
        <el-input v-model="formData.weappOpenid" placeholder="请输入小程序OPENID" />
      </el-form-item>
      <el-form-item label="是否banner展示" prop="isBanner">
        <el-radio-group v-model="formData.isBanner">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类ID" prop="classId">
        <el-input v-model="formData.classId" placeholder="请输入分类ID" />
      </el-form-item>
      <el-form-item label="小程序图标" prop="logoImg">
        <UploadImg v-model="formData.logoImg" />
      </el-form-item>
      <el-form-item label="发布状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio
            v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { AppsListApi, AppsListVO } from '@/api/weapp/appslist'

/** 小程序清单 表单 */
defineOptions({ name: 'AppsListForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  weappName: undefined,
  weappOpenid: undefined,
  classId: undefined,
  logoImg: undefined,
  isBanner: undefined,
  status: undefined,
  id: undefined,
})
const formRules = reactive({
  weappName: [{ required: true, message: '小程序名称不能为空', trigger: 'blur' }],
  weappOpenid: [{ required: true, message: '小程序OPENID不能为空', trigger: 'blur' }],
  classId: [{ required: true, message: '分类ID不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '发布状态不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await AppsListApi.getAppsList(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as AppsListVO
    if (formType.value === 'create') {
      await AppsListApi.createAppsList(data)
      message.success(t('common.createSuccess'))
    } else {
      await AppsListApi.updateAppsList(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    weappName: undefined,
    weappOpenid: undefined,
    classId: undefined,
    logoImg: undefined,
    isBanner: undefined,
    status: undefined,
    id: undefined,
  }
  formRef.value?.resetFields()
}
</script>