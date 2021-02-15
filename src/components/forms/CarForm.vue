<template>
   <div class="car">

   <el-dialog title="車種登録" :visible.sync="createFormVisible">
     <el-form :model="carform">
       <el-form-item label="車種コード" :label-width="formLabelWidth">
         <el-input v-model="carform.code" autocomplete="off" placeholder="必須項目"></el-input>
       </el-form-item>
       <el-form-item label="車種名" :label-width="formLabelWidth">
         <el-input v-model="carform.name" autocomplete="off"></el-input>
       </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
       <el-button @click="cancel()">キャンセル</el-button>
       <el-button type="primary" @click="postCar(carform)">決定</el-button>
     </span>
   </el-dialog>

   <el-dialog title="車種編集" :visible.sync="editFormVisible">
     <el-form :model="carform">
       <el-form-item label="車種コード" :label-width="formLabelWidth">
         <el-input v-model="carform.code" autocomplete="off" placeholder="必須項目"></el-input>
       </el-form-item>
       <el-form-item label="車種名" :label-width="formLabelWidth">
         <el-input v-model="carform.name" autocomplete="off"></el-input>
       </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
       <el-button @click="cancel()">キャンセル</el-button>
       <el-button type="primary" @click="putCar(carform)">決定</el-button>
     </span>
   </el-dialog>
   </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      car: {
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
        carform: {
          id: '',
          code: '',
          name: ''
        },
        formLabelWidth: '120px',
        createFormVisible: false,
        editFormVisible: false,
      }
    },
    methods: {
      createCar: async function () {
         this.createFormVisible = true;
      },
      postCar: async function(carform) {
        await axios.post('http://localhost:8080/v1/cars/create', carform)
        this.createFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'レコードを登録しました',
          type: 'success'
        })
      },
      editCar: async function (car) {
        this.editFormVisible = true;
        this.carform = car
      },
      putCar: async function(carform) {
        await axios.put('http://localhost:8080/v1/cars/' + carform.id + '/update', carform)
        this.editFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'レコードを編集しました',
          type: 'success'
        })
      },
      cancel: async function() {
        this.createFormVisible = false
        this.editFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'キャンセルしました',
          type: 'warning'
        })
      }
    }
  }
</script>