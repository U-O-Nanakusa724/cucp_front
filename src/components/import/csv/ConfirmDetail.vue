<template>
  <el-card class="box-card">
    <EditDetail ref="EditDetail" @finishEditing="finishEditing" />
    <div id="detail_card_header" slot="header">
      <span>詳細情報の登録確認・編集</span>
      <el-button
        style="float: right"
        type="success"
        round
        @click="saveCarDetail()"
      >
        登録する
      </el-button>
    </div>
    <el-table :data="new_details" style="width: 100%">
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <p>車種名 : {{ props.row.grade.car.name }}</p>
          <p>備考 : {{ props.row.note }}</p>
          <p>URL : {{ props.row.url }}</p>
        </template>
      </el-table-column>
      <el-table-column fixed prop="detail_id" label="" width="80">
        <template slot-scope="scope">
          <StatusIcon :detail_id="scope.row.detail_id" />
        </template>
      </el-table-column>
      <el-table-column prop="grade.grade" label="グレード" width="150" />
      <el-table-column prop="store.name" label="販売店" width="200" />
      <el-table-column prop="color" label="色" width="100">
        <template slot-scope="scope">
          <ColorIcon
            :id="scope.row.color.id"
            :label="scope.row.color.label"
            :color_code="scope.row.color.color_code"
          />
        </template>
      </el-table-column>
      <el-table-column prop="distance" label="距離" width="100" />
      <el-table-column prop="mission" label="ミッション" width="100" />
      <el-table-column prop="model_year" label="年式" width="100" />
      <el-table-column prop="last_date" label="最新確認日" width="150" />
      <el-table-column prop="last_price" label="価格" width="80" />
      <el-table-column
        fixed="right"
        prop="operation"
        label="編集"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            round
            @click="editDetail(scope.$index, scope.row)"
          />
          <el-popconfirm
            @confirm="deleteDetail(scope.row)"
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
</template>

<script>
import StatusIcon from "../../StatusIcon";
import ColorIcon from "../../ColorIcon";
import EditDetail from "./EditDetail";
import axios from "axios";

export default {
  components: {
    StatusIcon,
    ColorIcon,
    EditDetail,
  },
  props: ["new_details"],
  data() {
    return {
      file_apiURL: process.env.VUE_APP_API_ENDPOINT + "files",
      request: {
        car_details: [],
      },
    };
  },
  methods: {
    saveCarDetail: async function () {
      for (let element of this.new_details) {
        element.grade_id = element.grade.grade_id;
        element.store_id = element.store.store_id;
        element.color_id = element.color.color_id;
      }
      this.request.car_details = this.new_details;
      console.log(this.request);
      await axios.post(this.file_apiURL + "/saveCSV", this.request);
      this.$message({
        showClose: true,
        message: "登録完了しました。詳細からご確認ください。",
        type: "success",
      });
      this.$emit("saveData")
    },
    editDetail: function (index, carDetail) {
      this.$refs.EditDetail.editDetail(index, carDetail);
    },
    finishEditing: function (index, edited) {
      console.log(edited);
      this.new_details.splice(index, 1, edited);
    },
  },
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#detail_card_header {
  text-align: left;
}
</style>