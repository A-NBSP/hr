<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane lazy label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="form" :model="accountInfo" :rules="accountInfoRules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetilById, saveUserDetilById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: { UserInfo, JobInfo },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'second',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度最少6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const data = await getUserDetilById(this.$route.params.id)
      this.accountInfo = data
    },
    // 更新
    async updateEmployees() {
      try {
        // async,await缺点：只能通过tryCatch捕获错误
        await this.$refs.form.validate()
        await saveUserDetilById(this.accountInfo)
        this.$message.success('校验成功')
      } catch (error) {
        console.log(error)
      }
    },
    handleClick() {
      // activeName持久化
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
