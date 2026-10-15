export const projects = [
  {
    "id": "ghost",
    "category": "CONTENT AUTOMATION",
    "title": "Publish once. Reach your audience.",
    "name": "Ghost to GoHighLevel Email Automation",
    "description": "A published Ghost post becomes a personalised email for the right GHL contacts. Make processes the content, updates Custom Values and triggers the email workflow.",
    "tools": [
      "Ghost",
      "Make.com",
      "GoHighLevel"
    ],
    "flow": [
      "Post published",
      "Content processed",
      "Custom Values updated",
      "Tagged contacts emailed"
    ],
    "slides": [
      {
        "src": "/assets/projects/ghost-01.webp",
        "label": "01 · The complete publishing workflow",
        "description": "Ghost triggers the Make scenario. Content passes through parsing, CRM updates and the delivery steps.",
        "width": 1600,
        "height": 791
      },
      {
        "src": "/assets/projects/ghost-02.webp",
        "label": "02 · Prepare the post content",
        "description": "Text parsers prepare embedded content for the email template.",
        "width": 1600,
        "height": 790
      },
      {
        "src": "/assets/projects/ghost-03.webp",
        "label": "03 · Store content in GHL",
        "description": "The post content and subject are stored in GoHighLevel Custom Values.",
        "width": 1600,
        "height": 517
      },
      {
        "src": "/assets/projects/ghost-04.webp",
        "label": "04 · Build the email dynamically",
        "description": "The GHL email uses Custom Values so each send contains the published post.",
        "width": 1212,
        "height": 869
      },
      {
        "src": "/assets/projects/ghost-05.webp",
        "label": "05 · Monitor the automation",
        "description": "The scenario history provides a record of runs and successful executions.",
        "width": 1600,
        "height": 795
      }
    ]
  },
  {
    "id": "ghl-ai",
    "category": "CRM + CONVERSATIONAL AI",
    "title": "From a new lead to a booked appointment.",
    "name": "GHL Automation & AI Booking Agent",
    "description": "A complete lead journey inside GoHighLevel. Forms start the automation, an AI agent handles conversations and booking, and workflows manage the appointment follow-through.",
    "tools": [
      "GoHighLevel",
      "Conversation AI",
      "Workflows"
    ],
    "flow": [
      "Lead captured",
      "AI conversation",
      "Appointment booked",
      "Follow-up managed"
    ],
    "slides": [
      {
        "src": "/assets/projects/ghl-ai-01.webp",
        "label": "01 · Capture and qualify the lead",
        "description": "An incoming lead enters the immediate qualification workflow.",
        "width": 1067,
        "height": 879
      },
      {
        "src": "/assets/projects/ghl-ai-02.webp",
        "label": "02 · Route the lead",
        "description": "The routing workflow uses conditions to direct leads to the appropriate path.",
        "width": 1459,
        "height": 888
      },
      {
        "src": "/assets/projects/ghl-ai-03.webp",
        "label": "03 · Routing logic, up close",
        "description": "Branch conditions connect state and phone-area logic with the assigned SMS number.",
        "width": 1600,
        "height": 745
      },
      {
        "src": "/assets/projects/ghl-ai-04.webp",
        "label": "04 · Keep the right context",
        "description": "Custom fields hold qualification, routing and appointment information.",
        "width": 1600,
        "height": 786
      },
      {
        "src": "/assets/projects/ghl-ai-05.webp",
        "label": "05 · Let the AI handle the conversation",
        "description": "The agent has instructions and booking actions to guide a lead towards an appointment.",
        "width": 1600,
        "height": 766
      },
      {
        "src": "/assets/projects/ghl-ai-06.webp",
        "label": "06 · Respond to an appointment booking",
        "description": "An appointment-status trigger removes the contact from the no-show nurture path.",
        "width": 866,
        "height": 894
      },
      {
        "src": "/assets/projects/ghl-ai-07.webp",
        "label": "07 · Follow up when needed",
        "description": "Timed follow-up steps handle contacts on the no-show nurture path.",
        "width": 563,
        "height": 909
      },
      {
        "src": "/assets/projects/ghl-ai-08.webp",
        "label": "08 · Coordinate appointment responses",
        "description": "Published response workflows cover missed calls, appointment reminders and DND.",
        "width": 1593,
        "height": 431
      },
      {
        "src": "/assets/projects/ghl-ai-09.webp",
        "label": "09 · Re-engage existing leads",
        "description": "Reactivation workflows provide structured follow-up for inactive contacts.",
        "width": 1600,
        "height": 574
      },
      {
        "src": "/assets/projects/ghl-ai-10.webp",
        "label": "10 · Continue after the appointment",
        "description": "Post-appointment workflows cover reviews, feedback and referral requests.",
        "width": 1600,
        "height": 501
      }
    ]
  },
  {
    "id": "onboarding",
    "category": "OPERATIONS AUTOMATION",
    "title": "One webhook. A client ready to go.",
    "name": "Client Onboarding Automation",
    "description": "An onboarding engine that creates the client’s Drive folders, provisions their GHL setup, prepares Slack communication and passes the resulting details to the operations system.",
    "tools": [
      "Make.com",
      "Google Drive",
      "GHL",
      "Slack",
      "Supabase"
    ],
    "flow": [
      "Client received",
      "Drive + GHL created",
      "Slack set up",
      "Operations updated"
    ],
    "slides": [
      {
        "src": "/assets/projects/onboarding-01.webp",
        "label": "01 · The onboarding engine",
        "description": "A single webhook starts the connected Google Drive, GHL, Slack and operations flow.",
        "width": 1813,
        "height": 884
      },
      {
        "src": "/assets/projects/onboarding-02.webp",
        "label": "02 · Find existing client folders",
        "description": "Google Drive search finds the existing folders used in the client-numbering process.",
        "width": 1791,
        "height": 877
      },
      {
        "src": "/assets/projects/onboarding-03.webp",
        "label": "03 · Generate the client number",
        "description": "The count of matching folders feeds the client-numbering logic.",
        "width": 1116,
        "height": 678
      },
      {
        "src": "/assets/projects/onboarding-04.webp",
        "label": "04 · Create the client workspace",
        "description": "The client folder is created with a consistent name, followed by Dossier, Raw Media and Reports subfolders.",
        "width": 1547,
        "height": 887
      },
      {
        "src": "/assets/projects/onboarding-05.webp",
        "label": "05 · Provision the GHL location",
        "description": "An HTTP request maps the business details into the GHL location-creation request.",
        "width": 814,
        "height": 526
      },
      {
        "src": "/assets/projects/onboarding-06.webp",
        "label": "06 · Set up client communication",
        "description": "Dedicated Slack channels organise the client communication workflow.",
        "width": 389,
        "height": 483
      },
      {
        "src": "/assets/projects/onboarding-07.webp",
        "label": "07 · Pass the data to operations",
        "description": "The final HTTP payload passes the mapped client, location and folder details to the operations endpoint.",
        "width": 828,
        "height": 870
      }
    ]
  },
  {
    "id": "retell",
    "category": "VOICE AI + APPOINTMENT BOOKING",
    "title": "An AI call. A booking. Back in GHL.",
    "name": "Retell AI Calling & Appointment Booking",
    "description": "New leads move from a webhook into Make and Retell AI. The agent calls and helps arrange a booking, then appointment details return to GoHighLevel through an HTTP request.",
    "tools": [
      "Make.com",
      "Retell AI",
      "Webhooks",
      "GoHighLevel"
    ],
    "flow": [
      "New lead",
      "Outbound AI call",
      "Booking agreed",
      "Details sent to GHL"
    ],
    "slides": [
      {
        "src": "/assets/projects/retell-01.webp",
        "label": "01 · Start the outbound AI call",
        "description": "An incoming webhook starts the Retell AI call-creation action in Make.",
        "width": 805,
        "height": 504
      },
      {
        "src": "/assets/projects/retell-02.webp",
        "label": "02 · Configure the voice agent",
        "description": "The agent instructions define the conversation and appointment-setting behaviour.",
        "width": 1897,
        "height": 876
      },
      {
        "src": "/assets/projects/retell-03.webp",
        "label": "03 · Return the appointment details",
        "description": "A second webhook passes the booking data to GHL through an HTTP POST.",
        "width": 867,
        "height": 460
      },
      {
        "src": "/assets/projects/retell-04.webp",
        "label": "04 · Continue the GHL workflow",
        "description": "The GHL workflow setup includes incoming leads, AI-caller bookings and self-booked appointments.",
        "width": 1577,
        "height": 640
      }
    ]
  }
];

export const a2pProofs = [
  {
    "src": "/assets/projects/a2p-01.webp",
    "label": "Approval example 01",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1915,
    "height": 906
  },
  {
    "src": "/assets/projects/a2p-02.webp",
    "label": "Approval example 02",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1917,
    "height": 920
  },
  {
    "src": "/assets/projects/a2p-03.webp",
    "label": "Approval example 03",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1917,
    "height": 935
  },
  {
    "src": "/assets/projects/a2p-04.webp",
    "label": "Approval example 04",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1920,
    "height": 911
  },
  {
    "src": "/assets/projects/a2p-05.webp",
    "label": "Approval example 05",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1920,
    "height": 966
  },
  {
    "src": "/assets/projects/a2p-06.webp",
    "label": "Approval example 06",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1918,
    "height": 927
  },
  {
    "src": "/assets/projects/a2p-07.webp",
    "label": "Approval example 07",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1920,
    "height": 913
  },
  {
    "src": "/assets/projects/a2p-08.webp",
    "label": "Approval example 08",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1914,
    "height": 959
  },
  {
    "src": "/assets/projects/a2p-09.webp",
    "label": "Approval example 09",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1920,
    "height": 926
  },
  {
    "src": "/assets/projects/a2p-10.webp",
    "label": "Approval example 10",
    "description": "GoHighLevel Trust Center screenshot showing approved A2P brand and campaign registration.",
    "width": 1913,
    "height": 919
  }
];
