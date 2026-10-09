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
    nascimento: svg('<path d="M9 12h.01M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>'),
    adocao: svg('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>'),
    familia: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
    cnpj: svg('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    seta: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    copiar: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    dado: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/>'),
    limpar: svg('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
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
  async function sendWebhook(btn, url, content, onSuccess) {
    const original = btn.innerHTML;
    btn.innerHTML = "<span>Enviando...</span>";
    btn.disabled = true;
    try {
      const payload = typeof content === "string" ? { content } : content;
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Erro ao enviar");
      btn.classList.add("success");
      btn.innerHTML = "<span>✓ Enviado com sucesso!</span>";
      toast("✓ Relatório enviado para o Discord");
      onSuccess && onSuccess();
    } catch (err) {
      toast("Erro ao enviar para o Discord: " + err.message, true);
    } finally {
      setTimeout(() => {
        btn.classList.remove("success");
        btn.innerHTML = original;
        btn.disabled = false;
      }, 1800);
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

  $("#btn-discord").innerHTML = DISCORD_LABEL;
  $("#btn-discord").addEventListener("click", (e) => {
    if (!selected.size) return toast("Selecione ao menos um artigo antes de enviar.", true);
    sendWebhook(e.currentTarget, webhookUrl, relatorioPenalEmbed());
  });
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
        { id: "tn_valor", label: "💰 Valor Cobrado", isFull: true }
      ]
    },
    {
      id: "alianca", title: "Venda de Aliança", icon: "💍", svg: "alianca", tag: "União civil",
      desc: "Registro de namoro, noivado ou casamento entre dois cidadãos.", webhook: "https://discord.com/api/webhooks/1557909803957747783/HFhg6mZJkwnbFtgbKgQ3DgAThaa6RB32O7Y6T8r2ZRWhq1kRe7KwwkmPBMCwxX2Iqws2",
      fields: [
        { id: "al_tipo", label: "💎 Tipo de Aliança", type: "options", options: ["Namoro", "Noivado", "Casamento"], isFull: true },
        { id: "al_n1", label: "👤 Nome do(a) Parceiro(a) 1" },
        { id: "al_id1", label: "🪪 Passaporte 1" },
        { id: "al_n2", label: "👤 Nome do(a) Parceiro(a) 2" },
        { id: "al_id2", label: "🪪 Passaporte 2" },
        { id: "al_data", label: "📅 Data da Celebração" },
        { id: "al_valor", label: "💰 Valor Cobrado" }
      ]
    },
    {
      id: "nascimento", title: "Certidão de Nascimento", icon: "🚼", svg: "nascimento", tag: "Certidão",
      desc: "Emissão da certidão com filiação e data de nascimento.", webhook: "https://discord.com/api/webhooks/1557909976167751800/qr6tK9efmUb71JK1XTFfcSdd2v2zoYFbiFPtEvBITR08sYr9_BS7vj1PLk_oLdBFdP7u",
      fields: [
        { id: "cn_crianca", label: "👶 Nome da Criança" },
        { id: "cn_id", label: "🪪 Passaporte da Criança" },
        { id: "cn_mae", label: "👩 Nome da Mãe" },
        { id: "cn_id_mae", label: "🪪 Passaporte da Mãe" },
        { id: "cn_pai", label: "👨 Nome do Pai" },
        { id: "cn_id_pai", label: "🪪 Passaporte do Pai" },
        { id: "cn_data", label: "📅 Data de Nascimento" },
        { id: "cn_valor", label: "💰 Valor Cobrado" }
      ]
    },
    {
      id: "adocao", title: "Certidão de Adoção", icon: "📝", svg: "adocao", tag: "Certidão",
      desc: "Formalização da adoção com até dois adotantes.", webhook: "https://discord.com/api/webhooks/1557910119419871333/hbKX69nBb5VT4JQsKWpcp5JRrAXa-_jglzxtOEi6nrpn7g3mWiTar4ILjb7LA8ev9rNd",
      fields: [
        { id: "ca_adotado", label: "👤 Nome do Adotado" },
        { id: "ca_id_adotado", label: "🪪 Passaporte do Adotado" },
        { id: "ca_adotante1", label: "👨‍👦 Nome do Adotante 1" },
        { id: "ca_id_adotante1", label: "🪪 Passaporte 1" },
        { id: "ca_adotante2", label: "👨‍👦 Nome do Adotante 2 (Opcional)" },
        { id: "ca_id_adotante2", label: "🪪 Passaporte 2 (Opcional)" },
        { id: "ca_valor", label: "💰 Valor Cobrado", isFull: true }
      ]
    },
    {
      id: "familia", title: "Registro de Família", icon: "📢", svg: "familia", tag: "Organização",
      desc: "Cadastro oficial de uma família e de seu fundador.", webhook: "https://discord.com/api/webhooks/1557910265994154055/PfeVIqUhCk6pxGWB9QiebBtjKLXdHHgL2DVTlKrHyRnWBd7ev_c2rYMl9pYY6JJqMfz8",
      fields: [
        { id: "rf_familia", label: "👥 Nome da Família" },
        { id: "rf_fundador", label: "👑 Nome do Fundador" },
        { id: "rf_id", label: "🪪 Passaporte do Fundador" },
        { id: "rf_valor", label: "💰 Valor Cobrado" },
        { id: "rf_membros", label: "📝 Quantidade de Membros Iniciais", placeholder: "Ex: 10", isFull: true }
      ]
    },
    {
      id: "cnpj", title: "Registro CNPJ", icon: "🏠", svg: "cnpj", tag: "Empresarial",
      desc: "Abertura de empresa com geração automática de CNPJ.", webhook: "https://discord.com/api/webhooks/1557910430666588192/-mdIUQAewOMjr4yvgvNos11Qa70c5fnVyJxEjK8uhRrCSTx267_1oMcR4JF54sCAQ1bO",
      fields: [
        { id: "cp_empresa", label: "🏢 Nome da Empresa" },
        { id: "cp_ramo", label: "🏷️ Ramo de Atividade" },
        { id: "cp_prop", label: "👤 Nome do Proprietário" },
        { id: "cp_id", label: "🪪 Passaporte do Proprietário" },
        { id: "cp_cnpj", label: "🔢 CNPJ da Empresa", type: "cnpj-generator", isFull: true },
        { id: "cp_valor", label: "💰 Valor Cobrado", isFull: true }
      ]
    }
  ];

  const renderField = (f) => {
    const label = cleanLabel(f.label);
    if (f.type === "options") {
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
    return `
      <label class="${f.isFull ? "full" : ""}">${label}
        <input id="${f.id}" type="text" placeholder="${f.placeholder || "Preencha..."}" />
      </label>`;
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

            <div class="form-section">Responsável pelo registro</div>
            <div class="form-grid fields">
              <label>Nome do Agente<input id="${svc.id}_agente" type="text" placeholder="Ex.: Sgt. Souza" /></label>
              <label>Passaporte do Agente<input id="${svc.id}_agente_id" type="text" placeholder="Ex.: 9012" /></label>
            </div>

            <div class="form-actions">
              <button class="btn-outline btn-reset" data-sid="${svc.id}" type="button">${ICONS.limpar} Limpar</button>
              <button class="btn-primary btn-service" data-sid="${svc.id}" type="button">${DISCORD_LABEL}</button>
            </div>
          </div>
        </section>
      </div>
    </div>`).join("");

  // Opções (cards de seleção)
  function selectOption(btn) {
    const inputId = btn.dataset.input;
    $$(`.opt-card[data-input="${inputId}"]`).forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-checked", b === btn);
    });
    $("#" + inputId).value = btn.dataset.val;
  }
  $$(".opt-card").forEach((btn) => btn.addEventListener("click", () => selectOption(btn)));

  // Gerador de CNPJ
  $$(".btn-gerar-cnpj").forEach((btnCnpj) => {
    btnCnpj.addEventListener("click", () => {
      const R = () => Math.floor(Math.random() * 10);
      $("#" + btnCnpj.dataset.input).value = `${R()}${R()}.${R()}${R()}${R()}.${R()}${R()}${R()}/0001-${R()}${R()}`;
      toast("✓ CNPJ gerado");
    });
  });

  function resetService(svc) {
    svc.fields.forEach((f) => {
      const el = $(`#${f.id}`);
      if (f.type === "options") selectOption($(`.opt-card[data-input="${f.id}"][data-val="${el.dataset.default}"]`));
      else el.value = "";
    });
    $(`#${svc.id}_agente`).value = "";
    $(`#${svc.id}_agente_id`).value = "";
  }
  $$(".btn-reset").forEach((btn) =>
    btn.addEventListener("click", () => resetService(servicesConfig.find((s) => s.id === btn.dataset.sid)))
  );

  /* ---------- Home: cards de serviço ---------- */
  const allCards = [calculadoraCard, ...servicesConfig];
  $("#calc-icon").innerHTML = ICONS.balanca;
  $("#home-grid").innerHTML = allCards.map((c, i) => `
    <button class="nav-card ${c.featured ? "featured" : ""}" type="button" id="card-${c.id}" data-target="tab-${c.id}" data-title="${c.title}" style="animation-delay:${0.05 * i}s">
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
    btn.addEventListener("click", () => goTo(btn.dataset.target, btn.dataset.title))
  );
  $("#btn-back").addEventListener("click", () => goTo("home"));
  $("#crumb-home").addEventListener("click", (e) => { e.preventDefault(); goTo("home"); });

  // Dynamic Service Submission
  $$(".btn-service").forEach(btn => {
    btn.addEventListener("click", async () => {
      const sid = btn.dataset.sid;
      const svc = servicesConfig.find(s => s.id === sid);
      
      const agente = $(`#${sid}_agente`).value || "—";
      const agenteId = $(`#${sid}_agente_id`).value || "—";
      const data = new Date().toLocaleString("pt-BR");

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

      sendWebhook(btn, svc.webhook, { embeds: [embed] }, () => resetService(svc));
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      const view = document.body.dataset.view;
      (modal.classList.contains("open") ? $("#codigo-search")
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

  renderList();
  update();
})();
