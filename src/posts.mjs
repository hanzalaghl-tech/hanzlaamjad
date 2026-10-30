// Blog articles. Each guide is written from a build shown on the portfolio, using its real screenshots.
// Keep `published` as the date an article first went live and change `modified` only for substantive edits.
const fig=(src,width,height,alt,caption)=>`<figure><img src="${src}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async"><figcaption>${caption}</figcaption></figure>`;
const note=html=>`<aside class="note">${html}</aside>`;

export const posts=[
{
 slug:'ghost-to-gohighlevel-email-automation-make',
 title:'How I send every new Ghost post as a GoHighLevel email with Make',
 seoTitle:'Ghost to GoHighLevel Email Automation with Make.com | Hanzla Amjad',
 description:'A walkthrough of a real Make.com scenario that turns a published Ghost post into a personalised GHL email for tagged contacts, using Custom Values.',
 category:'Make.com + GoHighLevel',published:'2026-10-30',modified:'2026-10-30',
 keywords:['Ghost','GoHighLevel','Make.com','Custom Values','email automation'],
 related:['gohighlevel-custom-values-vs-custom-fields','gohighlevel-webhooks-inbound-outbound','make-vs-zapier-vs-n8n-for-gohighlevel'],
 cover:{src:'/assets/projects/ghost-01.webp',width:1600,height:791,alt:'Make.com scenario connecting Ghost, text parsers and GoHighLevel',caption:'The full scenario: Ghost publishes, Make prepares the content, GoHighLevel sends it.'},
 body:`<p>The brief was simple. Articles were published on Ghost, and the GoHighLevel contacts should get each new post by email without anyone copying and pasting it into a campaign. Doing that by hand works for a week or two, then a post gets missed.</p>
<p>Ghost has its own newsletter feature, but their contacts, tags and follow-up all lived in GHL. Running two email lists side by side meant two places to unsubscribe, two sets of stats and a lot of confusion. So the goal was: publish once in Ghost, and let GoHighLevel do the sending.</p>
<h2>The shape of the automation</h2>
<p>The finished flow has four stages:</p>
<ol>
<li>A post is published in Ghost.</li>
<li>Make.com receives the post and cleans up the content.</li>
<li>Make writes the subject and body into GoHighLevel Custom Values.</li>
<li>A GHL workflow sends an email built from those Custom Values to contacts with the right tag.</li>
</ol>
<p>That’s it. The interesting part is in the details of steps two and three.</p>
<h2>Step 1: listening for new posts</h2>
<p>Ghost can call a webhook when a post is published. I created a custom integration in Ghost admin, added a webhook for the <em>Post published</em> event and pointed it at a Make custom webhook. From then on, Make gets the full post payload every time someone hits publish: title, excerpt, HTML, feature image and URL.</p>
<p>One thing to check early: only trigger on <em>published</em>, not on <em>updated</em>. Otherwise fixing a typo sends the whole list another email. It’s the first thing I test.</p>
<h2>Step 2: preparing the content</h2>
${fig('/assets/projects/ghost-02.webp',1600,790,'Make.com text parser modules preparing the Ghost post HTML','Text parser modules tidy up the post HTML before it goes anywhere near an email.')}
<p>Ghost’s HTML is written for a web page, not an inbox. Embedded cards, galleries and some formatting don’t survive email clients well. I used Make’s text parser modules to replace or strip the pieces that would break, and to build a short version of the post for the email body with a clear “Read the full article” link back to Ghost.</p>
<p>I’d recommend this over sending the whole article. Email clients clip long messages, and you want people on the site anyway. A strong intro, the feature image and one link works better than 2,000 words in Gmail.</p>
<h2>Step 3: storing the post in Custom Values</h2>
${fig('/assets/projects/ghost-03.webp',1600,517,'GoHighLevel Custom Values holding the latest post subject and content','The latest post’s subject and content live in two Custom Values.')}
<p>This is the bit people find surprising. Instead of creating a new email in GHL each time, the email template stays the same and its content comes from Custom Values. Make updates two values on every run: one for the subject line and one for the body.</p>
<p>Custom Values are account-wide, so every contact who receives the email sees the same post. That’s exactly what you want here. (If you’re not sure when to use a Custom Value and when to use a custom field, I wrote <a href="/blog/gohighlevel-custom-values-vs-custom-fields/">a separate guide on the difference</a>.)</p>
<h2>Step 4: the email itself</h2>
${fig('/assets/projects/ghost-04.webp',1212,869,'GoHighLevel email template using Custom Values merge fields','The template references the Custom Values, so it never needs editing.')}
<p>The GHL email template uses merge fields like <code>{{custom_values.latest_post_subject}}</code> in the subject and the body. Personalisation such as the contact’s first name still comes from contact fields, so each email reads like it was written to that person.</p>
<p>Make’s final step starts the GHL workflow that sends to contacts with the newsletter tag. Because the template never changes, the client can adjust the design once and every future post uses it.</p>
<h2>Monitoring</h2>
${fig('/assets/projects/ghost-05.webp',1600,795,'Make.com scenario history showing successful runs','Make’s history shows each run, so you can see exactly what happened to a post.')}
<p>Make keeps a history of every run. When the client asks “did last Tuesday’s post go out?”, the answer is one click away. I also set up an error notification so that if a run fails, someone hears about it the same day rather than a week later.</p>
<h2>Variations that work the same way</h2>
<p>The pattern isn’t really about Ghost. Any tool that can send a webhook when something new is published can feed GoHighLevel like this: WordPress, a YouTube channel through its RSS feed, a podcast host, even a Google Sheet where someone types the week’s announcement. Make catches the event, cleans the content, writes it to Custom Values and starts the send.</p>
<p>You can also split audiences. Use different tags for different interests and let Make decide which workflow to start based on the post’s Ghost tag. A post tagged “automation” goes to one list, a post tagged “funnels” to another, and the template stays shared.</p>
<h2>Things I’d check before copying this</h2>
<ul>
<li><strong>Timing.</strong> Updating the Custom Values and sending must happen in order. If two posts are published within seconds, the second can overwrite the first before it’s sent. For a blog that posts a few times a week this never comes up, but it’s worth knowing.</li>
<li><strong>Opt-outs.</strong> Send only to contacts who agreed to receive the newsletter, and keep the unsubscribe link in the template.</li>
<li><strong>Test contacts.</strong> Run it against a tag that only contains your own email first. Publish a draft-quality test post, check the email on mobile, then switch to the real tag.</li>
</ul>
<p>It’s a small automation, but it removed a weekly chore and made sure every post actually reached the people who wanted it. That’s usually how the best automations look: boring, reliable and invisible.</p>`
},
{
 slug:'gohighlevel-ai-booking-agent-workflow',
 title:'From new lead to booked appointment: my GoHighLevel AI booking setup',
 seoTitle:'GoHighLevel Conversation AI Booking Workflow, Step by Step | Hanzla Amjad',
 description:'The workflows behind a GHL lead journey: qualification, routing by state, Conversation AI booking, no-show follow-up, reactivation and post-appointment reviews.',
 category:'GoHighLevel workflows',published:'2026-10-30',modified:'2026-10-30',
 keywords:['GoHighLevel','Conversation AI','appointment booking','GHL workflows','lead routing'],
 related:['retell-ai-gohighlevel-outbound-calls-make','gohighlevel-snapshots-what-transfers','gohighlevel-custom-values-vs-custom-fields'],
 cover:{src:'/assets/projects/ghl-ai-05.webp',width:1600,height:766,alt:'GoHighLevel Conversation AI agent settings with booking actions',caption:'The Conversation AI agent, with instructions and booking actions.'},
 body:`<p>When people ask for an “AI booking agent”, they usually picture the chatbot. In practice the bot is maybe a fifth of the work. The rest is everything around it: getting the lead into the right place, giving the AI the context it needs, and deciding what happens when someone books, doesn’t book or doesn’t show up.</p>
<p>This is how one of those systems is put together inside GoHighLevel, workflow by workflow.</p>
<h2>1. Capture and qualify</h2>
${fig('/assets/projects/ghl-ai-01.webp',1067,879,'GoHighLevel workflow triggered by a form submission for lead qualification','A form submission starts the qualification workflow straight away.')}
<p>Everything starts with a form. The moment it’s submitted, a workflow tags the contact, records where they came from and checks the basic qualification questions. Speed matters here. A lead who gets a message within a minute is far more likely to reply than one who hears back the next morning.</p>
<h2>2. Route the lead</h2>
${fig('/assets/projects/ghl-ai-03.webp',1600,745,'GHL if/else branches routing leads by state and phone area code','If/else branches send each lead down the right path and assign the right SMS number.')}
<p>This business served several states, and leads respond better to a local number. So the routing workflow uses if/else branches on the contact’s state and phone area code, then assigns the matching SMS number. It looks complicated on the canvas, but each branch is just one question: “is this lead from here?”</p>
<p>A tip: build a fallback branch for “none of the above”. Forms collect messy data, and a lead with a missing state shouldn’t fall out of the system.</p>
<h2>3. Keep the context in custom fields</h2>
${fig('/assets/projects/ghl-ai-04.webp',1600,786,'GoHighLevel custom fields for qualification, routing and appointment data','Custom fields carry qualification and appointment details between workflows.')}
<p>Each contact carries custom fields for qualification answers, the routing decision and appointment details. Every later workflow reads from these instead of asking again. It also means the team can open a contact and see the whole story at a glance.</p>
<h2>4. Let the AI handle the conversation</h2>
<p>The Conversation AI agent gets clear instructions: who it’s speaking for, what it can and can’t say, which questions to ask and when to offer times. It’s connected to the calendar with a booking action, so it can actually put the appointment in, not just suggest it.</p>
<p>The most important instruction is the handoff. When someone asks something the bot shouldn’t answer, like pricing exceptions or a complaint, it stops and a person takes over. I write those rules down with the client before switching anything on.</p>
<h2>5. React to the booking</h2>
${fig('/assets/projects/ghl-ai-06.webp',866,894,'GHL workflow with an appointment status trigger','An appointment-status trigger pulls the contact out of the no-show path.')}
<p>Once an appointment is booked, an appointment-status trigger removes the contact from any nurture sequence they were in. Nothing annoys a new customer more than getting “still interested?” texts after they’ve already booked.</p>
<h2>6. Follow up when people don’t show</h2>
<p>No-shows go into a timed sequence: a friendly message soon after the missed slot, a reschedule link, and a couple of spaced reminders. Separate response workflows handle missed calls, appointment reminders and DND requests, so opt-outs are always respected.</p>
${fig('/assets/projects/ghl-ai-08.webp',1593,431,'List of published GoHighLevel response workflows','Small, single-purpose workflows are easier to debug than one giant one.')}
<h2>7. Reactivation and after the appointment</h2>
${fig('/assets/projects/ghl-ai-10.webp',1600,501,'Post-appointment GoHighLevel workflows for reviews and referrals','After the appointment: feedback, reviews and referral requests.')}
<p>Two last pieces close the loop. Reactivation workflows reach out to older leads who went quiet. And after an appointment, the contact gets a feedback request, a review link if they’re happy and, later, a referral ask.</p>
<h2>Writing the AI agent’s instructions</h2>
<p>The instructions are where most of the quality comes from, so I treat them like a document the client signs off. Mine usually cover:</p>
<ul>
<li><strong>Identity.</strong> The business name, what it does and the tone: friendly, short messages, no jargon.</li>
<li><strong>The goal.</strong> Book a suitable appointment. Not sell, not answer every possible question.</li>
<li><strong>Questions to ask</strong>, in order, and which answers mean the lead isn’t a fit.</li>
<li><strong>Facts it may share</strong>, like service area, opening hours and what happens at the appointment.</li>
<li><strong>Things it must never do</strong>, like quote prices that aren’t published or promise outcomes.</li>
<li><strong>When to hand over</strong> to a person, and what to say while that happens.</li>
</ul>
<p>Then I test it by trying to break it: going off-topic, asking for a discount, giving a wrong postcode, replying with one word. Each failure becomes a line in the instructions.</p>
<h2>Reporting</h2>
<p>Once it’s live, the client wants to know if it’s working. Because the AI-booked appointments and self-booked appointments go through different workflows, it’s easy to count each. Pipeline stages show how many leads were qualified, booked, showed up and became customers. Those four numbers say more than any dashboard.</p>
<h2>What I’ve learnt building these</h2>
<ul>
<li><strong>Many small workflows beat one huge one.</strong> When something breaks, you want to open a workflow called “No-show follow-up”, not scroll through 80 steps.</li>
<li><strong>Name everything consistently.</strong> Tags, fields and workflows should follow one naming pattern. Future you will be grateful.</li>
<li><strong>Test with fake leads from every branch.</strong> One per state, one with missing data, one who books, one who doesn’t.</li>
</ul>
<p>The AI gets the attention, but the reliability comes from the plain workflows behind it.</p>`
},
{
 slug:'client-onboarding-automation-make-google-drive-gohighlevel',
 title:'One webhook, a client ready to go: automating onboarding with Make',
 seoTitle:'Client Onboarding Automation with Make, Google Drive & GHL | Hanzla Amjad',
 description:'How a single webhook creates numbered Google Drive folders, a new GoHighLevel location and Slack channels, then hands everything to the operations system.',
 category:'Operations automation',published:'2026-10-30',modified:'2026-10-30',
 keywords:['client onboarding','Make.com','Google Drive','GoHighLevel API','Slack'],
 related:['gohighlevel-webhooks-inbound-outbound','make-vs-zapier-vs-n8n-for-gohighlevel','gohighlevel-snapshots-what-transfers'],
 cover:{src:'/assets/projects/onboarding-01.webp',width:1813,height:884,alt:'Make.com onboarding scenario connecting Google Drive, GoHighLevel, Slack and an operations endpoint',caption:'The onboarding engine: one incoming webhook, every setup step after it.'},
 body:`<p>Onboarding a new client at an agency tends to look the same every time. Create the Drive folder. Create the subfolders. Set up the GHL sub-account. Make the Slack channel. Tell operations. It takes half an hour if everything goes well, and someone always forgets a step.</p>
<p>This scenario does all of it from one webhook, in under a minute. Here’s how it works.</p>
<h2>The trigger</h2>
<p>A single webhook receives the new client’s details: business name, contact person, address, timezone and a few service choices. That webhook can be called from a signed contract, a GHL form or an internal tool. Make doesn’t care where it comes from, as long as the data arrives in the same shape.</p>
<p>The first thing I do is validate. If the business name or email is missing, the scenario stops and alerts the team instead of creating half a client.</p>
<h2>Numbering the client</h2>
${fig('/assets/projects/onboarding-02.webp',1791,877,'Google Drive search module finding existing client folders','Searching Drive for existing client folders.')}
<p>The agency numbers its clients, and the folder names start with that number. To generate it, Make searches Google Drive for existing client folders, counts them, and uses the count to build the next number.</p>
${fig('/assets/projects/onboarding-03.webp',1116,678,'Make.com module calculating the next client number','The folder count becomes the new client number.')}
<p>Counting folders is simple and it works, but it relies on nobody deleting or renaming old folders. If your agency is likely to do that, store the last used number somewhere safer, like a data store or a database row, and increment it.</p>
<h2>Creating the workspace</h2>
${fig('/assets/projects/onboarding-04.webp',1547,887,'Make.com creating the client folder and Dossier, Raw Media and Reports subfolders','Every client gets the same folder structure.')}
<p>Make creates the main client folder with a consistent name, then three subfolders inside it: Dossier, Raw Media and Reports. Every client looks the same in Drive, so the team always knows where to put things.</p>
<h2>Provisioning the GoHighLevel location</h2>
${fig('/assets/projects/onboarding-05.webp',814,526,'HTTP request mapping client details into a GoHighLevel location creation request','An HTTP request creates the GHL sub-account from the webhook data.')}
<p>Next, an HTTP module calls the HighLevel API to create a new location (sub-account), mapping the business name, address, phone and timezone from the webhook. This needs an agency-level API credential, which should be stored in Make’s connection settings, never pasted into a module where someone could copy it.</p>
<p>If the agency uses a snapshot for new clients, this is where it gets loaded, so the sub-account starts with pipelines, workflows and templates already in place. (More on that in <a href="/blog/gohighlevel-snapshots-what-transfers/">what a snapshot carries and what it doesn’t</a>.)</p>
<h2>Slack</h2>
${fig('/assets/projects/onboarding-06.webp',389,483,'Slack channels created for client communication','Dedicated Slack channels per client.')}
<p>Make creates the client’s Slack channels using the same naming pattern and posts a welcome message with links to the new Drive folder and GHL location. The account manager doesn’t have to hunt for anything.</p>
<h2>Handing over to operations</h2>
${fig('/assets/projects/onboarding-07.webp',828,870,'Final HTTP payload sending client, location and folder details to the operations endpoint','The last step sends everything that was created to the operations system.')}
<p>The final HTTP request sends a tidy payload to the agency’s operations system: client number, GHL location ID, folder IDs and channel names. Now every system knows about the client, and they all use the same identifiers.</p>
<h2>When something fails halfway</h2>
<p>Any scenario that creates things in four different systems needs a plan for partial failure. If Drive and GHL succeed but Slack fails, you don’t want to run the whole thing again and end up with two folders and two sub-accounts.</p>
<p>What I do:</p>
<ul>
<li>Add an error handler to each external step, so a failure is caught and logged instead of stopping silently.</li>
<li>Send the team a message with the client name, the step that failed and the IDs of what was already created.</li>
<li>Make each step safe to retry on its own: search before you create, so a retry finds the existing folder instead of making a new one.</li>
</ul>
<p>It adds an hour to the build. It saves a messy afternoon the first time Slack’s API has a bad day.</p>
<h2>Adapting it to your agency</h2>
<p>The specific tools are less important than the order. Start by listing every step your team does today when a client signs, in the order they do it, and note what information each step needs. That list becomes the scenario. Some agencies add a welcome email from GHL, a ClickUp or Asana project, or an invoice in their accounting tool. Each is just another module after the webhook.</p>
<h2>Why this is worth building</h2>
<ul>
<li><strong>Consistency.</strong> Every client gets the same structure, named the same way.</li>
<li><strong>Speed.</strong> The client can be welcomed the same day the contract is signed.</li>
<li><strong>Fewer mistakes.</strong> Nobody forgets the Reports folder or mistypes a channel name.</li>
</ul>
<p>If I built it again for a busier agency, I’d add one thing: a check at the start that searches for an existing client with the same email, so a double-submitted form can’t create two of everything.</p>`
},
{
 slug:'retell-ai-gohighlevel-outbound-calls-make',
 title:'Connecting Retell AI voice calls to GoHighLevel with Make',
 seoTitle:'Retell AI + GoHighLevel: Outbound AI Calls & Booking via Make | Hanzla Amjad',
 description:'How a new lead triggers an outbound Retell AI call through Make, and how the agreed appointment comes back into GoHighLevel with an HTTP request.',
 category:'Voice AI',published:'2026-10-30',modified:'2026-10-30',
 keywords:['Retell AI','GoHighLevel','Make.com','AI calling','appointment booking'],
 related:['gohighlevel-ai-booking-agent-workflow','gohighlevel-webhooks-inbound-outbound','make-vs-zapier-vs-n8n-for-gohighlevel'],
 cover:{src:'/assets/projects/retell-02.webp',width:1897,height:876,alt:'Retell AI agent configuration with conversation instructions',caption:'The Retell AI agent: its instructions decide how the call goes.'},
 body:`<p>A text message is easy to ignore. A phone call a minute after someone fills in a form is not. That’s the idea behind this build: a new lead in GoHighLevel gets an outbound call from a Retell AI voice agent, the agent helps them pick a time, and the appointment ends up back in GHL.</p>
<p>There are three moving parts: Make starts the call, Retell runs the conversation, and a second webhook brings the result home.</p>
<h2>Starting the call</h2>
${fig('/assets/projects/retell-01.webp',805,504,'Make.com webhook triggering a Retell AI create call action','A webhook receives the lead and Make asks Retell to place the call.')}
<p>When a lead comes in, GoHighLevel sends their details to a Make webhook. The scenario passes the name, phone number and any useful context, like the service they asked about, to Retell’s create-call action. Retell dials out from the configured number with the chosen agent.</p>
<p>Two checks happen before the call: is the number in a valid format, and did the lead actually consent to being called? If either fails, no call. Calling people who didn’t ask to be called is a quick way to get your number flagged, and in many places it’s against the law.</p>
<h2>The agent</h2>
<p>Most of the effort goes into the agent’s instructions. I write them like a brief for a new receptionist: who you are, which business you represent, the one goal of the call (book an appointment), the questions to ask, how to handle “not now”, and when to end the call politely.</p>
<p>Things that made a real difference in testing:</p>
<ul>
<li><strong>Short sentences.</strong> Long, written-style paragraphs sound odd when spoken.</li>
<li><strong>Using the lead’s context.</strong> “You asked about a quote for…” makes the call feel expected rather than random.</li>
<li><strong>A clear exit.</strong> If someone asks to stop, the agent confirms and ends the call, and that preference is saved.</li>
</ul>
<h2>Bringing the booking back</h2>
${fig('/assets/projects/retell-03.webp',867,460,'Make.com scenario receiving Retell data and posting it to GoHighLevel','A second webhook passes the booking details to GoHighLevel.')}
<p>When the call ends, Retell sends the outcome to a second Make webhook: whether a time was agreed, the date and time, and a summary. Make then makes an HTTP POST into GoHighLevel so the contact is updated and the appointment details are recorded where the team works.</p>
<p>I keep the call summary in a custom field too. When a salesperson opens the contact before the meeting, they can read what was said in ten seconds.</p>
<h2>Inside GoHighLevel</h2>
${fig('/assets/projects/retell-04.webp',1577,640,'GoHighLevel workflows for incoming leads, AI caller bookings and self-booked appointments','GHL handles incoming leads, AI-booked appointments and self-booked ones separately.')}
<p>On the GHL side there are separate workflows for incoming leads, appointments booked by the AI caller and appointments people book themselves through the calendar link. Keeping them apart means reminders and confirmations can be tuned for each path, and reporting shows how many bookings the AI is actually responsible for.</p>
<h2>What the agent should send back</h2>
<p>The post-call data is only useful if it’s consistent. I agree a small set of outcomes with the client before building, and the agent and the Make scenario both use exactly those:</p>
<ul>
<li><strong>Booked</strong>, with date, time and timezone.</li>
<li><strong>Call back later</strong>, with the time the person suggested.</li>
<li><strong>Not interested</strong>, which stops all follow-up.</li>
<li><strong>No answer or voicemail</strong>, which can trigger a text instead of another call.</li>
<li><strong>Do not contact</strong>, which sets DND in GoHighLevel straight away.</li>
</ul>
<p>Make uses a router on the outcome, so each one updates the contact differently: a booked call moves the opportunity to the booked stage, “call back later” creates a task for a person, and “do not contact” is respected everywhere.</p>
<h2>Measuring whether it helps</h2>
<p>Compare a few weeks of leads before and after: how many were reached, how many booked, how quickly. Listen to a sample of recordings every week at the start. You’ll find questions the agent handles badly and phrases that sound robotic, and you can fix them while the volume is still small.</p>
<h2>Before you build one</h2>
<ul>
<li>Confirm calling consent and local rules for every country you call.</li>
<li>Decide calling hours. A 6 a.m. AI call does not make a good first impression.</li>
<li>Listen to the first twenty test calls yourself. You will rewrite the instructions after the first five.</li>
<li>Budget for usage: Retell, telephony and Make operations are all billed per use.</li>
</ul>
<p>Done carefully, an AI caller is a fast, polite first contact that never forgets to call. Done carelessly, it’s a robocall. The difference is almost entirely in the planning.</p>`
},
{
 slug:'a2p-10dlc-registration-gohighlevel-approval',
 title:'A2P 10DLC in GoHighLevel: what gets registrations approved',
 seoTitle:'A2P 10DLC Registration in GoHighLevel: Approval Checklist | Hanzla Amjad',
 description:'The checks I run before submitting an A2P brand and campaign in the GHL Trust Center, and the most common reasons registrations get rejected.',
 category:'A2P & messaging',published:'2026-10-30',modified:'2026-10-30',
 keywords:['A2P 10DLC','GoHighLevel Trust Center','SMS compliance','campaign registration','LC Phone'],
 related:['gohighlevel-ai-booking-agent-workflow','gohighlevel-snapshots-what-transfers','gohighlevel-saas-mode-setup-checklist'],
 cover:{src:'/assets/projects/a2p-01.webp',width:1915,height:906,alt:'GoHighLevel Trust Center showing an approved A2P brand and campaign',caption:'An approved brand and campaign in the GHL Trust Center.'},
 body:`<p>If you send SMS to US numbers from a GoHighLevel account using a regular 10-digit number, you need A2P 10DLC registration. Without it, messages get filtered or blocked. With a rejected registration, you wait, fix and resubmit, and every round can take days.</p>
<p>I’ve done a lot of these registrations in the GHL Trust Center. Most rejections come from the same handful of problems, and nearly all of them can be caught before you press submit.</p>
${note('<p><strong>Important:</strong> approval decisions are made by The Campaign Registry, the messaging provider and the carriers, not by GoHighLevel or by me. Rules also change. Use this as a checklist, not a guarantee.</p>')}
<h2>Part 1: the brand</h2>
<p>The brand is the business sending the messages. The details have to match official records exactly.</p>
<ul>
<li><strong>Legal business name</strong> exactly as it appears on the EIN (or equivalent tax) record. Not the trading name, not with “LLC” missing.</li>
<li><strong>Tax ID</strong> that matches that name.</li>
<li><strong>Address</strong> that matches the registration, not a virtual office the records don’t know about.</li>
<li><strong>Business type</strong> chosen correctly. A sole proprietor without an EIN registers differently from a company.</li>
<li><strong>Website and email</strong> on the business’s own domain where possible. A Gmail address and no website make reviewers nervous.</li>
</ul>
<p>The single most common brand problem I see is a name mismatch. Check it letter by letter.</p>
<h2>Part 2: the website</h2>
<p>Reviewers visit the website. It should clearly be the business named in the brand, and it should be live, not a “coming soon” page. Two things matter a lot:</p>
<ul>
<li><strong>A privacy policy</strong> that says mobile information won’t be shared with third parties or affiliates for marketing purposes.</li>
<li><strong>A visible SMS opt-in</strong> where people sign up, for example a checkbox on the form with text explaining what messages they’ll receive, that message and data rates may apply, how often they’ll get messages, and that they can reply STOP to opt out and HELP for help.</li>
</ul>
<p>If the form that collects phone numbers is a GHL form or funnel, add the consent text and checkbox there, and link the privacy policy and terms right next to it.</p>
<h2>Part 3: the campaign</h2>
<p>The campaign describes what you’ll send. This is where vague answers get rejected.</p>
<ul>
<li><strong>Use case</strong> that matches reality. Appointment reminders and customer care are different from marketing. If you’ll do both, choose the option that covers both.</li>
<li><strong>Description</strong> in plain English: who you are, who receives messages, why they receive them.</li>
<li><strong>Opt-in description</strong> that explains exactly how people sign up, and where. Reviewers want to be able to find it.</li>
<li><strong>Sample messages</strong> that look like real messages, include the business name, and include opt-out language in at least one sample, like “Reply STOP to opt out.”</li>
<li><strong>Consistency.</strong> If the samples mention links or phone numbers, say so in the campaign settings.</li>
</ul>
${fig('/assets/projects/a2p-04.webp',1920,911,'Another approved A2P registration in GoHighLevel Trust Center','Brand and campaign both approved.')}
<h2>Common rejection reasons</h2>
<ol>
<li>Business name doesn’t match the tax record.</li>
<li>Website missing, broken or not clearly the same business.</li>
<li>No privacy policy, or no statement about not sharing mobile data.</li>
<li>Opt-in process not described, or impossible to verify.</li>
<li>Sample messages without the brand name or opt-out language.</li>
<li>Use case doesn’t match the samples, for example “customer care” with promotional samples.</li>
</ol>
<h2>An example of opt-in wording</h2>
<p>Every business is different, so treat this as a starting point to adapt, not legal advice. Next to an unticked checkbox on the form:</p>
${note('<p>“I agree to receive appointment reminders and updates by text message from [Business Name] at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our Privacy Policy and Terms.”</p>')}
<p>The checkbox shouldn’t be required to submit the form, and the links should go to real pages. Reviewers do check.</p>
<h2>My pre-submit checklist</h2>
<ol>
<li>Legal name, tax ID and address copied from the official document, not typed from memory.</li>
<li>Website live, on the business’s own domain, with matching name and contact details.</li>
<li>Privacy policy and terms linked in the footer and next to the form.</li>
<li>Opt-in checkbox and consent text visible on every form that collects phone numbers.</li>
<li>Use case chosen to match the messages you’ll actually send.</li>
<li>Two or more realistic sample messages with the brand name and opt-out language.</li>
<li>Campaign description and opt-in description written in plain, specific sentences.</li>
</ol>
<h2>If you get rejected</h2>
<p>Read the rejection reason carefully. It’s usually short and vague, but it points to one of the areas above. Fix the root cause, especially on the website, before resubmitting. Resubmitting the same details with small wording changes rarely works.</p>
<p>A2P isn’t exciting, but it decides whether every SMS workflow you build actually reaches anyone. It’s worth getting right the first time.</p>`
},
{
 slug:'gohighlevel-snapshots-what-transfers',
 title:'GoHighLevel snapshots: what they carry and what you still set up by hand',
 seoTitle:'What a GoHighLevel Snapshot Includes (and What It Doesn’t) | Hanzla Amjad',
 description:'A practical guide to GHL snapshots: which assets copy across, which account-level settings never do, and the deployment checklist I use for new sub-accounts.',
 category:'GoHighLevel setup',published:'2026-10-30',modified:'2026-10-30',
 keywords:['GoHighLevel snapshots','GHL sub-account','snapshot deployment','agency onboarding'],
 related:['gohighlevel-saas-mode-setup-checklist','client-onboarding-automation-make-google-drive-gohighlevel','gohighlevel-custom-values-vs-custom-fields'],
 cover:{src:'/assets/projects/ghl-ai-08.webp',width:1593,height:431,alt:'A set of published GoHighLevel workflows ready to be packaged in a snapshot',caption:'Workflows like these travel with a snapshot. Phone numbers and domains don’t.'},
 body:`<p>A snapshot is a saved copy of a GoHighLevel sub-account’s setup that you can load into other sub-accounts. Agencies love them, and for good reason: build a great system once, then give every new client a copy.</p>
<p>The disappointment comes when someone loads a snapshot and expects a finished, working account. A snapshot carries the structure. It doesn’t carry anything tied to a specific business. Knowing the difference turns onboarding into a checklist instead of a scramble.</p>
<h2>What a snapshot usually carries</h2>
<ul>
<li>Pipelines and stages</li>
<li>Workflows and their triggers and actions</li>
<li>Funnels and websites</li>
<li>Forms, surveys and quizzes</li>
<li>Calendars and their settings</li>
<li>Custom fields and Custom Values</li>
<li>Tags</li>
<li>Email and SMS templates</li>
<li>Trigger links</li>
</ul>
<p>When you load or share a snapshot, you can choose which asset types to include. When you push updates to existing accounts, you can choose which assets to overwrite, so you don’t blow away a client’s own changes.</p>
<h2>What it never carries</h2>
<ul>
<li><strong>Contacts, conversations and opportunities.</strong> No customer data moves between accounts.</li>
<li><strong>Phone numbers.</strong> Each sub-account needs its own, plus its own A2P registration for US texting.</li>
<li><strong>Domains.</strong> Funnels arrive, but the domain they run on has to be connected and verified in the new account.</li>
<li><strong>Email sending setup.</strong> Dedicated sending domains and sender settings are per account.</li>
<li><strong>Integrations.</strong> Google, Facebook, Stripe and other connected accounts must be authorised again by the new account’s owner.</li>
<li><strong>Users.</strong> Team members and their permissions are added per account.</li>
</ul>
<p>Anything in a workflow that points to one of these, like “send from this number” or “add to this Google Sheet”, will need re-selecting after import.</p>
<h2>How I prepare a snapshot</h2>
<ol>
<li><strong>Start from a working account.</strong> Build it in a clean sub-account and test the whole journey first.</li>
<li><strong>Remove what’s client-specific.</strong> Names, logos, prices and addresses go into Custom Values, so the next client just fills in their own.</li>
<li><strong>Clean up duplicates.</strong> Old test workflows and unused fields only confuse whoever opens the account later.</li>
<li><strong>Use one naming pattern.</strong> For example “01 | Lead | New form submission”. Consistent names make the workflow list readable.</li>
<li><strong>Leave workflows in draft</strong> where they depend on account-level settings, so nothing fires before the account is ready.</li>
</ol>
<h2>My deployment checklist</h2>
<p>After loading a snapshot into a new sub-account, I go through this list:</p>
<ol>
<li>Business profile: name, address, timezone, logo.</li>
<li>Fill in Custom Values for the new business.</li>
<li>Connect and verify the domain, then assign funnels and websites to it.</li>
<li>Set up email sending.</li>
<li>Buy or port the phone number and start A2P registration.</li>
<li>Connect calendars to the right users and check availability.</li>
<li>Reconnect integrations.</li>
<li>Re-select numbers, users and integrations inside workflows.</li>
<li>Submit a test lead through every form and watch it travel.</li>
<li>Publish workflows one at a time.</li>
</ol>
<p>I worked on snapshot creation and deployment at Wingman and Top Lion Marketing, and this checklist is the result of finding each of these gaps the hard way at least once.</p>
<h2>Problems I see after an import</h2>
<ul>
<li><strong>Workflows that send from nobody.</strong> A “send SMS” step pointing to a number that doesn’t exist in the new account. Re-select the sender in every messaging step.</li>
<li><strong>Calendars with no team member.</strong> The calendar arrives, but nobody is assigned, so there are no available slots.</li>
<li><strong>Funnels on the wrong domain.</strong> Pages work on a preview link but the client’s domain shows an error until it’s connected and the funnel is assigned.</li>
<li><strong>Forms that notify the old account’s user.</strong> Check notification recipients on forms and in workflows.</li>
<li><strong>Old test contacts in triggers.</strong> Filters that reference a specific tag or contact from the original account.</li>
</ul>
<p>None of these are hard to fix. They’re just easy to miss if you assume the snapshot did everything.</p>
<h2>Sharing snapshots with clients</h2>
<p>Agencies can share a snapshot with a link so another agency account can import it. If you’re handing a snapshot to a client who has their own agency account, send the deployment checklist with it. A snapshot with no instructions often gets imported, half-configured and blamed when something doesn’t fire.</p>
<h2>Keeping snapshots up to date</h2>
<p>Your process will change. When it does, improve the master account, update the snapshot, and decide which client accounts should get the change. Keep a short changelog in a doc. Six months later, when a client asks why their workflow looks different, you’ll know.</p>`
},
{
 slug:'gohighlevel-saas-mode-setup-checklist',
 title:'Setting up GoHighLevel SaaS mode: my checklist before the first customer',
 seoTitle:'GoHighLevel SaaS Mode Setup Checklist | Hanzla Amjad',
 description:'What to decide and configure before selling GoHighLevel as your own SaaS: plans, Stripe, the SaaS configurator, snapshots, rebilling and a test sign-up.',
 category:'GoHighLevel setup',published:'2026-10-30',modified:'2026-10-30',
 keywords:['GoHighLevel SaaS mode','SaaS configurator','white label','Stripe','rebilling'],
 related:['gohighlevel-snapshots-what-transfers','a2p-10dlc-registration-gohighlevel-approval','client-onboarding-automation-make-google-drive-gohighlevel'],
 cover:null,
 body:`<p>SaaS mode lets an agency sell GoHighLevel to its own customers as a branded subscription. Customers sign up, pay you monthly and get a sub-account that’s already set up for their kind of business. When it works, it’s a proper product. When it’s rushed, it’s a support headache with a monthly fee attached.</p>
<p>I did SaaS development work at Auto Nurture Speedy.ai, and these are the things I make sure are settled before anyone sells the first plan.</p>
${note('<p>Plan requirements and features change. SaaS mode is tied to HighLevel’s higher agency plan, so check what your current plan includes before you start.</p>')}
<h2>1. Decide the offer before touching settings</h2>
<p>Write down, on paper:</p>
<ul>
<li>How many plans you’ll sell, and who each one is for.</li>
<li>The monthly price and whether there’s a trial.</li>
<li>Which features each plan unlocks.</li>
<li>Which snapshot each plan gets.</li>
<li>Whether you’ll pass on usage costs like SMS, calls, email and AI, and with what markup.</li>
</ul>
<p>Most SaaS setups that go wrong skipped this step. The configurator is easy; the decisions are hard.</p>
<h2>2. Branding and white-label</h2>
<p>Customers should see your brand, not HighLevel’s. That means your own domain for the app, your logo, your colours and your own support details. Set up the custom domain and check that login, password reset and email notifications all use your branding. Try the password-reset email yourself; it’s often the one that gets forgotten.</p>
<h2>3. Connect Stripe</h2>
<p>SaaS billing runs through Stripe. Connect your Stripe account, make sure it’s fully verified and activated for live payments, and check the business details customers will see on receipts. Run a test transaction before going live.</p>
<h2>4. Build plans in the SaaS configurator</h2>
<p>In the configurator, create each plan with its price, features and limits, and link it to the snapshot it should load. Keep plan names simple. “Starter”, “Growth” and “Pro” are easier for customers than clever names that don’t explain anything.</p>
<h2>5. Prepare the snapshots</h2>
<p>A new customer’s first login decides whether they stay. An empty account is overwhelming. A snapshot with a pipeline, a booking calendar, a couple of ready workflows and templates gives them something that works on day one. I wrote about <a href="/blog/gohighlevel-snapshots-what-transfers/">what snapshots carry and what they don’t</a>, which matters here: customers will still need to connect their own number and domain.</p>
<h2>6. Rebilling</h2>
<p>If you rebill usage, decide the markup and make sure customers understand it. A surprise invoice for SMS is the fastest way to a cancellation. Put the rates on your pricing page and in the welcome email.</p>
<h2>7. Onboarding for your customers</h2>
<p>Customers will still need to verify a domain, register for A2P if they text US numbers, and connect their calendar. Give them a short checklist, a few short videos or a booked onboarding call. The more of this you help with, the lower your churn.</p>
<h2>8. Test the full sign-up path</h2>
<ol>
<li>Sign up as a new customer from your pricing page.</li>
<li>Pay with a real or test card.</li>
<li>Check that the sub-account is created with the right snapshot.</li>
<li>Log in as the customer and check branding everywhere.</li>
<li>Check the welcome email and any automations you trigger on sign-up.</li>
<li>Cancel, and check what happens to access and billing.</li>
</ol>
<p>If every step behaves, you’re ready to sell. If one doesn’t, you’ve found it before a paying customer did.</p>
<h2>Support, upgrades and cancellations</h2>
<p>Three things are easy to forget until the first customer asks:</p>
<ul>
<li><strong>Support.</strong> Where do customers go when they’re stuck? A help email, a booking link or a chat widget inside the app. Decide who answers and how fast before you launch.</li>
<li><strong>Upgrades and downgrades.</strong> Test moving a customer from one plan to another. Check what happens to features they lose and how the price change is billed.</li>
<li><strong>Cancellations.</strong> Decide what happens to the sub-account and its data when someone cancels, and say so in your terms.</li>
</ul>
<p>Write these down in a simple internal document. When you hire your first support person, that document is their training.</p>
<h2>A note on expectations</h2>
<p>SaaS mode is the technical foundation, not the business. Customers come from your marketing, your niche and the support you give. Set it up well, keep the first version simple and improve it based on what real customers ask for.</p>`
},
{
 slug:'make-vs-zapier-vs-n8n-for-gohighlevel',
 title:'Make, Zapier or n8n with GoHighLevel? How I choose',
 seoTitle:'Make vs Zapier vs n8n for GoHighLevel Automation | Hanzla Amjad',
 description:'When I keep automation inside GHL workflows, and when I reach for Make, Zapier or n8n instead, based on the logic, volume and who will maintain it.',
 category:'Integrations',published:'2026-10-30',modified:'2026-10-30',
 keywords:['Make.com','Zapier','n8n','GoHighLevel integrations','automation tools'],
 related:['gohighlevel-webhooks-inbound-outbound','client-onboarding-automation-make-google-drive-gohighlevel','ghost-to-gohighlevel-email-automation-make'],
 cover:{src:'/assets/projects/onboarding-01.webp',width:1813,height:884,alt:'A multi-step Make.com scenario with routers and HTTP modules',caption:'A multi-step scenario like this is where Make earns its place.'},
 body:`<p>Clients often open with “should we use Make or Zapier?” My honest first answer is usually “maybe neither”. GoHighLevel’s own workflows can do a lot, and every extra tool is another subscription, another login and another place for things to break.</p>
<p>Here’s how I actually decide.</p>
<h2>Start inside GoHighLevel</h2>
<p>If the trigger and the action both live in GHL, keep it in a GHL workflow. Form submitted, tag added, appointment booked, send a message, move a stage, notify a user: GHL handles all of that natively. It’s cheaper, it’s faster, and the client’s team can see and edit it in the same place they work.</p>
<p>I only leave GHL when I need to talk to another system that GHL doesn’t connect to well, or when the logic gets too complex to read comfortably in a workflow.</p>
<h2>When I choose Zapier</h2>
<ul>
<li>The connection is simple: one trigger, one or two actions.</li>
<li>Both apps have solid Zapier integrations.</li>
<li>The client already pays for Zapier and their team knows it.</li>
<li>Someone non-technical will maintain it.</li>
</ul>
<p>Zapier is the easiest to understand. That’s a real advantage when the person looking after it next year isn’t a developer. My onboarding work at Remote Clean Academy, for example, used Zapier alongside booking and accounting tools.</p>
<h2>When I choose Make</h2>
<ul>
<li>The flow has many steps, branches or loops.</li>
<li>I need to transform data: parse text, reshape JSON, build arrays.</li>
<li>I need HTTP requests to APIs that don’t have a ready-made module.</li>
<li>I want to see each run visually when debugging.</li>
</ul>
<p>Most of the projects on my portfolio use Make. The <a href="/blog/client-onboarding-automation-make-google-drive-gohighlevel/">client onboarding engine</a> searches Drive, counts folders, calls the HighLevel API and talks to Slack in one scenario. That would be awkward in Zapier and impossible in a GHL workflow alone.</p>
<h2>When I choose n8n</h2>
<ul>
<li>The client wants to self-host for cost or data reasons.</li>
<li>Volume is high enough that per-operation pricing gets expensive.</li>
<li>There’s a developer on the team comfortable maintaining it.</li>
<li>The flow needs custom code steps.</li>
</ul>
<p>n8n is powerful and flexible, but self-hosting means someone is responsible for the server, updates and backups. That’s fine for a team with technical people. It’s a risk for a small business that just wants things to work.</p>
<h2>Questions I ask before choosing</h2>
<ol>
<li>What starts it, and what should happen at the end?</li>
<li>How many times a day or month will it run?</li>
<li>Which tools does the client already pay for?</li>
<li>Who will fix it if it breaks in a year?</li>
<li>Does any data need to stay in a particular region or system?</li>
</ol>
<p>The answer to question four matters more than people expect. The best tool is often the one your team can actually maintain.</p>
<h2>Thinking about cost</h2>
<p>All three charge differently. Zapier counts tasks, Make counts operations, and self-hosted n8n costs you a server and someone’s time. A scenario that runs once per new lead is cheap almost anywhere. A scenario that checks something every five minutes, or loops through hundreds of records, can get expensive quickly on per-step pricing.</p>
<p>Before choosing, I estimate: how many runs per month, and how many steps per run. Multiply them, and compare that with each tool’s current plans. It takes ten minutes and avoids a surprise bill.</p>
<h2>Three real decisions</h2>
<ul>
<li><strong>“Send a Slack message when a deal is won.”</strong> GHL workflow with a webhook to Slack, or Zapier if the team already uses it. No need for Make.</li>
<li><strong>“When a client signs, create folders, a sub-account and channels.”</strong> Make. Several systems, branching and API calls in one flow.</li>
<li><strong>“Sync 20,000 records every night between GHL and our database.”</strong> n8n or a small custom script, if the team can maintain it. Per-operation pricing on that volume adds up.</li>
</ul>
<h2>A mix is normal</h2>
<p>Plenty of my builds use more than one. GHL handles the customer-facing workflow, and a Make scenario handles the one awkward integration. That’s not messy, as long as it’s documented: write down which tool does what, and where the hand-offs between them happen.</p>`
},
{
 slug:'gohighlevel-custom-values-vs-custom-fields',
 title:'Custom Values vs custom fields in GoHighLevel: which one to use',
 seoTitle:'GoHighLevel Custom Values vs Custom Fields Explained | Hanzla Amjad',
 description:'The difference between GHL Custom Values and custom fields, with examples of when each is the right choice and how to reference them in emails and workflows.',
 category:'GoHighLevel setup',published:'2026-10-30',modified:'2026-10-30',
 keywords:['GoHighLevel Custom Values','custom fields','merge fields','GHL templates'],
 related:['ghost-to-gohighlevel-email-automation-make','gohighlevel-snapshots-what-transfers','gohighlevel-ai-booking-agent-workflow'],
 cover:{src:'/assets/projects/ghost-03.webp',width:1600,height:517,alt:'GoHighLevel Custom Values settings holding account-wide content',caption:'Custom Values: one value for the whole sub-account.'},
 body:`<p>These two get mixed up constantly, partly because the names are so similar. The difference is simple once you see it: <strong>a custom field belongs to a contact; a Custom Value belongs to the whole sub-account.</strong></p>
<h2>Custom fields: information about one person</h2>
<p>A custom field stores something different for every contact. Their budget, their preferred appointment time, which state they’re in, the answer they gave on a quiz. When you look at a contact record, custom fields are part of their profile.</p>
<p>You reference them with contact merge fields, for example <code>{{contact.budget}}</code>. When a workflow sends an email to 500 people, each one sees their own value.</p>
<p>Use custom fields for:</p>
<ul>
<li>Form and survey answers.</li>
<li>Qualification and routing decisions.</li>
<li>Appointment or deal details that differ by contact.</li>
<li>Anything you want to filter or segment by.</li>
</ul>
<h2>Custom Values: one setting for the whole account</h2>
<p>A Custom Value is a single piece of information for the sub-account, the same for everyone. The business phone number, the booking link, the company address, the owner’s name, this month’s offer.</p>
<p>You reference them like <code>{{custom_values.booking_link}}</code>. Change the value once and every email, SMS, funnel and workflow that uses it updates instantly.</p>
<p>Use Custom Values for:</p>
<ul>
<li>Business details that appear in lots of templates.</li>
<li>Links you might change later, like a calendar or review link.</li>
<li>Content that’s the same for every recipient, like a newsletter body.</li>
<li>Anything in a snapshot that each new client needs to replace with their own details.</li>
</ul>
<h2>A real example</h2>
<p>In the <a href="/blog/ghost-to-gohighlevel-email-automation-make/">Ghost to GoHighLevel automation</a>, the latest blog post’s subject and content are stored in Custom Values. Every newsletter recipient should see the same post, so an account-wide value is exactly right. But the greeting uses <code>{{contact.first_name}}</code>, because that’s different for each person.</p>
${fig('/assets/projects/ghost-04.webp',1212,869,'Email template combining contact fields and Custom Values','The same template uses both: contact fields for the person, Custom Values for the content.')}
<h2>Why this matters for snapshots</h2>
<p>If you build snapshots, Custom Values are your best friend. Put the business name, phone, address and links into Custom Values and reference them everywhere. When the snapshot loads into a new account, the client fills in one settings page instead of editing forty templates. I cover that in more detail in <a href="/blog/gohighlevel-snapshots-what-transfers/">my snapshot guide</a>.</p>
<h2>Where you can use them</h2>
<p>Both kinds of merge field work across most of GoHighLevel: email and SMS templates, workflow actions, funnel and website pages, forms, calendar notifications and Conversation AI instructions. That last one is useful. If the AI agent should mention the business’s opening hours, put the hours in a Custom Value and reference it in the instructions. Update the hours once and the bot is up to date too.</p>
<h2>Updating them automatically</h2>
<p>Custom Values don’t have to be typed by hand. Through the HighLevel API, a tool like Make can update them, which is exactly how the Ghost newsletter project works. The same idea fits other content that changes on a schedule: this week’s offer, the next event date, the current waiting time. Custom fields can be updated by workflows and integrations too, contact by contact, for example when a form is submitted or a call ends.</p>
<h2>Keeping them organised</h2>
<p>In a busy account the lists get long. A few habits help:</p>
<ul>
<li>Group custom fields into folders, such as “Qualification”, “Appointment” and “Billing”.</li>
<li>Prefix Custom Values by area, like <code>biz_phone</code>, <code>biz_address</code>, <code>link_booking</code>, <code>link_review</code>.</li>
<li>Delete fields nobody uses, after checking they aren’t referenced in a workflow or form.</li>
</ul>
<h2>Common mistakes</h2>
<ul>
<li><strong>Hard-coding business details in templates.</strong> It works until the phone number changes.</li>
<li><strong>Using a Custom Value for per-contact data.</strong> The last workflow to write to it wins, and everyone sees that value.</li>
<li><strong>Creating duplicate fields.</strong> “Budget”, “budget_2” and “Budget (new)” is a sign it’s time to clean up.</li>
<li><strong>Unclear names.</strong> Name keys so they explain themselves: <code>booking_link</code>, not <code>link1</code>.</li>
</ul>
<h2>Quick rule</h2>
<p>Ask: “Would this be different for each contact?” If yes, custom field. If no, Custom Value.</p>`
},
{
 slug:'gohighlevel-webhooks-inbound-outbound',
 title:'Webhooks in GoHighLevel: sending and receiving data the reliable way',
 seoTitle:'GoHighLevel Inbound & Outbound Webhooks Guide | Hanzla Amjad',
 description:'How GHL inbound webhook triggers and outbound webhook actions work, how I map and test payloads, and the safety checks I add before going live.',
 category:'Integrations',published:'2026-10-30',modified:'2026-10-30',
 keywords:['GoHighLevel webhooks','inbound webhook trigger','custom webhook','API integration','Make.com'],
 related:['make-vs-zapier-vs-n8n-for-gohighlevel','retell-ai-gohighlevel-outbound-calls-make','client-onboarding-automation-make-google-drive-gohighlevel'],
 cover:{src:'/assets/projects/retell-03.webp',width:867,height:460,alt:'A webhook passing booking data to GoHighLevel through an HTTP POST',caption:'A webhook passing data into GoHighLevel with an HTTP POST.'},
 body:`<p>Webhooks are how GoHighLevel talks to tools it doesn’t have a built-in connection for. Nearly every integration project I do uses at least one. They’re simple in principle: one system sends a small packet of data to a URL, and the other system does something with it. Most of the trouble comes from skipping the boring checks.</p>
<h2>Two directions</h2>
<p><strong>Outbound</strong> means GoHighLevel sends data out. A workflow action posts contact or appointment details to another tool’s URL, like a Make webhook, your own API or an operations system.</p>
<p><strong>Inbound</strong> means GoHighLevel receives data. The inbound webhook trigger gives you a URL; when another system posts to it, the workflow starts and you can map the incoming fields onto a contact.</p>
${note('<p>In the accounts I work in, the inbound webhook trigger and the custom webhook action are premium workflow features, billed per execution. Check your account’s workflow premium settings before building something high-volume.</p>')}
<h2>Sending data out</h2>
<p>For a simple “tell Make about this lead”, the standard webhook action is enough: it sends the contact data to the URL you enter. When the receiving system needs a specific method, headers or a custom body, like an API key in a header or a particular JSON shape, I use the custom webhook action.</p>
<p>The <a href="/blog/retell-ai-gohighlevel-outbound-calls-make/">Retell AI calling project</a> starts this way: a new lead in GHL is posted to Make, and Make asks Retell to place the call.</p>
<h2>Receiving data in</h2>
<p>With the inbound webhook trigger, the order of operations matters:</p>
<ol>
<li>Add the trigger and copy its URL.</li>
<li>Send one real sample request from the other system.</li>
<li>Let GHL capture that sample so the fields are available to map.</li>
<li>Map the fields to create or update the contact.</li>
<li>Continue the workflow from there.</li>
</ol>
<p>If you map fields before a sample arrives, there’s nothing to map. Send the sample first.</p>
<h2>Matching the right contact</h2>
<p>The most common webhook bug I fix is duplicate contacts. If the incoming data uses a different email format or phone format from the one already in GHL, you get a second contact instead of an update. Normalise phone numbers to international format and lowercase emails before they reach GHL. Make is great for that clean-up step.</p>
<h2>Safety checks I always add</h2>
<ul>
<li><strong>Treat the URL like a password.</strong> Anyone who has a webhook URL can send data to it. Don’t paste it into public screenshots or front-end code. (I removed screenshots showing full webhook endpoints from my own portfolio for exactly this reason.)</li>
<li><strong>Validate.</strong> If required fields are missing, stop and alert someone instead of creating junk records.</li>
<li><strong>Avoid loops.</strong> If GHL sends to Make and Make updates GHL in a way that re-triggers the same workflow, you’ve built an infinite loop. Use a tag or a field to mark records that have already been processed.</li>
<li><strong>Handle failure.</strong> Decide what happens when the receiving system is down. Make can retry and notify; a silent failure is the worst outcome.</li>
<li><strong>Keep credentials out of the payload.</strong> API keys belong in headers or in the receiving tool’s connection settings.</li>
</ul>
<h2>Keep the payload small and predictable</h2>
<p>Send only the fields the other system needs, with clear names. A payload like this is easy to read in a log six months later:</p>
${note('<p><code>{ "event": "appointment_booked", "contact_id": "…", "email": "jane@example.com", "phone": "+447700900123", "appointment_start": "2026-11-04T15:00:00Z", "source": "ai_caller" }</code></p>')}
<p>An <code>event</code> field is worth adding even if there’s only one event today. When a second one appears, the receiving side can route on it without a new URL.</p>
<h2>When it doesn’t work: a debugging order</h2>
<ol>
<li>Did the request leave? Check the workflow’s execution history in GHL, or the sending tool’s logs.</li>
<li>Did it arrive? Check the receiving side’s history. Make shows every incoming request.</li>
<li>Was the data what you expected? Compare the raw payload with your mapping. A renamed field is a common cause.</li>
<li>Did the action fail after arriving? Look for an error on the step after the trigger, often a missing required field.</li>
</ol>
<p>Going in that order turns “it’s not working” into a specific answer in a few minutes.</p>
<h2>Testing</h2>
<p>Test with realistic records, not “test test”: a contact with an accent in their name, a missing phone number, a duplicate email, an international number. These are the records that will arrive in real life, usually on the first day.</p>
<p>Webhooks are one of the most useful tools in GoHighLevel. Treated carefully, they let GHL connect with almost anything.</p>`
}
];
