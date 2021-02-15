<template>
    <div class="car">

    <el-row>
        <el-col id="create">
            <el-button type="success">新規作成</el-button>
        </el-col>
        <el-col>
            <div style="margin-top: 15px;">
              <el-input placeholder="キーワードを入力" v-model="keyword">
                <el-select v-model="select" slot="prepend" placeholder="検索条件">
                  <el-option label="code" value="1"></el-option>
                  <el-option label="name" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
        </el-col>

        <el-col :span="24" id="data">
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
                            <template slot-scope="scope">
                            <CarForm :id="scope.row.id"
                                     :code="scope.row.code"
                                     :name="scope.row.name"
                                     @refresh="refresh"/>
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
                                @click="deleteCar(scope.row)"/>
                            </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script>
  import axios from 'axios'
  import CarForm from '../components/forms/CarForm.vue'

  export default {
    components: {
       CarForm
    },
    data () {
      return {
        select: '',
        keyword: '',
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
      },
      deleteCar: async function (row) {
        if(confirm('削除してもよろしいですか?')) {
          await axios.delete('http://localhost:8080/v1/cars/' + row.id + '/delete')
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

<style lang="scss">

#create {
   text-align: right;
}

#data {
   text-align: center;
}

</style>