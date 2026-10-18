import test from 'node:test';
import assert from 'node:assert/strict';
import {Conversation,answerQuestion,deliverBrief} from '../public/assets/chat.js';
import {renderPages,resolveContext} from '../scripts/build.mjs';

function ready(){
 const chat=new Conversation();chat.welcome();
 for(const text of ['Start a project','Test Visitor','visitor@example.com','Connect our Ghost posts to the GHL email workflow.','Skip'])chat.receive(text);
 return chat;
}
test('the assistant answers portfolio questions and hands off unknown claims',()=>{
 assert.match(answerQuestion('How much does this cost?'),/depends on the scope/i);
 assert.match(answerQuestion('Can you build a Retell phone call flow?'),/Retell/);
 assert.match(answerQuestion('Can A2P approval be guaranteed?'),/can’t be guaranteed/);
 assert.equal(answerQuestion('Who won the football match yesterday?'),null);
 const c=new Conversation();assert.match(c.receive('Tell me about secret clients').text,/verified answer|worked with/);
 assert.match(c.receive('What is the weather?').text,/don’t have a verified answer/);
});
test('a brief requires valid contact details, project context and explicit send',()=>{
 const c=new Conversation();c.receive('Start a project');
 c.receive(' ');assert.equal(c.stage,'name');c.receive('Test Visitor');
 c.receive('not an email');assert.equal(c.stage,'email');c.receive('visitor@example.com');
 c.receive('help');assert.equal(c.stage,'project');c.receive('I need a GHL lead qualification and follow-up system.');
 c.receive('call me maybe');assert.equal(c.stage,'phone');
 const review=c.receive('+44 7532 677615');assert.equal(review.review,true);assert.equal(c.stage,'confirm');assert.equal(c.status,'idle');
 assert.equal(c.lead.phone,'+44 7532 677615');assert.equal(c.receive('Send my brief').submit,true);
});
test('visitors can ask a question during intake, edit details, skip WhatsApp and clear the chat',()=>{
 const c=ready();assert.equal(c.lead.phone,'');assert.equal(c.stage,'confirm');
 const reply=c.receive('Where are you based?');assert.match(reply.text,/Pakistan/);assert.equal(c.stage,'confirm');
 c.receive('Edit details');assert.equal(c.stage,'name');
 c.receive('cancel');assert.equal(c.stage,'questions');assert.equal(c.lead.email,'');
 c.reset();assert.equal(c.messages.length,0);assert.equal(c.lead.project,'');
});
test('success forwards the brief and conversation to the original email service',async()=>{
 const c=ready(),calls=[];
 const result=await deliverBrief({endpoint:'https://api.web3forms.com/submit',accessKey:'public-test-key',lead:c.lead,messages:c.messages,attribution:{utm_source:'upwork',unrelated:'discard'},fetchImpl:async(url,options)=>{calls.push({url,...options});return {ok:true,json:async()=>({success:true})};}});
 assert.equal(result,true);assert.equal(calls.length,1);const payload=calls[0].body;
 assert.equal(payload.get('email'),'visitor@example.com');assert.equal(payload.get('name'),'Test Visitor');
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
 assert.ok(!html.includes('AggregateRating'));assert.ok(!html.includes('review-rating'));
});
