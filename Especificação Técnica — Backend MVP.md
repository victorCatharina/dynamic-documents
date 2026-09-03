# Especificação Técnica — Backend MVP
## Plataforma de Documentos Dinâmicos

**Versão:** 1.0  
**Status:** Especificação para implementação  
**Backend:** NestJS + TypeScript  
**Banco:** MSSQL Server 
**ORM:** Prisma  
**Storage:** S3-compatible / MinIO  / Servidor Local
**API:** REST  
**Documentação:** OpenAPI / Swagger

---

# 1. Objetivo

Implementar o backend de um sistema capaz de:

1. Criar e gerenciar documentos.
2. Criar versões de documentos.
3. Definir páginas e configurações de página.
4. Criar campos dinâmicos sobre as páginas.
5. Configurar propriedades visuais dos campos.
6. Configurar validações.
7. Importar PDF/DOCX como plano de fundo.
8. Publicar uma versão de documento.
9. Expor uma URL pública para preenchimento.
10. Receber dados preenchidos manualmente ou via API.
11. Persistir cada preenchimento como uma `Submission`.
12. Gerar um PDF preenchido.
13. Permitir download do PDF gerado.
14. Criar campos personalizados de integração.
15. Expor o schema de um documento para sistemas externos.
16. Autenticar integrações por API Key.
17. Manter o histórico de versões e garantir que cada Submission continue associada à versão utilizada.

O MVP deve ser implementado como **modular monolith**.

Não criar microservices neste momento.

---

# 2. Stack obrigatória

Utilizar:

- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- `class-validator`
- `class-transformer`
- Swagger/OpenAPI
- JWT para autenticação administrativa
- API Key para integrações
- Biblioteca de geração de PDF compatível com Node.js

O código deve seguir boas práticas do NestJS.

Preferir:

- Controllers finos.
- Services contendo regras de negócio.
- DTOs para entrada/saída.
- Guards para autenticação/autorização.
- Pipes para validação.
- Repositories ou abstrações quando trouxerem benefício real.
- Enums para valores controlados.
- Transações do Prisma para operações que alterem múltiplas entidades.

---

# 3. Arquitetura

Utilizar arquitetura modular.

Estrutura sugerida:

```text
src/
├── main.ts
├── app.module.ts
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── guards/
│   ├── strategies/
│   └── dto/
│
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│
├── documents/
│   ├── documents.module.ts
│   ├── documents.controller.ts
│   ├── documents.service.ts
│   ├── dto/
│   └── entities/
│
├── document-versions/
│   ├── document-versions.module.ts
│   ├── document-versions.controller.ts
│   ├── document-versions.service.ts
│   └── dto/
│
├── fields/
│   ├── fields.module.ts
│   ├── fields.controller.ts
│   ├── fields.service.ts
│   └── dto/
│
├── custom-fields/
│   ├── custom-fields.module.ts
│   ├── custom-fields.controller.ts
│   ├── custom-fields.service.ts
│   └── dto/
│
├── submissions/
│   ├── submissions.module.ts
│   ├── submissions.controller.ts
│   ├── submissions.service.ts
│   └── dto/
│
├── rendering/
│   ├── rendering.module.ts
│   ├── rendering.service.ts
│   ├── pdf-renderer.service.ts
│   └── dto/
│
├── storage/
│   ├── storage.module.ts
│   ├── storage.service.ts
│   └── providers/
│
├── api-keys/
│   ├── api-keys.module.ts
│   ├── api-keys.controller.ts
│   ├── api-keys.service.ts
│   └── guards/
│
├── public-forms/
│   ├── public-forms.module.ts
│   ├── public-forms.controller.ts
│   └── public-forms.service.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── exceptions/
│   └── types/
│
└── config/
    ├── configuration.ts
    └── validation.ts
```

A IA implementadora pode alterar a organização interna, mas deve preservar a separação dos domínios.

---

# 4. Princípios arquiteturais

## 4.1 Document Engine

O backend deve ser responsável por:

```text
Template
+
Dados
+
Regras
=
Documento gerado
```

O backend **não deve conhecer o banco de dados dos sistemas clientes**.

Por exemplo:

```text
Sistema Cliente
      |
      | consulta seus próprios dados
      v
{
  "nomePaciente": "Maria Silva"
}
      |
      | POST
      v
Document API
      |
      v
Template + Data
      |
      v
PDF
```

---

# 5. Conceitos principais

O sistema possui cinco conceitos fundamentais:

```text
Document
    |
    +── DocumentVersion
             |
             +── DocumentPage
             |
             +── DocumentField

Submission
    |
    +── pertence a uma DocumentVersion
    |
    +── possui os dados utilizados
    |
    +── possui documento gerado
```

Além disso:

```text
CustomFieldDefinition
```

representa campos conhecidos pelo sistema de integração.

---

# 6. Estados do documento

Um documento deve possuir:

```typescript
enum DocumentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
```

Regras:

- Um documento novo começa como `DRAFT`.
- Um documento pode possuir várias versões.
- Apenas uma versão pode estar publicada.
- Uma versão publicada não deve ser modificada.
- Para alterar uma versão publicada, criar uma nova versão.
- Uma versão antiga nunca deve ser destruída automaticamente.

---

# 7. Modelo de dados

## 7.1 User

Campos:

```text
id
name
email
passwordHash
role
createdAt
updatedAt
```

Role inicial:

```typescript
enum UserRole {
  ADMIN = 'ADMIN',
}
```

O MVP pode possuir apenas ADMIN.

---

# 8. Document

Tabela:

```text
documents
```

Campos:

```text
id
name
description
status
publicToken
publishedVersionId
createdAt
updatedAt
deletedAt
```

Regras:

- `publicToken` deve ser aleatório e imprevisível.
- Não utilizar o ID do documento como token público.
- `publishedVersionId` pode ser nulo.
- Soft delete é recomendado.
- O documento não deve armazenar diretamente os campos. Campos pertencem às versões.

---

# 9. DocumentVersion

Tabela:

```text
document_versions
```

Campos:

```text
id
documentId
versionNumber
status
template
createdAt
publishedAt
```

Onde `template` contém o Template JSON completo.

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

---

# 10. Imutabilidade das versões

Esta é uma regra crítica.

Depois que:

```text
DocumentVersion.status = PUBLISHED
```

não permitir:

- adicionar campo;
- remover campo;
- alterar posição;
- alterar estilo;
- alterar validação;
- alterar background.

Para alterar o documento:

```text
Version 1
    ↓
create new version
    ↓
Version 2
    ↓
edit
    ↓
publish Version 2
```

Uma Submission sempre aponta para uma versão específica.

Exemplo:

```text
Documento: Contrato X

Version 1
Submission A → Version 1

Version 2
Submission B → Version 2
```

A geração do documento antigo deve continuar funcionando.

---

# 11. DocumentPage

Representa uma página do documento.

Campos:

```text
id
documentVersionId
pageNumber
width
height
backgroundAssetId
createdAt
```

Configurações suportadas:

```typescript
enum PageSize {
  A4 = 'A4',
  A5 = 'A5',
  LETTER = 'LETTER',
  LEGAL = 'LEGAL',
}

enum PageOrientation {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}
```

Utilizar pontos (`pt`) como unidade interna de posicionamento.

---

# 12. DocumentField

Representa um campo dinâmico.

Tipos:

```typescript
enum FieldType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}
```

Input mode:

```typescript
enum FieldInputMode {
  MANUAL = 'MANUAL',
  INTEGRATION = 'INTEGRATION',
}
```

Campos conceituais:

```text
id
documentVersionId
key
label
type
inputMode
position
style
validation
mask
createdAt
```

No MVP, essas propriedades podem ser armazenadas dentro do `template` JSON.

Não é obrigatório duplicar todo o template em tabelas relacionais.

---

# 13. CustomFieldDefinition

Representa um campo conhecido pelo sistema de integração.

Exemplos:

```text
nomePaciente
nomeEmpresa
numeroContrato
codigoCliente
numeroProntuario
```

Campos:

```text
id
key
label
type
inputMode
validation
formatting
createdAt
updatedAt
```

Exemplo:

```json
{
  "key": "nomePaciente",
  "label": "Nome do paciente",
  "type": "TEXT",
  "inputMode": "INTEGRATION"
}
```

A plataforma não precisa saber de onde vem `nomePaciente`.

---

# 14. Regra de Custom Fields

Custom fields possuem significado para o sistema cliente.

O backend apenas conhece:

```text
key
type
validation
formatting
```

Não deve existir lógica como:

```typescript
if (field.key === 'nomePaciente') {
   buscarPaciente();
}
```

Isso é proibido.

A aplicação cliente deve enviar o valor:

```json
{
  "nomePaciente": "Maria Silva"
}
```

---

# 15. Submission

Cada preenchimento representa uma Submission.

Campos:

```text
id
documentId
documentVersionId
data
status
generatedAssetId
createdAt
updatedAt
```

Status:

```typescript
enum SubmissionStatus {
  SUBMITTED = 'SUBMITTED',
  GENERATED = 'GENERATED',
  FAILED = 'FAILED',
}
```

O campo `data` deve ser JSON/JSONB.

Exemplo:

```json
{
  "nomeCliente": "João Silva",
  "nomePaciente": "Maria Silva",
  "numeroContrato": "CTR-001"
}
```

---

# 16. Regra fundamental da Submission

Nunca utilizar apenas:

```text
documentId
```

para descobrir como gerar uma Submission antiga.

Sempre utilizar:

```text
documentVersionId
```

Assim:

```text
Submission
    ↓
DocumentVersion
    ↓
Template original
```

Isso garante consistência histórica.

---

# 17. Assets

Arquivos físicos não devem ser armazenados diretamente no PostgreSQL.

Utilizar Object Storage.

Exemplos:

```text
PDF importado
DOCX importado
imagem
background
PDF gerado
arquivo enviado
```

Tabela:

```text
assets
```

Campos:

```text
id
storageKey
originalName
mimeType
size
url
createdAt
```

A URL pode ser pública ou assinada dependendo da implementação.

Para arquivos privados, preferir URLs temporárias assinadas.

---

# 18. StorageService

Criar uma abstração:

```typescript
interface StorageService {
  upload(file: Buffer, options): Promise<Asset>;
  delete(assetId: string): Promise<void>;
  getSignedUrl(assetId: string): Promise<string>;
  getObject(assetId: string): Promise<Buffer>;
}
```

Implementação inicial:

```text
S3StorageService
```

Deve funcionar também com MinIO.

---

# 19. Template JSON

O Template JSON é o contrato central entre:

```text
Angular Builder
        ↓
Backend
        ↓
Renderer
```

O backend deve validar sua estrutura.

Estrutura mínima:

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

  style?: {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    verticalAlignment?: 'TOP' | 'CENTER' | 'BOTTOM';
  };

  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: string;
    min?: number;
    max?: number;
    decimalPlaces?: number;
  };

  mask?: string;
}
```

---

# 20. Template Validation

Criar um serviço:

```typescript
TemplateValidatorService
```

Responsabilidades:

- verificar estrutura;
- verificar páginas;
- verificar campos;
- verificar tipos;
- verificar posições;
- verificar campos duplicados;
- verificar referências de assets;
- verificar propriedades inválidas.

Exemplo de erro:

```json
{
  "code": "INVALID_TEMPLATE",
  "message": "Template contains duplicated field key",
  "details": {
    "key": "nomeCliente"
  }
}
```

---

# 21. Validação dos dados

Criar:

```typescript
SubmissionValidationService
```

Entrada:

```text
DocumentVersion
+
data
```

Saída:

```text
valid
```

ou erros estruturados.

Exemplo:

```json
{
  "valid": false,
  "errors": [
    {
      "field": "nomeCliente",
      "code": "REQUIRED",
      "message": "Field is required"
    }
  ]
}
```

---

# 22. Regras de validação

## TEXT

Suportar:

```text
required
minLength
maxLength
regex
```

## NUMBER

Suportar:

```text
required
min
max
decimalPlaces
```

## DATE

Suportar:

```text
required
minDate
maxDate
```

## IMAGE

Validar:

```text
URL válida
MIME permitido
tamanho máximo
```

## FILE

Validar:

```text
URL válida
MIME permitido
tamanho máximo
```

---

# 23. Input Mode

## MANUAL

O campo:

- aparece no formulário público;
- pode ser preenchido pelo usuário;
- deve ser validado.

## INTEGRATION

O campo:

- não aparece no formulário público;
- deve ser recebido via API;
- deve ser validado;
- não pode ser fornecido pelo usuário através do formulário público.

Exemplo:

```text
nomeCliente → MANUAL
nomePaciente → INTEGRATION
```

Formulário:

```text
Nome do cliente: [__________]
```

API:

```json
{
  "nomeCliente": "João",
  "nomePaciente": "Maria"
}
```

---

# 24. Document API

## Criar documento

```http
POST /api/v1/documents
```

Request:

```json
{
  "name": "Contrato de Prestação de Serviço",
  "description": "Contrato padrão"
}
```

Response:

```json
{
  "id": "doc_123",
  "name": "Contrato de Prestação de Serviço",
  "status": "DRAFT"
}
```

---

# 25. Listar documentos

```http
GET /api/v1/documents
```

Suportar:

```text
page
limit
status
search
```

Response:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0
  }
}
```

---

# 26. Buscar documento

```http
GET /api/v1/documents/:documentId
```

Retornar:

- documento;
- status;
- versão publicada;
- metadados;
- datas.

---

# 27. Criar versão

```http
POST /api/v1/documents/:documentId/versions
```

Pode:

1. criar versão vazia;
2. clonar a última versão;
3. receber um template inicial.

Exemplo:

```json
{
  "sourceVersionId": "version_1"
}
```

---

# 28. Atualizar versão

```http
PUT /api/v1/documents/:documentId/versions/:versionId
```

Request:

```json
{
  "template": {}
}
```

Só permitir se a versão estiver em:

```text
DRAFT
```

Se estiver publicada:

```text
409 CONFLICT
```

---

# 29. Publicar versão

```http
POST /api/v1/documents/:documentId/versions/:versionId/publish
```

Antes de publicar:

1. validar template;
2. verificar campos;
3. verificar assets;
4. verificar referências;
5. garantir que campos obrigatórios possuem configuração válida.

Depois:

```text
version.status = PUBLISHED
document.publishedVersionId = version.id
document.status = PUBLISHED
```

Se existir versão publicada anterior:

```text
ARCHIVED
```

---

# 30. Schema do documento

Endpoint:

```http
GET /api/v1/documents/:documentId/schema
```

Esse endpoint deve retornar o contrato necessário para que um sistema externo saiba como preencher o documento.

Exemplo:

```json
{
  "documentId": "doc-123",
  "version": 3,
  "fields": [
    {
      "key": "nomeCliente",
      "label": "Nome do cliente",
      "type": "TEXT",
      "inputMode": "MANUAL",
      "required": true
    },
    {
      "key": "nomePaciente",
      "label": "Nome do paciente",
      "type": "TEXT",
      "inputMode": "INTEGRATION",
      "required": true
    }
  ]
}
```

O schema deve representar a versão publicada.

---

# 31. Public Form

Cada documento publicado deve possuir:

```text
publicToken
```

URL conceitual:

```text
/f/{publicToken}
```

Endpoint backend:

```http
GET /api/v1/public/forms/:publicToken
```

Deve retornar:

- informações públicas;
- campos MANUAL;
- propriedades necessárias para renderização do formulário;
- versão publicada.

Não retornar informações administrativas desnecessárias.

Campos `INTEGRATION` não devem aparecer como inputs.

---

# 32. Public Submission

Endpoint:

```http
POST /api/v1/public/forms/:publicToken/submissions
```

Exemplo:

```json
{
  "data": {
    "nomeCliente": "João Silva"
  }
}
```

Fluxo:

```text
publicToken
    ↓
buscar documento
    ↓
buscar versão publicada
    ↓
identificar campos MANUAL
    ↓
validar dados
    ↓
rejeitar campos INTEGRATION
    ↓
criar Submission
    ↓
gerar PDF
    ↓
salvar PDF
    ↓
retornar resultado
```

---

# 33. Integração API

Utilizar API Key.

Header:

```http
Authorization: Bearer <API_KEY>
```

A API Key não deve ser armazenada em texto puro.

Armazenar hash.

Exemplo:

```text
api_keys
    id
    name
    keyHash
    lastUsedAt
    expiresAt
    revokedAt
    createdAt
```

---

# 34. Criar API Key

Endpoint administrativo:

```http
POST /api/v1/api-keys
```

Request:

```json
{
  "name": "Sistema Hospitalar"
}
```

A chave completa deve ser exibida apenas uma vez.

Exemplo:

```json
{
  "id": "key_123",
  "name": "Sistema Hospitalar",
  "apiKey": "..."
}
```

Nunca armazenar o valor original.

---

# 35. Submission via API

Endpoint:

```http
POST /api/v1/documents/:documentId/submissions
```

Autenticação:

```text
API Key
```

Request:

```json
{
  "data": {
    "nomeCliente": "João Silva",
    "nomePaciente": "Maria Silva",
    "numeroContrato": "CTR-001"
  }
}
```

O backend deve:

1. autenticar API Key;
2. buscar versão publicada;
3. validar todos os campos;
4. verificar campos obrigatórios;
5. verificar campos desconhecidos;
6. verificar tipos;
7. criar Submission;
8. gerar PDF;
9. armazenar PDF;
10. retornar Submission.

---

# 36. Response da Submission

Não retornar o PDF diretamente como resposta principal.

Retornar:

```json
{
  "submissionId": "sub-123",
  "documentId": "doc-123",
  "version": 3,
  "status": "GENERATED",
  "documentUrl": "/api/v1/submissions/sub-123/document"
}
```

Isso permite futuramente transformar a geração em processo assíncrono sem quebrar o contrato da API.

---

# 37. Buscar Submission

```http
GET /api/v1/submissions/:submissionId
```

Retornar:

```json
{
  "id": "sub-123",
  "documentId": "doc-123",
  "documentVersionId": "version-3",
  "status": "GENERATED",
  "data": {},
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

# 38. Download do documento

```http
GET /api/v1/submissions/:submissionId/document
```

Fluxo:

```text
Submission
    ↓
generatedAsset
    ↓
Storage
    ↓
PDF
```

Pode:

- retornar stream;
- ou redirecionar para URL assinada.

Preferir stream ou URL assinada de curta duração.

---

# 39. Custom Fields API

## Criar

```http
POST /api/v1/custom-fields
```

Request:

```json
{
  "key": "nomePaciente",
  "label": "Nome do paciente",
  "type": "TEXT",
  "inputMode": "INTEGRATION"
}
```

---

## Listar

```http
GET /api/v1/custom-fields
```

---

## Atualizar

```http
PUT /api/v1/custom-fields/:id
```

---

## Remover

```http
DELETE /api/v1/custom-fields/:id
```

Não permitir apagar um CustomFieldDefinition que esteja sendo utilizado por versões publicadas.

---

# 40. PDF Import

Endpoint:

```http
POST /api/v1/documents/:documentId/import/pdf
```

Processo:

```text
upload PDF
    ↓
validar MIME
    ↓
validar tamanho
    ↓
armazenar Asset
    ↓
obter páginas
    ↓
criar DocumentPage
    ↓
associar background
```

O PDF será utilizado como background.

O backend **não deve editar o conteúdo original do PDF**.

---

# 41. DOCX Import

Endpoint:

```http
POST /api/v1/documents/:documentId/import/docx
```

No MVP:

```text
DOCX
 ↓
converter/renderizar
 ↓
PDF/imagem
 ↓
background
```

Não implementar editor de Word.

O conteúdo original do DOCX não precisa ser editável dentro do Builder.

---

# 42. Renderização

Criar uma abstração:

```typescript
interface DocumentRenderer {
  render(
    template: DocumentTemplate,
    data: Record<string, unknown>,
  ): Promise<Buffer>;
}
```

Implementação:

```text
PdfDocumentRenderer
```

O renderer deve:

1. criar documento;
2. percorrer páginas;
3. desenhar background;
4. percorrer campos;
5. buscar valor;
6. aplicar máscara;
7. aplicar estilo;
8. renderizar;
9. gerar PDF.

---

# 43. Data Resolver

Criar:

```typescript
DataResolverService
```

Responsável por resolver:

```text
field.key → data[field.key]
```

Exemplo:

```text
nomeCliente
```

resolve:

```typescript
data["nomeCliente"]
```

Não executar código arbitrário.

Não utilizar eval.

Não executar expressões enviadas pelo cliente.

---

# 44. Máscaras

Criar:

```typescript
MaskService
```

Suportar inicialmente:

```text
CPF
CNPJ
CEP
PHONE
```

Exemplo:

```text
12345678900
```

vira:

```text
123.456.789-00
```

A máscara deve ser aplicada na apresentação/renderização.

O dado original pode continuar armazenado sem máscara.

---

# 45. Arquivos e URLs

O MVP pode receber:

```json
{
  "logoEmpresa": "https://empresa.com/logo.png"
}
```

Antes de baixar uma URL externa:

1. validar protocolo;
2. impedir `file://`;
3. impedir acesso a localhost;
4. impedir acesso a redes privadas;
5. controlar redirects;
6. definir timeout;
7. limitar tamanho;
8. validar MIME;
9. rejeitar conteúdo incompatível.

Isso é necessário para evitar SSRF.

---

# 46. Segurança

Implementar:

## Authentication

JWT para usuários administrativos.

## Authorization

Inicialmente:

```text
ADMIN
```

Todos os endpoints administrativos devem exigir autenticação.

## API Key

Integrações usam:

```http
Authorization: Bearer <API_KEY>
```

Não utilizar JWT de usuário para integrações.

## Rate limiting

Aplicar especialmente em:

```text
public forms
API submissions
authentication
```

## Input validation

Todas as entradas devem utilizar DTOs e validação.

## File validation

Validar:

```text
MIME
size
extension
content
```

Não confiar somente na extensão.

---

# 47. HTTP Status Codes

Utilizar corretamente:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

Exemplo:

Versão publicada sendo alterada:

```http
409 Conflict
```

Dados inválidos:

```http
422 Unprocessable Entity
```

---

# 48. Formato de erros

Padronizar:

```json
{
  "statusCode": 422,
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": [
    {
      "field": "nomeCliente",
      "code": "REQUIRED",
      "message": "Field is required"
    }
  ],
  "timestamp": "2026-09-02T20:00:00Z",
  "path": "/api/v1/documents/doc-123/submissions"
}
```

Criar Exception Filter global.

---

# 49. Swagger

Disponibilizar:

```text
/api/docs
```

Todos os endpoints devem possuir:

- descrição;
- DTOs;
- exemplos;
- responses;
- códigos HTTP;
- autenticação.

Swagger deve permitir testar:

```text
JWT
API Key
```

---

# 50. Configuração

Utilizar `.env`.

Exemplo:

```env
NODE_ENV=development

PORT=3000

DATABASE_URL=postgresql://...

JWT_SECRET=...

JWT_EXPIRES_IN=1d

STORAGE_ENDPOINT=http://localhost:9000
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY=...
STORAGE_SECRET_KEY=...
STORAGE_BUCKET=documents

MAX_FILE_SIZE=10485760

PUBLIC_FORM_BASE_URL=http://localhost:4200/f
```

Nunca colocar secrets diretamente no código.

---

# 51. Docker

Criar:

```text
Dockerfile
docker-compose.yml
```

O ambiente local deve subir:

```text
NestJS
PostgreSQL
MinIO
```

Opcionalmente:

```text
pgAdmin
MinIO Console
```

---

# 52. Prisma

Utilizar Prisma migrations.

Comandos esperados:

```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

Criar seed inicial com:

```text
ADMIN
```

Não utilizar `synchronize` em produção.

---

# 53. Índices

Criar índices para:

```text
documents.status
documents.publicToken
document_versions.documentId
document_versions.status
submissions.documentId
submissions.documentVersionId
submissions.createdAt
custom_field_definitions.key
api_keys.keyHash
```

`publicToken` e `custom_field_definitions.key` devem possuir unicidade quando aplicável.

---

# 54. Transações

Usar transação quando necessário.

Exemplo de publicação:

```text
BEGIN

arquivar versão anterior
publicar nova versão
atualizar document.publishedVersionId
atualizar document.status

COMMIT
```

Criar Submission:

```text
BEGIN

validar
criar submission

COMMIT
```

A geração do PDF pode ocorrer depois da persistência inicial.

---

# 55. Geração de PDF

No MVP pode ser síncrona:

```text
POST submission
      ↓
validate
      ↓
create submission
      ↓
render PDF
      ↓
upload PDF
      ↓
update submission
      ↓
response
```

Porém, estruturar o código para permitir posteriormente:

```text
POST
 ↓
Submission = PROCESSING
 ↓
Queue
 ↓
Worker
 ↓
PDF
```

Não implementar fila no MVP.

---

# 56. Estados futuros

Não é necessário implementar agora, mas não bloquear:

```text
DRAFT
SUBMITTED
GENERATED
SIGNED
CANCELLED
EXPIRED
```

Digital signature será implementada posteriormente.

---

# 57. Access Policy

O MVP deve trabalhar somente com formulário público.

Porém, evitar modelar a regra diretamente como:

```typescript
isPublic: boolean
```

Criar uma abstração preparada para:

```typescript
enum AccessMode {
  PUBLIC = 'PUBLIC',
  AUTHENTICATED = 'AUTHENTICATED',
  RESTRICTED = 'RESTRICTED',
  PRIVATE = 'PRIVATE',
}
```

No MVP:

```text
PUBLIC
```

é o único modo implementado.

---

# 58. Auditoria

Criar estrutura preparada para auditoria.

Não é necessário implementar uma solução completa no primeiro MVP, mas eventos importantes devem possuir logs:

```text
document.created
document.version.created
document.version.published
submission.created
submission.generated
api_key.created
api_key.revoked
```

---

# 59. Logging

Utilizar logger estruturado.

Nunca registrar:

- API Keys;
- JWT;
- passwords;
- dados sensíveis completos de Submission;
- URLs contendo tokens privados.

Exemplo:

```json
{
  "event": "submission.generated",
  "submissionId": "sub-123",
  "documentId": "doc-123",
  "versionId": "version-3"
}
```

---

# 60. Testes

O MVP deve possuir:

## Unit tests

Testar:

```text
TemplateValidatorService
SubmissionValidationService
MaskService
DataResolverService
DocumentsService
DocumentVersionsService
CustomFieldsService
```

## Integration tests

Testar:

```text
create document
create version
publish version
submit data
generate document
```

## E2E

Testar pelo menos:

### Cenário 1 — Documento vazio

```text
create document
→ create version
→ configure template
→ publish
→ submit
→ generate PDF
```

### Cenário 2 — Documento com integração

```text
create custom field
→ create document
→ use custom field
→ publish
→ POST integration data
→ generate PDF
```

### Cenário 3 — Versionamento

```text
Version 1
→ publish
→ submission A

Version 2
→ publish
→ submission B

submission A deve continuar usando Version 1
```

### Cenário 4 — Campo Integration Only

```text
public form
→ integration field não aparece

API
→ integration field pode ser enviado
```

---

# 61. Regras de negócio críticas

A IA deve tratar estas regras como invariantes.

### Regra 1

Uma versão publicada é imutável.

### Regra 2

Toda Submission referencia uma versão específica.

### Regra 3

O documento atualmente publicado pode mudar, mas Submissions antigas não mudam.

### Regra 4

Campos `INTEGRATION` não podem ser preenchidos pelo formulário público.

### Regra 5

O cliente é responsável por buscar seus próprios dados.

### Regra 6

O backend não acessa diretamente bancos externos.

### Regra 7

PDF importado é background.

### Regra 8

PDF importado não é editado pelo sistema.

### Regra 9

DOCX importado não vira um editor Word.

### Regra 10

Arquivos binários ficam no Object Storage.

### Regra 11

Dados dinâmicos da Submission ficam em JSON/JSONB.

### Regra 12

Template e dados são separados.

### Regra 13

O renderer não deve conter regras específicas de negócio.

### Regra 14

Não implementar microservices no MVP.

---

# 62. Fluxo completo — Builder

```text
Angular
   |
   | POST /documents
   v
Backend
   |
   | cria Document
   v
Document
   |
   | cria Version
   v
DocumentVersion
   |
   | salva Template JSON
   v
PostgreSQL
```

Ao publicar:

```text
Angular
   |
   | POST /publish
   v
Backend
   |
   +--> validate template
   |
   +--> validate assets
   |
   +--> publish version
   |
   +--> update document
```

---

# 63. Fluxo completo — Formulário

```text
Usuário
   |
   | GET /public/forms/{token}
   v
Backend
   |
   +--> Document
   |
   +--> Published Version
   |
   +--> Manual Fields
   |
   v
Angular Form
   |
   | POST
   v
Backend
   |
   +--> validate
   |
   +--> Submission
   |
   +--> Renderer
   |
   +--> Storage
   |
   v
PDF
```

---

# 64. Fluxo completo — Integração

```text
Sistema Cliente
       |
       | GET schema
       v
Document API
       |
       v
Schema

Sistema Cliente
       |
       | POST data
       v
Document API
       |
       +--> API Key
       |
       +--> Published Version
       |
       +--> Validation
       |
       +--> Submission
       |
       +--> Renderer
       |
       +--> Storage
       |
       v
PDF
```

---

# 65. Ordem obrigatória de implementação

A IA deve implementar o projeto incrementalmente nesta ordem.

## Fase 1 — Fundação

Implementar:

```text
NestJS
Prisma
PostgreSQL
ConfigModule
Swagger
Global validation
Exception filter
Logger
Docker
```

---

## Fase 2 — Authentication

Implementar:

```text
User
JWT
AuthGuard
ADMIN
login
```

Endpoints:

```http
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

---

## Fase 3 — Documents

Implementar:

```text
Document
DocumentService
DocumentController
CRUD
```

---

## Fase 4 — Versions

Implementar:

```text
DocumentVersion
version creation
version editing
version publishing
immutability
```

---

## Fase 5 — Template

Implementar:

```text
DocumentTemplate
DocumentTemplateField
TemplateValidatorService
```

Criar testes extensivos.

Esta é uma das partes mais importantes do projeto.

---

## Fase 6 — Storage

Implementar:

```text
Asset
StorageService
S3StorageService
MinIO
upload
download
signed URLs
```

---

## Fase 7 — Rendering

Implementar:

```text
DocumentRenderer
PdfDocumentRenderer
DataResolverService
MaskService
```

Primeiro suportar:

```text
TEXT
NUMBER
DATE
```

Depois:

```text
IMAGE
FILE
```

---

# 66. Fase 8 — Submission

Implementar:

```text
Submission
SubmissionService
SubmissionValidationService
```

Fluxo:

```text
data
→ validate
→ persist
→ render
→ store
→ update status
```

---

# 67. Fase 9 — Public Forms

Implementar:

```text
publicToken
public form schema
public submission
```

Endpoints:

```http
GET  /api/v1/public/forms/:token
POST /api/v1/public/forms/:token/submissions
```

---

# 68. Fase 10 — API Keys

Implementar:

```text
ApiKey
ApiKeyService
ApiKeyGuard
```

Depois proteger:

```http
GET schema
POST submission
GET submission
GET document
```

---

# 69. Fase 11 — Custom Fields

Implementar:

```text
CustomFieldDefinition
CRUD
INTEGRATION mode
```

Integrar com:

```text
TemplateValidator
SubmissionValidator
Schema
Renderer
```

---

# 70. Fase 12 — Importação

Implementar:

```text
PDF upload
PDF background
DOCX conversion
background assets
```

---

# 71. Endpoints finais do MVP

## Authentication

```http
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

## Documents

```http
GET    /api/v1/documents
POST   /api/v1/documents
GET    /api/v1/documents/:id
PUT    /api/v1/documents/:id
DELETE /api/v1/documents/:id
```

## Versions

```http
GET  /api/v1/documents/:id/versions
POST /api/v1/documents/:id/versions
GET  /api/v1/documents/:id/versions/:versionId
PUT  /api/v1/documents/:id/versions/:versionId
POST /api/v1/documents/:id/versions/:versionId/publish
```

## Schema

```http
GET /api/v1/documents/:id/schema
```

## Public Forms

```http
GET  /api/v1/public/forms/:token
POST /api/v1/public/forms/:token/submissions
```

## Submissions

```http
GET  /api/v1/submissions
GET  /api/v1/submissions/:id
GET  /api/v1/submissions/:id/document
```

## Integration Submissions

```http
POST /api/v1/documents/:id/submissions
```

## Custom Fields

```http
GET    /api/v1/custom-fields
POST   /api/v1/custom-fields
GET    /api/v1/custom-fields/:id
PUT    /api/v1/custom-fields/:id
DELETE /api/v1/custom-fields/:id
```

## API Keys

```http
GET    /api/v1/api-keys
POST   /api/v1/api-keys
DELETE /api/v1/api-keys/:id
```

## Import

```http
POST /api/v1/documents/:id/import/pdf
POST /api/v1/documents/:id/import/docx
```

---

# 72. Critérios de aceite do backend

O backend será considerado funcional quando for possível executar o seguinte fluxo sem intervenção manual no banco:

```text
1. Login como ADMIN
        ↓
2. Criar documento
        ↓
3. Criar versão
        ↓
4. Criar template
        ↓
5. Adicionar campos
        ↓
6. Publicar versão
        ↓
7. Obter schema
        ↓
8. Obter formulário público
        ↓
9. Enviar dados
        ↓
10. Criar Submission
        ↓
11. Gerar PDF
        ↓
12. Armazenar PDF
        ↓
13. Fazer download
```

Também deve ser possível:

```text
1. Criar CustomField
2. Adicioná-lo ao template
3. Publicar
4. Enviar valor através da API
5. Gerar PDF
```

E:

```text
Version 1
→ publish
→ Submission A

Version 2
→ publish
→ Submission B

Submission A continua vinculada à Version 1.
```

---

# 73. O que NÃO implementar no MVP

Não implementar:

```text
Microservices
OAuth2
GraphQL
WebSockets
Real-time collaboration
Digital signature
Workflow
Approval
Conditional fields
Calculated fields
AI generation
OCR
Full PDF editing
Full DOCX editing
Google Docs-like editor
Multiple external databases
Native mobile app
Multi-tenancy
```

Esses recursos podem ser adicionados posteriormente.

---

# 74. Diretrizes para a IA implementadora

A IA que gerar o código deve:

1. Não criar funcionalidades fora do escopo.
2. Não introduzir microservices.
3. Não criar multi-tenancy.
4. Não acessar bancos de clientes.
5. Não usar `any` quando um tipo adequado puder ser criado.
6. Criar DTOs para entradas HTTP.
7. Validar todas as entradas.
8. Não colocar regras de negócio nos Controllers.
9. Manter Services coesos.
10. Utilizar transações quando necessário.
11. Criar testes para regras críticas.
12. Documentar endpoints no Swagger.
13. Não armazenar arquivos binários no PostgreSQL.
14. Não armazenar API Keys em texto puro.
15. Não permitir alteração de versões publicadas.
16. Nunca perder a referência da versão utilizada por uma Submission.
17. Manter Renderer independente de Controller.
18. Não criar lógica de negócio específica para campos como `nomePaciente`.
19. Não utilizar `eval`.
20. Não executar código recebido através do Template JSON.

---

# 75. Estratégia recomendada para geração por IA

Não solicitar à IA:

> "Crie todo o backend do projeto."

O projeto é grande demais para gerar de uma única vez com qualidade.

Utilizar prompts incrementais.

### Prompt 1

```text
Implemente a fundação NestJS do projeto conforme a especificação.

Crie:
- configuração
- Prisma
- PostgreSQL
- Docker
- Swagger
- validação global
- Exception Filter
- estrutura modular

Não implemente funcionalidades fora desta etapa.
```

### Prompt 2

```text
Agora implemente Authentication e Users conforme a especificação.

Crie:
- Prisma models
- migrations
- seed
- login JWT
- AuthGuard
- ADMIN
- testes

Não altere contratos já implementados.
```

### Prompt 3

```text
Agora implemente Documents e DocumentVersions.

Respeite rigorosamente:
- versionamento
- imutabilidade
- publishedVersionId
- regras de negócio
- DTOs
- testes

Não implemente Submission ainda.
```

### Prompt 4

```text
Agora implemente o Template Engine.

Crie:
- tipos TypeScript
- TemplateValidatorService
- validações
- testes unitários

O Template JSON é um contrato central do sistema.
Não implemente renderer ainda.
```

### Prompt 5

```text
Agora implemente Storage usando S3-compatible storage e MinIO.

Crie:
- Asset
- StorageService
- S3StorageService
- upload
- download
- signed URLs
- validação de arquivos
- testes
```

### Prompt 6

```text
Agora implemente o PDF Renderer.

O renderer deve receber:

Template + Data

e produzir:

PDF Buffer

Implemente:
- texto
- número
- data
- estilos
- posição
- background
- máscaras

Não coloque regras de negócio no renderer.
```

### Prompt 7

```text
Agora implemente Submission e SubmissionValidationService.

Respeite:
- DocumentVersion
- MANUAL
- INTEGRATION
- JSON/JSONB
- validações
- geração de PDF
- Asset

Crie testes unitários e E2E.
```

### Prompt 8

```text
Agora implemente Public Forms.

Crie:
- publicToken
- GET public form
- POST public submission
- proteção contra campos INTEGRATION
- rate limiting

Não criar autenticação para o formulário neste MVP.
```

### Prompt 9

```text
Agora implemente API Keys e os endpoints de integração.

A API Key deve:
- ser armazenada apenas como hash
- autenticar via Bearer
- possuir revogação
- possuir lastUsedAt

Implemente:
- schema
- submission
- submission retrieval
- document retrieval
```

### Prompt 10

```text
Agora implemente CustomFieldDefinition.

Integre com:
- Template
- Validation
- Schema
- Submission
- Renderer

Não crie lógica específica para nenhum campo de negócio.
```

---

# 76. Definição de pronto

Uma funcionalidade somente será considerada concluída quando possuir:

```text
[ ] Entity/model
[ ] Migration
[ ] DTO
[ ] Service
[ ] Controller
[ ] Validation
[ ] Authorization
[ ] Swagger
[ ] Error handling
[ ] Unit tests
[ ] Integration/E2E test quando aplicável
```

Não considerar uma feature pronta apenas porque o endpoint responde.

---

# 77. Arquitetura final esperada

```text
                         ┌─────────────────────┐
                         │      Angular        │
                         │  Builder / Forms    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌────────────────────────────┐
                    │       NestJS API           │
                    │                            │
                    │ Auth                       │
                    │ Documents                  │
                    │ Versions                   │
                    │ Fields                     │
                    │ Custom Fields              │
                    │ Submissions                │
                    │ Public Forms               │
                    │ API Keys                   │
                    └──────────────┬─────────────┘
                                   │
             ┌─────────────────────┼─────────────────────┐
             │                     │                     │
             ▼                     ▼                     ▼
      ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
      │ PostgreSQL   │     │ Object       │     │ PDF Renderer │
      │              │     │ Storage      │     │              │
      │ Metadata     │     │              │     │ Template     │
      │ Templates    │     │ PDF          │     │ + Data       │
      │ Submissions  │     │ DOCX         │     │ → PDF        │
      └──────────────┘     │ Images       │     └──────────────┘
                           └──────────────┘
```

---

# 78. Prioridade técnica

A ordem de importância dos componentes é:

```text
1. DocumentVersion
2. Template JSON
3. Submission
4. TemplateValidator
5. Renderer
6. CustomFieldDefinition
7. Storage
8. Public Form
9. API Key
10. Import PDF/DOCX
```

Se houver necessidade de simplificar o MVP, **não simplificar os itens 1–5**, pois eles formam o núcleo do produto.

---

# 79. Resultado esperado

Ao final do MVP, deve existir um backend capaz de receber:

```json
{
  "template": "...",
  "data": {
    "nomeCliente": "João Silva",
    "nomePaciente": "Maria Silva"
  }
}
```

e produzir:

```text
PDF preenchido
```

sem que o backend precise conhecer:

```text
quem é o paciente
quem é o cliente
onde os dados estão armazenados
qual sistema originou os dados
```

O backend deve conhecer somente:

```text
Template
+
Field Definitions
+
Input Data
+
Validation Rules
+
Rendering Rules
```

Esse é o núcleo arquitetural do produto.