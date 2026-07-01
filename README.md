# Fuegos LA — Inventory Manager

A simple, phone/tablet-friendly web app to help Fuegos LA track fridge & freezer
stock and finished (made) products, in English and Spanish.

No install, no server, no account needed — it's a static site that runs
entirely in the browser and saves data on the device it's used on.

## Features

- **Dashboard**: at-a-glance counts and lists of what's running low.
- **Fridge & Freezer Stock**: track raw ingredients by quantity, unit
  (lbs, kg, oz, units, etc.) and location (fridge / freezer / pantry).
  Add or delete ingredients freely. Each ingredient turns **red** and gets
  a "LOW" badge when its quantity drops below its alert threshold
  (defaults to 5, editable per item).
- **Made Products**: track finished items (e.g. Chicken Empanadas,
  Chimichurri). Use **−1** every time one is sold/used, or add a batch
  count (**+N**) after a cooking run. Also turns red below the threshold
  (default 5) so staff know it's time to make more.
- **Grocery List**: click "Generate list from low stock" to auto-build a
  shopping list from everything currently below its alert level (with the
  suggested amount to buy), or add items manually. Check items off as
  they're ordered, then "Print / Share" to hand to a supplier, or clear
  the list when done.
- **Search & filter** on the Stock and Products pages ("show low stock
  only") to quickly find things in a long list.
- **Full English / Spanish switch** — the "ES" / "EN" button in the header
  swaps every label, button, and preset item name at once (not a mix of
  both languages).

The app comes pre-loaded with Fuegos LA's actual empanada lineup and
likely ingredients (beef, chicken, spinach & mushroom, cheese & onion,
ham & cheese, caprese, vegan beef, humita corn, chimichurri, etc.) as a
starting point — edit quantities, thresholds, and units to match reality,
and add/remove anything.

## How to use it

Just open `index.html` in a browser — on a phone, tablet, or computer.

To host it online so staff can bookmark a link (recommended over emailing
the file around):

- **GitHub Pages**: Settings → Pages → deploy from this branch/`main`, root
  folder. Free and takes a couple of minutes.
- Any static host works too (Netlify, Vercel, a plain file server) since
  there's no backend — just `index.html`, `css/styles.css`, and `js/app.js`.

## Important limitation: data is per-device

This app stores data in the browser's local storage on whatever device
opens it. That means:

- If it's opened on the kitchen tablet, updates made there won't show up
  on someone's phone unless they're using the *same browser on the same
  device*.
- Clearing browser data/history will erase the inventory.

This is fine for a single shared kitchen tablet (the most common setup for
this kind of tool), but **if multiple staff need to update stock from
different phones/devices and see each other's changes in real time**, the
app would need a small cloud database backend (e.g., Firebase or Supabase)
instead of local storage. That's a natural next step if this MVP proves
useful — let me know if you want it added.

## Other ideas worth considering later

- Login / staff accounts and a change log (who updated what, and when).
- Low-stock email/text alerts instead of only in-app red highlighting.
- Barcode scanning for faster stock counts.
- Recipe-based auto-deduction: e.g. selling one beef empanada
  automatically subtracts the right amount of beef, dough, etc. from
  stock (requires defining a recipe/ingredient list per product).
- Sales history / trends to help decide how much to prep each day.
