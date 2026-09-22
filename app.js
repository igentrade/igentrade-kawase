(() => {
  "use strict";
  const KEY = "igentrade-kawase-draft-v1";
  const $ = (id) => document.getElementById(id);
  const currencies = ["JPY", "CNY", "USD", "EUR"];
  const today = () => new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
  const number = (n) => new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 2 }).format(Number(n) || 0);
  const money = (n, currency) => `${currency} ${number(n)}`;
  function rateMap() { return Object.fromEntries(currencies.map((c) => [c, Math.max(0.000001, Number($("rate" + c).value) || 0)])); }
  function read() { return { amount: $("amount").value, from: $("fromCurrency").value, to: $("toCurrency").value, rates: rateMap(), shipping: $("shipping").value, feeMode: $("feeMode").value, fee: $("fee").value, duty: $("duty").value }; }
  function calculate() {
    const d = read(); const rates = d.rates; const amount = Math.max(0, Number(d.amount) || 0); const base = rates[d.from] && rates[d.to] ? amount * rates[d.from] / rates[d.to] : 0;
    const shipping = Math.max(0, Number(d.shipping) || 0); const feeInput = Math.max(0, Number(d.fee) || 0); const fee = d.feeMode === "percent" ? base * feeInput / 100 : feeInput; const duty = base * Math.max(0, Number(d.duty) || 0) / 100; const extra = shipping + fee + duty; const total = base + extra; const to = d.to;
    $("today").textContent = today(); $("pair").textContent = `${d.from} → ${to}`; $("baseResult").textContent = money(base, to); $("extraResult").textContent = money(extra, to); $("totalResult").textContent = money(total, to);
    $("detailBase").textContent = money(base, to); $("detailShipping").textContent = money(shipping, to); $("detailFee").textContent = money(fee, to); $("detailDuty").textContent = money(duty, to); $("detailRate").textContent = `${d.from} 1 = ${number(rates[d.from] / rates[to])} ${to}`;
    $("rateNote").textContent = `入力 ${number(amount)} ${d.from} を、手動レート（${number(rates[d.from])}円 / ${d.from}）で換算。追加コストは ${to} 入力。`;
  }
  function syncBrand() { $("brandFoot").classList.toggle("is-hidden", !$("showBrand").checked); }
  function allInputs() { return ["amount", "fromCurrency", "toCurrency", "shipping", "feeMode", "fee", "duty", ...currencies.map((c) => "rate" + c)]; }
  function load(d) { $("amount").value = d.amount ?? ""; $("fromCurrency").value = d.from || "CNY"; $("toCurrency").value = d.to || "JPY"; currencies.forEach((c) => { $("rate" + c).value = d.rates?.[c] ?? (c === "JPY" ? 1 : ""); }); $("shipping").value = d.shipping ?? 0; $("feeMode").value = d.feeMode || "percent"; $("fee").value = d.fee ?? 0; $("duty").value = d.duty ?? 0; calculate(); }
  allInputs().forEach((id) => $(id).addEventListener("input", calculate));
  $("fetchRates").addEventListener("click", async () => {
    const button = $("fetchRates"); button.disabled = true; $("rateStatus").className = "status"; $("rateStatus").textContent = "最新レートを取得しています…";
    try {
      const response = await fetch("https://api.frankfurter.app/latest?from=JPY&to=CNY,USD,EUR", { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("network"); const json = await response.json();
      Object.entries(json.rates || {}).forEach(([currency, quote]) => { if (currencies.includes(currency) && Number(quote) > 0) $("rate" + currency).value = (1 / Number(quote)).toFixed(6); });
      $("rateJPY").value = 1; $("rateStatus").className = "status ok"; $("rateStatus").textContent = `取得日時: ${json.date || "最新"}（計算には表示レートを使用）`; calculate();
    } catch (_) { $("rateStatus").className = "status error"; $("rateStatus").textContent = "取得できませんでした。手動レートで計算を続けます。"; } finally { button.disabled = false; }
  });
  $("showBrand").addEventListener("change", syncBrand); $("printBtn").addEventListener("click", () => window.print());
  $("saveLocal").addEventListener("click", () => { localStorage.setItem(KEY, JSON.stringify(read())); alert("下書きをこのブラウザに保存しました。"); });
  $("loadLocal").addEventListener("click", () => { const raw = localStorage.getItem(KEY); if (!raw) return alert("保存された下書きがありません。"); try { load(JSON.parse(raw)); } catch (_) { alert("下書きを読み込めませんでした。"); } });
  calculate(); syncBrand();
})();
