<template>
  <div class="store">
    <StoreForm ref="StoreForm" @refresh="refresh" />

    <el-row>
      <el-col id="create">
        <el-button type="success" round @click="createStore()"
          >新規作成</el-button
        >
        <el-button type="info" round @click="refresh()">検索クリア</el-button>
      </el-col>
      <el-col>
        <div style="margin-top: 15px">
          <el-input placeholder="キーワードを入力" v-model="keyword">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchStore()"
            ></el-button>
          </el-input>
        </div>
      </el-col>

      <el-col :span="24" id="data">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>販売店一覧</span>
          </div>
          <el-table :data="stores" style="width: 100%">
            <el-table-column prop="name" label="販売店名" width="300" />
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
                  @click="editStore(scope.row)"
                />
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  round
                  @click="deleteStore(scope.row)"
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
import StoreForm from "../components/forms/StoreForm.vue";

export default {
  components: {
    StoreForm,
  },
  data() {
    return {
      keyword: "",
      stores: [],
    };
  },
  created: async function () {
    await this.refresh();
  },
  methods: {
    refresh: async function () {
      const res = await axios.get("http://localhost:8080/v1/stores");
      this.stores = res.data.stores;
    },
    createStore: async function () {
      this.$refs.StoreForm.createStore();
    },
    editStore: async function (stores) {
      this.$refs.StoreForm.editStore(stores);
    },
    deleteStore: async function (row) {
      if (confirm("削除してもよろしいですか?")) {
        await axios.delete(
          "http://localhost:8080/v1/stores/" + row.id + "/delete"
        );
        await this.refresh();
        this.$message({
          showClose: true,
          message: "レコードを削除しました",
          type: "success",
        });
      }
    },
    searchStore: async function () {
      const res = await axios.get(
        "http://localhost:8080/v1/stores/search?keyword=" + this.keyword
      );
      this.stores = res.data.stores;
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