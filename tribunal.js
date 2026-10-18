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

  function renderField(f) {
    const label = `${f.label}${reqMark(f)}`;
    const ph = f.placeholder || "Preencha...";
    switch (f.type) {
      case "options":
        return `
          <div class="full">
            <span class="trib-opt-label">${label}</span>
            <div class="opt-grid" role="radiogroup" aria-label="${f.label}">
              ${f.options.map((o, i) => `
                <button type="button" class="opt-card ${i === 0 ? "active" : ""}" data-input="${f.id}" data-val="${o}" role="radio" aria-checked="${i === 0}">
                  <span class="radio"></span>${o}
                </button>`).join("")}
            </div>
            <input type="hidden" id="${f.id}" value="${f.options[0]}" data-default="${f.options[0]}" />
          </div>`;
      case "textarea":
        return `
          <label class="full">${label}
            <textarea id="${f.id}" rows="4" class="trib-textarea" placeholder="${ph}"></textarea>
          </label>`;
      case "date":
      case "time":
        return `
          <label class="${f.isFull ? "full" : ""}">${label}
            <input id="${f.id}" type="${f.type}" class="trib-datetime" />
          </label>`;
      case "numero":
        return `
          <label class="${f.isFull ? "full" : ""}">${label}
            <span class="input-with-btn">
              <input id="${f.id}" type="text" data-prefixo="${f.prefixo}" />
              <button type="button" class="btn-outline btn-gerar-num" data-input="${f.id}" title="Gerar novo número">${ICONS.dado}</button>
            </span>
          </label>`;
      default:
        return `
          <label class="${f.isFull ? "full" : ""}">${label}
            <input id="${f.id}" type="text" placeholder="${ph}" value="${f.value || ""}" data-default="${f.value || ""}" />
          </label>`;
    }
  }

  function renderService(svc) {
    const cargos = CFG.cargos.map((c) => `<option ${c === svc.cargoPadrao ? "selected" : ""}>${c}</option>`).join("");
    return `
      <div id="tab-${svc.id}" class="tab-content">
        <div class="service-wrap">
          <header class="service-hero">
            <span class="card-icon">${ICONS[svc.svg]}</span>
            <div>
              <span class="trib-hero-tag">${svc.emoji} ${svc.tag}</span>
              <h2>${svc.title}</h2>
              <p>${svc.desc}</p>
            </div>
          </header>
          <section class="panel form-panel">
            <div class="form-body">
              <div class="form-section">Dados do ato</div>
              <div class="form-grid fields">${svc.fields.map(renderField).join("")}</div>

              <div class="form-section">Responsável pelo ato</div>
              <div class="form-grid fields">
                <label>Nome<input id="${svc.id}_resp" class="trib-resp-nome" type="text" placeholder="Ex.: Dr. Zaith Frost" /></label>
                <label>Passaporte<input id="${svc.id}_resp_id" class="trib-resp-id" type="text" placeholder="Ex.: 1234" /></label>
                <label class="full">Cargo
                  <select id="${svc.id}_resp_cargo" class="trib-select">${cargos}</select>
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
                <span class="card-tag">${s.tag}</span>
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

  /* ---------- Busca na home ---------- */
  $("#home-search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    let total = 0;
    $$(".trib-group").forEach((grp) => {
      let n = 0;
      $$(".nav-card", grp).forEach((card) => {
        const show = !q || card.textContent.toLowerCase().includes(q);
        card.classList.toggle("hidden", !show);
        n += show;
      });
      grp.classList.toggle("hidden", n === 0);
      total += n;
    });
    $("#home-empty").classList.toggle("hidden", total > 0);
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

  /* ---------- Responsável: preenche e sincroniza ---------- */
  function preencherResponsavel() {
    const r = getResp();
    $$(".trib-resp-nome").forEach((i) => (i.value = r.nome || ""));
    $$(".trib-resp-id").forEach((i) => (i.value = r.id || ""));
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

  function validar(svc, campos, resp) {
    $$(`#tab-${svc.id} .trib-invalid`).forEach((e) => e.classList.remove("trib-invalid"));
    const faltando = campos.filter((c) => c.req && !c.value);
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
  }

  /* ---------- Ações dos botões ---------- */
  const findSvc = (sid) => SERVICOS.find((s) => s.id === sid);

  $$(".btn-reset").forEach((b) => b.addEventListener("click", () => resetService(findSvc(b.dataset.sid))));

  $$(".btn-pdf").forEach((b) =>
    b.addEventListener("click", async () => {
      const svc = findSvc(b.dataset.sid);
      const { campos, resp } = lerServico(svc);
      if (!validar(svc, campos, resp)) return;
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

      let pdf = null;
      try { pdf = await gerarPDF(svc, campos, resp); } catch (err) { console.warn("Falha ao gerar PDF:", err); }
      sendWebhook(b, svc.webhook, montarEmbed(svc, campos, resp), () => resetService(svc), pdf);
    })
  );

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

  initAvisosModal();
})();
