<template>
   <div class="carDetail">
      <el-dialog title="車種詳細登録" :visible.sync="createFormVisible" :before-close="alert">
        <el-form :model="carDetailForm">
          <el-form-item label="XXXX" :label-width="formLabelWidth">
            <el-input v-model="carDetailForm.code" autocomplete="off" placeholder="必須項目"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel()">キャンセル</el-button>
          <el-button type="primary">決定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="車種詳細編集" :visible.sync="editFormVisible" :before-close="alert">
        <el-form :model="carDetailForm">
          <el-form-item label="XXXX" :label-width="formLabelWidth">
            <el-input v-model="carDetailForm.code" autocomplete="off" placeholder="必須項目"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alertVisible=true">キャンセル</el-button>
          <el-button type="primary">決定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="注意" :visible.sync="alertVisible">
        <span>内容が保存されませんがよろしいですか？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alertVisible=false">続ける</el-button>
          <el-button type="primary" @click="cancel()">決定</el-button>
        </span>
      </el-dialog>
   </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      carDetail: {
        id: {
          type: Number
        },
        code: {
          type: String,
          default: ''
        },
        name: {
          type: String,
          default: ''
        }
      }
    },
    data() {
      return {
        cars: [],
        stores: [],
        carDetailForm: {
          id: '',
          code: '',
          name: ''
        },
        formLabelWidth: '120px',
        createFormVisible: false,
        editFormVisible: false,
        alertVisible: false
      }
    },
    methods: {
      setup: async function () {
        const res = await axios.get('http://localhost:8080/v1/cars')
        this.cars = res.data.cars
      },
      createCarDetail: async function () {
        this.createFormVisible = true;
      },
      postCarDetail: async function(carDetailForm) {
        await axios.post('http://localhost:8080/v1/cardetails/create', carDetailForm)
        this.createFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'レコードを登録しました',
          type: 'success'
        })
      },
      editCarDetail: async function (carDetail) {
        this.editFormVisible = true;
        this.carDetailForm = carDetail
      },
      putCarDetail: async function(carDetailForm) {
        await axios.put('http://localhost:8080/v1/cardetails/' + carDetailForm.id + '/update', carDetailForm)
        this.editFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'レコードを編集しました',
          type: 'success'
        })
      },
      cancel: async function() {
      this.alertVisible = false
        this.createFormVisible = false
        this.editFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'キャンセルしました',
          type: 'warning'
        })
      },
      alert: async function() {
        this.alertVisible = true
      }
    }
  }
</script>