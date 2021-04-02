<template>
  <div class="car">
    <el-dialog
      title="車種登録"
      :visible.sync="createFormVisible"
      :before-close="alert"
    >
      <el-form :model="carForm">
        <el-form-item label="車種名" :label-width="formLabelWidth">
          <el-input v-model="carForm.name" 
          autocomplete="off" 
          placeholder="必須項目">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">キャンセル</el-button>
        <el-button type="primary" @click="postCar(carForm)">決定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="車種編集"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="carForm">
        <el-form-item label="車種名" :label-width="formLabelWidth">
          <el-input v-model="carForm.name" 
          autocomplete="off" 
          placeholder="必須項目">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="putCar(carForm)">決定</el-button>
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
      car_apiURL: process.env.VUE_APP_API_ENDPOINT + "cars",
      carForm: {
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
    createCar: async function () {
      this.createFormVisible = true;
    },
    postCar: async function (carForm) {
      await axios.post(this.car_apiURL + "/create", carForm);
      this.createFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを登録しました",
        type: "success",
      });
    },
    editCar: async function (car) {
      this.editFormVisible = true;
      this.carForm = JSON.parse(JSON.stringify(car));
    },
    putCar: async function (carForm) {
      await axios.put(this.car_apiURL + "/update", carForm);
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
      this.carForm = {
        id: "",
        name: "",
      };
    },
  },
};
</script>