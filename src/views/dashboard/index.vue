<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <UploadExcel></UploadExcel> -->
    <ImageUpload></ImageUpload>
    <input
      ref="fileRef"
      type="file"
    >
    <!--multiple多选-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
var COS = require('cos-js-sdk-v5')
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDZx6yZuylIYWDdmeEXZLq53lCMHvIODl2',
  SecretKey: '0jBMGuHNCl34oHTO2PVMwFH2XkhOoxpQ'
})
export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      value: 'https://example.com'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.$refs.fileRef.onchange = function() {
      // 如歌获取选择的文件
      const file = this.files[0]
      console.log(this.onchange)
      console.log(file)
      // 通过sdk传文件
      cos.putObject(
        {
          Bucket: 'rzzt-1313400487' /* 必须 */,
          Region: 'ap-chengdu' /* 存储桶所在地域，必须字段 */,
          Key: 'Date.now() + file.name' /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        function(err, data) {
          console.log(err || data)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
