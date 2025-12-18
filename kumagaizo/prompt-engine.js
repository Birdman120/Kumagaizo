// KUMAGAIZO ADVANCED PROMPT ENGINE v2.3 — DIG DEEPER SUPPORT
// Load order: LAST (after all config files)
// 
// v2.3 Changes:
// - Seamlessly blends deeper questions into prompt (no separate sections)
// - Deeper responses analyzed same as base responses
// - Session character analysis includes all responses
//
// v2.2 Features retained:
// - First-person voice (I/My)
// - Cognitive load detection
// - Contradiction and tension spotting
// - Response momentum analysis
// - Adaptive meta-framing

(function() {
  'use strict';

  const DEFAULT_CONFIG = {
    cognitive_role: "You are a thoughtful expert who provides specific, actionable guidance while respecting the context and constraints provided. You balance depth with clarity, and you're honest about trade-offs and limitations.",
    
    reasoning_chain: [
      "Fully understand my context and intent before forming conclusions",
      "Consider what would actually be most helpful given my situation",
      "Think about both immediate actions and longer-term implications",
      "Identify assumptions you're making and state them explicitly",
      "Balance thoroughness with practicality"
    ],
    
    response_structure: {
      intro: "Confirm your understanding of what I'm asking.",
      main: "Provide clear analysis or recommendations.",
      specifics: "Address my particular concerns and questions.",
      limitations: "Note any caveats, assumptions, or areas of uncertainty.",
      next: "Suggest concrete next steps or actions."
    },
    
    operating_principles: [
      "Be specific rather than generic: concrete examples and actions over abstract advice",
      "Work within my stated constraints rather than proposing ideal-but-impractical solutions",
      "Acknowledge trade-offs explicitly: every choice optimizes something at a cost",
      "If something is unclear, ask rather than guess",
      "Focus on what is actionable given my available resources and context"
    ],
    
    failure_modes: [
      "Providing generic advice that could apply to anyone",
      "Ignoring my specific context and constraints",
      "Recommending things that cannot be executed with my available resources",
      "Being vague when specificity would be more useful",
      "Optimizing for comprehensiveness over usefulness"
    ],
    
    output_calibration: "Aim for the level of detail that enables action without overwhelming. Be thorough on what matters most, brief on what matters less. Make trade-offs visible."
  };

  // ─────────────────────────────────────────────────────────────────────────
  // COGNITIVE AWARENESS ANALYSIS
  // ─────────────────────────────────────────────────────────────────────────

  function analyzeSessionCharacter(responses, duration) {
    return {
      momentum: analyzeMomentum(responses),
      cognitiveLoad: analyzeCognitiveLoad(responses),
      tensions: detectTensions(responses),
      thinkingStyle: detectThinkingStyle(responses),
      engagement: analyzeEngagement(responses, duration)
    };
  }

  function analyzeMomentum(responses) {
    if (responses.length < 2) return { pattern: 'insufficient_data', description: null };
    
    const wordCounts = responses.map(r => getWordCount(r || ''));
    const first = wordCounts.slice(0, Math.ceil(wordCounts.length / 2));
    const second = wordCounts.slice(Math.ceil(wordCounts.length / 2));
    
    const firstAvg = first.reduce((a, b) => a + b, 0) / first.length;
    const secondAvg = second.reduce((a, b) => a + b, 0) / second.length;
    
    const ratio = secondAvg / (firstAvg || 1);
    
    if (ratio > 1.3) {
      return { 
        pattern: 'building', 
        description: 'My thinking gathered momentum as I progressed, with later responses showing more depth.'
      };
    } else if (ratio < 0.7) {
      return { 
        pattern: 'front_loaded', 
        description: 'I invested most energy in early responses - my core thinking is established upfront.'
      };
    } else if (Math.max(...wordCounts) > 3 * Math.min(...wordCounts.filter(w => w > 0))) {
      return { 
        pattern: 'focused_depth', 
        description: 'I went deep on specific questions while keeping others concise, showing my priority areas.'
      };
    }
    
    return { pattern: 'steady', description: null };
  }

  function analyzeCognitiveLoad(responses) {
    const allText = responses.join(' ').toLowerCase();
    
    const complexityMarkers = {
      conditionals: (allText.match(/\b(if|when|unless|although|however|but|except)\b/g) || []).length,
      qualifiers: (allText.match(/\b(might|could|possibly|potentially|sometimes|often|usually)\b/g) || []).length,
      abstractions: (allText.match(/\b(concept|framework|approach|strategy|principle|philosophy)\b/g) || []).length,
      lists: (allText.match(/\b(first|second|third|also|additionally|another|multiple)\b/g) || []).length
    };
    
    const clarityMarkers = {
      specifics: (allText.match(/\b(specifically|exactly|precisely|particular|concrete)\b/g) || []).length,
      examples: (allText.match(/\b(example|instance|like|such as|for instance)\b/g) || []).length,
      decisions: (allText.match(/\b(decided|chosen|will|must|need to|going to)\b/g) || []).length
    };
    
    const complexityScore = Object.values(complexityMarkers).reduce((a, b) => a + b, 0);
    const clarityScore = Object.values(clarityMarkers).reduce((a, b) => a + b, 0);
    
    const totalWords = getWordCount(allText);
    const complexityDensity = complexityScore / (totalWords / 100);
    
    if (complexityDensity > 8 && clarityScore < complexityScore * 0.3) {
      return {
        level: 'high_complexity',
        suggestion: 'My thinking contains multiple moving parts and conditionals. Help me identify which factors are most critical to resolve first.'
      };
    } else if (clarityScore > complexityScore) {
      return {
        level: 'high_clarity',
        suggestion: 'My thinking is already well-structured. Build directly on my framework rather than introducing new organizational schemes.'
      };
    }
    
    return { level: 'balanced', suggestion: null };
  }

  function detectTensions(responses) {
    const tensions = [];
    const allText = responses.join(' ').toLowerCase();
    
    if (allText.includes('quickly') || allText.includes('fast') || allText.includes('urgent')) {
      if (allText.includes('thorough') || allText.includes('comprehensive') || allText.includes('complete')) {
        tensions.push({
          type: 'speed_vs_depth',
          description: 'I may have tension between moving quickly and being thorough. Help me identify what level of completeness is actually required.'
        });
      }
    }
    
    if (allText.includes('simple') || allText.includes('minimal') || allText.includes('basic')) {
      if (allText.includes('flexible') || allText.includes('scalable') || allText.includes('future')) {
        tensions.push({
          type: 'simplicity_vs_flexibility',
          description: 'I may have tension between keeping things simple now and building for future needs. Help me decide which trade-off serves my actual timeline.'
        });
      }
    }
    
    const certainPhrases = (allText.match(/\b(definitely|must|will|certain|clear)\b/g) || []).length;
    const uncertainPhrases = (allText.match(/\b(maybe|might|unsure|unclear|possibly)\b/g) || []).length;
    
    if (certainPhrases > 2 && uncertainPhrases > 2) {
      tensions.push({
        type: 'mixed_certainty',
        description: 'I express both confidence and uncertainty across different aspects. Help me distinguish between what is decided and what remains open.'
      });
    }
    
    return tensions;
  }

  function detectThinkingStyle(responses) {
    const allText = responses.join(' ').toLowerCase();
    const totalWords = getWordCount(allText);
    
    const patterns = {
      analytical: (allText.match(/\b(because|therefore|reason|cause|result|leads to|means that)\b/g) || []).length,
      exploratory: (allText.match(/\b(wondering|curious|what if|explore|consider|possibility)\b/g) || []).length,
      action_oriented: (allText.match(/\b(do|make|build|create|implement|execute|deliver)\b/g) || []).length,
      relational: (allText.match(/\b(user|customer|people|team|they|them|audience)\b/g) || []).length
    };
    
    const dominant = Object.entries(patterns).sort((a, b) => b[1] - a[1])[0];
    
    if (dominant[1] < 3) return { style: 'balanced', emphasis: null };
    
    const styleDescriptions = {
      analytical: 'I think in terms of causes and effects. Structure your response to show reasoning chains.',
      exploratory: 'I am in exploration mode. Offer possibilities and perspectives rather than closing down options too quickly.',
      action_oriented: 'I am focused on execution. Prioritize concrete next steps over extensive analysis.',
      relational: 'I think through the lens of people and users. Frame recommendations in terms of human impact.'
    };
    
    return {
      style: dominant[0],
      emphasis: styleDescriptions[dominant[0]]
    };
  }

  function analyzeEngagement(responses, duration) {
    const totalWords = responses.reduce((sum, r) => sum + getWordCount(r || ''), 0);
    const wordsPerMinute = totalWords / (duration / 60);
    const filledResponses = responses.filter(r => r && r.trim().length > 0).length;
    const completionRate = filledResponses / responses.length;
    
    if (completionRate < 0.6) {
      return {
        level: 'selective',
        note: 'I chose to answer some questions and skip others. The answered questions indicate my priority areas.'
      };
    }
    
    if (wordsPerMinute > 25 && completionRate > 0.8) {
      return {
        level: 'high',
        note: 'I engaged deeply and quickly, suggesting clear thinking and strong preparation.'
      };
    }
    
    if (wordsPerMinute < 8 && duration > 180) {
      return {
        level: 'deliberate',
        note: 'I took my time with careful consideration. Honor this thoughtfulness in your response.'
      };
    }
    
    return { level: 'moderate', note: null };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EPISTEMIC ANALYSIS
  // ─────────────────────────────────────────────────────────────────────────
  
  function analyzeEpistemicStance(responses) {
    const profile = {
      certainWords: 0,
      uncertainWords: 0,
      questionMarks: 0,
      hedging: 0,
      assertions: 0
    };
    
    const certaintyMarkers = /\b(definitely|certain|sure|know|clear|obvious)\b/gi;
    const uncertaintyMarkers = /\b(maybe|perhaps|might|possibly|unclear|unsure|think|guess)\b/gi;
    const hedgingMarkers = /\b(kind of|sort of|somewhat|relatively|fairly|probably)\b/gi;
    
    responses.forEach(response => {
      if (!response) return;
      const text = response.toLowerCase();
      profile.certainWords += (text.match(certaintyMarkers) || []).length;
      profile.uncertainWords += (text.match(uncertaintyMarkers) || []).length;
      profile.questionMarks += (response.match(/\?/g) || []).length;
      profile.hedging += (text.match(hedgingMarkers) || []).length;
      profile.assertions += (response.match(/\./g) || []).length;
    });
    
    return profile;
  }
  
  function getEpistemicQualifier(response, profile) {
    if (!response) return null;
    const text = response.toLowerCase();
    
    if (text.includes('not sure') || text.includes('unclear') || text.includes("don't know")) {
      return 'uncertain';
    }
    if (text.includes('certain') || text.includes('definitely') || text.includes('clearly')) {
      return 'high confidence';
    }
    if (text.includes('maybe') || text.includes('perhaps') || text.includes('might')) {
      return 'exploratory';
    }
    if (response.includes('?')) {
      return 'questioning';
    }
    
    return null;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ADVANCED PROMPT GENERATION (Seamless Deeper Integration)
  // ─────────────────────────────────────────────────────────────────────────

  function generateAdvancedPrompt(state, category) {
    const PROMPT_CONFIG = window.KumagaizoPromptConfig || {}; 
    const config = PROMPT_CONFIG[category.id] || DEFAULT_CONFIG;
    
    const duration = Math.floor((Date.now() - state.startTime) / 1000);
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    
    // MERGE base and deeper responses seamlessly
    const allResponses = [...state.stepResponses];
    if (state.digDeeperMode && state.deeperResponses) {
      allResponses.push(...state.deeperResponses);
    }
    
    // MERGE base and deeper steps seamlessly
    const allSteps = [...category.steps];
    const allSections = [...category.promptSections];
    if (state.digDeeperMode && category.deeperSteps) {
      allSteps.push(...category.deeperSteps);
      if (category.deeperPromptSections) {
        allSections.push(...category.deeperPromptSections);
      }
    }
    
    const filledResponses = allResponses.filter(r => r && r.trim().length > 0);
    const totalWords = filledResponses.reduce((sum, r) => sum + getWordCount(r), 0);
    const avgWordsPerResponse = filledResponses.length > 0 ? Math.round(totalWords / filledResponses.length) : 0;
    
    const epistemicProfile = analyzeEpistemicStance(allResponses);
    const sessionCharacter = analyzeSessionCharacter(allResponses, duration);
    
    let prompt = '';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 1: COGNITIVE ROLE
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += config.cognitive_role + '\n\n';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 2: CONTEXT (First-Person)
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Context:\n';
    prompt += `I've spent ${formatDuration(mins, secs)} thinking through this systematically before asking for your help. `;
    
    if (avgWordsPerResponse > 30) {
      prompt += `I've provided detailed responses (averaging ${avgWordsPerResponse} words per question), reflecting careful preparation. `;
    } else if (avgWordsPerResponse > 15) {
      prompt += `I've provided substantive responses (averaging ${avgWordsPerResponse} words per question). `;
    } else if (avgWordsPerResponse > 0) {
      prompt += `I've provided focused, concise responses (averaging ${avgWordsPerResponse} words per question). `;
    }
    
    prompt += 'This is not a casual query. I want you to build on my thinking, not replace it.\n\n';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 3: SESSION INTELLIGENCE (First-Person)
    // ═══════════════════════════════════════════════════════════════════
    
    const insights = [];
    
    if (sessionCharacter.momentum.description) {
      insights.push(sessionCharacter.momentum.description);
    }
    
    if (sessionCharacter.cognitiveLoad.suggestion) {
      insights.push(sessionCharacter.cognitiveLoad.suggestion);
    }
    
    if (sessionCharacter.thinkingStyle.emphasis) {
      insights.push(sessionCharacter.thinkingStyle.emphasis);
    }
    
    if (sessionCharacter.engagement.note) {
      insights.push(sessionCharacter.engagement.note);
    }
    
    if (insights.length > 0) {
      prompt += 'What my responses reveal:\n';
      insights.forEach(insight => {
        prompt += `- ${insight}\n`;
      });
      prompt += '\n';
    }
    
    if (sessionCharacter.tensions.length > 0) {
      prompt += 'Potential tensions to help me address:\n';
      sessionCharacter.tensions.forEach(tension => {
        prompt += `- ${tension.description}\n`;
      });
      prompt += '\n';
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 4: USER'S STRUCTURED THINKING (Seamlessly Merged)
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'My thinking, structured through guided questions:\n\n';
    
    allSections.forEach((label, index) => {
      const response = allResponses[index];
      if (response && response.trim()) {
        const qualifier = getEpistemicQualifier(response, epistemicProfile);
        
        prompt += `${label}`;
        if (qualifier) {
          prompt += ` (${qualifier})`;
        }
        prompt += '\n';
        prompt += response.trim() + '\n\n';
      }
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 5: REASONING FRAMEWORK
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Your reasoning process:\n';
    config.reasoning_chain.forEach(instruction => {
      prompt += `- ${instruction}\n`;
    });
    prompt += '\n';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 6: RESPONSE STRUCTURE
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Structure your response:\n\n';
    
    Object.entries(config.response_structure).forEach(([key, description]) => {
      const sectionName = formatSectionName(key);
      prompt += `${sectionName}\n${description}\n\n`;
    });
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 7: OPERATING PRINCIPLES
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Operating principles:\n';
    config.operating_principles.forEach(principle => {
      prompt += `- ${principle}\n`;
    });
    prompt += '\n';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 8: FAILURE MODE PREVENTION
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Avoid these failure modes:\n';
    config.failure_modes.forEach(mode => {
      prompt += `- ${mode}\n`;
    });
    prompt += '\n';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 9: OUTPUT CALIBRATION
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Output calibration:\n';
    prompt += config.output_calibration + '\n\n';
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION 10: META-COGNITIVE INSTRUCTION
    // ═══════════════════════════════════════════════════════════════════
    
    prompt += 'Final notes:\n';
    prompt += 'If any part of my thinking seems unclear, contradictory, or incomplete, point this out and ask me to clarify rather than making assumptions. ';
    prompt += 'If you need to make assumptions to proceed, state them clearly so I can confirm or correct them. ';
    
    if (sessionCharacter.thinkingStyle.style === 'exploratory') {
      prompt += 'Since I appear to be in exploration mode, offer multiple perspectives before converging on recommendations. ';
    } else if (sessionCharacter.thinkingStyle.style === 'action_oriented') {
      prompt += 'Since I appear focused on execution, lead with actionable recommendations and keep analysis concise. ';
    }
    
    prompt += 'Your goal is to enhance my thinking, not to think for me.\n';
    
    return prompt;
  }
  
  // ─────────────────────────────────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────────────────────────────────
  
  function formatDuration(mins, secs) {
    if (mins === 0) {
      return `${secs} second${secs !== 1 ? 's' : ''}`;
    } else if (secs === 0) {
      return `${mins} minute${mins !== 1 ? 's' : ''}`;
    } else {
      return `${mins} minute${mins !== 1 ? 's' : ''} and ${secs} second${secs !== 1 ? 's' : ''}`;
    }
  }
  
  function formatSectionName(key) {
    const words = key.replace(/([A-Z])/g, ' $1').trim().split(' ');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ':';
  }
  
  function getWordCount(text) {
    if (!text || !text.trim()) return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INTEGRATION
  // ─────────────────────────────────────────────────────────────────────────
  
  function waitForBlankPage() {
    if (window.BlankPage && window.BlankPage.getState) {
      initializeAdvancedEngine();
    } else {
      setTimeout(waitForBlankPage, 100);
    }
  }
  
  function initializeAdvancedEngine() {
    const aiPromptContent = document.getElementById('ai-prompt-content');
    if (!aiPromptContent) {
      console.warn('Kumagaizo: ai-prompt-content element not found');
      return;
    }
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const screenComplete = document.getElementById('screen-complete');
          if (screenComplete && screenComplete.style.display === 'flex') {
            regeneratePrompt();
          }
        }
      });
    });
    
    const screenComplete = document.getElementById('screen-complete');
    if (screenComplete) {
      observer.observe(screenComplete, { attributes: true });
    }
    
    const configKeys = Object.keys(window.KumagaizoPromptConfig || {});
    console.log('✦ Kumagaizo Advanced Prompt Engine v2.3 — Dig Deeper Support');
    console.log(`  → ${configKeys.length} category configs loaded`);
    console.log('  → Seamless deeper question integration enabled');
    console.log('  → Session character analysis includes all responses');
  }
  
  function regeneratePrompt() {
    const state = window.BlankPage.getState();
    const categories = window.BlankPage.getCategories();
    const category = categories[state.sessionType];
    
    if (!category) {
      console.warn('Kumagaizo: Category not found:', state.sessionType);
      return;
    }
    
    const aiPromptContent = document.getElementById('ai-prompt-content');
    if (!aiPromptContent) return;
    
    const advancedPrompt = generateAdvancedPrompt(state, category);
    aiPromptContent.textContent = advancedPrompt;
    
    // Merge all responses for analysis
    const allResponses = [...state.stepResponses];
    if (state.digDeeperMode && state.deeperResponses) {
      allResponses.push(...state.deeperResponses);
    }
    
    const sessionCharacter = analyzeSessionCharacter(allResponses, Math.floor((Date.now() - state.startTime) / 1000));
    
    console.log('✓ Advanced prompt generated (deeper questions seamlessly integrated)');
    console.log(`  → Category: ${category.label}`);
    console.log(`  → Dig Deeper: ${state.digDeeperMode ? 'Yes' : 'No'}`);
    console.log(`  → Total questions: ${state.stepResponses.length + (state.deeperResponses?.length || 0)}`);
    console.log(`  → Momentum: ${sessionCharacter.momentum.pattern}`);
    console.log(`  → Thinking style: ${sessionCharacter.thinkingStyle.style}`);
  }
  
  waitForBlankPage();

})();