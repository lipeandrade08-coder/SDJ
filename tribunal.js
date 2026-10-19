/* ==========================================================
   TRIBUNAL DE JUSTIÇA — BRAVA RP
   Lógica da página tribunal.html (independente do app.js)
   ========================================================== */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => root.querySelectorAll(s);
  const CFG = TRIBUNAL_CONFIG;
  const SERVICOS = CFG.servicos;

  /* ---------- Ícones (SVG traço) ---------- */
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICONS = {
    peticao: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
    processo: svg('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 11v5M9.5 13.5h5"/>'),
    civil: svg('<path d="M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M9 8h6M9 12h6M9 16h3"/>'),
    decisao: svg('<path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10"/><path d="m16 16 6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>'),
    mandado: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h7M9 11h5"/>'),
    autorizacao: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
    concluido: svg('<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>'),
    intimacao: svg('<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'),
    agenda: svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v3l2 1"/>'),
    seta: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    dado: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/>'),
    limpar: svg('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
    download: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
  };
  const DISCORD_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>';
  const DISCORD_LABEL = `${DISCORD_SVG}<span>Enviar para o Discord</span>`;

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg, isError = false) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.toggle("error", isError);
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  /* ---------- Envio ao Discord (com PDF anexado) ---------- */
  async function sendWebhook(btn, url, payload, onSuccess, file) {
    const original = btn.innerHTML;
    btn.innerHTML = "<span>Enviando documento...</span>";
    btn.disabled = true;
    try {
      let body;
      const headers = {};
      if (file && file.blob) {
        body = new FormData();
        body.append("payload_json", JSON.stringify(payload));
        body.append("files[0]", file.blob, file.filename || "documento.pdf");
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
      }
      const res = await fetch(url, { method: "POST", headers, body });
      if (!res.ok) {
        let det = "";
        try { const j = await res.json(); det = j.message ? `: ${j.message}` : ""; } catch (_) {}
        throw new Error(`Código ${res.status}${det}`);
      }
      btn.classList.add("success");
      btn.innerHTML = "<span>✓ Enviado com PDF!</span>";
      toast("✓ Ato enviado ao Discord com o PDF oficial!");
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

  /* ---------- Geração de números oficiais ---------- */
  const rnd = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
  function gerarNumero(prefixo) {
    const ano = new Date().getFullYear();
    if (prefixo === "CNJ") return `${rnd(7)}-${rnd(2)}.${ano}.8.26.0001`;
    return `${prefixo}-${ano}-${rnd(6)}`;
  }

  /* ---------- Responsável salvo (preenche todos os formulários) ---------- */
  const RESP_KEY = "trib-responsavel";
  const getResp = () => { try { return JSON.parse(localStorage.getItem(RESP_KEY)) || {}; } catch { return {}; } };
  const saveResp = (r) => localStorage.setItem(RESP_KEY, JSON.stringify(r));

  /* ---------- Renderização dos campos ---------- */
  const reqMark = (f) => (f.req ? ' <span class="trib-req" title="Obrigatório">*</span>' : "");
  const hintHtml = (f) =>
    f.dica
      ? `<span class="field-hint" id="hint-${f.id}"><span class="hint-ico">💡</span><span class="hint-text">${f.dica}</span></span>`
      : "";

  function renderField(f, svc) {
    const label = `${f.label}${reqMark(f)}`;
    const ph = f.placeholder || "Preencha...";
    switch (f.type) {
      case "options": {
        const helpMap = window.TRIBUNAL_HELP_OPTIONS || {};
        return `
          <div class="full opt-field-block">
            <div class="trib-opt-label-bar">
              <span class="trib-opt-label">${label}</span>
              ${svc && svc.guia ? `
                <button type="button" class="btn-diferencas-link" data-guia-open="${svc.id}" title="Tire suas dúvidas: veja as diferenças entre as opções deste campo">
                  <span class="star-badge">*</span>
                  <span>Ver diferenças práticas</span>
                </button>
              ` : ""}
            </div>
            <div class="opt-grid" role="radiogroup" aria-label="${f.label}">
              ${f.options.map((o, i) => {
                const optTip = helpMap[o] || "";
                return `
                <button type="button" class="opt-card ${i === 0 ? "active" : ""}" data-input="${f.id}" data-val="${o}" role="radio" aria-checked="${i === 0}" ${optTip ? `title="${optTip}"` : ""}>
                  <span class="radio"></span>
                  <span class="opt-label-text">${o}</span>
                  ${optTip ? `<span class="opt-doubt-star" data-opt-info="${o}" title="${optTip}">*</span>` : ""}
                </button>`;
              }).join("")}
            </div>
            ${hintHtml(f)}
            <input type="hidden" id="${f.id}" value="${f.options[0]}" data-default="${f.options[0]}" />
          </div>`;
      }
      case "textarea":
        return `
          <label class="full field-wrapper-textarea">
            <div class="textarea-head-bar">
              <span class="textarea-label-text">${label}</span>
              ${f.modelo ? `
                <button type="button" class="btn-modelo-rapido" data-insert-target="${f.id}" title="Preencher com roteiro/esqueleto de exemplo pronto">
                  <span class="btn-modelo-ico">⚡</span>
                  <span>Inserir Roteiro Padrão</span>
                </button>
              ` : ""}
            </div>
            <textarea id="${f.id}" rows="4" class="trib-textarea" placeholder="${ph}"></textarea>
            ${hintHtml(f)}
          </label>`;
      case "date":
      case "time":
        return `
          <label class="${f.isFull ? "full" : ""}">
            <span class="field-label-text">${label}</span>
            <input id="${f.id}" type="${f.type}" class="trib-datetime" />
            ${hintHtml(f)}
          </label>`;
      case "numero":
        return `
          <label class="${f.isFull ? "full" : ""}">
            <span class="field-label-text">${label}</span>
            <span class="input-with-btn">
              <input id="${f.id}" type="text" data-prefixo="${f.prefixo}" />
              <button type="button" class="btn-outline btn-gerar-num" data-input="${f.id}" title="Gerar novo número">${ICONS.dado}</button>
            </span>
            ${hintHtml(f)}
          </label>`;
      default: {
        const isArtigoField = f.id.endsWith("_artigos");
        return `
          <label class="${f.isFull ? "full" : ""}">
            <div class="field-label-row">
              <span class="field-label-text">${label}</span>
              ${isArtigoField ? `
                <button type="button" class="btn-consultar-cc-field" data-open-cc-field="${f.id}" title="Consultar o Código Civil e inserir artigos neste campo">
                  <span>📜 Consultar Código Civil</span>
                </button>
              ` : ""}
            </div>
            <input id="${f.id}" type="text" placeholder="${ph}" value="${f.value || ""}" data-default="${f.value || ""}" />
            ${hintHtml(f)}
          </label>`;
      }
    }
  }

  function renderService(svc) {
    const cargos = CFG.cargos.map((c) => {
      const nome = typeof c === "object" ? c.nome : c;
      const display = typeof c === "object"
        ? `${c.id} | ${c.icone} ${c.titulo || c.nome.toUpperCase()}`
        : c;
      const isSel = (nome === svc.cargoPadrao || (typeof c === "string" && c === svc.cargoPadrao)) ? "selected" : "";
      return `<option value="${nome}" ${isSel}>${display}</option>`;
    }).join("");
    return `
      <div id="tab-${svc.id}" class="tab-content">
        <div class="service-wrap">
          <header class="service-hero">
            <span class="card-icon">${ICONS[svc.svg]}</span>
            <div class="service-hero-content">
              <div class="service-hero-pills">
                <span class="trib-hero-tag">${svc.emoji} ${svc.tag}</span>
                <button type="button" class="btn-hero-guia" data-guia-open="${svc.id}" title="Tire suas dúvidas sobre este serviço e veja as diferenças">
                  <span class="star-badge">*</span>
                  <span>Guia do Advogado &amp; Estagiário (Dúvidas)</span>
                </button>
              </div>
              <h2>${svc.title}</h2>
              <p>${svc.desc}</p>
            </div>
          </header>
          <section class="panel form-panel">
            <div class="form-body">
              ${svc.guia ? `
              <div class="doubt-alert-banner" data-guia-open="${svc.id}" role="button" tabindex="0" title="Clique para abrir o guia com as diferenças deste serviço">
                <div class="doubt-alert-icon">
                  <span class="star-pill-lg">*</span>
                </div>
                <div class="doubt-alert-content">
                  <div class="doubt-alert-headline">
                    <strong>Dúvidas sobre ${svc.title}?</strong>
                    <span class="doubt-alert-tag">Guia Prático</span>
                  </div>
                  <p>Consulte as regras e entenda a diferença prática entre: <em>${svc.guia.destaque}</em></p>
                </div>
                <button type="button" class="btn-outline btn-doubt-trigger" data-guia-open="${svc.id}" title="Abrir manual com as diferenças">
                  <span class="star-badge">*</span>
                  <span>Tirar Dúvidas</span>
                  ${ICONS.seta}
                </button>
              </div>
              ` : ""}

              ${svc.id === "peticao" ? `
              <div class="peticao-mode-banner">
                <div class="peticao-mode-header">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span class="star-pill-lg">📑</span>
                    <div>
                      <strong style="color:var(--strong);font-size:13.5px;">Modalidade de Protocolo da Petição</strong>
                      <p class="muted" style="margin:2px 0 0;font-size:12px;">Se o advogado já tiver a petição pronta em PDF, pode anexá-la diretamente para envio com comprovante oficial.</p>
                    </div>
                  </div>
                </div>
                <div class="peticao-mode-selector" role="radiogroup" aria-label="Modalidade de Protocolo">
                  <button type="button" class="peticao-mode-card active" data-peticao-mode="redigir" role="radio" aria-checked="true">
                    <span class="radio"></span>
                    <div class="peticao-mode-info">
                      <strong>📝 Redigir Petição no Portal</strong>
                      <span>Preencher fatos e pedidos nos campos do Tribunal</span>
                    </div>
                  </button>
                  <button type="button" class="peticao-mode-card" data-peticao-mode="anexar" role="radio" aria-checked="false">
                    <span class="radio"></span>
                    <div class="peticao-mode-info">
                      <strong>📎 Anexar Peça Pronta em PDF</strong>
                      <span>Enviar o arquivo PDF original com comprovante oficial no Discord</span>
                    </div>
                  </button>
                </div>

                <!-- Bloco de Upload do PDF (visível quando modo == 'anexar') -->
                <div id="peticao-upload-zone" class="peticao-upload-zone hidden">
                  <div class="peticao-drop-area" id="peticao-drop-area" role="button" tabindex="0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="peticao-upload-ico">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <div class="peticao-upload-texts">
                      <strong>Clique para selecionar o PDF da Petição do Advogado</strong>
                      <span>ou arraste e solte o arquivo aqui (formato .pdf)</span>
                    </div>
                    <input type="file" id="pi_pdf_file" accept="application/pdf,.pdf" style="display:none;" />
                  </div>

                  <!-- Preview do arquivo carregado -->
                  <div id="peticao-file-preview" class="peticao-file-preview hidden">
                    <div class="peticao-file-meta">
                      <span class="peticao-file-ico">📄</span>
                      <div class="peticao-file-details">
                        <strong id="peticao-file-name">peticao.pdf</strong>
                        <span id="peticao-file-size" class="muted">0 KB</span>
                      </div>
                    </div>
                    <div class="peticao-file-badge">
                      <span class="status-dot"></span>
                      <span>Peça Original Anexada</span>
                    </div>
                    <button type="button" id="btn-peticao-remover-pdf" class="btn-ghost-sm" title="Remover e escolher outro arquivo">Remover</button>
                  </div>

                  <div class="peticao-upload-alert">
                    <span>💡 <b>Aviso de Protocolo:</b> Ao enviar, o arquivo PDF original elaborado pelo advogado será anexado aos autos eletrônicos no Discord, gerando automaticamente uma certidão de protocolo com fé pública e datação oficial.</span>
                  </div>
                </div>
              </div>
              ` : ""}

              <div class="form-section">Dados do ato</div>
              <div class="form-grid fields">${svc.fields.map((f) => renderField(f, svc)).join("")}</div>

              <div class="form-section">Responsável pelo ato</div>
              <div class="form-grid fields">
                <label>
                  <span class="field-label-text">Nome <span class="trib-req" title="Obrigatório">*</span></span>
                  <input id="${svc.id}_resp" class="trib-resp-nome" type="text" placeholder="Ex.: Dr. Zaith Frost" />
                  <span class="field-hint"><span class="hint-ico">💡</span><span class="hint-text">Nome jurídico do Magistrado, Promotor, Advogado ou Oficial.</span></span>
                </label>
                <label>
                  <span class="field-label-text">Passaporte</span>
                  <input id="${svc.id}_resp_id" class="trib-resp-id" type="text" placeholder="Ex.: 1234" />
                  <span class="field-hint"><span class="hint-ico">💡</span><span class="hint-text">Seu passaporte no RP (fica memorizado para todos os atos).</span></span>
                </label>
                <label class="full">
                  <span class="field-label-text">Cargo</span>
                  <select id="${svc.id}_resp_cargo" class="trib-select">${cargos}</select>
                  <span class="field-hint"><span class="hint-ico">💡</span><span class="hint-text">Cargo oficial do subscritor da peça ou ordem judicial.</span></span>
                </label>
              </div>

              <div class="form-actions">
                <button class="btn-outline btn-reset" data-sid="${svc.id}" type="button">${ICONS.limpar} Limpar</button>
                <button class="btn-outline btn-pdf" data-sid="${svc.id}" type="button" title="Baixar documento oficial em PDF">${ICONS.download} Baixar PDF</button>
                <button class="btn-primary btn-enviar" data-sid="${svc.id}" type="button">${DISCORD_LABEL}</button>
              </div>
            </div>
          </section>
        </div>
      </div>`;
  }

  /* ---------- Home: grupos de cards ---------- */
  let cardIndex = 0;
  $("#trib-groups").innerHTML = CFG.grupos.map((g) => {
    const itens = SERVICOS.filter((s) => s.grupo === g.id);
    return `
      <section class="trib-group" data-grupo="${g.id}">
        <div class="trib-group-head">
          <h3>${g.titulo}</h3>
          <p class="muted">${g.desc}</p>
        </div>
        <div class="home-grid">
          ${itens.map((s) => `
            <button class="nav-card" type="button" id="card-${s.id}" data-target="tab-${s.id}" data-title="${s.title}" style="animation-delay:${0.05 * cardIndex++}s">
              <div class="card-top">
                <span class="card-icon">${ICONS[s.svg]}</span>
                <div class="card-top-tags">
                  <span class="card-tag">${s.tag}</span>
                  <span class="card-star-doubt" data-guia-open="${s.id}" title="* Tire dúvidas e veja a diferença prática deste serviço" role="button" tabindex="0">
                    <span class="star-char">*</span>
                    <span class="star-lbl">Dúvidas</span>
                  </span>
                </div>
              </div>
              <h4>${s.title}</h4>
              <p>${s.desc}</p>
              <div class="card-foot"><span>Acessar serviço</span>${ICONS.seta}</div>
            </button>`).join("")}
        </div>
      </section>`;
  }).join("");

  $("#trib-services").innerHTML = SERVICOS.map(renderService).join("");

  /* ---------- Estatísticas ---------- */
  $("#stat-servicos").textContent = SERVICOS.length;
  $("#stat-grupos").textContent = CFG.grupos.length;
  function atualizarData() {
    const hoje = new Date();
    $("#stat-data").textContent = hoje.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    $("#stat-dia").textContent = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
  }
  atualizarData();
  setInterval(atualizarData, 60 * 1000);

  /* ---------- Filtro e Busca na home ---------- */
  let activeCategory = "all";

  function filtrarHome() {
    const searchInput = $("#home-search");
    const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
    let total = 0;

    $$(".trib-group").forEach((grp) => {
      const gid = grp.dataset.grupo;
      const matchCat = (activeCategory === "all" || activeCategory === gid);
      let n = 0;

      $$(".nav-card", grp).forEach((card) => {
        const textMatch = !q || card.textContent.toLowerCase().includes(q);
        const show = matchCat && textMatch;
        card.classList.toggle("hidden", !show);
        if (show) n++;
      });

      grp.classList.toggle("hidden", !matchCat || n === 0);
      if (matchCat) total += n;
    });

    const badge = $("#search-count-badge");
    if (badge) {
      if (q || activeCategory !== "all") {
        badge.textContent = `${total} ${total === 1 ? "encontrado" : "encontrados"}`;
        badge.classList.toggle("is-filtering", true);
      } else {
        badge.textContent = `${SERVICOS.length} serviços`;
        badge.classList.toggle("is-filtering", false);
      }
    }

    $("#home-empty").classList.toggle("hidden", total > 0);
  }

  const homeSearchInput = $("#home-search");
  if (homeSearchInput) {
    homeSearchInput.addEventListener("input", filtrarHome);
  }

  $$(".category-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      $$(".category-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.filterGroup || "all";
      filtrarHome();
    });
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
    window.scrollTo({ top: 0 });
  }
  $$(".nav-card").forEach((b) => b.addEventListener("click", () => goTo(b.dataset.target, b.dataset.title)));
  $("#btn-back").addEventListener("click", () => goTo("home"));
  $("#crumb-home").addEventListener("click", (e) => { e.preventDefault(); goTo("home"); });

  /* ---------- Opções (cards de seleção) ---------- */
  function selectOption(btn) {
    if (!btn) return;
    const id = btn.dataset.input;
    $$(`.opt-card[data-input="${id}"]`).forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-checked", b === btn);
    });
    $("#" + id).value = btn.dataset.val;
  }
  $$(".opt-card").forEach((b) => b.addEventListener("click", () => selectOption(b)));

  /* ---------- Números automáticos ---------- */
  function preencherNumeros(svc) {
    svc.fields.filter((f) => f.type === "numero").forEach((f) => ($("#" + f.id).value = gerarNumero(f.prefixo)));
  }
  $$(".btn-gerar-num").forEach((b) =>
    b.addEventListener("click", () => {
      const inp = $("#" + b.dataset.input);
      inp.value = gerarNumero(inp.dataset.prefixo);
      toast("✓ Novo número gerado");
    })
  );

  /* ---------- Inserção rápida de roteiros / modelos nos campos ---------- */
  function findFieldModelo(fieldId) {
    for (const s of SERVICOS) {
      const f = (s.fields || []).find((x) => x.id === fieldId);
      if (f && f.modelo) return f.modelo;
    }
    return "";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-modelo-rapido");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const targetId = btn.getAttribute("data-insert-target");
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;
    const modelo = findFieldModelo(targetId);
    if (!modelo) return;

    if (targetEl.value && targetEl.value.trim() !== "") {
      const ok = confirm("O campo já contém texto digitado.\n\nDeseja substituir pelo modelo de roteiro padrão?");
      if (!ok) return;
    }

    targetEl.value = modelo;
    targetEl.dispatchEvent(new Event("input", { bubbles: true }));
    targetEl.focus();

    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span class="btn-modelo-ico">✓</span> <span>Modelo Inserido!</span>`;
    btn.classList.add("btn-modelo-success");
    toast("✓ Roteiro modelo inserido com sucesso!");
    setTimeout(() => {
      btn.innerHTML = origHtml;
      btn.classList.remove("btn-modelo-success");
    }, 2000);
  });

  /* ---------- Responsável: preenche e sincroniza ---------- */
  function preencherResponsavel() {
    const r = getResp();
    $$(".trib-resp-nome").forEach((i) => (i.value = r.nome || ""));
    $$(".trib-resp-id").forEach((i) => (i.value = r.id || ""));
    if (r.cargo) {
      $$(".trib-select").forEach((s) => {
        const hasOpt = [...s.options].some((o) => o.value === r.cargo);
        if (hasOpt) s.value = r.cargo;
      });
    }
  }
  $$(".trib-resp-nome, .trib-resp-id").forEach((inp) =>
    inp.addEventListener("change", () => {
      const r = getResp();
      if (inp.classList.contains("trib-resp-nome")) r.nome = inp.value.trim();
      else r.id = inp.value.trim();
      saveResp(r);
      preencherResponsavel();
    })
  );
  $$(".trib-select").forEach((sel) =>
    sel.addEventListener("change", () => {
      const r = getResp();
      r.cargo = sel.value;
      saveResp(r);
      preencherResponsavel();
    })
  );

  /* ---------- Leitura dos valores ---------- */
  const fmtData = (v) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v.split("-").reverse().join("/") : v);

  function lerServico(svc) {
    const campos = svc.fields.map((f) => {
      const el = $("#" + f.id);
      let v = el ? el.value.trim() : "";
      if (f.type === "date") v = fmtData(v);
      return { ...f, value: v };
    });
    const resp = {
      nome: $(`#${svc.id}_resp`).value.trim(),
      id: $(`#${svc.id}_resp_id`).value.trim(),
      cargo: $(`#${svc.id}_resp_cargo`).value,
    };
    return { campos, resp };
  }

  /* ---------- Modalidade de Petição: Redigir vs Anexar PDF ---------- */
  let peticaoModo = "redigir";
  let peticaoArquivoPDF = null;

  function setPeticaoModo(novoModo) {
    peticaoModo = novoModo;
    const isAnexar = novoModo === "anexar";
    $$(".peticao-mode-card").forEach((b) => {
      const match = b.dataset.peticaoMode === novoModo;
      b.classList.toggle("active", match);
      b.setAttribute("aria-checked", match);
    });
    const uploadZone = $("#peticao-upload-zone");
    if (uploadZone) uploadZone.classList.toggle("hidden", !isAnexar);

    const fatosInp = $("#pi_fatos");
    const pedidoInp = $("#pi_pedido");
    const fatosLabel = fatosInp ? fatosInp.closest("label") : null;
    const pedidoLabel = pedidoInp ? pedidoInp.closest("label") : null;

    if (fatosLabel) fatosLabel.classList.toggle("field-dimmed", isAnexar);
    if (pedidoLabel) pedidoLabel.classList.toggle("field-dimmed", isAnexar);

    if (isAnexar) {
      if (fatosInp && !fatosInp.value) {
        fatosInp.value = "Peça processual em anexo (arquivo PDF original elaborado e subscrito pelo patrono constituído).";
      }
      if (pedidoInp && !pedidoInp.value) {
        pedidoInp.value = "Vide termos, requerimentos e pedidos na íntegra constantes na petição anexada em PDF.";
      }
    }
  }

  function handlePeticaoFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      toast("Apenas arquivos em formato PDF (.pdf) são aceitos!", true);
      return;
    }
    peticaoArquivoPDF = file;
    const preview = $("#peticao-file-preview");
    const dropArea = $("#peticao-drop-area");
    const nameEl = $("#peticao-file-name");
    const sizeEl = $("#peticao-file-size");
    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = `${(file.size / 1024).toFixed(1)} KB`;
    if (preview) preview.classList.remove("hidden");
    if (dropArea) dropArea.classList.add("has-file");
    toast(`✓ Arquivo "${file.name}" anexado com sucesso!`);
  }

  function removerPeticaoFile() {
    peticaoArquivoPDF = null;
    const fileInp = $("#pi_pdf_file");
    if (fileInp) fileInp.value = "";
    const preview = $("#peticao-file-preview");
    const dropArea = $("#peticao-drop-area");
    if (preview) preview.classList.add("hidden");
    if (dropArea) dropArea.classList.remove("has-file");
  }

  function validar(svc, campos, resp) {
    $$(`#tab-${svc.id} .trib-invalid`).forEach((e) => e.classList.remove("trib-invalid"));

    if (svc.id === "peticao" && peticaoModo === "anexar") {
      if (!peticaoArquivoPDF) {
        toast("Por favor, anexe o arquivo PDF da petição pronta!", true);
        const dropArea = $("#peticao-drop-area");
        if (dropArea) {
          dropArea.scrollIntoView({ behavior: "smooth", block: "center" });
          dropArea.classList.add("trib-invalid-drop");
          setTimeout(() => dropArea.classList.remove("trib-invalid-drop"), 2500);
        }
        return false;
      }
    }

    const faltando = campos.filter((c) => {
      if (svc.id === "peticao" && peticaoModo === "anexar" && (c.id === "pi_fatos" || c.id === "pi_pedido")) {
        return false;
      }
      return c.req && !c.value;
    });

    if (!resp.nome) faltando.push({ id: `${svc.id}_resp`, label: "Nome do responsável" });
    faltando.forEach((c) => $("#" + c.id)?.classList.add("trib-invalid"));
    if (faltando.length) {
      toast(`Preencha: ${faltando.map((c) => c.label).join(", ")}`, true);
      $("#" + faltando[0].id)?.focus();
      return false;
    }
    return true;
  }

  const val = (campos, id) => (campos.find((c) => c.id === id) || {}).value || "";

  function tituloDocumento(svc, campos) {
    if (svc.id === "mandados") return `Mandado de ${val(campos, "mn_tipo")}`;
    if (svc.id === "decisoes") return `${val(campos, "de_tipo")} Judicial`;
    if (svc.id === "concluidos") return "Certidão de Cumprimento de Mandado";
    if (svc.id === "intimacoes") return "Mandado de Intimação";
    if (svc.id === "agendamentos") return `Pauta · ${val(campos, "ag_tipo")}`;
    return svc.title;
  }

  function corEmbed(svc, campos) {
    if (svc.id === "decisoes") {
      const r = val(campos, "de_resultado");
      if (/Condena|Improcedente/.test(r)) return 15158332;
      if (/Absolvi|Procedente/.test(r)) return 3066993;
    }
    if (svc.id === "concluidos") {
      const r = val(campos, "mc_resultado");
      if (r === "Não Cumprido") return 15158332;
      if (r === "Cumprido") return 3066993;
    }
    return svc.cor;
  }

  async function gerarPDF(svc, campos, resp) {
    if (!window.SDJ_PDF || !window.SDJ_PDF.generateTribunalPDF) throw new Error("Gerador de PDF indisponível");
    return window.SDJ_PDF.generateTribunalPDF({
      titulo: tituloDocumento(svc, campos),
      fields: campos.map((c) => ({
        label: c.label,
        value: c.value || "Não informado",
        long: c.type === "textarea",
        isFull: !!c.isFull || /artigo|infrac|crime|acusação|dispositivo|amparo|base legal/i.test(c.label),
      })),
      agente: resp.nome || "—",
      agenteId: resp.id || "—",
      cargo: resp.cargo,
      termo: svc.termo,
      natureza: svc.natureza,
      eficacia: svc.eficacia,
      secaoTexto: svc.secaoTexto,
      cidade: CFG.cidade,
    });
  }

  function montarComprovanteEmbed(svc, campos, resp, file) {
    const numero = campos.find((c) => c.type === "numero")?.value || gerarNumero("PET");
    const tipo = val(campos, "pi_tipo") || "Petição Inicial";
    const autor = val(campos, "pi_autor") || "—";
    const autorId = val(campos, "pi_autor_id");
    const reu = val(campos, "pi_reu") || "—";
    const reuId = val(campos, "pi_reu_id");
    const artigos = val(campos, "pi_artigos");
    const valor = val(campos, "pi_valor");
    const fileSizeKb = (file.size / 1024).toFixed(1);

    const fields = [
      { name: "📋 Nº do Protocolo", value: `\`${numero}\``, inline: true },
      { name: "⚖️ Tipo de Ação", value: `**${tipo}**`, inline: true },
      { name: "💰 Valor da Causa", value: valor ? `**${valor}**` : "*Não informado*", inline: true },
      { name: "👤 Autor / Requerente", value: `**${autor}** ${autorId ? `\n(Passaporte: \`${autorId}\`)` : ""}`, inline: true },
      { name: "🛡️ Réu / Requerido", value: `**${reu}** ${reuId ? `\n(Passaporte: \`${reuId}\`)` : ""}`, inline: true },
      { name: "📅 Data do Protocolo", value: `**${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}**`, inline: true },
    ];

    if (artigos) {
      fields.push({ name: "⚖️ Artigos / Base Legal", value: `*${artigos}*`, inline: false });
    }

    fields.push({
      name: "📎 Peça Processual Anexada (PDF do Advogado)",
      value: `📄 **\`${file.name}\`** (${fileSizeKb} KB)\n*O arquivo original elaborado pelo patrono foi protocolado e anexado aos autos eletrônicos para apreciação do Juízo.*`,
      inline: false
    });

    fields.push({
      name: "🎓 Patrono / Subscritor",
      value: `**${resp.nome}** · ${resp.cargo} ${resp.id ? `(Passaporte: ${resp.id})` : ""}`,
      inline: false
    });

    fields.push({
      name: "🏛️ Certidão do Tribunal de Justiça",
      value: `*A Secretaria do Tribunal de Justiça de Brava RP CERTIFICA que a petição em referência foi protocolada eletronicamente e distribuída com fé pública, vinculando a peça anexa ao presente protocolo.*`,
      inline: false
    });

    return {
      content: `📑 **[COMPROVANTE OFICIAL DE PROTOCOLO DE PETIÇÃO]** · \`${numero}\`\n⚖️ *Petição inicial com arquivo PDF original anexado pelo advogado recebida no Tribunal.*`,
      embeds: [{
        title: `🏛️ TRIBUNAL DE JUSTIÇA · PROTOCOLO DE PEÇA ANEXADA`,
        description: `**Comprovante eletrônico de distribuição processual** emitido em favor de **${autor}** em face de **${reu}**.`,
        color: 0xd4af37, // Dourado do Judiciário
        fields,
        footer: { text: `${CFG.nome} • Protocolo Eletrônico • Peça Original Anexada` },
        timestamp: new Date().toISOString()
      }]
    };
  }

  function montarEmbed(svc, campos, resp) {
    const numero = campos.find((c) => c.type === "numero")?.value;
    const corte = (t, n) => (t.length > n ? t.slice(0, n - 3) + "..." : t);
    const fields = campos
      .filter((c) => c.value)
      .slice(0, 24)
      .map((c) => ({
        name: c.label,
        value: corte(c.type === "textarea" ? c.value : `**${c.value}**`, 1024),
        inline: c.type !== "textarea" && !c.isFull && !/artigo|infrac|crime|acusação|dispositivo|amparo|base legal/i.test(c.label),
      }));
    return {
      content: `${svc.emoji} **${tituloDocumento(svc, campos).toUpperCase()}**${numero ? ` · \`${numero}\`` : ""}`,
      embeds: [{
        title: corte(`${svc.emoji} ${svc.title}`, 256),
        color: corEmbed(svc, campos),
        fields,
        footer: { text: `${CFG.nome} • ${resp.cargo}: ${resp.nome} (${resp.id || "—"})` },
        timestamp: new Date().toISOString(),
      }],
    };
  }

  function resetService(svc) {
    svc.fields.forEach((f) => {
      const el = $("#" + f.id);
      if (!el) return;
      if (f.type === "options") selectOption($(`.opt-card[data-input="${f.id}"][data-val="${el.dataset.default}"]`));
      else el.value = el.dataset.default || "";
    });
    $$(`#tab-${svc.id} .trib-invalid`).forEach((e) => e.classList.remove("trib-invalid"));
    $(`#${svc.id}_resp_cargo`).value = svc.cargoPadrao;
    preencherNumeros(svc);
    preencherResponsavel();

    if (svc.id === "peticao") {
      setPeticaoModo("redigir");
      removerPeticaoFile();
    }
  }

  /* ---------- Ações dos botões ---------- */
  const findSvc = (sid) => SERVICOS.find((s) => s.id === sid);

  $$(".btn-reset").forEach((b) => b.addEventListener("click", () => resetService(findSvc(b.dataset.sid))));

  $$(".btn-pdf").forEach((b) =>
    b.addEventListener("click", async () => {
      const svc = findSvc(b.dataset.sid);
      const { campos, resp } = lerServico(svc);
      if (!validar(svc, campos, resp)) return;

      if (svc.id === "peticao" && peticaoModo === "anexar" && peticaoArquivoPDF) {
        try {
          toast("Gerando Comprovante de Protocolo em PDF...");
          const comprovanteCampos = [
            { label: "Nº do Protocolo", value: val(campos, "pi_numero") || gerarNumero("PET"), isFull: false },
            { label: "Tipo de Ação", value: val(campos, "pi_tipo") || "Petição Inicial", isFull: false },
            { label: "Autor / Requerente", value: `${val(campos, "pi_autor")} (ID: ${val(campos, "pi_autor_id") || "—"})`, isFull: false },
            { label: "Réu / Requerido", value: `${val(campos, "pi_reu")} (ID: ${val(campos, "pi_reu_id") || "—"})`, isFull: false },
            { label: "Valor da Causa", value: val(campos, "pi_valor") || "Não informado", isFull: true },
            { label: "Base Legal / Dispositivos", value: val(campos, "pi_artigos") || "Conforme peça anexa", isFull: true },
            { label: "Peça Processual Anexada", value: `Arquivo: ${peticaoArquivoPDF.name} (${(peticaoArquivoPDF.size / 1024).toFixed(1)} KB) — Entregue ao Tribunal`, isFull: true },
            { label: "Certidão de Distribuição", value: "Certifico e dou fé que a presente petição foi regularmente protocolada no Tribunal de Justiça de Brava RP, com a integralidade do PDF original anexado aos autos eletrônicos para regular distribuição.", isFull: true, long: true }
          ];

          const comprovantePDF = await window.SDJ_PDF.generateTribunalPDF({
            titulo: "Comprovante de Protocolo de Petição Judicial",
            fields: comprovanteCampos,
            agente: resp.nome || "—",
            agenteId: resp.id || "—",
            cargo: resp.cargo,
            termo: "A SECRETARIA DO TRIBUNAL DE JUSTIÇA CERTIFICA o protocolo tempestivo da petição com a peça original anexada.",
            natureza: "Comprovante de Protocolo Eletrônico",
            eficacia: "Distribuição Judicial e Fé Pública",
            cidade: CFG.cidade
          });

          comprovantePDF.doc.save(`Comprovante_Protocolo_${val(campos, "pi_numero") || "PET"}.pdf`);
          toast("✓ Comprovante de Protocolo baixado com sucesso!");
        } catch (err) {
          toast("Erro ao gerar comprovante: " + err.message, true);
        }
        return;
      }

      try {
        toast("Gerando documento em PDF...");
        const pdf = await gerarPDF(svc, campos, resp);
        pdf.doc.save(pdf.filename);
        toast("✓ PDF baixado com sucesso!");
      } catch (err) {
        toast("Erro ao gerar PDF: " + err.message, true);
      }
    })
  );

  $$(".btn-enviar").forEach((b) =>
    b.addEventListener("click", async () => {
      const svc = findSvc(b.dataset.sid);
      const { campos, resp } = lerServico(svc);
      if (!validar(svc, campos, resp)) return;
      if (!svc.webhook) return toast("Webhook deste canal não configurado em tribunal-data.js", true);

      let pdfToSend = null;
      let payloadToSend = null;

      if (svc.id === "peticao" && peticaoModo === "anexar" && peticaoArquivoPDF) {
        pdfToSend = {
          blob: peticaoArquivoPDF,
          filename: peticaoArquivoPDF.name || `Peticao_${val(campos, "pi_numero") || "Protocolo"}.pdf`
        };
        payloadToSend = montarComprovanteEmbed(svc, campos, resp, peticaoArquivoPDF);
      } else {
        try { pdfToSend = await gerarPDF(svc, campos, resp); } catch (err) { console.warn("Falha ao gerar PDF:", err); }
        payloadToSend = montarEmbed(svc, campos, resp);
      }

      sendWebhook(b, svc.webhook, payloadToSend, () => resetService(svc), pdfToSend);
    })
  );

  /* ---------- Eventos de Modalidade e Upload de Petição ---------- */
  document.addEventListener("click", (e) => {
    const modeBtn = e.target.closest("[data-peticao-mode]");
    if (modeBtn) {
      e.preventDefault();
      setPeticaoModo(modeBtn.dataset.peticaoMode);
      return;
    }

    const dropArea = e.target.closest("#peticao-drop-area");
    if (dropArea && !e.target.closest("#pi_pdf_file")) {
      const fileInp = $("#pi_pdf_file");
      if (fileInp) fileInp.click();
      return;
    }

    if (e.target.closest("#btn-peticao-remover-pdf")) {
      e.preventDefault();
      removerPeticaoFile();
      return;
    }
  });

  document.addEventListener("change", (e) => {
    if (e.target.id === "pi_pdf_file" && e.target.files && e.target.files[0]) {
      handlePeticaoFile(e.target.files[0]);
    }
  });

  document.addEventListener("dragover", (e) => {
    const dropArea = e.target.closest("#peticao-drop-area");
    if (dropArea) {
      e.preventDefault();
      dropArea.classList.add("dragover");
    }
  });

  document.addEventListener("dragleave", (e) => {
    const dropArea = e.target.closest("#peticao-drop-area");
    if (dropArea) {
      dropArea.classList.remove("dragover");
    }
  });

  document.addEventListener("drop", (e) => {
    const dropArea = e.target.closest("#peticao-drop-area");
    if (dropArea) {
      e.preventDefault();
      dropArea.classList.remove("dragover");
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handlePeticaoFile(e.dataTransfer.files[0]);
      }
    }
  });

  // Remove o destaque de erro ao digitar
  document.addEventListener("input", (e) => e.target.classList?.remove("trib-invalid"));

  /* ---------- Tema claro / escuro ---------- */
  $("#btn-tema").addEventListener("click", () => {
    const root = document.documentElement;
    const novo = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", novo);
    localStorage.setItem("brava-tema", novo);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const dropArea = e.target.closest("#peticao-drop-area");
      if (dropArea && !e.target.closest("#pi_pdf_file")) {
        e.preventDefault();
        const fileInp = $("#pi_pdf_file");
        if (fileInp) fileInp.click();
        return;
      }
    }
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && document.body.dataset.view === "home") {
      e.preventDefault();
      $("#home-search").focus();
    }
    if (e.key === "Escape" && document.body.dataset.view !== "home") goTo("home");
  });

  /* ---------- Inicialização ---------- */
  SERVICOS.forEach(preencherNumeros);
  preencherResponsavel();

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

    const webhookUrl = (window.TRIBUNAL_CONFIG && window.TRIBUNAL_CONFIG.webhookAvisos) ||
                       (window.CONFIG && window.CONFIG.webhookAvisos) ||
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

  /* ==========================================================
     GUIA JURÍDICO & DÚVIDAS FREQUENTES (ADVOGADOS & ESTAGIÁRIOS)
     Diferenças entre Ações Cíveis, Habeas Corpus, Mandados, etc.
     ========================================================== */
  function initGuiaModal() {
    const modalGuia = $("#modal-guia");
    const guiaTabs = $("#guia-tabs");
    const guiaBody = $("#guia-body");
    const searchInput = $("#guia-search-input");
    const btnGuiaTopbar = $("#btn-guia-geral");
    const btnGuiaHome = $("#btn-guia-home");
    if (!modalGuia || !guiaTabs || !guiaBody) return;

    let activeServiceId = SERVICOS[0].id;

    function renderTabs() {
      guiaTabs.innerHTML = SERVICOS.map((s) => `
        <button type="button" class="guia-tab-btn ${s.id === activeServiceId ? "active" : ""}" data-guia-tab="${s.id}" role="tab" aria-selected="${s.id === activeServiceId}">
          <span class="guia-tab-ico">${s.emoji}</span>
          <span class="guia-tab-title">${s.title}</span>
          <span class="guia-tab-star">*</span>
        </button>
      `).join("");
    }

    function renderServiceGuia(sid, query = "") {
      const svc = SERVICOS.find((s) => s.id === sid) || SERVICOS[0];
      activeServiceId = svc.id;
      renderTabs();

      const g = svc.guia;
      if (!g) {
        guiaBody.innerHTML = `<p class="empty">Guia não configurado para este serviço.</p>`;
        return;
      }

      const q = (query || "").trim().toLowerCase();

      // Filtra as diferenças pelo termo de busca
      const diferencasFiltradas = g.diferencas ? g.diferencas.filter((d) => {
        if (!q) return true;
        return (
          d.nome.toLowerCase().includes(q) ||
          d.desc.toLowerCase().includes(q) ||
          (d.quando && d.quando.toLowerCase().includes(q)) ||
          (d.exemplo && d.exemplo.toLowerCase().includes(q)) ||
          (d.resultado && d.resultado.toLowerCase().includes(q)) ||
          (d.tag && d.tag.toLowerCase().includes(q))
        );
      }) : [];

      // Sugestões em outros serviços
      let outrasSugestoes = [];
      if (q) {
        SERVICOS.forEach((outro) => {
          if (outro.id !== svc.id && outro.guia && outro.guia.diferencas) {
            const hasMatch = outro.guia.diferencas.some((d) =>
              d.nome.toLowerCase().includes(q) ||
              d.desc.toLowerCase().includes(q) ||
              (d.exemplo && d.exemplo.toLowerCase().includes(q)) ||
              (d.quando && d.quando.toLowerCase().includes(q))
            );
            if (hasMatch) outrasSugestoes.push(outro);
          }
        });
      }

      guiaBody.innerHTML = `
        <article class="guia-article">
          <!-- Cabeçalho do Serviço no Guia -->
          <header class="guia-head-card">
            <div class="guia-head-left">
              <span class="guia-head-icon">${ICONS[svc.svg]}</span>
              <div>
                <div class="guia-head-meta">
                  <span class="trib-hero-tag">${svc.emoji} ${svc.tag}</span>
                  <span class="guia-focus-badge"><span class="star-badge">*</span> ${g.destaque}</span>
                </div>
                <h3>${svc.title}</h3>
                <p class="guia-desc-lead">${g.resumo}</p>
              </div>
            </div>
            <button type="button" class="btn-outline btn-ir-servico" data-goto-svc="${svc.id}" title="Ir para o formulário deste serviço">
              <span>Acessar Serviço</span>
              ${ICONS.seta}
            </button>
          </header>

          ${outrasSugestoes.length > 0 ? `
            <div class="guia-search-cross-alert">
              <span>💡 O termo <strong>"${q}"</strong> também foi encontrado em:</span>
              <div class="guia-cross-links">
                ${outrasSugestoes.map((o) => `
                  <button type="button" class="btn-cross-svc" data-guia-tab="${o.id}">
                    ${o.emoji} ${o.title}
                  </button>
                `).join("")}
              </div>
            </div>
          ` : ""}

          <!-- Quando utilizar -->
          <div class="guia-section-box">
            <h4 class="guia-sec-title">
              <span class="guia-sec-ico">⚖️</span>
              Quando utilizar este ato judicial no RP?
            </h4>
            <div class="guia-quando-card">
              <p>${g.quandoUsar}</p>
            </div>
          </div>

          <!-- Diferenças Fundamentais -->
          <div class="guia-section-box">
            <div class="guia-sec-header">
              <h4 class="guia-sec-title">
                <span class="star-badge" style="font-size:16px;">*</span>
                Diferença Prática entre as Opções &amp; Tipos
              </h4>
              <span class="guia-sec-count">${diferencasFiltradas.length} opções listadas</span>
            </div>
            <p class="muted" style="margin-bottom:14px; font-size:13px;">
              Tire suas dúvidas para escolher a opção correta e fundamentar sua petição perante o Juiz:
            </p>

            ${diferencasFiltradas.length === 0 ? `
              <p class="empty">Nenhuma opção coincide com o filtro "${query}".</p>
            ` : `
              <div class="guia-diferencas-grid">
                ${diferencasFiltradas.map((d) => `
                  <div class="guia-dif-card dif-${d.cor || "blue"}">
                    <div class="dif-head">
                      <div class="dif-title-wrap">
                        <span class="dif-star">*</span>
                        <h5 class="dif-name">${d.nome}</h5>
                      </div>
                      ${d.tag ? `<span class="dif-badge">${d.tag}</span>` : ""}
                    </div>

                    <p class="dif-desc">${d.desc}</p>

                    ${d.quando ? `
                      <div class="dif-item">
                        <span class="dif-lbl">🎯 Quando escolher:</span>
                        <span class="dif-txt">${d.quando}</span>
                      </div>
                    ` : ""}

                    ${d.exemplo ? `
                      <div class="dif-item dif-exemplo">
                        <span class="dif-lbl">📌 Exemplo no RP:</span>
                        <span class="dif-txt">"${d.exemplo}"</span>
                      </div>
                    ` : ""}

                    ${d.resultado ? `
                      <div class="dif-item dif-resultado">
                        <span class="dif-lbl">⚖️ Consequência / Eficácia:</span>
                        <span class="dif-txt">${d.resultado}</span>
                      </div>
                    ` : ""}
                  </div>
                `).join("")}
              </div>
            `}
          </div>

          <!-- Dicas para o Estagiário e Advogado -->
          ${g.dicasEstagiario && g.dicasEstagiario.length > 0 ? `
            <div class="guia-section-box guia-dicas-box">
              <h4 class="guia-sec-title">
                <span class="guia-sec-ico">🎓</span>
                Dicas de Ouro para o Advogado &amp; Estagiário
              </h4>
              <ul class="guia-dicas-list">
                ${g.dicasEstagiario.map((dica) => `
                  <li>
                    <span class="dica-bullet">✓</span>
                    <span>${dica}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          ` : ""}

          <!-- Base Legal -->
          ${g.baseLegal ? `
            <div class="guia-legal-footer">
              <span class="guia-legal-icon">📚</span>
              <div style="flex: 1;">
                <strong>Amparo Legal &amp; Procedimentos:</strong>
                <span>${g.baseLegal}</span>
              </div>
              <a href="Codigo_Civil_Brava_SDJ_2026_VERIFICADO.pdf" target="_blank" download="Codigo_Civil_Brava_SDJ_2026.pdf" class="btn-outline btn-cc-inline" title="Consultar ou Baixar o Código Civil Oficial de Brava (106 Artigos)">
                <span>📖 Código Civil (PDF)</span>
              </a>
            </div>
          ` : ""}
        </article>
      `;

      guiaBody.scrollTop = 0;
    }

    function abrirModal(sid) {
      modalGuia.classList.add("open");
      modalGuia.setAttribute("aria-hidden", "false");
      if (searchInput) searchInput.value = "";
      renderServiceGuia(sid || activeServiceId);
      setTimeout(() => {
        const activeTab = $(`[data-guia-tab="${sid || activeServiceId}"]`, guiaTabs);
        if (activeTab) activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }, 50);
    }

    function fecharModal() {
      modalGuia.classList.remove("open");
      modalGuia.setAttribute("aria-hidden", "true");
    }

    if (btnGuiaTopbar) {
      btnGuiaTopbar.addEventListener("click", () => {
        const curTab = document.body.dataset.view;
        const curSvcId = curTab && curTab.startsWith("tab-") ? curTab.replace("tab-", "") : "peticao";
        abrirModal(curSvcId);
      });
    }

    if (btnGuiaHome) {
      btnGuiaHome.addEventListener("click", () => abrirModal("peticao"));
    }

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-guia-open]");
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const sid = btn.dataset.guiaOpen;
        abrirModal(sid);
        return;
      }

      const tabBtn = e.target.closest("[data-guia-tab]");
      if (tabBtn) {
        e.preventDefault();
        const sid = tabBtn.dataset.guiaTab;
        renderServiceGuia(sid, searchInput ? searchInput.value : "");
        return;
      }

      const gotoBtn = e.target.closest("[data-goto-svc]");
      if (gotoBtn) {
        e.preventDefault();
        const sid = gotoBtn.dataset.gotoSvc;
        const svc = SERVICOS.find((s) => s.id === sid);
        fecharModal();
        if (svc) goTo(`tab-${svc.id}`, svc.title);
        return;
      }

      if (e.target.closest("[data-close]") && e.target.closest("#modal-guia")) {
        fecharModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalGuia.classList.contains("open")) {
        fecharModal();
      }
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        renderServiceGuia(activeServiceId, e.target.value);
      });
    }

    // Clique nas estrelinhas de opção nas telas dos serviços
    document.addEventListener("click", (e) => {
      const optStar = e.target.closest(".opt-doubt-star");
      if (optStar) {
        e.preventDefault();
        e.stopPropagation();
        const info = optStar.getAttribute("title");
        if (info) toast(`* ${info}`);
      }
    });
  }

  /* ==========================================================
     CONSULTA INTERATIVA DO CÓDIGO CIVIL DE BRAVA RP
     ========================================================== */
  function initCodigoCivilModal() {
    const modalCC = $("#modal-codigo-civil");
    if (!modalCC || typeof CODIGO_CIVIL_BRAVA === "undefined") return;

    const CC = CODIGO_CIVIL_BRAVA;
    const ccBody = $("#cc-body");
    const ccTabs = $("#cc-tabs");
    const ccSearch = $("#cc-search-input");
    const ccCounter = $("#cc-search-counter");
    const btnCC = $("#btn-codigo-civil");

    let activeLivroId = "all";
    let targetInsertFieldId = null;

    // Calcula total de artigos
    const totalArtigos = CC.livros.reduce((acc, l) => acc + l.artigos.length, 0);

    // Renderiza abas dos Livros
    const tabsHtml = [
      `<button type="button" class="cc-tab-btn active" data-cc-livro="all">Todos (${totalArtigos})</button>`,
      ...CC.livros.map((l) => `<button type="button" class="cc-tab-btn" data-cc-livro="${l.id}">${l.numero} (${l.artigos.length})</button>`),
      `<button type="button" class="cc-tab-btn" data-cc-livro="anexos">Anexos I a III</button>`
    ].join("");
    ccTabs.innerHTML = tabsHtml;

    function normalizarBusca(str) {
      return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    }

    function renderArticles(filterText = "", livroId = activeLivroId) {
      const q = normalizarBusca(filterText);
      let matchedCount = 0;
      let html = "";

      // Se estiver em 'all' ou 'livro-1' sem pesquisa, exibe o Preâmbulo oficial
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

      // Renderiza livros e artigos
      CC.livros.forEach((l) => {
        if (livroId !== "all" && livroId !== l.id) return;

        const filteredArtigos = l.artigos.filter((a) => {
          if (!q) return true;
          const searchHaystack = normalizarBusca(`${a.rotulo} ${a.num} ${a.epigrafe} ${a.texto} ${l.titulo}`);
          // Trata busca como "art 66" ou "art. 66" ou "66"
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
                        <button type="button" class="btn-outline btn-art-action btn-copy-art" data-art-citation="${citationCurta}" title="Copiar citação para a petição">
                          <span>📋 Copiar Artigo</span>
                        </button>
                        ${targetInsertFieldId ? `
                          <button type="button" class="btn-primary btn-art-action btn-insert-art" data-art-text="${a.rotulo} do Código Civil de Brava (${a.epigrafe})" title="Inserir diretamente no campo selecionado">
                            <span>⚡ Inserir no Campo</span>
                          </button>
                        ` : `
                          <button type="button" class="btn-outline btn-art-action btn-copy-integra" data-art-full='${citationCompleta}' title="Copiar texto integral com aspas">
                            <span>📜 Copiar Íntegra</span>
                          </button>
                        `}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }
      });

      // Renderiza Anexos quando selecionado ou em 'all' sem busca restrita
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
              <!-- Anexo I: Tabela de Competências -->
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

              <!-- Anexo II: Procedimento Padrão -->
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

              <!-- Anexo III: Modelo de Petição Civil -->
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
        ccCounter.textContent = q ? `${matchedCount} encontrados` : `${totalArtigos} artigos`;
        ccCounter.classList.toggle("is-filtering", !!q);
      }
    }

    function abrirModal(targetFieldId = null, initialQuery = "") {
      targetInsertFieldId = targetFieldId;
      modalCC.classList.add("open");
      modalCC.setAttribute("aria-hidden", "false");
      if (ccSearch) {
        ccSearch.value = initialQuery || "";
      }
      activeLivroId = "all";
      $$(".cc-tab-btn", ccTabs).forEach((b) => b.classList.toggle("active", b.dataset.ccLivro === "all"));
      renderArticles(initialQuery, "all");
      if (ccSearch) setTimeout(() => ccSearch.focus(), 80);
    }

    function fecharModal() {
      modalCC.classList.remove("open");
      modalCC.setAttribute("aria-hidden", "true");
      targetInsertFieldId = null;
    }

    if (btnCC) {
      btnCC.addEventListener("click", (e) => {
        e.preventDefault();
        abrirModal();
      });
    }

    // Clique em tabs de Livros
    ccTabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cc-livro]");
      if (!btn) return;
      $$(".cc-tab-btn", ccTabs).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeLivroId = btn.dataset.ccLivro;
      renderArticles(ccSearch ? ccSearch.value : "", activeLivroId);
    });

    // Busca ao digitar
    if (ccSearch) {
      ccSearch.addEventListener("input", (e) => {
        renderArticles(e.target.value, activeLivroId);
      });
    }

    // Ações dos artigos (Copiar / Inserir)
    document.addEventListener("click", (e) => {
      // Abrir modal do CC via qualquer botão com data-open-cc
      const openBtn = e.target.closest("[data-open-cc]");
      if (openBtn) {
        e.preventDefault();
        const initialQ = openBtn.dataset.openCc || "";
        abrirModal(null, initialQ);
        return;
      }

      // Abrir modal a partir de um campo de formulário
      const openFieldBtn = e.target.closest("[data-open-cc-field]");
      if (openFieldBtn) {
        e.preventDefault();
        const fieldId = openFieldBtn.dataset.openCcField;
        abrirModal(fieldId);
        return;
      }

      // Botão Copiar Citação Curta
      const copyBtn = e.target.closest(".btn-copy-art");
      if (copyBtn) {
        e.preventDefault();
        const cit = copyBtn.dataset.artCitation;
        navigator.clipboard.writeText(cit).then(() => {
          toast(`✓ ${cit} copiado!`);
        });
        return;
      }

      // Botão Copiar Íntegra
      const copyFullBtn = e.target.closest(".btn-copy-integra");
      if (copyFullBtn) {
        e.preventDefault();
        const full = copyFullBtn.dataset.artFull;
        navigator.clipboard.writeText(full).then(() => {
          toast(`✓ Texto integral copiado!`);
        });
        return;
      }

      // Botão Copiar Modelo do Anexo III
      const copyModeloBtn = e.target.closest(".btn-copy-modelo-anexo");
      if (copyModeloBtn) {
        e.preventDefault();
        const text = decodeURIComponent(copyModeloBtn.dataset.modeloText || "");
        navigator.clipboard.writeText(text).then(() => {
          toast(`✓ Modelo do Anexo III copiado!`);
        });
        return;
      }

      // Botão Inserir no Campo Ativo
      const insertBtn = e.target.closest(".btn-insert-art");
      if (insertBtn) {
        e.preventDefault();
        const textToInsert = insertBtn.dataset.artText;
        if (targetInsertFieldId) {
          const targetInput = document.getElementById(targetInsertFieldId);
          if (targetInput) {
            const currentVal = targetInput.value.trim();
            targetInput.value = currentVal ? `${currentVal}, ${textToInsert}` : textToInsert;
            targetInput.dispatchEvent(new Event("input", { bubbles: true }));
            toast(`✓ ${textToInsert} inserido no campo!`);
            fecharModal();
            targetInput.focus();
            return;
          }
        }
      }

      // Limpar pesquisa quando vazia
      if (e.target.closest(".btn-cc-reset-search")) {
        if (ccSearch) ccSearch.value = "";
        renderArticles("", activeLivroId);
        return;
      }

      // Fechar modal
      if (e.target.closest("[data-close]") && e.target.closest("#modal-codigo-civil")) {
        fecharModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalCC.classList.contains("open")) {
        fecharModal();
      }
    });

    window.openCodigoCivilModal = abrirModal;
    window.closeCodigoCivilModal = fecharModal;
  }

  /* ==========================================================
     CONSULTA DO CÓDIGO PENAL NO TRIBUNAL
     ========================================================== */
  function initCodigoPenalModal() {
    const modalCP = $("#modal-codigo");
    const btnCP = $("#btn-codigo-penal");
    if (!modalCP || typeof CODIGO_PENAL === "undefined") return;

    const INAF = '<span class="tag-inaf">Inafiançável</span>';
    const fmtMoney = (v) => "$" + Math.round(v).toLocaleString("pt-BR");
    const matches = (q, cod, nome) => !q || nome.toLowerCase().includes(q) || cod.startsWith(q);

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
      const tabEl = $("#codigo-tabela", modalCP);
      if (tabEl) tabEl.innerHTML = html || '<p class="empty">Nenhum artigo penal encontrado.</p>';
    }

    const rulesEl = $("#rules", modalCP);
    if (rulesEl && typeof CONFIG !== "undefined" && CONFIG.regras) {
      rulesEl.innerHTML = CONFIG.regras
        .map(([t, d]) => `<div class="rule"><b>${t}</b><p>${d}</p></div>`)
        .join("");
    }

    const pdfUrl = typeof CONFIG !== "undefined" && CONFIG.pdf ? encodeURI(CONFIG.pdf) : "BRAVA_Codigo_Penal_Juridico_2026_FINAL.pdf";
    const pdfOpen = $("#pdf-open", modalCP);
    const pdfDl = $("#pdf-download", modalCP);
    if (pdfOpen) pdfOpen.href = pdfUrl;
    if (pdfDl) pdfDl.href = pdfUrl;

    function openModalCP() {
      const searchInput = $("#codigo-search", modalCP);
      renderCodigo(searchInput ? searchInput.value : "");
      modalCP.classList.add("open");
      modalCP.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (searchInput) setTimeout(() => searchInput.focus(), 80);
    }

    function closeModalCP() {
      modalCP.classList.remove("open");
      modalCP.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (btnCP) {
      btnCP.addEventListener("click", (e) => {
        e.preventDefault();
        openModalCP();
      });
    }

    modalCP.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) closeModalCP();
    });

    const searchInput = $("#codigo-search", modalCP);
    if (searchInput) {
      searchInput.addEventListener("input", (e) => renderCodigo(e.target.value));
    }

    $$(".tab", modalCP).forEach((t) =>
      t.addEventListener("click", () => {
        $$(".tab", modalCP).forEach((x) => x.classList.toggle("on", x === t));
        const tab = t.dataset.tab;
        $("#pane-tabela", modalCP).classList.toggle("hidden", tab !== "tabela");
        $("#pane-pdf", modalCP).classList.toggle("hidden", tab !== "pdf");
        const frame = $("#pdf-frame", modalCP);
        if (tab === "pdf" && frame && !frame.src) frame.src = pdfUrl;
      })
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalCP.classList.contains("open")) {
        closeModalCP();
      }
    });

    window.openCodigoPenalModal = openModalCP;
    window.closeCodigoPenalModal = closeModalCP;
  }

  // Alternador entre Código Civil e Código Penal nos Modais
  document.addEventListener("click", (e) => {
    const switchBtn = e.target.closest(".btn-alternar-codigos");
    if (switchBtn) {
      e.preventDefault();
      const target = switchBtn.dataset.switchTo;
      const modalCP = $("#modal-codigo");
      const modalCC = $("#modal-codigo-civil");
      if (target === "penal") {
        if (modalCC) {
          modalCC.classList.remove("open");
          modalCC.setAttribute("aria-hidden", "true");
        }
        if (window.openCodigoPenalModal) window.openCodigoPenalModal();
      } else if (target === "civil") {
        if (modalCP) {
          modalCP.classList.remove("open");
          modalCP.setAttribute("aria-hidden", "true");
        }
        if (window.openCodigoCivilModal) window.openCodigoCivilModal();
      }
      return;
    }
  });

  initAvisosModal();
  initGuiaModal();
  initCodigoCivilModal();
  initCodigoPenalModal();
})();

