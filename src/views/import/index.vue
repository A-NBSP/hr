<template>
  <UploadExcel :on-success="handleSuccess" />
</template>

<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { importEmployee } from '@/api/employees'
export default {
  components: { UploadExcel },
  methods: {
    async handleSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key]
        })
        arr.push(userInfo)
      })
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
