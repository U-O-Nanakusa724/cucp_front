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
                <el-popconfirm
                  @confirm="deleteStore(scope.row)"
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
import StoreForm from "../../components/forms/StoreForm.vue";

export default {
  components: {
    StoreForm,
  },
  data() {
    return {
      store_apiURL: process.env.VUE_APP_API_ENDPOINT + "stores",
      keyword: "",
      stores: [],
    };
  },
  created: async function () {
    await this.refresh();
  },
  methods: {
    refresh: async function () {
      const res = await axios.get(this.store_apiURL);
      this.stores = res.data.stores;
    },
    createStore: async function () {
      this.$refs.StoreForm.createStore();
    },
    editStore: async function (stores) {
      this.$refs.StoreForm.editStore(stores);
    },
    deleteStore: async function (row) {
      await axios.delete(this.store_apiURL + "/" + row.id + "/delete");
      await this.refresh();
      this.$message({
        showClose: true,
        message: "レコードを削除しました",
        type: "success",
      });
    },
    searchStore: async function () {
      const res = await axios.get(
        this.store_apiURL + "/search?keyword=" + this.keyword
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