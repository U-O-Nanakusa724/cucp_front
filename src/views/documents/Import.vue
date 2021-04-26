<template>
  <div id="importContainer">
    <el-row>
      <el-col id="subheader">
        <el-popconfirm
          @confirm="destroyData()"
          confirm-button-text="リセット"
          confirm-button-type="danger"
          cancel-button-text="取消"
          cancel-button-type="primary"
          icon="el-icon-info"
          icon-color="red"
          title="保存せずにリセットしますがよろしいですか？"
        >
          <el-button
            slot="reference"
            size="mini"
            type="info"
            icon="el-icon-delete"
            round
            >リセット
          </el-button>
        </el-popconfirm>
      </el-col>

      <div v-if="viewUploadButton"><Upload @setData="setData" /></div>
      <div v-else>
        <ConfirmDetail v-bind:new_details="data.new_details" @saveData="destroyData"/>
        <ConfirmCar v-bind:new_cars="data.new_cars" />
        <ConfirmGrade v-bind:new_grades="data.new_grades" />
        <ConfirmStore v-bind:new_stores="data.new_stores" />
        <ConfirmColor v-bind:new_colors="data.new_colors" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Upload from "../../components/import/Upload.vue";
import ConfirmCar from "../../components/import/csv/ConfirmCar.vue";
import ConfirmGrade from "../../components/import/csv/ConfirmGrade.vue";
import ConfirmStore from "../../components/import/csv/ConfirmStore.vue";
import ConfirmColor from "../../components/import/csv/ConfirmColor.vue";
import ConfirmDetail from "../../components/import/csv/ConfirmDetail.vue";

export default {
  components: {
    Upload,
    ConfirmCar,
    ConfirmGrade,
    ConfirmStore,
    ConfirmColor,
    ConfirmDetail
  },
  data() {
    return {
      data: {
        new_cars: [],
        new_grades: [],
        new_stores: [],
        new_colors: [],
        new_details: [],
      },
      viewUploadButton: true,
    };
  },
  methods: {
    setData: function (data) {
      this.data = data;
      this.viewUploadButton = false;
    },
    destroyData: function () {
      this.data = {
        new_cars: [],
        new_grades: [],
        new_stores: [],
        new_colors: [],
        new_details: [],
      };
      this.viewUploadButton = true;
    },
  },
};
</script>

<style lang="scss">
.el-select .el-input {
  width: 110px;
}

#fileUpload {
  text-align: center;
}

#subheader {
  text-align: right;
}

#data {
  text-align: center;
}
</style>