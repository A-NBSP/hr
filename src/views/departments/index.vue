<template>
  <div v-loading="loading" class="departments-container">
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
        @editDept="editDept"
        @randerList="getDepartments"
      />
    </el-tree>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="currentNode" />
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
      currentNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const result = await getDepartments()
        this.company = { name: result.companyName, manager: result.companyManage, id: '' }
        // this.departs = result.depts // 需要将其转化成树形结构
        this.departs = tranListToTreeData(result.depts, '')
      } finally {
        this.loading = false
      }
    },
    handleAddDept(node) {
      this.showDialog = true
      this.currentNode = node
    },
    editDept(node) {
      this.showDialog = true
      this.currentNode = node
      this.$refs.addDept.formData = node
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
