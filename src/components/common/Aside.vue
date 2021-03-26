<template>
  <div id="aside">
    <el-aside width="200px">
      <el-menu>
        <!-- グラフ関連 -->
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-s-marketing" />
            <router-link to="/graph">Graph</router-link>
          </template>
        </el-menu-item>

        <!-- 車種関連 -->
        <el-submenu index="2">
          <template slot="title"> <i class="el-icon-truck" />Cars </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/cars">
                <i class="el-icon-tickets" />List</router-link
              >
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/carsort">
                <i class="el-icon-sort" />Sort</router-link
              >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 販売店関連 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-office-building" />Stores
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <router-link to="/stores">
                <i class="el-icon-tickets" />List</router-link
              >
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/storesort">
                <i class="el-icon-sort" />Sort</router-link
              >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 詳細関連 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-order" />Details
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">
              <router-link to="/details">
                <i class="el-icon-tickets" />List</router-link
              >
            </el-menu-item>
            <el-menu-item index="4-2">
              <router-link to="/detailsort">
                <i class="el-icon-sort" />Sort</router-link
              >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- ファイル関連 -->
        <el-menu-item index="5">
          <template slot="title">
            <router-link to="/documents">
              <i class="el-icon-folder" />Import/Export</router-link
            >
          </template>
        </el-menu-item>

        <!-- ログアウト -->
        <el-menu-item index="6">
          <template slot="title">
            <router-link to="/logout">
              <i class="el-icon-warning" />Logout</router-link
            >
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<style lang="scss">
#aside {
  text-align: left;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
