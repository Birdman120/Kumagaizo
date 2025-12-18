// ═══════════════════════════════════════════════════════════════════════════
// KUMAGAIZO THINKING ANALYSIS
// Analyzes user responses to surface thinking gaps, strengths, and anti-patterns
// Load order: AFTER enhancement modules, BEFORE implementation-path-engine.js
// ═══════════════════════════════════════════════════════════════════════════

window.KumagaizoThinkingAnalysis = (function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSE QUALITY ANALYSIS
  // ─────────────────────────────────────────────────────────────────────────

  const QUALITY_THRESHOLDS = {
    thin: 50,        // Under 50 chars = underthought
    minimal: 100,    // Under 100 chars = minimal
    adequate: 200,   // Under 200 chars = adequate
    thorough: 300    // 300+ chars = thorough
  };

  const UNCERTAINTY_MARKERS = [
    'maybe', 'probably', 'i think', 'not sure', 'might', 'could be',
    'i guess', 'perhaps', 'possibly', 'unsure', 'don\'t know', 'unclear'
  ];

  const SPECIFICITY_MARKERS = [
    /\d+/, // numbers
    /specifically/i,
    /exactly/i,
    /must/i,
    /cannot/i,
    /always/i,
    /never/i,
    /require/i,
    /constraint/i,
    /limit/i
  ];

  const VAGUE_PHRASES = [
    'etc', 'and so on', 'stuff like that', 'things like', 'whatever',
    'something like', 'kind of', 'sort of', 'basically', 'just'
  ];

  function analyzeResponseQuality(response, stepQuestion) {
    if (!response || !response.trim()) {
      return {
        strength: 'empty',
        score: 0,
        flags: ['No response provided - AI will make assumptions here'],
        suggestions: ['This step needs your input to guide AI effectively']
      };
    }

    const text = response.trim();
    const analysis = {
      strength: 'unknown',
      score: 0,
      flags: [],
      suggestions: []
    };

    // Length analysis
    const lengthScore = calculateLengthScore(text);
    
    // Uncertainty analysis
    const uncertaintyScore = calculateUncertaintyScore(text);
    
    // Specificity analysis
    const specificityScore = calculateSpecificityScore(text);
    
    // Vagueness analysis
    const vaguenessScore = calculateVaguenessScore(text);

    // Combined score (0-100)
    analysis.score = Math.round(
      (lengthScore * 0.25) + 
      (uncertaintyScore * 0.25) + 
      (specificityScore * 0.30) + 
      (vaguenessScore * 0.20)
    );

    // Determine strength category
    if (analysis.score >= 75) {
      analysis.strength = 'solid';
    } else if (analysis.score >= 50) {
      analysis.strength = 'adequate';
    } else if (analysis.score >= 25) {
      analysis.strength = 'thin';
    } else {
      analysis.strength = 'weak';
    }

    // Generate specific flags and suggestions
    if (lengthScore < 40) {
      analysis.flags.push('Brief response - AI will fill gaps with assumptions');
      analysis.suggestions.push('Add more detail about your specific situation');
    }

    if (uncertaintyScore < 50) {
      const uncertainCount = countMatches(text, UNCERTAINTY_MARKERS);
      analysis.flags.push(`${uncertainCount} uncertainty markers detected`);
      analysis.suggestions.push('Resolve uncertainties before AI engagement, or explicitly ask AI to help clarify');
    }

    if (specificityScore < 40) {
      analysis.flags.push('Low specificity - response is general');
      analysis.suggestions.push('Add concrete details: numbers, constraints, specific requirements');
    }

    if (vaguenessScore < 50) {
      analysis.flags.push('Contains vague language');
      analysis.suggestions.push('Replace vague terms with precise descriptions');
    }

    return analysis;
  }

  function calculateLengthScore(text) {
    const len = text.length;
    if (len >= QUALITY_THRESHOLDS.thorough) return 100;
    if (len >= QUALITY_THRESHOLDS.adequate) return 75;
    if (len >= QUALITY_THRESHOLDS.minimal) return 50;
    if (len >= QUALITY_THRESHOLDS.thin) return 25;
    return 10;
  }

  function calculateUncertaintyScore(text) {
    const lowerText = text.toLowerCase();
    const uncertainCount = countMatches(lowerText, UNCERTAINTY_MARKERS);
    const wordCount = text.split(/\s+/).length;
    const uncertaintyDensity = uncertainCount / Math.max(wordCount, 1);
    
    // Lower density = higher score (less uncertainty is better)
    if (uncertaintyDensity === 0) return 100;
    if (uncertaintyDensity < 0.02) return 80;
    if (uncertaintyDensity < 0.05) return 60;
    if (uncertaintyDensity < 0.10) return 40;
    return 20;
  }

  function calculateSpecificityScore(text) {
    let specificityPoints = 0;
    
    SPECIFICITY_MARKERS.forEach(marker => {
      if (marker instanceof RegExp) {
        if (marker.test(text)) specificityPoints += 15;
      } else {
        if (text.toLowerCase().includes(marker)) specificityPoints += 15;
      }
    });

    return Math.min(specificityPoints, 100);
  }

  function calculateVaguenessScore(text) {
    const lowerText = text.toLowerCase();
    const vagueCount = countMatches(lowerText, VAGUE_PHRASES);
    
    // Fewer vague phrases = higher score
    if (vagueCount === 0) return 100;
    if (vagueCount === 1) return 70;
    if (vagueCount === 2) return 50;
    if (vagueCount <= 4) return 30;
    return 10;
  }

  function countMatches(text, patterns) {
    let count = 0;
    patterns.forEach(pattern => {
      if (pattern instanceof RegExp) {
        const matches = text.match(new RegExp(pattern, 'gi'));
        if (matches) count += matches.length;
      } else {
        const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = text.match(regex);
        if (matches) count += matches.length;
      }
    });
    return count;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ANTI-PATTERN DETECTION (Category-Specific)
  // ─────────────────────────────────────────────────────────────────────────

  const ANTI_PATTERNS = {
    // Software & Coding
    coding: [
      {
        id: 'no-simplicity-constraint',
        name: 'No Simplicity Constraint',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/simple|minimal|basic|just|only|mvp|start with/i);
        },
        risk: 'Without explicit simplicity constraints, AI tends to over-engineer solutions.',
        suggestion: 'Add "start with the simplest possible version" or "MVP first" to your context.'
      },
      {
        id: 'what-without-how',
        name: 'What Without How',
        detect: (responses) => {
          const building = responses[0]?.trim() || '';
          const logic = responses[1]?.trim() || '';
          return building.length > 50 && logic.length < 30;
        },
        risk: 'You described what to build but not how it should work. AI will make architectural decisions for you.',
        suggestion: 'Spend 5 minutes sketching the core logic flow before continuing.'
      },
      {
        id: 'no-error-consideration',
        name: 'No Error Handling Mentioned',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/error|fail|catch|exception|invalid|edge case|handle/i);
        },
        risk: 'No error scenarios mentioned. AI may produce happy-path-only code.',
        suggestion: 'Add what should happen when things go wrong.'
      },
      {
        id: 'premature-optimization',
        name: 'Premature Optimization',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          const hasScaleWords = allText.match(/scale|performance|optimize|million|fast|efficient/i);
          const hasCurrentState = allText.match(/currently|right now|today|at the moment|existing/i);
          return hasScaleWords && !hasCurrentState;
        },
        risk: 'Optimizing for scale without knowing current state leads to unnecessary complexity.',
        suggestion: 'Add your current scale/load. Design for 10x that, not hypothetical millions.'
      }
    ],

    debugging: [
      {
        id: 'symptom-focus',
        name: 'Symptom Over Root Cause',
        detect: (responses) => {
          const notWorking = responses[0]?.toLowerCase() || '';
          const guess = responses[4]?.toLowerCase() || '';
          return notWorking.length > 50 && (!guess || guess.length < 20);
        },
        risk: 'Focused on symptoms without hypothesis about root cause. May lead to whack-a-mole debugging.',
        suggestion: 'Form a hypothesis about WHY this is happening before asking AI.'
      },
      {
        id: 'no-reproduction-steps',
        name: 'No Reproduction Steps',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/step|reproduce|trigger|when i|after|before|sequence/i);
        },
        risk: 'Without reproduction steps, debugging will be trial-and-error.',
        suggestion: 'Document exact steps to reproduce the issue consistently.'
      },
      {
        id: 'shotgun-debugging',
        name: 'Shotgun Debugging',
        detect: (responses) => {
          const tried = responses[3]?.toLowerCase() || '';
          const triedCount = (tried.match(/tried|changed|modified|updated|fixed/gi) || []).length;
          return triedCount >= 3 && tried.length < 150;
        },
        risk: 'Multiple random changes without understanding. Each change adds noise.',
        suggestion: 'Revert to known good state, then make one change at a time with hypothesis.'
      }
    ],

    architecture: [
      {
        id: 'hypothetical-scale',
        name: 'Designing for Hypothetical Scale',
        detect: (responses) => {
          const scale = responses[2]?.toLowerCase() || '';
          const hasHypothetical = scale.match(/million|massive|huge|enterprise|global/i);
          const hasCurrent = scale.match(/currently|today|now|existing|at the moment/i);
          return hasHypothetical && !hasCurrent;
        },
        risk: 'Designing for scale you don\'t have leads to premature complexity.',
        suggestion: 'What\'s your ACTUAL current scale? Design for 10x that, not 1000x.'
      },
      {
        id: 'buzzword-architecture',
        name: 'Buzzword-Driven Design',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          const buzzwords = ['microservices', 'kubernetes', 'serverless', 'blockchain', 'ai/ml', 'event-driven'];
          const buzzwordCount = buzzwords.filter(b => allText.includes(b)).length;
          return buzzwordCount >= 2;
        },
        risk: 'Technology choices should follow requirements, not trends.',
        suggestion: 'For each technology mentioned, ask: "What specific problem does this solve for me?"'
      },
      {
        id: 'no-constraints',
        name: 'No Clear Constraints',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/cannot|must not|limit|constraint|budget|deadline|team size|cannot use/i);
        },
        risk: 'Without constraints, AI will suggest idealized solutions that may not fit reality.',
        suggestion: 'Add real constraints: team size, budget, timeline, existing systems, skill gaps.'
      }
    ],

    codereview: [
      {
        id: 'no-context',
        name: 'Code Without Context',
        detect: (responses) => {
          const whatItDoes = responses[0]?.trim() || '';
          return whatItDoes.length < 50;
        },
        risk: 'Reviewing code without understanding purpose leads to superficial feedback.',
        suggestion: 'Explain what this code is supposed to accomplish and why it exists.'
      },
      {
        id: 'everything-focus',
        name: 'No Specific Focus',
        detect: (responses) => {
          const unsure = responses[1]?.trim() || '';
          const focus = responses[2]?.trim() || '';
          return unsure.length < 20 && focus.length < 20;
        },
        risk: 'Asking for general review gets generic feedback. Specific concerns get specific help.',
        suggestion: 'What are you MOST worried about? Security? Performance? Maintainability?'
      }
    ],

    api: [
      {
        id: 'internal-focus',
        name: 'Internal Implementation Focus',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          const hasInternalTerms = allText.match(/database|internal|implementation|backend/i);
          const hasUserTerms = allText.match(/developer|user|client|consumer|integrate/i);
          return hasInternalTerms && !hasUserTerms;
        },
        risk: 'API design focused on internal implementation rather than developer experience.',
        suggestion: 'Think from API consumer perspective: What would make this intuitive to use?'
      },
      {
        id: 'no-error-design',
        name: 'No Error Response Design',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/error|fail|invalid|400|401|403|404|500|exception/i);
        },
        risk: 'APIs without clear error design frustrate developers and make debugging hard.',
        suggestion: 'Define what errors can occur and what information helps users fix them.'
      }
    ],

    // Product & Strategy
    product: [
      {
        id: 'solution-before-problem',
        name: 'Solution Before Problem',
        detect: (responses) => {
          const problem = responses[0]?.toLowerCase() || '';
          const hasSolutionWords = problem.match(/build|create|make|app|feature|tool/i);
          const hasProblemWords = problem.match(/problem|pain|struggle|frustrat|need|want/i);
          return hasSolutionWords && !hasProblemWords;
        },
        risk: 'Starting with solution, not problem. May build something nobody needs.',
        suggestion: 'Reframe: What problem does this solve? For whom? How painful is it?'
      },
      {
        id: 'no-validation',
        name: 'No Validation Plan',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/test|validate|measure|user|feedback|interview|prototype/i);
        },
        risk: 'Building without validation plan risks wasted effort.',
        suggestion: 'How will you know if this works? What would prove you wrong?'
      }
    ],

    // Design & UX
    uxdesign: [
      {
        id: 'no-user-context',
        name: 'No User Context',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/user|customer|people|they|visitor|audience/i);
        },
        risk: 'Designing without user context leads to self-referential design.',
        suggestion: 'Who is this for? What do they know? What are they trying to accomplish?'
      },
      {
        id: 'feature-focused',
        name: 'Feature-Focused, Not Goal-Focused',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          const hasFeatures = allText.match(/button|menu|dropdown|modal|page|screen/i);
          const hasGoals = allText.match(/accomplish|achieve|goal|complete|success|outcome/i);
          return hasFeatures && !hasGoals;
        },
        risk: 'Focused on UI elements, not user goals. May miss the point.',
        suggestion: 'What is the user trying to accomplish? Work backwards from that.'
      }
    ],

    // Research & Analysis
    research: [
      {
        id: 'confirmation-bias',
        name: 'Potential Confirmation Bias',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return allText.match(/prove|confirm|show that|evidence for/i) && 
                 !allText.match(/disprove|against|challenge|alternative/i);
        },
        risk: 'Looking for confirmation, not truth. May miss contradicting evidence.',
        suggestion: 'Also search for evidence that contradicts your hypothesis.'
      }
    ],

    // Writing & Communication
    writing: [
      {
        id: 'no-audience',
        name: 'No Clear Audience',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/reader|audience|for|who|they|people|developer|manager|customer/i);
        },
        risk: 'Writing without audience clarity leads to generic content.',
        suggestion: 'Who is this for? What do they already know? What do they need?'
      },
      {
        id: 'no-purpose',
        name: 'No Clear Purpose',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return !allText.match(/goal|purpose|want them to|should|convince|inform|teach|explain/i);
        },
        risk: 'Writing without purpose meanders. AI will generate filler.',
        suggestion: 'After reading this, what should the reader know, feel, or do?'
      }
    ],

    // Problem Solving
    problemsolving: [
      {
        id: 'symptoms-not-causes',
        name: 'Treating Symptoms',
        detect: (responses) => {
          const problem = responses[0]?.toLowerCase() || '';
          const hasSurfaceWords = problem.match(/not working|broken|slow|failing|error/i);
          const hasRootWords = problem.match(/because|root cause|underlying|fundamental|why/i);
          return hasSurfaceWords && !hasRootWords;
        },
        risk: 'Describing symptoms, not causes. May solve the wrong problem.',
        suggestion: 'Ask "why" 5 times to find root cause before solving.'
      }
    ],

    // Ideation
    ideation: [
      {
        id: 'self-censoring',
        name: 'Pre-Filtering Ideas',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          return allText.match(/realistic|practical|feasible|possible|can\'t|won\'t work/i);
        },
        risk: 'Filtering ideas too early kills creativity. Evaluation comes later.',
        suggestion: 'In ideation phase, suspend judgment. Generate first, evaluate later.'
      }
    ],

    // Feeling Stuck
    stuck: [
      {
        id: 'circular-thinking',
        name: 'Circular Thinking Detected',
        detect: (responses) => {
          const allText = responses.join(' ').toLowerCase();
          const repeated = findRepeatedPhrases(allText);
          return repeated.length >= 2;
        },
        risk: 'Repeating same thoughts without progress. Need pattern interrupt.',
        suggestion: 'Try explaining to someone else, or invert the problem: "How would I guarantee failure?"'
      }
    ]
  };

  function findRepeatedPhrases(text) {
    const words = text.split(/\s+/);
    const phrases = [];
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = words.slice(i, i + 3).join(' ');
      if (text.indexOf(phrase) !== text.lastIndexOf(phrase)) {
        if (!phrases.includes(phrase)) phrases.push(phrase);
      }
    }
    return phrases;
  }

  function detectAntiPatterns(responses, categoryId) {
    const patterns = ANTI_PATTERNS[categoryId] || [];
    const detected = [];

    patterns.forEach(pattern => {
      try {
        if (pattern.detect(responses)) {
          detected.push({
            id: pattern.id,
            name: pattern.name,
            risk: pattern.risk,
            suggestion: pattern.suggestion
          });
        }
      } catch (e) {
        console.warn(`Anti-pattern detection failed for ${pattern.id}:`, e);
      }
    });

    return detected;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // COVERAGE GAP DETECTION
  // ─────────────────────────────────────────────────────────────────────────

  const COVERAGE_DIMENSIONS = {
    // Software & Coding
    coding: ['what', 'how', 'constraints', 'errors', 'success-criteria'],
    debugging: ['symptoms', 'expected', 'changed', 'tried', 'hypothesis'],
    architecture: ['purpose', 'requirements', 'scale', 'components', 'tradeoffs'],
    codereview: ['purpose', 'concerns', 'focus', 'constraints'],
    api: ['purpose', 'users', 'operations', 'errors'],
    
    // Product & Strategy
    product: ['problem', 'users', 'solution', 'validation'],
    feature: ['feature', 'why', 'users', 'experience', 'edge-cases'],
    userstory: ['who', 'what', 'why', 'done'],
    techdecision: ['decision', 'context', 'options', 'criteria'],
    
    // Design & UX
    uxdesign: ['designing', 'users', 'pain', 'goals', 'constraints'],
    uidesign: ['interface', 'purpose', 'constraints', 'style'],
    designsystem: ['building', 'scope', 'users', 'components'],
    designcritique: ['design', 'goals', 'audience', 'concerns'],
    
    // Research & Analysis
    research: ['topic', 'why', 'using', 'questions', 'depth'],
    userresearch: ['learning', 'users', 'method', 'questions'],
    competitive: ['analyzing', 'purpose', 'focus', 'competitors'],
    dataanalysis: ['data', 'question', 'using', 'approach'],
    
    // Creativity & Ideation
    ideation: ['challenge', 'constraints', 'goal', 'direction'],
    creative: ['creating', 'purpose', 'audience', 'style'],
    naming: ['naming', 'qualities', 'audience', 'style'],
    
    // Writing & Communication
    writing: ['writing', 'purpose', 'audience', 'tone'],
    technicalwriting: ['documenting', 'users', 'purpose', 'scope'],
    presentation: ['topic', 'audience', 'goal', 'duration'],
    
    // Problem Solving & Thinking
    problemsolving: ['problem', 'impact', 'attempted', 'constraints'],
    thinking: ['thinking', 'why', 'outcome', 'knowns', 'unknowns'],
    planning: ['planning', 'goal', 'timeline', 'resources'],
    stuck: ['stuck', 'tried', 'matters']
  };

  function detectCoverageGaps(responses, categoryId, steps) {
    const gaps = [];
    const dimensions = COVERAGE_DIMENSIONS[categoryId] || [];

    responses.forEach((response, index) => {
      const step = steps[index];
      if (!step) return;

      const quality = analyzeResponseQuality(response, step.question);
      
      if (quality.strength === 'empty' || quality.strength === 'weak') {
        gaps.push({
          stepIndex: index,
          stepQuestion: step.question,
          severity: quality.strength === 'empty' ? 'critical' : 'high',
          message: quality.flags[0] || 'This area needs more thought',
          suggestion: quality.suggestions[0] || 'Add more detail'
        });
      } else if (quality.strength === 'thin') {
        gaps.push({
          stepIndex: index,
          stepQuestion: step.question,
          severity: 'medium',
          message: 'Brief response - AI will make assumptions',
          suggestion: quality.suggestions[0] || 'Consider adding specifics'
        });
      }
    });

    return gaps;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN ANALYSIS FUNCTION
  // ─────────────────────────────────────────────────────────────────────────

  function analyzeThinking(sessionState, category) {
    if (!sessionState || !category) {
      return null;
    }

    const responses = [...sessionState.stepResponses];
    if (sessionState.digDeeperMode && sessionState.deeperResponses) {
      responses.push(...sessionState.deeperResponses);
    }

    const steps = [...category.steps];
    if (sessionState.digDeeperMode && category.deeperSteps) {
      steps.push(...category.deeperSteps);
    }

    // Analyze each response
    const responseAnalyses = responses.map((response, index) => {
      const step = steps[index];
      const quality = analyzeResponseQuality(response, step?.question || '');
      return {
        stepIndex: index,
        stepQuestion: step?.question || `Step ${index + 1}`,
        response: response,
        ...quality
      };
    });

    // Calculate overall coverage score
    const validScores = responseAnalyses.filter(a => a.strength !== 'empty').map(a => a.score);
    const overallScore = validScores.length > 0 
      ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
      : 0;

    // Detect anti-patterns
    const antiPatterns = detectAntiPatterns(responses, category.id);

    // Detect coverage gaps
    const coverageGaps = detectCoverageGaps(responses, category.id, steps);

    // Identify strengths
    const strengths = responseAnalyses
      .filter(a => a.strength === 'solid' || a.score >= 70)
      .map(a => ({
        stepQuestion: a.stepQuestion,
        score: a.score
      }));

    // Identify areas needing attention
    const needsAttention = responseAnalyses
      .filter(a => a.strength === 'thin' || a.strength === 'weak' || a.strength === 'empty')
      .map(a => ({
        stepQuestion: a.stepQuestion,
        strength: a.strength,
        flags: a.flags,
        suggestions: a.suggestions
      }));

    return {
      overallScore,
      overallStrength: getOverallStrength(overallScore),
      responseAnalyses,
      antiPatterns,
      coverageGaps,
      strengths,
      needsAttention,
      summary: generateSummary(overallScore, antiPatterns, coverageGaps, strengths)
    };
  }

  function getOverallStrength(score) {
    if (score >= 75) return 'solid';
    if (score >= 50) return 'adequate';
    if (score >= 25) return 'thin';
    return 'weak';
  }

  function generateSummary(score, antiPatterns, gaps, strengths) {
    const parts = [];

    if (score >= 75) {
      parts.push('Your thinking is well-developed.');
    } else if (score >= 50) {
      parts.push('Your thinking covers the basics but has some gaps.');
    } else {
      parts.push('Your responses need more depth for AI to be effective.');
    }

    if (antiPatterns.length > 0) {
      parts.push(`${antiPatterns.length} potential issue${antiPatterns.length > 1 ? 's' : ''} detected.`);
    }

    if (gaps.filter(g => g.severity === 'critical').length > 0) {
      parts.push('Some critical areas need attention.');
    }

    if (strengths.length > 0) {
      parts.push(`Strong coverage in ${strengths.length} area${strengths.length > 1 ? 's' : ''}.`);
    }

    return parts.join(' ');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UI RENDERING
  // ─────────────────────────────────────────────────────────────────────────

  function renderThinkingAnalysis(analysis, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('Thinking Analysis: Container not found:', containerId);
      return;
    }

    container.innerHTML = '';
    container.className = 'thinking-analysis';

    // Header with overall score
    const header = document.createElement('div');
    header.className = 'thinking-analysis-header';
    header.innerHTML = `
      <div class="analysis-title">
        <span class="analysis-icon">◉</span>
        <span>Thinking Analysis</span>
      </div>
      <div class="analysis-summary">${escapeHTML(analysis.summary)}</div>
    `;
    container.appendChild(header);

    // Coverage bar
    const coverageBar = document.createElement('div');
    coverageBar.className = 'coverage-bar-container';
    coverageBar.innerHTML = `
      <div class="coverage-label">
        <span>Your coverage</span>
        <span class="coverage-score">${analysis.overallScore}%</span>
      </div>
      <div class="coverage-bar">
        <div class="coverage-fill coverage-${analysis.overallStrength}" style="width: ${analysis.overallScore}%"></div>
      </div>
    `;
    container.appendChild(coverageBar);

    // Strengths (if any)
    if (analysis.strengths.length > 0) {
      const strengthsEl = document.createElement('div');
      strengthsEl.className = 'analysis-section strengths-section';
      strengthsEl.innerHTML = `
        <div class="section-header">
          <span class="section-icon">✓</span>
          <span>Strong Areas</span>
        </div>
        <div class="section-content">
          ${analysis.strengths.map(s => `
            <div class="strength-item">${escapeHTML(truncateQuestion(s.stepQuestion))}</div>
          `).join('')}
        </div>
      `;
      container.appendChild(strengthsEl);
    }

    // Needs attention (if any)
    if (analysis.needsAttention.length > 0) {
      const attentionEl = document.createElement('div');
      attentionEl.className = 'analysis-section attention-section';
      attentionEl.innerHTML = `
        <div class="section-header">
          <span class="section-icon">○</span>
          <span>Needs More Depth</span>
        </div>
        <div class="section-content">
          ${analysis.needsAttention.map(a => `
            <div class="attention-item">
              <div class="attention-question">${escapeHTML(truncateQuestion(a.stepQuestion))}</div>
              <div class="attention-suggestion">${escapeHTML(a.suggestions[0] || 'Add more detail')}</div>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(attentionEl);
    }

    // Anti-patterns (if any)
    if (analysis.antiPatterns.length > 0) {
      const patternsEl = document.createElement('div');
      patternsEl.className = 'analysis-section patterns-section';
      patternsEl.innerHTML = `
        <div class="section-header warning">
          <span class="section-icon">○</span>
          <span>Potential Issues</span>
        </div>
        <div class="section-content">
          ${analysis.antiPatterns.map(p => `
            <div class="pattern-item">
              <div class="pattern-name">${escapeHTML(p.name)}</div>
              <div class="pattern-risk">${escapeHTML(p.risk)}</div>
              <div class="pattern-suggestion">${escapeHTML(p.suggestion)}</div>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(patternsEl);
    }

    // Show container
    container.style.display = 'block';
  }

  function truncateQuestion(question) {
    if (!question) return '';
    // Remove question mark and truncate
    const clean = question.replace(/\?$/, '');
    if (clean.length <= 40) return clean;
    return clean.substring(0, 37) + '...';
  }

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EXTENSION SUPPORT
  // ─────────────────────────────────────────────────────────────────────────

  function extendPatterns(newPatterns) {
    Object.keys(newPatterns).forEach(category => {
      if (ANTI_PATTERNS[category]) {
        // Merge with existing
        ANTI_PATTERNS[category] = [...ANTI_PATTERNS[category], ...newPatterns[category]];
      } else {
        // Add new category
        ANTI_PATTERNS[category] = newPatterns[category];
      }
    });
    console.log('✓ Anti-patterns extended:', Object.keys(newPatterns).join(', '));
  }

  // Check if extended patterns were loaded before this module
  if (window.KumagaizoExtendedPatterns) {
    extendPatterns(window.KumagaizoExtendedPatterns);
    delete window.KumagaizoExtendedPatterns;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────

  return {
    analyze: analyzeThinking,
    render: renderThinkingAnalysis,
    analyzeResponse: analyzeResponseQuality,
    detectAntiPatterns: detectAntiPatterns,
    detectCoverageGaps: detectCoverageGaps,
    _extendPatterns: extendPatterns  // For extension modules
  };

})();

console.log('Kumagaizo Thinking Analysis Module Loaded');