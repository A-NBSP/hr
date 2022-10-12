<template>
  <el-dialog title="新增员工" :visible="disVisible" @close="handClose">
    <!-- 表单 -->
    <el-form ref="addEmploy" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree
          v-show="isShow"
          v-loading="loading"
          style="width:80%"
          :data="treeData"
          :props="{label: 'name'}"
          default-expand-all
          @node-click="selectClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handClose">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import employees from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  name: 'HrsaasAddEmployee',
  props: {
    disVisible: {
      type: Boolean || String,
      default: false
    }
  },
  data() {
    return {
      hireType: employees.hireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      isShow: false,
      loading: false,
      treeData: [{ name: '行政部', manager: '刘备' }],
      // - 用户名必填，username，长度为1-4位
      // - 手机号必填，mobile，需满足 正则表达式 /^1[3-9]\d{9}$/
      // - 聘用形式必填， formOfEmployment
      // - 工号必填，workNumber
      // - 部门必填，departmentName
      // - 入职时间必填， timeOfEntry
      // - 转正时间可选，correctionTime
      rules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { min: 1, max: 4, message: '长度为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },

  mounted() {

  },

  methods: {
    handClose() {
      // 表单重置+重新赋值
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmploy.resetFields()
      this.$emit('update:disVisible', false)
      this.isShow = false
    },
    async getDepartments() {
      try {
        this.isShow = true
        this.loading = true
        const { depts } = await getDepartments()
        this.treeData = tranListToTreeData(depts, '')
      } finally {
        this.loading = false
      }
    },
    selectClick(node, n) {
      this.formData.departmentName = node.name
      this.isShow = false
    },
    // 确认提交
    async btnOK() {
      // 验证表单
      await this.$refs.addEmploy.validate()
      // 调用接口
      await addEmployee(this.formData)
      // 刷新列表
      this.$parent.getEmployeeList()
      this.handClose()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
