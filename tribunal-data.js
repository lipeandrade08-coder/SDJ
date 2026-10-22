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
    { id: "processos", titulo: "Processos & Petições", desc: "Protocolo de petições, andamento de processos cíveis, criminais e decisões judiciais." },
    { id: "administrativo", titulo: "Processo Administrativo (PAD)", desc: "Requisição de instauração de PAD externo, apuração correcional e aplicação de sanções administrativas." },
    { id: "mandados", titulo: "Mandados & Autorizações", desc: "Expedição, cumprimento de mandados e autorizações judiciais." },
    { id: "agenda", titulo: "Comunicações & Agenda", desc: "Intimações das partes e agendamento de audiências." },
    { id: "notificacoes", titulo: "Ofícios & Notificações", desc: "Expedição de ofícios ministeriais, diligências fiscalizatórias e notificações extrajudiciais." },
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
    {
      id: "pad_externo",
      grupo: "administrativo",
      title: "Processo Administrativo · Instauração de PAD",
      svg: "pad",
      emoji: "⚖️",
      tag: "Processo Administrativo",
      desc: "Requisição formal de instauração de Processo Administrativo Disciplinar (PAD) perante o Tribunal / Corregedoria contra servidores e agentes públicos externos, com pedido de aplicação de sanções como advertência, suspensão, demissão a bem do serviço público ou cassação de aposentadoria.",
      webhook: "https://discord.com/api/webhooks/1561380508007534593/ZFAGt9x3aDs2vksYW8t3dmOA8uKQYzc1McrT-WaLOu_J1fmoScVi3l6DgMiOP4r_3Koc",
      cor: 13938487,
      cargoPadrao: "Juiz",
      natureza: "Processo Administrativo Disciplinar (PAD Externo)",
      eficacia: "Corregedoria Geral & Poder Disciplinar",
      termo: "A CORREGEDORIA GERAL E O TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA RP, no regular exercício de suas prerrogativas constitucionais de controle da legalidade, corregedoria e poder disciplinar sobre agentes públicos, CERTIFICAM a autuação deste Processo Administrativo Disciplinar, assegurados ao acusado o contraditório, a ampla defesa técnica e o devido processo legal (CF art. 5º, LIV e LV).",
      guia: {
        destaque: "Requisição de PAD × Sanções Administrativas (Advertência, Suspensão, Demissão e Cassação)",
        resumo: "O Processo Administrativo Disciplinar (PAD) é o rito formal solene presidido pela autoridade judiciária / corregedoria para apurar desvios éticos, abusos de poder, violência desmedida, prevaricação ou quebra de decoro cometidos por agentes públicos externos (policiais civis/militares, socorristas, guardas de trânsito e servidores civis), culminando na aplicação de sanções disciplinares legais.",
        quandoUsar: "Utilize para requisitar ou formalizar a abertura de PAD contra agentes externos da segurança pública, saúde ou administração pública quando houver indícios de conduta irregular grave, demandando a aplicação de advertência, suspensão, demissão a bem do serviço público ou cassação de aposentadoria.",
        diferencas: [
          {
            nome: "Requisição de Instauração de PAD",
            tag: "Abertura & Citação",
            cor: "blue",
            desc: "Petição e despacho inicial que formulam a acusação disciplinar, qualificam o servidor, juntam provas e fixam prazo de 48h para defesa prévia.",
            quando: "Logo após o recebimento de representação da vítima, notícia de infração funcional ou requisição do Ministério Público.",
            exemplo: "Representação contra policial por agressão física sem justificativa e retenção ilegal de bens de cidadão.",
            resultado: "Abertura oficial dos autos do PAD, citação formal do servidor investigado e notificação ao Comando da Corporação."
          },
          {
            nome: "Afastamento Cautelar Preventivo",
            tag: "Proteção Probatória & Urgência",
            cor: "amber",
            desc: "Medida urgente para recolhimento provisório do armamento funcional, retenção de viatura/equipamentos e afastamento imediato do policiamento de rua.",
            quando: "Quando a permanência do investigado no policiamento de rua colocar em risco testemunhas, provas ou a ordem pública.",
            exemplo: "Servidor investigado por ameaçar a vítima da ocorrência ou coagir testemunhas durante a apuração.",
            resultado: "O agente passa a atuar exclusivamente em funções administrativas internas ou é suspenso preventivamente até decisão final."
          },
          {
            nome: "Demissão a Bem do Serviço Público",
            tag: "Penalidade Máxima Expulsória",
            cor: "purple",
            desc: "Punição disciplinar expulsória que acarreta a perda definitiva do cargo público, exclusão da corporação e inabilitação para o serviço público.",
            quando: "Em faltas disciplinares gravíssimas, como corrupção, tortura, homicídio arbitrário, concussão ou quebra de decoro irreparável.",
            exemplo: "Comprovação de cobrança de propina para liberação de suspeito armado ou violência corporal extrema.",
            resultado: "Exclusão sumária dos quadros públicos do servidor com certidão no Diário Oficial e comunicação à Vara Criminal."
          },
          {
            nome: "Cassação de Aposentadoria / Disponibilidade",
            tag: "Inativação Cassada",
            cor: "green",
            desc: "Sanção disciplinar aplicada a servidores inativos ou na reserva remunerada que praticaram falta punível com demissão enquanto em atividade.",
            quando: "Quando o servidor já se encontrava aposentado no momento da conclusão do processo disciplinar condenatório.",
            exemplo: "Ex-comandante que praticou fraudes orçamentárias na corporação enquanto na ativa.",
            resultado: "Cancelamento do benefício de aposentadoria/reserva e perda de prerrogativas e patentes públicas."
          }
        ],
        dicasEstagiario: [
          "Identifique com precisão o órgão externo a que o servidor pertence (Polícia Militar, Civil, SAMU, Guarda Municipal ou Prefeitura).",
          "O passaporte/ID do investigado é campo essencial para notificação no jogo e anotação na ficha funcional da corporação.",
          "Especifique com clareza as sanções administrativas requisitadas: Advertência, Suspensão (5 a 30 dias), Demissão a bem do serviço público ou Cassação de aposentadoria.",
          "Em medidas cautelares de afastamento, notifique de pronto o Comando Geral da Corporação externa para imediato cumprimento prático.",
          "O prazo constitucional padrão para Defesa Prévia é de 48 (quarenta e oito) horas a contar da citação pessoal do servidor.",
          "Acoste links de evidências materiais nos fatos (vídeos de bodycam, relatórios de rádio, fotografias e depoimentos de testemunhas).",
          "A decisão em PAD não impede a responsabilização penal concomitante do agente pelo mesmo fato perante a Vara Criminal de Brava."
        ],
        baseLegal: "Constituição de Brava RP (Art. 5º, LIV e LV - Devido Processo Legal, Contraditório e Ampla Defesa) · Lei de Abuso de Autoridade (Lei nº 13.869/19) · Código Penal de Brava · Estatuto dos Servidores Públicos Civis e Militares (Sanções: Advertência, Suspensão, Demissão e Cassação de Aposentadoria) · Regimento da Corregedoria Geral."
      },
      fields: [
        { id: "pad_numero", label: "Nº dos Autos (PAD)", type: "numero", prefixo: "PAD-EXT", dica: "Numeração oficial gerada automaticamente para o processo disciplinar externo. Clique no dado para gerar outro número." },
        { id: "pad_fase", label: "Fase do Procedimento Administrativo", type: "options", options: [
          "Requisição de Instauração de PAD",
          "Portaria de Abertura & Citação do Servidor",
          "Fase Instrutória & Oitiva do Servidor",
          "Aguardando Julgamento da Comissão",
          "Medida Cautelar Deferida (Afastamento Preventivo)",
          "Julgado Procedente (Sanção Disciplinar Aplicada)",
          "Julgado Improcedente (Arquivamento)"
        ], dica: "Etapa processual atual do procedimento perante a Corregedoria / Tribunal." },
        { id: "pad_orgao", label: "Órgão / Corporação Externa", type: "options", options: [
          "Polícia Militar (PM / Choque / BOPE)",
          "Polícia Civil (DPC / Investigação)",
          "Saúde Pública (Hospital Municipal / SAMU)",
          "Guarda Municipal & Trânsito",
          "Ordem dos Advogados (OAB / Defensoria Externa)",
          "Prefeitura & Secretarias Municipais",
          "Outro Órgão da Administração Pública"
        ], dica: "Instituição ou órgão público externo a que o servidor processado está vinculado." },
        { id: "pad_investigado", label: "Nome do Servidor Público Investigado", req: true, dica: "Nome completo do servidor ou agente da corporação externa sob apuração disciplinar." },
        { id: "pad_investigado_id", label: "Passaporte / ID do Investigado", req: true, dica: "Passaporte oficial do agente investigado no RP (essencial para registro funcional)." },
        { id: "pad_cargo_funcional", label: "Cargo / Patente / Função na Corporação", req: true, placeholder: "Ex.: Sargento PM, Cabo, Delegado, Médico Socorrista, Guarda Municipal...", dica: "Graduação hierárquica, patente militar ou função desempenhada pelo investigado na corporação." },
        { id: "pad_denunciante", label: "Autoridade Requisitante / Órgão Notificante", req: true, placeholder: "Ex.: Ministério Público de Brava / Corregedoria Geral / Cidadão Notificante / Comando", dica: "Autoridade, promotor ou cidadão que requisita a instauração do PAD." },
        { id: "pad_artigos", label: "⚖️ Infração Disciplinar Imputada / Base Legal", req: true, isFull: true, placeholder: "Ex.: Abuso de Autoridade (Art. 350 CP), Prevaricação, Violência Excessiva, Quebra de Decoro Funcional...", dica: "Falta disciplinar imputada ao agente segundo o Estatuto e a legislação penal/administrativa de Brava." },
        { id: "pad_sancao", label: "🛑 Sanção Administrativa Requisitada (Consequência)", type: "options", options: [
          "Demissão a Bem do Serviço Público",
          "Suspensão das Funções Públicas (5 a 30 dias com perda remuneratória)",
          "Advertência Disciplinar Formal em Assentamento Funcional",
          "Cassação de Aposentadoria ou Disponibilidade",
          "Destituição de Cargo em Comissão / Função de Confiança",
          "Repreensão Escrita Funcional",
          "Em Apuração (Aguardando Parecer da Comissão Processante)",
          "Absolvição por Falta de Provas / Arquivamento"
        ], dica: "Aplicação das sanções administrativas cabíveis como consequência da infração apurada." },
        { id: "pad_medida_cautelar", label: "Medida Cautelar Urgente Aplicada / Requisitada", type: "options", options: [
          "Afastamento Preventivo Imediato das Funções Operacionais",
          "Suspensão Temporária do Porte Funcional de Arma de Fogo",
          "Retenção Cautelar de Veículo Oficial e Equipamentos",
          "Proibição de Acesso a Instalações e Sistemas do Órgão",
          "Nenhuma Medida Cautelar (Responde em Funções Administrativas)",
          "Afastamento Total com Suspensão Remuneratória"
        ], dica: "Medidas protetivas ou cautelares determinadas durante a tramitação do processo." },
        { id: "pad_prazo_defesa", label: "Prazo para Defesa Prévia", value: "48 (quarenta e oito) horas a contar da citação", isFull: true, dica: "Prazo assinalado para o investigado apresentar advogado ou justificativa formal escrita." },
        { id: "pad_comissao", label: "Comissão Disciplinar / Juiz Relator", placeholder: "Ex.: Dr. Roberto Vieira (Juiz Corregedor) e Promotoria de Justiça", isFull: true, dica: "Identificação da autoridade judiciária ou membros da comissão que presidem os autos." },
        { id: "pad_fatos", label: "1. Relatório Circunstanciado dos Fatos e Conduta Funcional", type: "textarea", req: true, placeholder: "Descreva detalhadamente a conduta praticada pelo agente externo, data, local, ocorrência e provas...", dica: "Narre a ocorrência em ordem cronológica: data, horário, conduta irregular praticada e provas juntadas.", modelo: "1. HISTÓRICO DA OCORRÊNCIA E CONDUTA FUNCIONAL:\nNo dia [Data], por volta das [Horário], nas dependências/região de [Local em Brava RP], o agente público investigado, no exercício ostensivo de suas atribuições pelo órgão [Órgão/Corporação], praticou conduta incompatível com a dignidade da função pública, consubstanciada em: [descrever detalhadamente a ação ou omissão irregular apurada].\n\n2. ENQUADRAMENTO DA FALTA DISCIPLINAR:\nA conduta imputada afronta os deveres estatutários de probidade, legalidade e estrita obediência aos limites operacionais da função, configurando expressamente infração disciplinar de natureza grave com violação ao Código Penal da Cidade e regulamento da corporação.\n\n3. DILIGÊNCIAS PRELIMINARES E PROVAS JUNTADAS:\nForam acostados aos autos: termos de declaração da vítima/notificante, registros de gravação de câmeras corporais/segurança (links anexos), relatórios de ocorrência policial e registros de rádio da central de despacho." },
        { id: "pad_pedidos_sancoes", label: "2. Da Requisição de Instauração e Aplicação de Sanções Administrativas", type: "textarea", req: true, placeholder: "Especifique os pedidos expressos de instauração do PAD, citação, cautelares e sanções (advertência, suspensão, demissão a bem do serviço público ou cassação de aposentadoria)...", dica: "Requisição formal de instauração de PAD e aplicação de sanções administrativas como advertência, suspensão, demissão ou cassação.", modelo: "Diante da gravidade dos elementos coligidos nos autos, REQUISITA-SE a INSTAURAÇÃO FORMAL DO PROCESSO ADMINISTRATIVO DISCIPLINAR (PAD) em face do servidor público investigado, determinando-se:\n\na) A INSTAURAÇÃO FORMAL DO PAD perante este Tribunal / Corregedoria Geral e a CITAÇÃO do servidor investigado no passaporte indicado para que, no prazo legal de 48 horas, ofereça Defesa Prévia por intermédio de Advogado legalmente constituído ou Defensor Dativo;\nb) O DEFERIMENTO DA MEDIDA CAUTELAR URGENTE de afastamento preventivo imediato das funções operacionais de rua, com retenção cautelar do armamento funcional e viatura oficial;\nc) A NOTIFICAÇÃO IMEDIATA ao Comando Geral / Direção da Corporação externa para ciência e rigoroso cumprimento das ordens cautelares sob pena de desobediência funcional;\nd) A designação de audiência de instrução disciplinar com oitiva das testemunhas, vítimas e interrogatório formal do investigado perante este Juízo;\ne) No mérito, após a regular instrução e garantida a ampla defesa técnica, a TOTAL PROCEDÊNCIA do processo disciplinar com a CONSEQUENTE APLICAÇÃO DE SANÇÃO ADMINISTRATIVA DISCIPLINAR cabível:\n   • Advertência formal em ficha funcional;\n   • Suspensão das funções públicas de 5 a 30 dias (com perda remuneratória);\n   • Demissão a bem do serviço público com exclusão da corporação; ou\n   • Cassação de aposentadoria ou disponibilidade;\nf) A expedição de cópia integral dos autos ao Ministério Público para apuração de ilícitos penais decorrentes dos mesmos fatos." },
      ],
    },

    /* ---------------- PROCEDIMENTO INVESTIGATÓRIO CRIMINAL (PIC) ---------------- */
    {
      id: "pic",
      grupo: "administrativo",
      title: "Procedimento Investigatório Criminal (PIC)",
      svg: "pic",
      emoji: "🔱",
      tag: "Investigação Penal",
      desc: "Instauração e condução de investigação penal direta pelo Ministério Público para apuração de crimes, corrupção, tortura e abusos cometidos por agentes públicos externos.",
      webhook: "https://discord.com/api/webhooks/1561380508007534593/ZFAGt9x3aDs2vksYW8t3dmOA8uKQYzc1McrT-WaLOu_J1fmoScVi3l6DgMiOP4r_3Koc",
      cor: 12597547,
      cargoPadrao: "Promotor de Justiça",
      natureza: "Procedimento Investigatório Criminal (PIC)",
      eficacia: "Investigação Penal do Ministério Público",
      termo: "O MINISTÉRIO PÚBLICO DA COMARCA DE BRAVA RP, com fulcro no art. 129, I e VIII da Constituição e Resolução Institucional de Investigação Criminal, CERTIFICA a instauração do presente PROCEDIMENTO INVESTIGATÓRIO CRIMINAL (PIC), assegurada a preservação da cadeia de custódia das provas e a legalidade das diligências ministeriais.",
      guia: {
        destaque: "PIC (Ministério Público) × Inquérito Policial (Polícia Civil) × Ação Penal",
        resumo: "O Procedimento Investigatório Criminal (PIC) é o instrumento investigativo de natureza penal instaurado diretamente no âmbito do Ministério Público para apurar infrações penais de autoria de agentes públicos ou crimes complexos (corrupção, abuso, tortura e milícia).",
        quandoUsar: "Utilize quando o Ministério Público conduzir a colheita probatória de crimes sem depender da autoridade policial comum, fundamentando pedidos de prisão preventiva, busca e apreensão ou ajuizamento direto de Denúncia Criminal.",
        diferencas: [
          {
            nome: "Portaria de Instauração do PIC",
            tag: "Início da Investigação",
            cor: "blue",
            desc: "Ato que delimita os indícios de autoria delitiva, os crimes penais sob apuração e determina as primeiras diligências sigilosas.",
            quando: "Ao receber notícias fundamentadas de crimes graves praticados por autoridades ou corporações externas.",
            exemplo: "Investigação contra agentes envolvidos em apreensão sem registro e desvio de armamentos.",
            resultado: "Abertura oficial dos autos de investigação criminal com prazo determinado e requisições periciais."
          },
          {
            nome: "Requerimento Cautelar Urgente",
            tag: "Medidas Cautelares Penais",
            cor: "red",
            desc: "Requerimento dirigido ao Juiz de Direito para decretação de prisão temporária/preventiva, busca e apreensão ou interceptação telemática.",
            quando: "Para garantir a ordem pública, impedir a fuga de alvos ou evitar a destruição de provas.",
            exemplo: "Mandado de busca em armários funcionais e residência de servidor investigado por tráfico de influência.",
            resultado: "Expedição de ordem judicial cautelar pelo Magistrado para cumprimento imediato."
          },
          {
            nome: "Oferecimento de Denúncia Criminal",
            tag: "Ação Penal Pública",
            cor: "purple",
            desc: "Peça acusatória final do Promotor de Justiça que dá início ao processo penal condenatório perante o Tribunal.",
            quando: "Encerradas as investigações com justa causa e prova cabal da materialidade e autoria.",
            exemplo: "Denúncia por corrupção passiva e prevaricação com pedido de condenação a pena privativa de liberdade.",
            resultado: "O investigado torna-se réu formal em Ação Penal perante a Vara Criminal de Brava."
          },
          {
            nome: "Promoção de Arquivamento",
            tag: "Inexistência de Crime",
            cor: "green",
            desc: "Despacho fundamentado do Promotor de Justiça determinando o arquivamento dos autos por falta de provas ou atipicidade.",
            quando: "Após esgotadas as diligências sem constatação de crime doloso praticado pelo investigado.",
            exemplo: "Perícias comprovam que a atuação policial ocorreu em estrita e legítima defesa comprovada por câmeras.",
            resultado: "Extinção da investigação criminal com expedição de certidão negativa."
          }
        ],
        dicasEstagiario: [
          "Indique os artigos específicos do Código Penal violados (ex.: Art. 3.2 Roubo/Extorsão, Art. 350 Abuso de Autoridade).",
          "Em medidas cautelares penais, fundamente sempre o periculum in mora e fumus comissi delicti.",
          "O PIC pode tramitar sob sigilo quando essencial para a eficácia das buscas e interceptações.",
          "O prazo para conclusão das investigações deve ser expressamente assinalado na portaria."
        ],
        baseLegal: "Constituição de Brava (art. 129, I) · Código de Processo Penal · Código Penal de Brava RP · Resoluções do Ministério Público sobre PIC."
      },
      fields: [
        { id: "pic_numero", label: "Nº dos Autos (PIC)", type: "numero", prefixo: "PIC", dica: "Numeração oficial gerada automaticamente para o Procedimento Investigatório Criminal." },
        { id: "pic_fase", label: "Fase da Investigação Criminal", type: "options", options: [
          "Portaria de Instauração (Início da Investigação Penal)",
          "Diligências em Andamento & Juntada de Provas",
          "Oitiva de Testemunhas e Investigados",
          "Requerimento de Medidas Cautelares (Prisão / Busca)",
          "Relatório Final Conclusivo (Oferecimento de Denúncia Crime)",
          "Promoção de Arquivamento (Inexistência de Crime)"
        ], dica: "Etapa da persecução penal perante o Ministério Público." },
        { id: "pic_orgao", label: "Órgão / Corporação Externa", type: "options", options: [
          "Polícia Militar (PM / Choque / BOPE)",
          "Polícia Civil (DPC / Investigação)",
          "Guarda Municipal & Trânsito",
          "Saúde Pública (Hospital / SAMU)",
          "Prefeitura & Secretarias Municipais",
          "Outro Órgão / Ente Público"
        ], dica: "Corporação ou órgão externo do agente investigado penalmente." },
        { id: "pic_investigado", label: "Nome do Investigado(a)", req: true, dica: "Nome do suspeito ou agente público sob investigação penal." },
        { id: "pic_investigado_id", label: "Passaporte / ID do Investigado", req: true, dica: "Passaporte ou identificação do investigado no RP." },
        { id: "pic_cargo", label: "Cargo / Patente / Função", req: true, placeholder: "Ex.: Sargento PM, Delegado, Agente de Trânsito...", dica: "Função pública exercida pelo investigado." },
        { id: "pic_delitos", label: "⚖️ Delitos Penais Apurados / Base Legal (CP)", req: true, isFull: true, placeholder: "Ex.: Art. 350 CP (Abuso de Autoridade), Art. 3.2 CP (Corrupção Passiva), Concussão, Tortura...", dica: "Crimes penais imputados com fulcro no Código Penal de Brava." },
        { id: "pic_cautelar", label: "Medida Cautelar Penal Requerida", type: "options", options: [
          "Nenhuma Medida Cautelar no Momento",
          "Prisão Preventiva do Investigado",
          "Busca e Apreensão em Domicílio / Viatura",
          "Interceptação Telefônica / Telemática",
          "Afastamento Imediato do Cargo com Perda do Porte de Arma",
          "Retenção de Bens e Bloqueio de Ativos"
        ], dica: "Medidas de coerção processual requeridas ao Juiz competente." },
        { id: "pic_desfecho", label: "Desfecho / Provimento Pretendido", type: "options", options: [
          "Oferecimento de Denúncia Criminal (Ação Penal Pública)",
          "Conversão em Ação Penal com Pedido de Prisão",
          "Proposta de Acordo de Não Persecução Penal (ANPP)",
          "Arquivamento por Ausência de Justa Causa",
          "Em Andamento (Diligências Sigilosas)"
        ], dica: "Providência ministerial final pretendida nestes autos." },
        { id: "pic_promotor", label: "Promotor de Justiça Titular / Presidente do PIC", req: true, placeholder: "Ex.: Promotoria de Justiça de Combate ao Crime Organizado", isFull: true, dica: "Nome da autoridade ministerial que preside a investigação." },
        { id: "pic_fatos", label: "1. Notícia do Crime e Fatos Apurados", type: "textarea", req: true, placeholder: "Descreva os fatos criminosos noticiados, data, hora, local, dinâmica do delito e vítimas...", dica: "Histórico da conduta criminosa e indícios veementes de materialidade.", modelo: "1. DOS FATOS INVESTIGADOS:\nChegou ao conhecimento do Ministério Público, por meio de notícia de fato fundamentada, a ocorrência de conduta delituosa grave praticada por agente público no exercício da função, consistente em [descrever a prática criminosa], no dia [Data], na região de [Local em Brava RP].\n\n2. DA MATERIALIDADE E INDÍCIOS DE AUTORIA:\nRestou preliminarmente constatada a prática dos tipos penais capitulados no Código Penal de Brava, respaldados por depoimentos das vítimas e mídias audiovisuais acostadas aos autos." },
        { id: "pic_diligencias", label: "2. Diligências Realizadas, Provas e Determinações", type: "textarea", req: true, placeholder: "Diligências requisitadas, quebras de sigilo, oitivas e medidas requeridas ao Juízo...", dica: "Determinações expressas do Ministério Público para elucidação do crime.", modelo: "O MINISTÉRIO PÚBLICO DA COMARCA DE BRAVA RP DETERMINA:\n\na) A autuação formal do presente Procedimento Investigatório Criminal (PIC);\nb) A requisição de cópias integrais de gravações de câmeras corporais (bodycam) e registros de rádio da ocorrência;\nc) A expedição de notificação para oitiva das vítimas e testemunhas no prazo de 48 horas;\nd) O encaminhamento de requerimento ao Juízo Criminal competente para deferimento de medidas cautelares de urgência;\ne) A conclusão dos autos para elaboração da competente Denúncia Criminal." },
      ],
    },

    /* ---------------- INQUÉRITO CIVIL (IC) ---------------- */
    {
      id: "inquerito_civil",
      grupo: "administrativo",
      title: "Inquérito Civil (IC)",
      svg: "inquerito_civil",
      emoji: "🏛️",
      tag: "Probidade & Erário",
      desc: "Instauração de Inquérito Civil pelo Ministério Público para investigar atos de improbidade administrativa, lesão ao patrimônio público, fraudes em licitações e desvios praticados por órgãos ou servidores externos.",
      webhook: "https://discord.com/api/webhooks/1562540639336407251/ABIYnCGnEexXqjt4VIBpXssWr75_5PKBCbEFHaMnIA5reOzuVNF6P1UPulylL6oRmi4x",
      cor: 3447003,
      cargoPadrao: "Promotor de Justiça",
      natureza: "Inquérito Civil Público (IC)",
      eficacia: "Proteção ao Patrimônio Público & Erário",
      termo: "O MINISTÉRIO PÚBLICO DA COMARCA DE BRAVA RP, no regular exercício de suas atribuições constitucionais de defesa do patrimônio público, probidade administrativa e interesses difusos, CERTIFICA a instauração do presente INQUÉRITO CIVIL PÚBLICO (IC) para apuração de atos lesivos ao interesse coletivo.",
      guia: {
        destaque: "Inquérito Civil (IC) × Ação Civil Pública (ACP) × Termo de Ajustamento de Conduta (TAC)",
        resumo: "O Inquérito Civil é o procedimento investigatório preparatório privativo do Ministério Público destinado a colher provas sobre atos de improbidade administrativa, fraudes fiscais, danos ao erário e violações coletivas.",
        quandoUsar: "Utilize para apurar fraudes em contratos e licitações de secretarias, desvio de materiais hospitalares, corrupção administrativa ou obras irregulares na cidade antes de propor Ação Civil Pública.",
        diferencas: [
          {
            nome: "Instauração do Inquérito Civil",
            tag: "Portaria de Abertura",
            cor: "blue",
            desc: "Ato inaugural pelo qual o Promotor delimita o dano patrimonial investigado e determina auditoria contábil e documental.",
            quando: "Ao constatar indícios de superfaturamento, enriquecimento ilícito de servidores ou contratos simulados.",
            exemplo: "Investigação sobre compras superfaturadas de medicamentos para o Hospital Municipal de Brava.",
            resultado: "Requisição obrigatória de livros contábeis, extratos e cópias dos contratos públicos."
          },
          {
            nome: "Termo de Ajustamento de Conduta (TAC)",
            tag: "Solução Consensual",
            cor: "amber",
            desc: "Acordo formal com força de título executivo extrajudicial pelo qual a empresa ou órgão se compromete a sanar o dano e pagar multa.",
            quando: "Quando o investigado reconhece a inconformidade e concorda em devolver os valores desviados com correções.",
            exemplo: "Empresa prestadora de serviços hospitalares concorda em ressarcir R$ 200.000 ao Fundo Municipal.",
            resultado: "Extinção consensual do inquérito civil sem necessidade de processo judicial prolongado."
          },
          {
            nome: "Ação Civil Pública (ACP)",
            tag: "Processo Judicial de Improbidade",
            cor: "purple",
            desc: "Ação judicial proposta pelo MP perante a Vara Cível do Tribunal para condenação dos réus em perda de bens e ressarcimento integral.",
            quando: "Quando restar comprovado o dolo de improbidade e for rejeitada a celebração de TAC voluntário.",
            exemplo: "Ação requerendo a indisponibilidade de bens dos gestores e bloqueio judicial de contas bancárias.",
            resultado: "Condenação judicial dos gestores ao ressarcimento do erário e suspensão dos direitos políticos."
          },
          {
            nome: "Arquivamento Homologado",
            tag: "Inexistência de Dano",
            cor: "green",
            desc: "Encerramento da investigação quando a auditoria documental comprovar que não houve dolo nem desvio de verbas.",
            quando: "Após conferência de notas fiscais e prestação de contas regulares que afastam a suspeita inicial.",
            exemplo: "Comprovação de regularidade documental em licitação de veículos para a Guarda Municipal.",
            resultado: "Homologação do arquivamento e expedição de certidão de regularidade do órgão."
          }
        ],
        dicasEstagiario: [
          "Verifique com rigor a Razão Social da empresa e o CNPJ/registro no RP.",
          "Estime sempre o valor do prejuízo financeiro suportado pelo erário municipal.",
          "O Inquérito Civil não visa pena de prisão (que é do PIC), mas sim a devolução do dinheiro público e a perda da função.",
          "Notifique os investigados com prazo formal de 5 dias úteis para manifestação prévia."
        ],
        baseLegal: "Lei da Ação Civil Pública (Lei nº 7.347/85) · Lei de Improbidade Administrativa (Lei nº 8.429/92) · Constituição de Brava (art. 129, III) · Código Civil de Brava RP (Arts. 37 a 43 e 93)."
      },
      fields: [
        { id: "ic_numero", label: "Nº dos Autos (IC)", type: "numero", prefixo: "IC", dica: "Numeração oficial gerada automaticamente para o Inquérito Civil." },
        { id: "ic_objeto", label: "Objeto da Investigação Civil", req: true, placeholder: "Ex.: Fraude em licitação / Desvio de verbas / Improbidade Administrativa", dica: "Fato central investigado pelo Ministério Público no âmbito civil." },
        { id: "ic_orgao", label: "Órgão / Ente Público sob Investigação", type: "options", options: [
          "Prefeitura Municipal de Brava RP",
          "Secretaria de Saúde / Hospital Municipal",
          "Secretaria de Segurança Pública / Batalhão",
          "Empresa Pública / Concessionária Municipal",
          "Guarda Municipal & Departamento de Trânsito",
          "Outra Entidade da Administração Direta ou Indireta"
        ], dica: "Órgão ou ente público municipal alvo da auditoria do MP." },
        { id: "ic_investigados", label: "Servidores / Gestores Investigados", req: true, placeholder: "Ex.: Secretário de Saúde e Diretor Financeiro", dica: "Pessoas físicas ou jurídicas que respondem ao inquérito civil." },
        { id: "ic_passaportes", label: "Passaportes / IDs dos Investigados", placeholder: "Ex.: 1042, 2819", dica: "Passaportes no RP dos investigados (se conhecidos)." },
        { id: "ic_base_legal", label: "⚖️ Fundamentação Legal / Improbidade", req: true, isFull: true, placeholder: "Ex.: Lei nº 8.429/92 (Arts. 9º - Enriquecimento Ilícito e 10 - Dano ao Erário) c/c CF/Brava", dica: "Artigos da Lei de Improbidade Administrativa e legislação civil aplicados." },
        { id: "ic_fase", label: "Fase do Inquérito Civil", type: "options", options: [
          "Portaria Inaugural de Instauração",
          "Fase Instrutória (Perícias e Requisição de Documentos)",
          "Oitiva de Gestores e Testemunhas",
          "Proposta de Termo de Ajustamento de Conduta (TAC)",
          "Concluso para Ajuizamento de Ação Civil Pública (ACP)",
          "Arquivamento por Ausência de Dano ao Erário"
        ], dica: "Etapa de tramitação do inquérito civil perante a Promotoria." },
        { id: "ic_desfecho", label: "Consequência / Provimento Pretendido", type: "options", options: [
          "Ajuizamento de Ação Civil Pública (ACP) com Indisponibilidade de Bens",
          "Celebração de Termo de Ajustamento de Conduta (TAC) com Reparação",
          "Recomendação Ministerial ao Prefeito / Gestor Municipal",
          "Ressarcimento Integral do Erário com Perda de Função Pública",
          "Arquivamento Homologado pelo Conselho Superior"
        ], dica: "Medida final almejada pelo Ministério Público nestes autos." },
        { id: "ic_promotor", label: "Promotor(a) de Justiça Titular da Probidade Administrativa", req: true, isFull: true, placeholder: "Ex.: Promotoria de Justiça de Defesa do Patrimônio Público de Brava", dica: "Autoridade do Ministério Público responsável pela condução do IC." },
        { id: "ic_fatos", label: "1. Dos Fatos e Indícios de Lesão ao Interesse Público", type: "textarea", req: true, placeholder: "Narre os indícios de malversação do erário, contratos suspeitos, valores apurados e prejuízos...", dica: "Narrativa fática pormenorizada com valores e documentos probatórios.", modelo: "1. DOS FATOS INVESTIGADOS:\nChegou ao conhecimento desta Promotoria de Justiça a existência de fortes indícios de irregularidades administrativas consistentes em [descrever detalhadamente a fraude/desvio], envolvendo o ente público [Órgão sob investigação] e a quantia estimada de R$ [Valor estimado].\n\n2. DO DANO AO ERÁRIO E IMPROBIDADE:\nA conduta viola frontalmente os princípios constitucionais da moralidade, legalidade e eficiência (CF art. 37), caracterizando em tese ato de improbidade administrativa gerador de dano ao patrimônio público da Comarca de Brava RP." },
        { id: "ic_providencias", label: "2. Providências Ministeriais, Requisições e Prazo", type: "textarea", req: true, placeholder: "Ordens de auditoria, notificações para esclarecimentos e fixação de prazo...", dica: "Determinações expressas para realização de perícias contábeis e oitivas.", modelo: "O MINISTÉRIO PÚBLICO DA COMARCA DE BRAVA RP DETERMINA:\n\na) A AUTUAÇÃO e registro oficial deste Inquérito Civil Público;\nb) A expedição de ofício requisitório à Secretaria/Órgão para que, no prazo de 5 (cinco) dias úteis, apresente cópia integral dos processos licitatórios e notas de empenho;\nc) A notificação dos investigados para apresentarem manifestação preliminar formal perante esta Promotoria;\nd) A realização de perícia técnica contábil para apuração do valor líquido a ser ressarcido;\ne) A conclusão para análise de propositura de Termo de Ajustamento de Conduta (TAC) ou Ação Civil Pública." },
      ],
    },

    /* ---------------- NOTÍCIA DE FATO (NF) ---------------- */
    {
      id: "noticia_fato",
      grupo: "administrativo",
      title: "Notícia de Fato (NF)",
      svg: "noticia_fato",
      emoji: "📑",
      tag: "Triagem & Registro",
      desc: "Registro inaugural e autuação prévia de qualquer representação, denúncia de cidadão ou notícia de ilícito recebida no Ministério Público / Corregedoria, para triagem e deliberação de abertura de PA/PAD, PIC ou IC.",
      webhook: "https://discord.com/api/webhooks/1562539281669554186/5F4X79ZZPvXeuzhvcALuPsTr3zPMk8U-YcWXS2Thlpiwjd3j408HIRnV8rYuF-47vEeX",
      cor: 15844367,
      cargoPadrao: "Promotor de Justiça",
      natureza: "Notícia de Fato (NF)",
      eficacia: "Juízo de Admissibilidade & Triagem",
      termo: "A SECRETARIA DO MINISTÉRIO PÚBLICO E DA CORREGEDORIA DA COMARCA DE BRAVA RP CERTIFICA o recebimento e protocolo da presente NOTÍCIA DE FATO (NF), instaurada para análise de admissibilidade preliminar no prazo regulamentar de 30 (trinta) dias.",
      guia: {
        destaque: "Notícia de Fato (NF) × Admissibilidade Preliminar × Conversão em PIC/IC/PAD",
        resumo: "A Notícia de Fato é o registro embrionário de qualquer denúncia, comunicação ou representação que chega ao Ministério Público. Ela passa por triagem preliminar em até 30 dias para decidir se deve ser arquivada ou convertida em procedimento formal.",
        quandoUsar: "Utilize como primeiro ato oficial quando um cidadão, advogado ou autoridade formalizar uma denúncia contra agentes públicos ou empresas, antes de definir se haverá abertura de PAD, PIC criminal ou Inquérito Civil.",
        diferencas: [
          {
            nome: "Protocolo da Notícia de Fato",
            tag: "Recepção da Denúncia",
            cor: "blue",
            desc: "Registro solene que gera numeração oficial e confere comprovante ao denunciante com início da contagem do prazo de triagem.",
            quando: "Assim que a notícia de ilícito for apresentada no protocolo físico ou eletrônico do Ministério Público.",
            exemplo: "Cidadão relata ter sido cobrado indevidamente por taxa abusiva ou vítima de agressão em abordagem.",
            resultado: "Autuação oficial da NF e distribuição ao Promotor de Justiça competente para análise."
          },
          {
            nome: "Conversão em PAD Externo",
            tag: "Encaminhamento Disciplinar",
            cor: "amber",
            desc: "Decisão do Promotor que reconhece indícios de infração funcional e remete os autos para abertura de Processo Disciplinar.",
            quando: "Quando o fato configurar infração aos deveres estatutários de servidor público externo (PM, PC, SAMU).",
            exemplo: "Policial que descumpriu procedimento operacional e agiu com descaso ou violência moderada.",
            resultado: "A Notícia de Fato é encerrada com a instauração imediata do Procedimento Administrativo Disciplinar (PAD)."
          },
          {
            nome: "Conversão em PIC / Inquérito",
            tag: "Encaminhamento Penal / Civil",
            cor: "purple",
            desc: "Conversão em Procedimento Investigatório Criminal (se houver crime doloso) ou Inquérito Civil (se houver dano ao erário).",
            quando: "Quando a narrativa estiver respaldada por provas materiais prévias de crime grave ou lesão financeira coletiva.",
            exemplo: "Vídeo comprovando tortura cometida em cela ou desvio documentado de combustível oficial.",
            resultado: "Abertura imediata de PIC criminal ou Inquérito Civil preparatório para medidas judiciais."
          },
          {
            nome: "Indeferimento / Arquivamento Sumário",
            tag: "Fato Atípico / Improcedente",
            cor: "green",
            desc: "Despacho de arquivamento liminar quando o fato for manifestamente atípico, calunioso ou destituído de qualquer elemento.",
            quando: "Denúncias genéricas, sem elementos mínimos ou que não constituem infração disciplinar ou crime.",
            exemplo: "Reclamação de cidadão insatisfeito com multa de trânsito legalmente aplicada com sinalização visível.",
            resultado: "Arquivamento sumário com notificação ao noticiante para ciência."
          }
        ],
        dicasEstagiario: [
          "Verifique com atenção a qualificação do Noticiante e do Noticiado (passaportes no RP).",
          "O prazo regulamentar para o Promotor proferir despacho na NF é de 30 dias (prorrogável por mais 30).",
          "Se o noticiante solicitar anonimato, resguarde sua identidade nos assentamentos oficiais.",
          "Indique sempre a natureza provisória do fato para direcionar à promotoria correta."
        ],
        baseLegal: "Resolução nº 174/2017 do CNMP (Disciplina a Notícia de Fato) · Constituição de Brava RP · Regimento Interno do Ministério Público e Corregedoria."
      },
      fields: [
        { id: "nf_numero", label: "Nº da Notícia de Fato (NF)", type: "numero", prefixo: "NF", dica: "Numeração oficial automática gerada para a Notícia de Fato." },
        { id: "nf_noticiante", label: "Noticiante / Denunciante", req: true, placeholder: "Ex.: Nome do Cidadão / Vítima / Denúncia Anônima nº...", dica: "Pessoa física ou jurídica que formalizou a representação." },
        { id: "nf_noticiante_id", label: "Passaporte / ID do Noticiante", placeholder: "Ex.: 1492 (deixe vazio se anônimo)", dica: "Passaporte no RP do noticiante." },
        { id: "nf_noticiado", label: "Agente Noticiado / Autoridade Alvo", req: true, placeholder: "Ex.: Policial Militar ID 1420 / Funcionário do Hospital / Delegado", dica: "Agente público, autoridade ou pessoa contra quem a notícia é formulada." },
        { id: "nf_noticiado_id", label: "Passaporte / ID do Noticiado", placeholder: "Ex.: 2841", dica: "Passaporte do agente noticiado (se conhecido)." },
        { id: "nf_orgao", label: "Órgão / Corporação Envolvida", type: "options", options: [
          "Polícia Militar (PM / Choque / BOPE)",
          "Polícia Civil (DPC / Delegacia)",
          "Saúde Pública (Hospital Municipal / SAMU)",
          "Guarda Municipal & Trânsito",
          "Prefeitura & Secretarias Municipais",
          "Ordem dos Advogados / Defensoria",
          "Outro Órgão da Administração"
        ], dica: "Instituição ou setor a que os fatos noticiados se referem." },
        { id: "nf_assunto", label: "Síntese do Assunto Noticiado", req: true, placeholder: "Ex.: Agressão em abordagem / Cobrança de propina / Abuso de autoridade", dica: "Resumo objetivo da denúncia apresentada." },
        { id: "nf_natureza", label: "Classificação da Infração Noticiada", type: "options", options: [
          "Infração Disciplinar de Servidor Público (Encaminhar para PAD)",
          "Crime / Ilícito Penal (Encaminhar para PIC ou Inquérito Policial)",
          "Dano ao Patrimônio / Improbidade (Encaminhar para Inquérito Civil)",
          "Lesão ao Consumidor / Saúde Pública",
          "Dúvida / Solicitação de Orientação Jurídica"
        ], dica: "Enquadramento preliminar para definir o destino dos autos." },
        { id: "nf_deliberacao", label: "Deliberação Inicial do Ministério Público", type: "options", options: [
          "Em Triagem Preliminar (Prazo de 30 dias para análise)",
          "Instauração de Processo Administrativo Disciplinar (PAD)",
          "Instauração de Procedimento Investigatório Criminal (PIC)",
          "Instauração de Inquérito Civil (IC)",
          "Notificação Prévia para Esclarecimentos em 48h",
          "Indeferimento Liminar / Arquivamento Sumário (Fato Atípico)"
        ], dica: "Decisão inicial do Promotor de Justiça sobre a admissibilidade da representação." },
        { id: "nf_prazo", label: "Prazo Regulamentar para Despacho", value: "30 (trinta) dias regulamentares", isFull: true, dica: "Prazo regulamentar máximo para deliberação conclusiva da Notícia de Fato." },
        { id: "nf_relato", label: "1. Relato dos Fatos Noticiados pelo Denunciante", type: "textarea", req: true, placeholder: "Descreva fielmente os fatos narrados pelo cidadão ou autoridade, data, local e envolvidos...", dica: "Transcrição fiel da denúncia ou representação recebida no Ministério Público.", modelo: "1. DA DENÚNCIA / REPRESENTAÇÃO APRESENTADA:\nNo dia [Data], compareceu perante este órgão ministerial o Noticiante acima qualificado, noticiando a ocorrência de fatos que demandam a intervenção do Ministério Público / Corregedoria, consistentes em: [descrever detalhadamente a narrativa apresentada pelo noticiante].\n\n2. ELEMENTOS APRESENTADOS:\nO noticiante acostou como indícios preliminares: [mídias, capturas de tela, testemunhas indicadas, registros de atendimento médico ou boletim de ocorrência]." },
        { id: "nf_despacho", label: "2. Despacho Inicial do Ministério Público e Deliberação", type: "textarea", req: true, placeholder: "Despacho preliminar da autoridade ministerial determinando a triagem, conversão ou arquivamento...", dica: "Despacho oficial que delibera sobre a admissibilidade da denúncia.", modelo: "DESPACHO INAUGURAL:\n1. Registre-se e autue-se a presente Notícia de Fato nos sistemas oficiais do Ministério Público da Comarca de Brava RP;\n2. Notifique-se o Noticiado para que, querendo, preste esclarecimentos preliminares no prazo de 48 (quarenta e oito) horas;\n3. Oficie-se à chefia da corporação externa para fornecimento de informações cadastrais do servidor no mesmo prazo;\n4. Decorrido o prazo legal com ou sem manifestação, venham os autos conclusos para deliberação sobre a INSTAURAÇÃO DE PROCEDIMENTO FORMAL (PAD / PIC / IC) ou ARQUIVAMENTO." },
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

    /* ---------------- OFÍCIOS & NOTIFICAÇÕES ---------------- */
    {
      id: "oficio", grupo: "notificacoes", title: "Ofício de Fiscalização", svg: "oficio", emoji: "📜", tag: "Ministério Público",
      desc: "Expedição de ofício para notificação e requisição de realização de diligência fiscalizatória institucional.",
      webhook: "https://discord.com/api/webhooks/1562540639336407251/ABIYnCGnEexXqjt4VIBpXssWr75_5PKBCbEFHaMnIA5reOzuVNF6P1UPulylL6oRmi4x",
      cor: 13938487, cargoPadrao: "Promotor de Justiça",
      natureza: "Ofício Institucional", eficacia: "Diligência Fiscalizatória",
      termo: "O MINISTÉRIO PÚBLICO DA COMARCA DE BRAVA RP, no regular exercício de suas atribuições constitucionais e institucionais de fiscalização, fiscalização da ordem econômica e defesa do interesse coletivo, EXPEDE o presente OFÍCIO para notificação e requisição de cooperação na diligência fiscalizatória institucional designada, sob as penas da lei.",
      guia: {
        destaque: "Diligência Fiscalizatória Institucional em Estabelecimentos Comerciais",
        resumo: "Instrumento oficial expedido pelo Ministério Público / Departamento Jurídico para dar ciência formal ao proprietário ou representante legal da data, horário e escopo da diligência de fiscalização.",
        quandoUsar: "Para conferência de regularidade comercial, sanitária, tributária e cumprimento de normas de funcionamento de empresas registradas ou em atividade na cidade.",
        diferencas: [
          {
            nome: "Ofício de Fiscalização",
            tag: "Aviso Prévio Institucional",
            cor: "blue",
            desc: "Notifica o proprietário sobre a vistoria programada, requisitando livre acesso e apresentação de alvarás e licenças.",
            quando: "Antes da ida da equipe fiscalizadora ao endereço comercial.",
            exemplo: "Fiscalização documental de alvarás de funcionamento, vigilância sanitária e registros fiscais em oficina mecânica ou boate.",
            resultado: "Obriga o proprietário ou preposto a franquear livre acesso às autoridades sob pena de crime de desobediência e interdição."
          },
          {
            nome: "Notificação Extrajudicial",
            tag: "Constituição em Mora & Advertência",
            cor: "amber",
            desc: "Comunicação formal com prazo peremptório para regularizar inconformidades ou prestar manifestação antes de Ação Civil Pública.",
            quando: "Quando irregularidades já foram constatadas ou quando a empresa descumpre prazos e requisitos legais.",
            exemplo: "Prazo de 48h para comprovar quitação de alvará ou sanar risco à segurança, sob pena de interdição cautelar imediata.",
            resultado: "Constitui prova pré-constituída de ciência prévia para ajuizamento de medidas judiciais cautelares."
          }
        ],
        dicasEstagiario: [
          "Verifique o nome completo e passaporte do proprietário ou preposto para que a notificação tenha plena validade.",
          "O horário estimado e a data da fiscalização devem ser expressamente informados.",
          "A recusa injustificada de acesso configura ato de obstrução à justiça e crime de desobediência (CP), ensejando interdição cautelar do local.",
          "Indique sempre a equipe responsável ou o Promotor de Justiça titular que subscreve o ato."
        ],
        baseLegal: "Código Civil de Brava RP (Arts. 37 a 43 - CNPJ e Empresas; Art. 93 - Competências Operacionais e Fiscalização) · CF/Brava e Legislação Institucional do Ministério Público."
      },
      fields: [
        { id: "of_numero", label: "Nº do Ofício", type: "numero", prefixo: "OF", dica: "Numeração oficial automática do Ofício." },
        { id: "of_setor", label: "Sigla do Setor / Órgão Expedidor", value: "MP / SDJ", dica: "Sigla ou departamento expedidor (ex.: MP, SDJ, GAECO)." },
        { id: "of_assunto", label: "Assunto", value: "Notificação de realização de diligência fiscalizatória institucional", isFull: true, dica: "Objeto central do ofício requisitório." },
        { id: "of_proprietario", label: "Nome do Proprietário / Representante", req: true, dica: "Nome do proprietário ou representante legal do estabelecimento." },
        { id: "of_passaporte", label: "Passaporte / Registro / ID", dica: "Nº do ID, passaporte ou documento de identificação do proprietário." },
        { id: "of_empresa", label: "🏢 Estabelecimento (Nome Comercial / Razão Social)", req: true, dica: "Nome comercial ou razão social do estabelecimento sob fiscalização." },
        { id: "of_endereco", label: "📍 Endereço do Estabelecimento", placeholder: "Ex.: Rua Central, nº 100 - Bairro Centro", dica: "Localização precisa do imóvel onde será realizada a diligência." },
        { id: "of_data_fiscalizacao", label: "📅 Data da Fiscalização", type: "date", req: true, dica: "Data oficial em que a equipe comparecerá ao local." },
        { id: "of_hora_fiscalizacao", label: "⏰ Horário Estimado", type: "time", req: true, dica: "Horário a partir do qual a fiscalização terá início." },
        { id: "of_promotor", label: "Equipe Responsável / Nome do Promotor", placeholder: "Ex.: Promotor de Justiça Titular / Inspetoria SDJ", isFull: true, dica: "Nome do Promotor de Justiça ou autoridade responsável pela equipe." },
        { id: "of_objetivo", label: "Objetivo da Diligência", type: "textarea", isFull: true, req: true, dica: "Conferência de regularidades comerciais, documentais e fiscais.", modelo: "A diligência tem como objetivo a conferência de regularidade das atividades comerciais, incluindo, mas não se limitando a:\n\nI – Regularidade documental (alvarás de funcionamento, licenças sanitárias e registros cabíveis);\nII – Cumprimento das normas de segurança, saúde pública e direitos do consumidor;\nIII – Regularidade fiscal e conformidade com a legislação local em vigor." },
        { id: "of_requisicao", label: "Requisição e Advertências Legais", type: "textarea", isFull: true, req: true, dica: "Requisição de presença e advertências sobre obstrução ou desobediência.", modelo: "Diante disso, REQUISITA-SE que, na data e horário designados, Vossa Senhoria ou preposto devidamente habilitado esteja presente no local munido da documentação pertinente do estabelecimento, franqueando o livre acesso das autoridades às dependências do imóvel para a devida inspeção.\n\nRegistra-se que a recusa injustificada de acesso, a ausência de cooperação ou qualquer tentativa de embaraço à atuação das autoridades poderá configurar ato de obstrução à justiça ou crime de desobediência, sem prejuízo da aplicação de sanções administrativas e interdição cautelar do estabelecimento.\n\nCertos de vossa colaboração para com a ordem pública e a legalidade, renovamos protestos de estima e consideração." },
      ],
    },
    {
      id: "notificacao", grupo: "notificacoes", title: "Notificação Extrajudicial", svg: "notificacao", emoji: "⚠️", tag: "Extrajudicial",
      desc: "Notificação formal com advertências legais, fundamentos jurídicos e prazo para manifestações ou regularização.",
      webhook: "https://discord.com/api/webhooks/1562539281669554186/5F4X79ZZPvXeuzhvcALuPsTr3zPMk8U-YcWXS2Thlpiwjd3j408HIRnV8rYuF-47vEeX",
      cor: 15105570, cargoPadrao: "Promotor de Justiça",
      natureza: "Notificação Extrajudicial", eficacia: "Constituição em Mora & Advertência",
      termo: "A AUTORIDADE NOTIFICANTE FORMALIZA a presente NOTIFICAÇÃO EXTRAJUDICIAL, conferindo ciência inequívoca ao notificado sobre os fatos apurados, obrigações jurídicas e advertências legais sob as cominações cabíveis.",
      guia: {
        destaque: "Notificação Extrajudicial, Advertências & Prazos Peremptórios",
        resumo: "Ato extrajudicial formal pelo qual o Ministério Público ou o Departamento Jurídico adverte expressamente o notificado sobre irregularidades e impõe prazo para manifestação ou adequação.",
        quandoUsar: "Para prevenir litígios, constituir devedor ou infrator em mora, advertir contra criação de embaraços à fiscalização e exigir regularização imediata sob pena de interdição cautelar e ação civil pública.",
        diferencas: [
          {
            nome: "Notificação Extrajudicial",
            tag: "Fase Pré-Processual / Fiscalizatória",
            cor: "amber",
            desc: "Formalização documental direta sem intervenção imediata do Magistrado, fixando prazo razoável para resposta ou cumprimento voluntário.",
            quando: "Antes do ajuizamento de Ação Civil Pública ou requerimento de interdição coercitiva em juízo.",
            exemplo: "Notificação à administração de boate clandestina para apresentação de alvarás de bombeiros em até 48 horas.",
            resultado: "Se atendida, resolve o impasse; se descumprida, instrui o ajuizamento de ação civil com pedido liminar de fechamento."
          },
          {
            nome: "Intimação Judicial",
            tag: "Ordem do Juízo",
            cor: "red",
            desc: "Determinação expressa emitida por ordem do Juiz no curso de processo judicial ativo.",
            quando: "Durante tramitação de processo para cumprimento de decisão ou audiência.",
            exemplo: "Mandado de intimação para o réu cumprir liminar de desocupação ou cessação de atividade comercial.",
            resultado: "Desobediência gera medidas de força policial imediata e multa diária."
          }
        ],
        dicasEstagiario: [
          "O prazo para manifestação deve ser explícito (ex.: 24h, 48h ou 5 dias úteis conforme a gravidade).",
          "Descreva as advertências expressas das alíneas (a) e (b) com precisão técnica.",
          "A notificação extrajudicial afasta alegação de desconhecimento ou boa-fé por parte do infrator.",
          "Verifique com rigor os dados de qualificação da Razão Social, sócio e localização do imóvel."
        ],
        baseLegal: "Código Civil de Brava RP (Art. 61 - Mora e Notificação Prévia; Art. 83 - Composição Extrajudicial; Art. 93 - Competências do SDJ) · Art. 726 do Código de Processo Civil."
      },
      fields: [
        { id: "ne_numero", label: "Nº da Notificação", type: "numero", prefixo: "NOT", dica: "Numeração oficial automática da Notificação Extrajudicial." },
        { id: "ne_notificante", label: "Notificante (Órgão / Autoridade)", value: "Ministério Público de Brava RP / SDJ", req: true, dica: "Identificação da autoridade ou órgão expedidor da notificação." },
        { id: "ne_empresa", label: "🏢 Razão Social / Nome Fantasia (Notificado)", req: true, dica: "Nome comercial ou razão social da empresa notificada." },
        { id: "ne_proprietario", label: "👤 Representante Legal / Proprietário(a)", req: true, dica: "Nome do sócio, proprietário ou responsável que recebe a notificação." },
        { id: "ne_passaporte", label: "🪪 Passaporte / ID / Documento", dica: "Passaporte ou documento oficial do notificado." },
        { id: "ne_endereco", label: "📍 Endereço do Estabelecimento", req: true, placeholder: "Ex.: Rua dos Comerciantes, nº 45 - Bairro Centro", dica: "Endereço ou localização do imóvel sob notificação." },
        { id: "ne_prazo", label: "⏳ Prazo para Manifestações", value: "48 (quarenta e oito) horas a contar do recebimento", isFull: true, dica: "Prazo fixado para resposta formal ou apresentação de documentos." },
        { id: "ne_fatos", label: "2. Dos Fatos e Fundamentos Jurídicos", type: "textarea", isFull: true, req: true, dica: "Narrativa dos fatos apurados e enquadramento legal.", modelo: "Constatou-se, no âmbito das atividades institucionais de fiscalização e monitoramento da ordem econômica desta Comarca, que o estabelecimento supracitado opera sob indícios de desconformidade com as normas regulamentares vigentes, especialmente no tocante a alvarás de funcionamento, licenças e recolhimento de tributos obrigatórios previstos no Código Civil de Brava (Arts. 37 a 43 e Art. 93), demandando imediata regularização e cooperação com as autoridades." },
        { id: "ne_objeto", label: "3. Do Objeto da Notificação", type: "textarea", isFull: true, req: true, dica: "Objetivo central e determinações impostas ao notificado.", modelo: "Constitui objeto da presente notificação dar CIÊNCIA FORMAL ao Notificado sobre a iminente realização de diligência fiscalizatória e exigir o pleno fornecimento de toda a documentação comprobatória da regularidade comercial, sanitária e fiscal da empresa, assegurando-se o livre e irrestrito acesso dos agentes fiscalizadores ao recinto do imóvel nas datas e horários aprazados." },
        { id: "ne_advertencias", label: "4. Das Advertências Legais", type: "textarea", isFull: true, req: true, dica: "Advertências legais imperativas e cominações legais.", modelo: "Adverte-se expressamente que:\n\n• a) A recusa imotivada de acesso, a criação de embaraços, o fechamento proposital do imóvel no momento da diligência ou a negativa de fornecimento dos documentos solicitados ensejará a imediata lavratura de auto de infração por desobediência e obstrução à fiscalização;\n\n• b) A constatação de irregularidades sem possibilidade de saneamento imediato poderá resultar no ajuizamento de Ação Civil Pública, com pedidos de interdição cautelar imediata do local, aplicação de multa diária e comunicação à autoridade policial para apuração de eventuais delitos penais." },
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
  "Atendimento": "Despacho de urgência do advogado ou servidor diretamente no gabinete com o Magistrado.",

  // PAD Externo - Fases
  "Portaria de Instauração (Início dos Autos)": "Abertura oficial do processo disciplinar com formulação da acusação e prazo de 48h para defesa prévia.",
  "Fase Instrutória & Oitiva do Servidor": "Fase de oitiva de testemunhas, exibição pericial de câmeras corporais (bodycam) e interrogatório do servidor acusado.",
  "Aguardando Julgamento da Comissão": "Instrução encerrada e alegações finais apresentadas; autos aguardam deliberação e voto dos membros da comissão.",
  "Medida Cautelar Deferida (Afastamento)": "Afastamento preventivo imediato do agente de funções operacionais de rua para resguardar a ordem e provas.",
  "Julgado Procedente (Penalidade Aplicada)": "Infração funcional julgada provada com aplicação de sanção disciplinar proporcional (advertência, suspensão ou demissão).",
  "Julgado Improcedente (Arquivamento)": "Falta disciplinar não comprovada ou inexistente; absolvição do servidor com imediato arquivamento dos autos.",

  // PAD Externo - Órgãos
  "Polícia Militar (PM / Choque / BOPE)": "Agente vinculado aos quadros operacionais do Batalhão, Choque, ROCAM ou unidades de elite da PM.",
  "Polícia Civil (DPC / Investigação)": "Delegado, escrivão ou investigador de polícia da Polícia Civil.",
  "Saúde Pública (Hospital Municipal / SAMU)": "Médico, socorrista, enfermeiro ou diretor do Hospital Municipal ou Serviço de Atendimento Móvel.",
  "Guarda Municipal & Trânsito": "Agente municipal responsável pelo patrulhamento preventivo, posturas e fiscalização de trânsito.",
  "Ordem dos Advogados (OAB / Defensoria Externa)": "Advogado ou defensor sob investigação por falta ética disciplinar ou desrespeito a prerrogativas.",
  "Prefeitura & Secretarias Municipais": "Servidor da administração direta, fiscal de posturas, auditor de fazenda ou ocupante de cargo comissionado.",

  // PAD Externo - Cautelares
  "Nenhuma Medida Cautelar (Responde em Funções Administrativas)": "O investigado responde ao procedimento disciplinar sem suspensão cautelar de prerrogativas funcionais.",
  "Afastamento Preventivo Imediato das Funções Operacionais": "Retirada compulsória do servidor das ruas e do contato com o público, atuando em tarefas administrativas.",
  "Suspensão Temporária do Porte Funcional de Arma de Fogo": "Recolhimento obrigatório do armamento institucional para preservação de testemunhas e segurança pública.",
  "Retenção Cautelar de Veículo Oficial e Equipamentos": "Proibição cautelar de conduzir viaturas da corporação ou ter acesso a arsenais e equipamentos.",
  "Proibição de Acesso a Instalações e Sistemas do Órgão": "Impedimento de ingresso nas dependências da corporação e bloqueio de logins em sistemas policiais/governamentais.",
  "Afastamento Total com Suspensão Remuneratória": "Medida cautelar extrema aplicada em crimes hediondos ou faltas gravíssimas com interrupção funcional completa.",

  // PAD Externo - Sanções (Consequências Administrativas)
  "Demissão a Bem do Serviço Público": "Penalidade disciplinar máxima expulsória que acarreta a exclusão definitiva dos quadros da administração pública e inabilitação para cargos públicos.",
  "Suspensão das Funções Públicas (5 a 30 dias com perda remuneratória)": "Punição funcional intermediária com afastamento coercitivo do cargo e corte integral dos vencimentos no período.",
  "Advertência Disciplinar Formal em Assentamento Funcional": "Sanção disciplinar solene registrada nos assentamentos e ficha funcional do servidor, gerando reincidência.",
  "Cassação de Aposentadoria ou Disponibilidade": "Sanção expulsória aplicada a servidores inativos ou na reserva remunerada que cometeram infração punível com demissão na ativa.",
  "Destituição de Cargo em Comissão / Função de Confiança": "Exoneração punitiva de função de chefia, comando de batalhão ou cargo de confiança ocupado pelo servidor.",
  "Em Apuração (Sem Penalidade Aplicada)": "Autos em andamento; nenhuma sanção definitiva foi fixada até o encerramento do contraditório.",
  "Absolvição por Falta de Provas / Arquivamento": "Declaração de inexistência do fato ou inocência do acusado com certidão de assentamento limpo.",

  // Procedimento Investigatório Criminal (PIC)
  "Portaria de Instauração (Início da Investigação Penal)": "Ato inaugural do Ministério Público que instaura formalmente a persecução penal ministerial com prazo definido.",
  "Diligências em Andamento & Juntada de Provas": "Fase de coleta de perícias, quebras de sigilo, degravações e oitivas sigilosas de testemunhas pelo MP.",
  "Requerimento de Medidas Cautelares (Prisão / Busca)": "Petição urgente ao Juiz Criminal para decretação de prisão temporária/preventiva ou busca e apreensão domiciliar.",
  "Relatório Final Conclusivo (Oferecimento de Denúncia Crime)": "Conclusão das investigações com prova de materialidade e autoria, culminando no ajuizamento da ação penal pública.",
  "Promoção de Arquivamento (Inexistência de Crime)": "Decisão ministerial fundamentada pelo arquivamento por ausência de crime ou justa causa.",
  "Prisão Preventiva do Investigado": "Medida cautelar extrema de privação de liberdade para resguardar a ordem pública ou instrução criminal.",
  "Busca e Apreensão em Domicílio / Viatura": "Medida cautelar probatória de invasão legal com ordem judicial para arrecadação de objetos e ilícitos.",
  "Interceptação Telefônica / Telemática": "Monitoramento em tempo real de comunicações telefônicas e dados digitais do alvo investigado.",
  "Oferecimento de Denúncia Criminal (Ação Penal Pública)": "Peça formal que inicia o processo judicial penal condenatório contra o réu perante a Vara Criminal.",

  // Inquérito Civil (IC)
  "Portaria Inaugural de Instauração": "Ato que dá início ao Inquérito Civil para apurar fraudes, improbidade administrativa ou lesão ao erário.",
  "Proposta de Termo de Ajustamento de Conduta (TAC)": "Acordo extrajudicial em que o investigado se compromete a sanar a irregularidade e ressarcir os danos sob pena de multa.",
  "Concluso para Ajuizamento de Ação Civil Pública (ACP)": "Investigação concluída que ruma para ação judicial com pedidos de perda de bens e indisponibilidade de contas.",
  "Ajuizamento de Ação Civil Pública (ACP) com Indisponibilidade de Bens": "Demanda judicial perante a Vara Cível para condenação e bloqueio judicial de patrimônio do gestor ou empresa.",
  "Celebração de Termo de Ajustamento de Conduta (TAC) com Reparação": "Solução consensual definitiva homologada com devolução de quantias ao fundo municipal e extinção do inquérito.",
  "Ressarcimento Integral do Erário com Perda de Função Pública": "Pedido ministerial de restituição total aos cofres municipais e perda da função de gestor público.",

  // Notícia de Fato (NF)
  "Em Triagem Preliminar (Prazo de 30 dias para análise)": "Período regulamentar de até 30 dias em que o Promotor analisa se a representação preenche requisitos mínimos.",
  "Instauração de Processo Administrativo Disciplinar (PAD)": "Decisão que converte a notícia de fato em processo disciplinar para apurar conduta de servidor externo.",
  "Instauração de Procedimento Investigatório Criminal (PIC)": "Decisão que converte a denúncia em investigação penal ministerial direta sobre crime doloso.",
  "Instauração de Inquérito Civil (IC)": "Decisão que converte a representação em inquérito civil para investigar improbidade ou lesão ao patrimônio.",
  "Indeferimento Liminar / Arquivamento Sumário (Fato Atípico)": "Rejeição imediata da denúncia por manifesta ausência de crime, difamação infundada ou fato atípico.",
  "Infração Disciplinar de Servidor Público (Encaminhar para PAD)": "Classificação preliminar voltada a desvios éticos ou operacionais de policiais, médicos ou fiscais.",
  "Crime / Ilícito Penal (Encaminhar para PIC ou Inquérito Policial)": "Classificação preliminar voltada a práticas tipificadas no Código Penal de Brava.",
  "Dano ao Patrimônio / Improbidade (Encaminhar para Inquérito Civil)": "Classificação voltada a licitações fraudulentas, contratos irregulares ou desvio de dinheiro público."
};


