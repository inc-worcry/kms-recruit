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
   - 原稿：アンケート（Googleフォーム）の回答から作る。各カードの `.itv-detail`（hidden）の中身がそのままポップアップ本文になる。
     HTML内にコメントで流し込みテンプレートを入れてあるので、`d-soon`／`d-msg` を削除し、コメントを外して回答を貼る
   - アンケート：回答用 https://docs.google.com/forms/d/e/1FAIpQLScIwjThSMJ7w3DELgup-GPdS72G912ZYsjvtvqtmiIES-_Sjw/viewform ／
     編集 https://docs.google.com/forms/d/1XWLdQFubR5OufuHLXm3-kSlzbNhHBHdha5dmQZ4XL8Q/edit ／
     回答シート https://docs.google.com/spreadsheets/d/14QWKYkVas7zvbqu1-pwODvcAKXyroTOB6dtJiPeIpJk/edit
     （フォームを作り直す場合は `tools/create-interview-form.gs` を Apps Script で実行）
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
