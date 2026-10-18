/* Portfolio assistant: verified answers, a guided brief and an explicit email handoff. */
const choices=['Services','Project examples','Start a project'];
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean=text=>String(text||'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').trim().slice(0,2000);

export function answerQuestion(input){
 const q=clean(input).toLowerCase().replace(/[’']/g,'');
 if(/^(hi|hello|hey|salam|assalam[ -]?o[ -]?alaikum|aoa)[!.\s]*$/.test(q))return 'Hi! I can explain Hanzla’s services and projects, or help you send him a project brief. What would you like to know?';
 if(/\b(price|pricing|cost|budget|rate|rates|quote|charges|fee|kitn[aeiy]|paisa|qeemat)\b/.test(q))return 'Pricing depends on the scope, tools and integrations involved. Share what you need and Hanzla can give you a tailored quote. I can collect a brief for him—choose Start a project.';
 if(/\b(how long|timeline|turnaround|deadline|delivery time|kitna time|kab tak|duration)\b/.test(q))return 'The timeline depends on the project scope and access to the tools involved. Hanzla will confirm an estimate after reviewing your brief; I can’t promise a delivery date on his behalf.';
 if(/\b(upwork|reviews?|testimonials?|feedback)\b/.test(q))return 'You can explore Hanzla’s work history and client feedback on his Upwork profile. Use the Upwork link below. I don’t have verified ratings or review quotations to share here.';
 if(/\b(ghost|newsletter|custom values|publish|publishing)\b/.test(q))return 'One featured project connects Ghost → Make → GoHighLevel. When a post is published, Make processes its content, updates GHL Custom Values and triggers an email workflow for the contacts with the selected tag. You can follow the screenshots in Selected work.';
 if(/\b(onboarding|google drive|slack|dossier|supabase)\b/.test(q))return 'Hanzla’s client onboarding project starts with a webhook, creates the client’s Google Drive folders and GHL setup, prepares Slack communication and passes the resulting details to the operations system. See the Client Onboarding Automation project for the sequence.';
 if(/\b(retell|voice|phone call|calling|outbound|ai call)\b/.test(q))return 'Hanzla builds voice AI calling and booking flows using Retell AI, Make and GoHighLevel. A featured project calls a new lead through Retell and sends the resulting appointment details back to GHL through HTTP.';
 if(/\b(a2p|10dlc|sms|messaging|registration|approved|approval)\b/.test(q))return 'Hanzla helps with A2P registration, email/SMS setup and follow-up workflows. There are real approval screenshots in the portfolio. Approval is decided by the provider and carriers, so it can’t be guaranteed.';
 if(/\b(ai|agent|agents|bot|chatbot|booking|appointments?|conversation)\b/.test(q))return 'Hanzla sets up conversational and voice AI for lead handling and appointment booking, connected to GoHighLevel workflows. His featured GHL project covers lead capture, AI conversation, booking and follow-up.';
 if(/\b(make|zapier|n8n|webhook|webhooks|integrat\w*|automat\w*|api|apis)\b/.test(q))return 'Hanzla connects GoHighLevel with Make, Zapier, n8n, APIs and webhooks. He builds lead capture, follow-up, content delivery and client onboarding workflows. Tell me which tools you need to connect, or choose Start a project.';
 if(/\b(funnel|funnels|website|websites|landing|forms?|surveys?)\b/.test(q))return 'Hanzla builds funnels, landing pages, forms, surveys and booking journeys, with the enquiry details connected to the CRM and the right follow-up workflow.';
 if(/\b(ghl|gohighlevel|highlevel|crm|snapshot|snapshots|saas|pipeline|pipelines|calendar|calendars)\b/.test(q))return 'Hanzla works on GoHighLevel account setup, pipelines, calendars, custom fields, snapshots and SaaS configuration. He also connects the CRM to automations and AI booking flows.';
 if(/\b(project|projects|examples?|portfolio|previous work|past work)\b/.test(q))return 'The portfolio includes four real builds: Ghost-to-GHL email automation, a GHL AI booking system, client onboarding across Drive/GHL/Slack, and Retell AI calling with appointments sent to GHL. Each has ordered screenshots—use View projects below.';
 if(/\b(experience|companies|clients|worked|background|cv|resume)\b/.test(q))return 'Hanzla has worked with Wingman, Auto Nurture, Top Lion Marketing, Auto Nurture Speedy.ai and Remote Clean Academy across GHL support, SaaS and onboarding roles. His CV is available through Download CV on this page.';
 if(/\b(where|based|country|location|timezone|time zone|pakistan|remote|language|urdu|english|kahan)\b/.test(q))return 'Hanzla is based in Mian Channu, Pakistan (UTC+5), works remotely, and speaks English and Urdu.';
 if(/\b(available|availability|start date|start work|available now)\b/.test(q))return 'The portfolio is open to new project enquiries. Hanzla will confirm his current availability and a start date after reviewing your requirements.';
 if(/\b(contact|email|whatsapp|human|person|directly|speak|call him)\b/.test(q))return 'You can email hanzala.ghl@gmail.com or use Business WhatsApp at +44 7532 677615. I’m an automated portfolio assistant; Hanzla replies personally to project enquiries.';
 if(/\b(services?|offer|what do you do|how can you help|kya.*(?:karte|krty|karty))\b/.test(q))return 'Hanzla helps with GoHighLevel CRM setup, automation and integrations, AI agents and booking, funnels and websites, and A2P/email/SMS setup. Which area are you interested in?';
 if(/\b(thank you|thanks|shukriya)\b/.test(q))return 'You’re welcome! If you’d like Hanzla to look at your project, choose Start a project and I’ll help you send the details.';
 return null;
}

export class Conversation {
 constructor(){this.reset();}
 reset(){this.stage='questions';this.lead={name:'',email:'',phone:'',project:''};this.messages=[];this.status='idle';}
 reply(text,suggestions=choices,review=false){this.messages.push({role:'assistant',text});return{text,suggestions,review};}
 welcome(){return this.reply('Hi! I’m Hanzla’s portfolio assistant. Ask about CRM, automation or AI booking—or leave a project brief for Hanzla.');}
 prompt(){return {name:'What’s your name?',email:'What email should Hanzla reply to?',project:'What would you like to build or improve? Include the tools you use and what you want to happen.',phone:'Would you like to add a WhatsApp number? Include your country code, or choose Skip.',confirm:'Your brief is ready. Review the details below, then choose Send my brief to email Hanzla your details and this conversation.'}[this.stage]||'What would you like to know?';}
 stageChoices(){return this.stage==='phone'?['Skip']:this.stage==='confirm'?['Send my brief','Edit details']:[];}
 receive(raw){
  const text=clean(raw);if(!text)return this.reply('Please enter a message.',this.stageChoices());
  this.messages.push({role:'visitor',text});
  if(/^(send my brief|send|confirm|yes send)$/i.test(text)&&['sent','uncertain'].includes(this.status))return this.reply(this.status==='sent'?'This brief has already been sent. Please start a new chat for a new enquiry.':'Delivery is uncertain, so I won’t automatically resend. Please contact Hanzla by email or WhatsApp to check.',[]);
  if(this.messages.length>100)return this.reply('This chat is getting long. Please use email or WhatsApp below, or start a new chat. Thank you!',[]);
  if(this.status==='sending')return this.reply('Your brief is being sent. Please wait for the confirmation.',[]);
  if(/^(cancel|cancel brief|stop)$/i.test(text)){this.lead={name:'',email:'',phone:'',project:''};this.stage='questions';return this.reply('The brief has been cleared. You can still ask about the work or services.');}
  if(/^(start a project|start|leave a brief|get a quote|hire hanzla|i want to hire you)$/i.test(text)){
   if(this.status==='sent'||this.status==='uncertain')return this.reply('Please start a new chat for a new enquiry, or contact Hanzla directly below.',[]);
   this.stage='name';return this.reply(this.prompt(),[]);
  }
  if(this.stage!=='questions'&&/^(what|how|where|when|can |do |does |is |are |why|kya|kahan)|\?$/i.test(text)){
   const answer=answerQuestion(text);if(answer)return this.reply(answer+'\n\n'+this.prompt(),this.stageChoices(),this.stage==='confirm');
  }
  if(this.stage==='name'){
   if(text.length<2||text.length>100||text.includes('@')||/^\d+$/.test(text))return this.reply('Please enter your name (2–100 characters).',[]);
   this.lead.name=text;this.stage='email';return this.reply(this.prompt(),[]);
  }
  if(this.stage==='email'){
   const email=text.match(/[^\s<>]+@[^\s<>]+\.[^\s<>]+/)?.[0];
   if(!email||email.length>254||!emailPattern.test(email))return this.reply('Please enter a valid email, such as you@company.com. Hanzla needs it to reply.',[]);
   this.lead.email=email;this.stage='project';return this.reply(this.prompt(),[]);
  }
  if(this.stage==='project'){
   if(text.length<10)return this.reply('Please add a little more detail (at least 10 characters), so Hanzla can understand the project.',[]);
   this.lead.project=text;this.stage='phone';return this.reply(this.prompt(),['Skip']);
  }
  if(this.stage==='phone'){
   if(!/^(skip|no|no thanks|none|n\/a)$/i.test(text)){
    const digits=text.replace(/\D/g,'').length;
    if(!/^\+?[\d\s().-]+$/.test(text)||digits<7||digits>15)return this.reply('Use a number with 7–15 digits and your country code, or choose Skip.', ['Skip']);
    this.lead.phone=text;
   }else this.lead.phone='';
   this.stage='confirm';return this.reply(this.prompt(),['Send my brief','Edit details'],true);
  }
  if(this.stage==='confirm'){
   if(/^(send my brief|send|confirm|yes send)$/i.test(text))return{text:'',suggestions:[],submit:true};
   if(/^edit(?: details)?$/i.test(text)){this.stage='name';return this.reply('Let’s update the details. '+this.prompt(),[]);}
   const answer=answerQuestion(text);return this.reply((answer?answer+'\n\n':'')+'Choose Send my brief to email it, or Edit details to make changes.',this.stageChoices());
  }
  const answer=answerQuestion(text);
  return this.reply(answer||'I don’t have a verified answer to that. I can send your question and project details to Hanzla so he can reply personally. Choose Start a project, or use email/WhatsApp below.');
 }
}

export async function deliverBrief({endpoint,accessKey,lead,messages,attribution={},signal,fetchImpl=fetch}){
 if(!lead.name||!emailPattern.test(lead.email)||lead.project.trim().length<10)throw new Error('invalid_brief');
 if(endpoint!=='https://api.web3forms.com/submit'||!accessKey)throw new Error('invalid_configuration');
 const payload=new FormData();
 for(const [key,value] of Object.entries({access_key:accessKey,from_name:'Hanzla Portfolio Chat',subject:'New portfolio chat enquiry',name:lead.name,email:lead.email,whatsapp:lead.phone||'Not provided',message:lead.project,source:'Website chat',conversation:messages.map(m=>`${m.role==='visitor'?'Visitor':'Assistant'}: ${m.text}`).join('\n\n').slice(-18000)}))payload.set(key,value);
 for(const key of ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','msclkid'])if(typeof attribution[key]==='string')payload.set(key,attribution[key].slice(0,250));
 const response=await fetchImpl(endpoint,{method:'POST',body:payload,headers:{Accept:'application/json'},signal});
 const result=await response.json();if(!response.ok||result.success!==true)throw new Error('submission_rejected');
 return true;
}

export function initChat(){
 const widget=document.querySelector('#chat-widget');if(!widget)return;
 const panel=widget.querySelector('#chat-panel'),launcher=widget.querySelector('#chat-launcher'),form=widget.querySelector('#chat-compose'),input=widget.querySelector('#chat-message'),send=widget.querySelector('#chat-send'),log=widget.querySelector('#chat-messages'),suggestions=widget.querySelector('#chat-suggestions');
 const conversation=new Conversation();let sending=false,open=false;
 function scroll(){log.scrollTop=log.scrollHeight;}
 function bubble(role,text){const row=document.createElement('div');row.className='chat-message chat-message-'+role;const label=document.createElement('span');label.className='chat-speaker';label.textContent=role==='visitor'?'You':'HA assistant';const p=document.createElement('p');p.textContent=text;row.append(label,p);log.appendChild(row);scroll();return row;}
 function addSummary(){const card=document.createElement('dl');card.className='chat-brief-summary';for(const [label,value] of [['Name',conversation.lead.name],['Email',conversation.lead.email],['Project',conversation.lead.project],['WhatsApp',conversation.lead.phone||'Not provided']]){const row=document.createElement('div'),term=document.createElement('dt'),detail=document.createElement('dd');term.textContent=label;detail.textContent=value;row.append(term,detail);card.appendChild(row);}log.appendChild(card);scroll();}
 function quickReplies(items){suggestions.replaceChildren();for(const text of items){const button=document.createElement('button');button.type='button';button.textContent=text;button.addEventListener('click',()=>handle(text));suggestions.appendChild(button);}if(conversation.stage==='questions'){
   for(const [label,href] of [['View projects','/#work'],['Upwork','https://www.upwork.com/freelancers/~017b2fcbe223c90e1a'],['WhatsApp',widget.dataset.whatsapp]]){const a=document.createElement('a');a.textContent=label;a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}else a.addEventListener('click',()=>setOpen(false));suggestions.appendChild(a);}
  }}
 function render(reply){if(reply.text)bubble('assistant',reply.text);if(reply.review)addSummary();quickReplies(reply.suggestions||[]);input.placeholder={name:'Your name…',email:'you@company.com',project:'Tell me about your project…',phone:'Your WhatsApp number, or Skip…',confirm:'Ask a question or use the buttons…'}[conversation.stage]||'Ask a question…';input.type='text';input.inputMode=conversation.stage==='phone'?'tel':conversation.stage==='email'?'email':'text';scroll();}
 function setOpen(value){open=value;panel.hidden=!value;launcher.setAttribute('aria-expanded',String(value));launcher.setAttribute('aria-label',value?'Close chat with Hanzla’s assistant':'Open chat with Hanzla’s assistant');widget.classList.toggle('chat-is-open',value);if(value){scroll();input.focus({preventScroll:true});}else launcher.focus({preventScroll:true});}
 async function submit(){
  if(sending||conversation.status==='sent'||conversation.status==='uncertain'||widget.querySelector('#chat-botcheck').checked)return;
  sending=true;conversation.status='sending';input.disabled=true;send.disabled=true;quickReplies([]);form.setAttribute('aria-busy','true');const pending=bubble('assistant','Sending your brief to Hanzla…');const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  try{
   let attribution={};try{attribution=JSON.parse(sessionStorage.getItem('ha-campaign-v1')||'{}')||{};}catch{}
   await deliverBrief({endpoint:widget.dataset.endpoint,accessKey:widget.dataset.accessKey,lead:conversation.lead,messages:conversation.messages,attribution,signal:controller.signal});
   conversation.status='sent';conversation.stage='questions';pending.querySelector('p').textContent='Your brief has been sent. Hanzla can reply to '+conversation.lead.email+'. Thanks for sharing your project!';quickReplies(['Services','Project examples']);
   if(!Array.isArray(window.dataLayer))window.dataLayer=[];window.dataLayer.push({event:'generate_lead',contact_channel:'chat'});
  }catch(error){
   conversation.status=error.name==='AbortError'?'uncertain':'error';pending.querySelector('p').textContent=error.name==='AbortError'?'The confirmation is taking longer than expected. Your brief may have been sent. Please contact Hanzla directly before resending.':'I couldn’t confirm delivery. Your details are still in this chat. You can try again or contact Hanzla directly.';
   quickReplies(error.name==='AbortError'?[]:['Send my brief','Edit details']);
   const fallback=document.createElement('div');fallback.className='chat-fallback';for(const [text,href] of [['Email Hanzla','mailto:'+widget.dataset.email],['WhatsApp',widget.dataset.whatsapp]]){const a=document.createElement('a');a.textContent=text;a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}fallback.appendChild(a);}log.appendChild(fallback);
  }finally{clearTimeout(timeout);sending=false;input.disabled=false;send.disabled=false;form.removeAttribute('aria-busy');scroll();if(open)input.focus({preventScroll:true});}
 }
 function handle(value){if(sending)return;const text=clean(value);if(!text)return;bubble('visitor',text);input.value='';const result=conversation.receive(text);if(result.submit)void submit();else render(result);}
 launcher.addEventListener('click',()=>setOpen(!open));widget.querySelector('#chat-close').addEventListener('click',()=>setOpen(false));widget.querySelector('#chat-reset').addEventListener('click',()=>{if(sending)return;conversation.reset();log.replaceChildren();render(conversation.welcome());input.value='';input.focus({preventScroll:true});});
 form.addEventListener('submit',event=>{event.preventDefault();handle(input.value);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&open&&!document.querySelector('dialog[open]')){event.preventDefault();setOpen(false);}});
 render(conversation.welcome());
}

if(typeof document!=='undefined')initChat();
