// ═══════════════════════════════════════════════════════════════════════════
// KUMAGAIZO COGNITIVE REFLECTION//
// ═══════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIGURATION
  // ─────────────────────────────────────────────────────────────────────────
  
  const CONFIG = {
    // Timing
    initialDelay: 3000,        // Ms after first typing before showing reflection
    rotateInterval: 20000,     // Ms between reflection rotations
    fadeTransition: 900,       // Ms for fade transition (match CSS)
    
    // Behavior
    minCharsToShow: 15,        // Min characters typed before showing any reflection
    hideOnEmpty: true,         // Hide reflection when textarea is empty
    pauseOnFocus: false,       // Pause rotation while actively typing
    
    // Debug
    debug: false               // Console logging
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────
  
  const state = {
    // Session tracking
    currentCategory: null,
    currentStep: -1,
    
    // Reflection state
    reflections: [],           // Current step's reflections
    currentIndex: 0,           // Which reflection is showing
    isVisible: false,
    
    // Timers
    initialTimer: null,
    rotateTimer: null,
    
    // Typing tracking
    hasStartedTyping: false,
    lastTextLength: 0
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DEBUG
  // ─────────────────────────────────────────────────────────────────────────
  
  function log(...args) {
    if (CONFIG.debug) console.log('[Reflection]', ...args);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UI CONTROL
  // ─────────────────────────────────────────────────────────────────────────
  
  function show(text) {
    const container = document.getElementById('cognitive-reflection');
    const textEl = document.getElementById('reflection-text');
    
    if (!container || !textEl) {
      log('Missing UI elements');
      return;
    }
    
    if (state.isVisible) {
      // Fade out, change, fade in
      container.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = text;
        container.style.opacity = '1';
      }, CONFIG.fadeTransition);
    } else {
      // Initial show
      textEl.textContent = text;
      container.style.opacity = '1';
      state.isVisible = true;
    }
    
    log('Showing:', text);
  }
  
  function hide() {
    const container = document.getElementById('cognitive-reflection');
    if (container) {
      container.style.opacity = '0';
    }
    state.isVisible = false;
    log('Hidden');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // REFLECTION LOGIC
  // ─────────────────────────────────────────────────────────────────────────
  
  function loadReflections(categoryId, stepIndex) {
    const categories = window.BLANKPAGE_CATEGORIES;
    if (!categories) {
      log('Categories not loaded');
      return [];
    }
    
    const category = categories[categoryId];
    if (!category || !category.steps || !category.steps[stepIndex]) {
      log('Invalid category or step:', categoryId, stepIndex);
      return [];
    }
    
    const step = category.steps[stepIndex];
    return step.reflections || [];
  }
  
  function showNext() {
    if (state.reflections.length === 0) return;
    
    // Move to next reflection (loop around)
    state.currentIndex = (state.currentIndex + 1) % state.reflections.length;
    show(state.reflections[state.currentIndex]);
  }
  
  function showFirst() {
    if (state.reflections.length === 0) return;
    
    // Start at a random position for variety across sessions
    state.currentIndex = Math.floor(Math.random() * state.reflections.length);
    show(state.reflections[state.currentIndex]);
    
    // Start rotation timer
    startRotation();
  }
  
  function startRotation() {
    stopRotation();
    state.rotateTimer = setInterval(showNext, CONFIG.rotateInterval);
    log('Rotation started');
  }
  
  function stopRotation() {
    if (state.rotateTimer) {
      clearInterval(state.rotateTimer);
      state.rotateTimer = null;
    }
  }
  
  function stopInitialTimer() {
    if (state.initialTimer) {
      clearTimeout(state.initialTimer);
      state.initialTimer = null;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STEP MANAGEMENT
  // ─────────────────────────────────────────────────────────────────────────
  
  function initStep(categoryId, stepIndex) {
    log('Init step:', categoryId, stepIndex);
    
    // Reset state
    stopInitialTimer();
    stopRotation();
    hide();
    
    state.currentCategory = categoryId;
    state.currentStep = stepIndex;
    state.reflections = loadReflections(categoryId, stepIndex);
    state.currentIndex = 0;
    state.hasStartedTyping = false;
    state.lastTextLength = 0;
    
    log('Loaded', state.reflections.length, 'reflections');
  }
  
  function resetAll() {
    log('Full reset');
    stopInitialTimer();
    stopRotation();
    hide();
    
    state.currentCategory = null;
    state.currentStep = -1;
    state.reflections = [];
    state.currentIndex = 0;
    state.hasStartedTyping = false;
    state.lastTextLength = 0;
    state.isVisible = false;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INPUT HANDLING
  // ─────────────────────────────────────────────────────────────────────────
  
  function handleInput(e) {
    if (e.target.id !== 'step-textarea') return;
    
    const text = e.target.value;
    const textLength = text.length;
    
    // Empty field
    if (textLength === 0 && CONFIG.hideOnEmpty) {
      stopInitialTimer();
      stopRotation();
      hide();
      state.hasStartedTyping = false;
      return;
    }
    
    // Started typing
    if (!state.hasStartedTyping && textLength >= CONFIG.minCharsToShow) {
      state.hasStartedTyping = true;
      
      // Start initial delay timer
      stopInitialTimer();
      state.initialTimer = setTimeout(() => {
        if (state.hasStartedTyping && state.reflections.length > 0) {
          showFirst();
        }
      }, CONFIG.initialDelay);
      
      log('Typing started, initial timer set');
    }
    
    state.lastTextLength = textLength;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // STATE MONITORING
  // ─────────────────────────────────────────────────────────────────────────
  
  let lastScreenState = null;
  let lastStep = -1;
  
  function monitorState() {
    const preai = window.BlankPage?.getState?.();
    if (!preai) return;
    
    // Detect session screen visibility
    const sessionScreen = document.getElementById('screen-session');
    const isSessionVisible = sessionScreen && sessionScreen.style.display === 'flex';
    
    // Screen changed
    if (lastScreenState !== isSessionVisible) {
      lastScreenState = isSessionVisible;
      
      if (!isSessionVisible) {
        // Left session screen (completed, cancelled, or back to landing)
        resetAll();
        lastStep = -1;
        return;
      } else {
        // Entered session screen
        if (preai.category) {
          initStep(preai.category.id, preai.currentStep);
          lastStep = preai.currentStep;
        }
      }
    }
    
    // Step changed within session
    if (isSessionVisible && preai.currentStep !== lastStep) {
      log('Step changed:', lastStep, '→', preai.currentStep);
      if (preai.category) {
        initStep(preai.category.id, preai.currentStep);
      }
      lastStep = preai.currentStep;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INITIALIZATION
  // ─────────────────────────────────────────────────────────────────────────
  
  function init() {
    // Wait for BlankPage and categories
    if (!window.BlankPage || !window.BLANKPAGE_CATEGORIES) {
      setTimeout(init, 100);
      return;
    }
    
    // Set up initial styles
    const container = document.getElementById('cognitive-reflection');
    if (container) {
      container.style.opacity = '0';
      container.style.transition = `opacity ${CONFIG.fadeTransition}ms ease`;
    }
    
    // Event listeners
    document.addEventListener('input', handleInput);
    
    // State monitor
    setInterval(monitorState, 200);
    
    log('ProvenanceAI Reflection initialized');
    console.log('✦ ProvenanceAI Cognitive Reflection v1.0');
  }
  
  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();