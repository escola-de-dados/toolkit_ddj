# Caixa de Ferramentas do Jornalismo de Dados

![Logo da caixa de ferramentas](https://escola-de-dados.github.io/toolkit_ddj/_next/static/images/logo-caixadeferramentas-362311af4581c907b4d6c126f1182d2b.png)

## Índice
- [Caixa de Ferramentas do Jornalismo de Dados](#caixa-de-ferramentas-do-jornalismo-de-dados)
  - [Índice](#índice)
  - [O que é a Caixa de Ferramentas](#o-que-é-a-caixa-de-ferramentas)
  - [Instalação](#instalação)
  - [Como colaborar](#como-colaborar)
    - [Estrutura do arquivo](#estrutura-do-arquivo)
    - [Parâmetros](#parâmetros)
    - [Contribuindo direto no site do GitHub](#contribuindo-direto-no-site-do-github)
    - [Contribuindo após clonar o projeto para a sua máquina pessoal](#contribuindo-após-clonar-o-projeto-para-a-sua-máquina-pessoal)


## O que é a Caixa de Ferramentas

A **Caixa de Ferramentas do Jornalismo de Dados** é um projeto elaborado pela **Escola de Dados**, iniciativa da **Open Knowledge Brasil**.

O objetivo desta página é **divulgar** de forma prática **as ferramentas no ecossistema de tecnologia que se adequam à atividade do jornalismo de dados**. As ferramentas são separadas por categorias e plataformas, além de serem identificadas como ferramentas de código aberto ou não.

A Caixa de Ferramentas é um trabalho colaborativo. Se você tem uma sugestão de ferramenta que se encaixa na premissa da página, mas não está presente na base, **você pode contribuir com a lista seguindo as orientações a seguir**.


## Instalação

1 - Clone o projeto para uma pasta local e entre na nova pasta criada:

```bash
git clone https://github.com/escola-de-dados/toolkit_ddj.git
```

```bash
cd toolkit_ddj
```

2 - Rode `npm config set @bit:registry https://node.bit.dev` para adicionar o bit.dev como *registry.*

3 - Rode `npm install` para instalar todas as dependências.

4 - Rode `npm run dev` para lançar a ferramenta localmente no endereço [http://localhost:3000/toolkit_ddj](http://localhost:3000/toolkit_ddj)

<br>

## Como colaborar

A Caixa de Ferramentas do Jornalismo de Dados é uma base colaborativa. Você pode adicionar novas ferramentas que se encaixem nas categorias e plataformas já especificadas.

### Estrutura do arquivo

A lista das ferramentas fica no arquivo YAML `docs/data/tools.yml` e cada ferramenta tem a seguinte estrutura:

```yaml
-
    id: 0
    nome: "Nome da ferramenta"
    link: https://exemplo.com.br
    github:
    descrição: "Descrição da ferramenta"
    categoria: Cartografia
    plataforma:
        - Web
    open-source: False
    destaque: False
    desativado: False
```
### Parâmetros

| Parâmetro | Formato | Uso |
|:--:|:--:|--|
| Id | number | É incrementado em 1 a cada ferramenta adicionada. Se a última ferramenta na base tem o `id` **153**, adicione a nova ferramenta com o `id` **154**. |
| Nome | string | Insira o nome da ferramenta entre aspas duplas (`""`). |
| Link | string | Site principal da ferramenta. Se não houver site, pode ser o link para o repositório. |
| Github | string | Repositório da ferramenta se ela for de código aberto (não precisa ser Github, podem ser outros repositórios de código). Se não houver repositório é só deixar em branco. |
| Categoria | string | Cada ferramenta possui somente uma das categorias abaixo: <ul><li>Visualização</li><li>Obtenção</li><li>Análise</li><li>Cartografia</li><li>Publicação</li><li>Limpeza</li><li>Redes</li><li>Multi (Que faz mais de uma das funções anteriores)</li></ul> |
| Plataforma | array | Cada ferramenta pode possuir uma ou mais das plataformas abaixo: <ul><li>Windows</li><li>MacOS</li><li>Linux</li><li>iOS</li><li>Android</li><li>Web</li></ul> As ferramentas são listadas uma abaixo da outra e precedidas por um `-`.  |
| Open-source | boolean | Identifica se a ferramenta é Open Source (Código aberto) ou não. Pode ser `True` ou `False`.  |
| Destaque | boolean | Identifica as ferramentas que são "escolhas do editor". **Para novas contribuições deve ser sempre** `False`.  |
| Desativado | boolean | Identifica se a ferramenta está em funcionamento e desenvolvimento ativo. **Para novas contribuições deve ser sempre** `True`. |

**Cada ferramenta pode ter apenas uma categoria e uma ou mais plataformas.**

<br>

### Contribuindo direto no site do GitHub

1 - Navegue pelos arquivos do repositório até o arquivo `docs/data/tools.yml`

2 - Clique no botão "Editar" no topo do arquivo:

![Botão "Editar"](https://user-images.githubusercontent.com/85042317/137641970-b4231153-06fc-4940-8e9c-f5100f419af6.png)

3 - Insira ou atualize a ferramenta desejada abaixo da última ferramenta no arquivo.

Na imagem abaixo foi adicionada a ferramenta "Nova ferramenta" abaixo da última da lista, "Datoris Chrome Extension":

![Adicionando nova ferramenta](https://user-images.githubusercontent.com/85042317/137642010-bc56a204-ca9b-4179-abe1-e83e6d97fdaa.png)

4 - Insira um título no campo que aparece com o texto padrão "Update tools.yml"

O título vai ser:

- **Add tool** (Para adicionar uma ou mais ferramentas)
- **Update tool** (Para atualizar uma ou mais ferramentas)

![Dando um título ao commit](https://user-images.githubusercontent.com/85042317/137642057-11cc2258-d703-48a9-bbac-77822cf51afd.png)

5 - Clique no botão verde "Propose changes"

6 - Na tela seguinte clique no botão verde "Create pull request"

7 - Faça um Pull Request com as seguintes especificações:

**Base:** develop

**Título:**
| Título | Uso |
| --- | --- |
| Add Tool - NOME_DA_FERRAMENTA | Para adicionar uma ferramenta só |
| Add Tools - NÚMERO_DE_FERRAMENTAS | Para adicionar mais de uma ferramenta |
| Update Tool - NOME_DA_FERRAMENTA | Para atualizar uma ferramenta só |
| Update Tools - NÚMERO_DE_FERRAMENTAS | Para atualizar mais de uma ferramenta |

<br>

**Comentário:**
| Seguir a estrutura abaixo: |
|---|
| **Nome da ferramenta:** NOME_DA_FERRAMENTA <br><br> **Descrição da ferramenta:** DESCRIÇÃO_FERRAMENTA <br><br> (**Motivo para adicionar à base/Motivo para atualizar a ferramenta):** MOTIVO <br><br> **Mais informações sobre a ferramenta:** URL_PRINCIPAL_DA_FERRAMENTA <br><br> **Atualização realizada (Caso se aplique):** DESCRIÇÃO_ATUALIZAÇÃO <br><br> ————————————
</div>

**Repita a estrutura para cada ferramenta adicionada/atualizada.**

Confira o exemplo abaixo:

![Exemplo de Pull Request](https://user-images.githubusercontent.com/85042317/137642087-52530f33-d9b0-485a-8cb7-9ed69634df11.png)

<br>

### Contribuindo após clonar o projeto para a sua máquina pessoal

1 - Mude para uma nova branch derivada da main:

```bash
git checkout -m NOME_DA_NOVA_BRANCH
```

Seguindo o padrão de nome:

- `SEU_USUARIO/addTool` → Para adicionar uma ou mais novas ferramentas
- `SEU_USUARIO/updateTool` → Para atualizar os dados de uma ou mais ferramentas

2 - Abra o arquivo `docs/data/tools.yml`

3 - Adicione ou atualize as ferramentas de acordo com a [estrutura padrão](#estrutura-do-arquivo) e usando os [parâmetros](#parâmetros) disponíveis.

4 - Salve o arquivo `tools.yml` 

5 - Faça um *commit* e *push* das alterações.

6 - Faça um Pull Request no GitHub com as seguintes especificações:

**Base:** develop

**Título:**
| Título | Uso |
| --- | --- |
| Add Tool - NOME_DA_FERRAMENTA | Para adicionar uma ferramenta só |
| Add Tools - NÚMERO_DE_FERRAMENTAS | Para adicionar mais de uma ferramenta |
| Update Tool - NOME_DA_FERRAMENTA | Para atualizar uma ferramenta só |
| Update Tools - NÚMERO_DE_FERRAMENTAS | Para atualizar mais de uma ferramenta |

<br>

**Comentário:**
| Seguir a estrutura abaixo |
|---|
| **Nome da ferramenta:** NOME_DA_FERRAMENTA <br><br> **Descrição da ferramenta:** DESCRIÇÃO_FERRAMENTA <br><br> (**Motivo para adicionar à base/Motivo para atualizar a ferramenta):** MOTIVO <br><br> **Mais informações sobre a ferramenta:** URL_PRINCIPAL_DA_FERRAMENTA <br><br> **Atualização realizada (Caso se aplique):** DESCRIÇÃO_ATUALIZAÇÃO <br><br> ————————————
</div>

**Repita a estrutura para cada ferramenta adicionada/atualizada.**

Confira um exemplo abaixo:

![Exemplo de Pull Request](https://user-images.githubusercontent.com/85042317/137642087-52530f33-d9b0-485a-8cb7-9ed69634df11.png)