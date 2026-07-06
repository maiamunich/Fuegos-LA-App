/* Fuegos LA Inventory Manager
   Shared, multi-device app backed by Supabase (see supabase/schema.sql).
   Data is stored in the cloud so every phone/tablet sees the same live
   inventory; staff log in with a name + PIN so changes can be attributed
   in the History tab. */

(function () {
  "use strict";

  var LANG_KEY = "fuegosLA_lang";
  var STAFF_KEY = "fuegosLA_staff";

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
      navHistory: "History",
      dashTitle: "Overview",
      sumIngredients: "Ingredients Tracked",
      sumLowIngredients: "Ingredients Low",
      sumProducts: "Products Tracked",
      sumLowProducts: "Products Low",
      sumGrocery: "Items on Grocery List",
      dashReorderIngredients: "Ingredients to Reorder",
      dashRemakeProducts: "Products to Make More Of",
      dashAllGood: "All good — nothing low right now.",
      forecastTitle: "Coming Up Soon",
      forecastEmpty: "Not enough usage history yet to predict anything — keep using the app and predictions will appear here.",
      forecastDaysLeft: "day(s) left at current pace",
      forecastSuggestOrder: "Suggest ordering ~",
      forecastSuggestMake: "Suggest making ~",
      stockTitle: "Fridge & Freezer Stock",
      productsTitle: "Made Products",
      groceryTitle: "Grocery List",
      historyTitle: "History",
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
      footerNote: "Shared with your team — everyone sees the same live data.",
      low: "LOW",
      alertBelow: "Alert below",
      clickToEdit: "Click to edit",
      addToGrocery: "Add to grocery list",
      delete: "Delete",
      confirmDelete: "Delete this item?",
      confirmClearAll: "Clear the entire grocery list?",
      emptyStock: "No ingredients yet. Add one below.",
      emptyProducts: "No products yet. Add one below.",
      emptyGrocery: "Grocery list is empty.",
      historyEmpty: "No activity yet.",
      locationFridge: "Fridge",
      locationFreezer: "Freezer",
      locationPantry: "Pantry",
      unitLbs: "lbs", unitKg: "kg", unitOz: "oz", unitG: "g",
      unitL: "L", unitMl: "mL", unitGal: "gal", unitQt: "qt",
      unitUnits: "units", unitDozen: "dozen", unitBunches: "bunches",
      unitCans: "cans", unitBottles: "bottles",
      unitBags: "bags", unitSlices: "slices",
      loginTitle: "Staff Login",
      loginNameLabel: "Your Name",
      loginNamePlaceholder: "Your name",
      loginPinLabel: "Team Access Code",
      loginBtn: "Log In",
      loginError: "Incorrect access code.",
      logoutBtn: "Log Out",
      act_added_ingredient: "added ingredient",
      act_deleted_ingredient: "deleted ingredient",
      act_updated_quantity: "changed quantity of",
      act_updated_threshold: "changed alert threshold of",
      act_added_product: "added product",
      act_deleted_product: "deleted product",
      act_updated_product_quantity: "changed quantity of",
      act_updated_product_threshold: "changed alert threshold of",
      act_added_grocery_item: "added to grocery list",
      act_checked_grocery_item: "checked off",
      act_unchecked_grocery_item: "unchecked",
      act_deleted_grocery_item: "removed from grocery list",
      act_generated_grocery_list: "generated grocery list from low stock",
      act_cleared_grocery_checked: "cleared checked grocery items",
      act_cleared_grocery_all: "cleared entire grocery list"
    },
    es: {
      brandSub: "Gestor de Inventario",
      navDashboard: "Resumen",
      navStock: "Refrigerador y Congelador",
      navProducts: "Productos Hechos",
      navGrocery: "Lista de Compras",
      navHistory: "Historial",
      dashTitle: "Resumen General",
      sumIngredients: "Ingredientes Registrados",
      sumLowIngredients: "Ingredientes Bajos",
      sumProducts: "Productos Registrados",
      sumLowProducts: "Productos Bajos",
      sumGrocery: "Artículos en la Lista",
      dashReorderIngredients: "Ingredientes para Reordenar",
      dashRemakeProducts: "Productos para Volver a Hacer",
      dashAllGood: "Todo bien — nada bajo por ahora.",
      forecastTitle: "Próximamente",
      forecastEmpty: "Todavía no hay suficiente historial de uso para predecir nada — sigue usando la app y las predicciones aparecerán aquí.",
      forecastDaysLeft: "día(s) restantes al ritmo actual",
      forecastSuggestOrder: "Sugerencia: pedir ~",
      forecastSuggestMake: "Sugerencia: hacer ~",
      stockTitle: "Refrigerador y Congelador",
      productsTitle: "Productos Hechos",
      groceryTitle: "Lista de Compras",
      historyTitle: "Historial",
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
      footerNote: "Compartido con tu equipo — todos ven los mismos datos en vivo.",
      low: "BAJO",
      alertBelow: "Alertar si es menor a",
      clickToEdit: "Clic para editar",
      addToGrocery: "Agregar a la lista de compras",
      delete: "Eliminar",
      confirmDelete: "¿Eliminar este artículo?",
      confirmClearAll: "¿Vaciar toda la lista de compras?",
      emptyStock: "Todavía no hay ingredientes. Agrega uno abajo.",
      emptyProducts: "Todavía no hay productos. Agrega uno abajo.",
      emptyGrocery: "La lista de compras está vacía.",
      historyEmpty: "Todavía no hay actividad.",
      locationFridge: "Refrigerador",
      locationFreezer: "Congelador",
      locationPantry: "Despensa",
      unitLbs: "lbs", unitKg: "kg", unitOz: "oz", unitG: "g",
      unitL: "L", unitMl: "mL", unitGal: "gal", unitQt: "qt",
      unitUnits: "unidades", unitDozen: "docena", unitBunches: "manojos",
      unitCans: "latas", unitBottles: "botellas",
      unitBags: "bolsas", unitSlices: "rebanadas",
      loginTitle: "Inicio de Sesión",
      loginNameLabel: "Tu Nombre",
      loginNamePlaceholder: "Tu nombre",
      loginPinLabel: "Código de Acceso del Equipo",
      loginBtn: "Iniciar Sesión",
      loginError: "Código de acceso incorrecto.",
      logoutBtn: "Cerrar Sesión",
      act_added_ingredient: "agregó el ingrediente",
      act_deleted_ingredient: "eliminó el ingrediente",
      act_updated_quantity: "cambió la cantidad de",
      act_updated_threshold: "cambió el umbral de alerta de",
      act_added_product: "agregó el producto",
      act_deleted_product: "eliminó el producto",
      act_updated_product_quantity: "cambió la cantidad de",
      act_updated_product_threshold: "cambió el umbral de alerta de",
      act_added_grocery_item: "agregó a la lista de compras",
      act_checked_grocery_item: "marcó como comprado",
      act_unchecked_grocery_item: "desmarcó",
      act_deleted_grocery_item: "quitó de la lista de compras",
      act_generated_grocery_list: "generó la lista de compras a partir de lo que falta",
      act_cleared_grocery_checked: "quitó los artículos marcados",
      act_cleared_grocery_all: "vació toda la lista de compras"
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
    { value: "bottles", key: "unitBottles" },
    { value: "bags", key: "unitBags" },
    { value: "slices", key: "unitSlices" }
  ];

  var LOCATIONS = [
    { value: "fridge", key: "locationFridge" },
    { value: "freezer", key: "locationFreezer" },
    { value: "pantry", key: "locationPantry" }
  ];

  /* ---------------------------------------------------------------- */
  /* State                                                              */
  /* ---------------------------------------------------------------- */

  var supabaseClient = null;
  var currentStaff = sessionStorage.getItem(STAFF_KEY) || null;

  var state = {
    language: localStorage.getItem(LANG_KEY) || "en",
    ingredients: [],
    products: [],
    groceryList: [],
    activityLog: []
  };

  function isConfigured() {
    var c = window.SUPABASE_CONFIG;
    return !!(c && c.url && c.anonKey &&
      c.url.indexOf("YOUR_SUPABASE_URL") === -1 &&
      c.anonKey.indexOf("YOUR_SUPABASE_ANON_KEY") === -1);
  }

  function t(key) {
    return (I18N[state.language] && I18N[state.language][key]) || I18N.en[key] || key;
  }

  function itemName(item) {
    if (state.language === "es" && item.nameEs) return item.nameEs;
    if (item.nameEn) return item.nameEn;
    return item.name || "";
  }

  function unitKey(unitValue) {
    var found = UNITS.filter(function (u) { return u.value === unitValue; })[0];
    return found ? found.key : "unitUnits";
  }

  function roundQty(n) {
    return Math.round(n * 100) / 100;
  }

  function isLow(item) {
    return Number(item.quantity) < Number(item.threshold);
  }

  /* ---------------------------------------------------------------- */
  /* Supabase data access                                               */
  /* ---------------------------------------------------------------- */

  function mapIngredientRow(r) {
    return { id: r.id, nameEn: r.name_en, nameEs: r.name_es, quantity: r.quantity, unit: r.unit, location: r.location, threshold: r.threshold };
  }
  function mapProductRow(r) {
    return { id: r.id, nameEn: r.name_en, nameEs: r.name_es, quantity: r.quantity, threshold: r.threshold };
  }
  function mapGroceryRow(r) {
    return { id: r.id, name: r.name, note: r.note, checked: r.checked, sourceId: r.source_id };
  }

  async function loadAllData() {
    var results = await Promise.all([
      supabaseClient.from("ingredients").select("*").order("name_en"),
      supabaseClient.from("products").select("*").order("name_en"),
      supabaseClient.from("grocery_list").select("*").order("created_at"),
      supabaseClient.from("activity_log").select("*").order("created_at", { ascending: false }).limit(200)
    ]);
    state.ingredients = (results[0].data || []).map(mapIngredientRow);
    state.products = (results[1].data || []).map(mapProductRow);
    state.groceryList = (results[2].data || []).map(mapGroceryRow);
    state.activityLog = results[3].data || [];
    renderAll();
  }

  async function logActivity(action, entityName, detail) {
    await supabaseClient.from("activity_log").insert({
      staff_name: currentStaff,
      action: action,
      entity_name: entityName || "",
      detail: detail || ""
    });
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
    var staffLabel = document.getElementById("currentStaffLabel");
    if (staffLabel) staffLabel.textContent = currentStaff || "";
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

    renderForecasts();
  }

  /* ---------------------------------------------------------------- */
  /* Usage forecasting: estimates reorder timing from history          */
  /* ---------------------------------------------------------------- */

  var FORECAST_HORIZON_DAYS = 7;

  function parseChangeDetail(detail) {
    var m = /^([\d.]+)\s*→\s*([\d.]+)/.exec(detail || "");
    if (!m) return null;
    return { oldQty: parseFloat(m[1]), newQty: parseFloat(m[2]) };
  }

  function computeUsageForecast(item, actionName, unitLabel, isProduct) {
    if (isLow(item)) return null;
    var name = itemName(item);
    var decreases = [];
    state.activityLog.forEach(function (entry) {
      if (entry.action !== actionName || entry.entity_name !== name) return;
      var parsed = parseChangeDetail(entry.detail);
      if (!parsed || !(parsed.oldQty > parsed.newQty)) return;
      decreases.push({ time: new Date(entry.created_at).getTime(), amount: parsed.oldQty - parsed.newQty });
    });
    if (decreases.length < 2) return null;
    decreases.sort(function (a, b) { return a.time - b.time; });
    var totalConsumed = decreases.reduce(function (sum, d) { return sum + d.amount; }, 0);
    var spanDays = (decreases[decreases.length - 1].time - decreases[0].time) / 86400000;
    if (spanDays < 0.5) return null;
    var dailyRate = totalConsumed / spanDays;
    if (dailyRate <= 0) return null;
    var daysLeft = (Number(item.quantity) - Number(item.threshold)) / dailyRate;
    if (!isFinite(daysLeft) || daysLeft < 0 || daysLeft > FORECAST_HORIZON_DAYS) return null;
    return {
      name: name,
      daysLeft: daysLeft,
      suggestedQty: Math.ceil(dailyRate * FORECAST_HORIZON_DAYS),
      unitLabel: unitLabel || "",
      isProduct: !!isProduct
    };
  }

  function computeForecasts() {
    var results = [];
    state.ingredients.forEach(function (item) {
      var f = computeUsageForecast(item, "updated_quantity", t(unitKey(item.unit)), false);
      if (f) results.push(f);
    });
    state.products.forEach(function (item) {
      var f = computeUsageForecast(item, "updated_product_quantity", "", true);
      if (f) results.push(f);
    });
    results.sort(function (a, b) { return a.daysLeft - b.daysLeft; });
    return results;
  }

  function renderForecasts() {
    var el = document.getElementById("forecastList");
    var forecasts = computeForecasts();
    el.innerHTML = "";
    if (forecasts.length === 0) {
      var empty = document.createElement("li");
      empty.className = "empty-msg";
      empty.textContent = t("forecastEmpty");
      el.appendChild(empty);
      return;
    }
    forecasts.forEach(function (f) {
      var li = document.createElement("li");
      var days = Math.round(f.daysLeft * 10) / 10;
      var text = f.name + " — ~" + days + " " + t("forecastDaysLeft") + ". ";
      text += (f.isProduct ? t("forecastSuggestMake") : t("forecastSuggestOrder")) + f.suggestedQty;
      if (f.unitLabel) text += " " + f.unitLabel;
      text += ".";
      li.textContent = text;
      el.appendChild(li);
    });
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

    var minusBtn = makeQtyBtn("−", function () { updateIngredientQty(item, -1); });
    var qtyVal = makeEditableQtyEl(
      item.quantity,
      function () { return item.quantity + " " + t(unitKey(item.unit)); },
      function (newQty) { setIngredientQty(item, newQty); }
    );
    var plusBtn = makeQtyBtn("+", function () { updateIngredientQty(item, 1); });

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
      updateIngredientThreshold(item, Number(thresholdInput.value) || 0);
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
    deleteBtn.addEventListener("click", function () { deleteIngredient(item); });
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

  function makeEditableQtyEl(currentValue, getDisplayText, onSave) {
    var span = document.createElement("span");
    span.className = "qty-value qty-editable";
    span.textContent = getDisplayText();
    span.title = t("clickToEdit");
    span.addEventListener("click", function () {
      var input = document.createElement("input");
      input.type = "number";
      input.className = "qty-edit-input";
      input.min = "0";
      input.step = "any";
      input.value = currentValue;
      var done = false;
      var commit = function () {
        if (done) return;
        done = true;
        var val = Number(input.value);
        if (input.value !== "" && !isNaN(val)) {
          onSave(Math.max(0, val));
        } else {
          renderAll();
        }
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          input.blur();
        } else if (e.key === "Escape") {
          done = true;
          renderAll();
        }
      });
      span.replaceWith(input);
      input.focus();
      input.select();
    });
    return span;
  }

  async function setIngredientQty(item, newQty) {
    newQty = roundQty(newQty);
    if (newQty === Number(item.quantity)) { renderAll(); return; }
    await supabaseClient.from("ingredients").update({ quantity: newQty }).eq("id", item.id);
    await logActivity("updated_quantity", itemName(item), item.quantity + " → " + newQty + " " + t(unitKey(item.unit)));
    await loadAllData();
  }

  async function updateIngredientQty(item, delta) {
    var newQty = Math.max(0, roundQty(Number(item.quantity) + delta));
    await supabaseClient.from("ingredients").update({ quantity: newQty }).eq("id", item.id);
    await logActivity("updated_quantity", itemName(item), item.quantity + " → " + newQty + " " + t(unitKey(item.unit)));
    await loadAllData();
  }

  async function updateIngredientThreshold(item, newThreshold) {
    await supabaseClient.from("ingredients").update({ threshold: newThreshold }).eq("id", item.id);
    await logActivity("updated_threshold", itemName(item), item.threshold + " → " + newThreshold);
    await loadAllData();
  }

  async function deleteIngredient(item) {
    if (!confirm(t("confirmDelete"))) return;
    await supabaseClient.from("ingredients").delete().eq("id", item.id);
    await logActivity("deleted_ingredient", itemName(item));
    await loadAllData();
  }

  async function addIngredient(name, qty, unit, location, threshold) {
    await supabaseClient.from("ingredients").insert({
      name_en: name, name_es: name, quantity: qty, unit: unit, location: location, threshold: threshold
    });
    await logActivity("added_ingredient", name, qty + " " + t(unitKey(unit)));
    await loadAllData();
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
    var minusBtn = makeQtyBtn("−", function () { updateProductQty(item, -1); });
    var qtyVal = makeEditableQtyEl(
      item.quantity,
      function () { return String(item.quantity); },
      function (newQty) { setProductQty(item, newQty); }
    );
    var plusBtn = makeQtyBtn("+", function () { updateProductQty(item, 1); });
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
        updateProductQty(item, n);
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
      updateProductThreshold(item, Number(thresholdInput.value) || 0);
    });
    thresholdWrap.appendChild(thresholdText);
    thresholdWrap.appendChild(thresholdInput);
    row.appendChild(thresholdWrap);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-icon";
    deleteBtn.type = "button";
    deleteBtn.title = t("delete");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", function () { deleteProduct(item); });
    row.appendChild(deleteBtn);

    return row;
  }

  async function updateProductQty(item, delta) {
    var newQty = Math.max(0, Math.round(Number(item.quantity) + delta));
    await supabaseClient.from("products").update({ quantity: newQty }).eq("id", item.id);
    await logActivity("updated_product_quantity", itemName(item), item.quantity + " → " + newQty);
    await loadAllData();
  }

  async function setProductQty(item, newQty) {
    newQty = Math.round(newQty);
    if (newQty === Number(item.quantity)) { renderAll(); return; }
    await supabaseClient.from("products").update({ quantity: newQty }).eq("id", item.id);
    await logActivity("updated_product_quantity", itemName(item), item.quantity + " → " + newQty);
    await loadAllData();
  }

  async function updateProductThreshold(item, newThreshold) {
    await supabaseClient.from("products").update({ threshold: newThreshold }).eq("id", item.id);
    await logActivity("updated_product_threshold", itemName(item), item.threshold + " → " + newThreshold);
    await loadAllData();
  }

  async function deleteProduct(item) {
    if (!confirm(t("confirmDelete"))) return;
    await supabaseClient.from("products").delete().eq("id", item.id);
    await logActivity("deleted_product", itemName(item));
    await loadAllData();
  }

  async function addProduct(name, qty, threshold) {
    await supabaseClient.from("products").insert({ name_en: name, name_es: name, quantity: qty, threshold: threshold });
    await logActivity("added_product", name, String(qty));
    await loadAllData();
  }

  /* ---------------------------------------------------------------- */
  /* Grocery list page                                                  */
  /* ---------------------------------------------------------------- */

  async function addToGroceryList(name, note, sourceId) {
    var exists = state.groceryList.some(function (g) { return g.name === name && !g.checked; });
    if (exists) return;
    await supabaseClient.from("grocery_list").insert({ name: name, note: note || "", checked: false, source_id: sourceId || null });
    await logActivity("added_grocery_item", name, note || "");
    await loadAllData();
  }

  async function generateGroceryListFromLowStock() {
    var lowIngredients = state.ingredients.filter(isLow);
    for (var i = 0; i < lowIngredients.length; i++) {
      var item = lowIngredients[i];
      var needed = roundQty(Number(item.threshold) - Number(item.quantity));
      var note = needed > 0 ? ("+" + needed + " " + t(unitKey(item.unit))) : "";
      var already = state.groceryList.filter(function (g) { return g.sourceId === item.id && !g.checked; })[0];
      if (already) {
        await supabaseClient.from("grocery_list").update({ note: note }).eq("id", already.id);
      } else {
        await supabaseClient.from("grocery_list").insert({ name: itemName(item), note: note, checked: false, source_id: item.id });
      }
    }
    await logActivity("generated_grocery_list", "", lowIngredients.length + " items");
    await loadAllData();
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
        toggleGroceryChecked(g, checkbox.checked);
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
      deleteBtn.addEventListener("click", function () { deleteGroceryItem(g); });
      row.appendChild(deleteBtn);

      container.appendChild(row);
    });
  }

  async function toggleGroceryChecked(g, checked) {
    await supabaseClient.from("grocery_list").update({ checked: checked }).eq("id", g.id);
    await logActivity(checked ? "checked_grocery_item" : "unchecked_grocery_item", g.name);
    await loadAllData();
  }

  async function deleteGroceryItem(g) {
    await supabaseClient.from("grocery_list").delete().eq("id", g.id);
    await logActivity("deleted_grocery_item", g.name);
    await loadAllData();
  }

  async function clearCheckedGrocery() {
    var ids = state.groceryList.filter(function (g) { return g.checked; }).map(function (g) { return g.id; });
    if (ids.length === 0) return;
    await supabaseClient.from("grocery_list").delete().in("id", ids);
    await logActivity("cleared_grocery_checked", "", ids.length + " items");
    await loadAllData();
  }

  async function clearAllGrocery() {
    var ids = state.groceryList.map(function (g) { return g.id; });
    if (ids.length === 0) return;
    if (!confirm(t("confirmClearAll"))) return;
    await supabaseClient.from("grocery_list").delete().in("id", ids);
    await logActivity("cleared_grocery_all", "", ids.length + " items");
    await loadAllData();
  }

  /* ---------------------------------------------------------------- */
  /* History page                                                       */
  /* ---------------------------------------------------------------- */

  function renderHistory() {
    var search = (document.getElementById("historySearch").value || "").toLowerCase();
    var container = document.getElementById("historyList");
    container.innerHTML = "";

    var items = state.activityLog.filter(function (entry) {
      if (!search) return true;
      var hay = (entry.staff_name + " " + entry.action + " " + entry.entity_name + " " + entry.detail).toLowerCase();
      return hay.indexOf(search) !== -1;
    });

    if (items.length === 0) {
      container.innerHTML = '<div class="empty-state">' + t("historyEmpty") + "</div>";
      return;
    }

    items.forEach(function (entry) {
      var row = document.createElement("div");
      row.className = "item-row history-row";

      var timeEl = document.createElement("div");
      timeEl.className = "history-time";
      timeEl.textContent = new Date(entry.created_at).toLocaleString();
      row.appendChild(timeEl);

      var textEl = document.createElement("div");
      textEl.className = "history-text";
      var staffSpan = document.createElement("span");
      staffSpan.className = "history-staff";
      staffSpan.textContent = entry.staff_name;
      textEl.appendChild(staffSpan);
      var rest = " " + t("act_" + entry.action);
      if (entry.entity_name) rest += ' "' + entry.entity_name + '"';
      if (entry.detail) rest += " (" + entry.detail + ")";
      textEl.appendChild(document.createTextNode(rest));
      row.appendChild(textEl);

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
    renderHistory();
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
  /* Login / session                                                    */
  /* ---------------------------------------------------------------- */

  function showApp() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appHeader").style.display = "";
    document.getElementById("app").style.display = "";
    document.getElementById("appFooter").style.display = "";
    loadAllData();
    subscribeRealtime();
  }

  function subscribeRealtime() {
    supabaseClient.channel("inventory-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "ingredients" }, loadAllData)
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, loadAllData)
      .on("postgres_changes", { event: "*", schema: "public", table: "grocery_list" }, loadAllData)
      .on("postgres_changes", { event: "*", schema: "public", table: "activity_log" }, loadAllData)
      .subscribe();
  }

  /* ---------------------------------------------------------------- */
  /* Event wiring                                                       */
  /* ---------------------------------------------------------------- */

  function wireEvents() {
    document.getElementById("tabs").addEventListener("click", function (e) {
      var btn = e.target.closest(".tab-btn");
      if (btn) switchPage(btn.getAttribute("data-page"));
    });

    document.getElementById("langToggle").addEventListener("click", function () {
      state.language = state.language === "en" ? "es" : "en";
      localStorage.setItem(LANG_KEY, state.language);
      renderAll();
    });

    document.getElementById("logoutBtn").addEventListener("click", function () {
      sessionStorage.removeItem(STAFF_KEY);
      location.reload();
    });

    document.getElementById("stockSearch").addEventListener("input", renderStock);
    document.getElementById("stockLowOnly").addEventListener("change", renderStock);
    document.getElementById("productSearch").addEventListener("input", renderProducts);
    document.getElementById("productLowOnly").addEventListener("change", renderProducts);
    document.getElementById("historySearch").addEventListener("input", renderHistory);

    document.getElementById("addIngredientForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("newIngName").value.trim();
      var qty = Number(document.getElementById("newIngQty").value);
      var unit = document.getElementById("newIngUnit").value;
      var location = document.getElementById("newIngLocation").value;
      var threshold = Number(document.getElementById("newIngThreshold").value) || 5;
      if (!name) return;
      addIngredient(name, qty, unit, location, threshold);
      e.target.reset();
      document.getElementById("newIngThreshold").value = 5;
    });

    document.getElementById("addProductForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("newProdName").value.trim();
      var qty = Number(document.getElementById("newProdQty").value);
      var threshold = Number(document.getElementById("newProdThreshold").value) || 5;
      if (!name) return;
      addProduct(name, qty, threshold);
      e.target.reset();
      document.getElementById("newProdThreshold").value = 5;
    });

    document.getElementById("addGroceryForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("newGroName").value.trim();
      var note = document.getElementById("newGroQty").value.trim();
      if (!name) return;
      addToGroceryList(name, note, null);
      e.target.reset();
    });

    document.getElementById("generateGroceryBtn").addEventListener("click", generateGroceryListFromLowStock);
    document.getElementById("printGroceryBtn").addEventListener("click", function () {
      switchPage("grocery");
      window.print();
    });
    document.getElementById("clearCheckedBtn").addEventListener("click", clearCheckedGrocery);
    document.getElementById("clearAllGroceryBtn").addEventListener("click", clearAllGrocery);

    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var code = document.getElementById("loginPin").value;
      if (code === window.TEAM_ACCESS_CODE) {
        currentStaff = "Staff";
        sessionStorage.setItem(STAFF_KEY, currentStaff);
        document.getElementById("loginError").style.display = "none";
        applyStaticTranslations();
        showApp();
      } else {
        document.getElementById("loginError").style.display = "block";
      }
    });
  }

  /* ---------------------------------------------------------------- */
  /* Init                                                               */
  /* ---------------------------------------------------------------- */

  function init() {
    if (!isConfigured()) {
      document.getElementById("setupScreen").style.display = "flex";
      return;
    }

    supabaseClient = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
    wireEvents();
    applyStaticTranslations();

    if (currentStaff) {
      showApp();
    } else {
      document.getElementById("loginScreen").style.display = "flex";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
