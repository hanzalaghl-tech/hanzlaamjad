import test from 'node:test';
import assert from 'node:assert/strict';
import {Conversation,answerQuestion,deliverBrief,createReplyScheduler,REPLY_DELAY_MS,parseContactDetails} from '../public/assets/chat.js';
import {renderPages,resolveContext} from '../scripts/build.mjs';

function ready(){
 const chat=new Conversation();chat.welcome();
 for(const text of ['Automations & integrations','Connect our Ghost posts to the GHL email workflow.','Test Visitor','visitor@example.com','+44 7532 677615'])chat.receive(text);
 return chat;
}
test('the assistant answers portfolio questions and hands off unknown claims',()=>{
 assert.match(answerQuestion('How much does this cost?'),/depends on the scope/i);
 assert.match(answerQuestion('Can you build a Retell phone call flow?'),/Retell/);
 assert.match(answerQuestion('Can A2P approval be guaranteed?'),/can’t be guaranteed/);
 assert.equal(answerQuestion('Who won the football match yesterday?'),null);
 const c=new Conversation();assert.match(c.receive('Tell me about secret clients').text,/worked with/);
 assert.match(c.receive('What is the weather?').text,/can’t confirm/);
});
test('the assistant proactively collects project, name, email and required phone',()=>{
 const c=new Conversation();
 c.receive('hello');assert.equal(c.stage,'need');
 c.receive('I need an AI agent');assert.equal(c.stage,'project');
 c.receive('It should qualify leads and book appointments in GoHighLevel.');assert.equal(c.stage,'name');
 c.receive('  ');assert.equal(c.stage,'name');c.receive('Test Visitor');assert.equal(c.stage,'email');
 c.receive('not an email');assert.equal(c.stage,'email');c.receive('visitor@example.com');assert.equal(c.stage,'phone');
 c.receive('Skip');assert.equal(c.stage,'phone');c.receive('123');assert.equal(c.stage,'phone');
 const review=c.receive('+44 7532 677615');assert.equal(review.review,true);assert.equal(c.stage,'confirm');assert.equal(c.status,'idle');
 assert.equal(c.lead.phone,'+44 7532 677615');assert.equal(c.receive('Send my brief').submit,true);
});
test('questions during intake retain the correct field, and visitors can edit and clear details',()=>{
 const c=ready();assert.equal(c.stage,'confirm');
 const reply=c.receive('Where are you based?');assert.match(reply.text,/Pakistan/);assert.equal(c.stage,'confirm');
 c.receive('Edit details');assert.equal(c.stage,'name');
 c.receive('Can you build Retell agents?');assert.equal(c.stage,'name');assert.equal(c.lead.name,'Test Visitor');
 c.receive('cancel');assert.equal(c.stage,'need');assert.equal(c.lead.email,'');
 c.reset();assert.equal(c.messages.length,0);assert.equal(c.lead.project,'');
});
test('shared contact details are extracted without being mistaken for the project brief',()=>{
 assert.deepEqual(parseContactDetails('My name is Alex Smith, my email is alex@example.com and my phone is +44 7532 677615'),{name:'Alex Smith',email:'alex@example.com',phone:'+44 7532 677615'});
 const c=new Conversation();c.receive('visitor@example.com');assert.equal(c.lead.project,'');assert.equal(c.lead.email,'visitor@example.com');
 c.receive('AI booking');c.receive('Qualify new leads and book into my GHL calendar.');
 c.receive('My name is Alex Smith, my phone is +44 7532 677615');assert.equal(c.stage,'confirm');
});
test('replies are scheduled at exactly three seconds and stale replies are cancelled on reset',()=>{
 let id=0;const timers=new Map();let replies=0;
 const scheduler=createReplyScheduler({setTimer:(fn,ms)=>{const n=++id;timers.set(n,{fn,ms});return n;},clearTimer:n=>timers.delete(n)});
 scheduler.schedule(()=>replies++);const first=timers.get(1);assert.equal(first.ms,3000);assert.equal(REPLY_DELAY_MS,3000);assert.equal(replies,0);
 scheduler.cancel();first.fn();assert.equal(replies,0);
 scheduler.schedule(()=>replies++);timers.get(2).fn();assert.equal(replies,1);
});
test('success forwards the brief and conversation to the original email service',async()=>{
 const c=ready(),calls=[];
 const result=await deliverBrief({endpoint:'https://api.web3forms.com/submit',accessKey:'public-test-key',lead:c.lead,messages:c.messages,attribution:{utm_source:'upwork',unrelated:'discard'},fetchImpl:async(url,options)=>{calls.push({url,...options});return {ok:true,json:async()=>({success:true})};}});
 assert.equal(result,true);assert.equal(calls.length,1);const payload=calls[0].body;
 assert.equal(payload.get('email'),'visitor@example.com');assert.equal(payload.get('name'),'Test Visitor');assert.equal(payload.get('phone'),'+44 7532 677615');
 assert.match(payload.get('conversation'),/Visitor: Connect our Ghost/);assert.equal(payload.get('subject'),'New portfolio chat enquiry');
 assert.equal(payload.get('utm_source'),'upwork');assert.equal(payload.get('unrelated'),null);
});
test('rejection, HTTP failures and timeouts never claim a successful email',async()=>{
 const c=ready();
 for(const response of [{ok:false,json:async()=>({success:true})},{ok:true,json:async()=>({success:false})}])await assert.rejects(deliverBrief({endpoint:'https://api.web3forms.com/submit',accessKey:'test',lead:c.lead,messages:c.messages,fetchImpl:async()=>response}),/submission_rejected/);
 const timeout=new Error('timeout');timeout.name='AbortError';await assert.rejects(deliverBrief({endpoint:'https://api.web3forms.com/submit',accessKey:'test',lead:c.lead,messages:c.messages,fetchImpl:async()=>{throw timeout;}}),{name:'AbortError'});
 assert.equal(c.lead.email,'visitor@example.com');
 c.status='uncertain';assert.equal(c.receive('send').submit,undefined);assert.match(c.receive('send').text,/won’t automatically resend/);
 c.status='sent';assert.match(c.receive('send').text,/already been sent/);
});
test('the updated page has feedback above contact and only public configuration in the widget',()=>{
 const html=renderPages(resolveContext({}))[0].html;
 assert.ok(html.indexOf('id="reviews"')<html.indexOf('id="contact"'));
 assert.match(html,/<script type="module" src="\/assets\/chat.js">/);
 assert.match(html,/id="chat-launcher"[^>]+aria-expanded="false"/);
 assert.match(html,/id="chat-panel"[^>]+hidden/);
 assert.ok(!html.includes('AggregateRating'));assert.equal((html.match(/class="review-card"/g)||[]).length,2);assert.match(html,/Jawad Ali S\./);assert.match(html,/Saad A\./);
});

test('email handoff rejects missing phone details before any network request',async()=>{
 const c=ready();let called=false;await assert.rejects(deliverBrief({endpoint:'https://api.web3forms.com/submit',accessKey:'test',lead:{...c.lead,phone:''},messages:c.messages,fetchImpl:async()=>{called=true;}}),/invalid_brief/);assert.equal(called,false);
});
test('pricing includes meaningful options and no unapproved numeric rates',()=>{
 const html=renderPages(resolveContext({}))[0].html;const pricing=html.match(/<section class="pricing-section[\s\S]*?<\/section>/)[0];
 assert.equal((pricing.match(/data-plan-type=/g)||[]).length,4);assert.ok(pricing.includes('Custom quote'));assert.ok(!/\$[0-9]/.test(pricing));assert.equal((pricing.match(/data-start-chat/g)||[]).length,5);
});
