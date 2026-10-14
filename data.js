/* ==========================================================
   CÓDIGO PENAL JURÍDICO — BRAVA RP (versão 2026 FINAL)
   Fonte: BRAVA_Codigo_Penal_Juridico_2026_FINAL.pdf
   Formato: [artigo, infração, pena (meses), multa ($), inafiançável?]
   ========================================================== */

const CONFIG = {
  cidade: "Brava RP",
  pdf: "BRAVA_Codigo_Penal_Juridico_2026_FINAL.pdf",
  penaMaxima: 0,            // 0 = sem limite
  reducaoAdvogado: 50,      // % de redução na pena e na multa
  descontoPrimario: 25,     // % de desconto na fiança para réu primário
  regras: [
    ["Direito à Defesa", "Todo civil possui direito garantido a um advogado, independentemente do crime cometido."],
    ["Atuação do Advogado", "Garante 50% de redução na pena (meses) e 50% de redução na multa ($)."],
    ["Cálculo da Fiança", "Se o civil não for preso, a fiança tem como base a multa, já com a redução do advogado, se houver."],
    ["Réu Primário", "Recebe 25% de desconto adicional no valor da fiança. Reincidente paga o valor integral."],
    ["Crimes Inafiançáveis", "Os artigos marcados como INAFIANÇÁVEL não possuem opção de fiança sob nenhuma hipótese."],
  ],
};

const PRESIDENCIA_JURIDICO = {
  presidente: "Zaith Frost",
  cargoPresidente: "Presidente do Departamento Jurídico",
  vice: "Mike Santaroni",
  cargoVice: "Vice-Presidente do Departamento Jurídico",
};

const TABELA_PRECOS = [
  {
    item: "Aliança",
    icone: "💍",
    retirada: 4000,
    venda: 15000,
    categoria: "União Civil",
    desc: "Aliança tradicional para celebração de compromisso/namoro.",
    targetId: "alianca",
  },
  {
    item: "Anel de Diamante",
    icone: "💎",
    retirada: 8000,
    venda: 30000,
    categoria: "União Civil",
    desc: "Anel de diamante lapidado para celebração de noivado.",
    targetId: "alianca",
  },
  {
    item: "Anel de Ouro",
    icone: "🥇",
    retirada: 12000,
    venda: 45000,
    categoria: "União Civil",
    desc: "Anel em ouro nobre para celebração oficial de compromisso/casamento.",
    targetId: "alianca",
  },
  {
    item: "Certidão de Casamento",
    icone: "💒",
    retirada: null,
    venda: 200000,
    categoria: "União Civil",
    desc: "Celebração oficial e emissão de Certidão Notarial de Casamento.",
    targetId: "casamento",
  },
  {
    item: "Certidão de Nascimento",
    icone: "🚼",
    retirada: null,
    venda: 150000,
    categoria: "Registro Civil",
    desc: "Emissão oficial de certidão de nascimento com filiação.",
    targetId: "nascimento",
  },
  {
    item: "Certidão de Adoção",
    icone: "📝",
    retirada: null,
    venda: 150000,
    categoria: "Registro Civil",
    desc: "Formalização da certidão de adoção com até dois adotantes.",
    targetId: "adocao",
  },
  {
    item: "Troca de Nome",
    icone: "📜",
    retirada: 30000,
    venda: 100000,
    categoria: "Registro Civil",
    desc: "Processo de alteração de certidão e registro civil do cidadão.",
    targetId: "trocanome",
  },
  {
    item: "Registro de Família",
    icone: "👨‍👩‍👧",
    retirada: null,
    venda: 200000,
    categoria: "Organização",
    desc: "Cadastro oficial de entidade familiar e seu fundador.",
    targetId: "familia",
  },
  {
    item: "CNPJ",
    icone: "🏢",
    retirada: null,
    venda: 300000,
    categoria: "Empresarial",
    desc: "Abertura oficial de empresa com emissão de CNPJ.",
    targetId: "cnpj",
  },
  {
    item: "Taxa Semanal do CNPJ",
    icone: "💰",
    retirada: null,
    venda: 50000,
    categoria: "Empresarial",
    desc: "Alvará de funcionamento e taxa semanal do CNPJ (conforme a inflação da cidade).",
    targetId: "cnpj",
  },
];

const CODIGO_PENAL = [
  {
    titulo: "1. Crimes Nível 1",
    artigos: [
      ["1.1", "Equipamento Balístico", 10, 20000],
      ["1.2", "Equipamento Policial", 10, 10000],
      ["1.4", "Resistência à Prisão", 20, 30000],
      ["1.5", "Omissão de Socorro", 5, 0],
      ["1.6", "Dano ao Patrimônio", 10, 500],
      ["1.7", "Difamação", 10, 10000],
      ["1.8", "Fuga da Abordagem Policial", 20, 30000],
      ["1.9", "Tentativa de Furto ou Roubo", 10, 1500],
      ["1.10", "Obstrução da Justiça", 10, 1500],
      ["1.11", "Corridas Ilegais", 20, 30000],
    ],
  },
  {
    titulo: "2. Crimes Nível 2",
    artigos: [
      ["2.1", "Desacato à Autoridade", 25, 30000, true],
      ["2.2", "Tentativa de Suborno", 25, 15000],
      ["2.3", "Extorsão", 15, 0],
      ["2.4", "Falsidade Ideológica", 10, 3000],
      ["2.5", "Calúnia", 10, 0],
      ["2.6", "Ameaça", 25, 0],
      ["2.7", "Furto ou Roubo", 25, 15000],
      ["2.8", "Lesão Corporal", 15, 3000],
      ["2.9", "Sequestro", 50, 20000, true],
      ["2.10", "Apologia ao Crime", 40, 20000],
    ],
  },
  {
    titulo: "3. Crimes Nível 3",
    artigos: [
      ["3.1", "Formação de Quadrilha", 70, 40000],
      ["3.2", "Homicídio Doloso", 70, 40000, true],
      ["3.3", "Homicídio Culposo", 50, 20000, true],
      ["3.4", "Tentativa de Homicídio", 50, 30000, true],
      ["3.5", "Latrocínio", 80, 50000],
      ["3.6", "Tentativa de Homicídio a Policial", 70, 50000, true],
      ["3.7", "Homicídio a Policial", 100, 70000, true],
      ["3.8", "Genocídio", 150, 100000],
    ],
  },
  {
    titulo: "4. Assaltos",
    artigos: [
      ["4.1", "Assalto Grande", 40, 40000],
      ["4.2", "Assalto Médio", 30, 30000],
      ["4.3", "Assalto Pequeno", 20, 20000],
      ["4.4", "Caixa Eletrônico", 20, 2000],
      ["4.5", "Caixa Registradora", 20, 1500],
    ],
  },
  {
    titulo: "5. Porte Ilegal de Armas",
    artigos: [
      ["5.1", "Porte Ilegal de Armas Brancas", 10, 10000],
      ["5.2", "Porte Ilegal de Munição", 15, 15000],
      ["5.3", "Porte Ilegal de Arma Leve", 15, 15000],
      ["5.4", "Porte Ilegal de Arma Pesada", 30, 30000],
    ],
  },
  {
    titulo: "6. Itens Ilegais",
    artigos: [
      ["6.1", "Porte de Algemas", 10, 1000],
      ["6.2", "Porte de Lockpick", 10, 2000],
      ["6.3", "Porte de Masterpick", 20, 3000],
      ["6.4", "Porte de Pendrive", 20, 3000],
      ["6.5", "Porte de Capuz", 5, 1000],
      ["6.6", "Porte de Logs/Keys de Banco", 5, 2000],
    ],
  },
  {
    titulo: "7. Tráfico ou Dinheiro Sujo",
    artigos: [
      ["7.1", "Tráfico de Drogas", 30, 10000],
      ["7.2", "Tráfico de Armas/Munição", 30, 10000],
      ["7.3", "Dinheiro Sujo", 20, 10000],
    ],
  },
];
