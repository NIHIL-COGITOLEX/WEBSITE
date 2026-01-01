/* =====================================================
   ALFA TZA LLP — CONFIG
===================================================== */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* ---------------- SUPABASE ---------------- */
export const SUPABASE_URL =
  "https://ttnlhduxxztpkthodctn.supabase.co";

export const SUPABASE_KEY =
  "sb_publishable_nn0MYL0NpoTuA706h88L7g_BlEU1SDE";

export const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

/* ---------------- ROUTES ---------------- */
export const ROUTES = {
  index: "/home",
  about: "/about",
  careers: "/careers",
  events: "/events",
  "contact & grievance": "/contact",
  "apply loan": "/loan",
  "apply job": "/job",
  "work & testimonials": "/testimonials",
  "lenders & policies": "/policies"
};
