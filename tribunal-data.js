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

  cargos: ["Juiz de Direito", "Desembargador", "Promotor de Justiça", "Escrivão Judicial", "Oficial de Justiça", "Advogado", "Servidor do Tribunal"],

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
      cor: 13938487, cargoPadrao: "Advogado",
      natureza: "Petição Protocolada", eficacia: "Distribuição",
      termo: "A SECRETARIA DO TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA RP CERTIFICA o recebimento e protocolo da presente petição inicial, que será distribuída à Vara competente para análise do Juízo, nos termos do regimento interno do Poder Judiciário.",
      fields: [
        { id: "pi_numero", label: "Nº do Protocolo", type: "numero", prefixo: "PET" },
        { id: "pi_tipo", label: "Tipo de Ação", type: "options", options: ["Ação Cível", "Ação Criminal", "Habeas Corpus", "Mandado de Segurança"] },
        { id: "pi_autor", label: "Autor / Requerente", req: true },
        { id: "pi_autor_id", label: "Passaporte do Autor" },
        { id: "pi_reu", label: "Réu / Requerido", req: true },
        { id: "pi_reu_id", label: "Passaporte do Réu" },
        { id: "pi_artigos", label: "⚖️ Artigos / Base Legal", placeholder: "Ex.: Artigos aplicáveis do Código Penal ou Código Civil", isFull: true },
        { id: "pi_valor", label: "Valor da Causa", placeholder: "Ex.: R$ 50.000 (opcional)", isFull: true },
        { id: "pi_fatos", label: "Dos Fatos", type: "textarea", req: true, placeholder: "Descreva os fatos que motivam a ação..." },
        { id: "pi_pedido", label: "Dos Pedidos", type: "textarea", req: true, placeholder: "O que se pede ao Juízo..." },
      ],
    },
    {
      id: "processos", grupo: "processos", title: "Processos Criminais", svg: "processo", emoji: "🔱", tag: "Vara Criminal",
      desc: "Abertura e atualização de processos criminais em andamento.",
      webhook: "https://discord.com/api/webhooks/1561380508007534593/ZFAGt9x3aDs2vksYW8t3dmOA8uKQYzc1McrT-WaLOu_J1fmoScVi3l6DgMiOP4r_3Koc",
      cor: 12597547, cargoPadrao: "Juiz de Direito",
      natureza: "Processo Criminal", eficacia: "Em Tramitação",
      termo: "A SECRETARIA DA VARA CRIMINAL DA COMARCA DE BRAVA RP CERTIFICA o registro e a atualização do presente processo criminal, assegurados ao réu o contraditório, a ampla defesa e o devido processo legal.",
      fields: [
        { id: "pc_numero", label: "Nº do Processo", type: "numero", prefixo: "CNJ" },
        { id: "pc_status", label: "Status", type: "options", options: ["Em Andamento", "Aguardando Audiência", "Concluso para Sentença", "Arquivado"] },
        { id: "pc_reu", label: "Réu", req: true },
        { id: "pc_reu_id", label: "Passaporte do Réu" },
        { id: "pc_acusacao", label: "⚖️ Artigos / Acusação Penal", req: true, placeholder: "Ex.: Art. 3.2 (Roubo Qualificado), Art. 1.1 (Equipamento Balístico)...", isFull: true },
        { id: "pc_vara", label: "Vara", value: "Vara Criminal de Brava" },
        { id: "pc_promotor", label: "Promotor(a)" },
        { id: "pc_defesa", label: "Defesa (Advogado)" },
        { id: "pc_resumo", label: "Resumo do Caso", type: "textarea", placeholder: "Resumo dos fatos e andamento do processo..." },
      ],
    },
    {
      id: "civeis", grupo: "processos", title: "Processos Cíveis", svg: "civil", emoji: "📃", tag: "Vara Cível",
      desc: "Ações cíveis: indenizações, contratos, disputas patrimoniais e família.",
      webhook: "https://discord.com/api/webhooks/1561380569428926574/fcWu6oJ_SQseWYJrDv_ejjHTIRGtkiXRD1QHO3CDuoM-TthGdilJBNNXckL4koIuhQ7S",
      cor: 3447003, cargoPadrao: "Juiz de Direito",
      natureza: "Processo Cível", eficacia: "Em Tramitação",
      termo: "A SECRETARIA DA VARA CÍVEL DA COMARCA DE BRAVA RP CERTIFICA o registro e a atualização do presente processo cível, que tramita conforme as normas processuais vigentes no Poder Judiciário de Brava.",
      fields: [
        { id: "pv_numero", label: "Nº do Processo", type: "numero", prefixo: "CNJ" },
        { id: "pv_status", label: "Status", type: "options", options: ["Em Andamento", "Aguardando Audiência", "Concluso para Sentença", "Arquivado"] },
        { id: "pv_requerente", label: "Requerente", req: true },
        { id: "pv_requerente_id", label: "Passaporte do Requerente" },
        { id: "pv_requerido", label: "Requerido", req: true },
        { id: "pv_requerido_id", label: "Passaporte do Requerido" },
        { id: "pv_objeto", label: "Objeto da Ação", req: true, placeholder: "Ex.: Indenização por danos materiais" },
        { id: "pv_artigos", label: "⚖️ Artigos / Base Legal", placeholder: "Ex.: Art. 186 e 927 do Código Civil", isFull: true },
        { id: "pv_valor", label: "Valor da Causa", placeholder: "Ex.: R$ 120.000" },
        { id: "pv_resumo", label: "Resumo do Caso", type: "textarea", placeholder: "Resumo dos fatos e andamento do processo..." },
      ],
    },
    {
      id: "decisoes", grupo: "processos", title: "Decisões", svg: "decisao", emoji: "🏛️", tag: "Sentença",
      desc: "Publicação de sentenças, decisões interlocutórias e despachos.",
      webhook: "https://discord.com/api/webhooks/1561380637401677935/4YhvA1yrz28X58qcRhPbJU4Vs2ZgZ4ig5dmYksFKqwPeO7jhNcn7ppMP97fqv8CHmca6",
      cor: 10181046, cargoPadrao: "Juiz de Direito",
      natureza: "Decisão Judicial", eficacia: "Publicação Oficial",
      termo: "O PODER JUDICIÁRIO DA COMARCA DE BRAVA RP torna pública a presente decisão, proferida pelo Juízo competente, que produz seus efeitos legais a partir de sua publicação. Cumpra-se.",
      secaoTexto: "Fundamentação e Dispositivo",
      fields: [
        { id: "de_processo", label: "Nº do Processo", req: true, placeholder: "Ex.: 0001234-56.2026.8.26.0001" },
        { id: "de_tipo", label: "Tipo de Decisão", type: "options", options: ["Sentença", "Decisão Interlocutória", "Despacho", "Acórdão"] },
        { id: "de_resultado", label: "Resultado", type: "options", options: ["Procedente", "Parcialmente Procedente", "Improcedente", "Condenação", "Absolvição", "Extinção sem Mérito"] },
        { id: "de_partes", label: "Partes Envolvidas", req: true, placeholder: "Ex.: Ministério Público x João Silva" },
        { id: "de_artigos", label: "⚖️ Artigos / Dispositivos Legais", placeholder: "Ex.: Art. 3.2 do Código Penal, Art. 121...", isFull: true },
        { id: "de_pena", label: "Pena / Condenação", placeholder: "Ex.: 30 meses + multa de R$ 40.000 (se houver)", isFull: true },
        { id: "de_fundamentacao", label: "Fundamentação", type: "textarea", req: true, placeholder: "Razões de fato e de direito da decisão..." },
        { id: "de_dispositivo", label: "Dispositivo", type: "textarea", req: true, placeholder: "O que fica decidido. Ex.: Julgo procedente o pedido para..." },
      ],
    },

    /* ---------------- MANDADOS & AUTORIZAÇÕES ---------------- */
    {
      id: "mandados", grupo: "mandados", title: "Mandados", svg: "mandado", emoji: "📖", tag: "Expedição",
      desc: "Expedição de mandados de prisão, busca e apreensão e condução.",
      webhook: "https://discord.com/api/webhooks/1561380253123874856/OkgzHHGy1ybZJJLLSA8hHZtDX2ZIbuYusZ4OHlBj90ZuU-PE4tlE4vFXpRh8pB1a7fed",
      cor: 15158332, cargoPadrao: "Juiz de Direito",
      natureza: "Mandado Judicial", eficacia: "Cumprimento Imediato",
      termo: "O JUÍZO DA COMARCA DE BRAVA RP, no uso de suas atribuições legais, MANDA a qualquer autoridade policial ou Oficial de Justiça a quem este for apresentado que, em seu cumprimento, proceda na forma abaixo determinada, observadas as garantias legais. Cumpra-se.",
      fields: [
        { id: "mn_numero", label: "Nº do Mandado", type: "numero", prefixo: "MAND" },
        { id: "mn_tipo", label: "Tipo de Mandado", type: "options", options: ["Prisão", "Busca e Apreensão", "Condução Coercitiva", "Afastamento do Lar"] },
        { id: "mn_alvo", label: "Alvo / Investigado", req: true },
        { id: "mn_alvo_id", label: "Passaporte do Alvo" },
        { id: "mn_artigos", label: "⚖️ Artigos / Infrações Penais", req: true, placeholder: "Ex.: Art. 3.2 (Roubo), Art. 1.2 (Porte Ilegal)...", isFull: true },
        { id: "mn_endereco", label: "Endereço / Local", placeholder: "Ex.: Casa 12, Vinewood Hills" },
        { id: "mn_processo", label: "Nº do Processo Vinculado" },
        { id: "mn_validade", label: "Válido até", type: "date" },
        { id: "mn_solicitante", label: "Solicitante (Corporação)", placeholder: "Ex.: Polícia Civil — Del. Souza" },
        { id: "mn_fundamento", label: "Fundamentação", type: "textarea", req: true, placeholder: "Motivo e fundamento legal da expedição..." },
      ],
    },
    {
      id: "autorizacoes", grupo: "mandados", title: "Autorizações Judiciais", svg: "autorizacao", emoji: "✅", tag: "Autorização",
      desc: "Concessão de autorizações judiciais especiais a cidadãos e corporações.",
      webhook: "https://discord.com/api/webhooks/1561380324988952758/ZGqkBNc3GzEFtiTiE7g708Cf5HLLZPiNIeK7NYcNWIibOm66vApMshuv-fG4uTx6MHpA",
      cor: 3066993, cargoPadrao: "Juiz de Direito",
      natureza: "Autorização Judicial", eficacia: "Até a Validade",
      termo: "O JUÍZO DA COMARCA DE BRAVA RP AUTORIZA o requerente abaixo qualificado a praticar o ato descrito, dentro do prazo de validade e nos estritos limites desta decisão, sob pena de revogação imediata.",
      fields: [
        { id: "au_numero", label: "Nº da Autorização", type: "numero", prefixo: "AUT" },
        { id: "au_tipo", label: "Tipo de Autorização", type: "options", options: ["Quebra de Sigilo", "Interceptação", "Evento Público", "Porte Especial", "Outra"] },
        { id: "au_solicitante", label: "Solicitante", req: true },
        { id: "au_solicitante_id", label: "Passaporte do Solicitante" },
        { id: "au_orgao", label: "Órgão / Corporação", placeholder: "Ex.: Polícia Militar, Empresa X..." },
        { id: "au_artigos", label: "⚖️ Artigos / Amparo Legal", placeholder: "Ex.: Art. 5º, XII da CF, Art. 2º da Lei 9.296/96...", isFull: true },
        { id: "au_validade", label: "Válida até", type: "date" },
        { id: "au_motivo", label: "Objeto e Motivo", type: "textarea", req: true, placeholder: "O que está sendo autorizado e por quê..." },
      ],
    },
    {
      id: "concluidos", grupo: "mandados", title: "Mandados Concluídos", svg: "concluido", emoji: "📚", tag: "Cumprimento",
      desc: "Registro do cumprimento (ou não) de mandados expedidos.",
      webhook: "https://discord.com/api/webhooks/1561380382379868270/-fUXxgk-te92XqL-HYI-YDnw3YhB0b_Fj6ReZTblNTRKj7oXhCazprsqcGiQdCvZpr6M",
      cor: 1752220, cargoPadrao: "Oficial de Justiça",
      natureza: "Certidão de Cumprimento", eficacia: "Baixa do Mandado",
      termo: "O OFICIAL DE JUSTIÇA abaixo assinado CERTIFICA, com fé pública, que diligenciou para o cumprimento do mandado referido, com o resultado aqui descrito. O referido é verdade e dou fé.",
      fields: [
        { id: "mc_numero", label: "Nº do Mandado", req: true, placeholder: "Ex.: MAND-2026-123456" },
        { id: "mc_tipo", label: "Tipo de Mandado", type: "options", options: ["Prisão", "Busca e Apreensão", "Condução Coercitiva", "Afastamento do Lar"] },
        { id: "mc_resultado", label: "Resultado", type: "options", options: ["Cumprido", "Cumprido Parcialmente", "Não Cumprido"] },
        { id: "mc_alvo", label: "Alvo", req: true },
        { id: "mc_alvo_id", label: "Passaporte do Alvo" },
        { id: "mc_artigos", label: "⚖️ Artigos do Mandado", placeholder: "Ex.: Art. 3.2 (Roubo)", isFull: true },
        { id: "mc_executor", label: "Executor (Policial/Oficial)" },
        { id: "mc_data", label: "Data do Cumprimento", type: "date" },
        { id: "mc_relato", label: "Relato da Diligência", type: "textarea", placeholder: "Como ocorreu o cumprimento, itens apreendidos, etc..." },
      ],
    },

    /* ---------------- COMUNICAÇÕES & AGENDA ---------------- */
    {
      id: "intimacoes", grupo: "agenda", title: "Intimações", svg: "intimacao", emoji: "📢", tag: "Comunicação",
      desc: "Intimação de réus, testemunhas e partes para comparecimento.",
      webhook: "https://discord.com/api/webhooks/1561380441091612682/9B_xqFN7I5-wnF0wlCPtFRM6mh9sZ6U0V-of8kkRg68r1z7R2WV44itnRrgjSRjDJC40",
      cor: 15105570, cargoPadrao: "Juiz de Direito",
      natureza: "Intimação Judicial", eficacia: "Comparecimento Obrigatório",
      termo: "O JUÍZO DA COMARCA DE BRAVA RP INTIMA a pessoa abaixo qualificada a comparecer no local, data e horário indicados. O não comparecimento injustificado poderá acarretar condução coercitiva e demais sanções legais.",
      fields: [
        { id: "it_numero", label: "Nº da Intimação", type: "numero", prefixo: "INT" },
        { id: "it_qualidade", label: "Intimado na Qualidade de", type: "options", options: ["Réu", "Testemunha", "Vítima", "Autor", "Perito"] },
        { id: "it_intimado", label: "Nome do Intimado", req: true },
        { id: "it_intimado_id", label: "Passaporte do Intimado" },
        { id: "it_artigos", label: "⚖️ Artigos / Objeto da Oitiva", placeholder: "Ex.: Apuração referente ao Art. 3.2 (Roubo)", isFull: true },
        { id: "it_processo", label: "Nº do Processo" },
        { id: "it_local", label: "Local", value: "Fórum de Brava" },
        { id: "it_data", label: "Data", type: "date", req: true },
        { id: "it_hora", label: "Horário", type: "time", req: true },
        { id: "it_motivo", label: "Motivo", type: "textarea", placeholder: "Finalidade do comparecimento..." },
      ],
    },
    {
      id: "agendamentos", grupo: "agenda", title: "Agendamentos", svg: "agenda", emoji: "⏰", tag: "Audiência",
      desc: "Agendamento de audiências, julgamentos e atendimentos do Tribunal.",
      webhook: "https://discord.com/api/webhooks/1561380717747904522/xzLmCshwkBGgvoLsBQJIkWqRpqXi15580B23V5Qn7U7x8Uft4JXLvmllGKT8XIslmk8b",
      cor: 16312092, cargoPadrao: "Escrivão Judicial",
      natureza: "Pauta de Audiência", eficacia: "Agendado",
      termo: "A SECRETARIA DO TRIBUNAL DE JUSTIÇA DA COMARCA DE BRAVA RP CERTIFICA a inclusão do ato abaixo na pauta oficial, ficando as partes cientes da data, horário e local designados.",
      fields: [
        { id: "ag_numero", label: "Nº do Agendamento", type: "numero", prefixo: "AGD" },
        { id: "ag_tipo", label: "Tipo", type: "options", options: ["Audiência de Instrução", "Audiência de Conciliação", "Julgamento", "Audiência de Custódia", "Atendimento"] },
        { id: "ag_partes", label: "Partes", req: true, placeholder: "Ex.: Ministério Público x João Silva" },
        { id: "ag_processo", label: "Nº do Processo" },
        { id: "ag_artigos", label: "⚖️ Artigos / Matéria em Pauta", placeholder: "Ex.: Art. 3.2 (Roubo) ou Art. 186 CC", isFull: true },
        { id: "ag_data", label: "Data", type: "date", req: true },
        { id: "ag_hora", label: "Horário", type: "time", req: true },
        { id: "ag_local", label: "Local", value: "Fórum de Brava — Sala 1", isFull: true },
        { id: "ag_obs", label: "Observações", type: "textarea", placeholder: "Informações adicionais para as partes..." },
      ],
    },
  ],
};
