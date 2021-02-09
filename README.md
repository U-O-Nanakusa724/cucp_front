# cucp_front

## 導入するフレームワークやライブラリ、ツールなど

- Vue.js   : フロントプロジェクト作成やライブラリ管理を円滑に行うフレームワーク
- axios    : APIを叩きやすくするライブラリ
- sass     : CSSを記述しやすくするライブラリ
- figma    : フロントデザインツール

<details><summary>ディレクトリと役割(わかるものだけ)</summary><div>

```dir
cucp_front
+ public             :
|  + favicon.ico     :
|  + index.html      :
+ src
|  + assets          :pngなどのファイルが置いてある
|  + components      :SpringBootやSwaggerなどのコンフィグクラスを格納する
|  + router
|  |  + index.js     :SPA(シングルページアプリケーション)の対象とするvueを設定する
|  + store
|  |   + index.js    :
|  + views           :SPAの対象となるコンテンツページたちをここに格納する
|  + App.vue         :共通ヘッダなど、全ページで読み込まれるコンテンツをこのファイルに記入する
|  + main.js         :このVueプロジェクト全体でインポートするライブラリを記述するなど、Thymeleafのlayout.htmlみたいな役割を担う
+ build.config.js    :
+ package.json       :SpringBootで言うところのgradle。プロジェクトの設定ファイル
+ package-lock.json  :SpringBootで言うところのgradlew。package.jsonの編集ミスなどのバージョン齟齬等のトラブルを防ぐ

```

参考サイト

https://qiita.com/engineerhikaru/items/7fc77c571fb107d1eff1

https://qiita.com/tockn/items/2ce68b99e0839df52200

</div></details>
