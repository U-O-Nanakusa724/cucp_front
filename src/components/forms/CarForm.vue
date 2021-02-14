<template>
   <div class="car">

   <el-button size="mini"
              type="primary"
              icon="el-icon-edit"
              round @click="editCar()"></el-button>

   <el-dialog title="車種入力" :visible.sync="carFormVisible">
     <el-form :model="carform">
       <el-form-item label="車種コード" :label-width="formLabelWidth">
         <el-input v-model="carform.code" autocomplete="off" placeholder="必須項目"></el-input>
       </el-form-item>
       <el-form-item label="車種名" :label-width="formLabelWidth">
         <el-input v-model="carform.name" autocomplete="off"></el-input>
       </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
       <el-button @click="carFormVisible = false">キャンセル</el-button>
       <el-button type="primary" @click="putCar(carform)">決定</el-button>
     </span>
   </el-dialog>
   </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
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
    },
    data() {
      return {
        carFormVisible: false,
        carform: {
          id: this.id,
          code: this.code,
          name: this.name
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      editCar: async function () {
        this.carFormVisible = true;
      },
      putCar: async function(carform) {
        await axios.put('http://localhost:8080/v1/cars/' + carform.id + '/update', carform)
        this.carFormVisible = false
        this.$emit("refresh")
        this.$message({
          showClose: true,
          message: 'レコードを編集しました',
          type: 'success'
        })
      }
    }
  }
</script>