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
  public notSamePreviousPassword = '前回設定したパスワードが正しくありません。';
  public passwordDescription = 'ログインに使用するパスワードです。';
  public passwordLength = 'パスワードは8文字以上入力してください。';
  public passwordFormat =
    'パスワードには、半角英小文字、大文字、数字をそれぞれ1種類以上使用してください';
  public confirmPasswordDescription =
    '確認のため再度同じパスワードを入力してください。';
}
export class MessagesEn extends Messages {}
