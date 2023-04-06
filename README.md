# AddWorks
This is a script to add your works (including manga and illustration) to your website easily.

AddWorks(アドワークス)は、ウェブサイトに手軽に作品(漫画・イラストなど)を追加するためのスクリプトです。
### LANGUAGES
- HTML5
- CSS3
- JavaScript
### LICENSE
This script is licensed under the MIT License, see the LICENSE file for details.

当スクリプトはMIT LICENSEのもとで公開されています。<br>
著作権表示部分を消さなければ自己責任で自由に使っていいですよというものです。詳細はLICENSEをご覧ください。

# Manual
## ファイル構成
work/  
├AddWorks/  
│　　スクリプト本体  
│　　　このフォルダ内のファイルは編集不要  
├settings/  
│　│　設定用フォルダ  
│　├custom.css  
│　│　CSSカスタマイズ用ファイル  
│　│　このファイルに記述することで、デフォルトのCSSを上書きできます。  
│　├sitedata.js  
│　│　サイト全体の設定用ファイル  
│　│　サイトタイトルや、metaタグ・ファビコンなどのheadコンテンツ、ヘッダー・フッターのカスタマイズが可能です。  
│　└workmanager.js  
│　　　作品データ格納ファイル  
│　　　作品タイトル・作品説明・展示形式の指定(画像ごとに表示するか、見開きで表示するか)など、作品データを格納するファイルです。このファイルに記入したデータをもとに、作品ページを生成します。  
├230101/  
│　│　サンプルファイル  
│　│　作品の制作日付をYYMMDD形式でフォルダ名に設定します。  
│　├img/  
│　│　作品画像格納フォルダ(サンプル)  
│　│　GIF（.gif）、JPEG（.jpg）、PNG（.png）に対応  
│　│　画像のファイル名は連番にしてください。(例: 1.jpg , 2.jpg , 3.jpg , …)  
│　└view.html  
│　　　作品ページ(サンプル)  
│　　　新規作品を追加する際は、このファイルをそのまま作品フォルダにコピペしてください  
└230102/  
　　│　サンプルファイル2  
　　├img/  
　　└view.html  

## Webサイトへの設置
1. workフォルダごとrootファイル(index.htmlがあるフォルダ)に追加
2. settings/sitedata.jsを編集
3. 必要に応じてcustom.cssを編集

## 作品の追加
1. workフォルダ内に作品フォルダを複製
1. フォルダ名を作品の制作日付に変更(YYMDD形式)
1. YYMMDD/imgフォルダ内に作品画像ファイルを追加し、ファイル名を連番に変更(例: 1.png, 2.png, …)
1. 作品情報ファイル(settings/workmanager.js)にタイトル・作品説明、などを記入

# Contact
不具合・疑問点等ございましたら、moliまでお気軽にお問い合わせください。  
Twitter … https://twitter.com/moliyuzuha  
Mail … moliyuzuha@gmail.com  