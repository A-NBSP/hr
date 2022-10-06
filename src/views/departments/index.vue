<template>
  <div class="departments-container">
    <el-card>
      <tree-tools
        :tree-node="company"
        :is-root="false"
        @addDept="handleAddDept"
      />
    </el-card>
    <el-tree :data="departs" default-expand-all :props="defaultProps">
      <tree-tools
        slot-scope="{ data }"
        :tree-node="data"
        @addDept="handleAddDept"
      />
    </el-tree>
    <add-dept :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import TreeTools from './compontents/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './compontents/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: { TreeTools, AddDept },

  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      currentNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: result.companyManage, id: '' }
      // this.departs = result.depts // 需要将其转化成树形结构
      this.departs = tranListToTreeData(result.depts, '')
    },
    handleAddDept(node) {
      this.showDialog = true
      this.currentNode = node
    }
  }
}
</script>

<style lang="scss" scoped>
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      padding-right: 20px;
    }
  }
  </style>
