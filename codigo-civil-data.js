/* ==========================================================
   CÓDIGO CIVIL DA CIDADE DE BRAVA — SDJ
   Minuta Institucional Nº CC-001/2026 | Versão 1.0
   106 Artigos, 10 Livros e 3 Anexos Oficiais
   ========================================================== */

const CODIGO_CIVIL_BRAVA = {
  titulo: "Código Civil da Cidade de Brava",
  subtitulo: "Sistema do Departamento Jurídico • SDJ",
  minuta: "Minuta Institucional Nº CC-001/2026 | Versão 1.0",
  data: "19 de Outubro de 2026",
  presidencia: "Presidência: Zaith • Vice-Presidência: Mike Santaroni",
  lema: "Tecnologia a serviço da justiça.",
  status: "Documento para apreciação e homologação • Sem vigência até publicação oficial",
  preambulo: "A Cidade de Brava, para fins exclusivos de interpretação e organização de seu universo de roleplay, propõe o presente Código Civil para estabelecer regras previsíveis sobre personalidade, identificação, família, relações patrimoniais, contratos, atividades empresariais, responsabilidade civil e solução de controvérsias. Sua aplicação deverá preservar a boa-fé, a convivência respeitosa, a coerência narrativa e os limites técnicos e administrativos do servidor.",

  livros: [
    {
      id: "livro-1",
      numero: "LIVRO I",
      titulo: "Princípios e Aplicação",
      icone: "⚖️",
      artigos: [
        { num: 1, rotulo: "Art. 1º", epigrafe: "Objeto", texto: "Este Código disciplina relações civis entre personagens, famílias, empresas e instituições da Cidade de Brava, nos limites da experiência de GTA Roleplay." },
        { num: 2, rotulo: "Art. 2º", epigrafe: "Destinatários", texto: "Sujeitam-se às suas disposições os cidadãos e as pessoas jurídicas fictícias reconhecidos nos sistemas de Brava, sem prejuízo das regras próprias de cada organização." },
        { num: 3, rotulo: "Art. 3º", epigrafe: "Princípios", texto: "A aplicação do direito civil observará dignidade, igualdade de tratamento, boa-fé, lealdade contratual, responsabilidade, proporcionalidade, transparência e vedação ao enriquecimento sem causa." },
        { num: 4, rotulo: "Art. 4º", epigrafe: "Separação de competências", texto: "Este Código regula consequências civis. Crimes, penas e medidas policiais dependem do Código Penal e das normas próprias; infrações de integrantes do SDJ dependem também do Regimento Interno, sem duplicação automática de punições." },
        { num: 5, rotulo: "Art. 5º", epigrafe: "Hierarquia normativa", texto: "As regras gerais e técnicas da administração do servidor prevalecem nas matérias de sua competência. Nenhum dispositivo autoriza criar itens, transferir propriedades, acessar dados ou executar sanções que os sistemas de Brava não permitam." },
        { num: 6, rotulo: "Art. 6º", epigrafe: "Interpretação", texto: "Na ausência de regra específica, a autoridade competente decidirá de modo fundamentado, por analogia compatível com o RP, usos legítimos da cidade e princípios deste Código, sem inventar infrações retroativamente." },
        { num: 7, rotulo: "Art. 7º", epigrafe: "Prova e registro", texto: "Atos que alterem estado civil, filiação, nome, titularidade registrada ou situação empresarial dependem de protocolo verificável e registro no sistema autorizado." },
        { num: 8, rotulo: "Art. 8º", epigrafe: "Vigência", texto: "A presente minuta só produzirá efeitos normativos após homologação e publicação oficiais, vedada a aplicação retroativa para prejudicar atos regularmente concluídos." }
      ]
    },
    {
      id: "livro-2",
      numero: "LIVRO II",
      titulo: "Das Pessoas e do Registro Civil",
      icone: "👤",
      artigos: [
        { num: 9, rotulo: "Art. 9º", epigrafe: "Personalidade civil", texto: "Toda pessoa-personagem regularmente reconhecida em Brava poderá adquirir direitos e assumir obrigações civis compatíveis com a sua situação no RP." },
        { num: 10, rotulo: "Art. 10", epigrafe: "Identidade", texto: "O registro individual deverá permitir identificação suficiente do personagem, respeitando os mecanismos oficiais do servidor e sem exposição pública de dados sensíveis." },
        { num: 11, rotulo: "Art. 11", epigrafe: "Nome civil", texto: "O nome registrado identifica o cidadão nos atos públicos e privados. Seu uso não poderá servir para falsidade, apropriação de identidade ou ocultação deliberada de obrigações." },
        { num: 12, rotulo: "Art. 12", epigrafe: "Alteração de nome", texto: "A alteração será requerida ao SDJ, mediante identificação, justificativa e pagamento conforme tabela oficial. O ato conservará histórico interno de nomes anteriores, obrigações e vínculos existentes." },
        { num: 13, rotulo: "Art. 13", epigrafe: "Retificação de dados", texto: "Erros materiais poderão ser corrigidos mediante documento ou prova idônea, com registro do motivo, responsável, data e versão corrigida; retificação não se confunde com troca voluntária de nome." },
        { num: 14, rotulo: "Art. 14", epigrafe: "Fotografia de identificação", texto: "Quando prevista no procedimento registral do SDJ, a fotografia do personagem será requisito para emissão ou atualização da respectiva certidão." },
        { num: 15, rotulo: "Art. 15", epigrafe: "Registro de nascimento em Brava", texto: "A certidão poderá ser emitida por advogado habilitado do SDJ mediante identificação dos responsáveis, fotografia exigida e comprovante hospitalar de nascido vivo, sujeito à conferência." },
        { num: 16, rotulo: "Art. 16", epigrafe: "Nascimento em outra cidade", texto: "Será exigido comprovante de nascimento, laudo da instituição responsável ou documento equivalente aceito pela autoridade registral; na falta dele, o pedido ficará pendente de regularização." },
        { num: 17, rotulo: "Art. 17", epigrafe: "Integridade da filiação", texto: "É vedado alterar filiação sem documento idôneo ou decisão competente. Registro falso poderá ser anulado, sem prejuízo de apuração em esfera própria." },
        { num: 18, rotulo: "Art. 18", epigrafe: "Participação do Conselho Tutelar", texto: "Concluído o nascimento, o SDJ encaminhará os dados estritamente necessários ao Conselho Tutelar para catalogação. O setor deverá ser marcado no ticket referente a menores, observado o acesso restrito." },
        { num: 19, rotulo: "Art. 19", epigrafe: "Certidões", texto: "O SDJ poderá emitir primeira via, segunda via e certidão de inteiro teor quando houver suporte no sistema e legitimidade do solicitante; cada expedição será identificada por protocolo." },
        { num: 20, rotulo: "Art. 20", epigrafe: "Privacidade registral", texto: "Registros de menores, filiação, endereço, imagens e provas pessoais não serão divulgados em canais públicos. O Diário Oficial poderá publicar apenas extratos e números de atos, salvo divulgação individual legitimamente autorizada." }
      ]
    },
    {
      id: "livro-3",
      numero: "LIVRO III",
      titulo: "Do Direito de Família",
      icone: "💒",
      artigos: [
        { num: 21, rotulo: "Art. 21", epigrafe: "Formação de família", texto: "Reconhece-se a família constituída por casamento, vínculo parental, adoção válida ou outras relações admitidas pelas regras de Brava. A proteção familiar não dispensa prova dos vínculos para efeitos registrais." },
        { num: 22, rotulo: "Art. 22", epigrafe: "Registro de família", texto: "O registro de denominação familiar ou de núcleo familiar será solicitado ao SDJ, mediante identificação dos responsáveis, conferência de disponibilidade e pagamento da taxa oficial, quando aplicável." },
        { num: 23, rotulo: "Art. 23", epigrafe: "Patente de nome familiar", texto: "A patente de sobrenome constitui reserva administrativa de denominação de família para fins de RP, e não propriedade irrestrita sobre palavras comuns, nomes individuais ou personagens de terceiros." },
        { num: 24, rotulo: "Art. 24", epigrafe: "Colisão de nomes familiares", texto: "Conflitos entre registros serão decididos considerando anterioridade comprovada, boa-fé, risco de confusão, histórico e normas da cidade. O registro não autoriza apropriação de famílias já reconhecidas." },
        { num: 25, rotulo: "Art. 25", epigrafe: "Ingresso e saída de família", texto: "A vinculação de personagem a família depende do consentimento e do procedimento registral cabível, preservados os direitos individuais e os vínculos parentais que não possam ser desfeitos por simples vontade." },
        { num: 26, rotulo: "Art. 26", epigrafe: "Casamento civil", texto: "O casamento entre personagens capazes e concordantes poderá ser celebrado e registrado pela autoridade habilitada, com identificação dos interessados, manifestação inequívoca de vontade e cumprimento da taxa oficial." },
        { num: 27, rotulo: "Art. 27", epigrafe: "Impedimentos", texto: "É vedado casamento sem consentimento, com identidade fraudulenta, com vínculo matrimonial incompatível ainda ativo ou entre pessoas com impedimento familiar reconhecido no sistema." },
        { num: 28, rotulo: "Art. 28", epigrafe: "Regime de bens", texto: "Salvo pacto registral válido, aplica-se a comunhão parcial aos bens comprovadamente adquiridos em conjunto durante o casamento, sempre limitada aos ativos e transferências reconhecidos pelo servidor." },
        { num: 29, rotulo: "Art. 29", epigrafe: "Pacto patrimonial", texto: "Os cônjuges poderão optar por separação de bens ou disciplinar patrimônio mediante acordo escrito, lícito, bilateral e registrado, sem prejudicar direitos anteriores de terceiros." },
        { num: 30, rotulo: "Art. 30", epigrafe: "Deveres conjugais", texto: "Os cônjuges devem observar cooperação, respeito, boa-fé e contribuição consensual para a vida familiar. Nenhum vínculo autoriza coação, controle de contas ou transferência forçada de bens." },
        { num: 31, rotulo: "Art. 31", epigrafe: "Dissolução do casamento", texto: "Divórcio ou anulação dependerão de requerimento formal, comprovação do vínculo e registro da decisão ou acordo; a alteração do estado civil será comunicada aos cadastros pertinentes." },
        { num: 32, rotulo: "Art. 32", epigrafe: "Partilha", texto: "A partilha de patrimônio comum observará provas de aquisição, pactos válidos e acordo entre as partes; na ausência de consenso, será decidida pela autoridade civil competente, respeitadas as possibilidades do sistema." },
        { num: 33, rotulo: "Art. 33", epigrafe: "Proteção de crianças e adolescentes", texto: "O interesse do menor prevalecerá nas decisões sobre filiação, convivência, tutela e adoção, vedados negócios, favores ou cobranças que convertam a criança em objeto de transação." },
        { num: 34, rotulo: "Art. 34", epigrafe: "Adoção", texto: "A instrução, autorização e efetivação de procedimentos de adoção competem exclusivamente ao Conselho Tutelar autorizado em Brava. Advogados não integrantes da equipe não poderão realizar o ato." },
        { num: 35, rotulo: "Art. 35", epigrafe: "Registro e sigilo da adoção", texto: "A conclusão da adoção deverá gerar assentamento próprio pelo setor autorizado, com controle de acesso. Ao SDJ caberá apoiar apenas os procedimentos que lhe forem formalmente atribuídos, sem substituir o Conselho Tutelar." },
        { num: 36, rotulo: "Art. 36", epigrafe: "Guarda e tutela", texto: "Questões de guarda e tutela dependerão de consentimento e avaliação do Conselho Tutelar ou de decisão competente, preservando a segurança e a coerência narrativa do menor." }
      ]
    },
    {
      id: "livro-4",
      numero: "LIVRO IV",
      titulo: "Das Pessoas Jurídicas e da Atividade Empresarial",
      icone: "🏢",
      artigos: [
        { num: 37, rotulo: "Art. 37", epigrafe: "Pessoa jurídica fictícia", texto: "A empresa regularmente cadastrada no CNPJ-RP poderá exercer atividades permitidas pelo servidor e assumir obrigações civis em nome próprio, por intermédio de representante habilitado." },
        { num: 38, rotulo: "Art. 38", epigrafe: "Constituição empresarial", texto: "A abertura de CNPJ-RP será requerida ao SDJ com identificação dos sócios ou responsável, denominação, ramo de atividade, sede ou referência, e comprovante de pagamento da taxa vigente." },
        { num: 39, rotulo: "Art. 39", epigrafe: "Registro e validade", texto: "O CNPJ-RP somente será considerado ativo após validação e lançamento no cadastro competente; o registro civil não substitui licenças ou autorizações operacionais exigidas por outras áreas." },
        { num: 40, rotulo: "Art. 40", epigrafe: "Nome empresarial", texto: "O nome registrado deverá ser suficientemente distinto de outros já reconhecidos, não poderá induzir o público a erro e não garantirá exclusividade sobre termos genéricos ou marcas externas ao RP." },
        { num: 41, rotulo: "Art. 41", epigrafe: "Responsabilidade do representante", texto: "Quem assinar contrato em nome de empresa deverá demonstrar poderes de representação. A utilização indevida de nome empresarial poderá gerar responsabilização pessoal por danos comprovados." },
        { num: 42, rotulo: "Art. 42", epigrafe: "Sociedades", texto: "A entrada e saída de sócios, divisão de participações e regras de administração deverão constar de instrumento escrito, preservando a responsabilidade por obrigações previamente assumidas." },
        { num: 43, rotulo: "Art. 43", epigrafe: "Manutenção do cadastro", texto: "Taxas periódicas do CNPJ-RP seguirão exclusivamente a tabela e as regras oficiais vigentes. O eventual atraso será tratado com comunicação e oportunidade de regularização antes de suspensão, conforme norma específica." },
        { num: 44, rotulo: "Art. 44", epigrafe: "Alterações e encerramento", texto: "Mudança de nome, ramo, responsável ou encerramento exigem pedido formal e atualização cadastral, sem extinguir automaticamente débitos e obrigações já existentes." },
        { num: 45, rotulo: "Art. 45", epigrafe: "Contratação por empresas", texto: "Empresas e cidadãos poderão celebrar contratos de fornecimento, transporte, locação e serviços lícitos, com responsabilidades claras e meios verificáveis de pagamento e entrega." }
      ]
    },
    {
      id: "livro-5",
      numero: "LIVRO V",
      titulo: "Dos Bens, da Posse e da Propriedade",
      icone: "🚗",
      artigos: [
        { num: 46, rotulo: "Art. 46", epigrafe: "Bens civis", texto: "Consideram-se bens, para este Código, dinheiro de RP, veículos, imóveis, mercadorias, direitos e demais ativos admitidos e rastreáveis nos sistemas de Brava." },
        { num: 47, rotulo: "Art. 47", epigrafe: "Titularidade", texto: "A propriedade registrada será comprovada preferencialmente pelo cadastro oficial, documento legítimo ou histórico de transferência reconhecido pelo servidor." },
        { num: 48, rotulo: "Art. 48", epigrafe: "Posse", texto: "A posse material não equivale, por si só, à propriedade. O uso tolerado, o empréstimo e a custódia não transferem titularidade." },
        { num: 49, rotulo: "Art. 49", epigrafe: "Transferência", texto: "A alienação de bens deverá observar consentimento, preço ou causa lícita, entrega e registro quando exigidos. Negócio sem mecanismo técnico suportado não produzirá transferência automática no sistema." },
        { num: 50, rotulo: "Art. 50", epigrafe: "Bens de terceiros", texto: "É vedado vender, prometer ou gravar bem alheio como próprio sem autorização do titular, sem prejuízo da apuração de eventuais delitos em norma penal." },
        { num: 51, rotulo: "Art. 51", epigrafe: "Copropriedade", texto: "A existência de cotitulares deverá ser demonstrada por registro ou acordo verificável; decisões sobre alienação integral exigem anuência de todos os titulares afetados." },
        { num: 52, rotulo: "Art. 52", epigrafe: "Locação", texto: "A cessão temporária de imóvel, veículo ou equipamento dependerá de identificação das partes, prazo, preço, uso permitido, condições de devolução e responsabilidade por danos." },
        { num: 53, rotulo: "Art. 53", epigrafe: "Benfeitorias", texto: "Melhorias ou modificações em bem de terceiro exigem autorização prévia; o reembolso somente será devido quando pactuado ou quando a autoridade competente reconhecer sua necessidade e prova." },
        { num: 54, rotulo: "Art. 54", epigrafe: "Perda e recuperação", texto: "Questões de bens desaparecidos, apreendidos, destruídos ou recuperados deverão respeitar logs, regras do servidor e competências policiais ou administrativas, sem restituição fictícia unilateral." }
      ]
    },
    {
      id: "livro-6",
      numero: "LIVRO VI",
      titulo: "Das Obrigações e dos Contratos",
      icone: "📝",
      artigos: [
        { num: 55, rotulo: "Art. 55", epigrafe: "Obrigação civil", texto: "Toda obrigação deverá ter objeto lícito, possível, identificável e aceito pelas partes, sendo exigível nos termos contratados e das regras da cidade." },
        { num: 56, rotulo: "Art. 56", epigrafe: "Boa-fé contratual", texto: "As partes deverão prestar informações relevantes, cumprir compromissos e não criar obstáculos artificiais à execução do negócio." },
        { num: 57, rotulo: "Art. 57", epigrafe: "Forma do contrato", texto: "Contratos poderão ser comprovados por documento, ticket, proposta aceita, registro no sistema ou outro meio confiável, exigida forma escrita nos casos determinados por norma própria." },
        { num: 58, rotulo: "Art. 58", epigrafe: "Elementos essenciais", texto: "Recomenda-se identificar contratantes, objeto, valor, forma de pagamento, prazo, responsabilidades e solução de controvérsias; cláusulas obscuras serão interpretadas de modo razoável, sem favorecer a fraude." },
        { num: 59, rotulo: "Art. 59", epigrafe: "Pagamento e quitação", texto: "Quem pagar terá direito a comprovante ou declaração de quitação, quando cabível. Pagamento apenas alegado, sem confirmação, não impõe conclusão antecipada do serviço." },
        { num: 60, rotulo: "Art. 60", epigrafe: "Inadimplemento", texto: "A falta de pagamento, entrega ou prestação no prazo ajustado permite exigir cumprimento, rescisão ou reparação proporcional, mediante comprovação." },
        { num: 61, rotulo: "Art. 61", epigrafe: "Mora", texto: "Salvo urgência contratual ou prazo essencial expressamente pactuado, o devedor deverá ser notificado para regularização antes de medidas civis definitivas." },
        { num: 62, rotulo: "Art. 62", epigrafe: "Rescisão", texto: "O distrato poderá ocorrer por acordo; a resolução por descumprimento exige identificação da obrigação violada, aviso e apuração dos valores ou bens a restituir." },
        { num: 63, rotulo: "Art. 63", epigrafe: "Nulidade", texto: "São nulos negócios baseados em identidade falsa, objeto proibido, coação, fraude comprovada ou tentativa de contornar regras técnicas e administrativas do servidor." },
        { num: 64, rotulo: "Art. 64", epigrafe: "Empréstimos e garantias", texto: "Empréstimos de moeda ou bens exigem condições claras; juros, multas, retenção de garantia e execução dependerão de pactuação válida e das limitações impostas pela administração de Brava." },
        { num: 65, rotulo: "Art. 65", epigrafe: "Vedação ao enriquecimento sem causa", texto: "Quem receber indevidamente pagamento ou bem deverá restituí-lo, na extensão efetivamente comprovada e tecnicamente possível." }
      ]
    },
    {
      id: "livro-7",
      numero: "LIVRO VII",
      titulo: "Da Responsabilidade Civil",
      icone: "🛡️",
      artigos: [
        { num: 66, rotulo: "Art. 66", epigrafe: "Dever de reparar", texto: "Quem, por conduta ilícita civil, causar prejuízo comprovado a terceiro poderá ser obrigado a reparar o dano, sem confundir indenização com multa penal." },
        { num: 67, rotulo: "Art. 67", epigrafe: "Requisitos", texto: "A responsabilidade exige demonstração de conduta, dano e nexo causal; circunstâncias do RP, culpa concorrente e provas de registro deverão ser consideradas." },
        { num: 68, rotulo: "Art. 68", epigrafe: "Danos patrimoniais", texto: "A indenização por prejuízo material terá como limite inicial a perda demonstrada por transações, registros, notas ou outros elementos verificáveis." },
        { num: 69, rotulo: "Art. 69", epigrafe: "Danos extrapatrimoniais", texto: "Ofensa grave à reputação de personagem ou violação relevante de direitos civis poderá justificar medida reparatória proporcional, mediante fundamentação e sem valores automáticos." },
        { num: 70, rotulo: "Art. 70", epigrafe: "Acidentes e danos a veículos", texto: "Colisões ou prejuízos em bens serão analisados conforme comportamento das partes, evidências, regras de trânsito RP e possibilidades de reparação existentes no servidor." },
        { num: 71, rotulo: "Art. 71", epigrafe: "Responsabilidade empresarial", texto: "Empresas responderão pelos compromissos assumidos por seus representantes autorizados dentro da atividade, sem afastar apuração individual de fraude ou abuso." },
        { num: 72, rotulo: "Art. 72", epigrafe: "Mitigação do prejuízo", texto: "A pessoa lesada deverá agir de maneira razoável para não aumentar deliberadamente o dano; a autoridade poderá considerar esse comportamento no cálculo reparatório." },
        { num: 73, rotulo: "Art. 73", epigrafe: "Acordo reparatório", texto: "As partes poderão formalizar ressarcimento, pedido de desculpas, devolução ou obrigação de fazer, desde que livres e compatíveis com as ferramentas do RP." }
      ]
    },
    {
      id: "livro-8",
      numero: "LIVRO VIII",
      titulo: "Das Sucessões e do Patrimônio Familiar",
      icone: "📜",
      artigos: [
        { num: 74, rotulo: "Art. 74", epigrafe: "Sucessão civil", texto: "A sucessão patrimonial só será considerada quando o falecimento permanente ou encerramento narrativo do personagem for reconhecido conforme as regras oficiais de Brava." },
        { num: 75, rotulo: "Art. 75", epigrafe: "Ausência de sucessão automática", texto: "Desmaios, hospitalizações, mortes temporárias e respawns comuns do jogo não provocam transmissão de bens nem encerramento de vínculos civis." },
        { num: 76, rotulo: "Art. 76", epigrafe: "Testamento de RP", texto: "Personagem capaz poderá declarar disposição patrimonial por escrito e com identificação, sujeita à legitimidade dos bens e aos limites técnicos do servidor." },
        { num: 77, rotulo: "Art. 77", epigrafe: "Herdeiros e interessados", texto: "Na ausência de disposição válida, a autoridade competente apreciará os vínculos familiares comprovados e as normas aplicáveis, assegurando contraditório a interessados identificáveis." },
        { num: 78, rotulo: "Art. 78", epigrafe: "Dívidas e inventário", texto: "O patrimônio transferível deverá ser apurado antes da partilha, observando obrigações comprovadas e vedada a criação de ativos não existentes no sistema." }
      ]
    },
    {
      id: "livro-9",
      numero: "LIVRO IX",
      titulo: "Do Processo e da Solução de Conflitos Civis",
      icone: "🏛️",
      artigos: [
        { num: 79, rotulo: "Art. 79", epigrafe: "Acesso à solução civil", texto: "Qualquer cidadão poderá solicitar orientação, conciliação, registro ou apreciação de conflito ao setor competente, observados os canais oficiais do SDJ." },
        { num: 80, rotulo: "Art. 80", epigrafe: "Início do procedimento", texto: "O requerimento deverá indicar partes envolvidas, relato objetivo, pedido e provas disponíveis; o responsável registrará protocolo e classificará a natureza civil do caso." },
        { num: 81, rotulo: "Art. 81", epigrafe: "Competência", texto: "Advogados orientam e representam; decisões contenciosas serão proferidas por juiz ou autoridade competente formalmente investida nas funções previstas na organização do servidor." },
        { num: 82, rotulo: "Art. 82", epigrafe: "Imparcialidade", texto: "Autoridade com interesse pessoal direto, participação anterior relevante ou conflito evidente deverá declarar impedimento e encaminhar o caso para redistribuição." },
        { num: 83, rotulo: "Art. 83", epigrafe: "Conciliação prévia", texto: "Sempre que viável, as partes serão convidadas a negociar solução voluntária antes de julgamento, sem prejuízo de providências urgentes legalmente cabíveis." },
        { num: 84, rotulo: "Art. 84", epigrafe: "Contraditório e defesa", texto: "Ninguém poderá sofrer condenação civil definitiva sem oportunidade razoável de conhecer a alegação, examinar as provas apresentadas e responder." },
        { num: 85, rotulo: "Art. 85", epigrafe: "Meios de prova", texto: "Poderão ser considerados documentos, comprovantes, logs fornecidos legitimamente, gravações autorizadas, testemunhos coerentes e registros do SDJ, avaliados quanto à integridade e à pertinência." },
        { num: 86, rotulo: "Art. 86", epigrafe: "Provas ilícitas e fabricadas", texto: "Provas obtidas mediante acesso não autorizado, adulteração comprovada ou exploração indevida de falhas do servidor não serão admitidas para fundamentar decisão civil." },
        { num: 87, rotulo: "Art. 87", epigrafe: "Audiência", texto: "As sessões deverão indicar data, autoridade responsável, partes e objeto, garantindo organização da fala, registro sucinto e respeito mútuo." },
        { num: 88, rotulo: "Art. 88", epigrafe: "Decisão", texto: "Toda decisão deverá apresentar identificação do caso, fatos considerados, fundamentos, determinação objetiva, prazo de cumprimento e autoridade responsável." },
        { num: 89, rotulo: "Art. 89", epigrafe: "Medidas urgentes", texto: "A autoridade competente poderá recomendar preservação de provas ou suspensão temporária de ato registral controverso, sem invadir competências policiais, administrativas ou mecanismos técnicos do servidor." },
        { num: 90, rotulo: "Art. 90", epigrafe: "Recurso", texto: "Da decisão civil caberá revisão à instância superior disponível na estrutura de Brava. O prazo e o procedimento serão fixados em norma processual específica e informados na notificação da decisão." },
        { num: 91, rotulo: "Art. 91", epigrafe: "Cumprimento", texto: "O cumprimento de acordo ou decisão ocorrerá pelos meios legítimos e tecnicamente disponíveis, vedadas apreensões, débitos ou transferências efetuados por iniciativa privada sem autorização." },
        { num: 92, rotulo: "Art. 92", epigrafe: "Arquivamento", texto: "O caso será encerrado após conclusão, desistência válida ou decisão definitiva, preservando-se o histórico necessário à auditoria e ao eventual recurso." }
      ]
    },
    {
      id: "livro-10",
      numero: "LIVRO X",
      titulo: "Dos Atos do SDJ e das Disposições Finais",
      icone: "📋",
      artigos: [
        { num: 93, rotulo: "Art. 93", epigrafe: "SDJ e atendimento registral", texto: "Compete ao SDJ, dentro de suas atribuições reconhecidas, orientar cidadãos, conferir documentação, registrar atos civis, emitir certidões e manter histórico de seus atendimentos." },
        { num: 94, rotulo: "Art. 94", epigrafe: "Atendimento por ticket", texto: "Cada ticket terá advogado responsável identificável. A intervenção de outro integrante dependerá de transferência, solicitação de apoio ou determinação superior, segundo o Regimento Interno." },
        { num: 95, rotulo: "Art. 95", epigrafe: "Verificação de pagamento", texto: "Serviços remunerados exigem pagamento e conferência do comprovante antes de sua execução, salvo exceção expressamente autorizada pela autoridade competente." },
        { num: 96, rotulo: "Art. 96", epigrafe: "Identificação do agente", texto: "Nenhum integrante poderá atuar como advogado do SDJ sem a carteirinha funcional válida e os requisitos de habilitação previstos nas normas internas." },
        { num: 97, rotulo: "Art. 97", epigrafe: "Publicação e transparência", texto: "O Diário Oficial do SDJ divulgará atos e balanços registrais autorizados, inclusive retificações, sem expor desnecessariamente informações pessoais ou referentes a menores." },
        { num: 98, rotulo: "Art. 98", epigrafe: "Correção e cancelamento", texto: "Atos registrais contestados poderão ser retificados, suspensos ou anulados por autoridade competente mediante motivação, registro do histórico e oportunidade de esclarecimento." },
        { num: 99, rotulo: "Art. 99", epigrafe: "Taxas e valores", texto: "Valores de certidões, alteração de nome, registro familiar, CNPJ-RP, casamento e demais serviços serão definidos na tabela de preços vigente, publicada separadamente; este Código não fixa tarifas permanentes." },
        { num: 100, rotulo: "Art. 100", epigrafe: "Repasse interno", texto: "O depósito obrigatório de 20% dos serviços e as responsabilidades financeiras dos advogados são matérias do Regimento Interno do SDJ e não constituem taxa adicional ao cidadão." },
        { num: 101, rotulo: "Art. 101", epigrafe: "Conduta funcional", texto: "Advogados e demais integrantes devem tratar o cidadão com urbanidade, preservar a hierarquia legítima e seguir os protocolos; infrações funcionais serão avaliadas segundo o Regimento Interno." },
        { num: 102, rotulo: "Art. 102", epigrafe: "Competência do Conselho Tutelar", texto: "A competência exclusiva do Conselho Tutelar para adoção e sua atuação nos registros de menores não poderão ser afastadas por atendimento informal, interesse do requerente ou autorização de agente sem poderes." },
        { num: 103, rotulo: "Art. 103", epigrafe: "Prevenção à corrupção", texto: "É vedada a utilização de registros, posições, valores, certidões ou serviços do SDJ para vantagens indevidas, cabendo apuração proporcional, fundamentada e pelos canais institucionais próprios." },
        { num: 104, rotulo: "Art. 104", epigrafe: "Atos anteriores", texto: "Registros anteriormente realizados e válidos segundo as regras então vigentes permanecem reconhecidos, ressalvados fraude demonstrada, erro material e revisão pelos meios oficiais." },
        { num: 105, rotulo: "Art. 105", epigrafe: "Omissões e revisão", texto: "Casos omissos serão submetidos à autoridade competente e, quando necessário, à Administração de Brava. A Presidência do SDJ poderá propor alterações, sem atribuir a esta minuta força normativa antes de aprovação." },
        { num: 106, rotulo: "Art. 106", epigrafe: "Publicação", texto: "Uma vez homologado pela instância competente, o Código Civil terá sua data de entrada em vigor indicada em ato oficial e passará a integrar os materiais de consulta do SDJ." }
      ]
    }
  ],

  anexos: [
    {
      id: "anexo-1",
      titulo: "ANEXO I — Matriz de Competências Operacionais",
      tabela: [
        { servico: "Certidão de nascimento", setor: "Advogado habilitado do SDJ", regra: "Foto e comprovante hospitalar de nascido vivo em Brava; documento equivalente para origem externa" },
        { servico: "Catalogação de menores", setor: "Conselho Tutelar", regra: "Acionamento após registro, com informações restritas" },
        { servico: "Adoção", setor: "Conselho Tutelar autorizado", regra: "Exclusividade; advogado comum não realiza adoção" },
        { servico: "Alteração de nome", setor: "SDJ", regra: "Identificação, protocolo, histórico e tabela vigente" },
        { servico: "Casamento e certidões", setor: "SDJ / autoridade habilitada", regra: "Consentimento, documentação, registro e disponibilidade do serviço" },
        { servico: "Registro e patente de família", setor: "SDJ", regra: "Verificação de anterioridade e disponibilidade" },
        { servico: "CNPJ-RP e alterações", setor: "SDJ / órgão empresarial autorizado", regra: "Identificação de responsável, registro, tabela e permissões do servidor" },
        { servico: "Conciliação civil", setor: "Setor competente", regra: "Acordo voluntário registrado" },
        { servico: "Julgamento de conflito civil", setor: "Juízo / autoridade autorizada", regra: "Imparcialidade, defesa, prova e decisão fundamentada" },
        { servico: "Comunicação pública", setor: "Diário Oficial do SDJ", regra: "Extratos sem exposição indevida de dados" }
      ]
    },
    {
      id: "anexo-2",
      titulo: "ANEXO II — Procedimento Padrão de Atendimento",
      passos: [
        "Receber o cidadão em canal oficial e identificar o responsável pelo ticket.",
        "Verificar a competência do SDJ ou encaminhar ao Conselho Tutelar ou outro órgão devido.",
        "Conferir identificação, fotografias e documentos exigidos para o ato.",
        "Informar o valor previsto na tabela atualizada, quando houver cobrança.",
        "Confirmar o pagamento antes de realizar serviço remunerado.",
        "Registrar o ato no sistema do SDJ com data, responsável e protocolo.",
        "Encaminhar ao Conselho Tutelar os registros pertinentes a menores, preservando sigilo.",
        "Disponibilizar comprovante ou certidão e orientar o cidadão sobre retificações.",
        "Encerrar o ticket, registrar dados do serviço para consolidação diária e observar o repasse interno previsto no Regimento."
      ]
    },
    {
      id: "anexo-3",
      titulo: "ANEXO III — Modelo Mínimo de Petição ou Requerimento Civil",
      modeloTexto: "Protocolo: __________________________\nRequerente: _________________________\nParte contrária (se houver): _____________\nAssunto: ____________________________\nRelato dos fatos: ______________________\nPedido: _____________________________\nDocumentos e provas: _________________\nResponsável pelo atendimento: ___________\nData e resultado: ______________________\n\nPRESIDÊNCIA DO SDJ — PARA APRECIAÇÃO\nZaith — Presidente\nMike Santaroni — Vice-Presidente\nTecnologia a serviço da justiça.\nMINUTA PARA ANÁLISE • BRAVA ROLEPLAY • NÃO CONSTITUI LEI VIGENTE ATÉ HOMOLOGAÇÃO."
    }
  ]
};
