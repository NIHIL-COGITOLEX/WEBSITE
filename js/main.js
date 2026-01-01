/* =====================================================
   BOOTSTRAP
===================================================== */

import { initCore } from "./core.js";
import { initEvents } from "./events.js";
import { initForms } from "./forms.js";

document.addEventListener("DOMContentLoaded", () => {
  initCore();
  initEvents();
  initForms();
});
