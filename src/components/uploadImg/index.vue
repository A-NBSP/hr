<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :on-preview="onPreview"
      :file-list="fileList"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="onHttpRequest"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!--  -->
    <el-dialog
      title="提示"
      :visible.sync="previewDialog"
      width="30%"
    >
      <img style="width: 100%;" :src="previewUrl" alt="">
    </el-dialog>
  </div>

</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDISbaYZYSYceWFnAKTTFmaFvbMH5yjS0J',
  SecretKey: 'DE8sbHnKoANNCpETl7d3JMCxZ3LPI1ZF'
})
export default {
  name: 'UploadImg',
  props: {
    url: {
      type: String,
      default: () => ('')
    }
  },
  data() {
    return {
      previewDialog: false,
      loading: false,
      previewUrl: '',
      fileList: [
        // { name: 'food.jpeg', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ]
    }
  },
  watch: {
    url() {
      this.fileList.push({
        name: 'default', url: this.url
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewDialog = true
      this.previewUrl = file.url
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const allowTypes = ['image/jpeg', 'image/gif']
      const isHas = allowTypes.includes(file.type)
      if (!isHas) {
        this.$message.error('只能上传' + allowTypes.join(',') + '类型文件')
        return false
      }
      // 限制上传文件大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的文件最大不超过5MB')
        return false
      }
    },
    // 第一次调用：本地上传
    // 第二次调用：发送请求 无论成功失败都会调用
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hz-33-1314348517', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // console.log(err || data)
        // 上传成功，err为null
        if (err) return this.$message.error('上传失败')
        this.$message.success('上传成功')
        this.$emit('onSuccess', { imgUrl: 'https://' + data.Location })
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadImg{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
