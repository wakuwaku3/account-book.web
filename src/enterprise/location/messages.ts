export class Messages {
  public signIn = (name: string) => `${name}がサインインしました。`;
  public requiredError = (name: string) => `${name}が入力されていません。`;
  public emailFormatError = 'Eメールが不正な形式で入力されています。';
  public passwordMinLengthError = 'パスワードは8文字以上入力してください。';
  public passwordMaxLengthError = 'パスワードは100文字以内で入力してください。';
  public passwordFormatError =
    'パスワードは半角英数字をそれぞれ1種類以上入力してください。';
  public required = (name: string) => `${name}は必須入力です。`;
  public validationError =
    'エラーが存在します。入力項目を再度確認してください。';
  public sendPasswordResetRequestingMail =
    '指定のメールアドレスにパスワード再設定用のURLを記載したメールを送信しました。';
  public sendSignUpRequestingMail =
    '指定のメールアドレスに新しいユーザーを作成するためのメールを送信しました。';
  public notSamePreviousPassword = '前回設定したパスワードが正しくありません。';
  public passwordDescription = 'ログインに使用するパスワードです。';
  public passwordLength = 'パスワードは8文字以上入力してください。';
  public passwordFormat =
    'パスワードには、半角英小文字、大文字、数字をそれぞれ1種類以上使用してください';
  public confirmPasswordDescription =
    '確認のため再度同じパスワードを入力してください。';
  public serverMessages = {
    '00001': 'メールアドレスは必須です。',
    '00002': 'パスワードは必須です。',
    '00003': 'パスワードトークンは必須です。',
    '00004': '金額は必須です。',
    '00005': 'カテゴリは必須です。',
    '00006': '締め処理済みの取引を変更することはできません。',
    '00007': 'IDは必須です。',
    '00008': '計画名は必須です。',
    '00009': '間隔は0より大きい必要があります。',
    '00010': '日付の範囲が不正です。',
    '00011': 'データが存在しません。',
    '00012': 'サインインに失敗しました。',
    '00013': 'パスワード変更に失敗しました。',
    '00014': 'すでに削除されています。',
    '00015': 'パスワードは8文字以上設定してください。',
    '00016':
      'パスワードには、半角英小文字、大文字、数字をそれぞれ1種類以上使用してください。',
    '00017': 'サービス利用規約への同意が必要です。',
    '00018': 'サインアップに失敗しました。',
    '00019': 'URLの有効期限が切れています。',
    '00020': 'サインアップトークンは必須です。',
    '00021': '名前は必須です。',
    '00022': '不正なカルチャーです。',
  };
  public noHandleServerError = (code: string) =>
    `エラーが発生しました。(コード:${code})`;
  public requiredAgreement = 'サービス利用規約への同意は必須です。';
}
export class MessagesEn extends Messages {}
