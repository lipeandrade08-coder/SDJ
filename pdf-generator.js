/* ==========================================================
   SISTEMA DO DEPARTAMENTO JURÍDICO — BRAVA RP
   Módulo Oficial de Emissão de Documentos e Certidões em PDF
   Padronização Notarial de Alto Nível — Tribunal de Justiça
   ========================================================== */

(function () {
  let cachedLogo = null;
  let cachedWatermark = null;

  // Carrega e pré-processa o brasão oficial e a marca d'água de segurança
  function getLogoAndWatermark() {
    if (cachedLogo && cachedWatermark) {
      return Promise.resolve({ logo: cachedLogo, watermark: cachedWatermark });
    }
    if (typeof window === "undefined" || typeof document === "undefined" || typeof Image === "undefined") {
      return Promise.resolve({ logo: null, watermark: null });
    }

    return new Promise((resolve) => {
      let settled = false;
      const done = (val) => {
        if (settled) return;
        settled = true;
        resolve(val);
      };
      // Timeout de segurança
      setTimeout(() => done({ logo: cachedLogo, watermark: cachedWatermark }), 1400);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const nw = img.naturalWidth || 400;
          const nh = img.naturalHeight || 400;

          // 1. Logo oficial de alta resolução
          const cLogo = document.createElement("canvas");
          cLogo.width = nw;
          cLogo.height = nh;
          const ctxL = cLogo.getContext("2d");
          ctxL.drawImage(img, 0, 0);
          cachedLogo = cLogo.toDataURL("image/png");

          // 2. Marca d'água oficial translúcida (5.5% opacidade)
          const cWater = document.createElement("canvas");
          cWater.width = 600;
          cWater.height = 600;
          const ctxW = cWater.getContext("2d");
          ctxW.clearRect(0, 0, 600, 600);
          ctxW.globalAlpha = 0.055;
          ctxW.drawImage(img, 0, 0, 600, 600);
          cachedWatermark = cWater.toDataURL("image/png");

          done({ logo: cachedLogo, watermark: cachedWatermark });
        } catch (e) {
          console.warn("Não foi possível gerar marca d'água:", e);
          done({ logo: null, watermark: null });
        }
      };
      img.onerror = () => done({ logo: null, watermark: null });
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

  // Converte qualquer texto de nome para formato caligráfico elegante (Title Case)
  function toSignatureCase(nome) {
    if (!nome || typeof nome !== "string") return "Oficial Responsável";
    const limpo = nome.trim();
    if (!limpo || limpo === "—") return "Oficial Responsável";
    return limpo
      .split(/\s+/)
      .map((w, idx) => {
        const lower = w.toLowerCase();
        if (idx > 0 && /^(de|da|do|dos|das|e)$/i.test(lower)) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(" ");
  }

  // Gera QR Code real de validação digital para a chancela
  function gerarQrCodeDataUrl(texto, tamanho = 140) {
    if (typeof window !== "undefined" && window.QRCode) {
      try {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = "-9999px";
        div.style.top = "-9999px";
        document.body.appendChild(div);

        new window.QRCode(div, {
          text: texto,
          width: tamanho,
          height: tamanho,
          colorDark: "#0b172a",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.M
        });

        const canvas = div.querySelector("canvas");
        let url = null;
        if (canvas) {
          url = canvas.toDataURL("image/png");
        } else {
          const img = div.querySelector("img");
          if (img && img.src && img.src.startsWith("data:image")) {
            url = img.src;
          }
        }
        div.remove();
        if (url) return url;
      } catch (e) {
        console.warn("Falha no QRCode via biblioteca, gerando padrão vetorial:", e);
      }
    }

    // Fallback: desenha uma matriz digital notarial estilizada em canvas
    try {
      const cv = document.createElement("canvas");
      cv.width = tamanho;
      cv.height = tamanho;
      const ctx = cv.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, tamanho, tamanho);

      ctx.fillStyle = "#0c1a30";
      const mod = Math.floor(tamanho / 21);

      // Finder patterns nos 3 cantos
      const drawFinder = (x, y) => {
        ctx.fillRect(x, y, mod * 7, mod * 7);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + mod, y + mod, mod * 5, mod * 5);
        ctx.fillStyle = "#0c1a30";
        ctx.fillRect(x + mod * 2, y + mod * 2, mod * 3, mod * 3);
      };
      drawFinder(0, 0);
      drawFinder((21 - 7) * mod, 0);
      drawFinder(0, (21 - 7) * mod);

      // Matriz pseudo-aleatória determinística baseada no texto
      let seed = 0;
      for (let i = 0; i < texto.length; i++) seed = (seed * 31 + texto.charCodeAt(i)) & 0xffffffff;
      const rnd = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
      };

      for (let r = 0; r < 21; r++) {
        for (let c = 0; c < 21; c++) {
          if ((r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8)) continue;
          if (rnd() > 0.48) {
            ctx.fillRect(c * mod, r * mod, mod, mod);
          }
        }
      }
      return cv.toDataURL("image/png");
    } catch (_) {
      return null;
    }
  }

  // Cores oficiais da identidade do Tribunal
  const ORO = [212, 175, 55];          // Dourado Nobre #D4AF37
  const ORO_ESCURO = [150, 115, 25];   // Dourado Envelhecido
  const AZUL_NOITE = [14, 20, 32];     // Deep Navy #0E1420
  const AZUL_MEDIO = [28, 42, 68];     // Azul Jurídico
  const CINZA_BORDA = [205, 212, 224];
  const CINZA_FUNDO = [248, 250, 253];
  const TEXTO_ESCURO = [20, 26, 38];
  const TEXTO_MUTED = [100, 108, 122];

  // Cache das assinaturas à mão para ultra performance
  let cachedSignatureZaith = null;
  let cachedSignatureMike = null;

  /* ==========================================================
     GERAÇÃO DE ASSINATURA MANUSCRITA / RUBRICA GRANDE & REALISTA
     Produz uma rubrica ampla, fluida e encorpada em alta resolução
     ========================================================== */
  function gerarAssinaturaCanvas(nomeRaw, estilo = {}) {
    if (typeof document === "undefined") return null;
    try {
      const nome = toSignatureCase(nomeRaw);
      const canvas = document.createElement("canvas");
      // Resolução aumentada para traço nítido sem pixelização
      canvas.width = 850;
      canvas.height = 280;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, (canvas.height / 2) - 6);
      ctx.rotate((estilo.rot || -3.2) * Math.PI / 180);

      // Tinta de caneta tinteiro azul nobre autêntica
      const corTinta = estilo.cor || "#072146";
      ctx.fillStyle = corTinta;
      ctx.strokeStyle = corTinta;

      // Tamanho de fonte ampliado expressivamente para preencher o bloco
      let fontSize = 84;
      if (nome.length > 28) fontSize = 54;
      else if (nome.length > 20) fontSize = 66;
      else if (nome.length > 14) fontSize = 76;

      ctx.font = estilo.font || `italic bold ${fontSize}px 'Dancing Script', 'Brush Script MT', 'Segoe Script', 'Great Vibes', cursive`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Leve sombra de tinta para efeito de profundidade caligráfica
      ctx.shadowColor = "rgba(7, 33, 70, 0.22)";
      ctx.shadowBlur = 1.2;
      ctx.shadowOffsetX = 0.5;
      ctx.shadowOffsetY = 0.5;

      // Escreve o nome caligráfico
      ctx.fillText(nome, 0, -4);

      // Traçado do floreio / rubrica por baixo
      ctx.shadowColor = "transparent";
      ctx.beginPath();
      ctx.lineWidth = 3.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const textWidth = ctx.measureText(nome).width;
      const startX = -textWidth / 2 - 14;
      const endX = textWidth / 2 + 22;
      const baseY = fontSize * 0.32;

      if (estilo.tipo === "zaith") {
        // Rubrica imponente de Zaith Frost (laço arrojado + sweep expansivo)
        ctx.moveTo(startX, baseY);
        ctx.bezierCurveTo(startX + 60, baseY + 28, endX - 50, baseY - 12, endX + 8, baseY + 14);
        ctx.bezierCurveTo(endX + 32, baseY + 24, endX + 22, baseY + 38, endX - 45, baseY + 32);
        ctx.bezierCurveTo(endX - 120, baseY + 24, endX - 220, baseY + 36, endX - 300, baseY + 28);
      } else if (estilo.tipo === "mike") {
        // Rubrica dinâmica de Mike Santaroni (duplo sweep + cauda estendida)
        ctx.moveTo(startX - 6, baseY + 2);
        ctx.bezierCurveTo(startX + 45, baseY + 26, endX - 35, baseY - 8, endX + 12, baseY + 12);
        ctx.bezierCurveTo(endX + 26, baseY + 22, endX + 16, baseY + 34, endX - 38, baseY + 30);
        ctx.bezierCurveTo(endX - 90, baseY + 25, endX - 160, baseY + 36, endX - 240, baseY + 28);
      } else {
        // Rubrica dinâmica personalizada para qualquer oficial/agente
        ctx.moveTo(startX, baseY);
        ctx.bezierCurveTo(startX + 50, baseY + 24, endX - 40, baseY - 10, endX + 10, baseY + 12);
        ctx.bezierCurveTo(endX + 24, baseY + 22, endX + 15, baseY + 32, endX - 35, baseY + 28);
        ctx.bezierCurveTo(endX - 80, baseY + 22, endX - 140, baseY + 32, endX - 200, baseY + 26);
      }
      ctx.stroke();

      ctx.restore();
      return canvas.toDataURL("image/png");
    } catch (e) {
      console.warn("Falha ao gerar rubrica:", e);
      return null;
    }
  }

  function getAssinaturaZaith() {
    if (!cachedSignatureZaith) {
      cachedSignatureZaith = gerarAssinaturaCanvas("Zaith Frost", { rot: -3.6, tipo: "zaith" });
    }
    return cachedSignatureZaith;
  }

  function getAssinaturaMike() {
    if (!cachedSignatureMike) {
      cachedSignatureMike = gerarAssinaturaCanvas("Mike Santaroni", { rot: -2.6, tipo: "mike" });
    }
    return cachedSignatureMike;
  }

  /* ==========================================================
     ESTRUTURA BASE DO DOCUMENTO (A4, MOLDURA DUPLA, BRASÃO, MARCA D'ÁGUA)
     ========================================================== */
  function desenharEstruturaBase(doc, logoData, watermarkData, tituloDocumento, protocolo, dataHora, cidade) {
    const pageWidth = 210;
    const pageHeight = 297;

    // 1. Marca d'Água Centralizada (Brasão translúcido no fundo da folha)
    if (watermarkData) {
      try {
        doc.addImage(watermarkData, "PNG", 45, 88, 120, 120);
      } catch (err) {
        console.warn("Erro ao renderizar marca d'água:", err);
      }
    }

    // 2. Moldura Notarial Dupla de Alta Segurança
    // Moldura Externa Dourada Nobre
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.85);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    // Filete Interno Azul Noite
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.28);
    doc.rect(9.6, 9.6, pageWidth - 19.2, pageHeight - 19.2);

    // Linha de segurança micro pontilhada
    doc.setDrawColor(218, 190, 100);
    doc.setLineWidth(0.18);
    doc.rect(10.8, 10.8, pageWidth - 21.6, pageHeight - 21.6);

    // Cantoneiras decorativas trabalhadas nos 4 cantos
    const corners = [
      [8, 8], [pageWidth - 8, 8],
      [8, pageHeight - 8], [pageWidth - 8, pageHeight - 8]
    ];
    corners.forEach(([cx, cy]) => {
      doc.setFillColor(...ORO);
      doc.circle(cx, cy, 1.4, "F");
      doc.setFillColor(...AZUL_NOITE);
      doc.circle(cx, cy, 0.6, "F");
    });

    // 3. Cabeçalho Oficial Notarial com Brasão
    if (logoData) {
      try {
        doc.addImage(logoData, "PNG", 14, 13, 22, 22);
      } catch (err) {
        console.warn("Erro ao renderizar logo no cabeçalho:", err);
      }
    }

    // Textos do Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("ESTADO DE BRAVA  ·  PODER JUDICIÁRIO", 40, 17.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA", 40, 23);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(55, 65, 82);
    doc.text("SISTEMA DO DEPARTAMENTO JURÍDICO", 40, 27.8);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.2);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text(`Cartório Notarial, Registro Civil e Varas Penais  ·  ${cidade || "Brava RP"}`, 40, 32.2);

    // Linha divisória do cabeçalho
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.6);
    doc.line(14, 36.5, pageWidth - 14, 36.5);
    doc.setDrawColor(...CINZA_BORDA);
    doc.setLineWidth(0.2);
    doc.line(14, 37.3, pageWidth - 14, 37.3);

    // 4. Faixa de Título do Documento
    const bannerY = 40;
    const bannerH = 10;
    doc.setFillColor(...AZUL_NOITE);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, bannerY, pageWidth - 28, bannerH, 1.2, 1.2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(tituloDocumento.toUpperCase(), pageWidth / 2, bannerY + 6.6, { align: "center" });

    // 5. Barra de Metadados / Protocolo & Livro Notarial
    const metaY = 52.5;
    const metaH = 8;
    doc.setFillColor(...CINZA_FUNDO);
    doc.setDrawColor(...CINZA_BORDA);
    doc.setLineWidth(0.25);
    doc.roundedRect(14, metaY, pageWidth - 28, metaH, 1, 1, "FD");

    // Protocolo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("PROTOCOLO:", 17, metaY + 5.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.2);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(protocolo, 34, metaY + 5.2);

    // Data de Expedição
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("EXPEDIÇÃO:", 80, metaY + 5.2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text(dataHora, 95, metaY + 5.2);

    // Validade Notarial / Status (Espaçamento limpo e perfeitamente distribuído)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("STATUS:", 142, metaY + 5.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.2);
    doc.setTextColor(25, 125, 55);
    doc.text("HOMOLOGADO · FÉ PÚBLICA", 192, metaY + 5.2, { align: "right" });

    return 63.5; // Próximo Y livre para o conteúdo
  }

  // Cabeçalho de seção com indicador dourado
  function desenharCabecalhoSecao(doc, y, titulo) {
    const pageWidth = 210;
    doc.setFillColor(242, 245, 250);
    doc.rect(14, y, pageWidth - 28, 5.8, "F");

    // Indicador vertical dourado
    doc.setFillColor(...ORO);
    doc.rect(14, y, 2.5, 5.8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(titulo.toUpperCase(), 19, y + 4.1);

    return y + 8.2;
  }

  /* ==========================================================
     BLOCO DE ASSINATURAS GRANDES & CHANCELA NOTARIAL DIGITAL
     Com rubricas amplas de Zaith Frost, Mike Santaroni, Oficial e QR Code
     ========================================================== */
  function desenharBlocoAssinaturasEChancela(doc, startY, agenteNome, agenteId, cargoAgente, protocolo) {
    const pageWidth = 210;

    // Linha 1 de Assinaturas (Presidência): Zaith Frost & Mike Santaroni
    const sigZaithImg = getAssinaturaZaith();
    const sigMikeImg = getAssinaturaMike();

    const colW = 80;
    const col1X = 18;
    const col2X = 112;

    // Y da primeira linha de assinaturas
    const row1SigY = startY;
    const row1LineY = startY + 16;

    // Coluna 1: Zaith Frost (Presidente)
    if (sigZaithImg) {
      try {
        doc.addImage(sigZaithImg, "PNG", col1X + 5, row1SigY, 70, 22);
      } catch (_) {}
    }
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.35);
    doc.line(col1X, row1LineY, col1X + colW, row1LineY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("ZAITH FROST", col1X + (colW / 2), row1LineY + 4, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("Presidente do Departamento Jurídico", col1X + (colW / 2), row1LineY + 7.2, { align: "center" });

    // Coluna 2: Mike Santaroni (Vice-Presidente)
    if (sigMikeImg) {
      try {
        doc.addImage(sigMikeImg, "PNG", col2X + 5, row1SigY, 70, 22);
      } catch (_) {}
    }
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.35);
    doc.line(col2X, row1LineY, col2X + colW, row1LineY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("MIKE SANTARONI", col2X + (colW / 2), row1LineY + 4, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("Vice-Presidente do Departamento Jurídico", col2X + (colW / 2), row1LineY + 7.2, { align: "center" });

    // Linha 2 de Assinaturas: Oficial Registrador à esquerda + Chancela Notarial com QR Code à direita
    const row2Y = row1LineY + 9.5;
    const row2SigY = row2Y - 1;
    const row2LineY = row2Y + 16;

    // Coluna Esquerda: Agente/Oficial Responsável com RUBRICA GRANDE DINÂMICA
    const nomeLimpo = toSignatureCase(agenteNome);
    const sigAgenteImg = gerarAssinaturaCanvas(nomeLimpo, { rot: -3.0, tipo: "agente" });

    if (sigAgenteImg) {
      try {
        doc.addImage(sigAgenteImg, "PNG", col1X + 5, row2SigY, 70, 22);
      } catch (_) {}
    }
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.35);
    doc.line(col1X, row2LineY, col1X + colW, row2LineY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(nomeLimpo.toUpperCase(), col1X + (colW / 2), row2LineY + 4, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text(`Passaporte / ID: ${agenteId || "—"}  ·  ${cargoAgente || "Oficial Notarial"}`, col1X + (colW / 2), row2LineY + 7.2, { align: "center" });

    // Coluna Direita: Chancela e Registro Notarial Digital com QR Code Real
    const stampX = col2X;
    const stampY = row2Y;
    const stampW = colW;
    const stampH = 23.5;

    doc.setFillColor(254, 253, 249);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.45);
    doc.roundedRect(stampX, stampY, stampW, stampH, 1.5, 1.5, "FD");

    // Borda interna dupla sutil
    doc.setDrawColor(225, 205, 145);
    doc.setLineWidth(0.18);
    doc.rect(stampX + 1.2, stampY + 1.2, stampW - 2.4, stampH - 2.4);

    // QR Code de validação à esquerda da chancela
    const urlValidacao = `https://sdj.brava.gov.br/verificar?protocolo=${protocolo}`;
    const qrDataUrl = gerarQrCodeDataUrl(urlValidacao, 120);
    const qrSize = 18.5;
    const qrX = stampX + 2.5;
    const qrY = stampY + 2.5;

    if (qrDataUrl) {
      try {
        doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
        doc.setDrawColor(215, 218, 226);
        doc.setLineWidth(0.18);
        doc.rect(qrX - 0.3, qrY - 0.3, qrSize + 0.6, qrSize + 0.6);
      } catch (_) {}
    }

    // Textos informativos da Chancela à direita do QR Code
    const textLeft = stampX + qrSize + 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· PODER JUDICIÁRIO · SDJ ·", textLeft, stampY + 4.8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.2);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("CHANCELA NOTARIAL", textLeft, stampY + 8.8);

    doc.setFont("courier", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(50, 58, 75);
    doc.text(`HASH: ${gerarHashAutenticidade()}`, textLeft, stampY + 13);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(5.5);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("Homologação: Zaith Frost & Mike Santaroni", textLeft, stampY + 17);
    doc.text("Verificação: sdj.brava.gov/verificar", textLeft, stampY + 20.6);

    // Rodapé Institucional Absoluto
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("Tribunal de Justiça de Brava RP  ·  Departamento Jurídico  ·  Presidência: Zaith Frost & Mike Santaroni  ·  Página 1 de 1", pageWidth / 2, 284, { align: "center" });
  }

  function getJsPDF() {
    return (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || (typeof jsPDF !== "undefined" ? jsPDF : null);
  }

  /* ==========================================================
     1. GERAÇÃO DE PDF PARA SERVIÇOS DIVERSOS
        (Certidões Notariais, Casamento, Família, Troca de Nome, etc.)
     ========================================================== */
  async function generateServicePDF(opts) {
    const jsPDF = getJsPDF();
    if (!jsPDF) throw new Error("Biblioteca jsPDF não encontrada.");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const { logo, watermark } = await getLogoAndWatermark();

    const dataHora = new Date().toLocaleString("pt-BR");
    const protocolo = gerarProtocolo();
    const titulo = opts.service.title || "Certidão Oficial Notarial";
    const cidade = opts.cidade || (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    // 1. Cabeçalho, moldura e marca d'água oficial
    let curY = desenharEstruturaBase(doc, logo, watermark, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;
    const fields = opts.fields || [];

    // Seção 1: Dados Oficiais Registrados
    curY = desenharCabecalhoSecao(doc, curY, "1. Dados e Declarações do Assento Cartorário");

    // Altura proporcional para valorizar o conteúdo sem sobrecarregar a folha
    const nFields = fields.length;
    let rowH = 10;
    let rowGap = 1.2;
    if (nFields >= 7) {
      rowH = 7.0;
      rowGap = 0.8;
    } else if (nFields >= 5) {
      rowH = 8.2;
      rowGap = 1.0;
    }

    fields.forEach((f, idx) => {
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
      doc.setDrawColor(220, 226, 238);
      doc.setLineWidth(0.25);
      doc.roundedRect(14, curY, boxW, rowH, 0.8, 0.8, "FD");

      // Marcador lateral dourado sutil
      doc.setFillColor(...ORO);
      doc.rect(14, curY, 1.8, rowH, "F");

      // Rótulo
      doc.setFont("helvetica", "bold");
      doc.setFontSize(rowH >= 9 ? 6.5 : 5.8);
      doc.setTextColor(110, 118, 134);
      doc.text(f.label.toUpperCase(), 18, curY + (rowH * 0.36));

      // Valor
      doc.setFont("helvetica", "bold");
      doc.setFontSize(rowH >= 9 ? 8.8 : 7.8);
      doc.setTextColor(18, 24, 38);
      const valText = f.value && f.value !== "—" ? String(f.value) : "NÃO INFORMADO";
      doc.text(valText, 18, curY + (rowH * 0.78));

      curY += rowH + rowGap;
    });

    curY += 1.5;

    // Seção 2: Termo de Homologação, Registro e Fé Pública (Preenche com solene autoridade notarial)
    curY = desenharCabecalhoSecao(doc, curY, "2. Termo de Homologação, Registro e Fé Pública");

    const certBoxH = 24.5;
    doc.setFillColor(251, 252, 255);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, curY, boxW, certBoxH, 1.2, 1.2, "FD");

    // Filete interno sutil
    doc.setDrawColor(230, 234, 245);
    doc.setLineWidth(0.18);
    doc.rect(15.2, curY + 1.0, boxW - 2.4, certBoxH - 2.0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.0);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("CERTIDÃO DE HOMOLOGAÇÃO NOTARIAL E EFICÁCIA JURÍDICA", 18, curY + 4.8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.1);
    doc.setTextColor(45, 52, 68);
    const termoCompleto =
      "O CARTÓRIO DO DEPARTAMENTO JURÍDICO DA COMARCA DE BRAVA RP, no uso das prerrogativas conferidas pela Presidência do Poder Judiciário e pela Corregedoria Geral de Justiça, CERTIFICA que foram cumpridos todos os pressupostos legais e formais exigidos para a lavratura deste ato notarial. O presente assento encontra-se registrado, averbado e homologado, gozando de fé pública originária, presunção absoluta de veracidade e eficácia plena perante todos os órgãos públicos, corporações policiais e instituições civis.";
    doc.text(termoCompleto, 18, curY + 8.5, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.26 });

    // Divisória sutil antes dos atributos
    const divY = curY + 17.0;
    doc.setDrawColor(235, 238, 245);
    doc.setLineWidth(0.2);
    doc.line(18, divY, 14 + boxW - 4, divY);

    // Barra de atributos dentro da certidão
    const attrY = curY + 21.0;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· NATUREZA:", 18, attrY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text("Assento Notarial Oficial", 34, attrY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· EFICÁCIA:", 78, attrY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text("Oponibilidade 'Erga Omnes'", 93, attrY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· SEGURANÇA:", 140, attrY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text("Criptografia Digital SHA-256", 158, attrY);

    curY += certBoxH + 2.5;

    // Seção 3: Agente Notarial Designado & Livro Registral (Duas colunas elegantes)
    curY = desenharCabecalhoSecao(doc, curY, "3. Oficial Notarial Designado e Controle de Livro");

    const splitW = (boxW - 3) / 2;
    const splitH = 13.5;

    // Coluna Esquerda: Agente do Cartório
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 230, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(14, curY, splitW, splitH, 1, 1, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.setTextColor(110, 118, 134);
    doc.text("OFICIAL NOTARIAL DESIGNADO:", 18, curY + 4.0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(18, 24, 38);
    doc.text(toSignatureCase(opts.agente || "Oficial do Cartório"), 18, curY + 8.2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.2);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text(`Passaporte / ID: ${opts.agenteId || "—"}  ·  1º Ofício Notarial de Brava RP`, 18, curY + 11.6);

    // Coluna Direita: Controle do Livro
    const colRightX = 14 + splitW + 3;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 230, 240);
    doc.roundedRect(colRightX, curY, splitW, splitH, 1, 1, "FD");

    // Gera números fictícios consistentes para Livro e Folha
    const livroNum = String(Math.abs((protocolo.length * 7) % 30) + 1).padStart(2, "0");
    const folhaNum = String(Math.abs((protocolo.length * 13) % 250) + 1).padStart(3, "0");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.setTextColor(110, 118, 134);
    doc.text("ASSENTO E LIVRO NOTARIAL:", colRightX + 4, curY + 4.0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.0);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`LIVRO A-${livroNum}  ·  FOLHAS ${folhaNum}`, colRightX + 4, curY + 8.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(25, 125, 55);
    doc.text("LAVRADO, AVERBADO E HOMOLOGADO", colRightX + 4, curY + 11.6);

    curY += splitH + 2.5;

    // Seção 4: Assinaturas Grandes da Presidência, Oficial e Chancela Digital
    // Garante que o bloco de assinaturas comece em posição harmônica e nunca estoure o rodapé
    const signatureStartY = Math.min(Math.max(curY + 1, 226), 231);
    desenharBlocoAssinaturasEChancela(doc, signatureStartY, opts.agente, opts.agenteId, "Oficial Notarial Titular", protocolo);

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
    const { logo, watermark } = await getLogoAndWatermark();

    const dataHora = new Date().toLocaleString("pt-BR");
    const protocolo = gerarProtocolo();
    const titulo = "Certidão de Sentença Penal";
    const cidade = opts.cidade || (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    let curY = desenharEstruturaBase(doc, logo, watermark, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;

    // 1. Qualificação das Partes
    curY = desenharCabecalhoSecao(doc, curY, "1. Qualificação dos Envolvidos e Condições Processuais");

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(225, 230, 240);
    doc.setLineWidth(0.25);
    doc.roundedRect(14, curY, boxW, 19, 1, 1, "FD");

    // Linha 1: Acusado e Antecedentes
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 122, 138);
    doc.text("NOME DO ACUSADO:", 18, curY + 4.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(20, 26, 38);
    doc.text(opts.nome || "—", 18, curY + 8.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 122, 138);
    doc.text("ID / PASSAPORTE:", 85, curY + 4.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(20, 26, 38);
    doc.text(opts.id || "—", 85, curY + 8.2);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 122, 138);
    doc.text("ANTECEDENTES:", 140, curY + 4.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.0);
    doc.setTextColor(opts.primario ? 25 : 180, opts.primario ? 120 : 35, opts.primario ? 50 : 35);
    doc.text(opts.primario ? "RÉU PRIMÁRIO (-25% FIANÇA)" : "REINCIDENTE (SEM DESCONTO)", 140, curY + 8.2);

    // Divisória sutil
    doc.setDrawColor(235, 238, 245);
    doc.line(16, curY + 10.2, pageWidth - 16, curY + 10.2);

    // Linha 2: Defesa Técnica
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 122, 138);
    doc.text("ADVOGADO DEFENSOR:", 18, curY + 13.8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(20, 26, 38);
    doc.text(`${opts.advogado || "—"} (ID: ${opts.idAdv || "—"})`, 18, curY + 17.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(115, 122, 138);
    doc.text("ATUAÇÃO DO DEFENSOR:", 140, curY + 13.8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.0);
    doc.setTextColor(opts.advogadoPresente ? 25 : 110, opts.advogadoPresente ? 120 : 115, opts.advogadoPresente ? 50 : 125);
    doc.text(opts.advogadoPresente ? "PRESENTE (-50% PENA E MULTA)" : "AUSENTE / SEM REDUÇÃO", 140, curY + 17.5);

    curY += 21.5;

    // 2. Tabela de Artigos Enquadrados
    curY = desenharCabecalhoSecao(doc, curY, "2. Capitulação Penal — Artigos Enquadrados");

    const thY = curY;
    doc.setFillColor(...AZUL_NOITE);
    doc.rect(14, thY, boxW, 5.8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text("ARTIGO", 18, thY + 4.0);
    doc.text("DESCRIÇÃO DA INFRAÇÃO", 40, thY + 4.0);
    doc.text("QTD", 115, thY + 4.0, { align: "center" });
    doc.text("PENA UNIT.", 135, thY + 4.0, { align: "right" });
    doc.text("MULTA UNIT.", 160, thY + 4.0, { align: "right" });
    doc.text("FIANÇA?", 187, thY + 4.0, { align: "center" });

    curY += 5.8;

    const artigosList = opts.artigos || [];
    if (!artigosList.length) {
      doc.setFillColor(255, 255, 255);
      doc.rect(14, curY, boxW, 7, "FD");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.2);
      doc.setTextColor(120, 120, 130);
      doc.text("Nenhum artigo enquadrado registrado.", pageWidth / 2, curY + 4.8, { align: "center" });
      curY += 7;
    } else {
      artigosList.forEach((a, i) => {
        const rowH = 5.5;
        doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 249, i % 2 === 0 ? 255 : 252);
        doc.setDrawColor(230, 234, 242);
        doc.setLineWidth(0.2);
        doc.rect(14, curY, boxW, rowH, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.8);
        doc.setTextColor(20, 26, 38);
        doc.text(a.cod, 18, curY + 3.8);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.8);
        doc.text(a.nome.length > 40 ? a.nome.substring(0, 39) + "..." : a.nome, 40, curY + 3.8);

        doc.setFont("helvetica", "bold");
        doc.text(String(a.qtd), 115, curY + 3.8, { align: "center" });
        doc.text(`${a.pena}m`, 135, curY + 3.8, { align: "right" });
        doc.text(`$${Math.round(a.multa).toLocaleString("pt-BR")}`, 160, curY + 3.8, { align: "right" });

        if (a.inaf) {
          doc.setFont("helvetica", "bold");
          doc.setTextColor(190, 40, 40);
          doc.text("INAFIANÇÁVEL", 187, curY + 3.8, { align: "center" });
        } else {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(25, 125, 55);
          doc.text("Regra geral", 187, curY + 3.8, { align: "center" });
        }

        curY += rowH;
      });
    }

    curY += 2.5;

    // 3. Dispositivo da Sentença (Pena, Multa, Fiança)
    curY = desenharCabecalhoSecao(doc, curY, "3. Dispositivo da Sentença Condenatória");

    const cardW = (boxW - 6) / 3;
    const cardH = 15;
    const calc = opts.calculo || {};

    // Card 1: Pena Total
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...AZUL_NOITE);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, curY, cardW, cardH, 1.2, 1.2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("PENA TOTAL", 14 + (cardW / 2), curY + 4.2, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`${calc.pena || 0} meses`, 14 + (cardW / 2), curY + 9.8, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6);
    doc.setTextColor(120, 120, 130);
    doc.text(calc.limitada ? "(limitada ao teto legal)" : "(tempo de reclusão)", 14 + (cardW / 2), curY + 13.2, { align: "center" });

    // Card 2: Multa Total
    const x2 = 14 + cardW + 3;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...AZUL_NOITE);
    doc.roundedRect(x2, curY, cardW, cardH, 1.2, 1.2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(115, 122, 138);
    doc.text("MULTA PECUNIÁRIA", x2 + (cardW / 2), curY + 4.2, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(180, 110, 20);
    doc.text(`$${Math.round(calc.multa || 0).toLocaleString("pt-BR")}`, x2 + (cardW / 2), curY + 9.8, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6);
    doc.setTextColor(120, 120, 130);
    doc.text("recolhimento ao Tesouro Municipal", x2 + (cardW / 2), curY + 13.2, { align: "center" });

    // Card 3: Fiança
    const x3 = x2 + cardW + 3;
    const inafiancavel = calc.fianca === null || calc.fianca === undefined;
    doc.setFillColor(inafiancavel ? 255 : 255, inafiancavel ? 245 : 255, inafiancavel ? 245 : 255);
    doc.setDrawColor(inafiancavel ? 200 : 30, inafiancavel ? 40 : 130, inafiancavel ? 40 : 60);
    doc.setLineWidth(inafiancavel ? 0.4 : 0.3);
    doc.roundedRect(x3, curY, cardW, cardH, 1.2, 1.2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(inafiancavel ? 190 : 30, inafiancavel ? 40 : 130, inafiancavel ? 40 : 60);
    doc.text("VALOR DA FIANÇA", x3 + (cardW / 2), curY + 4.2, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(inafiancavel ? 190 : 30, inafiancavel ? 40 : 130, inafiancavel ? 40 : 60);
    doc.text(inafiancavel ? "INAFIANÇÁVEL" : `$${Math.round(calc.fianca).toLocaleString("pt-BR")}`, x3 + (cardW / 2), curY + 9.8, { align: "center" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(6);
    doc.setTextColor(120, 120, 130);
    doc.text(inafiancavel ? "vedada liberdade provisória" : (opts.primario ? "com 25% desc. primário" : "valor integral"), x3 + (cardW / 2), curY + 13.2, { align: "center" });

    curY += cardH + 2.5;

    // 4. Termo de Fé Pública Judicial e Execução Penal
    curY = desenharCabecalhoSecao(doc, curY, "4. Disposições Executórias e Fé Pública Judicial");

    const termoPenalH = 13.5;
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(220, 226, 238);
    doc.setLineWidth(0.25);
    doc.roundedRect(14, curY, boxW, termoPenalH, 1, 1, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.2);
    doc.setTextColor(45, 52, 68);
    const termoPenalTexto =
      "Certifico que a presente sentença e dosimetria penal foram calculadas com estrita observância ao Código Penal Vigente de Brava RP e Provimentos do Departamento Jurídico. Fica a autoridade policial e o sistema penitenciário autorizados a dar fiel cumprimento às medidas aqui cominadas.";
    doc.text(termoPenalTexto, 18, curY + 4.8, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.25 });

    curY += termoPenalH + 2.5;

    // 5. Assinaturas Grandes e Chancela Notarial
    const sigPenalStartY = Math.min(Math.max(curY + 1, 226), 231);
    desenharBlocoAssinaturasEChancela(doc, sigPenalStartY, opts.oficial, opts.idPolicial, "Policial / Autoridade Responsável", protocolo);

    const safeNome = (opts.nome || "Acusado").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `Sentenca_Penal_${safeNome}_${protocolo}.pdf`;
    const blob = doc.output("blob");

    return { doc, blob, filename, protocolo };
  }

  // Exporta globalmente para o aplicativo
  window.SDJ_PDF = {
    generateServicePDF,
    generatePenalPDF,
    getLogoAndWatermark,
    toSignatureCase
  };
})();
