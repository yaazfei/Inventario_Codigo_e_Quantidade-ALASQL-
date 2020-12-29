# **Inventario SIMPLES com ALASQL** #

- Base do Inventario QG


##  **Descrição**  ##

* 1 – Carrega em memória o arquivo do dia atual (se houver) que está dentro da pasta ou cria um arquivo do zero se ele já não existir.
* 2 – Ao iniciar o aplicativo, solicita ao usuário o código e a quantidade do produto.
* 3 – O produto é armazenado ao salvar (anexando no arquivo existe ou no novo). A data da consulta será informada no nome do arquivo criado (no lugar do 'dd/mm/aaaa'). A cada dia de consulta um novo arquivo será criado dentro do diretório.
* 4 – Após salvar, a tela mostrará um aviso rápido de sucesso e outro produto poderá ser salvo.
* 5 – Ao tentar salvar um arquivo com um código já existente, uma alerta será emitido para escolha de incrementar na quantidade do produto ou ignorar e deixar somente os valores antigos salvos.


##  **Detalhes**  ##

* – O .csv está sendo salvo sem cabeçalho, somente com os valores de CÓDIGO e QUANTIDADE separados por ponto e vírgula (;).
* – Os códigos estão sendo salvos em maiúsculo.
* – A aplicação lê somente arquivos .csv.
* – O arquivo na pasta possuirá o nome: "Inventario_dd-mm-aaaa.csv", que informará o nome do arquivo junto com o dia, mês e ano atual.



--------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
