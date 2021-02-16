<template>
    <div class="cardetail">
    <el-row>
        <el-col id="create">
            <el-button type="success" round>新規作成</el-button>
            <el-button type="info" round @click="refresh()">検索クリア</el-button>
        </el-col>
        <el-col>
            <div style="margin-top: 15px;">

            <el-select v-model="car" placeholder="車種絞り込み">
                <el-option v-for="car in cars"
                    :key="car.id"
                    :label="car.code"
                    :value="car">
                </el-option>
                </el-select>
            <el-button slot="append" icon="el-icon-search" @click="filterCarDetail()"></el-button>

            </div>
        </el-col>
        <el-col :span="24" id="data">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>車種詳細一覧</span>
                </div>
                <el-table
                        :data="carDetails"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="car.code"
                            label="車種コード"
                            sortable
                            width="150"/>
                    <el-table-column
                            prop="color"
                            label="色"
                            width="100"/>
                    <el-table-column
                            prop="distance"
                            label="距離"
                            sortable
                            width="100"/>
                    <el-table-column
                            prop="mission"
                            label="ミッション"
                            width="100"/>
                    <el-table-column
                            prop="model_year"
                            label="年式"
                            sortable
                            width="100"/>
                    <el-table-column
                            prop="note"
                            label="備考"
                            width="200"/>
                    <el-table-column
                            fixed="right"
                            prop="operation"
                            label="編集"
                            width="200"
                            align="center">

                                <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                round
                                />
                                <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                round
                                />

                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    components: {

    },
    data () {
      return {
        cars: [],
        carDetails: [],
        car: ''
      }
    },
    created: async function () {
      await this.refresh()
    },
    methods: {
      refresh: async function () {
        const car_res = await axios.get('http://localhost:8080/v1/cars')
        this.cars = car_res.data.cars
        const res = await axios.get('http://localhost:8080/v1/cardetails')
        this.carDetails = res.data.carDetails
      },
      filterCarDetail: async function() {
        console.log(this.car)
      }
    }
  }
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