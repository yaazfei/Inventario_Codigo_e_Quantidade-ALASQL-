#####  Queiroz Galvão  #####

- Base do Consulta-Produto/L2R

######################## Descrição ATUAL ########################

1 – Carregar em memória os dois arquivos (Lista de Bens.xlsx e Lista de locais.xlsx) (estão dentro da pasta)
2 – Ao iniciar o aplicativo, solicitar ao usuário o local em que ele está (Lista de Locais.xlss). Apresentar na tela o COD_LOCAL e o DESC_LOCAL.
3 – Ao ler o código de barras do bem (CHAPA), apresentar na tela a DESC_BEM e validar o COD_LOCAL do arquivo (Lista de Bens.xlsx) contra o local informado no Passo 1.
4 – Caso o cod do local esteja diferente, dar a opção ao usuário de trocá-lo: O COD_LOCAL informado diverge do cadastro. Deseja atualizar?



######################## Descrição antiga ########################


A solução consiste de duas tabelas, uma com o local e outra com os bens para validação do local em que o bem se encontra.
 
Passo a passo:
1 – Ler o código do usuário. Validar na tabela. O Guilherme ficou de verificar se haverá esta etapa.
2 – Ler o código do bem.
3 – Apresentar o local do bem.
4 – Perguntar se está certo ou não. Se estiver certo, não altera a lista em memória e volta para a leitura do próximo bem. Caso esteja errado, permitir a atualização do local e ir para a leitura do próximo bem.
5 – Em qualquer momento, encerrar a aplicação.
6 – O usuário poderá conectar o coletor ao micro e copiar o arquivo que foi atualizado durante o inventário.