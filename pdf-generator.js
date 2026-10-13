/* ==========================================================
   SISTEMA DO DEPARTAMENTO JURÍDICO — BRAVA RP
   Módulo Oficial de Emissão de Documentos e Certidões em PDF
   Utiliza jsPDF para gerar documentos jurídicos autênticos
   ========================================================== */

(function () {
  let cachedLogo = null;

  function getLogoDataUrl() {
    if (cachedLogo) return Promise.resolve(cachedLogo);
    if (typeof window === "undefined" || typeof document === "undefined" || typeof Image === "undefined") return Promise.resolve(null);
    return new Promise((resolve) => {
      let settled = false;
      const done = (val) => {
        if (settled) return;
        settled = true;
        resolve(val);
      };
      // Timeout de segurança (1.2s máx)
      setTimeout(() => done(null), 1200);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || 300;
          canvas.height = img.naturalHeight || 300;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          cachedLogo = canvas.toDataURL("image/png");
          done(cachedLogo);
        } catch (e) {
          console.warn("Não foi possível converter o logo para DataURL:", e);
          done(null);
        }
      };
      img.onerror = () => done(null);
      img.src = "arte.png";
    });
  }

  // Gera um protocolo único baseado na data e código aleatório
  function gerarProtocolo() {
    const d = new Date();
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    const rand = Math.random().toString(16).substring(2, 8).toUpperCase();
    return `SDJ-${ano}${mes}${dia}-${rand}`;
  }

  // Gera um hash de validação digital para o carimbo
  function gerarHashAutenticidade() {
    const h = () => Math.random().toString(16).substring(2, 6).toUpperCase();
    return `${h()}-${h()}-${h()}-${h()}`;
  }

  // Desenha a moldura oficial, cabeçalho e rodapé em qualquer página
  function desenharEstruturaBase(doc, logoData, tituloDocumento, protocolo, dataHora, cidade) {
    const pageWidth = 210;
    const pageHeight = 297;

    // Cores oficiais
    const ORO = [212, 175, 55];       // Dourado #d4af37
    const ORO_ESCURO = [160, 125, 30];
    const AZUL_NOITE = [18, 24, 38];   // Deep Navy / Slate
    const CINZA_BORDA = [200, 205, 215];
    const CINZA_FUNDO = [248, 249, 251];
    const TEXTO_ESCURO = [25, 30, 42];
    const TEXTO_MUTED = [105, 112, 125];

    // 1. Moldura Externa Dupla
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.8);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.25);
    doc.rect(9.5, 9.5, pageWidth - 19, pageHeight - 19);

    // Cantoneiras decorativas nos 4 cantos
    const corners = [
      [8, 8], [pageWidth - 8, 8],
      [8, pageHeight - 8], [pageWidth - 8, pageHeight - 8]
    ];
    doc.setFillColor(...ORO);
    corners.forEach(([cx, cy]) => {
      doc.circle(cx, cy, 1.2, "F");
    });

    // 2. Cabeçalho Oficial com Brasão
    if (logoData) {
      try {
        doc.addImage(logoData, "PNG", 14, 13, 24, 24);
      } catch (err) {
        console.warn("Erro ao renderizar logo no PDF:", err);
      }
    }

    // Textos do Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("ESTADO DE BRAVA  •  PODER JUDICIÁRIO", 42, 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA", 42, 24);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(60, 68, 85);
    doc.text("SISTEMA DO DEPARTAMENTO JURÍDICO", 42, 29);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text(`Cartório Notarial, Registro Civil e Varas Penais  •  ${cidade || "Brava RP"}`, 42, 34);

    // Linha divisória do cabeçalho
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.6);
    doc.line(14, 39, pageWidth - 14, 39);
    doc.setDrawColor(...CINZA_BORDA);
    doc.setLineWidth(0.2);
    doc.line(14, 40, pageWidth - 14, 40);

    // 3. Faixa de Título do Documento
    const bannerY = 43;
    const bannerH = 11;
    doc.setFillColor(...AZUL_NOITE);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, bannerY, pageWidth - 28, bannerH, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(tituloDocumento.toUpperCase(), pageWidth / 2, bannerY + 7.5, { align: "center" });

    // 4. Barra de Metadados / Protocolo
    const metaY = 57;
    const metaH = 8;
    doc.setFillColor(...CINZA_FUNDO);
    doc.setDrawColor(...CINZA_BORDA);
    doc.setLineWidth(0.2);
    doc.roundedRect(14, metaY, pageWidth - 28, metaH, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("PROTOCOLO:", 18, metaY + 5.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(protocolo, 37, metaY + 5.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("EXPEDIÇÃO:", 100, metaY + 5.2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text(dataHora, 118, metaY + 5.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("VALIDADE:", 165, metaY + 5.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(30, 130, 60); // verde oficial
    doc.text("OFICIAL / ATIVA", 181, metaY + 5.2);

    return 69; // Próximo Y livre para o conteúdo
  }

  // Desenha o rodapé padrão com termo de fé pública, assinaturas e selo digital
  function desenharRodape(doc, agenteNome, agenteId, cargoAgente) {
    const pageWidth = 210;
    const baseY = 240;

    const ORO = [212, 175, 55];
    const AZUL_NOITE = [18, 24, 38];
    const TEXTO_MUTED = [105, 112, 125];

    // Texto de Fé Pública
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.8);
    doc.setTextColor(...TEXTO_MUTED);
    const termo = "Certifico e dou fé que o presente documento é autêntico, foi lavrado eletronicamente perante o Sistema do Departamento Jurídico de Brava RP e possui validade jurídica em todo o território nacional.";
    doc.text(termo, pageWidth / 2, baseY - 4, { align: "center", maxWidth: 175 });

    // Coluna Esquerda: Assinatura do Agente / Oficial
    const sigX = 22;
    const sigW = 90;
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.3);
    doc.line(sigX, baseY + 18, sigX + sigW, baseY + 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(agenteNome && agenteNome !== "—" ? agenteNome.toUpperCase() : "AGENTE NÃO IDENTIFICADO", sigX + (sigW / 2), baseY + 22.5, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text(`Passaporte / ID: ${agenteId || "—"}  •  ${cargoAgente || "Oficial Responsável"}`, sigX + (sigW / 2), baseY + 26.5, { align: "center" });

    // Coluna Direita: Selo de Autenticidade Digital
    const stampX = 126;
    const stampY = baseY + 4;
    const stampW = 68;
    const stampH = 26;

    doc.setFillColor(252, 251, 246);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.5);
    doc.roundedRect(stampX, stampY, stampW, stampH, 2, 2, "FD");

    // Borda interna pontilhada
    doc.setDrawColor(220, 200, 140);
    doc.setLineWidth(0.2);
    doc.rect(stampX + 1.2, stampY + 1.2, stampW - 2.4, stampH - 2.4);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...ORO);
    doc.text("★  SELO DE AUTENTICIDADE DIGITAL  ★", stampX + (stampW / 2), stampY + 5.5, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("DOCUMENTO OFICIAL REGISTRADO", stampX + (stampW / 2), stampY + 10.5, { align: "center" });

    doc.setFont("courier", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(70, 75, 90);
    doc.text(`HASH: ${gerarHashAutenticidade()}`, stampX + (stampW / 2), stampY + 16, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("Validação em tempo real via Sistema SDJ", stampX + (stampW / 2), stampY + 20.5, { align: "center" });
    doc.text("Impresso em papel de segurança digital", stampX + (stampW / 2), stampY + 23.5, { align: "center" });

    // Linha inferior absoluta de rodapé
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("Tribunal de Justiça de Brava RP  •  Departamento Jurídico  •  Página 1 de 1", pageWidth / 2, 288, { align: "center" });
  }

  // Desenha uma seção com barra decorativa dourada
  function desenharCabecalhoSecao(doc, y, titulo) {
    const pageWidth = 210;
    const ORO = [212, 175, 55];
    const AZUL_NOITE = [18, 24, 38];

    doc.setFillColor(242, 244, 248);
    doc.rect(14, y, pageWidth - 28, 6.5, "F");

    // Indicador vertical dourado
    doc.setFillColor(...ORO);
    doc.rect(14, y, 2.5, 6.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(titulo.toUpperCase(), 20, y + 4.6);

    return y + 9.5;
  }

  function getJsPDF() {
    return (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || (typeof jsPDF !== "undefined" ? jsPDF : null);
  }

  /* ==========================================================
     1. GERAÇÃO DE PDF PARA SERVIÇOS DIVERSOS
        (Certidão de Nascimento, Adoção, Troca de Nome, etc.)
     ========================================================== */
  async function generateServicePDF(opts) {
    const jsPDF = getJsPDF();
    if (!jsPDF) throw new Error("Biblioteca jsPDF não encontrada.");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const logoData = await getLogoDataUrl();

    const dataHora = new Date().toLocaleString("pt-BR");
    const protocolo = gerarProtocolo();
    const titulo = opts.service.title || "Certidão Oficial";
    const cidade = opts.cidade || (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    // Desenha cabeçalho e estrutura
    let curY = desenharEstruturaBase(doc, logoData, titulo, protocolo, dataHora, cidade);

    // Seção Principal: Informações Registradas
    curY = desenharCabecalhoSecao(doc, curY, "Dados e Declarações Oficiais do Registro");

    const pageWidth = 210;
    const boxW = pageWidth - 28;
    const fields = opts.fields || [];

    // Renderiza cada campo em blocos organizados
    fields.forEach((f, idx) => {
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 250, isEven ? 255 : 251, isEven ? 255 : 253);
      doc.setDrawColor(225, 230, 240);
      doc.setLineWidth(0.2);
      doc.rect(14, curY, boxW, 11, "FD");

      // Rótulo
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(115, 122, 138);
      doc.text(f.label.toUpperCase(), 18, curY + 4.2);

      // Valor
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(20, 26, 38);
      const valText = f.value && f.value !== "—" ? String(f.value) : "NÃO INFORMADO";
      doc.text(valText, 18, curY + 8.5);

      curY += 11;
    });

    curY += 4;

    // Seção do Responsável pelo Registro
    curY = desenharCabecalhoSecao(doc, curY, "Agente Registrador Responsável");

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 230, 240);
    doc.setLineWidth(0.2);
    doc.rect(14, curY, boxW, 13, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(115, 122, 138);
    doc.text("NOME DO OFICIAL / AGENTE:", 18, curY + 5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 26, 38);
    doc.text(opts.agente || "—", 18, curY + 10);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(115, 122, 138);
    doc.text("PASSAPORTE / MATRÍCULA:", 115, curY + 5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(20, 26, 38);
    doc.text(opts.agenteId || "—", 115, curY + 10);

    // Rodapé Oficial
    desenharRodape(doc, opts.agente, opts.agenteId, "Oficial do Cartório");

    const safeTitle = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `${safeTitle}_${protocolo}.pdf`;
    const blob = doc.output("blob");

    return { doc, blob, filename, protocolo };
  }

  /* ==========================================================
     2. GERAÇÃO DE PDF PARA A CALCULADORA PENAL
        (Certidão de Sentença Penal e Relatório Judicial)
     ========================================================== */
  async function generatePenalPDF(opts) {
    const jsPDF = getJsPDF();
    if (!jsPDF) throw new Error("Biblioteca jsPDF não encontrada.");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const logoData = await getLogoDataUrl();

    const dataHora = new Date().toLocaleString("pt-BR");
    const protocolo = gerarProtocolo();
    const titulo = "Certidão de Sentença Penal";
    const cidade = opts.cidade || (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    let curY = desenharEstruturaBase(doc, logoData, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;
    const ORO = [212, 175, 55];
    const AZUL_NOITE = [18, 24, 38];

    // 1. Qualificação das Partes (Acusado, Advogado, Policial)
    curY = desenharCabecalhoSecao(doc, curY, "1. Qualificação dos Envolvidos e Condições Processuais");

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 230, 240);
    doc.setLineWidth(0.2);
    doc.rect(14, curY, boxW, 22, "FD");

    // Linha 1: Acusado e Antecedentes
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("NOME DO ACUSADO:", 18, curY + 4.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 26, 38);
    doc.text(opts.nome || "—", 18, curY + 9);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("ID / PASSAPORTE:", 85, curY + 4.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 26, 38);
    doc.text(opts.id || "—", 85, curY + 9);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("ANTECEDENTES:", 140, curY + 4.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(opts.primario ? 30 : 180, opts.primario ? 120 : 40, opts.primario ? 50 : 40);
    doc.text(opts.primario ? "RÉU PRIMÁRIO (-25% FIANÇA)" : "REINCIDENTE (SEM DESCONTO)", 140, curY + 9);

    // Divisória sutil
    doc.setDrawColor(235, 238, 245);
    doc.line(16, curY + 11.5, pageWidth - 16, curY + 11.5);

    // Linha 2: Defesa Técnica
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("ADVOGADO DEFENSOR:", 18, curY + 15.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 26, 38);
    doc.text(`${opts.advogado || "—"} (ID: ${opts.idAdv || "—"})`, 18, curY + 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("ATUAÇÃO DO DEFENSOR:", 140, curY + 15.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(opts.advogadoPresente ? 30 : 120, opts.advogadoPresente ? 120 : 125, opts.advogadoPresente ? 50 : 135);
    doc.text(opts.advogadoPresente ? "PRESENTE (-50% PENA E MULTA)" : "AUSENTE / SEM REDUÇÃO", 140, curY + 20);

    curY += 26;

    // 2. Tabela de Artigos Enquadrados
    curY = desenharCabecalhoSecao(doc, curY, "2. Capitulação Penal — Artigos Enquadrados");

    // Cabeçalho da tabela
    const thY = curY;
    doc.setFillColor(...AZUL_NOITE);
    doc.rect(14, thY, boxW, 6.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(255, 255, 255);
    doc.text("ARTIGO", 18, thY + 4.5);
    doc.text("DESCRIÇÃO DA INFRAÇÃO", 40, thY + 4.5);
    doc.text("QTD", 115, thY + 4.5, { align: "center" });
    doc.text("PENA UNIT.", 135, thY + 4.5, { align: "right" });
    doc.text("MULTA UNIT.", 160, thY + 4.5, { align: "right" });
    doc.text("FIANÇA?", 187, thY + 4.5, { align: "center" });

    curY += 6.5;

    // Linhas dos artigos
    const artigosList = opts.artigos || [];
    if (!artigosList.length) {
      doc.setFillColor(255, 255, 255);
      doc.rect(14, curY, boxW, 8, "FD");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(120, 120, 130);
      doc.text("Nenhum artigo enquadrado registrado.", pageWidth / 2, curY + 5.5, { align: "center" });
      curY += 8;
    } else {
      artigosList.forEach((a, i) => {
        const rowH = 6.2;
        doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 249, i % 2 === 0 ? 255 : 252);
        doc.setDrawColor(230, 234, 242);
        doc.setLineWidth(0.2);
        doc.rect(14, curY, boxW, rowH, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.2);
        doc.setTextColor(20, 26, 38);
        doc.text(a.cod, 18, curY + 4.3);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.2);
        doc.text(a.nome.length > 40 ? a.nome.substring(0, 39) + "..." : a.nome, 40, curY + 4.3);

        doc.setFont("helvetica", "bold");
        doc.text(String(a.qtd), 115, curY + 4.3, { align: "center" });
        doc.text(`${a.pena}m`, 135, curY + 4.3, { align: "right" });
        doc.text(`$${Math.round(a.multa).toLocaleString("pt-BR")}`, 160, curY + 4.3, { align: "right" });

        if (a.inaf) {
          doc.setFont("helvetica", "bold");
          doc.setTextColor(190, 40, 40);
          doc.text("INAFIANÇÁVEL", 187, curY + 4.3, { align: "center" });
        } else {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(30, 130, 60);
          doc.text("Regra geral", 187, curY + 4.3, { align: "center" });
        }

        curY += rowH;
      });
    }

    curY += 4;

    // 3. Dispositivo da Sentença (Pena, Multa, Fiança)
    curY = desenharCabecalhoSecao(doc, curY, "3. Dispositivo da Sentença Condenatória");

    const cardW = (boxW - 6) / 3;
    const cardH = 17;
    const calc = opts.calculo || {};

    // Card 1: Pena Total
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, curY, cardW, cardH, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(115, 122, 138);
    doc.text("PENA TOTAL", 14 + (cardW / 2), curY + 5, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`${calc.pena || 0} meses`, 14 + (cardW / 2), curY + 11.5, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 120, 130);
    doc.text(calc.limitada ? "(limitada ao teto legal)" : "(tempo de reclusão)", 14 + (cardW / 2), curY + 15, { align: "center" });

    // Card 2: Multa Total
    const x2 = 14 + cardW + 3;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...AZUL_NOITE);
    doc.roundedRect(x2, curY, cardW, cardH, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(115, 122, 138);
    doc.text("MULTA PECUNIÁRIA", x2 + (cardW / 2), curY + 5, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(180, 110, 20); // tom dourado escuro
    doc.text(`$${Math.round(calc.multa || 0).toLocaleString("pt-BR")}`, x2 + (cardW / 2), curY + 11.5, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 120, 130);
    doc.text("recolhimento ao Tesouro Municipal", x2 + (cardW / 2), curY + 15, { align: "center" });

    // Card 3: Fiança
    const x3 = x2 + cardW + 3;
    const inafiancavel = calc.fianca === null || calc.fianca === undefined;
    doc.setFillColor(inafiancavel ? 255 : 255, inafiancavel ? 245 : 255, inafiancavel ? 245 : 255);
    doc.setDrawColor(inafiancavel ? 200 : 30, inafiancavel ? 40 : 130, inafiancavel ? 40 : 60);
    doc.setLineWidth(inafiancavel ? 0.4 : 0.3);
    doc.roundedRect(x3, curY, cardW, cardH, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(inafiancavel ? 190 : 30, inafiancavel ? 40 : 130, inafiancavel ? 40 : 60);
    doc.text("VALOR DA FIANÇA", x3 + (cardW / 2), curY + 5, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(inafiancavel ? 190 : 30, inafiancavel ? 40 : 130, inafiancavel ? 40 : 60);
    doc.text(inafiancavel ? "INAFIANÇÁVEL" : `$${Math.round(calc.fianca).toLocaleString("pt-BR")}`, x3 + (cardW / 2), curY + 11.5, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 120, 130);
    doc.text(inafiancavel ? "vedada liberdade provisória" : (opts.primario ? "com 25% desc. primário" : "valor integral"), x3 + (cardW / 2), curY + 15, { align: "center" });

    // Rodapé Oficial
    desenharRodape(doc, opts.oficial, opts.idPolicial, "Policial / Autoridade Responsável");

    const safeNome = (opts.nome || "Acusado").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `Sentenca_Penal_${safeNome}_${protocolo}.pdf`;
    const blob = doc.output("blob");

    return { doc, blob, filename, protocolo };
  }

  // Exporta globalmente para o aplicativo
  window.SDJ_PDF = {
    generateServicePDF,
    generatePenalPDF,
    getLogoDataUrl
  };
})();
