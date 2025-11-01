/* js/Script.js — Compatível com Cordova (deviceready) e navegador */
(function(){
  // Aguarda deviceready em Cordova ou DOMContentLoaded no browser
  function whenReady(fn){
    if(window.cordova){
      document.addEventListener('deviceready', fn, {once:true});
    } else {
      document.addEventListener('DOMContentLoaded', fn, {once:true});
    }
  }

  whenReady(initApp);

  function initApp(){
    /* -------------------------
       Dados iniciais: catálogo completo (mantido como no seu arquivo)
       ------------------------- */
    const DEFAULT_CATALOG = {
      salao: [
        "ÁLCOOL","AGUA SANITARIA","CAIXA PIZZA P","CAIXA PIZZA G","DESINFETANTE","DETERGENTE",
        "ESPONJA","SACO LIXO P","SACO LIXO M","SACO LIXO G","GUARDANAPO DE BOCA","GUARDANAPO BANHEIRO",
        "KETCHUP  SACHE","PALITO DE DENTE","PAPEL HIGIÊNICO","PERFLEX","SACO GARFOS FACAS","BRILHO ALUMINIO",
        "MOSTARDA  SACHE","MAIONESE  SACHE","SAL SACHE","AÇUCAR SACHE","VELAS DE ANIVERSARIO","PRATINHOS DE ANIVERSARIO",
        "GARFINHOS DE ANIVERSARIO","AZEITE SALÃO","HASHI","PANO DE PRATO","REPELENTE","MOLHO TARÊ",
        "ADAPTADOR HASHI","SACOLA KRAFT"
      ],
      cozinha: [
        "AÇÚCAR","AJINOMOTO","ALFACE","ALHO FRECO","ALHO FRITO","APRESUNTADO","ARROZ","ASA DE FRANFO","ATUM",
        "ÁLCOOL EM GEL","AZEITE","AZEITONAS VERDES","BANANA NANICA","BATATA PALITO","BACON CUBOS","BACON PIZZA",
        "BRÓCOLIS","CALABRESA","CARNE MOÍDA","CARNE SECA","CEBOLA","CEBOLA ROXA","CEBOLINHA VERDE","CENOURA",
        "CHEDDAR BISNAGA","CHEDDAR FATIADO","CHIMI CHURRI","COLORAL","CONTRA FILÉ","COSTELA","COLHER PARA MOLHO",
        "COPO PARA MOLHO","COXA/SOBRECOXA","ERVILHAS CONGELADAS","FARINHA DE MANDIOCA","FARINHA DE ROSCA","FARINHA DE TRIGO",
        "FARINHA DE TRIGO PIZZA","FEIJÃO","FERMENTO BIOLÓGICO","FIBRACO","FILÉ DE TILÁPIA","FILÉ MIGNON","FUBÁ MIMOSO",
        "GORGONZOLA","LEITE","LIMÃO","LOMBO CANADENSE","MAÇÃ","MACARRÃO ESPAGUETE","MANJERICÃO","MANTEIGA","MIOLO ALCATRA",
        "MOLHO INGLÊS","MOSTARDA","MUÇARELA","ÓLEO DE ALGODÃO","ÓLEO DE SOJA","OVO","PALMITO","PÁPRICA DOCE","PARMESÃO",
        "PEITO DE FRANGO","PICANHA","PIMENTA DEDO DE MOÇA","PIMENTA DO REINO","PROVOLONE","REQUEIJÃO","RÚCULA","SAL",
        "SAL DE PARRILHA","SALAME","SHOYU","TEMPERO PARA CARNE","TOMATE","TOMATE CEREJA","TOMATE SECO","VAGEM",
        "FILME DE ROLO","LIMPA GRILL","PAPEL ACOPLADO","PAPEL TOALHA","PALIRO P/ BATATA","SACO DE BOBINA G","SACO DE BOBINA M",
        "VINAGRE"
      ],
      bar: [
        "Água Crystal GÁS 500ml","Água Crystal 500ml","Água tônica","Aperol","Bacardi tradicional","Cachaça Seleta",
        "Cachaça Cabaré Amburana","Cachaça Cabaré Fire","Cachaça Cabaré Ouro","Cachaça Cabaré Premium","Cachaça Moda nova",
        "Cachaça Nega Frulô","Cachaça Velho Barreiro","Cachaça Ypioca Ouro","Campari","Amstel 600ml","Antártica Boa 600ml",
        "Baden Cristal","Baden Golden","Baden Ipa","Baden Peach","Baden Witbier","Brahma 600ml","Heineken 600ml",
        "Long neck Heineken retornável","Long neck Heineken descartável","Long neck Heineken Zero","Original 600ml","Skol 600ml",
        "Chandon","Chilano Carmenere","Chopp Amstel","Chopp Heineken","Coca Zero 1L","Coca 1L","Coca Lata","Coca Lata Zero",
        "Coca Ks","Coca Ks Zero","Conhaque","Monster","Monster Zero","Baly Mango","Red Bull","Baly 2L Frutas Tropicais",
        "Baly 2L Melancia","Baly 2L Maçã Verde","Guaraná Antártica Zero","Guaraná Antártica","Fanta Laranja Zero","Fanta Laranja",
        "Fanta uva","Licor 43","Balena","Bananinha","Cointreau","Martini","Stock Blue","Stock Laranja","Monison","Montilla",
        "Espumante Pro seco","Sakê","Schweppes citrus","Schweppes citrus Zero","Sprite","Sprite Zero","Limoneto","Lemon fresh",
        "H2O limão","Dell Valle Goiaba","Dell Valle Manga","Dell Valle Maracuja","Dell Valle Pêssego","Dell Valle Uva",
        "Kapo Abacaxi","Kapo Laranja","Kapo Maracujá","Kapo Morango","Kapo Uva","Tanqueray","Tequila José Cuervo Ouro",
        "Tequila José Cuervo Prata","Vinho Bordô Seco","Vinho Bordô Suave","Vinho Tinto Seco","Vinho Tinto Suave","Vinho Branco",
        "Smirnoff","Ballantines","Black Label","Chivas 12 anos","Jack Daniel n°7","Jack Fire","Jack Honey","Jim Beam",
        "Old par","Red label","White horse","Xarope frutas vermelhas","Xarope limão siciliano","Xarope Maçã Verde","Xarope Morango",
        "Polpa Maracujá","Polpa Morango","Polpa frutas vermelhas","Polpa Acerola","Abacaxi porcionado","Maracujá","Morango Caixa",
        "Morango Saco","Frutas vermelhas Saco","Kiwi","Maçã verde","Laranja Bahia","Laranja Caixote","Limão Caixote","Limão siciliano",
        "Gengibre","Carambola"
      ]
    };

    /* -------------------------
       Chaves storage
       ------------------------- */
    const STORAGE = {
      CATALOG: 'cp_catalog_v1',
      LISTS: 'cp_lists_v1'
    };

    /* -------------------------
       Estado
       ------------------------- */
    let state = {
      activeTab: 'salao',  // salao | cozinha | bar | listas | config
      catalog: loadCatalog(),
      lists: loadLists()
    };

    // --- DOM shortcuts
    const $ = s => document.querySelector(s);
    const $$ = s => Array.from(document.querySelectorAll(s));

    const productsGrid = $('#productsGrid');
    const tabs = $$('.tab');
    const topTitle = $('#topTitle');
    const topSubtitle = $('#topSubtitle');
    const searchInput = $('#search');
    const newListFab = $('#newListFab');

    const listsContainer = $('#listsContainer');
    const exportBtn = $('#exportBtn');
    const importFile = $('#importFile');

    const catalogList = $('#catalogList');
    const addManualBtn = $('#addManualBtn');
    const manualName = $('#manualName');
    const manualSector = $('#manualSector');
    const manualStock = $('#manualStock');

    // editor sheet
    const editorSheet = $('#editorSheet');
    const sheetTitle = $('#sheetTitle');
    const sheetName = $('#sheetName');
    const sheetDate = $('#sheetDate');
    const sheetSector = $('#sheetSector');
    const sheetProduct = $('#sheetProduct');
    const sheetQty = $('#sheetQty');
    const sheetUnit = $('#sheetUnit');
    const sheetAddItem = $('#sheetAddItem');
    const sheetItems = $('#sheetItems');
    const sheetSave = $('#sheetSave');
    const sheetCancel = $('#sheetCancel');

    /* -------------------------
       Inicialização
       ------------------------- */
    function init(){
      renderTab(state.activeTab);
      attachEvents();
      renderCatalogList();
    }

    /* -------------------------
       Storage helpers
       ------------------------- */
    function loadCatalog(){
      const raw = localStorage.getItem(STORAGE.CATALOG);
      if(!raw){ localStorage.setItem(STORAGE.CATALOG, JSON.stringify(DEFAULT_CATALOG)); return deepCopy(DEFAULT_CATALOG); }
      try{ return JSON.parse(raw); }catch(e){ return deepCopy(DEFAULT_CATALOG); }
    }
    function saveCatalog(){
      localStorage.setItem(STORAGE.CATALOG, JSON.stringify(state.catalog));
      renderCatalogList();
      if(state.activeTab !== 'listas') renderTab(state.activeTab);
    }
    function loadLists(){
      try{ return JSON.parse(localStorage.getItem(STORAGE.LISTS) || '[]'); }catch(e){ return []; }
    }
    function saveLists(){ localStorage.setItem(STORAGE.LISTS, JSON.stringify(state.lists)); renderLists(); }

    function deepCopy(obj){ return JSON.parse(JSON.stringify(obj)); }

    /* -------------------------
       Eventos & UI
       ------------------------- */
    function attachEvents(){
      // bottom tabs
      tabs.forEach(t => t.addEventListener('click', ()=> {
        const tab = t.dataset.tab;
        setActiveTab(tab);
      }));
      searchInput.addEventListener('input', ()=> renderTab(state.activeTab));
      newListFab.addEventListener('click', ()=> openEditor());

      exportBtn && exportBtn.addEventListener('click', exportLists);
      importFile && importFile.addEventListener('change', handleImport);

      addManualBtn.addEventListener('click', addManualProduct);

      // editor sheet events
      sheetAddItem.addEventListener('click', addItemToSheet);
      sheetSave.addEventListener('click', saveSheetList);
      sheetCancel.addEventListener('click', closeEditorSheet);

      // accessibility: close sheet on escape
      document.addEventListener('keydown', e => {
        if(e.key === 'Escape' && !editorSheet.classList.contains('hidden')) closeEditorSheet();
      });
    }

    function setActiveTab(tab){
      state.activeTab = tab;
      $$('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      renderTab(tab);
    }

    function renderTab(tab){
      // update top title & show/hide views
      topTitle.textContent = tabLabel(tab);
      // views
      $$('.view').forEach(v => v.classList.remove('active'));
      if(tab === 'salao' || tab === 'cozinha' || tab === 'bar'){
        $('#catalogView').classList.add('active');
        renderProductsGrid(tab);
      } else if(tab === 'listas'){
        $('#listsView').classList.add('active');
        renderLists();
      } else if(tab === 'config'){
        $('#configView').classList.add('active');
      }
    }

    function tabLabel(tab){
      if(tab === 'salao') return 'Salão';
      if(tab === 'cozinha') return 'Cozinha';
      if(tab === 'bar') return 'Bar';
      if(tab === 'listas') return 'Listas';
      return 'Config';
    }

    /* -------------------------
       Products grid (catalog)
       ------------------------- */
    function renderProductsGrid(sector){
      const q = searchInput.value.trim().toLowerCase();
      productsGrid.innerHTML = '';
      const list = (state.catalog[sector]||[]).filter(p => p.toLowerCase().includes(q));
      if(list.length === 0) {
        productsGrid.innerHTML = `<p class="muted">Nenhum produto encontrado.</p>`;
        return;
      }
      list.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="prod-title">${escapeHtml(prod)}</div>
          <div class="prod-meta"><span class="muted">setor: ${sector}</span><span class="muted">est: —</span></div>
          <div style="display:flex;justify-content:flex-end;margin-top:6px">
            <button class="add-btn" data-prod="${escapeHtml(prod)}" data-sector="${sector}">Adicionar à lista</button>
          </div>
        `;
        productsGrid.appendChild(card);
      });
      // attach add buttons
      Array.from(productsGrid.querySelectorAll('.add-btn')).forEach(b=>{
        b.addEventListener('click', ()=> {
          const prod = b.dataset.prod;
          openEditor({ presetProduct: prod, presetSector: b.dataset.sector });
        });
      });
    }

    /* -------------------------
       Lists (render, create, delete, pdf)
       ------------------------- */
    function renderLists(){
      listsContainer.innerHTML = '';
      const q = searchInput.value.trim().toLowerCase();
      const lists = state.lists.filter(l => {
        if(!q) return true;
        if(l.name.toLowerCase().includes(q)) return true;
        return l.items.some(it => it.product.toLowerCase().includes(q));
      }).sort((a,b) => new Date(b.created||b.date) - new Date(a.created||a.date));
      if(lists.length === 0) { listsContainer.innerHTML = '<p class="muted">Nenhuma lista.</p>'; return; }
      lists.forEach(l => {
        const el = document.createElement('div');
        el.className = 'list-card';
        el.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong>${escapeHtml(l.name)}</strong>
              <div class="list-meta">${l.date} • ${tabLabel(l.sector)}</div>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn" data-id="${l.id}" data-action="open">Abrir</button>
              <button class="btn" data-id="${l.id}" data-action="pdf">PDF</button>
              <button class="btn" data-id="${l.id}" data-action="del">Excluir</button>
            </div>
          </div>
          <ul class="mini-items">${l.items.slice(0,20).map(it=>`<li>${escapeHtml(it.product)} — ${it.qty} ${it.unit}</li>`).join('')}</ul>
        `;
        listsContainer.appendChild(el);
        el.querySelectorAll('button').forEach(btn=>{
          btn.addEventListener('click', ()=> {
            const action = btn.dataset.action;
            const id = btn.dataset.id;
            if(action === 'open') {
              const listObj = state.lists.find(x=>x.id===id);
              if(listObj) openEditor(listObj);
            } else if(action === 'pdf') {
              const listObj = state.lists.find(x=>x.id===id);
              if(listObj) generatePdf(listObj);
            } else if(action === 'del') {
              if(confirm('Excluir lista?')) { state.lists = state.lists.filter(x=>x.id!==id); saveLists(); }
            }
          });
        });
      });
    }

    function openEditor(existing){
      // existing can be null or a list object. Also support presetProduct/presetSector
      let presetProduct = null, presetSector = null;
      if(existing && existing.presetProduct){ presetProduct = existing.presetProduct; presetSector = existing.presetSector; existing = null; }
      editorSheet.classList.remove('hidden');
      if(existing){
        sheetTitle.textContent = 'Editar Lista';
        sheetName.value = existing.name;
        sheetDate.value = existing.date;
        sheetSector.value = existing.sector || 'salao';
        sheetItems.innerHTML = '';
        existing.items.forEach(it => {
          addSheetItemNode(it.product, it.qty, it.unit, it.stock);
        });
        editorSheet.dataset.editId = existing.id;
      } else {
        sheetTitle.textContent = 'Nova Lista';
        sheetName.value = '';
        sheetDate.value = new Date().toISOString().slice(0,10);
        sheetSector.value = presetSector || 'salao';
        sheetItems.innerHTML = '';
        editorSheet.removeAttribute('data-edit-id');
      }
      populateSheetProductOptions(sheetSector.value);
      if(presetProduct) {
        sheetProduct.value = presetProduct;
        sheetQty.value = 1;
      }
      // update product options when sector changes
      sheetSector.onchange = ()=> populateSheetProductOptions(sheetSector.value);
    }

    function closeEditorSheet(){
      editorSheet.classList.add('hidden');
      sheetItems.innerHTML = '';
    }

    function populateSheetProductOptions(sector){
      sheetProduct.innerHTML = '';
      (state.catalog[sector]||[]).forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        sheetProduct.appendChild(opt);
      });
    }

    function addItemToSheet(){
      const prod = sheetProduct.value;
      const qty = Number(sheetQty.value) || 1;
      const unit = sheetUnit.value;
      if(!prod) return alert('Selecione produto');
      addSheetItemNode(prod, qty, unit, '—');
    }
    function addSheetItemNode(prod, qty, unit, stock){
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.padding = '6px 0';
      li.innerHTML = `<span>${escapeHtml(prod)} — ${qty} ${unit}</span><span><button class="btn" data-action="edit">✏️</button><button class="btn" data-action="del">🗑️</button></span>`;
      // attach actions
      li.querySelector('[data-action="edit"]').addEventListener('click', ()=> {
        // simple edit: move to selects and remove node
        sheetProduct.value = prod;
        sheetQty.value = qty;
        sheetUnit.value = unit;
        li.remove();
      });
      li.querySelector('[data-action="del"]').addEventListener('click', ()=> li.remove());
      sheetItems.appendChild(li);
    }

    function saveSheetList(){
      const name = sheetName.value.trim();
      const date = sheetDate.value;
      const sector = sheetSector.value;
      if(!name) return alert('Nome é obrigatório');
      if(!date) return alert('Data é obrigatória');
      const items = Array.from(sheetItems.children).map(li=>{
        const text = li.querySelector('span').textContent;
        // parse "produto — qty unit"
        const parts = text.split('—').map(s=>s.trim());
        const product = parts[0] || '';
        const rest = parts[1] || '';
        const [qtyStr, unit] = rest.split(' ');
        return { product, qty: Number(qtyStr)||1, unit: unit||'und', stock: '—' };
      });
      const editId = editorSheet.dataset.editId;
      if(editId){
        const idx = state.lists.findIndex(l => l.id === editId);
        if(idx >= 0){
          state.lists[idx].name = name;
          state.lists[idx].date = date;
          state.lists[idx].sector = sector;
          state.lists[idx].items = items;
          state.lists[idx].updated = new Date().toISOString();
        }
      } else {
        state.lists.push({
          id: 'L_' + Date.now(),
          name, date, sector, items, created: new Date().toISOString()
        });
      }
      saveLists();
      closeEditorSheet();
      setActiveTab('listas');
    }

    /* -------------------------
       Catalog management (Config)
       ------------------------- */
    function renderCatalogList(){
      catalogList.innerHTML = '';
      ['salao','cozinha','bar'].forEach(sec=>{
        const header = document.createElement('div');
        header.className = 'card';
        header.innerHTML = `<strong>${tabLabel(sec)}</strong>`;
        const list = document.createElement('div');
        list.className = 'catalog-list';
        (state.catalog[sec]||[]).forEach((p, idx) => {
          const row = document.createElement('div');
          row.className = 'catalog-item';
          row.innerHTML = `<span>${escapeHtml(p)}</span>
            <div style="display:flex;gap:8px">
              <button class="btn" data-sec="${sec}" data-idx="${idx}" data-act="del">Remover</button>
            </div>`;
          list.appendChild(row);
        });
        header.appendChild(list);
        catalogList.appendChild(header);
      });
      // attach remove listeners
      catalogList.querySelectorAll('[data-act="del"]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          const sec = btn.dataset.sec;
          const idx = Number(btn.dataset.idx);
          if(confirm('Remover produto do catálogo?')) {
            state.catalog[sec].splice(idx,1);
            saveCatalog();
          }
        });
      });
    }

    function addManualProduct(){
      const name = manualName.value.trim();
      const sec = manualSector.value;
      const stock = Number(manualStock.value) || 0;
      if(!name) return alert('Informe nome do produto');
      state.catalog[sec] = state.catalog[sec] || [];
      state.catalog[sec].push(name);
      saveCatalog();
      manualName.value=''; manualStock.value=''; manualSector.value='salao';
      alert('Produto adicionado ao catálogo');
    }

    /* -------------------------
       Export / Import lists
       ------------------------- */
    function exportLists(){
      const data = JSON.stringify(state.lists, null, 2);
      const blob = new Blob([data], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `listas_backup_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    }
    function handleImport(e){
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(evt){
        try{
          const arr = JSON.parse(evt.target.result);
          if(!Array.isArray(arr)) throw new Error('Arquivo inválido');
          // merge (give new ids if necessary)
          const existing = loadLists();
          const merged = existing.concat(arr.map(it=>{
            if(!it.id) it.id = 'L_imp_' + Date.now() + Math.floor(Math.random()*1000);
            return it;
          }));
          state.lists = merged;
          saveLists();
          alert('Importação concluída');
          importFile.value = '';
        }catch(err){
          alert('Erro ao importar: ' + err.message);
        }
      };
      reader.readAsText(file);
    }

    /* -------------------------
       PDF generation
       ------------------------- */
    function generatePdf(listObj){
      try{
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({unit:'pt', format:'a4'});
        doc.setFontSize(14);
        doc.text(`${listObj.name} — ${tabLabel(listObj.sector)}`, 40, 60);
        doc.setFontSize(11);
        doc.text(`Data: ${listObj.date}`, 40, 80);
        doc.text('Itens:', 40, 100);
        let y = 120;
        listObj.items.forEach((it, i)=>{
          const line = `${i+1}. ${it.product} — ${it.qty} ${it.unit}`;
          doc.text(line, 40, y);
          y += 18;
          if(y > 740){ doc.addPage(); y = 40; }
        });
        doc.save(`${listObj.name}.pdf`);
      }catch(e){
        alert('Erro ao gerar PDF: ' + e.message);
      }
    }

    /* -------------------------
       Utilities
       ------------------------- */
    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }

    // initialize
    init();

  } // initApp end
})();
