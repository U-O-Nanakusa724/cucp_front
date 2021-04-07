<template>
  <div class="color">
    <ColorForm ref="ColorForm" @refresh="refresh" />

    <el-row>
      <el-col id="create">
        <el-button type="success" round @click="createColor()"
          >新規作成</el-button
        >
      </el-col>

      <el-col :span="24" id="data">
        <el-card class="box-card">
          <el-table :data="colors" style="width: 100%">
            <el-table-column prop="label" label="色名" width="100" />
            <el-table-column prop="color_code" label="カラーコード" width="150"/>

            <el-table-column prop="color" label="見た目の色" width="100">
                <template slot-scope="scope">
                  <ColorIcon 
                  :id = "scope.row.id"
                  :label= "scope.row.label"
                  :color_code= "scope.row.color_code"/>
                </template>
              </el-table-column>   

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
                  @click="editColor(scope.row)"
                />
                <el-popconfirm
                  @confirm="deleteColor(scope.row)"
                  confirm-button-text="削除"
                  confirm-button-type="danger"
                  cancel-button-text="取消"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import ColorForm from "../../components/forms/ColorForm.vue";
import ColorIcon from "../../components/ColorIcon.vue";

export default {
  components: {
    ColorForm,
    ColorIcon
  },
  data() {
    return {
      color_apiURL: process.env.VUE_APP_API_ENDPOINT + "colors",
      keyword: "",
      colors: [],
    };
  },
  created: async function () {
    await this.refresh();
  },
  methods: {
    refresh: async function () {
      const res = await axios.get(this.color_apiURL);
      this.colors = res.data.colors;
    },
    createColor: async function () {
      this.$refs.ColorForm.createColor();
    },
    editColor: async function (color) {
      this.$refs.ColorForm.editColor(color);
    },
    deleteColor: async function (row) {
      await axios.delete(this.color_apiURL + "/" + row.color_id + "/delete");
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