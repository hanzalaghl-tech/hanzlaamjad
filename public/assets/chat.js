/* Portfolio assistant: verified answers, a guided brief and an explicit email handoff. */
const choices=['GoHighLevel CRM','Automations & integrations','AI booking','Funnels & websites','Not sure yet'];
export const REPLY_DELAY_MS=3000;
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean=text=>String(text||'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').trim().slice(0,2000);

export function answerQuestion(input){
 const q=clean(input).toLowerCase().replace(/[’']/g,'');
 if(/who are you|your name|are you (?:a |an )?(?:bot|ai|human)|real person/.test(q))return 'I’m Hanzla’s automated portfolio assistant. I can explain his work and collect your project details; Hanzla follows up personally.';
 if(/how are you|how r u|kaise ho|kasy ho/.test(q))return 'I’m here and ready to help with your project.';
 if(/country code|phone format|number format/.test(q))return 'Use your own country code followed by your phone number, for example +44 7532 677615. A number with 7–15 digits is accepted.';
 if(/privacy|my data|my information|details stored|store my details/.test(q))return 'Your details and this conversation are emailed through Web3Forms only after you choose Send my brief. Unsent chat details stay in this page’s memory and clear when you reload or start a new chat. Chat contents are not added to analytics.';
 if(/^(hi|hello|hey|salam|assalam[ -]?o[ -]?alaikum|aoa)[!.\s]*$/.test(q))return 'Hi! I can explain Hanzla’s services and projects, or help you send him a project brief. What would you like to know?';
 if(/\b(price|pricing|cost|costs|budget|rate|rates|quote|charges|fee|how much|hourly|monthly|per hour|kitn[aeiy]|paisa|qeemat)\b/.test(q)){
  const note=' All rates are in USD. Project prices are starting rates; the final quote follows a free 20-minute call.';
  if(/\b(ai|agent|chatbot|voice|retell|gpt)\b/.test(q))return 'AI Builds starts at $1,500, including voice/chat agent setup, knowledge-base training, model integration, deployment and 30 days of support.'+note;
  if(/\b(api|webhook|webhooks|integration|integrations)\b/.test(q))return 'API & Webhooks starts at $750, with custom endpoints, platform integrations, secure credential setup and documentation.'+note;
  if(/\bflexible\b/.test(q))return 'Flexible is $25/hour, up to 30 hours per week, for ongoing technical work in Hanzla’s time zone.'+note;
  if(/\b(dedicated|full.?time)\b/.test(q))return 'Dedicated is $20/hour for a 40-hour week, embedded with your team for long-term GHL and AI automation work.'+note;
  return 'AI Builds: from $1,500. API & Webhooks: from $750. Hourly plans: Flexible $25/hour (up to 30 hours/week), and Dedicated $20/hour (40 hours/week).'+note;
 }
 if(/\b(how long|timeline|turnaround|deadline|delivery time|kitna time|kab tak|duration)\b/.test(q))return 'The timeline depends on the project scope and access to the tools involved. Hanzla will confirm an estimate after reviewing your brief; I can’t promise a delivery date on his behalf.';
 if(/\b(upwork|reviews?|testimonials?|feedback)\b/.test(q))return 'You can explore Hanzla’s work history and client feedback on his Upwork profile. Two shared 5-star feedback excerpts from Jawad Ali S. and Saad A. are in the Reviews section. You can read more on the linked Upwork profile.';
 if(/\b(ghost|newsletter|custom values|publish|publishing)\b/.test(q))return 'One featured project connects Ghost → Make → GoHighLevel. When a post is published, Make processes its content, updates GHL Custom Values and triggers an email workflow for the contacts with the selected tag. You can follow the screenshots in Selected work.';
 if(/\b(onboarding|google drive|slack|dossier|supabase)\b/.test(q))return 'Hanzla’s client onboarding project starts with a webhook, creates the client’s Google Drive folders and GHL setup, prepares Slack communication and passes the resulting details to the operations system. See the Client Onboarding Automation project for the sequence.';
 if(/\b(retell|voice|phone call|calling|outbound|ai call)\b/.test(q))return 'Hanzla builds voice AI calling and booking flows using Retell AI, Make and GoHighLevel. A featured project calls a new lead through Retell and sends the resulting appointment details back to GHL through HTTP.';
 if(/\b(a2p|10dlc|sms|messaging|registration|approved|approval)\b/.test(q))return 'Hanzla helps with A2P registration, email/SMS setup and follow-up workflows. There are real approval screenshots in the portfolio. Approval is decided by the provider and carriers, so it can’t be guaranteed.';
 if(/\b(ai|agent|agents|bot|chatbot|booking|appointments?|conversation)\b/.test(q))return 'Hanzla sets up conversational and voice AI for lead handling and appointment booking, connected to GoHighLevel workflows. His featured GHL project covers lead capture, AI conversation, booking and follow-up.';
 if(/\b(make|zapier|n8n|webhook|webhooks|integrat\w*|automat\w*|api|apis)\b/.test(q))return 'Hanzla connects GoHighLevel with Make, Zapier, n8n, APIs and webhooks. He builds lead capture, follow-up, content delivery and client onboarding workflows. Tell me which tools you need to connect.';
 if(/\b(funnel|funnels|website|websites|landing|forms?|surveys?)\b/.test(q))return 'Hanzla builds funnels, landing pages, forms, surveys and booking journeys, with the enquiry details connected to the CRM and the right follow-up workflow.';
 if(/\b(ghl|gohighlevel|highlevel|crm|snapshot|snapshots|saas|pipeline|pipelines|calendar|calendars)\b/.test(q))return 'Hanzla works on GoHighLevel account setup, pipelines, calendars, custom fields, snapshots and SaaS configuration. He also connects the CRM to automations and AI booking flows.';
 if(/\b(project|projects|examples?|portfolio|previous work|past work)\b/.test(q))return 'The portfolio includes four real builds: Ghost-to-GHL email automation, a GHL AI booking system, client onboarding across Drive/GHL/Slack, and Retell AI calling with appointments sent to GHL. Each has ordered screenshots—use View projects below.';
 if(/\b(experience|companies|clients|worked|background|cv|resume)\b/.test(q))return 'Hanzla has worked with Wingman, Auto Nurture, Top Lion Marketing, Auto Nurture Speedy.ai and Remote Clean Academy across GHL support, SaaS and onboarding roles. His CV is available through Download CV on this page.';
 if(/\b(where|based|country|location|timezone|time zone|pakistan|remote|language|urdu|english|kahan)\b/.test(q))return 'Hanzla is based in Mian Channu, Pakistan (UTC+5), works remotely, and speaks English and Urdu.';
 if(/\b(available|availability|start date|start work|available now)\b/.test(q))return 'The portfolio is open to new project enquiries. Hanzla will confirm his current availability and a start date after reviewing your requirements.';
 if(/\b(contact|email|whatsapp|human|person|directly|speak|call him)\b/.test(q))return 'You can email hanzala.ghl@gmail.com or use Business WhatsApp at +44 7532 677615. I’m an automated portfolio assistant; Hanzla replies personally to project enquiries.';
 if(/\b(services?|offer|what do you do|how can you help|kya.*(?:karte|krty|karty))\b/.test(q))return 'Hanzla helps with GoHighLevel CRM setup, automation and integrations, AI agents and booking, funnels and websites, and A2P/email/SMS setup. Which area are you interested in?';
 if(/\b(thank you|thanks|shukriya)\b/.test(q))return 'You’re welcome! If you’d like Hanzla to look at your project, tell me about the project and I’ll help you send the details.';
 return null;
}

export const validPhone=value=>/^\+?[\d\s().-]+$/.test(value||'')&&(value.match(/\d/g)||[]).length>=7&&(value.match(/\d/g)||[]).length<=15;
export function detectService(text){
 const q=text.toLowerCase();
 if(/\b(ai|retell|voice|chatbot|bot|booking|appointments?)\b/.test(q))return 'AI agents & booking';
 if(/\b(make|zapier|n8n|automat\w*|integrat\w*|webhooks?|apis?|ghost|onboarding)\b/.test(q))return 'Automation & workflows';
 if(/\b(funnels?|websites?|landing|forms?|surveys?)\b/.test(q))return 'Funnels & websites';
 if(/\b(a2p|10dlc|sms|messaging)\b/.test(q))return 'A2P & messaging';
 if(/\b(crm|ghl|gohighlevel|highlevel|pipelines?|snapshots?|saas)\b/.test(q))return 'GHL account setup';
 return null;
}
export function parseContactDetails(text){
 const details={};
 const email=text.match(/[^\s<>(),;]+@[^\s<>(),;]+\.[^\s<>(),;]+/)?.[0]?.replace(/[.!?]+$/,'');
 if(email&&email.length<=254&&emailPattern.test(email))details.email=email;
 const phone=text.match(/\+\d[\d ().-]{6,24}\d/)?.[0]?.trim();
 if(phone&&validPhone(phone))details.phone=phone;
 const name=text.match(/\b(?:my name is|mera naam(?: hai)?|mera nam(?: hai)?)\s+([\p{L}][\p{L}\p{M}' -]{1,80}?)(?=[,.!?]|\s+(?:and|aur|email|phone|my)\b|$)/iu)?.[1]?.trim();
 if(name)details.name=name;
 return details;
}
export function createReplyScheduler({setTimer=setTimeout,clearTimer=clearTimeout}={}){
 let pending=null,generation=0;
 return {
  schedule(callback){this.cancel();const current=generation;pending=setTimer(()=>{pending=null;if(current===generation)callback();},REPLY_DELAY_MS);},
  cancel(){generation++;if(pending!==null)clearTimer(pending);pending=null;}
 };
}
const isQuestion=text=>/^(what|how|where|when|can |could |do |does |is |are |why|who|kya|kahan)|\?$/i.test(text);
const greeting=text=>/^(hi|hello|hey|salam|assalam[ -]?o[ -]?alaikum|aoa)[!.\s]*$/i.test(text);

export class Conversation {
 constructor(){this.reset();}
 reset(){this.stage='need';this.lead={service:'',plan:'',name:'',email:'',phone:'',project:''};this.messages=[];this.status='idle';}
 reply(text,suggestions=this.stageChoices(),review=false){this.messages.push({role:'assistant',text});return{text,suggestions,review};}
 welcome(){return this.reply('Hi! I’m Hanzla’s portfolio assistant. What would you like help with—GoHighLevel, automation, AI booking or a website? I can answer your questions and help you send him a project brief.');}
 prompt(){return {need:'What would you like to build or improve?',name:'What’s your name?',email:'What email should Hanzla reply to?',project:this.lead.service==='AI agents & booking'?'What should your agent do—answer questions, qualify leads, book appointments, or all three? Which CRM or tools do you use?':this.lead.service==='Automation & workflows'?'Which tools should connect, and what should happen automatically? A short example of the process will help.':'Tell me about the project: what needs to change, and which tools or systems are involved?',phone:'What’s your WhatsApp number, including the country code? Hanzla will use it to follow up about this project.',confirm:'Your enquiry is ready. Check your details below, then choose Send my brief to email Hanzla your name, email, WhatsApp number, project details and this conversation.'}[this.stage]||'What would you like to know?';}
 stageChoices(){return this.stage==='need'?choices:this.stage==='confirm'?['Send my brief','Edit details']:[];}
 next(){this.stage=!this.lead.project?'project':!this.lead.name?'name':!this.lead.email?'email':!this.lead.phone?'phone':'confirm';}
 advance(prefix=''){this.next();return this.reply((prefix?prefix+'\n\n':'')+this.prompt(),this.stageChoices(),this.stage==='confirm');}
 begin(service='',plan=''){
  if(['sent','uncertain','sending'].includes(this.status))return this.reply('Please start a new chat for a new enquiry, or contact Hanzla directly.');
  this.lead.service=service;this.lead.plan=plan;this.stage=service?'project':'need';
  return this.reply((plan?'Let’s talk about '+plan+'. ':'')+this.prompt());
 }
 receive(raw){
  const text=clean(raw);if(!text)return this.reply('Please enter a message. '+this.prompt());
  this.messages.push({role:'visitor',text});
  if(this.messages.length>120)return this.reply('Please contact Hanzla by email or WhatsApp below, or start a new chat to continue.',[]);
  if(this.status==='sending')return this.reply('Your brief is being sent. Please wait for the confirmation.',[]);
  if(/^(send my brief|send|confirm|yes send)$/i.test(text)&&['sent','uncertain'].includes(this.status))return this.reply(this.status==='sent'?'This brief has already been sent. Please start a new chat for a new enquiry.':'Delivery is uncertain, so I won’t automatically resend. Please contact Hanzla by email or WhatsApp to check.',[]);
  if(/^(cancel|cancel brief|stop)$/i.test(text)){this.reset();return this.reply('Your brief has been cleared. '+this.prompt());}
  if(/^(start a project|start|leave a brief|get a quote|hire hanzla|i want to hire you)$/i.test(text))return this.begin();
  if(['sent','uncertain'].includes(this.status))return this.reply(answerQuestion(text)||'For another enquiry, please start a new chat. Hanzla can also help by email or WhatsApp.',['Services','Project examples']);
  const supplied=parseContactDetails(text);Object.assign(this.lead,supplied);
  if(Object.keys(supplied).length&&['need','project'].includes(this.stage)&&((supplied.email&&text===supplied.email)||(supplied.phone&&text===supplied.phone)||/^my name is [^,.!?]+[.!]?$/.test(text.toLowerCase())))return this.reply('Thanks, I’ve noted those contact details. '+this.prompt());
  if(this.stage==='confirm'){
   if(/^(send my brief|send|confirm|yes send)$/i.test(text))return{text:'',suggestions:[],submit:true};
   if(/^edit(?: details)?$/i.test(text)){this.stage='name';return this.reply('Let’s update your details. '+this.prompt(),[]);}
   const answer=answerQuestion(text);return this.reply((answer?answer+'\n\n':'')+this.prompt(),this.stageChoices(),true);
  }
  if(this.stage==='need'){
   if(greeting(text))return this.reply('Hello! '+this.prompt());
   const service=detectService(text),answer=answerQuestion(text);
   const commercialQuestion=/\b(price|cost|budget|rate|quote|timeline|how long|available|contact|email|reviews?|experience|where|who)\b/i.test(text);
   if(service&&!commercialQuestion){
    this.lead.service=service;
    if(text.length>=28&&text.split(/\s+/).length>=6&&!isQuestion(text))this.lead.project=text;
    return this.advance(answer||'Hanzla can review that with you.');
   }
   if(/^(not sure yet|not sure|something else)$/i.test(text)){this.lead.service='Not sure yet';return this.advance('That’s fine—we can start with the problem you want to solve.');}
   if(!isQuestion(text)&&text.length>=15&&!answer){this.lead.service='Not sure yet';this.lead.project=text;return this.advance('Thanks—that gives Hanzla a useful starting point.');}
   return this.reply((answer||'I can help with Hanzla’s services and project enquiries. For anything I can’t confirm, I’ll pass your question to him with your brief.')+'\n\n'+this.prompt());
  }
  // Questions remain answerable while collecting details; they never become a name or phone.
  if(isQuestion(text)&&!Object.keys(supplied).length){
   const answer=answerQuestion(text);
   return this.reply((answer||'I’ll include that question in the conversation for Hanzla to answer personally.')+'\n\n'+this.prompt());
  }
  if(this.stage==='project'){
   if(text.length<10)return this.reply('Please add a little more detail so Hanzla understands the tools and the result you need. '+this.prompt());
   this.lead.project=text;return this.advance('Got it—Hanzla can review that scope with you.');
  }
  if(this.stage==='name'){
   if(!supplied.name){
    const candidate=text.replace(/^(?:im|i am|i’m|i'm)\s+/i,'').trim();
    if(!/^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,99}$/u.test(candidate)||candidate.split(/\s+/).length>6||detectService(candidate))return this.reply('Please enter your name, for example Alex Smith.');
    this.lead.name=candidate;
   }
   return this.advance('Thanks, '+this.lead.name+'.');
  }
  if(this.stage==='email'){
   if(!supplied.email)return this.reply('Please enter a valid email, such as you@company.com. Hanzla needs it to reply.');
   return this.advance('Thank you.');
  }
  if(this.stage==='phone'){
   if(!supplied.phone){if(!validPhone(text))return this.reply('Please add a WhatsApp number with 7–15 digits, including your country code.');this.lead.phone=text;}
   return this.advance();
  }
  return this.reply((answerQuestion(text)||'Hanzla can answer that personally. You can start a new chat to leave another enquiry.')+'\n\n'+this.prompt());
 }
}

export async function deliverBrief({endpoint,accessKey,lead,messages,attribution={},signal,fetchImpl=fetch}){
 if(!lead.name||!emailPattern.test(lead.email)||!validPhone(lead.phone)||lead.project.trim().length<10)throw new Error('invalid_brief');
 if(endpoint!=='https://api.web3forms.com/submit'||!accessKey)throw new Error('invalid_configuration');
 const payload=new FormData();
 for(const [key,value] of Object.entries({access_key:accessKey,from_name:'Hanzla Portfolio Chat',subject:'New portfolio chat enquiry',name:lead.name,email:lead.email,phone:lead.phone,whatsapp:lead.phone,message:lead.project,service:lead.service||'Not specified',plan:lead.plan||'General enquiry',source:'Website chat',conversation:messages.map(m=>`${m.role==='visitor'?'Visitor':'Assistant'}: ${m.text}`).join('\n\n').slice(-18000)}))payload.set(key,value);
 for(const key of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','msclkid'])if(typeof attribution[key]==='string')payload.set(key,attribution[key].slice(0,250));
 const response=await fetchImpl(endpoint,{method:'POST',body:payload,headers:{Accept:'application/json'},signal});
 const result=await response.json();if(!response.ok||result.success!==true)throw new Error('submission_rejected');
 return true;
}

export function initChat(){
 const widget=document.querySelector('#chat-widget');if(!widget)return;
 const panel=widget.querySelector('#chat-panel'),launcher=widget.querySelector('#chat-launcher'),form=widget.querySelector('#chat-compose'),input=widget.querySelector('#chat-message'),send=widget.querySelector('#chat-send'),log=widget.querySelector('#chat-messages'),suggestions=widget.querySelector('#chat-suggestions');
 const conversation=new Conversation(),scheduler=createReplyScheduler();let sending=false,replying=false,open=false;
 function scroll(){log.scrollTop=log.scrollHeight;}
 function bubble(role,text){const row=document.createElement('div');row.className='chat-message chat-message-'+role;const label=document.createElement('span');label.className='chat-speaker';label.textContent=role==='visitor'?'You':'HA assistant';const p=document.createElement('p');p.textContent=text;row.append(label,p);log.appendChild(row);scroll();return row;}
 function addSummary(){const card=document.createElement('dl');card.className='chat-brief-summary';for(const [label,value] of [['Name',conversation.lead.name],['Email',conversation.lead.email],['Project',conversation.lead.project],['WhatsApp',conversation.lead.phone],['Service',conversation.lead.service||'General enquiry']]){const row=document.createElement('div'),term=document.createElement('dt'),detail=document.createElement('dd');term.textContent=label;detail.textContent=value;row.append(term,detail);card.appendChild(row);}log.appendChild(card);scroll();}
 function quickReplies(items){suggestions.replaceChildren();for(const text of items){const button=document.createElement('button');button.type='button';button.textContent=text;button.addEventListener('click',()=>handle(text));suggestions.appendChild(button);}if(conversation.stage==='need'){
   for(const [label,href] of [['View projects','/#work'],['Pricing','/#pricing'],['Upwork','https://www.upwork.com/freelancers/~017b2fcbe223c90e1a'],['WhatsApp',widget.dataset.whatsapp]]){const a=document.createElement('a');a.textContent=label;a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}else a.addEventListener('click',()=>setOpen(false));suggestions.appendChild(a);}
  }}
 function render(reply){if(reply.text)bubble('assistant',reply.text);if(reply.review)addSummary();quickReplies(reply.suggestions||[]);input.placeholder={name:'Your name…',email:'you@company.com',project:'Tell me about your project…',phone:'WhatsApp number with country code…',confirm:'Ask a question or use the buttons…'}[conversation.stage]||'Ask a question…';input.type='text';input.inputMode=conversation.stage==='phone'?'tel':conversation.stage==='email'?'email':'text';scroll();}
 function setOpen(value){open=value;panel.hidden=!value;launcher.setAttribute('aria-expanded',String(value));launcher.setAttribute('aria-label',value?'Close chat with Hanzla’s assistant':'Open chat with Hanzla’s assistant');widget.classList.toggle('chat-is-open',value);if(value){scroll();input.focus({preventScroll:true});}else launcher.focus({preventScroll:true});}
 async function submit(){
  if(sending||conversation.status==='sent'||conversation.status==='uncertain'||widget.querySelector('#chat-botcheck').checked)return;
  sending=true;conversation.status='sending';input.disabled=true;send.disabled=true;quickReplies([]);form.setAttribute('aria-busy','true');const pending=bubble('assistant','Sending your brief to Hanzla…');const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   let attribution={};try{attribution=JSON.parse(sessionStorage.getItem('ha-campaign-v1')||'{}')||{};}catch{}
   await deliverBrief({endpoint:widget.dataset.endpoint,accessKey:widget.dataset.accessKey,lead:conversation.lead,messages:conversation.messages,attribution,signal:controller.signal});
   conversation.status='sent';conversation.stage='need';pending.querySelector('p').textContent='Your brief has been sent. Hanzla can reply to '+conversation.lead.email+'. Thanks for sharing your project!';quickReplies(['Services','Project examples']);
   if(!Array.isArray(window.dataLayer))window.dataLayer=[];window.dataLayer.push({event:'generate_lead',contact_channel:'chat'});
  }catch(error){
   conversation.status=error.name==='AbortError'?'uncertain':'error';pending.querySelector('p').textContent=error.name==='AbortError'?'The confirmation is taking longer than expected. Your brief may have been sent. Please contact Hanzla directly before resending.':'I couldn’t confirm delivery. Your details are still in this chat. You can try again or contact Hanzla directly.';
   quickReplies(error.name==='AbortError'?[]:['Send my brief','Edit details']);
   const fallback=document.createElement('div');fallback.className='chat-fallback';for(const [text,href] of [['Email Hanzla','mailto:'+widget.dataset.email],['WhatsApp',widget.dataset.whatsapp]]){const a=document.createElement('a');a.textContent=text;a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}fallback.appendChild(a);}log.appendChild(fallback);
  }finally{clearTimeout(timeout);sending=false;input.disabled=false;send.disabled=false;form.removeAttribute('aria-busy');scroll();if(open)input.focus({preventScroll:true});}
 }
 function delayedReply(result){
  replying=true;input.disabled=true;send.disabled=true;quickReplies([]);form.setAttribute('aria-busy','true');
  const typing=document.createElement('div');typing.className='chat-typing';typing.setAttribute('role','status');typing.setAttribute('aria-label','Preparing a reply');for(let i=0;i<3;i++){const dot=document.createElement('i');dot.setAttribute('aria-hidden','true');typing.appendChild(dot);}log.appendChild(typing);scroll();
  scheduler.schedule(()=>{typing.remove();replying=false;input.disabled=false;send.disabled=false;form.removeAttribute('aria-busy');if(result.submit)void submit();else{render(result);if(open)input.focus({preventScroll:true});}});
 }
 function handle(value){if(sending||replying)return;const text=clean(value);if(!text)return;bubble('visitor',text);input.value='';delayedReply(conversation.receive(text));}
 launcher.addEventListener('click',()=>setOpen(!open));widget.querySelector('#chat-close').addEventListener('click',()=>setOpen(false));widget.querySelector('#chat-reset').addEventListener('click',()=>{if(sending)return;scheduler.cancel();replying=false;input.disabled=false;send.disabled=false;form.removeAttribute('aria-busy');conversation.reset();log.replaceChildren();render(conversation.welcome());input.value='';input.focus({preventScroll:true});});
 form.addEventListener('submit',event=>{event.preventDefault();handle(input.value);});
 document.querySelectorAll('[data-start-chat]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();if(sending||replying){setOpen(true);return;}setOpen(true);const plan=button.dataset.planName||'';const service=button.dataset.planService||'';delayedReply(conversation.begin(service,plan));}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&open&&!document.querySelector('dialog[open]')){event.preventDefault();setOpen(false);}});
 render(conversation.welcome());
}

if(typeof document!=='undefined')initChat();
