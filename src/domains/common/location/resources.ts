export class Resources {
  public appName = 'Account Book';
  public email = 'メールアドレス';
  public emailPlaceholder = 'email@example.com';
  public previousPassword = '前回設定したパスワード';
  public password = 'パスワード';
  public confirmPassword = 'パスワード(入力確認用)';
  public signIn = 'サインイン';
  public profile = 'プロフィール';
  public signOut = 'サインアウト';
  public submit = '送信';
  public change = '変更';
  public resetPassword = 'パスワード再設定';
  public resetPasswordRequesting =
    'パスワード再設定したいアカウントのメールアドレスを入力してください。';
  public forgotPassword = 'パスワードを忘れた方はコチラ';
  public dashboard = 'ダッシュボード';
  public list = '一覧';
  public input = '入力';
  public summary = 'サマリ';
  public graph = 'グラフ';
  public plans = '計画';
  public planIndex = '計画一覧';
  public planEdit = '計画編集';
  public planCreate = '計画追加';
  public income = '収入';
  public isIncome = '収入フラグ';
  public expense = '支出';
  public currentBalance = '今月の残高';
  public previousBalance = '前月までの残高';
  public balance = '残高';
  public planName = '計画名';
  public planAmount = '予定金額';
  public actualAmount = '実際の金額';
  public entered = '入力済み';
  public approve = '承認';
  public cancelApprove = '承認取消';
  public transactionIndex = '入出金一覧';
  public transactionCreate = '入出金登録';
  public transactionEdit = '入出金編集';
  public transactionDate = '入出金日';
  public intervalPerMonth = '間隔(月)';
  public amount = '金額';
  public notes = '備考';
  public category = 'カテゴリ';
  public save = '保存';
  public reset = 'リセット';
  public copy = 'コピー';
  public interval = '間隔';
  public applyStartDate = '適用開始日';
  public applyEndDate = '適用終了日';
  public actualEnter = '実績値入力';
  public getCategoryName = (categoryId: string) => {
    switch (categoryId) {
      case '0':
        return '食費';
      case '1':
        return '交通費';
      case '2':
        return '交友費';
      case '3':
        return '雑費';
      case '5':
        return '収入';
    }
    return 'その他';
  };
  public today = '当日';
}
export class ResourcesEn extends Resources {
  public email = 'Mail Address';
  public password = 'Password';
  public signIn = 'Sign In';
  public profile = 'Profile';
  public signOut = 'Sign Out';
  public resetPassword = 'Reset Password';
  public submit = 'Submit';
}
