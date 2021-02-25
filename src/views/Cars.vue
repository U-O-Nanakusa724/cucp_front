<template>
  <div class="car">
    <CarForm ref="CarForm" @refresh="refresh" />

    <el-row>
      <el-col id="create">
        <el-button type="success" round @click="createCar()"
          >新規作成</el-button
        >
        <el-button type="info" round @click="refresh()">検索クリア</el-button>
      </el-col>
      <el-col>
        <div style="margin-top: 15px">
          <el-input placeholder="キーワードを入力" v-model="keyword">
            <el-select v-model="select" slot="prepend" placeholder="検索条件">
              <el-option label="code" value="code"></el-option>
              <el-option label="name" value="name"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchCar()"
            ></el-button>
          </el-input>
        </div>
      </el-col>

      <el-col :span="24" id="data">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>車種一覧</span>
          </div>
          <el-table :data="cars" style="width: 100%">
            <el-table-column fixed prop="code" label="車種コード" width="300" />
            <el-table-column prop="name" label="車種名" width="300" />
            <el-table-column
              prop="operation"
              label="編集"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  round
                  @click="editCar(scope.row)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  round
                  @click="deleteCar(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import CarForm from "../components/forms/CarForm.vue";

export default {
  components: {
    CarForm,
  },
  data() {
    return {
      car_apiURL: process.env.VUE_APP_API_ENDPOINT + "cars",
      select: "",
      keyword: "",
      cars: [],
    };
  },
  created: async function () {
    await this.refresh();
  },
  methods: {
    refresh: async function () {
      const res = await axios.get(this.car_apiURL);
      this.cars = res.data.cars;
    },
    createCar: async function () {
      this.$refs.CarForm.createCar();
    },
    editCar: async function (car) {
      this.$refs.CarForm.editCar(car);
    },
    deleteCar: async function (row) {
      if (confirm("削除してもよろしいですか?")) {
        await axios.delete(
          this.car_apiURL + "/" + row.id + "/delete"
        );
        await this.refresh();
        this.$message({
          showClose: true,
          message: "レコードを削除しました",
          type: "success",
        });
      }
    },
    searchCar: async function () {
      var request = "select=" + this.select + "&keyword=" + this.keyword;
      const res = await axios.get(
        this.apiURL + "/search?" + request
      );
      this.cars = res.data.cars;
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