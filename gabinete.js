/* ==========================================================
   TRIBUNAL DE JUSTIÇA · BRAVA RP
   GABINETE DOS MAGISTRADOS (ÁREA RESTRITA POR PIN)
   Lógica da página gabinete.html
   ========================================================== */
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => root.querySelectorAll(s);

  /* ==========================================================
     CONFIGURAÇÃO DOS 3 PERFIS OFICIAIS DOS MAGISTRADOS
     ========================================================== */
  const STORAGE_AUTH_KEY = "sjd_magistrado_unlocked";
  const STORAGE_ACTIVE_PROFILE = "sjd_magistrado_active_profile";

  const PERFIS_MAGISTRATURA = {
    zaith: {
      key: "zaith",
      nome: "Zaith Frost",
      cargo: "Presidente do Tribunal de Justiça",
      cargoCurto: "Presidente",
      idNum: "708",
      inscricao: "OAB/SDJ-2026-0708",
      matricula: "OAB/SDJ-2026-0708",
      vara: "Presidência Geral do Poder Judiciário · Comarca de Brava RP",
      assinaturaTipo: "zaith",
      pinDefault: "0708",
      aliasPins: ["0708", "708", "7080"],
      badgeIcon: "👑",
      badgeCor: "#d4af37",
      saudacao: "Excelentíssimo Desembargador Presidente Zaith Frost",
      pronome: "Excelência"
    },
    mike: {
      key: "mike",
      nome: "Mike Santaroni",
      cargo: "Vice-Presidente do Tribunal de Justiça",
      cargoCurto: "Vice-Presidente",
      idNum: "512",
      inscricao: "OAB/SDJ-2026-0512",
      matricula: "OAB/SDJ-2026-0512",
      vara: "Vice-Presidência do Poder Judiciário · Comarca de Brava RP",
      assinaturaTipo: "mike",
      pinDefault: "0512",
      aliasPins: ["0512", "512", "5120"],
      badgeIcon: "⚖️",
      badgeCor: "#38bdf8",
      saudacao: "Excelentíssimo Desembargador Vice-Presidente Mike Santaroni",
      pronome: "Excelência"
    },
    manu: {
      key: "manu",
      nome: "Manu Garcia",
      cargo: "Juíza de Direito",
      cargoCurto: "Juíza de Direito",
      idNum: "725",
      inscricao: "TJ/SDJ-2026-0725",
      matricula: "TJ/SDJ-2026-0725",
      vara: "Vara Única Judicial · Comarca de Brava RP",
      assinaturaTipo: "manu",
      pinDefault: "0725",
      aliasPins: ["0725", "725", "7250"],
      badgeIcon: "⚖️",
      badgeCor: "#f472b6",
      saudacao: "Meritíssima Juíza de Direito Manu Garcia",
      pronome: "Excelência"
    }
  };

  function getProfilePin(key) {
    const prof = PERFIS_MAGISTRATURA[key];
    if (!prof) return "7788";
    return localStorage.getItem("sjd_pin_" + key) || prof.pinDefault;
  }

  function setProfilePin(key, newPin) {
    localStorage.setItem("sjd_pin_" + key, String(newPin));
  }

  let selectedProfileKey = "zaith";
  let activeProfile = PERFIS_MAGISTRATURA.zaith;

  /* ---------- Toast de Notificações ---------- */
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

  /* ---------- Alternância de Tema ---------- */
  const btnTema = $("#btn-tema");
  if (btnTema) {
    btnTema.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("brava-tema", next);
    });
  }

  /* ==========================================================
     GERENCIAMENTO DO PIN & LOCKSCREEN MULTI-PERFIL
     ========================================================== */
  let enteredPin = "";
  const lockscreenCard = $("#lockscreen-card");
  const lockscreenView = $("#lockscreen-view");
  const gabineteView = $("#gabinete-view");
  const pinStatus = $("#pin-status");
  const btnTrocarPin = $("#btn-trocar-pin");
  const btnTrocarMagistrado = $("#btn-trocar-magistrado");
  const btnBloquear = $("#btn-bloquear");

  function updatePinDisplay() {
    const dots = $$(".pin-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("filled", idx < enteredPin.length);
    });
  }

  function handleDigit(digit) {
    if (enteredPin.length < 4) {
      enteredPin += digit;
      updatePinDisplay();
      if (enteredPin.length === 4) {
        setTimeout(verifyPin, 100);
      }
    }
  }

  function handleBackspace() {
    if (enteredPin.length > 0) {
      enteredPin = enteredPin.slice(0, -1);
      updatePinDisplay();
      atualizarStatusMsgDefault();
    }
  }

  function atualizarStatusMsgDefault() {
    const p = PERFIS_MAGISTRATURA[selectedProfileKey];
    if (p) {
      pinStatus.textContent = `Digite a senha PIN pessoal de ${p.nome}`;
    } else {
      pinStatus.textContent = "Digite sua senha PIN pessoal ou use o teclado";
    }
    pinStatus.className = "pin-status-msg";
  }

  function verifyPin() {
    if (!enteredPin) return;

    // 1. Testa primeiramente o perfil selecionado
    const selProf = PERFIS_MAGISTRATURA[selectedProfileKey];
    const selPin = getProfilePin(selectedProfileKey);
    if (enteredPin === selPin || (selProf && selProf.aliasPins.includes(enteredPin))) {
      concluirLogin(selProf);
      return;
    }

    // 2. Testa se o PIN digitado pertence a qualquer outro magistrado (detecção automática inteligente)
    for (const k of Object.keys(PERFIS_MAGISTRATURA)) {
      const p = PERFIS_MAGISTRATURA[k];
      const pin = getProfilePin(k);
      if (enteredPin === pin || p.aliasPins.includes(enteredPin)) {
        concluirLogin(p);
        return;
      }
    }

    // PIN incorreto
    pinStatus.textContent = `❌ Senha PIN Incorreta para o magistrado.`;
    pinStatus.className = "pin-status-msg error";
    lockscreenCard.classList.add("shake");
    setTimeout(() => {
      lockscreenCard.classList.remove("shake");
      enteredPin = "";
      updatePinDisplay();
    }, 500);
  }

  function concluirLogin(profile) {
    activeProfile = profile;
    selectedProfileKey = profile.key;
    sessionStorage.setItem(STORAGE_ACTIVE_PROFILE, profile.key);
    sessionStorage.setItem(STORAGE_AUTH_KEY, "true");

    pinStatus.textContent = `✓ Acesso Autorizado · ${profile.nome} (${profile.cargoCurto})`;
    pinStatus.className = "pin-status-msg success";

    setTimeout(() => {
      unlockGabinete(profile);
      toast(`✓ Bem-vindo(a), ${profile.saudacao}!`);
    }, 250);
  }

  function unlockGabinete(profile) {
    if (!profile) {
      const savedKey = sessionStorage.getItem(STORAGE_ACTIVE_PROFILE) || "zaith";
      profile = PERFIS_MAGISTRATURA[savedKey] || PERFIS_MAGISTRATURA.zaith;
    }
    activeProfile = profile;

    lockscreenView.style.display = "none";
    gabineteView.classList.add("unlocked");

    // Topbar
    const topBadge = $("#topbar-magistrado-badge");
    if (topBadge) {
      topBadge.classList.remove("hidden");
      $("#topbar-mag-icon").textContent = profile.badgeIcon;
      $("#topbar-mag-name").textContent = `${profile.nome} · ${profile.inscricao}`;
    }
    if (btnTrocarMagistrado) btnTrocarMagistrado.classList.remove("hidden");
    if (btnTrocarPin) btnTrocarPin.classList.remove("hidden");
    if (btnBloquear) btnBloquear.classList.remove("hidden");

    atualizarDataHoraGabinete();
    aplicarCredencialDoPerfil(profile);
    renderCurrentCategory();
  }

  function lockGabinete() {
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    sessionStorage.removeItem(STORAGE_ACTIVE_PROFILE);
    enteredPin = "";
    updatePinDisplay();
    atualizarStatusMsgDefault();
    gabineteView.classList.remove("unlocked");
    lockscreenView.style.display = "flex";

    $("#topbar-magistrado-badge")?.classList.add("hidden");
    btnTrocarMagistrado?.classList.add("hidden");
    btnTrocarPin.classList.add("hidden");
    btnBloquear.classList.add("hidden");

    toast("🔒 Gabinete Bloqueado.");
  }

  // Cliques nos Chips de Perfis na Lockscreen
  $$(".magistrado-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const profKey = chip.dataset.profile;
      if (!profKey || !PERFIS_MAGISTRATURA[profKey]) return;
      selectedProfileKey = profKey;
      $$(".magistrado-chip").forEach(c => c.classList.toggle("active", c === chip));
      enteredPin = "";
      updatePinDisplay();
      atualizarStatusMsgDefault();
    });
  });

  // Teclado virtual na tela
  $$(".pin-key[data-digit]").forEach(btn => {
    btn.addEventListener("click", () => handleDigit(btn.dataset.digit));
  });

  const btnPinBackspace = $("#btn-pin-backspace");
  if (btnPinBackspace) {
    btnPinBackspace.addEventListener("click", handleBackspace);
  }

  const btnPinConfirm = $("#btn-pin-confirm");
  if (btnPinConfirm) {
    btnPinConfirm.addEventListener("click", () => {
      if (enteredPin.length >= 3) verifyPin();
      else toast("Digite o PIN do magistrado.", true);
    });
  }

  // Teclado Físico
  document.addEventListener("keydown", (e) => {
    if (lockscreenView.style.display !== "none" && !sessionStorage.getItem(STORAGE_AUTH_KEY)) {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter") {
        if (enteredPin.length >= 3) verifyPin();
      } else if (e.key === "Escape") {
        enteredPin = "";
        updatePinDisplay();
        atualizarStatusMsgDefault();
      }
    }
  });

  if (btnBloquear) {
    btnBloquear.addEventListener("click", lockGabinete);
  }

  if (btnTrocarMagistrado) {
    btnTrocarMagistrado.addEventListener("click", () => {
      lockGabinete();
      toast("Selecione o magistrado e digite o respectivo PIN.");
    });
  }

  /* ---------- Modal de Troca de PIN Individual ---------- */
  const modalPin = $("#modal-pin");
  const btnCloseModalPin = $("#btn-close-modal-pin");
  const btnCancelarPin = $("#btn-cancelar-pin");
  const btnSalvarPin = $("#btn-salvar-pin");

  if (btnTrocarPin) {
    btnTrocarPin.addEventListener("click", () => {
      $("#input-pin-atual").value = "";
      $("#input-novo-pin").value = "";
      $("#input-confirma-pin").value = "";
      const modalTitle = modalPin.querySelector("h3");
      if (modalTitle) {
        modalTitle.textContent = `🔑 Alterar PIN · ${activeProfile.nome} (ID: ${activeProfile.idNum})`;
      }
      modalPin.classList.remove("hidden");
      $("#input-pin-atual").focus();
    });
  }

  function fecharModalPin() {
    modalPin.classList.add("hidden");
  }

  if (btnCloseModalPin) btnCloseModalPin.addEventListener("click", fecharModalPin);
  if (btnCancelarPin) btnCancelarPin.addEventListener("click", fecharModalPin);

  if (btnSalvarPin) {
    btnSalvarPin.addEventListener("click", () => {
      const atual = $("#input-pin-atual").value.trim();
      const novo = $("#input-novo-pin").value.trim();
      const confirma = $("#input-confirma-pin").value.trim();
      const stored = getProfilePin(activeProfile.key);

      if (atual !== stored && !activeProfile.aliasPins.includes(atual)) {
        toast(`PIN atual de ${activeProfile.nome} incorreto.`, true);
        return;
      }
      if (!/^\d{3,4}$/.test(novo)) {
        toast("O novo PIN deve conter 3 ou 4 dígitos numéricos.", true);
        return;
      }
      if (novo !== confirma) {
        toast("A confirmação do novo PIN não confere.", true);
        return;
      }

      setProfilePin(activeProfile.key, novo);
      fecharModalPin();
      toast(`✓ Senha PIN de ${activeProfile.nome} atualizada com sucesso!`);
    });
  }

  /* ==========================================================
     WEBHOOK UNIFICADO PARA TODOS OS DOCUMENTOS DO GABINETE
     ========================================================== */
  const WEBHOOK_GABINETE = "https://discord.com/api/webhooks/1562625823301697679/ubJlVqAfe32Bvxlodf5bi5t0SHRsz6-n7fgtKuyMG5XOFpLLijgtmKywedUEtCI70nN9";

  /* ==========================================================
     CATÁLOGO DE ATOS JUDICIAIS DO GABINETE
     ========================================================== */
  const ATOS_MAGISTRATURA = {
    sdj: [
      {
        id: "limpeza",
        icon: "🛡️",
        nome: "Homologação de Limpeza de Ficha Penal",
        desc: "Extinção da punibilidade, reabilitação criminal e cancelamento definitivo de antecedentes criminais.",
        natureza: "Decisão Homologatória de Extinção da Punibilidade",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_cidadao", label: "👤 Cidadão / Requerente", placeholder: "Nome completo do beneficiário", req: true },
          { id: "f_id", label: "🪪 Passaporte do Cidadão", placeholder: "Ex.: 1234", req: true },
          { id: "f_advogado", label: "⚖️ Advogado Constituído / Defensor", placeholder: "Ex.: Dra. Julia Martins (OAB: 12)" },
          { id: "f_prisoes", label: "🔒 Qtd. de Prisões Registradas", placeholder: "Ex.: 2 prisões cumpridas" },
          { id: "f_artigos", label: "📜 Artigos Extintos Pela Decisão", placeholder: "Ex.: Art. 1.4 (Resistência), Art. 2.1 (Porte Ilegal)", isFull: true },
          { id: "f_valor", label: "💰 Taxa Oficial Quitada", placeholder: "R$ 100.000" }
        ],
        dispositivo: "VISTOS, ETC. Homologo judicialmente a reabilitação criminal e a extinção de punibilidade do requerente qualificado, com fundamento na legislação penal e nos assentos do Tribunal de Justiça de Brava RP. Determino ao Cartório do SDJ e aos órgãos de segurança pública a imediata baixa e o cancelamento definitivo de todas as anotações criminais pretéritas, restabelecendo a primariedade e a idoneidade civil plena do cidadão perante os cadastros do Estado. Publique-se, registre-se e cumpra-se.",
        exemplo: {
          f_cidadao: "Lucas Montenegro",
          f_id: "5420",
          f_advogado: "Dr. Roberto Silva (OAB: 04)",
          f_prisoes: "2 prisões cumpridas e extintas",
          f_artigos: "Art. 1.4 (Resistência à Prisão) e Art. 2.1 (Porte Ilegal de Arma de Fogo)",
          f_valor: "R$ 100.000 (Quitado perante o SDJ)"
        }
      },
      {
        id: "divorcio",
        icon: "💔",
        nome: "Sentença Homologatória de Divórcio",
        desc: "Dissolucão formal do matrimônio, homologação de partilha e retorno ao nome de solteiro(a).",
        natureza: "Sentença de Homologação de Divórcio",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_conjuge1", label: "👤 Cônjuge 1", placeholder: "Nome completo do primeiro cônjuge", req: true },
          { id: "f_id1", label: "🪪 Passaporte Cônjuge 1", placeholder: "Ex.: 2041", req: true },
          { id: "f_conjuge2", label: "👤 Cônjuge 2", placeholder: "Nome completo do segundo cônjuge", req: true },
          { id: "f_id2", label: "🪪 Passaporte Cônjuge 2", placeholder: "Ex.: 3150", req: true },
          { id: "f_modalidade", label: "⚖️ Modalidade do Divórcio", placeholder: "Consensual (Com Partilha de Bens)" },
          { id: "f_regime", label: "💍 Regime de Bens Anterior", placeholder: "Comunhão Parcial de Bens" },
          { id: "f_partilha", label: "📦 Resumo da Partilha Patrimonial", placeholder: "Divisão equitativa dos veículos e imóveis...", isFull: true }
        ],
        dispositivo: "Vistos, relatados e discutidos. HOMOLOGO por sentença o divórcio consensual das partes, com fulcro na legislação civil vigente, decretando a dissolução definitiva do casamento e do vínculo conjugal. Homologo os termos de partilha patrimonial apresentados e determino ao Oficial do Registro Civil a imediata averbação no Livro de Casamentos, expedindo-se a certidão competente com trânsito em julgado imediato. Cumpra-se.",
        exemplo: {
          f_conjuge1: "Carlos Eduardo Miller",
          f_id1: "2041",
          f_conjuge2: "Beatriz Helena Foster",
          f_id2: "3150",
          f_modalidade: "Consensual Direto",
          f_regime: "Comunhão Parcial de Bens",
          f_partilha: "Veículo desportivo destinado ao cônjuge varão; patrimônio residencial e indenização equivalente conferidos à mulher, sem outros bens a partilhar."
        }
      },
      {
        id: "adocao",
        icon: "🚼",
        nome: "Sentença Constitutiva de Adoção",
        desc: "Deferimento do poder familiar, constituição de novo vínculo de filiação e termo judicial.",
        natureza: "Sentença Constitutiva de Filiação & Poder Familiar",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_adotado", label: "👶 Nome do Adotado / Criança", placeholder: "Nome completo da criança", req: true },
          { id: "f_id_adotado", label: "🪪 Passaporte do Adotado", placeholder: "Ex.: 7012" },
          { id: "f_resp1", label: "👤 Pai / Mãe Adotante 1", placeholder: "Nome do primeiro responsável", req: true },
          { id: "f_resp2", label: "👤 Pai / Mãe Adotante 2 (Opcional)", placeholder: "Nome do segundo responsável" },
          { id: "f_tel_resp", label: "📞 Contato dos Responsáveis", placeholder: "Ex.: 555-0123 / 555-0456", isFull: true },
          { id: "f_conselho", label: "📋 Parecer do Conselho Tutelar", placeholder: "Laudo nº 104/CT - Favorável", isFull: true }
        ],
        dispositivo: "Diante dos laudos favoráveis apresentados pelo Conselho Tutelar e preenchidos todos os pressupostos legais de garantia integral da criança, JULGO PROCEDENTE o pedido para DEFERIR A ADOÇÃO PLENA em favor dos requerentes, destituindo em definitivo qualquer poder familiar originário anterior. Determino a lavratura de novo assento de nascimento no Livro A do Cartório com o patronímico dos adotantes, conferindo fé pública inalterável. Cumpra-se com prioridade absoluta.",
        exemplo: {
          f_adotado: "Gabriel Albuquerque Foster",
          f_id_adotado: "7012",
          f_resp1: "Roberto Foster",
          f_resp2: "Mariana Foster",
          f_tel_resp: "555-0199 / 555-0200",
          f_conselho: "Laudo Social Tutelar nº 2026/08 - Vistoria domiciliar apta e favorável sem restrições."
        }
      },
      {
        id: "porte",
        icon: "🔫",
        nome: "Despacho Autorizativo de Porte de Arma (PT 9mm)",
        desc: "Concessão judicial de porte de arma de fogo e munições após laudo psicotécnico hospitalar.",
        natureza: "Alvará Judicial de Porte de Arma de Fogo",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_cidadao", label: "👤 Requerente", placeholder: "Nome completo do cidadão", req: true },
          { id: "f_id", label: "🪪 Passaporte", placeholder: "Ex.: 1022", req: true },
          { id: "f_emprego", label: "💼 Atividade / Ocupação", placeholder: "Ex.: Empresário / Comerciante" },
          { id: "f_laudo", label: "🏥 Laudo Psicotécnico Hospitalar", placeholder: "Apto (Laudo Hospital Municipal nº 502)" },
          { id: "f_arma", label: "🔫 Armamento Homologado", placeholder: "1 Pistola PT 9mm (Nº Série: PT-90123)" },
          { id: "f_justificativa", label: "📝 Justificativa do Deferimento", placeholder: "Proteção patrimonial e transporte de valores...", isFull: true }
        ],
        dispositivo: "Constatada a idoneidade do requerente, a plena aprovação no exame psicotécnico realizado perante o Hospital Municipal e a fundamentação fática do risco profissional, DEFIRO A CONCESSÃO DO PORTE DE ARMA exclusiva para 1 Pistola PT 9mm e munições homologadas. Expeça-se a credencial e o alvará de porte com fé pública e validade perante todas as forças policiais do Estado de Brava RP. Cumpra-se.",
        exemplo: {
          f_cidadao: "Henrique Vasconcelos",
          f_id: "1022",
          f_emprego: "Diretor Comercial e Transporte de Cargas",
          f_laudo: "Apto e Homologado pelo Hospital Municipal de Brava (Dr. Roberto Silva)",
          f_arma: "Pistola PT 9mm (Série: PT-778841-B)",
          f_justificativa: "Atividade com manuseio diário de vultosos valores e deslocamentos interestaduais em áreas de risco."
        }
      },
      {
        id: "trocanome",
        icon: "📝",
        nome: "Sentença de Retificação de Registro Civil (Troca de Nome)",
        desc: "Autorização judicial para alteração de prenome ou sobrenome no assento de nascimento.",
        natureza: "Sentença de Retificação de Assento Civil",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_cidadao", label: "👤 Requerente", placeholder: "Nome atual", req: true },
          { id: "f_id", label: "🪪 Passaporte", placeholder: "Ex.: 4501", req: true },
          { id: "f_novo_nome", label: "✨ Novo Nome Civil Deferido", placeholder: "Nome pretendido retificado", req: true },
          { id: "f_termo", label: "📜 Assento / Livro Originário", placeholder: "Livro A-12, Fls. 45, Termo nº 890" },
          { id: "f_motivo", label: "📝 Justificativa Acolhida", placeholder: "Exposição vexatória / Adequação social e familiar...", isFull: true }
        ],
        dispositivo: "JULGO PROCEDENTE o pedido de retificação de registro civil formulado pelo requerente, reconhecendo o direito à alteração postulada por motivo juridicamente idôneo. Determino ao Oficial do Cartório do Registro Civil a imediata averbação da alteração, passando a constar oficialmente em todos os assentos públicos o novo nome civil deferido. Expeça-se mandado de averbação com fé pública. Cumpra-se.",
        exemplo: {
          f_cidadao: "Jonathan Pereira Santos",
          f_id: "4501",
          f_novo_nome: "John Carter Santos",
          f_termo: "Livro A-04, Folha 88, Termo 1022",
          f_motivo: "Adequação formal de identidade em virtude de notoriedade profissional consolidada no comércio."
        }
      },
      {
        id: "jovemaprendiz",
        icon: "🏢",
        nome: "Alvará Judicial para Menor Aprendiz (CNPJ)",
        desc: "Autorização judicial para contratação de menores após laudos de Bombeiros e Vigilância.",
        natureza: "Alvará Judicial da Infância e Juventude",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_empresa", label: "🏢 Razão Social / Empresa", placeholder: "Nome da empresa contratante", req: true },
          { id: "f_cnpj", label: "🔢 CNPJ da Empresa", placeholder: "Ex.: 12.345.678/0001-90", req: true },
          { id: "f_responsavel", label: "👤 Titular / Responsável pela Empresa", placeholder: "Nome do sócio-administrador" },
          { id: "f_vistorias", label: "🚒 Vistoria Bombeiros & Vigilância", placeholder: "Laudo Bombeiros nº 401 + Sanitária nº 110 (Aprovados)", req: true },
          { id: "f_menores", label: "👶 Menores Aprendizes Autorizados", placeholder: "Nomes, idades e horários de trabalho...", isFull: true }
        ],
        dispositivo: "Vistos os autos. Havendo parecer plenamente favorável do Conselho Tutelar da Comarca de Brava RP e laudos de vistoria técnica aprovados sem ressalvas pelo Corpo de Bombeiros e pela Vigilância Sanitária, CONCEDO O PRESENTE ALVARÁ JUDICIAL DE APRENDIZAGEM à empresa requerente, autorizando a contratação assistida dos menores qualificados, condicionado estritamente à compatibilidade com a frequência escolar e vedada qualquer atividade perigosa ou insalubre. Cumpra-se.",
        exemplo: {
          f_empresa: "Auto Mecânica & Peças Los Santos Ltda",
          f_cnpj: "44.890.123/0001-05",
          f_responsavel: "Fernando Matos (ID: 802)",
          f_vistorias: "Laudo CB-Brava nº 88/2026 e Vigilância Sanitária nº 2026/19 (Aprovados)",
          f_menores: "Enzo Gabriel (16 anos - Turno Matutino) e Felipe Ramos (17 anos - Turno Vespertino), com comprovantes de matrícula escolar anexados."
        }
      }
    ],

    decisoes: [
      {
        id: "sentenca_penal",
        icon: "⚖️",
        nome: "Sentença Penal Condenatória / Absolutória",
        desc: "Julgamento definitivo de mérito em ação penal pública com dosimetria da pena e multas.",
        natureza: "Sentença Penal Condenatória",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_processo", label: "📁 Nº do Processo", placeholder: "Ex.: 0001234-56.2026.8.26.0001", req: true },
          { id: "f_reu", label: "👤 Réu / Acusado", placeholder: "Nome completo do réu", req: true },
          { id: "f_reu_id", label: "🪪 Passaporte do Réu", placeholder: "Ex.: 1450" },
          { id: "f_resultado", label: "📋 Veredito do Juízo", placeholder: "Julgado Procedente / Condenado" },
          { id: "f_artigos", label: "⚖️ Artigos Infringidos (CP)", placeholder: "Ex.: Art. 3.2 (Roubo) c/c Art. 1.1", isFull: true },
          { id: "f_pena", label: "🔒 Dosimetria da Pena Fixada", placeholder: "Ex.: 60 meses de reclusão + Multa de R$ 30.000", isFull: true }
        ],
        dispositivo: "Ante o exposto e por tudo mais que dos autos consta, JULGO PROCEDENTE A AÇÃO PENAL para CONDENAR o réu como incurso nas sanções dos artigos penais citados. Fixo a pena privativa de liberdade definitiva e determino a expedição da guia de execução penal correspondente, intimando-se as partes e a defesa técnica. Custas na forma da lei. Cumpra-se.",
        exemplo: {
          f_processo: "0003410-12.2026.8.26.0001",
          f_reu: "Marcos Vinicius da Silva",
          f_reu_id: "1450",
          f_resultado: "PROCEDENTE (Condenação Penal)",
          f_artigos: "Art. 4.1 (Roubo Qualificado) e Art. 1.4 (Resistência à Prisão)",
          f_pena: "45 meses de reclusão em regime fechado na Penitenciária de Brava + R$ 25.000 em multas indenizatórias."
        }
      },
      {
        id: "sentenca_civel",
        icon: "📃",
        nome: "Sentença Cível de Indenização / Danos",
        desc: "Julgamento de controvérsia de direitos patrimoniais, colisão veicular ou quebra contratual.",
        natureza: "Sentença Cível de Mérito",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_processo", label: "📁 Nº do Processo", placeholder: "Ex.: 0004512-88.2026.8.26.0001", req: true },
          { id: "f_autor", label: "👤 Autor / Requerente", placeholder: "Nome do autor", req: true },
          { id: "f_reu", label: "👤 Réu / Requerido", placeholder: "Nome do réu", req: true },
          { id: "f_valor", label: "💰 Valor da Condenação", placeholder: "Ex.: R$ 80.000 a título de reparação", req: true },
          { id: "f_artigos", label: "⚖️ Base Legal (Código Civil)", placeholder: "Art. 66 e Art. 70 do Código Civil de Brava", isFull: true }
        ],
        dispositivo: "Diante dos elementos probatórios acostados aos autos, JULGO PROCEDENTE EM PARTE o pedido para condenar a parte requerida ao pagamento integral da indenização líquida por danos materiais decorrentes de conduta ilícita, acrescida de correção monetária. Fixo prazo de 48 horas para quitação espontânea, sob pena de penhora e bloqueio de bens. Cumpra-se.",
        exemplo: {
          f_processo: "0004512-88.2026.8.26.0001",
          f_autor: "Renato Diniz",
          f_reu: "Transportadora Rápido Brava",
          f_valor: "R$ 65.000 (Danos Materiais e Perda Total do Veículo)",
          f_artigos: "Art. 66 (Dever de Reparar) c/c Art. 70 (Responsabilidade em Danos Veiculares) do Código Civil"
        }
      },
      {
        id: "decisao_liminar",
        icon: "📜",
        nome: "Decisão Interlocutória & Concessão de Liminar",
        desc: "Tutela de urgência concedida inaudita altera parte com cominação de astreintes e prazo imediato.",
        natureza: "Decisão Interlocutória de Urgência",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_processo", label: "📁 Nº dos Autos", placeholder: "Ex.: 0007819-20.2026.8.26.0001", req: true },
          { id: "f_parte_favorecida", label: "👤 Parte Favorecida", placeholder: "Nome do requerente da tutela", req: true },
          { id: "f_parte_afetada", label: "👤 Parte Obrigada", placeholder: "Nome de quem deve cumprir a ordem", req: true },
          { id: "f_ordem", label: "⚡ Ordem Cautelar Determinada", placeholder: "Ex.: Bloqueio imediato do veículo / Abstenção de contato", isFull: true },
          { id: "f_multa", label: "⚠️ Multa por Descumprimento (Astreintes)", placeholder: "Ex.: R$ 10.000 por hora / dia de descumprimento", isFull: true }
        ],
        dispositivo: "Presentes a probabilidade do direito (fumus boni iuris) e o perigo de dano irreparável (periculum in mora), DEFIRO O PEDIDO LIMINAR DE URGÊNCIA inaudita altera parte, determinando o cumprimento imediato da ordem fixada, sob pena de crime de desobediência e aplicação da multa coercitiva diária ora cominada. Intime-se a autoridade competente e o obrigado com urgência máxima. Cumpra-se.",
        exemplo: {
          f_processo: "0007819-20.2026.8.26.0001",
          f_parte_favorecida: "Clínica São Camilo",
          f_parte_afetada: "Empresa de Segurança Bravo",
          f_ordem: "Restituição imediata dos equipamentos médicos retidos indevidamente nas dependências do depósito.",
          f_multa: "R$ 15.000 por dia de atraso no cumprimento, sem prejuízo de busca e apreensão forçada."
        }
      },
      {
        id: "soltura",
        icon: "🔓",
        nome: "Alvará de Soltura Judicial Imediata",
        desc: "Ordem solene e expressa ordenando a desinternação ou libertação imediata de custodiado.",
        natureza: "Alvará de Soltura Judicial Imediata",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_cidadao", label: "👤 Paciente / Preso", placeholder: "Nome completo do custodiado", req: true },
          { id: "f_id", label: "🪪 Passaporte", placeholder: "Ex.: 3310", req: true },
          { id: "f_estabelecimento", label: "🏢 Estabelecimento Prisional", placeholder: "Penitenciária Estadual de Brava / Delegacia" },
          { id: "f_fundamento", label: "⚖️ Fundamento Legal da Soltura", placeholder: "Revogação de Preventiva / Concessão de Habeas Corpus nº 12" },
          { id: "f_condicoes", label: "📋 Medidas Cautelares Fixadas", placeholder: "Comparecimento mensal em juízo / Sem fiança", isFull: true }
        ],
        dispositivo: "MANDA o MM. Juiz de Direito que, vendo este seu alvará, PONHA IMEDIATAMENTE EM LIBERDADE o cidadão retro qualificado, se por outro motivo não estiver preso, em razão da revogação da prisão preventiva decretada nestes autos. Serve o presente documento como ordem judicial de eficácia imediata perante a direção do estabelecimento prisional. CUMPRA-SE COM URGÊNCIA.",
        exemplo: {
          f_cidadao: "Rodrigo Mendonça",
          f_id: "3310",
          f_estabelecimento: "Complexo Penitenciário de Segurança de Brava RP",
          f_fundamento: "Concessão de Habeas Corpus Liminar por Ausência de Justa Causa e Primariedade Comprovada",
          f_condicoes: "Comparecimento obrigatório a todos os atos instrutórios da ação penal e proibição de ausentar-se da comarca sem autorização prévia."
        }
      }
    ],

    mandados: [
      {
        id: "mandado_prisao",
        icon: "⛓️",
        nome: "Mandado de Prisão Judicial",
        desc: "Ordem formal de captura e custódia para cumprimento de prisão preventiva ou temporária.",
        natureza: "Mandado de Prisão Judicial",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_alvo", label: "👤 Alvo / Acusado", placeholder: "Nome do foragido / réu", req: true },
          { id: "f_alvo_id", label: "🪪 Passaporte do Alvo", placeholder: "Ex.: 6701", req: true },
          { id: "f_especie", label: "🔒 Espécie de Prisão", placeholder: "Prisão Preventiva (Garantia da Ordem Pública)" },
          { id: "f_artigos", label: "⚖️ Crimes Imputados", placeholder: "Ex.: Art. 2.4 (Tráfico de Armas) e Art. 3.1", isFull: true },
          { id: "f_destino", label: "🏢 Estabelecimento de Destino", placeholder: "Carceragem Policial / Penitenciária de Brava", isFull: true }
        ],
        dispositivo: "MANDA a qualquer Oficial de Justiça de sua jurisdição ou às autoridades policiais e seus agentes que PRENDAM E RECOLHAM à prisão competente a pessoa qualificada, em virtude de ordem judicial formal de prisão preventiva devidamente fundamentada nos autos. A autoridade executora deverá zelar pela integridade física do preso e apresentá-lo sem demora à autoridade judiciária competente. CUMPRA-SE.",
        exemplo: {
          f_alvo: "Felipe 'Sombra' Cardoso",
          f_alvo_id: "6701",
          f_especie: "Prisão Preventiva com Risco de Fuga",
          f_artigos: "Art. 2.4 (Tráfico Ilícito de Armas de Fogo de Uso Restrito) c/c Art. 1.2 (Organização Criminosa)",
          f_destino: "Complexo Penitenciário de Segurança Máxima de Brava RP"
        }
      },
      {
        id: "busca_apreensao",
        icon: "🔍",
        nome: "Mandado de Busca e Apreensão",
        desc: "Autorização judicial de ingresso forçado em endereço para apreensão de objetos, armas e veículos.",
        natureza: "Mandado de Busca e Apreensão Domiciliar",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_endereco", label: "📍 Endereço / Local da Diligência", placeholder: "Rua, Número, Bairro ou Coordenadas", req: true, isFull: true },
          { id: "f_morador", label: "👤 Morador / Investigado", placeholder: "Nome do proprietário / investigado" },
          { id: "f_id_morador", label: "🪪 Passaporte do Morador", placeholder: "Ex.: 9042" },
          { id: "f_objetos", label: "📦 Objetos a Serem Apreendidos", placeholder: "Armamentos pesados, munições, equipamentos ilegais, veículos e documentos...", isFull: true },
          { id: "f_regras", label: "🛡️ Autorizações Especiais", placeholder: "Autorizado arrombamento moderado e reforço policial se necessário", isFull: true }
        ],
        dispositivo: "MANDA a qualquer autoridade policial competente que, acompanhada das testemunhas necessárias, PROCEDA À BUSCA E APREENSÃO no local indicado, arrecadando os objetos e instrumentos descritos, lavrando-se o auto circunstanciado de apreensão no ato. Fica autorizado o arrombamento moderado e o emprego proporcional da força estritamente indispensável em caso de resistência. CUMPRA-SE NA FORMA DA LEI.",
        exemplo: {
          f_endereco: "Galpão Industrial nº 14, Docas Portuárias de Brava RP",
          f_morador: "Investigação Operação Chumbo Frio (Alvo: Logística Sul)",
          f_id_morador: "Desconhecido / Em averiguação",
          f_objetos: "Armamentos de grosso calibre, coletes balísticos sem homologação, celulares e livros contábeis.",
          f_regras: "Autorizado o cumprimento com apoio tático especializado da Polícia Civil e arrombamento técnico."
        }
      },
      {
        id: "quebra_sigilo",
        icon: "🔐",
        nome: "Autorização de Quebra de Sigilo & Interceptação",
        desc: "Decisão cautelar sigilosa autorizando quebra de dados telemáticos e registros telefônicos.",
        natureza: "Decisão Judicial de Quebra de Sigilo Telemático",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_alvo", label: "👤 Alvo da Investigação", placeholder: "Nome ou alcunha do investigado", req: true },
          { id: "f_passaporte", label: "🪪 Passaporte", placeholder: "Ex.: 5081" },
          { id: "f_linhas", label: "📞 Linhas / Dispositivos / Contas", placeholder: "Números telefônicos ou contas bancárias...", req: true },
          { id: "f_autoridade", label: "🛡️ Autoridade Requisitante", placeholder: "Delegacia de Investigações Gerais / Ministério Público", req: true },
          { id: "f_prazo", label: "⏳ Prazo da Medida", placeholder: "15 dias prorrogáveis", isFull: true }
        ],
        dispositivo: "Demonstrada a imprescindibilidade da medida para a instrução da investigação penal e inexistindo outro meio probatório idôneo, DEFIRO O PEDIDO DE QUEBRA DE SIGILO e interceptação técnica das comunicações pelo prazo legal, sob estrito segredo de justiça. Oficiem-se as operadoras e instituições para fornecimento imediato dos relatórios cadastrais e registros de conexões. Cumpra-se em caráter sigiloso.",
        exemplo: {
          f_alvo: "Vinicius 'Tigre' Albuquerque",
          f_alvo_id: "5081",
          f_linhas: "Linhas telefônicas 555-0811 e 555-0812; extratos bancários da conta nº 880-9.",
          f_autoridade: "Departamento de Combate a Fraudes do Ministério Público",
          f_prazo: "Prazo de 15 (quinze) dias úteis com elaboração de relatório pericial de inteligência."
        }
      },
      {
        id: "intimacao_coercitiva",
        icon: "📢",
        nome: "Mandado de Intimação com Condução Coercitiva",
        desc: "Intimação sob advertência expressa de condução coercitiva em caso de ausência injustificada.",
        natureza: "Mandado de Intimação com Condução Coercitiva",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_intimado", label: "👤 Intimado(a)", placeholder: "Nome completo da testemunha ou réu", req: true },
          { id: "f_id", label: "🪪 Passaporte", placeholder: "Ex.: 2109", req: true },
          { id: "f_data_hora", label: "📅 Data e Horário da Audiência", placeholder: "Ex.: 25/10/2026 às 19:30h", req: true },
          { id: "f_sala", label: "🏛️ Sala de Audiência / Fórum", placeholder: "Sala Principal do Tribunal de Justiça" },
          { id: "f_advertencia", label: "⚠️ Advertência Legal", placeholder: "Sob pena de condução coercitiva imediata e crime de desobediência", isFull: true }
        ],
        dispositivo: "MANDA o MM. Juiz de Direito ao Oficial de Justiça que INTIME a pessoa qualificada para comparecer no dia, horário e local designados para prestar depoimento essencial à instrução do feito, ADVERTINDO-A expressamente de que o não comparecimento injustificado implicará na expedição imediata de ordem de condução coercitiva pelas forças policiais, sem prejuízo de responsabilidade por desobediência. Cumpra-se.",
        exemplo: {
          f_intimado: "Erika Schneider",
          f_id: "2109",
          f_data_hora: "28/10/2026 às 20:00h",
          f_sala: "Plenário 1 do Tribunal de Justiça de Brava",
          f_advertencia: "Fica a intimada advertida de que o comparecimento é dever da cidadania, sob pena de condução coercitiva por força policial."
        }
      }
    ],

    avulso: [
      {
        id: "despacho_livre",
        icon: "📜",
        nome: "Despacho Judicial Ordinatório & Certificação",
        desc: "Redação livre de decisões judiciais, concessão de prazos e certidões com fé pública.",
        natureza: "Despacho Judicial Ordinatório",
        webhook: WEBHOOK_GABINETE,
        fields: [
          { id: "f_processo", label: "📁 Autos / Protocolo", placeholder: "Ex.: Autos nº 2026/880 ou Petição Geral", req: true },
          { id: "f_interessado", label: "👤 Interessado / Partes", placeholder: "Nome das partes envolvidas", req: true },
          { id: "f_assunto", label: "🏷️ Assunto / Matéria", placeholder: "Ex.: Concessão de Prazo / Deferimento de Gratuidade", req: true },
          { id: "f_prazo", label: "⏳ Prazo Fixado", placeholder: "Ex.: 24 horas / 48 horas / 5 dias" }
        ],
        dispositivo: "1. Vistos em gabinete. 2. Acolho o requerimento formulado para determinar a intimação da parte adversa a fim de manifestar-se no prazo assinalado. 3. Não havendo oposição justificada, proceda-se às diligências necessárias para regular tramitação do feito. 4. Intimem-se e cumpra-se com as cautelas de praxe.",
        exemplo: {
          f_processo: "Autos de Diligência nº 2026/104",
          f_interessado: "Sindicato dos Comerciantes & Ministério Público",
          f_assunto: "Ajuste de Conduta e Regularização de Licenças",
          f_prazo: "Prazo de 72 (setenta e duas) horas para manifestação"
        }
      }
    ]
  };

  /* ==========================================================
     ESTADO E RENDERIZAÇÃO DA INTERFACE DO GABINETE
     ========================================================== */
  let currentCategory = "sdj";
  let currentActId = "limpeza";

  function aplicarCredencialDoPerfil(profile) {
    if (!profile) profile = activeProfile;
    $("#mag_nome").value = profile.nome;
    $("#mag_cargo").value = profile.cargo;
    $("#mag_matricula").value = profile.matricula;
    $("#mag_vara").value = profile.vara;
    $("#mag_assinatura_tipo").value = profile.assinaturaTipo;

    atualizarLabelSessao();
    atualizarRubricaPreview(profile.nome, profile.assinaturaTipo);
  }

  function atualizarRubricaPreview(nome, tipo) {
    try {
      if (window.SDJ_PDF && window.SDJ_PDF.gerarAssinaturaCanvas) {
        const n = nome || $("#mag_nome")?.value || activeProfile.nome;
        const t = tipo || $("#mag_assinatura_tipo")?.value || activeProfile.assinaturaTipo;
        const url = window.SDJ_PDF.gerarAssinaturaCanvas(n, { tipo: t });
        const img = $("#img-rubrica-preview");
        if (img && url) {
          img.src = url;
          const label = $("#label-rubrica-preview");
          if (label) {
            label.textContent = `Rubrica Oficial · ${n} (${activeProfile.cargoCurto})`;
          }
        }
      }
    } catch (e) {
      console.warn("Falha ao gerar preview da rubrica:", e);
    }
  }

  function salvarCredencialAtual() {
    atualizarLabelSessao();
    atualizarRubricaPreview($("#mag_nome").value, $("#mag_assinatura_tipo").value);
  }

  function atualizarLabelSessao() {
    const cargo = $("#mag_cargo")?.value || activeProfile.cargo;
    const nome = $("#mag_nome")?.value || activeProfile.nome;
    const label = $("#label-sessao-cargo");
    if (label) {
      label.textContent = `Sessão Autenticada · ${cargo} (${nome} · ${activeProfile.inscricao})`;
    }
  }

  // Listener para salvar alterações de credencial e atualizar rubrica
  ["mag_nome", "mag_cargo", "mag_matricula", "mag_vara", "mag_assinatura_tipo"].forEach(id => {
    $(`#${id}`)?.addEventListener("change", salvarCredencialAtual);
    $(`#${id}`)?.addEventListener("input", salvarCredencialAtual);
  });

  function atualizarDataHoraGabinete() {
    const el = $("#gabinete-data-hora");
    if (el) {
      const agora = new Date();
      el.textContent = agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).toUpperCase();
    }
  }

  function renderCurrentCategory() {
    // Atualiza botões de categoria
    $$(".gabinete-cat-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cat === currentCategory);
    });

    const acts = ATOS_MAGISTRATURA[currentCategory] || [];
    const container = $("#gabinete-acts-container");

    container.innerHTML = acts.map(act => `
      <div class="gabinete-act-card ${act.id === currentActId ? "active" : ""}" data-act="${act.id}">
        <strong>${act.icon} ${act.nome}</strong>
        <span>${act.desc}</span>
      </div>
    `).join("");

    $$(".gabinete-act-card").forEach(card => {
      card.addEventListener("click", () => {
        currentActId = card.dataset.act;
        $$(".gabinete-act-card").forEach(c => c.classList.toggle("active", c === card));
        renderActForm();
      });
    });

    // Se o currentActId não estiver na categoria, seleciona o primeiro
    if (!acts.some(a => a.id === currentActId) && acts.length > 0) {
      currentActId = acts[0].id;
    }
    renderActForm();
  }

  function renderActForm() {
    const acts = ATOS_MAGISTRATURA[currentCategory] || [];
    const act = acts.find(a => a.id === currentActId) || acts[0];
    if (!act) return;

    $("#form-act-title").innerHTML = `${act.icon} ${act.nome}`;
    $("#form-act-desc").textContent = act.desc;

    // Campos
    const container = $("#gabinete-fields-container");
    container.innerHTML = act.fields.map(f => `
      <label class="${f.isFull ? "full" : ""}">
        <span>${f.label} ${f.req ? '<b style="color:#ef4444;">*</b>' : ""}</span>
        <input id="${f.id}" type="text" placeholder="${f.placeholder || "Preencha..."}" />
      </label>
    `).join("");

    // Dispositivo
    $("#act_dispositivo").value = act.dispositivo || "";

    // Hash aleatório para o preview
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    $("#act-hash-preview").textContent = `CHAVE: TJ-BRAVA-${new Date().getFullYear()}-${randomHex}`;
  }

  // Preencher Exemplo Real
  const btnFillModel = $("#btn-fill-model");
  if (btnFillModel) {
    btnFillModel.addEventListener("click", () => {
      const acts = ATOS_MAGISTRATURA[currentCategory] || [];
      const act = acts.find(a => a.id === currentActId);
      if (!act || !act.exemplo) return;

      Object.entries(act.exemplo).forEach(([fid, val]) => {
        const inp = $(`#${fid}`);
        if (inp) inp.value = val;
      });
      toast("✓ Modelo padrão carregado.");
    });
  }

  // Limpar formulário
  const btnLimparAto = $("#btn-limpar-ato");
  if (btnLimparAto) {
    btnLimparAto.addEventListener("click", () => {
      const acts = ATOS_MAGISTRATURA[currentCategory] || [];
      const act = acts.find(a => a.id === currentActId);
      if (act) {
        act.fields.forEach(f => {
          const inp = $(`#${f.id}`);
          if (inp) inp.value = "";
        });
        $("#act_dispositivo").value = act.dispositivo || "";
        toast("Formulário limpo.");
      }
    });
  }

  // Mudança de Categoria
  $$(".gabinete-cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      const acts = ATOS_MAGISTRATURA[currentCategory] || [];
      if (acts.length > 0) currentActId = acts[0].id;
      renderCurrentCategory();
    });
  });

  /* ==========================================================
     GERAÇÃO DE PDF CHANCELADO DO GABINETE
     ========================================================== */
  async function buildGabinetePDFData() {
    const acts = ATOS_MAGISTRATURA[currentCategory] || [];
    const act = acts.find(a => a.id === currentActId);
    if (!act) throw new Error("Ato judicial não identificado.");

    if (!window.SDJ_PDF || !window.SDJ_PDF.generateTribunalPDF) {
      throw new Error("Módulo de PDF do Tribunal não encontrado.");
    }

    const magNome = $("#mag_nome").value.trim() || activeProfile.nome;
    const magCargo = $("#mag_cargo").value || activeProfile.cargo;
    const magMatricula = $("#mag_matricula").value || activeProfile.matricula;
    const magVara = $("#mag_vara").value || activeProfile.vara;
    const magAssinaturaTipo = $("#mag_assinatura_tipo")?.value || activeProfile.assinaturaTipo;
    const dispositivo = $("#act_dispositivo").value.trim();

    const fields = act.fields.map(f => {
      const val = $(`#${f.id}`)?.value || "Não informado";
      return {
        label: f.label.replace(/^[^a-zA-Z0-9À-ÿ]+/u, "").trim(),
        value: val,
        isFull: !!f.isFull
      };
    });

    // Adiciona informações da Unidade e Titularidade
    fields.push({ label: "Vara / Órgão Jurisdicional", value: magVara, isFull: true });
    fields.push({ label: "Magistrado Subscritor", value: `${magNome} (${magCargo})` });
    fields.push({ label: "Matrícula Funcional", value: magMatricula });

    return await window.SDJ_PDF.generateTribunalPDF({
      titulo: act.nome.replace(/^[^a-zA-Z0-9À-ÿ]+/u, "").trim().toUpperCase(),
      natureza: act.natureza,
      fields,
      termo: dispositivo,
      agente: magNome,
      agenteId: magMatricula,
      cargo: magCargo,
      assinaturaTipo: magAssinaturaTipo,
      cidade: "Brava RP",
      secaoDados: "Autos e Qualificação das Partes"
    });
  }

  // Baixar PDF
  const btnPdfGabinete = $("#btn-pdf-gabinete");
  if (btnPdfGabinete) {
    btnPdfGabinete.addEventListener("click", async () => {
      try {
        toast("Gerando PDF Oficial Chancelado...");
        const pdfData = await buildGabinetePDFData();
        pdfData.doc.save(pdfData.filename);
        toast("✓ PDF baixado com sucesso!");
      } catch (err) {
        console.error(err);
        toast("Erro ao gerar PDF: " + err.message, true);
      }
    });
  }

  /* ==========================================================
     ENVIO AO DISCORD COM EMBED SOLENE DE MAGISTRATURA
     ========================================================== */
  const btnDispatch = $("#btn-dispatch-gabinete");
  if (btnDispatch) {
    btnDispatch.addEventListener("click", async () => {
      const acts = ATOS_MAGISTRATURA[currentCategory] || [];
      const act = acts.find(a => a.id === currentActId);
      if (!act) return;

      const magNome = $("#mag_nome").value.trim() || activeProfile.nome;
      const magCargo = $("#mag_cargo").value || activeProfile.cargo;
      const magMatricula = $("#mag_matricula").value || activeProfile.matricula;
      const dispositivo = $("#act_dispositivo").value.trim();

      const originalText = btnDispatch.innerHTML;
      btnDispatch.disabled = true;
      btnDispatch.innerHTML = "<span>Chancelando e Publicando...</span>";

      try {
        toast("Gerando ato chancelado...");
        const pdfData = await buildGabinetePDFData();

        const embedFields = act.fields.slice(0, 6).map(f => {
          const val = $(`#${f.id}`)?.value || "Não informado";
          return {
            name: f.label.replace(/^[^a-zA-Z0-9À-ÿ]+/u, "").trim(),
            value: `**${val}**`,
            inline: !f.isFull
          };
        });

        // Adiciona identificação do juiz
        embedFields.push({
          name: `${activeProfile.badgeIcon} Magistrado(a) Subscritor(a)`,
          value: `**${magNome}**\n*${magCargo} · ${magMatricula}*`,
          inline: true
        });
        embedFields.push({
          name: "⚖️ Natureza Jurídica",
          value: `**${act.natureza}**`,
          inline: true
        });

        let embedColor = 0x7c3aed;
        if (activeProfile.key === "zaith") embedColor = 0xd4af37;
        else if (activeProfile.key === "mike") embedColor = 0x0284c7;
        else if (activeProfile.key === "manu") embedColor = 0xdb2777;

        const embed = {
          title: `⚖️ [ATO JUDICIAL CHANCELADO] · ${act.nome.toUpperCase()}`,
          color: embedColor,
          fields: embedFields,
          description: `📜 **Dispositivo e Ordem Judicial:**\n\`\`\`\n${dispositivo.length > 500 ? dispositivo.substring(0, 500) + "..." : dispositivo}\n\`\`\``,
          footer: {
            text: `Poder Judiciário · Comarca de Brava RP • Gabinete do Magistrado (${magMatricula})`
          },
          timestamp: new Date().toISOString()
        };

        const payload = {
          content: `⚖️ **[GABINETE DOS MAGISTRADOS · PUBLICAÇÃO OFICIAL]**\nO(A) **${magCargo} ${magNome}** (${magMatricula}), no exercício regular de sua jurisdição perante o Tribunal de Justiça e SDJ de Brava RP, expediu e chancelou o ato: **${act.nome}**.\n📄 *Decisão irretratável com força judicial plena. Documento com fé pública anexo em PDF.*`,
          embeds: [embed]
        };

        const formData = new FormData();
        formData.append("payload_json", JSON.stringify(payload));
        if (pdfData && pdfData.blob) {
          formData.append("files[0]", pdfData.blob, pdfData.filename);
        }

        const targetWebhook = act.webhook || WEBHOOK_GABINETE;
        const res = await fetch(targetWebhook, {
          method: "POST",
          body: formData
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        toast("✓ Ato judicial chancelado e publicado no Discord com sucesso!");
      } catch (err) {
        console.error(err);
        toast("Erro ao despachar ato: " + err.message, true);
      } finally {
        btnDispatch.disabled = false;
        btnDispatch.innerHTML = originalText;
      }
    });
  }

  /* ==========================================================
     INICIALIZAÇÃO AO CARREGAR A PÁGINA
     ========================================================== */
  window.addEventListener("DOMContentLoaded", () => {
    // Configura o texto de status do PIN
    atualizarStatusMsgDefault();

    // Verifica se já está autenticado nesta sessão do navegador
    if (sessionStorage.getItem(STORAGE_AUTH_KEY) === "true") {
      const savedKey = sessionStorage.getItem(STORAGE_ACTIVE_PROFILE) || "zaith";
      unlockGabinete(PERFIS_MAGISTRATURA[savedKey] || PERFIS_MAGISTRATURA.zaith);
    } else {
      lockscreenView.style.display = "flex";
      gabineteView.classList.remove("unlocked");
      $("#topbar-magistrado-badge")?.classList.add("hidden");
      btnTrocarMagistrado?.classList.add("hidden");
      btnTrocarPin.classList.add("hidden");
      btnBloquear.classList.add("hidden");
    }
  });

})();
