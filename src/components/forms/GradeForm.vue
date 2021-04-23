<template>
  <div class="grade">
    <el-dialog
      title="グレード登録"
      :visible.sync="createFormVisible"
      :before-close="alert"
    >
      <el-form :model="gradeForm">
        <el-form-item label="グレード" :label-width="formLabelWidth">
          <el-input
            v-model="gradeForm.grade"
            autocomplete="off"
            placeholder="必須項目"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="車種" :label-width="formLabelWidth">
          <el-select v-model="gradeForm.car.car_id" placeholder="車種、必須項目">
            <el-option
              v-for="item in cars"
              :key="item.car_id"
              :label="item.name"
              :value="item.car_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">キャンセル</el-button>
        <el-button type="primary" @click="postGrade(gradeForm)">決定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="グレード編集"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="gradeForm">
        <el-form-item label="車種名" :label-width="formLabelWidth">
          <el-input
            v-model="gradeForm.grade"
            autocomplete="off"
            placeholder="必須項目"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="車種" :label-width="formLabelWidth">
          <el-select v-model="gradeForm.car.car_id" placeholder="車種、必須項目">
            <el-option
              v-for="item in cars"
              :key="item.car_id"
              :label="item.name"
              :value="item.car_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="putGrade(gradeForm)">決定</el-button>
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
      grade_apiURL: process.env.VUE_APP_API_ENDPOINT + "grades",
      gradeForm: {
        grade_id: "",
        grade: "",
        car: {
          car_id: "",
          name: "",
        },
      },
      cars: [],
      formLabelWidth: "120px",
      createFormVisible: false,
      editFormVisible: false,
      alertVisible: false,
    };
  },
  methods: {
    setup: async function () {
      const cars_res = await axios.get(this.car_apiURL);
      this.cars = cars_res.data.cars;
    },
    createGrade: async function () {
      this.createFormVisible = true;
      this.setup();
    },
    postGrade: async function (gradeForm) {
      this.gradeForm.car_id = gradeForm.car.car_id;
      await axios.post(this.grade_apiURL + "/create", gradeForm);
      this.createFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを登録しました",
        type: "success",
      });
    },
    editGrade: async function (grade) {
      this.editFormVisible = true;
      this.gradeForm = JSON.parse(JSON.stringify(grade));
      this.setup();
    },
    putGrade: async function (gradeForm) {
      this.gradeForm.car_id = gradeForm.car.car_id;
      await axios.put(this.grade_apiURL + "/update", gradeForm);
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
      this.gradeForm = {
        grade_id: "",
        grade: "",
        car: {
          car_id: "",
          name: "",
        },
      };
    },
  },
};
</script>