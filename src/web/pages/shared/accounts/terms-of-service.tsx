import * as React from 'react';
import { Typography, createStyles } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    padding: 20,
    paddingTop: 50,
    maxWidth: 800,
    margin: 'auto',
    paddingBottom: 50,
  },
  form: {
    paddingTop: 20,
  },
  hidden: {
    position: 'fixed',
    top: '-100px',
    left: '-100px',
    height: 0,
    padding: 0,
    margin: 0,
    border: 0,
  },
  btn: { width: '100%' },
  popover: { top: -25, left: -5, position: 'relative' },
});
export const TermsOfService = decorate(styles)(({ classes }) => (
  <React.Fragment>
    <p>
      <Typography variant="caption">
        この利用規約（以下，「本規約」といいます。）は，wakuwaku3（以下，「サービス提供者」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
      </Typography>
    </p>

    <Typography variant="h5">第1条（適用）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          本規約は，ユーザーとサービス提供者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第2条（利用登録）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          本サービスにおいては，登録希望者が本規約に同意の上，サービス提供者の定める方法によって利用登録を申請し，サービス提供者がこれを承認することによって，利用登録が完了するものとします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
          <ol>
            <li>
              <Typography variant="caption">
                利用登録の申請に際して虚偽の事項を届け出た場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                本規約に違反したことがある者からの申請である場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                その他，サービス提供者が利用登録を相当でないと判断した場合
              </Typography>
            </li>
          </ol>
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">
      第3条（ユーザーIDおよびパスワードの管理）
    </Typography>
    <ol>
      <li>
        <Typography variant="caption">
          ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。サービス提供者は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，サービス提供者に故意又は重大な過失がある場合を除き，サービス提供者は一切の責任を負わないものとします。
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第4条（利用料金および支払方法）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          ユーザーは，本サービスの有料部分の対価として，サービス提供者が別途定め，本ウェブサイトに表示する利用料金を，サービス提供者が指定する方法により支払うものとします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          ユーザーが利用料金の支払を遅滞した場合には，ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第5条（禁止事項）</Typography>
    <p>
      <Typography variant="caption">
        ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
      </Typography>
    </p>

    <ol>
      <li>
        <Typography variant="caption">
          法令または公序良俗に違反する行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">犯罪行為に関連する行為</Typography>
      </li>
      <li>
        <Typography variant="caption">
          本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          本サービスによって得られた情報を商業的に利用する行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者のサービスの運営を妨害するおそれのある行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          不正アクセスをし，またはこれを試みる行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          他のユーザーに関する個人情報等を収集または蓄積する行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          不正な目的を持って本サービスを利用する行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">他のユーザーに成りすます行為</Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          面識のない異性との出会いを目的とした行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          その他，サービス提供者が不適切と判断する行為
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第6条（本サービスの提供の停止等）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          サービス提供者は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          <ol>
            <li>
              <Typography variant="caption">
                本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                コンピュータまたは通信回線等が事故により停止した場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                その他，サービス提供者が本サービスの提供が困難と判断した場合
              </Typography>
            </li>
          </ol>
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第7条（利用制限および登録抹消）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          サービス提供者は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
          <ol>
            <li>
              <Typography variant="caption">
                本規約のいずれかの条項に違反した場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                登録事項に虚偽の事実があることが判明した場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                料金等の支払債務の不履行があった場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                サービス提供者からの連絡に対し，一定期間返答がない場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                本サービスについて，最終の利用から一定期間利用がない場合
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                その他，サービス提供者が本サービスの利用を適当でないと判断した場合
              </Typography>
            </li>
          </ol>
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者は，本条に基づきサービス提供者が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第8条（退会）</Typography>
    <p>
      <Typography variant="caption">
        ユーザーは，サービス提供者の定める退会手続により，本サービスから退会できるものとします。
      </Typography>
    </p>

    <Typography variant="h5">第9条（保証の否認および免責事項）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          サービス提供者は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者は，本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし，本サービスに関するサービス提供者とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          前項ただし書に定める場合であっても，サービス提供者は，サービス提供者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（サービス提供者またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，サービス提供者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          サービス提供者は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
        </Typography>
      </li>
    </ol>

    <Typography variant="h5">第10条（サービス内容の変更等）</Typography>
    <p>
      <Typography variant="caption">
        サービス提供者は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
      </Typography>
    </p>

    <Typography variant="h5">第11条（利用規約の変更）</Typography>
    <p>
      <Typography variant="caption">
        サービス提供者は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
      </Typography>
    </p>

    <Typography variant="h5">第12条（個人情報の取扱い）</Typography>
    <p>
      <Typography variant="caption">
        サービス提供者は，本サービスの利用によって取得する個人情報については，サービス提供者「プライバシーポリシー」に従い適切に取り扱うものとします。
      </Typography>
    </p>

    <Typography variant="h5">第13条（通知または連絡）</Typography>
    <p>
      <Typography variant="caption">
        ユーザーとサービス提供者との間の通知または連絡は，サービス提供者の定める方法によって行うものとします。サービス提供者は,ユーザーから,サービス提供者が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
      </Typography>
    </p>

    <Typography variant="h5">第14条（権利義務の譲渡の禁止）</Typography>
    <p>
      <Typography variant="caption">
        ユーザーは，サービス提供者の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
      </Typography>
    </p>

    <Typography variant="h5">第15条（準拠法・裁判管轄）</Typography>
    <ol>
      <li>
        <Typography variant="caption">
          本規約の解釈にあたっては，日本法を準拠法とします。
        </Typography>
      </li>
      <li>
        <Typography variant="caption">
          本サービスに関して紛争が生じた場合には，サービス提供者の本店所在地を管轄する裁判所を専属的合意管轄とします。
        </Typography>
      </li>
    </ol>
    <p>
      <Typography variant="caption" align="right">
        以上
      </Typography>
    </p>
  </React.Fragment>
));
