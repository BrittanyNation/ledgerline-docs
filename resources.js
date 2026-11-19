// LedgerLine Docs — resources page logic, commented as study code.
// Patterns: data-driven accordions (one open at a time), derived glossary search,
// and two validated forms with generated references and duplicate-aware signup.
const CHANGELOG=[
 {v:"Version 2.4 — November 2026",items:["New guide: Write an appeal letter that a reviewer can approve.","Eligibility checks now show the deductible reset date.","Playground added for the appeals endpoint."]},
 {v:"Version 2.3 — October 2026",items:["Denial reason table expanded from 12 to 30 codes.","Payment posting guide rewritten with a batch balance check.","Status words renamed: Approved is now Accepted, to match payer wording."]},
 {v:"Version 2.2 — September 2026",items:["New guide: Check eligibility before the visit.","Alerts for appeal deadlines at 14 days and 3 days.","Glossary launched with the eight most searched terms."]}];
const GLOSSARY=[
 {t:"Allowed amount",d:"The contract rate a payer agrees a service is worth, before the split between payer paid and patient responsibility."},
 {t:"Clean claim",d:"A claim with no errors that a payer can judge on the first submission, with nothing missing or mismatched."},
 {t:"Denial",d:"A payer decision not to pay a claim as billed. A denial can often be corrected or appealed before its deadline."},
 {t:"Rejection",d:"A claim stopped before the payer judges it, usually for a data problem like a wrong date of birth. Fix and resubmit."},
 {t:"Remittance advice",d:"The payer statement that explains, line by line, what was paid, adjusted, or denied on a batch of claims."},
 {t:"Appeal deadline",d:"The last date a payer will accept an appeal for a denied claim. It does not move, so guides treat it as fixed."},
 {t:"Eligibility check",d:"A lookup, before or at a visit, that confirms active coverage, deductible status, and authorization needs."},
 {t:"Patient responsibility",d:"The part of the allowed amount the patient owes, such as a deductible or coinsurance share."}];
const FAQS=[
 {q:"Is LedgerLine a real company?",a:"No. LedgerLine is a fictional platform created for this documentation portfolio. Every guide, example, and response on this site is sample work."},
 {q:"Does the playground send real claims?",a:"No. The playground simulates responses in your browser. Nothing is transmitted, and no real information should be entered."},
 {q:"Why do guides show their steps in the same order every time?",a:"Because billing work is sequential in real life too. A consistent shape lets a reader skim to the step they are stuck on."},
 {q:"What happens to my feedback?",a:"On this demo it is stored only in your browser and earns a reference number so the flow can be tested end to end."},
 {q:"Can I reuse the appeal letter structure?",a:"Yes. The structure is general documentation practice: claim facts first, the payer reason in their words, the record page that answers it, and a specific ask."},
 {q:"How often is the changelog updated?",a:"With every release. If a guide changes and the changelog does not, that is treated as a documentation bug."}];
function accordion(el,head,body){const w=document.createElement("div");w.className="accordion";w.innerHTML=`<button class="head" type="button">${head}</button><div class="panel">${body}</div>`;w.querySelector(".head").addEventListener("click",()=>{const was=w.classList.contains("open");el.querySelectorAll(".accordion").forEach(a=>a.classList.remove("open"));if(!was)w.classList.add("open");});el.appendChild(w);}
const cl=document.getElementById("changelog");CHANGELOG.forEach(c=>accordion(cl,c.v,"<ul>"+c.items.map(i=>`<li>${i}</li>`).join("")+"</ul>"));
const fq=document.getElementById("faqList");FAQS.forEach(f=>accordion(fq,f.q,`<p>${f.a}</p>`));
function renderGloss(q){const list=GLOSSARY.filter(g=>(g.t+" "+g.d).toLowerCase().includes((q||"").toLowerCase()));
 document.getElementById("glossBody").innerHTML=list.map(g=>`<tr><td><strong>${g.t}</strong></td><td>${g.d}</td></tr>`).join("");
 document.getElementById("glossCount").textContent=list.length+" of "+GLOSSARY.length+" terms";
 document.getElementById("glossEmpty").classList.toggle("hidden",list.length>0);}
document.getElementById("glossSearch").addEventListener("input",e=>renderGloss(e.target.value));renderGloss("");
function ref(p){return p+Math.floor(10000+Math.random()*90000)}
document.getElementById("feedbackForm").addEventListener("submit",e=>{e.preventDefault();
 const name=document.getElementById("fbName").value.trim(),email=document.getElementById("fbEmail").value.trim(),topic=document.getElementById("fbTopic").value,msg=document.getElementById("fbMsg").value.trim();
 document.getElementById("errFbName").textContent=name?"":"Enter your name.";
 document.getElementById("errFbEmail").textContent=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?"":"Enter a valid email address.";
 document.getElementById("errFbTopic").textContent=topic?"":"Choose a guide topic.";
 document.getElementById("errFbMsg").textContent=msg.length>=20?"":"Tell us in at least 20 characters what you were trying to do.";
 if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!topic||msg.length<20)return;
 const r=ref("LL-F-");const saved=JSON.parse(localStorage.getItem("ll_feedback")||"[]");saved.push({ref:r,name,email,topic,msg,when:new Date().toISOString()});localStorage.setItem("ll_feedback",JSON.stringify(saved));
 const c=document.getElementById("fbConfirm");c.classList.remove("hidden");c.innerHTML=`<strong>Feedback saved.</strong> Your reference is <strong>${r}</strong>. On this demo it lives only in your browser.`;e.target.reset();});
document.getElementById("letterForm").addEventListener("submit",e=>{e.preventDefault();
 const email=document.getElementById("letterEmail").value.trim();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){document.getElementById("errLetter").textContent="Enter a valid email address.";return;}
 document.getElementById("errLetter").textContent="";const saved=JSON.parse(localStorage.getItem("ll_letter")||"[]");
 const c=document.getElementById("letterConfirm");c.classList.remove("hidden");
 if(saved.includes(email.toLowerCase())){c.innerHTML="<strong>You are already on the list.</strong> That email was signed up before on this device.";return;}
 saved.push(email.toLowerCase());localStorage.setItem("ll_letter",JSON.stringify(saved));
 c.innerHTML=`<strong>You are on the list.</strong> The next LedgerLine Letter goes to ${email}.`;e.target.reset();});
