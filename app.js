(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const fmtMoney = (v) => "$" + Math.round(v).toLocaleString("pt-BR");
  const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const INAF = '<span class="tag-inaf">Inafiançável</span>';

  /* ---------- Ícones (SVG, traço) ---------- */
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICONS = {
    balanca: svg('<path d="M12 3v18M7 21h10M5 7h14M12 7l0 0"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0L5 7zM19 7l-3 7a3.5 3.5 0 0 0 6 0l-3-7z"/>'),
    nome: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>'),
    alianca: svg('<circle cx="9" cy="14" r="6"/><circle cx="15" cy="14" r="6"/><path d="M10 3h4l1.5 2.5L12 8 8.5 5.5z"/>'),
    casamento: svg('<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>'),
    nascimento: svg('<path d="M9 12h.01M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>'),
    adocao: svg('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>'),
    familia: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    cnpj: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    seta: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    copiar: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    dado: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/>'),
    limpar: svg('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
    download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    tabela: svg('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
    prova: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="m9 9.5 2 2 4-4"/>'),
    porte: svg('<path d="M4 11h11l2-3h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2l-2 5H9l1.5-4H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/>'),
    credencial: svg('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2M15 12h2M7 16h10"/>'),
    limpeza: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
    oficio: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'),
    notificacao: svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    divorcio: svg('<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/><path d="M12 4l-2 5 4 4-2 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
    gabinete: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
  };
  const DISCORD_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';
  const DISCORD_LABEL = `${DISCORD_SVG}<span>Enviar para o Discord</span>`;
  // Remove o emoji inicial do rótulo (o emoji continua no relatório do Discord)
  const cleanLabel = (l) => l.replace(/^[^\p{L}\p{N}]+/u, "").trim();

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg, isError = false) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.toggle("error", isError);
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }
  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      toast("✓ Relatório copiado para a área de transferência");
    } catch {
      toast("Não foi possível copiar o relatório", true);
    }
  }
  async function sendWebhook(btn, url, content, onSuccess, fileAttachment) {
    const original = btn.innerHTML;
    btn.innerHTML = "<span>Enviando documento...</span>";
    btn.disabled = true;
    try {
      let body;
      let headers = {};
      const fileList = Array.isArray(fileAttachment) ? fileAttachment.filter(Boolean) : (fileAttachment && fileAttachment.blob ? [fileAttachment] : []);
      if (fileList.length > 0) {
        const formData = new FormData();
        const payload = typeof content === "string" ? { content } : content;
        formData.append("payload_json", JSON.stringify(payload));
        fileList.forEach((f, idx) => {
          formData.append(`files[${idx}]`, f.blob || f, f.filename || f.name || `anexo_${idx}.pdf`);
        });
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(typeof content === "string" ? { content } : content);
      }
      const res = await fetch(url, { method: "POST", headers, body });
      if (!res.ok) {
        let errDetail = "";
        try {
          const errJson = await res.json();
          errDetail = errJson.message ? `: ${errJson.message}` : "";
        } catch (_) {}
        throw new Error(`Código ${res.status}${errDetail}`);
      }
      btn.classList.add("success");
      btn.innerHTML = "<span>✓ Enviado com PDF!</span>";
      toast("✓ Documento e PDF oficial enviados para o Discord!");
      onSuccess && onSuccess();
    } catch (err) {
      toast("Erro ao enviar para o Discord: " + err.message, true);
    } finally {
      setTimeout(() => {
        btn.classList.remove("success");
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2200);
    }
  }

  // Flat map of all articles
  const artigos = {};
  CODIGO_PENAL.forEach((cat) =>
    cat.artigos.forEach(([cod, nome, pena, multa, inaf]) => (artigos[cod] = { cod, nome, pena, multa, inaf: !!inaf }))
  );

  const selected = new Map(); // cod -> quantidade
  const state = { advogado: false, primario: true };

  const matches = (q, cod, nome) => !q || nome.toLowerCase().includes(q) || cod.startsWith(q);

  /* ---------- Crime list ---------- */
  function renderList(filter = "") {
    const q = filter.trim().toLowerCase();
    const list = $("#crime-list");
    list.innerHTML = "";
    let visible = 0;

    CODIGO_PENAL.forEach((cat) => {
      const items = cat.artigos.filter(([cod, nome]) => matches(q, cod, nome));
      if (!items.length) return;

      const title = document.createElement("div");
      title.className = "category-title";
      title.textContent = cat.titulo;
      list.appendChild(title);

      items.forEach(([cod, nome, pena, multa, inaf]) => {
        visible++;
        const row = document.createElement("div");
        row.className = "crime" + (selected.has(cod) ? " active" : "");
        row.id = "crime-" + cod.replace(".", "-");
        row.dataset.cod = cod;
        row.innerHTML = `
          <span class="check">${CHECK_SVG}</span>
          <span class="crime-code">${cod}</span>
          <span class="crime-name">${nome}${inaf ? INAF : ""}</span>
          <span class="qty">
            <button type="button" data-act="minus" aria-label="Diminuir">−</button>
            <span>${selected.get(cod) || 1}</span>
            <button type="button" data-act="plus" aria-label="Aumentar">+</button>
          </span>
          <span class="crime-time">${pena}m</span>
          <span class="crime-fine">${fmtMoney(multa)}</span>`;
        list.appendChild(row);
      });
    });

    if (!visible) list.innerHTML = '<p class="empty">Nenhum artigo encontrado.</p>';
    $("#crime-count").textContent = `${Object.keys(artigos).length} artigos`;
  }

  $("#crime-list").addEventListener("click", (e) => {
    const row = e.target.closest(".crime");
    if (!row) return;
    const cod = row.dataset.cod;
    const act = e.target.closest("button")?.dataset.act;

    if (act === "plus") selected.set(cod, (selected.get(cod) || 1) + 1);
    else if (act === "minus") {
      const n = (selected.get(cod) || 1) - 1;
      n <= 0 ? selected.delete(cod) : selected.set(cod, n);
    } else if (selected.has(cod)) selected.delete(cod);
    else selected.set(cod, 1);

    row.classList.toggle("active", selected.has(cod));
    row.querySelector(".qty span").textContent = selected.get(cod) || 1;
    update();
  });

  /* ---------- Conditions ---------- */
  $("#toggle-advogado").addEventListener("click", (e) => {
    state.advogado = !state.advogado;
    e.currentTarget.classList.toggle("on", state.advogado);
    e.currentTarget.setAttribute("aria-pressed", state.advogado);
    update();
  });
  $$(".segmented button").forEach((b) =>
    b.addEventListener("click", () => {
      state.primario = b.dataset.val === "primario";
      $$(".segmented button").forEach((x) => x.classList.toggle("on", x === b));
      update();
    })
  );

  /* ---------- Calculation (regras do Código Penal Brava RP) ---------- */
  function calcular() {
    let pena = 0, multa = 0, inafiancavel = [];
    selected.forEach((qtd, cod) => {
      const a = artigos[cod];
      pena += a.pena * qtd;
      multa += a.multa * qtd;
      if (a.inaf) inafiancavel.push(cod);
    });

    const penaBase = pena, multaBase = multa;
    if (state.advogado) {
      const f = 1 - CONFIG.reducaoAdvogado / 100;
      pena = Math.ceil(pena * f);
      multa = multa * f;
    }

    let limitada = false;
    if (CONFIG.penaMaxima > 0 && pena > CONFIG.penaMaxima) {
      pena = CONFIG.penaMaxima;
      limitada = true;
    }

    // Fiança: base = multa (já com redução do advogado); primário -25%
    const fianca = inafiancavel.length
      ? null
      : multa * (state.primario ? 1 - CONFIG.descontoPrimario / 100 : 1);

    return { pena, multa, fianca, penaBase, multaBase, inafiancavel, limitada };
  }

  let last = {};
  function update() {
    const r = calcular();
    const pEl = $("#total-pena"), mEl = $("#total-multa"), fEl = $("#total-fianca");

    pEl.innerHTML = `${r.pena}<small>m</small>`;
    mEl.textContent = fmtMoney(r.multa);
    fEl.textContent = r.fianca === null ? "INAFIANÇÁVEL" : fmtMoney(r.fianca);
    $("#card-fianca").classList.toggle("blocked", r.fianca === null);
    $("#fianca-hint").textContent =
      r.fianca === null ? `· art. ${r.inafiancavel.join(", ")}` : state.primario ? "· réu primário −25%" : "· valor integral";

    if (r.pena !== last.pena) bump(pEl);
    if (r.multa !== last.multa) bump(mEl);
    if (r.fianca !== last.fianca) bump(fEl);
    last = r;

    const warn = $("#cap-warning");
    warn.classList.toggle("hidden", !r.limitada);
    if (r.limitada) warn.textContent = `Pena limitada ao máximo de ${CONFIG.penaMaxima} meses.`;

    const ul = $("#selected-list");
    if (!selected.size) {
      ul.innerHTML = '<li class="none">Nenhum artigo selecionado</li>';
      return;
    }
    ul.innerHTML = [...selected]
      .map(([cod, qtd]) => {
        const a = artigos[cod];
        return `<li class="${a.inaf ? "inaf" : ""}"><span>Art. ${cod} — ${a.nome}${qtd > 1 ? ` <b>x${qtd}</b>` : ""}</span>
          <span class="meta">${a.pena * qtd}m · ${fmtMoney(a.multa * qtd)}</span>
          <button type="button" data-cod="${cod}" aria-label="Remover">×</button></li>`;
      })
      .join("");
  }

  function bump(el) {
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  $("#selected-list").addEventListener("click", (e) => {
    const cod = e.target.closest("button")?.dataset.cod;
    if (!cod) return;
    selected.delete(cod);
    renderList($("#search-input").value);
    update();
  });

  /* ---------- Actions ---------- */
  $("#btn-clear").addEventListener("click", () => {
    selected.clear();
    state.advogado = false;
    state.primario = true;
    $("#toggle-advogado").classList.remove("on");
    $$(".segmented button").forEach((x) => x.classList.toggle("on", x.dataset.val === "primario"));
    ["#input-nome", "#input-id", "#input-advogado", "#input-id-adv", "#input-oficial", "#input-id-policial"].forEach((s) => {
      if ($(s)) $(s).value = "";
    });
    renderList($("#search-input").value);
    update();
  });

  // URL do Webhook do Discord da calculadora
  const webhookUrl = "https://discord.com/api/webhooks/1557891727778381948/2Bzkqy2Fcp9pYOG7cCLtwBzcJfHhsvAunl7jjj_jGeMfyJCYlnNpRZ3zLHZgsq-q_KHy";

  function relatorioPenal() {
    const r = calcular();
    const nome = $("#input-nome").value || "—";
    const id = $("#input-id").value || "—";
    const advogado = $("#input-advogado").value || "—";
    const idAdv = $("#input-id-adv").value || "—";
    const oficial = $("#input-oficial").value || "—";
    const idPolicial = $("#input-id-policial").value || "—";
    const data = new Date().toLocaleString("pt-BR");

    const linhas = [...selected].map(([cod, qtd]) => {
      const a = artigos[cod];
      return `🔸 Art. ${cod} - ${a.nome}${qtd > 1 ? ` (x${qtd})` : ""}${a.inaf ? " [INAFIANÇÁVEL]" : ""}`;
    });

    const txt = [
      "```",
      `===================================================`,
      `      TRIBUNAL DE JUSTIÇA — ${CONFIG.cidade.toUpperCase()}`,
      `===================================================`,
      ``,
      `[ 📄 DOCUMENTO ]: RELATÓRIO PENAL`,
      `[ 📅 EMISSÃO   ]: ${data}`,
      ``,
      `================= DADOS DO ACUSADO ================`,
      ``,
      `👤 Nome do Acusado:`,
      ` ↳ ${nome}`,
      `🪪 ID do Acusado:`,
      ` ↳ ${id}`,
      ``,
      `================= DEFESA & PENA ===================`,
      ``,
      `💼 Advogado: ${advogado} (${idAdv})`,
      `⚖️ Status do Advogado: ${state.advogado ? "Presente (-50% pena/multa)" : "Ausente"}`,
      `📜 Antecedentes: ${state.primario ? "Réu primário" : "Reincidente"}`,
      ``,
      `📋 Artigos Enquadrados:`,
      ...(linhas.length ? linhas.map(l => ` ↳ ${l}`) : [" ↳ Nenhum"]),
      ``,
      `=================== SENTENÇA ======================`,
      ``,
      `⏳ Pena Total: ${r.pena} meses${r.limitada ? " (pena máxima)" : ""}`,
      `💰 Multa Total: ${fmtMoney(r.multa)}`,
      `🔓 Fiança: ${r.fianca === null ? "INAFIANÇÁVEL" : fmtMoney(r.fianca)}`,
      ``,
      `================ ASSINATURA OFICIAL ===============`,
      ``,
      `👮 Policial Responsável: ${oficial}`,
      `🪪 ID do Policial: ${idPolicial}`,
      ``,
      `===================================================`,
      "```"
    ].join("\n");
    return txt;
  }

  function relatorioPenalEmbed() {
    const r = calcular();
    const nome = $("#input-nome").value || "—";
    const id = $("#input-id").value || "—";
    const advogado = $("#input-advogado").value || "—";
    const idAdv = $("#input-id-adv").value || "—";
    const oficial = $("#input-oficial").value || "—";
    const idPolicial = $("#input-id-policial").value || "—";

    const linhas = [...selected].map(([cod, qtd]) => {
      const a = artigos[cod];
      return `🔸 **Art. ${cod}** - ${a.nome}${qtd > 1 ? ` (x${qtd})` : ""}${a.inaf ? " *[INAFIANÇÁVEL]*" : ""}`;
    });

    return {
      embeds: [{
        title: `📄 RELATÓRIO PENAL`,
        color: 13938487, // dourado #d4af37
        fields: [
          { name: "Nome do Acusado", value: `\`${nome}\``, inline: true },
          { name: "ID do Acusado", value: `\`${id}\``, inline: true },
          { name: "Antecedentes", value: state.primario ? "Réu primário" : "Reincidente", inline: true },
          
          { name: "Advogado", value: `${advogado} (${idAdv})`, inline: true },
          { name: "Status Advogado", value: state.advogado ? "Presente (-50%)" : "Ausente", inline: true },
          { name: "\u200b", value: "\u200b", inline: true }, // Spacer
          
          { name: "Pena Total", value: `**${r.pena} meses**${r.limitada ? " *(máx)*" : ""}`, inline: true },
          { name: "Multa Total", value: `**${fmtMoney(r.multa)}**`, inline: true },
          { name: "Fiança", value: `**${r.fianca === null ? "INAFIANÇÁVEL" : fmtMoney(r.fianca)}**`, inline: true },
          
          { name: "Artigos Enquadrados", value: linhas.length ? linhas.join("\n") : "Nenhum", inline: false }
        ],
        footer: { text: `Tribunal de Justiça — ${CONFIG.cidade.toUpperCase()} • Oficial: ${oficial} (${idPolicial})` },
        timestamp: new Date().toISOString()
      }]
    };
  }

  async function getPenalPDFData() {
    const r = calcular();
    const nome = $("#input-nome").value || "—";
    const id = $("#input-id").value || "—";
    const advogado = $("#input-advogado").value || "—";
    const idAdv = $("#input-id-adv").value || "—";
    const oficial = $("#input-oficial").value || "—";
    const idPolicial = $("#input-id-policial").value || "—";

    const artigosList = [...selected].map(([cod, qtd]) => {
      const a = artigos[cod];
      return { cod, nome: a.nome, qtd, pena: a.pena, multa: a.multa, inaf: a.inaf };
    });

    return await window.SDJ_PDF.generatePenalPDF({
      nome,
      id,
      advogado,
      idAdv,
      advogadoPresente: state.advogado,
      primario: state.primario,
      oficial,
      idPolicial,
      artigos: artigosList,
      calculo: r,
      cidade: CONFIG.cidade
    });
  }

  $("#btn-discord").innerHTML = DISCORD_LABEL;
  $("#btn-discord").addEventListener("click", async (e) => {
    if (!selected.size) return toast("Selecione ao menos um artigo antes de enviar.", true);
    let pdfData = null;
    try {
      if (window.SDJ_PDF) {
        pdfData = await getPenalPDFData();
      }
    } catch (err) {
      console.warn("Falha ao gerar PDF para o Discord:", err);
    }
    sendWebhook(e.currentTarget, webhookUrl, relatorioPenalEmbed(), null, pdfData);
  });

  const btnPdfCalc = $("#btn-pdf-calc");
  if (btnPdfCalc) {
    btnPdfCalc.addEventListener("click", async () => {
      if (!selected.size) return toast("Selecione ao menos um artigo para gerar o PDF.", true);
      try {
        toast("Gerando Certidão em PDF...");
        const pdfData = await getPenalPDFData();
        pdfData.doc.save(pdfData.filename);
        toast("✓ PDF baixado com sucesso!");
      } catch (err) {
        toast("Erro ao gerar PDF: " + err.message, true);
      }
    });
  }

  $("#btn-copy").addEventListener("click", () => copyText(relatorioPenal()));

  $("#search-input").addEventListener("input", (e) => renderList(e.target.value));

  /* ---------- Multi-Serviços (Outras Abas) ---------- */
  // Card da calculadora (o painel em si está no index.html)
  const calculadoraCard = {
    id: "calculadora", title: "Calculadora Penal", svg: "balanca", tag: "Principal", featured: true,
    desc: "Cálculo de penas, multas e fianças conforme o Código Penal vigente."
  };

  const servicesConfig = [
    {
      id: "trocanome", title: "Troca de Nome", icon: "📜", svg: "nome", tag: "Registro civil",
      desc: "Alteração oficial do nome de um cidadão no registro da cidade.", webhook: "https://discord.com/api/webhooks/1557909247097053255/hxsdbo_NkvqMG5TYEtEW7yul_VlkytpePSYKVSuujQAgW3OOdZp_UTLDu_hAE7mBSd5C",
      fields: [
        { id: "tn_antigo", label: "👤 Nome Antigo" },
        { id: "tn_novo", label: "📝 Novo Nome" },
        { id: "tn_id", label: "🪪 Passaporte" },
        { id: "tn_motivo", label: "❓ Motivo da Troca" },
        { id: "tn_valor", label: "💰 Valor Cobrado", placeholder: "R$ 150.000", isFull: true }
      ]
    },
    {
      id: "alianca", title: "Venda de Aliança", icon: "💍", svg: "alianca", tag: "União civil",
      desc: "Venda e registro de alianças e anéis oficiais (Namoro, Noivado e Casamento com fotos ilustrativas).", webhook: "https://discord.com/api/webhooks/1557909803957747783/HFhg6mZJkwnbFtgbKgQ3DgAThaa6RB32O7Y6T8r2ZRWhq1kRe7KwwkmPBMCwxX2Iqws2",
      fields: [
        {
          id: "al_tipo",
          label: "💎 Escolha o Modelo de Aliança / Joia",
          type: "alianca-cards",
          isFull: true,
          options: [
            {
              id: "namoro",
              tipo: "Namoro",
              nome: "Aliança Tradicional de Prata (Namoro)",
              sub: "Prata 925 & Aço Cirúrgico Nobre Polido",
              preco: "R$ 15.000",
              retirada: "R$ 4.000",
              img: "img/alianca_namoro.jpg",
              desc: "Par clássico de alianças anatômicas de alto brilho para celebração de compromisso e fidelidade."
            },
            {
              id: "noivado",
              tipo: "Noivado",
              nome: "Anel de Diamante Solitário (Noivado)",
              sub: "Ouro Branco & Diamante Solitário Lapidado",
              preco: "R$ 30.000",
              retirada: "R$ 8.000",
              img: "img/anel_noivado.jpg",
              desc: "Solitário luxuoso com diamante brilhante lapidado e pavé lateral para pedido solene de noivado."
            },
            {
              id: "casamento",
              tipo: "Casamento",
              nome: "Anel de Ouro Nobre Maciço (Casamento)",
              sub: "Ouro Nobre 18k Maciço Abaulado",
              preco: "R$ 45.000",
              retirada: "R$ 12.000",
              img: "img/anel_casamento.jpg",
              desc: "Par clássico em ouro nobre 18k com acabamento abaulado espelhado para celebração matrimonial definitiva."
            }
          ]
        },
        { id: "al_n1", label: "👤 Nome do(a) Parceiro(a) 1" },
        { id: "al_id1", label: "🪪 Passaporte 1" },
        { id: "al_n2", label: "👤 Nome do(a) Parceiro(a) 2" },
        { id: "al_id2", label: "🪪 Passaporte 2" },
        { id: "al_data", label: "📅 Data da Celebração" },
        { id: "al_valor", label: "💰 Valor Cobrado", placeholder: "R$ 15.000", isFull: true }
      ]
    },
    {
      id: "casamento", title: "Certidão de Casamento", icon: "💒", svg: "casamento", tag: "Certidão",
      desc: "Celebração oficial e emissão de Certidão Notarial de Casamento.", webhook: "https://discord.com/api/webhooks/1560000830436806716/6MdSLFAUlYGzR5UxAMYNnSRfuonjv44niLAwQ-1GUgbyaCfljWI6LZl2GlV1vuGl2UEp",
      fields: [
        { id: "cas_conjuge1", label: "👤 Nome do Cônjuge 1" },
        { id: "cas_id1", label: "🪪 Passaporte 1" },
        { id: "cas_conjuge2", label: "👤 Nome do Cônjuge 2" },
        { id: "cas_id2", label: "🪪 Passaporte 2" },
        { id: "cas_regime", label: "📜 Regime de Bens", placeholder: "Ex.: Comunhão Parcial de Bens" },
        { id: "cas_data", label: "📅 Data do Casamento" },
        { id: "cas_emissao", label: "📅 Data de Emissão", placeholder: "DD/MM/AAAA", type: "emissao" },
        { id: "cas_validade", label: "⏳ Validade da Certidão", placeholder: "DD/MM/AAAA", type: "validade", emissaoId: "cas_emissao" },
        { id: "cas_valor", label: "💰 Valor Cobrado", placeholder: "R$ 200.000", isFull: true }
      ]
    },
    {
      id: "divorcio", title: "Certidão de Divórcio", icon: "💔", svg: "divorcio", tag: "Matrimonial",
      desc: "Dissolução formal de casamento com partilha de bens e averbação.",
      webhook: "https://discord.com/api/webhooks/1562528999182303255/139cQN1FKlB0fsRUL9qEuL58H5Yu64IxGz2a70F0MXMGf9gicglTqRctLT7g12sIXgU1",
      fields: [
        {
          id: "div_tipo", label: "⚖️ Modalidade do Divórcio", type: "options",
          options: ["Consensual (Cartório / Extrajudicial)", "Litigioso (Audiência Judicial)"], isFull: true
        },
        { id: "div_conjuge1", label: "👤 Cônjuge 1 (Nome Completo)" },
        { id: "div_id1", label: "🪪 Passaporte Cônjuge 1" },
        { id: "div_nome1", label: "📝 Nome Cônjuge 1 Pós-Divórcio", placeholder: "Ex.: Retoma nome de solteiro(a) / Mantém" },
        { id: "div_conjuge2", label: "👤 Cônjuge 2 (Nome Completo)" },
        { id: "div_id2", label: "🪪 Passaporte Cônjuge 2" },
        { id: "div_nome2", label: "📝 Nome Cônjuge 2 Pós-Divórcio", placeholder: "Ex.: Retoma nome de solteiro(a) / Mantém" },
        {
          id: "div_regime", label: "📜 Regime de Bens do Casamento", type: "options",
          options: [
            "Comunhão Parcial de Bens",
            "Comunhão Universal de Bens",
            "Separação Total de Bens",
            "Participação Final nos Aquestos"
          ], isFull: true
        },
        { id: "div_data_casamento", label: "📅 Data do Casamento Originário", placeholder: "DD/MM/AAAA" },
        { id: "div_termo_origem", label: "📖 Livro / Termo do Casamento", placeholder: "Ex.: Livro B-04, Fls. 12, Termo 341" },
        { id: "div_filhos", label: "👶 Filhos Menores / Guarda", placeholder: "Ex.: Sem filhos menores (ou: Guarda Compartilhada)" },
        { id: "div_pensao", label: "🪙 Pensão Alimentícia", placeholder: "Ex.: Dispensada mutuamente (ou valor acordado)" },
        { id: "div_emissao", label: "📅 Data da Homologação", placeholder: "DD/MM/AAAA", type: "emissao" },
        { id: "div_valor", label: "💰 Taxa Notarial Cobrada", placeholder: "R$ 250.000" },
        {
          id: "div_partilha", label: "🏛️ Partilha e Destinação de Bens Patrimoniais", type: "textarea", rows: 4, isFull: true,
          placeholder: "Discrimine os bens e sua destinação:\nEx.: Veículo Pfister Comet fica exclusivamente com Cônjuge 1; Residência nº 142 em Vinewood para Cônjuge 2; Demais contas e pertences partilhados consensualmente."
        }
      ]
    },
    {
      id: "nascimento", title: "Certidão de Nascimento", icon: "🚼", svg: "nascimento", tag: "Certidão",
      desc: "Emissão da certidão com filiação e data de nascimento.", webhook: "https://discord.com/api/webhooks/1557909976167751800/qr6tK9efmUb71JK1XTFfcSdd2v2zoYFbiFPtEvBITR08sYr9_BS7vj1PLk_oLdBFdP7u",
      hasAttachments: true,
      fields: [
        { id: "cn_crianca", label: "👶 Nome da Criança" },
        { id: "cn_id", label: "🪪 Passaporte da Criança" },
        { id: "cn_resp1", label: "👤 Nome do(a) Responsável 1" },
        { id: "cn_id_resp1", label: "🪪 Passaporte do(a) Responsável 1" },
        { id: "cn_resp2", label: "👤 Nome do(a) Responsável 2" },
        { id: "cn_id_resp2", label: "🪪 Passaporte do(a) Responsável 2" },
        { id: "cn_tel_resp", label: "📞 Contato do(a) Responsável 1", placeholder: "Ex.: 555-0123 ou (11) 98765-4321" },
        { id: "cn_tel_resp2", label: "📞 Contato do(a) Responsável 2", placeholder: "Ex.: 555-0456 ou (11) 91234-5678" },
        { id: "cn_data", label: "📅 Data de Nascimento" },
        { id: "cn_emissao", label: "📅 Data de Emissão", placeholder: "DD/MM/AAAA", type: "emissao" },
        { id: "cn_validade", label: "⏳ Validade da Certidão", placeholder: "DD/MM/AAAA", type: "validade", emissaoId: "cn_emissao" },
        { id: "cn_valor", label: "💰 Valor Cobrado", placeholder: "R$ 150.000", isFull: true }
      ]
    },
    {
      id: "adocao", title: "Certidão de Adoção", icon: "📝", svg: "adocao", tag: "Certidão",
      desc: "Formalização da adoção com filiação e responsáveis adotantes.", webhook: "https://discord.com/api/webhooks/1557910119419871333/hbKX69nBb5VT4JQsKWpcp5JRrAXa-_jglzxtOEi6nrpn7g3mWiTar4ILjb7LA8ev9rNd",
      hasAttachments: true,
      fields: [
        { id: "ca_adotado", label: "👤 Nome do Adotado" },
        { id: "ca_id_adotado", label: "🪪 Passaporte do Adotado" },
        { id: "ca_resp1", label: "👤 Nome do(a) Responsável 1" },
        { id: "ca_id_resp1", label: "🪪 Passaporte do(a) Responsável 1" },
        { id: "ca_resp2", label: "👤 Nome do(a) Responsável 2 (Opcional)" },
        { id: "ca_id_resp2", label: "🪪 Passaporte do(a) Responsável 2 (Opcional)" },
        { id: "ca_tel_resp", label: "📞 Contato do(a) Responsável 1", placeholder: "Ex.: 555-0123 ou (11) 98765-4321" },
        { id: "ca_tel_resp2", label: "📞 Contato do(a) Responsável 2 (Opcional)", placeholder: "Ex.: 555-0456 ou (11) 91234-5678" },
        { id: "ca_emissao", label: "📅 Data de Emissão", placeholder: "DD/MM/AAAA", type: "emissao" },
        { id: "ca_validade", label: "⏳ Validade da Certidão", placeholder: "DD/MM/AAAA", type: "validade", emissaoId: "ca_emissao" },
        { id: "ca_valor", label: "💰 Valor Cobrado", placeholder: "R$ 150.000", isFull: true }
      ]
    },
    {
      id: "familia", title: "Registro de Família", icon: "📢", svg: "familia", tag: "Organização",
      desc: "Cadastro oficial de uma família e de seu fundador.", webhook: "https://discord.com/api/webhooks/1557910265994154055/PfeVIqUhCk6pxGWB9QiebBtjKLXdHHgL2DVTlKrHyRnWBd7ev_c2rYMl9pYY6JJqMfz8",
      fields: [
        { id: "rf_familia", label: "👥 Nome da Família" },
        { id: "rf_fundador", label: "👑 Nome do Fundador" },
        { id: "rf_id", label: "🪪 Passaporte do Fundador" },
        { id: "rf_valor", label: "💰 Valor Cobrado", placeholder: "R$ 250.000" },
        { id: "rf_membros", label: "📝 Quantidade de Membros Iniciais", placeholder: "Ex: 10", isFull: true }
      ]
    },
    {
      id: "cnpj", title: "Registro CNPJ", icon: "🏢", svg: "cnpj", tag: "Empresarial",
      desc: "Abertura de empresa com geração automática de CNPJ.", webhook: "https://discord.com/api/webhooks/1557910430666588192/-mdIUQAewOMjr4yvgvNos11Qa70c5fnVyJxEjK8uhRrCSTx267_1oMcR4JF54sCAQ1bO",
      fields: [
        { id: "cp_empresa", label: "🏢 Nome da Empresa" },
        { id: "cp_ramo", label: "🏷️ Ramo de Atividade" },
        { id: "cp_prop", label: "👤 Nome do Proprietário" },
        { id: "cp_id", label: "🪪 Passaporte do Proprietário" },
        { id: "cp_telefone", label: "📞 Telefone de Contato", placeholder: "Ex.: 555-0192 ou (11) 98765-4321", isFull: true },
        { id: "cp_cnpj", label: "🔢 CNPJ da Empresa", type: "cnpj-generator", isFull: true },
        { 
          id: "cp_jovem_aprendiz", 
          label: "👶 A Empresa Trabalha / Trabalhará com Jovem Aprendiz?", 
          type: "options", 
          options: ["Não", "Sim"], 
          isFull: true 
        },
        { id: "cp_valor", label: "💰 Valor Cobrado", placeholder: "R$ 250.000 (ou R$ 50.000 semanal)", isFull: true }
      ]
    },
    {
      id: "porte", title: "Porte de Arma (PT) & Munições", icon: "🔫", svg: "porte", tag: "Armamento",
      desc: "Porte e Registro exclusivo para 1 Pistola PT 9mm (R$ 80.000) e Munições (R$ 400 por unidade). Laudo psicotécnico hospitalar obrigatório.",
      webhook: "https://discord.com/api/webhooks/1560687247869878294/WFpx_HfZFoNVsA-b8Fxx_hwVJidjHy2HNi2JD4-MsevtwQshLDcj8LJODGwyemWeu92A",
      fields: [
        { id: "pa_cidadao", label: "👤 Nome do Cidadão (Requerente)" },
        { id: "pa_id", label: "🪪 Passaporte do Cidadão" },
        { id: "pa_emprego", label: "💼 Emprego / Ocupação Atual", placeholder: "Ex.: Empresário, Mecânico, Comerciante..." },
        { 
          id: "pa_situacao", 
          label: "📋 Situação da Emissão", 
          type: "options", 
          options: ["Primeiro Porte", "Perda do Armamento", "Roubo / Furto"] 
        },
        { 
          id: "pa_justificativa", 
          label: "📝 Justificativa / Declaração da Ocorrência", 
          placeholder: "Ex.: Motivo para concessão do porte, ou circunstâncias detalhadas da perda/roubo...", 
          isFull: true 
        },
        { 
          id: "pa_psicotecnico", 
          label: "🏥 Laudo Psicotécnico Hospitalar", 
          type: "options", 
          options: ["Apto (Aprovado no Hospital)", "Inapto (Reprovado no Hospital)", "Pendente de Avaliação"] 
        },
        { id: "pa_medico", label: "🩺 Médico / Psicólogo Avaliador (Hospital)", placeholder: "Ex.: Dr. Roberto Silva (ID: 504)" },
        { id: "pa_arma", label: "🔫 Armamento Homologado (Exclusivo: 1 PT 9mm — R$ 80.000)", placeholder: "Pistola PT 9mm" },
        { id: "pa_serie", label: "🔢 Registro / Nº de Série da Arma", type: "serie-generator" },
        { 
          id: "pa_municao", 
          label: "📦 Quantidade de Munições (R$ 400 por unidade)", 
          type: "options", 
          options: [
            "Sem Munições (Somente 1 Arma PT — R$ 80.000)",
            "50 Munições (+ R$ 20.000 · Total R$ 100.000)", 
            "100 Munições (+ R$ 40.000 · Total R$ 120.000)", 
            "150 Munições (+ R$ 60.000 · Total R$ 140.000)", 
            "200 Munições (+ R$ 80.000 · Total R$ 160.000)", 
            "250 Munições (+ R$ 100.000 · Total R$ 180.000)"
          ] 
        },
        { id: "pa_valor", label: "💰 Valor Total Cobrado (1 Arma PT: 80k + Munições: R$ 400/un)", placeholder: "R$ 80.000", isFull: true }
      ]
    },
    {
      id: "limpeza",
      title: "Limpeza de Ficha",
      icon: "🛡️",
      svg: "limpeza",
      tag: "Reabilitação",
      desc: "Procedimento notarial de reabilitação e cancelamento de antecedentes (R$ 50.000 por cada prisão registrada).",
      webhook: "https://discord.com/api/webhooks/1561881362045083740/WZ5hDcs3bflRZOtJz2B979ANu28vZjOxxskbGVbeCw3KRvKmIUgGBGLpOHxSfXLttWJo",
      fields: [
        { id: "lf_cidadao", label: "👤 Nome do Cidadão (Requerente)" },
        { id: "lf_id", label: "🪪 Passaporte do Cidadão" },
        { id: "lf_advogado", label: "⚖️ Advogado Constituído / Defensor", placeholder: "Ex.: Dr. Zaith Frost (OAB: 12)" },
        { 
          id: "lf_situacao", 
          label: "⏱️ Situação da Pena / Cumprimento", 
          type: "options", 
          options: [
            "Pena Integralmente Cumprida & Fiança Paga",
            "Decurso do Prazo Legal de Reabilitação",
            "Absolvição / Revisão Criminal Homologada"
          ] 
        },
        { 
          id: "lf_prisoes", 
          label: "🔒 Quantidade de Prisões a Limpar (R$ 50.000 / prisão)", 
          type: "prisoes-counter", 
          isFull: true 
        },
        { 
          id: "lf_artigos", 
          label: "📋 Artigos Cometidos / Antecedentes a Limpar", 
          placeholder: "Ex.: Art. 1.4 (Resistência à Prisão), Art. 2.1 (Porte Ilegal de Arma), Art. 3.2 (Receptação)...", 
          isFull: true 
        },
        { 
          id: "lf_motivo", 
          label: "📝 Fundamentação / Parecer Notarial de Reabilitação", 
          placeholder: "Ex.: O requerente comprovou extinção da punibilidade, bom comportamento social e adimplemento das custas processuais, fazendo jus ao cancelamento das anotações penais.", 
          isFull: true 
        },
        { id: "lf_emissao", label: "📅 Data de Emissão / Homologação", placeholder: "DD/MM/AAAA", type: "emissao" },
        { id: "lf_valor", label: "💰 Valor Total Cobrado (R$ 50.000 por prisão)", placeholder: "R$ 50.000", isFull: true }
      ]
    }
  ];

  const renderField = (f) => {
    const label = cleanLabel(f.label);
    if (f.id === "lf_prisoes" || f.type === "prisoes-counter") {
      return `
        <div class="full prisoes-counter-block">
          <label class="opt-label" style="font-size:12.5px;font-weight:600;color:var(--strong);display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <span style="display:flex;align-items:center;gap:6px;">
              <span>🔒 Quantidade de Prisões a Limpar</span>
              <span class="badge-prisao-rate" style="background:rgba(212,175,95,0.15);color:var(--gold-3);border:1px solid var(--accent);font-size:11px;padding:2px 8px;border-radius:12px;font-weight:700;">R$ 50.000 por prisão</span>
            </span>
            <span class="muted" style="font-size:11.5px;">Cálculo automático do valor</span>
          </label>
          <div class="prisoes-counter-control" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div class="prisoes-stepper" style="display:inline-flex;align-items:center;background:var(--panel-solid);border:1.5px solid var(--line);border-radius:10px;padding:3px;">
              <button type="button" class="btn-stepper btn-prisao-dec" id="btn-prisao-dec" title="Diminuir quantidade" style="width:34px;height:34px;border:none;background:var(--panel-2);color:var(--text);border-radius:7px;font-size:18px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;">−</button>
              <input id="${f.id}" type="number" min="1" max="100" value="1" style="width:60px;text-align:center;border:none;background:transparent;color:var(--strong);font-size:15px;font-weight:700;-moz-appearance:textfield;" />
              <button type="button" class="btn-stepper btn-prisao-inc" id="btn-prisao-inc" title="Aumentar quantidade" style="width:34px;height:34px;border:none;background:var(--panel-2);color:var(--text);border-radius:7px;font-size:18px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;">+</button>
            </div>
            <div class="prisoes-quick-pills" style="display:flex;gap:6px;flex-wrap:wrap;">
              <button type="button" class="btn-prisao-pill active" data-qtd="1">1 prisão (50k)</button>
              <button type="button" class="btn-prisao-pill" data-qtd="2">2 prisões (100k)</button>
              <button type="button" class="btn-prisao-pill" data-qtd="3">3 prisões (150k)</button>
              <button type="button" class="btn-prisao-pill" data-qtd="4">4 prisões (200k)</button>
              <button type="button" class="btn-prisao-pill" data-qtd="5">5 prisões (250k)</button>
              <button type="button" class="btn-prisao-pill" data-qtd="6">6 prisões (300k)</button>
            </div>
          </div>
        </div>`;
    }
    if (f.id === "pa_arma") {
      return `
        <label class="${f.isFull ? "full" : ""}">${label}
          <input id="${f.id}" type="text" value="Pistola PT 9mm" readonly style="background:var(--bg-card);font-weight:600;color:var(--text);cursor:not-allowed;" title="Armamento homologado exclusivo: 1 Pistola PT 9mm (R$ 80.000)" />
        </label>`;
    }
    if (f.id === "lf_artigos") {
      return `
        <label class="full field-wrapper-artigos">
          <div class="field-label-row" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <span style="font-weight:600;color:var(--strong);font-size:12.5px;">${label}</span>
            <button type="button" class="btn-consultar-cp-field" id="btn-consultar-cp-lf" title="Consultar o Código Penal e selecionar artigos para a limpeza" style="padding:4px 10px;font-size:11.5px;display:flex;align-items:center;gap:6px;background:var(--panel-2);border:1px solid var(--accent);color:var(--gold-3);border-radius:6px;cursor:pointer;">
              <span>📜 Consultar Código Penal</span>
            </button>
          </div>
          <textarea id="${f.id}" rows="3" class="sdj-textarea" placeholder="${f.placeholder || "Ex.: Art. 1.4 (Resistência à Prisão), Art. 2.1 (Porte Ilegal)..."}" style="width:100%;border-radius:10px;padding:10px 12px;background:var(--panel-solid);border:1.5px solid var(--line);color:var(--text);font-family:inherit;font-size:13px;resize:vertical;"></textarea>
          <div class="artigos-quick-chips" style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            <span style="font-size:11px;color:var(--muted);font-weight:600;margin-right:2px;">Sugestões Rápidas:</span>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 1.4 · Resistência à Prisão">+ Art. 1.4 (Resistência)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 2.1 · Porte Ilegal de Arma">+ Art. 2.1 (Porte Ilegal)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 3.2 · Receptação">+ Art. 3.2 (Receptação)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 4.1 · Roubo">+ Art. 4.1 (Roubo)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 4.7 · Furto">+ Art. 4.7 (Furto)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 1.6 · Dano ao Patrimônio">+ Art. 1.6 (Dano)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 1.1 · Equipamento Balístico">+ Art. 1.1 (Eq. Balístico)</button>
            <button type="button" class="btn-artigo-chip" data-artigo="Art. 2.4 · Tráfico de Armas">+ Art. 2.4 (Tráfico Armas)</button>
          </div>
        </label>`;
    }
    if (f.type === "textarea" || f.id === "lf_motivo") {
      return `
        <label class="${f.isFull !== false ? "full" : ""}">
          <span style="font-weight:600;color:var(--strong);font-size:12.5px;margin-bottom:6px;display:block;">${label}</span>
          <textarea id="${f.id}" rows="${f.rows || 3}" class="sdj-textarea" placeholder="${f.placeholder || "Preencha..."}" style="width:100%;border-radius:10px;padding:10px 12px;background:var(--panel-solid);border:1.5px solid var(--line);color:var(--text);font-family:inherit;font-size:13px;resize:vertical;">${f.defaultValue || ""}</textarea>
        </label>`;
    }
    if (f.type === "alianca-cards") {
      return `
        <div class="full aliancas-selector-block">
          <label class="opt-label" style="font-size:12.5px;font-weight:600;color:var(--strong);display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span style="display:flex;align-items:center;gap:6px;">
              <span>💎 Modelos de Alianças e Joias Oficiais</span>
              <span class="badge-alianca-count">3 Opções Disponíveis</span>
            </span>
            <span class="muted" style="font-size:11.5px;font-weight:400;">Clique no modelo desejado</span>
          </label>
          <div class="aliancas-cards-grid" role="radiogroup" aria-label="Modelos de Aliança">
            ${f.options.map((o, i) => `
              <div class="alianca-visual-card ${i === 0 ? "active" : ""}" data-input="${f.id}" data-val="${o.tipo}" data-price="${o.preco}" role="radio" aria-checked="${i === 0}" tabindex="0">
                <div class="alianca-card-img-wrap">
                  <img src="${o.img}" alt="${o.nome}" class="alianca-card-img" loading="lazy" />
                  <span class="alianca-card-price-pill">${o.preco}</span>
                  <span class="alianca-card-check">✓</span>
                </div>
                <div class="alianca-card-body">
                  <div class="alianca-card-title-row">
                    <span class="alianca-radio-dot"></span>
                    <strong class="alianca-card-title">${o.nome}</strong>
                  </div>
                  <span class="alianca-card-sub">${o.sub}</span>
                  <p class="alianca-card-desc">${o.desc}</p>
                  <div class="alianca-card-footer">
                    <span class="alianca-meta-retirada">Retirada: <b>${o.retirada}</b></span>
                    <span class="alianca-meta-venda">Venda: <b>${o.preco}</b></span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <input type="hidden" id="${f.id}" value="${f.options[0].tipo}" data-default="${f.options[0].tipo}" />
        </div>`;
    }
    if (f.type === "options") {
      const extraHtml = f.id === "cp_jovem_aprendiz" ? `
        <div id="cnpj_jovem_aprendiz_alert" class="jovem-aprendiz-alert hidden" role="alert">
          <div class="jovem-alert-badge">
            <span class="jovem-alert-icon">⚠️</span>
            <span>PROCEDIMENTO OBRIGATÓRIO · PROGRAMA JOVEM APRENDIZ</span>
          </div>
          <div class="jovem-alert-body">
            <h4 class="jovem-alert-title">📋 Abertura de Ticket, Conselho Tutelar &amp; Vistorias Técnicas</h4>
            <p class="jovem-alert-text">
              Como a empresa declarou contratação de menores pelo programa <strong>Jovem Aprendiz</strong>, é obrigatório <strong>abrir um ticket e marcar com o Conselho Tutelar</strong>, para que possamos agendar a <strong>vistoria</strong> (junto ao <strong>Corpo de Bombeiros</strong> e à <strong>Vigilância Sanitária</strong>), e também para que sejam repassadas as <strong>informações das crianças/jovens que ali irão trabalhar</strong>.
            </p>
            <div class="jovem-alert-checklist">
              <div class="jovem-check-item">
                <span class="jovem-check-dot">1</span>
                <span><strong>Abrir Ticket Oficial:</strong> Abra um chamado para solicitação de protocolo especial de aprendizagem.</span>
              </div>
              <div class="jovem-check-item">
                <span class="jovem-check-dot">2</span>
                <span><strong>Conselho Tutelar:</strong> Agendamento e alinhamento com conselheiros tutelares da comarca.</span>
              </div>
              <div class="jovem-check-item">
                <span class="jovem-check-dot">3</span>
                <span><strong>Vistoria Conjunta:</strong> Inspeção técnica no local com Corpo de Bombeiros e Vigilância Sanitária.</span>
              </div>
              <div class="jovem-check-item">
                <span class="jovem-check-dot">4</span>
                <span><strong>Dados dos Menores:</strong> Apresentar qualificação, idade, documentos e comprovante escolar dos jovens.</span>
              </div>
            </div>
            <div class="jovem-alert-note">
              <span>📌 <em>A empresa não poderá iniciar as atividades com menores até a conclusão da vistoria e homologação final do Conselho Tutelar.</em></span>
            </div>
          </div>
        </div>` : "";

      return `
        <div class="full">
          <label class="opt-label" style="font-size:12px;font-weight:500;color:var(--muted);display:block;margin-bottom:6px;">${label}</label>
          <div class="opt-grid" role="radiogroup" aria-label="${label}">
            ${f.options.map((o, i) => `
              <button type="button" class="opt-card ${i === 0 ? "active" : ""}" data-input="${f.id}" data-val="${o}" role="radio" aria-checked="${i === 0}">
                <span class="radio"></span>${o}
              </button>`).join("")}
          </div>
          <input type="hidden" id="${f.id}" value="${f.options[0]}" data-default="${f.options[0]}" />
          ${extraHtml}
        </div>`;
    }
    if (f.type === "cnpj-generator") {
      return `
        <label class="full">${label}
          <span class="input-with-btn">
            <input id="${f.id}" type="text" placeholder="Clique em “Gerar CNPJ”" readonly />
            <button type="button" class="btn-outline btn-gerar-cnpj" data-input="${f.id}">${ICONS.dado} Gerar CNPJ</button>
          </span>
        </label>`;
    }
    if (f.type === "serie-generator") {
      return `
        <label class="full">${label}
          <span class="input-with-btn">
            <input id="${f.id}" type="text" placeholder="Clique em “Gerar Registro”" />
            <button type="button" class="btn-outline btn-gerar-serie" data-input="${f.id}">${ICONS.dado} Gerar Registro</button>
          </span>
        </label>`;
    }
    if (f.type === "emissao") {
      return `
        <label class="${f.isFull ? "full" : ""}">
          <span>${label}</span>
          <input id="${f.id}" type="text" class="input-emissao" placeholder="${f.placeholder || "DD/MM/AAAA"}" />
        </label>`;
    }
    if (f.type === "validade") {
      return `
        <label class="${f.isFull ? "full" : ""}">
          <div class="validade-label-bar">
            <span>${label}</span>
            <span class="validade-badge" id="${f.id}_badge">Prazo: 15 dias (padrão)</span>
          </div>
          <div class="validade-input-group">
            <input id="${f.id}" type="text" class="input-validade" data-emissao="${f.emissaoId || ""}" placeholder="${f.placeholder || "DD/MM/AAAA"}" />
            <div class="validade-btn-group">
              <button type="button" class="btn-val-quick active" data-target="${f.id}" data-days="15" title="Definir prazo padrão (15 dias)">15d</button>
              <button type="button" class="btn-val-quick" data-target="${f.id}" data-days="30" title="Definir prazo de 30 dias">30d</button>
              <button type="button" class="btn-val-quick" data-target="${f.id}" data-days="custom" title="Ajustar prazo livremente (mais ou menos dias)">± dias</button>
            </div>
          </div>
        </label>`;
    }
    return `
      <label class="${f.isFull ? "full" : ""}">${label}
        <input id="${f.id}" type="text" placeholder="${f.placeholder || "Preencha..."}" />
      </label>`;
  };

  const renderAttachmentsSection = (svc) => {
    const isAdocao = svc.id === "adocao";
    const fotoTitulo = isAdocao ? "Foto da Criança / Adotado" : "Foto da Criança";
    const fotoSub = isAdocao ? "Fotografia oficial do adotado (PNG, JPG, WEBP)" : "Fotografia oficial da criança / recém-nascido (PNG, JPG, WEBP)";
    const docTitulo = isAdocao ? "Documentos do Adotado / Termo de Adoção" : "Documentos Comprobatórios / Anexos";
    const docSub = isAdocao ? "Certidão originária, termo judicial, RG ou laudo (PDF ou imagem)" : "Cópia de RG, certidão anterior, DNV ou laudo hospitalar (PDF ou imagem)";
    return `
      <div class="form-section">📸 ${fotoTitulo} &amp; 📁 ${docTitulo}</div>
      <div class="service-attachments-grid">
        <div class="attachment-card">
          <div class="attachment-card-header">
            <span class="attachment-icon">📸</span>
            <div>
              <strong>${fotoTitulo}</strong>
              <p>${fotoSub}</p>
            </div>
          </div>
          <div class="attachment-dropzone" id="${svc.id}_photo_dropzone" data-sid="${svc.id}" data-type="photo">
            <input type="file" id="${svc.id}_photo_input" accept="image/*" class="attachment-file-input" />
            <div class="attachment-dropzone-content" id="${svc.id}_photo_empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="attachment-svg-icon">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span>Clique ou arraste a foto da criança aqui</span>
              <small>Vinculada à certidão oficial e anexada no Discord</small>
            </div>
            <div class="attachment-preview hidden" id="${svc.id}_photo_preview">
              <img id="${svc.id}_photo_img" src="" alt="${fotoTitulo}" class="attachment-thumb" />
              <div class="attachment-meta">
                <span id="${svc.id}_photo_name" class="attachment-name">foto.png</span>
                <button type="button" class="btn-remove-attachment" data-remove-photo="${svc.id}">✕ Remover foto</button>
              </div>
            </div>
          </div>
        </div>

        <div class="attachment-card">
          <div class="attachment-card-header">
            <span class="attachment-icon">📎</span>
            <div>
              <strong>${docTitulo}</strong>
              <p>${docSub}</p>
            </div>
          </div>
          <div class="attachment-dropzone" id="${svc.id}_doc_dropzone" data-sid="${svc.id}" data-type="doc">
            <input type="file" id="${svc.id}_doc_input" accept="application/pdf,image/*,.doc,.docx" class="attachment-file-input" />
            <div class="attachment-dropzone-content" id="${svc.id}_doc_empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="attachment-svg-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>Clique ou arraste os documentos comprobatórios aqui</span>
              <small>Enviado como anexo digital ao canal oficial do Discord</small>
            </div>
            <div class="attachment-preview hidden" id="${svc.id}_doc_preview">
              <div class="attachment-doc-icon">📄</div>
              <div class="attachment-meta">
                <strong id="${svc.id}_doc_name" class="attachment-name">documento.pdf</strong>
                <span id="${svc.id}_doc_size" class="attachment-size">0 KB</span>
                <button type="button" class="btn-remove-attachment" data-remove-doc="${svc.id}">✕ Remover anexo</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  };

  const dynContainer = $("#dynamic-services");
  dynContainer.innerHTML = servicesConfig.map((svc) => `
    <div id="tab-${svc.id}" class="tab-content">
      <div class="service-wrap">
        <header class="service-hero">
          <span class="card-icon">${ICONS[svc.svg]}</span>
          <div>
            <h2>${svc.title}</h2>
            <p>${svc.desc}</p>
          </div>
        </header>
        <section class="panel form-panel">
          <div class="form-body">
            <div class="form-section">Dados do registro</div>
            <div class="form-grid fields">${svc.fields.map(renderField).join("")}</div>

            ${svc.hasAttachments ? renderAttachmentsSection(svc) : ""}

            <div class="form-section">Responsável pelo registro</div>
            <div class="form-grid fields">
              <label>Nome do Agente<input id="${svc.id}_agente" type="text" placeholder="Ex.: Sgt. Souza" /></label>
              <label>Passaporte do Agente<input id="${svc.id}_agente_id" type="text" placeholder="Ex.: 9012" /></label>
            </div>

            <div class="form-actions">
              <button class="btn-outline btn-reset" data-sid="${svc.id}" type="button">${ICONS.limpar} Limpar</button>
              <button class="btn-outline btn-pdf-service" data-sid="${svc.id}" type="button" title="Baixar Certidão oficial em PDF">${ICONS.download} Baixar PDF</button>
              <button class="btn-primary btn-service" data-sid="${svc.id}" type="button">${DISCORD_LABEL}</button>
            </div>
          </div>
        </section>
      </div>
    </div>`).join("");

  // Opções (cards de seleção)
  function selectOption(btn) {
    if (!btn) return;
    const inputId = btn.dataset.input;
    $$(`.opt-card[data-input="${inputId}"]`).forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-checked", b === btn);
    });
    $("#" + inputId).value = btn.dataset.val;

    // Se for Aliança, atualiza o valor cobrado oficial correspondente
    if (inputId === "al_tipo") {
      const precoMap = { "Namoro": "R$ 15.000", "Noivado": "R$ 30.000", "Casamento": "R$ 45.000" };
      const valInput = $("#al_valor");
      if (valInput) {
        valInput.value = precoMap[btn.dataset.val] || "";
      }
    }

    // Se for Porte de Arma, ajusta dinamicamente a justificativa conforme a situação selecionada
    if (inputId === "pa_situacao") {
      const justInput = $("#pa_justificativa");
      if (justInput) {
        if (btn.dataset.val === "Primeiro Porte") {
          justInput.placeholder = "Ex.: Legítima defesa pessoal, segurança do patrimônio e transporte de valores...";
        } else if (btn.dataset.val.includes("Perda")) {
          justInput.placeholder = "Ex.: Data aproximada, local e circunstâncias da perda ou extravio do armamento anterior...";
        } else if (btn.dataset.val.includes("Roubo")) {
          justInput.placeholder = "Ex.: Boletim de ocorrência policial, data, local e relato do roubo/furto sofrido...";
        }
      }
    }

    // Se for Porte de Arma, calcula: 1 PT 9mm (80k) + Munições (400 por unidade)
    if (inputId === "pa_municao") {
      const valInput = $("#pa_valor");
      if (valInput) {
        const valText = btn.dataset.val;
        if (valText.includes("Sem Munições")) {
          valInput.value = "R$ 80.000";
        } else if (valText.includes("50")) {
          valInput.value = "R$ 100.000";
        } else if (valText.includes("100")) {
          valInput.value = "R$ 120.000";
        } else if (valText.includes("150")) {
          valInput.value = "R$ 140.000";
        } else if (valText.includes("200")) {
          valInput.value = "R$ 160.000";
        } else if (valText.includes("250")) {
          valInput.value = "R$ 180.000";
        }
      }
    }

    // Se for Jovem Aprendiz no CNPJ, mostra/oculta o aviso obrigatório do Conselho Tutelar
    if (inputId === "cp_jovem_aprendiz") {
      const alertBox = $("#cnpj_jovem_aprendiz_alert");
      if (alertBox) {
        const isSim = btn.dataset.val === "Sim";
        if (isSim) {
          alertBox.classList.remove("hidden");
          alertBox.classList.add("visible");
        } else {
          alertBox.classList.add("hidden");
          alertBox.classList.remove("visible");
        }
      }
    }
  }
  $$(".opt-card").forEach((btn) => btn.addEventListener("click", () => selectOption(btn)));

  // Cards visuais ilustrativos de Aliança
  function selectAliancaCard(card) {
    if (!card) return;
    const inputId = card.dataset.input;
    const tipoVal = card.dataset.val;
    const priceVal = card.dataset.price;

    $$(`.alianca-visual-card[data-input="${inputId}"]`).forEach((c) => {
      const isThis = c === card;
      c.classList.toggle("active", isThis);
      c.setAttribute("aria-checked", isThis);
    });

    const hiddenInput = $("#" + inputId);
    if (hiddenInput) hiddenInput.value = tipoVal;

    const valInput = $("#al_valor");
    if (valInput) valInput.value = priceVal;
  }
  $$(".alianca-visual-card").forEach((card) => {
    card.addEventListener("click", () => selectAliancaCard(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectAliancaCard(card);
      }
    });
  });

  function aplicarPrecosPadrao() {
    if ($("#al_valor") && !$("#al_valor").value) $("#al_valor").value = "R$ 15.000";
    if ($("#cas_valor") && !$("#cas_valor").value) $("#cas_valor").value = "R$ 200.000";
    if ($("#div_valor") && !$("#div_valor").value) $("#div_valor").value = "R$ 250.000";
    if ($("#tn_valor") && !$("#tn_valor").value) $("#tn_valor").value = "R$ 150.000";
    if ($("#rf_valor") && !$("#rf_valor").value) $("#rf_valor").value = "R$ 250.000";
    if ($("#cp_valor") && !$("#cp_valor").value) $("#cp_valor").value = "R$ 250.000";
    if ($("#cn_valor") && !$("#cn_valor").value) $("#cn_valor").value = "R$ 150.000";
    if ($("#ca_valor") && !$("#ca_valor").value) $("#ca_valor").value = "R$ 150.000";
    if ($("#pa_arma") && !$("#pa_arma").value) $("#pa_arma").value = "Pistola PT 9mm";
    if ($("#pa_valor") && !$("#pa_valor").value) $("#pa_valor").value = "R$ 80.000";
    if ($("#lf_prisoes") && !$("#lf_prisoes").value) $("#lf_prisoes").value = "1";
    if ($("#lf_valor") && !$("#lf_valor").value) $("#lf_valor").value = "R$ 50.000";
  }

  // Gerador de CNPJ
  $$(".btn-gerar-cnpj").forEach((btnCnpj) => {
    btnCnpj.addEventListener("click", () => {
      const R = () => Math.floor(Math.random() * 10);
      $("#" + btnCnpj.dataset.input).value = `${R()}${R()}.${R()}${R()}${R()}.${R()}${R()}${R()}/0001-${R()}${R()}`;
      toast("✓ CNPJ gerado");
    });
  });

  // Gerador de Registro de Arma
  $$(".btn-gerar-serie").forEach((btnSerie) => {
    btnSerie.addEventListener("click", () => {
      const R = () => Math.floor(Math.random() * 900000 + 100000);
      $("#" + btnSerie.dataset.input).value = `PT-BR-${R()}`;
      toast("✓ Registro do armamento gerado");
    });
  });

  // Controle de Quantidade e Valor de Prisões (Limpeza de Ficha: R$ 50.000 / prisão)
  function atualizarPrecoPrisoes(qtd) {
    const num = Math.max(1, parseInt(qtd, 10) || 1);
    const inp = $("#lf_prisoes");
    if (inp && document.activeElement !== inp) inp.value = num;

    const total = num * 50000;
    const valorInp = $("#lf_valor");
    if (valorInp) {
      valorInp.value = `R$ ${total.toLocaleString("pt-BR")}`;
    }

    $$(".btn-prisao-pill").forEach((b) => {
      b.classList.toggle("active", Number(b.dataset.qtd) === num);
    });
  }

  /* ---------- Anexos & Fotos de Serviços (Nascimento & Adoção) ---------- */
  const serviceAttachments = {
    nascimento: { photo: null, doc: null },
    adocao: { photo: null, doc: null }
  };

  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  function handlePhotoUpload(sid, file) {
    if (!file || !file.type.startsWith("image/")) {
      toast("Selecione um arquivo de imagem válido (PNG, JPG, WEBP).", true);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast("A foto é muito grande. Escolha uma imagem de até 8 MB.", true);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      // Converte para PNG via canvas garantindo total compatibilidade com jsPDF
      const rawData = e.target.result;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        const maxDim = 800;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const pngDataUrl = canvas.toDataURL("image/png");

        if (!serviceAttachments[sid]) serviceAttachments[sid] = { photo: null, doc: null };
        serviceAttachments[sid].photo = { file, dataUrl: pngDataUrl, name: file.name };

        const previewImg = $(`#${sid}_photo_img`);
        const previewName = $(`#${sid}_photo_name`);
        const previewWrap = $(`#${sid}_photo_preview`);
        const emptyWrap = $(`#${sid}_photo_empty`);

        if (previewImg) previewImg.src = pngDataUrl;
        if (previewName) previewName.textContent = file.name;
        if (previewWrap) previewWrap.classList.remove("hidden");
        if (emptyWrap) emptyWrap.classList.add("hidden");

        toast("✓ Fotografia oficial vinculada com sucesso!");
      };
      img.onerror = () => toast("Erro ao processar imagem.", true);
      img.src = rawData;
    };
    reader.onerror = () => toast("Erro ao ler foto.", true);
    reader.readAsDataURL(file);
  }

  function clearPhotoUpload(sid) {
    if (serviceAttachments[sid]) serviceAttachments[sid].photo = null;
    const input = $(`#${sid}_photo_input`);
    if (input) input.value = "";
    const previewImg = $(`#${sid}_photo_img`);
    if (previewImg) previewImg.src = "";
    const previewWrap = $(`#${sid}_photo_preview`);
    const emptyWrap = $(`#${sid}_photo_empty`);
    if (previewWrap) previewWrap.classList.add("hidden");
    if (emptyWrap) emptyWrap.classList.remove("hidden");
  }

  function handleDocUpload(sid, file) {
    if (file.size > 15 * 1024 * 1024) {
      toast("O documento é muito grande. Limite máximo: 15 MB.", true);
      return;
    }
    if (!serviceAttachments[sid]) serviceAttachments[sid] = { photo: null, doc: null };
    serviceAttachments[sid].doc = { file, name: file.name, size: formatBytes(file.size) };

    const nameEl = $(`#${sid}_doc_name`);
    const sizeEl = $(`#${sid}_doc_size`);
    const previewWrap = $(`#${sid}_doc_preview`);
    const emptyWrap = $(`#${sid}_doc_empty`);

    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = formatBytes(file.size);
    if (previewWrap) previewWrap.classList.remove("hidden");
    if (emptyWrap) emptyWrap.classList.add("hidden");

    toast("✓ Documento extra anexado com sucesso!");
  }

  function clearDocUpload(sid) {
    if (serviceAttachments[sid]) serviceAttachments[sid].doc = null;
    const input = $(`#${sid}_doc_input`);
    if (input) input.value = "";
    const previewWrap = $(`#${sid}_doc_preview`);
    const emptyWrap = $(`#${sid}_doc_empty`);
    if (previewWrap) previewWrap.classList.add("hidden");
    if (emptyWrap) emptyWrap.classList.remove("hidden");
  }

  function initServiceAttachments() {
    ["nascimento", "adocao"].forEach((sid) => {
      const photoInput = $(`#${sid}_photo_input`);
      const photoDrop = $(`#${sid}_photo_dropzone`);
      const docInput = $(`#${sid}_doc_input`);
      const docDrop = $(`#${sid}_doc_dropzone`);

      if (photoInput) {
        photoInput.addEventListener("change", (e) => {
          if (e.target.files && e.target.files[0]) {
            handlePhotoUpload(sid, e.target.files[0]);
          }
        });
      }

      if (docInput) {
        docInput.addEventListener("change", (e) => {
          if (e.target.files && e.target.files[0]) {
            handleDocUpload(sid, e.target.files[0]);
          }
        });
      }

      [photoDrop, docDrop].forEach((drop) => {
        if (!drop) return;
        ["dragenter", "dragover"].forEach((evt) => {
          drop.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            drop.classList.add("dragover");
          });
        });
        ["dragleave", "drop"].forEach((evt) => {
          drop.addEventListener(evt, (e) => {
            e.preventDefault();
            e.stopPropagation();
            drop.classList.remove("dragover");
          });
        });
        drop.addEventListener("drop", (e) => {
          e.preventDefault();
          e.stopPropagation();
          drop.classList.remove("dragover");
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (drop.dataset.type === "photo") {
              handlePhotoUpload(sid, file);
            } else {
              handleDocUpload(sid, file);
            }
          }
        });
      });
    });

    document.addEventListener("click", (e) => {
      const removePhotoBtn = e.target.closest("[data-remove-photo]");
      if (removePhotoBtn) {
        const sid = removePhotoBtn.dataset.removePhoto;
        clearPhotoUpload(sid);
        toast("Foto removida.");
        return;
      }
      const removeDocBtn = e.target.closest("[data-remove-doc]");
      if (removeDocBtn) {
        const sid = removeDocBtn.dataset.removeDoc;
        clearDocUpload(sid);
        toast("Documento extra removido.");
        return;
      }
    });
  }

  function resetService(svc) {
    svc.fields.forEach((f) => {
      const el = $(`#${f.id}`);
      if (f.type === "options") selectOption($(`.opt-card[data-input="${f.id}"][data-val="${el.dataset.default}"]`));
      else if (f.type === "alianca-cards") {
        selectAliancaCard($(`.alianca-visual-card[data-input="${f.id}"][data-val="${el.dataset.default}"]`));
      }
      else el.value = "";
    });
    $(`#${svc.id}_agente`).value = "";
    $(`#${svc.id}_agente_id`).value = "";
    if (svc.id === "limpeza") {
      atualizarPrecoPrisoes(1);
    }
    if (serviceAttachments[svc.id]) {
      clearPhotoUpload(svc.id);
      clearDocUpload(svc.id);
    }
    aplicarPrecosPadrao();
    initValidades();
  }
  $$(".btn-reset").forEach((btn) =>
    btn.addEventListener("click", () => resetService(servicesConfig.find((s) => s.id === btn.dataset.sid)))
  );

  // Chips Rápidos de Artigos, Prisões e Consulta CP na Limpeza de Ficha
  document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-prisao-dec")) {
      e.preventDefault();
      const inp = $("#lf_prisoes");
      const cur = Math.max(1, (parseInt(inp?.value, 10) || 1) - 1);
      if (inp) inp.value = cur;
      atualizarPrecoPrisoes(cur);
      return;
    }

    if (e.target.closest("#btn-prisao-inc")) {
      e.preventDefault();
      const inp = $("#lf_prisoes");
      const cur = (parseInt(inp?.value, 10) || 1) + 1;
      if (inp) inp.value = cur;
      atualizarPrecoPrisoes(cur);
      return;
    }

    const pill = e.target.closest(".btn-prisao-pill");
    if (pill) {
      e.preventDefault();
      const qtd = parseInt(pill.dataset.qtd, 10);
      atualizarPrecoPrisoes(qtd);
      return;
    }

    const chip = e.target.closest(".btn-artigo-chip");
    if (chip) {
      e.preventDefault();
      const art = chip.dataset.artigo;
      const textarea = $("#lf_artigos");
      if (textarea) {
        const cur = textarea.value.trim();
        if (!cur) {
          textarea.value = art;
        } else if (!cur.includes(art)) {
          textarea.value = cur + ", " + art;
        }
        toast(`✓ Adicionado: ${art}`);
      }
      return;
    }

    if (e.target.closest("#btn-consultar-cp-lf")) {
      e.preventDefault();
      openModal();
      return;
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "lf_prisoes") {
      atualizarPrecoPrisoes(e.target.value);
    }
  });

  /* ---------- Validade das Certidões (padrão 15 dias, editável) ---------- */
  const VALIDADE_PADRAO = 15;
  const parseDataBR = (s) => {
    const m = String(s || "").trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return null;
    const d = new Date(+m[3], +m[2] - 1, +m[1]);
    return d.getDate() === +m[1] && d.getMonth() === +m[2] - 1 ? d : null;
  };
  const fmtDataBR = (d) => d.toLocaleDateString("pt-BR");
  const somarDias = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
  const diffDias = (a, b) => Math.round((b - a) / 86400000);

  function atualizarBadgeValidade(inp) {
    const badge = $(`#${inp.id}_badge`);
    if (!badge) return;
    const em = parseDataBR($(`#${inp.dataset.emissao}`)?.value);
    const val = parseDataBR(inp.value);
    const btns = $$(`.btn-val-quick[data-target="${inp.id}"]`);
    if (!em || !val) {
      badge.textContent = "Data inválida (DD/MM/AAAA)";
      badge.classList.add("invalid");
      btns.forEach((b) => b.classList.remove("active"));
      return;
    }
    const dias = diffDias(em, val);
    badge.classList.toggle("invalid", dias < 1);
    badge.textContent = dias < 1
      ? "Validade deve ser após a emissão"
      : `Prazo: ${dias} dia${dias === 1 ? "" : "s"}${dias === VALIDADE_PADRAO ? " (padrão)" : ""}`;
    btns.forEach((b) => {
      const d = b.dataset.days;
      b.classList.toggle("active", d === "custom" ? dias >= 1 && dias !== 15 && dias !== 30 : Number(d) === dias);
    });
  }

  function aplicarPrazo(inp, dias) {
    const emInp = $(`#${inp.dataset.emissao}`);
    let em = parseDataBR(emInp?.value);
    if (!em) { em = new Date(); if (emInp) emInp.value = fmtDataBR(em); }
    inp.dataset.dias = dias;
    inp.value = fmtDataBR(somarDias(em, dias));
    atualizarBadgeValidade(inp);
  }

  function initValidades() {
    $$(".input-validade").forEach((inp) => {
      const emInp = $(`#${inp.dataset.emissao}`);
      if (emInp && !emInp.value) emInp.value = fmtDataBR(new Date());
      aplicarPrazo(inp, VALIDADE_PADRAO);
    });
  }

  $$(".input-validade").forEach((inp) => {
    // Edição manual da data de validade (mais ou menos que 15 dias)
    inp.addEventListener("input", () => {
      const em = parseDataBR($(`#${inp.dataset.emissao}`)?.value);
      const val = parseDataBR(inp.value);
      if (em && val) inp.dataset.dias = diffDias(em, val);
      atualizarBadgeValidade(inp);
    });
    // Alterou a emissão -> recalcula mantendo o prazo escolhido
    const emInp = $(`#${inp.dataset.emissao}`);
    if (emInp) emInp.addEventListener("input", () => {
      if (parseDataBR(emInp.value)) aplicarPrazo(inp, Number(inp.dataset.dias) || VALIDADE_PADRAO);
      else atualizarBadgeValidade(inp);
    });
  });

  $$(".btn-val-quick").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const inp = $(`#${btn.dataset.target}`);
      if (btn.dataset.days === "custom") {
        const r = prompt("Prazo de validade em dias (a contar da emissão):", inp.dataset.dias || VALIDADE_PADRAO);
        if (r === null) return;
        const n = parseInt(r, 10);
        if (isNaN(n) || n < 1) { toast("Informe um número de dias válido (mínimo 1).", true); return; }
        aplicarPrazo(inp, n);
      } else {
        aplicarPrazo(inp, Number(btn.dataset.days));
      }
      toast(`✓ Validade ajustada para ${inp.dataset.dias} dias`);
    })
  );

  /* ---------- Card: Tabela de Preços ---------- */
  const precosCard = {
    id: "precos", title: "Tabela de Preços", svg: "tabela", tag: "Regulamento",
    desc: "Valores regulamentados: custos internos de retirada e preços de venda ao cidadão."
  };

  /* ---------- Card: Prova Oral do Recrutador ---------- */
  const provaOralCard = {
    id: "provaoral",
    title: "Prova Oral do Recrutador",
    svg: "prova",
    tag: "Recrutamento",
    featured: true,
    desc: "Aplicação do teste oral oficial de admissão (12 perguntas nível fácil), gabarito e ata notarial em PDF."
  };

  /* ---------- Card: Carteirinha Funcional SDJ ---------- */
  const carterinhaCard = {
    id: "carterinha",
    title: "Carteirinha Funcional SDJ",
    svg: "credencial",
    tag: "Credenciamento",
    featured: true,
    desc: "Emissão oficial de identidade funcional para membros do Judiciário com foto, QR Code, verso e download em PDF/PNG."
  };

  /* ---------- Card: Tribunal de Justiça ---------- */
  const tribunalCard = {
    id: "tribunal",
    title: "Tribunal de Justiça",
    svg: "balanca",
    tag: "Poder Judiciário",
    featured: true,
    desc: "Portal solene do Tribunal: petições iniciais, mandados, autorizações judiciais, processos cíveis/criminais, decisões e audiências.",
    url: "tribunal.html"
  };

  /* ---------- Card: Ofício de Fiscalização ---------- */
  const oficioCard = {
    id: "oficio",
    title: "Ofício de Fiscalização",
    svg: "oficio",
    tag: "Ministério Público",
    featured: false,
    desc: "Notificação oficial e requisição para diligência fiscalizatória institucional em empresas e comércios.",
    url: "tribunal.html?service=oficio"
  };

  /* ---------- Card: Notificação Extrajudicial ---------- */
  const notificacaoCard = {
    id: "notificacao",
    title: "Notificação Extrajudicial",
    svg: "notificacao",
    tag: "Extrajudicial",
    featured: false,
    desc: "Expedição de notificação extrajudicial com fundamentos, advertências legais e prazo para manifestações.",
    url: "tribunal.html?service=notificacao"
  };

  /* ---------- Card: Gabinete dos Juízes & Magistrados ---------- */
  const gabineteCard = {
    id: "gabinete",
    title: "Gabinete dos Juízes",
    svg: "gabinete",
    tag: "Exclusivo · PIN",
    featured: true,
    desc: "Área reservada aos Juízes e Desembargadores: homologações com fé pública, sentenças, mandados e chancelas judiciais.",
    url: "gabinete.html"
  };

  /* ---------- Home: cards de serviço ---------- */
  const allCards = [calculadoraCard, tribunalCard, gabineteCard, oficioCard, notificacaoCard, carterinhaCard, provaOralCard, precosCard, ...servicesConfig];
  $("#calc-icon").innerHTML = ICONS.balanca;
  $("#home-grid").innerHTML = allCards.map((c, i) => `
    <button class="nav-card ${c.featured ? "featured" : ""}" type="button" id="card-${c.id}" data-target="tab-${c.id}" data-title="${c.title}" ${c.url ? `data-url="${c.url}"` : ""} style="animation-delay:${0.05 * i}s">
      <div class="card-top">
        <span class="card-icon">${ICONS[c.svg]}</span>
        <span class="card-tag">${c.tag}</span>
      </div>
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
      <div class="card-foot"><span>Acessar serviço</span>${ICONS.seta}</div>
    </button>`).join("");

  $("#stat-servicos").textContent = allCards.length;
  $("#stat-artigos").textContent = Object.keys(artigos).length;
  // Data do dia: pega a data do computador e atualiza a cada minuto
  // (vira sozinha à meia-noite, mesmo com a página aberta)
  function atualizarData() {
    const hoje = new Date();
    $("#stat-data").textContent = hoje.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    $("#stat-dia").textContent = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
  }
  atualizarData();
  setInterval(atualizarData, 60 * 1000);

  $("#home-search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    let n = 0;
    $$("#home-grid .nav-card").forEach((card) => {
      const show = !q || card.textContent.toLowerCase().includes(q);
      card.classList.toggle("hidden", !show);
      n += show;
    });
    $("#home-empty").classList.toggle("hidden", n > 0);
  });

  /* ---------- Navegação ---------- */
  function goTo(target, title) {
    const isHome = target === "home";
    document.body.dataset.view = target;
    $("#view-home").classList.toggle("active", isHome);
    $("#view-service").classList.toggle("active", !isHome);
    $$(".tab-content").forEach((t) => t.classList.toggle("active", t.id === target));
    $("#crumb-sep").classList.toggle("hidden", isHome);
    $("#crumb-current").textContent = isHome ? "" : title;
    $("#main").scrollTop = 0;
  }
  $$("#home-grid .nav-card").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.dataset.url) {
        window.location.href = btn.dataset.url;
        return;
      }
      goTo(btn.dataset.target, btn.dataset.title);
    })
  );
  $("#btn-back").addEventListener("click", () => goTo("home"));
  $("#crumb-home").addEventListener("click", (e) => { e.preventDefault(); goTo("home"); });

  // Suporte a link direto por parâmetro (?service=nascimento ou ?tab=nascimento)
  const urlParams = new URLSearchParams(window.location.search);
  const svcParam = urlParams.get("service") || urlParams.get("tab");
  if (svcParam) {
    const card = $(`#card-${svcParam}`);
    if (card) {
      goTo(card.dataset.target || `tab-${svcParam}`, card.dataset.title || "Serviço");
    }
  }

  async function getServicePDFData(svc) {
    const sid = svc.id;
    const agente = $(`#${sid}_agente`).value || "—";
    const agenteId = $(`#${sid}_agente_id`).value || "—";

    const fields = svc.fields.map((f) => {
      const el = $(`#${f.id}`);
      const val = el ? el.value || "Não informado" : "Não informado";
      return {
        label: cleanLabel(f.label),
        value: val
      };
    });

    const fotoDataUrl = serviceAttachments[sid]?.photo?.dataUrl || null;
    const anexoDocName = serviceAttachments[sid]?.doc?.name || null;

    return await window.SDJ_PDF.generateServicePDF({
      service: svc,
      fields,
      agente,
      agenteId,
      cidade: CONFIG.cidade,
      fotoDataUrl,
      anexoDocName
    });
  }

  // Dynamic Service Submission
  $$(".btn-service").forEach(btn => {
    btn.addEventListener("click", async () => {
      const sid = btn.dataset.sid;
      const svc = servicesConfig.find(s => s.id === sid);
      
      const agente = $(`#${sid}_agente`).value || "—";
      const agenteId = $(`#${sid}_agente_id`).value || "—";

      const embed = {
        title: `📄 Registro: ${svc.title.toUpperCase()}`,
        color: 13938487, // dourado #d4af37
        fields: [],
        footer: { text: `Tribunal de Justiça — ${CONFIG.cidade.toUpperCase()} • Agente: ${agente} (${agenteId})` },
        timestamp: new Date().toISOString()
      };

      svc.fields.forEach(f => {
        const val = $(`#${f.id}`).value || "Não informado";
        embed.fields.push({ 
          name: f.label.replace(/^.*?\s/, ""), // remove emoji inicial para ficar limpo no titulo
          value: `**${val}**`, 
          inline: !f.isFull 
        });
      });

      let pdfData = null;
      try {
        if (window.SDJ_PDF) {
          pdfData = await getServicePDFData(svc);
        }
      } catch (err) {
        console.warn("Falha ao gerar PDF para o Discord:", err);
      }

      let webhookUrl = (svc && svc.webhook) || "";
      if (sid === "casamento") {
        webhookUrl = "https://discord.com/api/webhooks/1560000830436806716/6MdSLFAUlYGzR5UxAMYNnSRfuonjv44niLAwQ-1GUgbyaCfljWI6LZl2GlV1vuGl2UEp";
      } else if (sid === "divorcio") {
        webhookUrl = "https://discord.com/api/webhooks/1562528999182303255/139cQN1FKlB0fsRUL9qEuL58H5Yu64IxGz2a70F0MXMGf9gicglTqRctLT7g12sIXgU1";
      } else if (sid === "alianca") {
        webhookUrl = "https://discord.com/api/webhooks/1557909803957747783/HFhg6mZJkwnbFtgbKgQ3DgAThaa6RB32O7Y6T8r2ZRWhq1kRe7KwwkmPBMCwxX2Iqws2";
      } else if (sid === "porte") {
        webhookUrl = "https://discord.com/api/webhooks/1560687247869878294/WFpx_HfZFoNVsA-b8Fxx_hwVJidjHy2HNi2JD4-MsevtwQshLDcj8LJODGwyemWeu92A";
      } else if (sid === "limpeza") {
        webhookUrl = "https://discord.com/api/webhooks/1561881362045083740/WZ5hDcs3bflRZOtJz2B979ANu28vZjOxxskbGVbeCw3KRvKmIUgGBGLpOHxSfXLttWJo";
      }

      let payload = { embeds: [embed] };
      if (sid === "porte") {
        const laudoVal = ($("#pa_psicotecnico")?.value || "").toLowerCase();
        const situacaoVal = ($("#pa_situacao")?.value || "").toLowerCase();
        let tagSituacao = "";
        if (situacaoVal.includes("roubo")) {
          tagSituacao = " · 2ª VIA POR ROUBO/FURTO";
        } else if (situacaoVal.includes("perda")) {
          tagSituacao = " · 2ª VIA POR PERDA";
        } else {
          tagSituacao = " · 1º PORTE";
        }

        if (laudoVal.includes("inapto")) {
          embed.color = 15158332; // Vermelho
          payload.content = `🚨 **[ALERTA DE SEGURANÇA · LAUDO INAPTO NO HOSPITAL${tagSituacao}]**\nO cidadão foi reprovado no exame psicotécnico hospitalar. Concessão de porte de arma e entrega de munições **RECUSADAS/BLOQUEADAS**.`;
        } else if (laudoVal.includes("pendente")) {
          embed.color = 15844367; // Amarelo
          payload.content = `⏳ **[LAUDO HOSPITALAR PENDENTE${tagSituacao}]**\nA emissão do porte de arma e a entrega de munições aguardam a realização e laudo favorável do teste psicotécnico no Hospital.`;
        } else {
          embed.color = 3066993; // Verde
          payload.content = `🔫 **[PORTE DE ARMA (PT) & MUNIÇÃO EMITIDO COM SUCESSO${tagSituacao}]**\nCidadão aprovado no teste psicotécnico hospitalar. Porte de pistola PT e munições liberados com fé pública.`;
        }
      } else if (sid === "limpeza") {
        const cidadao = $("#lf_cidadao")?.value || "Cidadão";
        const idCidadao = $("#lf_id")?.value ? ` (ID: ${$("#lf_id").value})` : "";
        const artigos = $("#lf_artigos")?.value || "Artigos conforme certidão";
        const qtdPrisoes = $("#lf_prisoes")?.value || "1";
        const valorTotal = $("#lf_valor")?.value || "R$ 50.000";
        embed.title = "🛡️ CERTIDÃO NOTARIAL DE REABILITAÇÃO & LIMPEZA DE FICHA";
        embed.color = 0x10b981; // Verde esmeralda (#10b981)
        payload.content = `🛡️ **[REABILITAÇÃO CRIMINAL · LIMPEZA DE FICHA HOMOLOGADA]**\nO Departamento Jurídico certifica a extinção de punibilidade e o cancelamento dos antecedentes penais de **${cidadao}**${idCidadao}.\n🔒 **Prisões Registradas a Limpar:** **${qtdPrisoes} prisão(ões)** *(Taxa: R$ 50.000 por prisão)*\n💰 **Valor Total Homologado:** **${valorTotal}**\n📋 **Artigos Extintos/Limpos:** *${artigos}*\n📄 *Certidão oficial notarial com fé pública anexada em PDF.*`;
      } else if (sid === "divorcio") {
        const conj1 = $("#div_conjuge1")?.value || "Cônjuge 1";
        const id1 = $("#div_id1")?.value ? ` (ID: ${$("#div_id1").value})` : "";
        const conj2 = $("#div_conjuge2")?.value || "Cônjuge 2";
        const id2 = $("#div_id2")?.value ? ` (ID: ${$("#div_id2").value})` : "";
        const tipo = $("#div_tipo")?.value || "Consensual";
        const valorTotal = $("#div_valor")?.value || "R$ 250.000";
        embed.title = "💔 CERTIDÃO NOTARIAL DE DIVÓRCIO & DISSOLUÇÃO MATRIMONIAL";
        embed.color = 0x991b1b; // Vermelho escuro nobre
        payload.content = `💔 **[DISSOLUÇÃO CONJUGAL · HOMOLOGAÇÃO DE DIVÓRCIO]**\nO Departamento Notarial e Judiciário certifica a dissolução definitiva do casamento entre **${conj1}**${id1} e **${conj2}**${id2}.\n⚖️ **Modalidade:** **${tipo}**\n💰 **Valor Homologado:** **${valorTotal}**\n📜 *Averbação formal expedida ao Livro B de Casamentos com fé pública irretratável. Certidão completa anexada em PDF.*`;
      } else if (sid === "nascimento") {
        const crianca = $("#cn_crianca")?.value || "Criança";
        const idCrianca = $("#cn_id")?.value ? ` (ID: ${$("#cn_id").value})` : "";
        const r1 = $("#cn_resp1")?.value || "Responsável 1";
        const r2 = $("#cn_resp2")?.value ? ` e ${$("#cn_resp2").value}` : "";
        const telResp1 = $("#cn_tel_resp")?.value ? `\n📞 **Contato Resp. 1:** ${$("#cn_tel_resp").value}` : "";
        const telResp2 = $("#cn_tel_resp2")?.value ? `\n📞 **Contato Resp. 2:** ${$("#cn_tel_resp2").value}` : "";
        const dataNasc = $("#cn_data")?.value ? `\n📅 **Nascimento:** ${$("#cn_data").value}` : "";
        const valorTotal = $("#cn_valor")?.value || "R$ 150.000";
        embed.title = "🚼 CERTIDÃO NOTARIAL DE NASCIMENTO & REGISTRO CIVIL";
        embed.color = 0x0284c7; // Azul celeste notarial
        payload.content = `🚼 **[REGISTRO CIVIL · CERTIDÃO DE NASCIMENTO EXPEDIDA]**\nO Cartório Notarial e Judiciário certifica o assento oficial de nascimento de **${crianca}**${idCrianca}.\n👥 **Filiação / Responsáveis:** ${r1}${r2}${telResp1}${telResp2}${dataNasc}\n💰 **Taxa Notarial:** **${valorTotal}**\n📜 *Assento lavrado com fé pública no Livro A de Registros. Certidão oficial anexada em PDF.*`;
      } else if (sid === "adocao") {
        const adotado = $("#ca_adotado")?.value || "Adotado";
        const idAdotado = $("#ca_id_adotado")?.value ? ` (ID: ${$("#ca_id_adotado").value})` : "";
        const r1 = $("#ca_resp1")?.value || "Responsável 1";
        const r2 = $("#ca_resp2")?.value ? ` e ${$("#ca_resp2").value}` : "";
        const telResp1 = $("#ca_tel_resp")?.value ? `\n📞 **Contato Resp. 1:** ${$("#ca_tel_resp").value}` : "";
        const telResp2 = $("#ca_tel_resp2")?.value ? `\n📞 **Contato Resp. 2:** ${$("#ca_tel_resp2").value}` : "";
        const valorTotal = $("#ca_valor")?.value || "R$ 150.000";
        embed.title = "📝 CERTIDÃO NOTARIAL DE ADOÇÃO & FILIAÇÃO CIVIL";
        embed.color = 0x8b5cf6; // Roxo nobre
        payload.content = `📝 **[FILIAÇÃO CIVIL · HOMOLOGAÇÃO DE ADOÇÃO]**\nO Cartório Notarial e Judiciário certifica a formalização definitiva do vínculo de adoção de **${adotado}**${idAdotado}.\n👨‍👩‍👧 **Pais / Responsáveis Adotantes:** ${r1}${r2}${telResp1}${telResp2}\n💰 **Taxa Notarial:** **${valorTotal}**\n📜 *Homologado nos termos da legislação notarial com fé pública. Certidão oficial anexada em PDF.*`;
      } else if (sid === "cnpj") {
        const empresa = $("#cp_empresa")?.value || "Empresa";
        const cnpjNum = $("#cp_cnpj")?.value || "—";
        const prop = $("#cp_prop")?.value || "—";
        const propId = $("#cp_id")?.value ? ` (ID: ${$("#cp_id").value})` : "";
        const tel = $("#cp_telefone")?.value ? `\n📞 **Contato:** ${$("#cp_telefone").value}` : "";
        const ramo = $("#cp_ramo")?.value ? `\n🏷️ **Ramo de Atividade:** ${$("#cp_ramo").value}` : "";
        const valorTotal = $("#cp_valor")?.value || "R$ 250.000";
        const isJovemAprendiz = ($("#cp_jovem_aprendiz")?.value || "").toLowerCase().includes("sim");

        embed.title = "🏢 CERTIDÃO DE REGISTRO EMPRESARIAL · CNPJ OFICIAL";
        embed.color = isJovemAprendiz ? 0xf59e0b : 0x2563eb; // Âmbar se tiver jovem aprendiz, azul corporativo se padrão

        let jovemText = "";
        if (isJovemAprendiz) {
          jovemText = `\n\n⚠️ **[PROGRAMA JOVEM APRENDIZ DECLARADO · ATENÇÃO CONSELHO TUTELAR]**\n📌 **Ação Obrigatória:** A empresa declarou contratação de menores aprendizes. É obrigatório **abrir um ticket e marcar com o Conselho Tutelar**, para agendar a **vistoria prévia** (junto ao Corpo de Bombeiros e à Vigilância Sanitária), e também repassar as **informações e documentos das crianças/jovens** que irão trabalhar no local.`;
        }

        payload.content = `🏢 **[ABERTURA DE EMPRESA · CNPJ HOMOLOGADO]**\nO Cartório Notarial e de Registro Empresarial certifica a constituição e registro oficial da empresa **${empresa}**.\n🔢 **CNPJ:** \`${cnpjNum}\`\n👤 **Proprietário:** **${prop}**${propId}${tel}${ramo}\n👶 **Trabalha com Jovem Aprendiz:** **${isJovemAprendiz ? "SIM (Ação Obrigatória com Conselho Tutelar)" : "NÃO"}**\n💰 **Taxa de Registro:** **${valorTotal}**${jovemText}\n📜 *Registro mercantil averbado no Livro de Pessoas Jurídicas com fé pública. Certidão oficial anexada em PDF.*`;
      }

      const filesToSend = [];
      if (pdfData && pdfData.blob) {
        filesToSend.push({ blob: pdfData.blob, filename: pdfData.filename });
      }

      if (serviceAttachments[sid]?.photo) {
        const pObj = serviceAttachments[sid].photo;
        const photoExt = (pObj.name.split('.').pop() || "png").toLowerCase();
        const photoFilename = `foto_${sid}_${Date.now()}.${photoExt}`;
        filesToSend.push({ blob: pObj.file, filename: photoFilename });
        embed.thumbnail = { url: `attachment://${photoFilename}` };
        payload.content = (payload.content || "") + `\n📸 **Fotografia Oficial:** Anexada ao registro (${pObj.name})`;
      }

      if (serviceAttachments[sid]?.doc) {
        const dObj = serviceAttachments[sid].doc;
        filesToSend.push({ blob: dObj.file, filename: dObj.name });
        payload.content = (payload.content || "") + `\n📁 **Documento Comprobatório Anexo:** \`${dObj.name}\` (${dObj.size})`;
      }

      sendWebhook(btn, webhookUrl, payload, () => resetService(svc), filesToSend);
    });
  });

  // Baixar PDF do serviço avulso
  $$(".btn-pdf-service").forEach(btnPdf => {
    btnPdf.addEventListener("click", async () => {
      const sid = btnPdf.dataset.sid;
      const svc = servicesConfig.find(s => s.id === sid);
      try {
        toast("Gerando Certidão em PDF...");
        const pdfData = await getServicePDFData(svc);
        pdfData.doc.save(pdfData.filename);
        toast("✓ PDF baixado com sucesso!");
      } catch (err) {
        toast("Erro ao gerar PDF: " + err.message, true);
      }
    });
  });

  /* ---------- Modal: Código Penal ---------- */
  const modal = $("#modal-codigo");

  function renderCodigo(filter = "") {
    const q = filter.trim().toLowerCase();
    let html = "";
    CODIGO_PENAL.forEach((cat) => {
      const items = cat.artigos.filter(([cod, nome]) => matches(q, cod, nome));
      if (!items.length) return;
      html += `<h4>${cat.titulo}</h4><table class="cp-table">
        <thead><tr><th>Artigo</th><th>Infração</th><th>Pena</th><th>Multa</th><th>Fiança</th></tr></thead><tbody>`;
      items.forEach(([cod, nome, pena, multa, inaf]) => {
        html += `<tr class="${inaf ? "inaf" : ""}"><td>${cod}</td><td>${nome}</td><td>${pena}m</td><td>${fmtMoney(multa)}</td>
          <td>${inaf ? INAF : '<span class="tag-ok">Regra geral</span>'}</td></tr>`;
      });
      html += "</tbody></table>";
    });
    $("#codigo-tabela").innerHTML = html || '<p class="empty">Nenhum artigo encontrado.</p>';
  }

  $("#rules").innerHTML = CONFIG.regras
    .map(([t, d]) => `<div class="rule"><b>${t}</b><p>${d}</p></div>`)
    .join("");

  const pdfUrl = encodeURI(CONFIG.pdf);
  $("#pdf-open").href = pdfUrl;
  $("#pdf-download").href = pdfUrl;

  function openModal() {
    renderCodigo($("#codigo-search").value);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  $("#btn-codigo").addEventListener("click", openModal);
  modal.addEventListener("click", (e) => e.target.closest("[data-close]") && closeModal());
  $("#codigo-search").addEventListener("input", (e) => renderCodigo(e.target.value));

  $$(".tab").forEach((t) =>
    t.addEventListener("click", () => {
      $$(".tab").forEach((x) => x.classList.toggle("on", x === t));
      const tab = t.dataset.tab;
      $("#pane-tabela").classList.toggle("hidden", tab !== "tabela");
      $("#pane-pdf").classList.toggle("hidden", tab !== "pdf");
      if (tab === "pdf" && !$("#pdf-frame").src) $("#pdf-frame").src = pdfUrl;
    })
  );

  /* ---------- Modal: Código Civil (SDJ) ---------- */
  const modalCC = $("#modal-codigo-civil");
  const btnCC = $("#btn-codigo-civil");
  let activeCCLivroId = "all";

  function normalizarCCBusca(str) {
    return (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function renderCodigoCivil(filterText = "", livroId = activeCCLivroId) {
    if (!modalCC || typeof CODIGO_CIVIL_BRAVA === "undefined") return;
    const CC = CODIGO_CIVIL_BRAVA;
    const ccBody = $("#cc-body");
    const ccCounter = $("#cc-search-counter");
    if (!ccBody) return;
    const q = normalizarCCBusca(filterText);
    let matchedCount = 0;
    let html = "";

    if (!q && (livroId === "all" || livroId === "livro-1")) {
      html += `
        <div class="cc-preambulo-card">
          <div class="cc-preambulo-head">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="cc-preambulo-ico">📜</span>
              <strong>Preâmbulo Oficial · Diretrizes do Roleplay</strong>
            </div>
            <span class="cc-tag-versao">Minuta CC-001/2026</span>
          </div>
          <p class="cc-preambulo-txt">${CC.preambulo}</p>
          <div class="cc-preambulo-foot">
            <span>${CC.presidencia}</span>
            <span>•</span>
            <em>"${CC.lema}"</em>
          </div>
        </div>
      `;
    }

    CC.livros.forEach((l) => {
      if (livroId !== "all" && livroId !== l.id) return;

      const filteredArtigos = l.artigos.filter((a) => {
        if (!q) return true;
        const searchHaystack = normalizarCCBusca(`${a.rotulo} ${a.num} ${a.epigrafe} ${a.texto} ${l.titulo}`);
        const cleanNum = q.replace(/^art\.?\s*/i, "");
        if (cleanNum && String(a.num) === cleanNum) return true;
        return searchHaystack.includes(q);
      });

      if (filteredArtigos.length > 0) {
        matchedCount += filteredArtigos.length;
        html += `
          <div class="cc-livro-section" data-livro-section="${l.id}">
            <div class="cc-livro-header">
              <div class="cc-livro-title-wrap">
                <span class="cc-livro-badge">${l.numero}</span>
                <h3>${l.titulo}</h3>
              </div>
              <span class="cc-livro-count">${filteredArtigos.length} ${filteredArtigos.length === 1 ? "artigo" : "artigos"}</span>
            </div>
            <div class="cc-artigos-grid">
              ${filteredArtigos.map((a) => {
                const citationCurta = `${a.rotulo} do Código Civil (${a.epigrafe})`;
                const citationCompleta = `${a.rotulo} — ${a.epigrafe}: "${a.texto}"`;
                return `
                  <div class="cc-article-card" id="cc-art-${a.num}">
                    <div class="cc-art-head">
                      <div class="cc-art-title-wrap">
                        <span class="cc-art-num">${a.rotulo}</span>
                        <span class="cc-art-sep">•</span>
                        <span class="cc-art-epigrafe">${a.epigrafe}</span>
                      </div>
                      <span class="cc-livro-pill">${l.numero}</span>
                    </div>
                    <p class="cc-art-texto">${a.texto}</p>
                    <div class="cc-art-foot">
                      <button type="button" class="btn-outline btn-art-action btn-copy-art" data-art-citation="${citationCurta}" title="Copiar citação">
                        <span>📋 Copiar Artigo</span>
                      </button>
                      <button type="button" class="btn-outline btn-art-action btn-copy-integra" data-art-full='${citationCompleta}' title="Copiar texto integral">
                        <span>📜 Copiar Íntegra</span>
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }
    });

    if ((livroId === "all" && !q) || livroId === "anexos") {
      html += `
        <div class="cc-livro-section" data-livro-section="anexos">
          <div class="cc-livro-header">
            <div class="cc-livro-title-wrap">
              <span class="cc-livro-badge">ANEXOS</span>
              <h3>Competências, Procedimentos e Modelos Oficiais</h3>
            </div>
            <span class="cc-livro-count">3 Anexos Oficiais</span>
          </div>

          <div class="cc-anexos-container">
            <div class="cc-anexo-card">
              <div class="cc-anexo-head">
                <span class="cc-anexo-tag">ANEXO I</span>
                <h4>Matriz de Competências Operacionais</h4>
              </div>
              <div class="cc-table-wrap">
                <table class="cc-table">
                  <thead>
                    <tr>
                      <th>Serviço ou Ato</th>
                      <th>Setor Responsável</th>
                      <th>Regra Essencial</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${CC.anexos[0].tabela.map((row) => `
                      <tr>
                        <td><strong>${row.servico}</strong></td>
                        <td><span class="cc-setor-pill">${row.setor}</span></td>
                        <td>${row.regra}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="cc-anexo-card">
              <div class="cc-anexo-head">
                <span class="cc-anexo-tag">ANEXO II</span>
                <h4>Procedimento Padrão de Atendimento</h4>
              </div>
              <ol class="cc-passos-list">
                ${CC.anexos[1].passos.map((p, idx) => `
                  <li>
                    <span class="cc-passo-num">${idx + 1}</span>
                    <span class="cc-passo-txt">${p}</span>
                  </li>
                `).join("")}
              </ol>
            </div>

            <div class="cc-anexo-card">
              <div class="cc-anexo-head">
                <div style="display:flex; align-items:center; justify-content:space-between; width:100%;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="cc-anexo-tag">ANEXO III</span>
                    <h4>Modelo Mínimo de Petição ou Requerimento Civil</h4>
                  </div>
                  <button type="button" class="btn-outline btn-copy-modelo-anexo" data-modelo-text="${encodeURIComponent(CC.anexos[2].modeloTexto)}" title="Copiar esqueleto do modelo">
                    <span>📋 Copiar Modelo</span>
                  </button>
                </div>
              </div>
              <pre class="cc-modelo-pre"><code>${CC.anexos[2].modeloTexto}</code></pre>
            </div>
          </div>
        </div>
      `;
    }

    if (matchedCount === 0 && livroId !== "anexos") {
      html = `
        <div class="cc-empty-state">
          <span class="cc-empty-ico">🔍</span>
          <h4>Nenhum artigo encontrado</h4>
          <p>Não encontramos artigos correspondentes à pesquisa "<strong>${filterText}</strong>". Tente buscar por número (ex.: <code>66</code>, <code>70</code>) ou temas como <code>veículo</code>, <code>dano</code>, <code>contrato</code>, <code>casamento</code>, <code>partilha</code>.</p>
          <button type="button" class="btn-outline btn-cc-reset-search">Limpar Pesquisa</button>
        </div>
      `;
    }

    ccBody.innerHTML = html;
    if (ccCounter) {
      const totalArtigos = CC.livros.reduce((acc, l) => acc + l.artigos.length, 0);
      ccCounter.textContent = q ? `${matchedCount} encontrados` : `${totalArtigos} artigos`;
      ccCounter.classList.toggle("is-filtering", !!q);
    }
  }

  function openModalCC(initialQuery = "") {
    if (!modalCC) return;
    modalCC.classList.add("open");
    modalCC.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const ccSearch = $("#cc-search-input");
    const ccTabs = $("#cc-tabs");
    if (ccSearch) ccSearch.value = initialQuery || "";
    activeCCLivroId = "all";
    if (ccTabs) {
      $$(".cc-tab-btn", ccTabs).forEach((b) => b.classList.toggle("active", b.dataset.ccLivro === "all"));
    }
    renderCodigoCivil(initialQuery, "all");
    if (ccSearch) setTimeout(() => ccSearch.focus(), 80);
  }

  function closeModalCC() {
    if (!modalCC) return;
    modalCC.classList.remove("open");
    modalCC.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initCodigoCivilSDJ() {
    if (!modalCC || typeof CODIGO_CIVIL_BRAVA === "undefined") return;
    const CC = CODIGO_CIVIL_BRAVA;
    const ccTabs = $("#cc-tabs");
    const ccSearch = $("#cc-search-input");
    const totalArtigos = CC.livros.reduce((acc, l) => acc + l.artigos.length, 0);

    if (ccTabs) {
      ccTabs.innerHTML = [
        `<button type="button" class="cc-tab-btn active" data-cc-livro="all">Todos (${totalArtigos})</button>`,
        ...CC.livros.map((l) => `<button type="button" class="cc-tab-btn" data-cc-livro="${l.id}">${l.numero} (${l.artigos.length})</button>`),
        `<button type="button" class="cc-tab-btn" data-cc-livro="anexos">Anexos I a III</button>`
      ].join("");

      ccTabs.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-cc-livro]");
        if (!btn) return;
        $$(".cc-tab-btn", ccTabs).forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCCLivroId = btn.dataset.ccLivro;
        renderCodigoCivil(ccSearch ? ccSearch.value : "", activeCCLivroId);
      });
    }

    if (ccSearch) {
      ccSearch.addEventListener("input", (e) => {
        renderCodigoCivil(e.target.value, activeCCLivroId);
      });
    }

    if (btnCC) {
      btnCC.addEventListener("click", (e) => {
        e.preventDefault();
        openModalCC();
      });
    }

    modalCC.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeModalCC();
    });
  }

  // Alternador entre Código Civil e Código Penal nos Modais e Ações de Cópia
  document.addEventListener("click", (e) => {
    const switchBtn = e.target.closest(".btn-alternar-codigos");
    if (switchBtn) {
      e.preventDefault();
      const target = switchBtn.dataset.switchTo;
      if (target === "civil") {
        closeModal();
        openModalCC();
      } else if (target === "penal") {
        closeModalCC();
        openModal();
      }
      return;
    }

    const copyArt = e.target.closest(".btn-copy-art");
    if (copyArt) {
      e.preventDefault();
      const cit = copyArt.dataset.artCitation;
      navigator.clipboard.writeText(cit).then(() => toast(`✓ ${cit} copiado!`));
      return;
    }

    const copyFull = e.target.closest(".btn-copy-integra");
    if (copyFull) {
      e.preventDefault();
      const full = copyFull.dataset.artFull;
      navigator.clipboard.writeText(full).then(() => toast(`✓ Texto integral copiado!`));
      return;
    }

    const copyMod = e.target.closest(".btn-copy-modelo-anexo");
    if (copyMod) {
      e.preventDefault();
      const text = decodeURIComponent(copyMod.dataset.modeloText || "");
      navigator.clipboard.writeText(text).then(() => toast(`✓ Modelo do Anexo III copiado!`));
      return;
    }

    if (e.target.closest(".btn-cc-reset-search")) {
      const ccSearch = $("#cc-search-input");
      if (ccSearch) ccSearch.value = "";
      renderCodigoCivil("", activeCCLivroId);
      return;
    }
  });

  initCodigoCivilSDJ();

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal.classList.contains("open")) closeModal();
      if (modalCC && modalCC.classList.contains("open")) closeModalCC();
    }
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      const view = document.body.dataset.view;
      (modal.classList.contains("open") ? $("#codigo-search")
        : (modalCC && modalCC.classList.contains("open")) ? $("#cc-search-input")
        : view === "home" ? $("#home-search")
        : view === "tab-calculadora" ? $("#search-input") : null)?.focus();
    }
  });

  /* ---------- Tema claro / escuro ---------- */
  $("#btn-tema").addEventListener("click", () => {
    const root = document.documentElement;
    const novo = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", novo);
    localStorage.setItem("brava-tema", novo);
  });

  /* ---------- Tabela de Preços Oficial ---------- */
  function renderTabelaPrecos(filtro = "") {
    const q = (filtro || "").trim().toLowerCase();
    const tbody = $("#precos-tbody");
    if (!tbody || typeof TABELA_PRECOS === "undefined") return;

    const itensFiltrados = TABELA_PRECOS.filter(p =>
      !q || p.item.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || String(p.venda).includes(q) || String(p.retirada).includes(q)
    );

    if (!itensFiltrados.length) {
      tbody.innerHTML = `<tr><td colspan="6" class="empty" style="text-align:center;padding:26px;">Nenhum item ou serviço encontrado para "${filtro}".</td></tr>`;
      return;
    }

    tbody.innerHTML = itensFiltrados.map(p => {
      let retiradaTxt = "";
      if (p.retiradaDisplay) {
        retiradaTxt = `<span class="preco-retirada">${p.retiradaDisplay}</span>`;
      } else if (p.retirada !== null) {
        retiradaTxt = `<span class="preco-retirada">R$ ${p.retirada.toLocaleString("pt-BR")}</span>`;
      } else {
        retiradaTxt = `<span class="preco-sem-retirada">—</span>`;
      }

      const vendaTxt = p.vendaDisplay ? `<span class="preco-venda">${p.vendaDisplay}</span>` : `<span class="preco-venda">R$ ${p.venda.toLocaleString("pt-BR")}</span>`;
      
      let margemTxt = "";
      if (p.item.includes("Delegacia")) {
        margemTxt = `<span class="badge-lucro total" title="Honorários advocatícios">Honorários</span>`;
      } else if (p.retiradaDisplay && p.retiradaDisplay.includes("%")) {
        const pct = parseInt(p.retiradaDisplay);
        margemTxt = `<span class="badge-lucro" title="Margem líquida do Jurídico">${100 - pct}% Retenção</span>`;
      } else if (p.retirada !== null) {
        const lucro = p.venda - p.retirada;
        margemTxt = `<span class="badge-lucro" title="Lucro líquido retido pelo Jurídico">+R$ ${lucro.toLocaleString("pt-BR")}</span>`;
      } else {
        margemTxt = `<span class="badge-lucro total" title="Serviço 100% notarial">100% Notarial</span>`;
      }

      const btnAcaoLabel = p.targetId === "calculadora" ? "Consultar" : "Emitir";

      return `
        <tr>
          <td>
            <div class="item-cell">
              <span class="item-ico">${p.icone}</span>
              <div class="item-info">
                <b>${p.item}</b>
                <span>${p.desc}</span>
              </div>
            </div>
          </td>
          <td><span class="badge-tag-cat">${p.categoria}</span></td>
          <td class="c">${retiradaTxt}</td>
          <td class="r">${vendaTxt}</td>
          <td class="c">${margemTxt}</td>
          <td class="c">
            <button type="button" class="btn-outline btn-ir-servico" data-target="tab-${p.targetId}" data-title="${p.item}">
              ${btnAcaoLabel} ${ICONS.seta}
            </button>
          </td>
        </tr>
      `;
    }).join("");

    // Conecta botões "Emitir" para navegar direto para o formulário correspondente
    tbody.querySelectorAll(".btn-ir-servico").forEach(b => {
      b.addEventListener("click", () => {
        const target = b.dataset.target;
        const title = b.dataset.title;
        goTo(target, title);
        
        // Auto-seleciona e preenche de acordo com o item clicado
        if (title === "Aliança") {
          selectOption($(`.opt-card[data-input="al_tipo"][data-val="Namoro"]`));
          if ($("#al_valor")) $("#al_valor").value = "R$ 15.000";
        } else if (title === "Anel de Diamante") {
          selectOption($(`.opt-card[data-input="al_tipo"][data-val="Noivado"]`));
          if ($("#al_valor")) $("#al_valor").value = "R$ 30.000";
        } else if (title === "Anel de Ouro") {
          selectOption($(`.opt-card[data-input="al_tipo"][data-val="Casamento"]`));
          if ($("#al_valor")) $("#al_valor").value = "R$ 45.000";
        } else if (target === "tab-casamento" || title.includes("Casamento")) {
          if ($("#cas_valor")) $("#cas_valor").value = "R$ 200.000";
        } else if (target === "tab-divorcio" || title.includes("Divórcio")) {
          if ($("#div_valor")) $("#div_valor").value = "R$ 250.000";
        } else if (target === "tab-trocanome") {
          if ($("#tn_valor")) $("#tn_valor").value = "R$ 150.000";
        } else if (target === "tab-nascimento") {
          if ($("#cn_valor")) $("#cn_valor").value = "R$ 150.000";
        } else if (target === "tab-adocao") {
          if ($("#ca_valor")) $("#ca_valor").value = "R$ 150.000";
        } else if (target === "tab-familia") {
          if ($("#rf_valor")) $("#rf_valor").value = "R$ 250.000";
        } else if (target === "tab-cnpj") {
          if ($("#cp_valor")) $("#cp_valor").value = title.includes("Semanal") ? "R$ 50.000" : "R$ 250.000";
        } else if (target === "tab-porte") {
          if (title.includes("Muniç")) {
            selectOption($(`.opt-card[data-input="pa_municao"][data-val*="50"]`));
            if ($("#pa_valor")) $("#pa_valor").value = "R$ 100.000";
          } else {
            selectOption($(`.opt-card[data-input="pa_municao"][data-val*="Sem Munições"]`));
            if ($("#pa_valor")) $("#pa_valor").value = "R$ 80.000";
          }
        }
      });
    });
  }

  const btnPrecos = $("#btn-precos");
  if (btnPrecos) {
    btnPrecos.addEventListener("click", () => goTo("tab-precos", "Tabela de Preços"));
  }

  const precosSearchInput = $("#precos-search-input");
  if (precosSearchInput) {
    precosSearchInput.addEventListener("input", (e) => renderTabelaPrecos(e.target.value));
  }

  /* ==========================================================
     PROVA ORAL DO RECRUTADOR — GERENCIAMENTO COMPLETO
     ========================================================== */
  const provaOralState = {
    scores: {},        // qid -> 1.0 | 0.5 | 0.0
    notes: {},         // qid -> texto
    postura: "Adequada",
    checklist: new Set(),
    resultado: "APROVADO",
    cargo: "Estagiário",
    homologacao: "PENDENTE",
    despachoPresidencia: "",
  };

  function initProvaOralCampos() {
    const hoje = new Date();
    if ($("#po-data") && !$("#po-data").value) {
      $("#po-data").value = hoje.toLocaleDateString("pt-BR");
    }
    if ($("#po-hora") && !$("#po-hora").value) {
      $("#po-hora").value = hoje.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }
    if ($("#po-recrutador") && !$("#po-recrutador").value && window.PRESIDENCIA_JURIDICO) {
      $("#po-recrutador").value = window.PRESIDENCIA_JURIDICO.presidente || "Zaith Frost";
      $("#po-recrutador-id").value = "101";
    }
    if ($("#po-cargo") && !$("#po-cargo").value) {
      $("#po-cargo").value = provaOralState.cargo;
    }
    if ($("#po-despacho-presidencia") && !$("#po-despacho-presidencia").value) {
      $("#po-despacho-presidencia").value = provaOralState.despachoPresidencia;
    }
  }

  function renderProvaOral() {
    const container = $("#po-questions-container");
    if (!container || typeof PROVA_ORAL_CONFIG === "undefined") return;

    container.innerHTML = PROVA_ORAL_CONFIG.questoes.map((q) => {
      const currentScore = provaOralState.scores[q.id];
      let indicatorClass = "";
      let indicatorText = "Não avaliada";
      if (currentScore === 1.0) {
        indicatorClass = "active-correto";
        indicatorText = "1.0 pt (Correto)";
      } else if (currentScore === 0.5) {
        indicatorClass = "active-parcial";
        indicatorText = "0.5 pt (Parcial)";
      } else if (currentScore === 0.0) {
        indicatorClass = "active-incorreto";
        indicatorText = "0.0 pt (Incorreto)";
      }

      let cardRatedClass = "";
      if (currentScore === 1.0) cardRatedClass = "rated-correto";
      else if (currentScore === 0.5) cardRatedClass = "rated-parcial";
      else if (currentScore === 0.0) cardRatedClass = "rated-incorreto";

      const keyPointsHtml = q.palavrasChave && q.palavrasChave.length
        ? `<div class="po-keypoints-wrap">
             <span class="po-kp-label">Pontos-chave:</span>
             ${q.palavrasChave.map((kp) => `<span class="po-kp-tag">${kp}</span>`).join("")}
           </div>`
        : "";

      const dicaHtml = q.dicaRecrutador
        ? `<div class="po-dica-recrutador">🔍 <b>Critério do Examinador:</b> ${q.dicaRecrutador}</div>`
        : "";

      return `
        <div class="po-question-card ${cardRatedClass}" id="po-qcard-${q.id}" data-qid="${q.id}">
          <div class="po-q-head">
            <div class="po-q-badges">
              <span class="po-q-num">Questão ${String(q.id).padStart(2, "0")} / 12</span>
              <span class="badge-tag-cat">${q.tema}</span>
              <span class="po-q-tipo">${q.tipo}</span>
            </div>
            <span class="po-q-score-indicator ${indicatorClass}" id="po-qind-${q.id}">${indicatorText}</span>
          </div>

          <div class="po-q-text">${q.pergunta}</div>

          <div class="po-gabarito-wrap">
            <button type="button" class="po-gabarito-toggle" data-qid="${q.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              Ver Gabarito Oficial &amp; Resposta Esperada
            </button>
            <div class="po-gabarito-box" id="po-gbox-${q.id}">
              <div class="po-gab-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                Gabarito Oficial (Manual do Recrutador)
              </div>
              <div class="po-gab-text">${q.gabarito}</div>
              ${keyPointsHtml}
              ${dicaHtml}
            </div>
          </div>

          <div class="po-rating-row">
            <span class="po-rating-label">Atribuir pontuação do candidato:</span>
            <div class="po-rating-btns">
              <button type="button" class="po-btn-rate rate-correto ${currentScore === 1.0 ? "active-correto" : ""}" data-qid="${q.id}" data-score="1.0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><path d="M20 6 9 17l-5-5"/></svg>
                Correto (+1.0)
              </button>
              <button type="button" class="po-btn-rate rate-parcial ${currentScore === 0.5 ? "active-parcial" : ""}" data-qid="${q.id}" data-score="0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Parcial (+0.5)
              </button>
              <button type="button" class="po-btn-rate rate-incorreto ${currentScore === 0.0 ? "active-incorreto" : ""}" data-qid="${q.id}" data-score="0.0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:14px;height:14px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Incorreto (0.0)
              </button>
            </div>
          </div>

          <input type="text" class="po-q-notes-input" id="po-qnote-${q.id}" placeholder="Anotações / resposta resumida do candidato nesta questão (opcional)..." value="${provaOralState.notes[q.id] || ""}" />
        </div>
      `;
    }).join("");

    // Toggle do Gabarito
    container.querySelectorAll(".po-gabarito-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const box = $(`#po-gbox-${qid}`);
        if (!box) return;
        const isShown = box.classList.toggle("show");
        btn.classList.toggle("open", isShown);
      });
    });

    // Cliques nos botões de pontuação
    container.querySelectorAll(".po-btn-rate").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = parseInt(btn.dataset.qid, 10);
        const score = parseFloat(btn.dataset.score);
        
        if (provaOralState.scores[qid] === score) {
          delete provaOralState.scores[qid];
        } else {
          provaOralState.scores[qid] = score;
        }

        updateQuestionUi(qid);
        updateProvaOralScore();
      });
    });

    // Anotações individuais
    container.querySelectorAll(".po-q-notes-input").forEach((inp) => {
      inp.addEventListener("input", (e) => {
        const qid = parseInt(e.target.id.replace("po-qnote-", ""), 10);
        provaOralState.notes[qid] = e.target.value;
      });
    });

    renderChecklist();
    renderCargoPills();
    updateProvaOralScore();
  }

  function renderChecklist() {
    const checkContainer = $("#po-checklist-container");
    if (!checkContainer || typeof PROVA_ORAL_CONFIG === "undefined") return;

    checkContainer.innerHTML = PROVA_ORAL_CONFIG.checklist.map((item, idx) => `
      <label class="po-check-item">
        <input type="checkbox" data-cidx="${idx}" ${provaOralState.checklist.has(idx) ? "checked" : ""} />
        <span>${item}</span>
      </label>
    `).join("");

    checkContainer.querySelectorAll("input[type='checkbox']").forEach((chk) => {
      chk.addEventListener("change", (e) => {
        const idx = parseInt(e.target.dataset.cidx, 10);
        if (e.target.checked) provaOralState.checklist.add(idx);
        else provaOralState.checklist.delete(idx);
      });
    });
  }

  function renderCargoCards() {
    const container = $("#po-cargo-cards") || $("#po-cargo-pills");
    if (!container || typeof PROVA_ORAL_CONFIG === "undefined") return;

    const cargos = PROVA_ORAL_CONFIG.cargosDisponiveis || [];

    container.innerHTML = cargos.map((item) => {
      const nome = typeof item === "string" ? item : item.nome;
      const icone = typeof item === "object" && item.icone ? item.icone : "🎖️";
      const desc = typeof item === "object" && item.desc ? item.desc : "";
      const isSelected = (provaOralState.cargo && provaOralState.cargo.trim().toLowerCase() === nome.trim().toLowerCase());
      return `
        <div class="po-cargo-card ${isSelected ? "selected active" : ""}" data-cargo="${nome}">
          <div class="po-cargo-card-top">
            <div class="po-cargo-card-ico-name">
              <span class="po-cargo-card-ico">${icone}</span>
              <span class="po-cargo-card-title">${nome}</span>
            </div>
            <span class="po-cargo-card-check">${isSelected ? "✓" : ""}</span>
          </div>
          <p class="po-cargo-card-desc">${desc}</p>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".po-cargo-card").forEach((card) => {
      card.addEventListener("click", () => {
        container.querySelectorAll(".po-cargo-card").forEach((c) => {
          c.classList.remove("selected", "active");
          const chk = c.querySelector(".po-cargo-card-check");
          if (chk) chk.textContent = "";
        });
        card.classList.add("selected", "active");
        const chk = card.querySelector(".po-cargo-card-check");
        if (chk) chk.textContent = "✓";
        provaOralState.cargo = card.dataset.cargo;
        const input = $("#po-cargo");
        if (input) input.value = card.dataset.cargo;
      });
    });
  }

  function renderCargoPills() {
    renderCargoCards();
  }

  function updateQuestionUi(qid) {
    const card = $(`#po-qcard-${qid}`);
    const ind = $(`#po-qind-${qid}`);
    if (!card || !ind) return;

    const currentScore = provaOralState.scores[qid];
    card.classList.remove("rated-correto", "rated-parcial", "rated-incorreto");
    ind.classList.remove("active-correto", "active-parcial", "active-incorreto");

    card.querySelectorAll(".po-btn-rate").forEach((b) => {
      b.classList.remove("active-correto", "active-parcial", "active-incorreto");
    });

    if (currentScore === 1.0) {
      card.classList.add("rated-correto");
      ind.classList.add("active-correto");
      ind.textContent = "1.0 pt (Correto)";
      card.querySelector(".rate-correto")?.classList.add("active-correto");
    } else if (currentScore === 0.5) {
      card.classList.add("rated-parcial");
      ind.classList.add("active-parcial");
      ind.textContent = "0.5 pt (Parcial)";
      card.querySelector(".rate-parcial")?.classList.add("active-parcial");
    } else if (currentScore === 0.0) {
      card.classList.add("rated-incorreto");
      ind.classList.add("active-incorreto");
      ind.textContent = "0.0 pt (Incorreto)";
      card.querySelector(".rate-incorreto")?.classList.add("active-incorreto");
    } else {
      ind.textContent = "Não avaliada";
    }
  }

  function updateProvaOralScore() {
    const qIds = Object.keys(provaOralState.scores);
    const answeredCount = qIds.length;
    let totalScore = 0;
    qIds.forEach((id) => {
      totalScore += provaOralState.scores[id] || 0;
    });

    const maxScore = 12;
    const pct = Math.round((totalScore / maxScore) * 100);

    const valEl = $("#po-score-val");
    const pctEl = $("#po-pct-text");
    const ansEl = $("#po-answered-text");
    const fillEl = $("#po-progress-fill");
    const badgeEl = $("#po-status-badge");

    if (valEl) valEl.textContent = totalScore.toFixed(1);
    if (pctEl) pctEl.textContent = `${pct}% de aproveitamento`;
    if (ansEl) ansEl.textContent = `${answeredCount} de ${maxScore} questões avaliadas`;
    if (fillEl) fillEl.style.width = `${(answeredCount / maxScore) * 100}%`;

    if (badgeEl) {
      badgeEl.className = "po-badge";
      if (answeredCount < maxScore) {
        badgeEl.classList.add("status-pendente");
        badgeEl.textContent = "Em Andamento";
      } else if (totalScore >= 9.5) {
        badgeEl.classList.add("status-aprovado");
        badgeEl.textContent = "Aprovado";
      } else if (totalScore >= 7.0) {
        badgeEl.classList.add("status-reavaliar");
        badgeEl.textContent = "Reavaliação";
      } else {
        badgeEl.classList.add("status-reprovado");
        badgeEl.textContent = "Reprovado";
      }
    }

    if (answeredCount === maxScore) {
      let sugestao = "APROVADO";
      if (totalScore < 7.0 || provaOralState.postura === "Inadequada") sugestao = "REPROVADO";
      else if (totalScore < 9.5 || provaOralState.postura === "Precisa melhorar") sugestao = "REAVALIAR";
      
      const rad = $(`input[name="po_resultado"][value="${sugestao}"]`);
      if (rad && !rad.dataset.manual) {
        rad.checked = true;
        provaOralState.resultado = sugestao;
      }
    }
  }

  function getProvaOralData() {
    const recrutador = ($("#po-recrutador")?.value || "Zaith Frost").trim();
    const recrutadorId = ($("#po-recrutador-id")?.value || "101").trim();
    const candidato = ($("#po-candidato")?.value || "Candidato").trim();
    const candidatoId = ($("#po-candidato-id")?.value || "—").trim();
    const data = ($("#po-data")?.value || new Date().toLocaleDateString("pt-BR")).trim();
    const hora = ($("#po-hora")?.value || new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })).trim();
    const observacoes = ($("#po-observacoes")?.value || "").trim();
    const cargo = ($("#po-cargo")?.value || provaOralState.cargo || "Estagiário").trim();
    const despachoPresidencia = ($("#po-despacho-presidencia")?.value || "").trim();
    const homologacao = "PENDENTE";
    const homologacaoLabel = "⏳ Pendente de Homologação (Aguardando Zaith Frost / Mike Santaroni)";

    let totalScore = 0;
    const questions = PROVA_ORAL_CONFIG.questoes.map((q) => {
      const score = typeof provaOralState.scores[q.id] === "number" ? provaOralState.scores[q.id] : 0;
      totalScore += score;
      let status = "Incorreto";
      if (score === 1.0) status = "Correto";
      else if (score === 0.5) status = "Parcial";
      return {
        id: q.id,
        tema: q.tema,
        tipo: q.tipo,
        pergunta: q.pergunta,
        score,
        status,
        observacao: provaOralState.notes[q.id] || ""
      };
    });

    const selectedRadio = $(`input[name="po_resultado"]:checked`);
    const resultado = selectedRadio ? selectedRadio.value : (totalScore >= 9.5 ? "APROVADO" : totalScore >= 7.0 ? "REAVALIAR" : "REPROVADO");
    const percent = Math.round((totalScore / 12) * 100);

    const checklistConfirmado = [];
    provaOralState.checklist.forEach((idx) => {
      if (PROVA_ORAL_CONFIG.checklist[idx]) checklistConfirmado.push(PROVA_ORAL_CONFIG.checklist[idx]);
    });

    return {
      recrutador,
      recrutadorId,
      candidato,
      candidatoId,
      cargo,
      homologacao,
      homologacaoLabel,
      despachoPresidencia,
      data,
      hora,
      score: totalScore,
      maxScore: 12,
      percent,
      resultado,
      postura: provaOralState.postura,
      checklist: checklistConfirmado,
      questions,
      observacoes,
      cidade: CONFIG.cidade
    };
  }

  function relatorioProvaOralTexto(dados) {
    const emojis = {
      APROVADO: "🟢",
      REAVALIAR: "🟡",
      REPROVADO: "🔴"
    };
    const emojiRes = emojis[dados.resultado] || "⚖️";

    let t = "";
    t += "========================================================\n";
    t += `⚖️ ATA NOTARIAL DE PROVA ORAL — ${CONFIG.cidade.toUpperCase()}\n`;
    t += "DEPARTAMENTO JURÍDICO · BANCA DE RECRUTAMENTO E ADMISSÃO\n";
    t += "========================================================\n\n";

    t += "👤 INFORMAÇÕES DO CANDIDATO E DO EXAMINADOR:\n";
    t += `• Candidato: ${dados.candidato} (ID/Passaporte: ${dados.candidatoId})\n`;
    t += `• Examinador Oficial: ${dados.recrutador} (ID/Passaporte: ${dados.recrutadorId})\n`;
    t += `• Data do Exame: ${dados.data} às ${dados.hora}\n`;
    t += `• Nível da Prova: Fácil (12 Questões Teóricas e Práticas)\n\n`;

    t += "🎖️ INDICAÇÃO DE CARGO & EFETIVAÇÃO PELA PRESIDÊNCIA:\n";
    t += `• Cargo Recomendado pela Banca: ${dados.cargo}\n`;
    t += `• Homologação da Presidência: ${dados.homologacaoLabel}\n`;
    if (dados.homologacao === "PENDENTE") {
      t += "⚠️ AVISO REGULAMENTAR: A aprovação no exame oral qualifica o candidato, mas a nomeação e efetivação no cargo dependem OBRIGATORIAMENTE do \"Aprovado\" formal do Presidente (Zaith Frost) ou do Vice-Presidente (Mike Santaroni).\n";
    }
    if (dados.despachoPresidencia) {
      t += `• Despacho da Presidência: "${dados.despachoPresidencia}"\n`;
    }
    t += "\n";

    t += "📊 RESULTADO E DESEMPENHO OFICIAL:\n";
    t += `• Pontuação: ${dados.score.toFixed(1)} / 12.0 pontos (${dados.percent}% de aproveitamento)\n`;
    t += `• Postura Profissional: ${dados.postura}\n`;
    t += `• Veredicto Final da Prova: ${emojiRes} **${dados.resultado}**\n\n`;

    t += "📝 ESPELHO DAS 12 QUESTÕES APLICADAS:\n";
    dados.questions.forEach((q) => {
      const qIcon = q.score === 1.0 ? "✅" : q.score === 0.5 ? "⚠️" : "❌";
      t += `[Q${String(q.id).padStart(2, "0")}] ${qIcon} ${q.tema} (${q.score.toFixed(1)} pt) — Status: ${q.status}\n`;
      if (q.observacao) t += `     Obs: "${q.observacao}"\n`;
    });

    if (dados.checklist.length) {
      t += "\n📋 CHECKLIST DE CONFORMIDADE DEMONSTRADO:\n";
      dados.checklist.forEach((chk) => (t += `• [✓] ${chk}\n`));
    }

    if (dados.observacoes) {
      t += `\n💬 CONSIDERAÇÕES DO EXAMINADOR:\n"${dados.observacoes}"\n`;
    }

    t += "\n========================================================\n";
    t += `Gabinete da Presidência do Judiciário: ${PRESIDENCIA_JURIDICO.presidente} (Presidente) & ${PRESIDENCIA_JURIDICO.vice} (Vice-Presidente)\n`;
    t += "========================================================";
    return t;
  }

  // Configuração dos Botões e Listeners da Prova Oral
  const btnTopProva = $("#btn-provaoral");
  if (btnTopProva) {
    btnTopProva.addEventListener("click", () => goTo("tab-provaoral", "Prova Oral do Recrutador"));
  }

  function resetProvaOral(keepExaminer = true) {
    provaOralState.scores = {};
    provaOralState.notes = {};
    provaOralState.checklist.clear();
    provaOralState.postura = "Adequada";
    provaOralState.resultado = "APROVADO";
    provaOralState.cargo = "Estagiário";
    provaOralState.homologacao = "PENDENTE";
    provaOralState.despachoPresidencia = "";
    
    if ($("#po-candidato")) $("#po-candidato").value = "";
    if ($("#po-candidato-id")) $("#po-candidato-id").value = "";
    if ($("#po-observacoes")) $("#po-observacoes").value = "";
    if ($("#po-cargo")) $("#po-cargo").value = "Estagiário";
    if ($("#po-despacho-presidencia")) $("#po-despacho-presidencia").value = "";

    if (!keepExaminer) {
      if ($("#po-recrutador")) $("#po-recrutador").value = "";
      if ($("#po-recrutador-id")) $("#po-recrutador-id").value = "";
    }
    
    $$("#po-postura-group button").forEach((b) => b.classList.toggle("on", b.dataset.postura === "Adequada"));
    $$(`input[name="po_resultado"]`).forEach((r) => {
      r.checked = r.value === "APROVADO";
      delete r.dataset.manual;
    });

    renderProvaOral();
    renderCargoCards();
    renderChecklist();
    updateProvaOralScore();
    initProvaOralCampos();
  }

  const poBtnDiscord = $("#po-btn-discord");
  if (poBtnDiscord) {
    poBtnDiscord.innerHTML = DISCORD_LABEL;
    poBtnDiscord.addEventListener("click", async (e) => {
      if (e) e.preventDefault();

      const candInput = $("#po-candidato");
      const candNome = (candInput ? candInput.value : "").trim();
      if (!candNome) {
        toast("⚠️ Preencha o nome do candidato antes de enviar a ata para o Discord!", true);
        candInput?.focus();
        return;
      }

      const dados = getProvaOralData();
      let pdfData = null;
      try {
        if (window.SDJ_PDF) {
          pdfData = await window.SDJ_PDF.generateProvaOralPDF(dados);
        }
      } catch (err) {
        console.warn("Falha ao gerar PDF da Prova Oral:", err);
      }

      const webhookUrl = (window.PROVA_ORAL_CONFIG && window.PROVA_ORAL_CONFIG.webhook) || "https://discord.com/api/webhooks/1560656685557883022/BLD5lMAwnsOd-PU5Do8cf6N25z071fagqj6kiuHsAZptB_u1qvknBf1Ji_0RvM2rJFXS";
      
      const embedColor = dados.resultado === "APROVADO" ? 3066993 : dados.resultado === "REAVALIAR" ? 15844367 : 15158332;

      let msgContent = "";
      if (dados.homologacao === "PENDENTE") {
        msgContent = `📢 **[AGUARDANDO HOMOLOGAÇÃO DA PRESIDÊNCIA]**\nO candidato **${dados.candidato}** concluiu o exame oral para o cargo de **${dados.cargo}** com o veredicto **${dados.resultado}**.\n⚠️ **Efetivação Pendente:** Conforme o estatuto, a posse e efetivação dependem do **\"Aprovado\"** formal do Presidente **Zaith Frost** ou do Vice-Presidente **Mike Santaroni**.`;
      } else if (dados.homologacao === "HOMOLOGADO_ZAITH") {
        msgContent = `🏛️ **[EFETIVAÇÃO HOMOLOGADA]**\nO candidato **${dados.candidato}** teve sua aprovação e nomeação no cargo de **${dados.cargo}** homologadas pelo Presidente **Zaith Frost**.`;
      } else if (dados.homologacao === "HOMOLOGADO_MIKE") {
        msgContent = `🏛️ **[EFETIVAÇÃO HOMOLOGADA]**\nO candidato **${dados.candidato}** teve sua aprovação e nomeação no cargo de **${dados.cargo}** homologadas pelo Vice-Presidente **Mike Santaroni**.`;
      } else {
        msgContent = `🚫 **[EFETIVAÇÃO INDEFERIDA]**\nA efetivação do candidato **${dados.candidato}** para o cargo de **${dados.cargo}** foi indeferida pela Presidência.`;
      }

      const embed = {
        title: `🎓 ATA NOTARIAL: PROVA ORAL DE RECRUTAMENTO — ${dados.resultado}`,
        description: `Avaliação oral oficial de admissão ao Departamento Jurídico de **${CONFIG.cidade}** (Nível Fácil · 12 Perguntas).`,
        color: embedColor,
        fields: [
          { name: "👤 Candidato", value: `**${dados.candidato}** (ID: ${dados.candidatoId})`, inline: true },
          { name: "⚖️ Examinador", value: `**${dados.recrutador}** (ID: ${dados.recrutadorId})`, inline: true },
          { name: "📅 Data / Hora", value: `${dados.data} às ${dados.hora}`, inline: true },
          { name: "🎖️ Cargo Recomendado", value: `**${dados.cargo}**`, inline: true },
          { name: "🏛️ Homologação / Efetivação", value: `**${dados.homologacaoLabel}**`, inline: true },
          { name: "📊 Pontuação Final", value: `**${dados.score.toFixed(1)} / 12.0** (${dados.percent}%)`, inline: true },
          { name: "🛡️ Postura & Ética", value: `**${dados.postura}**`, inline: true },
          { name: "🏆 Veredicto da Banca", value: `**${dados.resultado}**`, inline: true },
        ],
        footer: { text: `Tribunal de Justiça — ${CONFIG.cidade} • Presidência: ${PRESIDENCIA_JURIDICO.presidente} & ${PRESIDENCIA_JURIDICO.vice}` },
        timestamp: new Date().toISOString()
      };

      if (dados.despachoPresidencia) {
        embed.fields.push({ name: "📜 Despacho da Presidência", value: dados.despachoPresidencia, inline: false });
      }

      if (dados.observacoes) {
        embed.fields.push({ name: "💬 Parecer do Examinador", value: dados.observacoes, inline: false });
      }

      sendWebhook(
        poBtnDiscord,
        webhookUrl,
        { content: msgContent, embeds: [embed] },
        () => {
          resetProvaOral(true);
          toast("✓ Ata e PDF enviados ao Discord com sucesso! Formulário reiniciado para o próximo candidato.");
          const tab = $("#tab-provaoral");
          if (tab) {
            tab.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        },
        pdfData
      );
    });
  }

  $("#po-btn-copiar")?.addEventListener("click", () => {
    const dados = getProvaOralData();
    copyText(relatorioProvaOralTexto(dados));
  });

  $("#po-btn-pdf")?.addEventListener("click", async () => {
    const dados = getProvaOralData();
    try {
      toast("Gerando Ata Notarial da Prova Oral...");
      const pdfData = await window.SDJ_PDF.generateProvaOralPDF(dados);
      pdfData.doc.save(pdfData.filename);
      toast("✓ Ata em PDF baixada com sucesso!");
    } catch (err) {
      toast("Erro ao gerar PDF: " + err.message, true);
    }
  });

  $("#po-btn-auto-fill")?.addEventListener("click", () => {
    if (typeof PROVA_ORAL_CONFIG === "undefined") return;
    PROVA_ORAL_CONFIG.questoes.forEach((q) => {
      provaOralState.scores[q.id] = 1.0;
      updateQuestionUi(q.id);
    });
    PROVA_ORAL_CONFIG.checklist.forEach((_, idx) => {
      provaOralState.checklist.add(idx);
    });
    renderChecklist();
    updateProvaOralScore();
    toast("✓ Todas as 12 questões marcadas como Corretas (+1.0)!");
  });

  $("#po-btn-zerar")?.addEventListener("click", () => {
    if (typeof PROVA_ORAL_CONFIG === "undefined") return;
    PROVA_ORAL_CONFIG.questoes.forEach((q) => {
      provaOralState.scores[q.id] = 0.0;
      updateQuestionUi(q.id);
    });
    updateProvaOralScore();
    toast("Notas das 12 questões zeradas.");
  });

  $("#po-btn-limpar")?.addEventListener("click", () => {
    if (!confirm("Deseja realmente limpar todos os campos da prova oral?")) return;
    resetProvaOral(true);
    toast("Formulário da prova oral reiniciado.");
  });

  $$("#po-postura-group button").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#po-postura-group button").forEach((b) => b.classList.toggle("on", b === btn));
      provaOralState.postura = btn.dataset.postura;
      updateProvaOralScore();
    });
  });

  $$(`input[name="po_resultado"]`).forEach((rad) => {
    rad.addEventListener("change", () => {
      rad.dataset.manual = "true";
      provaOralState.resultado = rad.value;
    });
  });

  // Listener para Cargo
  $("#po-cargo")?.addEventListener("input", (e) => {
    provaOralState.cargo = e.target.value;
    const cards = $$(".po-cargo-card");
    cards.forEach((card) => {
      const match = card.dataset.cargo.trim().toLowerCase() === e.target.value.trim().toLowerCase();
      card.classList.toggle("selected", match);
      card.classList.toggle("active", match);
      const chk = card.querySelector(".po-cargo-card-check");
      if (chk) chk.textContent = match ? "✓" : "";
    });
  });

  $("#po-despacho-presidencia")?.addEventListener("input", (e) => {
    provaOralState.despachoPresidencia = e.target.value;
  });

  /* ==========================================================
     MÓDULO: GERADOR DE CARTEIRINHAS FUNCIONAIS DO SDJ (3D)
     ========================================================== */
  const cartState = {
    fotoUrl: null,
    qrDataUrl: null,
    flipped: false
  };

  function getCarterinhaData() {
    const nome = $("#cart-nome")?.value.trim() || "";
    const id = $("#cart-id")?.value.trim() || "";
    const telefone = $("#cart-telefone")?.value.trim() || "";
    const cargo = $("#cart-cargo")?.value.trim() || "Advogado Júnior";
    const naturalidade = $("#cart-naturalidade")?.value.trim() || "Brava City";
    const expedicao = $("#cart-expedicao")?.value.trim() || new Date().toLocaleDateString("pt-BR");
    const inscricao = $("#cart-inscricao")?.value.trim() || "OAB/SDJ-2026-0000";
    const situacao = $("#cart-situacao")?.value || "REGULAR / ATIVO";

    return {
      nome,
      id,
      telefone,
      cargo,
      naturalidade,
      expedicao,
      inscricao,
      situacao,
      fotoUrl: cartState.fotoUrl,
      qrDataUrl: cartState.qrDataUrl,
      qrTexto: `SDJ BRAVA RP | TITULAR: ${nome || "MEMBRO"} | ID: ${id || "000"} | CARGO: ${cargo} | REGISTRO: ${inscricao} | SITUAÇÃO: ${situacao} | EXPEDIÇÃO: ${expedicao}`
    };
  }

  function obterPrefixoInscricao(cargo) {
    const c = (cargo || $("#cart-cargo")?.value || "").toLowerCase();
    if (c.includes("assistente social") || c.includes("social")) return "CRESS/SDJ";
    if (c.includes("juiz") || c.includes("magistrad")) return "TJ/SDJ";
    if (c.includes("promotor") || c.includes("ministério") || c.includes("ministerio")) return "MP/SDJ";
    if (c.includes("estagiário") || c.includes("estagio")) return "EST/SDJ";
    return "OAB/SDJ";
  }

  function gerarNumeroInscricaoAleatorio(cargo) {
    const ano = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const prefix = obterPrefixoInscricao(cargo);
    return `${prefix}-${ano}-${rand}`;
  }

  function renderCargoPills() {
    const container = $("#cart-cargo-pills");
    if (!container) return;

    const cargos = (typeof CARTERINHA_CONFIG !== "undefined" && CARTERINHA_CONFIG.cargosPadrao) || [
      { nome: "Estagiário", icone: "🎓" },
      { nome: "Assistente Social", icone: "🤝" },
      { nome: "Advogado Júnior", icone: "👥" },
      { nome: "Advogado Pleno", icone: "📝" },
      { nome: "Advogado Sênior", icone: "👤" },
      { nome: "Advogado Administrativo", icone: "📑" },
      { nome: "Vice-Presidente", icone: "⚖️" },
      { nome: "Presidente", icone: "👑" },
      { nome: "Juiz de Direito", icone: "🏛️" },
      { nome: "Promotor de Justiça", icone: "🛡️" }
    ];

    const currentCargo = $("#cart-cargo")?.value || "Advogado Júnior";

    container.innerHTML = cargos.map((c) => {
      const active = c.nome.toLowerCase() === currentCargo.toLowerCase();
      return `
        <button type="button" class="cart-cargo-pill ${active ? "active" : ""}" data-cargo="${c.nome}">
          <span>${c.icone}</span>
          <span>${c.nome}</span>
        </button>
      `;
    }).join("");

    container.querySelectorAll(".cart-cargo-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        container.querySelectorAll(".cart-cargo-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        if ($("#cart-cargo")) {
          $("#cart-cargo").value = pill.dataset.cargo;
        }

        // Se a inscrição atual for vazia ou for um padrão gerado, atualiza o prefixo correspondente ao cargo
        const currentInsc = $("#cart-inscricao")?.value || "";
        if (!currentInsc || /^(OAB|CRESS|TJ|MP|EST)\/SDJ-\d{4}-\d{4}$/.test(currentInsc)) {
          const idVal = $("#cart-id")?.value.trim();
          const prefix = obterPrefixoInscricao(pill.dataset.cargo);
          const ano = new Date().getFullYear();
          if (idVal && !isNaN(idVal)) {
            if ($("#cart-inscricao")) $("#cart-inscricao").value = `${prefix}-${ano}-${idVal.padStart(4, "0")}`;
          } else {
            if ($("#cart-inscricao")) $("#cart-inscricao").value = gerarNumeroInscricaoAleatorio(pill.dataset.cargo);
          }
        }

        updateCarterinhaPreview();
      });
    });
  }

  let qrTimeout;
  function updateCarterinhaPreview() {
    const d = getCarterinhaData();

    // Atualiza Frente
    if ($("#card-val-nome")) {
      $("#card-val-nome").textContent = d.nome ? d.nome.toUpperCase() : "NOME DO TITULAR";
    }
    if ($("#card-val-cargo")) {
      $("#card-val-cargo").textContent = d.cargo ? d.cargo.toUpperCase() : "ADVOGADO JÚNIOR";
    }
    if ($("#card-val-id")) {
      $("#card-val-id").textContent = d.id ? "#" + d.id : "#000";
    }
    if ($("#card-val-inscricao")) {
      $("#card-val-inscricao").textContent = d.inscricao || "OAB/SDJ-2026-0000";
    }
    if ($("#card-val-naturalidade")) {
      $("#card-val-naturalidade").textContent = d.naturalidade || "Brava City";
    }
    if ($("#card-val-expedicao")) {
      $("#card-val-expedicao").textContent = d.expedicao || new Date().toLocaleDateString("pt-BR");
    }

    // Atualiza Verso
    if ($("#card-sig-titular")) {
      const titularNome = d.nome || "Dr. Titular";
      $("#card-sig-titular").textContent = window.SDJ_PDF ? window.SDJ_PDF.toSignatureCase(titularNome) : titularNome;
    }
    if ($("#card-back-telefone")) {
      $("#card-back-telefone").textContent = d.telefone || "555-0101";
    }
    if ($("#card-back-expedicao")) {
      $("#card-back-expedicao").textContent = d.expedicao || new Date().toLocaleDateString("pt-BR");
    }
    if ($("#card-back-situacao")) {
      $("#card-back-situacao").textContent = d.situacao || "REGULAR / ATIVO";
      const isReg = (d.situacao || "").includes("REGULAR");
      const isLic = (d.situacao || "").includes("LICENÇA");
      $("#card-back-situacao").style.color = isReg ? "#4ade80" : (isLic ? "#fde047" : "#f87171");
    }

    // MRZ Lines
    if ($("#card-mrz-1")) {
      const cleanInscr = (d.inscricao || "SDJ2026").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
      $("#card-mrz-1").textContent = `IDBRA<<SDJ<2026<${cleanInscr}<<<<<<<<<<<<<<<<<<<<<<`.substring(0, 44);
    }
    if ($("#card-mrz-2")) {
      const cleanId = (d.id || "0000").replace(/[^0-9]/g, "").padStart(6, "0");
      $("#card-mrz-2").textContent = `${cleanId}9BRA<<<<<<<<<<<<<<<<<<<0<<<<<<<<<<<<<<`.substring(0, 44);
    }

    // Foto da carteira
    if ($("#card-display-photo")) {
      $("#card-display-photo").src = cartState.fotoUrl || "arte.png";
    }

    // Atualiza QR Code com debounce leve
    clearTimeout(qrTimeout);
    qrTimeout = setTimeout(() => {
      const qrBox = $("#card-qr-box");
      if (qrBox && typeof window !== "undefined" && window.QRCode) {
        qrBox.innerHTML = "";
        try {
          new window.QRCode(qrBox, {
            text: d.qrTexto,
            width: 58,
            height: 58,
            correctLevel: window.QRCode.CorrectLevel.M
          });
          setTimeout(() => {
            const img = qrBox.querySelector("img");
            const cvs = qrBox.querySelector("canvas");
            if (img && img.src) cartState.qrDataUrl = img.src;
            else if (cvs) cartState.qrDataUrl = cvs.toDataURL("image/png");
          }, 60);
        } catch (e) {
          console.warn("Erro ao atualizar QR Code:", e);
        }
      }
    }, 180);
  }

  function setCardFlip(flipped) {
    cartState.flipped = !!flipped;
    const card = $("#cart-card-3d");
    if (card) {
      card.classList.toggle("flipped", cartState.flipped);
    }
    const btnFrente = $("#cart-toggle-frente");
    const btnVerso = $("#cart-toggle-verso");
    if (btnFrente) btnFrente.classList.toggle("active", !cartState.flipped);
    if (btnVerso) btnVerso.classList.toggle("active", cartState.flipped);
  }

  function processPhotoFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      toast("Por favor selecione um arquivo de imagem válido (PNG, JPG, WEBP).", true);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast("A imagem é muito grande. Escolha uma foto com até 8 MB.", true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      cartState.fotoUrl = e.target.result;

      const imgPrev = $("#photo-preview-img");
      const ph = $("#photo-placeholder");
      const btnRemove = $("#cart-btn-remove-photo");

      if (imgPrev) {
        imgPrev.src = cartState.fotoUrl;
        imgPrev.classList.remove("hidden");
      }
      if (ph) ph.classList.add("hidden");
      if (btnRemove) btnRemove.classList.remove("hidden");

      updateCarterinhaPreview();
      toast("✓ Foto do personagem anexada com sucesso!");
    };
    reader.onerror = () => {
      toast("Erro ao ler o arquivo de foto.", true);
    };
    reader.readAsDataURL(file);
  }

  function initCarterinha() {
    // Botão de acesso na topbar
    const btnTopCart = $("#btn-carterinha");
    if (btnTopCart) {
      btnTopCart.addEventListener("click", () => goTo("tab-carterinha", "Carteirinha SDJ"));
    }

    // Inicializa rótulo do Discord
    const btnDiscord = $("#cart-btn-discord");
    if (btnDiscord) {
      btnDiscord.innerHTML = DISCORD_LABEL;
    }

    // Valores Iniciais
    if ($("#cart-expedicao") && !$("#cart-expedicao").value) {
      $("#cart-expedicao").value = new Date().toLocaleDateString("pt-BR");
    }
    if ($("#cart-inscricao") && !$("#cart-inscricao").value) {
      $("#cart-inscricao").value = gerarNumeroInscricaoAleatorio();
    }
    if ($("#cart-naturalidade") && !$("#cart-naturalidade").value) {
      $("#cart-naturalidade").value = "Brava City";
    }

    renderCargoPills();

    // Listeners de Input para Live Preview em tempo real
    const inputs = [
      "#cart-nome", "#cart-id", "#cart-telefone", "#cart-cargo",
      "#cart-naturalidade", "#cart-expedicao", "#cart-inscricao", "#cart-situacao"
    ];
    inputs.forEach((sel) => {
      const el = $(sel);
      if (el) {
        el.addEventListener("input", () => {
          if (sel === "#cart-cargo") {
            const pills = $$(".cart-cargo-pill");
            pills.forEach((p) => {
              p.classList.toggle("active", p.dataset.cargo.trim().toLowerCase() === el.value.trim().toLowerCase());
            });
          }
          updateCarterinhaPreview();
        });
        el.addEventListener("change", updateCarterinhaPreview);
      }
    });

    // Botão Gerar Inscrição
    $("#cart-btn-gerar-inscricao")?.addEventListener("click", () => {
      const idVal = $("#cart-id")?.value.trim();
      const cargo = $("#cart-cargo")?.value || "";
      const prefix = obterPrefixoInscricao(cargo);
      const ano = new Date().getFullYear();
      let novaInscricao = "";
      if (idVal && !isNaN(idVal)) {
        novaInscricao = `${prefix}-${ano}-${idVal.padStart(4, "0")}`;
      } else {
        novaInscricao = gerarNumeroInscricaoAleatorio(cargo);
      }
      if ($("#cart-inscricao")) $("#cart-inscricao").value = novaInscricao;
      updateCarterinhaPreview();
      toast("✓ Número de inscrição oficial gerado: " + novaInscricao);
    });

    // Upload de Foto
    const dropzone = $("#photo-dropzone");
    const fileInput = $("#cart-file-input");

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          processPhotoFile(e.target.files[0]);
        }
      });
    }

    if (dropzone) {
      ["dragenter", "dragover"].forEach((evt) => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add("dragover");
        });
      });
      ["dragleave", "drop"].forEach((evt) => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove("dragover");
        });
      });
      dropzone.addEventListener("drop", (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          processPhotoFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Botão Remover Foto
    $("#cart-btn-remove-photo")?.addEventListener("click", () => {
      cartState.fotoUrl = null;
      if (fileInput) fileInput.value = "";
      const imgPrev = $("#photo-preview-img");
      const ph = $("#photo-placeholder");
      const btnRemove = $("#cart-btn-remove-photo");

      if (imgPrev) {
        imgPrev.src = "";
        imgPrev.classList.add("hidden");
      }
      if (ph) ph.classList.remove("hidden");
      if (btnRemove) btnRemove.classList.add("hidden");

      updateCarterinhaPreview();
      toast("Foto removida. Utilizando brasão oficial padrão.");
    });

    // Controles de Giro 3D
    $("#cart-card-3d")?.addEventListener("click", () => setCardFlip(!cartState.flipped));
    $("#cart-btn-flip")?.addEventListener("click", () => setCardFlip(!cartState.flipped));
    $("#cart-toggle-frente")?.addEventListener("click", () => setCardFlip(false));
    $("#cart-toggle-verso")?.addEventListener("click", () => setCardFlip(true));

    // Botão Limpar
    $("#cart-btn-limpar")?.addEventListener("click", () => {
      if ($("#cart-nome")) $("#cart-nome").value = "";
      if ($("#cart-id")) $("#cart-id").value = "";
      if ($("#cart-telefone")) $("#cart-telefone").value = "";
      if ($("#cart-cargo")) $("#cart-cargo").value = "Advogado Júnior";
      if ($("#cart-naturalidade")) $("#cart-naturalidade").value = "Brava City";
      if ($("#cart-expedicao")) $("#cart-expedicao").value = new Date().toLocaleDateString("pt-BR");
      if ($("#cart-inscricao")) $("#cart-inscricao").value = gerarNumeroInscricaoAleatorio();
      if ($("#cart-situacao")) $("#cart-situacao").value = "REGULAR / ATIVO";

      cartState.fotoUrl = null;
      if (fileInput) fileInput.value = "";
      const imgPrev = $("#photo-preview-img");
      const ph = $("#photo-placeholder");
      const btnRemove = $("#cart-btn-remove-photo");
      if (imgPrev) { imgPrev.src = ""; imgPrev.classList.add("hidden"); }
      if (ph) ph.classList.remove("hidden");
      if (btnRemove) btnRemove.classList.add("hidden");

      renderCargoPills();
      setCardFlip(false);
      updateCarterinhaPreview();
      toast("Formulário da carteirinha limpo com sucesso!");
    });

    // Botão Copiar Ficha Funcional
    $("#cart-btn-copiar")?.addEventListener("click", () => {
      const d = getCarterinhaData();
      if (!d.nome) {
        toast("Preencha o nome do membro antes de copiar a ficha.", true);
        return;
      }
      let t = "========================================================\n";
      t += "🪪 FICHA FUNCIONAL — DEPARTAMENTO JURÍDICO DE BRAVA\n";
      t += "========================================================\n\n";
      t += `• Titular: ${d.nome} (Passaporte/ID: #${d.id || "000"})\n`;
      t += `• Cargo Oficial: ${d.cargo}\n`;
      t += `• Inscrição OAB/SDJ: ${d.inscricao}\n`;
      t += `• Telefone de Contato: ${d.telefone || "Não informado"}\n`;
      t += `• Naturalidade: ${d.naturalidade}\n`;
      t += `• Data da Expedição: ${d.expedicao}\n`;
      t += `• Situação Cadastral: ${d.situacao}\n`;
      t += `• Validade: INDETERMINADA (ENQUANTO EM CARGO)\n\n`;
      t += "🏛️ Homologação Oficial:\n";
      t += `Zaith Frost (Presidente do SDJ) & Mike Santaroni (Vice-Presidente)\n`;
      t += "========================================================";
      copyText(t);
    });

    function downloadCanvasAsPng(canvas, filename) {
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }

    // Baixar PNG Frente
    $("#cart-btn-download-front")?.addEventListener("click", async () => {
      const d = getCarterinhaData();
      const safe = (d.nome || "Membro").replace(/[^a-zA-Z0-9_-]/g, "_");
      toast("Gerando imagem da Frente em alta resolução...");
      try {
        const canvas = await window.SDJ_PDF.renderCarterinhaCanvas(d, "frente");
        downloadCanvasAsPng(canvas, `Carteira_SDJ_Frente_${safe}.png`);
        toast("✓ Imagem da Frente baixada com sucesso!");
      } catch (err) {
        toast("Erro ao gerar imagem: " + err.message, true);
      }
    });

    // Baixar PNG Verso
    $("#cart-btn-download-back")?.addEventListener("click", async () => {
      const d = getCarterinhaData();
      const safe = (d.nome || "Membro").replace(/[^a-zA-Z0-9_-]/g, "_");
      toast("Gerando imagem do Verso em alta resolução...");
      try {
        const canvas = await window.SDJ_PDF.renderCarterinhaCanvas(d, "verso");
        downloadCanvasAsPng(canvas, `Carteira_SDJ_Verso_${safe}.png`);
        toast("✓ Imagem do Verso baixada com sucesso!");
      } catch (err) {
        toast("Erro ao gerar imagem: " + err.message, true);
      }
    });

    // Baixar PNG Frente + Verso (Ambos)
    $("#cart-btn-download-both")?.addEventListener("click", async () => {
      const d = getCarterinhaData();
      const safe = (d.nome || "Membro").replace(/[^a-zA-Z0-9_-]/g, "_");
      toast("Gerando composição Frente + Verso em alta definição...");
      try {
        const canvas = await window.SDJ_PDF.renderCarterinhaCanvas(d, "ambos");
        downloadCanvasAsPng(canvas, `Carteira_SDJ_Completa_${safe}.png`);
        toast("✓ Imagem combinada da Carteirinha baixada com sucesso!");
      } catch (err) {
        toast("Erro ao gerar imagem combinada: " + err.message, true);
      }
    });

    // Enviar Foto da Carteirinha (Frente + Verso) para o Discord
    $("#cart-btn-discord")?.addEventListener("click", async function () {
      const btn = this;
      const d = getCarterinhaData();
      if (!d.nome) {
        toast("Por favor preencha o Nome do membro antes de enviar ao Discord.", true);
        $("#cart-nome")?.focus();
        return;
      }

      const isAssistenteSocial = (d.cargo || "").toLowerCase().includes("assistente social") ||
                                 (d.cargo || "").toLowerCase().includes("social");

      const webhookGeral = (typeof CARTERINHA_CONFIG !== "undefined" && CARTERINHA_CONFIG.webhook) ||
        "https://discord.com/api/webhooks/1561013193592016948/KAD218Y07otK0VZTv6euOd0Lig-Yc-FJf-0N2VRrzjXwEk8J2Ab8bh2gflYRqgoz9dMm";

      const webhookAssistenteSocial = (typeof CARTERINHA_CONFIG !== "undefined" && CARTERINHA_CONFIG.webhookAssistenteSocial) ||
        "https://discord.com/api/webhooks/1561029128336183415/PjkrMmEQCN5a6rgevDaTg8UatuLi2sFzsSE3dLVNrzcSTjfcwbrFuDOwXMhUNFHpMkFP";

      const webhookUrl = isAssistenteSocial ? webhookAssistenteSocial : webhookGeral;

      try {
        btn.innerHTML = "<span>Gerando foto da carteirinha...</span>";
        btn.disabled = true;

        // Renderiza a imagem combinada HD (Frente + Verso)
        const canvas = await window.SDJ_PDF.renderCarterinhaCanvas(d, "ambos");
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
        const safeName = (d.nome || "membro").toLowerCase().replace(/[^a-z0-9]/g, "_");
        const filename = `carteirinha_${safeName}_frente_verso.png`;

        const embedTitle = isAssistenteSocial
          ? "🤝 CARTEIRA FUNCIONAL — SERVIÇO SOCIAL & APOIO PSICOSSOCIAL SDJ"
          : "🪪 CARTEIRA DE IDENTIDADE FUNCIONAL — REGISTRO GERAL SDJ";

        const embedDesc = isAssistenteSocial
          ? "Identidade funcional oficial emitida para o Serviço Social do Departamento Jurídico de Brava City."
          : "Identidade funcional oficial emitida e homologada pela Secretaria Geral do Departamento Jurídico de Brava City.";

        const embedColor = isAssistenteSocial ? 0x10B981 : 0xD4AF37;

        const msgContent = isAssistenteSocial
          ? `🤝 **[CARTEIRA FUNCIONAL DO SERVIÇO SOCIAL EMITIDA]**\nA profissional **${d.nome}** (Passaporte: **#${d.id || "000"}**) foi devidamente credenciada como **${d.cargo}** (Registro: **${d.inscricao}**).`
          : `🪪 **[CARTEIRA FUNCIONAL DO DEPARTAMENTO JURÍDICO EMITIDA]**\nO membro **${d.nome}** (Passaporte: **#${d.id || "000"}**) foi devidamente credenciado como **${d.cargo}** com fé pública notarial.`;

        const toastMsg = isAssistenteSocial
          ? "✓ Foto da carteirinha de Assistente Social enviada para o canal dedicado!"
          : "✓ Foto da carteirinha Frente e Verso enviada para o Discord!";

        const payload = {
          content: msgContent,
          embeds: [
            {
              title: embedTitle,
              description: embedDesc,
              color: embedColor,
              fields: [
                { name: "👤 Titular", value: `${d.nome} (ID: #${d.id || "000"})`, inline: true },
                { name: "🎖️ Cargo Institucional", value: d.cargo, inline: true },
                { name: "🔢 Inscrição Oficial", value: d.inscricao, inline: true },
                { name: "📱 Telefone", value: d.telefone || "Não informado", inline: true },
                { name: "📍 Naturalidade", value: d.naturalidade, inline: true },
                { name: "📅 Data de Expedição", value: d.expedicao, inline: true },
                { name: "🟢 Situação Cadastral", value: d.situacao, inline: true },
                { name: "🏛️ Homologação Oficial", value: "Zaith Frost (Presidente) & Mike Santaroni (Vice)", inline: true }
              ],
              image: {
                url: `attachment://${filename}`
              },
              footer: {
                text: `Credenciamento SDJ · Poder Judiciário Brava City`
              },
              timestamp: new Date().toISOString()
            }
          ]
        };

        await sendWebhook(btn, webhookUrl, payload, () => {
          toast(toastMsg);
        }, { blob, filename });

      } catch (err) {
        toast("Erro ao preparar foto da carteirinha para o Discord: " + err.message, true);
        btn.disabled = false;
        btn.innerHTML = DISCORD_LABEL;
      }
    });

    // Render inicial da carteirinha
    updateCarterinhaPreview();
  }

  /* ==========================================================
     QUADRO DE AVISOS — DISCORD #quadro-de-avisos
     ========================================================== */
  function initAvisosModal() {
    const btnAvisos = $("#btn-avisos");
    const modalAvisos = $("#modal-avisos");
    if (!btnAvisos || !modalAvisos) return;

    const textarea = $("#aviso-conteudo");
    const charCount = $("#aviso-char-count");
    const btnEnviar = $("#btn-enviar-aviso");

    const webhookUrl = (window.CONFIG && window.CONFIG.webhookAvisos) ||
                       (window.AVISOS_CONFIG && window.AVISOS_CONFIG.webhook) ||
                       "https://discord.com/api/webhooks/1561400508319535234/tLi4jgnvw950Dlvk5rYzif6Vpf4kWWeDq4wEooHTr26H2NECDVpUJqC7RXOtrnksqQFj";

    function updateChars() {
      if (!textarea || !charCount) return;
      const len = textarea.value.length;
      charCount.textContent = `${len} / 2000`;
      charCount.style.color = len > 2000 ? "var(--red)" : len > 1800 ? "var(--accent)" : "var(--muted)";
    }

    if (textarea) textarea.addEventListener("input", updateChars);

    btnAvisos.addEventListener("click", () => {
      modalAvisos.classList.add("open");
      modalAvisos.setAttribute("aria-hidden", "false");
      if (textarea && !textarea.value.trim()) {
        carregarModeloAtualizacao();
      }
      updateChars();
    });

    modalAvisos.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) {
        modalAvisos.classList.remove("open");
        modalAvisos.setAttribute("aria-hidden", "true");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalAvisos.classList.contains("open")) {
        modalAvisos.classList.remove("open");
        modalAvisos.setAttribute("aria-hidden", "true");
      }
    });

    function carregarModeloAtualizacao() {
      if (!textarea) return;
      textarea.value = `# 🏛️ ATUALIZAÇÃO OFICIAL | JURÍDICO & TRIBUNAL DE JUSTIÇA ⚖️
────────────────────────────────────────────
> **Aos Membros, Servidores e Cidadãos de Brava RP:**
> Comunicamos a implementação de atualizações em nosso ecossistema judiciário: novo portal exclusivo do Tribunal, reajuste de custas e integração automática de documentos com o Discord.

### 💰 REAJUSTE DE VALORES E ATOS NOTARIAIS
* 👨‍👩‍👧‍👦 **Registro de Família:** \`R$ 250.000\`
* 📝 **Troca de Nome:** \`R$ 150.000\`
* 🚓 **Atendimento em Delegacia:** \`R$ 30.000\` a \`R$ 80.000\`

### ⚖️ NOVO PORTAL DO TRIBUNAL DE JUSTIÇA
Criada uma plataforma dedicada ao Tribunal com **9 serviços judiciais automatizados**:
* 📄 **Petição Inicial:** Distribuição de ações cíveis e criminais.
* 🔱 **Processos Criminais & 📃 Cíveis:** Abertura, andamento e acusação.
* 🏛️ **Decisões & Sentenças:** Fundamentação e publicação pelo Juízo.
* 📖 **Mandados:** Prisão preventiva, busca e apreensão e condução.
* ✅ **Autorizações Judiciais:** Quebras de sigilo, interceptações e eventos.
* 📚 **Mandados Concluídos:** Certidão de cumprimento do Oficial de Justiça.
* 📢 **Intimações & ⏰ Agendamentos:** Comunicações e pauta de audiências.

### ⚡ INTEGRAÇÃO DISCORD & PDF COM FÉ PÚBLICA
* 📬 **Envio Imediato:** Cada ato é despachado automaticamente ao canal respectivo.
* 📜 **PDF Oficial com QR Code:** Gera documento A4 com chancela digital e protocolo.
* ⚖️ **Artigos & Enquadramento:** Campo dedicado para artigos penais sem cortes.
* ✍️ **Rubricas Oficiais:** Assinaturas manuscritas ampliadas da Presidência e do Juiz.
────────────────────────────────────────────
*Poder Judiciário · Comarca de Brava RP*`;
      updateChars();
    }

    function carregarModeloPrecos() {
      if (!textarea) return;
      textarea.value = `# 💰 TABELA OFICIAL DE CUSTAS & SERVIÇOS NOTARIAIS ⚖️
────────────────────────────────────────────
> **Poder Judiciário & Cartório Notarial de Brava RP**
> Vigência Atualizada · 2026

* 👨‍👩‍👧‍👦 **Registro de Família:** \`R$ 250.000\`
* 📝 **Troca de Nome:** \`R$ 150.000\`
* 💒 **Certidão Notarial de Casamento:** \`R$ 200.000\`
* 👶 **Certidão de Nascimento:** \`R$ 150.000\`
* 📜 **Certidão de Adoção:** \`R$ 150.000\`
* 🏢 **Registro de CNPJ (Empresarial):** \`R$ 250.000\` (ou \`R$ 50.000\` semanal)
* 💍 **Venda de Alianças:** Namoro \`R$ 15.000\` · Noivado \`R$ 30.000\` · Casamento \`R$ 45.000\`
* 🔫 **Porte de Arma (PT 9mm):** \`R$ 80.000\` | Munição: \`R$ 400\` /unidade
* 🚓 **Honorários Delegacia:** \`R$ 30.000\` a \`R$ 80.000\`
────────────────────────────────────────────
*Atos com fé pública e validade jurídica em toda a comarca.*`;
      updateChars();
    }

    const btnModAtualizacao = $("#btn-modelo-atualizacao");
    if (btnModAtualizacao) btnModAtualizacao.addEventListener("click", carregarModeloAtualizacao);

    const btnModPrecos = $("#btn-modelo-precos");
    if (btnModPrecos) btnModPrecos.addEventListener("click", carregarModeloPrecos);

    const btnModLimpar = $("#btn-modelo-limpar");
    if (btnModLimpar) btnModLimpar.addEventListener("click", () => {
      if (textarea) textarea.value = "";
      updateChars();
    });

    if (btnEnviar) {
      btnEnviar.addEventListener("click", async () => {
        const text = (textarea ? textarea.value : "").trim();
        if (!text) {
          toast("Digite o conteúdo do comunicado antes de publicar.", true);
          return;
        }
        if (text.length > 2000) {
          toast(`O aviso ultrapassou 2.000 caracteres (${text.length}). Diminua o texto.`, true);
          return;
        }

        const originalText = btnEnviar.innerHTML;
        btnEnviar.disabled = true;
        btnEnviar.textContent = "Publicando no Discord...";

        try {
          const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: text })
          });

          if (res.ok) {
            toast("Aviso publicado com sucesso no #quadro-de-avisos! 📢");
            modalAvisos.classList.remove("open");
            modalAvisos.setAttribute("aria-hidden", "true");
          } else {
            const err = await res.text();
            toast("Erro ao despachar webhook para o Discord (" + res.status + ")", true);
            console.error("Discord error:", err);
          }
        } catch (e) {
          console.error("Falha na requisição:", e);
          toast("Erro de conexão ao enviar para o Discord.", true);
        } finally {
          btnEnviar.disabled = false;
          btnEnviar.innerHTML = originalText;
        }
      });
    }
  }

  renderList();
  renderTabelaPrecos();
  renderProvaOral();
  initProvaOralCampos();
  initCarterinha();
  initServiceAttachments();
  initAvisosModal();
  aplicarPrecosPadrao();
  initValidades();
  update();
})();
