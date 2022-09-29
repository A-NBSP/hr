<template>
  <el-dialog
    :title="formData.id? '编辑角色':'新增角色'"
    width="50%"
    :visible.sync="dialogvisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formData"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{
          required: true, message: '角色必填', trigger: 'blur'
        }]"
      >
        <el-input v-model.trim="formData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model.trim="formData.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  props: {
    dialogvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs.roleDialogForm.resetFields()
      this.$emit('update:dialogvisible', false)
      this.formData = {
        name: '',
        description: ''
      }
    },
    async submit() {
      try {
        this.loading = true
        this.formData.id ? await updateRole(this.formData) : await addRole(this.formData)
        this.$emit('refreshList')
        await this.$refs.roleDialogForm.resetFields()
        this.handleClose()
        this.$message.success(this.formData.id ? '编辑成功' : '新增成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
