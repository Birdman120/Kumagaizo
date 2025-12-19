// ═══════════════════════════════════════════════════════════════════════════
// KUMAGAIZO IMPLEMENTATION PATH ENGINE
// Load order: AFTER enhancement modules, AFTER prompt engine
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIGURATION
  // ─────────────────────────────────────────────────────────────────────────

  const PATH_CONFIG = {
    stepTypes: {
      context: {
        title: 'Context Foundation',
        instruction: 'Provide your complete context upfront.',
        actionPattern: 'Share: {content}',
        checkpointPattern: 'Validate response addresses: {criteria}'
      },
      implementation: {
        title: 'Core Request',
        instruction: 'Request specific implementation.',
        actionPattern: 'Request: {content}',
        checkpointPattern: 'Verify output handles: {criteria}'
      },
      quality: {
        title: 'Quality Verification',
        instruction: 'Verify quality and alignment.',
        actionPattern: 'Review for: {content}',
        checkpointPattern: 'Confirm alignment with: {criteria}'
      }
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────

  let state = {
    selectedEnhancements: [],
    currentCategory: null,
    generatedPath: null
  };

  // ─────────────────────────────────────────────────────────────────────────
  // CORE PATH GENERATION
  // ─────────────────────────────────────────────────────────────────────────

  function generateImplementationPath(sessionState, category) {
    if (!sessionState || !category) {
      console.warn('Implementation Path: Missing session state or category');
      return null;
    }

    const generators = window.KumagaizoPathGenerators;
    const hasCustomGenerator = generators && generators[sessionState.sessionType];

    if (hasCustomGenerator) {
      return generatePathWithCustomGenerator(sessionState, category, generators[sessionState.sessionType]);
    }

    return generateGenericPath(sessionState, category);
  }

  function generatePathWithCustomGenerator(sessionState, category, generator) {
    const allResponses = [...sessionState.stepResponses];
    if (sessionState.digDeeperMode && sessionState.deeperResponses) {
      allResponses.push(...sessionState.deeperResponses);
    }

    const path = {
      steps: []
    };

    // STEP 1: Context
    const contextPrompt = generator.generateContext ? 
      generator.generateContext(allResponses) : 
      generateContextPrompt(sessionState, category, allResponses, []);

    path.steps.push({
      type: 'context',
      title: 'Context Foundation',
      description: 'Provide your complete context upfront.',
      prompt: contextPrompt,
      checkpoint: generator.extractCheckpoints ? 
        'Validate response addresses provided context' : 
        generateContextCheckpoint(sessionState, allResponses),
      enhancements: []
    });

    // STEP 2: Implementation
    const implementationPrompt = generator.generateImplementation ? 
      generator.generateImplementation(allResponses) : 
      generateImplementationPrompt(sessionState, category, allResponses, []);

    const implementationCheckpoints = generator.extractCheckpoints ? 
      generator.extractCheckpoints(allResponses) : 
      [generateImplementationCheckpoint(sessionState, allResponses, [])];

    path.steps.push({
      type: 'implementation',
      title: 'Core Request',
      description: 'Request specific implementation.',
      prompt: implementationPrompt,
      checkpoint: Array.isArray(implementationCheckpoints) ? 
        implementationCheckpoints.join(', ') : 
        implementationCheckpoints,
      enhancements: []
    });

    // STEP 3: Quality
    path.steps.push({
      type: 'quality',
      title: 'Quality Verification',
      description: 'Verify quality and alignment.',
      prompt: generateQualityPrompt(sessionState, category, allResponses, []),
      checkpoint: generateQualityCheckpoint(sessionState, allResponses, []),
      enhancements: []
    });

    return path;
  }

  function generateGenericPath(sessionState, category) {
    const allResponses = [...sessionState.stepResponses];
    if (sessionState.digDeeperMode && sessionState.deeperResponses) {
      allResponses.push(...sessionState.deeperResponses);
    }

    const allSteps = [...category.steps];
    if (sessionState.digDeeperMode && category.deeperSteps) {
      allSteps.push(...category.deeperSteps);
    }

    return createBasePath(sessionState, category, allResponses, allSteps);
  }

  function createBasePath(sessionState, category, allResponses, allSteps) {
    const path = {
      steps: []
    };

    path.steps.push({
      type: 'context',
      title: 'Context Foundation',
      description: 'Provide your complete context upfront.',
      prompt: generateContextPrompt(sessionState, category, allResponses, allSteps),
      checkpoint: generateContextCheckpoint(sessionState, allResponses),
      enhancements: []
    });

    path.steps.push({
      type: 'implementation',
      title: 'Core Request',
      description: 'Request specific implementation.',
      prompt: generateImplementationPrompt(sessionState, category, allResponses, allSteps),
      checkpoint: generateImplementationCheckpoint(sessionState, allResponses, allSteps),
      enhancements: []
    });

    path.steps.push({
      type: 'quality',
      title: 'Quality Verification',
      description: 'Verify quality and alignment.',
      prompt: generateQualityPrompt(sessionState, category, allResponses, allSteps),
      checkpoint: generateQualityCheckpoint(sessionState, allResponses, allSteps),
      enhancements: []
    });

    return path;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROMPT GENERATION
  // ─────────────────────────────────────────────────────────────────────────

  function generateContextPrompt(sessionState, category, allResponses, allSteps) {
    const contextResponses = allResponses.slice(0, 2).filter(r => r && r.trim());
    
    if (contextResponses.length === 0) {
      return `Share your complete context for this ${category.label.toLowerCase()} task.`;
    }

    const contextSummary = contextResponses.map(r => {
      return r.length > 150 ? r.substring(0, 150) + '...' : r;
    }).join(' ');

    return `Here's my context: ${contextSummary}

Before proceeding, identify any assumptions I'm making that could be problematic.`;
  }

  function generateContextCheckpoint(sessionState, allResponses) {
    const constraintKeywords = ['constraint', 'limit', 'must', 'cannot', 'should not', 'avoid'];
    const constraints = allResponses
      .filter(r => r && constraintKeywords.some(k => r.toLowerCase().includes(k)))
      .map(r => r.substring(0, 100));

    if (constraints.length > 0) {
      return `Validate response acknowledges these constraints: ${constraints[0]}`;
    }

    return 'Validate response addresses your core context and constraints.';
  }

  function generateImplementationPrompt(sessionState, category, allResponses, allSteps) {
    const goalStep = allSteps.find(s => 
      s.question.toLowerCase().includes('what') && 
      (s.question.toLowerCase().includes('building') || 
       s.question.toLowerCase().includes('creating') ||
       s.question.toLowerCase().includes('want'))
    );

    if (!goalStep) {
      return `Generate the implementation based on my context above.`;
    }

    const goalIndex = allSteps.indexOf(goalStep);
    const goalResponse = allResponses[goalIndex];

    if (!goalResponse || !goalResponse.trim()) {
      return `Generate the implementation based on my context above.`;
    }

    const goalSummary = goalResponse.length > 200 ? goalResponse.substring(0, 200) + '...' : goalResponse;

    return `Generate: ${goalSummary}

Focus on the approach I outlined. Include inline explanations for key decisions.`;
  }

  function generateImplementationCheckpoint(sessionState, allResponses, allSteps) {
    const challengeKeywords = ['edge', 'tricky', 'difficult', 'challenge', 'problem', 'concern'];
    const challenges = allResponses.filter(r => 
      r && challengeKeywords.some(k => r.toLowerCase().includes(k))
    );

    if (challenges.length > 0) {
      const challenge = challenges[0].substring(0, 100);
      return `Verify output handles: ${challenge}`;
    }

    return 'Verify output matches your specified approach and handles edge cases.';
  }

  function generateQualityPrompt(sessionState, category, allResponses, allSteps) {
    const uncertaintyKeywords = ['unsure', 'unclear', 'not sure', 'question', 'wondering', 'figure out'];
    const uncertainties = allResponses.filter(r => 
      r && uncertaintyKeywords.some(k => r.toLowerCase().includes(k))
    );

    if (uncertainties.length > 0) {
      const uncertainty = uncertainties[0].substring(0, 150);
      return `Review the implementation for: ${uncertainty}

Identify any issues and suggest specific improvements.`;
    }

    return `Review the implementation for:
- Correctness and completeness
- Potential issues or risks
- Alignment with my stated approach

Identify any concerns and suggest specific improvements.`;
  }

  function generateQualityCheckpoint(sessionState, allResponses, allSteps) {
    const goalKeywords = ['success', 'goal', 'outcome', 'result', 'achieve', 'accomplish'];
    const goals = allResponses.filter(r => 
      r && goalKeywords.some(k => r.toLowerCase().includes(k))
    );

    if (goals.length > 0) {
      const goal = goals[0].substring(0, 100);
      return `Confirm this achieves: ${goal}`;
    }

    return 'Confirm alignment with your stated goals and success criteria.';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FULL PATH TEXT GENERATION (for copying)
  // ─────────────────────────────────────────────────────────────────────────

  function generatePathText(path) {
    if (!path) return '';

    let text = 'IMPLEMENTATION PATH\n\n';
    text += 'Follow these steps in your conversation with AI:\n\n';
    text += '═══════════════════════════════════════════════════════════════\n\n';

    path.steps.forEach((step, index) => {
      text += `${index + 1}. ${step.title}\n\n`;
      text += `${step.prompt}\n\n`;

      if (step.enhancements && step.enhancements.length > 0) {
        text += 'Additional requirements:\n';
        step.enhancements.forEach(enh => {
          text += `• ${enh.prompt}\n`;
        });
        text += '\n';
      }

      text += `✓ Checkpoint: ${step.checkpoint}\n\n`;
      text += '───────────────────────────────────────────────────────────────\n\n';
    });

    return text;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UI RENDERING
  // ─────────────────────────────────────────────────────────────────────────

  function renderImplementationPath(path, category) {
    const container = document.getElementById('implementation-path-container');
    if (!container) {
      console.warn('Implementation Path: Container not found');
      return;
    }
  
    // Clear only generated content, preserve Webflow header
    const existingSteps = container.querySelectorAll('.path-step, .enhancement-panel, .btn-copy-path');
    existingSteps.forEach(el => el.remove());
  
    // No auto-generated header - using Webflow header
  
    path.steps.forEach((step, index) => {
      const stepEl = createStepElement(step, index, category);
      container.appendChild(stepEl);
    });
  
    const enhancementPanel = createEnhancementPanel(category);
    container.appendChild(enhancementPanel);
  
    const copyButton = document.createElement('button');
    copyButton.className = 'btn-copy-path';
    copyButton.textContent = 'Copy Implementation Path';
    copyButton.addEventListener('click', () => copyImplementationPath(path));
    container.appendChild(copyButton);
  
    container.style.display = 'flex';
  }

  function createStepElement(step, index, category) {
    const stepEl = document.createElement('div');
    stepEl.className = 'path-step';
    stepEl.setAttribute('data-step-type', step.type);

    // Format prompt text with line breaks and bold conversion
    const formattedPrompt = formatPromptText(step.prompt);

    stepEl.innerHTML = `
      <div class="step-number">${index + 1}</div>
      <div class="step-content">
        <div class="step-title">${step.title}</div>
        <div class="step-prompt">${formattedPrompt}</div>
        <div class="step-enhancements" data-step-index="${index}"></div>
        <div class="step-checkpoint">✓ ${escapeHTML(step.checkpoint)}</div>
      </div>
    `;

    const enhContainer = stepEl.querySelector('.step-enhancements');
    if (enhContainer) {
      enhContainer.style.display = 'none';
    }

    return stepEl;
  }

  // Format prompt text
  function formatPromptText(text) {
    if (!text) return '';
    
    // Escape HTML first
    let formatted = escapeHTML(text);
    
    // Convert **text** to <strong>text</strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert newlines to <br> tags
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  }

  function createEnhancementPanel(category) {
    const panel = document.createElement('div');
    panel.className = 'enhancement-panel';

    const enhancements = window.KumagaizoEnhancements?.[category.id] || [];

    if (enhancements.length === 0) {
      panel.style.display = 'none';
      return panel;
    }

    panel.innerHTML = `
      <div class="enhancement-header">
        <span class="enhancement-icon">•</span>
        <span>Enhancements Available</span>
        <button class="enhancement-toggle" aria-label="Toggle enhancements">
          <span class="toggle-icon">▼</span>
        </button>
      </div>
      <div class="enhancement-content"></div>
    `;

    const content = panel.querySelector('.enhancement-content');
    const toggle = panel.querySelector('.enhancement-toggle');
    const header = panel.querySelector('.enhancement-header');

    const grouped = {};
    enhancements.forEach(enh => {
      if (!grouped[enh.category]) {
        grouped[enh.category] = [];
      }
      grouped[enh.category].push(enh);
    });

    Object.entries(grouped).forEach(([cat, items]) => {
      const group = document.createElement('div');
      group.className = 'enhancement-group';
      
      const groupTitle = document.createElement('div');
      groupTitle.className = 'enhancement-group-title';
      groupTitle.textContent = cat;
      group.appendChild(groupTitle);

      items.forEach(enh => {
        const item = createEnhancementItem(enh);
        group.appendChild(item);
      });

      content.appendChild(group);
    });

    // Make entire header clickable
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
      const isExpanded = content.style.display !== 'none';
      content.style.display = isExpanded ? 'none' : 'block';
      toggle.querySelector('.toggle-icon').textContent = isExpanded ? '▼' : '▲';
    });

    content.style.display = 'none';

    return panel;
  }

  function createEnhancementItem(enhancement) {
    const item = document.createElement('div');
    item.className = 'enhancement-item';
    item.setAttribute('data-enhancement-id', enhancement.id);

    item.innerHTML = `
      <input type="checkbox" id="enh-${enhancement.id}" class="enhancement-checkbox">
      <label for="enh-${enhancement.id}" class="enhancement-label">
        <span class="enhancement-name">${escapeHTML(enhancement.label)}</span>
        <span class="enhancement-desc">${escapeHTML(enhancement.description)}</span>
      </label>
    `;

    const checkbox = item.querySelector('.enhancement-checkbox');
    
    // Original checkbox handler
    checkbox.addEventListener('change', (e) => {
      handleEnhancementToggle(enhancement, e.target.checked);
    });

    // 🔧 FIX #3: Make entire item clickable (except when clicking checkbox directly)
    item.style.cursor = 'pointer';
    item.addEventListener('click', (e) => {
      // Don't trigger if clicking checkbox or label (they handle it themselves)
      if (e.target === checkbox || e.target.tagName === 'LABEL') {
        return;
      }
      
      // Toggle checkbox programmatically
      checkbox.checked = !checkbox.checked;
      
      // Trigger change event
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    });

    return item;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ENHANCEMENT INTERACTION
  // ─────────────────────────────────────────────────────────────────────────

  function handleEnhancementToggle(enhancement, isSelected) {
    if (isSelected) {
      if (!state.selectedEnhancements.find(e => e.id === enhancement.id)) {
        state.selectedEnhancements.push(enhancement);
      }
      addEnhancementToStep(enhancement);
      updatePathStateWithEnhancement(enhancement, true);
    } else {
      state.selectedEnhancements = state.selectedEnhancements.filter(e => e.id !== enhancement.id);
      removeEnhancementFromStep(enhancement);
      updatePathStateWithEnhancement(enhancement, false);
    }
  }

  function updatePathStateWithEnhancement(enhancement, isAdding) {
    if (!state.generatedPath) return;

    const targetStep = state.generatedPath.steps.find(s => s.type === enhancement.insertAt);
    if (!targetStep) return;

    if (isAdding) {
      if (!targetStep.enhancements.find(e => e.label === enhancement.label)) {
        targetStep.enhancements.push({
          label: enhancement.label,
          prompt: enhancement.prompt
        });
      }
    } else {
      targetStep.enhancements = targetStep.enhancements.filter(e => e.label !== enhancement.label);
    }
  }

  function addEnhancementToStep(enhancement) {
    const steps = document.querySelectorAll('.path-step');
    
    steps.forEach(stepEl => {
      const stepType = stepEl.getAttribute('data-step-type');
      
      if (stepType === enhancement.insertAt) {
        const enhContainer = stepEl.querySelector('.step-enhancements');
        
        if (enhContainer.children.length === 0) {
          enhContainer.style.display = 'block';
        }
        
        const enhEl = document.createElement('div');
        enhEl.className = 'step-enhancement';
        enhEl.setAttribute('data-enhancement-id', enhancement.id);
        enhEl.innerHTML = `
          <span class="enh-bullet">•</span>
          <span class="enh-text">${escapeHTML(enhancement.prompt)}</span>
        `;
        
        enhContainer.appendChild(enhEl);
      }
    });
  }

  function removeEnhancementFromStep(enhancement) {
    const enhElements = document.querySelectorAll(`.step-enhancement[data-enhancement-id="${enhancement.id}"]`);
    enhElements.forEach(el => {
      const container = el.parentElement;
      el.remove();
      
      if (container && container.children.length === 0) {
        container.style.display = 'none';
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // COPY FUNCTIONALITY
  // ─────────────────────────────────────────────────────────────────────────

  function copyImplementationPath(path) {
    const text = generatePathText(state.generatedPath || path);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showCopySuccess())
        .catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
      showCopySuccess();
    } catch (e) {
      console.warn('Copy failed:', e);
    }
    
    document.body.removeChild(textarea);
  }

  function showCopySuccess() {
    const btn = document.querySelector('.btn-copy-path');
    if (!btn) return;
    
    const original = btn.textContent;
    btn.textContent = 'Copied to clipboard';
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────────────────────────────────────

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INTEGRATION
  // ─────────────────────────────────────────────────────────────────────────

  function waitForDependencies() {
    if (window.BlankPage && 
        window.BlankPage.getState && 
        window.KumagaizoEnhancements) {
      initialize();
    } else {
      setTimeout(waitForDependencies, 100);
    }
  }

  function initialize() {
    console.log('✦ Implementation Path Engine Initialized');

    const observer = new MutationObserver(() => {
      const screenComplete = document.getElementById('screen-complete');
      if (screenComplete && screenComplete.style.display === 'flex') {
        generateAndRenderPath();
      }
    });

    const screenComplete = document.getElementById('screen-complete');
    if (screenComplete) {
      observer.observe(screenComplete, { attributes: true, attributeFilter: ['style'] });
    }

    if (screenComplete && screenComplete.style.display === 'flex') {
      generateAndRenderPath();
    }
  }

  function generateAndRenderPath() {
    const sessionState = window.BlankPage.getState();
    const categories = window.BlankPage.getCategories();
    const category = categories[sessionState.sessionType];

    if (!category) {
      console.warn('Implementation Path: Category not found');
      return;
    }

    state.currentCategory = category;
    state.selectedEnhancements = [];

    // ═══════════════════════════════════════════════════════════════════════
    // Generate and render Thinking Analysis FIRST
    // ═══════════════════════════════════════════════════════════════════════
    if (window.KumagaizoThinkingAnalysis) {
      const analysis = window.KumagaizoThinkingAnalysis.analyze(sessionState, category);
      if (analysis) {
        window.KumagaizoThinkingAnalysis.render(analysis, 'thinking-analysis-container');
        console.log('✓ Thinking Analysis generated:', analysis.overallScore + '%');
      }
    }
    // ═══════════════════════════════════════════════════════════════════════

    const path = generateImplementationPath(sessionState, category);
    state.generatedPath = path;

    if (path) {
      renderImplementationPath(path, category);
      console.log('✓ Implementation Path generated');
    }
  }

  waitForDependencies();

})();