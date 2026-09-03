var ke=Object.defineProperty;var Te=(a,e,r)=>e in a?ke(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var ie=(a,e,r)=>Te(a,typeof e!="symbol"?e+"":e,r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))t(d);new MutationObserver(d=>{for(const c of d)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function r(d){const c={};return d.integrity&&(c.integrity=d.integrity),d.referrerPolicy&&(c.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?c.credentials="include":d.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(d){if(d.ep)return;d.ep=!0;const c=r(d);fetch(d.href,c)}})();class Ce{constructor(){ie(this,"container",null)}getContainer(){return this.container||(this.container=document.getElementById("toast-container"),this.container||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container))),this.container}show(e,r="info",t=4e3){const d=this.getContainer(),c=document.createElement("div");c.className=`toast toast-${r}`;let s="ℹ️";r==="success"&&(s="✅"),r==="error"&&(s="⚠️"),r==="warning"&&(s="🔔"),c.innerHTML=`
      <span style="font-size: 1.2rem;">${s}</span>
      <div style="flex: 1; font-weight: 500;">${e}</div>
    `,d.appendChild(c),setTimeout(()=>{c.style.opacity="0",c.style.transform="translateX(100%)",c.style.transition="all 0.3s ease",setTimeout(()=>c.remove(),300)},t)}success(e){this.show(e,"success")}error(e){this.show(e,"error")}info(e){this.show(e,"info")}warning(e){this.show(e,"warning")}}const u=new Ce;class Le{constructor(){ie(this,"baseUrl","/api/v1")}getToken(){return localStorage.getItem("dd_access_token")}setToken(e){localStorage.setItem("dd_access_token",e)}removeToken(){localStorage.removeItem("dd_access_token"),localStorage.removeItem("dd_user_profile")}getUser(){const e=localStorage.getItem("dd_user_profile");try{return e?JSON.parse(e):null}catch{return null}}setUser(e){localStorage.setItem("dd_user_profile",JSON.stringify(e))}async request(e,r={}){const t=this.getToken(),d={...r.headers||{}};t&&!d.Authorization&&(d.Authorization=`Bearer ${t}`),!(r.body instanceof FormData)&&!d["Content-Type"]&&(d["Content-Type"]="application/json");const c=await fetch(`${this.baseUrl}${e}`,{...r,headers:d});if(c.status===401&&!e.includes("/auth/login")&&!e.includes("/public/"))throw this.removeToken(),window.location.hash="#/login",u.error("Sessão expirada. Faça login novamente."),new Error("Unauthorized");let s=null;const v=c.headers.get("content-type");if(v&&v.includes("application/json")?s=await c.json():c.status!==204&&(s=await c.text()),!c.ok){const m=(s==null?void 0:s.message)||(Array.isArray(s==null?void 0:s.errors)?s.errors.map(l=>l.message).join(", "):"Erro ao processar requisição");throw new Error(m)}return s}async login(e,r){const t=await this.request("/auth/login",{method:"POST",body:JSON.stringify({email:e,password:r})});return this.setToken(t.accessToken),this.setUser(t.user),t}async getProfile(){return this.request("/auth/me")}async getDocuments(e={}){const r=new URLSearchParams;return e.page&&r.append("page",String(e.page)),e.limit&&r.append("limit",String(e.limit)),e.search&&r.append("search",e.search),e.status&&r.append("status",e.status),this.request(`/documents?${r.toString()}`)}async getDocument(e){return this.request(`/documents/${e}`)}async createDocument(e){return this.request("/documents",{method:"POST",body:JSON.stringify(e)})}async updateDocument(e,r){return this.request(`/documents/${e}`,{method:"PUT",body:JSON.stringify(r)})}async deleteDocument(e){return this.request(`/documents/${e}`,{method:"DELETE"})}async getSchema(e){return this.request(`/documents/${e}/schema`)}async getVersions(e){return this.request(`/documents/${e}/versions`)}async getVersion(e,r){return this.request(`/documents/${e}/versions/${r}`)}async createVersion(e,r={}){return this.request(`/documents/${e}/versions`,{method:"POST",body:JSON.stringify(r)})}async updateVersion(e,r,t){return this.request(`/documents/${e}/versions/${r}`,{method:"PUT",body:JSON.stringify({template:t})})}async publishVersion(e,r){return this.request(`/documents/${e}/versions/${r}/publish`,{method:"POST"})}async getCustomFields(){return this.request("/custom-fields")}async createCustomField(e){return this.request("/custom-fields",{method:"POST",body:JSON.stringify(e)})}async updateCustomField(e,r){return this.request(`/custom-fields/${e}`,{method:"PUT",body:JSON.stringify(r)})}async deleteCustomField(e){return this.request(`/custom-fields/${e}`,{method:"DELETE"})}async createDocumentSubmission(e,r){return this.request(`/documents/${e}/submissions`,{method:"POST",body:JSON.stringify({data:r})})}async getSubmissions(e={}){const r=new URLSearchParams;return e.page&&r.append("page",String(e.page)),e.limit&&r.append("limit",String(e.limit)),e.documentId&&r.append("documentId",e.documentId),this.request(`/submissions?${r.toString()}`)}async getSubmission(e){return this.request(`/submissions/${e}`)}async getPublicForm(e){return this.request(`/public/forms/${e}`)}async submitPublicForm(e,r){return this.request(`/public/forms/${e}/submissions`,{method:"POST",body:JSON.stringify({data:r})})}async getApiKeys(){return this.request("/api-keys")}async createApiKey(e,r){return this.request("/api-keys",{method:"POST",body:JSON.stringify({name:e,expiresAt:r})})}async revokeApiKey(e){return this.request(`/api-keys/${e}`,{method:"DELETE"})}async importPdf(e,r){const t=new FormData;return t.append("file",r),this.request(`/documents/${e}/import/pdf`,{method:"POST",body:t})}async importDocx(e,r){const t=new FormData;return t.append("file",r),this.request(`/documents/${e}/import/docx`,{method:"POST",body:t})}}const g=new Le;function Pe(a){a.innerHTML=`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top, #1e1b4b 0%, #090d16 100%); padding: 20px;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 40px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="brand-icon" style="margin: 0 auto 16px; width: 54px; height: 54px; font-size: 1.6rem;">D</div>
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Dynamic Documents</h1>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Acesse o painel administrativo do Document Engine
          </p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label">E-mail de Acesso</label>
            <input
              type="email"
              id="login-email"
              class="form-control"
              placeholder="admin@dynamicdocs.com"
              value="admin@dynamicdocs.com"
              required
            />
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label">Senha</label>
            <input
              type="password"
              id="login-password"
              class="form-control"
              placeholder="••••••••"
              value="Admin123!"
              required
            />
          </div>

          <button type="submit" id="login-btn" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem;">
            Entrar no Sistema
          </button>
        </form>

        <div style="margin-top: 24px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(99, 102, 241, 0.2); font-size: 0.8rem; color: var(--text-secondary); text-align: center;">
          💡 <strong>Credenciais Padrão:</strong><br />
          admin@dynamicdocs.com / Admin123!
        </div>
      </div>
    </div>
  `;const e=a.querySelector("#login-form"),r=a.querySelector("#login-btn");e.addEventListener("submit",async t=>{t.preventDefault();const d=a.querySelector("#login-email").value,c=a.querySelector("#login-password").value;r.disabled=!0,r.innerHTML='<span class="spinner"></span> Autenticando...';try{await g.login(d,c),u.success("Login efetuado com sucesso!"),window.location.hash="#/documents"}catch(s){u.error(s.message||"Erro ao realizar login"),r.disabled=!1,r.innerHTML="Entrar no Sistema"}})}class qe{constructor(){ie(this,"container",null)}getContainer(){return this.container||(this.container=document.getElementById("modal-container"),this.container||(this.container=document.createElement("div"),this.container.id="modal-container",document.body.appendChild(this.container))),this.container}open(e){var v,m,l;const r=this.getContainer(),t=document.createElement("div");t.className="modal-overlay";const c=`btn btn-${e.confirmVariant||"primary"}`;t.innerHTML=`
      <div class="modal-box">
        <div class="modal-header">
          <h3 style="font-size: 1.15rem; font-weight: 700;">${e.title}</h3>
          <button class="btn-icon close-modal-btn">✕</button>
        </div>
        <div class="modal-body">
          ${e.bodyHtml}
        </div>
        <div class="modal-footer">
          ${e.cancelText!==null&&e.cancelText!==""?`<button class="btn btn-secondary cancel-btn">${e.cancelText||"Cancelar"}</button>`:""}
          ${e.confirmText?`<button class="${c} confirm-btn">${e.confirmText}</button>`:""}
        </div>
      </div>
    `;const s=()=>{t.remove()};return(v=t.querySelector(".close-modal-btn"))==null||v.addEventListener("click",()=>{var y;s(),(y=e.onCancel)==null||y.call(e)}),(m=t.querySelector(".cancel-btn"))==null||m.addEventListener("click",()=>{var y;s(),(y=e.onCancel)==null||y.call(e)}),(l=t.querySelector(".confirm-btn"))==null||l.addEventListener("click",async y=>{var b;const o=y.currentTarget;o.disabled=!0,o.innerHTML='<span class="spinner"></span> Processando...';try{await((b=e.onConfirm)==null?void 0:b.call(e,t))!==!1&&s()}catch{o.disabled=!1,o.innerHTML=e.confirmText||"Confirmar"}}),t.addEventListener("click",y=>{var o;y.target===t&&(s(),(o=e.onCancel)==null||o.call(e))}),r.appendChild(t),{close:s}}confirm(e,r,t){this.open({title:e,bodyHtml:`<p style="color: var(--text-secondary);">${r}</p>`,confirmText:"Confirmar",confirmVariant:"danger",onConfirm:t})}}const H=new qe;function ee(a){const e=g.getUser()||{name:"Administrador",email:"admin@dynamicdocs.com"},r=e.name?e.name.charAt(0).toUpperCase():"A";return`
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand-icon">D</div>
        <div>
          <div class="brand-title">Dynamic Docs</div>
          <div class="brand-badge">Document Engine</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        ${[{id:"documents",label:"Documentos",icon:"📄",href:"#/documents"},{id:"custom-fields",label:"Campos Customizados",icon:"🏷️",href:"#/custom-fields"},{id:"submissions",label:"Submissões & Histórico",icon:"📊",href:"#/submissions"},{id:"api-keys",label:"API Keys & Integração",icon:"🔑",href:"#/api-keys"},{id:"playground",label:"API Playground",icon:"⚡",href:"#/playground"}].map(d=>`
          <a href="${d.href}" class="nav-item ${a===d.id?"active":""}">
            <span style="font-size: 1.15rem;">${d.icon}</span>
            <span>${d.label}</span>
          </a>
        `).join("")}
      </nav>

      <div class="sidebar-footer">
        <div class="user-badge">
          <div class="user-avatar">${r}</div>
          <div class="user-info">
            <div class="user-name">${e.name||"Admin"}</div>
            <div class="user-role">${e.email||"admin@dynamicdocs.com"}</div>
          </div>
        </div>
        <button id="logout-btn" class="btn-icon" title="Sair do sistema" style="cursor: pointer;">
          🚪
        </button>
      </div>
    </aside>
  `}async function ze(a){var v,m,l,y;a.innerHTML=`
    <div class="app-layout">
      ${ee("documents")}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">Documentos</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Gerencie seus templates, versões e formulários dinâmicos</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <button id="import-doc-btn" class="btn btn-secondary">
              📥 Importar PDF / DOCX
            </button>
            <button id="new-doc-btn" class="btn btn-primary">
              ➕ Novo Documento
            </button>
          </div>
        </header>

        <div class="page-container">
          <div class="card" style="margin-bottom: 24px; padding: 16px 20px;">
            <div style="display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
              <div style="display: flex; gap: 12px; flex: 1; min-width: 280px;">
                <input
                  type="text"
                  id="search-input"
                  class="form-control"
                  placeholder="Buscar por nome ou descrição..."
                />
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <select id="status-filter" class="form-control" style="width: 160px;">
                  <option value="">Todos os Status</option>
                  <option value="DRAFT">Rascunho (DRAFT)</option>
                  <option value="PUBLISHED">Publicado (PUBLISHED)</option>
                  <option value="ARCHIVED">Arquivado (ARCHIVED)</option>
                </select>
                <button id="refresh-btn" class="btn btn-secondary btn-icon" title="Recarregar">
                  🔄
                </button>
              </div>
            </div>
          </div>

          <div id="docs-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              <span style="font-size: 2rem;">⏳</span><br />
              Carregando documentos...
            </div>
          </div>
        </div>
      </main>
    </div>
  `,(v=a.querySelector("#logout-btn"))==null||v.addEventListener("click",()=>{g.removeToken(),window.location.hash="#/login",u.info("Sessão encerrada.")});const e=a.querySelector("#docs-list-container"),r=a.querySelector("#search-input"),t=a.querySelector("#status-filter"),d=async()=>{var o,b;try{const E=r.value.trim(),x=t.value,$=(await g.getDocuments({search:E,status:x})).data||[];if($.length===0){e.innerHTML=`
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">📄</div>
            <h3 style="margin-bottom: 8px;">Nenhum documento encontrado</h3>
            <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto 24px;">
              Crie seu primeiro documento dinâmico do zero ou importe um PDF/DOCX existente como plano de fundo.
            </p>
            <button id="empty-new-doc-btn" class="btn btn-primary">
              ➕ Criar Primeiro Documento
            </button>
          </div>
        `,(o=e.querySelector("#empty-new-doc-btn"))==null||o.addEventListener("click",c);return}e.innerHTML=`
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Status</th>
                <th>Versões</th>
                <th>Token Público</th>
                <th>Criado em</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${$.map(p=>{var P,N,U;const w=((P=p.versions)==null?void 0:P.length)||1,q=((U=(N=p.versions)==null?void 0:N[0])==null?void 0:U.versionNumber)||1,A=`badge-${p.status.toLowerCase()}`,O=`${window.location.origin}/#/form/${p.publicToken}`;return`
                  <tr data-doc-id="${p.id}">
                    <td>
                      <div style="font-weight: 600; color: #fff; font-size: 0.95rem;">${p.name}</div>
                      ${p.description?`<div style="font-size: 0.8rem; color: var(--text-muted);">${p.description}</div>`:""}
                    </td>
                    <td>
                      <span class="badge ${A}">${p.status}</span>
                    </td>
                    <td>
                      <span style="font-weight: 600; color: var(--accent);">v${q}</span>
                      <span style="color: var(--text-muted); font-size: 0.8rem;">(${w} versão${w>1?"ões":""})</span>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <code style="background: var(--bg-surface); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-secondary);">
                          ${p.publicToken.slice(0,10)}...
                        </code>
                        <button class="btn-icon copy-link-btn" data-url="${O}" title="Copiar link público">
                          📋
                        </button>
                        <a href="#/form/${p.publicToken}" target="_blank" class="btn-icon" title="Abrir formulário público">
                          🔗
                        </a>
                      </div>
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">
                      ${new Date(p.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-primary open-builder-btn" data-doc-id="${p.id}" style="padding: 6px 12px; font-size: 0.82rem;">
                          ✏️ Editor
                        </button>
                        <button class="btn-icon schema-btn" data-doc-id="${p.id}" title="Ver Schema da API">
                          ⚡
                        </button>
                        <button class="btn-icon delete-doc-btn" data-doc-id="${p.id}" data-name="${p.name}" title="Excluir">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `,e.querySelectorAll(".open-builder-btn").forEach(p=>{p.addEventListener("click",w=>{const q=w.currentTarget.dataset.docId;window.location.hash=`#/builder/${q}`})}),e.querySelectorAll(".copy-link-btn").forEach(p=>{p.addEventListener("click",w=>{const q=w.currentTarget.dataset.url||"";navigator.clipboard.writeText(q),u.success("Link do formulário copiado para a área de transferência!")})}),e.querySelectorAll(".schema-btn").forEach(p=>{p.addEventListener("click",async w=>{const q=w.currentTarget.dataset.docId;try{const A=await g.getSchema(q);H.open({title:`Schema da API — ${A.documentName}`,bodyHtml:`
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px;">
                  Contrato de dados esperado para submissão via API (versão v${A.version}):
                </p>
                <pre style="background: var(--bg-dark); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #a5b4fc; max-height: 380px; overflow: auto;">${JSON.stringify(A,null,2)}</pre>
              `,cancelText:"Fechar",confirmText:"Copiar JSON",onConfirm:()=>{navigator.clipboard.writeText(JSON.stringify(A,null,2)),u.success("Schema copiado para a área de transferência!")}})}catch(A){u.error(`Erro ao carregar schema: ${A.message}`)}})}),e.querySelectorAll(".delete-doc-btn").forEach(p=>{p.addEventListener("click",w=>{const q=w.currentTarget.dataset.docId,A=w.currentTarget.dataset.name;H.confirm("Excluir Documento",`Deseja realmente remover o documento "<strong>${A}</strong>"? Esta ação moverá o documento para a lixeira.`,async()=>{try{await g.deleteDocument(q),u.success("Documento excluído com sucesso."),d()}catch(O){u.error(`Erro ao excluir documento: ${O.message}`)}})})})}catch(E){e.innerHTML=`
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar documentos: ${E.message}</p>
          <button id="retry-btn" class="btn btn-secondary" style="margin-top: 12px;">Tentar Novamente</button>
        </div>
      `,(b=e.querySelector("#retry-btn"))==null||b.addEventListener("click",d)}},c=()=>{H.open({title:"Criar Novo Documento",bodyHtml:`
        <form id="create-doc-form">
          <div class="form-group">
            <label class="form-label">Nome do Documento *</label>
            <input type="text" id="doc-name-input" class="form-control" placeholder="ex: Contrato de Prestação de Serviços" required />
          </div>
          <div class="form-group">
            <label class="form-label">Descrição (Opcional)</label>
            <textarea id="doc-desc-input" class="form-control" rows="3" placeholder="Finalidade deste documento..."></textarea>
          </div>
        </form>
      `,confirmText:"Criar e Abrir no Builder",onConfirm:async o=>{const b=o.querySelector("#doc-name-input").value.trim(),E=o.querySelector("#doc-desc-input").value.trim();if(!b)return u.warning("O nome do documento é obrigatório."),!1;try{const x=await g.createDocument({name:b,description:E});u.success("Documento criado com sucesso!"),window.location.hash=`#/builder/${x.id}`}catch(x){return u.error(`Erro ao criar documento: ${x.message}`),!1}}})},s=()=>{H.open({title:"Importar PDF ou DOCX como Background",bodyHtml:`
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">
          Selecione um documento existente ou crie um novo para importar as páginas como plano de fundo.
        </p>
        <div class="form-group">
          <label class="form-label">Nome do Novo Documento</label>
          <input type="text" id="import-doc-name" class="form-control" placeholder="ex: Contrato Importado" required />
        </div>
        <div class="form-group">
          <label class="form-label">Arquivo (.pdf ou .docx)</label>
          <input type="file" id="import-file-input" class="form-control" accept=".pdf,.docx" required />
        </div>
      `,confirmText:"Importar e Abrir Editor",onConfirm:async o=>{var I;const b=o.querySelector("#import-doc-name").value.trim(),x=(I=o.querySelector("#import-file-input").files)==null?void 0:I[0];if(!b)return u.warning("Nome do documento é obrigatório."),!1;if(!x)return u.warning("Selecione um arquivo PDF ou DOCX."),!1;try{const $=await g.createDocument({name:b});x.name.endsWith(".pdf")?await g.importPdf($.id,x):await g.importDocx($.id,x),u.success("Arquivo importado com sucesso!"),window.location.hash=`#/builder/${$.id}`}catch($){return u.error(`Erro na importação: ${$.message}`),!1}}})};(m=a.querySelector("#new-doc-btn"))==null||m.addEventListener("click",c),(l=a.querySelector("#import-doc-btn"))==null||l.addEventListener("click",s),(y=a.querySelector("#refresh-btn"))==null||y.addEventListener("click",d),r.addEventListener("input",()=>{d()}),t.addEventListener("change",()=>{d()}),d()}async function Ae(a,e){var ye,ve,fe,be,ge,he,xe;a.innerHTML=`
    <div style="height: 100vh; display: flex; flex-direction: column; background: var(--bg-dark); overflow: hidden;">
      <!-- Top Builder Bar -->
      <header class="top-bar" style="height: 60px; padding: 0 20px; background: #0c1322; border-bottom: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; gap: 16px;">
          <a href="#/documents" class="btn btn-secondary btn-icon" title="Voltar para a lista">
            ⬅️
          </a>
          <div>
            <div id="builder-doc-name" style="font-weight: 700; color: #fff; font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
              Carregando...
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-left: 12px; padding-left: 12px; border-left: 1px solid var(--border-subtle);">
            <select id="version-select" class="form-control" style="padding: 4px 10px; font-size: 0.85rem; width: 130px; height: 32px;">
            </select>
            <span id="version-status-badge" class="badge badge-draft">DRAFT</span>
            <button id="add-version-btn" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem; height: 32px;" title="Criar nova versão a partir desta">
              ➕ Nova Versão
            </button>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button id="export-json-btn" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;">
            { } JSON
          </button>
          <button id="preview-btn" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;">
            👁️ Preview PDF
          </button>
          <button id="save-draft-btn" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.85rem;">
            💾 Salvar Rascunho
          </button>
          <button id="publish-btn" class="btn btn-primary" style="padding: 6px 16px; font-size: 0.85rem;">
            🚀 Publicar Versão
          </button>
        </div>
      </header>

      <!-- Main 3-Column Builder Layout -->
      <div class="builder-layout">
        <!-- Left Toolbox -->
        <aside class="builder-toolbox">
          <div>
            <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">
              Campos Padrão
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="btn btn-secondary add-field-btn" data-type="TEXT" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>📝</span> <span>Texto</span>
              </button>
              <button class="btn btn-secondary add-field-btn" data-type="NUMBER" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>🔢</span> <span>Número</span>
              </button>
              <button class="btn btn-secondary add-field-btn" data-type="DATE" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>📅</span> <span>Data</span>
              </button>
              <button class="btn btn-secondary add-field-btn" data-type="IMAGE" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>🖼️</span> <span>Imagem</span>
              </button>
            </div>
          </div>

          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">
                Campos Customizados
              </h4>
              <a href="#/custom-fields" target="_blank" style="font-size: 0.75rem;">+ Criar</a>
            </div>
            <div id="custom-fields-toolbox" style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 10px;">
                Carregando catálogo...
              </div>
            </div>
          </div>

          <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">
              Plano de Fundo da Página
            </h4>
            <input type="file" id="bg-upload-input" accept="image/png,image/jpeg,application/pdf" style="display: none;" />
            <button id="upload-bg-btn" class="btn btn-secondary" style="width: 100%; font-size: 0.82rem;">
              🖼️ Carregar Imagem/PDF
            </button>
            <button id="remove-bg-btn" class="btn-icon" style="width: 100%; margin-top: 6px; font-size: 0.78rem; color: var(--danger); display: none;">
              Remover background
            </button>
          </div>
        </aside>

        <!-- Center Canvas Area -->
        <main class="builder-canvas-area" id="canvas-scroll-container">
          <!-- Canvas Toolbar Controls -->
          <div class="canvas-toolbar">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Formato:</span>
              <select id="page-size-select" class="form-control" style="padding: 2px 8px; width: 90px; font-size: 0.8rem; height: 28px;">
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="LETTER">Letter</option>
                <option value="LEGAL">Legal</option>
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Orientação:</span>
              <select id="page-orientation-select" class="form-control" style="padding: 2px 8px; width: 110px; font-size: 0.8rem; height: 28px;">
                <option value="PORTRAIT">Retrato</option>
                <option value="LANDSCAPE">Paisagem</option>
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; margin-left: 8px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Página:</span>
              <button id="prev-page-btn" class="btn-icon" style="padding: 2px 8px;">◀</button>
              <span id="page-counter-label" style="font-size: 0.82rem; font-weight: 600; min-width: 40px; text-align: center;">1 / 1</span>
              <button id="next-page-btn" class="btn-icon" style="padding: 2px 8px;">▶</button>
              <button id="add-page-btn" class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.75rem; height: 28px;">+ Página</button>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; margin-left: auto;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Zoom:</span>
              <select id="zoom-select" class="form-control" style="padding: 2px 8px; width: 80px; font-size: 0.8rem; height: 28px;">
                <option value="0.75">75%</option>
                <option value="1.0" selected>100%</option>
                <option value="1.25">125%</option>
              </select>
            </div>
          </div>

          <!-- Canvas Page Sheet Container -->
          <div id="canvas-sheet-wrapper" style="transform-origin: top center; transition: transform 0.15s ease;">
            <div id="canvas-sheet" class="canvas-sheet" style="width: 595px; height: 842px;">
              <div class="canvas-grid-overlay"></div>
              <div id="fields-container" style="position: absolute; inset: 0;"></div>
            </div>
          </div>
        </main>

        <!-- Right Property Inspector -->
        <aside class="builder-inspector" id="builder-inspector">
          <div style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
            <span style="font-size: 2rem;">🖱️</span>
            <p style="font-size: 0.85rem; margin-top: 8px;">
              Selecione um campo no documento para editar suas propriedades, validações e estilo.
            </p>
          </div>
        </aside>
      </div>
    </div>
  `;let r=null,t=null,d=1,c=null,s=[],v=!1,m=!1,l={x:0,y:0},y={width:0,height:0,mouseX:0,mouseY:0};const o=a.querySelector("#builder-doc-name"),b=a.querySelector("#version-select"),E=a.querySelector("#version-status-badge"),x=a.querySelector("#canvas-sheet"),I=a.querySelector("#canvas-sheet-wrapper"),$=a.querySelector("#fields-container"),p=a.querySelector("#builder-inspector"),w=a.querySelector("#custom-fields-toolbox"),q=a.querySelector("#page-size-select"),A=a.querySelector("#page-orientation-select"),O=a.querySelector("#page-counter-label"),P=a.querySelector("#zoom-select"),N=a.querySelector("#save-draft-btn"),U=a.querySelector("#publish-btn"),le=a.querySelector("#remove-bg-btn"),de=async()=>{try{[r,s]=await Promise.all([g.getDocument(e),g.getCustomFields()]),o.innerHTML=`<span>${r.name}</span>`,Se();const n=r.versions||[];b.innerHTML=n.map(i=>`
          <option value="${i.id}">v${i.versionNumber} (${i.status})</option>
        `).join(""),n.length>0&&(t=n[0],b.value=t.id,te(t.id))}catch(n){u.error(`Erro ao carregar documento: ${n.message}`)}},te=async n=>{try{t=await g.getVersion(e,n),we(),D(),R()}catch(i){u.error(`Erro ao carregar versão: ${i.message}`)}},we=()=>{if(!t)return;E.className=`badge badge-${t.status.toLowerCase()}`,E.innerText=t.status;const n=t.status==="PUBLISHED",i=t.status==="ARCHIVED",f=n||i;N.disabled=f,U.disabled=f,f?(N.title="Versão publicada é imutável",U.title="Versão já publicada"):(N.title="Salvar rascunho",U.title="Publicar versão")},Se=()=>{if(!s||s.length===0){w.innerHTML=`
        <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 10px;">
          Nenhum campo personalizado cadastrado.
        </div>
      `;return}w.innerHTML=s.map(n=>`
        <button class="btn btn-secondary add-custom-field-btn" data-key="${n.key}" style="justify-content: space-between; text-align: left; width: 100%; padding: 6px 10px; font-size: 0.82rem;">
          <span style="font-weight: 600; color: #fff;">${n.label}</span>
          <span class="badge ${n.inputMode==="INTEGRATION"?"badge-integration":"badge-manual"}" style="font-size: 0.65rem; padding: 1px 4px;">
            ${n.inputMode}
          </span>
        </button>
      `).join(""),w.querySelectorAll(".add-custom-field-btn").forEach(n=>{n.addEventListener("click",i=>{var k;const f=i.currentTarget.dataset.key,h=s.find(T=>T.key===f);h&&me({key:h.key,label:h.label,type:h.type,inputMode:h.inputMode,validation:h.validation||{},mask:(k=h.formatting)==null?void 0:k.mask})})})},G=()=>{var n;return(n=t==null?void 0:t.template)!=null&&n.pages?t.template.pages.find(i=>i.number===d)||t.template.pages[0]:null},D=()=>{var B,J,j,K;const n=t==null?void 0:t.template;if(!n)return;const i=((B=n.page)==null?void 0:B.size)||"A4",f=((J=n.page)==null?void 0:J.orientation)||"PORTRAIT";q.value=i,A.value=f;let h=595,k=842;if(i==="A5"&&(h=420,k=595),i==="LETTER"&&(h=612,k=792),i==="LEGAL"&&(h=612,k=1008),f==="LANDSCAPE"){const S=h;h=k,k=S}x.style.width=`${h}px`,x.style.height=`${k}px`;const T=((j=n.pages)==null?void 0:j.length)||1;O.innerText=`${d} / ${T}`;const C=G();if(!C)return;(K=C.background)!=null&&K.url?(x.style.backgroundImage=`url(${C.background.url})`,le.style.display="block"):(x.style.backgroundImage="none",le.style.display="none"),$.innerHTML="",(C.fields||[]).forEach(S=>{var _,X,F,Y,W;const z=document.createElement("div");z.id=`field-dom-${S.id}`,z.className=`draggable-field ${c===S.id?"selected":""}`,z.style.left=`${S.position.x}px`,z.style.top=`${S.position.y}px`,z.style.width=`${S.position.width}px`,z.style.height=`${S.position.height}px`,(_=S.style)!=null&&_.fontSize&&(z.style.fontSize=`${S.style.fontSize}px`),(X=S.style)!=null&&X.color&&(z.style.color=S.style.color),(F=S.style)!=null&&F.bold&&(z.style.fontWeight="700"),(Y=S.style)!=null&&Y.italic&&(z.style.fontStyle="italic"),(W=S.style)!=null&&W.alignment&&(z.style.justifyContent=S.style.alignment==="CENTER"?"center":S.style.alignment==="RIGHT"?"flex-end":"flex-start");const oe=S.inputMode==="INTEGRATION"?"⚡":"✍️",ae=S.label||S.key;z.innerHTML=`
        <span style="font-size: 0.72rem; opacity: 0.7; margin-right: 4px;">${oe}</span>
        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500;">
          ${ae}
        </span>
        <div class="resize-handle" data-field-id="${S.id}"></div>
      `,z.addEventListener("mousedown",L=>{if(L.target.classList.contains("resize-handle"))return;L.stopPropagation(),c=S.id,D(),R(),v=!0;const se=z.getBoundingClientRect(),re=parseFloat(P.value)||1;l={x:(L.clientX-se.left)/re,y:(L.clientY-se.top)/re}}),z.querySelector(".resize-handle").addEventListener("mousedown",L=>{L.stopPropagation(),c=S.id,m=!0,y={width:S.position.width,height:S.position.height,mouseX:L.clientX,mouseY:L.clientY}}),$.appendChild(z)})};window.addEventListener("mousemove",n=>{if(!v&&!m)return;const i=G();if(!i||!c)return;const f=i.fields.find(k=>k.id===c);if(!f)return;const h=parseFloat(P.value)||1;if(v){const k=x.getBoundingClientRect();let T=Math.round((n.clientX-k.left)/h-l.x),C=Math.round((n.clientY-k.top)/h-l.y);T=Math.max(0,Math.round(T/5)*5),C=Math.max(0,Math.round(C/5)*5),f.position.x=T,f.position.y=C;const M=document.getElementById(`field-dom-${f.id}`);M&&(M.style.left=`${T}px`,M.style.top=`${C}px`),ue(T,C,f.position.width,f.position.height)}else if(m){const k=(n.clientX-y.mouseX)/h,T=(n.clientY-y.mouseY)/h,C=Math.max(40,Math.round(y.width+k)),M=Math.max(20,Math.round(y.height+T));f.position.width=C,f.position.height=M;const B=document.getElementById(`field-dom-${f.id}`);B&&(B.style.width=`${C}px`,B.style.height=`${M}px`),ue(f.position.x,f.position.y,C,M)}}),window.addEventListener("mouseup",()=>{(v||m)&&(v=!1,m=!1)}),x.addEventListener("mousedown",n=>{(n.target===x||n.target.classList.contains("canvas-grid-overlay"))&&(c=null,D(),R())});const me=(n={})=>{const i=G();if(!i)return;Array.isArray(i.fields)||(i.fields=[]);const f=i.fields.length+1,h=n.type||"TEXT",k=n.key||`campo_${h.toLowerCase()}_${f}`,T={id:`field_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,key:k,label:n.label||`Novo Campo ${f}`,type:h,inputMode:n.inputMode||"MANUAL",position:{x:60,y:60+i.fields.length*40%500,width:h==="IMAGE"?140:220,height:h==="IMAGE"?100:32},style:{fontFamily:"Helvetica",fontSize:12,color:"#000000",bold:!1,italic:!1,alignment:"LEFT"},validation:n.validation||{required:!1},mask:n.mask||""};i.fields.push(T),c=T.id,D(),R(),u.success(`Campo '${T.label}' adicionado à página.`)},ue=(n,i,f,h)=>{const k=p.querySelector("#prop-pos-x"),T=p.querySelector("#prop-pos-y"),C=p.querySelector("#prop-pos-w"),M=p.querySelector("#prop-pos-h");k&&(k.value=String(n)),T&&(T.value=String(i)),C&&(C.value=String(f)),M&&(M.value=String(h))},R=()=>{var h,k,T,C,M,B,J,j,K,S,z,oe,ae,pe,_,X,F,Y,W;const n=G();if(!n||!c){p.innerHTML=`
        <div style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
          <span style="font-size: 2.2rem;">🖱️</span>
          <p style="font-size: 0.88rem; margin-top: 10px; line-height: 1.4;">
            Clique em um campo na folha para editar suas configurações, estilo e validações.
          </p>
        </div>
      `;return}const i=n.fields.find(L=>L.id===c);if(!i)return;p.innerHTML=`
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
        <h3 style="font-size: 0.95rem; font-weight: 700;">Propriedades do Campo</h3>
        <button id="delete-field-btn" class="btn btn-danger" style="padding: 4px 8px; font-size: 0.75rem;">
          🗑️ Remover
        </button>
      </div>

      <!-- Basic Info -->
      <div class="form-group">
        <label class="form-label">Identificador Único (Key) *</label>
        <input type="text" id="prop-key" class="form-control" value="${i.key}" />
      </div>

      <div class="form-group">
        <label class="form-label">Rótulo / Label</label>
        <input type="text" id="prop-label" class="form-control" value="${i.label||""}" />
      </div>

      <div class="form-group">
        <label class="form-label">Modo de Entrada</label>
        <select id="prop-input-mode" class="form-control">
          <option value="MANUAL" ${i.inputMode==="MANUAL"?"selected":""}>✍️ MANUAL (Formulário Público)</option>
          <option value="INTEGRATION" ${i.inputMode==="INTEGRATION"?"selected":""}>⚡ INTEGRATION (Exclusivo API)</option>
        </select>
      </div>

      <!-- Position -->
      <div>
        <label class="form-label" style="margin-bottom: 6px; display: block;">Posição & Dimensão (pt)</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">X:</span> <input type="number" id="prop-pos-x" class="form-control" value="${i.position.x}" /></div>
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">Y:</span> <input type="number" id="prop-pos-y" class="form-control" value="${i.position.y}" /></div>
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">Largura:</span> <input type="number" id="prop-pos-w" class="form-control" value="${i.position.width}" /></div>
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">Altura:</span> <input type="number" id="prop-pos-h" class="form-control" value="${i.position.height}" /></div>
        </div>
      </div>

      <!-- Typography & Styling -->
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 6px;">
        <label class="form-label" style="margin-bottom: 8px; display: block;">Tipografia & Estilo</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <select id="prop-font-family" class="form-control">
              <option value="Helvetica" ${((h=i.style)==null?void 0:h.fontFamily)==="Helvetica"?"selected":""}>Helvetica</option>
              <option value="Times" ${((k=i.style)==null?void 0:k.fontFamily)==="Times"?"selected":""}>Times Roman</option>
              <option value="Courier" ${((T=i.style)==null?void 0:T.fontFamily)==="Courier"?"selected":""}>Courier</option>
            </select>
          </div>
          <div>
            <input type="number" id="prop-font-size" class="form-control" placeholder="Tamanho" value="${((C=i.style)==null?void 0:C.fontSize)||12}" />
          </div>
        </div>

        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
          <input type="color" id="prop-font-color" value="${((M=i.style)==null?void 0:M.color)||"#000000"}" style="width: 38px; height: 34px; padding: 0; background: transparent; border: 1px solid var(--border-subtle); border-radius: 4px; cursor: pointer;" />
          <button id="prop-style-bold" class="btn btn-secondary ${(B=i.style)!=null&&B.bold?"btn-primary":""}" style="padding: 6px 12px; font-weight: 800;">B</button>
          <button id="prop-style-italic" class="btn btn-secondary ${(J=i.style)!=null&&J.italic?"btn-primary":""}" style="padding: 6px 12px; font-style: italic;">I</button>
          <select id="prop-style-align" class="form-control" style="flex: 1;">
            <option value="LEFT" ${((j=i.style)==null?void 0:j.alignment)==="LEFT"?"selected":""}>Esquerda</option>
            <option value="CENTER" ${((K=i.style)==null?void 0:K.alignment)==="CENTER"?"selected":""}>Centro</option>
            <option value="RIGHT" ${((S=i.style)==null?void 0:S.alignment)==="RIGHT"?"selected":""}>Direita</option>
          </select>
        </div>
      </div>

      <!-- Mask & Validation -->
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 6px;">
        <label class="form-label" style="margin-bottom: 8px; display: block;">Validação & Máscaras</label>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
          <input type="checkbox" id="prop-val-required" ${(z=i.validation)!=null&&z.required?"checked":""} style="width: 16px; height: 16px; cursor: pointer;" />
          <label for="prop-val-required" style="font-size: 0.85rem; cursor: pointer; color: #fff;">Campo Obrigatório</label>
        </div>

        <div class="form-group" style="margin-bottom: 8px;">
          <label class="form-label">Máscara Pré-definida</label>
          <select id="prop-mask-select" class="form-control">
            <option value="" ${i.mask?"":"selected"}>Nenhuma</option>
            <option value="CPF" ${i.mask==="CPF"?"selected":""}>CPF (000.000.000-00)</option>
            <option value="CNPJ" ${i.mask==="CNPJ"?"selected":""}>CNPJ (00.000.000/0000-00)</option>
            <option value="CEP" ${i.mask==="CEP"?"selected":""}>CEP (00000-000)</option>
            <option value="PHONE" ${i.mask==="PHONE"?"selected":""}>Telefone ((00) 00000-0000)</option>
          </select>
        </div>
      </div>
    `;const f=(L,se,re=!1)=>{const ne=p.querySelector(`#${L}`);ne&&ne.addEventListener("input",()=>{const Ee=re?parseFloat(ne.value)||0:ne.value,V=se.split(".");let Z=i;for(let Q=0;Q<V.length-1;Q++)Z[V[Q]]||(Z[V[Q]]={}),Z=Z[V[Q]];Z[V[V.length-1]]=Ee,D()})};f("prop-key","key"),f("prop-label","label"),f("prop-pos-x","position.x",!0),f("prop-pos-y","position.y",!0),f("prop-pos-w","position.width",!0),f("prop-pos-h","position.height",!0),f("prop-font-size","style.fontSize",!0),f("prop-font-color","style.color"),(oe=p.querySelector("#prop-input-mode"))==null||oe.addEventListener("change",L=>{i.inputMode=L.target.value,D()}),(ae=p.querySelector("#prop-font-family"))==null||ae.addEventListener("change",L=>{i.style||(i.style={}),i.style.fontFamily=L.target.value,D()}),(pe=p.querySelector("#prop-style-align"))==null||pe.addEventListener("change",L=>{i.style||(i.style={}),i.style.alignment=L.target.value,D()}),(_=p.querySelector("#prop-style-bold"))==null||_.addEventListener("click",()=>{i.style||(i.style={}),i.style.bold=!i.style.bold,D(),R()}),(X=p.querySelector("#prop-style-italic"))==null||X.addEventListener("click",()=>{i.style||(i.style={}),i.style.italic=!i.style.italic,D(),R()}),(F=p.querySelector("#prop-val-required"))==null||F.addEventListener("change",L=>{i.validation||(i.validation={}),i.validation.required=L.target.checked}),(Y=p.querySelector("#prop-mask-select"))==null||Y.addEventListener("change",L=>{i.mask=L.target.value}),(W=p.querySelector("#delete-field-btn"))==null||W.addEventListener("click",()=>{n.fields=n.fields.filter(L=>L.id!==i.id),c=null,D(),R(),u.info("Campo removido.")})};N.addEventListener("click",async()=>{if(t){N.disabled=!0,N.innerHTML="Salvando...";try{await g.updateVersion(e,t.id,t.template),u.success("Rascunho salvo com sucesso!")}catch(n){u.error(`Erro ao salvar: ${n.message}`)}finally{N.disabled=!1,N.innerHTML="💾 Salvar Rascunho"}}}),U.addEventListener("click",()=>{t&&H.open({title:"Publicar Versão do Documento",bodyHtml:`
        <p style="color: var(--text-secondary); margin-bottom: 12px;">
          Ao publicar a <strong>v${t.versionNumber}</strong>:
        </p>
        <ul style="color: var(--text-secondary); font-size: 0.9rem; margin-left: 20px; margin-bottom: 16px; line-height: 1.6;">
          <li>Esta versão se tornará <strong>estritamente imutável</strong>.</li>
          <li>Ela será a versão ativa para novos preenchimentos no formulário público e integrações via API.</li>
          <li>Versões publicadas anteriormente serão arquivadas automaticamente.</li>
        </ul>
      `,confirmText:"Confirmar Publicação",confirmVariant:"success",onConfirm:async()=>{try{await g.updateVersion(e,t.id,t.template);const n=await g.publishVersion(e,t.id);u.success(`Versão v${n.versionNumber} publicada com sucesso!`),await te(n.id)}catch(n){return u.error(`Erro ao publicar: ${n.message}`),!1}}})}),(ye=a.querySelector("#add-version-btn"))==null||ye.addEventListener("click",async()=>{H.open({title:"Criar Nova Versão",bodyHtml:`
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px;">
          Deseja criar uma nova versão clonando o template da versão atual (v${(t==null?void 0:t.versionNumber)||1})?
        </p>
      `,confirmText:"Criar Nova Versão",onConfirm:async()=>{try{const n=await g.createVersion(e,{sourceVersionId:t==null?void 0:t.id});u.success(`Versão v${n.versionNumber} criada.`),await de(),b.value=n.id,await te(n.id)}catch(n){return u.error(`Erro ao criar versão: ${n.message}`),!1}}})}),b.addEventListener("change",()=>{te(b.value)}),a.querySelectorAll(".add-field-btn").forEach(n=>{n.addEventListener("click",i=>{const f=i.currentTarget.dataset.type;me({type:f})})}),q.addEventListener("change",()=>{var n;(n=t==null?void 0:t.template)!=null&&n.page||(t.template.page={}),t.template.page.size=q.value,D()}),A.addEventListener("change",()=>{var n;(n=t==null?void 0:t.template)!=null&&n.page||(t.template.page={}),t.template.page.orientation=A.value,D()}),P.addEventListener("change",()=>{const n=P.value;I.style.transform=`scale(${n})`}),(ve=a.querySelector("#prev-page-btn"))==null||ve.addEventListener("click",()=>{d>1&&(d--,c=null,D(),R())}),(fe=a.querySelector("#next-page-btn"))==null||fe.addEventListener("click",()=>{var i,f;const n=((f=(i=t==null?void 0:t.template)==null?void 0:i.pages)==null?void 0:f.length)||1;d<n&&(d++,c=null,D(),R())}),(be=a.querySelector("#add-page-btn"))==null||be.addEventListener("click",()=>{if(!(t!=null&&t.template))return;Array.isArray(t.template.pages)||(t.template.pages=[]);const n=t.template.pages.length+1;t.template.pages.push({number:n,fields:[]}),d=n,c=null,D(),R(),u.success(`Página ${n} adicionada.`)}),(ge=a.querySelector("#export-json-btn"))==null||ge.addEventListener("click",()=>{t!=null&&t.template&&H.open({title:"Template JSON do Documento",bodyHtml:`
        <pre style="background: var(--bg-dark); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8rem; color: #a5b4fc; max-height: 420px; overflow: auto;">${JSON.stringify(t.template,null,2)}</pre>
      `,cancelText:"Fechar",confirmText:"Copiar JSON",onConfirm:()=>{navigator.clipboard.writeText(JSON.stringify(t.template,null,2)),u.success("Template JSON copiado para a área de transferência!")}})}),(he=a.querySelector("#preview-btn"))==null||he.addEventListener("click",async()=>{var n,i;if(t)try{u.info("Gerando preview do documento...");const f=await g.createDocumentSubmission(e,{});window.open(f.documentUrl,"_blank")}catch{try{const f={};(i=(n=t.template)==null?void 0:n.pages)==null||i.forEach(k=>{var T;(T=k.fields)==null||T.forEach(C=>{f[C.key]=C.type==="DATE"?"2026-09-02":C.type==="NUMBER"?1234:"Valor de Teste"})});const h=await g.createDocumentSubmission(e,f);window.open(h.documentUrl,"_blank")}catch(f){u.error(`Erro ao gerar preview: ${f.message}`)}}});const ce=a.querySelector("#bg-upload-input");(xe=a.querySelector("#upload-bg-btn"))==null||xe.addEventListener("click",()=>{ce.click()}),ce.addEventListener("change",async()=>{var i;const n=(i=ce.files)==null?void 0:i[0];if(n)try{u.info("Fazendo upload do background...");let f;n.name.endsWith(".pdf")?f=await g.importPdf(e,n):f=await g.importDocx(e,n),u.success("Background carregado com sucesso!"),await de()}catch(f){u.error(`Erro no upload: ${f.message}`)}}),le.addEventListener("click",()=>{const n=G();n&&(n.background=void 0,D(),u.info("Background removido da página atual."))}),de()}async function $e(a,e){a.innerHTML=`
    <div style="min-height: 100vh; background: radial-gradient(circle at top, #1e1b4b 0%, #090d16 100%); padding: 40px 20px; display: flex; flex-direction: column; align-items: center;">
      <div style="width: 100%; max-width: 680px;">
        <!-- Brand Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div class="brand-icon" style="margin: 0 auto 12px; width: 44px; height: 44px; font-size: 1.3rem;">D</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
            Dynamic Documents
          </div>
          <h1 id="public-doc-title" style="font-size: 1.8rem; font-weight: 800; color: #fff;">
            Carregando formulário...
          </h1>
          <p id="public-doc-desc" style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 6px;">
            Por favor, preencha as informações abaixo para gerar seu documento.
          </p>
        </div>

        <!-- Form Card Container -->
        <div id="form-container" class="card" style="padding: 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">
            ⏳ Carregando campos do formulário...
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 24px; font-size: 0.8rem; color: var(--text-muted);">
          Ambiente seguro • Powered by Dynamic Documents Platform
        </div>
      </div>
    </div>
  `;const r=a.querySelector("#public-doc-title"),t=a.querySelector("#public-doc-desc"),d=a.querySelector("#form-container");try{const c=await g.getPublicForm(e);r.innerText=c.documentName,c.description&&(t.innerText=c.description);const s=c.fields||[];if(s.length===0){d.innerHTML=`
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">ℹ️</div>
          <h3 style="margin-bottom: 8px;">Nenhum campo para preenchimento manual</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
            Este documento é preenchido exclusivamente por sistemas externos via integração de API.
          </p>
        </div>
      `;return}d.innerHTML=`
      <form id="dynamic-public-form">
        <div style="display: flex; flex-direction: column; gap: 18px; margin-bottom: 28px;">
          ${s.map(l=>{var I,$,p,w;const y=!!l.required,o=l.label||l.key,b=y?'<span style="color: var(--danger);">*</span>':"",E=l.type==="NUMBER"?"number":l.type==="DATE"?"date":"text";let x=`Informe ${o.toLowerCase()}`;return l.mask==="CPF"&&(x="000.000.000-00"),l.mask==="CNPJ"&&(x="00.000.000/0000-00"),l.mask==="CEP"&&(x="00000-000"),l.mask==="PHONE"&&(x="(00) 00000-0000"),`
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="field-input-${l.key}">
                  ${o} ${b}
                </label>
                <input
                  type="${E}"
                  id="field-input-${l.key}"
                  name="${l.key}"
                  class="form-control"
                  placeholder="${x}"
                  data-mask="${l.mask||""}"
                  data-type="${l.type}"
                  ${y?"required":""}
                  ${(I=l.validation)!=null&&I.minLength?`minlength="${l.validation.minLength}"`:""}
                  ${($=l.validation)!=null&&$.maxLength?`maxlength="${l.validation.maxLength}"`:""}
                  ${((p=l.validation)==null?void 0:p.min)!==void 0?`min="${l.validation.min}"`:""}
                  ${((w=l.validation)==null?void 0:w.max)!==void 0?`max="${l.validation.max}"`:""}
                />
              </div>
            `}).join("")}
        </div>

        <button type="submit" id="submit-form-btn" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; border-radius: var(--radius-md);">
          🚀 Gerar Documento PDF
        </button>
      </form>
    `;const v=d.querySelector("#dynamic-public-form"),m=d.querySelector("#submit-form-btn");v.querySelectorAll("input").forEach(l=>{const y=l.dataset.mask;y&&l.addEventListener("input",()=>{let o=l.value;y==="CPF"?(o=o.replace(/\D/g,"").slice(0,11),o.length>9?o=`${o.slice(0,3)}.${o.slice(3,6)}.${o.slice(6,9)}-${o.slice(9)}`:o.length>6?o=`${o.slice(0,3)}.${o.slice(3,6)}.${o.slice(6)}`:o.length>3&&(o=`${o.slice(0,3)}.${o.slice(3)}`),l.value=o):y==="CNPJ"?(o=o.replace(/\D/g,"").slice(0,14),o.length>12?o=`${o.slice(0,2)}.${o.slice(2,5)}.${o.slice(5,8)}/${o.slice(8,12)}-${o.slice(12)}`:o.length>8?o=`${o.slice(0,2)}.${o.slice(2,5)}.${o.slice(5,8)}/${o.slice(8)}`:o.length>5?o=`${o.slice(0,2)}.${o.slice(2,5)}.${o.slice(5)}`:o.length>2&&(o=`${o.slice(0,2)}.${o.slice(2)}`),l.value=o):y==="CEP"?(o=o.replace(/\D/g,"").slice(0,8),o.length>5&&(o=`${o.slice(0,5)}-${o.slice(5)}`),l.value=o):y==="PHONE"&&(o=o.replace(/\D/g,"").slice(0,11),o.length>10?o=`(${o.slice(0,2)}) ${o.slice(2,7)}-${o.slice(7)}`:o.length>6?o=`(${o.slice(0,2)}) ${o.slice(2,6)}-${o.slice(6)}`:o.length>2&&(o=`(${o.slice(0,2)}) ${o.slice(2)}`),l.value=o)})}),v.addEventListener("submit",async l=>{var o;l.preventDefault();const y={};s.forEach(b=>{const E=v.querySelector(`[name="${b.key}"]`);E&&E.value!==""&&(b.type==="NUMBER"?y[b.key]=Number(E.value):y[b.key]=E.value)}),m.disabled=!0,m.innerHTML="⏳ Processando e Gerando PDF...";try{const b=await g.submitPublicForm(e,y);u.success("Documento gerado com sucesso!"),d.innerHTML=`
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 3.5rem; margin-bottom: 16px;">🎉</div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
              Documento Gerado com Sucesso!
            </h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px;">
              Seu documento foi processado e já está disponível para visualização e download.
            </p>

            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px;">
              <a href="${b.documentUrl}" target="_blank" class="btn btn-primary" style="padding: 12px 24px; font-size: 1rem;">
                📄 Visualizar / Baixar PDF
              </a>
              <button id="refill-btn" class="btn btn-secondary" style="padding: 12px 20px;">
                🔄 Preencher Novamente
              </button>
            </div>

            <!-- PDF Preview Frame -->
            <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle); background: #fff;">
              <iframe src="${b.documentUrl}" style="width: 100%; height: 500px; border: none;"></iframe>
            </div>
          </div>
        `,(o=d.querySelector("#refill-btn"))==null||o.addEventListener("click",()=>{$e(a,e)})}catch(b){u.error(`Erro ao gerar documento: ${b.message}`),m.disabled=!1,m.innerHTML="🚀 Gerar Documento PDF"}})}catch(c){d.innerHTML=`
      <div style="text-align: center; padding: 40px 20px; color: var(--danger);">
        <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
        <h3 style="margin-bottom: 8px;">Link Indisponível</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">${c.message||"Este formulário não foi encontrado ou não está mais ativo."}</p>
      </div>
    `}}async function De(a){var d,c;a.innerHTML=`
    <div class="app-layout">
      ${ee("custom-fields")}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">Catálogo de Campos Customizados</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Defina conceitos de negócio padronizados para uso nos documentos e integrações</p>
          </div>
          <button id="new-custom-field-btn" class="btn btn-primary">
            ➕ Novo Campo
          </button>
        </header>

        <div class="page-container">
          <div id="fields-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              Carregando catálogo...
            </div>
          </div>
        </div>
      </main>
    </div>
  `,(d=a.querySelector("#logout-btn"))==null||d.addEventListener("click",()=>{g.removeToken(),window.location.hash="#/login",u.info("Sessão encerrada.")});const e=a.querySelector("#fields-list-container"),r=async()=>{var s;try{const v=await g.getCustomFields();if(v.length===0){e.innerHTML=`
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">🏷️</div>
            <h3 style="margin-bottom: 8px;">Nenhum campo personalizado criado</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">
              Crie conceitos de integração como <code>nomePaciente</code>, <code>numeroContrato</code> ou campos padronizados para acelerar a criação de documentos.
            </p>
            <button id="empty-new-field-btn" class="btn btn-primary">
              ➕ Criar Primeiro Campo
            </button>
          </div>
        `,(s=e.querySelector("#empty-new-field-btn"))==null||s.addEventListener("click",t);return}e.innerHTML=`
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Chave (Key)</th>
                <th>Rótulo (Label)</th>
                <th>Tipo</th>
                <th>Modo de Entrada</th>
                <th>Máscara / Validações</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${v.map(m=>{var o;const l=m.inputMode==="INTEGRATION"?"badge-integration":"badge-manual",y=((o=m.formatting)==null?void 0:o.mask)||"-";return`
                  <tr>
                    <td>
                      <code style="background: var(--bg-surface); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85rem; color: #a5b4fc; font-weight: 600;">
                        ${m.key}
                      </code>
                    </td>
                    <td style="font-weight: 600; color: #fff;">${m.label}</td>
                    <td><span class="badge badge-draft">${m.type}</span></td>
                    <td><span class="badge ${l}">${m.inputMode}</span></td>
                    <td style="color: var(--text-secondary); font-size: 0.85rem;">
                      ${y!=="-"?`<span style="color: var(--accent); font-family: var(--font-mono);">${y}</span>`:"Padrão"}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-secondary edit-field-btn" data-field-id="${m.id}" style="padding: 6px 12px; font-size: 0.82rem;">
                          ✏️ Editar
                        </button>
                        <button class="btn-icon delete-field-btn" data-field-id="${m.id}" data-key="${m.key}" title="Excluir">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `,e.querySelectorAll(".edit-field-btn").forEach(m=>{m.addEventListener("click",l=>{const y=l.currentTarget.dataset.fieldId,o=v.find(b=>b.id===y);o&&t(o)})}),e.querySelectorAll(".delete-field-btn").forEach(m=>{m.addEventListener("click",l=>{const y=l.currentTarget.dataset.fieldId,o=l.currentTarget.dataset.key;H.confirm("Excluir Campo Personalizado",`Deseja realmente remover o campo personalizado <code>${o}</code>? Se este campo estiver em uso por versões publicadas, a exclusão será bloqueada.`,async()=>{try{await g.deleteCustomField(y),u.success("Campo excluído com sucesso."),r()}catch(b){u.error(`Erro ao excluir: ${b.message}`)}})})})}catch(v){e.innerHTML=`
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar catálogo: ${v.message}</p>
        </div>
      `}},t=s=>{var m,l,y,o,b;const v=!!s;H.open({title:v?`Editar Campo: ${s.key}`:"Novo Campo Personalizado",bodyHtml:`
        <form id="custom-field-form">
          <div class="form-group">
            <label class="form-label">Chave Única (Key) *</label>
            <input
              type="text"
              id="field-key-input"
              class="form-control"
              placeholder="ex: nomePaciente ou codigoContrato"
              value="${(s==null?void 0:s.key)||""}"
              ${v?"disabled":"required"}
            />
          </div>

          <div class="form-group">
            <label class="form-label">Rótulo Legível (Label) *</label>
            <input
              type="text"
              id="field-label-input"
              class="form-control"
              placeholder="ex: Nome Completo do Paciente"
              value="${(s==null?void 0:s.label)||""}"
              required
            />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Tipo de Dado</label>
              <select id="field-type-select" class="form-control">
                <option value="TEXT" ${(s==null?void 0:s.type)==="TEXT"?"selected":""}>Texto (TEXT)</option>
                <option value="NUMBER" ${(s==null?void 0:s.type)==="NUMBER"?"selected":""}>Número (NUMBER)</option>
                <option value="DATE" ${(s==null?void 0:s.type)==="DATE"?"selected":""}>Data (DATE)</option>
                <option value="IMAGE" ${(s==null?void 0:s.type)==="IMAGE"?"selected":""}>Imagem (IMAGE)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Modo de Entrada</label>
              <select id="field-mode-select" class="form-control">
                <option value="INTEGRATION" ${(s==null?void 0:s.inputMode)==="INTEGRATION"?"selected":""}>⚡ INTEGRATION (API)</option>
                <option value="MANUAL" ${(s==null?void 0:s.inputMode)==="MANUAL"?"selected":""}>✍️ MANUAL (Público)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Máscara Pré-definida (Opcional)</label>
            <select id="field-mask-select" class="form-control">
              <option value="" ${(m=s==null?void 0:s.formatting)!=null&&m.mask?"":"selected"}>Nenhuma</option>
              <option value="CPF" ${((l=s==null?void 0:s.formatting)==null?void 0:l.mask)==="CPF"?"selected":""}>CPF (000.000.000-00)</option>
              <option value="CNPJ" ${((y=s==null?void 0:s.formatting)==null?void 0:y.mask)==="CNPJ"?"selected":""}>CNPJ (00.000.000/0000-00)</option>
              <option value="CEP" ${((o=s==null?void 0:s.formatting)==null?void 0:o.mask)==="CEP"?"selected":""}>CEP (00000-000)</option>
              <option value="PHONE" ${((b=s==null?void 0:s.formatting)==null?void 0:b.mask)==="PHONE"?"selected":""}>Telefone ((00) 00000-0000)</option>
            </select>
          </div>
        </form>
      `,confirmText:v?"Salvar Alterações":"Criar Campo",onConfirm:async E=>{const x=E.querySelector("#field-key-input").value.trim(),I=E.querySelector("#field-label-input").value.trim(),$=E.querySelector("#field-type-select").value,p=E.querySelector("#field-mode-select").value,w=E.querySelector("#field-mask-select").value;if(!x||!I)return u.warning("Chave e rótulo são obrigatórios."),!1;const q={key:x,label:I,type:$,inputMode:p,formatting:w?{mask:w}:void 0};try{v?(await g.updateCustomField(s.id,q),u.success("Campo atualizado com sucesso!")):(await g.createCustomField(q),u.success("Campo criado no catálogo!")),r()}catch(A){return u.error(`Erro ao salvar campo: ${A.message}`),!1}}})};(c=a.querySelector("#new-custom-field-btn"))==null||c.addEventListener("click",()=>t()),r()}async function Ne(a){var t,d;a.innerHTML=`
    <div class="app-layout">
      ${ee("submissions")}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">Submissões & Histórico</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Histórico completo de documentos preenchidos e gerados</p>
          </div>
          <button id="refresh-submissions-btn" class="btn btn-secondary">
            🔄 Atualizar
          </button>
        </header>

        <div class="page-container">
          <div id="submissions-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              Carregando histórico...
            </div>
          </div>
        </div>
      </main>
    </div>
  `,(t=a.querySelector("#logout-btn"))==null||t.addEventListener("click",()=>{g.removeToken(),window.location.hash="#/login",u.info("Sessão encerrada.")});const e=a.querySelector("#submissions-list-container"),r=async()=>{try{const s=(await g.getSubmissions()).data||[];if(s.length===0){e.innerHTML=`
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">📊</div>
            <h3 style="margin-bottom: 8px;">Nenhuma submissão registrada</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">
              Preencha um documento através do formulário público ou envie dados via API para visualizar as submissões aqui.
            </p>
            <a href="#/documents" class="btn btn-primary">
              📄 Ir para Documentos
            </a>
          </div>
        `;return}e.innerHTML=`
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID da Submissão</th>
                <th>Documento</th>
                <th>Versão Utilizada</th>
                <th>Status</th>
                <th>Data de Geração</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${s.map(v=>{var l,y;const m=v.status==="GENERATED"?"badge-published":v.status==="FAILED"?"badge-archived":"badge-draft";return`
                  <tr>
                    <td>
                      <code style="font-family: var(--font-mono); font-size: 0.8rem; color: #a5b4fc;">
                        ${v.id}
                      </code>
                    </td>
                    <td style="font-weight: 600; color: #fff;">
                      ${((l=v.document)==null?void 0:l.name)||"Documento"}
                    </td>
                    <td>
                      <span style="font-weight: 600; color: var(--accent);">
                        v${((y=v.documentVersion)==null?void 0:y.versionNumber)||1}
                      </span>
                    </td>
                    <td>
                      <span class="badge ${m}">${v.status}</span>
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">
                      ${new Date(v.createdAt).toLocaleString("pt-BR")}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-secondary view-data-btn" data-sub-id="${v.id}" style="padding: 6px 12px; font-size: 0.82rem;">
                          🔍 Ver Dados
                        </button>
                        <a href="/api/v1/submissions/${v.id}/document" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.82rem;">
                          📄 Baixar PDF
                        </a>
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `,e.querySelectorAll(".view-data-btn").forEach(v=>{v.addEventListener("click",async m=>{var y,o;const l=m.currentTarget.dataset.subId;try{const b=await g.getSubmission(l);H.open({title:`Dados da Submissão (${b.id.slice(0,8)})`,bodyHtml:`
                <div style="margin-bottom: 12px; font-size: 0.85rem; color: var(--text-secondary);">
                  <strong>Documento:</strong> ${(y=b.document)==null?void 0:y.name} (Versão v${(o=b.documentVersion)==null?void 0:o.versionNumber})<br />
                  <strong>Criado em:</strong> ${new Date(b.createdAt).toLocaleString("pt-BR")}
                </div>
                <pre style="background: var(--bg-dark); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #a5b4fc; max-height: 360px; overflow: auto;">${JSON.stringify(b.data,null,2)}</pre>
              `,cancelText:"Fechar",confirmText:"Baixar PDF",onConfirm:()=>{window.open(`/api/v1/submissions/${b.id}/document`,"_blank")}})}catch(b){u.error(`Erro ao carregar dados: ${b.message}`)}})})}catch(c){e.innerHTML=`
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar submissões: ${c.message}</p>
        </div>
      `}};(d=a.querySelector("#refresh-submissions-btn"))==null||d.addEventListener("click",r),r()}async function Ie(a){var d,c;a.innerHTML=`
    <div class="app-layout">
      ${ee("api-keys")}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">API Keys & Integrações</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Gerencie credenciais para integração com sistemas externos (ERP, CRM, Hospitalar)</p>
          </div>
          <button id="generate-key-btn" class="btn btn-primary">
            🔑 Gerar Nova API Key
          </button>
        </header>

        <div class="page-container">
          <div class="card" style="margin-bottom: 24px; padding: 20px; background: rgba(99, 102, 241, 0.08); border-color: rgba(99, 102, 241, 0.25);">
            <h3 style="font-size: 0.98rem; font-weight: 700; margin-bottom: 8px; color: var(--accent);">
              💡 Como utilizar sua API Key para envio de dados
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
              Sistemas externos devem enviar a chave no cabeçalho HTTP <code>Authorization: Bearer &lt;API_KEY&gt;</code> para criar submissions ou validar payloads.
            </p>
            <pre style="background: var(--bg-dark); padding: 12px 16px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8rem; color: #a5b4fc; overflow-x: auto;">
curl -X POST http://localhost:3000/api/v1/documents/{documentId}/submissions \\
  -H "Authorization: Bearer dd_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"data": {"nomeCliente": "João Silva", "nomePaciente": "Maria Silva", "numeroContrato": "CTR-001"}}'</pre>
          </div>

          <div id="keys-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              Carregando chaves de API...
            </div>
          </div>
        </div>
      </main>
    </div>
  `,(d=a.querySelector("#logout-btn"))==null||d.addEventListener("click",()=>{g.removeToken(),window.location.hash="#/login",u.info("Sessão encerrada.")});const e=a.querySelector("#keys-list-container"),r=async()=>{var s;try{const v=await g.getApiKeys();if(v.length===0){e.innerHTML=`
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">🔑</div>
            <h3 style="margin-bottom: 8px;">Nenhuma API Key gerada</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">
              Gere chaves seguras para permitir que seus sistemas ERP, CRM ou plataformas parceiras enviem dados e gerem documentos automaticamente.
            </p>
            <button id="empty-generate-key-btn" class="btn btn-primary">
              🔑 Gerar Primeira API Key
            </button>
          </div>
        `,(s=e.querySelector("#empty-generate-key-btn"))==null||s.addEventListener("click",t);return}e.innerHTML=`
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Nome da Integração</th>
                <th>Prefixo da Chave</th>
                <th>Status</th>
                <th>Último Uso</th>
                <th>Criada em</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${v.map(m=>{const l=!!m.revokedAt,y=l?"badge-archived":"badge-published",o=l?"REVOGADA":"ATIVA";return`
                  <tr>
                    <td style="font-weight: 600; color: #fff;">${m.name}</td>
                    <td>
                      <code style="background: var(--bg-surface); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85rem; color: #a5b4fc;">
                        ${m.keyPrefix}...
                      </code>
                    </td>
                    <td><span class="badge ${y}">${o}</span></td>
                    <td style="color: var(--text-secondary); font-size: 0.85rem;">
                      ${m.lastUsedAt?new Date(m.lastUsedAt).toLocaleString("pt-BR"):"Nunca utilizada"}
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">
                      ${new Date(m.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td style="text-align: right;">
                      ${l?`<span style="color: var(--text-muted); font-size: 0.8rem;">Revogada em ${new Date(m.revokedAt).toLocaleDateString("pt-BR")}</span>`:`
                        <button class="btn btn-danger revoke-key-btn" data-key-id="${m.id}" data-name="${m.name}" style="padding: 6px 12px; font-size: 0.8rem;">
                          Revogar
                        </button>
                      `}
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `,e.querySelectorAll(".revoke-key-btn").forEach(m=>{m.addEventListener("click",l=>{const y=l.currentTarget.dataset.keyId,o=l.currentTarget.dataset.name;H.confirm("Revogar API Key",`Deseja realmente revogar a chave "<strong>${o}</strong>"? Sistemas externos que utilizam esta chave perderão o acesso imediatamente.`,async()=>{try{await g.revokeApiKey(y),u.success("API Key revogada com sucesso."),r()}catch(b){u.error(`Erro ao revogar chave: ${b.message}`)}})})})}catch(v){e.innerHTML=`
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar API Keys: ${v.message}</p>
        </div>
      `}},t=()=>{H.open({title:"Gerar Nova API Key de Integração",bodyHtml:`
        <form id="api-key-form">
          <div class="form-group">
            <label class="form-label">Nome da Aplicação / Sistema Consumidor *</label>
            <input
              type="text"
              id="key-name-input"
              class="form-control"
              placeholder="ex: Sistema ERP Protheus ou CRM Salesforce"
              required
            />
          </div>
        </form>
      `,confirmText:"Gerar Chave",onConfirm:async s=>{const v=s.querySelector("#key-name-input").value.trim();if(!v)return u.warning("O nome da aplicação é obrigatório."),!1;try{const m=await g.createApiKey(v);H.open({title:"🔑 API Key Gerada com Sucesso!",bodyHtml:`
              <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; color: #fbbf24; font-size: 0.88rem;">
                ⚠️ <strong>Atenção:</strong> Copie sua chave agora! Por motivos de segurança, este valor não poderá ser exibido novamente.
              </div>
              <div class="form-group">
                <label class="form-label">Sua Chave de API:</label>
                <div style="display: flex; gap: 8px;">
                  <input
                    type="text"
                    id="generated-key-display"
                    class="form-control"
                    value="${m.apiKey}"
                    readonly
                    style="font-family: var(--font-mono); color: #a5b4fc; background: var(--bg-dark);"
                  />
                  <button id="copy-generated-key-btn" class="btn btn-primary" style="white-space: nowrap;">
                    📋 Copiar
                  </button>
                </div>
              </div>
            `,confirmText:"Concluir",cancelText:"",onConfirm:()=>{r()}}),setTimeout(()=>{var l;(l=document.querySelector("#copy-generated-key-btn"))==null||l.addEventListener("click",()=>{navigator.clipboard.writeText(m.apiKey),u.success("Chave copiada para a área de transferência!")})},50)}catch(m){return u.error(`Erro ao gerar API Key: ${m.message}`),!1}}})};(c=a.querySelector("#generate-key-btn"))==null||c.addEventListener("click",t),r()}async function Me(a){var b,E,x,I;a.innerHTML=`
    <div class="app-layout">
      ${ee("playground")}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">API Playground & Integrações</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Simule requisições de sistemas externos usando API Keys</p>
          </div>
        </header>

        <div class="page-container" style="max-width: 1200px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- Left Config & Payload -->
            <div class="card">
              <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 16px; color: #fff;">
                🚀 Configuração da Requisição
              </h3>

              <div class="form-group">
                <label class="form-label">Selecione o Documento</label>
                <select id="play-doc-select" class="form-control">
                  <option value="">Carregando documentos...</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">API Key de Integração</label>
                <input
                  type="text"
                  id="play-api-key"
                  class="form-control"
                  placeholder="dd_live_..."
                  value=""
                />
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="form-label" style="margin: 0;">Payload de Dados (JSON)</label>
                  <button id="generate-sample-payload-btn" class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.75rem;">
                    🪄 Gerar Payload Exemplo
                  </button>
                </div>
                <textarea
                  id="play-payload"
                  class="form-control"
                  rows="10"
                  style="font-family: var(--font-mono); font-size: 0.85rem; color: #a5b4fc; background: var(--bg-dark);"
                  placeholder='{
  "data": {
    "nomeCliente": "João Silva",
    "nomePaciente": "Maria Silva"
  }
}'
                ></textarea>
              </div>

              <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button id="send-validate-btn" class="btn btn-secondary" style="flex: 1;">
                  🔍 Apenas Validar
                </button>
                <button id="send-submit-btn" class="btn btn-primary" style="flex: 1.5;">
                  ⚡ Executar Submissão (Gerar PDF)
                </button>
              </div>
            </div>

            <!-- Right Response Area -->
            <div class="card" style="display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 1.05rem; font-weight: 700; color: #fff;">
                  📡 Resposta do Servidor
                </h3>
                <span id="response-status-badge" class="badge badge-draft" style="display: none;">
                  Status: 200 OK
                </span>
              </div>

              <div id="response-preview-box" style="flex: 1; min-height: 280px; background: var(--bg-dark); border-radius: var(--radius-md); padding: 16px; border: 1px solid var(--border-subtle); overflow: auto;">
                <div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding-top: 80px;">
                  Envie uma requisição para inspecionar a resposta da API aqui.
                </div>
              </div>

              <div id="pdf-download-action-box" style="margin-top: 16px; display: none;">
                <a id="pdf-download-link" href="#" target="_blank" class="btn btn-success" style="width: 100%; text-align: center;">
                  📄 Abrir Documento PDF Gerado
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,(b=a.querySelector("#logout-btn"))==null||b.addEventListener("click",()=>{g.removeToken(),window.location.hash="#/login",u.info("Sessão encerrada.")});const e=a.querySelector("#play-doc-select"),r=a.querySelector("#play-api-key"),t=a.querySelector("#play-payload"),d=a.querySelector("#response-preview-box"),c=a.querySelector("#response-status-badge"),s=a.querySelector("#pdf-download-action-box"),v=a.querySelector("#pdf-download-link");let m=null;try{const p=(await g.getDocuments()).data||[];e.innerHTML=p.map(w=>`<option value="${w.id}">${w.name} (${w.status})</option>`).join(""),p.length>0?l(p[0].id):e.innerHTML='<option value="">Nenhum documento disponível</option>'}catch($){e.innerHTML=`<option value="">Erro: ${$.message}</option>`}async function l($){try{m=await g.getSchema($),y()}catch{m=null}}function y(){if(!m||!m.fields)return;const $={};m.fields.forEach(p=>{p.type==="NUMBER"?$[p.key]=1500:p.type==="DATE"?$[p.key]="2026-09-02":p.mask==="CPF"?$[p.key]="12345678900":p.mask==="CNPJ"?$[p.key]="12345678000199":$[p.key]=`Valor de ${p.label||p.key}`}),t.value=JSON.stringify({data:$},null,2)}e.addEventListener("change",()=>{e.value&&l(e.value)}),(E=a.querySelector("#generate-sample-payload-btn"))==null||E.addEventListener("click",()=>{y(),u.info("Payload exemplo gerado com base no schema.")});const o=async $=>{const p=e.value,w=r.value.trim();let q;if(!p){u.warning("Selecione um documento.");return}try{q=JSON.parse(t.value)}catch{u.error("O payload deve ser um JSON válido.");return}d.innerHTML='<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding-top: 80px;">⏳ Enviando requisição...</div>',c.style.display="none",s.style.display="none";const A=$?`/api/v1/documents/${p}/validate`:`/api/v1/documents/${p}/submissions`,O={"Content-Type":"application/json"};if(w)O.Authorization=`Bearer ${w}`;else{const P=g.getToken();P&&(O.Authorization=`Bearer ${P}`)}try{const P=await fetch(A,{method:"POST",headers:O,body:JSON.stringify(q)}),N=await P.json();c.style.display="inline-flex",c.className=`badge ${P.ok?"badge-published":"badge-archived"}`,c.innerText=`${P.status} ${P.statusText||(P.ok?"OK":"Error")}`,d.innerHTML=`
        <pre style="font-family: var(--font-mono); font-size: 0.82rem; color: ${P.ok?"#34d399":"#f87171"}; margin: 0;">${JSON.stringify(N,null,2)}</pre>
      `,P.ok&&N.documentUrl?(s.style.display="block",v.href=N.documentUrl,u.success("Documento gerado com sucesso!")):P.ok?u.success("Validação concluída com sucesso."):u.error(`Falha na requisição: ${N.message||"Erro"}`)}catch(P){d.innerHTML=`
        <div style="color: var(--danger); font-size: 0.85rem;">Erro de conexão: ${P.message}</div>
      `}};(x=a.querySelector("#send-submit-btn"))==null||x.addEventListener("click",()=>o(!1)),(I=a.querySelector("#send-validate-btn"))==null||I.addEventListener("click",()=>o(!0))}function He(){const a=document.getElementById("app");if(!a)return;const e=()=>{let r=window.location.hash||"#/documents";if(r.startsWith("#/form/")||r.startsWith("#/f/")){const d=r.replace(/^#(?:(?:\/form\/)|(?:\/f\/))/,"").split("?")[0];$e(a,d);return}if(r==="#/login"){Pe(a);return}if(!g.getToken()){window.location.hash="#/login";return}if(r.startsWith("#/builder/")){const d=r.replace("#/builder/","").split("?")[0];Ae(a,d);return}if(r==="#/custom-fields"){De(a);return}if(r==="#/submissions"){Ne(a);return}if(r==="#/api-keys"){Ie(a);return}if(r==="#/playground"){Me(a);return}ze(a)};window.addEventListener("hashchange",e),e()}document.addEventListener("DOMContentLoaded",()=>{He()});
