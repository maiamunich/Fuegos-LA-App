# Fuegos LA — Inventory Manager

A phone/tablet-friendly web app to help Fuegos LA track fridge & freezer
stock and finished (made) products, in English and Spanish. Data is shared
live across every device — everyone's phone/tablet sees the same inventory,
and every change is attributed to the staff member who made it.

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
- **Staff login**: each person types their own name plus one shared team
  access code. Everyone sees the same live data — an update on one phone
  shows up on everyone else's screen automatically.
- **History**: every add, delete, quantity change, and grocery-list action
  is logged with who did it and when, viewable/searchable on the History tab.
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

## One-time setup (you need to do this before the app works)

The app is a static site (`index.html`, `css/styles.css`, `js/app.js`), but
it needs a free [Supabase](https://supabase.com) project as its shared
database. This takes about 10 minutes and doesn't require a credit card.

1. **Create a Supabase project**: sign up at supabase.com, click "New
   Project," pick any name/region/password (you won't need that password
   day-to-day).
2. **Run the schema**: in your new project, go to the SQL Editor, paste in
   the entire contents of `supabase/schema.sql` from this repo, and run it.
   This creates all the tables, security rules, and starter ingredient/product
   data.
3. **Get your API keys**: go to Project Settings → API. Copy the "Project
   URL" and the "anon public" key.
4. **Fill in `js/supabase-config.js`**: open that file in this repo and
   replace the `url` and `anonKey` placeholder strings with the values from
   step 3. While you're there, set `window.TEAM_ACCESS_CODE` to whatever
   shared code your staff will use to log in (e.g. the date Fuegos LA opened).
5. **Host it and share the link** (see below).

## How to host it and share with coworkers

Once `js/supabase-config.js` is filled in, this is a static site — any free
static host works:

- **GitHub Pages** (simplest): repo Settings → Pages → deploy from this
  branch/`main`, root folder. You'll get a URL like
  `https://yourname.github.io/Fuegos-LA-App/` — send that link to your
  coworkers and they can bookmark it on their phones. Everyone who opens it
  types their own name plus the shared team access code and sees the same
  live inventory.
- Netlify, Vercel, or any static file host works the same way.

**Important**: open `index.html` over `http(s)://` (via one of the hosts
above, or a local dev server) rather than double-clicking the file to open
it as a `file://` URL. Browsers and browser extensions (ad blockers, privacy
tools) sometimes silently block API requests from `file://` pages, which
can make the app look broken even though the code and database are fine.

## A note on security

The team access code is meant for day-to-day accountability among a trusted
team (so you know who changed what) and to keep casual/accidental edits out,
not bank-level security — it's checked in the browser, not the database. The
app's database key is, by design, visible in the browser too (this is normal
for this style of app; access is controlled by the database rules in
`supabase/schema.sql`, not by hiding the key). A technically determined
person who obtained the link could theoretically query the database
directly and skip the login screen entirely. For tracking restaurant stock
counts (not sensitive personal or payment data), that's a reasonable
trade-off — just don't post the link somewhere fully public, and treat it
like you would any internal team tool.

## Other ideas worth considering later

- Individual staff PINs (rather than one shared code) if you want tighter
  per-person accountability later on.
- Low-stock email/text alerts instead of only in-app red highlighting.
- Barcode scanning for faster stock counts.
- Recipe-based auto-deduction: e.g. selling one beef empanada
  automatically subtracts the right amount of beef, dough, etc. from
  stock (requires defining a recipe/ingredient list per product).
- Sales history / trends to help decide how much to prep each day.
