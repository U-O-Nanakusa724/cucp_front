<template>
  <div class="carDetail">
    <el-dialog
      title="車種詳細登録"
      :visible.sync="createFormVisible"
      :before-close="alert"
    >
      <el-form :model="carDetailForm">
        <el-form-item label="グレード" :label-width="formLabelWidth">
          <el-select
            v-model="carDetailForm.grade.id"
            placeholder="グレード、必須項目"
          >
            <el-option
              v-for="item in grades"
              :key="item.grade_id"
              :label="item.grade"
              :value="item.grade_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="販売店" :label-width="formLabelWidth">
          <el-select
            v-model="carDetailForm.store.id"
            placeholder="販売店、必須項目"
          >
            <el-option
              v-for="item in stores"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="色" :label-width="formLabelWidth">
          <el-select v-model="carDetailForm.color.id" placeholder="車体カラー">
            <el-option
              v-for="item in colors"
              :key="item.color_id"
              :label="item.label"
              :value="item.color_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="走行距離" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.distance"
            autocomplete="off"
            placeholder="16文字まで(文字可)"
          ></el-input>
        </el-form-item>

        <el-form-item label="ミッション" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.mission"
            autocomplete="off"
            placeholder="8文字まで"
          ></el-input>
        </el-form-item>

        <el-form-item label="年式" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.model_year"
            autocomplete="off"
            placeholder="8文字まで"
          ></el-input>
        </el-form-item>

        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.url"
            autocomplete="off"
            placeholder="255文字まで"
          ></el-input>
        </el-form-item>

        <el-form-item label="備考" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.note"
            autocomplete="off"
            placeholder="64文字まで"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">キャンセル</el-button>
        <el-button type="primary" @click="postCarDetail(carDetailForm)"
          >決定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="車種詳細編集"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="carDetailForm">
        <el-form-item label="車種" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.grade.grade"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="販売店" :label-width="formLabelWidth">
          <el-select
            v-model="carDetailForm.store.id"
            placeholder="販売店、必須項目"
          >
            <el-option
              v-for="item in stores"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="色" :label-width="formLabelWidth">
          <el-select v-model="carDetailForm.color.color_id" placeholder="車体カラー">
            <el-option
              v-for="item in colors"
              :key="item.color_id"
              :label="item.label"
              :value="item.color_id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="走行距離" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.distance"
            autocomplete="off"
            placeholder="小数入力"
          ></el-input>
        </el-form-item>

        <el-form-item label="ミッション" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.mission"
            autocomplete="off"
            placeholder="8文字まで"
          ></el-input>
        </el-form-item>

        <el-form-item label="年式" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.model_year"
            autocomplete="off"
            placeholder="8文字まで"
          ></el-input>
        </el-form-item>

        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.url"
            autocomplete="off"
            placeholder="255文字まで"
          ></el-input>
        </el-form-item>

        <el-form-item label="備考" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.note"
            autocomplete="off"
            placeholder="64文字まで"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="putCarDetail(carDetailForm)"
          >決定</el-button
        >
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
      detail_apiURL: process.env.VUE_APP_API_ENDPOINT + "cardetails",
      grade_apiURL: process.env.VUE_APP_API_ENDPOINT + "grades",
      store_apiURL: process.env.VUE_APP_API_ENDPOINT + "stores",
      color_apiURL: process.env.VUE_APP_API_ENDPOINT + "colors",
      grades: [],
      stores: [],
      colors: [],
      carDetailForm: {
        detail_id: "",
        grade: {
          id: "",
          grade: "",
        },
        store: {
          id: "",
          name: "",
        },
        color: {
          id: "",
          label: "",
        },
        distance: "",
        mission: "",
        model_year: "",
        url: "",
        note: "",
      },
      formLabelWidth: "120px",
      createFormVisible: false,
      editFormVisible: false,
      alertVisible: false,
    };
  },
  methods: {
    setup: async function () {
      const grades_res = await axios.get(this.grade_apiURL);
      this.grades = grades_res.data.grades;
      const stores_res = await axios.get(this.store_apiURL);
      this.stores = stores_res.data.stores;
      const colors_res = await axios.get(this.color_apiURL);
      this.colors = colors_res.data.colors;
    },
    createCarDetail: async function () {
      this.createFormVisible = true;
      this.setup();
    },
    postCarDetail: async function (carDetailForm) {
      carDetailForm.grade_id = carDetailForm.grade.id;
      carDetailForm.store_id = carDetailForm.store.id;
      carDetailForm.color_id = carDetailForm.color.id;
      await axios.post(this.detail_apiURL + "/create", carDetailForm);
      this.createFormVisible = false;
      this.formClear();
      this.$emit("refresh");
      this.$message({
        showClose: true,
        message: "レコードを登録しました",
        type: "success",
      });
    },
    editCarDetail: async function (carDetail) {
      this.editFormVisible = true;
      this.carDetailForm = JSON.parse(JSON.stringify(carDetail));
      this.setup();
    },
    putCarDetail: async function (carDetailForm) {
      carDetailForm.grade_id = carDetailForm.grade.grade_id;
      carDetailForm.store_id = carDetailForm.store.id;
      carDetailForm.color_id = carDetailForm.color.color_id;
      await axios.put(this.detail_apiURL + "/update", carDetailForm);
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
      this.carDetailForm = {
        detail_id: "",
        grade: {
          id: "",
          grade: "",
        },
        store: {
          id: "",
          name: "",
        },
        color: {
          id: "",
          label: "",
        },
        distance: "",
        mission: "",
        model_year: "",
        url: "",
        note: "",
      };
    },
  },
};
</script>