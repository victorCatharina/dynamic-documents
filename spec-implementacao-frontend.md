# Especificação Técnica — Frontend MVP
## Plataforma de Documentos Dinâmicos

**Versão:** 1.0  
**Status:** Especificação para implementação  
**Frontend:** Angular + TypeScript  
**UI:** Angular Material/CDK  
**Comunicação:** REST API  
**Estado:** Signals + serviços de domínio  
**Editor:** Canvas baseado em HTML/CSS  
**Autenticação:** JWT  
**Documentação da API:** Swagger/OpenAPI

---

# 1. Objetivo

Implementar uma aplicação web capaz de:

1. Autenticar usuários administrativos.
2. Listar documentos.
3. Criar documentos.
4. Criar e editar versões.
5. Construir documentos visualmente.
6. Criar páginas.
7. Configurar tamanho e orientação das páginas.
8. Adicionar campos dinamicamente.
9. Mover e redimensionar campos.
10. Configurar propriedades dos campos.
11. Configurar validações.
12. Configurar máscaras.
13. Visualizar documentos.
14. Importar PDF/DOCX.
15. Posicionar campos sobre documentos importados.
16. Publicar versões.
17. Gerar link público.
18. Permitir preenchimento através do formulário público.
19. Exibir validações.
20. Enviar dados ao backend.
21. Exibir o documento gerado.
22. Permitir download do PDF.
23. Gerenciar Custom Fields.
24. Gerenciar API Keys.

O frontend deve consumir exclusivamente a API do backend.

Não acessar PostgreSQL, Object Storage ou qualquer outro serviço diretamente.

---

# 2. Stack

Utilizar:

- Angular
- TypeScript
- Angular Router
- Angular Material
- Angular CDK
- RxJS
- Angular Signals
- Reactive Forms
- HttpClient
- SCSS
- ESLint
- Prettier

O projeto deve utilizar componentes standalone.

Não utilizar NgModules para organizar funcionalidades da aplicação.

---

# 3. Arquitetura

Utilizar arquitetura baseada em features.

Estrutura sugerida:

```text
src/
├── app/
│
│   ├── core/
│   │   ├── auth/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── http/
│   │   ├── services/
│   │   └── models/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── features/
│   │
│   │   ├── auth/
│   │   │
│   │   ├── documents/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   └── services/
│   │   │
│   │   ├── document-builder/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── state/
│   │   │
│   │   ├── submissions/
│   │   │
│   │   ├── custom-fields/
│   │   │
│   │   ├── api-keys/
│   │   │
│   │   └── public-form/
│   │
│   ├── layout/
│   │   ├── admin-layout/
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── public-layout/
│   │
│   ├── app.routes.ts
│   └── app.config.ts
│
└── assets/
```

---

# 4. Princípios arquiteturais

## 4.1 Backend é a fonte de verdade

O frontend não deve duplicar regras de negócio complexas.

Exemplo:

```text
Frontend
   |
   | envia template
   v
Backend
   |
   | valida
   v
Template válido
```

O frontend pode realizar validações para melhorar UX, mas o backend sempre deve validar novamente.

---

# 5. Template JSON

O frontend deve utilizar exatamente o conceito de `DocumentTemplate` definido no backend.

O Builder deve editar esse objeto.

Exemplo:

```typescript
interface DocumentTemplate {
  page: PageConfiguration;
  pages: DocumentTemplatePage[];
}
```

Página:

```typescript
interface DocumentTemplatePage {
  number: number;

  background?: {
    assetId: string;
  };

  fields: DocumentTemplateField[];
}
```

Campo:

```typescript
interface DocumentTemplateField {
  id: string;
  key: string;
  type: FieldType;
  inputMode: FieldInputMode;

  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  style?: FieldStyle;

  validation?: FieldValidation;

  mask?: string;
}
```

---

# 6. Regra fundamental do Builder

O Builder não deve manter uma representação diferente da enviada ao backend.

Fluxo:

```text
Usuário arrasta campo
       ↓
Builder State
       ↓
Template JSON
       ↓
Backend
```

Não criar:

```text
FrontendTemplate
BackendTemplate
```

com estruturas incompatíveis.

Deve existir um contrato único.

---

# 7. Modelos do frontend

Criar modelos TypeScript para:

```text
User
Document
DocumentVersion
DocumentPage
DocumentField
CustomFieldDefinition
Submission
Asset
ApiKey
DocumentTemplate
DocumentTemplatePage
DocumentTemplateField
```

Enums:

```typescript
enum DocumentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

enum FieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}

enum FieldInputMode {
  MANUAL = 'MANUAL',
  INTEGRATION = 'INTEGRATION',
}
```

---

# 8. Rotas

## Administração

```text
/login

/documents

/documents/new

/documents/:documentId

/documents/:documentId/builder

/documents/:documentId/builder/:versionId

/documents/:documentId/versions

/documents/:documentId/submissions

/custom-fields

/api-keys
```

## Público

```text
/f/:publicToken
```

Não exigir autenticação para:

```text
/f/:publicToken
```

---

# 9. Authentication

Criar:

```text
AuthService
AuthGuard
AuthInterceptor
```

Login:

```http
POST /api/v1/auth/login
```

Request:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:

```json
{
  "accessToken": "..."
}
```

---

# 10. Armazenamento do JWT

Preferir:

```text
HttpOnly Cookie
```

quando suportado pela configuração do backend.

Caso o contrato do MVP utilize Bearer Token:

```text
Authorization: Bearer <token>
```

Evitar armazenar tokens sensíveis em `localStorage` quando houver alternativa segura.

---

# 11. HTTP Interceptor

Criar interceptor responsável por:

```text
request
   ↓
adicionar autenticação
   ↓
backend
```

Também deve tratar:

```text
401
```

Redirecionando para:

```text
/login
```

---

# 12. Layout administrativo

Criar layout:

```text
┌─────────────────────────────────────────┐
│ Header                                  │
├──────────────┬──────────────────────────┤
│ Sidebar      │                          │
│              │       Content            │
│ Documents    │                          │
│ Submissions  │                          │
│ Fields       │                          │
│ API Keys     │                          │
│              │                          │
└──────────────┴──────────────────────────┘
```

Menu inicial:

```text
Documentos
Campos personalizados
Submissões
API Keys
```

---

# 13. Document List

Tela:

```text
/documents
```

Deve possuir:

- título;
- descrição;
- status;
- versão publicada;
- data de atualização;
- ações.

Ações:

```text
Editar
Abrir Builder
Versões
Submissões
Excluir
Duplicar
```

---

# 14. Criar documento

Tela:

```text
/documents/new
```

Formulário:

```text
Nome
Descrição
```

Após criação:

```text
POST /api/v1/documents
```

Redirecionar para:

```text
/documents/:id/builder
```

---

# 15. Document Builder

Esta é a principal funcionalidade do frontend.

Layout:

```text
┌──────────────────────────────────────────────────────┐
│ Toolbar                                               │
├────────────┬──────────────────────────────┬───────────┤
│            │                              │           │
│ Components │           Canvas             │ Properties│
│            │                              │           │
│ Text       │       ┌──────────────┐       │           │
│ Number     │       │              │       │ Field     │
│ Date       │       │   Document   │       │ settings  │
│ Image      │       │              │       │           │
│ File       │       │              │       │           │
│            │       └──────────────┘       │           │
│            │                              │           │
└────────────┴──────────────────────────────┴───────────┘
```

---

# 16. Builder Toolbar

Toolbar deve possuir:

```text
Salvar
Desfazer
Refazer
Preview
Publicar
Importar
```

Opcional:

```text
Zoom -
Zoom %
Zoom +
```

---

# 17. Canvas

O Canvas representa visualmente o documento.

Responsabilidades:

- renderizar páginas;
- renderizar backgrounds;
- renderizar fields;
- selecionar field;
- mover field;
- redimensionar field;
- criar field;
- excluir field;
- atualizar propriedades.

---

# 18. Unidade de medida

O modelo interno utiliza:

```text
points (pt)
```

O Canvas pode utilizar pixels.

Portanto deve existir conversão:

```text
pt → px
px → pt
```

Criar:

```typescript
CoordinateService
```

Exemplo:

```text
Template:
x = 100pt

Canvas:
x = 133px
```

A conversão deve ser centralizada.

Não espalhar cálculos de escala pelo código.

---

# 19. Zoom

O Builder deve suportar zoom.

Exemplo:

```text
50%
75%
100%
125%
150%
200%
```

Importante:

O zoom altera apenas a representação visual.

Não alterar os valores do Template JSON.

---

# 20. Seleção de campo

Ao clicar em um campo:

```text
Canvas
   ↓
selectedFieldId
   ↓
Properties Panel
```

Somente um campo deve estar selecionado por vez.

Clicar fora:

```text
selectedFieldId = null
```

---

# 21. Drag and Drop

Utilizar:

```text
Angular CDK DragDrop
```

ou solução equivalente.

Ao mover um campo:

```text
mouse position
    ↓
canvas coordinates
    ↓
remove zoom
    ↓
convert px → pt
    ↓
update template
```

Não salvar coordenadas em pixels.

---

# 22. Resize

Campos devem ser redimensionáveis.

Ao redimensionar:

```text
width
height
```

devem ser convertidos para `pt`.

Aplicar limites mínimos:

```text
minWidth
minHeight
```

Evitar dimensões negativas.

---

# 23. Snap

Opcional para MVP.

Se implementado:

```text
grid = 5pt
```

Campos podem se alinhar à grade.

O Snap deve ser uma funcionalidade visual.

O Template continua armazenando valores em pontos.

---

# 24. Campos disponíveis

Palette:

```text
Texto
Número
Data
Imagem
Arquivo
```

Cada item deve possuir:

```text
icon
label
type
```

Ao arrastar para o Canvas:

```text
create DocumentTemplateField
```

---

# 25. Campo TEXT

Default:

```json
{
  "type": "TEXT",
  "inputMode": "MANUAL",
  "position": {
    "x": 50,
    "y": 50,
    "width": 200,
    "height": 30
  }
}
```

---

# 26. Campo NUMBER

Configurações:

```text
label
key
required
min
max
decimalPlaces
mask
```

---

# 27. Campo DATE

Configurações:

```text
label
key
required
minDate
maxDate
format
```

---

# 28. Campo IMAGE

Configurações:

```text
label
key
position
width
height
```

No formulário público, o MVP pode aceitar URL.

---

# 29. Campo FILE

Configurações:

```text
label
key
position
width
height
```

No MVP, arquivos podem ser referenciados por URL.

---

# 30. Properties Panel

Ao selecionar um campo, mostrar:

```text
┌──────────────────────────┐
│ Campo                    │
├──────────────────────────┤
│ Label                    │
│ Key                      │
│ Tipo                     │
│ Input Mode               │
├──────────────────────────┤
│ Posição                  │
│ X                        │
│ Y                        │
│ Largura                  │
│ Altura                   │
├──────────────────────────┤
│ Aparência                │
│ Fonte                    │
│ Tamanho                  │
│ Cor                      │
│ Negrito                  │
│ Itálico                  │
│ Sublinhado               │
│ Alinhamento              │
├──────────────────────────┤
│ Validação                │
│ Obrigatório              │
│ Máscara                  │
└──────────────────────────┘
```

---

# 31. Propriedades de texto

Suportar:

```text
fontFamily
fontSize
color
bold
italic
underline
alignment
verticalAlignment
```

Valores:

```text
alignment:
LEFT
CENTER
RIGHT
```

```text
verticalAlignment:
TOP
CENTER
BOTTOM
```

---

# 32. Key do campo

A `key` identifica o dado.

Exemplo:

```text
nomeCliente
```

O backend receberá:

```json
{
  "nomeCliente": "João Silva"
}
```

A interface deve impedir keys inválidas.

Formato recomendado:

```regex
^[a-zA-Z][a-zA-Z0-9_.]*$
```

---

# 33. Campos duplicados

Não permitir:

```text
nomeCliente
nomeCliente
```

na mesma versão.

Ao detectar duplicidade:

```text
erro visual
```

e impedir publicação.

---

# 34. Custom Fields no Builder

O Builder deve permitir selecionar Custom Fields existentes.

Exemplo:

```text
Campo personalizado
--------------------
nomePaciente
nomeEmpresa
numeroContrato
```

Ao selecionar:

```text
key = nomePaciente
inputMode = INTEGRATION
```

Não permitir alterar livremente o tipo se o campo vier do catálogo.

---

# 35. Input Mode

O usuário deve poder definir:

```text
Manual
Integração
```

Visualmente:

```text
Modo de entrada:

(o) Manual
( ) Integração
```

Se:

```text
INTEGRATION
```

mostrar aviso:

> Este campo será preenchido exclusivamente através da API e não aparecerá no formulário público.

---

# 36. Page Configuration

O Builder deve permitir:

```text
Tamanho
Orientação
```

Tamanhos:

```text
A4
A5
Letter
Legal
```

Orientação:

```text
Portrait
Landscape
```

---

# 37. Canvas Page Size

A representação visual deve respeitar a proporção real da página.

Exemplo:

```text
A4 Portrait

210mm × 297mm
```

Não utilizar tamanho arbitrário.

Apenas aplicar escala visual.

---

# 38. Background

Uma página pode possuir:

```json
{
  "background": {
    "assetId": "asset-123"
  }
}
```

O frontend deve:

1. obter URL do asset;
2. renderizar como background;
3. posicionar fields por cima.

O background não deve ser selecionável como field.

---

# 39. Importação PDF

Interface:

```text
Importar
   ↓
PDF
```

Upload:

```http
POST /api/v1/documents/:id/import/pdf
```

Após upload:

```text
Backend
 ↓
assets/pages
 ↓
frontend atualiza builder
```

O frontend não deve tentar interpretar ou editar o conteúdo textual do PDF.

---

# 40. Importação DOCX

Interface:

```text
Importar
   ↓
DOCX
```

Backend realiza conversão.

Frontend recebe:

```text
background
```

e renderiza no Canvas.

---

# 41. Preview

Criar modo:

```text
Preview
```

O Preview deve ocultar:

```text
palette
properties
builder controls
```

e mostrar apenas:

```text
documento
```

---

# 42. Preview de dados

Opcional no MVP.

Pode permitir:

```text
Preview com dados
```

Exemplo:

```json
{
  "nomeCliente": "João Silva"
}
```

O frontend pode enviar ao backend para gerar uma prévia real.

---

# 43. Salvar Builder

Endpoint:

```http
PUT /api/v1/documents/:documentId/versions/:versionId
```

Request:

```json
{
  "template": {}
}
```

O frontend deve salvar o Template JSON.

---

# 44. Autosave

Não é obrigatório no MVP.

Caso implementado:

```text
debounce: 1000–2000ms
```

Evitar chamadas para cada movimento do mouse.

Preferir:

```text
usuário altera
      ↓
state
      ↓
debounce
      ↓
save
```

---

# 45. Dirty State

O Builder deve controlar:

```text
isDirty
```

Se o usuário modificar o documento:

```text
isDirty = true
```

Após salvar:

```text
isDirty = false
```

Ao tentar sair com alterações:

```text
"Existem alterações não salvas. Deseja sair?"
```

---

# 46. Undo / Redo

Recomendado para o Builder.

Manter histórico de snapshots do Template.

```text
Template A
   ↓
Template B
   ↓
Template C
```

Undo:

```text
C → B
```

Redo:

```text
B → C
```

Limitar histórico para evitar consumo excessivo de memória.

Exemplo:

```text
50 estados
```

---

# 47. Publicação

Botão:

```text
Publicar
```

Fluxo:

```text
Frontend
   ↓
validar localmente
   ↓
POST /publish
   ↓
Backend valida novamente
   ↓
Publicado
```

Se backend retornar erro:

```text
mostrar erro
```

Não considerar publicado apenas porque a validação local passou.

---

# 48. Versões

Tela:

```text
/documents/:id/versions
```

Mostrar:

```text
Versão
Status
Criada em
Publicada em
```

Ações:

```text
Visualizar
Editar
Duplicar
Publicar
```

Uma versão publicada deve aparecer como:

```text
Somente leitura
```

Para editar:

```text
Criar nova versão
```

---

# 49. Regra de versão no frontend

Se:

```text
version.status === PUBLISHED
```

o Builder deve ficar em:

```text
READ_ONLY
```

Não permitir:

- drag;
- resize;
- delete;
- alterar propriedades.

---

# 50. Public Form

Rota:

```text
/f/:publicToken
```

O formulário deve ser gerado dinamicamente a partir de:

```http
GET /api/v1/public/forms/:publicToken
```

Response:

```json
{
  "documentId": "doc-123",
  "version": 3,
  "fields": []
}
```

---

# 51. Public Form Layout

Exemplo:

```text
┌─────────────────────────────┐
│ Contrato                    │
├─────────────────────────────┤
│ Nome                        │
│ [________________________]  │
│                             │
│ CPF                         │
│ [________________________]  │
│                             │
│ Data                        │
│ [__/__/____]                │
│                             │
│ [ Enviar ]                  │
└─────────────────────────────┘
```

---

# 52. Dynamic Reactive Form

Não criar componentes fixos como:

```text
NomeClienteComponent
NomePacienteComponent
```

O formulário deve ser genérico.

Fluxo:

```text
FieldDefinition
      ↓
FormControl
      ↓
DynamicForm
```

Exemplo:

```typescript
FormControl<string>
```

para TEXT.

---

# 53. Renderização dos tipos

Mapear:

```text
TEXT
 → input text

NUMBER
 → input number

DATE
 → date input

IMAGE
 → URL input

FILE
 → URL input
```

---

# 54. Campos INTEGRATION

Nunca renderizar:

```text
input
```

para:

```text
inputMode === INTEGRATION
```

Esses campos serão preenchidos apenas pela API.

---

# 55. Validação do formulário

O frontend deve refletir as regras:

```text
required
minLength
maxLength
min
max
regex
decimalPlaces
```

Mas o backend é a autoridade final.

---

# 56. Máscaras no formulário

Aplicar máscara visual.

Exemplo:

```text
CPF

00000000000
      ↓
000.000.000-00
```

O valor enviado pode ser normalizado.

O comportamento deve ser consistente com o backend.

---

# 57. Submit público

Endpoint:

```http
POST /api/v1/public/forms/:token/submissions
```

Request:

```json
{
  "data": {
    "nomeCliente": "João Silva",
    "cpf": "12345678900"
  }
}
```

Durante envio:

```text
button disabled
loading
```

---

# 58. Resultado da Submission

Se sucesso:

```text
Submission criada
PDF gerado
```

Mostrar:

```text
Documento gerado com sucesso.

[Baixar documento]
```

Utilizar:

```text
GET /api/v1/submissions/:id/document
```

---

# 59. Tratamento de erros

O frontend deve possuir tratamento global.

Mapear:

```text
400 → Dados inválidos
401 → Sessão expirada
403 → Sem permissão
404 → Recurso não encontrado
409 → Conflito
422 → Erros de validação
429 → Muitas requisições
500 → Erro interno
```

Não mostrar stack trace ao usuário.

---

# 60. API Client

Criar serviços específicos:

```text
AuthApiService
DocumentApiService
DocumentVersionApiService
SubmissionApiService
CustomFieldApiService
ApiKeyApiService
PublicFormApiService
AssetApiService
```

Exemplo:

```typescript
getDocuments()
createDocument()
getDocument()
updateDocument()
deleteDocument()
```

Não realizar chamadas HTTP diretamente dentro dos componentes.

---

# 61. Document Builder State

Criar um estado específico:

```typescript
DocumentBuilderState
```

Deve controlar:

```text
template
selectedFieldId
selectedPage
zoom
isDirty
isSaving
isReadOnly
undoStack
redoStack
```

Exemplo conceitual:

```typescript
interface BuilderState {
  template: DocumentTemplate;
  selectedFieldId: string | null;
  selectedPage: number;
  zoom: number;
  isDirty: boolean;
  isSaving: boolean;
  isReadOnly: boolean;
}
```

---

# 62. Builder Facade

Criar:

```typescript
DocumentBuilderFacade
```

Responsável por operações como:

```text
addField()
removeField()
updateField()
moveField()
resizeField()
selectField()
changePage()
setZoom()
undo()
redo()
save()
publish()
```

Componentes não devem manipular diretamente estruturas complexas do Template.

---

# 63. Exemplo de operações

Adicionar:

```typescript
addField(field)
```

Mover:

```typescript
moveField(
  fieldId,
  position
)
```

Alterar estilo:

```typescript
updateFieldStyle(
  fieldId,
  style
)
```

Remover:

```typescript
removeField(fieldId)
```

---

# 64. Imutabilidade do estado

Evitar mutações profundas como:

```typescript
field.position.x = 100;
```

Preferir atualizações imutáveis.

Isso facilita:

- Signals;
- Undo/Redo;
- detecção de alterações;
- previsibilidade.

---

# 65. Signals

Utilizar Signals para estado local do Builder.

Exemplo conceitual:

```typescript
readonly template = signal<DocumentTemplate>(initialTemplate);

readonly selectedFieldId =
  signal<string | null>(null);

readonly selectedField = computed(() => ...);
```

Não utilizar RxJS para absolutamente tudo.

Utilizar:

```text
Signals → estado local/UI
RxJS → HTTP/streams/eventos assíncronos
```

---

# 66. Performance do Canvas

O Canvas pode conter muitos campos.

Evitar:

```text
re-render completo
```

a cada movimento.

Durante drag:

```text
atualizar apenas posição visual
```

e persistir no Template de forma controlada.

Não realizar HTTP durante drag.

---

# 67. Acessibilidade

Implementar:

- labels;
- keyboard navigation;
- foco visível;
- aria-label quando necessário;
- contraste adequado;
- botões acessíveis.

No Builder:

```text
Delete
```

deve remover o campo selecionado.

Atalhos:

```text
Ctrl + Z
Ctrl + Shift + Z
Ctrl + S
Delete
```

---

# 68. Loading States

Todas as operações assíncronas devem possuir feedback.

Exemplo:

```text
Salvar
   ↓
Salvando...
```

Importação:

```text
Importando documento...
```

Geração:

```text
Gerando documento...
```

Não permitir operações conflitantes.

---

# 69. Empty States

Exemplo:

```text
Você ainda não possui documentos.

[ Criar documento ]
```

Para Custom Fields:

```text
Nenhum campo personalizado cadastrado.

[ Criar campo ]
```

---

# 70. Toast / Notifications

Criar serviço:

```text
NotificationService
```

Suportar:

```text
success
error
warning
info
```

Exemplos:

```text
Documento salvo.
Versão publicada.
Campo criado.
Erro ao gerar documento.
```

---

# 71. Custom Fields

Tela:

```text
/custom-fields
```

Listar:

```text
Key
Label
Type
Input Mode
Status
```

Ações:

```text
Criar
Editar
Excluir
```

---

# 72. Formulário Custom Field

Campos:

```text
Key
Label
Type
Input Mode
Validation
Formatting
```

Exemplo:

```text
Key:
nomePaciente

Label:
Nome do paciente

Type:
Text

Input Mode:
Integration
```

---

# 73. API Keys

Tela:

```text
/api-keys
```

Mostrar:

```text
Nome
Criada em
Último uso
Expiração
Status
```

Nunca mostrar a API Key completa após a criação.

Ao criar:

```text
API Key criada.

Copie agora. Ela não será exibida novamente.

[ Copiar ]
```

---

# 74. Submissions

Tela:

```text
/documents/:id/submissions
```

Mostrar:

```text
ID
Versão
Status
Data
```

Ao abrir:

```text
/submissions/:id
```

Mostrar:

```text
Documento
Versão
Data
Dados
Status
Download
```

---

# 75. Responsividade

A aplicação administrativa deve funcionar em:

```text
Desktop
Tablet
```

O Builder deve ser tratado prioritariamente como:

```text
Desktop-first
```

O formulário público deve ser:

```text
Mobile-first
```

---

# 76. Segurança no frontend

Nunca confiar no frontend para autorização.

Exemplo:

```text
Botão escondido
≠
endpoint protegido
```

O backend deve sempre validar autorização.

O frontend apenas melhora UX.

---

# 77. Dados sensíveis

Não armazenar no frontend:

```text
password
API Key completa
tokens desnecessários
```

Não registrar dados de Submission em logs do browser.

---

# 78. Tratamento de sessão

Se JWT expirar:

```text
401
 ↓
limpar sessão
 ↓
redirect /login
```

Evitar múltiplos redirects simultâneos.

---

# 79. Ambiente

Utilizar:

```text
environment.ts
environment.development.ts
```

Exemplo:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api/v1',
};
```

Não hardcodar URLs nos services.

---

# 80. Configuração pública

O frontend pode receber:

```text
API URL
PUBLIC FORM URL
```

através de configuração de ambiente.

Não colocar secrets no frontend.

---

# 81. Testes

Implementar:

## Unit tests

Testar:

```text
DocumentBuilderFacade
CoordinateService
Template manipulation
Mask utilities
DynamicFormFactory
AuthService
```

## Component tests

Testar:

```text
FieldPalette
Canvas
PropertiesPanel
DynamicForm
DocumentList
```

## E2E

Testar:

```text
login
create document
create version
add field
save
publish
public form
submit
download
```

---

# 82. Teste crítico — Builder

Cenário:

```text
1. Criar documento
2. Criar versão
3. Abrir Builder
4. Adicionar TEXT
5. Mover para X=100, Y=200
6. Alterar fonte
7. Salvar
8. Recarregar página
```

Resultado esperado:

```text
Campo continua em X=100, Y=200
Fonte continua configurada
```

---

# 83. Teste crítico — Versionamento

Cenário:

```text
Version 1
→ publicar

Version 2
→ criar

Alterar Version 2
```

Resultado:

```text
Version 1
→ continua intacta
```

---

# 84. Teste crítico — Public Form

Cenário:

```text
Document
 ↓
Version publicada
 ↓
Public URL
 ↓
GET schema
```

Resultado:

```text
somente campos MANUAL
```

Campos:

```text
INTEGRATION
```

não aparecem.

---

# 85. Teste crítico — Integração

O frontend administrativo deve permitir:

```text
CustomField
→ nomePaciente
→ INTEGRATION
```

Depois:

```text
Builder
→ adicionar nomePaciente
```

O campo deve aparecer visualmente como:

```text
Nome do paciente
[ INTEGRAÇÃO ]
```

---

# 86. Estados do Builder

Utilizar:

```text
LOADING
READY
DIRTY
SAVING
READ_ONLY
ERROR
```

Exemplo:

```text
PUBLISHED
   ↓
READ_ONLY
```

---

# 87. Erros de publicação

Se backend retornar:

```json
{
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "nomeCliente",
      "code": "DUPLICATED_KEY"
    }
  ]
}
```

O Builder deve:

1. mostrar mensagem;
2. localizar o campo quando possível;
3. selecionar o campo;
4. destacar visualmente o erro.

---

# 88. Deep Linking

Todas as páginas devem ser acessíveis diretamente por URL.

Exemplo:

```text
/documents/123/builder/456
```

Ao atualizar o browser:

```text
F5
```

o estado deve ser reconstruído através da API.

Não depender apenas do estado em memória.

---

# 89. Unsaved Changes

Antes de sair do Builder:

```text
isDirty === true
```

mostrar:

```text
Você possui alterações não salvas.

[Continuar editando]
[Descartar alterações]
[Salvar e sair]
```

---

# 90. Componentes principais

Criar pelo menos:

```text
AppShellComponent

DocumentListComponent
DocumentCardComponent
DocumentFormComponent

DocumentBuilderComponent

FieldPaletteComponent
FieldPaletteItemComponent

DocumentCanvasComponent
DocumentPageComponent
DocumentFieldComponent

FieldPropertiesPanelComponent

PagePropertiesPanelComponent

BuilderToolbarComponent

VersionListComponent

SubmissionListComponent
SubmissionDetailsComponent

DynamicFormComponent
DynamicFieldComponent

CustomFieldListComponent
CustomFieldFormComponent

ApiKeyListComponent
ApiKeyCreateDialogComponent
```

---

# 91. Responsabilidade dos componentes

Componentes devem ser preferencialmente de apresentação.

Evitar:

```typescript
DocumentBuilderComponent
```

com centenas de linhas contendo toda a lógica.

Preferir:

```text
Component
   ↓
Facade
   ↓
Services
   ↓
API
```

---

# 92. Estrutura do Builder

```text
DocumentBuilderComponent
│
├── BuilderToolbarComponent
│
├── FieldPaletteComponent
│
├── DocumentCanvasComponent
│   └── DocumentPageComponent
│       └── DocumentFieldComponent
│
└── FieldPropertiesPanelComponent
```

---

# 93. Comunicação do Builder

Exemplo:

```text
DocumentFieldComponent
       |
       | fieldMoved
       v
DocumentCanvasComponent
       |
       | moveField()
       v
DocumentBuilderFacade
       |
       v
Builder State
```

Não fazer:

```text
DocumentFieldComponent
   ↓
HTTP
```

---

# 94. Drag/Resize e persistência

Durante interação:

```text
Mouse Down
   ↓
Drag
   ↓
visual update
   ↓
Mouse Up
   ↓
commit state
```

Somente após o término da operação atualizar o estado persistido.

---

# 95. Clipboard

Opcional.

Pode implementar:

```text
Ctrl+C
Ctrl+V
```

para campos.

Se implementado:

```text
novo field.id
```

deve ser gerado.

Nunca duplicar IDs.

---

# 96. Duplicate Field

Opcional, mas recomendado.

Ao duplicar:

```text
field A
 ↓
field A copy
```

gerar:

```text
novo id
```

e exigir uma nova `key`.

---

# 97. Preview final

O frontend deve conseguir visualizar:

```text
Template
```

sem ferramentas do Builder.

Idealmente:

```text
Preview
   ↓
backend rendering
   ↓
PDF
```

Isso garante que Preview e PDF final utilizem o mesmo renderer.

---

# 98. Regra de ouro do Preview

Não criar um renderer visual completamente diferente do backend.

Se possível:

```text
Builder Preview
      ↓
Template
      ↓
Backend Renderer
      ↓
PDF
```

Assim reduzimos diferenças entre:

```text
o que usuário vê
```

e:

```text
o que usuário recebe
```

---

# 99. Fluxo administrativo completo

```text
Login
  ↓
Documents
  ↓
Create Document
  ↓
Create Version
  ↓
Builder
  ↓
Configure Page
  ↓
Add Fields
  ↓
Configure Fields
  ↓
Save
  ↓
Preview
  ↓
Publish
  ↓
Public URL
```

---

# 100. Fluxo público

```text
Public URL
   ↓
Load schema
   ↓
Generate dynamic form
   ↓
User fills
   ↓
Validate
   ↓
Submit
   ↓
Backend generates PDF
   ↓
Success
   ↓
Download
```

---

# 101. Fluxo de integração

O frontend administrativo deve permitir ao usuário visualizar:

```text
Document
 ↓
Published Version
 ↓
Schema
```

Um sistema externo poderá utilizar:

```http
GET /api/v1/documents/:id/schema
```

e posteriormente:

```http
POST /api/v1/documents/:id/submissions
```

O frontend não precisa implementar o sistema cliente.

---

# 102. Estados de erro do formulário público

Se o documento:

```text
não existe
```

mostrar:

```text
Documento não encontrado.
```

Se estiver:

```text
arquivado
```

mostrar:

```text
Este formulário não está mais disponível.
```

Se houver erro de servidor:

```text
Não foi possível carregar o formulário.
Tente novamente.
```

---

# 103. Performance

Objetivos:

- evitar chamadas HTTP desnecessárias;
- lazy loading das features administrativas;
- lazy loading do Builder;
- não carregar documentos pesados antes da necessidade;
- não gerar PDF no browser;
- não armazenar arquivos grandes na memória sem necessidade.

Rotas devem utilizar lazy loading.

---

# 104. Lazy Loading

Exemplo:

```text
documents
builder
custom-fields
submissions
api-keys
```

devem ser carregados sob demanda.

Especialmente:

```text
document-builder
```

deve ser lazy loaded.

---

# 105. Estado global

Não criar um store global gigantesco.

Estado global inicial:

```text
authenticatedUser
```

Estado do Builder:

```text
local à feature
```

Document list:

```text
local à feature
```

Formulário público:

```text
local à feature
```

---

# 106. Cache

Não criar uma camada de cache complexa no MVP.

Pode utilizar:

```text
Signals
```

e cache local simples quando necessário.

Documentos publicados podem ser buscados novamente quando uma página for aberta diretamente.

---

# 107. Design System

Criar componentes reutilizáveis para:

```text
Button
Input
Select
Dialog
ConfirmDialog
Toast
Loading
EmptyState
ErrorState
Badge
Card
Table
```

Preferir Angular Material para reduzir desenvolvimento de componentes básicos.

---

# 108. Tema

Utilizar tema consistente.

O MVP deve possuir:

```text
Light theme
```

Dark mode não é obrigatório.

---

# 109. Formulários administrativos

Utilizar:

```text
Reactive Forms
```

Não utilizar Template-driven Forms para funcionalidades principais.

---

# 110. Convenções de código

Utilizar:

```text
camelCase
```

para TypeScript.

Classes:

```text
PascalCase
```

Interfaces:

```text
PascalCase
```

Exemplo:

```typescript
DocumentBuilderFacade
DocumentApiService
DocumentTemplateField
```

---

# 111. Regra contra `any`

Evitar:

```typescript
any
```

Criar tipos explícitos.

Quando uma estrutura for dinâmica:

```typescript
Record<string, unknown>
```

Exemplo:

```typescript
interface SubmissionData {
  [key: string]: unknown;
}
```

---

# 112. API Response Models

Não utilizar diretamente objetos desconhecidos vindos da API.

Criar interfaces:

```typescript
interface ApiResponse<T> {
  data: T;
}
```

e modelos específicos quando necessário.

---

# 113. Interceptor de erros

Criar:

```text
ApiErrorInterceptor
```

Responsável por:

- interpretar erros;
- normalizar mensagens;
- encaminhar para NotificationService.

Não mostrar erros técnicos diretamente ao usuário.

---

# 114. Upload

Criar componente reutilizável:

```text
FileUploadComponent
```

Responsável por:

```text
selecionar
validar extensão
validar tamanho
mostrar progresso
cancelar
```

Mas a validação definitiva pertence ao backend.

---

# 115. Segurança de URL

Para URLs fornecidas pelo backend:

- não utilizar `innerHTML`;
- não utilizar HTML arbitrário;
- utilizar mecanismos seguros do Angular;
- evitar bypass de sanitização.

Não usar:

```typescript
bypassSecurityTrustUrl()
```

sem necessidade real.

---

# 116. Não implementar no MVP

Não implementar:

```text
Digital Signature
OAuth2
Real-time collaboration
WebSockets
Conditional Fields
Calculated Fields
AI generation
OCR
Workflow
Approval
Advanced PDF editing
Full DOCX editor
Multi-tenancy
Mobile application
Offline mode
```

---

# 117. Ordem de implementação

A IA deve implementar nesta ordem.

## Fase 1 — Fundação

```text
Angular
Routing
Material
SCSS
ESLint
Prettier
Environment
HttpClient
```

---

## Fase 2 — Core

```text
models
API services
error handling
notifications
loading
auth
```

---

## Fase 3 — Authentication

```text
login
JWT
guard
interceptor
session
```

---

## Fase 4 — Documents

```text
list
create
details
edit
delete
```

---

# 118. Fase 5 — Document Builder

Implementar primeiro:

```text
Canvas
Page
Field
Selection
Move
Resize
Delete
```

Depois:

```text
Properties
Styles
Validation
```

Depois:

```text
Undo
Redo
Zoom
Preview
```

---

# 119. Fase 6 — Versioning

Implementar:

```text
version list
create version
read-only published version
publish
```

---

# 120. Fase 7 — Storage/Import

Implementar:

```text
PDF upload
DOCX upload
background
asset URLs
```

---

# 121. Fase 8 — Public Form

Implementar:

```text
public route
dynamic schema
dynamic form
validation
submit
success
download
```

---

# 122. Fase 9 — Custom Fields

Implementar:

```text
list
create
edit
delete
Builder integration
```

---

# 123. Fase 10 — Submissions

Implementar:

```text
submission list
submission details
PDF download
```

---

# 124. Fase 11 — API Keys

Implementar:

```text
list
create
revoke/delete
```

---

# 125. Fase 12 — Refinamento

Implementar:

```text
accessibility
loading states
empty states
error states
responsive
performance
tests
```

---

# 126. Critérios de aceite

O frontend será considerado funcional quando o usuário conseguir:

```text
1. Login
2. Criar documento
3. Criar versão
4. Abrir Builder
5. Criar página
6. Adicionar campo
7. Mover campo
8. Redimensionar campo
9. Configurar campo
10. Salvar
11. Publicar
12. Abrir URL pública
13. Preencher formulário
14. Enviar
15. Baixar PDF
```

---

# 127. Critério de aceite — Template

Após salvar e recarregar:

```text
Template antes
=
Template depois
```

Sem perda de:

```text
posição
tamanho
estilo
validação
key
tipo
inputMode
background
```

---

# 128. Critério de aceite — Versionamento

Depois de publicar:

```text
Version 1
```

criar:

```text
Version 2
```

e modificar:

```text
campo A
```

A Version 1 não deve sofrer alteração.

---

# 129. Critério de aceite — Integration

Criar:

```text
nomePaciente
INTEGRATION
```

Adicionar ao documento.

No formulário público:

```text
nomePaciente
```

não deve aparecer.

Na API:

```json
{
  "data": {
    "nomePaciente": "Maria Silva"
  }
}
```

deve ser aceito.

---

# 130. Critério de aceite — Public Form

Abrir:

```text
/f/:publicToken
```

sem login.

O formulário deve:

```text
carregar
↓
mostrar campos MANUAL
↓
validar
↓
enviar
↓
mostrar sucesso
```

---

# 131. Prompt mestre para a IA implementadora

A IA responsável pela implementação do frontend deve receber as seguintes instruções:

```text
Você está implementando o frontend da Plataforma de Documentos Dinâmicos.

Stack obrigatória:
- Angular
- TypeScript
- Angular Material
- Angular CDK
- RxJS
- Signals
- Reactive Forms
- REST API

Arquitetura:
- Angular standalone components
- feature-based architecture
- services para comunicação HTTP
- facade para estado complexo do Builder
- Signals para estado local
- RxJS para operações assíncronas
- lazy loading

O Template JSON é o contrato central da aplicação.

NUNCA crie uma estrutura de template incompatível com o backend.

O Builder deve editar diretamente o conceito de:
DocumentTemplate
DocumentTemplatePage
DocumentTemplateField

O Canvas utiliza pixels apenas para representação visual.
O Template JSON utiliza points (pt).

Todas as conversões px ↔ pt devem estar centralizadas no CoordinateService.

O backend é a fonte de verdade.

O frontend pode validar para melhorar UX, mas o backend sempre deve validar novamente.

Não coloque chamadas HTTP dentro de componentes.

Não coloque regras complexas dentro dos componentes.

Utilize:
Component → Facade/Service → API Service → Backend

Versões publicadas são READ_ONLY.

Não permitir edição de uma versão publicada.

Para alterar uma versão publicada, criar uma nova versão.

Campos INTEGRATION não aparecem no formulário público.

O frontend nunca deve acessar diretamente:
- PostgreSQL
- Object Storage
- bancos externos

Não implementar:
- microservices
- multi-tenancy
- OAuth2
- assinatura digital
- workflows
- OCR
- IA
- editor completo de PDF
- editor completo de DOCX
- colaboração em tempo real

Implemente incrementalmente.

Antes de criar uma nova abstração, verifique se ela é necessária.

Não use any sem justificativa.

Não faça refatorações grandes fora do escopo da tarefa atual.

Não altere contratos de API já definidos.

Cada etapa deve:
1. compilar;
2. possuir tipos;
3. possuir tratamento de erros;
4. possuir loading state;
5. possuir testes quando aplicável.

Ao implementar o Builder, priorize:
1. Canvas
2. Page
3. Field
4. Selection
5. Drag
6. Resize
7. Properties
8. Template persistence
9. Undo/Redo
10. Preview
11. Publish

O objetivo do MVP é conseguir executar:

Login
→ criar documento
→ criar versão
→ montar documento
→ salvar
→ publicar
→ abrir formulário público
→ preencher
→ enviar
→ baixar PDF.
```

---

# 132. Prompts incrementais

## Prompt 1 — Fundação

```text
Implemente a fundação do frontend conforme a especificação.

Crie:
- Angular standalone
- routing
- Angular Material
- estrutura de features
- core
- shared
- environment
- HttpClient
- interceptors
- tratamento global de erros

Não implemente o Builder ainda.
```

## Prompt 2 — Authentication

```text
Implemente Authentication.

Criar:
- login
- AuthService
- AuthGuard
- AuthInterceptor
- session handling
- logout
- página de login

Utilize os endpoints definidos na especificação.
```

## Prompt 3 — Documents

```text
Implemente a feature Documents.

Criar:
- Document models
- API service
- list
- create
- details
- edit
- delete

Utilize Reactive Forms.

Não implemente o Builder ainda.
```

## Prompt 4 — Builder Core

```text
Implemente o núcleo do Document Builder.

Criar:
- DocumentBuilderComponent
- DocumentBuilderFacade
- BuilderState
- Canvas
- Page
- Field
- selection
- add
- delete
- move
- resize

O Template JSON deve seguir exatamente a especificação.

Utilize points como unidade persistida.
```

## Prompt 5 — Builder Properties

```text
Agora implemente o Properties Panel.

Suportar:
- key
- label
- type
- inputMode
- position
- size
- font
- color
- bold
- italic
- underline
- alignment
- validation
- mask

Atualizações devem passar pela BuilderFacade.
```

## Prompt 6 — Versioning

```text
Implemente versionamento.

Suportar:
- listar versões
- criar versão
- editar draft
- publicar
- read-only para published

Uma versão publicada não pode ser alterada pelo Builder.
```

## Prompt 7 — Public Form

```text
Implemente o formulário público.

Rota:
/f/:publicToken

Buscar schema através da API.

Gerar Reactive Form dinamicamente.

Renderizar apenas campos MANUAL.

Implementar:
- TEXT
- NUMBER
- DATE
- IMAGE
- FILE

Implementar validações.
```

## Prompt 8 — Submission

```text
Implemente o fluxo de Submission.

Ao enviar:
- validar
- POST public submission
- mostrar loading
- tratar erros
- mostrar sucesso
- permitir download do documento gerado.
```

## Prompt 9 — Custom Fields

```text
Implemente Custom Fields.

Criar:
- list
- create
- edit
- delete
- integração com Builder

Campos INTEGRATION devem possuir indicação visual clara.
```

## Prompt 10 — Refinamento

```text
Agora faça o refinamento do MVP.

Adicionar:
- loading states
- empty states
- error states
- toast notifications
- accessibility
- responsive layout
- keyboard shortcuts
- unsaved changes protection
- performance improvements
- testes E2E
```

---

# 133. Arquitetura final

```text
                         ┌─────────────────────┐
                         │      Angular        │
                         │                     │
                         │  Admin Application  │
                         │                     │
                         │  Documents          │
                         │  Builder             │
                         │  Versions            │
                         │  Submissions         │
                         │  Custom Fields       │
                         │  API Keys            │
                         └──────────┬──────────┘
                                    │
                                    │ REST
                                    ▼
                         ┌─────────────────────┐
                         │     NestJS API      │
                         └─────────────────────┘
```

Internamente:

```text
Angular
│
├── Core
│   ├── Auth
│   ├── HTTP
│   └── Session
│
├── Shared
│   ├── UI
│   ├── Forms
│   └── Utilities
│
├── Documents
│
├── Document Builder
│   ├── Canvas
│   ├── Pages
│   ├── Fields
│   ├── Properties
│   ├── State
│   └── Coordinate System
│
├── Versions
│
├── Submissions
│
├── Custom Fields
│
├── API Keys
│
└── Public Form
```

---

# 134. Resultado esperado

O frontend deve ser capaz de transformar:

```text
Template JSON
```

em:

```text
Documento visual editável
```

e transformar:

```text
Document Schema
```

em:

```text
Formulário dinâmico
```

Enquanto o backend transforma:

```text
Template JSON + Data
```

em:

```text
PDF
```

Portanto, a arquitetura final deve manter uma separação clara:

```text
                 TEMPLATE
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
 Angular Builder          NestJS Renderer
        │                       │
        │                       │
        ▼                       ▼
  Edição visual                PDF
        │
        ▼
   Template JSON
```

O **Template JSON é o contrato central do produto** e deve permanecer estável entre frontend e backend.