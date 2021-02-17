<template>
    <div class="cardetail">
    <el-row>
        <el-col id="create">
            <el-button type="success" round>新規作成</el-button>
            <el-button type="info" round @click="refresh()">検索クリア</el-button>
        </el-col>
        <el-col>
            <div style="margin-top: 15px;">

            <el-select v-model="target" placeholder="車種">
                <el-option v-for="item in cars"
                    :key="item.id"
                    :label="item.code"
                    :value="item.code">
                </el-option>
                </el-select>
            <el-button slot="append" icon="el-icon-success" @click="filterCarDetail()"></el-button>

            </div>
        </el-col>
        <el-col :span="24" id="data">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>車種詳細一覧</span>
                </div>
                <el-table
                        :data="list"
                        style="width: 100%">
                    <el-table-column type="expand" fixed>
                       <template slot-scope="props">
                         <p>車種名: {{ props.row.car.name }}</p>
                         <p>URL: {{ props.row.url }}</p>
                         <p>備考: {{ props.row.note }}</p>
                       </template>
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="car.code"
                            label="車種コード"
                            sortable
                            width="150"/>
                    <el-table-column
                            prop="store.name"
                            label="販売店"
                            sortable
                            width="200"/>
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
                            prop=""
                            label="最新販売日"
                            sortable
                            width="150"/>
                    <el-table-column
                            prop=""
                            label="販売価格"
                            sortable
                            width="100"/>
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
        list: [],
        target: ''
      }
    },
    created: async function () {
      const car_res = await axios.get('http://localhost:8080/v1/cars')
      this.cars = car_res.data.cars
      await this.refresh()
    },
    methods: {
      refresh: async function () {
        const res = await axios.get('http://localhost:8080/v1/cardetails')
        this.carDetails = res.data.carDetails
        this.list = res.data.carDetails
        this.target = ''
      },
      filterCarDetail: async function() {
         this.list = this.carDetails.filter(detail => detail.car.code == this.target)
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