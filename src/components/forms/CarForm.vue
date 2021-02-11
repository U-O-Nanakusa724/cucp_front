<template>
   <div class="car">

   <el-button size="mini"
              type="primary"
              icon="el-icon-edit"
              round @click="editCar()"></el-button>

   <el-dialog title="車種入力" :visible.sync="dialogFormVisible">
     <el-form :model="form">
       <el-form-item label="車種コード" :label-width="formLabelWidth">
         <el-input v-model="form.code" autocomplete="off" placeholder="必須項目"></el-input>
       </el-form-item>
       <el-form-item label="車種名" :label-width="formLabelWidth">
         <el-input v-model="form.name" autocomplete="off"></el-input>
       </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">キャンセル</el-button>
       <el-button type="primary" @click="dialogFormVisible = false">決定</el-button>
     </span>
   </el-dialog>
   </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          code: '',
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      editCar: async function () {
        this.dialogFormVisible = true;
      }
    }
  }


</script>