# 為替換算・概算コスト計算機（iGenTrade / 合同会社威源国際貿易）

JPY・CNY・USD・EURを相互換算し、送料・手数料・関税概算を加えた貿易向けの概算総額を確認する静的Webツールです。

**提供元:** 合同会社威源国際貿易（iGenTrade）  
**公式サイト:** https://www.igentrade.com/

## 主な機能

- JPY / CNY / USD / EURの換算
- 「1通貨 = 何円」の手動レート入力
- Frankfurter API（`https://api.frankfurter.app/latest?from=JPY&to=CNY,USD,EUR`）から最新レート取得
- 送料、手数料（率 / 固定額）、関税概算（率）を計算通貨で加算
- localStorageの下書き、印刷 / PDF出力（ブランドフッター初期オフ）

取得に失敗した場合は手動レートをそのまま使用します。為替・関税・通関費用の確定値ではないため、見積や発注の最終判断前に必ず確認してください。


## 関連ツール（iGenTrade 無料）

- [見積書・請求書](https://github.com/igentrade/igentrade-seikyu) — https://igentrade.github.io/igentrade-seikyu/
- [納品書・領収書](https://github.com/igentrade/igentrade-nohin-ryoshu) — https://igentrade.github.io/igentrade-nohin-ryoshu/
- [消費税計算機](https://github.com/igentrade/igentrade-shohizei) — https://igentrade.github.io/igentrade-shohizei/
- [為替・概算コスト](https://github.com/igentrade/igentrade-kawase) — https://igentrade.github.io/igentrade-kawase/
- [営業日計算機](https://github.com/igentrade/igentrade-eigyobi) — https://igentrade.github.io/igentrade-eigyobi/
- [簡易出納帳](https://github.com/igentrade/igentrade-suitoubo) — https://igentrade.github.io/igentrade-suitoubo/

## ライセンス

MIT License — Copyright (c) 2026 合同会社威源国際貿易 (iGenTrade)
