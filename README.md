# ケー・エム・エス株式会社 採用サイト（シングルページ）

公開URL: https://inc-worcry.github.io/kms-recruit/
GitHub: https://github.com/inc-worcry/kms-recruit

## ファイル
- `index.html` … サイト本体（HTML/CSS/JS すべて内包・外部依存はGoogle Fontsのみ）
- `images/` … 使用画像（Web用に圧縮済み）

## ローカルで見る
    python3 -m http.server 8231 --directory .
→ http://localhost:8231

## 差し替えが必要な箇所
1. **社員インタビュー（4枠）** … 「KMSを支える人たち」セクション内。カードをクリックするとポップアップが開く。
   - 写真：`images/interview/01.jpg`〜`04.jpg` を置き、各カードの `.ph` の先頭に `<img src="images/interview/01.jpg" alt="営業">` を追加（HTML内にコメントで場所を記載済み）。写真を入れると番号は消え、COMING SOONは写真下部の小さい表示に切り替わる
   - 原稿：各カードの `.itv-detail`（hidden）の中身がそのままポップアップ本文になる。`d-soon`／`d-msg` を消して、以下の形で追加
     `<p class="d-name">名前</p><p class="d-meta">20XX年入社</p><div class="d-qa"><p class="d-q">質問</p><p class="d-a">回答</p></div>`
   - 公開したら、カードの `<span class="soon">COMING SOON</span>` も削除
2. **ENTRYボタンのリンク** … engage（https://en-gage.net/e-kms_saiyo/）に紐付け済み。
3. **給与・待遇・休日** … 募集要項テーブルは「説明会でご案内」表記。確定情報が出たら記載。
4. **従業員数** … 74名（2023年4月）。最新値があれば更新。

## 出典
本文・FAQ・代表メッセージは現行採用サイト（recruit.e-kms.co.jp）およびコーポレートサイト
（e-kms.co.jp）の記載を元にしています。数値はすべて公開情報に準拠、推測値は使用していません。

## 改行（文節区切り）
日本語が単語の途中で改行されないよう、本文には BudouX で `<wbr>` を入れ、CSS は `word-break:keep-all` にしている。
**テキストを編集したら必ず再実行する**（何度実行してもOK）。

    pip install budoux
    python3 tools/linebreak.py

スマホだけ改行したい箇所は `<br class="sp">` を使う。
