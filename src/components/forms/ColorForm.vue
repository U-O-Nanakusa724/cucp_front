<template>
  <div class="color">
    <el-dialog
      title="車体カラー登録"
      :visible.sync="createFormVisible"
      :before-close="alert"
    >
      <el-form :model="colorForm">
        <el-form-item label="色名" :label-width="formLabelWidth">
          <el-input v-model="colorForm.label" 
          autocomplete="off" 
          placeholder="必須項目">
          </el-input>
        </el-form-item>
        <el-form-item label="カラーコード" :label-width="formLabelWidth">
            <el-color-picker v-model="colorForm.color_code"></el-color-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">キャンセル</el-button>
        <el-button type="primary" @click="postColor(colorForm)">決定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="車体カラー編集"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="colorForm">
        <el-form-item label="色名" :label-width="formLabelWidth">
          <el-input v-model="colorForm.label" 
          autocomplete="off" 
          placeholder="必須項目">
          </el-input>
        </el-form-item>
        <el-form-item label="カラーコード" :label-width="formLabelWidth">
            <el-color-picker v-model="colorForm.color_code"></el-color-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="putColor(colorForm)">決定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="注意" :visible.sync="alertVisible">
      <span>内容が保存されませんがよろしいですか？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = false">続ける</el-button>
        <el-button type="primary" @click="cancel()">決定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      color_apiURL: process.env.VUE_APP_API_ENDPOINT + "colors",
      colorForm: {
        id: "",
        label: "",
        color_code: "",
      },
      formLabelWidth: "120px",
      createFormVisible: false,
      editFormVisible: false,
      alertVisible: false,
    };
  },
  methods: {
    createColor: async function () {
      this.createFormVisible = true;
    },
    postColor: async function (colorForm) {
      await axios.post(this.color_apiURL + "/create", colorForm);
      this.createFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを登録しました",
        type: "success",
      });
    },
    editColor: async function (color) {
      this.editFormVisible = true;
      this.colorForm = JSON.parse(JSON.stringify(color));
    },
    putColor: async function (colorForm) {
      await axios.put(this.color_apiURL + "/update", colorForm);
      this.editFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを編集しました",
        type: "success",
      });
    },
    cancel: async function () {
      this.alertVisible = false;
      this.createFormVisible = false;
      this.editFormVisible = false;
      this.formClear();
      this.$message({
        showClose: true,
        message: "キャンセルしました",
        type: "warning",
      });
    },
    alert: async function () {
      this.alertVisible = true;
    },
    formClear: async function () {
      this.colorForm = {
        id: "",
        label: "",
        color_code: "",
      }
    },
  },
};
</script>