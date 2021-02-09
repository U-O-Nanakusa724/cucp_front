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
                            prop="id"
                            label="ID"
                            width="300"/>
                    <el-table-column
                            prop="code"
                            label="車種コード"
                            width="300"/>
                    <el-table-column
                            prop="name"
                            label="車種名"
                            width="300"/>
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
      }
    }
  }
</script>

<style scoped>

</style>