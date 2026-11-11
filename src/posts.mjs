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
},
{
 slug:'how-to-audit-a-gohighlevel-account',
 title:'How I audit a GoHighLevel account before changing anything',
 seoTitle:'How to Audit a GoHighLevel Account: A Practical Checklist | Hanzla Amjad',
 description:'The order I review an existing GHL sub-account in: lead sources, pipelines, workflows, fields, messaging and integrations, and how I turn that into a fix list.',
 category:'GoHighLevel setup',published:'2026-11-11',modified:'2026-11-11',
 keywords:['GoHighLevel audit','GHL account review','GHL workflows','pipeline cleanup','CRM audit'],
 related:['gohighlevel-pipeline-stages-that-work','gohighlevel-custom-values-vs-custom-fields','gohighlevel-snapshots-what-transfers'],
 cover:{src:'/assets/projects/ghl-ai-02.webp',width:1459,height:888,alt:'A GoHighLevel routing workflow with condition branches',caption:'An audit is mostly reading workflows like this one and asking what each branch is for.'},
 body:`<p>A lot of projects start with a sentence like “our GHL is a mess, can you fix it?” The tempting answer is to start rebuilding straight away. I don’t. If I change things before I understand them, I can break a follow-up that’s quietly bringing in half the client’s bookings.</p>
<p>So the first piece of work is an audit: a structured read-through of the account that ends in a written list of what to keep, what to fix and what to remove. Here’s the order I work in and what I look for at each step.</p>
<h2>1. Start with where leads come from</h2>
<p>Before opening a single workflow, I list every way a lead can enter the account:</p>
<ul>
<li>Forms and surveys, and which funnel or website page each one sits on.</li>
<li>Calendars people can book directly.</li>
<li>Facebook and Google lead ads, if they’re connected.</li>
<li>Inbound calls, SMS and chat widgets.</li>
<li>Integrations and webhooks from other tools.</li>
<li>Manual imports.</li>
</ul>
<p>For each source I note what should happen next. This becomes the yardstick for everything else. A workflow that doesn’t serve one of these entry points, or a later stage of the journey, is a candidate for removal.</p>
<h2>2. Read the pipelines like a salesperson would</h2>
<p>Next I open each pipeline and ask: if I were on the sales team, would I know what to do with a card in each stage? Common problems:</p>
<ul>
<li><strong>Too many stages</strong>, some of which nobody uses. A stage with zero opportunities for three months is usually dead.</li>
<li><strong>Stages that describe activity, not progress.</strong> “Called once”, “Called twice” and “Called three times” belong in tasks or tags, not in the pipeline.</li>
<li><strong>Several pipelines doing the same job</strong>, often left over from old campaigns.</li>
<li><strong>Opportunities that never move</strong>, because nothing in the workflows updates them.</li>
</ul>
<p>I wrote more about this in <a href="/blog/gohighlevel-pipeline-stages-that-work/">how I design pipeline stages</a>.</p>
<h2>3. Map every published workflow</h2>
<p>This is the longest step. For every published workflow I write down four things: its trigger, its filters, what it does, and whether anything else depends on it. A simple table is enough.</p>
<p>What I’m looking for:</p>
<ul>
<li><strong>Duplicates.</strong> Two workflows triggered by the same form, both sending a welcome SMS. The contact gets two texts and the client wonders why replies dropped.</li>
<li><strong>Conflicts.</strong> One workflow moves an opportunity to “Booked” while another moves it back to “New lead”.</li>
<li><strong>Dead ends.</strong> Workflows that add a tag nothing else uses.</li>
<li><strong>Missing exits.</strong> Nurture sequences that keep messaging people after they’ve booked or bought.</li>
<li><strong>Drafts that should be live</strong>, and live workflows that were only meant for testing.</li>
</ul>
<p>The workflow list sorted by name tells you a lot. If names are random (“Copy of Copy of New Workflow”), the account has grown without a plan, and naming is one of the first things I’ll fix.</p>
<h2>4. Check custom fields, values and tags</h2>
<p>I export or screenshot the field list and look for duplicates like “Budget”, “budget” and “Budget 2”. I check which ones forms actually write to and which ones workflows read from. Unused fields aren’t harmful on their own, but duplicates are: one form writes to the first field, a workflow reads from the second, and the data never meets.</p>
<p>I also check that business details such as phone numbers and booking links live in Custom Values rather than being typed into dozens of templates. If you’re unsure of the difference, see <a href="/blog/gohighlevel-custom-values-vs-custom-fields/">Custom Values vs custom fields</a>.</p>
<h2>5. Messaging foundations</h2>
<p>Workflows only matter if their messages arrive. I check:</p>
<ul>
<li>Which phone numbers are in use and whether A2P registration is approved for US texting.</li>
<li>Whether email is sent from a properly set-up sending domain, not a shared default.</li>
<li>Whether DND and opt-out handling works, so people who reply STOP stop getting messages.</li>
<li>Missed call, reminder and no-show workflows, which are often the most valuable and the most neglected.</li>
</ul>
<p>Problems here explain a lot of “the automation isn’t working” complaints. The automation is fine; the message is being filtered.</p>
<h2>6. Integrations and connected accounts</h2>
<p>Finally, I list every connected service: Google, Facebook, Stripe, Zapier or Make scenarios, webhooks and anything using the API. For each one I check that it still works, who owns the login, and what breaks if it disconnects. An integration connected through a former employee’s account is a problem waiting to happen.</p>
<h2>7. Test the main journeys</h2>
<p>With the map in hand, I submit test leads through the main entry points and follow them. Did the contact get created once? Did the right tags and fields fill in? Did the opportunity appear in the right stage? Did the messages arrive, in the right order, from the right number? This catches what reading alone misses.</p>
<h2>What the client gets</h2>
<p>The output is a short document in plain language, grouped into three lists:</p>
<ol>
<li><strong>Fix now</strong>: anything losing leads or messaging people incorrectly.</li>
<li><strong>Improve</strong>: clean-up that makes the account easier to run, like naming and duplicate fields.</li>
<li><strong>Consider</strong>: new automations or integrations that would help, with a rough scope.</li>
</ol>
<p>Sometimes the conclusion is that a rebuild is the right call. More often, a dozen targeted fixes get the account working properly, and the client keeps everything that was already doing its job.</p>
<h2>Doing a quick version yourself</h2>
<p>If you only have an hour, do steps 1, 3 and 7: list your lead sources, check your published workflows for duplicates and missing exits, and push one test lead through your main form. You’ll find most of the serious problems that way.</p>`
},
{
 slug:'gohighlevel-pipeline-stages-that-work',
 title:'Designing GoHighLevel pipeline stages your team will actually use',
 seoTitle:'GoHighLevel Pipeline Stages: How to Design Them Well | Hanzla Amjad',
 description:'How I plan GHL pipelines: stages that show progress, clear entry and exit rules, automation that moves opportunities, and when to use a second pipeline.',
 category:'GoHighLevel setup',published:'2026-11-11',modified:'2026-11-11',
 keywords:['GoHighLevel pipeline','GHL opportunities','pipeline stages','CRM setup','sales pipeline'],
 related:['how-to-audit-a-gohighlevel-account','gohighlevel-ai-booking-agent-workflow','gohighlevel-snapshots-what-transfers'],
 cover:{src:'/assets/projects/ghl-ai-06.webp',width:866,height:894,alt:'A GoHighLevel workflow reacting to an appointment status change',caption:'Workflows like this one keep opportunities in the right stage without anyone dragging cards.'},
 body:`<p>A pipeline is the part of GoHighLevel that a sales team looks at every day. If it’s designed well, anyone can open it and see where every deal stands. If it isn’t, people stop trusting it, keep their own spreadsheet and the CRM slowly becomes a contact list.</p>
<p>These are the rules I follow when I set one up for a client.</p>
<h2>Stages describe progress, not activity</h2>
<p>A stage should answer “how close is this person to buying?” not “what did we last do?” Compare:</p>
<ul>
<li><strong>Activity stages:</strong> Called, Texted, Emailed, Called again.</li>
<li><strong>Progress stages:</strong> New lead, Contacted, Appointment booked, Showed, Proposal sent, Won, Lost.</li>
</ul>
<p>Calls and messages are already in the conversation history. Tasks can remind someone to follow up. The pipeline should show movement towards a decision.</p>
<h2>Fewer stages than you think</h2>
<p>Most service businesses I work with need between five and eight stages. Every extra stage is another place for a card to get stuck and another decision someone has to make. If two stages always contain the same people, merge them.</p>
<p>A simple test: for each stage, can you say in one sentence what has to be true for an opportunity to be there? If you can’t, the stage isn’t clear enough.</p>
<h2>Write entry and exit rules</h2>
<p>For each stage I agree with the client:</p>
<ul>
<li><strong>How a card gets in.</strong> For example, “Appointment booked” is entered when a calendar booking is confirmed.</li>
<li><strong>How it gets out.</strong> It moves to “Showed” when the appointment is marked showed, or to “No-show” if it isn’t.</li>
<li><strong>Who owns it</strong> while it’s there.</li>
<li><strong>How long is too long.</strong> A card sitting in “Proposal sent” for 14 days probably needs a nudge.</li>
</ul>
<p>Writing this down takes half an hour and saves weeks of arguments about why the numbers don’t add up.</p>
<h2>Let workflows move the cards</h2>
<p>People forget to drag cards. Workflows don’t. Wherever an event in GHL tells you the stage has changed, automate the move:</p>
<ul>
<li>Form submitted: create the opportunity in “New lead”.</li>
<li>First reply received: move to “Contacted”.</li>
<li>Appointment booked: move to “Appointment booked”.</li>
<li>Appointment status changes to showed or no-show: move accordingly.</li>
<li>Invoice paid: move to “Won”.</li>
</ul>
<p>In the <a href="/blog/gohighlevel-ai-booking-agent-workflow/">AI booking setup</a>, appointment-status triggers do exactly this, and they also pull the contact out of any nurture sequence once they’ve booked. Keep manual moves for the judgement calls, like deciding a deal is lost.</p>
<h2>Make “Lost” useful</h2>
<p>A lost deal is information. I add a required lost reason, either as the opportunity’s lost reason or a dropdown custom field: price, timing, chose a competitor, no response, not a fit. After a few months the client can see why deals don’t close, which is far more useful than a growing pile of grey cards.</p>
<p>Lost doesn’t have to mean forgotten. A reactivation workflow can reach out to “timing” losses after a few months.</p>
<h2>One pipeline or several?</h2>
<p>Use a second pipeline when the journey is genuinely different, not just the product. Common examples:</p>
<ul>
<li>Sales and onboarding. Once a deal is won, a new opportunity starts in an onboarding pipeline with its own stages.</li>
<li>Different services with different steps, like a quick consultation versus a long project with a proposal.</li>
<li>Recruitment or partner enquiries that shouldn’t clutter sales.</li>
</ul>
<p>If two pipelines have the same stages, they should probably be one pipeline with a tag or a source field to tell them apart.</p>
<h2>Use opportunity values</h2>
<p>Even a rough value on each opportunity turns the pipeline into a forecast. Set a default value per service if exact amounts aren’t known yet, and update it when a proposal goes out. GHL’s reporting can then show the value sitting in each stage, which tells a business owner much more than a count of cards.</p>
<h2>Build it with the people who use it</h2>
<p>I sketch the stages and rules, then walk the team through them before building anything. They know which steps really happen and which only exist on paper. A pipeline that matches how people already work gets used. One that matches a template from the internet usually doesn’t.</p>
<h2>A starting point</h2>
<p>If you need somewhere to begin, this works for many appointment-based businesses:</p>
<ol>
<li>New lead</li>
<li>Contacted</li>
<li>Appointment booked</li>
<li>Showed</li>
<li>Proposal or quote sent</li>
<li>Won</li>
<li>Lost (with reason)</li>
</ol>
<p>Add a “No-show” stage if no-shows are common and need their own follow-up. Then adjust it to your process, not the other way round.</p>`
},
{
 slug:'gohighlevel-email-sending-domain-setup',
 title:'Setting up a dedicated email sending domain in GoHighLevel',
 seoTitle:'GoHighLevel Email Sending Domain Setup (Mailgun & DNS) | Hanzla Amjad',
 description:'Why a dedicated sending subdomain matters for GHL email deliverability, the DNS records involved, how I verify them, and what to warm up and monitor after.',
 category:'Email & deliverability',published:'2026-11-11',modified:'2026-11-11',
 keywords:['GoHighLevel email','sending domain','Mailgun','SPF DKIM DMARC','email deliverability'],
 related:['a2p-10dlc-registration-gohighlevel-approval','how-to-audit-a-gohighlevel-account','gohighlevel-snapshots-what-transfers'],
 cover:null,
 body:`<p>Email domain setup was a regular part of my account setup work at Wingman and Top Lion Marketing. It’s one of those tasks nobody notices when it’s done right. When it’s skipped, emails land in spam, open rates look terrible and everyone blames the copy.</p>
<p>This guide covers why a dedicated sending domain matters in GoHighLevel, the DNS records involved and the checks I do afterwards.</p>
${note('<p>GoHighLevel offers its own email service and also supports Mailgun. The screens and options change over time, so follow the current setup wizard in your account. The principles below apply either way.</p>')}
<h2>Why not just use the default?</h2>
<p>Out of the box, a new sub-account can send email on shared settings. That’s fine for testing. For real campaigns it means your reputation is mixed with other senders, and recipients’ mail servers can’t confirm that you’re allowed to send for your own domain.</p>
<p>A dedicated sending domain fixes that. Mail servers can check that the email really comes from you, and your sending reputation builds up on your own domain over time.</p>
<h2>Use a subdomain</h2>
<p>I always use a subdomain for sending, something like <code>mail.yourbusiness.com</code> or <code>mg.yourbusiness.com</code>, rather than the main domain. Two reasons:</p>
<ul>
<li><strong>It protects your main domain.</strong> If a marketing campaign gets complaints, the impact is mostly limited to the subdomain, not the domain you use for everyday email.</li>
<li><strong>It avoids DNS clashes.</strong> Your main domain already has records for Google Workspace or Microsoft 365. A subdomain keeps the sending records separate.</li>
</ul>
<p>The visible “from” address can still be <code>you@yourbusiness.com</code>. The subdomain works behind the scenes.</p>
<h2>The DNS records</h2>
<p>The setup screen gives you a set of records to add at your DNS provider, such as Cloudflare, GoDaddy or Namecheap. They usually include:</p>
<ul>
<li><strong>SPF</strong> (a TXT record): lists which servers may send email for the subdomain.</li>
<li><strong>DKIM</strong> (a TXT or CNAME record): a public key that lets receivers check each email’s signature.</li>
<li><strong>MX records</strong>: so replies and bounces for the sending subdomain can be handled.</li>
<li><strong>Tracking CNAME</strong>: used for open and click tracking links.</li>
</ul>
<p>Copy each value exactly. The most common mistakes I fix are small ones:</p>
<ul>
<li>Adding the full domain in the “name” field when the DNS provider adds it automatically, which creates <code>mg.yourbusiness.com.yourbusiness.com</code>.</li>
<li>Creating a second SPF record instead of editing the existing one. A domain should have only one SPF record.</li>
<li>Leaving Cloudflare’s proxy (the orange cloud) on for a CNAME that needs to be DNS-only.</li>
<li>Missing a character when copying a long DKIM key.</li>
</ul>
<h2>Add DMARC on the main domain</h2>
<p>DMARC tells receiving servers what to do with email that fails checks. Major mailbox providers now expect bulk senders to have one. If the domain doesn’t have a DMARC record, I add a cautious one to start with, a TXT record at <code>_dmarc.yourbusiness.com</code> with a policy of <code>p=none</code> and a reporting address. Once the reports show that legitimate email passes, the policy can be tightened.</p>
<h2>Verify, then check properly</h2>
<p>DNS changes can take anything from minutes to a day or two to spread. Once the setup screen shows the records as verified, I do a real check:</p>
<ol>
<li>Send a test email from a GHL workflow to a Gmail address and an Outlook address.</li>
<li>In Gmail, open “Show original” and check that SPF, DKIM and DMARC all say PASS.</li>
<li>Check that links are using the tracking subdomain and work.</li>
<li>Reply to the email and make sure the reply reaches the right inbox.</li>
</ol>
<p>If DKIM fails, it’s almost always a copy mistake in the key. If SPF fails, check for duplicate SPF records.</p>
<h2>Warm it up</h2>
<p>A brand-new sending domain has no reputation. Sending 10,000 emails from it on day one looks like spam behaviour. I start with the most engaged contacts, people who opted in recently or have opened before, and increase volume gradually over a few weeks.</p>
<h2>Keep lists clean</h2>
<p>Good DNS gets you in the door. List quality keeps you there:</p>
<ul>
<li>Only email people who opted in.</li>
<li>Remove hard bounces straight away; GHL marks them, so exclude them in your filters.</li>
<li>Stop emailing people who haven’t opened in months, or run a short re-engagement sequence first.</li>
<li>Always include a working unsubscribe link and honour it.</li>
</ul>
<h2>What to watch afterwards</h2>
<p>Keep an eye on bounce rates, spam complaints and opens in GHL’s email reporting. A sudden jump in bounces usually means a bad list was imported. A drop in opens across the board can mean you’re landing in spam. Google’s Postmaster Tools can also show your domain’s reputation with Gmail once you send enough volume.</p>
<h2>Same idea as SMS</h2>
<p>Email domain setup is the email version of <a href="/blog/a2p-10dlc-registration-gohighlevel-approval/">A2P registration for SMS</a>: identity first, then permission, then sensible volume. Get those right, and your automations actually reach people.</p>`
},
{
 slug:'ai-voice-receptionist-retell-n8n-cal-com',
 title:'Building an AI voice receptionist with Retell AI, n8n and Cal.com',
 seoTitle:'AI Voice Receptionist with Retell AI, n8n & Cal.com | Hanzla Amjad',
 description:'How I built a phone receptionist that checks live availability, books, reschedules and cancels appointments mid-call, then confirms on WhatsApp and email.',
 category:'Voice AI',published:'2026-11-11',modified:'2026-11-11',
 keywords:['AI voice receptionist','Retell AI','n8n','Cal.com','appointment booking','Twilio WhatsApp'],
 related:['retell-ai-gohighlevel-outbound-calls-make','whatsapp-ai-booking-agent-n8n-twilio','medspa-ai-lead-scoring-gohighlevel-n8n'],
 cover:{src:'/assets/projects/blog/voice-receptionist-flow.webp',width:1580,height:490,alt:'n8n workflow receiving Retell function calls and booking through Cal.com',caption:'The first version: one webhook that checks availability or books, then confirms on WhatsApp.'},
 body:`<p>A voice receptionist only feels useful if it can actually do things while the caller is on the line. Answering questions is easy. Checking the real calendar, booking a slot and confirming it before the caller hangs up is the part that takes some thought.</p>
<p>I’ve built this twice. The first version booked discovery calls. The second handled the whole appointment lifecycle: checking the day’s schedule, booking, rescheduling, cancelling and finding an existing booking. Both use the same idea: Retell AI runs the conversation, and n8n does everything the agent needs to look up or change.</p>
<h2>How the pieces fit</h2>
<ul>
<li><strong>Retell AI</strong> hosts the voice agent: the prompt, the voice and the functions it may call.</li>
<li><strong>n8n</strong> receives every function call on one webhook and decides what to do.</li>
<li><strong>Cal.com</strong> holds the real availability and the bookings.</li>
<li><strong>Google Sheets</strong> logs every lead and booking.</li>
<li><strong>Twilio</strong> sends the WhatsApp confirmation, and Gmail sends an email copy.</li>
</ul>
<p>The important rule: the agent never invents a time. It only offers slots that came back from Cal.com, so it can’t promise something that’s already taken.</p>
<h2>The call script</h2>
<p>The first agent ran on GPT-4.1 mini in Retell with an English (US) voice. Retell showed roughly 820 to 1,000 ms of latency for that setup, which sounds natural on a phone call. The script was short:</p>
<ol>
<li><strong>Greet</strong> and introduce itself as the AI receptionist.</li>
<li><strong>Collect</strong> name, email (spelled back to confirm), phone and what the caller is interested in.</li>
<li><strong>Check</strong> availability and read back two or three open slots.</li>
<li><strong>Book</strong> the one the caller picks and confirm it.</li>
</ol>
<p>The rules mattered as much as the steps: one or two sentences per reply, casual spoken style, never invent availability, send pricing questions to the discovery call, and ask again rather than guess when something is unclear. Spelling the email back is worth the extra few seconds. A wrong email means the confirmation never arrives.</p>
<h2>One webhook, many functions</h2>
${fig('/assets/projects/blog/voice-receptionist-backend.webp',1600,817,'n8n backend with a Switch routing seven Retell functions to separate branches','The full-lifecycle backend: a Switch sends each function to its own branch, and every branch answers Retell.')}
<p>Every function in Retell posts to the same n8n webhook. A code step reads which function was called, and a Switch sends it down its own branch. The second version had seven:</p>
<ul>
<li><code>check_today_schedule</code>: reads today’s schedule and formats it for the agent.</li>
<li><code>check_availability</code>: gets open slots from Cal.com.</li>
<li><code>book_appointment</code>: creates the booking, logs it, sends WhatsApp and email.</li>
<li><code>save_lead_info</code>: saves the caller’s details even if they don’t book.</li>
<li><code>cancel_appointment</code>: cancels and sends a WhatsApp cancellation.</li>
<li><code>reschedule_appointment</code>: cancels the old booking, creates the new one, sends an update.</li>
<li><code>find_booking</code>: looks up an existing booking.</li>
</ul>
<p>Every branch ends with a Respond to Webhook node. That’s what lets the agent say “you’re booked for Tuesday at 3” while the caller is still listening. In the execution log, a full booking run took under ten seconds; simple lookups took two or three.</p>
<h2>Reschedule safely</h2>
<p>Rescheduling cancels the old booking before it creates the new one. If you create first and cancel second, a failure halfway leaves two bookings for the same person. Cancelling first means the worst case is that the caller hears “I couldn’t book the new time”, which the agent can handle.</p>
<h2>What the caller receives</h2>
<p>Right after the call, the caller gets a WhatsApp message: the confirmed date, time, duration and meeting link, or a cancellation with the booking ID. New bookings also get an email. Having it in writing reduces no-shows and saves the business from “what time did I book?” calls.</p>
<h2>Lessons from the handover</h2>
<ul>
<li><strong>Pin the year carefully.</strong> The prompt told the model which year to use for dates. That needs updating every January, or bookings get requested for the wrong year.</li>
<li><strong>Function names must match exactly.</strong> If Retell sends <code>book_appointment</code> and n8n checks for <code>bookAppointment</code>, nothing happens and the agent stalls.</li>
<li><strong>Every branch needs a response.</strong> In one branch the response step was missing, so the agent never heard the result. It’s an easy miss; test every function, not just booking.</li>
<li><strong>Keep confirmations consistent.</strong> New bookings sent WhatsApp and email, but cancellations only sent WhatsApp. Decide once and apply it to every branch.</li>
<li><strong>Map IDs for tracing.</strong> Store the call ID and booking ID in the sheet, so any booking can be traced back to its call recording.</li>
<li><strong>WhatsApp needs an approved sender.</strong> Twilio’s sandbox is fine for testing, but a live business needs an approved WhatsApp sender and templates.</li>
</ul>
<h2>Where GoHighLevel fits</h2>
<p>This build used Cal.com and Sheets because that’s what the business used. The same pattern works with GoHighLevel: swap Cal.com for the GHL calendar API and Sheets for contacts and opportunities. I covered the outbound version, where the AI calls new GHL leads, in <a href="/blog/retell-ai-gohighlevel-outbound-calls-make/">connecting Retell AI calls to GoHighLevel</a>.</p>`
},
{
 slug:'whatsapp-ai-booking-agent-n8n-twilio',
 title:'A WhatsApp AI booking agent with memory, built in n8n',
 seoTitle:'WhatsApp AI Booking Agent with n8n, Twilio & Groq | Hanzla Amjad',
 description:'How a single n8n flow lets customers book by WhatsApp chat: conversation memory in Google Sheets, pricing in the prompt and a booking reference at the end.',
 category:'AI chat agents',published:'2026-11-11',modified:'2026-11-11',
 keywords:['WhatsApp AI agent','n8n','Twilio WhatsApp','Groq','chatbot booking','conversation memory'],
 related:['multi-agent-sms-booking-system-n8n','ai-voice-receptionist-retell-n8n-cal-com','ai-sms-sales-assistant-human-handoff-gohighlevel'],
 cover:{src:'/assets/projects/blog/whatsapp-booking-agent.webp',width:1600,height:548,alt:'n8n workflow for a WhatsApp booking agent with Twilio, Google Sheets and a Groq chat model',caption:'The whole agent in one n8n flow, with each message handled in a few seconds.'},
 body:`<p>For a pet grooming business, most bookings start with a message like “do you have time for a full groom this Saturday?” This project let customers book entirely by WhatsApp chat. The agent remembers the dog, quotes the right price and confirms with a booking reference.</p>
<h2>The flow, step by step</h2>
<p>Twilio calls an n8n webhook for every incoming WhatsApp message. From there:</p>
<ol>
<li><strong>Parse the message</strong>: who sent it and what they said.</li>
<li><strong>Load the conversation history</strong> for that phone number from Google Sheets.</li>
<li><strong>Build the prompt</strong>: history, the new message, the service menu, prices and opening hours.</li>
<li><strong>Ask the model</strong> (a Groq-hosted chat model in a Basic LLM Chain) for the next reply and the customer’s intent.</li>
<li><strong>Check if it’s ready to book</strong>: are the service, day and time all known? If so, create a booking reference.</li>
<li><strong>Send the reply</strong> through the Twilio API.</li>
<li><strong>Log the exchange</strong> to Google Sheets and close the webhook.</li>
</ol>
<p>In the execution log, each message took between about 2.5 and 5.6 seconds end to end. On WhatsApp that feels like a person typing quickly.</p>
<h2>Memory without a database</h2>
<p>The agent needs to remember that “Max” is a German Shepherd and that the customer asked for a full groom three messages ago. Rather than run a separate database, the same Google Sheet that logs every message is read back on the next one. Each row stores the timestamp, phone, name, message, detected intent and AI reply, plus booking status and confirmation number.</p>
<p>It’s simple, cheap and easy for the business to inspect. The trade-off is that the sheet grows with every message, so the history step should only read the last few exchanges for that number. Otherwise replies slow down over time.</p>
<h2>Pricing the model can’t get wrong</h2>
<p>The price list lives in the prompt: full groom for small, medium and large dogs, bath and brush, nail trims and add-ons. When a customer mentions a breed, the agent places the dog in a size and quotes from the list. In testing, a German Shepherd was correctly placed in “large” and quoted the large-dog price, with the opening hours and the shop address in the confirmation.</p>
<p>Keeping prices in one place, the Build Prompt step, means updating the menu is a single edit. The downside is that someone has to remember to make it.</p>
<h2>What I’d change before going fully live</h2>
<p>The handover listed a few things honestly, and they’re useful for anyone building something similar:</p>
<ul>
<li><strong>Convert relative dates.</strong> The agent confirmed “this Saturday”. Staff need a real date, so the booking step should turn relative days into calendar dates before saving.</li>
<li><strong>Connect a real calendar.</strong> The booking reference was generated, but not written to a calendar. Without that, two customers could get the same slot. A calendar or booking tool should be the source of truth for availability.</li>
<li><strong>Limit history.</strong> Read only recent messages for each number.</li>
<li><strong>Use an approved sender.</strong> Twilio’s WhatsApp sandbox only talks to numbers that joined it. A real business needs an approved WhatsApp sender.</li>
</ul>
<h2>Writing the prompt for a chat agent</h2>
<p>A WhatsApp conversation is short and informal, so the instructions say so: short replies, one question at a time, no long menus pasted into a chat bubble. The prompt also tells the model exactly when a booking is complete (service, day and time all known) so it doesn’t confirm too early. And it returns an intent alongside the reply, which is what the “ready to book?” check reads. Asking the model for a reply and a label in one response keeps the flow to a single call per message.</p>
<h2>When a single flow is enough</h2>
<p>For a small business with one main job, booking, a single flow with one model is easier to build and maintain than a multi-agent system. When conversations get more varied, with questions, complaints, rescheduling and escalation, splitting the work between specialised agents starts to pay off. I did exactly that for SMS in <a href="/blog/multi-agent-sms-booking-system-n8n/">a multi-agent booking system</a>.</p>
<h2>Bringing it into GoHighLevel</h2>
<p>If the business runs on GoHighLevel, the same flow can read and write GHL conversations and contacts through the API instead of Sheets, and book into a GHL calendar. The logic stays the same: load context, generate a reply, check if there’s enough to book, then act.</p>`
},
{
 slug:'multi-agent-sms-booking-system-n8n',
 title:'Four AI agents, one SMS inbox: a multi-agent booking system in n8n',
 seoTitle:'Multi-Agent SMS Booking System with n8n & OpenAI | Hanzla Amjad',
 description:'How I split SMS handling between four AI agents with structured outputs: intent routing, booking against a real calendar, customer care and one voice for every reply.',
 category:'AI chat agents',published:'2026-11-11',modified:'2026-11-11',
 keywords:['multi-agent AI','n8n AI agents','SMS booking','OpenAI structured output','Twilio SMS','Google Calendar'],
 related:['whatsapp-ai-booking-agent-n8n-twilio','ai-sms-sales-assistant-human-handoff-gohighlevel','ai-voice-receptionist-retell-n8n-cal-com'],
 cover:{src:'/assets/projects/blog/multi-agent-sms.webp',width:1600,height:417,alt:'n8n workflow with four AI agents, a switch, calendar checks and Twilio SMS',caption:'The full workflow: intake and routing on the left, the booking branch at the top, every path meeting at the final agent.'},
 body:`<p>One big prompt that handles everything (bookings, questions, complaints, small talk) gets long, slow and unpredictable. For a pet grooming business’s SMS line, I split the work between four AI agents in one n8n workflow. Each has one job and returns structured data, not free text.</p>
<h2>The four agents</h2>
<ul>
<li><strong>Agent 1, Conversation:</strong> reads the new text with the customer’s history and decides what they need.</li>
<li><strong>Agent 2, Booking specialist:</strong> works out the service and preferred time, using the price list and booking data.</li>
<li><strong>Agent 3, Customer care:</strong> answers questions that aren’t bookings.</li>
<li><strong>Agent 4, Master SMS coordinator:</strong> writes the final text the customer receives, whichever path the message took.</li>
</ul>
<p>Every agent has its own output parser. That’s the detail that makes this reliable: the next step always gets clean fields like <code>intent</code>, <code>service</code> or <code>preferred_time</code>, never a paragraph it has to interpret.</p>
<h2>Stage 1: intake and routing</h2>
<p>Twilio posts each incoming SMS to a webhook. The workflow extracts the number and text, logs the message, loads that customer’s conversation context from Google Sheets, and hands everything to Agent 1. After Agent 1, the customer record is updated with anything new it learned, and a Switch routes the message down one of four paths:</p>
<ul>
<li><strong>Booking</strong>: to Agent 2 and the calendar check.</li>
<li><strong>Customer question</strong>: to Agent 3.</li>
<li><strong>Simple reply</strong>: a direct response, no extra agent needed.</li>
<li><strong>Needs a person</strong>: an escalation.</li>
</ul>
<h2>Stage 2: booking against the real calendar</h2>
<p>The booking branch loads the price list, checks there’s enough information, and asks Agent 2 to work out what the customer wants. When it’s time to look for slots, the workflow checks Google Calendar availability, finds open times, aggregates them and picks the best three to offer. The customer is also created or updated in HubSpot.</p>
<p>The model never decides which times are free. The calendar does. The agent’s job is understanding the request; the calendar’s job is the truth about availability. Mixing those two is how bots end up double-booking.</p>
<h2>Stage 3: one voice for every reply</h2>
<p>All four paths meet at Agent 4. It takes whatever the upstream step produced (three slots, an answer, an escalation note) and writes the SMS. Because one agent writes every message, the tone is the same whether the booking agent or the customer-care agent did the work. The text goes out through Twilio, is logged, and the conversation state is updated so the next message picks up where this one ended.</p>
<h2>Why split it up?</h2>
<ul>
<li><strong>Shorter prompts</strong> are easier to test and change without side effects.</li>
<li><strong>Structured outputs</strong> make every hand-off predictable.</li>
<li><strong>Different models per job</strong> become possible: a cheaper model for routing, a stronger one for writing.</li>
<li><strong>Debugging is easier.</strong> If a reply is wrong, the execution log shows which agent produced the wrong data.</li>
</ul>
<h2>What still needed doing at handover</h2>
<p>I listed these openly, and they’re the gaps anyone copying the pattern should check:</p>
<ul>
<li><strong>Create the event.</strong> The booking path found and offered slots, but no step created the calendar event after the customer picked one. Without it, bookings never reach the calendar.</li>
<li><strong>Decide who handles escalations.</strong> The escalation path prepared a message but didn’t notify anyone yet.</li>
<li><strong>Keep parsers in sync.</strong> If a prompt changes the fields an agent returns, its output parser and the parse step after it must change too.</li>
<li><strong>Don’t rearrange the sheet.</strong> Conversation state lived in Google Sheets, so the column structure has to stay fixed.</li>
<li><strong>Check CRM credentials</strong> before going live.</li>
</ul>
<h2>Testing a multi-agent flow</h2>
<p>I test each path separately before testing the whole thing. A set of sample texts covers every route: a clear booking request, a vague one (“sometime next week?”), a price question, a complaint and an opt-out. For each, the execution log shows what Agent 1 decided and what each later agent returned. If the routing is wrong, the fix is in Agent 1’s prompt; if the slots are wrong, it’s the calendar step; if the tone is off, it’s Agent 4. Splitting the work makes problems easy to locate.</p>
<h2>When to use this pattern</h2>
<p>For a single, focused job, a <a href="/blog/whatsapp-ai-booking-agent-n8n-twilio/">single-agent flow</a> is simpler. Once messages vary a lot and some need a human, a multi-agent design keeps each part manageable. The same structure works with GoHighLevel as the CRM and calendar; only the integration nodes change.</p>`
},
{
 slug:'medspa-ai-lead-scoring-gohighlevel-n8n',
 title:'AI lead scoring for a med spa: GoHighLevel, n8n, OpenAI and Retell',
 seoTitle:'AI Lead Scoring in GoHighLevel with n8n & OpenAI | Hanzla Amjad',
 description:'A med spa system where every new GHL lead is scored HOT, WARM or COLD by OpenAI in n8n, HOT leads get an instant AI call, and six workflows run the client journey.',
 category:'GoHighLevel + AI',published:'2026-11-11',modified:'2026-11-11',
 keywords:['AI lead scoring','GoHighLevel','n8n','OpenAI','Retell AI','med spa marketing'],
 related:['retell-ai-gohighlevel-outbound-calls-make','gohighlevel-pipeline-stages-that-work','gohighlevel-ai-booking-agent-workflow'],
 cover:{src:'/assets/projects/blog/medspa-lead-scoring.webp',width:1600,height:353,alt:'n8n flow that scores a GoHighLevel lead with OpenAI and triggers a Retell call for hot leads',caption:'The scoring engine: GHL sends the lead, OpenAI scores it, HOT leads get a call.'},
 body:`<p>Not every lead deserves the same effort at the same moment. Someone who filled in a consultation form asking about a specific treatment this week is very different from someone browsing prices. This system for a med spa scores every new lead with AI the moment it arrives, calls the hottest ones straight away, and lets GoHighLevel handle the rest of the journey.</p>
<h2>Who does what</h2>
<ul>
<li><strong>GoHighLevel</strong> captures the lead, holds the pipeline and runs the client-facing follow-up.</li>
<li><strong>n8n</strong> sits in the middle and does the AI work.</li>
<li><strong>OpenAI</strong> scores each lead HOT, WARM or COLD.</li>
<li><strong>Retell AI</strong> makes an outbound voice call to HOT leads.</li>
</ul>
<h2>The scoring engine</h2>
<p>When the form is submitted, a GHL workflow sends the lead to an n8n webhook. The flow then:</p>
<ol>
<li>Parses the details the model needs: service of interest, source and the form answers.</li>
<li>Asks OpenAI to score the lead HOT, WARM or COLD.</li>
<li>Parses the response and writes the score back to an <strong>AI Lead Score</strong> custom field on the GHL contact.</li>
<li>Routes by tier. HOT triggers a Retell outbound call. WARM and COLD get a tag, so GHL follows up at the right pace.</li>
<li>Responds to the webhook, confirming the lead was processed.</li>
</ol>
<p>Only HOT leads get a call. That keeps the voice agent’s time, and the call costs, focused on the people most likely to book, while everyone else still gets a follow-up that fits.</p>
<h2>A pipeline that shows the journey</h2>
<p>The client journey pipeline has seven stages: New Lead, AI Scored, Call Attempted, Consultation Booked, Appointment Completed, Review Requested and Lost. The “AI Scored” stage sits right after New Lead, so the team can see at a glance that scoring happened. I wrote more about designing stages like this in <a href="/blog/gohighlevel-pipeline-stages-that-work/">pipeline stages your team will use</a>.</p>
<h2>Six lifecycle workflows</h2>
${fig('/assets/projects/blog/medspa-workflows.webp',1560,710,'GoHighLevel workflow list with six published lifecycle workflows','Six published workflows, each covering one moment in the client journey.')}
<p>Everything after scoring runs in GHL, one workflow per moment:</p>
<ul>
<li><strong>New Lead, Form Submission</strong>: creates the opportunity and sends the first SMS and email.</li>
<li><strong>Missed Call Text Back</strong>: texts anyone whose call was missed.</li>
<li><strong>Appointment Reminder Sequence</strong>: reminds clients before their consultation.</li>
<li><strong>Post-Appointment Review Request</strong>: asks for a review after the visit.</li>
<li><strong>Lead Reactivation, 90 Day</strong>: brings back leads and clients who went quiet.</li>
<li><strong>Referral System</strong>: asks happy clients to refer friends.</li>
</ul>
<p>Keeping them separate means the spa can pause referral requests during a busy month without touching reminders.</p>
<h2>What a new lead looks like</h2>
<p>When a Facebook lead submits the consultation form, within moments the contact is tagged, an opportunity appears in the pipeline, the lead receives a welcome SMS and a confirmation email, and the AI Lead Score field shows the result from n8n. The front desk opens one record and sees everything.</p>
<h2>Things to watch</h2>
<ul>
<li><strong>Don’t rename the score field.</strong> Workflows and smart lists filter on AI Lead Score. Rename it and they quietly stop matching.</li>
<li><strong>Test scoring changes.</strong> Editing the scoring prompt changes who gets called. Run a handful of sample leads through it before publishing.</li>
<li><strong>Keep the webhook URL in sync.</strong> If the n8n flow is moved or republished, update the URL in the GHL workflow.</li>
<li><strong>Verify the SMS sender</strong>, so the first text goes out without a retry.</li>
</ul>
<h2>Writing a scoring prompt</h2>
<p>A useful scoring prompt is specific about what each tier means for this business. HOT might be “asked about a specific treatment and wants to book within two weeks”; WARM “interested but no timeframe”; COLD “price shopping or outside the service area”. I ask the model to return only the tier and a one-line reason, so the result is easy to parse and the team can see why a lead was scored the way it was. The reason is also the quickest way to spot a prompt that needs adjusting.</p>
<h2>Why score at all?</h2>
<p>Speed to lead matters most for the hottest leads, and calling everyone instantly is expensive and can feel pushy. Scoring lets you spend the expensive, fast response where it counts, and give everyone else a sensible, slower follow-up. The AI doesn’t replace the sales process; it decides the order.</p>`
},
{
 slug:'ai-sms-sales-assistant-human-handoff-gohighlevel',
 title:'An AI SMS sales assistant that knows when to hand off to a person',
 seoTitle:'AI SMS Sales Assistant with Human Handoff in GoHighLevel | Hanzla Amjad',
 description:'How an n8n AI agent replies to new GHL leads by SMS, steps back the moment a rep gets involved, hands off with tracking, and nurtures quiet leads on day 3, 7 and 15.',
 category:'GoHighLevel + AI',published:'2026-11-11',modified:'2026-11-11',
 keywords:['AI SMS assistant','GoHighLevel','n8n','human handoff','lead nurture','speed to lead'],
 related:['medspa-ai-lead-scoring-gohighlevel-n8n','multi-agent-sms-booking-system-n8n','gohighlevel-webhooks-inbound-outbound'],
 cover:{src:'/assets/projects/blog/ai-sms-first-reply.webp',width:1469,height:836,alt:'n8n workflow for an AI first-reply SMS agent with a human intervention check',caption:'The first-reply agent in n8n, with its built-in documentation note.'},
 body:`<p>The fastest reply to a new lead usually wins. But an AI that keeps texting after a salesperson has picked up the conversation is worse than no AI at all. This project, for two service businesses sharing one setup, was built around that balance: reply instantly, qualify, and step back cleanly when a person takes over.</p>
<p>I was the sole technical owner of both GoHighLevel accounts and the n8n instance, and delivered it in five phases over about three months.</p>
<h2>The first reply</h2>
<p>When a lead submits a quote form or sends their first text, a GHL workflow calls an n8n webhook. The first-reply agent then:</p>
<ol>
<li>Parses the form data: contact, vehicle, services of interest, packages.</li>
<li>Finds the GHL conversation and pulls the SMS history.</li>
<li><strong>Checks for human intervention.</strong> If a rep has already texted or called this lead, it adds a handoff tag and stops.</li>
<li>Builds the context for the model, including whether the business is currently open.</li>
<li>Generates a reply with the GPT model.</li>
<li>Checks for one of three outcomes: a normal reply, a handoff, or a stop.</li>
</ol>
<p>A normal reply goes out through the GHL API, so it appears in the same conversation the team uses. A handoff sends a short closing message and tags the contact. A stop (an opt-out) tags the contact and sends nothing.</p>
<h2>The safety net: human intervention</h2>
<p>The human-intervention check compares recent outbound messages and calls against a list of known staff user IDs. Once a rep has engaged, the AI steps back for good. Customers never get mixed messages from a bot and a person.</p>
<p>The catch: when a new rep joins, their user ID has to be added to that list. Otherwise the AI doesn’t recognise them and may reply after they’ve spoken to the lead.</p>
<h2>Handing off, and measuring it</h2>
<p>When the AI decides a person is needed, it adds a handoff tag. That tag starts a GHL workflow which stamps the handoff time on a custom field, splits leads between the two sales reps, makes the rep the contact owner and sends them an internal notification.</p>
<p>A smart list with custom date fields (handoff time, first human touch time and a daily handoff count) lets the team see how quickly a person picks up each lead. That number is what managers actually care about.</p>
<h2>Nurturing leads that go quiet</h2>
${fig('/assets/projects/blog/ai-sms-nurture.webp',1473,835,'Scheduled n8n nurture dispatcher that sends AI-written follow-ups','The nurture dispatcher runs on a schedule and only texts on day 3, 7 and 15.')}
<p>Leads that don’t book go into a nurture stage. A scheduled n8n flow runs every 30 minutes during business hours and:</p>
<ul>
<li>Fetches opportunities in that stage and keeps only those on day 3, 7 or 15.</li>
<li>Skips anyone already texted today, and processes up to 10 per run.</li>
<li>Gathers context: contact and vehicle details, recent SMS, call notes and the current promotion.</li>
<li>Writes a message whose tone changes over time: a casual check-in on day 3, a reference to their situation on day 7, a direct decision question on day 15.</li>
<li>Logs every send to a table for monitoring.</li>
</ul>
<p>A last-message-sent date prevents double sends. Clearing that field by hand would break the schedule, so it’s documented clearly.</p>
<h2>Revenue back in the CRM</h2>
<p>Jobs were run in a separate field-service tool. Booking and payment data (scheduled date and revenue, service type, deposit status and final invoice) was written back onto the GHL opportunity, so sales could see revenue against each lead without leaving the CRM.</p>
<h2>A segmented promotion</h2>
<p>For a seasonal promotion, around 2,500 contacts were split into four groups: past customers or unconverted leads, each with or without a vehicle on file. Each group got its own SMS so the message fit the person. Contacts without a group tag were skipped, which is a simple safeguard against messaging the wrong list.</p>
<h2>What made it work</h2>
<ul>
<li>GHL stayed the one place the team worked from; n8n did the heavy lifting behind it.</li>
<li>The AI had a clear exit: stop, hand off, or reply.</li>
<li>Every automated message was logged, so the team could review what the AI said.</li>
<li>The current offer lived in one variable, so both AI agents mentioned the same promotion.</li>
</ul>`
},
{
 slug:'gohighlevel-time-based-workshop-funnel',
 title:'A 5-day challenge funnel in GoHighLevel that times every message',
 seoTitle:'GoHighLevel Challenge Funnel with Time-Based Workflow Branches | Hanzla Amjad',
 description:'How a GHL registration workflow sends each workshop registrant down a different path depending on when they joined, so every reminder points to a session they can attend.',
 category:'Funnels',published:'2026-11-11',modified:'2026-11-11',
 keywords:['GoHighLevel funnel','challenge funnel','workshop funnel','GHL workflow','time-based branch','webinar reminders'],
 related:['gohighlevel-survey-funnel-lead-qualification','gohighlevel-pipeline-stages-that-work','gohighlevel-email-sending-domain-setup'],
 cover:{src:'/assets/projects/blog/challenge-registration-workflow.webp',width:722,height:671,alt:'GoHighLevel registration workflow with a branch based on time and five paths',caption:'The registration workflow: instant email and SMS, then a branch based on when the person joined.'},
 body:`<p>Live workshops have an awkward problem. People register at all hours, right up to the start, and some even after the first session has begun. If every registrant gets the same reminder sequence, half of them are told about a session that already happened.</p>
<p>For a free online workshop run as a 5-day challenge (three main days plus two bonus sessions), I built the registration workflow around that problem.</p>
<h2>The funnel</h2>
<p>Four pages, in the order people use them:</p>
<ul>
<li><strong>Registration page</strong>: a clear promise, a countdown to the start and a day-by-day agenda, with the opt-in form. It’s set up as the control for a future A/B split test.</li>
<li><strong>Watch page</strong>: where registrants watch the live sessions.</li>
<li><strong>Thank you page</strong>: confirms the registration.</li>
<li><strong>Replays</strong>: for people who missed a session.</li>
</ul>
<h2>The registration workflow</h2>
<p>The trigger is the workshop form submission. The workflow tags the contact and sends Email 1 and SMS 1 straight away, so everyone gets instant confirmation. Then comes the important step: a <strong>branch based on time</strong>, which checks the current day and time and splits registrants into five paths:</p>
<ul>
<li><strong>Before Saturday 10am</strong>: wait until Saturday 10am, then send Email 2.</li>
<li><strong>After Saturday 10am</strong>: send Email 2 immediately, then jump into the main sequence.</li>
<li><strong>Sunday before 7pm</strong>: set the event date to Sunday 7pm, then wait until 8 hours before it.</li>
<li><strong>Sunday after 7pm</strong>: set the event date to Monday 9:30am, then wait until 8 hours before it.</li>
<li><strong>None of the above</strong>: end the workflow.</li>
</ul>
<h2>Why set an event date per branch?</h2>
<p>Each branch sets its own event date. Every reminder after that counts down to the session that person can actually attend, using “wait until X hours before the event” steps. Someone who joins on Sunday night isn’t told “we start in 2 hours” about a session that ended at lunchtime; they’re pointed at Monday morning instead.</p>
<p>This also keeps the rest of the sequence simple. Instead of five full copies of the reminders, the branches set the right timing and then share the main sequence.</p>
<h2>A second way in: the quiz</h2>
<p>A short 60-second quiz offered another entry point. Everyone who submitted it was tagged and received a 7-email nurture sequence with two days between each email. Quiz takers often aren’t ready for a live workshop yet, so a slower sequence suits them better.</p>
<h2>After the workshop</h2>
<p>A separate folder of workflows moved attendees forward: assessment submissions, strategy call bookings, removing people from follow-up once they’d booked a call, and purchase follow-up. At the time of the handover, the most-used ones were the “remove after call booked” workflow, purchase follow-up and the strategy call booking workflow.</p>
<p>The “remove after call booked” workflow matters more than it sounds. Without it, someone who has just booked a strategy call keeps getting “book your call!” emails, which feels careless.</p>
<h2>Running the next challenge</h2>
<ul>
<li><strong>Update branches and event dates together.</strong> The branch conditions are tied to the session times. If the schedule changes, update both, or reminders will point to the wrong session.</li>
<li><strong>Use the split test.</strong> The registration page is already the control, so a new headline can be tested without rebuilding the page.</li>
<li><strong>Check draft workflows.</strong> One follow-up workflow was in draft at handover. If it should run, publish it again.</li>
<li><strong>Check enrollment history.</strong> Each workflow shows exactly who went through it and when, which is the quickest way to answer “did I get the reminder?”</li>
</ul>
<h2>Testing time-based branches</h2>
<p>Time-based logic is the hardest kind to test, because you can’t wait for Sunday evening. I check each branch condition against a written table of “joined at this time, should receive this next”, then use test contacts and the workflow’s enrollment history to confirm which branch each one took. It’s also worth confirming the account’s timezone setting matches the timezone the sessions are advertised in. A one-hour mismatch sends every reminder at the wrong time.</p>
<h2>The general lesson</h2>
<p>Any time-sensitive funnel, whether webinars, launches or limited offers, needs to handle people who arrive late. A time-based branch plus an event date per path is a reliable way to do it in GoHighLevel without duplicating whole sequences.</p>`
},
{
 slug:'gohighlevel-survey-funnel-lead-qualification',
 title:'Qualifying survey leads automatically in GoHighLevel',
 seoTitle:'GoHighLevel Survey Funnel & Lead Qualification Workflows | Hanzla Amjad',
 description:'How a 60-second survey on GHL and Webflow feeds one qualification workflow that tags leads by case type, alerts the team in Slack and keeps consent proof attached.',
 category:'Funnels',published:'2026-11-11',modified:'2026-11-11',
 keywords:['GoHighLevel survey','lead qualification','GHL workflow','Webflow webhook','split test','Slack notification'],
 related:['gohighlevel-time-based-workshop-funnel','gohighlevel-webhooks-inbound-outbound','how-to-audit-a-gohighlevel-account'],
 cover:{src:'/assets/projects/blog/survey-qualification-workflow.webp',width:723,height:780,alt:'GoHighLevel qualification workflow with survey and tag triggers and a branch per case type',caption:'One qualification workflow for two lead sources, with a branch for each case type.'},
 body:`<p>A survey is a good way to qualify leads before anyone picks up the phone. For a personal injury claims brand, people answered a 60-second survey about their accident. The goal was to sort every submission automatically: what type of case is it, does it qualify, and who needs to know.</p>
<h2>Two sources, one set of rules</h2>
<p>The survey ran in two places: a GoHighLevel funnel and a Webflow site. Rather than maintain two sets of qualification logic, both feed the same GHL workflows.</p>
<ul>
<li><strong>GHL survey submissions</strong> trigger the qualification workflow directly.</li>
<li><strong>Webflow submissions</strong> arrive through an inbound webhook. That workflow creates the contact, sends a Slack notification to the team and adds a tag. The tag is what starts the qualification workflow.</li>
</ul>
<p>The Webflow webhook was the busiest workflow in the account, with over 1,500 enrollments at the time of the handover.</p>
<h2>Sorting by case type</h2>
<p>The qualification workflow first tags where the lead came from, then runs a single “Qualification Check” with one branch per case type:</p>
<ul>
<li><strong>Motor vehicle accident</strong></li>
<li><strong>Workers’ compensation</strong></li>
<li><strong>Slip and fall</strong></li>
<li><strong>Medical malpractice</strong></li>
<li><strong>None</strong>: no qualified tag, and the workflow ends.</li>
</ul>
<p>Each branch checks the relevant survey answers, including whether the person is already working with someone on their claim, and adds a case-specific “qualified” tag.</p>
<p>Tagging by case type, rather than a single “qualified” tag, means each type can later be routed to a different team or partner without touching the survey or the funnel.</p>
<h2>A variation for one partner</h2>
<p>One partner only wanted leads from a specific state. Their version of the workflow checks the “which state did the accident happen in?” answer first. Leads from that state go through the qualification check with partner-specific tags; everyone else is updated and sent through the general logic. Four triggers (two survey triggers and two tag triggers) make sure both sources are covered.</p>
<h2>The funnel and the split test</h2>
<p>The GHL funnel has three steps: the survey page, a thank you page for qualified leads and one for leads that don’t qualify. Sending people to different thank you pages lets each audience get an appropriate next step, and lets ad platforms track qualified conversions separately.</p>
<p>The survey page has a control and a variation with a different headline, ready for a split test. The page itself opens with the survey right under the headline, with a three-step progress bar, followed by trust points, testimonials, an explanation of why acting quickly matters, and an FAQ.</p>
<h2>Keeping consent proof attached</h2>
<p>Each Webflow submission arrives with a TrustedForm certificate URL, which records the consent given when the form was submitted. In lead generation, that proof matters. Keeping it mapped onto the contact means it’s there if anyone ever asks how the lead opted in.</p>
<h2>Designing the survey itself</h2>
<p>The order of questions matters. The survey starts with easy questions, like what happened and when, before asking anything personal. Contact details come last, once someone has invested a minute in answering. Each answer that decides qualification is a fixed choice rather than free text, so the workflow can check it reliably. Free text is useful for context, but a branch condition can’t dependably read “I think it was about two years ago, maybe less”.</p>
<p>A progress bar with only three steps keeps it feeling short, which helps completion more than any headline change.</p>
<h2>Before sending traffic</h2>
<ul>
<li><strong>Connect a domain</strong> to the funnel.</li>
<li><strong>Start the split test</strong> and choose the traffic split when you’re ready.</li>
<li><strong>Keep tag names fixed.</strong> The Webflow tag starts qualification. If it’s renamed, update the tag triggers in both qualification workflows.</li>
<li><strong>Update branches with the survey.</strong> If a question or answer is reworded, the matching branch condition must change too, or leads quietly stop qualifying.</li>
</ul>
<h2>The pattern in short</h2>
<p>Collect answers in as many places as you need, bring everything into GoHighLevel with webhooks, qualify in one shared workflow, tag by category rather than a single yes or no, and notify the team the moment a lead arrives. For more on the webhook side, see <a href="/blog/gohighlevel-webhooks-inbound-outbound/">webhooks in GoHighLevel</a>.</p>`
}
];
