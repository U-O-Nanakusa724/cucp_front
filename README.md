# cucp_front

## 導入するフレームワークやライブラリ、ツールなど

- Vue.js   : フロントプロジェクト作成やライブラリ管理を円滑に行うフレームワーク
- [Element-UI](https://element.eleme.io/#/en-US) : ボタン、アイコンなどのテンプレートを扱うライブラリ
- [chartjs-plugin-colorschemes](https://nagix.github.io/chartjs-plugin-colorschemes/) : Chart.jsの色を自動でよしなに反映してくれるライブラリ
- axios    : APIを叩きやすくするライブラリ
- sass     : CSSを記述しやすくするライブラリ
- figma    : フロントデザインツール

<details><summary>ディレクトリと役割(理解しているものを随時更新)</summary><div>

```dir
cucp_front
+ public
|  + css             :cssを格納する
|  + favicon.ico     :
|  + index.html      :
+ src
|  + assets          :pngなどのファイルが置いてある
|  + components      :パーツ化したコンテンツ(vueファイル)を格納する
|  |  + common       :全体共通部分を格納する
|  + router
|  |  + index.js     :SPA(シングルページアプリケーション)対象とするvueを設定する
|  + store
|  |  + index.js     :
|  + views           :SPAの対象となるコンテンツページたちをここに格納する
|  + App.vue         :共通ヘッダなど、全ページのテンプレートの役割をする。router-viewの箇所にrouter/index.jsで指定したものがSPAされる。
|  + main.js         :このVueプロジェクト全体でインポートするライブラリを記述するなど、Thymeleafのlayout.htmlみたいな役割を担う
+ build.config.js    :
+ package.json       :SpringBootで言うところのgradle。プロジェクトの設定ファイル
+ package-lock.json  :SpringBootで言うところのgradlew。package.jsonの編集ミスなどのバージョン齟齬等のトラブルを防ぐ

```

参考サイト

https://qiita.com/engineerhikaru/items/7fc77c571fb107d1eff1

https://qiita.com/tockn/items/2ce68b99e0839df52200

</div></details>
