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

const PROVA_ORAL_CONFIG = {
  titulo: "Prova Oral de Admissão — Judiciário Brava City",
  webhook: "https://discord.com/api/webhooks/1560656685557883022/BLD5lMAwnsOd-PU5Do8cf6N25z071fagqj6kiuHsAZptB_u1qvknBf1Ji_0RvM2rJFXS",
  nivel: "Fácil",
  totalQuestoes: 12,
  notaAprovacaoMinima: 9.5, // >= 80% (10 de 12) recomendado para aprovação
  cargosDisponiveis: [
    {
      nome: "Estagiário",
      icone: "🎓",
      desc: "Auxilia a equipe, organiza documentos, acompanha rotinas e aprende sob supervisão."
    },
    {
      nome: "Advogado Júnior",
      icone: "👥",
      desc: "Presta suporte nos casos, faz pesquisas jurídicas e auxilia na produção de peças."
    },
    {
      nome: "Advogado Pleno",
      icone: "📝",
      desc: "Elabora peças, atende demandas jurídicas e acompanha processos com autonomia."
    },
    {
      nome: "Advogado Sênior",
      icone: "👤",
      desc: "Atua em casos complexos, orienta a equipe e revisa estratégias jurídicas."
    },
    {
      nome: "Advogado Administrativo",
      icone: "📑",
      desc: "Cuida de demandas internas, contratos, documentação e processos administrativos."
    }
  ],
  checklist: [
    "Sabe quais crimes não permitem fiança (crimes contra a vida, sequestro e desacato)?",
    "Distingue com clareza fiança (liberdade provisória), pena (punição) e multa?",
    "Aplica a redução de 25% exclusiva à fiança de réu primário quando cabível?",
    "Aplica a redução de 50% do advogado constituído à pena e à multa, sem transferir à fiança?",
    "Demonstra postura de imparcialidade e recusa categórica de favorecimento ou corrupção?",
    "Consegue fundamentar tecnicamente sua decisão com base nas regras do Judiciário?"
  ],
  questoes: [
    {
      id: 1,
      tema: "Fundamentos & Regra de Ouro",
      tipo: "Teórica",
      pergunta: "De acordo com o material de estudo, qual é a função principal de um membro do Judiciário de Brava City e qual é a 'Regra de Ouro' da instituição?",
      gabarito: "Função principal: Analisar situações, interpretar regras e tomar decisões imparciais, garantindo procedimentos corretos na cidade.\n\nRegra de Ouro: Sua função não é decidir de quem gosta. É decidir conforme as regras e circunstâncias do caso.",
      palavrasChave: ["Imparcialidade", "Interpretar regras", "Regra de Ouro", "Não decidir de quem gosta"],
      dicaRecrutador: "O candidato deve citar a imparcialidade técnica e o princípio fundamental de não agir por afeição pessoal."
    },
    {
      id: 2,
      tema: "Procedimentos Penais & Fiança",
      tipo: "Teórica",
      pergunta: "O que é a fiança dentro dos procedimentos penais de Brava City?",
      gabarito: "É o valor pago para a obtenção de liberdade provisória quando o crime cometido permite esse benefício legal.",
      palavrasChave: ["Valor pago", "Liberdade provisória", "Quando o crime permite o benefício"],
      dicaRecrutador: "O candidato precisa associar a fiança à liberdade provisória concedida quando a lei autoriza."
    },
    {
      id: 3,
      tema: "Distinção Legal: Fiança vs Inocência",
      tipo: "Teórica",
      pergunta: "Pagar fiança significa que a pessoa é considerada inocente ou que a sua punição criminal foi perdoada? Explique a distinção.",
      gabarito: "Não significa inocência. A distinção crucial é: fiança refere-se exclusivamente à liberdade (soltura provisória); a pena refere-se à punição pelo crime cometido.",
      palavrasChave: ["Não significa inocência", "Fiança = liberdade", "Pena = punição"],
      dicaRecrutador: "Exija do candidato a compreensão clara de que pagar fiança não apaga nem absolve a culpa criminal."
    },
    {
      id: 4,
      tema: "Restrições Absolutas: Crimes Inafiançáveis",
      tipo: "Teórica",
      pergunta: "Quais são as três situações ou categorias de crimes expressamente listadas no material de estudo como NÃO permitindo fiança (crimes inafiançáveis)?",
      gabarito: "1. Crimes contra a vida (inafiançável sob qualquer circunstância);\n2. Sequestro (vedada a concessão de liberdade por fiança);\n3. Desacato (sem direito a pagamento de fiança).",
      palavrasChave: ["Crimes contra a vida", "Sequestro", "Desacato"],
      dicaRecrutador: "Esses 3 crimes estão destacados no Slide 4 e no Manual. O candidato deve citar os três."
    },
    {
      id: 5,
      tema: "Tabela de Benefícios: Réu Primário",
      tipo: "Teórica",
      pergunta: "Qual é o benefício legal concedido ao réu primário e sobre qual valor/parâmetro ele incide exclusivamente?",
      gabarito: "Redução de 25% exclusiva no valor da fiança, e somente quando o crime permitir fiança. Esse desconto não incide sobre o tempo de pena nem sobre a multa.",
      palavrasChave: ["Redução de 25%", "Exclusiva na fiança", "Somente quando o crime permitir"],
      dicaRecrutador: "O candidato precisa enfatizar que a redução de 25% incide apenas sobre a fiança."
    },
    {
      id: 6,
      tema: "Tabela de Benefícios: Advogado Constituído",
      tipo: "Teórica",
      pergunta: "Qual é o benefício legal concedido pela presença de um advogado constituído ao acusado?",
      gabarito: "Redução de 50% na pena (tempo de prisão em meses) e redução de 50% no valor da multa estipulada.",
      palavrasChave: ["Redução de 50%", "Pena (meses)", "Multa ($)"],
      dicaRecrutador: "O candidato deve citar a redução de 50% tanto na pena quanto na multa."
    },
    {
      id: 7,
      tema: "Benefícios: Advogado vs Fiança",
      tipo: "Teórica",
      pergunta: "A presença de um advogado constituído confere redução automática no valor da fiança?",
      gabarito: "Não. O material não prevê redução automática da fiança por ter advogado; a redução de 50% conferida pelo advogado incide estritamente sobre a pena e sobre a multa.",
      palavrasChave: ["Não confere redução", "Apenas pena e multa", "Não transfere para fiança"],
      dicaRecrutador: "Pegadinha clássica alertada no Manual do Recrutador. O candidato não pode confundir benefícios."
    },
    {
      id: 8,
      tema: "Fluxo Operacional: Roteiro de Análise",
      tipo: "Teórica",
      pergunta: "Qual é a ordem correta dos 5 passos do fluxo operacional para analisar qualquer caso penal?",
      gabarito: "Passo 1: Qual o Crime?\nPasso 2: Permite Fiança?\nPasso 3: Réu Primário?\nPasso 4: Tem Advogado?\nPasso 5: Decisão Imparcial.",
      palavrasChave: ["1. Crime", "2. Permite Fiança", "3. Réu Primário", "4. Advogado", "5. Decisão Imparcial"],
      dicaRecrutador: "Sequência exata do Slide 6 (Roteiro de Análise de Casos). Avalie se ele compreendeu o método lógico."
    },
    {
      id: 9,
      tema: "Caso Prático 1: Cálculo de Fiança",
      tipo: "Prática",
      pergunta: "Caso Prático 1: Um cidadão cometeu crime afiançável com fiança fixada em R$ 100.000. Ele comprovou ser réu primário. Quanto ele deverá pagar de fiança para ser liberado provisoriamente?",
      gabarito: "Deverá pagar R$ 75.000. O benefício de réu primário confere 25% de desconto exclusivo sobre a fiança (R$ 100.000 − 25% [R$ 25.000] = R$ 75.000).",
      palavrasChave: ["R$ 75.000", "Desconto de 25%", "R$ 25.000 de redução"],
      dicaRecrutador: "Caso 1 do Manual do Recrutador. Cálculo simples de porcentagem (25% de 100 mil)."
    },
    {
      id: 10,
      tema: "Caso Prático 2: Crime Inafiançável",
      tipo: "Prática",
      pergunta: "Caso Prático 2: Um acusado foi preso por Sequestro (ou homicídio/crime contra a vida). Ele é réu primário, tem advogado e possui dinheiro suficiente para pagar qualquer quantia. Ele pode pagar fiança e ser solto?",
      gabarito: "Não pode pagar fiança. O crime de sequestro (assim como crimes contra a vida e desacato) está listado como sem fiança sob qualquer hipótese no material, sendo irrelevante ser réu primário ou ter dinheiro.",
      palavrasChave: ["Não pode pagar fiança", "Crime inafiançável", "Sequestro não permite fiança"],
      dicaRecrutador: "Caso 2 do Manual. O candidato deve identificar que ser primário ou rico não abre exceção para crime inafiançável."
    },
    {
      id: 11,
      tema: "Caso Prático 3: Cálculo com Advogado",
      tipo: "Prática",
      pergunta: "Caso Prático 3: Um acusado recebeu uma pena inicial de 10 meses de prisão. Houve acompanhamento presencial de advogado constituído. Qual será a pena final em meses resultante após a redução prevista?",
      gabarito: "Será de 5 meses de prisão. A presença de advogado constituído confere redução de 50% sobre o tempo de pena previsto (10 meses − 50% = 5 meses).",
      palavrasChave: ["5 meses", "Redução de 50%", "Metade da pena"],
      dicaRecrutador: "Caso 3 do Manual do Recrutador. Aplicação prática dos 50% de redução do advogado."
    },
    {
      id: 12,
      tema: "Caso Prático 4: Ética, Pressão & Imparcialidade",
      tipo: "Prática",
      pergunta: "Caso Prático 4: Um policial exige que você aumente a pena de um cidadão por antipatia pessoal; ou alternativamente, alguém lhe oferece R$ 50.000 para reduzir uma pena. Como o membro do Judiciário deve agir?",
      gabarito: "Deve agir com total imparcialidade e integridade: recusar imediatamente a oferta de dinheiro (crime de suborno) e tomar as providências cabíveis; não seguir o pedido do policial por antipatia pessoal, analisando provas e regras de forma técnica e autônoma.",
      palavrasChave: ["Recusar suborno", "Imparcialidade", "Não ceder a pressão policial", "Decidir pelas regras"],
      dicaRecrutador: "Casos 4 e 5 do Manual e Slide 7 do Material de Estudo. Avalia a firmeza moral e anticorrupção do candidato."
    }
  ]
};

const TABELA_PRECOS = [
  {
    item: "Aliança",
    icone: "💍",
    retirada: 4000,
    retiradaDisplay: "R$ 4.000",
    venda: 15000,
    vendaDisplay: "R$ 15.000",
    categoria: "União Civil",
    desc: "Aliança tradicional para celebração de compromisso/namoro.",
    targetId: "alianca",
  },
  {
    item: "Anel de Diamante",
    icone: "💎",
    retirada: 8000,
    retiradaDisplay: "R$ 8.000",
    venda: 30000,
    vendaDisplay: "R$ 30.000",
    categoria: "União Civil",
    desc: "Anel de diamante lapidado para celebração de noivado.",
    targetId: "alianca",
  },
  {
    item: "Anel de Ouro",
    icone: "🥇",
    retirada: 12000,
    retiradaDisplay: "R$ 12.000",
    venda: 45000,
    vendaDisplay: "R$ 45.000",
    categoria: "União Civil",
    desc: "Anel em ouro nobre para celebração oficial de compromisso/casamento.",
    targetId: "alianca",
  },
  {
    item: "Troca de Nome",
    icone: "📝",
    retirada: 30000,
    retiradaDisplay: "R$ 30.000",
    venda: 100000,
    vendaDisplay: "R$ 100.000",
    categoria: "Registro Civil",
    desc: "Processo de alteração de certidão e registro civil do cidadão.",
    targetId: "trocanome",
  },
  {
    item: "Registro de Família",
    icone: "👨‍👩‍👧",
    retirada: 15000,
    retiradaDisplay: "10% (R$ 15.000)",
    venda: 150000,
    vendaDisplay: "R$ 150.000",
    categoria: "Organização",
    desc: "Cadastro oficial de entidade familiar e seu fundador.",
    targetId: "familia",
  },
  {
    item: "Nascimento e Adoção",
    icone: "👶",
    retirada: 15000,
    retiradaDisplay: "10% (R$ 15.000)",
    venda: 150000,
    vendaDisplay: "R$ 150.000",
    categoria: "Registro Civil",
    desc: "Emissão oficial de certidão de nascimento ou certidão de adoção.",
    targetId: "nascimento",
  },
  {
    item: "Casamento",
    icone: "💒",
    retirada: 30000,
    retiradaDisplay: "15% (R$ 30.000)",
    venda: 200000,
    vendaDisplay: "R$ 200.000",
    categoria: "União Civil",
    desc: "Celebração oficial e emissão de Certidão Notarial de Casamento.",
    targetId: "casamento",
  },
  {
    item: "CNPJ",
    icone: "🏢",
    retirada: 62500,
    retiradaDisplay: "25% (R$ 62.500)",
    venda: 250000,
    vendaDisplay: "R$ 250.000",
    categoria: "Empresarial",
    desc: "Abertura oficial de empresa com emissão de CNPJ e registro.",
    targetId: "cnpj",
  },
  {
    item: "Taxa Semanal do CNPJ",
    icone: "💰",
    retirada: null,
    retiradaDisplay: "—",
    venda: 50000,
    vendaDisplay: "R$ 50.000",
    categoria: "Empresarial",
    desc: "Alvará de funcionamento e taxa semanal do CNPJ.",
    targetId: "cnpj",
  },
  {
    item: "Atendimento em Delegacia",
    icone: "⚖️",
    retirada: null,
    retiradaDisplay: "—",
    venda: 60000,
    vendaDisplay: "R$ 20.000 a R$ 60.000",
    categoria: "Advocacia Penal",
    desc: "Acompanhamento criminal e assistência jurídica ao cidadão em sede policial.",
    targetId: "calculadora",
  },
  {
    item: "Porte de Arma (Pistola PT 9mm)",
    icone: "🔫",
    retirada: null,
    retiradaDisplay: "Laudo Hospitalar",
    venda: 80000,
    vendaDisplay: "R$ 80.000",
    categoria: "Segurança & Defesa",
    desc: "Emissão oficial de porte civil e registro de 1 Pistola PT 9mm (exclusiva). Exige laudo psicotécnico hospitalar prévio.",
    targetId: "porte",
  },
  {
    item: "Munições 9mm (Unitária)",
    icone: "📦",
    retirada: null,
    retiradaDisplay: "—",
    venda: 400,
    vendaDisplay: "R$ 400 / un",
    categoria: "Segurança & Defesa",
    desc: "Munições calibre 9mm para Pistola PT autorizada (R$ 400 por unidade / R$ 20.000 a cada 50 un).",
    targetId: "porte",
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
