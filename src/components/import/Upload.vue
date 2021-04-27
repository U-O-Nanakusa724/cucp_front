<template>
  <div id="fileUpload">
    <el-upload
      class="upload"
      action=""
      :on-change="handleAdd"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="file"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary"
        >ファイルを選択してください</el-button
      >
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="csvUpload"
        >送信</el-button
      >
      <div slot="tip" class="el-upload__tip">
        ＊CSVファイル以外はアップロードしないでください。
      </div>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file_apiURL: process.env.VUE_APP_API_ENDPOINT + "files",
      fileList: [],
    };
  },
  methods: {
    csvUpload: async function () {
      let formData = new FormData();
      formData.append("csv", this.fileList[0].raw);
      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        this.file_apiURL + "/readCSV",
        formData,
        config
      );
      this.fileList = []
      this.$emit('setData', res.data);
    },
    // リストのバッテンを押下した時
    handleRemove: function (file, fileList) {
      this.fileList = fileList;
    },
    // ファイルを追加した時
    handleAdd: function (file, fileList) {
      this.fileList = fileList;
    },
  },
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#fileUpload {
  text-align: center;
}

#data {
  text-align: center;
}
</style>