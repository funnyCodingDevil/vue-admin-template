<template>
  <div>
    <!-- 传方法 在选择文件后执行on-change  -->
    <!-- 覆盖默认的上传行为，可以自定义上传的实现 http-request -->
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :http-request="handelRequest"
      :before-upload="handleBeforeUpload"
      :class="{disabled: fileList.length > 0}"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 使用进度条 -->
    <el-progress v-if="started" :percentage="percent" style="width: 200px;"></el-progress>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
// 导入模块（Tencent cloud）
var COS = require('cos-js-sdk-v5')
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDZx6yZuylIYWDdmeEXZLq53lCMHvIODl2',
  SecretKey: '0jBMGuHNCl34oHTO2PVMwFH2XkhOoxpQ'
})
export default {
  name: 'ImageUpload',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      // 定义数据，控制进度条的值和显示
      percent: 0,
      started: false,
      finished: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(file) {
      // 这个方法失败 404报错 没有获取文件对象
      // console.log(file)
      // 解决页面闪烁问题
      this.fileList.push({ url: file.url })
    },
    handelRequest(options) {
      // 查看参数
      console.log('handleRequest', arguments)
      // 得到文件对象上传
      const file = options.file
      // 上传中控制数据
      this.started = true
      this.finished = false
      // 通过sdk传文件
      cos.putObject(
        {
          Bucket: 'rzzt-1313400487' /* 必须 */,
          Region: 'ap-chengdu' /* 存储桶所在地域，必须字段 */,
          Key: 'Date.now() + file.name' /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: (progressData) => {
            // console.log(JSON.stringify(progressData))
            this.percent = progressData.percent * 100
          }
        },
        (err, data) => {
          console.log(err || data)
          // 上传成功，把数据放到fileList中
          this.finished = true
          this.started = false

          // this.fileList.push({ url: 'http://' + data.Location })
          this.fileList[0].url = 'http://' + data.Location
        }
      )
    },
    handleRemove(file) {
      const index = this.fileList.findIndex((t) => t.uid === file.uid)
      console.log('index', index)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 限制图片大小
    handleBeforeUpload({ type, size }) {
      if (
        !['image/jepg', 'image/gif', 'image/bmp', 'image/png'].includes(type)
      ) {
        this.$message.error('图片格式不对')
        return false
      }
      if (size > 5 * 1024 * 1024) {
        this.$message.error('图片格式不对')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}
</style>
