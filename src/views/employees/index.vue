<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span>共{{ total }}条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn">
          <!-- <template slot-scope="{row}">
            {{ row.formOfEmployment }}
          </template> -->
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState === 1"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next,sizes,total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          :total="total"
          @size-change="getEmployeeList"
          @current-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <add-employee :dis-visible.sync="disVisible" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import PageTools from '@/components/PageTools/index.vue'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
export default {
  name: 'HrsaasIndex',
  components: { PageTools, AddEmployee },

  data() {
    return {
      page: {
        page: 1, // 当前页码
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EmployeeEnum.hireType,
      disVisible: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue, index) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res ? res.value : '非正式'
    },
    // 新增员工
    handleEmploy() {
      this.disVisible = true
    },
    // 删除员工
    async del(id) {
      try {
        await this.$confirm('确认永久删除该用工吗', '提示')
        await delEmployee(id)
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    // 导出功能
    async exportExcel() {
      // 文件懒加载 import当函数使用，默认返回Promise
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)
      const header = ['手机号', '姓名', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      // 映射表
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            console.log(item[exportExcelMapPath[h]])
            const find = this.hireType.find(hire => hire.id === item[exportExcelMapPath[h]])
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        // 二维数组中每一个代表一行数据
        data, // 具体数据 必填
        filename: '人资员工信息', // 非必填，导出的文件名
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填，导出的文件类型
      })
    },
    // 查看
    goDetail(row) {
      this.$router.push('/employees/detail/' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
