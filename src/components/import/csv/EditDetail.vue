<template>
  <div class="carDetail">
    <el-dialog
      title="取り込み前修正"
      :visible.sync="editFormVisible"
      :before-close="alert"
    >
      <el-form :model="carDetailForm">
        <el-form-item label="グレード" :label-width="formLabelWidth">
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
          <el-select
            v-model="carDetailForm.color.color_id"
            placeholder="車体カラー"
          >
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
        <el-form-item label="最終確認日" :label-width="formLabelWidth">
          <el-date-picker
            placeholder="YYYY/MM/DDで入力"
            v-model="carDetailForm.last_date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="価格" :label-width="formLabelWidth">
          <el-input
            v-model="carDetailForm.last_price"
            autocomplete="off"
            placeholder="64文字まで"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = true">キャンセル</el-button>
        <el-button type="primary" @click="finishEdit(carDetailForm)"
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今日",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
        ],
      },
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
        last_price: "",
        last_date: "",
      },
      index: "",
      formLabelWidth: "120px",
      createFormVisible: false,
      editFormVisible: false,
      alertVisible: false,
    };
  },
  created: async function () {
    const grades_res = await axios.get(this.grade_apiURL);
    this.grades = grades_res.data.grades;
    const stores_res = await axios.get(this.store_apiURL);
    this.stores = stores_res.data.stores;
    const colors_res = await axios.get(this.color_apiURL);
    this.colors = colors_res.data.colors;
  },

  methods: {
    editDetail: async function (index, carDetail) {
      this.index = index;
      this.editFormVisible = true;
      this.carDetailForm = JSON.parse(JSON.stringify(carDetail));
    },
    finishEdit: async function (carDetailForm) {
      if (carDetailForm.detail_id == null) {
        carDetailForm.detail_id = 0;
      }
      carDetailForm.grade = this.grades.find(
        (grade) => grade.grade_id == carDetailForm.grade.grade_id
      );
      carDetailForm.store = this.stores.find(
        (store) => store.store_id == carDetailForm.store.store_id
      );
      carDetailForm.color = this.colors.find(
        (color) => color.color_id == carDetailForm.color.color_id
      );
      this.editFormVisible = false;
      this.formClear();
      this.$emit("finishEditing", this.index, carDetailForm);
    },
    cancel: async function () {
      this.alertVisible = false;
      this.createFormVisible = false;
      this.editFormVisible = false;
      this.formClear();
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
        prices: [],
      };
    },
  },
};
</script>