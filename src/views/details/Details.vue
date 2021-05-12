<template>
  <div class="cardetail">
    <CarDetailForm ref="CarDetailForm" @refresh="filterCarDetail" />
    <PriceForm ref="PriceForm" @refresh="filterCarDetail" />

    <el-row>
      <el-col id="subheader">
        <div style="margin-top: 15px">
          <el-select v-model="target" placeholder="グレード、選択必須">
            <el-option
              v-for="item in grades"
              :key="item.grade_id"
              :label="item.grade"
              :value="item.grade_id"
            >
            </el-option>
          </el-select>
          <el-date-picker
            style="margin-left: 15px"
            placeholder="年式(~から)"
            v-model="start"
            type="year"
            format="yyyy"
            value-format="yyyy"
          >
          </el-date-picker>
          <span> ~ </span>
          <el-date-picker
            placeholder="年式(~まで)"
            v-model="end"
            type="year"
            format="yyyy"
            value-format="yyyy"
          >
          </el-date-picker>

          <el-button
            style="margin-left: 15px"
            slot="append"
            icon="el-icon-success"
            @click="filterCarDetail()"
            >表示</el-button
          >
          <el-button type="success" round @click="createCarDetail()"
            >新規作成</el-button
          >
          <el-button type="info" round @click="refresh()">リセット</el-button>
        </div>
      </el-col>
      <el-col :span="24" id="data">
        <div v-if="!execute">
          <span>グレードを選択してください。</span>
        </div>
        <div v-else>
          <el-card class="box-card">
            <el-table
              v-loading="loading"
              :data="carDetails"
              style="width: 100%"
            >
              <el-table-column type="expand" fixed>
                <template slot-scope="props">
                  <p>車種名 : {{ props.row.grade.car.name }}</p>
                  <p>備考 : {{ props.row.note }}</p>
                  <p>
                    URL : {{ props.row.url
                    }}<el-button
                      slot="reference"
                      @click="openURL(props.row.url)"
                      >開く</el-button
                    >
                  </p>
                  <el-popover placement="right" width="400" trigger="click">
                    <div style="text-align: right">
                      <el-button
                        size="mini"
                        type="success"
                        round
                        @click="createPrice(props.row.detail_id)"
                        >新規追加
                      </el-button>
                    </div>
                    <el-table :data="props.row.prices">
                      <el-table-column
                        width="120"
                        property="date"
                        label="確認日"
                        sortable
                      ></el-table-column>
                      <el-table-column
                        width="120"
                        property="price"
                        label="価格(万円)"
                        sortable
                      ></el-table-column>
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
                            @click="editPrice(scope.row)"
                          />
                          <el-popconfirm
                            @confirm="deletePrice(scope.row)"
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
                    <el-button slot="reference">販売レコード一覧</el-button>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                fixed
                prop="grade.grade"
                label="グレード"
                sortable
                width="150"
              />
              <el-table-column
                prop="store.name"
                label="販売店"
                sortable
                width="200"
              />
              <el-table-column prop="color" label="色" width="100">
                <template slot-scope="scope">
                  <ColorIcon
                    :id="scope.row.color.id"
                    :label="scope.row.color.label"
                    :color_code="scope.row.color.color_code"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="distance"
                label="距離"
                sortable
                width="100"
              />
              <el-table-column prop="mission" label="ミッション" width="100" />
              <el-table-column
                prop="model_year"
                label="年式"
                sortable
                width="100"
              />
              <el-table-column
                prop="prices[0].date"
                label="最新確認日"
                sortable
                width="150"
              />
              <el-table-column
                prop="prices[0].price"
                label="価格"
                sortable
                width="100"
              />
              <el-table-column
                fixed="right"
                prop="operation"
                label="編集"
                width="300"
                align="center"
              >
                <template slot-scope="scope">
                  <el-popconfirm
                    @confirm="setSoldFlag(scope.row)"
                    confirm-button-text="決定"
                    confirm-button-type="primary"
                    cancel-button-text="キャンセル"
                    cancel-button-type="text"
                    icon="el-icon-question"
                    icon-color="#f90"
                    title="成約済みにしますか？(一覧には表示されなくなります)"
                  >
                    <el-button
                      slot="reference"
                      size="mini"
                      type="warning"
                      icon="el-icon-s-flag"
                      round
                      >成約
                    </el-button>
                  </el-popconfirm>
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-edit"
                    round
                    @click="editCarDetail(scope.row)"
                  />
                  <el-popconfirm
                    @confirm="deleteCarDetail(scope.row)"
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
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import CarDetailForm from "../../components/forms/CarDetailForm.vue";
import PriceForm from "../../components/forms/PriceForm.vue";
import ColorIcon from "../../components/ColorIcon.vue";

export default {
  components: {
    CarDetailForm,
    PriceForm,
    ColorIcon,
  },
  data() {
    return {
      detail_apiURL: process.env.VUE_APP_API_ENDPOINT + "cardetails",
      grade_apiURL: process.env.VUE_APP_API_ENDPOINT + "grades",
      grades: [],
      carDetails: [],
      target: null,
      loading: false,
      execute: false,
      start: "",
      end: "",
    };
  },
  created: async function () {
    const grade_res = await axios.get(this.grade_apiURL);
    this.grades = grade_res.data.grades;
    this.carDetails = [];
    this.target = null;
  },
  methods: {
    refresh: async function () {
      this.carDetails = [];
      this.target = null;
      this.execute = false;
      this.start = "";
      this.end = "";
    },
    filterCarDetail: async function () {
      this.execute = true;
      this.loading = true;
      if(this.start === "") {
        this.start = "1900";
      }
      if(this.end === "") {
        this.end = "2100";
      }
      var url =
        this.detail_apiURL +
        "/filter?grade_id=" +
        this.target +
        "&start=" +
        this.start +
        "&end=" +
        this.end;
      const res = await axios.get(url);
      this.carDetails = res.data.carDetails;
      this.loading = false;
    },
    createCarDetail: async function () {
      this.$refs.CarDetailForm.createCarDetail();
    },
    editCarDetail: function (detail) {
      this.$refs.CarDetailForm.editCarDetail(detail);
    },
    deleteCarDetail: async function (row) {
      await axios.delete(this.detail_apiURL + "/" + row.detail_id + "/delete");
      await this.refresh();
      this.$message({
        showClose: true,
        message: "レコードを削除しました",
        type: "success",
      });
    },
    setSoldFlag: async function (row) {
      await axios.put(this.detail_apiURL + "/" + row.detail_id + "/sold");
      await this.refresh();
      this.$message({
        showClose: true,
        message: "成約済みにしました",
        type: "success",
      });
    },
    createPrice: function (detailId) {
      this.$refs.PriceForm.createPrice(detailId);
    },
    editPrice: function (price) {
      this.$refs.PriceForm.editPrice(price);
    },
    deletePrice: function (price) {
      this.$refs.PriceForm.deletePrice(price);
    },
    openURL: async function (url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 300px;
}

#subheader {
  text-align: right;
}

#data {
  margin-top: 10px;
  text-align: center;
}
</style>