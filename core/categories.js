// ═══════════════════════════════════════════════════════════════
// KUMAGAIZO CATEGORIES
// All 27 categories across all domains
// ═══════════════════════════════════════════════════════════════

window.BLANKPAGE_CATEGORIES = {
  
    // ═══════════════════════════════════════════════════════════════════════════
  // SOFTWARE & CODING
  // ═══════════════════════════════════════════════════════════════════════════

  coding: {
    id: 'coding',
    label: 'Coding',
    steps: [
      {
        question: "What are you building?",
        guidance: "The feature, function, or outcome you're working toward.",
        placeholder: "I'm building...",
        reflections: [
          "What does this enable someone to do that they couldn't before?",
          "If you had to explain this to a user, not a developer, what would you say?",
          "What's the simplest way to describe the outcome?",
          "Is this a feature, a fix, or a foundation for something else?"
        ]
      },
      {
        question: "What's the core logic?",
        guidance: "The basic flow or sequence of what needs to happen.",
        placeholder: "The basic flow is...",
        reflections: [
          "What happens first? Then what?",
          "Where does data come from, and where does it go?",
          "What's the happy path before edge cases?",
          "Can you sketch this as a simple sequence?"
        ]
      },
      {
        question: "What's the simplest version?",
        guidance: "The minimum viable approach. What could you cut?",
        placeholder: "The simplest version would...",
        reflections: [
          "What could you remove and still have something that works?",
          "What's the version you could ship today?",
          "Which parts are essential vs. nice-to-have?",
          "If you had one hour, what would you build?"
        ]
      },
      {
        question: "What might be tricky?",
        guidance: "Edge cases, potential issues, or complex parts.",
        placeholder: "The tricky parts might be...",
        reflections: [
          "Where are you least certain?",
          "What would break this?",
          "What happens when things go wrong?",
          "Which part would you want someone to review?"
        ]
      },
      {
        question: "What do you need to figure out?",
        guidance: "Unknowns or things you'll need to research.",
        placeholder: "I need to figure out...",
        reflections: [
          "What would you Google first?",
          "Is there something you're assuming works that you haven't tested?",
          "What's the biggest unknown?",
          "Who or what could answer this quickly?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What are the most likely failure modes or edge cases?",
        guidance: "Think about invalid inputs, error states, boundary conditions, and what breaks under stress.",
        placeholder: "Edge cases like empty inputs, network failures, concurrent access..."
      },
      {
        question: "What performance or scale considerations matter here?",
        guidance: "Response time, throughput, resource usage, number of users or requests.",
        placeholder: "Need to handle 1000 requests/sec, sub-100ms response time..."
      },
      {
        question: "What security or data protection concerns should be addressed?",
        guidance: "Authentication, authorization, data validation, injection risks, sensitive data handling.",
        placeholder: "User data encryption, input validation, API rate limiting..."
      }
    ],
    promptIntro: "planning something to build",
    promptSections: ["What I'm Building", "Core Logic", "Simplest Version", "Potential Challenges", "What I Need to Figure Out"],
    deeperPromptSections: ["Edge Cases & Failure Modes", "Performance & Scale", "Security & Data Protection"],
    promptRequests: [
      "Review my logic—what am I missing?",
      "Write the core code for the simplest version",
      "Add error handling for the issues I identified",
      "Explain the parts I need to figure out, with examples",
      "What improvements should I consider once the basics work?"
    ]
  },

  debugging: {
    id: 'debugging',
    label: 'Debugging',
    steps: [
      {
        question: "What's not working?",
        guidance: "The error, unexpected behavior, or broken thing.",
        placeholder: "The problem is...",
        reflections: [
          "What exactly do you see happening?",
          "Is this an error message, wrong output, or unexpected behavior?",
          "Can you describe the symptom without guessing the cause?",
          "What would someone else observe if they saw this?"
        ]
      },
      {
        question: "What should be happening?",
        guidance: "The expected behavior or outcome.",
        placeholder: "It should...",
        reflections: [
          "What would success look like specifically?",
          "How would you know it's working correctly?",
          "What's the exact output or behavior you expect?",
          "Is there a working example you can compare against?"
        ]
      },
      {
        question: "When did it last work?",
        guidance: "What changed since then, if you know.",
        placeholder: "It worked when...",
        reflections: [
          "What changed between then and now?",
          "Did you update, install, or modify anything recently?",
          "Can you pinpoint when it stopped working?",
          "Is there a version or state you could roll back to?"
        ]
      },
      {
        question: "What have you tried?",
        guidance: "Debugging steps, fixes, or things you've ruled out.",
        placeholder: "I've tried...",
        reflections: [
          "What did each attempt tell you?",
          "What have you ruled out?",
          "Did any attempt change the behavior at all?",
          "What haven't you tried yet?"
        ]
      },
      {
        question: "What's your best guess?",
        guidance: "Your intuition about where the problem might be.",
        placeholder: "My guess is...",
        reflections: [
          "If you had to bet, where's the bug?",
          "What does your gut say?",
          "What would you check if you only had 5 minutes?",
          "Even a rough instinct helps narrow things down."
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What debugging tools or techniques could help isolate this?",
        guidance: "Specific debuggers, logging strategies, or diagnostic approaches for this type of issue.",
        placeholder: "Browser devtools, network inspector, print debugging, breakpoints..."
      },
      {
        question: "Are there patterns in when this fails vs. when it works?",
        guidance: "Specific conditions, timing, data patterns, or environmental factors that correlate with the issue.",
        placeholder: "Fails with large datasets, only in production, intermittent on Tuesdays..."
      },
      {
        question: "What would a systematic reproduction test look like?",
        guidance: "The minimal steps to reliably trigger this issue for testing potential fixes.",
        placeholder: "Start with fresh database, create user, attempt action X..."
      }
    ],
    promptIntro: "debugging an issue",
    promptSections: ["What's Not Working", "Expected Behavior", "When It Last Worked", "What I've Tried", "My Best Guess"],
    deeperPromptSections: ["Debugging Approach", "Failure Patterns", "Reproduction Steps"],
    promptRequests: [
      "Based on my description, what are the most likely causes?",
      "What should I check first?",
      "Help me isolate whether my guess is correct",
      "What debugging techniques would help here?",
      "Once I find it, how do I prevent this in the future?"
    ]
  },

  architecture: {
    id: 'architecture',
    label: 'Architecture',
    steps: [
      {
        question: "What system are you designing?",
        guidance: "The application, service, or infrastructure.",
        placeholder: "I'm designing...",
        reflections: [
          "What's the core purpose of this system?",
          "Is this greenfield or evolving something existing?",
          "What kind of system is this—web app, service, pipeline, platform?",
          "What problem does this system solve?"
        ]
      },
      {
        question: "What are the main requirements?",
        guidance: "What the system needs to do, handle, or support.",
        placeholder: "It needs to...",
        reflections: [
          "What must it do vs. what would be nice?",
          "What are the non-negotiables?",
          "Are there compliance, security, or performance requirements?",
          "What would cause this project to fail if missing?"
        ]
      },
      {
        question: "What scale are you designing for?",
        guidance: "Users, data volume, requests, growth expectations.",
        placeholder: "The scale is...",
        reflections: [
          "What's realistic for launch vs. in a year?",
          "Where will load be highest?",
          "What's the growth trajectory you're planning for?",
          "Are you optimizing for current needs or future scale?"
        ]
      },
      {
        question: "What are the key components?",
        guidance: "The main parts and how they might connect.",
        placeholder: "The components are...",
        reflections: [
          "What are the major building blocks?",
          "How do they communicate?",
          "Which components are standard vs. custom?",
          "What's the data flow between them?"
        ]
      },
      {
        question: "What are the hardest problems?",
        guidance: "The parts that need the most thought.",
        placeholder: "The hard parts are...",
        reflections: [
          "Where does complexity concentrate?",
          "What keeps you up at night about this?",
          "Which part has the most unknowns?",
          "What would an experienced architect warn you about?"
        ]
      },
      {
        question: "What trade-offs are you considering?",
        guidance: "Simplicity vs. flexibility, speed vs. cost, etc.",
        placeholder: "The trade-offs are...",
        reflections: [
          "What are you giving up to get what you want?",
          "Where are you choosing simple over optimal?",
          "What would you do differently with more time or resources?",
          "Which trade-offs are reversible?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What are the highest-risk assumptions that need early validation?",
        guidance: "Technical bets, performance expectations, or integration assumptions that could invalidate the approach.",
        placeholder: "Assuming Redis can handle this load, that API latency stays under 50ms..."
      },
      {
        question: "How will this system be deployed, monitored, and debugged in production?",
        guidance: "Operational concerns: deployment strategy, observability, incident response, maintenance.",
        placeholder: "Blue-green deployment, Datadog for monitoring, structured logging..."
      },
      {
        question: "What parts of this architecture are most likely to change, and how are you preparing for that?",
        guidance: "Where requirements might shift, and what flexibility you're building in (or deliberately not building in).",
        placeholder: "Payment processing might need multiple providers, keeping it modular..."
      }
    ],
    promptIntro: "designing a system architecture",
    promptSections: ["System Overview", "Requirements", "Scale Expectations", "Key Components", "Hard Problems", "Trade-offs"],
    deeperPromptSections: ["Risk Validation", "Operational Concerns", "Change Flexibility"],
    promptRequests: [
      "Review my architecture—what am I missing?",
      "Suggest how to handle the hard problems I identified",
      "What are common pitfalls with this type of system?",
      "Draw out the component diagram in text/ASCII",
      "What should I prototype first to validate assumptions?"
    ]
  },

  codereview: {
    id: 'codereview',
    label: 'Code Review',
    steps: [
      {
        question: "What does this code do?",
        guidance: "The purpose and functionality.",
        placeholder: "This code...",
        reflections: [
          "Can you explain it in one sentence?",
          "What's the input and output?",
          "Why does this code exist?",
          "What feature or fix does this enable?"
        ]
      },
      {
        question: "What are you unsure about?",
        guidance: "Parts that feel off, unclear, or risky.",
        placeholder: "I'm unsure about...",
        reflections: [
          "Where did you make a judgment call?",
          "What feels like it could be done better?",
          "Which part would you not want to debug at 2am?",
          "Where might there be hidden complexity?"
        ]
      },
      {
        question: "What should reviewers focus on?",
        guidance: "The areas where you most want feedback.",
        placeholder: "Focus on...",
        reflections: [
          "Where would expert eyes help most?",
          "What's the riskiest part?",
          "Is there a specific approach you want validated?",
          "What would you ask a senior dev about?"
        ]
      },
      {
        question: "What constraints shaped this approach?",
        guidance: "Time, legacy code, dependencies, requirements.",
        placeholder: "The constraints were...",
        reflections: [
          "Why this approach and not another?",
          "What forced certain decisions?",
          "What would you do differently without constraints?",
          "Are any constraints self-imposed?"
        ]
      },
      {
        question: "What would you improve with more time?",
        guidance: "Known shortcuts or future improvements.",
        placeholder: "With more time...",
        reflections: [
          "What's the technical debt here?",
          "What's good enough for now but not ideal?",
          "What would the polished version look like?",
          "What's worth a follow-up PR?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What test cases would give you confidence this works correctly?",
        guidance: "Unit tests, integration tests, edge cases that should be covered.",
        placeholder: "Test empty input, concurrent access, rollback scenarios..."
      },
      {
        question: "Are there performance, security, or maintainability concerns to address?",
        guidance: "Bottlenecks, vulnerabilities, code smells, or areas that will be hard to change later.",
        placeholder: "N+1 queries, SQL injection risk, tight coupling to database..."
      },
      {
        question: "How does this integrate with existing code, and what might break?",
        guidance: "Dependencies, side effects, assumptions other code makes that this might violate.",
        placeholder: "Changes shared utility, affects caching layer, modifies API contract..."
      }
    ],
    promptIntro: "preparing code for review",
    promptSections: ["What This Code Does", "What I'm Unsure About", "Where to Focus", "Constraints", "Future Improvements"],
    deeperPromptSections: ["Test Coverage Needs", "Quality Concerns", "Integration Impact"],
    promptRequests: [
      "Review this code for bugs, edge cases, and logic errors",
      "Suggest improvements for readability and maintainability",
      "Are there performance concerns I should address?",
      "What tests would give confidence this works correctly?",
      "How would you refactor the parts I'm unsure about?"
    ]
  },

  api: {
    id: 'api',
    label: 'API Design',
    steps: [
      {
        question: "What will this API do?",
        guidance: "The core functionality it exposes.",
        placeholder: "This API will...",
        reflections: [
          "What capability does this give consumers?",
          "What's the core job this API performs?",
          "Can you describe it without implementation details?",
          "What would the one-sentence docs say?"
        ]
      },
      {
        question: "Who will use it?",
        guidance: "Internal teams, external developers, specific services.",
        placeholder: "It will be used by...",
        reflections: [
          "Are these technical users or less technical?",
          "What do they already know?",
          "What's their primary use case?",
          "Will they use it directly or through an SDK?"
        ]
      },
      {
        question: "What are the main endpoints or operations?",
        guidance: "The key actions users will take.",
        placeholder: "The main operations are...",
        reflections: [
          "What can someone do with this API?",
          "What's the most common operation?",
          "Are these CRUD operations or something more specific?",
          "What's the minimum set of operations needed?"
        ]
      },
      {
        question: "What data structures are involved?",
        guidance: "The objects, fields, and relationships.",
        placeholder: "The data includes...",
        reflections: [
          "What are the core entities?",
          "How do they relate to each other?",
          "What fields are required vs. optional?",
          "What formats make sense (dates, IDs, etc.)?"
        ]
      },
      {
        question: "What edge cases or errors need handling?",
        guidance: "Failure modes, validation, rate limits.",
        placeholder: "Edge cases include...",
        reflections: [
          "What could go wrong?",
          "What happens with bad input?",
          "How do you handle partial failures?",
          "What error messages would actually help developers?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "How will this API be versioned and evolved without breaking existing clients?",
        guidance: "Versioning strategy, deprecation policy, backward compatibility approach.",
        placeholder: "Semantic versioning in URL, deprecation warnings, 6-month sunset..."
      },
      {
        question: "What authentication, authorization, and rate limiting make sense?",
        guidance: "Security model, access control, abuse prevention, quota management.",
        placeholder: "OAuth 2.0, role-based access, 1000 requests/hour per API key..."
      },
      {
        question: "What would developers need to successfully integrate this API?",
        guidance: "Documentation, examples, SDKs, error messages, testing environments.",
        placeholder: "OpenAPI spec, code examples in 3 languages, sandbox environment..."
      }
    ],
    promptIntro: "designing an API",
    promptSections: ["API Purpose", "Target Users", "Main Operations", "Data Structures", "Edge Cases & Errors"],
    deeperPromptSections: ["Versioning Strategy", "Security & Rate Limiting", "Developer Experience"],
    promptRequests: [
      "Suggest a RESTful (or GraphQL) structure for these operations",
      "What's a clean naming convention for these endpoints?",
      "Draft the request/response schemas",
      "What authentication and authorization approach fits?",
      "What documentation would developers need?"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCT & STRATEGY
  // ═══════════════════════════════════════════════════════════════════════════

  product: {
    id: 'product',
    label: 'Product Thinking',
    steps: [
      {
        question: "What's the product or feature?",
        guidance: "What you're building or improving.",
        placeholder: "The product is...",
        reflections: [
          "Can you explain it to someone outside your field?",
          "Is this a product, a feature, or an improvement?",
          "What category does this fall into?",
          "What's the one-line pitch?"
        ]
      },
      {
        question: "Who is it for?",
        guidance: "The specific user and their situation.",
        placeholder: "It's for...",
        reflections: [
          "Can you picture a specific person?",
          "What's their situation when they need this?",
          "How would you find 10 of these people?",
          "Is this for everyone or a specific segment?"
        ]
      },
      {
        question: "What problem does it solve?",
        guidance: "The pain, need, or desire it addresses.",
        placeholder: "It solves...",
        reflections: [
          "What's the pain of not having this?",
          "How urgent is this problem?",
          "Is this a hair-on-fire problem or a nice-to-have?",
          "Would someone pay to solve this?"
        ]
      },
      {
        question: "How do they solve this today?",
        guidance: "Current alternatives, workarounds, or competitors.",
        placeholder: "Today they...",
        reflections: [
          "What's the current workaround?",
          "Who else is solving this?",
          "Why isn't the current solution good enough?",
          "What do competitors get wrong?"
        ]
      },
      {
        question: "Why would they switch to this?",
        guidance: "What makes your approach better for them.",
        placeholder: "They'd switch because...",
        reflections: [
          "What's 10x better about this?",
          "Is the switching cost worth it?",
          "What would make them tell a friend?",
          "Why now, not later?"
        ]
      },
      {
        question: "How will you know it's working?",
        guidance: "The signals that indicate success.",
        placeholder: "I'll know it's working when...",
        reflections: [
          "What's the first signal something's working?",
          "What metric would you check first?",
          "What behavior indicates real value?",
          "How do you separate signal from noise?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What assumptions about users or the market are you making that could be wrong?",
        guidance: "Beliefs about user behavior, willingness to pay, or market dynamics that haven't been validated.",
        placeholder: "Assuming users will change their workflow, that enterprise buyers care about X..."
      },
      {
        question: "What would make this a must-have instead of a nice-to-have?",
        guidance: "The difference between something people want and something they need urgently enough to act.",
        placeholder: "If it saved 10 hours/week, if alternatives cost 10x more, if it prevented catastrophic loss..."
      },
      {
        question: "How does this fit into your broader product strategy and roadmap?",
        guidance: "Where this sits in the bigger picture, what it enables next, strategic positioning.",
        placeholder: "Foundation for multi-product platform, captures segment we've ignored, tests pricing model..."
      }
    ],
    promptIntro: "thinking through a product or feature",
    promptSections: ["The Product or Feature", "Target User", "Problem It Solves", "Current Solutions", "Reason to Switch", "Success Signals"],
    deeperPromptSections: ["Critical Assumptions", "Must-Have Criteria", "Strategic Fit"],
    promptRequests: [
      "Poke holes in my thinking—what am I missing?",
      "Help me sharpen the problem statement",
      "What's the simplest version that tests the core value?",
      "What would make this a must-have vs. nice-to-have?",
      "Suggest metrics to track based on my success signals"
    ]
  },

  feature: {
    id: 'feature',
    label: 'Feature Spec',
    steps: [
      {
        question: "What's the feature?",
        guidance: "A clear, concise description.",
        placeholder: "The feature is...",
        reflections: [
          "Can you describe it in one sentence?",
          "What does it do, not how it works?",
          "Is this one feature or several bundled together?",
          "What's the name a user would understand?"
        ]
      },
      {
        question: "What user problem does it address?",
        guidance: "The specific pain point or need.",
        placeholder: "Users struggle with...",
        reflections: [
          "What frustration does this eliminate?",
          "Have you heard users ask for this?",
          "What's the job this feature does?",
          "Is this a problem or a desire?"
        ]
      },
      {
        question: "What's the user flow?",
        guidance: "How someone would use this, step by step.",
        placeholder: "The user would...",
        reflections: [
          "Where does the user start?",
          "What's each step they take?",
          "Where might they get confused?",
          "What's the happy path?"
        ]
      },
      {
        question: "What are the requirements?",
        guidance: "Must-haves vs. nice-to-haves.",
        placeholder: "It must...",
        reflections: [
          "What's non-negotiable for v1?",
          "What can wait for later?",
          "What's the minimum that delivers value?",
          "Are there hidden requirements?"
        ]
      },
      {
        question: "What are the edge cases?",
        guidance: "Unusual situations to handle.",
        placeholder: "Edge cases include...",
        reflections: [
          "What happens when things go wrong?",
          "What if the user does something unexpected?",
          "What are the boundary conditions?",
          "What would QA try to break?"
        ]
      },
      {
        question: "How does this connect to existing features?",
        guidance: "Dependencies, integrations, or impacts.",
        placeholder: "It connects to...",
        reflections: [
          "What does this depend on?",
          "What depends on this?",
          "Does this change how anything else works?",
          "What existing patterns should it follow?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What acceptance criteria would define 'done' for engineering and QA?",
        guidance: "Specific, testable conditions that must be met before shipping.",
        placeholder: "User can complete flow in under 30 seconds, works on mobile, handles 10k concurrent users..."
      },
      {
        question: "What analytics or instrumentation should be built in from the start?",
        guidance: "Events to track, metrics to measure, data needed to validate success.",
        placeholder: "Track feature adoption, time to complete, drop-off points, error rates..."
      },
      {
        question: "What could go wrong in production that we should plan for?",
        guidance: "Potential issues, failure modes, scale problems, support burden.",
        placeholder: "Server overload, data migration issues, users misunderstanding intent, support ticket flood..."
      }
    ],
    promptIntro: "speccing out a feature",
    promptSections: ["Feature Description", "User Problem", "User Flow", "Requirements", "Edge Cases", "Connections to Existing Features"],
    deeperPromptSections: ["Acceptance Criteria", "Analytics & Instrumentation", "Production Risks"],
    promptRequests: [
      "Turn this into a proper feature specification document",
      "What requirements might I be missing?",
      "Suggest acceptance criteria for each requirement",
      "What technical considerations should engineering know about?",
      "What questions should I answer before building?"
    ]
  },

  userstory: {
    id: 'userstory',
    label: 'User Story',
    steps: [
      {
        question: "Who is the user?",
        guidance: "The specific person or role.",
        placeholder: "The user is...",
        reflections: [
          "Is this a role or a specific person?",
          "What's their context when using this?",
          "What do they already know?",
          "Are there different user types to consider?"
        ]
      },
      {
        question: "What do they want to do?",
        guidance: "The action or capability.",
        placeholder: "They want to...",
        reflections: [
          "What's the verb here?",
          "Is this an action or a state?",
          "What's the simplest way to say this?",
          "Is this one thing or several?"
        ]
      },
      {
        question: "Why do they want this?",
        guidance: "The underlying goal or benefit.",
        placeholder: "So that they can...",
        reflections: [
          "What's the outcome they're after?",
          "What happens if they can't do this?",
          "Is this the real why or a surface reason?",
          "What's the benefit to them specifically?"
        ]
      },
      {
        question: "How will we know it's done?",
        guidance: "Acceptance criteria or success indicators.",
        placeholder: "It's done when...",
        reflections: [
          "What would you demo to show it works?",
          "What's the test case?",
          "What edge cases need to pass?",
          "How would a user confirm success?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What specific scenarios or examples would test this story thoroughly?",
        guidance: "Concrete test cases covering happy path, edge cases, and error conditions.",
        placeholder: "New user signs up, existing user with 1000 items, network fails mid-action..."
      },
      {
        question: "What dependencies or prerequisites does this story have?",
        guidance: "Other stories, infrastructure, or decisions that must be in place first.",
        placeholder: "Requires authentication system, depends on API v2, needs database migration..."
      }
    ],
    promptIntro: "writing a user story",
    promptSections: ["The User", "What They Want", "Why They Want It", "Acceptance Criteria"],
    deeperPromptSections: ["Test Scenarios", "Dependencies"],
    promptRequests: [
      "Format this as a proper user story",
      "Suggest detailed acceptance criteria",
      "What edge cases should the acceptance criteria cover?",
      "Break this into smaller stories if it's too large",
      "What questions should I clarify with stakeholders?"
    ]
  },

  techdecision: {
    id: 'techdecision',
    label: 'Technical Decision',
    steps: [
      {
        question: "What's the decision?",
        guidance: "The technical choice you're facing.",
        placeholder: "The decision is...",
        reflections: [
          "Is this actually one decision or several?",
          "Why does this decision need to be made now?",
          "What happens if you don't decide?",
          "Who else cares about this decision?"
        ]
      },
      {
        question: "What are the options?",
        guidance: "The approaches, tools, or solutions being considered.",
        placeholder: "The options are...",
        reflections: [
          "Have you considered doing nothing?",
          "What options did you dismiss already?",
          "Are there options you haven't fully explored?",
          "Is there a hybrid approach?"
        ]
      },
      {
        question: "What criteria matter most?",
        guidance: "Performance, maintainability, cost, team skills, etc.",
        placeholder: "What matters most is...",
        reflections: [
          "If you could only optimize for one thing?",
          "What would make you regret this decision later?",
          "What does your team value?",
          "What does your company value?"
        ]
      },
      {
        question: "What are the trade-offs?",
        guidance: "Pros and cons of each option.",
        placeholder: "The trade-offs are...",
        reflections: [
          "What do you give up with each option?",
          "What's the cost of being wrong?",
          "Which risks are acceptable?",
          "What's reversible vs. permanent?"
        ]
      },
      {
        question: "What's your current leaning?",
        guidance: "Which option feels right and why.",
        placeholder: "I'm leaning toward...",
        reflections: [
          "What does your gut say?",
          "What would you need to see to change your mind?",
          "Are you leaning based on evidence or preference?",
          "What would a skeptic say about your choice?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "How would you validate your leading option before fully committing?",
        guidance: "Small experiments, prototypes, or tests to reduce risk before the final decision.",
        placeholder: "Build a proof-of-concept, run a 1-week trial, benchmark performance..."
      },
      {
        question: "What would it take to reverse this decision later if needed?",
        guidance: "The cost, effort, and risk of changing course after implementation.",
        placeholder: "Requires full rewrite, straightforward abstraction layer, impacts 3 systems..."
      },
      {
        question: "Who else should weigh in on this decision, and what do they need to know?",
        guidance: "Stakeholders who should review, approve, or be informed, and what context they need.",
        placeholder: "Need CTO approval, ops team should know about monitoring, security review required..."
      }
    ],
    promptIntro: "making a technical decision",
    promptSections: ["The Decision", "Options", "Key Criteria", "Trade-offs", "Current Leaning"],
    deeperPromptSections: ["Validation Strategy", "Reversibility", "Stakeholder Input"],
    promptRequests: [
      "Create a comparison matrix for these options",
      "What am I not considering?",
      "For my leaning, what could go wrong?",
      "How reversible is this decision?",
      "Draft an ADR (Architecture Decision Record) for this"
    ]
  },

  
  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN & UX
  // ═══════════════════════════════════════════════════════════════════════════

  ux: {
    id: 'ux',
    label: 'UX Design',
    steps: [
      {
        question: "What are you designing?",
        guidance: "The screen, flow, or interaction.",
        placeholder: "I'm designing...",
        reflections: [
          "Is this a screen, a flow, or an interaction pattern?",
          "What's the scope—one element or an entire experience?",
          "What will exist when you're done?",
          "Is this new or a redesign?"
        ]
      },
      {
        question: "Who is the user?",
        guidance: "Their context, goals, and level of expertise.",
        placeholder: "The user is...",
        reflections: [
          "What's their mindset when they arrive here?",
          "How experienced are they with this kind of interface?",
          "What else are they doing at the same time?",
          "What do they already understand?"
        ]
      },
      {
        question: "What task are they trying to complete?",
        guidance: "The specific job to be done.",
        placeholder: "They're trying to...",
        reflections: [
          "What's the verb—what action are they taking?",
          "How will they know they succeeded?",
          "Is this a frequent task or a one-time thing?",
          "What happens before and after this task?"
        ]
      },
      {
        question: "What's the current experience like?",
        guidance: "Pain points, friction, or confusion.",
        placeholder: "Currently...",
        reflections: [
          "Where do people get stuck?",
          "What do they complain about?",
          "What takes longer than it should?",
          "What questions do they ask?"
        ]
      },
      {
        question: "What would a great experience feel like?",
        guidance: "The ideal outcome from the user's perspective.",
        placeholder: "A great experience would...",
        reflections: [
          "What emotion should they feel?",
          "What would make them say 'finally'?",
          "What would they tell a colleague about?",
          "How fast should this feel?"
        ]
      },
      {
        question: "What constraints are you working within?",
        guidance: "Technical limits, brand guidelines, timeline.",
        placeholder: "The constraints are...",
        reflections: [
          "What can't you change?",
          "What technical limitations exist?",
          "How much time do you have?",
          "What existing patterns must you follow?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What micro-interactions or transitions would enhance the experience?",
        guidance: "Small details that provide feedback, guide attention, or make the interface feel responsive.",
        placeholder: "Loading states, hover effects, success animations, focus indicators..."
      },
      {
        question: "How should error states, edge cases, and empty states be handled?",
        guidance: "What users see when something goes wrong, data is missing, or they encounter boundaries.",
        placeholder: "Friendly error messages, empty state illustrations, graceful degradation..."
      },
      {
        question: "What accessibility considerations apply to this experience?",
        guidance: "Keyboard navigation, screen readers, color contrast, cognitive load, motor impairments.",
        placeholder: "Keyboard shortcuts, ARIA labels, sufficient contrast, focus management..."
      }
    ],
    promptIntro: "designing a user experience",
    promptSections: ["What I'm Designing", "The User", "User Task", "Current Experience", "Ideal Experience", "Constraints"],
    deeperPromptSections: ["Micro-interactions", "Error & Edge States", "Accessibility"],
    promptRequests: [
      "Suggest a user flow that addresses the pain points",
      "What UX patterns would work well here?",
      "What micro-interactions could improve the experience?",
      "How should I handle error states and edge cases?",
      "What should I prototype first to test assumptions?"
    ]
  },

  ui: {
    id: 'ui',
    label: 'UI Design',
    steps: [
      {
        question: "What interface are you designing?",
        guidance: "The component, screen, or visual element.",
        placeholder: "I'm designing...",
        reflections: [
          "Is this a component, a screen, or a system?",
          "What's the atomic level here?",
          "Does this exist in other places in your product?",
          "Is this standalone or part of a larger flow?"
        ]
      },
      {
        question: "What's the visual direction?",
        guidance: "Style, mood, existing design system.",
        placeholder: "The visual direction is...",
        reflections: [
          "What's the personality of this interface?",
          "What existing styles must this match?",
          "What feeling should the visuals convey?",
          "What would be off-brand?"
        ]
      },
      {
        question: "What's the hierarchy of information?",
        guidance: "What's most important, what's secondary.",
        placeholder: "The priority is...",
        reflections: [
          "What should the eye land on first?",
          "What's secondary but still necessary?",
          "What can be hidden or de-emphasized?",
          "What's the reading order?"
        ]
      },
      {
        question: "What states need to be designed?",
        guidance: "Default, hover, active, error, empty, loading.",
        placeholder: "The states are...",
        reflections: [
          "What happens on hover? On click?",
          "What does error look like?",
          "What about empty states?",
          "How does loading appear?"
        ]
      },
      {
        question: "What's the context of use?",
        guidance: "Device, environment, user situation.",
        placeholder: "It will be used on...",
        reflections: [
          "Desktop, mobile, or both?",
          "What environment—office, mobile, focused or distracted?",
          "What screen sizes matter most?",
          "Touch or mouse?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What spacing, typography, and color system should this follow?",
        guidance: "Specific values from your design system or new standards to establish.",
        placeholder: "16px base spacing, 8px grid, headings use Inter 600, primary color #2563EB..."
      },
      {
        question: "How should this adapt across different screen sizes and devices?",
        guidance: "Responsive behavior, breakpoints, mobile-first vs desktop-first approach.",
        placeholder: "Stack vertically on mobile, 2-column on tablet, 3-column on desktop..."
      },
      {
        question: "What visual hierarchy techniques would make this scannable and clear?",
        guidance: "Size, weight, color, spacing, grouping strategies to guide the eye.",
        placeholder: "Bold headers, subtle subtext, whitespace separation, color coding by type..."
      }
    ],
    promptIntro: "designing a user interface",
    promptSections: ["Interface Element", "Visual Direction", "Information Hierarchy", "States to Design", "Context of Use"],
    deeperPromptSections: ["Design System Values", "Responsive Behavior", "Hierarchy Techniques"],
    promptRequests: [
      "Suggest a layout structure for this interface",
      "What visual hierarchy techniques would work here?",
      "How should the different states differ visually?",
      "What accessibility considerations apply?",
      "Recommend spacing, sizing, and typography approach"
    ]
  },

  designsystem: {
    id: 'designsystem',
    label: 'Design System',
    steps: [
      {
        question: "What component or pattern are you defining?",
        guidance: "The element you're adding to the system.",
        placeholder: "I'm defining...",
        reflections: [
          "Is this a primitive or a composite component?",
          "Does something similar already exist?",
          "What's the most generic name for this?",
          "Is this actually one component or several?"
        ]
      },
      {
        question: "Where will it be used?",
        guidance: "The contexts and use cases.",
        placeholder: "It will be used in...",
        reflections: [
          "What screens or features need this?",
          "Are there contexts where this shouldn't be used?",
          "What's the most common use case?",
          "What's an edge case use?"
        ]
      },
      {
        question: "What variations are needed?",
        guidance: "Sizes, states, themes, configurations.",
        placeholder: "The variations are...",
        reflections: [
          "What sizes make sense?",
          "What states does it need (hover, disabled, etc.)?",
          "Light mode and dark mode?",
          "What props should be configurable?"
        ]
      },
      {
        question: "How does it relate to existing components?",
        guidance: "Similar patterns, composition, dependencies.",
        placeholder: "It relates to...",
        reflections: [
          "What components does this use inside it?",
          "What components are similar?",
          "Does this replace anything existing?",
          "What patterns should it follow?"
        ]
      },
      {
        question: "What are the rules for usage?",
        guidance: "When to use it, when not to, guidelines.",
        placeholder: "The rules are...",
        reflections: [
          "When should someone use this?",
          "When should they not use this?",
          "What's a common misuse to warn against?",
          "What's the most important guideline?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What props, parameters, or configuration options should this component accept?",
        guidance: "API surface for the component—what can be customized and how.",
        placeholder: "size='sm|md|lg', variant='primary|secondary', disabled, onClick, children..."
      },
      {
        question: "What are the do's and don'ts for proper usage of this component?",
        guidance: "Specific guidance to prevent misuse and ensure consistency.",
        placeholder: "DO use for primary actions, DON'T use more than one per screen, DO provide clear labels..."
      },
      {
        question: "How should this component be named to fit existing naming conventions?",
        guidance: "Naming that's consistent with the rest of your system and clearly communicates purpose.",
        placeholder: "Follow verb-noun pattern like existing components, use 'Primary' not 'Main'..."
      }
    ],
    promptIntro: "defining a design system component",
    promptSections: ["Component or Pattern", "Use Cases", "Variations", "Related Components", "Usage Guidelines"],
    deeperPromptSections: ["Component API", "Do's and Don'ts", "Naming Convention"],
    promptRequests: [
      "Draft documentation for this component",
      "What props or parameters should this component accept?",
      "Suggest do's and don'ts for the usage guidelines",
      "What accessibility requirements apply?",
      "How should this be named to fit existing conventions?"
    ]
  },

  critique: {
    id: 'critique',
    label: 'Design Critique',
    steps: [
      {
        question: "What design are you critiquing?",
        guidance: "The screen, flow, or visual you want feedback on.",
        placeholder: "I'm looking at...",
        reflections: [
          "Can you describe it objectively first?",
          "What stage is this design at?",
          "Is this a concept, a mockup, or a shipped product?",
          "What decisions have already been made?"
        ]
      },
      {
        question: "What was the goal?",
        guidance: "What the design was trying to achieve.",
        placeholder: "The goal was...",
        reflections: [
          "What problem was this solving?",
          "What was the user supposed to feel or do?",
          "What constraints shaped this?",
          "How will you measure success?"
        ]
      },
      {
        question: "What's working well?",
        guidance: "Strengths you want to preserve.",
        placeholder: "What's working...",
        reflections: [
          "What would you not want to lose?",
          "What's clever or elegant?",
          "What's better than before?",
          "What aligns well with the goal?"
        ]
      },
      {
        question: "What feels off?",
        guidance: "Your concerns or uncertainties.",
        placeholder: "What feels off...",
        reflections: [
          "Where does your eye get stuck?",
          "What would a user struggle with?",
          "What doesn't match the goal?",
          "What's your gut telling you?"
        ]
      },
      {
        question: "What specific feedback would help?",
        guidance: "The areas where you most want input.",
        placeholder: "I'd like feedback on...",
        reflections: [
          "What decision are you trying to make?",
          "What would unblock you?",
          "What do you need validation on?",
          "What's the most important thing to get right?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What user research or testing would validate whether this design works?",
        guidance: "Specific methods to test assumptions about usability, clarity, or effectiveness.",
        placeholder: "Usability testing with 5 users, A/B test conversion, card sorting for nav..."
      },
      {
        question: "How might users misunderstand or struggle with this design?",
        guidance: "Potential points of confusion, cognitive overload, or interaction friction.",
        placeholder: "Might not notice the CTA, unclear what happens after clicking, too many choices..."
      },
      {
        question: "What would you prioritize changing first based on your concerns?",
        guidance: "Highest-impact improvements ranked by importance to the goal.",
        placeholder: "Fix the unclear navigation first, then improve visual hierarchy, then polish colors..."
      }
    ],
    promptIntro: "getting feedback on a design",
    promptSections: ["The Design", "Design Goal", "What's Working", "What Feels Off", "Feedback Needed"],
    deeperPromptSections: ["Validation Methods", "Potential User Struggles", "Priority Changes"],
    promptRequests: [
      "Based on my concerns, what specific improvements would you suggest?",
      "Does this design support the stated goal effectively?",
      "What UX principles might improve the weak areas?",
      "How might users misunderstand or struggle with this?",
      "What would you prioritize changing first?"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESEARCH & ANALYSIS
  // ═══════════════════════════════════════════════════════════════════════════

  research: {
    id: 'research',
    label: 'Research',
    steps: [
      {
        question: "What are you trying to understand?",
        guidance: "The question or topic you're researching.",
        placeholder: "I'm trying to understand...",
        reflections: [
          "What's the question behind the question?",
          "Is this a what, why, or how question?",
          "How specific can you make this?",
          "What would a complete answer look like?"
        ]
      },
      {
        question: "What do you already know or assume?",
        guidance: "Your starting point, including hunches.",
        placeholder: "I already know...",
        reflections: [
          "What are you taking for granted?",
          "What have you heard but not verified?",
          "What's your current best guess?",
          "What might you be wrong about?"
        ]
      },
      {
        question: "What would change your thinking?",
        guidance: "The kind of information that would matter most.",
        placeholder: "I'd change my thinking if...",
        reflections: [
          "What evidence would convince you?",
          "What would disprove your assumptions?",
          "What would be surprising to find?",
          "What are you hoping is true?"
        ]
      },
      {
        question: "Where might you find good information?",
        guidance: "Sources, experts, or places to look.",
        placeholder: "Good sources might be...",
        reflections: [
          "Who's written about this credibly?",
          "Who's done this successfully?",
          "What's the primary source vs. commentary?",
          "Where might you find opposing views?"
        ]
      },
      {
        question: "How will you use what you learn?",
        guidance: "The decision, project, or action this informs.",
        placeholder: "I'll use this to...",
        reflections: [
          "What decision does this inform?",
          "When do you need to know this by?",
          "How much certainty do you need?",
          "What will you do with the answer?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What perspectives or biases should you watch for in your sources?",
        guidance: "Conflicts of interest, ideological leanings, or blind spots that might skew information.",
        placeholder: "Industry-funded research, political agenda, survivor bias, recency bias..."
      },
      {
        question: "What would a systematic research plan look like for this topic?",
        guidance: "A structured approach: what to read first, in what order, how to synthesize.",
        placeholder: "Start with overview articles, then primary sources, then opposing views, synthesize patterns..."
      },
      {
        question: "How will you know when you've researched enough to make a decision?",
        guidance: "The threshold of confidence or diminishing returns that signals you're ready.",
        placeholder: "When 3+ credible sources agree, when I can explain both sides, when new sources repeat info..."
      }
    ],
    promptIntro: "researching a topic",
    promptSections: ["What I'm Trying to Understand", "What I Already Know", "What Would Change My Thinking", "Potential Sources", "How I'll Use This"],
    deeperPromptSections: ["Bias Awareness", "Research Plan", "Completion Criteria"],
    promptRequests: [
      "Help me refine my research question",
      "What are the key concepts I should understand first?",
      "Suggest specific sources or search terms",
      "What perspectives or biases should I watch for?",
      "Create a research plan I can follow"
    ]
  },

  userresearch: {
    id: 'userresearch',
    label: 'User Research',
    steps: [
      {
        question: "What do you want to learn about users?",
        guidance: "The behavior, need, or question you're exploring.",
        placeholder: "I want to learn...",
        reflections: [
          "Is this about behavior, attitude, or need?",
          "What would you do differently based on the answer?",
          "Is this a what, why, or how question?",
          "Can you observe this or do you need to ask?"
        ]
      },
      {
        question: "Who are you researching?",
        guidance: "The user segment or persona.",
        placeholder: "I'm researching...",
        reflections: [
          "How do you define this group?",
          "Where would you find these people?",
          "How are they different from other users?",
          "Who are you explicitly not researching?"
        ]
      },
      {
        question: "What assumptions are you testing?",
        guidance: "Beliefs you want to validate or challenge.",
        placeholder: "I assume...",
        reflections: [
          "What do you believe that might be wrong?",
          "What does your team disagree about?",
          "What would be expensive to get wrong?",
          "What's driving the product direction right now?"
        ]
      },
      {
        question: "What method are you considering?",
        guidance: "Interviews, surveys, usability tests, analytics.",
        placeholder: "I'm considering...",
        reflections: [
          "Do you need depth or breadth?",
          "Do you need to observe behavior or understand attitudes?",
          "How much time and budget do you have?",
          "What have you tried before that worked?"
        ]
      },
      {
        question: "What would success look like?",
        guidance: "What you'd learn that would be actionable.",
        placeholder: "Success would be...",
        reflections: [
          "What would make this research worth the time?",
          "What decision would this enable?",
          "What would you tell your team you learned?",
          "What would fail look like?"
        ]
      },
      {
        question: "What will you do with the findings?",
        guidance: "How this feeds into decisions or design.",
        placeholder: "I'll use findings to...",
        reflections: [
          "Who needs to see these findings?",
          "What format would be most useful?",
          "How will you make this actionable?",
          "What's the next step after research?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What specific questions should you ask in interviews or include in surveys?",
        guidance: "Concrete questions that would give you the insights you need, avoiding leading questions.",
        placeholder: "Tell me about the last time you..., What's frustrating about..., Walk me through how you..."
      },
      {
        question: "What biases should you watch out for in this research?",
        guidance: "Confirmation bias, selection bias, response bias, or other factors that could skew results.",
        placeholder: "Only talking to power users, asking leading questions, confusing correlation with causation..."
      },
      {
        question: "How should you synthesize and present findings to make them actionable?",
        guidance: "Format, structure, and delivery method that will drive decisions.",
        placeholder: "Journey map with pain points, persona cards, video highlights reel, prioritized recommendations..."
      }
    ],
    promptIntro: "planning user research",
    promptSections: ["Research Question", "Target Users", "Assumptions to Test", "Methodology", "Definition of Success", "How Findings Will Be Used"],
    deeperPromptSections: ["Research Questions", "Bias Prevention", "Synthesis & Presentation"],
    promptRequests: [
      "Help me refine my research questions",
      "Suggest the best methodology for what I want to learn",
      "Draft a discussion guide or survey questions",
      "What biases should I watch out for?",
      "How should I synthesize and present findings?"
    ]
  },

  competitive: {
    id: 'competitive',
    label: 'Competitive Analysis',
    steps: [
      {
        question: "What are you analyzing?",
        guidance: "The product, feature, or market area.",
        placeholder: "I'm analyzing...",
        reflections: [
          "What specific aspect are you comparing?",
          "Is this about features, positioning, or experience?",
          "What triggered this analysis?",
          "What will you do with what you learn?"
        ]
      },
      {
        question: "Who are the competitors?",
        guidance: "Direct, indirect, or alternative solutions.",
        placeholder: "The competitors are...",
        reflections: [
          "Who are the direct competitors?",
          "What indirect alternatives exist?",
          "Who might become a competitor?",
          "Who do your users compare you to?"
        ]
      },
      {
        question: "What aspects are you comparing?",
        guidance: "Features, pricing, positioning, experience.",
        placeholder: "I'm comparing...",
        reflections: [
          "What dimensions matter most for your decision?",
          "Are you comparing fairly?",
          "What's hard to compare directly?",
          "What do users actually compare?"
        ]
      },
      {
        question: "What patterns do you notice?",
        guidance: "Similarities, differences, or trends.",
        placeholder: "I notice...",
        reflections: [
          "What is everyone doing the same?",
          "Who's doing something different?",
          "What's changing over time?",
          "What's missing from the market?"
        ]
      },
      {
        question: "What does this mean for your product?",
        guidance: "Opportunities, threats, or differentiators.",
        placeholder: "This means...",
        reflections: [
          "Where's the opportunity?",
          "What's the threat to take seriously?",
          "How should this change your strategy?",
          "What should you not copy?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What gaps in the market do these competitors leave open?",
        guidance: "Unmet needs, underserved segments, or approaches no one is taking.",
        placeholder: "No one serves small teams well, all focus on enterprise, missing mobile-first approach..."
      },
      {
        question: "How could you differentiate from these competitors in a meaningful way?",
        guidance: "Unique positioning, features, pricing, or experience that would matter to users.",
        placeholder: "Focus on simplicity vs their complexity, vertical-specific solution, freemium model..."
      },
      {
        question: "What are competitors doing well that you should learn from without copying?",
        guidance: "Best practices, patterns, or strategies worth adapting to your context.",
        placeholder: "Their onboarding flow, pricing transparency, community building, customer support..."
      }
    ],
    promptIntro: "doing competitive analysis",
    promptSections: ["Area of Analysis", "Competitors", "Comparison Dimensions", "Patterns Noticed", "Implications"],
    deeperPromptSections: ["Market Gaps", "Differentiation Strategy", "Lessons to Adapt"],
    promptRequests: [
      "Create a comparison matrix for these competitors",
      "What gaps in the market do you see?",
      "How could I differentiate from these competitors?",
      "What are competitors doing well that I should learn from?",
      "What risks do these competitors pose?"
    ]
  },

  data: {
    id: 'data',
    label: 'Data Analysis',
    steps: [
      {
        question: "What question are you trying to answer?",
        guidance: "The business or product question driving this.",
        placeholder: "I want to know...",
        reflections: [
          "What decision does this inform?",
          "What would you do differently based on the answer?",
          "Is this the real question or a proxy?",
          "How precise does the answer need to be?"
        ]
      },
      {
        question: "What data do you have?",
        guidance: "The datasets, metrics, or sources available.",
        placeholder: "I have data on...",
        reflections: [
          "Is this data trustworthy?",
          "What time period does it cover?",
          "What's missing from this data?",
          "How was this data collected?"
        ]
      },
      {
        question: "What patterns do you see initially?",
        guidance: "Early observations or hypotheses.",
        placeholder: "I'm noticing...",
        reflections: [
          "What stands out?",
          "What surprised you?",
          "What confirmed what you expected?",
          "What needs more investigation?"
        ]
      },
      {
        question: "What might be misleading?",
        guidance: "Potential biases, gaps, or confounding factors.",
        placeholder: "This could be misleading because...",
        reflections: [
          "What could explain this other than your hypothesis?",
          "What bias might be in this data?",
          "What's not captured that matters?",
          "What would make you doubt this conclusion?"
        ]
      },
      {
        question: "What decision will this inform?",
        guidance: "How the analysis will be used.",
        placeholder: "This will help decide...",
        reflections: [
          "Who's making the decision?",
          "What are the options being decided between?",
          "What level of certainty is needed?",
          "When does the decision need to be made?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What statistical methods or analysis techniques apply here?",
        guidance: "Appropriate approaches for your data type and question: correlation, regression, significance testing, etc.",
        placeholder: "Chi-square test for categorical data, time series analysis, cohort analysis..."
      },
      {
        question: "How should you visualize these findings to make them clear and actionable?",
        guidance: "Chart types, dashboards, or visual approaches that would communicate insights effectively.",
        placeholder: "Line chart for trends over time, funnel visualization for conversion, heat map for correlation..."
      },
      {
        question: "What would strengthen your conclusions or reveal blind spots?",
        guidance: "Additional data, alternative analyses, or validation methods that would increase confidence.",
        placeholder: "Segment by user type, compare to industry benchmarks, run A/B test to confirm..."
      }
    ],
    promptIntro: "analyzing data",
    promptSections: ["Question to Answer", "Available Data", "Initial Patterns", "Potential Pitfalls", "Decision to Inform"],
    deeperPromptSections: ["Statistical Methods", "Visualization Strategy", "Validation Approaches"],
    promptRequests: [
      "What additional analysis would strengthen my conclusions?",
      "How should I visualize these findings?",
      "What statistical methods apply here?",
      "Help me spot flaws in my reasoning",
      "How should I present this to stakeholders?"
    ]
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // CREATIVITY & IDEATION
  // ═══════════════════════════════════════════════════════════════════════════

  ideas: {
    id: 'ideas',
    label: 'Ideation',
    steps: [
      {
        question: "What are you trying to create or explore?",
        guidance: "The opportunity or challenge you're brainstorming around.",
        placeholder: "I'm exploring...",
        reflections: [
          "What's the space you're playing in?",
          "What triggered this exploration?",
          "How open is the brief?",
          "What would success look like?"
        ]
      },
      {
        question: "What directions have already come to mind?",
        guidance: "Initial ideas, even obvious ones.",
        placeholder: "Some initial thoughts...",
        reflections: [
          "What's the obvious answer?",
          "What came to mind first?",
          "What have you seen others do?",
          "What would you do if you had to decide now?"
        ]
      },
      {
        question: "What less obvious angles might be interesting?",
        guidance: "Creative or unexpected approaches worth considering.",
        placeholder: "A different angle could be...",
        reflections: [
          "What's the opposite of your first idea?",
          "What would a completely different industry do?",
          "What if you removed the main constraint?",
          "What's the weird idea you dismissed?"
        ]
      },
      {
        question: "If there were no constraints, what would you try?",
        guidance: "The ideal version, without practical limitations.",
        placeholder: "Ideally, I would...",
        reflections: [
          "What if money wasn't a factor?",
          "What if you had unlimited time?",
          "What if you couldn't fail?",
          "What would you do if you were bolder?"
        ]
      },
      {
        question: "Which direction feels most promising right now?",
        guidance: "Trust your intuition here.",
        placeholder: "I'm most drawn to...",
        reflections: [
          "Where's the energy?",
          "What would you be excited to work on?",
          "What's the best story?",
          "What would you regret not trying?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "How could you combine or remix elements from different ideas?",
        guidance: "Unexpected combinations that might create something novel and interesting.",
        placeholder: "Take the playfulness from idea A + the structure from idea B + the aesthetic from idea C..."
      },
      {
        question: "What small experiment could test your most promising direction quickly?",
        guidance: "A low-stakes way to validate whether the idea has potential before full commitment.",
        placeholder: "Create a mockup, interview 3 people, build a prototype in a weekend, write a one-pager..."
      },
      {
        question: "What constraints or rules might actually make this idea stronger?",
        guidance: "Limitations that would force creativity rather than limiting it.",
        placeholder: "Must finish in 1 week, can only use 3 colors, has to work on mobile, must cost under $10..."
      }
    ],
    promptIntro: "brainstorming and exploring ideas",
    promptSections: ["What I'm Exploring", "Initial Directions", "Alternative Angles", "Ideal Scenario", "Most Promising Direction"],
    deeperPromptSections: ["Idea Combinations", "Quick Validation", "Creative Constraints"],
    promptRequests: [
      "Build on my most promising direction with 3 specific ways to develop it",
      "Combine elements from my ideas into something new",
      "Which concept has the most potential and why?",
      "What's a concrete first step I could take?",
      "What small experiment could test this quickly?"
    ]
  },

  creative: {
    id: 'creative',
    label: 'Creative Project',
    steps: [
      {
        question: "What do you want to create?",
        guidance: "The medium, format, or type of creative work.",
        placeholder: "I want to create...",
        reflections: [
          "What form will this take?",
          "What's the scope—small or ambitious?",
          "Is this a one-off or part of something larger?",
          "What exists when you're done?"
        ]
      },
      {
        question: "What's the feeling or mood you're going for?",
        guidance: "The emotional quality or atmosphere.",
        placeholder: "The feeling is...",
        reflections: [
          "What emotion should this evoke?",
          "What's the tone—serious, playful, dark, light?",
          "How do you want someone to feel experiencing this?",
          "What mood are you in making this?"
        ]
      },
      {
        question: "What's inspiring you?",
        guidance: "References, influences, or things that excite you.",
        placeholder: "I'm inspired by...",
        reflections: [
          "What sparked this idea?",
          "Whose work influences this?",
          "What's the reference point?",
          "What are you riffing on?"
        ]
      },
      {
        question: "Who is this for?",
        guidance: "The audience, even if it's just yourself.",
        placeholder: "This is for...",
        reflections: [
          "Are you making this for others or yourself?",
          "Who would appreciate this most?",
          "Where would someone encounter this?",
          "Does audience change what you'd make?"
        ]
      },
      {
        question: "What would make this feel true to you?",
        guidance: "The element that makes it yours.",
        placeholder: "It would feel true if...",
        reflections: [
          "What makes this distinctly yours?",
          "What would you refuse to compromise on?",
          "What's the non-negotiable element?",
          "Where's your fingerprint?"
        ]
      },
      {
        question: "What's the first piece you want to work on?",
        guidance: "A starting point that excites you.",
        placeholder: "I'll start with...",
        reflections: [
          "What's the most exciting piece to begin with?",
          "What would give you momentum?",
          "What's a small piece you could finish quickly?",
          "Where does the work want to start?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What techniques or approaches from your inspirations could you adapt?",
        guidance: "Specific methods, styles, or strategies you admire that could inform your work.",
        placeholder: "The layering technique from artist X, the narrative structure from film Y, the color palette from Z..."
      },
      {
        question: "How can you make this more distinctly yours rather than derivative?",
        guidance: "Elements of your personal experience, perspective, or style that would make this unique.",
        placeholder: "Add my background in X, incorporate my obsession with Y, use my perspective on Z..."
      },
      {
        question: "What structure or framework would help you maintain momentum?",
        guidance: "A plan, schedule, or organizational system to keep the project moving.",
        placeholder: "Weekly milestones, working 1 hour each morning, complete one section per week..."
      }
    ],
    promptIntro: "developing a creative project",
    promptSections: ["What I Want to Create", "Desired Mood or Feeling", "Inspirations", "Intended Audience", "What Makes It Mine", "Starting Point"],
    deeperPromptSections: ["Techniques to Adapt", "Personal Distinctiveness", "Momentum Structure"],
    promptRequests: [
      "Help me develop my concept further",
      "Suggest ways to achieve the mood I'm going for",
      "What techniques might help bring my inspirations into this?",
      "How can I make this more distinctly mine?",
      "Create a rough structure or outline to start from"
    ]
  },

  naming: {
    id: 'naming',
    label: 'Naming',
    steps: [
      {
        question: "What are you naming?",
        guidance: "The product, feature, project, or concept.",
        placeholder: "I'm naming...",
        reflections: [
          "What type of thing is this?",
          "How permanent is this name?",
          "What's the context when people hear this name?",
          "How often will people say or read this name?"
        ]
      },
      {
        question: "What should the name communicate?",
        guidance: "The feeling, function, or essence.",
        placeholder: "The name should say...",
        reflections: [
          "What's the single most important thing?",
          "Should it describe function or evoke feeling?",
          "Does it need to be literal or can it be abstract?",
          "What personality should it convey?"
        ]
      },
      {
        question: "What names have you considered?",
        guidance: "Ideas so far, even if you're not sold on them.",
        placeholder: "I've considered...",
        reflections: [
          "What's your current favorite?",
          "Why were these names rejected?",
          "What style of name are you drawn to?",
          "What almost works?"
        ]
      },
      {
        question: "What names should it NOT be like?",
        guidance: "Styles, tones, or associations to avoid.",
        placeholder: "It shouldn't be...",
        reflections: [
          "What's played out or cliché?",
          "What competitors' names should you avoid?",
          "What tone is wrong?",
          "What associations would be bad?"
        ]
      },
      {
        question: "Where will this name appear?",
        guidance: "Domain, app store, marketing, conversation.",
        placeholder: "It will appear...",
        reflections: [
          "Does domain availability matter?",
          "Will people need to spell it or say it aloud?",
          "How does it work as a logo?",
          "How does it work in a sentence?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What are 20 name options across different naming styles?",
        guidance: "Explore variety: descriptive, invented, metaphorical, acronyms, compound words, etc.",
        placeholder: "Descriptive: QuickTask, Invented: Zenflow, Metaphor: Lighthouse, Compound: TaskMaster..."
      },
      {
        question: "What unintended meanings or associations might these names have?",
        guidance: "Check for negative connotations, confusing meanings in other languages, or unfortunate abbreviations.",
        placeholder: "Sounds like X in Spanish, abbreviates to unfortunate acronym, too similar to competitor..."
      },
      {
        question: "Which 3 names are strongest and why?",
        guidance: "Narrow down to finalists with clear rationale for each.",
        placeholder: "Name A: memorable and available, Name B: perfectly captures feeling, Name C: unique positioning..."
      }
    ],
    promptIntro: "finding the right name",
    promptSections: ["What I'm Naming", "What the Name Should Communicate", "Names Considered", "What to Avoid", "Where It Will Appear"],
    deeperPromptSections: ["Name Generation", "Association Check", "Top Candidates"],
    promptRequests: [
      "Generate 20 name options across different styles",
      "For my favorite 3 options, list pros and cons",
      "Check if these names have domain availability issues",
      "What unintended meanings or associations might these have?",
      "Suggest variations on the strongest candidates"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITING & COMMUNICATION
  // ═══════════════════════════════════════════════════════════════════════════

  techwriting: {
    id: 'techwriting',
    label: 'Technical Writing',
    steps: [
      {
        question: "What are you documenting?",
        guidance: "The feature, API, process, or concept.",
        placeholder: "I'm documenting...",
        reflections: [
          "Is this a how-to, reference, or concept explanation?",
          "What's the scope of this documentation?",
          "Does this exist elsewhere that you're replacing or adding to?",
          "What's the thing someone will be able to do after reading this?"
        ]
      },
      {
        question: "Who is the audience?",
        guidance: "Their technical level and what they need to do.",
        placeholder: "The audience is...",
        reflections: [
          "What's their technical skill level?",
          "What do they already know?",
          "Are they learning or referencing?",
          "What's their goal?"
        ]
      },
      {
        question: "What's the most important thing they need to know?",
        guidance: "The key concept or step.",
        placeholder: "Most importantly...",
        reflections: [
          "If they remember one thing?",
          "What's the critical path?",
          "What must they not skip?",
          "What's the 'aha' moment?"
        ]
      },
      {
        question: "What do they already know?",
        guidance: "Prerequisites or assumed knowledge.",
        placeholder: "They already know...",
        reflections: [
          "What can you skip explaining?",
          "What terms can you use without defining?",
          "What concepts are prerequisite?",
          "Where might their knowledge have gaps?"
        ]
      },
      {
        question: "Where will they get stuck?",
        guidance: "Common confusions or tricky parts.",
        placeholder: "They'll get stuck on...",
        reflections: [
          "What questions do people always ask?",
          "What's counterintuitive?",
          "Where do errors usually happen?",
          "What did you struggle with?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What examples would make the tricky parts crystal clear?",
        guidance: "Concrete code samples, scenarios, or walkthroughs for difficult concepts.",
        placeholder: "Show before/after code, step-by-step example with real data, common error and fix..."
      },
      {
        question: "How can you make this documentation scannable for different needs?",
        guidance: "Structure that lets people quickly find what they need: headings, tables, code blocks, callouts.",
        placeholder: "Quick start section first, detailed reference tables, code examples highlighted, warning boxes..."
      },
      {
        question: "What should go in a 'quick start' vs. comprehensive reference?",
        guidance: "The minimal path to success vs. the complete details for advanced users.",
        placeholder: "Quick start: 5-minute setup, Comprehensive: all configuration options, edge cases, troubleshooting..."
      }
    ],
    promptIntro: "writing technical documentation",
    promptSections: ["What I'm Documenting", "Audience", "Key Information", "Prerequisites", "Common Stumbling Points"],
    deeperPromptSections: ["Clarifying Examples", "Scannable Structure", "Quick Start vs Reference"],
    promptRequests: [
      "Create an outline for this documentation",
      "Write clear step-by-step instructions",
      "Add helpful examples for the tricky parts",
      "What should go in a 'quick start' section?",
      "Suggest ways to make this more scannable"
    ]
  },

  writing: {
    id: 'writing',
    label: 'Writing',
    steps: [
      {
        question: "What would you like to write about?",
        guidance: "The topic, idea, or message you're exploring.",
        placeholder: "I want to write about...",
        reflections: [
          "What's the topic at its core?",
          "Why this, why now?",
          "What's your connection to this topic?",
          "Is this an argument, explanation, or exploration?"
        ]
      },
      {
        question: "What's your perspective on this?",
        guidance: "Your unique angle, experience, or point of view.",
        placeholder: "My perspective is...",
        reflections: [
          "What do you believe that others might not?",
          "What experience gives you credibility here?",
          "What makes your take different?",
          "What do you want to challenge?"
        ]
      },
      {
        question: "Who might find this valuable?",
        guidance: "Picture your reader and what they're looking for.",
        placeholder: "This could help someone who...",
        reflections: [
          "Who would care about this?",
          "What are they struggling with?",
          "What would they search for?",
          "Where would they find this?"
        ]
      },
      {
        question: "What's the core idea you want to share?",
        guidance: "The single most important thing you want to convey.",
        placeholder: "The main point is...",
        reflections: [
          "If they remember one thing?",
          "What's the bumper sticker version?",
          "What would you want them to quote?",
          "What's the thesis?"
        ]
      },
      {
        question: "What would make this feel complete?",
        guidance: "How you'll know when you've said what you needed to say.",
        placeholder: "It will feel complete when...",
        reflections: [
          "What's the ending look like?",
          "How long should this be?",
          "What must you include?",
          "What can you leave out?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What compelling opening would hook readers immediately?",
        guidance: "First paragraph that creates curiosity, relatability, or urgency.",
        placeholder: "Start with a question, surprising fact, personal story, or bold statement..."
      },
      {
        question: "What structure would best support your core message?",
        guidance: "Organization that builds logically toward your main point.",
        placeholder: "Problem-solution, chronological story, before-after, framework with examples..."
      },
      {
        question: "What headline captures the essence and makes people want to read?",
        guidance: "Title that's clear, specific, and promises value.",
        placeholder: "How to..., The truth about..., Why X is actually Y, X lessons from..."
      }
    ],
    promptIntro: "preparing to write something",
    promptSections: ["Topic & Direction", "My Perspective", "Intended Reader", "Core Message", "Vision for Completion"],
    deeperPromptSections: ["Opening Hook", "Structure", "Headline"],
    promptRequests: [
      "Write a compelling opening paragraph that draws readers in",
      "Create an outline with 3-5 main sections",
      "Draft the full piece (800-1200 words)",
      "Suggest a headline and 2 alternatives",
      "What might strengthen this piece further?"
    ]
  },

  presentation: {
    id: 'presentation',
    label: 'Presentation',
    steps: [
      {
        question: "What's the presentation about?",
        guidance: "The topic and the occasion.",
        placeholder: "I'm presenting about...",
        reflections: [
          "What's the context—meeting, conference, pitch?",
          "How long do you have?",
          "Is this informing, persuading, or inspiring?",
          "What's at stake?"
        ]
      },
      {
        question: "Who's the audience?",
        guidance: "Who will be there and what they care about.",
        placeholder: "The audience is...",
        reflections: [
          "What do they already know?",
          "What do they care about?",
          "What's their mood coming in?",
          "What's their power to act?"
        ]
      },
      {
        question: "What's the one thing you want them to remember?",
        guidance: "If they forget everything else, what should stick?",
        placeholder: "The one thing is...",
        reflections: [
          "What's the headline?",
          "What would they tell someone who wasn't there?",
          "What's the core truth?",
          "What would change their mind?"
        ]
      },
      {
        question: "What do you want them to do afterward?",
        guidance: "The action, decision, or shift you're hoping for.",
        placeholder: "I want them to...",
        reflections: [
          "What's the ask?",
          "What action should they take?",
          "What decision should they make?",
          "What should they feel?"
        ]
      },
      {
        question: "What's your strongest point or story?",
        guidance: "The most compelling evidence or moment you have.",
        placeholder: "My strongest point is...",
        reflections: [
          "What's your killer argument?",
          "What story illustrates your point best?",
          "What data is most persuasive?",
          "What's the 'mic drop' moment?"
        ]
      },
      {
        question: "What questions might they have?",
        guidance: "Objections, confusions, or curiosities to anticipate.",
        placeholder: "They might ask...",
        reflections: [
          "What will skeptics challenge?",
          "What might be confusing?",
          "What will they want to know more about?",
          "What's the hard question you hope they don't ask?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What narrative arc would build to your key takeaway most effectively?",
        guidance: "Story structure that creates tension and releases it at the right moment.",
        placeholder: "Start with problem they feel, build tension with data, release with solution, end with call to action..."
      },
      {
        question: "How should you open to immediately hook the audience?",
        guidance: "First 30 seconds that grab attention and establish credibility.",
        placeholder: "Surprising statistic, provocative question, personal story, bold statement..."
      },
      {
        question: "How should you close to inspire the action you want?",
        guidance: "Ending that creates urgency, clarity, and motivation.",
        placeholder: "Specific next step, emotional appeal, vision of success, call-back to opening..."
      }
    ],
    promptIntro: "preparing a presentation",
    promptSections: ["Topic & Occasion", "Audience", "Key Takeaway", "Desired Action", "Strongest Point", "Anticipated Questions"],
    deeperPromptSections: ["Narrative Arc", "Opening Hook", "Closing"],
    promptRequests: [
      "Create an outline that builds to my key takeaway",
      "Write a strong opening that hooks the audience",
      "Suggest how to structure my strongest point for maximum impact",
      "Draft answers to the questions I anticipate",
      "How should I close to inspire the action I want?"
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBLEM SOLVING & THINKING
  // ═══════════════════════════════════════════════════════════════════════════

  problem: {
    id: 'problem',
    label: 'Problem Solving',
    steps: [
      {
        question: "What's the challenge you're working through?",
        guidance: "Describe what's not working as you'd like.",
        placeholder: "The challenge is...",
        reflections: [
          "Is this a problem or a symptom?",
          "How would you know if this was solved?",
          "How long has this been a problem?",
          "Who else is affected?"
        ]
      },
      {
        question: "What context might be helpful?",
        guidance: "Background, timeline, or how this situation developed.",
        placeholder: "Some context...",
        reflections: [
          "What led to this situation?",
          "What's changed recently?",
          "What have you tried before?",
          "What constraints are you operating under?"
        ]
      },
      {
        question: "What have you considered so far?",
        guidance: "Previous ideas, attempts, or directions you've explored.",
        placeholder: "I've thought about...",
        reflections: [
          "What's been ruled out?",
          "What almost worked?",
          "What are you hesitant to try?",
          "What would someone else suggest?"
        ]
      },
      {
        question: "What constraints are you working within?",
        guidance: "Time, resources, or other boundaries to keep in mind.",
        placeholder: "The constraints include...",
        reflections: [
          "What can't you change?",
          "What resources are limited?",
          "What's the timeline?",
          "Which constraints are real vs. assumed?"
        ]
      },
      {
        question: "What would a good outcome look like?",
        guidance: "How things would be different once this is resolved.",
        placeholder: "A good outcome would be...",
        reflections: [
          "What does success look like?",
          "What would be different?",
          "What would you be able to do?",
          "What's 'good enough' vs. ideal?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What's the root cause vs. the surface symptoms?",
        guidance: "The underlying issue vs. what you're experiencing as problems.",
        placeholder: "Symptom: team misses deadlines, Root: unclear priorities and scope creep..."
      },
      {
        question: "What are 3 different approaches you could take, with trade-offs?",
        guidance: "Distinct strategies, each with pros and cons to consider.",
        placeholder: "Quick fix: faster but temporary, Systemic: slower but permanent, Hybrid: balanced approach..."
      },
      {
        question: "What would be the concrete next steps for your most promising approach?",
        guidance: "Specific, actionable tasks to move forward.",
        placeholder: "1. Schedule meeting with X, 2. Draft proposal, 3. Test with small group..."
      }
    ],
    promptIntro: "working through a challenge",
    promptSections: ["The Challenge", "Context", "What I've Considered", "Constraints", "Desired Outcome"],
    deeperPromptSections: ["Root Cause Analysis", "Alternative Approaches", "Action Steps"],
    promptRequests: [
      "Help me confirm I'm focusing on the right problem",
      "Suggest 3 different approaches, noting tradeoffs",
      "For the most promising approach, outline concrete steps",
      "What obstacles might I encounter?",
      "How will I know when this is resolved?"
    ]
  },

  thinking: {
    id: 'thinking',
    label: 'Thinking',
    steps: [
      {
        question: "What's on your mind?",
        guidance: "The thought, question, or topic you're exploring.",
        placeholder: "I've been thinking about...",
        reflections: [
          "What's the question underneath?",
          "Is this a decision, a problem, or an exploration?",
          "What's at stake?",
          "Why does this matter to you?"
        ]
      },
      {
        question: "Why is this coming up now?",
        guidance: "What made this feel relevant or important.",
        placeholder: "This is on my mind because...",
        reflections: [
          "What triggered this?",
          "Is there a deadline or decision approaching?",
          "What changed recently?",
          "Why couldn't this wait?"
        ]
      },
      {
        question: "What's your current sense of it?",
        guidance: "Your perspective or intuition so far.",
        placeholder: "My sense is...",
        reflections: [
          "What does your gut say?",
          "Where are you leaning?",
          "What feels true even if you can't prove it?",
          "What would you do if you had to decide now?"
        ]
      },
      {
        question: "What feels unclear or uncertain?",
        guidance: "Questions or gaps you're sitting with.",
        placeholder: "I'm uncertain about...",
        reflections: [
          "What would you need to know?",
          "What's the biggest unknown?",
          "What are you afraid might be true?",
          "What would change your mind?"
        ]
      },
      {
        question: "What would help you think about this?",
        guidance: "Information, perspectives, or frameworks that might be useful.",
        placeholder: "It would help to...",
        reflections: [
          "Who would you talk to about this?",
          "What question would unlock this?",
          "What framework might apply?",
          "What's worked before in similar situations?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What frameworks or mental models might illuminate this?",
        guidance: "Thinking tools, decision frameworks, or conceptual lenses that could help.",
        placeholder: "First principles thinking, cost-benefit analysis, reversible vs irreversible decisions..."
      },
      {
        question: "What perspectives or viewpoints might you be missing?",
        guidance: "Alternative angles, devil's advocate positions, or considerations you haven't explored.",
        placeholder: "Opposite viewpoint, long-term vs short-term, from another stakeholder's perspective..."
      },
      {
        question: "What question might be worth exploring next?",
        guidance: "The inquiry that could move your thinking forward most.",
        placeholder: "What would success really look like? What am I optimizing for? What's the real constraint?"
      }
    ],
    promptIntro: "exploring a topic",
    promptSections: ["What I'm Exploring", "Why This Matters Now", "My Current Sense", "What's Unclear", "What Would Help"],
    deeperPromptSections: ["Useful Frameworks", "Missing Perspectives", "Next Question"],
    promptRequests: [
      "Synthesize my thinking into a clear summary",
      "Address my uncertainties directly",
      "Offer 2-3 perspectives I may not have considered",
      "What frameworks or mental models might be useful here?",
      "What questions might be worth exploring next?"
    ]
  },

  planning: {
    id: 'planning',
    label: 'Planning',
    steps: [
      {
        question: "What are you planning?",
        guidance: "The project, sprint, or initiative.",
        placeholder: "I'm planning...",
        reflections: [
          "What's the scope?",
          "Is this a project, phase, or milestone?",
          "What's the timeframe?",
          "Is this solo or collaborative?"
        ]
      },
      {
        question: "What does success look like?",
        guidance: "How you'll know this went well.",
        placeholder: "Success looks like...",
        reflections: [
          "What's the outcome you're after?",
          "How will you measure success?",
          "What's the minimum viable success?",
          "What would exceed expectations?"
        ]
      },
      {
        question: "What are the main parts or phases?",
        guidance: "The big chunks this breaks into.",
        placeholder: "The main parts are...",
        reflections: [
          "What are the major milestones?",
          "What needs to happen in what order?",
          "What can happen in parallel?",
          "What are the natural breakpoints?"
        ]
      },
      {
        question: "What resources do you have?",
        guidance: "Time, people, tools, budget available.",
        placeholder: "I have...",
        reflections: [
          "What time do you actually have?",
          "Who's involved?",
          "What tools or budget do you have?",
          "What do you not have that you need?"
        ]
      },
      {
        question: "What could go wrong?",
        guidance: "Risks or obstacles to keep in mind.",
        placeholder: "What could go wrong...",
        reflections: [
          "What's the most likely problem?",
          "What's the worst case scenario?",
          "What's happened before in similar projects?",
          "What's outside your control?"
        ]
      },
      {
        question: "What's the first thing to do?",
        guidance: "The next concrete action.",
        placeholder: "First, I should...",
        reflections: [
          "What's the very next action?",
          "What could you do today?",
          "What needs to happen before other things can start?",
          "What would create momentum?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "What are you likely underestimating in this plan?",
        guidance: "Common planning pitfalls: time, complexity, dependencies, scope creep.",
        placeholder: "Time for integration, communication overhead, unexpected blockers, learning curve..."
      },
      {
        question: "What dependencies or sequencing constraints matter most?",
        guidance: "What must happen before what else can start, critical path items.",
        placeholder: "Need design approval before development, can't test until data migration complete..."
      },
      {
        question: "How will you track progress and know if you're on track?",
        guidance: "Metrics, check-ins, or milestones that indicate health.",
        placeholder: "Weekly standup, milestone completion dates, burn-down chart, deliverable checklist..."
      }
    ],
    promptIntro: "planning a project",
    promptSections: ["What I'm Planning", "Definition of Success", "Main Parts or Phases", "Available Resources", "Potential Risks", "First Action"],
    deeperPromptSections: ["Underestimation Risks", "Dependencies", "Progress Tracking"],
    promptRequests: [
      "Create a timeline with milestones",
      "What am I likely underestimating?",
      "Suggest a simple way to track progress",
      "What dependencies should I be aware of?",
      "Build a checklist for the first phase"
    ]
  },

  stuck: {
    id: 'stuck',
    label: 'Feeling Stuck',
    steps: [
      {
        question: "What are you stuck on?",
        guidance: "The thing that's not moving, even if it's vague.",
        placeholder: "I'm stuck on...",
        reflections: [
          "What's the actual blocker?",
          "Is this stuck in your head or in the world?",
          "What would moving forward look like?",
          "How long have you been stuck?"
        ]
      },
      {
        question: "What have you tried?",
        guidance: "Approaches that haven't worked, or nothing yet.",
        placeholder: "I've tried...",
        reflections: [
          "What didn't work?",
          "What almost worked?",
          "What haven't you tried yet?",
          "What would someone else try?"
        ]
      },
      {
        question: "What would unstick you?",
        guidance: "Information, clarity, direction, or something else.",
        placeholder: "I think I need...",
        reflections: [
          "What's actually blocking you?",
          "Is it knowledge, decision, or energy?",
          "What would make this easier?",
          "What are you waiting for?"
        ]
      },
      {
        question: "What's one tiny thing you could do right now?",
        guidance: "The smallest possible action. Not the whole thing.",
        placeholder: "One tiny thing...",
        reflections: [
          "What's a 2-minute version?",
          "What's the smallest piece of this?",
          "What would create any movement at all?",
          "What's so small it's almost silly?"
        ]
      }
    ],
    deeperSteps: [
      {
        question: "Why might you actually be stuck - what's the real resistance?",
        guidance: "Deeper obstacles: fear, perfectionism, unclear goal, decision paralysis, lack of skill.",
        placeholder: "Afraid of failure, waiting for perfect clarity, overwhelmed by scope, don't know how..."
      },
      {
        question: "What would the 'path of least resistance' forward look like?",
        guidance: "The easiest possible way to make any progress, even if imperfect.",
        placeholder: "Ask for help, use a template, ship something rough, reduce scope to minimal..."
      }
    ],
    promptIntro: "feeling stuck",
    promptSections: ["What I'm Stuck On", "What I've Tried", "What Would Unstick Me", "One Tiny Thing"],
    deeperPromptSections: ["Real Resistance", "Easiest Path Forward"],
    promptRequests: [
      "Help me understand why I might be stuck",
      "Suggest 3 different ways to approach this",
      "What question should I be asking myself?",
      "What's the path of least resistance forward?",
      "Break this into smaller pieces I can tackle"
    ]
  }

};

console.log(`All Kumagaizo Categories Loaded (${Object.keys(window.BLANKPAGE_CATEGORIES).length} categories)`);