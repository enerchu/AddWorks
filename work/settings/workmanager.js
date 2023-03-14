const categoryList = [
  'category1',
  'category2'
];

const workInfoList = [
  {
    date: 230101, //日付をYYMMDD形式で入力
    category: 'category1', // 新規カテゴリは↑に追加
    title: 'サンプルタイトル',
    caption:  '<p>サンプルキャプション</p>'
            + '<p>サンプルキャプション</p>',
    
    type: manga, // 漫画ならmanga、イラストならillust
    pages: 6, // ページ数
    rightPageStart: true, // 右ページ始まりならtrue、左ページ始まりならfalse(イラストの場合は関係なし)
    extension: 'png' // ファイル拡張子を入力
  }, 
  {
    date: 230102,
    category: 'category2',
    title: 'サンプルタイトル2',
    caption:  '<p>サンプルキャプション2</p>'
            + '<p>サンプルキャプション2</p>',
    
    type: illust, 
    pages: 4,
    rightPageStart: true,
    extension: 'png'
  }
]