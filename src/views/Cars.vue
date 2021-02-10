<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>車種一覧</span>
                </div>
                <el-table
                        :data="cars"
                        style="width: 100%">
                    <el-table-column
                            prop="code"
                            label="車種コード"
                            width="300"/>
                    <el-table-column
                            prop="name"
                            label="車種名"
                            width="300"/>
                    <el-table-column
                            prop="operation"
                            label="編集"
                            width="200"
                            align="center">
                            <template>
                                <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                round
                                @click="editCar(scope.row.id)"/>
                            </template>
                    </el-table-column>
                    <el-table-column
                            prop="operation"
                            label="削除"
                            width="200"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                round
                                @click="deleteCar(scope.row.id)"/>
                            </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Cars",
    data () {
      return {
        cars: []
      }
    },
    created: async function () {
      await this.refresh()
    },
    methods: {
      refresh: async function () {
        const res = await axios.get('http://localhost:8080/v1/cars')
        this.cars = res.data.cars
        console.info(this.cars)
      },
      editCar: function (id) {
        console.log(id)
      },
      deleteCar: async function (id) {
        if(confirm('削除してもよろしいですか?')) {
          await axios.delete('http://localhost:8080/v1/cars/' + id + '/delete')
          await this.refresh()
          this.$message({
            showClose: true,
            message: 'レコードを削除しました',
            type: 'success'
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../public/css/base";
</style>