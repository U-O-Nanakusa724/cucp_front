<template>
    <div class="cardetail">
    <CarDetailForm ref="CarDetailForm" @refresh="refresh"/>

    <el-row>
        <el-col id="create">
            <el-button type="success" round @click="createCarDetail()">新規作成</el-button>
            <el-button type="info" round @click="refresh()">絞り込みクリア</el-button>
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

                <div v-if="loading">
                    <span>データ取得中...</span>
                </div>
                <div v-else>
                <el-table
                        :data="list"
                        style="width: 100%">
                    <el-table-column type="expand" fixed>
                       <template slot-scope="props">
                          <p>車種名 : {{ props.row.car.name }}</p>
                          <p>備考 : {{ props.row.note }}</p>
                          <p>URL : {{ props.row.url }}<el-button slot="reference" @click="openURL(props.row.url)">開く</el-button></p>
                          <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                            <el-table :data="props.row.prices">
                              <el-table-column width="150" property="date" label="確認日" sortable></el-table-column>
                              <el-table-column width="200" property="price" label="価格(万円)" sortable></el-table-column>
                            </el-table>
                            <el-button slot="reference">販売レコード一覧</el-button>
                          </el-popover>
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
                            prop="prices[0].date"
                            label="最新確認日"
                            sortable
                            width="150"/>
                    <el-table-column
                            prop="prices[0].price"
                            label="価格"
                            sortable
                            width="100"/>
                    <el-table-column
                            fixed="right"
                            prop="operation"
                            label="編集"
                            width="200"
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                icon="el-icon-edit"
                                round
                                @click="editCarDetail(scope.row)"/>
                                <el-button
                                size="mini"
                                type="danger"
                                icon="el-icon-delete"
                                round
                                @click="deleteCarDetail(scope.row)"/>
                            </template>
                    </el-table-column>
                </el-table>
                </div>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script>
  import axios from 'axios'
  import CarDetailForm from '../components/forms/CarDetailForm.vue'

  export default {
    components: {
       CarDetailForm
    },
    data () {
      return {
        cars: [],
        stores: [],
        carDetails: [],
        list: [],
        target: '',
        loading: true
      }
    },
    created: async function () {
      const car_res = await axios.get('http://localhost:8080/v1/cars')
      this.cars = car_res.data.cars
      await this.refresh()
    },
    methods: {
      refresh: async function () {
        this.loading = true
        const res = await axios.get('http://localhost:8080/v1/cardetails')
        this.master = res.data.carDetails
        this.carDetails = res.data.carDetails
        this.list = res.data.carDetails
        this.target = ''
        this.loading = false
      },
      filterCarDetail: async function() {
         this.list = this.carDetails.filter(detail => detail.car.code == this.target)
         console.log(this.list)
      },
      createCarDetail: async function() {
         this.$refs.CarDetailForm.createCarDetail()
      },
      editCarDetail: function(car) {
         this.$refs.CarDetailForm.editCarDetail(car)
      },
      deleteCarDetail: async function (row) {
        if(confirm('削除してもよろしいですか?')) {
          await axios.delete('http://localhost:8080/v1/cardetails/' + row.id + '/delete')
          await this.refresh()
          this.$message({
            showClose: true,
            message: 'レコードを削除しました',
            type: 'success'
          })
        }
      },
      openURL: async function(url) {
        window.open(url, '_blank')
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