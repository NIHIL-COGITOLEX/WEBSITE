/* =====================================================
   FORMS
===================================================== */

import {
  SUPABASE_URL,
  SUPABASE_KEY
} from "./config.js";

export function initForms() {

  bindForm(
    "jobForm",
    "jobSuccessMessage",
    "job_applications",
    f => ({
      full_name: f.fullName.value,
      phone: f.phone.value,
      email: f.email.value,
      position: f.position.value
    })
  );

  bindForm(
    "grievanceForm",
    "grievanceSuccessMessage",
    "grievances",
    f => ({
      full_name: f.fullName.value,
      phone: f.phone.value,
      email: f.email.value,
      message: f.message.value
    })
  );

  bindForm(
    "loanForm",
    "loanSuccessMessage",
    "loan_applications",
    f => ({
      full_name: f.fullName.value,
      phone: f.phone.value,
      email: f.email.value,
      loan_amount: f.loanAmount.value,
      loan_tenure: f.loanTenure.value,
      city: f.city.value,
      pincode: f.pincode.value
    })
  );
}

function bindForm(formId, successId, table, mapper) {
  const form = document.getElementById(formId);
  const success = document.getElementById(successId);
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();

    await fetch(
      `${SUPABASE_URL}/rest/v1/${table}`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mapper(form))
      }
    );

    form.reset();
    success.style.display = "block";
  });
}
