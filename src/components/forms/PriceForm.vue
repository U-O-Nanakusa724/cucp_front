<template>
  <div class="price">
    <el-dialog
      title="価格登録"
      :visible.sync="createFormVisible"
      :before-close="alert"
    >
      <el-form :model="priceForm">
        <el-form-item label="確認日" :label-width="formLabelWidth">
          <el-input
            v-model="priceForm.date"
            autocomplete="off"
            placeholder="YYYY/MM/DDで入力"
          ></el-input>
        </el-form-item>
        <el-form-item label="価格" :label-width="formLabelWidth">
          <el-input v-model="priceForm.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">キャンセル</el-button>
        <el-button type="primary" @click="postPrice(priceForm)">決定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="価格編集"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="priceForm">
        <el-form-item label="確認日" :label-width="formLabelWidth">
          <el-input
            v-model="priceForm.date"
            autocomplete="off"
            placeholder="YYYY/MM/DDで入力"
          ></el-input>
        </el-form-item>
        <el-form-item label="価格" :label-width="formLabelWidth">
          <el-input v-model="priceForm.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="putPrice(priceForm)">決定</el-button>
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
      price_apiURL: process.env.VUE_APP_API_ENDPOINT + "price",
      priceForm: {
        price_id: "",
        detail_id: "",
        date: "",
        price: "",
      },
      formLabelWidth: "120px",
      createFormVisible: false,
      editFormVisible: false,
      alertVisible: false,
    };
  },
  methods: {
    createPrice: async function (detail_id) {
      this.createFormVisible = true;
      this.priceForm.detail_id = detail_id;
    },
    postPrice: async function (priceForm) {
      await axios.post(this.price_apiURL + "/create", priceForm);
      this.createFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを登録しました",
        type: "success",
      });
    },
    editPrice: async function (price) {
      this.editFormVisible = true;
      this.priceForm = price;
    },
    putPrice: async function (priceForm) {
      await axios.put(this.price_apiURL + "/update", priceForm);
      this.editFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを編集しました",
        type: "success",
      });
    },
    deletePrice: async function (price) {
      if (confirm("削除してもよろしいですか?")) {
        await axios.delete(this.price_apiURL + "/" + price.price_id + "/delete");
        this.formClear();
        this.$emit("refresh");
        this.$message({
          showClose: true,
          message: "レコードを削除しました",
          type: "success",
        });
      }
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
      this.priceForm = {
        id: "",
        detail: "",
        date: "",
        price: "",
      };
    },
  },
};
</script>