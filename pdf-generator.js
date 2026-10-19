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
      // Resolução ultra-HD aumentada para rubricas grandes e encorpadas
      canvas.width = 950;
      canvas.height = 340;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, (canvas.height / 2) - 8);
      ctx.rotate((estilo.rot || -3.2) * Math.PI / 180);

      // Tinta de caneta tinteiro azul nobre autêntica
      const corTinta = estilo.cor || "#072146";
      ctx.fillStyle = corTinta;
      ctx.strokeStyle = corTinta;

      // Tamanho de fonte ampliado expressivamente para preencher todo o bloco de assinatura
      let fontSize = 108;
      if (nome.length > 28) fontSize = 68;
      else if (nome.length > 20) fontSize = 84;
      else if (nome.length > 14) fontSize = 96;

      ctx.font = estilo.font || `italic bold ${fontSize}px 'Dancing Script', 'Brush Script MT', 'Segoe Script', 'Great Vibes', cursive`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Leve sombra de tinta para efeito de profundidade caligráfica
      ctx.shadowColor = "rgba(7, 33, 70, 0.28)";
      ctx.shadowBlur = 1.8;
      ctx.shadowOffsetX = 0.6;
      ctx.shadowOffsetY = 0.6;

      // Escreve o nome caligráfico grande
      ctx.fillText(nome, 0, -4);

      // Traçado do floreio / rubrica por baixo com traço mais imponente
      ctx.shadowColor = "transparent";
      ctx.beginPath();
      ctx.lineWidth = 4.6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const textWidth = ctx.measureText(nome).width;
      const startX = -textWidth / 2 - 20;
      const endX = textWidth / 2 + 28;
      const baseY = fontSize * 0.34;

      if (estilo.tipo === "zaith") {
        // Rubrica imponente de Zaith Frost (laço arrojado + sweep expansivo ampliado)
        ctx.moveTo(startX, baseY);
        ctx.bezierCurveTo(startX + 75, baseY + 36, endX - 60, baseY - 16, endX + 12, baseY + 18);
        ctx.bezierCurveTo(endX + 40, baseY + 30, endX + 28, baseY + 48, endX - 55, baseY + 40);
        ctx.bezierCurveTo(endX - 150, baseY + 30, endX - 280, baseY + 45, endX - 380, baseY + 35);
      } else if (estilo.tipo === "mike") {
        // Rubrica dinâmica de Mike Santaroni (duplo sweep + cauda estendida ampliada)
        ctx.moveTo(startX - 8, baseY + 2);
        ctx.bezierCurveTo(startX + 55, baseY + 32, endX - 42, baseY - 10, endX + 15, baseY + 15);
        ctx.bezierCurveTo(endX + 32, baseY + 28, endX + 20, baseY + 42, endX - 48, baseY + 38);
        ctx.bezierCurveTo(endX - 110, baseY + 32, endX - 200, baseY + 45, endX - 300, baseY + 35);
      } else {
        // Rubrica dinâmica personalizada para qualquer oficial/agente ampliada
        ctx.moveTo(startX, baseY);
        ctx.bezierCurveTo(startX + 65, baseY + 30, endX - 50, baseY - 12, endX + 14, baseY + 16);
        ctx.bezierCurveTo(endX + 30, baseY + 28, endX + 18, baseY + 40, endX - 44, baseY + 35);
        ctx.bezierCurveTo(endX - 100, baseY + 28, endX - 180, baseY + 40, endX - 260, baseY + 32);
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
    doc.setFontSize(6.2);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("STATUS:", 135, metaY + 5.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(25, 125, 55);
    doc.text("HOMOLOGADO · FÉ PÚBLICA", 147, metaY + 5.2);

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

    // Y da primeira linha de assinaturas (posicionamento imponente ampliado)
    const sigW = 78;
    const sigH = 28;
    const row1LineY = startY + 16;
    const row1SigY = row1LineY - 23;

    // Coluna 1: Zaith Frost (Presidente)
    if (sigZaithImg) {
      try {
        doc.addImage(sigZaithImg, "PNG", col1X + 1, row1SigY, sigW, sigH);
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
        doc.addImage(sigMikeImg, "PNG", col2X + 1, row1SigY, sigW, sigH);
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
    const row2LineY = row2Y + 16;
    const row2SigY = row2LineY - 23;

    // Coluna Esquerda: Agente/Oficial Responsável com RUBRICA GRANDE DINÂMICA
    const nomeLimpo = toSignatureCase(agenteNome);
    const sigAgenteImg = gerarAssinaturaCanvas(nomeLimpo, { rot: -3.0, tipo: "agente" });

    if (sigAgenteImg) {
      try {
        doc.addImage(sigAgenteImg, "PNG", col1X + 1, row2SigY, sigW, sigH);
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
    const titulo = opts.service.id === "limpeza" ? "Certidão de Limpeza de Ficha Criminal" : (opts.service.title || "Certidão Oficial Notarial");
    const cidade = opts.cidade || (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    // 1. Cabeçalho, moldura e marca d'água oficial
    let curY = desenharEstruturaBase(doc, logo, watermark, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;
    const fields = opts.fields || [];

    // Seção 1: Dados Oficiais Registrados
    curY = desenharCabecalhoSecao(doc, curY, opts.service && opts.service.id === "limpeza" ? "1. Dados do Cidadão e Termo de Reabilitação" : "1. Dados e Declarações do Assento Cartorário");

    // Layout responsivo: layout dedicado para Limpeza de Ficha, 2 colunas se tiver 8 ou mais campos (ex: Porte de Arma), 1 coluna para os demais
    const nFields = fields.length;
    if (opts.service && opts.service.id === "limpeza") {
      const getVal = (pattern) => {
        const found = fields.find(f => pattern.test(f.label));
        return found && found.value && found.value !== "—" ? String(found.value) : "NÃO INFORMADO";
      };

      const cidadao = getVal(/cidad[ãa]o|requerente/i);
      const passaporte = getVal(/passaporte/i);
      const advogado = getVal(/advogado|defensor/i);
      const situacao = getVal(/situa[çc][ãa]o/i);
      const prisoes = getVal(/pris[õo]es/i);
      const emissao = getVal(/emiss[ãa]o/i);
      const valor = getVal(/valor/i);
      const artigos = getVal(/artigo|antecedente/i);
      const motivo = getVal(/motivo|fundamenta[çc][ãa]o|parecer/i);

      const gridPairs = [
        [{ label: "CIDADÃO (REQUERENTE)", val: cidadao }, { label: "PASSAPORTE / ID", val: passaporte }],
        [{ label: "ADVOGADO CONSTITUÍDO", val: advogado }, { label: "SITUAÇÃO DA PENA", val: situacao }],
        [{ label: "PRISÕES LIMPAS (R$ 50.000 / UN)", val: `${prisoes} registro(s) de prisão` }, { label: "VALOR TOTAL COBRADO", val: valor }],
        [{ label: "DATA DE EMISSÃO / HOMOLOGAÇÃO", val: emissao }, { label: "PRAZO DE VALIDADE", val: "Sem Prazo de Validade (Permanente)" }]
      ];

      const colW = (boxW - 3) / 2;
      const rowH = 8.2;
      const rowGap = 0.9;

      gridPairs.forEach((pair, rIdx) => {
        pair.forEach((item, cIdx) => {
          const x = cIdx === 0 ? 14 : 14 + colW + 3;
          const isEven = rIdx % 2 === 0;
          doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
          doc.setDrawColor(220, 226, 238);
          doc.setLineWidth(0.25);
          doc.roundedRect(x, curY, colW, rowH, 0.8, 0.8, "FD");
          doc.setFillColor(...ORO);
          doc.rect(x, curY, 1.8, rowH, "F");

          doc.setFont("helvetica", "bold");
          doc.setFontSize(5.5);
          doc.setTextColor(110, 118, 134);
          doc.text(item.label, x + 4, curY + 3.0, { maxWidth: colW - 7 });

          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(18, 24, 38);
          doc.text(item.val, x + 4, curY + 6.8, { maxWidth: colW - 7 });
        });
        curY += rowH + rowGap;
      });

      // Bloco de destaque para os Artigos Cometidos / Antecedentes Extintos
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.2);
      const artigosSplit = doc.splitTextToSize(artigos, boxW - 8);
      const artBoxH = Math.max(12, 6.5 + (artigosSplit.length * 3.4));

      doc.setFillColor(255, 253, 245);
      doc.setDrawColor(...ORO);
      doc.setLineWidth(0.35);
      doc.roundedRect(14, curY, boxW, artBoxH, 0.8, 0.8, "FD");
      doc.setFillColor(...ORO);
      doc.rect(14, curY, 2.2, artBoxH, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.8);
      doc.setTextColor(...ORO_ESCURO);
      doc.text("ARTIGOS PENAIS ANOTADOS / ANTECEDENTES EXTINTOS PELA REABILITAÇÃO:", 18, curY + 3.8);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.2);
      doc.setTextColor(18, 24, 38);
      doc.text(artigosSplit, 18, curY + 7.5, { maxWidth: boxW - 8, lineHeightFactor: 1.18 });

      curY += artBoxH + rowGap;

      // Bloco do Parecer e Fundamentação Notarial
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      const motivoSplit = doc.splitTextToSize(motivo, boxW - 8);
      const motBoxH = Math.max(10, 6.0 + (motivoSplit.length * 3.2));

      doc.setFillColor(250, 252, 255);
      doc.setDrawColor(220, 226, 238);
      doc.setLineWidth(0.25);
      doc.roundedRect(14, curY, boxW, motBoxH, 0.8, 0.8, "FD");
      doc.setFillColor(...ORO);
      doc.rect(14, curY, 1.8, motBoxH, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(110, 118, 134);
      doc.text("FUNDAMENTAÇÃO E PARECER DO CARTÓRIO NOTARIAL:", 18, curY + 3.6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.8);
      doc.setTextColor(45, 52, 68);
      doc.text(motivoSplit, 18, curY + 7.2, { maxWidth: boxW - 8, lineHeightFactor: 1.15 });

      curY += motBoxH + rowGap;
    } else if (nFields >= 8) {
      const colW = (boxW - 3) / 2;
      const rowH = 8.6;
      const rowGap = 1.0;

      for (let i = 0; i < nFields; i += 2) {
        const f1 = fields[i];
        const f2 = fields[i + 1];

        // Coluna 1
        const x1 = 14;
        const isEven = (i / 2) % 2 === 0;
        doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
        doc.setDrawColor(220, 226, 238);
        doc.setLineWidth(0.25);
        const w1 = f2 ? colW : boxW;
        doc.roundedRect(x1, curY, w1, rowH, 0.8, 0.8, "FD");
        doc.setFillColor(...ORO);
        doc.rect(x1, curY, 1.8, rowH, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.5);
        doc.setTextColor(110, 118, 134);
        doc.text(f1.label.toUpperCase(), x1 + 4, curY + (rowH * 0.35), { maxWidth: w1 - 7 });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(18, 24, 38);
        const val1 = f1.value && f1.value !== "—" ? String(f1.value) : "NÃO INFORMADO";
        doc.text(val1, x1 + 4, curY + (rowH * 0.78), { maxWidth: w1 - 7 });

        // Coluna 2 (se houver)
        if (f2) {
          const x2 = 14 + colW + 3;
          doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
          doc.setDrawColor(220, 226, 238);
          doc.setLineWidth(0.25);
          doc.roundedRect(x2, curY, colW, rowH, 0.8, 0.8, "FD");
          doc.setFillColor(...ORO);
          doc.rect(x2, curY, 1.8, rowH, "F");

          doc.setFont("helvetica", "bold");
          doc.setFontSize(5.5);
          doc.setTextColor(110, 118, 134);
          doc.text(f2.label.toUpperCase(), x2 + 4, curY + (rowH * 0.35), { maxWidth: colW - 7 });

          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(18, 24, 38);
          const val2 = f2.value && f2.value !== "—" ? String(f2.value) : "NÃO INFORMADO";
          doc.text(val2, x2 + 4, curY + (rowH * 0.78), { maxWidth: colW - 7 });
        }

        curY += rowH + rowGap;
      }
    } else {
      let rowH = 10;
      let rowGap = 1.2;
      if (nFields >= 5) {
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
        doc.text(f.label.toUpperCase(), 18, curY + (rowH * 0.36), { maxWidth: boxW - 8 });

        // Valor
        doc.setFont("helvetica", "bold");
        doc.setFontSize(rowH >= 9 ? 8.8 : 7.8);
        doc.setTextColor(18, 24, 38);
        const valText = f.value && f.value !== "—" ? String(f.value) : "NÃO INFORMADO";
        doc.text(valText, 18, curY + (rowH * 0.78), { maxWidth: boxW - 8 });

        curY += rowH + rowGap;
      });
    }

    curY += 1.5;

    // Seção 2: Termo de Homologação, Registro e Fé Pública (Preenche com solene autoridade notarial)
    curY = desenharCabecalhoSecao(doc, curY, "2. Termo de Homologação, Registro e Fé Pública");

    let termoCompleto =
      "O CARTÓRIO DO DEPARTAMENTO JURÍDICO DA COMARCA DE BRAVA RP, no uso das prerrogativas conferidas pela Presidência do Poder Judiciário e pela Corregedoria Geral de Justiça, CERTIFICA que foram cumpridos todos os pressupostos legais e formais exigidos para a lavratura deste ato notarial. O presente assento encontra-se registrado, averbado e homologado, gozando de fé pública originária, presunção absoluta de veracidade e eficácia plena perante todos os órgãos públicos, corporações policiais e instituições civis.";

    if (opts.service && opts.service.id === "porte") {
      const situacaoField = (opts.fields || []).find(f => f.label.toLowerCase().includes("situação") || f.label.toLowerCase().includes("emissão"));
      const sitVal = situacaoField ? situacaoField.value : "Primeiro Porte";
      let sitTxt = "concessão de Primeiro Porte de Arma de Fogo";
      if (sitVal.toLowerCase().includes("roubo")) {
        sitTxt = "emissão de 2ª Via do Porte de Arma de Fogo por motivo de Roubo/Furto do armamento anterior, conforme declaração e justificativa registradas";
      } else if (sitVal.toLowerCase().includes("perda")) {
        sitTxt = "emissão de 2ª Via do Porte de Arma de Fogo por motivo de Perda/Extravio do armamento anterior, conforme declaração e justificativa registradas";
      }

      termoCompleto =
        `O DEPARTAMENTO JURÍDICO DA COMARCA DE BRAVA RP, sob homologação da Presidência do Judiciário e em conformidade com as diretrizes de Segurança Pública, CERTIFICA a ${sitTxt} exclusiva para 1 Pistola PT 9mm (R$ 80.000) e fornecimento de munições (R$ 400 por unidade), condicionado estritamente à apresentação do Laudo Psicotécnico emitido pelo Hospital Municipal com parecer 'Apto'. O presente registro possui fé pública e validade oficial perante todas as forças policiais do Estado de Brava.`;
    } else if (opts.service && opts.service.id === "limpeza") {
      const cidadaoField = (opts.fields || []).find(f => f.label.toLowerCase().includes("cidadão") || f.label.toLowerCase().includes("requerente"));
      const cidNome = cidadaoField ? cidadaoField.value : "requerente qualificado";
      const prisoesField = (opts.fields || []).find(f => f.label.toLowerCase().includes("prisões") || f.label.toLowerCase().includes("prisoes"));
      const nPrisoes = prisoesField ? prisoesField.value : "1";
      termoCompleto =
        `O CARTÓRIO DO DEPARTAMENTO JURÍDICO DA COMARCA DE BRAVA RP, sob a autoridade da Presidência do Judiciário e nos termos das normas de Reabilitação Penal e Registro Notarial, CERTIFICA que foram devidamente quitadas e extintas todas as anotações e registros criminais pretéritos de ${cidNome}, concernentes a ${nPrisoes} registro(s) de prisão (taxa oficial de R$ 50.000 por prisão). Atesta-se o cancelamento definitivo das infrações anotadas e o restabelecimento da primariedade e da idoneidade civil perante os registros públicos e forças de segurança do Estado, possuindo eficácia permanente e imediata a partir de sua emissão, sem prazo de validade ou expiração.`;
    }

    // Validade da certidão (padrão 15 dias a contar da emissão, editável no formulário - não aplicável a Limpeza de Ficha)
    if (opts.service && opts.service.id !== "limpeza") {
      const validadeField = fields.find((f) => /validade/i.test(f.label));
      const emissaoField = fields.find((f) => /emiss[ãa]o/i.test(f.label));
      if (validadeField && validadeField.value && validadeField.value !== "Não informado") {
        const emTxt = emissaoField && emissaoField.value && emissaoField.value !== "Não informado" ? `, emitida em ${emissaoField.value}` : "";
        termoCompleto += ` A presente certidão${emTxt}, tem validade até ${validadeField.value}, devendo ser renovada após esta data.`;
      }
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    const termoLines = doc.splitTextToSize(termoCompleto, boxW - 8);
    const lineSpacing = 3.2;
    const textStartY = curY + 8.2;
    const textEndY = textStartY + (termoLines.length * lineSpacing);
    const divY = textEndY + 1.8;
    const attrY = divY + 3.8;
    const certBoxH = (attrY - curY) + 3.6;

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
    doc.setFontSize(5.8);
    doc.setTextColor(45, 52, 68);
    doc.text(termoLines, 18, textStartY, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.22 });

    // Divisória sutil antes dos atributos
    doc.setDrawColor(235, 238, 245);
    doc.setLineWidth(0.2);
    doc.line(18, divY, 14 + boxW - 4, divY);

    const isPorte = opts.service && opts.service.id === "porte";
    const isLimpeza = opts.service && opts.service.id === "limpeza";
    const natText = isPorte ? "Porte de Arma Legal" : isLimpeza ? "Reabilitação Criminal" : "Assento Notarial Oficial";
    const eficText = isPorte ? "Autorização Notarial" : isLimpeza ? "Cancelamento Definitivo (Permanente)" : "Oponibilidade 'Erga Omnes'";
    const segText = isPorte ? "Laudo Médico Hospitalar" : isLimpeza ? "Homologação Notarial SDJ" : "Criptografia Digital SHA-256";

    // Barra de atributos dentro da certidão
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· NATUREZA:", 18, attrY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text(natText, 34, attrY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· EFICÁCIA:", 78, attrY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text(eficText, 93, attrY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...ORO_ESCURO);
    doc.text("· SEGURANÇA:", 140, attrY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...TEXTO_ESCURO);
    doc.text(segText, 158, attrY);

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
     1-B. GERAÇÃO DE PDF PARA OS ATOS DO TRIBUNAL
          (Petições, Mandados, Intimações, Processos, Decisões...)
          opts = { titulo, fields:[{label,value,long}], agente, agenteId,
                   cargo, termo, natureza, eficacia, cidade, secaoDados, secaoTexto }
     ========================================================== */
  async function generateTribunalPDF(opts) {
    const jsPDF = getJsPDF();
    if (!jsPDF) throw new Error("Biblioteca jsPDF não encontrada.");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const { logo, watermark } = await getLogoAndWatermark();

    const dataHora = new Date().toLocaleString("pt-BR");
    const protocolo = gerarProtocolo();
    const titulo = opts.titulo || "Ato Oficial do Tribunal";
    const cidade = opts.cidade || "Brava RP";

    let curY = desenharEstruturaBase(doc, logo, watermark, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;
    const vazio = (v) => !v || v === "—" || v === "Não informado";
    const isDestaque = (f) => !!f.isFull || /artigo|infrac|crime|acusação|dispositivo|amparo|base legal/i.test(f.label);
    const curtosNormais = (opts.fields || []).filter((f) => !f.long && !isDestaque(f));
    const destaques = (opts.fields || []).filter((f) => !f.long && isDestaque(f) && !vazio(f.value));
    const longos = (opts.fields || []).filter((f) => f.long && !vazio(f.value));
    let sec = 1;

    // Seção 1: Identificação (grade de 2 colunas para dados breves)
    curY = desenharCabecalhoSecao(doc, curY, `${sec++}. ${opts.secaoDados || "Identificação do Ato Judicial"}`);
    const colW = (boxW - 3) / 2;
    const rowH = 8.6;
    const rowGap = 1.0;

    const celula = (f, x, w, y, zebra) => {
      doc.setFillColor(zebra ? 255 : 249, zebra ? 255 : 250, zebra ? 255 : 253);
      doc.setDrawColor(220, 226, 238);
      doc.setLineWidth(0.25);
      doc.roundedRect(x, y, w, rowH, 0.8, 0.8, "FD");
      doc.setFillColor(...ORO);
      doc.rect(x, y, 1.8, rowH, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(110, 118, 134);
      doc.text(String(f.label).toUpperCase(), x + 4, y + rowH * 0.35, { maxWidth: w - 7 });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(18, 24, 38);
      let val = vazio(f.value) ? "NÃO INFORMADO" : String(f.value);
      const linhas = doc.splitTextToSize(val, w - 7);
      if (linhas.length > 1) val = linhas[0].replace(/\s*\S{0,3}$/, "") + "...";
      doc.text(val, x + 4, y + rowH * 0.78);
    };

    for (let i = 0; i < curtosNormais.length; i += 2) {
      const zebra = (i / 2) % 2 === 0;
      const f1 = curtosNormais[i];
      const f2 = curtosNormais[i + 1];
      celula(f1, 14, f2 ? colW : boxW, curY, zebra);
      if (f2) celula(f2, 14 + colW + 3, colW, curY, zebra);
      curY += rowH + rowGap;
    }

    // Campos de destaque com linha inteira (ex.: Artigos / Infrações Penais / Base Legal)
    if (destaques.length) {
      destaques.forEach((f) => {
        const val = vazio(f.value) ? "NÃO INFORMADO" : String(f.value);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        const valLines = doc.splitTextToSize(val, boxW - 10);
        const cardH = Math.max(9.6, 5.6 + valLines.length * 3.4);

        doc.setFillColor(252, 253, 255);
        doc.setDrawColor(220, 226, 238);
        doc.setLineWidth(0.28);
        doc.roundedRect(14, curY, boxW, cardH, 0.8, 0.8, "FD");

        // Barra lateral dourada de destaque
        doc.setFillColor(...ORO);
        doc.rect(14, curY, 2.2, cardH, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.8);
        doc.setTextColor(...ORO_ESCURO);
        doc.text(String(f.label).toUpperCase(), 18, curY + 3.8);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(15, 23, 42);
        valLines.forEach((ln, lIdx) => {
          doc.text(ln, 18, curY + 7.4 + lIdx * 3.4);
        });

        curY += cardH + rowGap;
      });
    }
    curY += 1.5;

    // Pré-calcula o termo (para reservar espaço antes das assinaturas)
    const termo = opts.termo ||
      "A SECRETARIA DO TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA RP CERTIFICA que o presente ato foi registrado nos assentamentos oficiais, com fé pública e eficácia plena perante todos os órgãos públicos, corporações policiais e instituições civis.";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    const termoLines = doc.splitTextToSize(termo, boxW - 8);
    const termoBoxH = 17.4 + termoLines.length * 3.2;
    const SIG_TOP = 226;

    // Seção 2: Teor / Fundamentação (textos longos com quebra de linha)
    if (longos.length) {
      curY = desenharCabecalhoSecao(doc, curY, `${sec++}. ${opts.secaoTexto || "Teor e Fundamentação"}`);
      const limite = SIG_TOP - 2 - (8.2 + termoBoxH + 2.5);
      const lh = 3.4;

      longos.forEach((f, idx) => {
        if (curY + 9 > limite) return;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.4);
        let linhas = doc.splitTextToSize(String(f.value), boxW - 8);
        const reservaOutros = (longos.length - idx - 1) * 10;
        const maxLinhas = Math.max(1, Math.floor((limite - reservaOutros - (curY + 7)) / lh));
        if (linhas.length > maxLinhas) {
          linhas = linhas.slice(0, maxLinhas);
          linhas[maxLinhas - 1] = linhas[maxLinhas - 1].replace(/\s*\S{0,3}$/, "") + "...";
        }
        const h = 6 + linhas.length * lh + 1.5;

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(220, 226, 238);
        doc.setLineWidth(0.25);
        doc.roundedRect(14, curY, boxW, h, 0.8, 0.8, "FD");
        doc.setFillColor(...ORO);
        doc.rect(14, curY, 1.8, h, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.8);
        doc.setTextColor(110, 118, 134);
        doc.text(String(f.label).toUpperCase(), 18, curY + 3.6);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.4);
        doc.setTextColor(18, 24, 38);
        linhas.forEach((ln, i) => doc.text(ln, 18, curY + 7.4 + i * lh));

        curY += h + 1.2;
      });
      curY += 1;
    }

    // Seção 3: Certidão da Secretaria
    curY = desenharCabecalhoSecao(doc, curY, `${sec++}. Certidão da Secretaria e Fé Pública`);
    const textStartY = curY + 8.2;
    const divY = textStartY + termoLines.length * 3.2 + 1.8;
    const attrY = divY + 3.8;

    doc.setFillColor(251, 252, 255);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, curY, boxW, termoBoxH, 1.2, 1.2, "FD");
    doc.setDrawColor(230, 234, 245);
    doc.setLineWidth(0.18);
    doc.rect(15.2, curY + 1.0, boxW - 2.4, termoBoxH - 2.0);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.0);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("CERTIDÃO DO CARTÓRIO JUDICIAL", 18, curY + 4.8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    doc.setTextColor(45, 52, 68);
    doc.text(termoLines, 18, textStartY, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.22 });

    doc.setDrawColor(235, 238, 245);
    doc.setLineWidth(0.2);
    doc.line(18, divY, 14 + boxW - 4, divY);

    const attrs = [
      ["· NATUREZA:", opts.natureza || "Ato Judicial", 18, 34],
      ["· EFICÁCIA:", opts.eficacia || "Imediata", 78, 93],
      ["· SEGURANÇA:", "Criptografia SHA-256", 140, 158],
    ];
    doc.setFontSize(5.8);
    attrs.forEach(([rot, val, xr, xv]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...ORO_ESCURO);
      doc.text(rot, xr, attrY);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...TEXTO_ESCURO);
      doc.text(String(val), xv, attrY);
    });

    curY += termoBoxH + 2.5;

    // Assinaturas: Presidência + Responsável pelo ato + Chancela com QR Code
    const signatureStartY = Math.min(Math.max(curY + 1, SIG_TOP), 231);
    desenharBlocoAssinaturasEChancela(doc, signatureStartY, opts.agente, opts.agenteId, opts.cargo || "Juiz de Direito", protocolo);

    const safeTitle = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `Tribunal_${safeTitle}_${protocolo}.pdf`;
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

  /* ==========================================================
     3. GERAÇÃO DE PDF: ATA NOTARIAL DE PROVA ORAL
     (Avaliação de Candidatos — Recrutamento Judiciário)
     ========================================================== */
  async function generateProvaOralPDF(opts) {
    const jsPDF = getJsPDF();
    if (!jsPDF) throw new Error("Biblioteca jsPDF não encontrada.");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const { logo, watermark } = await getLogoAndWatermark();

    const dataHora = (opts.data ? `${opts.data} às ${opts.hora || "—"}` : new Date().toLocaleString("pt-BR"));
    const protocolo = gerarProtocolo();
    const titulo = "Ata Notarial de Exame Oral de Admissão";
    const cidade = opts.cidade || (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    // 1. Estrutura base notarial
    let curY = desenharEstruturaBase(doc, logo, watermark, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;

    // Seção 1: Qualificação das Partes
    curY = desenharCabecalhoSecao(doc, curY, "1. Qualificação das Partes e da Banca Examinadora");

    const qualH = 14;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220, 226, 238);
    doc.setLineWidth(0.25);
    doc.roundedRect(14, curY, boxW, qualH, 0.8, 0.8, "FD");

    // Linha divisória vertical
    doc.setDrawColor(230, 234, 245);
    doc.line(14 + boxW / 2, curY + 1.5, 14 + boxW / 2, curY + qualH - 1.5);

    // Coluna 1: Recrutador / Instrutor
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.0);
    doc.setTextColor(110, 118, 134);
    doc.text("EXAMINADOR / RECRUTADOR OFICIAL", 18, curY + 4.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`${opts.recrutador || "Zaith Frost"} (ID: ${opts.recrutadorId || "—"})`, 18, curY + 8.8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.2);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text("Banca de Seleção do Departamento Jurídico", 18, curY + 12.2);

    // Coluna 2: Candidato
    const col2X = 14 + (boxW / 2) + 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.0);
    doc.setTextColor(110, 118, 134);
    doc.text("CANDIDATO(A) AVALIADO(A)", col2X, curY + 4.2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`${opts.candidato || "Candidato"} (ID: ${opts.candidatoId || "—"})`, col2X, curY + 8.8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.0);
    doc.setTextColor(...TEXTO_MUTED);
    const cargoIndicado = opts.cargo || "Estagiário";
    doc.text(`Cargo Indicado: ${cargoIndicado} · Prova Oral (12 Questões)`, col2X, curY + 12.2);

    curY += qualH + 2.5;

    // Seção 2: Desempenho e Veredicto
    curY = desenharCabecalhoSecao(doc, curY, "2. Quadro de Desempenho, Postura e Veredicto");

    const desempH = 15.5;
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(...ORO);
    doc.setLineWidth(0.35);
    doc.roundedRect(14, curY, boxW, desempH, 1.0, 1.0, "FD");

    // 4 Blocos de Informação
    const blockW = boxW / 4;
    const scoreVal = typeof opts.score === "number" ? opts.score.toFixed(1) : (opts.score || "0.0");
    const pctVal = opts.percent ? `${opts.percent}%` : `${Math.round((parseFloat(scoreVal) / 12) * 100)}%`;
    const resultado = (opts.resultado || "APROVADO").toUpperCase();
    const postura = opts.postura || "Adequada";

    // Bloco 1: Pontuação
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(110, 118, 134);
    doc.text("PONTUAÇÃO OBTIDA", 18, curY + 4.6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`${scoreVal}`, 18, curY + 10.2);
    doc.setFontSize(7.2);
    doc.setTextColor(...TEXTO_MUTED);
    doc.text(" / 12.0", 18 + doc.getTextWidth(scoreVal) + 1, curY + 10.2);

    // Bloco 2: Aproveitamento
    const b2X = 14 + blockW;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(110, 118, 134);
    doc.text("APROVEITAMENTO", b2X, curY + 4.6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...ORO_ESCURO);
    doc.text(pctVal, b2X, curY + 10.2);

    // Bloco 3: Postura & Ética
    const b3X = 14 + blockW * 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(110, 118, 134);
    doc.text("POSTURA & ÉTICA", b3X, curY + 4.6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.0);
    if (postura.toLowerCase().includes("adequada")) {
      doc.setTextColor(25, 125, 55);
    } else if (postura.toLowerCase().includes("inadequada")) {
      doc.setTextColor(180, 40, 40);
    } else {
      doc.setTextColor(180, 130, 20);
    }
    doc.text(postura, b3X, curY + 10.0);

    // Bloco 4: Veredicto Oficial
    const b4X = 14 + blockW * 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(110, 118, 134);
    doc.text("VEREDICTO FINAL", b4X, curY + 4.6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    if (resultado === "APROVADO") {
      doc.setTextColor(25, 125, 55);
    } else if (resultado === "REPROVADO") {
      doc.setTextColor(180, 40, 40);
    } else {
      doc.setTextColor(180, 130, 20);
    }
    doc.text(resultado, b4X, curY + 10.2);

    // Linha inferior do resumo
    doc.setFont("helvetica", "italic");
    doc.setFontSize(5.5);
    doc.setTextColor(...TEXTO_MUTED);
    const nChecklist = Array.isArray(opts.checklist) ? opts.checklist.length : 6;
    doc.text(`* Avaliação baseada no Manual do Recrutador. Checklist: ${nChecklist}/6 requisitos confirmados. Nota de corte sugerida: 80% (9.5+).`, 18, curY + 14.0);

    curY += desempH + 2.5;

    // Seção 3: Espelho das 12 Questões
    curY = desenharCabecalhoSecao(doc, curY, "3. Espelho Sintético das 12 Questões Aplicadas");

    // Tabela Cabeçalho
    const tblHeadH = 4.8;
    doc.setFillColor(...AZUL_NOITE);
    doc.rect(14, curY, boxW, tblHeadH, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.6);
    doc.setTextColor(255, 255, 255);
    doc.text("Q#", 17, curY + 3.3);
    doc.text("TEMA / CONCEITO AVALIADO", 26, curY + 3.3);
    doc.text("TIPO", 98, curY + 3.3);
    doc.text("RESUMO DA MATÉRIA", 116, curY + 3.3);
    doc.text("NOTA", 168, curY + 3.3);
    doc.text("STATUS", 182, curY + 3.3);

    curY += tblHeadH;

    const rowH = 4.0;
    const questions = opts.questions || [];

    const resumoMap = [
      "Papel do Judiciário e Regra de Ouro",
      "Conceito legal e finalidade da Fiança",
      "Distinção crucial: Fiança x Inocência/Pena",
      "Crimes inafiançáveis: Vida, Sequestro, Desacato",
      "Réu Primário: -25% exclusivo na Fiança",
      "Advogado Constituído: -50% Pena e Multa",
      "Advogado não reduz fiança automaticamente",
      "Fluxo operacional em 5 etapas para casos",
      "Cálculo Prático: Fiança Réu Primário (-25%)",
      "Caso Prático: Inafiançabilidade do Sequestro",
      "Cálculo Prático: Pena com Advogado (-50%)",
      "Ética, recusa de suborno e autonomia policial"
    ];

    for (let idx = 0; idx < 12; idx++) {
      const q = questions[idx] || { id: idx + 1 };
      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
      doc.setDrawColor(230, 235, 244);
      doc.setLineWidth(0.2);
      doc.rect(14, curY, boxW, rowH, "FD");

      // Q#
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(...AZUL_NOITE);
      doc.text(String(q.id || (idx + 1)).padStart(2, "0"), 17, curY + 2.8);

      // Tema
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(40, 48, 65);
      const temaTxt = (q.tema || "").replace(/&/g, "e");
      doc.text(temaTxt.substring(0, 38), 26, curY + 2.8);

      // Tipo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.2);
      doc.setTextColor(...TEXTO_MUTED);
      doc.text(q.tipo || (idx < 8 ? "Teórica" : "Prática"), 98, curY + 2.8);

      // Resumo da Matéria
      doc.setFont("helvetica", "normal");
      doc.setFontSize(5.2);
      doc.setTextColor(60, 68, 82);
      doc.text(resumoMap[idx] || (q.pergunta || "").substring(0, 36), 116, curY + 2.8);

      // Nota
      const qScore = typeof q.score === "number" ? q.score.toFixed(1) : (q.score || "1.0");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.6);
      if (parseFloat(qScore) >= 1.0) {
        doc.setTextColor(25, 125, 55);
      } else if (parseFloat(qScore) > 0) {
        doc.setTextColor(...ORO_ESCURO);
      } else {
        doc.setTextColor(180, 40, 40);
      }
      doc.text(`${qScore} pt`, 168, curY + 2.8);

      // Status
      let statusTxt = "Correto";
      if (parseFloat(qScore) === 0.5) statusTxt = "Parcial";
      else if (parseFloat(qScore) === 0) statusTxt = "Incorreto";
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.2);
      doc.text(statusTxt, 182, curY + 2.8);

      curY += rowH;
    }

    curY += 1.5;

    // Seção 4: Parecer Conclusivo do Examinador
    curY = desenharCabecalhoSecao(doc, curY, "4. Parecer Conclusivo e Observações do Examinador");

    const obsH = 11.5;
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(220, 226, 238);
    doc.setLineWidth(0.25);
    doc.roundedRect(14, curY, boxW, obsH, 0.8, 0.8, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("DELIBERAÇÃO DA BANCA EXAMINADORA:", 18, curY + 3.8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.4);
    doc.setTextColor(45, 52, 68);
    const obsTexto = opts.observacoes && opts.observacoes.trim()
      ? opts.observacoes.trim()
      : (resultado === "APROVADO"
          ? "O candidato demonstrou pleno domínio dos conceitos do Código Penal, benefícios legais (réu primário e advogado), identificação precisa de crimes inafiançáveis e irrepreensível postura de imparcialidade e anticorrupção perante o Judiciário de Brava City."
          : resultado === "REAVALIAR"
          ? "O candidato apresentou compreensão parcial da matéria, necessitando aprofundar estudos sobre cálculo de benefícios, inafiançabilidade e distinção entre fiança e pena. Recomenda-se nova avaliação após período de estudo."
          : "O candidato não atingiu os requisitos mínimos de conhecimento regulamentar e/ou postura profissional exigidos para o exercício das atribuições no Departamento Jurídico.");

    doc.text(obsTexto, 18, curY + 7.0, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.25 });

    curY += obsH + 1.8;

    // Seção 5: Indicação de Cargo e Homologação da Presidência (Efetivação)
    curY = desenharCabecalhoSecao(doc, curY, "5. Indicação de Cargo e Homologação da Presidência (Efetivação)");

    const homH = 14.2;
    const homologacao = opts.homologacao || "PENDENTE";
    const cargoNome = opts.cargo || "Estagiário";

    if (homologacao === "HOMOLOGADO_ZAITH" || homologacao === "HOMOLOGADO_MIKE") {
      doc.setFillColor(242, 253, 245);
      doc.setDrawColor(34, 150, 70);
    } else if (homologacao === "INDEFERIDO") {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(220, 38, 38);
    } else {
      // PENDENTE
      doc.setFillColor(255, 252, 240);
      doc.setDrawColor(...ORO);
    }
    doc.setLineWidth(0.35);
    doc.roundedRect(14, curY, boxW, homH, 0.8, 0.8, "FD");

    // Título do Status de Homologação (sem emojis para evitar caractere corrompido [#6])
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.0);
    if (homologacao === "HOMOLOGADO_ZAITH") {
      doc.setTextColor(25, 125, 55);
      doc.text("[HOMOLOGADO] AUTORIZADO PELO PRESIDENTE ZAITH FROST", 18, curY + 4.0);
    } else if (homologacao === "HOMOLOGADO_MIKE") {
      doc.setTextColor(25, 125, 55);
      doc.text("[HOMOLOGADO] AUTORIZADO PELO VICE-PRESIDENTE MIKE SANTARONI", 18, curY + 4.0);
    } else if (homologacao === "INDEFERIDO") {
      doc.setTextColor(180, 40, 40);
      doc.text("[INDEFERIDO] EFETIVAÇÃO RECUSADA PELA PRESIDÊNCIA", 18, curY + 4.0);
    } else {
      doc.setTextColor(...ORO_ESCURO);
      doc.text("[PENDENTE DE HOMOLOGAÇÃO] AGUARDANDO DESPACHO FORMAL", 18, curY + 4.0);
    }

    // Cargo Indicado alinhado à direita para garantir que caiba perfeitamente
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(...AZUL_NOITE);
    doc.text(`CARGO INDICADO: ${cargoNome.toUpperCase()}`, 14 + boxW - 4, curY + 4.0, { align: "right" });

    // Texto explicativo e estatutário
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.3);
    doc.setTextColor(45, 52, 68);

    let descHomologacao = "";
    if (homologacao === "HOMOLOGADO_ZAITH" || homologacao === "HOMOLOGADO_MIKE") {
      const autoridade = homologacao === "HOMOLOGADO_ZAITH" ? "pelo Presidente Zaith Frost" : "pelo Vice-Presidente Mike Santaroni";
      descHomologacao = `Ata ratificada e despachada favoravelmente com status "Aprovado" ${autoridade}. Candidato oficialmente habilitado para investidura e posse imediata nas funções de ${cargoNome}.`;
    } else if (homologacao === "INDEFERIDO") {
      descHomologacao = `A Presidência do Departamento Jurídico indeferiu a homologação para investidura no cargo de ${cargoNome}. O candidato deverá cumprir novas diretrizes regimentais para reavaliação.`;
    } else {
      descHomologacao = `O examinador indicou o candidato para o cargo de "${cargoNome}". CONDIÇÃO RESOLUTIVA: Antes do candidato ser efetivado, o Presidente (Zaith Frost) ou o Vice-Presidente (Mike Santaroni) deverão conceder o "Aprovado" formal nesta ata.`;
    }

    if (opts.despachoPresidencia && opts.despachoPresidencia.trim()) {
      descHomologacao += ` Despacho do Gabinete: "${opts.despachoPresidencia.trim()}".`;
    }

    doc.text(descHomologacao, 18, curY + 7.4, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.25 });

    // 6. Assinaturas Grandes e Chancela Notarial
    const sigStartY = Math.max(curY + homH + 4.0, 198);
    desenharBlocoAssinaturasEChancela(doc, sigStartY, opts.recrutador || "Zaith Frost", opts.recrutadorId || "101", "Examinador / Recrutador Responsável", protocolo);

    const safeNome = (opts.candidato || "Candidato").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `Ata_Prova_Oral_${safeNome}_${protocolo}.pdf`;
    const blob = doc.output("blob");

    return { doc, blob, filename, protocolo };
  }

  /* ==========================================================
     4. RENDERIZADOR CANVAS DA CARTEIRINHA FUNCIONAL (HD)
     Desenha a Frente, o Verso ou Ambos em alta resolução
     ========================================================== */
  function carregarImagemAsync(src) {
    if (!src) return Promise.resolve(null);
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function drawRoundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  async function renderCarterinhaCanvas(dados, lado = "frente") {
    if (typeof document === "undefined") return null;

    const W = 960;
    const H = 606; // Relação 1.584 padrão CR-80

    // Carrega imagens necessárias
    const [fotoImg, logoImg, qrImg] = await Promise.all([
      carregarImagemAsync(dados.fotoUrl || null),
      carregarImagemAsync("arte.png"),
      carregarImagemAsync(dados.qrDataUrl || (dados.qrTexto ? gerarQrCodeDataUrl(dados.qrTexto, 180) : null))
    ]);

    if (lado === "ambos") {
      // Cria imagem combinada elegante (Frente ao lado do Verso)
      const canvasAmbos = document.createElement("canvas");
      canvasAmbos.width = 2020;
      canvasAmbos.height = 760;
      const ctxA = canvasAmbos.getContext("2d");

      // Fundo sofisticado escuro com acabamento metálico
      const bgG = ctxA.createLinearGradient(0, 0, 2020, 760);
      bgG.addColorStop(0, "#07090e");
      bgG.addColorStop(0.5, "#0e1422");
      bgG.addColorStop(1, "#06080d");
      ctxA.fillStyle = bgG;
      ctxA.fillRect(0, 0, 2020, 760);

      // Título do documento
      ctxA.font = "bold 24px 'Cinzel', serif";
      ctxA.fillStyle = "#f6d285";
      ctxA.textAlign = "center";
      ctxA.fillText("REPÚBLICA DE BRAVA · DEPARTAMENTO JURÍDICO", 1010, 48);

      ctxA.font = "14px 'Inter', sans-serif";
      ctxA.fillStyle = "#a8a192";
      ctxA.fillText("CARTEIRA DE IDENTIDADE FUNCIONAL OFICIAL — PADRÃO CR-80", 1010, 74);

      // Renderiza Frente e Verso
      const cFrente = await renderCarterinhaCanvas(dados, "frente");
      const cVerso = await renderCarterinhaCanvas(dados, "verso");

      // Sombra projetada para cada face
      ctxA.shadowColor = "rgba(0, 0, 0, 0.75)";
      ctxA.shadowBlur = 35;
      ctxA.shadowOffsetY = 15;

      ctxA.drawImage(cFrente, 40, 105, W, H);
      ctxA.drawImage(cVerso, 1020, 105, W, H);

      ctxA.shadowColor = "transparent";

      // Legendas
      ctxA.font = "bold 13px 'Inter', sans-serif";
      ctxA.fillStyle = "#d4af5f";
      ctxA.fillText("▼ ANVERSO (FRENTE)", 520, 735);
      ctxA.fillText("▼ VERSO (REGISTROS & MRZ)", 1500, 735);

      return canvasAmbos;
    }

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    if (lado === "frente") {
      // 1. Fundo Gradiente Nobre
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#050a14");
      bg.addColorStop(0.45, "#0b1526");
      bg.addColorStop(1, "#040810");
      ctx.fillStyle = bg;
      drawRoundRect(ctx, 0, 0, W, H, 28, true, false);

      // 2. Guilhochê de Segurança
      ctx.save();
      drawRoundRect(ctx, 0, 0, W, H, 28, false, false);
      ctx.clip();
      ctx.strokeStyle = "rgba(212, 175, 95, 0.045)";
      ctx.lineWidth = 1;
      for (let y = -200; y < H + 200; y += 18) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 10) {
          const cy = y + Math.sin(x * 0.02) * 14;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Moldura Externa Dourada
      ctx.strokeStyle = "rgba(212, 175, 95, 0.75)";
      ctx.lineWidth = 3.5;
      drawRoundRect(ctx, 4, 4, W - 8, H - 8, 25, false, true);

      // 4. Cabeçalho Oficial
      if (logoImg) {
        ctx.drawImage(logoImg, 38, 22, 66, 66);
      }

      ctx.fillStyle = "#c5bfae";
      ctx.font = "bold 14px 'Inter', sans-serif";
      ctx.fillText("REPÚBLICA DE BRAVA · CIDADE DE BRAVA RP", 120, 38);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText("DEPARTAMENTO JURÍDICO · PODER JUDICIÁRIO", 120, 60);

      ctx.fillStyle = "#f6d285";
      ctx.font = "bold 21px 'Cinzel', serif";
      ctx.fillText("CARTEIRA DE IDENTIDADE FUNCIONAL", 120, 84);

      // Ícone Balança no topo direito
      ctx.font = "26px sans-serif";
      ctx.fillText("⚖️", W - 68, 62);

      // Barra dourada divisória
      const barG = ctx.createLinearGradient(38, 98, W - 38, 98);
      barG.addColorStop(0, "transparent");
      barG.addColorStop(0.2, "#d4af5f");
      barG.addColorStop(0.5, "#fff1b0");
      barG.addColorStop(0.8, "#d4af5f");
      barG.addColorStop(1, "transparent");
      ctx.fillStyle = barG;
      ctx.fillRect(38, 96, W - 76, 3);

      // 5. Foto 3x4 do Personagem
      const pX = 40;
      const pY = 120;
      const pW = 195;
      const pH = 250;

      // Fundo e Sombra da Foto
      ctx.fillStyle = "#0c121d";
      drawRoundRect(ctx, pX, pY, pW, pH, 12, true, false);

      ctx.save();
      drawRoundRect(ctx, pX, pY, pW, pH, 12, false, false);
      ctx.clip();

      if (fotoImg) {
        // Enquadramento automático com aspect ratio mantido (cover)
        const imgRatio = fotoImg.naturalWidth / fotoImg.naturalHeight;
        const boxRatio = pW / pH;
        let dw, dh, dx, dy;
        if (imgRatio > boxRatio) {
          dh = pH;
          dw = pH * imgRatio;
          dx = pX - (dw - pW) / 2;
          dy = pY;
        } else {
          dw = pW;
          dh = pW / imgRatio;
          dx = pX;
          dy = pY - (dh - pH) / 2;
        }
        ctx.drawImage(fotoImg, dx, dy, dw, dh);
      } else {
        // Silhueta padrão do brasão se não houver foto anexada
        if (logoImg) {
          ctx.globalAlpha = 0.45;
          ctx.drawImage(logoImg, pX + 25, pY + 35, 145, 145);
          ctx.globalAlpha = 1.0;
        }
        ctx.fillStyle = "#d4af5f";
        ctx.font = "bold 13px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("FOTO 3x4", pX + pW / 2, pY + 220);
        ctx.textAlign = "left";
      }

      // Tarja de Carimbo sobre a foto
      ctx.fillStyle = "rgba(12, 18, 28, 0.92)";
      ctx.fillRect(pX, pY + pH - 24, pW, 24);
      ctx.fillStyle = "#f6d285";
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("SDJ · DOCUMENTO VÁLIDO", pX + pW / 2, pY + pH - 8);
      ctx.textAlign = "left";

      ctx.restore();

      // Borda dourada chanfrada da foto
      ctx.strokeStyle = "#d4af5f";
      ctx.lineWidth = 3;
      drawRoundRect(ctx, pX, pY, pW, pH, 12, false, true);

      // 6. Chip EMV Inteligente Dourado
      const cX = pX + 35;
      const cY = pY + pH + 22;
      const cW = 125;
      const cH = 85;

      const chipG = ctx.createLinearGradient(cX, cY, cX + cW, cY + cH);
      chipG.addColorStop(0, "#fde68a");
      chipG.addColorStop(0.5, "#d4af37");
      chipG.addColorStop(1, "#927114");
      ctx.fillStyle = chipG;
      drawRoundRect(ctx, cX, cY, cW, cH, 8, true, false);
      ctx.strokeStyle = "#6b5109";
      ctx.lineWidth = 2;
      drawRoundRect(ctx, cX, cY, cW, cH, 8, false, true);

      // Linhas do circuito do chip
      ctx.strokeStyle = "#6b5109";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cX, cY + cH * 0.35); ctx.lineTo(cX + cW, cY + cH * 0.35);
      ctx.moveTo(cX, cY + cH * 0.65); ctx.lineTo(cX + cW, cY + cH * 0.65);
      ctx.moveTo(cX + cW * 0.45, cY); ctx.lineTo(cX + cW * 0.45, cY + cH);
      ctx.stroke();

      // Símbolo NFC / Contactless
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 2.5;
      for (let r = 10; r <= 22; r += 6) {
        ctx.beginPath();
        ctx.arc(cX + cW + 28, cY + cH / 2, r, -Math.PI * 0.25, Math.PI * 0.25);
        ctx.stroke();
      }

      // 7. Dados do Membro (Coluna Direita)
      const dX = 265;
      let curY = 130;

      // NOME
      ctx.fillStyle = "#9f9788";
      ctx.font = "bold 13px 'Inter', sans-serif";
      ctx.fillText("NOME DO TITULAR", dX, curY);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px 'Cinzel', serif";
      const nomeText = (dados.nome || "Zaith Frost").toUpperCase();
      ctx.fillText(nomeText, dX, curY + 28);

      curY += 62;

      // CARGO & ID
      ctx.fillStyle = "#9f9788";
      ctx.font = "bold 13px 'Inter', sans-serif";
      ctx.fillText("CARGO / FUNÇÃO", dX, curY);
      ctx.fillText("PASSAPORTE (ID)", dX + 380, curY);

      // Badge Cargo
      const cargoText = (dados.cargo || "Advogado Júnior").toUpperCase();
      ctx.font = "bold 18px 'Inter', sans-serif";
      const cargoW = ctx.measureText(cargoText).width + 24;

      ctx.fillStyle = "rgba(212, 175, 95, 0.22)";
      drawRoundRect(ctx, dX, curY + 8, Math.min(cargoW, 350), 34, 6, true, false);
      ctx.strokeStyle = "#d4af5f";
      ctx.lineWidth = 1.5;
      drawRoundRect(ctx, dX, curY + 8, Math.min(cargoW, 350), 34, 6, false, true);

      ctx.fillStyle = "#fce080";
      ctx.fillText(cargoText, dX + 12, curY + 31);

      // Valor ID
      ctx.fillStyle = "#4ade80";
      ctx.font = "bold 24px 'Inter', sans-serif";
      ctx.fillText("#" + (dados.id || "101"), dX + 380, curY + 32);

      curY += 72;

      // INSCRIÇÃO & NATURALIDADE
      ctx.fillStyle = "#9f9788";
      ctx.font = "bold 13px 'Inter', sans-serif";
      ctx.fillText("INSCRIÇÃO OFICIAL OAB/SDJ", dX, curY);
      ctx.fillText("NATURALIDADE", dX + 380, curY);

      ctx.fillStyle = "#f6d285";
      ctx.font = "bold 22px 'Cinzel', serif";
      ctx.fillText(dados.inscricao || "OAB/SDJ-2026-0101", dX, curY + 26);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px 'Inter', sans-serif";
      ctx.fillText(dados.naturalidade || "Brava City", dX + 380, curY + 26);

      curY += 66;

      // Tarja Holográfica de Segurança
      const holoG = ctx.createLinearGradient(dX, curY, dX + 640, curY);
      holoG.addColorStop(0, "rgba(212, 175, 95, 0.18)");
      holoG.addColorStop(0.5, "rgba(147, 214, 255, 0.22)");
      holoG.addColorStop(1, "rgba(212, 175, 95, 0.18)");
      ctx.fillStyle = holoG;
      drawRoundRect(ctx, dX, curY, 650, 28, 4, true, false);
      ctx.strokeStyle = "rgba(212, 175, 95, 0.5)";
      ctx.lineWidth = 1;
      drawRoundRect(ctx, dX, curY, 650, 28, 4, false, true);

      ctx.fillStyle = "#ffea9f";
      ctx.font = "bold 11.5px 'Inter', sans-serif";
      ctx.fillText("AUTÊNTICO · PODER JUDICIÁRIO DE BRAVA · FÉ PÚBLICA · OFICIAL REGISTRAL", dX + 14, curY + 18);

      // 8. Rodapé da Frente
      ctx.fillStyle = "rgba(212, 175, 95, 0.4)";
      ctx.fillRect(38, H - 42, W - 76, 1.2);

      ctx.fillStyle = "#8a8172";
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.fillText("DOCUMENTO DE IDENTIFICAÇÃO OFICIAL VÁLIDO EM TODA A JURISDIÇÃO", 40, H - 20);
      ctx.textAlign = "right";
      ctx.fillText("SEGURANÇA REGISTRAL 2026", W - 40, H - 20);
      ctx.textAlign = "left";

      return canvas;
    }

    if (lado === "verso") {
      // 1. Fundo Gradiente Verso
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05080e");
      bg.addColorStop(0.5, "#0d131f");
      bg.addColorStop(1, "#060911");
      ctx.fillStyle = bg;
      drawRoundRect(ctx, 0, 0, W, H, 28, true, false);

      // Moldura Externa
      ctx.strokeStyle = "rgba(212, 175, 95, 0.65)";
      ctx.lineWidth = 3.5;
      drawRoundRect(ctx, 4, 4, W - 8, H - 8, 25, false, true);

      // 2. Tarja Magnética Superior
      const magG = ctx.createLinearGradient(0, 10, 0, 85);
      magG.addColorStop(0, "#191a1e");
      magG.addColorStop(0.5, "#0b0c0e");
      magG.addColorStop(1, "#181a1d");
      ctx.fillStyle = magG;
      ctx.fillRect(4, 10, W - 8, 75);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(4, 10, W - 8, 75);

      // 3. Faixa de Assinatura do Titular
      const sigX = 36;
      const sigY = 100;
      const sigW = W - 72;
      const sigH = 55;

      ctx.fillStyle = "#f5f0e6";
      drawRoundRect(ctx, sigX, sigY, sigW, sigH, 6, true, false);
      ctx.strokeStyle = "#c4b69d";
      ctx.lineWidth = 1.5;
      drawRoundRect(ctx, sigX, sigY, sigW, sigH, 6, false, true);

      // Microtexto de segurança na faixa
      ctx.fillStyle = "rgba(90, 75, 45, 0.14)";
      ctx.font = "bold 8.5px 'Inter', sans-serif";
      const microtext = "FÉ PÚBLICA · DEPARTAMENTO JURÍDICO BRAVA · FÉ PÚBLICA · DEPARTAMENTO JURÍDICO BRAVA · FÉ PÚBLICA · DEPARTAMENTO JURÍDICO BRAVA";
      ctx.fillText(microtext, sigX + 12, sigY + 18);
      ctx.fillText(microtext, sigX + 12, sigY + 48);

      // Assinatura Caligráfica do Titular
      ctx.fillStyle = "#072146";
      ctx.font = "italic bold 32px 'Dancing Script', cursive";
      ctx.fillText(toSignatureCase(dados.nome || "Zaith Frost"), sigX + 24, sigY + 38);

      ctx.fillStyle = "#7a6e5b";
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("ASSINATURA DO TITULAR", sigX + sigW - 14, sigY + 33);
      ctx.textAlign = "left";

      // 4. Metadados do Verso
      const mX = 40;
      let mY = 185;

      ctx.fillStyle = "#948c7f";
      ctx.font = "bold 12px 'Inter', sans-serif";
      ctx.fillText("TELEFONE:", mX, mY);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText(dados.telefone || "555-0101", mX + 110, mY);

      ctx.fillStyle = "#948c7f";
      ctx.font = "bold 12px 'Inter', sans-serif";
      ctx.fillText("EXPEDIÇÃO:", mX + 310, mY);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText(dados.expedicao || new Date().toLocaleDateString("pt-BR"), mX + 410, mY);

      mY += 32;

      ctx.fillStyle = "#948c7f";
      ctx.font = "bold 12px 'Inter', sans-serif";
      ctx.fillText("SITUAÇÃO:", mX, mY);
      ctx.fillStyle = "#4ade80";
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText(dados.situacao || "REGULAR / ATIVO", mX + 110, mY);

      ctx.fillStyle = "#948c7f";
      ctx.font = "bold 12px 'Inter', sans-serif";
      ctx.fillText("VALIDADE:", mX + 310, mY);
      ctx.fillStyle = "#f6d285";
      ctx.font = "bold 17px 'Inter', sans-serif";
      ctx.fillText("INDETERMINADA", mX + 410, mY);

      mY += 32;

      ctx.fillStyle = "#948c7f";
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.fillText("ÓRGÃO EMISSOR: SECRETARIA GERAL DO DEPARTAMENTO JURÍDICO · TRIBUNAL DE JUSTIÇA", mX, mY);

      mY += 18;

      // 5. Linha divisória e Assinaturas da Presidência
      ctx.strokeStyle = "rgba(212, 175, 95, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(mX, mY); ctx.lineTo(mX + 640, mY);
      ctx.stroke();

      mY += 28;

      // Zaith Frost
      ctx.fillStyle = "#fce080";
      ctx.font = "italic bold 24px 'Dancing Script', cursive";
      ctx.fillText("Zaith Frost", mX + 10, mY);
      ctx.fillStyle = "#8a8172";
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.fillText("Zaith Frost · Presidente do SDJ", mX + 10, mY + 18);

      // Mike Santaroni
      ctx.fillStyle = "#fce080";
      ctx.font = "italic bold 24px 'Dancing Script', cursive";
      ctx.fillText("Mike Santaroni", mX + 320, mY);
      ctx.fillStyle = "#8a8172";
      ctx.font = "bold 11px 'Inter', sans-serif";
      ctx.fillText("Mike Santaroni · Vice-Presidente", mX + 320, mY + 18);

      // 6. QR Code de Autenticação Digital
      const qrBoxX = W - 220;
      const qrBoxY = 175;
      const qrBoxS = 180;

      ctx.fillStyle = "#ffffff";
      drawRoundRect(ctx, qrBoxX, qrBoxY, qrBoxS, qrBoxS, 10, true, false);
      ctx.strokeStyle = "#d4af5f";
      ctx.lineWidth = 2;
      drawRoundRect(ctx, qrBoxX, qrBoxY, qrBoxS, qrBoxS, 10, false, true);

      if (qrImg) {
        ctx.drawImage(qrImg, qrBoxX + 10, qrBoxY + 10, qrBoxS - 20, qrBoxS - 32);
      } else {
        // Fallback gráfico se não carregar
        ctx.fillStyle = "#121824";
        ctx.fillRect(qrBoxX + 15, qrBoxY + 15, qrBoxS - 30, qrBoxS - 40);
      }

      ctx.fillStyle = "#121824";
      ctx.font = "bold 10px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("VALIDAÇÃO DIGITAL", qrBoxX + qrBoxS / 2, qrBoxY + qrBoxS - 8);
      ctx.textAlign = "left";

      // 7. Texto Legal
      ctx.fillStyle = "#817869";
      ctx.font = "11px 'Inter', sans-serif";
      const legalText = "O titular desta identidade funcional possui livre acesso aos órgãos públicos, delegacias e estabelecimentos prisionais, gozando das prerrogativas e imunidades da advocacia na Cidade de Brava RP.";
      ctx.fillText(legalText, 40, H - 96);

      // 8. Zona MRZ (Machine Readable Zone)
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(4, H - 72, W - 8, 68);
      ctx.strokeStyle = "rgba(212, 175, 95, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(4, H - 72, W - 8, 68);

      ctx.fillStyle = "#e2dacf";
      ctx.font = "bold 17px 'Courier New', Courier, monospace";
      const idClean = (dados.id || "0000").replace(/[^0-9]/g, "").padStart(6, "0");
      const safeDoc = (dados.inscricao || "SDJ2026").replace(/[^A-Za-z0-9]/g, "").toUpperCase().padEnd(12, "<");
      const line1 = `IDBRA<<SDJ<2026<${safeDoc}<<<<<<<<<<<<<<<<<<<<<<`;
      const line2 = `${idClean}9BRA<<<<<<<<<<<<<<<<<<<0<<<<<<<<<<<<<<`;
      ctx.fillText(line1.substring(0, 44), 36, H - 42);
      ctx.fillText(line2.substring(0, 44), 36, H - 18);

      return canvas;
    }

    return canvas;
  }

  /* ==========================================================
     5. GERAÇÃO DE PDF DA CARTEIRINHA FUNCIONAL (A4 OFICIAL)
     Emite a Certidão Notarial com as Cédulas Frente e Verso
     em tamanho padrão de crachá prontas para impressão
     ========================================================== */
  async function generateCarterinhaPDF(dados) {
    const jsPDF = getJsPDF();
    if (!jsPDF) throw new Error("Biblioteca jsPDF não encontrada.");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const { logo, watermark } = await getLogoAndWatermark();

    const dataHora = new Date().toLocaleString("pt-BR");
    const protocolo = gerarProtocolo();
    const titulo = "Carteira de Identidade Funcional — Registro Geral SDJ";
    const cidade = (window.CONFIG && window.CONFIG.cidade) || "Brava RP";

    // 1. Estrutura base com moldura e cabeçalho notarial
    let curY = desenharEstruturaBase(doc, logo, watermark, titulo, protocolo, dataHora, cidade);

    const pageWidth = 210;
    const boxW = pageWidth - 28;

    // Seção 1: Assento Cadastral do Membro
    curY = desenharCabecalhoSecao(doc, curY, "1. Assento de Credenciamento Notarial do Membro");

    const colW = (boxW - 3) / 2;
    const rowH = 8.6;

    const campos = [
      { label: "NOME DO TITULAR", value: dados.nome || "Não informado" },
      { label: "PASSAPORTE / ID", value: "#" + (dados.id || "Não informado") },
      { label: "CARGO INSTITUCIONAL", value: (dados.cargo || "Advogado Júnior").toUpperCase() },
      { label: "INSCRIÇÃO OFICIAL OAB/SDJ", value: dados.inscricao || "OAB/SDJ-2026-0000" },
      { label: "TELEFONE DE CONTATO", value: dados.telefone || "Não informado" },
      { label: "NATURALIDADE", value: dados.naturalidade || "Brava City" },
      { label: "DATA DE EXPEDIÇÃO", value: dados.expedicao || new Date().toLocaleDateString("pt-BR") },
      { label: "SITUAÇÃO FUNCIONAL", value: dados.situacao || "REGULAR / ATIVO" }
    ];

    for (let i = 0; i < campos.length; i += 2) {
      const f1 = campos[i];
      const f2 = campos[i + 1];

      // Coluna 1
      const x1 = 14;
      const isEven = (i / 2) % 2 === 0;
      doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
      doc.setDrawColor(220, 226, 238);
      doc.setLineWidth(0.25);
      doc.roundedRect(x1, curY, colW, rowH, 0.8, 0.8, "FD");
      doc.setFillColor(...ORO);
      doc.rect(x1, curY, 1.8, rowH, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.setTextColor(110, 118, 134);
      doc.text(f1.label, x1 + 4, curY + (rowH * 0.35));

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(18, 24, 38);
      doc.text(String(f1.value), x1 + 4, curY + (rowH * 0.78), { maxWidth: colW - 7 });

      // Coluna 2
      if (f2) {
        const x2 = 14 + colW + 3;
        doc.setFillColor(isEven ? 255 : 249, isEven ? 255 : 250, isEven ? 255 : 253);
        doc.setDrawColor(220, 226, 238);
        doc.setLineWidth(0.25);
        doc.roundedRect(x2, curY, colW, rowH, 0.8, 0.8, "FD");
        doc.setFillColor(...ORO);
        doc.rect(x2, curY, 1.8, rowH, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(5.5);
        doc.setTextColor(110, 118, 134);
        doc.text(f2.label, x2 + 4, curY + (rowH * 0.35));

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(18, 24, 38);
        doc.text(String(f2.value), x2 + 4, curY + (rowH * 0.78), { maxWidth: colW - 7 });
      }

      curY += rowH + 1.2;
    }

    curY += 3;

    // Seção 2: Cédula Funcional Impressa (Padrão CR-80: 85.6mm x 53.98mm)
    curY = desenharCabecalhoSecao(doc, curY, "2. Cédula Funcional Oficial — Padrão CR-80 Regulamentar (85.6mm × 53.98mm)");

    // Subtítulo de instrução
    doc.setFont("helvetica", "italic");
    doc.setFontSize(5.8);
    doc.setTextColor(100, 108, 124);
    doc.text("Cédula oficial em alta definição. Recorte nas linhas pontilhadas abaixo para plastificação ou porte em crachá/porta-funcional.", 14, curY);
    curY += 4.5;

    // Renderiza os canvas em alta definição
    const cFrente = await renderCarterinhaCanvas(dados, "frente");
    const cVerso = await renderCarterinhaCanvas(dados, "verso");

    const cardW = 86.0;
    const cardH = 54.2;

    const xFrente = 15;
    const xVerso = 109.0;
    const cardY = curY + 2;

    // Insere imagem da Frente
    if (cFrente) {
      doc.addImage(cFrente.toDataURL("image/png"), "PNG", xFrente, cardY, cardW, cardH);
    }

    // Insere imagem do Verso
    if (cVerso) {
      doc.addImage(cVerso.toDataURL("image/png"), "PNG", xVerso, cardY, cardW, cardH);
    }

    // Linhas de corte pontilhadas ao redor de cada cartão
    doc.setDrawColor(180, 185, 195);
    doc.setLineWidth(0.25);
    doc.setLineDashPattern([1.5, 1.5], 0);

    doc.rect(xFrente - 0.5, cardY - 0.5, cardW + 1.0, cardH + 1.0);
    doc.rect(xVerso - 0.5, cardY - 0.5, cardW + 1.0, cardH + 1.0);

    doc.setLineDashPattern([], 0); // Restaura linha sólida

    // Legendas sob cada cartão
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.setTextColor(...ORO_ESCURO);
    doc.text("[ANVERSO / FRENTE DA CARTEIRA]", xFrente + (cardW / 2), cardY + cardH + 3.8, { align: "center" });
    doc.text("[VERSO / REGISTRO & MRZ]", xVerso + (cardW / 2), cardY + cardH + 3.8, { align: "center" });

    curY = cardY + cardH + 8.5;

    // Seção 3: Fé Pública & Homologação
    const boxAvisoH = 13.5;
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(215, 222, 235);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, curY, boxW, boxAvisoH, 0.8, 0.8, "FD");

    doc.setFillColor(...ORO);
    doc.rect(14, curY, 2, boxAvisoH, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.2);
    doc.setTextColor(...AZUL_NOITE);
    doc.text("DECLARAÇÃO NOTARIAL DE FÉ PÚBLICA E PRERROGATIVAS FUNCIONAIS", 19, curY + 4.2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.4);
    doc.setTextColor(45, 52, 68);
    const textoFe = "Certifico e dou fé que a presente Carteira de Identidade Funcional foi devidamente emitida e homologada pela Presidência do Departamento Jurídico de Brava City, conferindo ao titular livre acesso aos órgãos públicos e imunidade profissional no exercício legítimo de suas funções, nos termos do Regimento Interno Notarial.";
    doc.text(textoFe, 19, curY + 7.8, { maxWidth: boxW - 8, align: "justify", lineHeightFactor: 1.25 });

    // 4. Assinaturas e Chancela Notarial
    const sigStartY = Math.max(curY + boxAvisoH + 4.0, 230);
    desenharBlocoAssinaturasEChancela(doc, sigStartY, "Zaith Frost", "101", "Presidente do Departamento Jurídico", protocolo);

    const safeNome = (dados.nome || "Membro").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    const filename = `Carteira_Funcional_SDJ_${safeNome}_${protocolo}.pdf`;
    const blob = doc.output("blob");

    return { doc, blob, filename, protocolo };
  }

  // Exporta globalmente para o aplicativo
  window.SDJ_PDF = {
    generateServicePDF,
    generateTribunalPDF,
    generatePenalPDF,
    generateProvaOralPDF,
    generateCarterinhaPDF,
    renderCarterinhaCanvas,
    getLogoAndWatermark,
    toSignatureCase,
    gerarQrCodeDataUrl
  };
})();

