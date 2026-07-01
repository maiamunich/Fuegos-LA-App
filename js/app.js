/* Fuegos LA Inventory Manager
   Vanilla JS, no build step, persists to localStorage on this device. */

(function () {
  "use strict";

  var STORAGE_KEY = "fuegosLA_inventory_v1";

  /* ---------------------------------------------------------------- */
  /* Translations                                                      */
  /* ---------------------------------------------------------------- */

  var I18N = {
    en: {
      brandSub: "Inventory Manager",
      navDashboard: "Dashboard",
      navStock: "Fridge & Freezer Stock",
      navProducts: "Made Products",
      navGrocery: "Grocery List",
      dashTitle: "Overview",
      sumIngredients: "Ingredients Tracked",
      sumLowIngredients: "Ingredients Low",
      sumProducts: "Products Tracked",
      sumLowProducts: "Products Low",
      sumGrocery: "Items on Grocery List",
      dashReorderIngredients: "Ingredients to Reorder",
      dashRemakeProducts: "Products to Make More Of",
      dashAllGood: "All good — nothing low right now.",
      stockTitle: "Fridge & Freezer Stock",
      productsTitle: "Made Products",
      groceryTitle: "Grocery List",
      searchPlaceholder: "Search...",
      showLowOnly: "Show low stock only",
      addIngredient: "Add Ingredient",
      addProduct: "Add Product",
      addGroceryItem: "Add Item to List",
      namePlaceholder: "Name",
      qtyPlaceholder: "Quantity",
      qtyNotePlaceholder: "Amount / note",
      thresholdPlaceholder: "Alert below",
      addBtn: "Add",
      generateListBtn: "Generate list from low stock",
      printBtn: "Print / Share",
      clearCheckedBtn: "Clear checked",
      clearAllBtn: "Clear all",
      footerNote: "Data is saved on this device only.",
      low: "LOW",
      alertBelow: "Alert below",
      addToGrocery: "Add to grocery list",
      delete: "Delete",
      confirmDelete: "Delete this item?",
      confirmClearAll: "Clear the entire grocery list?",
      emptyStock: "No ingredients yet. Add one below.",
      emptyProducts: "No products yet. Add one below.",
      emptyGrocery: "Grocery list is empty.",
      locationFridge: "Fridge",
      locationFreezer: "Freezer",
      locationPantry: "Pantry",
      unitLbs: "lbs", unitKg: "kg", unitOz: "oz", unitG: "g",
      unitL: "L", unitMl: "mL", unitGal: "gal", unitQt: "qt",
      unitUnits: "units", unitDozen: "dozen", unitBunches: "bunches",
      unitCans: "cans", unitBottles: "bottles"
    },
    es: {
      brandSub: "Gestor de Inventario",
      navDashboard: "Resumen",
      navStock: "Refrigerador y Congelador",
      navProducts: "Productos Hechos",
      navGrocery: "Lista de Compras",
      dashTitle: "Resumen General",
      sumIngredients: "Ingredientes Registrados",
      sumLowIngredients: "Ingredientes Bajos",
      sumProducts: "Productos Registrados",
      sumLowProducts: "Productos Bajos",
      sumGrocery: "Artículos en la Lista",
      dashReorderIngredients: "Ingredientes para Reordenar",
      dashRemakeProducts: "Productos para Volver a Hacer",
      dashAllGood: "Todo bien — nada bajo por ahora.",
      stockTitle: "Refrigerador y Congelador",
      productsTitle: "Productos Hechos",
      groceryTitle: "Lista de Compras",
      searchPlaceholder: "Buscar...",
      showLowOnly: "Mostrar solo bajos",
      addIngredient: "Agregar Ingrediente",
      addProduct: "Agregar Producto",
      addGroceryItem: "Agregar Artículo a la Lista",
      namePlaceholder: "Nombre",
      qtyPlaceholder: "Cantidad",
      qtyNotePlaceholder: "Cantidad / nota",
      thresholdPlaceholder: "Alertar si es menor a",
      addBtn: "Agregar",
      generateListBtn: "Generar lista de lo que falta",
      printBtn: "Imprimir / Compartir",
      clearCheckedBtn: "Quitar marcados",
      clearAllBtn: "Vaciar lista",
      footerNote: "Los datos se guardan solo en este dispositivo.",
      low: "BAJO",
      alertBelow: "Alertar si es menor a",
      addToGrocery: "Agregar a la lista de compras",
      delete: "Eliminar",
      confirmDelete: "¿Eliminar este artículo?",
      confirmClearAll: "¿Vaciar toda la lista de compras?",
      emptyStock: "Todavía no hay ingredientes. Agrega uno abajo.",
      emptyProducts: "Todavía no hay productos. Agrega uno abajo.",
      emptyGrocery: "La lista de compras está vacía.",
      locationFridge: "Refrigerador",
      locationFreezer: "Congelador",
      locationPantry: "Despensa",
      unitLbs: "lbs", unitKg: "kg", unitOz: "oz", unitG: "g",
      unitL: "L", unitMl: "mL", unitGal: "gal", unitQt: "qt",
      unitUnits: "unidades", unitDozen: "docena", unitBunches: "manojos",
      unitCans: "latas", unitBottles: "botellas"
    }
  };

  var UNITS = [
    { value: "lbs", key: "unitLbs" },
    { value: "kg", key: "unitKg" },
    { value: "oz", key: "unitOz" },
    { value: "g", key: "unitG" },
    { value: "L", key: "unitL" },
    { value: "mL", key: "unitMl" },
    { value: "gal", key: "unitGal" },
    { value: "qt", key: "unitQt" },
    { value: "units", key: "unitUnits" },
    { value: "dozen", key: "unitDozen" },
    { value: "bunches", key: "unitBunches" },
    { value: "cans", key: "unitCans" },
    { value: "bottles", key: "unitBottles" }
  ];

  var LOCATIONS = [
    { value: "fridge", key: "locationFridge" },
    { value: "freezer", key: "locationFreezer" },
    { value: "pantry", key: "locationPantry" }
  ];

  /* ---------------------------------------------------------------- */
  /* Default seed data (based on Fuegos LA's Argentine empanada menu)  */
  /* ---------------------------------------------------------------- */

  function seedData() {
    return {
      language: "en",
      ingredients: [
        ing("Sirloin Beef", "Carne de Res (Bola de Lomo)", 20, "lbs", "freezer", 5),
        ing("Shredded Chicken", "Pollo Desmenuzado", 15, "lbs", "freezer", 5),
        ing("Spinach", "Espinaca", 10, "lbs", "fridge", 5),
        ing("Mushroom", "Champiñones", 8, "lbs", "fridge", 5),
        ing("Mozzarella Cheese", "Queso Mozzarella", 12, "lbs", "fridge", 5),
        ing("Vegan Cheese", "Queso Vegano", 6, "lbs", "fridge", 5),
        ing("Vegan Béchamel", "Bechamel Vegana", 4, "qt", "fridge", 5),
        ing("Onion", "Cebolla", 25, "lbs", "pantry", 5),
        ing("Red Bell Pepper", "Pimiento Rojo", 15, "lbs", "fridge", 5),
        ing("Tomato", "Tomate", 10, "lbs", "fridge", 5),
        ing("Basil", "Albahaca", 3, "bunches", "fridge", 5),
        ing("Ham", "Jamón", 8, "lbs", "fridge", 5),
        ing("Creamed Corn", "Maíz Cremoso", 6, "cans", "pantry", 5),
        ing("Vegan Beef", "Carne Vegana", 5, "lbs", "freezer", 5),
        ing("Malbec Wine", "Vino Malbec", 2, "bottles", "pantry", 5),
        ing("Garlic", "Ajo", 4, "lbs", "pantry", 5),
        ing("Parsley", "Perejil", 5, "bunches", "fridge", 5),
        ing("Olive Oil", "Aceite de Oliva", 3, "gal", "pantry", 5),
        ing("Empanada Dough Discs", "Discos de Masa para Empanadas", 200, "units", "freezer", 5),
        ing("Oregano", "Orégano", 4, "lbs", "pantry", 5)
      ],
      products: [
        prod("Hand Cut Beef Empanadas", "Empanadas de Carne Cortada a Mano", 24, 5),
        prod("Chicken Empanadas", "Empanadas de Pollo", 18, 5),
        prod("Spinach & Mushroom Empanadas", "Empanadas de Espinaca y Champiñones", 12, 5),
        prod("Cheese & Onion Empanadas", "Empanadas de Queso y Cebolla", 10, 5),
        prod("Ham & Cheese Empanadas", "Empanadas de Jamón y Queso", 8, 5),
        prod("Caprese Empanadas", "Empanadas Caprese", 6, 5),
        prod("Vegan Beef Empanadas", "Empanadas de Carne Vegana", 4, 5),
        prod("Humita Corn Empanadas", "Empanadas de Humita", 3, 5),
        prod("Chimichurri (8oz)", "Chimichurri (8oz)", 15, 5)
      ],
      groceryList: []
    };
  }

  function uid() {
    return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  function ing(nameEn, nameEs, quantity, unit, location, threshold) {
    return { id: uid(), nameEn: nameEn, nameEs: nameEs, quantity: quantity, unit: unit, location: location, threshold: threshold };
  }

  function prod(nameEn, nameEs, quantity, threshold) {
    return { id: uid(), nameEn: nameEn, nameEs: nameEs, quantity: quantity, threshold: threshold };
  }

  /* ---------------------------------------------------------------- */
  /* State                                                              */
  /* ---------------------------------------------------------------- */

  var state = loadState();

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.ingredients && parsed.products) return parsed;
      }
    } catch (e) { /* fall through to seed */ }
    return seedData();
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function t(key) {
    return (I18N[state.language] && I18N[state.language][key]) || I18N.en[key] || key;
  }

  function itemName(item) {
    if (state.language === "es" && item.nameEs) return item.nameEs;
    if (item.nameEn) return item.nameEn;
    return item.name || "";
  }

  /* ---------------------------------------------------------------- */
  /* Rendering: translations & static text                             */
  /* ---------------------------------------------------------------- */

  function applyStaticTranslations() {
    document.documentElement.lang = state.language;
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = t(els[i].getAttribute("data-i18n"));
    }
    var phEls = document.querySelectorAll("[data-i18n-placeholder]");
    for (var j = 0; j < phEls.length; j++) {
      phEls[j].placeholder = t(phEls[j].getAttribute("data-i18n-placeholder"));
    }
    document.getElementById("langToggle").textContent = state.language === "en" ? "ES" : "EN";
    populateSelect(document.getElementById("newIngUnit"), UNITS);
    populateSelect(document.getElementById("newIngLocation"), LOCATIONS);
  }

  function populateSelect(select, options) {
    if (!select) return;
    var prevValue = select.value;
    select.innerHTML = "";
    options.forEach(function (opt) {
      var el = document.createElement("option");
      el.value = opt.value;
      el.textContent = t(opt.key);
      select.appendChild(el);
    });
    if (prevValue) select.value = prevValue;
  }

  /* ---------------------------------------------------------------- */
  /* Dashboard                                                          */
  /* ---------------------------------------------------------------- */

  function isLow(item) {
    return Number(item.quantity) < Number(item.threshold);
  }

  function renderDashboard() {
    var lowIngredients = state.ingredients.filter(isLow);
    var lowProducts = state.products.filter(isLow);

    document.getElementById("sumIngredients").textContent = state.ingredients.length;
    document.getElementById("sumLowIngredients").textContent = lowIngredients.length;
    document.getElementById("sumProducts").textContent = state.products.length;
    document.getElementById("sumLowProducts").textContent = lowProducts.length;
    document.getElementById("sumGrocery").textContent = state.groceryList.length;

    renderDashList("dashLowIngredientsList", lowIngredients, function (item) {
      return itemName(item) + " — " + item.quantity + " " + t(unitKey(item.unit));
    });
    renderDashList("dashLowProductsList", lowProducts, function (item) {
      return itemName(item) + " — " + item.quantity;
    });
  }

  function unitKey(unitValue) {
    var found = UNITS.filter(function (u) { return u.value === unitValue; })[0];
    return found ? found.key : "unitUnits";
  }

  function renderDashList(elId, items, formatter) {
    var el = document.getElementById(elId);
    el.innerHTML = "";
    if (items.length === 0) {
      var li = document.createElement("li");
      li.className = "empty-msg";
      li.textContent = t("dashAllGood");
      el.appendChild(li);
      return;
    }
    items.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = formatter(item);
      el.appendChild(li);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Stock page                                                         */
  /* ---------------------------------------------------------------- */

  function renderStock() {
    var search = (document.getElementById("stockSearch").value || "").toLowerCase();
    var lowOnly = document.getElementById("stockLowOnly").checked;
    var container = document.getElementById("stockList");
    container.innerHTML = "";

    var items = state.ingredients.filter(function (item) {
      if (lowOnly && !isLow(item)) return false;
      if (search && itemName(item).toLowerCase().indexOf(search) === -1) return false;
      return true;
    });

    if (items.length === 0) {
      container.innerHTML = '<div class="empty-state">' + t("emptyStock") + "</div>";
      return;
    }

    items.forEach(function (item) {
      container.appendChild(buildIngredientRow(item));
    });
  }

  function buildIngredientRow(item) {
    var row = document.createElement("div");
    row.className = "item-row" + (isLow(item) ? " low" : "");

    var main = document.createElement("div");
    main.className = "item-main";
    var nameEl = document.createElement("div");
    nameEl.className = "item-name";
    nameEl.textContent = itemName(item);
    var metaEl = document.createElement("div");
    metaEl.className = "item-meta";
    metaEl.textContent = t(LOCATIONS.filter(function (l) { return l.value === item.location; })[0].key);
    main.appendChild(nameEl);
    main.appendChild(metaEl);
    if (isLow(item)) {
      var badge = document.createElement("span");
      badge.className = "low-badge";
      badge.textContent = t("low");
      nameEl.appendChild(document.createTextNode(" "));
      nameEl.appendChild(badge);
    }
    row.appendChild(main);

    var qtyControls = document.createElement("div");
    qtyControls.className = "qty-controls";

    var minusBtn = makeQtyBtn("−", function () {
      updateIngredientQty(item.id, -1);
    });
    var qtyVal = document.createElement("span");
    qtyVal.className = "qty-value";
    qtyVal.textContent = item.quantity + " " + t(unitKey(item.unit));
    var plusBtn = makeQtyBtn("+", function () {
      updateIngredientQty(item.id, 1);
    });

    qtyControls.appendChild(minusBtn);
    qtyControls.appendChild(qtyVal);
    qtyControls.appendChild(plusBtn);
    row.appendChild(qtyControls);

    var thresholdWrap = document.createElement("label");
    thresholdWrap.className = "threshold-label";
    var thresholdText = document.createElement("span");
    thresholdText.textContent = t("alertBelow") + ":";
    var thresholdInput = document.createElement("input");
    thresholdInput.type = "number";
    thresholdInput.className = "threshold-input";
    thresholdInput.min = "0";
    thresholdInput.value = item.threshold;
    thresholdInput.addEventListener("change", function () {
      item.threshold = Number(thresholdInput.value) || 0;
      saveState();
      renderAll();
    });
    thresholdWrap.appendChild(thresholdText);
    thresholdWrap.appendChild(thresholdInput);
    row.appendChild(thresholdWrap);

    var actions = document.createElement("div");
    actions.className = "qty-controls";

    var groceryBtn = document.createElement("button");
    groceryBtn.className = "btn btn-secondary";
    groceryBtn.textContent = t("addToGrocery");
    groceryBtn.type = "button";
    groceryBtn.addEventListener("click", function () {
      addToGroceryList(itemName(item), "", item.id);
    });
    actions.appendChild(groceryBtn);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-icon";
    deleteBtn.type = "button";
    deleteBtn.title = t("delete");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", function () {
      if (confirm(t("confirmDelete"))) {
        state.ingredients = state.ingredients.filter(function (i) { return i.id !== item.id; });
        saveState();
        renderAll();
      }
    });
    actions.appendChild(deleteBtn);

    row.appendChild(actions);

    return row;
  }

  function makeQtyBtn(label, onClick) {
    var btn = document.createElement("button");
    btn.className = "qty-btn";
    btn.type = "button";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function updateIngredientQty(id, delta) {
    var item = state.ingredients.filter(function (i) { return i.id === id; })[0];
    if (!item) return;
    item.quantity = Math.max(0, roundQty(Number(item.quantity) + delta));
    saveState();
    renderAll();
  }

  function roundQty(n) {
    return Math.round(n * 100) / 100;
  }

  /* ---------------------------------------------------------------- */
  /* Products page                                                      */
  /* ---------------------------------------------------------------- */

  function renderProducts() {
    var search = (document.getElementById("productSearch").value || "").toLowerCase();
    var lowOnly = document.getElementById("productLowOnly").checked;
    var container = document.getElementById("productList");
    container.innerHTML = "";

    var items = state.products.filter(function (item) {
      if (lowOnly && !isLow(item)) return false;
      if (search && itemName(item).toLowerCase().indexOf(search) === -1) return false;
      return true;
    });

    if (items.length === 0) {
      container.innerHTML = '<div class="empty-state">' + t("emptyProducts") + "</div>";
      return;
    }

    items.forEach(function (item) {
      container.appendChild(buildProductRow(item));
    });
  }

  function buildProductRow(item) {
    var row = document.createElement("div");
    row.className = "item-row" + (isLow(item) ? " low" : "");

    var main = document.createElement("div");
    main.className = "item-main";
    var nameEl = document.createElement("div");
    nameEl.className = "item-name";
    nameEl.textContent = itemName(item);
    main.appendChild(nameEl);
    if (isLow(item)) {
      var badge = document.createElement("span");
      badge.className = "low-badge";
      badge.textContent = t("low");
      nameEl.appendChild(document.createTextNode(" "));
      nameEl.appendChild(badge);
    }
    row.appendChild(main);

    var qtyControls = document.createElement("div");
    qtyControls.className = "qty-controls";
    var minusBtn = makeQtyBtn("−", function () {
      updateProductQty(item.id, -1);
    });
    var qtyVal = document.createElement("span");
    qtyVal.className = "qty-value";
    qtyVal.textContent = item.quantity;
    var plusBtn = makeQtyBtn("+", function () {
      updateProductQty(item.id, 1);
    });
    qtyControls.appendChild(minusBtn);
    qtyControls.appendChild(qtyVal);
    qtyControls.appendChild(plusBtn);
    row.appendChild(qtyControls);

    var batchWrap = document.createElement("div");
    batchWrap.className = "qty-controls";
    var batchInput = document.createElement("input");
    batchInput.type = "number";
    batchInput.className = "batch-input";
    batchInput.min = "1";
    batchInput.placeholder = "+N";
    var batchBtn = document.createElement("button");
    batchBtn.className = "btn btn-secondary";
    batchBtn.type = "button";
    batchBtn.textContent = t("addBtn");
    batchBtn.addEventListener("click", function () {
      var n = Number(batchInput.value);
      if (n > 0) {
        updateProductQty(item.id, n);
        batchInput.value = "";
      }
    });
    batchWrap.appendChild(batchInput);
    batchWrap.appendChild(batchBtn);
    row.appendChild(batchWrap);

    var thresholdWrap = document.createElement("label");
    thresholdWrap.className = "threshold-label";
    var thresholdText = document.createElement("span");
    thresholdText.textContent = t("alertBelow") + ":";
    var thresholdInput = document.createElement("input");
    thresholdInput.type = "number";
    thresholdInput.className = "threshold-input";
    thresholdInput.min = "0";
    thresholdInput.value = item.threshold;
    thresholdInput.addEventListener("change", function () {
      item.threshold = Number(thresholdInput.value) || 0;
      saveState();
      renderAll();
    });
    thresholdWrap.appendChild(thresholdText);
    thresholdWrap.appendChild(thresholdInput);
    row.appendChild(thresholdWrap);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-icon";
    deleteBtn.type = "button";
    deleteBtn.title = t("delete");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", function () {
      if (confirm(t("confirmDelete"))) {
        state.products = state.products.filter(function (i) { return i.id !== item.id; });
        saveState();
        renderAll();
      }
    });
    row.appendChild(deleteBtn);

    return row;
  }

  function updateProductQty(id, delta) {
    var item = state.products.filter(function (i) { return i.id === id; })[0];
    if (!item) return;
    item.quantity = Math.max(0, Math.round(Number(item.quantity) + delta));
    saveState();
    renderAll();
  }

  /* ---------------------------------------------------------------- */
  /* Grocery list page                                                  */
  /* ---------------------------------------------------------------- */

  function addToGroceryList(name, note, sourceId) {
    var exists = state.groceryList.some(function (g) {
      return g.name === name && !g.checked;
    });
    if (exists) return;
    state.groceryList.push({ id: uid(), name: name, note: note || "", checked: false, sourceId: sourceId || null });
    saveState();
    renderAll();
  }

  function generateGroceryListFromLowStock() {
    var lowIngredients = state.ingredients.filter(isLow);
    lowIngredients.forEach(function (item) {
      var needed = roundQty(Number(item.threshold) - Number(item.quantity));
      var note = needed > 0 ? ("+" + needed + " " + t(unitKey(item.unit))) : "";
      var already = state.groceryList.filter(function (g) { return g.sourceId === item.id && !g.checked; })[0];
      if (already) {
        already.note = note;
      } else {
        state.groceryList.push({ id: uid(), name: itemName(item), note: note, checked: false, sourceId: item.id });
      }
    });
    saveState();
    renderAll();
  }

  function renderGrocery() {
    var container = document.getElementById("groceryList");
    container.innerHTML = "";

    if (state.groceryList.length === 0) {
      container.innerHTML = '<div class="empty-state">' + t("emptyGrocery") + "</div>";
      return;
    }

    state.groceryList.forEach(function (g) {
      var row = document.createElement("div");
      row.className = "item-row grocery-item" + (g.checked ? " checked" : "");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = g.checked;
      checkbox.addEventListener("change", function () {
        g.checked = checkbox.checked;
        saveState();
        renderAll();
      });
      row.appendChild(checkbox);

      var nameEl = document.createElement("span");
      nameEl.className = "grocery-name";
      nameEl.textContent = g.name;
      row.appendChild(nameEl);

      if (g.note) {
        var noteEl = document.createElement("span");
        noteEl.className = "grocery-note";
        noteEl.textContent = g.note;
        row.appendChild(noteEl);
      }

      var deleteBtn = document.createElement("button");
      deleteBtn.className = "btn-icon";
      deleteBtn.type = "button";
      deleteBtn.title = t("delete");
      deleteBtn.textContent = "🗑";
      deleteBtn.addEventListener("click", function () {
        state.groceryList = state.groceryList.filter(function (i) { return i.id !== g.id; });
        saveState();
        renderAll();
      });
      row.appendChild(deleteBtn);

      container.appendChild(row);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Global render + page switching                                    */
  /* ---------------------------------------------------------------- */

  function renderAll() {
    applyStaticTranslations();
    renderDashboard();
    renderStock();
    renderProducts();
    renderGrocery();
  }

  function switchPage(pageId) {
    var pages = document.querySelectorAll(".page");
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove("active");
    document.getElementById("page-" + pageId).classList.add("active");

    var tabs = document.querySelectorAll(".tab-btn");
    for (var j = 0; j < tabs.length; j++) tabs[j].classList.remove("active");
    document.querySelector('.tab-btn[data-page="' + pageId + '"]').classList.add("active");
  }

  /* ---------------------------------------------------------------- */
  /* Event wiring                                                       */
  /* ---------------------------------------------------------------- */

  function init() {
    document.getElementById("tabs").addEventListener("click", function (e) {
      var btn = e.target.closest(".tab-btn");
      if (btn) switchPage(btn.getAttribute("data-page"));
    });

    document.getElementById("langToggle").addEventListener("click", function () {
      state.language = state.language === "en" ? "es" : "en";
      saveState();
      renderAll();
    });

    document.getElementById("stockSearch").addEventListener("input", renderStock);
    document.getElementById("stockLowOnly").addEventListener("change", renderStock);
    document.getElementById("productSearch").addEventListener("input", renderProducts);
    document.getElementById("productLowOnly").addEventListener("change", renderProducts);

    document.getElementById("addIngredientForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("newIngName").value.trim();
      var qty = Number(document.getElementById("newIngQty").value);
      var unit = document.getElementById("newIngUnit").value;
      var location = document.getElementById("newIngLocation").value;
      var threshold = Number(document.getElementById("newIngThreshold").value) || 5;
      if (!name) return;
      state.ingredients.push({ id: uid(), nameEn: name, nameEs: name, quantity: qty, unit: unit, location: location, threshold: threshold });
      saveState();
      e.target.reset();
      document.getElementById("newIngThreshold").value = 5;
      renderAll();
    });

    document.getElementById("addProductForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("newProdName").value.trim();
      var qty = Number(document.getElementById("newProdQty").value);
      var threshold = Number(document.getElementById("newProdThreshold").value) || 5;
      if (!name) return;
      state.products.push({ id: uid(), nameEn: name, nameEs: name, quantity: qty, threshold: threshold });
      saveState();
      e.target.reset();
      document.getElementById("newProdThreshold").value = 5;
      renderAll();
    });

    document.getElementById("addGroceryForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("newGroName").value.trim();
      var note = document.getElementById("newGroQty").value.trim();
      if (!name) return;
      state.groceryList.push({ id: uid(), name: name, note: note, checked: false, sourceId: null });
      saveState();
      e.target.reset();
      renderAll();
    });

    document.getElementById("generateGroceryBtn").addEventListener("click", generateGroceryListFromLowStock);
    document.getElementById("printGroceryBtn").addEventListener("click", function () {
      switchPage("grocery");
      window.print();
    });
    document.getElementById("clearCheckedBtn").addEventListener("click", function () {
      state.groceryList = state.groceryList.filter(function (g) { return !g.checked; });
      saveState();
      renderAll();
    });
    document.getElementById("clearAllGroceryBtn").addEventListener("click", function () {
      if (state.groceryList.length === 0) return;
      if (confirm(t("confirmClearAll"))) {
        state.groceryList = [];
        saveState();
        renderAll();
      }
    });

    renderAll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
