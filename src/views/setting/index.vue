<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <!-- 放置页签 -->
        <el-tab-pane label="角色管理1111" name="first">
          <!-- 新增角色按钮 -->
          <el-row :gutter="10">
            <el-button icon="el-icon-plus" size="small" type="primary" style="margin-left:10px;" @click="dialogvisible = true">新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" border="" :data="list">
            <el-table-column align="center" type="index" label="序号" width="120" />
            <el-table-column align="center" prop="name" label="名称" width="240" />
            <el-table-column align="center" prop="description" label="描述" />
            <el-table-column align="center" label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="edit(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRow(row.id)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页组件 -->
          <el-row :gutter="10" type="flex" justify="end" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next, sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2, 5, 10, 15]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input disabled :value="companyInfo.name" style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled :value="companyInfo.companyAddress" style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input disabled :value="companyInfo.mailbox" style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :value="companyInfo.remarks" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <assRole ref="addRole" :dialogvisible.sync="dialogvisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import assRole from '@/views/setting/components/assRole'

export default {
  components: { assRole },
  data() {
    return {
      companyInfo: {},
      dialogvisible: false,
      activeName: 'first',
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      loading: false,
      total: 0 // 记录总数
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.total = total
        this.list = rows
        if (rows.length === 0 && total > 0) {
          this.page.page--
          this.getRoleList()
        }
      } finally {
        this.loading = false
      }
    },
    edit(row) {
      this.$refs.addRole.formData = { ...row }
      this.dialogvisible = true
    },
    async delRow(id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async getCompanyInfo() {
      const data = await getCompanyInfo(this.$store.getters.companyId)
      console.log(data)
      this.companyInfo = data
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
