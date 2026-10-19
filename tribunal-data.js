/* ==========================================================
   TRIBUNAL DE JUSTIÇA — BRAVA RP
   Configuração dos serviços da área do Tribunal (tribunal.html)

   Como editar:
   - webhook: link do canal do Discord
   - fields: campos do formulário
       type: "text" (padrão) | "textarea" | "options" | "date" | "time" | "numero"
       req: true  -> campo obrigatório
       isFull: true -> ocupa a linha inteira
       prefixo (type "numero"): gera número automático (ex.: "MAND", "CNJ")
   ========================================================== */

const TRIBUNAL_CONFIG = {
  cidade: "Brava RP",
  nome: "Tribunal de Justiça de Brava",
  webhookAvisos: "https://discord.com/api/webhooks/1561400508319535234/tLi4jgnvw950Dlvk5rYzif6Vpf4kWWeDq4wEooHTr26H2NECDVpUJqC7RXOtrnksqQFj",

  cargos: [
    { id: "01", nome: "Presidente", icone: "👑", titulo: "PRESIDENTE" },
    { id: "02", nome: "Vice Presidente", icone: "👥", titulo: "VICE PRESIDENTE" },
    { id: "03", nome: "Desembargador", icone: "⚖️", titulo: "DESEMBARGADOR" },
    { id: "04", nome: "Juiz", icone: "🏛️", titulo: "JUIZ" },
    { id: "05", nome: "Promotor de Justiça", icone: "📜", titulo: "PROMOTOR DE JUSTIÇA" },
    { id: "06", nome: "Oficial de Justiça", icone: "🛡️", titulo: "OFICIAL DE JUSTIÇA" },
    { id: "07", nome: "Advogado Administrativo", icone: "📋", titulo: "ADVOGADO ADMINISTRATIVO" },
    { id: "08", nome: "Advogado Sênior", icone: "👤", titulo: "ADVOGADO SÊNIOR" },
    { id: "09", nome: "Advogado Pleno", icone: "📝", titulo: "ADVOGADO PLENO" },
    { id: "10", nome: "Advogado Júnior", icone: "👥", titulo: "ADVOGADO JÚNIOR" },
    { id: "11", nome: "Estagiário", icone: "🎓", titulo: "ESTAGIÁRIO" },
  ],

  grupos: [
    { id: "processos", titulo: "Processos & Petições", desc: "Protocolo de petições, andamento de processos e decisões judiciais." },
    { id: "mandados", titulo: "Mandados & Autorizações", desc: "Expedição, cumprimento de mandados e autorizações judiciais." },
    { id: "agenda", titulo: "Comunicações & Agenda", desc: "Intimações das partes e agendamento de audiências." },
  ],

  servicos: [
    /* ---------------- PROCESSOS & PETIÇÕES ---------------- */
    {
      id: "peticao", grupo: "processos", title: "Petição Inicial", svg: "peticao", emoji: "📄", tag: "Protocolo",
      desc: "Protocolo de petição inicial para abertura de ação cível ou criminal.",
      webhook: "https://discord.com/api/webhooks/1561379929025937479/cWgWK2iBKBCstAWGf8ADEA2qEHQ429WSctyUkOdoBwEb1pKWrGdMeuHrC07qY0l7n-r_",
      cor: 13938487, cargoPadrao: "Advogado Pleno",
      natureza: "Petição Protocolada", eficacia: "Distribuição",
      termo: "A SECRETARIA DO TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA RP CERTIFICA o recebimento e protocolo da presente petição inicial, que será distribuída à Vara competente para análise do Juízo, nos termos do regimento interno do Poder Judiciário.",
      guia: {
        destaque: "Ação Cível × Ação Criminal × Habeas Corpus × Mandado de Segurança",
        resumo: "A Petição Inicial é a peça técnica inaugural pela qual o Advogado ou Defensor aciona o Poder Judiciário para postular direitos em favor de seu cliente. Ela define os limites da lide e os pedidos dirigidos ao Juiz.",
        quandoUsar: "Utilize sempre que precisar iniciar uma ação nova em juízo, seja para reparar prejuízos financeiros (Cível), denunciar condutas criminosas (Criminal), libertar alguém preso ilegalmente (Habeas Corpus) ou anular atos estatais abusivos (Mandado de Segurança).",
        diferencas: [
          {
            nome: "Ação Cível",
            tag: "Indenizações & Patrimônio",
            cor: "blue",
            desc: "Ação ajuizada para resolver conflitos patrimoniais, contratuais, obrigações de fazer ou reparações de danos materiais e morais entre pessoas físicas ou jurídicas.",
            quando: "Quando não se busca a prisão do réu, mas sim o ressarcimento financeiro ou cumprimento de obrigação.",
            exemplo: "O réu bateu e destruiu o veículo do autor e fugiu sem indenizar o prejuízo de R$ 90.000; ou quebra de contrato de compra e venda de imóvel.",
            resultado: "Condenação do réu ao pagamento de indenização monetária e custas. NÃO acarreta prisão penal."
          },
          {
            nome: "Ação Criminal",
            tag: "Infrações Penais",
            cor: "amber",
            desc: "Ação instaurada para apurar a autoria e materialidade de condutas criminosas e punir o infrator conforme o Código Penal da cidade.",
            quando: "Quando há crime de ação penal de iniciativa privada ou representação da vítima por crimes contra a pessoa, patrimônio ou honra.",
            exemplo: "O requerente foi vítima de roubo com arma de fogo, tentativa de homicídio, estelionato ou agressão física grave.",
            resultado: "Aplicação de pena privativa de liberdade (prisão em meses/dias), regime disciplinar e multa pecuniária ao Estado."
          },
          {
            nome: "Habeas Corpus",
            tag: "Liberdade de Locomoção",
            cor: "green",
            desc: "Remédio constitucional supremo e urgente para proteger e restituir imediatamente a liberdade de ir e vir de quem estiver preso ou ameaçado de prisão ilegal.",
            quando: "SEMPRE que alguém for preso sem flagrante legítimo, sem mandado judicial, com excesso de prazo na carceragem (mais de 24h) ou sob abuso de autoridade policial.",
            exemplo: "O cidadão foi detido durante uma blitz rotineira sem nenhum flagrante ou mandado, permanecendo detido ilegalmente sem audiência de custódia.",
            resultado: "Expedição imediata de Alvará de Soltura (relaxamento de prisão), revogação de medidas cautelares e trancamento de inquérito arbitrário."
          },
          {
            nome: "Mandado de Segurança",
            tag: "Direito Líquido & Certo",
            cor: "purple",
            desc: "Ação de garantia constitucional para tutelar direito líquido e certo (inquestionável e comprovado por documentos prévios) violado por ato ilegal de autoridade pública.",
            quando: "Quando um agente do Estado (policial, delegado, secretário) comete ato abusivo ou ilegal que NÃO envolve liberdade corporal (que é exclusiva do HC).",
            exemplo: "A autoridade policial apreendeu a frota de guinchos da empresa do cliente sem qualquer auto fundamentado ou mandado judicial válido.",
            resultado: "Ordem judicial expressa de anulação do ato administrativo com restituição imediata dos bens apreendidos ou restabelecimento de licenças."
          }
        ],
        dicasEstagiario: [
          "Verifique com rigor o Passaporte do autor e do réu — a identificação incorreta atrasa o andamento do processo.",
          "Em ações cíveis indenizatórias, fundamente nos Arts. 66 e 68 (Danos Materiais) ou Art. 69 (Dano Moral) do Código Civil de Brava.",
          "Em batidas e danos veiculares no RP, invoque expressamente o Art. 70 do Código Civil (Acidentes e Danos a Veículos).",
          "Em dívidas e quebras de contrato de empresas/cidadãos, cite os Arts. 55, 56 (Boa-fé) e 60 (Inadimplemento) do Código Civil.",
          "No Habeas Corpus, informe explicitamente quem é a 'Autoridade Coatora' (ex.: Delegado da Polícia Civil, Oficial da PM).",
          "Na Ação Cível, lembre-se sempre de preencher o campo 'Valor da Causa', que baliza custas e limites de indenização.",
          "Nos 'Fatos', narre em ordem cronológica (data, hora, local e dinâmica do evento). Nos 'Pedidos', seja pontual e direto."
        ],
        baseLegal: "Código Civil de Brava (Minuta CC-001/2026: Arts. 1º a 8º - Princípios; Arts. 55 a 65 - Obrigações e Contratos; Arts. 66 a 73 - Responsabilidade Civil; Arts. 79 a 92 - Solução de Conflitos) · CF/Brava art. 5º LXVIII e LXIX · CPC e CPP."
      },
      fields: [
        { id: "pi_numero", label: "Nº do Protocolo", type: "numero", prefixo: "PET", dica: "Gerado automaticamente pelo sistema do Tribunal. Clique no dado para gerar outro número." },
        { id: "pi_tipo", label: "Tipo de Ação", type: "options", options: ["Ação Cível", "Ação Criminal", "Habeas Corpus", "Mandado de Segurança"], dica: "Cível (indenizações/dívidas), Criminal (crimes), Habeas Corpus (soltura urgente), Mandado de Segurança (abuso estatal)." },
        { id: "pi_autor", label: "Autor / Requerente", req: true, dica: "Nome completo do cliente ou autor que está acionando a Justiça." },
        { id: "pi_autor_id", label: "Passaporte do Autor", dica: "Passaporte / ID do autor no RP (ex.: 1234). Essencial para comunicações." },
        { id: "pi_reu", label: "Réu / Requerido", req: true, dica: "Nome do réu, empresa ou autoridade coatora contra quem a ação é movida." },
        { id: "pi_reu_id", label: "Passaporte do Réu", dica: "Passaporte / ID do réu no RP (se conhecido; deixe em branco se ignorar)." },
        { id: "pi_artigos", label: "⚖️ Artigos / Base Legal", placeholder: "Ex.: Art. 66 e 70 do Código Civil de Brava (Colisão/Dano) ou Art. 55/60 (Contratos)", isFull: true, dica: "Indique os artigos do Código Civil de Brava (ex.: Art. 66/68 - Danos; Art. 70 - Veículos; Art. 55 - Contratos) ou do Código Penal." },
        { id: "pi_valor", label: "Valor da Causa", placeholder: "Ex.: R$ 50.000 (opcional)", isFull: true, dica: "Obrigatório no Cível. Valor pretendido em dinheiro (define alçada e custas do tribunal)." },
        { id: "pi_fatos", label: "Dos Fatos", type: "textarea", req: true, placeholder: "Descreva os fatos que motivam a ação...", dica: "Narre os acontecimentos em ordem cronológica: data, horário, local, como ocorreu e os prejuízos.", modelo: "1. DOS FATOS:\nNo dia [Data], por volta das [Horário], no local [Região de Brava], o Requerente foi vítima/prejudicado por conduta ilícita consistente em...\n\n2. DO DIREITO E FUNDAMENTAÇÃO:\nO ato praticado viola o Art. 66 c/c Art. 68 do Código Civil de Brava (Dever de Reparar e Danos Patrimoniais), gerando prejuízo direto no valor de R$ [Valor]...\n\n3. DA TENTATIVA DE SOLUÇÃO:\nO Requerente buscou a composição amigável prévia (Código Civil, Art. 83), restando a via consensual infrutífera." },
        { id: "pi_pedido", label: "Dos Pedidos", type: "textarea", req: true, placeholder: "O que se pede ao Juízo...", dica: "Especifique o que requer ao Juiz (liminar de urgência, soltura, condenação, indenização, custas).", modelo: "Diante de todo o exposto, com fulcro no Código Civil de Brava (Arts. 66, 68 e 79), requer a Vossa Excelência:\na) O recebimento e regular distribuição da presente petição inicial;\nb) A concessão de medida liminar inaudita altera parte na forma do Art. 89 do Código Civil;\nc) A citação do Requerido no passaporte indicado para, querendo, responder aos termos da ação;\nd) A TOTAL PROCEDÊNCIA dos pedidos formulados para condenar o Requerido ao pagamento de indenização integral de R$ [Valor];\ne) A condenação em custas processuais na forma da lei." },
      ],
    },
    {
      id: "processos", grupo: "processos", title: "Processos Criminais", svg: "processo", emoji: "🔱", tag: "Vara Criminal",
      desc: "Abertura e atualização de processos criminais em andamento.",
      webhook: "https://discord.com/api/webhooks/1561380508007534593/ZFAGt9x3aDs2vksYW8t3dmOA8uKQYzc1McrT-WaLOu_J1fmoScVi3l6DgMiOP4r_3Koc",
      cor: 12597547, cargoPadrao: "Juiz",
      natureza: "Processo Criminal", eficacia: "Em Tramitação",
      termo: "A SECRETARIA DA VARA CRIMINAL DA COMARCA DE BRAVA RP CERTIFICA o registro e a atualização do presente processo criminal, assegurados ao réu o contraditório, a ampla defesa e o devido processo legal.",
      guia: {
        destaque: "Status do Processo Criminal & Enquadramento Penal",
        resumo: "Registro e acompanhamento oficial de ações penais instauradas contra acusados de infrações delituosas. Define a situação processual do acusado perante o Poder Judiciário.",
        quandoUsar: "Utilize para formalizar a abertura de autos criminais, designar audiências de instrução penal, atualizar a situação da lide ou encaminhar para decisão do Magistrado.",
        diferencas: [
          {
            nome: "Em Andamento",
            tag: "Fase Instrutória",
            cor: "blue",
            desc: "O processo foi autuado e encontra-se na fase de juntada de provas, citação do acusado e manifestação da defesa preliminar.",
            quando: "Logo após o recebimento da denúncia ou queixa-crime, enquanto se colhem os primeiros elementos do contraditório.",
            exemplo: "Autos recém-distribuídos onde a Defesa tem prazo de 48h para juntar rol de testemunhas e documentos.",
            resultado: "Garante ao réu o direito de resposta prévia antes de qualquer deliberação conclusiva."
          },
          {
            nome: "Aguardando Audiência",
            tag: "Pauta Marcada",
            cor: "amber",
            desc: "A acusação e a resposta da defesa foram recebidas e os autos aguardam a data da audiência de instrução e julgamento.",
            quando: "Quando a data da sessão com o Juiz já foi pautada e as partes estão sendo intimadas a comparecer.",
            exemplo: "Audiência de Instrução e Julgamento designada para a próxima sexta-feira às 20h no Fórum de Brava.",
            resultado: "Prepara a oitiva de testemunhas de acusação, testemunhas de defesa e o interrogatório do acusado."
          },
          {
            nome: "Concluso para Sentença",
            tag: "Decisão Iminente",
            cor: "purple",
            desc: "Fase em que toda a colheita probatória e as alegações finais de acusação e defesa se encerraram. O processo está com o Juiz.",
            quando: "Quando não há mais provas a produzir e o Magistrado está redigindo a sentença condenatória ou absolutória.",
            exemplo: "Réu interrogado e memoriais entregues; o Juiz de Direito analisa o mérito para prolatar a sentença.",
            resultado: "Emissão iminente da sentença definitiva pelo Juízo com fixação de pena ou absolvição."
          },
          {
            nome: "Arquivado",
            tag: "Processo Finalizado",
            cor: "green",
            desc: "Autos findos, com trânsito em julgado, extinção da punibilidade ou cumprimento integral da pena.",
            quando: "Após a execução penal completa, pagamento de multas ou prescrição/absolvição definitiva sem cabimento de novos recursos.",
            exemplo: "Pena privativa de liberdade cumprida na íntegra e certidão de quitação expedida.",
            resultado: "Baixa na distribuição e arquivamento definitivo no arquivo geral do Tribunal."
          }
        ],
        dicasEstagiario: [
          "Cite todos os artigos penais de forma expressa (ex.: 'Art. 3.2 - Roubo Qualificado') para facilitar a dosimetria.",
          "Verifique sempre se o réu possui advogado constituído ou se necessita de nomeação de Defensor Público Dativo.",
          "Certifique-se se o réu responde ao processo preso ou em liberdade provisória para priorizar a tramitação."
        ],
        baseLegal: "Código de Processo Penal e Código Penal da Comarca de Brava RP."
      },
      fields: [
        { id: "pc_numero", label: "Nº do Processo", type: "numero", prefixo: "CNJ", dica: "Formato oficial padrão CNJ do Tribunal de Justiça de Brava." },
        { id: "pc_status", label: "Status", type: "options", options: ["Em Andamento", "Aguardando Audiência", "Concluso para Sentença", "Arquivado"], dica: "Selecione a fase atual em que os autos se encontram perante a Vara." },
        { id: "pc_reu", label: "Réu", req: true, dica: "Nome completo do réu acusado no processo penal." },
        { id: "pc_reu_id", label: "Passaporte do Réu", dica: "Passaporte / ID do acusado no RP (ex.: 1234)." },
        { id: "pc_acusacao", label: "⚖️ Artigos / Acusação Penal", req: true, placeholder: "Ex.: Art. 3.2 (Roubo Qualificado), Art. 1.1 (Equipamento Balístico)...", isFull: true, dica: "Liste os artigos infringidos do Código Penal e o nome jurídico de cada crime." },
        { id: "pc_vara", label: "Vara", value: "Vara Criminal de Brava", dica: "Vara judiciária competente responsável pelo feito." },
        { id: "pc_promotor", label: "Promotor(a)", dica: "Nome do Promotor de Justiça titular que atua na acusação." },
        { id: "pc_defesa", label: "Defesa (Advogado)", dica: "Nome do Advogado de defesa ou Defensor Público do réu." },
        { id: "pc_resumo", label: "Resumo do Caso", type: "textarea", placeholder: "Resumo dos fatos e andamento do processo...", dica: "Síntese dos fatos apurados, provas periciais juntadas e situação da instrução.", modelo: "Trata-se de ação penal pública instaurada para apuração da prática delitiva descrita na denúncia. O réu [Nome] foi flagrado/investigado no local [Endereço], tendo sido apreendidos [armas/ilícitos/bens]. A defesa preliminar foi apresentada e os autos aguardam a audiência de instrução e julgamento para oitiva das partes." },
      ],
    },
    {
      id: "civeis", grupo: "processos", title: "Processos Cíveis", svg: "civil", emoji: "📃", tag: "Vara Cível",
      desc: "Ações cíveis: indenizações, contratos, disputas patrimoniais e família.",
      webhook: "https://discord.com/api/webhooks/1561380569428926574/fcWu6oJ_SQseWYJrDv_ejjHTIRGtkiXRD1QHO3CDuoM-TthGdilJBNNXckL4koIuhQ7S",
      cor: 3447003, cargoPadrao: "Juiz",
      natureza: "Processo Cível", eficacia: "Em Tramitação",
      termo: "A SECRETARIA DA VARA CÍVEL DA COMARCA DE BRAVA RP CERTIFICA o registro e a atualização do presente processo cível, que tramita conforme as normas processuais vigentes no Poder Judiciário de Brava.",
      guia: {
        destaque: "Processo Cível vs Processo Penal & Fixação do Valor da Causa",
        resumo: "Instrumento processual que tutela as relações privadas e patrimoniais da cidade. O foco é a pacificação de conflitos entre cidadãos e empresas sem aplicação de sanção carcerária.",
        quandoUsar: "Para cobrança de inadimplências, reparações de danos materiais em veículos/propriedades, indenizações morais, dissolução de união e execução de títulos contratuais.",
        diferencas: [
          {
            nome: "Em Andamento",
            tag: "Fase Inicial",
            cor: "blue",
            desc: "Ação ajuizada em fase de citação do requerido para apresentação de contestação e proposta de acordo.",
            quando: "Após a distribuição da petição inicial cível.",
            exemplo: "Requerido citado para pagar R$ 50.000 ou contestar a cobrança no prazo legal.",
            resultado: "Abertura de prazo para a defesa apresentar suas razões ou propor conciliação."
          },
          {
            nome: "Aguardando Audiência",
            tag: "Sessão de Conciliação",
            cor: "amber",
            desc: "Processo com designação de sessão conciliatória ou de instrução para produção de provas periciais/testemunhais.",
            quando: "Quando as partes são convocadas para buscar acordo antes da sentença do Juiz.",
            exemplo: "Audiência de conciliação marcada para tentativa de acordo de parcelamento de dívida de colisão de veículo.",
            resultado: "Possibilidade de homologação de acordo judicial com força de título executivo."
          },
          {
            nome: "Concluso para Sentença",
            tag: "Julgamento Cível",
            cor: "purple",
            desc: "Autos prontos para o Juiz decidir se acolhe o pedido indenizatório (procedência) ou o rejeita (improcedência).",
            quando: "Fim das manifestações das partes e produção probatória.",
            exemplo: "Juiz analisa se a colisão causou dano moral e fixa o quantum indenizatório devido.",
            resultado: "Publicação de sentença com condenação líquida ou arbitramento de obrigação de pagar."
          },
          {
            nome: "Arquivado",
            tag: "Extinção da Lide",
            cor: "green",
            desc: "Acordo cumprido, pagamento voluntário realizado ou processo extinto com quitação das custas.",
            quando: "Quando a obrigação de pagar foi integralmente quitada ou o autor desistiu da ação formalmente.",
            exemplo: "Comprovante de transferência de R$ 80.000 juntado aos autos e baixa realizada.",
            resultado: "Extinção definitiva da relação jurídica processual."
          }
        ],
        dicasEstagiario: [
          "O 'Valor da Causa' é indispensável no Cível — corresponde ao total em dinheiro que o autor deseja receber.",
          "Fundamente a lide com base nos Livros VI (Contratos, arts. 55-65) ou VII (Responsabilidade Civil, arts. 66-73) do Código Civil de Brava.",
          "O Art. 83 do Código Civil prevê conciliação prévia entre as partes antes de qualquer julgamento condenatório definitivo.",
          "Para danos causados por empresas cadastradas no CNPJ-RP, aplique o Art. 71 do Código Civil (Responsabilidade Empresarial).",
          "Anexe comprovantes materiais claros (fotos de danos, orçamentos mecânicos, notas fiscais, contratos assinados).",
          "Diferença essencial: Ninguém vai preso por ilícito cível. O remédio aqui é financeiro ou obrigacional."
        ],
        baseLegal: "Código Civil da Cidade de Brava RP (Minuta CC-001/2026: Livro V - Propriedade; Livro VI - Contratos; Livro VII - Responsabilidade Civil; Livro IX - Processo e Solução de Conflitos) · Código de Processo Civil."
      },
      fields: [
        { id: "pv_numero", label: "Nº do Processo", type: "numero", prefixo: "CNJ", dica: "Número oficial do processo cível no Tribunal de Justiça." },
        { id: "pv_status", label: "Status", type: "options", options: ["Em Andamento", "Aguardando Audiência", "Concluso para Sentença", "Arquivado"], dica: "Selecione a fase atual de tramitação perante a Vara Cível." },
        { id: "pv_requerente", label: "Requerente", req: true, dica: "Nome da pessoa física ou razão social da empresa autora." },
        { id: "pv_requerente_id", label: "Passaporte do Requerente", dica: "Passaporte / ID do autor no RP (ex.: 1234)." },
        { id: "pv_requerido", label: "Requerido", req: true, dica: "Nome do devedor ou causador do dano patrimonial/moral." },
        { id: "pv_requerido_id", label: "Passaporte do Requerido", dica: "Passaporte do requerido (se conhecido; deixe vazio se ignorar)." },
        { id: "pv_objeto", label: "Objeto da Ação", req: true, placeholder: "Ex.: Indenização por danos materiais", dica: "Resumo do que se pede (ex.: Indenização por colisão veicular, rescisão de contrato)." },
        { id: "pv_artigos", label: "⚖️ Artigos / Base Legal", placeholder: "Ex.: Art. 66 e 70 do Código Civil de Brava (Danos Veiculares) ou Art. 55/60 (Contratos)", isFull: true, dica: "Dispositivos do Código Civil de Brava aplicáveis (ex.: Art. 66, 68, 69 para indenizações; Art. 55 a 65 para contratos; Art. 70 para veículos)." },
        { id: "pv_valor", label: "Valor da Causa", placeholder: "Ex.: R$ 120.000", dica: "Valor financeiro exato pretendido em dinheiro (define alçada e custas do tribunal)." },
        { id: "pv_resumo", label: "Resumo do Caso", type: "textarea", placeholder: "Resumo dos fatos e andamento do processo...", dica: "Descreva a controvérsia patrimonial, o prejuízo comprovado e a ausência de acordo.", modelo: "A presente lide cível versa sobre reparação de prejuízos decorrentes de [Objeto da Ação], com fulcro no Art. 66 e seguintes do Código Civil da Cidade de Brava RP. O requerente comprova através de documentos o dano material e/ou moral de R$ [Valor], não tendo havido solução consensual extrajudicial. Requer-se a designação de audiência de conciliação (CC, Art. 83) e, subsidiariamente, o julgamento final de procedência com condenação líquida." },
      ],
    },
    {
      id: "decisoes", grupo: "processos", title: "Decisões", svg: "decisao", emoji: "🏛️", tag: "Sentença",
      desc: "Publicação de sentenças, decisões interlocutórias e despachos.",
      webhook: "https://discord.com/api/webhooks/1561380637401677935/4YhvA1yrz28X58qcRhPbJU4Vs2ZgZ4ig5dmYksFKqwPeO7jhNcn7ppMP97fqv8CHmca6",
      cor: 10181046, cargoPadrao: "Juiz",
      natureza: "Decisão Judicial", eficacia: "Publicação Oficial",
      termo: "O PODER JUDICIÁRIO DA COMARCA DE BRAVA RP torna pública a presente decisão, proferida pelo Juízo competente, que produz seus efeitos legais a partir de sua publicação. Cumpra-se.",
      secaoTexto: "Fundamentação e Dispositivo",
      guia: {
        destaque: "Sentença × Decisão Interlocutória × Despacho × Acórdão",
        resumo: "Atos decisórios emitidos exclusivamente pelo Juiz de Direito no exercício de sua jurisdição. Cada espécie possui forma, finalidade e gravidade processual distintas.",
        quandoUsar: "Para publicar vereditos de julgamentos, conceder ou negar liminares de urgência, relaxar prisões, homologar acordos ou dar andamento aos autos.",
        diferencas: [
          {
            nome: "Sentença",
            tag: "Fim do Processo em 1º Grau",
            cor: "purple",
            desc: "O ato mais solene do Magistrado monocrático que põe termo à fase de conhecimento da ação, resolvendo ou não o mérito.",
            quando: "Ao finalizar o processo para condenar ou absolver o réu, ou acolher/rejeitar o pedido do autor.",
            exemplo: "Julgo procedente a pretensão punitiva para condenar o réu à pena de 35 meses de reclusão em regime fechado.",
            resultado: "Encerra a instância singular, cabendo apenas recurso à instância superior."
          },
          {
            nome: "Decisão Interlocutória",
            tag: "Decisão Urgente no Curso da Ação",
            cor: "amber",
            desc: "Decisão proferida NO CURSO da ação que resolve questão urgente, controvertida ou incidental sem encerrar o processo.",
            quando: "Para conceder ou revogar liminares, fixar fiança provisória, decretar prisão preventiva, quebrar sigilos ou bloquear bens.",
            exemplo: "Defiro a liminar em Habeas Corpus para expedir imediato Alvará de Soltura até o julgamento definitivo do mérito.",
            resultado: "Gera efeitos jurídicos e coercitivos imediatos enquanto o processo principal continua tramitando."
          },
          {
            nome: "Despacho",
            tag: "Impulso Processual Simples",
            cor: "blue",
            desc: "Ato de mero expediente e andamento processual sem carga decisória que cause prejuízo às partes.",
            quando: "Para movimentar os autos, abrir prazo de manifestação ou ordenar juntada de documentos e certidões.",
            exemplo: "'Intime-se o Ministério Público para apresentar memoriais em 48 horas.'",
            resultado: "Impulsiona a marcha processual sem gerar preclusão ou prejuízo jurídico imediato."
          },
          {
            nome: "Acórdão",
            tag: "Decisão Colegiada (Tribunal)",
            cor: "green",
            desc: "Julgamento colegiado proferido pela Turma de Desembargadores do Tribunal de Justiça ao julgar recursos.",
            quando: "Quando uma das partes recorre da sentença do Juiz de 1º grau para revisão no Pleno do Tribunal.",
            exemplo: "Acordam os Desembargadores em dar provimento parcial ao recurso para reduzir a pena de 40 para 20 meses.",
            resultado: "Confirma, reforma ou anula a sentença monocrática recorrida."
          }
        ],
        dicasEstagiario: [
          "Diferença crucial de 'Resultado':",
          "• Procedente / Improcedente: Termos típicos do Cível (acolhe ou rejeita o pedido autoral, com fulcro no Art. 88 do CC de Brava).",
          "• Condenação / Absolvição: Termos exclusivos da esfera Criminal (imputação de culpa ou declaração de inocência penal).",
          "• Extinção sem Mérito: Quando o processo é arquivado por falta de documento essencial ou vício formal sem julgar quem tinha razão.",
          "Requisitos da Decisão (Art. 88 do Código Civil): Identificação do caso, fatos, fundamentos, determinação e prazo certo de cumprimento.",
          "Para tutelas de urgência ou liminares cautelares, aplique os pressupostos do Art. 89 do Código Civil de Brava."
        ],
        baseLegal: "Código Civil de Brava (Arts. 81, 84 e 88 - Sentenças e Decisões Judiciais; Art. 89 - Medidas Urgentes; Art. 91 - Cumprimento de Decisões) · Art. 381 CPP e Regimento do Tribunal."
      },
      fields: [
        { id: "de_processo", label: "Nº do Processo", req: true, placeholder: "Ex.: 0001234-56.2026.8.26.0001", dica: "Número oficial do processo judicial em que esta decisão é lavrada." },
        { id: "de_tipo", label: "Tipo de Decisão", type: "options", options: ["Sentença", "Decisão Interlocutória", "Despacho", "Acórdão"], dica: "Sentença (terminativa), Decisão Interlocutória (urgente/incidente), Despacho (impulso simples), Acórdão (colegiado)." },
        { id: "de_resultado", label: "Resultado", type: "options", options: ["Procedente", "Parcialmente Procedente", "Improcedente", "Condenação", "Absolvição", "Extinção sem Mérito"], dica: "Procedente/Improcedente (Cível); Condenação/Absolvição (Penal); Extinção sem Mérito (vícios formais)." },
        { id: "de_partes", label: "Partes Envolvidas", req: true, placeholder: "Ex.: Ministério Público x João Silva", dica: "Identificação das partes litigantes (Autor x Réu)." },
        { id: "de_artigos", label: "⚖️ Artigos / Dispositivos Legais", placeholder: "Ex.: Art. 66 e 88 do Código Civil de Brava ou Art. 121 CP", isFull: true, dica: "Artigos da lei aplicados para fundamentar a decisão (Código Civil de Brava e/ou Código Penal)." },
        { id: "de_pena", label: "Pena / Condenação", placeholder: "Ex.: 30 meses + multa de R$ 40.000 (se penal) ou Indenização de R$ 50.000 (se cível)", isFull: true, dica: "Se penal: tempo de pena privativa de liberdade e valor da multa. Se cível: montante indenizatório." },
        { id: "de_fundamentacao", label: "Fundamentação", type: "textarea", req: true, placeholder: "Razões de fato e de direito da decisão...", dica: "Analise as provas materiais, depoimentos e teses de defesa para motivar a decisão.", modelo: "VISTOS, ETC.\nTrata-se de procedimento judicial instaurado para apuração de [Fatos / Pretensão]. A autoria e a materialidade / nexo causal restaram devidamente comprovados nos autos pelo conjunto probatório. Nos termos do Código Civil de Brava (Art. 66 c/c Art. 88) / Código Penal, impõe-se a aplicação da medida de direito cabível, ante a ausência de excludentes de ilicitude ou escusas legítimas." },
        { id: "de_dispositivo", label: "Dispositivo", type: "textarea", req: true, placeholder: "O que fica decidido. Ex.: Julgo procedente o pedido para...", dica: "A ordem final imperativa do Magistrado: 'Ante o exposto, JULGO... Cumpra-se.'", modelo: "DISPOSITIVO:\nAnte todo o exposto e pelo que mais dos autos consta, JULGO [PROCEDENTE / CONDENATÓRIA] a presente demanda para o fim de:\n1) CONDENAR a parte vencida ao pagamento da indenização / cumprimento da obrigação no valor de R$ [Valor] / aplicação da pena penal de [X] meses;\n2) Fixar o prazo de [X] horas para cumprimento voluntário, sob pena de execução (CC, Art. 91);\nPublique-se no Diário Oficial. Registre-se. Intimem-se as partes e cumpra-se na forma da lei." },
      ],
    },

    /* ---------------- MANDADOS & AUTORIZAÇÕES ---------------- */
    {
      id: "mandados", grupo: "mandados", title: "Mandados", svg: "mandado", emoji: "📖", tag: "Expedição",
      desc: "Expedição de mandados de prisão, busca e apreensão e condução.",
      webhook: "https://discord.com/api/webhooks/1561380253123874856/OkgzHHGy1ybZJJLLSA8hHZtDX2ZIbuYusZ4OHlBj90ZuU-PE4tlE4vFXpRh8pB1a7fed",
      cor: 15158332, cargoPadrao: "Juiz",
      natureza: "Mandado Judicial", eficacia: "Cumprimento Imediato",
      termo: "O JUÍZO DA COMARCA DE BRAVA RP, no uso de suas atribuições legais, MANDA a qualquer autoridade policial ou Oficial de Justiça a quem este for apresentado que, em seu cumprimento, proceda na forma abaixo determinada, observadas as garantias legais. Cumpra-se.",
      guia: {
        destaque: "Mandado de Prisão × Busca & Apreensão × Condução Coercitiva × Afastamento",
        resumo: "Ordem formal, escrita e fundamentada, emitida pelo Juiz de Direito, ordenando o uso da força policial ou diligência de Oficial de Justiça para executar medida coercitiva.",
        quandoUsar: "Para prender foragidos ou suspeitos perigosos, ingressar em imóveis para arrecadar ilícitos, compelir comparecimento de testemunhas faltosas ou proteger vítimas de agressão doméstica.",
        diferencas: [
          {
            nome: "Prisão",
            tag: "Privação de Liberdade",
            cor: "red",
            desc: "Ordem solene que autoriza qualquer autoridade policial a capturar e recolher o indivíduo ao cárcere público.",
            quando: "Para prisão preventiva (garantia da ordem pública ou fuga), temporária ou execução de sentença condenatória definitiva.",
            exemplo: "Mandado de prisão preventiva expedido contra líder de organização criminosa por roubo qualificado e tráfico de armas.",
            resultado: "Encarceramento do alvo na penitenciária com comunicação imediata ao Juiz em até 24 horas."
          },
          {
            nome: "Busca e Apreensão",
            tag: "Inviolabilidade de Domicílio",
            cor: "amber",
            desc: "Ordem que autoriza agentes da lei a ingressarem em imóvel residencial, comercial ou veículo para apreender provas e ilícitos.",
            quando: "Quando houver indícios fundados de guarda de drogas, armas, munições ou computadores utilizados em crimes.",
            exemplo: "Busca e apreensão deferida para imóvel no bairro de Vinewood para apreensão de maquinários e armas ilegais.",
            resultado: "Entrada forçada legítima da polícia, arrecadação dos itens e lavratura de auto circunstanciado."
          },
          {
            nome: "Condução Coercitiva",
            tag: "Comparecimento Forçado",
            cor: "blue",
            desc: "Ordem para conduzir pessoa fisicamente perante a autoridade judicial ou policial para ser ouvida.",
            quando: "Para testemunhas, vítimas ou peritos que foram intimados formalmente e não compareceram sem justificativa.",
            exemplo: "Testemunha ocular de homicídio se recusa a comparecer à audiência de instrução do Júri.",
            resultado: "A pessoa é conduzida pelos policiais exclusivamente para prestar depoimento, sendo liberada em seguida. NÃO é prisão."
          },
          {
            nome: "Afastamento do Lar",
            tag: "Medida Protetiva",
            cor: "purple",
            desc: "Medida judicial cautelar urgente que proíbe o agressor de permanecer na residência familiar ou se aproximar da vítima.",
            quando: "Em situações de violência doméstica, ameaça grave ou risco à integridade física de familiares.",
            exemplo: "Afastamento imediato do agressor da residência, fixando distância mínima de 300 metros sob pena de prisão em flagrante.",
            resultado: "Retirada forçada do investigado do imóvel e proteção cautelar à integridade da vítima."
          }
        ],
        dicasEstagiario: [
          "Mandado sem endereço preciso é nulo! Indique com exatidão o imóvel ou referência no mapa de Brava.",
          "Todo mandado deve conter prazo de validade expresso. Se vencer antes do cumprimento, perde a eficácia.",
          "Lembre-se: mandado de condução coercitiva NÃO autoriza colocar o cidadão em cela ou algemar sem resistência."
        ],
        baseLegal: "Art. 5º, XI da Constituição Federal, Art. 282 e seguintes do Código de Processo Penal."
      },
      fields: [
        { id: "mn_numero", label: "Nº do Mandado", type: "numero", prefixo: "MAND", dica: "Número identificador oficial do mandado gerado pelo sistema." },
        { id: "mn_tipo", label: "Tipo de Mandado", type: "options", options: ["Prisão", "Busca e Apreensão", "Condução Coercitiva", "Afastamento do Lar"], dica: "Prisão (captura), Busca e Apreensão (entrar em imóvel), Condução (levar a depor), Afastamento (medida protetiva)." },
        { id: "mn_alvo", label: "Alvo / Investigado", req: true, dica: "Nome completo do investigado, foragido ou empresa alvo da ordem." },
        { id: "mn_alvo_id", label: "Passaporte do Alvo", dica: "Passaporte / ID do alvo no RP (ex.: 1234)." },
        { id: "mn_artigos", label: "⚖️ Artigos / Infrações Penais", req: true, placeholder: "Ex.: Art. 3.2 (Roubo), Art. 1.2 (Porte Ilegal)...", isFull: true, dica: "Artigos das infrações penais imputadas que fundamentam a medida coercitiva." },
        { id: "mn_endereco", label: "Endereço / Local", placeholder: "Ex.: Casa 12, Vinewood Hills", dica: "Local exato com pontos de referência em Brava RP. Mandado sem endereço é nulo!" },
        { id: "mn_processo", label: "Nº do Processo Vinculado", dica: "Número do processo criminal ao qual o mandado pertence." },
        { id: "mn_validade", label: "Válido até", type: "date", dica: "Data máxima para execução policial. Após esse prazo, o mandado caduca." },
        { id: "mn_solicitante", label: "Solicitante (Corporação)", placeholder: "Ex.: Polícia Civil — Del. Souza", dica: "Corporação ou autoridade requerente da ordem (Polícia Civil, PM, etc.)." },
        { id: "mn_fundamento", label: "Fundamentação", type: "textarea", req: true, placeholder: "Motivo e fundamento legal da expedição...", dica: "Justifique a necessidade imperiosa da ordem: perigo de fuga, risco à ordem pública ou provas perecíveis.", modelo: "Defiro a expedição da presente ordem judicial coercitiva com amparo no Art. 5º da Constituição Federal e normas do Código de Processo Penal, evidenciando-se indícios veementes de autoria e prova da materialidade delitiva, sendo a medida imprescindível para garantia da ordem pública e colheita cautelar de provas." },
      ],
    },
    {
      id: "autorizacoes", grupo: "mandados", title: "Autorizações Judiciais", svg: "autorizacao", emoji: "✅", tag: "Autorização",
      desc: "Concessão de autorizações judiciais especiais a cidadãos e corporações.",
      webhook: "https://discord.com/api/webhooks/1561380324988952758/ZGqkBNc3GzEFtiTiE7g708Cf5HLLZPiNIeK7NYcNWIibOm66vApMshuv-fG4uTx6MHpA",
      cor: 3066993, cargoPadrao: "Juiz",
      natureza: "Autorização Judicial", eficacia: "Até a Validade",
      termo: "O JUÍZO DA COMARCA DE BRAVA RP AUTORIZA o requerente abaixo qualificado a praticar o ato descrito, dentro do prazo de validade e nos estritos limites desta decisão, sob pena de revogação imediata.",
      guia: {
        destaque: "Quebra de Sigilo × Interceptação × Eventos × Porte Especial",
        resumo: "Decisão do Magistrado que outorga licença ou autorização especial para atos que dependem de reserva de jurisdição ou chancela oficial do Estado.",
        quandoUsar: "Para investigações policiais com acesso a dados bancários ou grampos de rádio/telefone, autorização para grandes eventos na comarca ou concessão de porte de arma especial.",
        diferencas: [
          {
            nome: "Quebra de Sigilo",
            tag: "Dados Protegidos",
            cor: "blue",
            desc: "Permissão judicial para obter extratos bancários, registros cadastrais e históricos telemáticos de investigados.",
            quando: "Em inquéritos de lavagem de dinheiro, corrupção, estelionato ou formação de quadrilha.",
            exemplo: "Autorização para o Banco Central fornecer extratos dos últimos 30 dias da conta da empresa sob investigação.",
            resultado: "Acesso probatório legítimo pela polícia judiciária e Ministério Público."
          },
          {
            nome: "Interceptação",
            tag: "Monitoramento em Tempo Real",
            cor: "red",
            desc: "Autorização para escuta telefônica, monitoramento de frequências de rádio ou interceptação telemática.",
            quando: "Último recurso investigativo em crimes graves com pena superior a 15 meses de reclusão.",
            exemplo: "Monitoramento em tempo real da frequência de comunicação de quadrilha especializada em roubos a bancos.",
            resultado: "Gravação legalizada das conversas para juntada em processo criminal sem nulidade de prova."
          },
          {
            nome: "Evento Público",
            tag: "Alvará Judicial",
            cor: "amber",
            desc: "Autorização especial para realização de festividades, corridas, eventos corporativos ou fechamento de vias públicas.",
            quando: "Quando cidadãos ou empresas pretendem reunir multidões com segurança privada e apoio das corporações policiais.",
            exemplo: "Alvará concedido para o Festival de Música na Marina de Brava durante o fim de semana.",
            resultado: "Garante a legitimidade do evento contra autuações administrativas e fecha vias com apoio da guarda municipal."
          },
          {
            nome: "Porte Especial",
            tag: "Armamento",
            cor: "purple",
            desc: "Concessão personalíssima e excepcional de autorização para portar armamento em condições restritas.",
            quando: "Para servidores do sistema prisional, magistrados, promotores ou cidadãos sob ameaça concreta de morte.",
            exemplo: "Porte especial concedido a testemunha-chave sob programa de proteção judiciária.",
            resultado: "Documento oficial que isenta o portador do crime de porte ilegal perante abordagens policiais."
          }
        ],
        dicasEstagiario: [
          "Toda autorização judicial tem prazo de validade impreterível. Defina a data final no formulário.",
          "Sem o amparo de autorização judicial, qualquer grampo telefônico ou acesso bancário é considerado prova ilícita no processo!",
          "Verifique se o solicitante preencheu corretamente o passaporte e o órgão solicitante."
        ],
        baseLegal: "Lei 9.296/96 (Interceptações), Lei Complementar de Sigilo e Portarias Judiciais da Comarca."
      },
      fields: [
        { id: "au_numero", label: "Nº da Autorização", type: "numero", prefixo: "AUT", dica: "Número oficial de controle da autorização judicial." },
        { id: "au_tipo", label: "Tipo de Autorização", type: "options", options: ["Quebra de Sigilo", "Interceptação", "Evento Público", "Porte Especial", "Outra"], dica: "Quebra de Sigilo (bancos/dados), Interceptação (escuta), Evento Público (alvará de ruas/festas), Porte Especial." },
        { id: "au_solicitante", label: "Solicitante", req: true, dica: "Nome do solicitante credenciado ou autoridade policial." },
        { id: "au_solicitante_id", label: "Passaporte do Solicitante", dica: "Passaporte / ID do solicitante no RP." },
        { id: "au_orgao", label: "Órgão / Corporação", placeholder: "Ex.: Polícia Militar, Empresa X...", dica: "Corporação ou instituição requerente." },
        { id: "au_artigos", label: "⚖️ Artigos / Amparo Legal", placeholder: "Ex.: Art. 5º, XII da CF, Art. 2º da Lei 9.296/96...", isFull: true, dica: "Base legal que permite a concessão da medida excepcional." },
        { id: "au_validade", label: "Válida até", type: "date", dica: "Prazo final de vigência. Após a data, a autorização perde eficácia legal." },
        { id: "au_motivo", label: "Objeto e Motivo", type: "textarea", req: true, placeholder: "O que está sendo autorizado e por quê...", dica: "Detalhe o que está sendo autorizado e os limites exatos da decisão judicial.", modelo: "AUTORIZA-SE expressamente o órgão/requerente indicado a proceder com [Descrever ato autorizado], dentro dos limites territoriais da Comarca de Brava RP e estritamente até a data de validade fixada nesta decisão, sob pena de responsabilidade funcional e revogação imediata." },
      ],
    },
    {
      id: "concluidos", grupo: "mandados", title: "Mandados Concluídos", svg: "concluido", emoji: "📚", tag: "Cumprimento",
      desc: "Registro do cumprimento (ou não) de mandados expedidos.",
      webhook: "https://discord.com/api/webhooks/1561380382379868270/-fUXxgk-te92XqL-HYI-YDnw3YhB0b_Fj6ReZTblNTRKj7oXhCazprsqcGiQdCvZpr6M",
      cor: 1752220, cargoPadrao: "Oficial de Justiça",
      natureza: "Certidão de Cumprimento", eficacia: "Baixa do Mandado",
      termo: "O OFICIAL DE JUSTIÇA abaixo assinado CERTIFICA, com fé pública, que diligenciou para o cumprimento do mandado referido, com o resultado aqui descrito. O referido é verdade e dou fé.",
      guia: {
        destaque: "Certidão de Diligência do Oficial de Justiça & Efeitos de Cumprimento",
        resumo: "Certidão dotada de fé pública lavrada pelo Oficial de Justiça ou autoridade policial encarregada, relatando se a ordem judicial foi executada, se houve resistência ou apreensões.",
        quandoUsar: "Imediatamente após a realização da diligência policial ou de cumprimento de mandado para prestar contas ao Juiz da causa e dar baixa no mandado.",
        diferencas: [
          {
            nome: "Cumprido",
            tag: "100% Executado",
            cor: "green",
            desc: "A ordem do Magistrado foi executada em sua totalidade com pleno êxito.",
            quando: "Quando o foragido foi capturado e recolhido à cela, ou quando os bens foram apreendidos integralmente.",
            exemplo: "Alvo localizado em sua residência, capturado sem ferimentos e entregue na delegacia para custódia.",
            resultado: "Baixa definitiva no mandado nos sistemas policiais e comunicação ao Juiz para agendar custódia."
          },
          {
            nome: "Cumprido Parcialmente",
            tag: "Êxito Parcial",
            cor: "amber",
            desc: "Parte das determinações foi cumprida, porém restaram pendências involuntárias.",
            quando: "Por exemplo, foram apreendidas as armas, mas o investigado principal conseguiu fugir pelos fundos.",
            exemplo: "Apreendidas 5 armas de fogo no galpão, porém o dono do imóvel evadiu-se do cerco policial.",
            resultado: "Os bens apreendidos vão a depósito judicial e o mandado de prisão segue ativo para captura do foragido."
          },
          {
            nome: "Não Cumprido",
            tag: "Infrutífero",
            cor: "red",
            desc: "A diligência foi realizada com diligência, mas não foi possível executar a ordem judicial.",
            quando: "Endereço inexistente, imóvel desocupado ou alvo mudou-se para local incerto e não sabido.",
            exemplo: "Diligência realizada no endereço informado, porém o imóvel encontra-se abandonado há meses.",
            resultado: "O Juiz é informado para intimar a acusação a fornecer novo endereço válido sob pena de extinção."
          }
        ],
        dicasEstagiario: [
          "O Oficial de Justiça goza de presunção de veracidade (fé pública). Descreva os fatos com fidelidade absoluta.",
          "O Art. 91 do Código Civil de Brava determina que o cumprimento de decisões ocorra estritamente pelos meios legítimos autorizados.",
          "Sempre mencione se houve apreensão de itens ilícitos e identifique a corporação do executor (ex.: Oficial de Justiça Silva / Del. Souza).",
          "A lavratura desta certidão é o que permite a baixa do nome do cidadão na lista de procurados da polícia."
        ],
        baseLegal: "Código Civil de Brava (Art. 91 - Cumprimento de Ordens e Decisões; Art. 93 e Anexo I - Competências Operacionais do SDJ) · Art. 154 do CPC."
      },
      fields: [
        { id: "mc_numero", label: "Nº do Mandado", req: true, placeholder: "Ex.: MAND-2026-123456", dica: "Informe o código oficial do mandado original que foi objeto da diligência." },
        { id: "mc_tipo", label: "Tipo de Mandado", type: "options", options: ["Prisão", "Busca e Apreensão", "Condução Coercitiva", "Afastamento do Lar"], dica: "Selecione a ordem exata cumprida (ex: Busca e Apreensão para bens, Prisão para foragidos)." },
        { id: "mc_resultado", label: "Resultado", type: "options", options: ["Cumprido", "Cumprido Parcialmente", "Não Cumprido"], dica: "Indique se a ordem foi cumprida integralmente, com êxito parcial ou se restou infrutífera." },
        { id: "mc_alvo", label: "Alvo", req: true, dica: "Nome do cidadão abordado ou estabelecimento que era alvo da ordem judicial." },
        { id: "mc_alvo_id", label: "Passaporte do Alvo", dica: "Passaporte ou RG do alvo capturado ou notificado (se pessoa física)." },
        { id: "mc_artigos", label: "⚖️ Artigos do Mandado", placeholder: "Ex.: Art. 3.2 (Roubo)", isFull: true, dica: "Artigos e qualificações penais que fundamentaram a expedição do mandado." },
        { id: "mc_executor", label: "Executor (Policial/Oficial)", dica: "Nome do Oficial de Justiça ou da autoridade policial responsável pela execução do ato." },
        { id: "mc_data", label: "Data do Cumprimento", type: "date", dica: "Data em que a diligência policial ou de execução foi concretizada no local." },
        { id: "mc_relato", label: "Relato da Diligência", type: "textarea", placeholder: "Como ocorreu o cumprimento, itens apreendidos, etc...", dica: "Descreva com fé pública como correu a operação, resistência, apreensões e encaminhamento do alvo.", modelo: "CERTIFICO que, em cumprimento à ordem judicial deste Juízo, diligenciei até o local indicado e procedi à abordagem do alvo. A diligência transcorreu sem incidentes, tendo sido realizada a apreensão de [Descrever itens apreendidos ou 'sem bens apreendidos']. O alvo foi cientificado de seus direitos constitucionais e conduzido com integridade física preservada à autoridade policial competente. O referido é verdade e dou fé." },
      ],
    },

    /* ---------------- COMUNICAÇÕES & AGENDA ---------------- */
    {
      id: "intimacoes", grupo: "agenda", title: "Intimações", svg: "intimacao", emoji: "📢", tag: "Comunicação",
      desc: "Intimação de réus, testemunhas e partes para comparecimento.",
      webhook: "https://discord.com/api/webhooks/1561380441091612682/9B_xqFN7I5-wnF0wlCPtFRM6mh9sZ6U0V-of8kkRg68r1z7R2WV44itnRrgjSRjDJC40",
      cor: 15105570, cargoPadrao: "Juiz",
      natureza: "Intimação Judicial", eficacia: "Comparecimento Obrigatório",
      termo: "O JUÍZO DA COMARCA DE BRAVA RP INTIMA a pessoa abaixo qualificada a comparecer no local, data e horário indicados. O não comparecimento injustificado poderá acarretar condução coercitiva e demais sanções legais.",
      guia: {
        destaque: "Qualidade do Intimado & Obrigações Perante a Justiça",
        resumo: "Ato solene pelo qual o Judiciário convoca formalmente indivíduos envolvidos na causa para comparecerem ao Fórum ou tomarem ciência de atos processuais.",
        quandoUsar: "Para intimar réus, vítimas, testemunhas oculares ou peritos técnicos para audiências solenes de instrução ou acareações judiciais.",
        diferencas: [
          {
            nome: "Réu",
            tag: "Acusado no Processo",
            cor: "red",
            desc: "Aquele contra quem recai a imputação criminal ou o pedido da ação civil.",
            quando: "Para ser interrogado e exercer seu direito constitucional à ampla defesa e contraditório.",
            exemplo: "Réu intimado a comparecer acompanhado de seu advogado para o interrogatório no Plenário 1.",
            resultado: "Garante a oportunidade de versão própria; o não comparecimento injustificado gera revelia ou condução forçada."
          },
          {
            nome: "Testemunha",
            tag: "Dever de Verdade",
            cor: "blue",
            desc: "Cidadão sem interesse direto na causa convocado para depor sobre o que presenciou.",
            quando: "Para esclarecer dinâmica de crimes ou comprovar contratos e acontecimentos.",
            exemplo: "Testemunha ocular de roubo à lotérica intimada a depor sobre o veículo de fuga.",
            resultado: "Comparecimento obrigatório sob pena de crime de desobediência e prisão por falso testemunho se faltar com a verdade."
          },
          {
            nome: "Vítima",
            tag: "Ofendido",
            cor: "purple",
            desc: "Pessoa física ou jurídica diretamente lesionada pelo crime ou pelo ilícito cível.",
            quando: "Para prestar esclarecimentos sobre a autoria, danos sofridos e identificação de agressores.",
            exemplo: "Vítima de sequestro relâmpago intimada para prestar declarações e realizar reconhecimento.",
            resultado: "Oitiva prioritária na audiência antes do depoimento de testemunhas."
          },
          {
            nome: "Perito",
            tag: "Esclarecimento Técnico",
            cor: "amber",
            desc: "Especialista técnico, legista ou perito forense que assinou laudo pericial anexado aos autos.",
            quando: "Quando Juiz, Promotor ou Advogado tiverem dúvidas técnicas sobre laudo balístico ou exame médico.",
            exemplo: "Perito intimado a esclarecer em audiência o calibre da arma e a trajetória do projil.",
            resultado: "Esclarecimento de pontos obscuros da perícia aos jurados e ao Magistrado."
          }
        ],
        dicasEstagiario: [
          "Atenção crucial: Testemunha TEM obrigação de falar a verdade sob juramento (crime de falso testemunho).",
          "O Réu, por outro lado, possui direito ao silêncio e à não autoincriminação protegidos pela Constituição.",
          "A intimação assegura a garantia constitucional de contraditório e ampla defesa consagrada no Art. 84 do Código Civil de Brava.",
          "O mandado de intimação deve conter data, horário exato e número do processo para validade jurídica."
        ],
        baseLegal: "Código Civil de Brava (Art. 84 - Contraditório e Ampla Defesa; Art. 87 - Notificação para Audiência) · Art. 201 CPP e Art. 269 CPC."
      },
      fields: [
        { id: "it_numero", label: "Nº da Intimação", type: "numero", prefixo: "INT", dica: "Numeração automática do mandado de intimação para arquivamento cartorário." },
        { id: "it_qualidade", label: "Intimado na Qualidade de", type: "options", options: ["Réu", "Testemunha", "Vítima", "Autor", "Perito"], dica: "Defina o papel jurídico. Testemunha tem dever de verdade; Réu tem direito constitucional ao silêncio." },
        { id: "it_intimado", label: "Nome do Intimado", req: true, dica: "Nome completo da pessoa que está sendo formalmente convocada a comparecer." },
        { id: "it_intimado_id", label: "Passaporte do Intimado", dica: "Passaporte ou número de documento do intimado para confirmação no rol do Fórum." },
        { id: "it_artigos", label: "⚖️ Artigos / Objeto da Oitiva", placeholder: "Ex.: Apuração referente ao Art. 3.2 (Roubo)", isFull: true, dica: "Indique o fato ou crime em apuração sobre o qual a pessoa prestará depoimento." },
        { id: "it_processo", label: "Nº do Processo", dica: "Número dos autos do processo principal que originou a convocação." },
        { id: "it_local", label: "Local", value: "Fórum de Brava", dica: "Endereço ou sala onde a audiência será realizada (padrão: Fórum de Brava)." },
        { id: "it_data", label: "Data", type: "date", req: true, dica: "Data oficial da audiência ou oitiva agendada." },
        { id: "it_hora", label: "Horário", type: "time", req: true, dica: "Horário exato marcado para a abertura da sessão solene." },
        { id: "it_motivo", label: "Motivo", type: "textarea", placeholder: "Finalidade do comparecimento...", dica: "Finalidade detalhada da convocação judicial e advertências legais sobre ausência injustificada.", modelo: "Fica o intimado formalmente CONVOCADO a comparecer perante este Juízo na data e horário designados, na qualidade acima indicada, a fim de prestar depoimento e esclarecimentos nos autos do processo em epígrafe. Fica expressamente ADVERTIDO de que o não comparecimento injustificado poderá ensejar condução coercitiva pelas forças policiais e crime de desobediência nos termos da lei." },
      ],
    },
    {
      id: "agendamentos", grupo: "agenda", title: "Agendamentos", svg: "agenda", emoji: "⏰", tag: "Audiência",
      desc: "Agendamento de audiências, julgamentos e atendimentos do Tribunal.",
      webhook: "https://discord.com/api/webhooks/1561380717747904522/xzLmCshwkBGgvoLsBQJIkWqRpqXi15580B23V5Qn7U7x8Uft4JXLvmllGKT8XIslmk8b",
      cor: 16312092, cargoPadrao: "Juiz",
      natureza: "Pauta de Audiência", eficacia: "Agendado",
      termo: "A SECRETARIA DO TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA RP CERTIFICA a inclusão do ato abaixo na pauta oficial, ficando as partes cientes da data, horário e local designados.",
      guia: {
        destaque: "Audiência de Custódia × Instrução × Conciliação × Julgamento",
        resumo: "Inclusão oficial na Pauta de Sessões do Tribunal de Justiça, reservando a sala de audiências, presença do Juiz, Promotor e Defesa.",
        quandoUsar: "Para pautar audiências urgentes de custódia (flagrantes), sessões de instrução penal, conciliações cíveis amigáveis ou atendimentos especiais com o Magistrado.",
        diferencas: [
          {
            nome: "Audiência de Custódia",
            tag: "Urgência (até 24h do Flagrante)",
            cor: "red",
            desc: "Sessão urgente realizada com o preso logo após a prisão em flagrante pela polícia.",
            quando: "Para verificar a legalidade da prisão, eventuais agressões ou tortura policial, e decidir se o preso fica recolhido ou responde em liberdade.",
            exemplo: "Cidadão preso em flagrante por posse de fuzil levado ao Juiz em até 24h para arbitramento de fiança ou conversão em preventiva.",
            resultado: "Decisão imediata: Relaxamento de prisão, Concessão de Liberdade Provisória com/sem fiança, ou Prisão Preventiva."
          },
          {
            nome: "Audiência de Instrução",
            tag: "Produção de Provas Orais",
            cor: "blue",
            desc: "A sessão principal do processo onde são colhidas todas as provas orais perante o Juiz de Direito.",
            quando: "Após as defesas prévias, para ouvir na seguinte ordem: vítima, testemunhas de acusação, testemunhas de defesa e réu.",
            exemplo: "Oitiva solene de 4 testemunhas e interrogatório do réu no Fórum de Brava.",
            resultado: "Encerramento da instrução probatória e abertura para debates finais dos advogados."
          },
          {
            nome: "Audiência de Conciliação",
            tag: "Acordo Amigável",
            cor: "green",
            desc: "Sessão conduzida em matéria cível com o objetivo exclusivo de estimular um acordo financeiro amigável entre as partes.",
            quando: "Antes de qualquer julgamento litigioso, para evitar custos e desgastes de processo prolongado.",
            exemplo: "Autor e réu aceitam acordo para quitação de R$ 30.000 em duas parcelas, encerrando a lide cível.",
            resultado: "Homologação de sentença de acordo com força de título executivo judicial irrecorrível."
          },
          {
            nome: "Julgamento",
            tag: "Veredito Final",
            cor: "purple",
            desc: "Sessão solene de deliberação onde o Tribunal ou o Magistrado profere o veredito definitivo da ação.",
            quando: "Após o término dos debates orais de acusação e defesa para leitura pública da sentença condenatória ou absolutória.",
            exemplo: "Sessão solene do Tribunal do Júri ou audiência de leitura de sentença penal.",
            resultado: "Proclamação do resultado com condenação à pena de prisão e multas ou absolvição do acusado."
          },
          {
            nome: "Atendimento",
            tag: "Despacho & Gabinete",
            cor: "amber",
            desc: "Audiência de gabinete ou triagem para despachar petições de extrema urgência diretamente com o Magistrado.",
            quando: "Quando o advogado necessita despachar pedido liminar urgente pessoalmente com o Juiz da Vara.",
            exemplo: "Advogado despacha pedido urgente de internação médica ou reconsideração de fiança em gabinete.",
            resultado: "Apreciação célere do pedido com despacho imediato nos autos."
          }
        ],
        dicasEstagiario: [
          "Audiências de conciliação cível (Art. 83 do Código Civil de Brava) buscam acordo amigável e evitam custas e desgastes judiciais.",
          "Na Audiência de Instrução Penal, a ordem de fala é SAGRADA: 1º Vítima, 2º Testemunhas de Acusação, 3º Testemunhas de Defesa, 4º Interrogatório do Réu.",
          "Na Audiência de Custódia, NÃO se julga o mérito se o réu é culpado ou inocente! Julga-se apenas a LEGALIDADE da prisão (em até 24h).",
          "Regras de Sessão (Art. 87 do Código Civil): Indicação clara de data, responsável, partes e objeto, garantindo ordem da fala e respeito mútuo.",
          "Sempre confirme com as partes o link da sala ou número do plenário no Fórum de Brava."
        ],
        baseLegal: "Código Civil de Brava (Art. 83 - Conciliação Prévia; Art. 87 - Sessões de Audiência) · Resolução 213 do CNJ (Custódia) · Art. 400 CPP e Art. 334 CPC."
      },
      fields: [
        { id: "ag_numero", label: "Nº do Agendamento", type: "numero", prefixo: "AGD", dica: "Número de controle da pauta oficial do Tribunal." },
        { id: "ag_tipo", label: "Tipo", type: "options", options: ["Audiência de Instrução", "Audiência de Conciliação", "Julgamento", "Audiência de Custódia", "Atendimento"], dica: "Selecione o tipo de ato judicial. Ex: Custódia é urgente em até 24h; Conciliação busca acordo." },
        { id: "ag_partes", label: "Partes", req: true, placeholder: "Ex.: Ministério Público x João Silva", dica: "Polo Ativo (acusação/autor) versus Polo Passivo (réu/requerido). Ex: MP x Nome do Réu." },
        { id: "ag_processo", label: "Nº do Processo", dica: "Número do processo judicial ao qual esta sessão da pauta está associada." },
        { id: "ag_artigos", label: "⚖️ Artigos / Matéria em Pauta", placeholder: "Ex.: Art. 83 CC (Conciliação Cível) ou Art. 3.2 CP (Roubo)", isFull: true, dica: "Artigos do Código Civil de Brava (temas cíveis) ou Código Penal que serão debatidos durante o ato." },
        { id: "ag_data", label: "Data", type: "date", req: true, dica: "Data agendada no calendário forense para a realização da audiência." },
        { id: "ag_hora", label: "Horário", type: "time", req: true, dica: "Horário previsto para o pregão oficial e abertura da sala." },
        { id: "ag_local", label: "Local", value: "Fórum de Brava — Sala 1", isFull: true, dica: "Local físico ou sala de julgamento no Fórum de Brava designada." },
        { id: "ag_obs", label: "Observações", type: "textarea", placeholder: "Informações adicionais para as partes...", dica: "Orientações práticas para os envolvidos, se haverá réu preso escoltado e documentos necessários.", modelo: "PAUTA DE AUDIÊNCIA DESIGNADA: As partes e testemunhas deverão comparecer munidas de seus documentos de identificação com antecedência mínima de 10 minutos. O defensor/advogado deverá acompanhar o acusado. Eventual impossibilidade de comparecimento por motivo de força maior deverá ser justificada documentalmente até 2 horas antes da sessão." },
      ],
    },
  ],
};

/* ==========================================================
   GLOSSÁRIO RÁPIDO DE OPÇÕES — TRIBUNAL DE JUSTIÇA
   Tire suas dúvidas: acesse no ' * ' de cada campo
   ========================================================== */
const TRIBUNAL_HELP_OPTIONS = {
  // Petição Inicial (Ações)
  "Ação Cível": "Ação para indenizações, dívidas, danos morais/materiais ou contratos. Não gera prisão do réu.",
  "Ação Criminal": "Ação penal para responsabilizar o autor de crime do Código Penal. Busca pena de prisão e multas.",
  "Habeas Corpus": "Remédio supremo urgente contra prisão ilegal, abuso de autoridade ou falta de audiência de custódia.",
  "Mandado de Segurança": "Protege direito líquido e certo violado por ato ilegal de autoridade estatal (ex.: apreensão indevida).",

  // Status de Processos
  "Em Andamento": "Processo ativo em fase de citação, resposta da defesa ou colheita de provas e perícias.",
  "Aguardando Audiência": "Autos prontos com sessão designada para ouvir testemunhas, vítima e réu perante o Juiz.",
  "Concluso para Sentença": "Instrução encerrada e memoriais entregues; autos na mesa do Juiz para decisão final.",
  "Arquivado": "Processo concluído com trânsito em julgado, pena cumprida ou extinção de punibilidade.",

  // Decisões
  "Sentença": "Ato do Juiz que põe fim ao processo em 1º grau, condenando/absolvendo ou julgando procedente/improcedente.",
  "Decisão Interlocutória": "Decisão no curso da ação que resolve questão urgente (liminar, fiança, quebra de sigilo) sem encerrar o processo.",
  "Despacho": "Ato de mero andamento e impulso processual sem cunho lesivo (ex.: 'manifeste-se a defesa').",
  "Acórdão": "Decisão colegiada proferida por Turma de Desembargadores ao julgar recurso em 2º grau.",

  // Resultados
  "Procedente": "O Juízo acolheu integralmente os pedidos formulados pelo autor na petição inicial.",
  "Parcialmente Procedente": "O Juízo acolheu apenas parte dos pedidos formulados, rejeitando os demais.",
  "Improcedente": "O Juízo rejeitou integralmente a pretensão do autor por falta de provas ou direito.",
  "Condenação": "Juízo de culpabilidade penal com fixação de pena de prisão e/ou multa pecuniária.",
  "Absolvição": "Declaração judicial de inocência do réu ou falta de provas suficientes para condená-lo.",
  "Extinção sem Mérito": "Processo arquivado por defeito formal ou vício processual sem análise do direito em si.",

  // Mandados
  "Prisão": "Mandado judicial que autoriza a polícia a capturar e recolher o suspeito/condenado à prisão.",
  "Busca e Apreensão": "Autoriza policiais a entrarem em imóvel/veículo para apreender armas, drogas ou provas ilícitas.",
  "Condução Coercitiva": "Ordem para conduzir pessoa faltosa (testemunha/perito) à presença do Juiz. Não é prisão comum.",
  "Afastamento do Lar": "Medida protetiva urgente que obriga o agressor a se retirar e manter distância da vítima.",

  // Autorizações
  "Quebra de Sigilo": "Autorização judicial para acesso a extratos bancários, fiscais ou registros telemáticos sigilosos.",
  "Interceptação": "Escuta e monitoramento em tempo real de comunicações telefônicas ou de rádio autorizadas pelo Juízo.",
  "Evento Público": "Alvará judicial que autoriza a realização de eventos de grande fluxo e fechamento de vias públicas.",
  "Porte Especial": "Autorização excepcional expedida pelo Magistrado para circulação armada em missões especiais.",
  "Outra": "Autorização judicial excepcional fundamentada em despacho para situação específica.",

  // Mandados Concluídos
  "Cumprido": "A ordem foi executada na íntegra com 100% de êxito (alvo preso ou bens integralmente arrecadados).",
  "Cumprido Parcialmente": "Parte da ordem foi cumprida (ex.: bens encontrados, porém o suspeito principal conseguiu fugir).",
  "Não Cumprido": "A diligência não obteve êxito (endereço inexistente, imóvel abandonado ou alvo foragido).",

  // Intimações
  "Réu": "Acusado no processo; tem direito constitucional de ampla defesa, contraditório e ao silêncio.",
  "Testemunha": "Cidadão que presenciou fatos; TEM DEVER LEGAL de falar a verdade sob pena de prisão por falso testemunho.",
  "Vítima": "A pessoa ofendida pelo crime ou ato lesivo, ouvida para esclarecer as circunstâncias do fato.",
  "Autor": "Quem propôs a ação inicial e é intimado a prestar esclarecimentos ou comparecer à conciliação.",
  "Perito": "Especialista técnico convocado para esclarecer laudos balísticos, médico-legais ou contábeis.",

  // Agendamentos
  "Audiência de Custódia": "Sessão urgente em até 24h pós-flagrante para avaliar legalidade da prisão e necessidade de mantê-la.",
  "Audiência de Instrução": "Sessão principal para produção de provas orais: oitiva de vítima, testemunhas e interrogatório do réu.",
  "Audiência de Conciliação": "Tentativa amigável conduzida pelo Tribunal para acordo financeiro entre as partes em matéria cível.",
  "Julgamento": "Sessão para debate final entre acusação e defesa e prolação da sentença pelo Juiz ou Júri.",
  "Atendimento": "Despacho de urgência do advogado ou servidor diretamente no gabinete com o Magistrado."
};

