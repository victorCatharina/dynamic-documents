# Dynamic Documents — Plataforma de Documentos Dinâmicos

Plataforma completa para **criação visual, gerenciamento, versionamento imutável, preenchimento e geração de documentos dinâmicos (PDF)** com suporte a integrações externas via API REST.

---

## 🏛️ Arquitetura do Sistema

O projeto é construído como um **Modular Monolith** em NestJS seguindo rigorosamente o PRD e a Especificação Técnica:

$$\text{Template JSON} + \text{Dados de Entrada} + \text{Regras de Validação/Estilo} \longrightarrow \text{Documento PDF Gerado}$$

```
portal-documentos-dinamicos/
├── backend/                  # NestJS + TypeScript + Prisma + PDF Engine API
│   ├── src/
│   │   ├── auth/             # Autenticação JWT, login e guards
│   │   ├── users/            # Gestão de usuários e permissões (ADMIN)
│   │   ├── documents/        # CRUD de documentos, status e schema
│   │   ├── document-versions/# Versionamento estritamente imutável & publicação
│   │   ├── templates/        # Tipos e TemplateValidatorService
│   │   ├── custom-fields/    # Catálogo de conceitos de negócio (ex: nomePaciente)
│   │   ├── storage/          # LocalStorageService & S3StorageService (MinIO/S3) + SSRF
│   │   ├── rendering/        # PdfDocumentRenderer (pdf-lib), DataResolver e MaskService
│   │   ├── submissions/      # SubmissionService, validação e persistência histórica
│   │   ├── public-forms/     # Formulário público (/f/:token) com proteção MANUAL only
│   │   ├── api-keys/         # Emissão de API Keys seguras (SHA-256) e integração
│   │   └── import/           # Importação de PDF/DOCX como background
│   ├── prisma/
│   │   ├── schema.prisma     # Modelagem PostgreSQL completa com índices
│   │   └── seed.ts           # População do admin inicial e campos personalizados
│   └── Dockerfile
├── frontend/                 # Web Studio & Form Engine (Vite + TypeScript + Modern UI)
│   ├── src/
│   │   ├── views/
│   │   │   ├── LoginView.ts          # Autenticação administrativa
│   │   │   ├── DocumentsView.ts      # Dashboard e listagem de documentos
│   │   │   ├── BuilderView.ts        # Editor Drag & Drop visual de documentos
│   │   │   ├── PublicFormView.ts     # Formulário público dinâmico com máscaras
│   │   │   ├── SubmissionsView.ts    # Histórico de submissões e download de PDF
│   │   │   ├── CustomFieldsView.ts   # Gestão do catálogo de campos customizados
│   │   │   ├── ApiKeysView.ts        # Emissão e revogação de API Keys
│   │   │   └── ApiPlaygroundView.ts  # Testador de Schema e envio de submissões
│   │   └── styles/index.css          # Design System completo
├── docker-compose.yml        # Orquestração PostgreSQL 16 + MinIO + API
└── package.json
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** & **Docker Compose** (opcional para rodar PostgreSQL e MinIO)

---

### 1. Inicializando com Docker Compose (PostgreSQL + MinIO + Backend)

```bash
# Subir PostgreSQL, MinIO e Backend
npm run docker:up

# Acessar a documentação Swagger da API
http://localhost:3000/api/docs
```

---

### 2. Inicializando Localmente (Desenvolvimento)

#### Backend:
```bash
cd backend
npm install
npx prisma generate

# Executar migrações / sincronização com o banco
npx prisma db push

# Popular usuário administrador inicial e campos padrões
npm run prisma:seed

# Iniciar servidor em modo watch
npm run start:dev
```
O backend estará rodando em: `http://localhost:3000`  
Swagger interativo disponível em: `http://localhost:3000/api/docs`

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```
O frontend estará acessível em: `http://localhost:5173`

---

## 🔐 Credenciais Padrão

| Usuário | E-mail | Senha | Perfil |
|---|---|---|---|
| **Administrador** | `admin@dynamicdocs.com` | `Admin123!` | `ADMIN` |

---

## 🧪 Suíte de Testes Automatizados

Para rodar todos os testes unitários e a suíte de integração dos 4 cenários críticos:

```bash
cd backend
npm test
```

### Cobertura de Cenários E2E Testados:
1. **Cenário 1 — Documento Vazio**: Ciclo completo de criação $\rightarrow$ versão $\rightarrow$ template $\rightarrow$ publicação $\rightarrow$ submissão $\rightarrow$ PDF gerado e validado.
2. **Cenário 2 — Documento com Integração**: Custom Field com `INTEGRATION` $\rightarrow$ Envio via API com API Key $\rightarrow$ Validação de tipos e máscaras $\rightarrow$ Geração do PDF.
3. **Cenário 3 — Versionamento e Imutabilidade**: Version 1 publicada $\rightarrow$ Submissão A gerada $\rightarrow$ Version 2 publicada $\rightarrow$ Submissão B gerada $\rightarrow$ Submissão A continua reproduzível no template original da Version 1.
4. **Cenário 4 — Proteção de Campos Integration Only**: Rejeição estrita com código 422 de qualquer campo `INTEGRATION` enviado via formulário público.

---

## 📑 Principais Endpoints da API

### Autenticação
- `POST /api/v1/auth/login` — Login com e-mail e senha (retorna JWT)
- `GET /api/v1/auth/me` — Perfil do usuário autenticado

### Documentos & Versões
- `GET /api/v1/documents` — Listar documentos (busca e paginação)
- `POST /api/v1/documents` — Criar novo documento (gera versão 1 automaticamente)
- `GET /api/v1/documents/:id` — Buscar documento
- `PUT /api/v1/documents/:id` — Atualizar metadados
- `DELETE /api/v1/documents/:id` — Soft delete do documento
- `GET /api/v1/documents/:id/schema` — Consultar schema contratual para sistemas externos
- `GET /api/v1/documents/:id/versions` — Listar versões
- `POST /api/v1/documents/:id/versions` — Criar nova versão (suporta `sourceVersionId`)
- `PUT /api/v1/documents/:id/versions/:versionId` — Atualizar template (apenas se DRAFT)
- `POST /api/v1/documents/:id/versions/:versionId/publish` — Publicar versão (imutável)

### Formulário Público (Sem Autenticação)
- `GET /api/v1/public/forms/:token` — Retorna apenas campos `MANUAL`
- `POST /api/v1/public/forms/:token/submissions` — Processa envio público e gera PDF

### Integração Externa (Requer API Key)
- `POST /api/v1/documents/:id/submissions` — Envio de dados completo (MANUAL + INTEGRATION)
- `POST /api/v1/documents/:id/validate` — Validação de payload sem gerar documento
- `GET /api/v1/submissions/:id` — Consultar status da submission
- `GET /api/v1/submissions/:id/document` — Download do PDF gerado

### Campos Personalizados (Custom Fields)
- `GET /api/v1/custom-fields` — Listar catálogo
- `POST /api/v1/custom-fields` — Criar definição
- `PUT /api/v1/custom-fields/:id` — Atualizar definição
- `DELETE /api/v1/custom-fields/:id` — Excluir definição (bloqueado se em uso em versão publicada)

### Importação de Background
- `POST /api/v1/documents/:id/import/pdf` — Importar páginas de PDF como background
- `POST /api/v1/documents/:id/import/docx` — Importar DOCX como background
