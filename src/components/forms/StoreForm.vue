<template>
  <div class="store">
    <el-dialog
      title="販売店登録"
      :visible.sync="createFormVisible"
      :before-close="alert"
    >
      <el-form :model="storeForm">
        <el-form-item label="販売店名" :label-width="formLabelWidth">
          <el-input
            v-model="storeForm.name"
            autocomplete="off"
            placeholder="必須項目"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">キャンセル</el-button>
        <el-button type="primary" @click="postStore(storeForm)">決定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="販売店編集"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="storeForm">
        <el-form-item label="販売店名" :label-width="formLabelWidth">
          <el-input
            v-model="storeForm.name"
            autocomplete="off"
            placeholder="必須項目"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="putStore(storeForm)">決定</el-button>
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
      storeForm: {
        id: "",
        name: "",
      },
      formLabelWidth: "120px",
      createFormVisible: false,
      editFormVisible: false,
      alertVisible: false,
    };
  },
  methods: {
    createStore: async function () {
      this.createFormVisible = true;
    },
    postStore: async function (storeForm) {
      await axios.post("http://localhost:8080/v1/stores/create", storeForm);
      this.createFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを登録しました",
        type: "success",
      });
    },
    editStore: async function (stores) {
      this.editFormVisible = true;
      this.storeForm = stores;
    },
    putStore: async function (storeForm) {
      await axios.put("http://localhost:8080/v1/stores/update", storeForm);
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
      this.$emit("refresh");
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
      this.storeForm = {
        id: "",
        name: "",
      };
    },
  },
};
</script>