**Versão:** 1.0  
**Status:** Draft para desenvolvimento  
**Tipo:** Aplicação Web + API  
**Escopo:** MVP / V1

---

# 1. Visão geral

## 1.1 Nome provisório

**Dynamic Documents**

Nome comercial poderá ser definido posteriormente.

---

## 1.2 Resumo

A aplicação será uma plataforma para **criação, gerenciamento, preenchimento e geração de documentos dinâmicos**.

O usuário poderá criar um documento do zero utilizando um editor visual baseado em **drag and drop**, adicionando campos como texto, número, data, imagem e arquivo.

Também será possível iniciar um documento a partir de um **PDF ou DOCX existente**. Na primeira versão, o arquivo importado será tratado como plano de fundo, permitindo que campos dinâmicos sejam posicionados sobre ele.

Cada documento poderá ser publicado através de um link, permitindo que usuários preencham os campos manualmente.

Além disso, a aplicação disponibilizará uma **API REST** para que sistemas externos consultem os documentos, descubram seus campos e enviem dados para geração dos documentos.

A plataforma também possuirá um catálogo de **campos personalizados**, permitindo que conceitos específicos do sistema consumidor — como `nomePaciente`, `nomeEmpresa`, `numeroContrato` etc. — sejam utilizados nos documentos sem que a plataforma precise conhecer a origem ou significado desses dados.

---

# 2. Problema

Atualmente, a criação de contratos e documentos personalizados depende de processos manuais ou da intervenção de desenvolvedores.

Isso gera:

- alto custo de manutenção;
- dependência da equipe de desenvolvimento;
- dificuldade para realizar alterações;
- demora na criação de novos documentos;
- baixa flexibilidade;
- duplicação de lógica;
- dificuldade para integrar documentos com outros sistemas.

Por exemplo, uma alteração simples em um contrato pode exigir:

```text
Solicitação
    ↓
Desenvolvedor
    ↓
Alteração do template
    ↓
Deploy
    ↓
Homologação
    ↓
Produção
```

A aplicação pretende transformar isso em:

```text
Usuário
   ↓
Editor visual
   ↓
Altera documento
   ↓
Publica nova versão
```

Sem necessidade de alteração de código.

---

# 3. Objetivo do produto

O principal objetivo é permitir que usuários **criem e mantenham documentos dinâmicos sem depender de desenvolvedores**.

A plataforma deverá:

1. Criar documentos visualmente.
2. Importar PDF/DOCX existentes.
3. Adicionar campos dinâmicos.
4. Configurar aparência e validações.
5. Publicar documentos.
6. Disponibilizar formulários para preenchimento.
7. Persistir os preenchimentos.
8. Gerar PDF preenchido.
9. Disponibilizar os documentos através de API.
10. Permitir integração com sistemas externos.
11. Manter histórico/versionamento dos documentos.
12. Permitir a criação de campos personalizados.

---

# 4. Não objetivos da V1

Algumas funcionalidades estão relacionadas ao produto, mas não devem fazer parte do MVP.

### Fora do escopo inicial

- edição do conteúdo textual original de PDFs;
- editor semelhante ao Microsoft Word/Google Docs;
- edição avançada de DOCX;
- assinatura digital;
- workflow de aprovação;
- colaboração em tempo real;
- múltiplas fontes externas de dados;
- integrações configuráveis com bancos de dados;
- regras condicionais complexas;
- OCR avançado;
- geração de documentos através de IA;
- aplicativo mobile nativo.

Essas funcionalidades poderão ser consideradas posteriormente.

---

# 5. Público-alvo

A aplicação será destinada principalmente a organizações que precisam gerar documentos padronizados e frequentemente preenchidos.

Exemplos:

- empresas;    
- hospitais e clínicas;
- escritórios;
- departamentos administrativos;
- departamentos jurídicos;
- empresas de RH;
- empresas financeiras;
- sistemas ERP;
- sistemas CRM;
- plataformas SaaS.

---

# 6. Personas

## 6.1 Administrador

Responsável por administrar a aplicação.

Pode:

- criar documentos;    
- editar documentos;
- publicar versões;
- configurar campos;
- consultar preenchimentos;
- administrar usuários;
- configurar acesso.

---

## 6.2 Criador de documentos

Responsável por criar e manter templates.

Exemplo:

> Analista administrativo que conhece o processo de negócio, mas não sabe programar.

---

## 6.3 Usuário preenchendo documento

Usuário que acessa um link e preenche informações.

Inicialmente:

- não precisa possuir conta;    
- acesso público;
- utiliza formulário web.

---

## 6.4 Sistema consumidor

Sistema externo que utiliza a API.

Exemplo:

```text
ERP
CRM
Sistema hospitalar
Sistema jurídico
Sistema interno
```

Esse sistema será responsável por fornecer dados que a plataforma não consegue obter sozinha.

---

# 7. Conceitos fundamentais

A aplicação terá os seguintes conceitos principais:

```text
Document
   │
   └── Document Version
           │
           ├── Pages
           └── Fields

Custom Field Definition

Submission
   │
   └── Generated Document
```

---

# 8. Documento

Um **Document** representa o documento lógico.

Exemplo:

```text
Contrato de Prestação de Serviços
```

Um documento não será alterado diretamente após publicação.

Ele possuirá versões.

```text
Contrato
├── V1
├── V2
└── V3
```

---

# 9. Versão do documento

Cada alteração relevante no template deverá gerar uma nova versão.

Exemplo:

```text
Contrato
│
├── V1 — publicada
│
├── V2 — publicada
│
└── V3 — rascunho
```

Um preenchimento sempre estará associado a uma versão específica.

Isso garante que documentos antigos continuem reproduzíveis.

---

# 10. Requisito de versionamento

### RF-001

O sistema deve permitir criar versões de um documento.

### RF-002

Uma versão publicada não poderá ser alterada.

### RF-003

Alterações em uma versão publicada deverão resultar em uma nova versão.

### RF-004

Cada preenchimento deverá armazenar a versão utilizada.

### RF-005

A geração de um documento antigo deverá utilizar exatamente a versão correspondente ao preenchimento.

---

# 11. Criação de documentos

O usuário deverá poder iniciar um documento de três maneiras:

### Opção 1 — Documento vazio

```text
Novo documento
    ↓
Página vazia
```

### Opção 2 — PDF

```text
Upload PDF
    ↓
PDF como background
    ↓
Adicionar campos
```

### Opção 3 — DOCX

```text
Upload DOCX
    ↓
Conversão/renderização
    ↓
Background
    ↓
Adicionar campos
```

---

# 12. Editor visual

O sistema deverá possuir um editor baseado em **drag and drop**.

O usuário poderá:

- adicionar campos;
- mover campos;
- redimensionar campos;
- excluir campos;
- selecionar campos;
- editar propriedades;
- visualizar o documento;
- salvar alterações;
- visualizar uma prévia.

---

# 13. Configuração da página

Na V1 deverão existir:

### Tamanho

- A4;
- A5;
- Letter;
- Legal.

### Orientação

- Portrait;
- Landscape.

### Margens

- superior;
- inferior;
- esquerda;
- direita.

A arquitetura deverá permitir novos formatos posteriormente.

---

# 14. Campos

O sistema deverá suportar inicialmente:

|Campo|Descrição|
|---|---|
|TEXT|Texto|
|NUMBER|Número|
|DATE|Data|
|IMAGE|Imagem|
|FILE|Arquivo|

Tipos futuros:

- boolean;
- currency;
- email;
- phone;
- CPF;
- CNPJ;
- assinatura;
- QR Code;
- barcode.

---

# 15. Propriedades dos campos

Todos os campos deverão possuir propriedades compatíveis com seu tipo.

Exemplo:

```text
Campo: Nome do cliente

Tipo:
TEXT

Key:
nomeCliente

Obrigatório:
Sim

Fonte:
Manual

Posição:
X/Y

Dimensão:
Width/Height

Fonte:
Arial

Tamanho:
12

Cor:
#000000

Negrito:
Não

Itálico:
Não
```

---

# 16. Formatação

Campos de texto deverão permitir:

- família da fonte;
- tamanho;
- cor;
- negrito;
- itálico;
- sublinhado;
- alinhamento;
- quebra de linha;
- alinhamento vertical.

---

# 17. Máscaras

Quando aplicável, campos deverão permitir máscaras.

Exemplos:

```text
CPF
000.000.000-00

CNPJ
00.000.000/0000-00

CEP
00000-000

Telefone
(00) 00000-0000
```

A máscara será uma propriedade do campo e não necessariamente um tipo de dado.

---

# 18. Validações

O sistema deverá permitir validações.

### Texto

- obrigatório;
- tamanho mínimo;
- tamanho máximo;
- regex.

### Número

- obrigatório;
- mínimo;
- máximo;
- casas decimais.

### Data

- obrigatório;
- data mínima;
- data máxima.

---

# 19. Campos personalizados

A plataforma deverá permitir que o administrador crie definições de campos específicos do seu domínio.

Exemplo:

```text
nomePaciente
nomeEmpresa
numeroContrato
codigoCliente
numeroProntuario
```

Esses campos possuirão:

```text
Key
Label
Tipo
Validações
Formatação
Input Mode
```

---

# 20. Separação entre tipo e significado

O sistema não deverá conhecer o significado comercial do campo.

Por exemplo:

```text
nomePaciente
```

será apenas:

```text
key = nomePaciente
type = TEXT
```

A aplicação não saberá:

- quem é o paciente;
- onde o paciente está cadastrado;
- qual banco possui o paciente;
- como localizar o paciente.

Essa responsabilidade pertence ao sistema consumidor.

---

# 21. Origem dos dados

Cada campo deverá possuir uma origem.

Na V1:

```text
MANUAL
INTEGRATION
```

### MANUAL

Campo exibido no formulário público.

Exemplo:

```text
Nome:
[________________]
```

### INTEGRATION

Campo preenchido exclusivamente através da API.

Exemplo:

```text
nomePaciente
```

Esse campo **não deverá aparecer como input no formulário público**.

---

# 22. Formulário público

Cada documento publicado deverá possuir uma URL pública.

Exemplo conceitual:

```text
https://app.com/f/{publicToken}
```

O usuário poderá acessar sem autenticação na V1.

O formulário será gerado dinamicamente a partir dos campos da versão publicada.

---

# 23. Exemplo

Documento:

```text
Contrato de Atendimento
```

Campos:

```text
nomeCliente → MANUAL
cpfCliente → MANUAL
nomePaciente → INTEGRATION
numeroContrato → INTEGRATION
dataContrato → MANUAL
```

O formulário exibirá:

```text
Nome do cliente
[____________________]

CPF
[____________________]

Data do contrato
[____/____/________]

[Enviar]
```

Os campos:

```text
nomePaciente
numeroContrato
```

não serão exibidos.

---

# 24. Submission

Cada preenchimento deverá ser tratado como uma entidade própria chamada **Submission**.

Exemplo:

```text
Submission
──────────────
ID
Document
DocumentVersion
Data
Status
CreatedAt
UpdatedAt
GeneratedDocument
```

Uma submission representa uma execução/preenchimento do documento.

---

# 25. Persistência dos dados

Os dados enviados deverão ser armazenados.

Exemplo:

```json
{
  "nomeCliente": "João Silva",
  "cpfCliente": "12345678900",
  "nomePaciente": "Maria Silva",
  "numeroContrato": "CTR-001"
}
```

A estrutura interna deverá permitir evolução sem exigir alteração do schema do banco para cada novo campo.

Uma abordagem adequada para a V1 é armazenar os valores dinâmicos em estrutura JSON/JSONB, mantendo metadados relacionais.

---

# 26. Geração do documento

Fluxo:

```text
Dados
  ↓
Identificar versão
  ↓
Carregar template
  ↓
Validar dados
  ↓
Resolver campos
  ↓
Renderizar
  ↓
Gerar PDF
  ↓
Salvar
  ↓
Retornar documento
```

---

# 27. API

A API será responsável pela integração com sistemas externos.

## Consultar documentos

```http
GET /api/v1/documents
```

---

## Consultar documento

```http
GET /api/v1/documents/{id}
```

---

## Consultar schema

```http
GET /api/v1/documents/{id}/schema
```

Exemplo:

```json
{
  "documentId": "123",
  "version": 3,
  "fields": [
    {
      "key": "nomeCliente",
      "type": "TEXT",
      "inputMode": "MANUAL",
      "required": true
    },
    {
      "key": "nomePaciente",
      "type": "TEXT",
      "inputMode": "INTEGRATION",
      "required": true
    }
  ]
}
```

---

# 28. Envio de dados pela API

```http
POST /api/v1/documents/{id}/submissions
```

Exemplo:

```json
{
  "data": {
    "nomeCliente": "João Silva",
    "nomePaciente": "Maria Silva",
    "numeroContrato": "CTR-001"
  }
}
```

A API deverá:

1. validar autenticação;
2. localizar documento;
3. localizar versão publicada;
4. validar payload;
5. validar campos obrigatórios;
6. validar tipos;
7. gerar documento;
8. persistir submission;
9. disponibilizar o PDF.

---

# 29. Retorno da API

Uma decisão recomendada é **não necessariamente retornar o PDF diretamente no POST**.

Eu estruturaria a API para retornar:

```json
{
  "submissionId": "sub-123",
  "documentId": "doc-123",
  "version": 3,
  "status": "GENERATED",
  "documentUrl": "/api/v1/submissions/sub-123/document"
}
```

Isso facilita posteriormente:

- processamento assíncrono;
- arquivos grandes;
- filas;
- assinatura;
- reprocessamento.

Para a V1, o processamento pode continuar síncrono.

---

# 30. API de download

```http
GET /api/v1/submissions/{id}/document
```

Retornará:

```text
application/pdf
```

---

# 31. API de validação

Também recomendo:

```http
POST /api/v1/documents/{id}/validate
```

Exemplo:

```json
{
  "data": {
    "nomeCliente": "João"
  }
}
```

Resposta:

```json
{
  "valid": false,
  "errors": [
    {
      "field": "cpfCliente",
      "code": "REQUIRED",
      "message": "Campo obrigatório"
    }
  ]
}
```

---

# 32. Segurança da API

A V1 deverá possuir autenticação para integrações.

Uma abordagem inicial:

```text
API Key
```

Exemplo conceitual:

```http
Authorization: Bearer <api-key>
```

As API Keys deverão possuir:

- identificação;
- status;
- data de criação;
- data de expiração opcional;
- possibilidade de revogação.

Futuramente:

- OAuth2;
- scopes;
- service accounts.

---

# 33. Controle de acesso

Como o produto **não será multi-tenant**, não haverá necessidade de:

```text
tenant_id
organization_id
company_id
```

como mecanismo de isolamento de dados.

A estrutura será:

```text
Application
 │
 ├── Users
 ├── Documents
 ├── Custom Fields
 ├── Integrations/API Keys
 └── Submissions
```

Porém, a aplicação deverá manter **autenticação e autorização**.

Exemplo:

```text
USER
 ├── ADMIN
 └── EDITOR
```

A V1 pode começar apenas com:

```text
ADMIN
```

e posteriormente evoluir.

---

# 34. Controle de acesso dos documentos

Embora o formulário seja público inicialmente, o modelo deverá permitir evolução.

Conceitualmente:

```text
AccessPolicy
```

com possibilidades futuras:

```text
PUBLIC
AUTHENTICATED
RESTRICTED
PRIVATE
```

Na V1:

```text
PUBLIC
```

será o único modo implementado.

Isso permite futuramente adicionar autenticação sem alterar o conceito fundamental do documento.

---

# 35. Importação de PDF

Na V1:

```text
Upload PDF
   ↓
Validar arquivo
   ↓
Armazenar
   ↓
Associar à versão
   ↓
Exibir no Builder
```

Cada página será tratada como background.

Os campos serão uma camada independente.

---

# 36. Edição de PDF

Não será permitido editar o conteúdo existente do PDF.

O sistema permitirá apenas:

```text
PDF
 +
Campos dinâmicos
```

### Complexidade

|Funcionalidade|Complexidade|
|---|---|
|Upload PDF|Baixa|
|Visualização|Baixa|
|Background|Baixa|
|Adicionar campos|Média|
|Mover campos|Média|
|Redimensionar campos|Média|
|Editar texto original|Alta|
|Editar imagens originais|Alta|
|Reestruturar PDF|Muito alta|

Portanto, **edição do conteúdo original fica fora da V1**.

---

# 37. Importação DOCX

Na V1, o DOCX não será editável internamente.

Fluxo:

```text
DOCX
 ↓
Conversão
 ↓
Renderização
 ↓
Background
 ↓
Campos dinâmicos
```

O usuário poderá posicionar campos sobre o resultado.

Um editor DOCX completo está fora do escopo.

---

# 38. Arquivos e imagens

Imagens e arquivos poderão ser enviados como URLs.

Exemplo:

```json
{
  "logoEmpresa": "https://example.com/logo.png"
}
```

O renderer deverá buscar o recurso e incorporá-lo ao documento.

Requisitos de segurança:

- timeout;
    
- limite de tamanho;
    
- validação de MIME type;
    
- proteção contra SSRF;
    
- controle de redirects;
    
- posteriormente allowlist de domínios.
    

---

# 39. Arquitetura de alto nível

A recomendação para a V1 é **monólito modular**.

```text
                  Angular
                     │
                     ▼
              ┌─────────────┐
              │ Spring Boot │
              │     API     │
              └──────┬──────┘
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
 Documents       Templates      Submissions
 Module          Module         Module
       │             │              │
       └─────────────┼──────────────┘
                     │
              ┌──────┴──────┐
              ▼             ▼
         PostgreSQL     Object Storage
```

---

# 40. Módulos do backend

Sugestão:

```text
document
document-version
field
custom-field
submission
rendering
storage
authentication
authorization
api-key
```

Possível estrutura:

```text
src/
├── document/
├── document-version/
├── field/
├── custom-field/
├── submission/
├── rendering/
├── storage/
├── authentication/
├── authorization/
└── api-key/
```

---

# 41. Banco de dados

Principais entidades:

```text
users
documents
document_versions
document_pages
document_fields
custom_field_definitions
submissions
assets
api_keys
```

Relacionamento:

```text
Document
   │
   ├── DocumentVersion
   │       │
   │       ├── DocumentPage
   │       └── DocumentField
   │
   └── Submission
             │
             └── GeneratedAsset
```

---

# 42. Object Storage

Arquivos não deverão ser armazenados diretamente no PostgreSQL.

Object Storage será utilizado para:

- PDFs originais;
- DOCXs;
- imagens;
- backgrounds;
- PDFs gerados;
- arquivos enviados.

Possíveis tecnologias:

- S3;
- MinIO;
- Azure Blob Storage;
- Google Cloud Storage.

---

# 43. Template JSON

O template deverá possuir uma representação independente do frontend.

Exemplo:

```json
{
  "page": {
    "size": "A4",
    "orientation": "PORTRAIT"
  },
  "pages": [
    {
      "number": 1,
      "background": {
        "assetId": "asset-123"
      },
      "fields": [
        {
          "id": "field-1",
          "key": "nomeCliente",
          "type": "TEXT",
          "inputMode": "MANUAL",
          "position": {
            "x": 100,
            "y": 200,
            "width": 300,
            "height": 30
          },
          "style": {
            "fontFamily": "Arial",
            "fontSize": 12,
            "bold": false,
            "italic": false
          },
          "validation": {
            "required": true
          }
        }
      ]
    }
  ]
}
```

Esse modelo será utilizado pelo:

```text
Builder → Template JSON → Renderer
```

---

# 44. Princípio arquitetural importante

O **Builder não deve gerar o PDF**.

Ele apenas manipula o template.

```text
Angular
   ↓
Template JSON
   ↓
Backend
   ↓
Renderer
   ↓
PDF
```

Isso permite que o mesmo template seja utilizado:

- pelo formulário;
- pela API;
- pelo preview;
- pela geração final;
- futuramente por outros canais.

---

# 45. Requisitos funcionais

## Documentos

**RF-001** Criar documento.

**RF-002** Editar documento em rascunho.

**RF-003** Excluir documento.

**RF-004** Duplicar documento.

**RF-005** Criar versão.

**RF-006** Publicar versão.

**RF-007** Consultar histórico de versões.

---

## Builder

**RF-008** Criar página.

**RF-009** Definir tamanho da página.

**RF-010** Definir orientação.

**RF-011** Adicionar campos.

**RF-012** Mover campos.

**RF-013** Redimensionar campos.

**RF-014** Excluir campos.

**RF-015** Configurar propriedades.

**RF-016** Configurar validações.

**RF-017** Visualizar documento.

---

## Importação

**RF-018** Importar PDF.

**RF-019** Importar DOCX.

**RF-020** Utilizar documento importado como background.

**RF-021** Posicionar campos sobre background.

---

## Formulário

**RF-022** Gerar URL pública.

**RF-023** Exibir formulário dinamicamente.

**RF-024** Validar preenchimento.

**RF-025** Salvar submission.

**RF-026** Gerar PDF.

**RF-027** Permitir download do PDF.

---

## API

**RF-028** Listar documentos.

**RF-029** Consultar documento.

**RF-030** Consultar schema.

**RF-031** Criar submission.

**RF-032** Validar dados.

**RF-033** Consultar submission.

**RF-034** Baixar documento.

**RF-035** Autenticar integração.

---

## Custom Fields

**RF-036** Criar campo personalizado.

**RF-037** Editar campo personalizado.

**RF-038** Excluir campo personalizado.

**RF-039** Definir tipo.

**RF-040** Definir validações.

**RF-041** Definir formatação.

**RF-042** Definir `INTEGRATION_ONLY`.

---

# 46. Requisitos não funcionais

## Segurança

- autenticação;
- autorização;
- API Keys seguras;
- proteção contra acesso indevido;
- validação de arquivos;
- proteção contra SSRF;
- rate limiting;
- logs de auditoria.

---

## Performance

O sistema deverá ser capaz de:

- carregar o Builder rapidamente;
- gerar formulários dinamicamente;
- processar documentos sem bloquear operações administrativas;
- suportar geração assíncrona futuramente.

---

## Disponibilidade

A aplicação deverá ser projetada para execução em ambiente cloud.

Componentes deverão ser stateless sempre que possível.

---

## Observabilidade

Deverão existir:

- logs estruturados;
- métricas;
- tracing futuramente;
- monitoramento de erros;
- identificação de falhas na geração de documentos.

---

# 47. Roadmap

## Fase 1 — Fundação

- arquitetura;
- autenticação;
- usuários;
- banco;
- storage;
- documentos;
- versões.

---

## Fase 2 — Builder

- canvas;
- páginas;
- drag & drop;
- campos;
- propriedades;
- estilos;
- validações.

---

## Fase 3 — Renderer

- template JSON;
- resolução de dados;
- renderização;
- PDF;
- preview.
    

---

## Fase 4 — Formulário

- URL pública;
- formulário;
- validação;
- submission;
- geração;
- download.

---

## Fase 5 — API

- API Keys;    
- schema;
- submissions;
- validação;
- download;
- documentação OpenAPI.

---

## Fase 6 — Custom Fields

- catálogo;
- tipos;
- validações;
- `INTEGRATION_ONLY`;
- integração.

---

## Fase 7 — PowerForm

- PDF;    
- background;
- campos;
- DOCX;
- conversão.

---

# 48. V2

Após validar o MVP:

### Controle de acesso

```text
PUBLIC
AUTHENTICATED
RESTRICTED
PRIVATE
```

### Assinatura

```text
Generated
    ↓
Waiting Signature
    ↓
Signed
```

### Workflows

```text
Created
 ↓
Filled
 ↓
Reviewed
 ↓
Approved
 ↓
Signed
```

### Regras condicionais

Exemplo:

```text
Se tipoContrato = PJ
    mostrar CNPJ

Se tipoContrato = PF
    mostrar CPF
```

### Integrações

Possibilidade de:

- REST;
- GraphQL;
- webhooks;
- sistemas externos.

---

# 49. V3 — Plataforma de documentos

Possíveis recursos:

- colaboração;    
- comentários;
- editor mais avançado;
- assinatura digital completa;
- templates condicionais;
- automações;
- analytics;
- auditoria avançada;
- múltiplos formatos;
- OCR;
- geração assistida por IA.

---

# 50. Critérios de sucesso do MVP

O MVP poderá ser considerado bem-sucedido quando um usuário conseguir:

### Cenário 1

```text
Criar documento vazio
        ↓
Adicionar campos
        ↓
Publicar
        ↓
Gerar link
        ↓
Preencher
        ↓
Gerar PDF
```

sem intervenção de desenvolvedor.

### Cenário 2

```text
Criar documento a partir de PDF
        ↓
Adicionar campos
        ↓
Publicar
        ↓
Preencher
        ↓
Gerar PDF
```

### Cenário 3

Um sistema externo conseguir:

```text
GET /schema
      ↓
Descobrir campos
      ↓
POST /submission
      ↓
PDF gerado
```

sem conhecer a implementação interna da plataforma.

---

# 51. Decisões arquiteturais consolidadas

Com suas respostas, eu fecharia estas decisões:

| Decisão                 | V1                   |
| ----------------------- | -------------------- |
| Multi-tenant            | **Não**              |
| Arquitetura             | Monólito modular     |
| Backend                 | NestsJS              |
| Frontend                | Angular              |
| Banco                   | MSSQL Server         |
| Arquivos                | Object Storage       |
| Documento               | Versionado           |
| PDF importado           | Background           |
| DOCX                    | Conversão/background |
| Editor de PDF           | Não                  |
| Formulário              | Público              |
| API                     | REST                 |
| Integração              | JSON                 |
| API Auth                | API Key              |
| Campos personalizados   | Sim                  |
| Campos integration-only | Sim                  |
| Assinatura              | Futuro               |
| Workflow                | Futuro               |
| OAuth                   | Futuro               |

---
## Próximo passo recomendado

Com este PRD fechado, eu **não começaria pelo Builder**. O risco maior do projeto está no modelo de dados e no motor de documentos.

A sequência que eu usaria seria:

**1. Modelo de domínio → 2. Banco → 3. Template JSON → 4. Renderer → 5. API → 6. Builder Angular → 7. Formulário público → 8. PowerForm.**

Principalmente, precisamos definir muito bem **`DocumentVersion`, `DocumentField`, `CustomFieldDefinition`, `Submission` e o Template JSON**. Se esses cinco conceitos forem bem projetados, o restante da aplicação fica consideravelmente mais simples de implementar e evoluir.