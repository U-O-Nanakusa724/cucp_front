<template>
  <div id="aside">
    <el-aside width="200px">
      <el-menu>
        <!-- グラフ関連 -->
        <el-menu-item index="1">
          <template slot="title">
            <i class="el-icon-s-marketing" />
            <router-link to="/graph">グラフ</router-link>
          </template>
        </el-menu-item>

        <!-- 詳細関連 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order" />車データ
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/details">
                <i class="el-icon-tickets" />一覧</router-link
              >
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/detailsort">
                <i class="el-icon-sort" />並べ替え</router-link
              >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 各マスタデータ関連 -->
        <el-submenu index="3">
          <template slot="title"> <i class="el-icon-edit-outline" />管理</template>
          <el-menu-item-group>
            <el-menu-item index="3-1">
              <router-link to="/cars">
                <i class="el-icon-tickets" />車種</router-link
              >
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/grades">
                <i class="el-icon-collection-tag" />グレード</router-link
              >
            </el-menu-item>
            <el-menu-item index="3-3">
              <router-link to="/stores">
                <i class="el-icon-office-building" />販売店</router-link
              >
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- ファイル関連 -->
        <el-menu-item index="4">
          <template slot="title">
            <router-link to="/documents">
              <i class="el-icon-folder" />ファイル入出力</router-link
            >
          </template>
        </el-menu-item>

        <!-- ログアウト -->
        <el-menu-item index="5">
          <template slot="title">
            <router-link to="/logout">
              <i class="el-icon-warning" />ログアウト</router-link
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
