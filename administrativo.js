/* ==========================================================
   PAINEL ADMINISTRATIVO — DEPARTAMENTO JURÍDICO BRAVA RP
   Lógica da página administrativo.html
   Proteção por Senha PIN Geral e Gestão dos 4 Canais:
   - ❌・exonerações
   - ⛔・desligamentos
   - 🚫・blacklist
   - ❗️・advertências
   ========================================================== */

(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => root.querySelectorAll(s);

  /* ==========================================================
     STORAGE KEYS & CONSTANTES
     ========================================================== */
  const STORAGE_AUTH_KEY = "sjd_admin_unlocked";
  const STORAGE_PIN_KEY = "sjd_admin_pin";
  const STORAGE_HISTORY_KEY = "sjd_admin_history";
  const STORAGE_BLACKLIST_KEY = "sjd_admin_blacklist";
  const STORAGE_WEBHOOKS_KEY = "sjd_admin_webhooks";

  const DEFAULT_PIN = "2026";
  const ALIAS_PINS = ["2026", "1234", "0000"];

  const DEFAULT_WEBHOOK_GERAL =
    "https://discord.com/api/webhooks/1562889902876532810/Id3efdQB4It9FXoNsUUFAAnRe8lGUx5jCn7r_o2Pbd95nWn_j4QLRC91PdFURe5-pII_";

  // Webhooks oficiais dos canais do Administrativo
  const DEFAULT_WEBHOOKS = {
    geral: "https://discord.com/api/webhooks/1562889902876532810/Id3efdQB4It9FXoNsUUFAAnRe8lGUx5jCn7r_o2Pbd95nWn_j4QLRC91PdFURe5-pII_",
    exoneracoes: "https://discord.com/api/webhooks/1562889902876532810/Id3efdQB4It9FXoNsUUFAAnRe8lGUx5jCn7r_o2Pbd95nWn_j4QLRC91PdFURe5-pII_",
    desligamentos: "https://discord.com/api/webhooks/1562891114594443294/mo6LAuPuZ9rbRZVfrjPUwEY1PljvoQ9gDUw02cqr_-TNb0C-wkh7uRY5lOQbpxilnKRt",
    blacklist: "https://discord.com/api/webhooks/1562891598126256168/kyeNsx4BwCT3OXu04mmX2gwqGhamPLfmaX-R85n1dOPJ7KsCOKBho2CaYngRTjJbwxQP",
    advertencias: "https://discord.com/api/webhooks/1562891800606285926/ifW_Z1pAHRFd4sDHvortGo2iQd466YXq2mZmrOq2BxEtb_c9Wls93rgFYTiKMhbWZMkQ",
  };

  /* ---------- Funções de Storage Auxiliares ---------- */
  function getAdminPin() {
    return localStorage.getItem(STORAGE_PIN_KEY) || DEFAULT_PIN;
  }

  function setAdminPin(newPin) {
    localStorage.setItem(STORAGE_PIN_KEY, String(newPin).trim());
  }

  function getWebhooks() {
    try {
      const saved = localStorage.getItem(STORAGE_WEBHOOKS_KEY);
      return saved ? { ...DEFAULT_WEBHOOKS, ...JSON.parse(saved) } : { ...DEFAULT_WEBHOOKS };
    } catch {
      return { ...DEFAULT_WEBHOOKS };
    }
  }

  function saveWebhooks(whObj) {
    localStorage.setItem(STORAGE_WEBHOOKS_KEY, JSON.stringify(whObj));
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  }

  function addHistoryItem(item) {
    const list = getHistory();
    list.unshift({
      ...item,
      id: "ACT-" + Date.now().toString(36).toUpperCase(),
      timestamp: new Date().toISOString(),
      dataLegivel: new Date().toLocaleString("pt-BR"),
    });
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(list.slice(0, 100)));
    renderHistory();
    updateStats();
  }

  /* ---------- Blacklist Inicial (Dados Realistas Iniciais) ---------- */
  function getBlacklist() {
    try {
      const saved = localStorage.getItem(STORAGE_BLACKLIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}

    // Exemplos iniciais realistas caso esteja vazio
    const initial = [
      {
        idRegistro: "BLK-001",
        nome: "Marcos Falcão",
        id: "1042",
        cargoAnterior: "Advogado Júnior",
        periodo: "Permanente",
        motivo: "Tentativa comprovada de suborno a magistrado, quebra de sigilo profissional e falsificação de certidão notarial.",
        provas: "Processo Ético Disciplinar Nº 04/2026 • Gravações e Logs de Transação",
        autoridadeNome: "Zaith Frost",
        autoridadeCargo: "Presidente do SDJ",
        data: "14/10/2026",
        status: "Ativa",
      },
      {
        idRegistro: "BLK-002",
        nome: "Carlos Albuquerque",
        id: "883",
        cargoAnterior: "Estagiário",
        periodo: "Temporária (90 dias)",
        motivo: "Conduta manifestamente incompatível com a advocacia pública, vazamento de minutas e desacato verbal a superiores hierárquicos.",
        provas: "Ocorrência Interna SDJ-12/2026 • Termo Circunstanciado",
        autoridadeNome: "Mike Santaroni",
        autoridadeCargo: "Vice-Presidente do SDJ",
        data: "18/10/2026",
        status: "Ativa",
      },
    ];
    localStorage.setItem(STORAGE_BLACKLIST_KEY, JSON.stringify(initial));
    return initial;
  }

  function saveBlacklist(list) {
    localStorage.setItem(STORAGE_BLACKLIST_KEY, JSON.stringify(list));
    renderBlacklistTable();
    updateStats();
  }

  /* ---------- Toast de Notificação ---------- */
  let toastTimer;
  function toast(msg, isError = false) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.toggle("error", isError);
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  async function copyText(txt) {
    try {
      await navigator.clipboard.writeText(txt);
      toast("✓ Relatório copiado para a área de transferência!");
    } catch {
      toast("Erro ao copiar para a área de transferência", true);
    }
  }

  /* ---------- Envio Webhook Discord com PDF Anexo ---------- */
  async function sendWebhook(btn, channelKey, payload, onSuccess, fileAttachment) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span>Enviando documento...</span>`;
    btn.disabled = true;

    const webhooks = getWebhooks();
    const webhookUrl = webhooks[channelKey] || webhooks.geral || DEFAULT_WEBHOOK_GERAL;

    try {
      let body;
      let headers = {};
      const fileList = Array.isArray(fileAttachment)
        ? fileAttachment.filter(Boolean)
        : fileAttachment && fileAttachment.blob
        ? [fileAttachment]
        : [];

      if (fileList.length > 0) {
        const formData = new FormData();
        const pl = typeof payload === "string" ? { content: payload } : payload;
        formData.append("payload_json", JSON.stringify(pl));
        fileList.forEach((f, idx) => {
          formData.append(`files[${idx}]`, f.blob || f, f.filename || f.name || `documento_${idx}.pdf`);
        });
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(typeof payload === "string" ? { content: payload } : payload);
      }

      const res = await fetch(webhookUrl, { method: "POST", headers, body });
      if (!res.ok) {
        let errDetail = "";
        try {
          const errJson = await res.json();
          errDetail = errJson.message ? `: ${errJson.message}` : "";
        } catch (_) {}
        throw new Error(`Código ${res.status}${errDetail}`);
      }

      btn.classList.add("success");
      btn.innerHTML = `<span>✓ Publicado com PDF!</span>`;
      toast("✓ Documento oficial e PDF enviados para o Discord com sucesso!");
      onSuccess && onSuccess();
    } catch (err) {
      toast("Erro ao enviar para o Discord: " + err.message, true);
    } finally {
      setTimeout(() => {
        btn.classList.remove("success");
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 2500);
    }
  }

  /* ==========================================================
     GERENCIADOR DE SENHA PIN & LOCKSCREEN
     ========================================================== */
  let enteredPin = "";
  const lockscreenCard = $("#admin-lockscreen-card");
  const lockscreenView = $("#admin-lockscreen");
  const adminPanel = $("#admin-panel");
  const pinStatus = $("#admin-pin-status");
  const btnBloquear = $("#btn-bloquear");
  const btnTrocarPin = $("#btn-trocar-pin");
  const btnWebhooks = $("#btn-webhooks");
  const sessionBadge = $("#admin-session-badge");

  function updatePinDisplay() {
    const dots = $$(".admin-pin-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("filled", idx < enteredPin.length);
    });
  }

  function handleDigit(digit) {
    if (enteredPin.length < 4) {
      enteredPin += digit;
      updatePinDisplay();
      if (enteredPin.length === 4) {
        setTimeout(verifyPin, 120);
      }
    }
  }

  function handleBackspace() {
    if (enteredPin.length > 0) {
      enteredPin = enteredPin.slice(0, -1);
      updatePinDisplay();
      pinStatus.textContent = "Digite a senha PIN de 4 dígitos";
      pinStatus.className = "pin-status-msg";
    }
  }

  function verifyPin() {
    const currentPin = getAdminPin();
    const isCorrect = enteredPin === currentPin || (!localStorage.getItem(STORAGE_PIN_KEY) && ALIAS_PINS.includes(enteredPin));

    if (isCorrect) {
      pinStatus.textContent = "✓ Acesso Autorizado · Diretoria Administrativa";
      pinStatus.className = "pin-status-msg success";

      sessionStorage.setItem(STORAGE_AUTH_KEY, "true");

      setTimeout(() => {
        unlockAdmin();
        toast("✓ Bem-vindo(a) ao Painel Administrativo!");
      }, 250);
    } else {
      pinStatus.textContent = "❌ Senha PIN Incorreta. Tente novamente.";
      pinStatus.className = "pin-status-msg error";
      lockscreenCard.classList.add("shake");

      setTimeout(() => {
        lockscreenCard.classList.remove("shake");
        enteredPin = "";
        updatePinDisplay();
      }, 450);
    }
  }

  function unlockAdmin() {
    if (lockscreenView) lockscreenView.classList.add("hidden");
    if (adminPanel) adminPanel.classList.remove("hidden");
    if (btnBloquear) btnBloquear.classList.remove("hidden");
    if (btnTrocarPin) btnTrocarPin.classList.remove("hidden");
    if (btnWebhooks) btnWebhooks.classList.remove("hidden");
    if (sessionBadge) sessionBadge.classList.remove("hidden");

    enteredPin = "";
    updatePinDisplay();
    pinStatus.textContent = "Digite a senha PIN de 4 dígitos";
    pinStatus.className = "pin-status-msg";

    // Inicializa previews e dados
    initForms();
    renderBlacklistTable();
    renderHistory();
    updateStats();
  }

  function lockAdmin() {
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    if (lockscreenView) lockscreenView.classList.remove("hidden");
    if (adminPanel) adminPanel.classList.add("hidden");
    if (btnBloquear) btnBloquear.classList.add("hidden");
    if (btnTrocarPin) btnTrocarPin.classList.add("hidden");
    if (btnWebhooks) btnWebhooks.classList.add("hidden");
    if (sessionBadge) sessionBadge.classList.add("hidden");

    enteredPin = "";
    updatePinDisplay();
    pinStatus.textContent = "Digite a senha PIN de 4 dígitos";
    pinStatus.className = "pin-status-msg";
    toast("Sessão Administrativa Bloqueada.");
  }

  // Teclado virtual
  $$(".admin-pin-key[data-digit]").forEach((btn) => {
    btn.addEventListener("click", () => handleDigit(btn.dataset.digit));
  });

  const btnBackspace = $("#btn-admin-pin-backspace");
  if (btnBackspace) btnBackspace.addEventListener("click", handleBackspace);

  const btnConfirm = $("#btn-admin-pin-confirm");
  if (btnConfirm) btnConfirm.addEventListener("click", verifyPin);

  // Escuta teclado físico
  window.addEventListener("keydown", (e) => {
    if (sessionStorage.getItem(STORAGE_AUTH_KEY) === "true") return;
    if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
    else if (e.key === "Backspace") handleBackspace();
    else if (e.key === "Enter" && enteredPin.length === 4) verifyPin();
  });

  if (btnBloquear) btnBloquear.addEventListener("click", lockAdmin);

  /* ==========================================================
     NAVEGAÇÃO ENTRE CANAIS DISCORD
     ========================================================== */
  let activeChannel = "exoneracoes";

  function switchChannel(channelId) {
    activeChannel = channelId;

    // Atualiza botões da sidebar
    $$(".discord-channel-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.channel === channelId);
    });

    // Atualiza views
    $$(".admin-channel-view").forEach((view) => {
      view.classList.toggle("active", view.id === `view-${channelId}`);
    });

    // Seletor de canal na URL hash
    window.location.hash = channelId;
  }

  $$(".discord-channel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchChannel(btn.dataset.channel);
    });
  });

  /* ==========================================================
     GERADORES DE NÚMEROS DE PROTOCOLO E PORTARIAS
     ========================================================== */
  function gerarNumeroAto(prefixo) {
    const ano = new Date().getFullYear();
    const num = Math.floor(100 + Math.random() * 900);
    return `${prefixo} Nº ${num}/${ano}-SDJ`;
  }

  function getDataHojeFormatada() {
    return new Date().toLocaleDateString("pt-BR");
  }

  /* ==========================================================
     1. CANAL: ❌・EXONERAÇÕES
     ========================================================== */
  function initExoneracoes() {
    const numInput = $("#exo_numero");
    const dataInput = $("#exo_data");
    if (numInput && !numInput.value) numInput.value = gerarNumeroAto("PORTARIA-EXO");
    if (dataInput && !dataInput.value) dataInput.value = getDataHojeFormatada();

    updateExoPreview();

    // Eventos de digitação para live preview
    const formExo = $("#form-exoneracoes");
    if (formExo) {
      formExo.addEventListener("input", updateExoPreview);
      formExo.addEventListener("change", updateExoPreview);
    }

    // Regerar número
    const btnRegen = $("#btn-regen-num-exo");
    if (btnRegen) {
      btnRegen.addEventListener("click", () => {
        numInput.value = gerarNumeroAto("PORTARIA-EXO");
        updateExoPreview();
      });
    }

    // Gerar PDF
    const btnPdf = $("#btn-pdf-exo");
    if (btnPdf) {
      btnPdf.addEventListener("click", async () => {
        try {
          const dados = getExoFormData();
          const { doc, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "exoneracao",
            protocolo: dados.numero,
            dataAto: dados.data,
            dados,
          });
          doc.save(filename);
          toast("✓ Portaria de Exoneração gerada em PDF!");
          addHistoryItem({
            tipo: "Exoneração",
            icone: "❌",
            numero: dados.numero,
            alvo: `${dados.nome} (${dados.cargo})`,
            autoridade: dados.autoridadeNome,
            dados,
          });
        } catch (err) {
          toast("Erro ao gerar PDF: " + err.message, true);
        }
      });
    }

    // Enviar para Discord
    const btnDiscord = $("#btn-discord-exo");
    if (btnDiscord) {
      btnDiscord.addEventListener("click", async () => {
        const dados = getExoFormData();
        if (!dados.nome) {
          toast("Preencha o nome do servidor exonerado!", true);
          return;
        }

        try {
          const { blob, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "exoneracao",
            protocolo: dados.numero,
            dataAto: dados.data,
            dados,
          });

          const payload = {
            content: `❌ **[PORTARIA OFICIAL DE EXONERAÇÃO FUNCIONAL]** · \`${dados.numero}\`\n⚖️ *Termo homologado pela Diretoria Geral do Departamento Jurídico de Brava RP.*`,
            embeds: [
              {
                title: `❌ PORTARIA OFICIAL DE EXONERAÇÃO · ${dados.numero}`,
                description: `Determina-se a **exoneração oficial** do servidor do quadro funcional do Departamento Jurídico, com revogação imediata de credenciais e prerrogativas.`,
                color: 0xef4444, // Vermelho
                fields: [
                  { name: "👤 Servidor Exonerado", value: `**${dados.nome}** (ID: \`${dados.id}\`)`, inline: true },
                  { name: "💼 Cargo Anterior", value: `**${dados.cargo}**`, inline: true },
                  { name: "🏛️ Lotação / Setor", value: `**${dados.lotacao}**`, inline: true },
                  { name: "📑 Modalidade", value: `**${dados.tipoExoneracao}**`, inline: true },
                  { name: "📅 Data de Vigência", value: `**${dados.data}**`, inline: true },
                  { name: "✍️ Autoridade Subscritora", value: `**${dados.autoridadeNome}** (${dados.autoridadeCargo})`, inline: true },
                  { name: "📋 Motivação Administrativa", value: dados.motivo || "Conforme deliberação interna da Diretoria Geral." },
                  { name: "🔒 Determinações & Providências", value: dados.providencias },
                ],
                footer: { text: "Sistema do Departamento Jurídico • Brava RP • Canal Oficial de Exonerações" },
                timestamp: new Date().toISOString(),
              },
            ],
          };

          sendWebhook(
            btnDiscord,
            "exoneracoes",
            payload,
            () => {
              addHistoryItem({
                tipo: "Exoneração",
                icone: "❌",
                numero: dados.numero,
                alvo: `${dados.nome} (${dados.cargo})`,
                autoridade: dados.autoridadeNome,
                dados,
              });
            },
            { blob, filename }
          );
        } catch (err) {
          toast("Erro ao preparar documento: " + err.message, true);
        }
      });
    }

    // Copiar Texto Discord
    const btnCopy = $("#btn-copy-exo");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        const dados = getExoFormData();
        const texto = `❌ **[PORTARIA OFICIAL DE EXONERAÇÃO FUNCIONAL]**
**Número:** \`${dados.numero}\`
**Servidor Exonerado:** ${dados.nome} (ID: ${dados.id})
**Cargo Anterior:** ${dados.cargo}
**Lotação:** ${dados.lotacao}
**Modalidade:** ${dados.tipoExoneracao}
**Data de Vigência:** ${dados.data}

**Fundamentação Administrativa:**
> ${dados.motivo}

**Determinações:**
> ${dados.providencias}

*Subscrito por: ${dados.autoridadeNome} (${dados.autoridadeCargo})*`;
        copyText(texto);
      });
    }

    // Limpar
    const btnLimpar = $("#btn-limpar-exo");
    if (btnLimpar) {
      btnLimpar.addEventListener("click", () => {
        $("#exo_nome").value = "";
        $("#exo_id").value = "";
        $("#exo_motivo").value = "";
        numInput.value = gerarNumeroAto("PORTARIA-EXO");
        updateExoPreview();
        toast("Formulário de Exoneração reiniciado.");
      });
    }
  }

  function getExoFormData() {
    const checkedProvs = [];
    $$(".exo-chk:checked").forEach((chk) => checkedProvs.push(chk.value));
    const provsText = checkedProvs.length > 0 ? checkedProvs.join("\n• ") : "Cessação imediata das prerrogativas funcionais.";

    return {
      numero: $("#exo_numero")?.value || "PORTARIA-EXO Nº 001/2026-SDJ",
      data: $("#exo_data")?.value || getDataHojeFormatada(),
      nome: $("#exo_nome")?.value.trim() || "Nome do Servidor",
      id: $("#exo_id")?.value.trim() || "—",
      cargo: $("#exo_cargo")?.value || "Advogado Pleno",
      lotacao: $("#exo_lotacao")?.value || "Departamento Jurídico",
      tipoExoneracao: $("#exo_tipo")?.value || "A pedido do servidor",
      motivo: $("#exo_motivo")?.value.trim() || "Sem motivação complementar descrita.",
      providencias: "• " + provsText,
      autoridadeNome: $("#exo_autoridade_nome")?.value || "Zaith Frost",
      autoridadeCargo: $("#exo_autoridade_cargo")?.value || "Presidente do SDJ",
    };
  }

  function updateExoPreview() {
    const dados = getExoFormData();
    $("#prev_exo_num") && ($("#prev_exo_num").textContent = dados.numero);
    $("#prev_exo_data") && ($("#prev_exo_data").textContent = dados.data);
    $("#prev_exo_nome") && ($("#prev_exo_nome").textContent = dados.nome);
    $("#prev_exo_id") && ($("#prev_exo_id").textContent = dados.id);
    $("#prev_exo_cargo") && ($("#prev_exo_cargo").textContent = dados.cargo);
    $("#prev_exo_lotacao") && ($("#prev_exo_lotacao").textContent = dados.lotacao);
    $("#prev_exo_tipo") && ($("#prev_exo_tipo").textContent = dados.tipoExoneracao);
    $("#prev_exo_motivo") && ($("#prev_exo_motivo").textContent = dados.motivo);
    $("#prev_exo_providencias") && ($("#prev_exo_providencias").textContent = dados.providencias);
    $("#prev_exo_autoridade") && ($("#prev_exo_autoridade").textContent = dados.autoridadeNome.toUpperCase());
    $("#prev_exo_autoridade_cargo") && ($("#prev_exo_autoridade_cargo").textContent = dados.autoridadeCargo);
  }

  /* ==========================================================
     2. CANAL: ⛔・DESLIGAMENTOS
     ========================================================== */
  function initDesligamentos() {
    const numInput = $("#desl_numero");
    const dataInput = $("#desl_data");
    if (numInput && !numInput.value) numInput.value = gerarNumeroAto("TERMO-DESL");
    if (dataInput && !dataInput.value) dataInput.value = getDataHojeFormatada();

    updateDeslPreview();

    const formDesl = $("#form-desligamentos");
    if (formDesl) {
      formDesl.addEventListener("input", updateDeslPreview);
      formDesl.addEventListener("change", updateDeslPreview);
    }

    const btnRegen = $("#btn-regen-num-desl");
    if (btnRegen) {
      btnRegen.addEventListener("click", () => {
        numInput.value = gerarNumeroAto("TERMO-DESL");
        updateDeslPreview();
      });
    }

    // Gerar PDF
    const btnPdf = $("#btn-pdf-desl");
    if (btnPdf) {
      btnPdf.addEventListener("click", async () => {
        try {
          const dados = getDeslFormData();
          const { doc, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "desligamento",
            protocolo: dados.numero,
            dataAto: dados.data,
            dados,
          });
          doc.save(filename);
          toast("✓ Termo de Desligamento gerado em PDF!");
          addHistoryItem({
            tipo: "Desligamento",
            icone: "⛔",
            numero: dados.numero,
            alvo: `${dados.nome} (${dados.cargo})`,
            autoridade: dados.autoridadeNome,
            dados,
          });
        } catch (err) {
          toast("Erro ao gerar PDF: " + err.message, true);
        }
      });
    }

    // Enviar para Discord
    const btnDiscord = $("#btn-discord-desl");
    if (btnDiscord) {
      btnDiscord.addEventListener("click", async () => {
        const dados = getDeslFormData();
        if (!dados.nome) {
          toast("Preencha o nome do membro desligado!", true);
          return;
        }

        try {
          const { blob, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "desligamento",
            protocolo: dados.numero,
            dataAto: dados.data,
            dados,
          });

          const payload = {
            content: `⛔ **[TERMO DE RESCISÃO & DESLIGAMENTO INSTITUCIONAL]** · \`${dados.numero}\`\n⚖️ *Ato homologado pela Diretoria Geral do Departamento Jurídico de Brava RP.*`,
            embeds: [
              {
                title: `⛔ TERMO OFICIAL DE DESLIGAMENTO · ${dados.numero}`,
                description: `Formalização da rescisão definitiva de vínculo com o quadro institucional do SDJ.`,
                color: 0xf97316, // Laranja forte
                fields: [
                  { name: "👤 Colaborador Desligado", value: `**${dados.nome}** (ID: \`${dados.id}\`)`, inline: true },
                  { name: "💼 Função / Cargo", value: `**${dados.cargo}**`, inline: true },
                  { name: "⏳ Tempo de Atuação", value: `**${dados.tempoAtuacao}**`, inline: true },
                  { name: "📑 Categoria da Rescisão", value: `**${dados.motivoTipo}**`, inline: true },
                  { name: "📅 Data do Desligamento", value: `**${dados.data}**`, inline: true },
                  { name: "🔄 Cláusula de Retorno", value: `**${dados.clausulaRetorno}**`, inline: true },
                  { name: "📝 Relatório Circunstanciado", value: dados.relato || "Conforme deliberação administrativa." },
                  { name: "📂 Redistribuição de Casos / Processos", value: dados.processosInfo },
                ],
                footer: { text: "Sistema do Departamento Jurídico • Brava RP • Canal Oficial de Desligamentos" },
                timestamp: new Date().toISOString(),
              },
            ],
          };

          sendWebhook(
            btnDiscord,
            "desligamentos",
            payload,
            () => {
              addHistoryItem({
                tipo: "Desligamento",
                icone: "⛔",
                numero: dados.numero,
                alvo: `${dados.nome} (${dados.cargo})`,
                autoridade: dados.autoridadeNome,
                dados,
              });
            },
            { blob, filename }
          );
        } catch (err) {
          toast("Erro ao preparar envio: " + err.message, true);
        }
      });
    }

    // Copiar
    const btnCopy = $("#btn-copy-desl");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        const dados = getDeslFormData();
        const texto = `⛔ **[TERMO DE RESCISÃO & DESLIGAMENTO INSTITUCIONAL]**
**Número:** \`${dados.numero}\`
**Colaborador Desligado:** ${dados.nome} (ID: ${dados.id})
**Cargo:** ${dados.cargo}
**Tempo de Atuação:** ${dados.tempoAtuacao}
**Motivo:** ${dados.motivoTipo}
**Data:** ${dados.data}
**Cláusula de Retorno:** ${dados.clausulaRetorno}

**Relatório Circunstanciado:**
> ${dados.relato}

**Situação de Processos:**
> ${dados.processosInfo}

*Subscrito por: ${dados.autoridadeNome} (${dados.autoridadeCargo})*`;
        copyText(texto);
      });
    }

    // Limpar
    const btnLimpar = $("#btn-limpar-desl");
    if (btnLimpar) {
      btnLimpar.addEventListener("click", () => {
        $("#desl_nome").value = "";
        $("#desl_id").value = "";
        $("#desl_tempo").value = "";
        $("#desl_relato").value = "";
        numInput.value = gerarNumeroAto("TERMO-DESL");
        updateDeslPreview();
        toast("Formulário de Desligamento reiniciado.");
      });
    }
  }

  function getDeslFormData() {
    return {
      numero: $("#desl_numero")?.value || "TERMO-DESL Nº 001/2026-SDJ",
      data: $("#desl_data")?.value || getDataHojeFormatada(),
      nome: $("#desl_nome")?.value.trim() || "Nome do Colaborador",
      id: $("#desl_id")?.value.trim() || "—",
      cargo: $("#desl_cargo")?.value || "Estagiário",
      tempoAtuacao: $("#desl_tempo")?.value.trim() || "3 meses",
      motivoTipo: $("#desl_tipo")?.value || "Desligamento Voluntário (A pedido)",
      relato: $("#desl_relato")?.value.trim() || "Rescisão formal por interesse das partes com entrega dos atos pendentes.",
      processosInfo: $("#desl_processos")?.value.trim() || "Todos os casos sob a guarda do membro foram redistribuídos.",
      clausulaRetorno: $("#desl_retorno")?.value || "Apto para recontratação futura após 30 dias",
      autoridadeNome: $("#desl_autoridade_nome")?.value || "Zaith Frost",
      autoridadeCargo: $("#desl_autoridade_cargo")?.value || "Presidente do SDJ",
    };
  }

  function updateDeslPreview() {
    const dados = getDeslFormData();
    $("#prev_desl_num") && ($("#prev_desl_num").textContent = dados.numero);
    $("#prev_desl_data") && ($("#prev_desl_data").textContent = dados.data);
    $("#prev_desl_nome") && ($("#prev_desl_nome").textContent = dados.nome);
    $("#prev_desl_id") && ($("#prev_desl_id").textContent = dados.id);
    $("#prev_desl_cargo") && ($("#prev_desl_cargo").textContent = dados.cargo);
    $("#prev_desl_tempo") && ($("#prev_desl_tempo").textContent = dados.tempoAtuacao);
    $("#prev_desl_tipo") && ($("#prev_desl_tipo").textContent = dados.motivoTipo);
    $("#prev_desl_relato") && ($("#prev_desl_relato").textContent = dados.relato);
    $("#prev_desl_processos") && ($("#prev_desl_processos").textContent = dados.processosInfo);
    $("#prev_desl_retorno") && ($("#prev_desl_retorno").textContent = dados.clausulaRetorno);
    $("#prev_desl_autoridade") && ($("#prev_desl_autoridade").textContent = dados.autoridadeNome.toUpperCase());
    $("#prev_desl_autoridade_cargo") && ($("#prev_desl_autoridade_cargo").textContent = dados.autoridadeCargo);
  }

  /* ==========================================================
     3. CANAL: 🚫・BLACKLIST (CADASTRO & GESTÃO COMPLETA)
     ========================================================== */
  let currentBlacklistFilter = "todos";

  function initBlacklist() {
    const dataInput = $("#blk_data");
    if (dataInput && !dataInput.value) dataInput.value = getDataHojeFormatada();

    updateBlkPreview();

    const formBlk = $("#form-blacklist");
    if (formBlk) {
      formBlk.addEventListener("input", updateBlkPreview);
      formBlk.addEventListener("change", updateBlkPreview);
    }

    // Busca rápida na Blacklist
    const searchInput = $("#blk_search");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        renderBlacklistTable(searchInput.value.trim().toLowerCase());
      });
    }

    // Filtros por chips
    $$(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentBlacklistFilter = chip.dataset.filter || "todos";
        renderBlacklistTable(searchInput ? searchInput.value.trim().toLowerCase() : "");
      });
    });

    // Submeter Nova Inclusão na Blacklist
    const btnSubmitBlk = $("#btn-submit-blacklist");
    if (btnSubmitBlk) {
      btnSubmitBlk.addEventListener("click", async () => {
        const dados = getBlkFormData();
        if (!dados.nome || !dados.id || dados.id === "—") {
          toast("Preencha o Nome e o ID da pessoa a ser impedida!", true);
          return;
        }

        const list = getBlacklist();
        const novoRegistro = {
          idRegistro: "BLK-" + Math.floor(100 + Math.random() * 900),
          nome: dados.nome,
          id: dados.id,
          cargoAnterior: dados.cargoAnterior,
          periodo: dados.periodo,
          motivo: dados.motivo,
          provas: dados.provas,
          autoridadeNome: dados.autoridadeNome,
          autoridadeCargo: dados.autoridadeCargo,
          data: dados.data,
          status: "Ativa",
        };

        list.unshift(novoRegistro);
        saveBlacklist(list);

        // Gera PDF e envia ao Discord
        try {
          const { blob, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "blacklist",
            protocolo: novoRegistro.idRegistro,
            dataAto: dados.data,
            dados: novoRegistro,
          });

          const payload = {
            content: `🚫 **[COMUNICADO OFICIAL DE INCLUSÃO EM BLACKLIST]** · \`${novoRegistro.idRegistro}\`\n⚠️ *Impedimento institucional registrado pelo Departamento Jurídico de Brava RP.*`,
            embeds: [
              {
                title: `🚫 CERTIDÃO DE INCLUSÃO EM BLACKLIST · ${novoRegistro.idRegistro}`,
                description: `O indivíduo abaixo qualificado foi **incluído na Lista Negra Institucional (Blacklist)**, ficando vetado de ingressar, atuar ou representar perante o SDJ e Tribunal de Justiça.`,
                color: 0xdc2626, // Vermelho escuro de alerta
                fields: [
                  { name: "👤 Cidadão / Indivíduo", value: `**${dados.nome}** (ID: \`${dados.id}\`)`, inline: true },
                  { name: "💼 Condição / Cargo Anterior", value: `**${dados.cargoAnterior}**`, inline: true },
                  { name: "⛔ Gravidade / Período", value: `**${dados.periodo}**`, inline: true },
                  { name: "📅 Data da Inclusão", value: `**${dados.data}**`, inline: true },
                  { name: "✍️ Autoridade Determinante", value: `**${dados.autoridadeNome}** (${dados.autoridadeCargo})`, inline: true },
                  { name: "🔍 Motivo / Infração Gravíssima", value: dados.motivo },
                  { name: "📎 Evidências / Provas", value: dados.provas || "Arquivado em ata interna." },
                ],
                footer: { text: "Sistema do Departamento Jurídico • Brava RP • Canal Oficial de Blacklist" },
                timestamp: new Date().toISOString(),
              },
            ],
          };

          sendWebhook(btnSubmitBlk, "blacklist", payload, null, { blob, filename });
        } catch (e) {
          console.warn("Envio automático Discord:", e);
        }

        toast("✓ Registro incluído na Blacklist com sucesso!");
        addHistoryItem({
          tipo: "Inclusão Blacklist",
          icone: "🚫",
          numero: novoRegistro.idRegistro,
          alvo: `${dados.nome} (ID: ${dados.id})`,
          autoridade: dados.autoridadeNome,
          dados: novoRegistro,
        });

        // Limpa form
        $("#blk_nome").value = "";
        $("#blk_id").value = "";
        $("#blk_motivo").value = "";
        $("#blk_provas").value = "";
        updateBlkPreview();
      });
    }

    // Copiar formato Discord
    const btnCopy = $("#btn-copy-blk");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        const dados = getBlkFormData();
        const texto = `🚫 **[COMUNICADO OFICIAL DE INCLUSÃO EM BLACKLIST]**
**Indivíduo:** ${dados.nome} (ID: ${dados.id})
**Condição Anterior:** ${dados.cargoAnterior}
**Período:** ${dados.periodo}
**Data:** ${dados.data}

**Infração Comprovada:**
> ${dados.motivo}

**Provas & Ocorrências:**
> ${dados.provas}

*Autoridade: ${dados.autoridadeNome} (${dados.autoridadeCargo})*`;
        copyText(texto);
      });
    }
  }

  function getBlkFormData() {
    return {
      nome: $("#blk_nome")?.value.trim() || "Nome do Indivíduo",
      id: $("#blk_id")?.value.trim() || "—",
      cargoAnterior: $("#blk_cargo_anterior")?.value || "Civil / Externo",
      periodo: $("#blk_periodo")?.value || "Permanente (Indeterminada)",
      motivo: $("#blk_motivo")?.value.trim() || "Infração gravíssima contra a integridade e normas do Departamento Jurídico.",
      provas: $("#blk_provas")?.value.trim() || "Processo Ético e Relatório de Auditoria Interna.",
      autoridadeNome: $("#blk_autoridade_nome")?.value || "Zaith Frost",
      autoridadeCargo: $("#blk_autoridade_cargo")?.value || "Presidente do SDJ",
      data: $("#blk_data")?.value || getDataHojeFormatada(),
    };
  }

  function updateBlkPreview() {
    const dados = getBlkFormData();
    $("#prev_blk_nome") && ($("#prev_blk_nome").textContent = dados.nome);
    $("#prev_blk_id") && ($("#prev_blk_id").textContent = dados.id);
    $("#prev_blk_cargo") && ($("#prev_blk_cargo").textContent = dados.cargoAnterior);
    $("#prev_blk_periodo") && ($("#prev_blk_periodo").textContent = dados.periodo);
    $("#prev_blk_data") && ($("#prev_blk_data").textContent = dados.data);
    $("#prev_blk_motivo") && ($("#prev_blk_motivo").textContent = dados.motivo);
    $("#prev_blk_provas") && ($("#prev_blk_provas").textContent = dados.provas);
    $("#prev_blk_autoridade") && ($("#prev_blk_autoridade").textContent = dados.autoridadeNome.toUpperCase());
    $("#prev_blk_autoridade_cargo") && ($("#prev_blk_autoridade_cargo").textContent = dados.autoridadeCargo);
  }

  function renderBlacklistTable(filterQuery = "") {
    const tbody = $("#blacklist-table-body");
    if (!tbody) return;

    let list = getBlacklist();

    // Filtro por texto
    if (filterQuery) {
      list = list.filter(
        (item) =>
          item.nome.toLowerCase().includes(filterQuery) ||
          String(item.id).includes(filterQuery) ||
          item.motivo.toLowerCase().includes(filterQuery)
      );
    }

    // Filtro por categoria
    if (currentBlacklistFilter === "permanente") {
      list = list.filter((item) => item.status === "Ativa" && item.periodo.toLowerCase().includes("permanente"));
    } else if (currentBlacklistFilter === "temporaria") {
      list = list.filter((item) => item.status === "Ativa" && item.periodo.toLowerCase().includes("tempor"));
    } else if (currentBlacklistFilter === "revogada") {
      list = list.filter((item) => item.status === "Revogada");
    }

    if (!list.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted);">Nenhum registro encontrado na Blacklist com os filtros selecionados.</td></tr>`;
      return;
    }

    tbody.innerHTML = list
      .map((item, idx) => {
        const isPerm = item.periodo.toLowerCase().includes("permanente");
        const isRev = item.status === "Revogada";

        let badgeHtml = isRev
          ? `<span class="badge-status-revogada">✓ Revogada</span>`
          : isPerm
          ? `<span class="badge-status-perm">⛔ Permanente</span>`
          : `<span class="badge-status-temp">⏳ ${item.periodo}</span>`;

        return `
        <tr>
          <td><strong style="color:var(--gold-3);">${item.idRegistro || `BLK-${idx + 1}`}</strong></td>
          <td>
            <strong>${item.nome}</strong><br>
            <small class="muted">ID: ${item.id} • ${item.cargoAnterior || "Civil"}</small>
          </td>
          <td>${badgeHtml}</td>
          <td>
            <span style="font-size:11.5px;max-width:280px;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${item.motivo}">
              ${item.motivo}
            </span>
          </td>
          <td style="font-size:11px;color:var(--muted);">${item.data}</td>
          <td>
            <div class="table-actions">
              <button type="button" class="btn-table-icon btn-pdf-blk-item" data-id="${item.idRegistro}" title="Baixar Certidão em PDF">
                📄
              </button>
              ${
                !isRev
                  ? `<button type="button" class="btn-table-icon btn-revoke-blk-item" data-id="${item.idRegistro}" title="Revogar / Anistiar Blacklist">
                      🔓
                    </button>`
                  : ""
              }
              <button type="button" class="btn-table-icon danger btn-del-blk-item" data-id="${item.idRegistro}" title="Excluir Registro">
                🗑️
              </button>
            </div>
          </td>
        </tr>`;
      })
      .join("");

    // Eventos nas ações da tabela
    $$(".btn-pdf-blk-item").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const reg = getBlacklist().find((r) => r.idRegistro === btn.dataset.id);
        if (!reg) return;
        try {
          const { doc, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "blacklist",
            protocolo: reg.idRegistro,
            dataAto: reg.data,
            dados: reg,
          });
          doc.save(filename);
          toast("✓ Certidão de Blacklist baixada em PDF!");
        } catch (e) {
          toast("Erro ao gerar PDF: " + e.message, true);
        }
      });
    });

    $$(".btn-revoke-blk-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const list = getBlacklist();
        const reg = list.find((r) => r.idRegistro === btn.dataset.id);
        if (!reg) return;

        const motivo = prompt(`Digite a justificativa para a REVOGAÇÃO / ANISTIA de ${reg.nome}:`, "Reabilitação e termo de conduta firmado perante a Presidência.");
        if (motivo) {
          reg.status = "Revogada";
          reg.motivoRevogacao = motivo;
          reg.dataRevogacao = getDataHojeFormatada();
          saveBlacklist(list);
          toast(`✓ Blacklist de ${reg.nome} revogada!`);

          addHistoryItem({
            tipo: "Revogação Blacklist",
            icone: "🔓",
            numero: reg.idRegistro,
            alvo: `${reg.nome} (ID: ${reg.id})`,
            autoridade: "Presidência SDJ",
            dados: reg,
          });
        }
      });
    });

    $$(".btn-del-blk-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (confirm("Deseja realmente remover este registro da Blacklist?")) {
          let list = getBlacklist();
          list = list.filter((r) => r.idRegistro !== btn.dataset.id);
          saveBlacklist(list);
          toast("Registro excluído.");
        }
      });
    });

    // Atualiza contadores
    const all = getBlacklist();
    const ativas = all.filter((i) => i.status === "Ativa");
    $("#stat-blk-count") && ($("#stat-blk-count").textContent = ativas.length);
    $("#badge-sidebar-blk") && ($("#badge-sidebar-blk").textContent = ativas.length);
  }

  /* ==========================================================
     4. CANAL: ❗️・ADVERTÊNCIAS
     ========================================================== */
  function initAdvertencias() {
    const numInput = $("#adv_numero");
    const dataInput = $("#adv_data");
    if (numInput && !numInput.value) numInput.value = gerarNumeroAto("ADV-DISC");
    if (dataInput && !dataInput.value) dataInput.value = getDataHojeFormatada();

    updateAdvPreview();

    const formAdv = $("#form-advertencias");
    if (formAdv) {
      formAdv.addEventListener("input", updateAdvPreview);
      formAdv.addEventListener("change", updateAdvPreview);
    }

    const btnRegen = $("#btn-regen-num-adv");
    if (btnRegen) {
      btnRegen.addEventListener("click", () => {
        numInput.value = gerarNumeroAto("ADV-DISC");
        updateAdvPreview();
      });
    }

    // Gerar PDF
    const btnPdf = $("#btn-pdf-adv");
    if (btnPdf) {
      btnPdf.addEventListener("click", async () => {
        try {
          const dados = getAdvFormData();
          const { doc, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "advertencia",
            protocolo: dados.numero,
            dataAto: dados.data,
            dados,
          });
          doc.save(filename);
          toast("✓ Notificação de Advertência gerada em PDF!");
          addHistoryItem({
            tipo: "Advertência",
            icone: "❗️",
            numero: dados.numero,
            alvo: `${dados.nome} (${dados.grau})`,
            autoridade: dados.autoridadeNome,
            dados,
          });
        } catch (err) {
          toast("Erro ao gerar PDF: " + err.message, true);
        }
      });
    }

    // Enviar Discord
    const btnDiscord = $("#btn-discord-adv");
    if (btnDiscord) {
      btnDiscord.addEventListener("click", async () => {
        const dados = getAdvFormData();
        if (!dados.nome) {
          toast("Preencha o nome do membro advertido!", true);
          return;
        }

        try {
          const { blob, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto: "advertencia",
            protocolo: dados.numero,
            dataAto: dados.data,
            dados,
          });

          // Cor do embed baseada no grau
          let cor = 0xeab308; // Amarelo (1ª)
          if (dados.grau.includes("2ª")) cor = 0xf97316; // Laranja
          else if (dados.grau.includes("3ª") || dados.grau.includes("Grave")) cor = 0xdc2626; // Vermelho

          const payload = {
            content: `❗️ **[NOTIFICAÇÃO DISCIPLINAR ADMINISTRATIVA]** · \`${dados.numero}\`\n⚖️ *Medida disciplinar aplicada pela Diretoria do Departamento Jurídico.*`,
            embeds: [
              {
                title: `❗️ NOTIFICAÇÃO DISCIPLINAR · ${dados.numero}`,
                description: `Foi aplicada formalmente **${dados.grau}** ao membro abaixo com registro em ficha funcional.`,
                color: cor,
                fields: [
                  { name: "👤 Membro Notificado", value: `**${dados.nome}** (ID: \`${dados.id}\`)`, inline: true },
                  { name: "💼 Cargo / Função", value: `**${dados.cargo}**`, inline: true },
                  { name: "⚠️ Grau da Advertência", value: `**${dados.grau}**`, inline: true },
                  { name: "⚖️ Infração Tipificada", value: `**${dados.infracao}**`, inline: true },
                  { name: "📅 Data da Aplicação", value: `**${dados.data}**`, inline: true },
                  { name: "✍️ Autoridade Notificante", value: `**${dados.autoridadeNome}** (${dados.autoridadeCargo})`, inline: true },
                  { name: "📝 Descrição Circunstanciada dos Fatos", value: dados.relato || "Conduta em desconformidade com os padrões éticos do SDJ." },
                  { name: "🔨 Penalidade & Determinação", value: dados.penalidade },
                  { name: "⏳ Prazo para Recurso", value: "48 (quarenta e oito) horas perante a Presidência." },
                ],
                footer: { text: "Sistema do Departamento Jurídico • Brava RP • Canal Oficial de Advertências" },
                timestamp: new Date().toISOString(),
              },
            ],
          };

          sendWebhook(
            btnDiscord,
            "advertencias",
            payload,
            () => {
              addHistoryItem({
                tipo: "Advertência",
                icone: "❗️",
                numero: dados.numero,
                alvo: `${dados.nome} (${dados.grau})`,
                autoridade: dados.autoridadeNome,
                dados,
              });
            },
            { blob, filename }
          );
        } catch (err) {
          toast("Erro ao preparar envio: " + err.message, true);
        }
      });
    }

    // Copiar
    const btnCopy = $("#btn-copy-adv");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        const dados = getAdvFormData();
        const texto = `❗️ **[NOTIFICAÇÃO DISCIPLINAR ADMINISTRATIVA]**
**Número:** \`${dados.numero}\`
**Membro Advertido:** ${dados.nome} (ID: ${dados.id})
**Cargo:** ${dados.cargo}
**Grau:** ${dados.grau}
**Infração:** ${dados.infracao}
**Data:** ${dados.data}

**Fatos Apurados:**
> ${dados.relato}

**Penalidade Aplicada:**
> ${dados.penalidade}

*Subscrito por: ${dados.autoridadeNome} (${dados.autoridadeCargo})*`;
        copyText(texto);
      });
    }

    // Limpar
    const btnLimpar = $("#btn-limpar-adv");
    if (btnLimpar) {
      btnLimpar.addEventListener("click", () => {
        $("#adv_nome").value = "";
        $("#adv_id").value = "";
        $("#adv_relato").value = "";
        numInput.value = gerarNumeroAto("ADV-DISC");
        updateAdvPreview();
        toast("Formulário de Advertência reiniciado.");
      });
    }
  }

  function getAdvFormData() {
    return {
      numero: $("#adv_numero")?.value || "ADV-DISC Nº 001/2026-SDJ",
      data: $("#adv_data")?.value || getDataHojeFormatada(),
      nome: $("#adv_nome")?.value.trim() || "Nome do Membro",
      id: $("#adv_id")?.value.trim() || "—",
      cargo: $("#adv_cargo")?.value || "Advogado Júnior",
      grau: $("#adv_grau")?.value || "1ª Advertência Escrita (Leve)",
      infracao: $("#adv_infracao")?.value || "Atraso injustificado ou abandono de plantão",
      relato: $("#adv_relato")?.value.trim() || "Constatou-se postura em desacordo com as diretrizes do Departamento Jurídico.",
      penalidade: $("#adv_penalidade")?.value.trim() || "Registro na ficha funcional com prazo recursal de 48h.",
      autoridadeNome: $("#adv_autoridade_nome")?.value || "Zaith Frost",
      autoridadeCargo: $("#adv_autoridade_cargo")?.value || "Presidente do SDJ",
    };
  }

  function updateAdvPreview() {
    const dados = getAdvFormData();
    $("#prev_adv_num") && ($("#prev_adv_num").textContent = dados.numero);
    $("#prev_adv_data") && ($("#prev_adv_data").textContent = dados.data);
    $("#prev_adv_nome") && ($("#prev_adv_nome").textContent = dados.nome);
    $("#prev_adv_id") && ($("#prev_adv_id").textContent = dados.id);
    $("#prev_adv_cargo") && ($("#prev_adv_cargo").textContent = dados.cargo);
    $("#prev_adv_grau") && ($("#prev_adv_grau").textContent = dados.grau);
    $("#prev_adv_infracao") && ($("#prev_adv_infracao").textContent = dados.infracao);
    $("#prev_adv_relato") && ($("#prev_adv_relato").textContent = dados.relato);
    $("#prev_adv_penalidade") && ($("#prev_adv_penalidade").textContent = dados.penalidade);
    $("#prev_adv_autoridade") && ($("#prev_adv_autoridade").textContent = dados.autoridadeNome.toUpperCase());
    $("#prev_adv_autoridade_cargo") && ($("#prev_adv_autoridade_cargo").textContent = dados.autoridadeCargo);
  }

  /* ==========================================================
     5. HISTÓRICO DE ATOS ADMINISTRATIVOS
     ========================================================== */
  function renderHistory() {
    const listEl = $("#history-list-body");
    if (!listEl) return;

    const history = getHistory();
    if (!history.length) {
      listEl.innerHTML = `<p class="muted" style="text-align:center;padding:24px;">Nenhum ato administrativo expedido nesta sessão.</p>`;
      return;
    }

    listEl.innerHTML = history
      .map(
        (item) => `
      <div class="admin-history-item" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:20px;">${item.icone || "📑"}</span>
          <div>
            <strong>${item.tipo} · ${item.numero}</strong>
            <div class="muted" style="font-size:11.5px;">Alvo: <b>${item.alvo}</b> • Subscrito por: ${item.autoridade}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <small class="muted">${item.dataLegivel}</small>
          <button type="button" class="btn-outline btn-redownload-history" data-act-id="${item.id}" style="padding:4px 10px;font-size:11px;">
            📄 Rebaixar PDF
          </button>
        </div>
      </div>`
      )
      .join("");

    $$(".btn-redownload-history").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const item = getHistory().find((i) => i.id === btn.dataset.actId);
        if (!item || !item.dados) return;

        let tipoAto = "exoneracao";
        if (item.tipo.includes("Desligamento")) tipoAto = "desligamento";
        else if (item.tipo.includes("Blacklist")) tipoAto = "blacklist";
        else if (item.tipo.includes("Advertência")) tipoAto = "advertencia";

        try {
          const { doc, filename } = await window.SDJ_PDF.generateAdministrativoPDF({
            tipoAto,
            protocolo: item.numero,
            dataAto: item.dados.data || item.dataLegivel,
            dados: item.dados,
          });
          doc.save(filename);
          toast("✓ PDF rebaixado!");
        } catch (e) {
          toast("Erro ao rebaixar: " + e.message, true);
        }
      });
    });

    $("#stat-history-count") && ($("#stat-history-count").textContent = history.length);
  }

  /* ==========================================================
     6. CONFIGURAÇÕES & MODAIS (PIN & WEBHOOKS)
     ========================================================== */
  function initModals() {
    // Modal Alterar PIN
    const modalPin = $("#modal-pin");
    const inputPinAtual = $("#input-pin-atual");
    const inputNovoPin = $("#input-novo-pin");
    const inputConfirmaPin = $("#input-confirma-pin");
    const btnSalvarPin = $("#btn-salvar-pin");
    const btnCloseModalPin = $("#btn-close-modal-pin");
    const btnCancelarPin = $("#btn-cancelar-pin");

    function openModalPin() {
      if (modalPin) {
        modalPin.classList.remove("hidden");
        inputPinAtual.value = "";
        inputNovoPin.value = "";
        inputConfirmaPin.value = "";
        inputPinAtual.focus();
      }
    }

    function closeModalPin() {
      if (modalPin) modalPin.classList.add("hidden");
    }

    if (btnTrocarPin) btnTrocarPin.addEventListener("click", openModalPin);
    if (btnCloseModalPin) btnCloseModalPin.addEventListener("click", closeModalPin);
    if (btnCancelarPin) btnCancelarPin.addEventListener("click", closeModalPin);

    if (btnSalvarPin) {
      btnSalvarPin.addEventListener("click", () => {
        const atual = inputPinAtual.value.trim();
        const novo = inputNovoPin.value.trim();
        const confirma = inputConfirmaPin.value.trim();
        const curReal = getAdminPin();

        if (atual !== curReal && (localStorage.getItem(STORAGE_PIN_KEY) || !ALIAS_PINS.includes(atual))) {
          toast("PIN atual incorreto!", true);
          return;
        }

        if (novo.length !== 4 || !/^\d{4}$/.test(novo)) {
          toast("O novo PIN deve conter exatamente 4 números!", true);
          return;
        }

        if (novo !== confirma) {
          toast("A confirmação do novo PIN não coincide!", true);
          return;
        }

        setAdminPin(novo);
        closeModalPin();
        toast("✓ Senha PIN Geral de Administrativo alterada com sucesso!");
      });
    }

    // Modal Webhooks Discord
    const modalWebhooks = $("#modal-webhooks");
    const btnCloseWebhooks = $("#btn-close-modal-webhooks");
    const btnSalvarWebhooks = $("#btn-salvar-webhooks");
    const btnTestarWebhooks = $("#btn-testar-webhook");

    function openModalWebhooks() {
      if (!modalWebhooks) return;
      const wh = getWebhooks();
      $("#input-wh-geral") && ($("#input-wh-geral").value = wh.geral || "");
      $("#input-wh-exo") && ($("#input-wh-exo").value = wh.exoneracoes || "");
      $("#input-wh-desl") && ($("#input-wh-desl").value = wh.desligamentos || "");
      $("#input-wh-blk") && ($("#input-wh-blk").value = wh.blacklist || "");
      $("#input-wh-adv") && ($("#input-wh-adv").value = wh.advertencias || "");
      modalWebhooks.classList.remove("hidden");
    }

    function closeModalWebhooks() {
      if (modalWebhooks) modalWebhooks.classList.add("hidden");
    }

    if (btnWebhooks) btnWebhooks.addEventListener("click", openModalWebhooks);
    if (btnCloseWebhooks) btnCloseWebhooks.addEventListener("click", closeModalWebhooks);

    if (btnSalvarWebhooks) {
      btnSalvarWebhooks.addEventListener("click", () => {
        const whObj = {
          geral: $("#input-wh-geral")?.value.trim() || DEFAULT_WEBHOOK_GERAL,
          exoneracoes: $("#input-wh-exo")?.value.trim() || "",
          desligamentos: $("#input-wh-desl")?.value.trim() || "",
          blacklist: $("#input-wh-blk")?.value.trim() || "",
          advertencias: $("#input-wh-adv")?.value.trim() || "",
        };
        saveWebhooks(whObj);
        closeModalWebhooks();
        toast("✓ Configurações de Webhooks salvas com sucesso!");
      });
    }

    if (btnTestarWebhooks) {
      btnTestarWebhooks.addEventListener("click", async () => {
        const url = $("#input-wh-geral")?.value.trim() || DEFAULT_WEBHOOK_GERAL;
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: "🔔 **[TESTE DE CONECTIVIDADE DISCORD]** • Painel Administrativo SDJ conectado com sucesso!",
            }),
          });
          if (res.ok) toast("✓ Webhook testado com sucesso no Discord!");
          else toast(`Erro ao testar webhook (Código ${res.status})`, true);
        } catch (e) {
          toast("Erro na conexão: " + e.message, true);
        }
      });
    }
  }

  function updateStats() {
    const ativas = getBlacklist().filter((i) => i.status === "Ativa").length;
    $("#stat-blk-count") && ($("#stat-blk-count").textContent = ativas);
    $("#badge-sidebar-blk") && ($("#badge-sidebar-blk").textContent = ativas);
    $("#stat-history-count") && ($("#stat-history-count").textContent = getHistory().length);
  }

  function initForms() {
    initExoneracoes();
    initDesligamentos();
    initBlacklist();
    initAdvertencias();
    initModals();

    // Data e hora do topo
    const dtEl = $("#admin-data-hora");
    if (dtEl) {
      const updateDataHora = () => {
        dtEl.textContent = new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };
      updateDataHora();
      setInterval(updateDataHora, 60000);
    }
  }

  /* ==========================================================
     INICIALIZAÇÃO DA PÁGINA
     ========================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    // Alternância de Tema
    const btnTema = $("#btn-tema");
    if (btnTema) {
      btnTema.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme") || "dark";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("brava-tema", next);
      });
    }

    // Verifica autenticação prévia
    if (sessionStorage.getItem(STORAGE_AUTH_KEY) === "true") {
      unlockAdmin();
    } else {
      lockAdmin();
    }

    // Suporte a hash direto na URL (ex: #blacklist)
    const hash = window.location.hash.replace("#", "");
    if (["exoneracoes", "desligamentos", "blacklist", "advertencias", "historico", "configuracoes"].includes(hash)) {
      switchChannel(hash);
    }
  });
})();
