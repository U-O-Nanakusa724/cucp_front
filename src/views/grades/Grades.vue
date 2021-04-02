<template>
  <div class="grade">
    <GradeForm ref="GradeForm" @refresh="refresh" />

    <el-row>
      <el-col id="create">
        <el-button type="success" round @click="createGrade()"
          >新規作成</el-button
        >
        <el-button type="info" round @click="refresh()"
          >絞り込みクリア</el-button
        >
      </el-col>
      <el-col>
        <div style="margin-top: 15px">
          <el-select v-model="target" placeholder="車種">
            <el-option
              v-for="item in cars"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-success"
            @click="filterGrade()"
          ></el-button>
        </div>
      </el-col>
      <el-col :span="24" id="data">
        <el-card class="box-card">
          <div v-if="loading">
            <span>データ取得中...</span>
          </div>
          <div v-else>
            <el-table :data="filtered" style="width: 100%">
              <el-table-column
                fixed
                prop="grade"
                label="グレード"
                sortable
                width="150"
              />
              <el-table-column
                prop="car.name"
                label="車種名"
                sortable
                width="200"
              />
              <el-table-column
                fixed="right"
                prop="operation"
                label="編集"
                width="300"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    round
                    @click="editGrade(scope.row)"
                  />
                  <el-popconfirm
                    @confirm="deleteGrade(scope.row)"
                    confirm-button-text="削除"
                    confirm-button-type="danger"
                    cancel-button-text="キャンセル"
                    cancel-button-type="primary"
                    icon="el-icon-info"
                    icon-color="red"
                    title="削除してもよろしいですか？"
                  >
                    <el-button
                      slot="reference"
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      round
                    />
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import GradeForm from "../../components/forms/GradeForm.vue";

export default {
  components: {
    GradeForm,
  },
  data() {
    return {
      grade_apiURL: process.env.VUE_APP_API_ENDPOINT + "grades",
      car_apiURL: process.env.VUE_APP_API_ENDPOINT + "cars",
      cars: [],
      grades: [],
      filtered: [],
      target: "",
      loading: true,
    };
  },
  created: async function () {
    const car_res = await axios.get(this.car_apiURL);
    this.cars = car_res.data.cars;
    await this.refresh();
  },
  methods: {
    refresh: async function () {
      this.loading = true;
      const res = await axios.get(this.grade_apiURL);
      this.grades = res.data.grades;
      this.filtered = res.data.grades;
      this.target = "";
      this.loading = false;
    },
    filterGrade: async function () {
      this.filtered = this.grades.filter(
        (grade) => grade.car.name == this.target
      );
    },
    createGrade: async function () {
      this.$refs.GradeForm.createGrade();
    },
    editGrade: function (grade) {
      this.$refs.GradeForm.editGrade(grade);
    },
    deleteGrade: async function (row) {
      await axios.delete(this.grade_apiURL + "/" + row.grade_id + "/delete");
      await this.refresh();
      this.$message({
        showClose: true,
        message: "レコードを削除しました",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#create {
  text-align: right;
}

#data {
  text-align: center;
}
</style>