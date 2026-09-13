/**
 * KMS採用サイト「社員インタビュー」回答用 Google フォームを作成する Apps Script。
 * script.google.com の新規プロジェクトに貼り付けて createKmsInterviewForm を実行する。
 * 回答は自動で新規スプレッドシートに集計される。掲載用の写真はこのフォームでは集めない（別途回収）。
 */
function createKmsInterviewForm() {
  const form = FormApp.create('KMS採用サイト 社員インタビュー アンケート');
  form.setDescription(
    'ケー・エム・エス株式会社の採用サイトに掲載する「社員インタビュー」のためのアンケートです。\n' +
    '回答時間の目安は15〜20分です。\n' +
    'うまく書こうとしなくて大丈夫です。話し言葉のまま、具体的なエピソードを入れていただけると読みやすい記事になります。\n\n' +
    '※掲載用の写真は、このフォームとは別にお送りいただきます。'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);
  try { form.setRequireLogin(false); } catch (e) { /* Workspace以外では不要 */ }
  form.setConfirmationMessage(
    'ご回答ありがとうございました！\n内容をもとにインタビュー記事を作成し、掲載前に確認のご連絡をします。'
  );

  // ---- 基本情報 ----
  form.addSectionHeaderItem().setTitle('基本情報');
  form.addTextItem().setTitle('お名前').setHelpText('例：山田 太郎').setRequired(true);
  form.addMultipleChoiceItem().setTitle('サイトでの名前の出し方')
    .setChoiceValues(['フルネーム', '名字のみ', 'イニシャル']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('職種')
    .setChoiceValues(['営業', '営業事務', '機械系CAD・CAMオペレーター', 'マシンオペレーター']).setRequired(true);
  form.addTextItem().setTitle('入社年').setHelpText('例：2021年').setRequired(true);
  form.addMultipleChoiceItem().setTitle('入社のかたち').setChoiceValues(['新卒', '中途']).setRequired(true);
  form.addTextItem().setTitle('入社前の経歴（任意）').setHelpText('例：文系学部卒／飲食業から転職').setRequired(false);

  // ---- インタビュー ----
  form.addPageBreakItem().setTitle('インタビュー')
    .setHelpText('各質問100〜200字くらいが目安です。箇条書きでもOKです。');
  const questions = [
    ['KMSに入社を決めた理由は？', '例：説明会で社員同士の距離の近さを感じた／未経験でも仕事を覚えられる仕組みに惹かれた など', true],
    ['今の仕事内容を、学生にもわかるように教えてください', '例：お客様の図面をもとに、金型の土台「モールドベース」を削り出す機械を操作しています など', true],
    ['仕事で一番やりがいを感じる瞬間は？', 'できれば具体的な場面やエピソードを1つ入れてください', true],
    ['入社して大変だったことと、それをどう乗り越えたか', '例：最初は専門用語がわからなかったが、先輩がメモを作ってくれて… など', true],
    ['上司や先輩に助けられた・任せてもらえたエピソード', '例：入社◯年目で大きな仕事を任せてもらい、困ったときはすぐ相談に乗ってくれた など', true],
    ['ある1日のスケジュール', '例：8:30 出社・メールチェック → 9:00 朝礼 → 10:00 図面作成 → 12:00 昼休み → … → 17:30 退社', true],
    ['社内イベントの思い出', '例：BBQ・社員旅行・納会・GR86/BRZレースの応援 など。特になければ空欄でOKです', false],
    ['これからの目標', '仕事でもプライベートでもOKです', true],
    ['応募を考えている方へひとこと', '', true],
  ];
  questions.forEach(([title, help, required]) => {
    const item = form.addParagraphTextItem().setTitle(title).setRequired(required);
    if (help) item.setHelpText(help);
  });

  // ---- 掲載の確認 ----
  form.addPageBreakItem().setTitle('掲載の確認');
  form.addCheckboxItem().setTitle('掲載への同意')
    .setChoiceValues(['回答内容と写真を、ケー・エム・エス株式会社の採用サイトに掲載することに同意します'])
    .setRequired(true);

  // 回答の集計先スプレッドシート
  const ss = SpreadsheetApp.create('KMS採用サイト 社員インタビュー 回答');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('回答用URL（社員に送る）: ' + form.getPublishedUrl());
  Logger.log('編集URL: ' + form.getEditUrl());
  Logger.log('回答スプレッドシート: ' + ss.getUrl());
}
