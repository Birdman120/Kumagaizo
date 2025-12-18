// ═══════════════════════════════════════════════════════════════════════════
// KUMAGAIZO ENHANCEMENT MODULES
// Enhancement library for Implementation Path system
// Load order: BEFORE implementation-path-engine.js
// ═══════════════════════════════════════════════════════════════════════════

window.KumagaizoEnhancements = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SOFTWARE & CODING ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  
  coding: [
    {
      id: 'react-hooks',
      label: 'React Hooks Pattern',
      description: 'Enforce functional components with hooks',
      prompt: 'Use functional components with hooks only. No class-based components. Prefer useState, useEffect, and custom hooks.',
      insertAt: 'implementation',
      category: 'Framework'
    },
    {
      id: 'no-em-dash',
      label: 'No Em-Dashes',
      description: 'Avoid em-dashes in all output',
      prompt: 'Never use em-dashes (—) anywhere in code, comments, or documentation. Use colons for emphasis, parentheses for clarification, or separate sentences.',
      insertAt: 'quality',
      category: 'Style'
    },
    {
      id: 'error-handling',
      label: 'Error Handling Protocol',
      description: 'Comprehensive error management',
      prompt: 'Every function that can fail must include error handling. Use try-catch blocks. Provide user-friendly error messages. Log errors with context.',
      insertAt: 'implementation',
      category: 'Quality'
    },
    {
      id: 'accessibility',
      label: 'Accessibility First',
      description: 'WCAG 2.1 AA compliance',
      prompt: 'All interactive elements must have ARIA labels. Support keyboard navigation. Ensure color contrast meets WCAG 2.1 AA. Test with screen readers.',
      insertAt: 'implementation',
      category: 'Standards'
    },
    {
      id: 'typescript',
      label: 'TypeScript Strict',
      description: 'Type safety enforcement',
      prompt: 'Use TypeScript with strict mode enabled. Define interfaces for all props and function parameters. No use of "any" type unless absolutely necessary.',
      insertAt: 'implementation',
      category: 'Framework'
    },
    {
      id: 'test-coverage',
      label: 'Test Coverage',
      description: 'Require unit tests',
      prompt: 'Include unit tests for all core functions. Cover happy path and edge cases. Use descriptive test names that explain what is being tested.',
      insertAt: 'quality',
      category: 'Quality'
    }
  ],

  debugging: [
    {
      id: 'systematic-isolation',
      label: 'Systematic Isolation',
      description: 'Methodical debugging approach',
      prompt: 'Debug systematically: reproduce consistently, isolate the minimal failing case, verify assumptions with logging, fix root cause not symptoms.',
      insertAt: 'context',
      category: 'Methodology'
    },
    {
      id: 'logging-strategy',
      label: 'Logging Strategy',
      description: 'Strategic logging points',
      prompt: 'Add logging at: input validation, decision points, before external calls, error boundaries. Include timestamps and context. Remove after debugging.',
      insertAt: 'implementation',
      category: 'Methodology'
    },
    {
      id: 'regression-test',
      label: 'Regression Test',
      description: 'Prevent recurrence',
      prompt: 'After fixing, create a test that would have caught this bug. Ensure the fix does not break existing functionality. Document the root cause.',
      insertAt: 'quality',
      category: 'Quality'
    }
  ],

  architecture: [
    {
      id: 'scale-gradual',
      label: 'Scale Gradually',
      description: 'Build for current needs',
      prompt: 'Design for your actual current scale, not hypothetical future scale. Add complexity only when measurements prove it is needed. Premature optimization wastes time.',
      insertAt: 'context',
      category: 'Philosophy'
    },
    {
      id: 'observability',
      label: 'Observability First',
      description: 'Monitor and debug in production',
      prompt: 'Include structured logging, metrics, and tracing from the start. Every service should expose health checks. Plan for debugging production issues.',
      insertAt: 'implementation',
      category: 'Operations'
    },
    {
      id: 'data-flow',
      label: 'Data Flow Clarity',
      description: 'Explicit data movement',
      prompt: 'Make data flow explicit and unidirectional where possible. Document what data crosses service boundaries. Validate data at boundaries.',
      insertAt: 'implementation',
      category: 'Design'
    }
  ],

  codereview: [
    {
      id: 'security-focus',
      label: 'Security Focus',
      description: 'Prioritize security issues',
      prompt: 'Review specifically for: SQL injection risks, XSS vulnerabilities, authentication flaws, exposed secrets, insecure dependencies. Security issues take absolute priority.',
      insertAt: 'quality',
      category: 'Security'
    },
    {
      id: 'maintainability',
      label: 'Maintainability Check',
      description: 'Long-term code health',
      prompt: 'Evaluate: Can someone new understand this in 6 months? Are names clear? Is complexity justified? Are side effects obvious? Is there hidden coupling?',
      insertAt: 'quality',
      category: 'Quality'
    }
  ],

  api: [
    {
      id: 'rest-conventions',
      label: 'REST Conventions',
      description: 'Standard REST patterns',
      prompt: 'Follow REST conventions: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal. Use proper HTTP status codes. Keep endpoints resource-oriented.',
      insertAt: 'implementation',
      category: 'Standards'
    },
    {
      id: 'versioning',
      label: 'API Versioning',
      description: 'Version strategy',
      prompt: 'Include version in URL (e.g., /v1/). Never break existing versions. Provide deprecation warnings 6 months before sunset. Document migration paths.',
      insertAt: 'implementation',
      category: 'Standards'
    },
    {
      id: 'error-messages',
      label: 'Actionable Errors',
      description: 'Developer-friendly errors',
      prompt: 'Error responses must include: error code, human-readable message, what went wrong, how to fix it, link to docs. Make errors debuggable without support tickets.',
      insertAt: 'implementation',
      category: 'Quality'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCT & STRATEGY ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  product: [
    {
      id: 'jobs-to-be-done',
      label: 'Jobs-to-be-Done Frame',
      description: 'Focus on user jobs',
      prompt: 'Frame everything through Jobs-to-be-Done: What job is the user hiring this product to do? What are they firing? What job is underserved?',
      insertAt: 'context',
      category: 'Framework'
    },
    {
      id: 'validation-plan',
      label: 'Validation Plan',
      description: 'Test before building',
      prompt: 'Before building, define: What would prove this is worth building? What is the fastest way to test that? What would make you stop? What is your confidence threshold?',
      insertAt: 'quality',
      category: 'Methodology'
    },
    {
      id: 'competitive-moat',
      label: 'Competitive Moat',
      description: 'Sustainable advantage',
      prompt: 'Identify what makes this defensible: Network effects? Data advantage? Brand? High switching costs? If none exist, is this a feature not a product?',
      insertAt: 'context',
      category: 'Strategy'
    }
  ],

  feature: [
    {
      id: 'feature-flag',
      label: 'Feature Flag Strategy',
      description: 'Gradual rollout approach',
      prompt: 'Plan to launch behind a feature flag. Define rollout stages: internal team, beta users, percentage rollout, full release. Include rollback plan.',
      insertAt: 'implementation',
      category: 'Deployment'
    },
    {
      id: 'analytics-events',
      label: 'Analytics Events',
      description: 'Track feature usage',
      prompt: 'Define events to track: feature discovery, first use, successful completion, abandonment, errors. Track both usage and outcomes.',
      insertAt: 'implementation',
      category: 'Measurement'
    }
  ],

  userstory: [
    {
      id: 'acceptance-criteria',
      label: 'Acceptance Criteria',
      description: 'Clear definition of done',
      prompt: 'Include specific, testable acceptance criteria. Use Given-When-Then format: "Given [context], when [action], then [outcome]." Cover happy path and edge cases.',
      insertAt: 'quality',
      category: 'Standards'
    }
  ],

  techdecision: [
    {
      id: 'proof-of-concept',
      label: 'Proof of Concept',
      description: 'Validate with prototype',
      prompt: 'Before committing, build a minimal proof of concept. Time-box it to 1-2 days. Focus on the highest-risk assumption. Document what you learned.',
      insertAt: 'quality',
      category: 'Validation'
    },
    {
      id: 'team-skills',
      label: 'Team Skills Match',
      description: 'Consider team capability',
      prompt: 'Evaluate whether your team has expertise with this choice. Factor in: learning curve, available support, hiring difficulty if expertise is needed.',
      insertAt: 'context',
      category: 'Pragmatism'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN & UX ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  uxdesign: [
    {
      id: 'mobile-first',
      label: 'Mobile-First Design',
      description: 'Start with smallest screen',
      prompt: 'Design for mobile viewport first, then scale up. This forces prioritization of essential elements. Progressive enhancement over graceful degradation.',
      insertAt: 'implementation',
      category: 'Methodology'
    },
    {
      id: 'usability-testing',
      label: 'Usability Testing Plan',
      description: 'Test with real users',
      prompt: 'Plan to test with 5 users. Define tasks they should complete. Observe where they struggle. Ask them to think aloud. Fix critical issues before launch.',
      insertAt: 'quality',
      category: 'Validation'
    }
  ],

  uidesign: [
    {
      id: 'design-tokens',
      label: 'Design Tokens',
      description: 'Systematic design values',
      prompt: 'Use design tokens for: colors, spacing, typography, shadows, animations. Define once, reference everywhere. Makes changes systematic not scattered.',
      insertAt: 'implementation',
      category: 'Systems'
    },
    {
      id: 'dark-mode',
      label: 'Dark Mode Support',
      description: 'Light and dark themes',
      prompt: 'Design for both light and dark modes from the start. Use semantic color names (background, surface, primary) not literal (white, blue). Test in both modes.',
      insertAt: 'implementation',
      category: 'Standards'
    }
  ],

  designsystem: [
    {
      id: 'component-api',
      label: 'Component API Consistency',
      description: 'Predictable component props',
      prompt: 'Keep component APIs consistent: use same prop names across components (e.g., "variant" not "type" in one and "kind" in another). Document prop types and defaults.',
      insertAt: 'implementation',
      category: 'Standards'
    }
  ],

  designcritique: [
    {
      id: 'heuristic-evaluation',
      label: 'Heuristic Evaluation',
      description: 'Nielsen heuristics check',
      prompt: 'Evaluate against Nielsen\'s 10 usability heuristics: visibility of status, match to real world, user control, consistency, error prevention, recognition over recall, flexibility, aesthetic design, error recovery, help documentation.',
      insertAt: 'quality',
      category: 'Framework'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // RESEARCH & ANALYSIS ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  research: [
    {
      id: 'primary-sources',
      label: 'Primary Sources First',
      description: 'Go to original sources',
      prompt: 'Prioritize primary sources: original research papers, official documentation, direct data. Secondary sources can misinterpret. Verify claims at the source.',
      insertAt: 'implementation',
      category: 'Methodology'
    },
    {
      id: 'bias-check',
      label: 'Bias Recognition',
      description: 'Identify potential bias',
      prompt: 'Consider: Who funded this research? What would they gain from these conclusions? What is not being measured? Who is excluded from the sample? What assumptions are made?',
      insertAt: 'quality',
      category: 'Critical Thinking'
    }
  ],

  userresearch: [
    {
      id: 'open-questions',
      label: 'Open-Ended Questions',
      description: 'Avoid leading questions',
      prompt: 'Ask open-ended questions: "Tell me about..." not "Do you like...?". Avoid leading questions. Let users describe their experience in their own words.',
      insertAt: 'implementation',
      category: 'Methodology'
    }
  ],

  competitive: [
    {
      id: 'porter-five-forces',
      label: 'Porter\'s Five Forces',
      description: 'Competitive analysis framework',
      prompt: 'Analyze using Porter\'s Five Forces: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, competitive rivalry. Where is the power concentrated?',
      insertAt: 'context',
      category: 'Framework'
    }
  ],

  dataanalysis: [
    {
      id: 'statistical-significance',
      label: 'Statistical Significance',
      description: 'Verify significance',
      prompt: 'Check statistical significance before drawing conclusions. Define confidence level (typically 95%). Calculate p-values. Account for multiple comparisons. Correlation is not causation.',
      insertAt: 'quality',
      category: 'Rigor'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CREATIVITY & WRITING ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  ideation: [
    {
      id: 'quantity-first',
      label: 'Quantity Before Quality',
      description: 'Generate volume first',
      prompt: 'Generate 20+ ideas before evaluating any. Defer judgment. Build on others\' ideas. Go for volume. Weird ideas welcome. Evaluation kills creativity.',
      insertAt: 'context',
      category: 'Methodology'
    },
    {
      id: 'constraints-spark',
      label: 'Productive Constraints',
      description: 'Use constraints to spark ideas',
      prompt: 'Add constraints to spark creativity: "What if we had 1/10th the budget?" "What if users had no hands?" "What would the opposite approach be?" Constraints force novel solutions.',
      insertAt: 'implementation',
      category: 'Technique'
    }
  ],

  creative: [
    {
      id: 'reference-mood',
      label: 'Reference & Mood',
      description: 'Gather visual references',
      prompt: 'Before creating, gather 10+ reference examples. Create a mood board. Identify what you want to capture from each. References inform, not constrain.',
      insertAt: 'context',
      category: 'Process'
    }
  ],

  naming: [
    {
      id: 'domain-check',
      label: 'Domain Availability',
      description: 'Check domain before committing',
      prompt: 'Before finalizing names, check: .com domain availability, trademark conflicts, social media handles, unintended meanings in other languages.',
      insertAt: 'quality',
      category: 'Pragmatism'
    }
  ],

  writing: [
    {
      id: 'hemingway-clarity',
      label: 'Hemingway Clarity',
      description: 'Simplify sentence structure',
      prompt: 'Write like Hemingway: short sentences, common words, active voice. Cut adverbs. One idea per sentence. Clarity over cleverness.',
      insertAt: 'implementation',
      category: 'Style'
    },
    {
      id: 'read-aloud',
      label: 'Read Aloud Test',
      description: 'Test rhythm and flow',
      prompt: 'Read the draft aloud. Awkward phrasing becomes obvious when spoken. If you stumble, readers will too. Rhythm matters.',
      insertAt: 'quality',
      category: 'Technique'
    }
  ],

  technicalwriting: [
    {
      id: 'code-examples',
      label: 'Working Code Examples',
      description: 'Include runnable examples',
      prompt: 'Include working code examples that users can copy and run. Show both correct usage and common mistakes. Examples should be realistic, not contrived.',
      insertAt: 'implementation',
      category: 'Standards'
    }
  ],

  presentation: [
    {
      id: 'rule-of-three',
      label: 'Rule of Three',
      description: 'Three key points maximum',
      prompt: 'Limit presentations to three main points. Humans remember three things. More than that, and nothing sticks. What are your three key takeaways?',
      insertAt: 'context',
      category: 'Framework'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PROBLEM SOLVING ENHANCEMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  problemsolving: [
    {
      id: 'five-whys',
      label: 'Five Whys',
      description: 'Find root cause',
      prompt: 'Ask "why" five times to find root cause. Don\'t stop at symptoms. Each answer becomes the next question. Stop when you reach something actionable.',
      insertAt: 'context',
      category: 'Framework'
    },
    {
      id: 'inversion',
      label: 'Inversion Thinking',
      description: 'Consider the opposite',
      prompt: 'Invert the problem: Instead of "how to succeed?" ask "how would we guarantee failure?" Avoiding failure is often clearer than achieving success.',
      insertAt: 'implementation',
      category: 'Technique'
    }
  ],

  thinking: [
    {
      id: 'mental-models',
      label: 'Mental Models',
      description: 'Apply multiple frameworks',
      prompt: 'Apply multiple mental models: first principles, second-order thinking, opportunity cost, margin of safety, feedback loops. Different lenses reveal different insights.',
      insertAt: 'context',
      category: 'Framework'
    }
  ],

  planning: [
    {
      id: 'buffer-time',
      label: 'Buffer Time',
      description: 'Add 50% margin',
      prompt: 'Add 50% buffer to all estimates. Things take longer than expected. Unknown unknowns emerge. Slack allows adaptation. Tight plans break on contact with reality.',
      insertAt: 'implementation',
      category: 'Pragmatism'
    }
  ],

  stuck: [
    {
      id: 'rubber-duck',
      label: 'Rubber Duck Debug',
      description: 'Explain to someone else',
      prompt: 'Explain your problem to someone else (or a rubber duck). The act of articulating often reveals the solution. Describing the problem IS solving the problem.',
      insertAt: 'context',
      category: 'Technique'
    },
    {
      id: 'change-context',
      label: 'Change Context',
      description: 'Switch environment',
      prompt: 'Change your context: take a walk, work in a different location, switch to a different task. Insights often come when you stop trying. The diffuse mode solves what focused mode cannot.',
      insertAt: 'implementation',
      category: 'Technique'
    }
  ]
};

console.log('Kumagaizo Enhancement Modules Loaded');
console.log(`  → ${Object.keys(window.KumagaizoEnhancements).length} categories`);
console.log(`  → ${Object.values(window.KumagaizoEnhancements).flat().length} total enhancements`);