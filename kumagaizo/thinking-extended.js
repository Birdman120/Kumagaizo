// ═══════════════════════════════════════════════════════════════════════════
// KUMAGAIZO THINKING ANALYSIS - EXTENDED ANTI-PATTERNS
// Additional category-specific anti-patterns for all PreAI categories
// Load order: AFTER kumagaizo-thinking-analysis.js
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // Wait for main module to load
  function extendAntiPatterns() {
    if (!window.KumagaizoThinkingAnalysis) {
      setTimeout(extendAntiPatterns, 100);
      return;
    }

    // Access the internal ANTI_PATTERNS object and extend it
    const EXTENDED_PATTERNS = {

      // ═══════════════════════════════════════════════════════════════════════
      // PRODUCT & STRATEGY
      // ═══════════════════════════════════════════════════════════════════════

      feature: [
        {
          id: 'feature-without-problem',
          name: 'Feature Without Problem',
          detect: (responses) => {
            const feature = responses[0]?.toLowerCase() || '';
            const why = responses[1]?.toLowerCase() || '';
            return feature.length > 50 && why.length < 30;
          },
          risk: 'Describing the feature without articulating the problem it solves. May build something nobody needs.',
          suggestion: 'Start with the user problem. What pain does this eliminate?'
        },
        {
          id: 'no-success-metrics',
          name: 'No Success Metrics',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/metric|measure|success|kpi|track|increase|decrease|%|percent/i);
          },
          risk: 'No way to know if this feature worked. Will ship and never learn.',
          suggestion: 'Define: How will you know this feature succeeded? What number changes?'
        },
        {
          id: 'scope-creep-signals',
          name: 'Scope Creep Signals',
          detect: (responses) => {
            const allText = responses.join(' ');
            const andCount = (allText.match(/ and /gi) || []).length;
            const alsoCount = (allText.match(/also|plus|additionally/gi) || []).length;
            return (andCount + alsoCount) >= 5;
          },
          risk: 'Many "and also" phrases suggest scope creep. Feature may be too large to ship.',
          suggestion: 'What\'s the MVP? Cut to the ONE thing that delivers value.'
        }
      ],

      userstory: [
        {
          id: 'vague-user-type',
          name: 'Vague User Type',
          detect: (responses) => {
            const who = responses[0]?.toLowerCase() || '';
            return who.match(/user|person|someone|anyone|customer/i) && who.length < 30;
          },
          risk: '"As a user" is too vague. Different users have different needs.',
          suggestion: 'Be specific: "As a first-time buyer who..." or "As a power user managing..."'
        },
        {
          id: 'weak-motivation',
          name: 'Weak Motivation (So That)',
          detect: (responses) => {
            const why = responses[2]?.toLowerCase() || '';
            return why.length < 20 || why.match(/can do it|it works|it\'s done/i);
          },
          risk: 'Weak "so that" clause. The motivation should be compelling.',
          suggestion: 'The "so that" should be a real benefit. Why does the user care?'
        },
        {
          id: 'solution-in-story',
          name: 'Solution Embedded in Story',
          detect: (responses) => {
            const what = responses[1]?.toLowerCase() || '';
            return what.match(/button|dropdown|modal|click|page|screen|api/i);
          },
          risk: 'UI implementation details in user story. Stories should be solution-agnostic.',
          suggestion: 'Focus on what user wants to accomplish, not how. Remove UI specifics.'
        }
      ],

      techdecision: [
        {
          id: 'single-option',
          name: 'Single Option Considered',
          detect: (responses) => {
            const options = responses[3]?.toLowerCase() || '';
            const hasMultiple = options.match(/ or | vs | versus |option|alternative/i);
            return options.length > 20 && !hasMultiple;
          },
          risk: 'Only one option mentioned. Good decisions require comparing alternatives.',
          suggestion: 'What are 2-3 alternatives? Even if one seems obvious, compare explicitly.'
        },
        {
          id: 'hype-driven',
          name: 'Hype-Driven Decision',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            const buzzwords = ['ai', 'blockchain', 'serverless', 'microservices', 'kubernetes', 'rust', 'graphql'];
            const buzzwordCount = buzzwords.filter(b => allText.includes(b)).length;
            const hasProblemFit = allText.match(/because|solves|need|requirement|fits/i);
            return buzzwordCount >= 1 && !hasProblemFit;
          },
          risk: 'Technology mentioned without clear problem fit. Don\'t adopt tech for its own sake.',
          suggestion: 'For each technology: What specific problem does this solve better than alternatives?'
        },
        {
          id: 'no-reversibility-thinking',
          name: 'No Reversibility Consideration',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/revert|reverse|undo|migrate|switch|lock-in|exit/i);
          },
          risk: 'Not considering how hard this is to change later. Some decisions are one-way doors.',
          suggestion: 'Ask: If this doesn\'t work out, how hard is it to switch? What\'s the exit strategy?'
        }
      ],

      // ═══════════════════════════════════════════════════════════════════════
      // DESIGN & UX
      // ═══════════════════════════════════════════════════════════════════════

      uidesign: [
        {
          id: 'aesthetics-over-function',
          name: 'Aesthetics Over Function',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            const aestheticWords = (allText.match(/beautiful|pretty|cool|modern|sleek|clean|minimal/gi) || []).length;
            const functionWords = (allText.match(/usable|accessible|clear|readable|findable|understand/gi) || []).length;
            return aestheticWords >= 2 && functionWords === 0;
          },
          risk: 'Focused on how it looks, not how it works. Pretty but unusable is a failure.',
          suggestion: 'Add functional goals: What should users easily accomplish? How will you test usability?'
        },
        {
          id: 'no-states-considered',
          name: 'No States Considered',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/hover|focus|active|disabled|loading|error|empty|state/i);
          },
          risk: 'Only considering the "happy path" appearance. Real UIs have many states.',
          suggestion: 'Define: hover, focus, active, disabled, loading, error, and empty states.'
        },
        {
          id: 'no-accessibility-mention',
          name: 'No Accessibility Consideration',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/accessible|a11y|wcag|contrast|screen reader|keyboard|aria/i);
          },
          risk: 'No accessibility mentioned. Design may exclude users with disabilities.',
          suggestion: 'Consider: color contrast, keyboard navigation, screen reader support, touch targets.'
        }
      ],

      designsystem: [
        {
          id: 'no-adoption-strategy',
          name: 'No Adoption Strategy',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/adopt|migrate|use|implement|integrate|team|developer/i);
          },
          risk: 'Building a design system nobody will use. Adoption is harder than creation.',
          suggestion: 'How will teams adopt this? What\'s the migration path from current UI?'
        },
        {
          id: 'too-many-components',
          name: 'Too Many Components Planned',
          detect: (responses) => {
            const components = responses[3]?.toLowerCase() || '';
            const componentCount = (components.match(/,/g) || []).length + 1;
            return componentCount >= 10;
          },
          risk: 'Planning too many components upfront. Start small, add based on real needs.',
          suggestion: 'What are the 5-7 most-used components? Start there. Add others when needed.'
        }
      ],

      designcritique: [
        {
          id: 'no-goals-context',
          name: 'No Design Goals Stated',
          detect: (responses) => {
            const goals = responses[1]?.trim() || '';
            return goals.length < 20;
          },
          risk: 'Critiquing without knowing goals. Feedback may be irrelevant to actual objectives.',
          suggestion: 'What was this design trying to achieve? Critique against those goals.'
        },
        {
          id: 'opinion-not-principle',
          name: 'Opinion-Based Concerns',
          detect: (responses) => {
            const concerns = responses[3]?.toLowerCase() || '';
            return concerns.match(/i don\'t like|feels wrong|looks bad|not my style|ugly/i);
          },
          risk: 'Personal preference instead of design principles. Subjective feedback isn\'t actionable.',
          suggestion: 'Ground feedback in principles: usability heuristics, accessibility, user goals.'
        }
      ],

      // ═══════════════════════════════════════════════════════════════════════
      // RESEARCH & ANALYSIS
      // ═══════════════════════════════════════════════════════════════════════

      userresearch: [
        {
          id: 'leading-questions',
          name: 'Leading Questions Detected',
          detect: (responses) => {
            const questions = responses[3]?.toLowerCase() || '';
            return questions.match(/do you like|would you|don\'t you think|isn\'t it|wouldn\'t you/i);
          },
          risk: 'Leading questions bias responses. You\'ll hear what you want, not truth.',
          suggestion: 'Use open-ended questions: "Tell me about..." "Walk me through..." "What happened when..."'
        },
        {
          id: 'convenience-sampling',
          name: 'Convenience Sampling',
          detect: (responses) => {
            const recruiting = responses[4]?.toLowerCase() || '';
            return recruiting.match(/colleague|friend|family|coworker|team|internal/i);
          },
          risk: 'Recruiting convenient participants, not target users. Insights won\'t transfer.',
          suggestion: 'Recruit actual target users. Internal colleagues are not representative.'
        },
        {
          id: 'no-behavior-focus',
          name: 'Asking About Hypotheticals',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            const hypothetical = allText.match(/would you|will you|might you|could you/gi) || [];
            const behavioral = allText.match(/did you|have you|when did|last time|tell me about/gi) || [];
            return hypothetical.length >= 2 && behavioral.length === 0;
          },
          risk: 'Asking what people would do, not what they did. Hypotheticals are unreliable.',
          suggestion: 'Ask about past behavior: "Tell me about the last time you..." not "Would you..."'
        }
      ],

      competitive: [
        {
          id: 'feature-comparison-only',
          name: 'Feature Comparison Only',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            const hasFeatures = allText.match(/feature|function|capability|does|has/i);
            const hasStrategy = allText.match(/position|strategy|market|segment|differentiate|moat/i);
            return hasFeatures && !hasStrategy;
          },
          risk: 'Only comparing features, not strategy. Features are table stakes, positioning wins.',
          suggestion: 'Go beyond features: How do they position? Who do they target? What\'s their moat?'
        },
        {
          id: 'no-indirect-competitors',
          name: 'Missing Indirect Competitors',
          detect: (responses) => {
            const competitors = responses[3]?.toLowerCase() || '';
            const allText = responses.join(' ').toLowerCase();
            return competitors.length > 20 && !allText.match(/indirect|substitute|alternative|instead|workaround/i);
          },
          risk: 'Only analyzing direct competitors. Users often solve problems differently.',
          suggestion: 'Include indirect competitors and substitutes. What else do users do instead?'
        }
      ],

      dataanalysis: [
        {
          id: 'correlation-causation',
          name: 'Causation Language Without Evidence',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return allText.match(/causes|leads to|results in|because of|due to|impact of/i) && 
                   !allText.match(/correlat|associat|experiment|control|random/i);
          },
          risk: 'Using causal language but analysis may only show correlation.',
          suggestion: 'Be precise: "X correlates with Y" unless you have experimental evidence for causation.'
        },
        {
          id: 'no-sample-size-awareness',
          name: 'No Sample Size Consideration',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/sample|n=|\d+ user|\d+ response|statistical|significance/i);
          },
          risk: 'Not considering sample size. Small samples can show misleading patterns.',
          suggestion: 'How large is the sample? Is it large enough for your conclusions?'
        },
        {
          id: 'cherry-picking-signals',
          name: 'Cherry-Picking Signals',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return allText.match(/proves|clearly shows|definitely|obviously|conclusively/i) &&
                   !allText.match(/however|although|limitation|caveat|but/i);
          },
          risk: 'Strong conclusions without acknowledging limitations. May be seeing what you want.',
          suggestion: 'What contradicts this finding? What are the limitations? What else could explain this?'
        }
      ],

      // ═══════════════════════════════════════════════════════════════════════
      // CREATIVITY & IDEATION
      // ═══════════════════════════════════════════════════════════════════════

      creative: [
        {
          id: 'no-references',
          name: 'Creating Without References',
          detect: (responses) => {
            const references = responses[4]?.trim() || '';
            return references.length < 20;
          },
          risk: 'Creating without inspiration sources. References inform, they don\'t constrain.',
          suggestion: 'Gather 5-10 references. What do you want to capture from each?'
        },
        {
          id: 'single-direction',
          name: 'Single Creative Direction',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/option|alternative|direction|concept|variation|or/i);
          },
          risk: 'Committing to one direction without exploring alternatives. First idea isn\'t always best.',
          suggestion: 'Generate 3-5 distinct concepts before committing. Include one risky option.'
        }
      ],

      naming: [
        {
          id: 'no-availability-check',
          name: 'No Availability Consideration',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/domain|trademark|available|taken|social|handle/i);
          },
          risk: 'Falling in love with names that aren\'t available. Check early.',
          suggestion: 'Before investing in a name: check .com domain, social handles, trademark conflicts.'
        },
        {
          id: 'descriptive-only',
          name: 'Only Descriptive Names Considered',
          detect: (responses) => {
            const style = responses[3]?.toLowerCase() || '';
            return style.match(/descriptive|clear|obvious|literal/i) && 
                   !style.match(/creative|invented|metaphor|abstract/i);
          },
          risk: 'Only considering descriptive names. These are often taken and less memorable.',
          suggestion: 'Explore multiple naming approaches: descriptive, invented, metaphorical, compound.'
        }
      ],

      // ═══════════════════════════════════════════════════════════════════════
      // WRITING & COMMUNICATION
      // ═══════════════════════════════════════════════════════════════════════

      technicalwriting: [
        {
          id: 'feature-not-task-focused',
          name: 'Feature-Focused, Not Task-Focused',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            const hasFeatures = allText.match(/feature|function|api|method|parameter/i);
            const hasTasks = allText.match(/how to|accomplish|complete|achieve|task/i);
            return hasFeatures && !hasTasks;
          },
          risk: 'Organizing docs by features, not user tasks. Users want to DO things, not learn features.',
          suggestion: 'Structure around tasks: "How to [accomplish X]" not "The X Feature"'
        },
        {
          id: 'no-code-examples',
          name: 'No Code Examples Planned',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/example|code|snippet|sample|demo/i);
          },
          risk: 'Technical docs without code examples. Developers learn from examples.',
          suggestion: 'Include working, copy-pasteable code examples for every major concept.'
        }
      ],

      presentation: [
        {
          id: 'no-single-message',
          name: 'No Clear Single Message',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            const topicCount = (allText.match(/ and /gi) || []).length;
            return topicCount >= 4;
          },
          risk: 'Too many topics. Audiences remember ONE thing. What\'s yours?',
          suggestion: 'What\'s the single sentence summary? If they remember one thing, what should it be?'
        },
        {
          id: 'no-call-to-action',
          name: 'No Call to Action',
          detect: (responses) => {
            const goal = responses[2]?.toLowerCase() || '';
            return !goal.match(/do|action|decide|approve|buy|sign|commit|agree|next step/i);
          },
          risk: 'Presentation without clear ask. What should audience do after?',
          suggestion: 'End with a clear call to action. What do you want them to do/think/feel?'
        },
        {
          id: 'too-long',
          name: 'Potentially Too Long',
          detect: (responses) => {
            const duration = responses[3]?.toLowerCase() || '';
            const durationMatch = duration.match(/(\d+)\s*(min|hour)/i);
            if (durationMatch) {
              const mins = durationMatch[2].includes('hour') ? 
                parseInt(durationMatch[1]) * 60 : parseInt(durationMatch[1]);
              return mins > 30;
            }
            return false;
          },
          risk: 'Long presentations lose attention. Consider cutting or breaking into parts.',
          suggestion: 'Can this be shorter? What can be cut without losing the core message?'
        }
      ],

      // ═══════════════════════════════════════════════════════════════════════
      // PROBLEM SOLVING & THINKING
      // ═══════════════════════════════════════════════════════════════════════

      thinking: [
        {
          id: 'no-clear-question',
          name: 'No Clear Question',
          detect: (responses) => {
            const thinking = responses[0]?.trim() || '';
            return thinking.length > 50 && !thinking.includes('?');
          },
          risk: 'Thinking without a clear question to answer. Unfocused thinking wastes time.',
          suggestion: 'Frame as a question: What specifically are you trying to figure out?'
        },
        {
          id: 'all-unknowns',
          name: 'All Unknowns, No Knowns',
          detect: (responses) => {
            const knowns = responses[3]?.trim() || '';
            const unknowns = responses[4]?.trim() || '';
            return knowns.length < 20 && unknowns.length > 50;
          },
          risk: 'Focused on what you don\'t know. Start with what you DO know.',
          suggestion: 'What do you already know for sure? Build from there.'
        }
      ],

      planning: [
        {
          id: 'no-milestones',
          name: 'No Intermediate Milestones',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/milestone|checkpoint|phase|stage|week|month|sprint/i);
          },
          risk: 'Only end goal, no intermediate checkpoints. How will you know if you\'re on track?',
          suggestion: 'Break into milestones. What should be done by 25%, 50%, 75%?'
        },
        {
          id: 'no-dependencies',
          name: 'No Dependencies Identified',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/depend|block|before|after|requires|needs|first/i);
          },
          risk: 'Not considering dependencies. Things that seem parallel often aren\'t.',
          suggestion: 'What depends on what? What must happen first? What blocks other work?'
        },
        {
          id: 'no-risk-buffer',
          name: 'No Buffer or Risk Consideration',
          detect: (responses) => {
            const allText = responses.join(' ').toLowerCase();
            return !allText.match(/buffer|risk|if|backup|contingency|plan b|delay|slip/i);
          },
          risk: 'Plan assumes everything goes perfectly. It won\'t.',
          suggestion: 'Add 50% buffer. What could go wrong? What\'s the contingency?'
        }
      ]
    };

    // Merge extended patterns into the main module
    // We need to access and extend the internal patterns
    if (window.KumagaizoThinkingAnalysis._extendPatterns) {
      window.KumagaizoThinkingAnalysis._extendPatterns(EXTENDED_PATTERNS);
    } else {
      // Store for later retrieval
      window.KumagaizoExtendedPatterns = EXTENDED_PATTERNS;
    }

    console.log('Thinking Analysis Extended Patterns Loaded');
    console.log(`  → ${Object.keys(EXTENDED_PATTERNS).length} additional categories`);
    console.log(`  → ${Object.values(EXTENDED_PATTERNS).flat().length} anti-patterns added`);
  }

  extendAntiPatterns();

})();