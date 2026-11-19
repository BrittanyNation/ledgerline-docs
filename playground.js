// LedgerLine Docs — playground logic, commented as study code.
// Patterns: validated form -> simulated API response (derived, never faked as real),
// generated references, and a request history persisted in localStorage.
const KEY="ll_history";
function loadHistory(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}}
function saveHistory(h){localStorage.setItem(KEY,JSON.stringify(h))}
function makeRef(){return "LL-"+Math.floor(100000+Math.random()*900000)}
const ENDPOINTS={claims:{method:"POST",path:"/v1/claims",status:"Accepted"},eligibility:{method:"GET",path:"/v1/eligibility",status:"Active"},status:{method:"GET",path:"/v1/claims/status",status:"In Review"},appeal:{method:"POST",path:"/v1/appeals",status:"Appeal Received"}};
function validate(v){const errs={};
 if(!/^P-\d{4}$/.test(v.patient))errs.patient="Enter a patient reference like P-8841.";
 if(!v.member||v.member.trim().length<4)errs.member="Enter a member ID of at least 4 characters.";
 if(!v.dos)errs.dos="Choose a date of service.";else{const d=new Date(v.dos+"T12:00:00");const today=new Date();today.setHours(12,0,0,0);if(d>today)errs.dos="Date of service cannot be in the future.";}
 if((v.endpoint==="claims"||v.endpoint==="appeal")&&(!(v.amount>0)))errs.amount="Enter a billed amount above zero for this endpoint.";
 if(v.endpoint==="appeal"&&(!v.note||v.note.trim().length<10))errs.note="An appeal needs a note of at least 10 characters.";
 return errs;}
function renderHistory(){const h=loadHistory();const list=document.getElementById("historyList");
 document.getElementById("historyEmpty").style.display=h.length?"none":"block";
 list.innerHTML=h.map(r=>`<div class="history-item"><strong>${r.ref}</strong> · ${r.method} ${r.path} · ${r.status}<br><span class="meta">${r.when} · Patient ${r.patient} · DOS ${r.dos}</span></div>`).join("");}
document.getElementById("playForm").addEventListener("submit",e=>{e.preventDefault();
 const v={endpoint:document.getElementById("endpoint").value,patient:document.getElementById("patientRef").value.trim(),member:document.getElementById("memberId").value.trim(),dos:document.getElementById("dos").value,amount:parseFloat(document.getElementById("amount").value),note:document.getElementById("note").value};
 const errs=validate(v);
 document.getElementById("errPatient").textContent=errs.patient||"";document.getElementById("errMember").textContent=errs.member||"";
 document.getElementById("errDos").textContent=errs.dos||"";document.getElementById("errAmount").textContent=errs.amount||"";document.getElementById("errNote").textContent=errs.note||"";
 if(Object.keys(errs).length)return;
 const ep=ENDPOINTS[v.endpoint];const ref=makeRef();
 const resp={reference:ref,endpoint:ep.method+" "+ep.path,status:ep.status,patient_ref:v.patient,date_of_service:v.dos};
 if(v.endpoint==="claims"){resp.billed_amount=v.amount.toFixed(2);resp.next_step="Check status the next business day.";}
 if(v.endpoint==="eligibility"){resp.coverage="Active for the date of service";resp.deductible_met=false;resp.auth_required=false;}
 if(v.endpoint==="status"){resp.days_in_review=6;resp.next_step="No action needed before day 14.";}
 if(v.endpoint==="appeal"){resp.billed_amount=v.amount.toFixed(2);resp.deadline_days=30;resp.next_step="Save this reference and watch for the reviewer decision.";}
 document.getElementById("respEmpty").classList.add("hidden");const box=document.getElementById("respBox");box.classList.remove("hidden");box.textContent=JSON.stringify(resp,null,2);
 document.getElementById("copyRespBtn").classList.remove("hidden");document.getElementById("copyRespNote").textContent="";
 const cb=document.getElementById("confirmBox");cb.classList.remove("hidden");cb.innerHTML=`<strong>Simulated request accepted.</strong> Your reference is <strong>${ref}</strong>. This was simulated in your browser; nothing was sent to a real payer.`;
 const h=loadHistory();h.unshift({ref,method:ep.method,path:ep.path,status:ep.status,patient:v.patient,dos:v.dos,when:new Date().toLocaleString()});saveHistory(h.slice(0,10));renderHistory();});
document.getElementById("copyRespBtn").addEventListener("click",()=>{const t=document.getElementById("respBox").textContent;if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).catch(()=>{});}document.getElementById("copyRespNote").textContent="Response copied.";});
document.getElementById("clearHistoryBtn").addEventListener("click",()=>{localStorage.removeItem(KEY);renderHistory();});
renderHistory();
