// ═══════════════════════════════════════════════════════════════
// KUMAGAIZO IMPLEMENTATION PATHS - ALL DOMAINS
// ═══════════════════════════════════════════════════════════════

window.KumagaizoPathGenerators = {
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CODING - Clear implementation path
  // ═══════════════════════════════════════════════════════════════════════════
  
  coding: {
    generateContext: (responses) => {
      const building = responses[0]?.trim() || '';
      const logic = responses[1]?.trim() || '';
      
      let context = 'I need to implement:\n\n';
      
      if (building) {
        context += `**Feature:** ${building}\n\n`;
      }
      
      if (logic) {
        context += `**Core Logic:**\n${logic}\n\n`;
      }
      
      context += 'Before coding, validate:\n\n';
      context += '**Architecture:**\n';
      context += '- Where does data enter and leave the system?\n';
      context += '- What external services will this call?\n';
      context += '- Can multiple users hit this simultaneously?\n';
      context += '- What shared state exists?\n\n';
      
      context += '**Simplest Approach:**\n';
      context += '- What\'s the happy path (everything succeeds)?\n';
      context += '- What abstractions are actually needed?\n';
      context += '- Can we hardcode/inline first, extract later?\n\n';
      
      context += '**Edge Cases:**\n';
      context += '- Empty/null inputs\n';
      context += '- Very large inputs\n';
      context += '- Network failures\n';
      context += '- User permissions\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const simplest = responses[2]?.trim() || '';
      const tricky = responses[3]?.trim() || '';
      const needToFigureOut = responses[4]?.trim() || '';
      
      let request = 'Provide working implementation:\n\n';
      
      request += '**1. Core Implementation**\n';
      if (simplest) {
        request += `Start with: ${simplest}\n\n`;
      }
      
      request += 'Include:\n';
      request += '- Type definitions/interfaces with JSDoc\n';
      request += '- Input validation at boundaries\n';
      request += '- Pure functions where possible (no side effects)\n';
      request += '- Inline comments only for non-obvious decisions\n';
      request += '- All imports and dependencies\n\n';
      
      if (tricky) {
        request += `**2. Handle Complexity:** ${tricky}\n`;
        request += '- Break into specific sub-problems\n';
        request += '- Show prototype in isolation first\n';
        request += '- Document tradeoffs and assumptions\n\n';
      }
      
      if (needToFigureOut) {
        request += `**3. Research & Explain:** ${needToFigureOut}\n`;
        request += '- Start with official documentation\n';
        request += '- Show working examples\n';
        request += '- Explain edge cases and gotchas\n';
        request += '- Document why this approach\n\n';
      }
      
      request += '**4. Error Handling**\n';
      request += 'Three categories:\n';
      request += '```typescript\n';
      request += '// 1. Expected errors (user input) → return error object\n';
      request += 'if (!isValid(input)) {\n';
      request += '  return { error: "INVALID_INPUT", message: "..." };\n';
      request += '}\n\n';
      request += '// 2. Operational errors (network, DB) → retry + error boundary\n';
      request += 'try {\n';
      request += '  await externalCall();\n';
      request += '} catch (error) {\n';
      request += '  if (isRetryable(error)) await retry();\n';
      request += '  else throw new OperationalError(...);\n';
      request += '}\n\n';
      request += '// 3. Programmer errors (bugs) → fail fast\n';
      request += 'assert(userId, "userId required");\n';
      request += '```\n\n';
      
      request += '**5. Testing**\n';
      request += 'Key test cases:\n';
      request += '- Happy path: Valid input → expected output\n';
      request += '- Boundaries: Empty, null, max size\n';
      request += '- Errors: Invalid input, network failure, auth failure\n';
      request += '- Concurrency: Simultaneous requests (if applicable)\n\n';
      
      request += 'Show:\n';
      request += '```typescript\n';
      request += 'describe("featureName", () => {\n';
      request += '  it("handles happy path", () => { /* ... */ });\n';
      request += '  it("handles empty input", () => { /* ... */ });\n';
      request += '  it("handles failure gracefully", () => { /* ... */ });\n';
      request += '});\n';
      request += '```\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      const simplest = responses[2]?.toLowerCase() || '';
      const tricky = responses[3]?.toLowerCase() || '';
      
      // Core functionality
      checkpoints.push('Core functionality works (happy path tested)');
      checkpoints.push('Input validation prevents bad data');
      checkpoints.push('Errors provide actionable feedback');
      
      // State management
      if (simplest.includes('state') || simplest.includes('redux') || simplest.includes('context')) {
        checkpoints.push('State follows single source of truth');
        checkpoints.push('No direct mutations (immutable updates)');
      }
      
      // Async operations
      if (simplest.includes('async') || simplest.includes('fetch') || simplest.includes('api')) {
        checkpoints.push('Async operations have timeout protection');
        checkpoints.push('Loading states shown to users');
        checkpoints.push('Race conditions prevented');
      }
      
      // Performance
      if (tricky.includes('performance') || tricky.includes('scale') || simplest.includes('large')) {
        checkpoints.push('No N+1 query problems (batched)');
        checkpoints.push('Performance acceptable for expected load');
      }
      
      // Always
      checkpoints.push('Tests cover happy path and key edge cases');
      checkpoints.push('Code reviewed by someone else');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DEBUGGING - Systematic problem isolation
  // ═══════════════════════════════════════════════════════════════════════════
  
  debugging: {
    generateContext: (responses) => {
      const notWorking = responses[0]?.trim() || '';
      const shouldBe = responses[1]?.trim() || '';
      const lastWorked = responses[2]?.trim() || '';
      
      let context = '**DEBUGGING**\n\n';
      
      if (notWorking) {
        context += `**Current Behavior:** ${notWorking}\n\n`;
      }
      
      if (shouldBe) {
        context += `**Expected Behavior:** ${shouldBe}\n\n`;
      }
      
      if (lastWorked) {
        context += `**Last Worked:** ${lastWorked}\n\n`;
      }
      
      context += '**What Changed?**\n';
      context += '- Code changes, dependencies updated, config changed?\n';
      context += '- Environment differences?\n';
      context += '- Data differences?\n\n';
      
      context += '**Root Cause Hypothesis:**\n';
      context += 'Common culprits:\n';
      context += '- Logic errors (wrong operator, off-by-one)\n';
      context += '- Null/undefined not handled\n';
      context += '- Race conditions (async timing)\n';
      context += '- Stale cache/state\n';
      context += '- API contract changed\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const tried = responses[3]?.trim() || '';
      const guess = responses[4]?.trim() || '';
      
      let request = 'Debug systematically:\n\n';
      
      request += '**1. Reproduce Consistently**\n';
      request += 'Minimal steps:\n';
      request += '```\n';
      request += '1. Start with: [state]\n';
      request += '2. Action: [specific action]\n';
      request += '3. Expected: [what should happen]\n';
      request += '4. Actual: [what happens]\n';
      request += '5. Frequency: always / sometimes / rarely\n';
      request += '```\n\n';
      
      if (tried) {
        request += `**2. What You've Tried:** ${tried}\n\n`;
        request += 'Why didn\'t these work?\n';
        request += '- Were they addressing symptoms not root cause?\n';
        request += '- What does this tell us?\n\n';
      }
      
      if (guess) {
        request += `**3. Your Hypothesis:** ${guess}\n\n`;
        request += 'Test it:\n';
        request += '- If this is true, we should see [X]\n';
        request += '- Add logging to verify\n';
        request += '- What would disprove this?\n\n';
      }
      
      request += '**4. Diagnostic Checks** (ordered by likelihood):\n\n';
      
      request += 'Check 1 - Data:\n';
      request += '```javascript\n';
      request += 'console.log("At failure:", JSON.stringify(data, null, 2));\n';
      request += 'console.log("Type:", typeof value, "Truthy:", !!value);\n';
      request += '```\n';
      request += 'Rules out: null/undefined, wrong types, bad structure\n\n';
      
      request += 'Check 2 - Control Flow:\n';
      request += '```javascript\n';
      request += 'console.log("Checkpoint 1");\n';
      request += 'if (condition) {\n';
      request += '  console.log("Checkpoint 2: inside if", { condition });\n';
      request += '}\n';
      request += 'console.log("Checkpoint 3");\n';
      request += '```\n';
      request += 'Rules out: wrong branch taken, dead code\n\n';
      
      request += 'Check 3 - Async Timing:\n';
      request += '```javascript\n';
      request += 'console.log("Before async:", Date.now());\n';
      request += 'const result = await operation();\n';
      request += 'console.log("After async:", Date.now(), result);\n';
      request += '```\n';
      request += 'Rules out: missing awaits, race conditions\n\n';
      
      request += 'Check 4 - State Mutations:\n';
      request += '```javascript\n';
      request += 'const before = JSON.stringify(state);\n';
      request += 'operation();\n';
      request += 'const after = JSON.stringify(state);\n';
      request += 'if (before !== after) console.log("State changed!");\n';
      request += '```\n';
      request += 'Rules out: unexpected mutations\n\n';
      
      request += '**5. Root Cause (5 Whys)**\n';
      request += 'Once you find the proximate cause, dig deeper:\n';
      request += '```\n';
      request += 'Problem: [visible error]\n';
      request += '  Why? [immediate cause]\n';
      request += '    Why? [underlying cause]\n';
      request += '      Why? [system cause]\n';
      request += '        Why? [process cause]\n';
      request += '          Root: [what to actually fix]\n';
      request += '```\n\n';
      
      request += '**6. Prevention**\n';
      request += '- Fix the specific bug\n';
      request += '- Add test that would have caught it\n';
      request += '- Add runtime checks (validation, assertions)\n';
      request += '- Review similar code for same issue\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Bug reproduces consistently',
        'Root cause identified (not just symptom)',
        'Fix tested against reproduction',
        'Regression test added',
        'Similar code reviewed'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ARCHITECTURE - System design essentials
  // ═══════════════════════════════════════════════════════════════════════════
  
  architecture: {
    generateContext: (responses) => {
      const system = responses[0]?.trim() || '';
      const requirements = responses[1]?.trim() || '';
      const scale = responses[2]?.trim() || '';
      
      let context = '**SYSTEM DESIGN**\n\n';
      
      if (system) {
        context += `**System:** ${system}\n\n`;
      }
      
      if (requirements) {
        context += `**Requirements:** ${requirements}\n\n`;
      }
      
      if (scale) {
        context += `**Scale:** ${scale}\n\n`;
      }
      
      context += 'Validate constraints:\n';
      context += '- Which are real vs assumed?\n';
      context += '- What can we defer to later?\n';
      context += '- What decisions are hard to change?\n\n';
      
      context += 'Start simple:\n';
      context += '- Monolith → Modular → Services (only if needed)\n';
      context += '- Build for today, design for tomorrow\n';
      context += '- Most systems never need microservices\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const components = responses[3]?.trim() || '';
      const hardProblems = responses[4]?.trim() || '';
      const tradeoffs = responses[5]?.trim() || '';
      
      let request = 'Design architecture:\n\n';
      
      request += '**1. Components & Boundaries**\n';
      if (components) {
        request += `Components: ${components}\n\n`;
      }
      
      request += 'For each component:\n';
      request += '- Single clear responsibility\n';
      request += '- Interface/API it exposes\n';
      request += '- Dependencies (what it calls)\n';
      request += '- Data it owns and where stored\n\n';
      
      request += '**2. Data Flow**\n';
      request += '```\n';
      request += 'User → API → Business Logic → Database\n';
      request += '       ↓\n';
      request += '   Validate → Authorize → Transform → Persist\n';
      request += '```\n\n';
      
      request += 'Define:\n';
      request += '- Source of truth for each data type\n';
      request += '- Strong consistency (financial, auth) vs eventual (analytics, search)\n';
      request += '- Cache strategy (what, where, TTL)\n\n';
      
      if (hardProblems) {
        request += `**3. Technical Challenges:** ${hardProblems}\n\n`;
        request += 'For each challenge:\n';
        request += '- Why is this hard?\n';
        request += '- What approaches exist?\n';
        request += '- Why chosen approach over alternatives?\n';
        request += '- Prototype to validate risky assumptions\n\n';
      }
      
      if (tradeoffs) {
        request += `**4. Tradeoffs:** ${tradeoffs}\n\n`;
      }
      
      request += 'Common tradeoffs:\n';
      request += '- Consistency vs Availability (CAP theorem)\n';
      request += '- Latency vs Throughput\n';
      request += '- Simplicity vs Performance (start simple!)\n';
      request += '- Coupling vs Duplication\n\n';
      
      request += '**5. Scaling Strategy**\n';
      request += 'Phase 1 - MVP:\n';
      request += '- Monolith, single database\n';
      request += '- Handles 100 concurrent users\n\n';
      
      request += 'Phase 2 - Growth:\n';
      request += '- Modular monolith with clear boundaries\n';
      request += '- Read replicas, caching layer\n';
      request += '- Horizontal scaling (multiple app servers)\n';
      request += '- Handles 10K concurrent users\n\n';
      
      request += 'Phase 3 - Scale:\n';
      request += '- Microservices only if monolith is bottleneck\n';
      request += '- Database sharding if needed\n';
      request += '- Multi-region deployment\n\n';
      
      request += '**6. Operational Essentials**\n';
      request += '```typescript\n';
      request += '// Logging with context\n';
      request += 'logger.info("User created", { userId, requestId, duration });\n\n';
      request += '// Metrics\n';
      request += 'metrics.histogram("api.duration", duration);\n';
      request += 'metrics.counter("errors", 1, { type: "database" });\n\n';
      request += '// Health checks\n';
      request += 'app.get("/health", async () => {\n';
      request += '  const dbOk = await db.ping();\n';
      request += '  return { status: dbOk ? "ok" : "error" };\n';
      request += '});\n';
      request += '```\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('Component boundaries are clear');
      checkpoints.push('Data flow is explicit');
      checkpoints.push('Source of truth defined for each data type');
      
      const scale = responses[2]?.toLowerCase() || '';
      if (scale.includes('scale') || scale.includes('user')) {
        checkpoints.push('Scaling strategy exists with numbers');
      }
      
      checkpoints.push('Observability built in (logs, metrics)');
      checkpoints.push('Evolution path from MVP to scale clear');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CODE REVIEW - Focused review checklist
  // ═══════════════════════════════════════════════════════════════════════════
  
  codereview: {
    generateContext: (responses) => {
      const whatItDoes = responses[0]?.trim() || '';
      const unsure = responses[1]?.trim() || '';
      
      let context = '**CODE REVIEW**\n\n';
      
      if (whatItDoes) {
        context += `**Purpose:** ${whatItDoes}\n\n`;
      }
      
      if (unsure) {
        context += `**Concerns:** ${unsure}\n\n`;
      }
      
      context += 'Review for:\n';
      context += '- Security (injection, auth, data exposure)\n';
      context += '- Correctness (logic, edge cases, race conditions)\n';
      context += '- Performance (N+1, missing indexes, inefficiencies)\n';
      context += '- Maintainability (clarity, structure)\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const focus = responses[2]?.trim() || '';
      
      let request = 'Structured review:\n\n';
      
      request += '**1. Critical Issues (Must Fix)**\n\n';
      
      request += 'Security:\n';
      request += '- SQL injection: Are queries parameterized?\n';
      request += '  ❌ `db.query("SELECT * FROM users WHERE id = " + userId)`\n';
      request += '  ✓ `db.query("SELECT * FROM users WHERE id = ?", [userId])`\n\n';
      
      request += '- Auth bypass: Is auth on server side?\n';
      request += '  ❌ Client-side only checks\n';
      request += '  ✓ Server validates every request\n\n';
      
      request += '- Data exposure: Are secrets logged?\n';
      request += '  ❌ `console.log("User:", user)` // might contain password\n';
      request += '  ✓ `console.log("User:", { id: user.id, email: user.email })`\n\n';
      
      request += 'Correctness:\n';
      request += '- Null handling: All paths check null/undefined?\n';
      request += '- Edge cases: Empty arrays, zero values, max sizes?\n';
      request += '- Race conditions: Can concurrent requests cause issues?\n\n';
      
      request += '**2. Important Issues (Should Fix)**\n\n';
      
      request += 'Performance:\n';
      request += '- N+1 queries:\n';
      request += '  ❌ Loop with DB query inside\n';
      request += '  ✓ Single query with JOIN or batch fetch\n\n';
      
      request += '- Missing indexes:\n';
      request += '  Check queries on columns without indexes\n\n';
      
      request += '- Synchronous when could be parallel:\n';
      request += '  ❌ `await a(); await b(); await c();`\n';
      request += '  ✓ `await Promise.all([a(), b(), c()])`\n\n';
      
      request += 'Maintainability:\n';
      request += '- Long functions (>50 lines): Break into smaller pieces\n';
      request += '- Unclear names: Rename for clarity\n';
      request += '- Missing error handling: Add try/catch or error boundaries\n';
      request += '- No tests: Add tests for critical paths\n\n';
      
      if (focus) {
        request += `**3. Specific Focus:** ${focus}\n`;
        request += 'Deep dive on these areas with detailed analysis\n\n';
      }
      
      request += '**4. What\'s Good**\n';
      request += 'Highlight well-designed parts to keep/expand\n\n';
      
      request += '**5. Testing Gaps**\n';
      request += '- What scenarios aren\'t covered?\n';
      request += '- What would break without being caught?\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'No SQL injection (parameterized queries)',
        'No auth bypass (server-side checks)',
        'No sensitive data in logs',
        'Null/undefined handled',
        'No obvious performance issues',
        'Error handling prevents crashes',
        'Tests cover critical paths'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // API DESIGN - Clear, evolvable APIs
  // ═══════════════════════════════════════════════════════════════════════════
  
  api: {
    generateContext: (responses) => {
      const purpose = responses[0]?.trim() || '';
      const users = responses[1]?.trim() || '';
      
      let context = '**API DESIGN**\n\n';
      
      if (purpose) {
        context += `**Purpose:** ${purpose}\n\n`;
      }
      
      if (users) {
        context += `**Users:** ${users}\n\n`;
      }
      
      context += 'Design goals:\n';
      context += '- Intuitive (users can guess correct usage)\n';
      context += '- Consistent (similar things work similarly)\n';
      context += '- Evolvable (extend without breaking)\n';
      context += '- Clear errors (actionable messages)\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const operations = responses[2]?.trim() || '';
      const dataStructures = responses[3]?.trim() || '';
      
      let request = 'Design API:\n\n';
      
      request += '**1. Endpoints**\n';
      if (operations) {
        request += `Operations: ${operations}\n\n`;
      }
      
      request += 'REST conventions:\n';
      request += '```\n';
      request += 'GET    /users          # List\n';
      request += 'GET    /users/:id      # Read\n';
      request += 'POST   /users          # Create\n';
      request += 'PUT    /users/:id      # Update (full)\n';
      request += 'PATCH  /users/:id      # Update (partial)\n';
      request += 'DELETE /users/:id      # Delete\n';
      request += '```\n\n';
      
      request += 'For each endpoint:\n';
      request += '- Request schema (required/optional fields)\n';
      request += '- Response schema (success)\n';
      request += '- Error responses (4xx, 5xx)\n';
      request += '- Status codes (200, 201, 400, 401, 404, 500)\n\n';
      
      if (dataStructures) {
        request += `**2. Data Models:** ${dataStructures}\n\n`;
      }
      
      request += 'Schema example:\n';
      request += '```typescript\n';
      request += 'interface User {\n';
      request += '  id: string;           // UUID\n';
      request += '  email: string;        // format: email\n';
      request += '  name: string;         // max: 100\n';
      request += '  createdAt: string;    // ISO 8601\n';
      request += '}\n';
      request += '```\n\n';
      
      request += '**3. Error Format**\n';
      request += '```json\n';
      request += '{\n';
      request += '  "error": "INVALID_INPUT",\n';
      request += '  "message": "Email is required",\n';
      request += '  "field": "email"\n';
      request += '}\n';
      request += '```\n\n';
      
      request += '**4. Pagination**\n';
      request += '```\n';
      request += 'GET /users?page=2&limit=20\n\n';
      request += 'Response:\n';
      request += '{\n';
      request += '  "data": [...],\n';
      request += '  "pagination": {\n';
      request += '    "page": 2,\n';
      request += '    "limit": 20,\n';
      request += '    "total": 150,\n';
      request += '    "hasNext": true\n';
      request += '  }\n';
      request += '}\n';
      request += '```\n\n';
      
      request += '**5. Authentication**\n';
      request += '```\n';
      request += 'Authorization: Bearer <token>\n';
      request += '```\n';
      request += '- Use HTTPS always\n';
      request += '- Token in header, not query string\n';
      request += '- Return 401 for invalid/missing token\n\n';
      
      request += '**6. Rate Limiting**\n';
      request += '```\n';
      request += 'X-RateLimit-Limit: 1000\n';
      request += 'X-RateLimit-Remaining: 523\n';
      request += 'X-RateLimit-Reset: 1640000000\n';
      request += '```\n';
      request += 'Return 429 when limit exceeded\n\n';
      
      request += '**7. Versioning**\n';
      request += '```\n';
      request += 'Accept: application/vnd.api.v2+json\n';
      request += '# or\n';
      request += 'GET /v2/users\n';
      request += '```\n';
      request += 'Version when breaking changes needed\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Endpoints follow REST conventions',
        'Request/response schemas defined',
        'Error format is consistent',
        'Status codes used correctly',
        'Authentication strategy clear',
        'Rate limiting specified',
        'Versioning strategy exists'
      ];
    }
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // PRODUCT THINKING - Strategic validation framework
  // ═══════════════════════════════════════════════════════════════════════════
  
  product: {
    generateContext: (responses) => {
      const problem = responses[0]?.trim() || '';
      const currentSolution = responses[1]?.trim() || '';
      const targetUser = responses[2]?.trim() || '';
      
      let context = 'I need to validate:\n\n';
      
      if (problem) {
        context += `**Problem:** ${problem}\n\n`;
      }
      
      if (currentSolution) {
        context += `**Current Solutions:** ${currentSolution}\n\n`;
      }
      
      if (targetUser) {
        context += `**Target User:** ${targetUser}\n\n`;
      }
      
      context += 'Critical questions:\n';
      context += '- Is this a "hair on fire" problem or nice-to-have?\n';
      context += '- Why are current solutions inadequate?\n';
      context += '- What job are users actually hiring this to do?\n';
      context += '- What would make someone switch?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const userValue = responses[3]?.trim() || '';
      const constraints = responses[4]?.trim() || '';
      const success = responses[5]?.trim() || '';
      
      let request = 'Develop product strategy:\n\n';
      
      request += '**1. Value Hypothesis**\n';
      if (userValue) {
        request += `Core value: ${userValue}\n\n`;
      }
      
      request += 'Define:\n';
      request += '- Job to be done (functional outcome)\n';
      request += '- Why switch from current solution?\n';
      request += '- Compelling event (what triggers need?)\n';
      request += '- User success metrics\n\n';
      
      request += 'Test:\n';
      request += '- Would they pay for this?\n';
      request += '- Would they use it weekly?\n';
      request += '- Would they tell others?\n\n';
      
      request += '**2. Market Position**\n';
      request += 'Positioning:\n';
      request += '- Who we\'re NOT targeting (focus)\n';
      request += '- What makes this defensible:\n';
      request += '  • Network effects (gets better with more users)\n';
      request += '  • Data advantage (proprietary insights)\n';
      request += '  • Brand/trust (switching cost)\n';
      request += '  • Technical moat (hard to replicate)\n\n';
      
      request += 'Validate:\n';
      request += '- Is this a product or just a feature?\n';
      request += '- Could existing player add this easily?\n';
      request += '- What prevents commoditization?\n\n';
      
      if (constraints) {
        request += `**3. Constraints:** ${constraints}\n\n`;
        request += 'Clarify:\n';
        request += '- What we\'re optimizing for (speed? quality? cost?)\n';
        request += '- What we\'re NOT doing (scope boundaries)\n';
        request += '- With 10x resources, what changes?\n\n';
      }
      
      request += '**4. Validation Plan**\n';
      if (success) {
        request += `Success metrics: ${success}\n\n`;
      }
      
      request += 'Before building:\n';
      request += '- Smoke test (landing page + signup)\n';
      request += '- Customer interviews (5-10 target users)\n';
      request += '- Concierge MVP (manual delivery)\n';
      request += '- Prototype testing\n\n';
      
      request += 'Kill criteria:\n';
      request += '- <10% conversion on smoke test\n';
      request += '- Can\'t find 10 passionate users\n';
      request += '- Unwilling to pay (after free trial)\n';
      request += '- Alternative cheaper/better emerges\n\n';
      
      request += '**5. Go-to-Market**\n';
      request += 'Discovery:\n';
      request += '- Where do target users hang out?\n';
      request += '- What do they search for?\n';
      request += '- Who do they trust?\n\n';
      
      request += 'Activation:\n';
      request += '- First "aha moment" (when value clicks)\n';
      request += '- Time to value (<5 minutes ideal)\n';
      request += '- Success milestone (what indicates working?)\n\n';
      
      request += 'Retention:\n';
      request += '- What drives habit formation?\n';
      request += '- Why would they come back?\n';
      request += '- What prevents them leaving?\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('Problem validated as urgent (not just interesting)');
      checkpoints.push('Value proposition differentiated from alternatives');
      
      const userValue = responses[3]?.toLowerCase() || '';
      if (userValue.includes('switch') || userValue.includes('replace')) {
        checkpoints.push('Clear switching motivation identified');
      }
      
      checkpoints.push('Validation plan defined (test before build)');
      checkpoints.push('Defensibility/moat articulated');
      checkpoints.push('Kill criteria established');
      checkpoints.push('Go-to-market realistic for resources');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURE SPEC - Actionable feature specification
  // ═══════════════════════════════════════════════════════════════════════════
  
  feature: {
    generateContext: (responses) => {
      const feature = responses[0]?.trim() || '';
      const why = responses[1]?.trim() || '';
      const users = responses[2]?.trim() || '';
      
      let context = '**FEATURE SPEC**\n\n';
      
      if (feature) {
        context += `**Feature:** ${feature}\n\n`;
      }
      
      if (why) {
        context += `**Why:** ${why}\n\n`;
      }
      
      if (users) {
        context += `**For:** ${users}\n\n`;
      }
      
      context += 'Clarify scope:\n';
      context += '- What user problem does this solve?\n';
      context += '- How measure success?\n';
      context += '- MVP vs nice-to-have?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const userExperience = responses[3]?.trim() || '';
      const technical = responses[4]?.trim() || '';
      const edge = responses[5]?.trim() || '';
      
      let request = 'Complete feature spec:\n\n';
      
      request += '**1. User Flow**\n';
      if (userExperience) {
        request += `Core flow: ${userExperience}\n\n`;
      }
      
      request += 'For each step:\n';
      request += '- User action + system response\n';
      request += '- Loading state (what shows while processing)\n';
      request += '- Success state (confirmation)\n';
      request += '- Error state (what went wrong + recovery)\n';
      request += '- Empty state (no data yet)\n\n';
      
      request += '**2. Acceptance Criteria**\n';
      request += 'Given-When-Then format:\n\n';
      
      request += 'Happy path:\n';
      request += '```\n';
      request += 'Given [starting state]\n';
      request += 'When [user action]\n';
      request += 'Then [expected outcome]\n';
      request += '```\n\n';
      
      request += 'Error cases:\n';
      request += '```\n';
      request += 'Given [problematic state]\n';
      request += 'When [action]\n';
      request += 'Then [graceful failure + clear message]\n';
      request += '```\n\n';
      
      if (technical) {
        request += `**3. Technical Requirements:**\n${technical}\n\n`;
      }
      
      request += 'Specify:\n';
      request += '- API endpoints needed (method, path, request/response)\n';
      request += '- Data model changes\n';
      request += '- Performance targets (<500ms? <2s?)\n';
      request += '- External dependencies\n\n';
      
      if (edge) {
        request += `**4. Edge Cases:**\n${edge}\n\n`;
      }
      
      request += 'Common edges:\n';
      request += '- Empty/null values\n';
      request += '- Very large data sets\n';
      request += '- Concurrent actions\n';
      request += '- Network failures\n';
      request += '- Permissions/authorization\n\n';
      
      request += '**5. Analytics**\n';
      request += 'Track:\n';
      request += '- Feature discovery (how many see it)\n';
      request += '- Activation (how many try it)\n';
      request += '- Completion (how many succeed)\n';
      request += '- Errors (where do they fail)\n';
      request += '- Time spent (engagement)\n\n';
      
      request += 'Success metric:\n';
      request += '- Primary KPI (revenue? retention? engagement?)\n';
      request += '- Target (% increase expected)\n';
      request += '- Timeline (how long to measure)\n\n';
      
      request += '**6. Rollout**\n';
      request += 'Strategy:\n';
      request += '- Internal dogfooding (1 week)\n';
      request += '- Beta users (5% for 1 week)\n';
      request += '- Gradual rollout (25% → 50% → 100%)\n\n';
      
      request += 'Rollback triggers:\n';
      request += '- Error rate >5%\n';
      request += '- Performance degradation >50%\n';
      request += '- Negative user feedback spike\n\n';
      
      request += '**7. Out of Scope**\n';
      request += 'Explicitly NOT doing (v2):\n';
      request += '- [Feature variation]\n';
      request += '- [Advanced capability]\n';
      request += '- [Integration]\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'User flow complete (all states covered)',
        'Acceptance criteria testable',
        'Technical requirements feasible',
        'Edge cases handled gracefully',
        'Analytics capture success metrics',
        'Rollout plan includes rollback',
        'Out of scope is explicit'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // USER STORY - INVEST-compliant stories
  // ═══════════════════════════════════════════════════════════════════════════
  
  userstory: {
    generateContext: (responses) => {
      const who = responses[0]?.trim() || '';
      const what = responses[1]?.trim() || '';
      const why = responses[2]?.trim() || '';
      
      let context = '**USER STORY**\n\n';
      
      context += `As a ${who || '[user type]'}\n`;
      context += `I want to ${what || '[action]'}\n`;
      context += `So that ${why || '[outcome]'}\n\n`;
      
      context += 'Validate INVEST:\n';
      context += '- Independent (can deliver alone?)\n';
      context += '- Negotiable (details flexible?)\n';
      context += '- Valuable (delivers user value?)\n';
      context += '- Estimable (can size it?)\n';
      context += '- Small (fits in sprint?)\n';
      context += '- Testable (clear pass/fail?)\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const done = responses[3]?.trim() || '';
      
      let request = 'Complete user story:\n\n';
      
      request += '**Acceptance Criteria**\n\n';
      
      request += 'Happy path:\n';
      request += '```\n';
      request += 'Given [starting state]\n';
      request += 'When [action]\n';
      request += 'Then [outcome]\n';
      request += 'And [additional outcome]\n';
      request += '```\n\n';
      
      request += 'Alternative flows:\n';
      request += '```\n';
      request += 'Given [different state]\n';
      request += 'When [action]\n';
      request += 'Then [different outcome]\n';
      request += '```\n\n';
      
      request += 'Error handling:\n';
      request += '```\n';
      request += 'Given [invalid state]\n';
      request += 'When [action]\n';
      request += 'Then [error message]\n';
      request += 'And [recovery option]\n';
      request += '```\n\n';
      
      if (done) {
        request += `**Additional DoD:** ${done}\n\n`;
      }
      
      request += '**Definition of Done**\n';
      request += '- [ ] Code complete\n';
      request += '- [ ] Unit tests passing\n';
      request += '- [ ] Integration tested\n';
      request += '- [ ] Code reviewed\n';
      request += '- [ ] Deployed to staging\n';
      request += '- [ ] Product owner approved\n';
      request += '- [ ] Documentation updated\n\n';
      
      request += '**Dependencies**\n';
      request += '- Technical: [APIs, services, data]\n';
      request += '- Teams: [who else involved]\n';
      request += '- Blockers: [what must complete first]\n\n';
      
      request += '**Test Data**\n';
      request += '- Valid test cases\n';
      request += '- Invalid test cases\n';
      request += '- Edge cases\n\n';
      
      request += '**Out of Scope**\n';
      request += '- [Related but separate feature]\n';
      request += '- [Future enhancement]\n';
      request += '- [Known limitation]\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Story fits in single iteration',
        'Acceptance criteria are testable',
        'Happy path clearly defined',
        'Error handling specified',
        'Dependencies identified',
        'Definition of done complete',
        'Delivers standalone value'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNICAL DECISION - Structured decision framework
  // ═══════════════════════════════════════════════════════════════════════════
  
  techdecision: {
    generateContext: (responses) => {
      const decision = responses[0]?.trim() || '';
      const context = responses[1]?.trim() || '';
      const timeline = responses[2]?.trim() || '';
      
      let text = '**TECH DECISION**\n\n';
      
      if (decision) {
        text += `**Decision:** ${decision}\n\n`;
      }
      
      if (context) {
        text += `**Context:** ${context}\n\n`;
      }
      
      if (timeline) {
        text += `**Timeline:** ${timeline}\n\n`;
      }
      
      text += 'Before deciding:\n';
      text += '- What are we optimizing for?\n';
      text += '- What constraints are real vs assumed?\n';
      text += '- What\'s reversible vs permanent?\n';
      
      return text;
    },
    
    generateImplementation: (responses) => {
      const options = responses[3]?.trim() || '';
      const criteria = responses[4]?.trim() || '';
      
      let request = 'Structured decision:\n\n';
      
      request += '**1. Options**\n';
      if (options) {
        request += `Considering: ${options}\n\n`;
      }
      
      if (criteria) {
        request += `**Criteria:** ${criteria}\n\n`;
      }
      
      request += '**2. Evaluation Matrix**\n\n';
      
      request += '| Option | Technical Fit | Team Can Do | Ops Burden | Cost | Lock-in Risk |\n';
      request += '|--------|--------------|-------------|-----------|------|-------------|\n';
      request += '| A | High/Med/Low | High/Med/Low | High/Med/Low | $$ | High/Med/Low |\n';
      request += '| B | ... | ... | ... | ... | ... |\n\n';
      
      request += 'For each option:\n\n';
      
      request += '**Technical Fit:**\n';
      request += '- Solves the problem?\n';
      request += '- Performance characteristics\n';
      request += '- Scalability\n';
      request += '- Known limitations\n\n';
      
      request += '**Team Capability:**\n';
      request += '- Current expertise level\n';
      request += '- Learning curve\n';
      request += '- Hiring difficulty\n';
      request += '- Documentation quality\n\n';
      
      request += '**Operations:**\n';
      request += '- Deployment complexity\n';
      request += '- Monitoring/debugging\n';
      request += '- Maintenance burden\n';
      request += '- Maturity/stability\n\n';
      
      request += '**Cost:**\n';
      request += '- License fees\n';
      request += '- Infrastructure costs\n';
      request += '- Development time\n';
      request += '- Training costs\n\n';
      
      request += '**Lock-in:**\n';
      request += '- Migration difficulty\n';
      request += '- Vendor dependency\n';
      request += '- Exit strategy\n';
      request += '- Data portability\n\n';
      
      request += '**3. Recommendation**\n';
      request += 'Choose [Option X] because:\n';
      request += '- Primary reason (aligns with optimization goal)\n';
      request += '- Supporting reasons\n';
      request += '- Acceptable tradeoffs\n\n';
      
      request += 'What would change decision:\n';
      request += '- If [assumption] proves false\n';
      request += '- If [constraint] changes\n';
      request += '- If [alternative] becomes available\n\n';
      
      request += '**4. De-risk with POC**\n';
      request += 'Before full commitment:\n';
      request += '- Riskiest assumption: [what could go wrong]\n';
      request += '- Test approach: [how to validate]\n';
      request += '- Time box: [1 day? 1 week?]\n';
      request += '- Success criteria: [what proves it works]\n\n';
      
      request += '**5. Rollout Plan**\n';
      request += 'If proceeding:\n';
      request += '- Phase 1: Small prototype\n';
      request += '- Phase 2: Limited production use\n';
      request += '- Phase 3: Full adoption\n';
      request += '- Rollback plan if issues\n\n';
      
      request += '**6. Document Decision**\n';
      request += 'Architecture Decision Record:\n';
      request += '```markdown\n';
      request += '## Decision: [Title]\n';
      request += '**Status:** Accepted\n';
      request += '**Context:** [Why we need this]\n';
      request += '**Decision:** [What we chose]\n';
      request += '**Consequences:** [What this means]\n';
      request += '**Alternatives:** [What we didn\'t choose and why]\n';
      request += '```\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'All viable options evaluated',
        'Criteria match priorities',
        'Team capability considered',
        'Total cost understood',
        'Recommendation clear with reasoning',
        'Risks identified with mitigation',
        'POC plan for risky assumptions',
        'Decision documented (ADR)'
      ];
    }
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // UX DESIGN - User-centered design process
  // ═══════════════════════════════════════════════════════════════════════════
  
  uxdesign: {
    generateContext: (responses) => {
      const userGoal = responses[0]?.trim() || '';
      const currentProblem = responses[1]?.trim() || '';
      const constraints = responses[2]?.trim() || '';
      
      let context = 'I need to design:\n\n';
      
      if (userGoal) {
        context += `**User Goal:** ${userGoal}\n\n`;
      }
      
      if (currentProblem) {
        context += `**Current Problem:** ${currentProblem}\n\n`;
      }
      
      if (constraints) {
        context += `**Constraints:** ${constraints}\n\n`;
      }
      
      context += 'Validate understanding:\n';
      context += '- Who is the user and what\'s their context?\n';
      context += '- What are they actually trying to accomplish?\n';
      context += '- What\'s making it hard right now?\n';
      context += '- How do we measure if the design works?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const experience = responses[3]?.trim() || '';
      const complexity = responses[4]?.trim() || '';
      
      let request = 'Design user experience:\n\n';
      
      request += '**1. User Flow**\n';
      if (experience) {
        request += `Desired experience: ${experience}\n\n`;
      }
      
      request += 'Map the journey:\n';
      request += '```\n';
      request += 'Entry → [Action 1] → [Feedback] → [Action 2] → Success\n';
      request += '         ↓ Error?\n';
      request += '         [Recovery path]\n';
      request += '```\n\n';
      
      request += 'For each step:\n';
      request += '- What information does user need?\n';
      request += '- What action can they take?\n';
      request += '- What feedback confirms it worked?\n';
      request += '- What if something goes wrong?\n\n';
      
      request += '**2. Information Architecture**\n';
      request += 'Structure:\n';
      request += '- Primary navigation (3-7 items max)\n';
      request += '- Content hierarchy (what\'s most important)\n';
      request += '- Discoverability (can users find what they need)\n';
      request += '- Mental model (matches user expectations)\n\n';
      
      if (complexity) {
        request += `**3. Handle Complexity:** ${complexity}\n\n`;
        request += 'Progressive disclosure:\n';
        request += '- What\'s essential (show always)\n';
        request += '- What\'s common (1 click away)\n';
        request += '- What\'s rare (2+ clicks, that\'s OK)\n\n';
        
        request += 'Simplification strategies:\n';
        request += '- Smart defaults (80% don\'t customize)\n';
        request += '- Inline help (contextual guidance)\n';
        request += '- Chunking (break into steps)\n';
        request += '- Examples (show don\'t tell)\n\n';
      }
      
      request += '**4. Interaction Patterns**\n';
      request += 'Use familiar patterns:\n';
      request += '- Forms: Top labels, clear validation, inline errors\n';
      request += '- Lists: Scannable, filterable, sortable\n';
      request += '- Actions: Primary button clear, destructive = red\n';
      request += '- Feedback: Success (green), error (red), warning (yellow)\n\n';
      
      request += '**5. States & Feedback**\n';
      request += 'Every interaction needs:\n';
      request += '```\n';
      request += 'Empty state:    "No items yet. Add your first one."\n';
      request += 'Loading state:  "Loading..." (with spinner if >1s)\n';
      request += 'Success state:  "Saved successfully" (auto-dismiss)\n';
      request += 'Error state:    "Couldn\'t save. Try again." (persist)\n';
      request += '```\n\n';
      
      request += '**6. Accessibility Fundamentals**\n';
      request += 'WCAG 2.1 AA basics:\n';
      request += '- Color contrast: 4.5:1 for text, 3:1 for UI\n';
      request += '- Keyboard navigation: Tab through all interactive elements\n';
      request += '- Screen reader: Semantic HTML, proper labels\n';
      request += '- Focus indicators: Visible when tabbing\n';
      request += '- Touch targets: Min 44x44px\n\n';
      
      request += '**7. Validation Plan**\n';
      request += 'Test with users:\n';
      request += '- Can they complete primary task without help?\n';
      request += '- Where do they get confused?\n';
      request += '- What do they try that doesn\'t work?\n';
      request += '- What would make them trust/use this?\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('User can complete primary goal without instructions');
      checkpoints.push('Every action has clear feedback');
      checkpoints.push('Errors provide recovery path');
      
      const complexity = responses[4]?.toLowerCase() || '';
      if (complexity.includes('complex') || complexity.includes('many')) {
        checkpoints.push('Complexity is progressively disclosed');
        checkpoints.push('Smart defaults reduce decisions');
      }
      
      checkpoints.push('Meets WCAG 2.1 AA (color, keyboard, screen reader)');
      checkpoints.push('Tested with representative users');
      checkpoints.push('Information architecture is intuitive');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // UI DESIGN - Visual design with systematic approach
  // ═══════════════════════════════════════════════════════════════════════════
  
  uidesign: {
    generateContext: (responses) => {
      const component = responses[0]?.trim() || '';
      const context = responses[1]?.trim() || '';
      const brandConstraints = responses[2]?.trim() || '';
      
      let text = '**UI DESIGN**\n\n';
      
      if (component) {
        text += `**Component:** ${component}\n\n`;
      }
      
      if (context) {
        text += `**Context:** ${context}\n\n`;
      }
      
      if (brandConstraints) {
        text += `**Brand/Constraints:** ${brandConstraints}\n\n`;
      }
      
      text += 'Design system thinking:\n';
      text += '- What existing patterns can we use?\n';
      text += '- When do we need something new?\n';
      text += '- How does this scale across screens?\n';
      
      return text;
    },
    
    generateImplementation: (responses) => {
      const variants = responses[3]?.trim() || '';
      const responsive = responses[4]?.trim() || '';
      
      let request = 'Design UI systematically:\n\n';
      
      request += '**1. Visual Hierarchy**\n';
      request += 'Establish importance:\n';
      request += '```\n';
      request += 'Level 1: Primary action (largest, brightest)\n';
      request += 'Level 2: Secondary content (medium size)\n';
      request += 'Level 3: Supporting info (smaller, muted)\n';
      request += '```\n\n';
      
      request += 'Use scale, weight, color, spacing:\n';
      request += '- Scale: 12px → 14px → 16px → 20px → 24px → 32px → 48px\n';
      request += '- Weight: 400 (normal) → 600 (medium) → 700 (bold)\n';
      request += '- Color: Background → Surface → Border → Text → Primary\n';
      request += '- Spacing: 4px → 8px → 16px → 24px → 32px → 48px → 64px\n\n';
      
      request += '**2. Component States**\n';
      if (variants) {
        request += `Variants needed: ${variants}\n\n`;
      }
      
      request += 'Define all states:\n';
      request += '```\n';
      request += 'Default:  Normal appearance\n';
      request += 'Hover:    Subtle highlight (opacity 0.9)\n';
      request += 'Active:   Pressed appearance (scale 0.98)\n';
      request += 'Disabled: Grayed out (opacity 0.5)\n';
      request += 'Focus:    Clear outline (for keyboard)\n';
      request += 'Loading:  Spinner or skeleton\n';
      request += 'Error:    Red border + message\n';
      request += '```\n\n';
      
      request += '**3. Color System**\n';
      request += 'Functional colors:\n';
      request += '```\n';
      request += 'Primary:   Main brand action (#0066FF)\n';
      request += 'Success:   Positive feedback (#00C853)\n';
      request += 'Warning:   Caution message (#FFA000)\n';
      request += 'Error:     Problem state (#D32F2F)\n';
      request += 'Neutral:   General content (#64748B)\n';
      request += '```\n\n';
      
      request += 'Ensure contrast:\n';
      request += '- Text on background: 4.5:1 minimum\n';
      request += '- UI elements: 3:1 minimum\n';
      request += '- Use WebAIM contrast checker\n\n';
      
      if (responsive) {
        request += `**4. Responsive Strategy:** ${responsive}\n\n`;
      }
      
      request += 'Breakpoints:\n';
      request += '```\n';
      request += 'Mobile:   < 640px  (single column, stacked)\n';
      request += 'Tablet:   640-1024px (flexible grid)\n';
      request += 'Desktop:  > 1024px (full layout)\n';
      request += '```\n\n';
      
      request += 'Responsive patterns:\n';
      request += '- Mobile-first (start small, scale up)\n';
      request += '- Touch-friendly (44px+ tap targets)\n';
      request += '- Readable text (16px+ on mobile)\n';
      request += '- Hide non-essential on small screens\n\n';
      
      request += '**5. Typography**\n';
      request += 'Type scale:\n';
      request += '```\n';
      request += 'Display:    48px / line-height 1.2\n';
      request += 'Heading 1:  32px / line-height 1.3\n';
      request += 'Heading 2:  24px / line-height 1.4\n';
      request += 'Body:       16px / line-height 1.5\n';
      request += 'Small:      14px / line-height 1.5\n';
      request += 'Caption:    12px / line-height 1.4\n';
      request += '```\n\n';
      
      request += 'Readability:\n';
      request += '- Line length: 45-75 characters\n';
      request += '- Paragraph spacing: 1.5x line height\n';
      request += '- Font: System fonts for performance\n\n';
      
      request += '**6. Spacing System**\n';
      request += 'Use 4px base unit:\n';
      request += '```\n';
      request += '4px:  Tight (between related items)\n';
      request += '8px:  Close (within components)\n';
      request += '16px: Default (between components)\n';
      request += '24px: Medium (between sections)\n';
      request += '32px: Large (major separations)\n';
      request += '48px: XL (between page sections)\n';
      request += '```\n\n';
      
      request += '**7. Animation**\n';
      request += 'Subtle motion:\n';
      request += '```css\n';
      request += 'transition: all 0.2s ease-out;\n\n';
      request += '/* Micro-interactions */\n';
      request += 'hover: 200ms\n';
      request += 'modal open: 300ms\n';
      request += 'page transition: 400ms\n';
      request += '```\n\n';
      
      request += 'Rules:\n';
      request += '- Under 400ms (feels instant)\n';
      request += '- Ease-out curves (natural deceleration)\n';
      request += '- Purposeful (feedback, not decoration)\n';
      request += '- Respect prefers-reduced-motion\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Visual hierarchy is clear (what\'s most important)',
        'All interactive states defined',
        'Color contrast meets WCAG AA',
        'Component is responsive (mobile, tablet, desktop)',
        'Typography is readable',
        'Spacing is consistent',
        'Matches design system patterns'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN SYSTEM - Scalable, maintainable component library
  // ═══════════════════════════════════════════════════════════════════════════
  
  designsystem: {
    generateContext: (responses) => {
      const scope = responses[0]?.trim() || '';
      const existing = responses[1]?.trim() || '';
      
      let context = '**DESIGN SYSTEM**\n\n';
      
      if (scope) {
        context += `**Scope:** ${scope}\n\n`;
      }
      
      if (existing) {
        context += `**Current State:** ${existing}\n\n`;
      }
      
      context += 'System goals:\n';
      context += '- Consistency (looks & behaves same way)\n';
      context += '- Efficiency (reuse, don\'t rebuild)\n';
      context += '- Quality (accessible, performant)\n';
      context += '- Maintainability (update once, applies everywhere)\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const priority = responses[2]?.trim() || '';
      const governance = responses[3]?.trim() || '';
      
      let request = 'Build design system:\n\n';
      
      request += '**1. Foundation Layer**\n';
      request += 'Design tokens (single source of truth):\n\n';
      
      request += 'Colors:\n';
      request += '```json\n';
      request += '{\n';
      request += '  "color": {\n';
      request += '    "primary": { "500": "#0066FF" },\n';
      request += '    "neutral": {\n';
      request += '      "50": "#F8FAFC",\n';
      request += '      "500": "#64748B",\n';
      request += '      "900": "#0F172A"\n';
      request += '    }\n';
      request += '  }\n';
      request += '}\n';
      request += '```\n\n';
      
      request += 'Spacing:\n';
      request += '```json\n';
      request += '{\n';
      request += '  "spacing": {\n';
      request += '    "xs": "4px",\n';
      request += '    "sm": "8px",\n';
      request += '    "md": "16px",\n';
      request += '    "lg": "24px",\n';
      request += '    "xl": "32px"\n';
      request += '  }\n';
      request += '}\n';
      request += '```\n\n';
      
      if (priority) {
        request += `**2. Priority Components:** ${priority}\n\n`;
      }
      
      request += 'Start with foundations:\n';
      request += '- Button (primary, secondary, ghost, icon)\n';
      request += '- Input (text, number, select, checkbox, radio)\n';
      request += '- Card (container for content)\n';
      request += '- Typography (heading, body, caption)\n';
      request += '- Feedback (alert, toast, modal)\n\n';
      
      request += '**3. Component API Design**\n';
      request += 'Consistent interface:\n';
      request += '```tsx\n';
      request += '<Button\n';
      request += '  variant="primary"        // visual style\n';
      request += '  size="medium"            // scale\n';
      request += '  disabled={false}         // state\n';
      request += '  loading={false}          // async state\n';
      request += '  onClick={handleClick}    // interaction\n';
      request += '>\n';
      request += '  Label\n';
      request += '</Button>\n';
      request += '```\n\n';
      
      request += 'Principles:\n';
      request += '- Sensible defaults (works without props)\n';
      request += '- Predictable naming (variant, size, state)\n';
      request += '- Composable (can nest/combine)\n';
      request += '- Accessible (ARIA, keyboard, screen reader)\n\n';
      
      request += '**4. Documentation**\n';
      request += 'For each component:\n';
      request += '- Usage guidelines (when to use)\n';
      request += '- Anatomy (parts labeled)\n';
      request += '- Props API (all options)\n';
      request += '- Code examples (common patterns)\n';
      request += '- Do\'s and don\'ts (visual examples)\n';
      request += '- Accessibility notes\n\n';
      
      if (governance) {
        request += `**5. Governance:** ${governance}\n\n`;
      }
      
      request += 'Process:\n';
      request += '- Proposal (why add new component?)\n';
      request += '- Review (is it reusable? fits system?)\n';
      request += '- Build (implement with full states)\n';
      request += '- Document (usage + examples)\n';
      request += '- Announce (communicate to teams)\n\n';
      
      request += 'Version control:\n';
      request += '- Semantic versioning (1.2.3)\n';
      request += '- Changelog (what changed)\n';
      request += '- Migration guides (breaking changes)\n';
      request += '- Deprecation warnings (give time)\n\n';
      
      request += '**6. Adoption Strategy**\n';
      request += 'Phase 1 - Prove value:\n';
      request += '- Start with 1-2 high-impact components\n';
      request += '- Use in pilot project\n';
      request += '- Gather feedback, iterate\n\n';
      
      request += 'Phase 2 - Expand:\n';
      request += '- Add more components\n';
      request += '- Document thoroughly\n';
      request += '- Migrate existing projects gradually\n\n';
      
      request += 'Phase 3 - Enforce:\n';
      request += '- Make system the default\n';
      request += '- Review process for new patterns\n';
      request += '- Regular maintenance\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Design tokens defined (colors, spacing, typography)',
        'Core components documented',
        'Component API is consistent',
        'All components are accessible',
        'Documentation includes examples',
        'Governance process clear',
        'Version control strategy exists',
        'Adoption plan is realistic'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN CRITIQUE - Structured design review
  // ═══════════════════════════════════════════════════════════════════════════
  
  designcritique: {
    generateContext: (responses) => {
      const what = responses[0]?.trim() || '';
      const goals = responses[1]?.trim() || '';
      const concerns = responses[2]?.trim() || '';
      
      let context = '**DESIGN CRITIQUE**\n\n';
      
      if (what) {
        context += `**Design:** ${what}\n\n`;
      }
      
      if (goals) {
        context += `**Goals:** ${goals}\n\n`;
      }
      
      if (concerns) {
        context += `**Specific Concerns:** ${concerns}\n\n`;
      }
      
      context += 'Critique framework:\n';
      context += '- Does it solve the user problem?\n';
      context += '- Is it usable (clear, learnable)?\n';
      context += '- Is it accessible?\n';
      context += '- Does it fit the system?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const focus = responses[3]?.trim() || '';
      
      let request = 'Structured design review:\n\n';
      
      request += '**1. User Experience**\n';
      request += 'Effectiveness:\n';
      request += '- Can user accomplish their goal?\n';
      request += '- Is the path clear?\n';
      request += '- Any confusion points?\n';
      request += '- Missing information?\n\n';
      
      request += 'Efficiency:\n';
      request += '- Minimum steps to success?\n';
      request += '- Any unnecessary friction?\n';
      request += '- Cognitive load manageable?\n\n';
      
      request += '**2. Visual Design**\n';
      request += 'Hierarchy:\n';
      request += '- Is the most important thing most prominent?\n';
      request += '- Clear visual progression?\n';
      request += '- Too much competing for attention?\n\n';
      
      request += 'Consistency:\n';
      request += '- Matches design system?\n';
      request += '- Similar things look similar?\n';
      request += '- Different things look different?\n\n';
      
      request += 'Polish:\n';
      request += '- Proper spacing (not too tight/loose)\n';
      request += '- Alignment (elements line up)\n';
      request += '- Color contrast sufficient\n';
      request += '- Typography readable\n\n';
      
      request += '**3. Interaction Design**\n';
      request += 'Affordances:\n';
      request += '- Clear what\'s clickable?\n';
      request += '- Buttons look like buttons?\n';
      request += '- Expected behavior obvious?\n\n';
      
      request += 'Feedback:\n';
      request += '- Every action has response?\n';
      request += '- Loading states clear?\n';
      request += '- Error messages helpful?\n';
      request += '- Success confirmation?\n\n';
      
      request += '**4. Accessibility**\n';
      request += 'Quick checks:\n';
      request += '- Color contrast passes WCAG AA?\n';
      request += '- Works with keyboard only?\n';
      request += '- Touch targets 44px minimum?\n';
      request += '- Clear focus indicators?\n';
      request += '- Semantic HTML used?\n\n';
      
      if (focus) {
        request += `**5. Deep Dive:** ${focus}\n`;
        request += 'Detailed analysis of specific area\n\n';
      }
      
      request += '**6. What Works Well**\n';
      request += 'Highlight strengths:\n';
      request += '- What should be kept/expanded?\n';
      request += '- What sets good precedent?\n';
      request += '- What demonstrates system thinking?\n\n';
      
      request += '**7. Improvement Priorities**\n';
      request += 'Critical (must fix):\n';
      request += '- Blocks user from completing task\n';
      request += '- Accessibility barrier\n';
      request += '- Data loss risk\n\n';
      
      request += 'Important (should fix):\n';
      request += '- Confusing UX\n';
      request += '- Visual inconsistency\n';
      request += '- Missing feedback\n\n';
      
      request += 'Nice to have (consider):\n';
      request += '- Polish improvements\n';
      request += '- Edge case handling\n';
      request += '- Future enhancements\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'User can complete primary task',
        'Visual hierarchy is clear',
        'Interactive elements are obvious',
        'Feedback is immediate and helpful',
        'Meets accessibility standards',
        'Consistent with design system',
        'Issues prioritized by severity'
      ];
    }
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // RESEARCH - Systematic information gathering and synthesis
  // ═══════════════════════════════════════════════════════════════════════════
  
  research: {
    generateContext: (responses) => {
      const question = responses[0]?.trim() || '';
      const why = responses[1]?.trim() || '';
      const knownAlready = responses[2]?.trim() || '';
      
      let context = 'Research project:\n\n';
      
      if (question) {
        context += `**Question:** ${question}\n\n`;
      }
      
      if (why) {
        context += `**Purpose:** ${why}\n\n`;
      }
      
      if (knownAlready) {
        context += `**Already Know:** ${knownAlready}\n\n`;
      }
      
      context += 'Before researching:\n';
      context += '- Is the question answerable?\n';
      context += '- What would constitute good evidence?\n';
      context += '- What are we NOT trying to find out?\n';
      context += '- How will we use this information?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const depth = responses[3]?.trim() || '';
      const sources = responses[4]?.trim() || '';
      
      let request = 'Research systematically:\n\n';
      
      request += '**1. Question Clarification**\n';
      request += 'Break down the question:\n';
      request += '- What are we really asking?\n';
      request += '- What assumptions are baked in?\n';
      request += '- Are there sub-questions?\n';
      request += '- What scope (time period, geography, domain)?\n\n';
      
      request += '**2. Source Strategy**\n';
      if (sources) {
        request += `Starting with: ${sources}\n\n`;
      }
      
      request += 'Source hierarchy:\n';
      request += '```\n';
      request += 'Tier 1 - Primary:\n';
      request += '  • Original research (papers, studies)\n';
      request += '  • Official documentation\n';
      request += '  • Direct data (government, company reports)\n';
      request += '  • Expert interviews\n\n';
      
      request += 'Tier 2 - Secondary:\n';
      request += '  • Meta-analyses, reviews\n';
      request += '  • Quality journalism (NYT, WSJ, Economist)\n';
      request += '  • Industry reports\n';
      request += '  • Academic books\n\n';
      
      request += 'Tier 3 - Tertiary:\n';
      request += '  • Wikipedia (starting point only)\n';
      request += '  • Blogs (with source verification)\n';
      request += '  • Social media (signal, not truth)\n';
      request += '```\n\n';
      
      request += '**3. Source Evaluation**\n';
      request += 'For each source, check:\n\n';
      
      request += 'Authority:\n';
      request += '- Who wrote it? What\'s their expertise?\n';
      request += '- Are they affiliated? (bias check)\n';
      request += '- Do others cite them?\n\n';
      
      request += 'Accuracy:\n';
      request += '- Do they cite sources?\n';
      request += '- Can claims be verified?\n';
      request += '- Do facts check out?\n\n';
      
      request += 'Currency:\n';
      request += '- When was it published?\n';
      request += '- Is information still relevant?\n';
      request += '- Any updates since?\n\n';
      
      request += 'Purpose:\n';
      request += '- Inform, persuade, or sell?\n';
      request += '- Who funded it?\n';
      request += '- What\'s left out?\n\n';
      
      if (depth) {
        request += `**4. Depth Strategy:** ${depth}\n\n`;
      }
      
      request += 'Research depth:\n';
      request += '```\n';
      request += 'Quick scan (30 min):\n';
      request += '  → 3-5 quality sources\n';
      request += '  → Get basic understanding\n';
      request += '  → Identify key terms/concepts\n\n';
      
      request += 'Medium depth (2-4 hours):\n';
      request += '  → 10-15 sources\n';
      request += '  → Follow citation trails\n';
      request += '  → Compare perspectives\n';
      request += '  → Note contradictions\n\n';
      
      request += 'Deep dive (days):\n';
      request += '  → 20+ sources\n';
      request += '  → Primary sources prioritized\n';
      request += '  → Expert consultation\n';
      request += '  → Build evidence map\n';
      request += '```\n\n';
      
      request += '**5. Note-Taking System**\n';
      request += 'Capture:\n';
      request += '```\n';
      request += 'Source: [Author, Title, Year, URL]\n';
      request += 'Key finding: [Direct quote or paraphrase]\n';
      request += 'My note: [Interpretation, connection, question]\n';
      request += 'Credibility: [Why trust this? Any concerns?]\n';
      request += '```\n\n';
      
      request += '**6. Synthesis**\n';
      request += 'Connect findings:\n';
      request += '- What patterns emerge?\n';
      request += '- Where do sources agree?\n';
      request += '- Where do they conflict?\n';
      request += '- What\'s missing from all sources?\n';
      request += '- What surprised you?\n\n';
      
      request += 'Create framework:\n';
      request += '- Group by theme\n';
      request += '- Chronological timeline\n';
      request += '- Pro/con structure\n';
      request += '- Causal relationships\n\n';
      
      request += '**7. Critical Analysis**\n';
      request += 'Question everything:\n';
      request += '- Correlation vs causation?\n';
      request += '- Sample size adequate?\n';
      request += '- Conflicts of interest?\n';
      request += '- Cherry-picked evidence?\n';
      request += '- Logical fallacies?\n\n';
      
      request += '**8. Documentation**\n';
      request += 'Citation format:\n';
      request += '```\n';
      request += 'Academic: Author (Year). Title. Journal/Source.\n';
      request += 'Web: Author/Org. "Title." Site. Date. URL.\n';
      request += '```\n\n';
      
      request += 'Track:\n';
      request += '- All sources consulted\n';
      request += '- When accessed\n';
      request += '- Key quotes with page numbers\n';
      request += '- Your synthesis and conclusions\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('Question is specific and answerable');
      checkpoints.push('Multiple source types consulted');
      checkpoints.push('Sources evaluated for credibility');
      checkpoints.push('Findings synthesized (patterns identified)');
      
      const depth = responses[3]?.toLowerCase() || '';
      if (depth.includes('deep') || depth.includes('thorough') || depth.includes('comprehensive')) {
        checkpoints.push('Primary sources prioritized');
        checkpoints.push('Contradictions investigated');
      }
      
      checkpoints.push('All sources properly cited');
      checkpoints.push('Conclusions supported by evidence');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // USER RESEARCH - Qualitative and quantitative user insights
  // ═══════════════════════════════════════════════════════════════════════════
  
  userresearch: {
    generateContext: (responses) => {
      const goal = responses[0]?.trim() || '';
      const decisions = responses[1]?.trim() || '';
      const users = responses[2]?.trim() || '';
      
      let context = '**USER RESEARCH**\n\n';
      
      if (goal) {
        context += `**Research Goal:** ${goal}\n\n`;
      }
      
      if (decisions) {
        context += `**Decisions to Make:** ${decisions}\n\n`;
      }
      
      if (users) {
        context += `**Target Users:** ${users}\n\n`;
      }
      
      context += 'Before starting:\n';
      context += '- What do we need to learn?\n';
      context += '- What would change our mind?\n';
      context += '- What are we assuming?\n';
      context += '- How will we use the findings?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const approach = responses[3]?.trim() || '';
      const constraints = responses[4]?.trim() || '';
      
      let request = 'Design user research:\n\n';
      
      request += '**1. Method Selection**\n';
      if (approach) {
        request += `Considering: ${approach}\n\n`;
      }
      
      request += 'Choose method by goal:\n';
      request += '```\n';
      request += 'Exploratory (understand problem):\n';
      request += '  → User interviews (1-on-1)\n';
      request += '  → Contextual inquiry (observe in environment)\n';
      request += '  → Diary studies (track over time)\n\n';
      
      request += 'Evaluative (test solution):\n';
      request += '  → Usability testing (task-based)\n';
      request += '  → A/B testing (quantitative)\n';
      request += '  → Think-aloud protocol\n\n';
      
      request += 'Generative (discover opportunities):\n';
      request += '  → Participatory design workshops\n';
      request += '  → Focus groups (group dynamics)\n';
      request += '  → Card sorting (information architecture)\n';
      request += '```\n\n';
      
      if (constraints) {
        request += `**2. Constraints:** ${constraints}\n\n`;
      }
      
      request += 'Resource planning:\n';
      request += '- Time: 5 interviews = ~10 hours (prep + conduct + analysis)\n';
      request += '- Budget: Recruit participants ($50-100 incentive)\n';
      request += '- People: Need 2 (facilitator + note-taker)\n\n';
      
      request += '**3. Participant Recruitment**\n';
      request += 'Sample size:\n';
      request += '- Qualitative: 5-8 users per segment (80% of issues)\n';
      request += '- Quantitative: 30+ for statistical validity\n\n';
      
      request += 'Screening criteria:\n';
      request += '```\n';
      request += 'Must have:\n';
      request += '  • [Key characteristic]\n';
      request += '  • [Required behavior]\n';
      request += '  • [Specific context]\n\n';
      
      request += 'Exclude:\n';
      request += '  • Industry insiders (biased)\n';
      request += '  • Previous participants (fresh perspective)\n';
      request += '  • Friends/family (too accommodating)\n';
      request += '```\n\n';
      
      request += '**4. Interview Guide**\n';
      request += 'Structure:\n';
      request += '```\n';
      request += 'Introduction (5 min):\n';
      request += '  • Build rapport\n';
      request += '  • Explain purpose\n';
      request += '  • Get consent\n\n';
      
      request += 'Background (10 min):\n';
      request += '  • Their role/context\n';
      request += '  • Current process\n';
      request += '  • Pain points\n\n';
      
      request += 'Deep dive (30 min):\n';
      request += '  • Tell me about a time when...\n';
      request += '  • Walk me through...\n';
      request += '  • What happens when...\n';
      request += '  • Follow-up: Why? Can you say more?\n\n';
      
      request += 'Wrap-up (5 min):\n';
      request += '  • Anything we missed?\n';
      request += '  • Questions for us?\n';
      request += '  • Thank you\n';
      request += '```\n\n';
      
      request += 'Good questions:\n';
      request += '- Open-ended ("Tell me about...")\n';
      request += '- Specific ("Last time you did X...")\n';
      request += '- Neutral (no leading)\n\n';
      
      request += 'Bad questions:\n';
      request += '- ❌ "Would you like feature X?" (hypothetical)\n';
      request += '- ❌ "Don\'t you think Y is better?" (leading)\n';
      request += '- ❌ "Why don\'t you just Z?" (judgmental)\n\n';
      
      request += '**5. Analysis Framework**\n';
      request += 'Affinity mapping:\n';
      request += '```\n';
      request += '1. Write each finding on sticky note\n';
      request += '2. Group similar findings\n';
      request += '3. Name each group (theme)\n';
      request += '4. Look for patterns across themes\n';
      request += '5. Prioritize by frequency + impact\n';
      request += '```\n\n';
      
      request += 'Personas (if needed):\n';
      request += '```\n';
      request += 'Name: [Archetypal user]\n';
      request += 'Role: [Their context]\n';
      request += 'Goals: [What they want to accomplish]\n';
      request += 'Frustrations: [Current pain points]\n';
      request += 'Behaviors: [How they work now]\n';
      request += 'Quote: [Memorable thing they said]\n';
      request += '```\n\n';
      
      request += '**6. Insights Report**\n';
      request += 'Structure findings:\n';
      request += '- Executive summary (3 key insights)\n';
      request += '- Methodology (who, when, how)\n';
      request += '- Detailed findings (with quotes)\n';
      request += '- Recommendations (prioritized)\n';
      request += '- Appendix (raw data)\n\n';
      
      request += 'Good insight:\n';
      request += '✓ "5/8 users struggled with [specific task] because [reason]"\n';
      request += '✓ "Users expect [behavior] based on [mental model]"\n\n';
      
      request += 'Bad insight:\n';
      request += '❌ "Users want the product to be easy to use" (generic)\n';
      request += '❌ "One user said X" (anecdotal)\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Research method matches goal',
        'Participants represent target users',
        'Sample size adequate',
        'Interview guide is neutral (not leading)',
        'Findings are synthesized (themes identified)',
        'Insights are specific and actionable',
        'Recommendations are prioritized',
        'Results documented for future reference'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // COMPETITIVE ANALYSIS - Strategic market understanding
  // ═══════════════════════════════════════════════════════════════════════════
  
  competitive: {
    generateContext: (responses) => {
      const market = responses[0]?.trim() || '';
      const purpose = responses[1]?.trim() || '';
      
      let context = '**COMPETITIVE ANALYSIS**\n\n';
      
      if (market) {
        context += `**Market:** ${market}\n\n`;
      }
      
      if (purpose) {
        context += `**Purpose:** ${purpose}\n\n`;
      }
      
      context += 'Frame the analysis:\n';
      context += '- Who are we competing with?\n';
      context += '- For what customers?\n';
      context += '- On what dimensions?\n';
      context += '- What decisions will this inform?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const competitors = responses[2]?.trim() || '';
      const criteria = responses[3]?.trim() || '';
      
      let request = 'Analyze competition:\n\n';
      
      request += '**1. Identify Competitors**\n';
      if (competitors) {
        request += `Known competitors: ${competitors}\n\n`;
      }
      
      request += 'Three types:\n';
      request += '```\n';
      request += 'Direct:\n';
      request += '  Same solution, same market\n';
      request += '  (Your closest substitutes)\n\n';
      
      request += 'Indirect:\n';
      request += '  Different solution, same need\n';
      request += '  (Alternative approaches)\n\n';
      
      request += 'Aspirational:\n';
      request += '  Not competing yet, but could\n';
      request += '  (Future threats)\n';
      request += '```\n\n';
      
      request += 'Discovery:\n';
      request += '- Google: "[problem] solution"\n';
      request += '- Product Hunt, AppSumo\n';
      request += '- Industry reports (Gartner, Forrester)\n';
      request += '- Customer interviews ("What else did you consider?")\n\n';
      
      if (criteria) {
        request += `**2. Evaluation Criteria:** ${criteria}\n\n`;
      }
      
      request += 'Compare on:\n';
      request += '```\n';
      request += 'Product:\n';
      request += '  • Core features\n';
      request += '  • Unique capabilities\n';
      request += '  • User experience quality\n';
      request += '  • Technical architecture\n\n';
      
      request += 'Market:\n';
      request += '  • Target customer\n';
      request += '  • Pricing model\n';
      request += '  • Market share\n';
      request += '  • Growth trajectory\n\n';
      
      request += 'Business:\n';
      request += '  • Funding/revenue\n';
      request += '  • Team size\n';
      request += '  • Strategic focus\n';
      request += '  • Defensibility\n';
      request += '```\n\n';
      
      request += '**3. Analysis Framework**\n';
      request += 'Feature comparison matrix:\n';
      request += '```\n';
      request += '| Feature       | Us | A | B | C |\n';
      request += '|---------------|----|----|----| ---|\n';
      request += '| Core 1        | ✓  | ✓  | ✗  | ✓  |\n';
      request += '| Core 2        | ✓  | ✗  | ✓  | ✓  |\n';
      request += '| Differentiator| ✓✓ | ✗  | ✗  | ✗  |\n';
      request += '```\n\n';
      
      request += 'Positioning map:\n';
      request += '```\n';
      request += '     Expensive\n';
      request += '         ↑\n';
      request += '  Simple │ Complex\n';
      request += '    ←────┼────→\n';
      request += '         │\n';
      request += '         ↓\n';
      request += '     Affordable\n';
      request += '```\n\n';
      
      request += '**4. SWOT Analysis**\n';
      request += 'For each major competitor:\n';
      request += '```\n';
      request += 'Strengths:\n';
      request += '  • What do they do well?\n';
      request += '  • Why do customers choose them?\n\n';
      
      request += 'Weaknesses:\n';
      request += '  • Where do they fall short?\n';
      request += '  • What complaints exist?\n\n';
      
      request += 'Opportunities:\n';
      request += '  • Where are they likely to expand?\n';
      request += '  • What trends favor them?\n\n';
      
      request += 'Threats:\n';
      request += '  • What could hurt their business?\n';
      request += '  • Where are they vulnerable?\n';
      request += '```\n\n';
      
      request += '**5. Strategic Insights**\n';
      request += 'Identify:\n';
      request += '- White space (underserved segments)\n';
      request += '- Common weaknesses (everyone struggles with X)\n';
      request += '- Emerging patterns (everyone moving toward Y)\n';
      request += '- Defensive moats (hard to replicate features)\n\n';
      
      request += 'Questions to answer:\n';
      request += '- What can we do that others can\'t?\n';
      request += '- Where should we NOT compete?\n';
      request += '- What will matter in 2 years?\n';
      request += '- How do we defend our position?\n\n';
      
      request += '**6. Ongoing Monitoring**\n';
      request += 'Track over time:\n';
      request += '- Product launches\n';
      request += '- Pricing changes\n';
      request += '- Funding announcements\n';
      request += '- Customer reviews\n';
      request += '- Job postings (hiring signals)\n\n';
      
      request += 'Tools:\n';
      request += '- Google Alerts\n';
      request += '- Crunchbase (funding)\n';
      request += '- SimilarWeb (traffic)\n';
      request += '- G2/Capterra (reviews)\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'All competitor types identified (direct, indirect, aspirational)',
        'Evaluation criteria defined',
        'Feature comparison complete',
        'Positioning map created',
        'SWOT for major competitors',
        'Strategic gaps identified',
        'Defensibility analyzed',
        'Monitoring plan established'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // DATA ANALYSIS - Rigorous quantitative analysis
  // ═══════════════════════════════════════════════════════════════════════════
  
  dataanalysis: {
    generateContext: (responses) => {
      const question = responses[0]?.trim() || '';
      const data = responses[1]?.trim() || '';
      
      let context = '**DATA ANALYSIS**\n\n';
      
      if (question) {
        context += `**Question:** ${question}\n\n`;
      }
      
      if (data) {
        context += `**Data Available:** ${data}\n\n`;
      }
      
      context += 'Before analyzing:\n';
      context += '- Is the data quality sufficient?\n';
      context += '- What biases might exist?\n';
      context += '- What would constitute strong evidence?\n';
      context += '- Can correlation actually imply causation here?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const approach = responses[2]?.trim() || '';
      const present = responses[3]?.trim() || '';
      
      let request = 'Analyze data rigorously:\n\n';
      
      request += '**1. Data Quality Check**\n';
      request += 'Before analysis:\n';
      request += '```python\n';
      request += '# Check for issues\n';
      request += 'df.info()              # Types, nulls\n';
      request += 'df.describe()          # Distributions\n';
      request += 'df.isnull().sum()      # Missing data\n';
      request += 'df.duplicated().sum()  # Duplicates\n';
      request += '```\n\n';
      
      request += 'Common problems:\n';
      request += '- Missing values (how much? why?)\n';
      request += '- Outliers (errors or real?)\n';
      request += '- Inconsistent formats\n';
      request += '- Sample bias (who\'s missing?)\n\n';
      
      if (approach) {
        request += `**2. Analysis Approach:** ${approach}\n\n`;
      }
      
      request += 'Descriptive statistics:\n';
      request += '```python\n';
      request += '# Central tendency\n';
      request += 'mean = df["metric"].mean()\n';
      request += 'median = df["metric"].median()\n';
      request += '# Spread\n';
      request += 'std = df["metric"].std()\n';
      request += '# Distribution\n';
      request += 'df["metric"].hist()\n';
      request += '```\n\n';
      
      request += '**3. Exploratory Analysis**\n';
      request += 'Look for patterns:\n';
      request += '```python\n';
      request += '# Correlations\n';
      request += 'df.corr()\n\n';
      
      request += '# Group comparisons\n';
      request += 'df.groupby("category")["metric"].mean()\n\n';
      
      request += '# Time trends\n';
      request += 'df.set_index("date")["metric"].plot()\n';
      request += '```\n\n';
      
      request += '**4. Statistical Testing**\n';
      request += 'Test significance:\n';
      request += '```python\n';
      request += '# A/B test (two groups)\n';
      request += 'from scipy.stats import ttest_ind\n';
      request += 't_stat, p_value = ttest_ind(group_a, group_b)\n';
      request += '# p < 0.05 → statistically significant\n\n';
      
      request += '# Chi-square (categorical)\n';
      request += 'from scipy.stats import chi2_contingency\n';
      request += 'chi2, p_value, dof, expected = chi2_contingency(table)\n';
      request += '```\n\n';
      
      request += 'Interpret p-values:\n';
      request += '- p < 0.05: Statistically significant\n';
      request += '- p > 0.05: Could be random chance\n';
      request += '- But: statistical ≠ practical significance\n\n';
      
      request += '**5. Avoid Common Errors**\n';
      request += 'Correlation ≠ Causation:\n';
      request += '```\n';
      request += '❌ "A correlates with B, so A causes B"\n';
      request += '✓  "A and B co-occur. Possible:\n';
      request += '    • A causes B\n';
      request += '    • B causes A\n';
      request += '    • C causes both\n';
      request += '    • Coincidence"\n';
      request += '```\n\n';
      
      request += 'Simpson\'s Paradox:\n';
      request += '- Trend reverses when data is segmented\n';
      request += '- Always check subgroups\n\n';
      
      request += 'Selection Bias:\n';
      request += '- Is your sample representative?\n';
      request += '- Who\'s missing from the data?\n\n';
      
      request += 'Cherry-picking:\n';
      request += '- Don\'t ignore inconvenient data\n';
      request += '- Pre-register hypotheses\n\n';
      
      if (present) {
        request += `**6. Presentation Strategy:** ${present}\n\n`;
      }
      
      request += 'Visualize effectively:\n';
      request += '```\n';
      request += 'Comparison → Bar chart\n';
      request += 'Trend → Line chart\n';
      request += 'Distribution → Histogram\n';
      request += 'Relationship → Scatter plot\n';
      request += 'Part-of-whole → Pie chart (if <5 parts)\n';
      request += '```\n\n';
      
      request += 'Chart principles:\n';
      request += '- Start y-axis at zero (bar charts)\n';
      request += '- Label axes clearly\n';
      request += '- Remove chartjunk\n';
      request += '- Use color meaningfully\n';
      request += '- Add context (benchmarks, goals)\n\n';
      
      request += '**7. Report Findings**\n';
      request += 'Structure:\n';
      request += '```\n';
      request += '1. Question\n';
      request += '2. Method (data source, approach)\n';
      request += '3. Key findings (3-5 main points)\n';
      request += '4. Limitations (what this doesn\'t tell us)\n';
      request += '5. Recommendations (so what?)\n';
      request += '```\n\n';
      
      request += 'Be honest:\n';
      request += '- State confidence level\n';
      request += '- Acknowledge limitations\n';
      request += '- Note alternative interpretations\n';
      request += '- Don\'t oversell certainty\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Data quality checked (nulls, outliers, bias)',
        'Appropriate statistical methods used',
        'Significance tested (not just eyeballed)',
        'Correlation vs causation considered',
        'Sample bias acknowledged',
        'Visualizations are clear and honest',
        'Limitations stated explicitly',
        'Findings support recommendations'
      ];
    }
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // IDEATION - Structured creative exploration
  // ═══════════════════════════════════════════════════════════════════════════
  
  ideation: {
    generateContext: (responses) => {
      const challenge = responses[0]?.trim() || '';
      const constraints = responses[1]?.trim() || '';
      const explored = responses[2]?.trim() || '';
      
      let context = 'Creative challenge:\n\n';
      
      if (challenge) {
        context += `**Challenge:** ${challenge}\n\n`;
      }
      
      if (constraints) {
        context += `**Constraints:** ${constraints}\n\n`;
      }
      
      if (explored) {
        context += `**Already Tried:** ${explored}\n\n`;
      }
      
      context += 'Reframe the problem:\n';
      context += '- What are we really solving for?\n';
      context += '- What if the constraints changed?\n';
      context += '- Who else has solved similar problems?\n';
      context += '- What would the opposite approach be?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const direction = responses[3]?.trim() || '';
      const combine = responses[4]?.trim() || '';
      
      let request = 'Generate ideas systematically:\n\n';
      
      request += '**1. Divergent Thinking (Quantity)**\n';
      request += 'Goal: 20+ ideas in 20 minutes\n\n';
      
      request += 'Rules:\n';
      request += '- No judgment (defer evaluation)\n';
      request += '- Wild ideas welcome\n';
      request += '- Build on others\n';
      request += '- Stay visual (sketch quickly)\n\n';
      
      if (direction) {
        request += `**2. Exploration Direction:** ${direction}\n\n`;
      }
      
      request += 'SCAMPER framework:\n';
      request += '```\n';
      request += 'Substitute: Replace X with Y?\n';
      request += '  "What if we used [material/approach] instead?"\n\n';
      
      request += 'Combine: Merge two things?\n';
      request += '  "What if we merged [A] and [B]?"\n\n';
      
      request += 'Adapt: Borrow from elsewhere?\n';
      request += '  "How does [other industry] solve this?"\n\n';
      
      request += 'Modify: Change attribute?\n';
      request += '  "What if we made it [bigger/faster/simpler]?"\n\n';
      
      request += 'Put to other use: Repurpose?\n';
      request += '  "Could this solve [different problem]?"\n\n';
      
      request += 'Eliminate: Remove component?\n';
      request += '  "What if we removed [feature/step]?"\n\n';
      
      request += 'Reverse: Flip assumption?\n';
      request += '  "What if we did the opposite?"\n';
      request += '```\n\n';
      
      request += '**3. Lateral Thinking**\n';
      request += 'Break assumptions:\n';
      request += '```\n';
      request += 'List assumptions:\n';
      request += '  1. [Assumption about users]\n';
      request += '  2. [Assumption about constraints]\n';
      request += '  3. [Assumption about solution]\n\n';
      
      request += 'Challenge each:\n';
      request += '  "What if [assumption] wasn\'t true?"\n';
      request += '  "When would [assumption] not apply?"\n';
      request += '```\n\n';
      
      request += 'Random input:\n';
      request += '- Pick random word/image\n';
      request += '- Force connection to problem\n';
      request += '- "How could [random thing] inspire solution?"\n\n';
      
      if (combine) {
        request += `**4. Combination Strategy:** ${combine}\n\n`;
      }
      
      request += 'Morphological analysis:\n';
      request += '```\n';
      request += 'Break into attributes:\n';
      request += '  Attribute 1: [Option A, B, C]\n';
      request += '  Attribute 2: [Option X, Y, Z]\n';
      request += '  Attribute 3: [Option 1, 2, 3]\n\n';
      
      request += 'Mix & match:\n';
      request += '  Combination: A + Y + 2\n';
      request += '  Combination: C + X + 1\n';
      request += '  (27 combinations from above)\n';
      request += '```\n\n';
      
      request += '**5. Analogical Thinking**\n';
      request += 'Find inspiration:\n';
      request += '```\n';
      request += 'How does nature solve this?\n';
      request += '  (Biomimicry)\n\n';
      
      request += 'How do other industries handle it?\n';
      request += '  "Aviation safety → software deployment"\n';
      request += '  "Restaurant reservations → appointment booking"\n\n';
      
      request += 'How do adjacent problems get solved?\n';
      request += '  "Similar constraints, different domain"\n';
      request += '```\n\n';
      
      request += '**6. Convergent Thinking (Select)**\n';
      request += 'Cluster ideas:\n';
      request += '```\n';
      request += '1. Write each idea on sticky note\n';
      request += '2. Group similar approaches\n';
      request += '3. Name each cluster\n';
      request += '4. Identify most promising\n';
      request += '```\n\n';
      
      request += 'Evaluation criteria:\n';
      request += '```\n';
      request += 'Impact:    High / Medium / Low\n';
      request += 'Feasibility: High / Medium / Low\n';
      request += 'Novelty:   High / Medium / Low\n\n';
      
      request += 'Sweet spot: High impact + High feasibility\n';
      request += 'Moonshot: High impact + Low feasibility\n';
      request += 'Quick win: Medium impact + High feasibility\n';
      request += '```\n\n';
      
      request += '**7. Develop Best Ideas**\n';
      request += 'Take top 3-5 ideas:\n';
      request += '```\n';
      request += 'For each:\n';
      request += '  • Sketch it out (visual)\n';
      request += '  • Explain core mechanism\n';
      request += '  • List what\'s needed\n';
      request += '  • Identify biggest risk\n';
      request += '  • Plan quick prototype\n';
      request += '```\n\n';
      
      request += '**8. Kill Your Darlings**\n';
      request += 'Be brutally honest:\n';
      request += '- Does this actually solve the problem?\n';
      request += '- Would real users value this?\n';
      request += '- Can we actually build it?\n';
      request += '- Is timing right?\n';
      request += '- What would make us NOT do this?\n\n';
      
      request += '**9. Prototype & Test**\n';
      request += 'Validate quickly:\n';
      request += '```\n';
      request += 'Paper prototype (1 hour):\n';
      request += '  → Test core interaction\n\n';
      
      request += 'Clickable mockup (1 day):\n';
      request += '  → Test full flow\n\n';
      
      request += 'Wizard of Oz (1 week):\n';
      request += '  → Test with manual backend\n\n';
      
      request += 'Working prototype (1 month):\n';
      request += '  → Test technical feasibility\n';
      request += '```\n\n';
      
      request += 'Learn fast:\n';
      request += '- What works?\n';
      request += '- What doesn\'t?\n';
      request += '- What surprised you?\n';
      request += '- What\'s the next iteration?\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('Generated 15+ diverse ideas');
      checkpoints.push('Challenged core assumptions');
      
      const explored = responses[2]?.toLowerCase() || '';
      if (explored.includes('stuck') || explored.includes('same')) {
        checkpoints.push('Explored ideas outside usual patterns');
      }
      
      checkpoints.push('Ideas clustered and evaluated');
      checkpoints.push('Top ideas developed with detail');
      checkpoints.push('Feasibility honestly assessed');
      checkpoints.push('Prototype plan exists for validation');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CREATIVE PROJECT - Structured creative development
  // ═══════════════════════════════════════════════════════════════════════════
  
  creative: {
    generateContext: (responses) => {
      const project = responses[0]?.trim() || '';
      const audience = responses[1]?.trim() || '';
      const mood = responses[2]?.trim() || '';
      
      let context = '**CREATIVE PROJECT**\n\n';
      
      if (project) {
        context += `**Project:** ${project}\n\n`;
      }
      
      if (audience) {
        context += `**Audience:** ${audience}\n\n`;
      }
      
      if (mood) {
        context += `**Desired Feel:** ${mood}\n\n`;
      }
      
      context += 'Define success:\n';
      context += '- What emotion should audience feel?\n';
      context += '- What should they remember?\n';
      context += '- What action should they take?\n';
      context += '- How will we know it worked?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const references = responses[3]?.trim() || '';
      const constraints = responses[4]?.trim() || '';
      const unique = responses[5]?.trim() || '';
      
      let request = 'Develop creative project:\n\n';
      
      request += '**1. Creative Brief**\n';
      request += 'Foundation:\n';
      request += '```\n';
      request += 'Objective: [What this must accomplish]\n';
      request += 'Audience: [Who + their context]\n';
      request += 'Message: [Core idea in one sentence]\n';
      request += 'Tone: [How it should feel]\n';
      request += 'Success: [Measurable outcome]\n';
      request += '```\n\n';
      
      if (references) {
        request += `**2. Inspiration:** ${references}\n\n`;
      }
      
      request += 'Build reference library:\n';
      request += '- Save 10-20 examples\n';
      request += '- Note what you like (specific elements)\n';
      request += '- Identify patterns\n';
      request += '- Find gaps (what\'s missing?)\n\n';
      
      request += 'Analyze references:\n';
      request += '```\n';
      request += 'What works:\n';
      request += '  • [Specific technique]\n';
      request += '  • [Structural approach]\n';
      request += '  • [Emotional beat]\n\n';
      
      request += 'What to avoid:\n';
      request += '  • [Overused pattern]\n';
      request += '  • [Doesn\'t fit audience]\n';
      request += '  • [Too complex/simple]\n';
      request += '```\n\n';
      
      if (constraints) {
        request += `**3. Constraints:** ${constraints}\n\n`;
      }
      
      request += 'Work within limits:\n';
      request += '- Time: [Deadline]\n';
      request += '- Budget: [Resources]\n';
      request += '- Format: [Technical specs]\n';
      request += '- Brand: [Guidelines to follow]\n\n';
      
      request += 'Constraints spark creativity:\n';
      request += '- "What\'s the best we can do with X?"\n';
      request += '- Force prioritization\n';
      request += '- Remove analysis paralysis\n\n';
      
      if (unique) {
        request += `**4. Unique Angle:** ${unique}\n\n`;
      }
      
      request += 'Find the hook:\n';
      request += '```\n';
      request += 'Unexpected combination:\n';
      request += '  "[Familiar thing] meets [surprising thing]"\n\n';
      
      request += 'Fresh perspective:\n';
      request += '  "What if we told it from [unusual viewpoint]?"\n\n';
      
      request += 'Subvert expectation:\n';
      request += '  "Everyone does X, we\'ll do opposite"\n\n';
      
      request += 'Amplify detail:\n';
      request += '  "Zoom way in on [overlooked aspect]"\n';
      request += '```\n\n';
      
      request += '**5. Concept Development**\n';
      request += 'Generate 3-5 concepts:\n';
      request += '```\n';
      request += 'Concept A: [Big idea]\n';
      request += '  Why it works: [Reasoning]\n';
      request += '  Key moments: [Specific beats]\n';
      request += '  Risk: [What could fail]\n\n';
      
      request += 'Concept B: [Alternative approach]\n';
      request += '  Why it works: [Reasoning]\n';
      request += '  Key moments: [Specific beats]\n';
      request += '  Risk: [What could fail]\n';
      request += '```\n\n';
      
      request += 'Rough them out:\n';
      request += '- Sketch quickly\n';
      request += '- Write outline\n';
      request += '- Create mood board\n';
      request += '- Test with someone\n\n';
      
      request += '**6. Execution Plan**\n';
      request += 'Break into phases:\n';
      request += '```\n';
      request += 'Research (10%):\n';
      request += '  → Gather references\n';
      request += '  → Technical tests\n\n';
      
      request += 'Concept (20%):\n';
      request += '  → Develop 3-5 directions\n';
      request += '  → Get feedback\n';
      request += '  → Choose one\n\n';
      
      request += 'Rough draft (30%):\n';
      request += '  → Create structure\n';
      request += '  → Block out content\n';
      request += '  → Test pacing\n\n';
      
      request += 'Polish (30%):\n';
      request += '  → Refine details\n';
      request += '  → Test with audience\n';
      request += '  → Iterate\n\n';
      
      request += 'Finalize (10%):\n';
      request += '  → Technical quality check\n';
      request += '  → Final approvals\n';
      request += '  → Prepare delivery\n';
      request += '```\n\n';
      
      request += '**7. Feedback Integration**\n';
      request += 'Get critique at milestones:\n';
      request += '- Concept stage: "Does this idea work?"\n';
      request += '- Rough draft: "Is structure right?"\n';
      request += '- Near final: "Polish issues only"\n\n';
      
      request += 'Process feedback:\n';
      request += '```\n';
      request += 'Pattern: Multiple people say same thing\n';
      request += '  → Definitely address\n\n';
      
      request += 'Insight: "I didn\'t realize X"\n';
      request += '  → Clarity issue, fix\n\n';
      
      request += 'Preference: "I\'d prefer Y"\n';
      request += '  → Consider but don\'t default change\n\n';
      
      request += 'Confusion: "I don\'t understand Z"\n';
      request += '  → Critical, must fix\n';
      request += '```\n\n';
      
      request += '**8. Craft Quality**\n';
      request += 'Polish checklist:\n';
      request += '- Does opening hook attention?\n';
      request += '- Is pacing right (not too fast/slow)?\n';
      request += '- Are transitions smooth?\n';
      request += '- Does ending resonate?\n';
      request += '- Is every element necessary?\n';
      request += '- Technical quality high?\n';
      request += '- Typos/errors eliminated?\n\n';
      
      request += '**9. Ship & Learn**\n';
      request += 'After launch:\n';
      request += '- Track performance\n';
      request += '- Collect audience reaction\n';
      request += '- Note what worked/didn\'t\n';
      request += '- Apply learnings to next project\n\n';
      
      request += 'Done is better than perfect:\n';
      request += '- Set deadline\n';
      request += '- Ship on time\n';
      request += '- Iterate based on real feedback\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Creative brief is clear',
        'Reference library built (10+ examples)',
        'Multiple concepts developed (3-5)',
        'Unique angle identified',
        'Execution plan with milestones',
        'Feedback collected at key stages',
        'Polish applied to final work',
        'Ready to ship'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NAMING - Strategic naming with validation
  // ═══════════════════════════════════════════════════════════════════════════
  
  naming: {
    generateContext: (responses) => {
      const what = responses[0]?.trim() || '';
      const audience = responses[1]?.trim() || '';
      const feel = responses[2]?.trim() || '';
      
      let context = '**NAMING PROJECT**\n\n';
      
      if (what) {
        context += `**What:** ${what}\n\n`;
      }
      
      if (audience) {
        context += `**Audience:** ${audience}\n\n`;
      }
      
      if (feel) {
        context += `**Desired Feel:** ${feel}\n\n`;
      }
      
      context += 'Name qualities:\n';
      context += '- Memorable (easy to recall)\n';
      context += '- Meaningful (suggests benefit)\n';
      context += '- Distinctive (stands out)\n';
      context += '- Available (domain, trademark)\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const avoid = responses[3]?.trim() || '';
      
      let request = 'Generate and validate names:\n\n';
      
      request += '**1. Naming Approaches**\n\n';
      
      request += 'Descriptive:\n';
      request += '```\n';
      request += 'Says what it does\n';
      request += '  ✓ PayPal, YouTube, FreshBooks\n';
      request += '  • Pro: Immediately clear\n';
      request += '  • Con: Hard to trademark, generic\n';
      request += '```\n\n';
      
      request += 'Invented:\n';
      request += '```\n';
      request += 'Made-up word\n';
      request += '  ✓ Kodak, Xerox, Spotify\n';
      request += '  • Pro: Unique, brandable\n';
      request += '  • Con: Requires explanation\n';
      request += '```\n\n';
      
      request += 'Metaphorical:\n';
      request += '```\n';
      request += 'Evokes quality/feeling\n';
      request += '  ✓ Amazon (vast), Nike (victory), Apple (simple)\n';
      request += '  • Pro: Memorable, emotional\n';
      request += '  • Con: Connection not obvious\n';
      request += '```\n\n';
      
      request += 'Combined:\n';
      request += '```\n';
      request += 'Two words merged\n';
      request += '  ✓ Facebook, Instagram, LinkedIn\n';
      request += '  • Pro: Clear + unique\n';
      request += '  • Con: Longer, harder to say\n';
      request += '```\n\n';
      
      request += 'Abbreviated:\n';
      request += '```\n';
      request += 'Initials or shortened\n';
      request += '  ✓ IBM, HBO, FedEx\n';
      request += '  • Pro: Concise\n';
      request += '  • Con: Meaningless at first\n';
      request += '```\n\n';
      
      if (avoid) {
        request += `**2. Avoid:** ${avoid}\n\n`;
      }
      
      request += 'Red flags:\n';
      request += '- Hard to spell\n';
      request += '- Hard to pronounce\n';
      request += '- Negative associations\n';
      request += '- Similar to competitors\n';
      request += '- Meaningless in target language\n';
      request += '- Too trendy (will date quickly)\n\n';
      
      request += '**3. Generation Techniques**\n\n';
      
      request += 'Word association:\n';
      request += '```\n';
      request += 'Core concept → Related words → Variations\n';
      request += '  "Fast" → Swift, Rapid, Quick → Swiftly, Rapido\n';
      request += '```\n\n';
      
      request += 'Prefix/Suffix:\n';
      request += '```\n';
      request += 'Common patterns:\n';
      request += '  -ly (Shopify, Spotify)\n';
      request += '  -ify (Amplify, Simplify)\n';
      request += '  -able (Remarkable, Workable)\n';
      request += '  re- (Reflect, Revolve)\n';
      request += '```\n\n';
      
      request += 'Language borrowing:\n';
      request += '```\n';
      request += 'Latin/Greek roots:\n';
      request += '  "Light" → Lumen, Lux\n';
      request += '  "Voice" → Vox\n';
      request += '  "Truth" → Veritas\n';
      request += '```\n\n';
      
      request += 'Mashup:\n';
      request += '```\n';
      request += '[Word A] + [Word B] → New word\n';
      request += '  Instagram = Instant + Telegram\n';
      request += '  Groupon = Group + Coupon\n';
      request += '```\n\n';
      
      request += '**4. Generate Options**\n';
      request += 'Target: 50+ names\n';
      request += '- Mix different approaches\n';
      request += '- Don\'t self-censor yet\n';
      request += '- Say them out loud\n';
      request += '- Write them down\n\n';
      
      request += '**5. First Filter**\n';
      request += 'Quick elimination:\n';
      request += '```\n';
      request += 'Say it out loud:\n';
      request += '  • Easy to pronounce?\n';
      request += '  • Sounds good?\n\n';
      
      request += 'Write it down:\n';
      request += '  • Easy to spell?\n';
      request += '  • Looks good?\n\n';
      
      request += 'Context test:\n';
      request += '  • "Welcome to [Name]"\n';
      request += '  • "I work at [Name]"\n';
      request += '  • "Check out [Name]"\n';
      request += '```\n\n';
      
      request += 'Narrow to 10-15 finalists\n\n';
      
      request += '**6. Availability Check**\n';
      request += 'For each finalist:\n\n';
      
      request += 'Domain:\n';
      request += '```\n';
      request += 'namecheap.com or godaddy.com\n';
      request += '  • .com available? (ideal)\n';
      request += '  • .io, .co alternatives?\n';
      request += '  • Price reasonable?\n';
      request += '```\n\n';
      
      request += 'Trademark:\n';
      request += '```\n';
      request += 'uspto.gov (US) or wipo.int (international)\n';
      request += '  • Similar names in your category?\n';
      request += '  • Risk of confusion?\n';
      request += '  • Consider lawyer consult\n';
      request += '```\n\n';
      
      request += 'Social media:\n';
      request += '```\n';
      request += 'namechk.com\n';
      request += '  • Twitter/X handle?\n';
      request += '  • Instagram username?\n';
      request += '  • LinkedIn page?\n';
      request += '```\n\n';
      
      request += 'Google search:\n';
      request += '```\n';
      request += '  • Negative associations?\n';
      request += '  • Meaning in other languages?\n';
      request += '  • Competing results?\n';
      request += '```\n\n';
      
      request += '**7. Final Selection**\n';
      request += 'Top 3-5 candidates:\n';
      request += '```\n';
      request += 'Live with them:\n';
      request += '  • Use in sentences for a week\n';
      request += '  • Mock up logo\n';
      request += '  • Test with others\n\n';
      
      request += 'Score each:\n';
      request += '  Memorable:     /10\n';
      request += '  Meaningful:    /10\n';
      request += '  Distinctive:   /10\n';
      request += '  Available:     /10\n';
      request += '  Team loves it: /10\n';
      request += '```\n\n';
      
      request += 'Pick winner:\n';
      request += '- Trust your gut\n';
      request += '- Secure domain immediately\n';
      request += '- File trademark if needed\n';
      request += '- Commit and move forward\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Generated 50+ name options',
        'Multiple naming approaches used',
        'Names easy to spell and pronounce',
        'Domain availability checked',
        'Trademark conflicts reviewed',
        'Social media handles available',
        'Tested with target audience',
        'Final name selected and secured'
      ];
    }
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // WRITING - Clear, compelling written communication
  // ═══════════════════════════════════════════════════════════════════════════
  
  writing: {
    generateContext: (responses) => {
      const purpose = responses[0]?.trim() || '';
      const audience = responses[1]?.trim() || '';
      const tone = responses[2]?.trim() || '';
      
      let context = 'Writing project:\n\n';
      
      if (purpose) {
        context += `**Purpose:** ${purpose}\n\n`;
      }
      
      if (audience) {
        context += `**Audience:** ${audience}\n\n`;
      }
      
      if (tone) {
        context += `**Tone:** ${tone}\n\n`;
      }
      
      context += 'Before writing:\n';
      context += '- What should reader know/feel/do after reading?\n';
      context += '- What do they already know?\n';
      context += '- What will make them keep reading?\n';
      context += '- How will they use this information?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const structure = responses[3]?.trim() || '';
      const length = responses[4]?.trim() || '';
      
      let request = 'Write effectively:\n\n';
      
      request += '**1. Audience Analysis**\n';
      request += 'Understand your reader:\n';
      request += '```\n';
      request += 'Knowledge level:\n';
      request += '  • Expert → Skip basics, dive deep\n';
      request += '  • Familiar → Brief context, focus on new\n';
      request += '  • Beginner → Explain everything, use analogies\n\n';
      
      request += 'Reading context:\n';
      request += '  • Scanning → Use headers, bullets, bold\n';
      request += '  • Studying → Depth over brevity\n';
      request += '  • Reference → Clear structure, searchable\n\n';
      
      request += 'Motivation:\n';
      request += '  • Required reading → Front-load key info\n';
      request += '  • Optional reading → Hook them early\n';
      request += '  • Problem-solving → Answer their question fast\n';
      request += '```\n\n';
      
      if (structure) {
        request += `**2. Structure:** ${structure}\n\n`;
      }
      
      request += 'Common patterns:\n\n';
      
      request += 'Problem-Solution:\n';
      request += '```\n';
      request += '1. Problem (pain point)\n';
      request += '2. Why it matters\n';
      request += '3. Solution\n';
      request += '4. How it works\n';
      request += '5. What to do next\n';
      request += '```\n\n';
      
      request += 'How-To:\n';
      request += '```\n';
      request += '1. What you\'ll accomplish\n';
      request += '2. What you need\n';
      request += '3. Step-by-step instructions\n';
      request += '4. Common mistakes\n';
      request += '5. Next steps\n';
      request += '```\n\n';
      
      request += 'Argument:\n';
      request += '```\n';
      request += '1. Claim (thesis)\n';
      request += '2. Evidence\n';
      request += '3. Counter-arguments\n';
      request += '4. Rebuttal\n';
      request += '5. Conclusion\n';
      request += '```\n\n';
      
      request += 'Story:\n';
      request += '```\n';
      request += '1. Hook (intriguing opening)\n';
      request += '2. Context (setup)\n';
      request += '3. Conflict (tension)\n';
      request += '4. Resolution\n';
      request += '5. Takeaway (lesson)\n';
      request += '```\n\n';
      
      request += '**3. Opening Strategies**\n';
      request += 'Hook readers immediately:\n\n';
      
      request += 'Surprising fact:\n';
      request += '```\n';
      request += '"73% of users abandon after a single error."\n';
      request += '→ Grabs attention with data\n';
      request += '```\n\n';
      
      request += 'Question:\n';
      request += '```\n';
      request += '"What if your best feature is hiding your biggest problem?"\n';
      request += '→ Makes reader think\n';
      request += '```\n\n';
      
      request += 'Story/anecdote:\n';
      request += '```\n';
      request += '"Last Tuesday, our system crashed at 2am. Again."\n';
      request += '→ Creates relatability\n';
      request += '```\n\n';
      
      request += 'Bold claim:\n';
      request += '```\n';
      request += '"Most onboarding flows are backwards."\n';
      request += '→ Challenges assumptions\n';
      request += '```\n\n';
      
      request += '**4. Writing Principles**\n';
      request += 'Clarity:\n';
      request += '- One idea per sentence\n';
      request += '- Active voice ("We tested" not "Tests were conducted")\n';
      request += '- Concrete nouns (not abstract)\n';
      request += '- Strong verbs (not adverbs)\n\n';
      
      request += 'Brevity:\n';
      request += '- Cut unnecessary words\n';
      request += '- "In order to" → "To"\n';
      request += '- "Due to the fact that" → "Because"\n';
      request += '- "At this point in time" → "Now"\n\n';
      
      request += 'Flow:\n';
      request += '- Transition between ideas\n';
      request += '- One paragraph = one topic\n';
      request += '- Vary sentence length\n';
      request += '- Guide reader forward\n\n';
      
      if (length) {
        request += `**5. Length Strategy:** ${length}\n\n`;
      }
      
      request += 'Match length to purpose:\n';
      request += '```\n';
      request += 'Tweet/Slack:    280 chars (quick update)\n';
      request += 'Email:          200-300 words (single topic)\n';
      request += 'Blog post:      800-1500 words (full treatment)\n';
      request += 'Documentation:  As long as needed (completeness)\n';
      request += 'Report:         2000+ words (comprehensive)\n';
      request += '```\n\n';
      
      request += '**6. Editing Process**\n';
      request += 'Multiple passes:\n\n';
      
      request += 'Pass 1 - Structure:\n';
      request += '- Does order make sense?\n';
      request += '- Any gaps in logic?\n';
      request += '- Does each section earn its place?\n\n';
      
      request += 'Pass 2 - Clarity:\n';
      request += '- Can reader follow easily?\n';
      request += '- Any jargon to explain?\n';
      request += '- Examples where needed?\n\n';
      
      request += 'Pass 3 - Tightening:\n';
      request += '- Cut unnecessary words\n';
      request += '- Remove redundancy\n';
      request += '- Stronger verbs\n\n';
      
      request += 'Pass 4 - Polish:\n';
      request += '- Grammar, spelling\n';
      request += '- Formatting consistent\n';
      request += '- Links work\n\n';
      
      request += '**7. Common Pitfalls**\n';
      request += 'Avoid:\n\n';
      
      request += 'Burying the lede:\n';
      request += '```\n';
      request += '❌ Three paragraphs of context before main point\n';
      request += '✓ Main point first, context after\n';
      request += '```\n\n';
      
      request += 'Passive voice:\n';
      request += '```\n';
      request += '❌ "The button was clicked by the user"\n';
      request += '✓ "The user clicked the button"\n';
      request += '```\n\n';
      
      request += 'Weak verbs:\n';
      request += '```\n';
      request += '❌ "We did an analysis of the data"\n';
      request += '✓ "We analyzed the data"\n';
      request += '```\n\n';
      
      request += 'Vague language:\n';
      request += '```\n';
      request += '❌ "Performance significantly improved"\n';
      request += '✓ "Response time dropped from 2s to 200ms"\n';
      request += '```\n\n';
      
      request += '**8. Final Check**\n';
      request += 'Before publishing:\n';
      request += '- Read aloud (catches awkward phrasing)\n';
      request += '- Check tone (matches audience?)\n';
      request += '- Test links\n';
      request += '- Get feedback\n';
      request += '- Sleep on it if possible\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('Audience needs clearly understood');
      checkpoints.push('Structure matches purpose');
      checkpoints.push('Opening hooks reader');
      
      const tone = responses[2]?.toLowerCase() || '';
      if (tone.includes('formal') || tone.includes('professional')) {
        checkpoints.push('Tone is professional and consistent');
      } else if (tone.includes('casual') || tone.includes('friendly')) {
        checkpoints.push('Tone is conversational yet clear');
      }
      
      checkpoints.push('Each paragraph has single focus');
      checkpoints.push('Active voice used (not passive)');
      checkpoints.push('No jargon without explanation');
      checkpoints.push('Edited for clarity and brevity');
      
      return checkpoints;
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNICAL WRITING - Clear documentation and explanations
  // ═══════════════════════════════════════════════════════════════════════════
  
  technicalwriting: {
    generateContext: (responses) => {
      const documenting = responses[0]?.trim() || '';
      const readers = responses[1]?.trim() || '';
      
      let context = '**TECHNICAL DOCUMENTATION**\n\n';
      
      if (documenting) {
        context += `**Documenting:** ${documenting}\n\n`;
      }
      
      if (readers) {
        context += `**Readers:** ${readers}\n\n`;
      }
      
      context += 'Documentation goals:\n';
      context += '- Enable readers to accomplish task\n';
      context += '- Answer questions they have\n';
      context += '- Searchable and scannable\n';
      context += '- Stays accurate as system evolves\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const type = responses[2]?.trim() || '';
      const details = responses[3]?.trim() || '';
      
      let request = 'Write technical documentation:\n\n';
      
      if (type) {
        request += `**Documentation Type:** ${type}\n\n`;
      }
      
      request += '**1. Documentation Types**\n\n';
      
      request += 'Getting Started:\n';
      request += '```\n';
      request += 'Purpose: Help user succeed immediately\n';
      request += 'Include:\n';
      request += '  • Prerequisites\n';
      request += '  • Installation\n';
      request += '  • First example (works)\n';
      request += '  • Next steps\n';
      request += 'Length: 5-10 minutes to complete\n';
      request += '```\n\n';
      
      request += 'How-To Guides:\n';
      request += '```\n';
      request += 'Purpose: Accomplish specific task\n';
      request += 'Include:\n';
      request += '  • Clear goal\n';
      request += '  • Step-by-step instructions\n';
      request += '  • Code examples\n';
      request += '  • Expected output\n';
      request += '  • Troubleshooting\n';
      request += 'Length: As long as needed\n';
      request += '```\n\n';
      
      request += 'Reference:\n';
      request += '```\n';
      request += 'Purpose: Lookup specific information\n';
      request += 'Include:\n';
      request += '  • All parameters\n';
      request += '  • Return values\n';
      request += '  • Usage examples\n';
      request += '  • Edge cases\n';
      request += 'Length: Complete, not tutorial\n';
      request += '```\n\n';
      
      request += 'Explanation:\n';
      request += '```\n';
      request += 'Purpose: Understand why/how something works\n';
      request += 'Include:\n';
      request += '  • Concept overview\n';
      request += '  • Key principles\n';
      request += '  • Tradeoffs\n';
      request += '  • When to use\n';
      request += 'Length: Deep but focused\n';
      request += '```\n\n';
      
      if (details) {
        request += `**2. Content Strategy:** ${details}\n\n`;
      }
      
      request += '**3. Structure Principles**\n\n';
      
      request += 'Start with goal:\n';
      request += '```\n';
      request += 'By the end of this guide, you will:\n';
      request += '  • [Specific capability 1]\n';
      request += '  • [Specific capability 2]\n';
      request += '```\n\n';
      
      request += 'Show before explaining:\n';
      request += '```\n';
      request += '// Working example first\n';
      request += 'const result = api.fetch({ id: 123 });\n\n';
      
      request += '// Then explain each part\n';
      request += 'api.fetch()     // Calls the API\n';
      request += '{ id: 123 }     // Object with ID parameter\n';
      request += 'result          // Returns promise with data\n';
      request += '```\n\n';
      
      request += 'Progressive detail:\n';
      request += '```\n';
      request += '1. Minimal example (works immediately)\n';
      request += '2. Common options (covers 80% of uses)\n';
      request += '3. Advanced features (as needed)\n';
      request += '```\n\n';
      
      request += '**4. Code Examples**\n';
      request += 'Make examples copy-pasteable:\n\n';
      
      request += 'Complete, not fragments:\n';
      request += '```javascript\n';
      request += '// ✓ Good - runs as-is\n';
      request += 'const api = require("./api");\n';
      request += 'const result = await api.fetch({ id: 123 });\n';
      request += 'console.log(result);\n\n';
      
      request += '// ❌ Bad - missing imports, context\n';
      request += 'const result = await fetch({ id: 123 });\n';
      request += '```\n\n';
      
      request += 'Show expected output:\n';
      request += '```javascript\n';
      request += 'console.log(user);\n';
      request += '// Output:\n';
      request += '// {\n';
      request += '//   id: 123,\n';
      request += '//   name: "Alice",\n';
      request += '//   email: "alice@example.com"\n';
      request += '// }\n';
      request += '```\n\n';
      
      request += 'Handle errors:\n';
      request += '```javascript\n';
      request += 'try {\n';
      request += '  const result = await api.fetch({ id: 123 });\n';
      request += '} catch (error) {\n';
      request += '  if (error.code === "NOT_FOUND") {\n';
      request += '    // Handle missing resource\n';
      request += '  }\n';
      request += '}\n';
      request += '```\n\n';
      
      request += '**5. Clarity Techniques**\n\n';
      
      request += 'Use second person:\n';
      request += '```\n';
      request += '✓ "You can configure the timeout..."\n';
      request += '❌ "One can configure..." or "The user can..."\n';
      request += '```\n\n';
      
      request += 'Imperative for instructions:\n';
      request += '```\n';
      request += '✓ "Install the package:"\n';
      request += '❌ "The package should be installed:"\n';
      request += '```\n\n';
      
      request += 'Define terms inline:\n';
      request += '```\n';
      request += '✓ "The payload (data sent in the request)..."\n';
      request += '❌ "The payload..." (unexplained jargon)\n';
      request += '```\n\n';
      
      request += 'Use visual hierarchy:\n';
      request += '```\n';
      request += '# Main Topic\n';
      request += '## Subtopic\n';
      request += '### Detail\n\n';
      
      request += '**Bold** for important terms\n';
      request += '`Code` for code references\n';
      request += '> Blockquotes for notes/warnings\n';
      request += '```\n\n';
      
      request += '**6. Common Pitfalls**\n\n';
      
      request += 'Assuming knowledge:\n';
      request += '```\n';
      request += '❌ "Simply configure the webhook"\n';
      request += '✓ "Configure the webhook (URL that receives events):\n';
      request += '   1. Go to Settings\n';
      request += '   2. Click Webhooks\n';
      request += '   3. Add your URL"\n';
      request += '```\n\n';
      
      request += 'Outdated examples:\n';
      request += '```\n';
      request += '❌ Example uses deprecated API\n';
      request += '✓ Test examples regularly, update versions\n';
      request += '```\n\n';
      
      request += 'Missing error scenarios:\n';
      request += '```\n';
      request += '❌ Only happy path shown\n';
      request += '✓ Include: "If you see error X, do Y"\n';
      request += '```\n\n';
      
      request += '**7. Maintenance**\n';
      request += 'Keep docs accurate:\n';
      request += '- Update with code changes\n';
      request += '- Version docs with product\n';
      request += '- Note deprecations clearly\n';
      request += '- Test examples regularly\n';
      request += '- Track common questions (FAQ)\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Goal stated clearly upfront',
        'Code examples are complete and runnable',
        'Expected output shown',
        'Error handling included',
        'Jargon defined inline',
        'Steps are numbered and specific',
        'Visual hierarchy clear (headers, code blocks)',
        'Examples tested and working'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PRESENTATION - Compelling presentation design and delivery
  // ═══════════════════════════════════════════════════════════════════════════
  
  presentation: {
    generateContext: (responses) => {
      const topic = responses[0]?.trim() || '';
      const audience = responses[1]?.trim() || '';
      const duration = responses[2]?.trim() || '';
      
      let context = '**PRESENTATION**\n\n';
      
      if (topic) {
        context += `**Topic:** ${topic}\n\n`;
      }
      
      if (audience) {
        context += `**Audience:** ${audience}\n\n`;
      }
      
      if (duration) {
        context += `**Duration:** ${duration}\n\n`;
      }
      
      context += 'Before designing:\n';
      context += '- What should audience remember?\n';
      context += '- What action should they take?\n';
      context += '- What will keep their attention?\n';
      context += '- What questions will they have?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const data = responses[3]?.trim() || '';
      const story = responses[4]?.trim() || '';
      
      let request = 'Create compelling presentation:\n\n';
      
      request += '**1. Narrative Structure**\n\n';
      
      request += 'Story arc:\n';
      request += '```\n';
      request += 'Opening (10%):\n';
      request += '  • Hook: Surprising fact, question, or story\n';
      request += '  • Promise: What they\'ll learn\n';
      request += '  • Relevance: Why it matters to them\n\n';
      
      request += 'Body (75%):\n';
      request += '  • 3-5 main points (not 10)\n';
      request += '  • Each point: Claim → Evidence → Example\n';
      request += '  • Transition between points clearly\n\n';
      
      request += 'Closing (15%):\n';
      request += '  • Summary: Key takeaways\n';
      request += '  • Call to action: What to do next\n';
      request += '  • Memorable ending: Story or quote\n';
      request += '```\n\n';
      
      if (story) {
        request += `**2. Story Element:** ${story}\n\n`;
      }
      
      request += 'Use storytelling:\n';
      request += '```\n';
      request += 'Before/After:\n';
      request += '  "We struggled with X. Then Y changed. Now Z."\n\n';
      
      request += 'Customer story:\n';
      request += '  "Meet Sarah. She faced [problem]..."\n\n';
      
      request += 'Personal anecdote:\n';
      request += '  "Three years ago, I made this mistake..."\n\n';
      
      request += 'Metaphor:\n';
      request += '  "Building software is like building a house..."\n';
      request += '```\n\n';
      
      request += '**3. Slide Design**\n\n';
      
      request += 'One idea per slide:\n';
      request += '```\n';
      request += '❌ Slide crammed with 8 points\n';
      request += '✓ Each point gets own slide\n';
      request += '```\n\n';
      
      request += 'Minimal text:\n';
      request += '```\n';
      request += '❌ Full sentences, paragraphs\n';
      request += '✓ Short phrases, <10 words per line\n';
      request += '✓ Large text (30pt+ minimum)\n';
      request += '```\n\n';
      
      request += 'Visual hierarchy:\n';
      request += '```\n';
      request += 'Headline: Bold, large (48pt+)\n';
      request += 'Body: Clear, readable (30pt+)\n';
      request += 'Detail: Smaller but legible (24pt+)\n';
      request += '```\n\n';
      
      request += 'Use images effectively:\n';
      request += '```\n';
      request += '✓ Full-bleed photos (fill slide)\n';
      request += '✓ Icons for concepts\n';
      request += '✓ Diagrams for relationships\n';
      request += '❌ Clip art, low-res images\n';
      request += '❌ Decorative images that don\'t add meaning\n';
      request += '```\n\n';
      
      if (data) {
        request += `**4. Data Visualization:** ${data}\n\n`;
      }
      
      request += 'Show data clearly:\n\n';
      
      request += 'Chart types:\n';
      request += '```\n';
      request += 'Comparison → Bar chart\n';
      request += 'Trend over time → Line chart\n';
      request += 'Part of whole → Pie chart (if <5 slices)\n';
      request += 'Relationship → Scatter plot\n';
      request += 'Distribution → Histogram\n';
      request += '```\n\n';
      
      request += 'Chart principles:\n';
      request += '```\n';
      request += '✓ Title tells the insight ("Sales doubled in Q2")\n';
      request += '✓ Axis labels clear\n';
      request += '✓ Remove gridlines, borders (minimize ink)\n';
      request += '✓ Use color meaningfully\n';
      request += '✓ Highlight what matters\n';
      request += '❌ 3D charts (distort data)\n';
      request += '❌ Too many series (confusing)\n';
      request += '```\n\n';
      
      request += '**5. Delivery Preparation**\n\n';
      
      request += 'Speaker notes:\n';
      request += '```\n';
      request += 'For each slide:\n';
      request += '  • Key point to make\n';
      request += '  • Story/example to tell\n';
      request += '  • Transition to next slide\n\n';
      
      request += 'Don\'t write full script:\n';
      request += '  ✓ Bullet points, key phrases\n';
      request += '  ❌ Word-for-word text\n';
      request += '```\n\n';
      
      request += 'Practice:\n';
      request += '- Rehearse full presentation 3+ times\n';
      request += '- Time yourself (stay under limit)\n';
      request += '- Practice transitions\n';
      request += '- Anticipate questions\n';
      request += '- Test tech/setup\n\n';
      
      request += '**6. Delivery Techniques**\n\n';
      
      request += 'Engagement:\n';
      request += '```\n';
      request += 'Start strong:\n';
      request += '  • No "Sorry for..." or "Quick housekeeping"\n';
      request += '  • Jump into compelling opening\n\n';
      
      request += 'Eye contact:\n';
      request += '  • Look at audience, not slides\n';
      request += '  • Scan the room, hold 2-3 seconds\n\n';
      
      request += 'Pace:\n';
      request += '  • Pause after key points (let it land)\n';
      request += '  • Vary speed (slow for important parts)\n';
      request += '  • Don\'t rush when nervous\n\n';
      
      request += 'Energy:\n';
      request += '  • Stand, don\'t sit\n';
      request += '  • Move with purpose\n';
      request += '  • Use gestures naturally\n';
      request += '```\n\n';
      
      request += '**7. Q&A Handling**\n';
      request += 'Prepare for questions:\n';
      request += '- Anticipate tough questions\n';
      request += '- Have data ready in backup slides\n';
      request += '- Practice concise answers\n\n';
      
      request += 'During Q&A:\n';
      request += '```\n';
      request += 'Repeat question:\n';
      request += '  "The question was about X..."\n';
      request += '  (Ensures everyone heard)\n\n';
      
      request += 'If you don\'t know:\n';
      request += '  "Good question. I don\'t have that data,\n';
      request += '   but I\'ll find out and follow up."\n\n';
      
      request += 'Keep control:\n';
      request += '  "That\'s a great question for offline.\n';
      request += '   Let\'s cover it after."\n';
      request += '```\n\n';
      
      request += '**8. Technical Setup**\n';
      request += 'Before presenting:\n';
      request += '- Test projector/screen\n';
      request += '- Check fonts render correctly\n';
      request += '- Turn off notifications\n';
      request += '- Have clicker/remote\n';
      request += '- Backup: PDF and USB drive\n';
      request += '- Know room layout\n';
      request += '- Arrive early\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      const checkpoints = [];
      
      checkpoints.push('Clear narrative arc (opening, body, closing)');
      checkpoints.push('3-5 main points (not overwhelming)');
      checkpoints.push('One idea per slide');
      checkpoints.push('Text is large and minimal');
      
      const data = responses[3]?.toLowerCase() || '';
      if (data.includes('data') || data.includes('chart') || data.includes('graph')) {
        checkpoints.push('Charts are clear and tell story');
      }
      
      checkpoints.push('Speaker notes prepared');
      checkpoints.push('Practiced 3+ times');
      checkpoints.push('Tech tested');
      checkpoints.push('Q&A anticipated');
      
      return checkpoints;
    }
  },

    // ═══════════════════════════════════════════════════════════════════════════
  // PROBLEM SOLVING - Systematic problem breakdown and solution
  // ═══════════════════════════════════════════════════════════════════════════
  
  problemsolving: {
    generateContext: (responses) => {
      const problem = responses[0]?.trim() || '';
      const impact = responses[1]?.trim() || '';
      const tried = responses[2]?.trim() || '';
      
      let context = 'Problem to solve:\n\n';
      
      if (problem) {
        context += `**Problem:** ${problem}\n\n`;
      }
      
      if (impact) {
        context += `**Impact:** ${impact}\n\n`;
      }
      
      if (tried) {
        context += `**Already Tried:** ${tried}\n\n`;
      }
      
      context += 'Before solving:\n';
      context += '- Are we solving the right problem?\n';
      context += '- What\'s the root cause vs symptom?\n';
      context += '- What constraints are real vs assumed?\n';
      context += '- What would success look like?\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const constraints = responses[3]?.trim() || '';
      const success = responses[4]?.trim() || '';
      
      let request = 'Solve systematically:\n\n';
      
      request += '**1. Define the Real Problem**\n\n';
      
      request += '5 Whys technique:\n';
      request += '```\n';
      request += 'Problem: [Surface issue]\n';
      request += '  Why? [First cause]\n';
      request += '    Why? [Deeper cause]\n';
      request += '      Why? [Underlying cause]\n';
      request += '        Why? [System cause]\n';
      request += '          Why? [Root cause]\n';
      request += '```\n\n';
      
      request += 'Example:\n';
      request += '```\n';
      request += 'Problem: Users abandon signup\n';
      request += '  Why? Too many form fields\n';
      request += '    Why? We ask for everything upfront\n';
      request += '      Why? Downstream systems need the data\n';
      request += '        Why? Systems aren\'t integrated\n';
      request += '          Root: Integration problem, not UX problem\n';
      request += '```\n\n';
      
      request += 'Reframe the problem:\n';
      request += '```\n';
      request += '"How do we..." → Action-oriented\n';
      request += '"What if we..." → Possibility-oriented\n';
      request += '"Why does..." → Understanding-oriented\n';
      request += '```\n\n';
      
      if (constraints) {
        request += `**2. Constraints:** ${constraints}\n\n`;
      }
      
      request += 'Separate constraints:\n';
      request += '```\n';
      request += 'Real constraints:\n';
      request += '  • Laws, regulations\n';
      request += '  • Budget (hard limit)\n';
      request += '  • Physics (impossible things)\n';
      request += '  • Deadline (immovable)\n\n';
      
      request += 'Assumed constraints:\n';
      request += '  • "Users won\'t..."\n';
      request += '  • "We\'ve always..."\n';
      request += '  • "That would require..."\n';
      request += '  → Challenge these!\n';
      request += '```\n\n';
      
      request += '**3. Decompose the Problem**\n\n';
      
      request += 'Break into sub-problems:\n';
      request += '```\n';
      request += 'Large problem:\n';
      request += '  → Component A\n';
      request += '    → Sub-component A1\n';
      request += '    → Sub-component A2\n';
      request += '  → Component B\n';
      request += '    → Sub-component B1\n';
      request += '    → Sub-component B2\n';
      request += '```\n\n';
      
      request += 'Find critical path:\n';
      request += '- Which sub-problems block others?\n';
      request += '- Which can be solved in parallel?\n';
      request += '- Which has highest impact?\n';
      request += '- Which is riskiest?\n\n';
      
      request += '**4. Generate Solutions**\n\n';
      
      request += 'Divergent thinking (quantity):\n';
      request += '```\n';
      request += 'Generate 10+ ideas:\n';
      request += '  • Obvious solutions\n';
      request += '  • Opposite approach\n';
      request += '  • Analogies (how do others solve this?)\n';
      request += '  • Combine existing solutions\n';
      request += '  • Remove constraints (what if...?)\n';
      request += '```\n\n';
      
      request += 'First principles thinking:\n';
      request += '```\n';
      request += '1. Break down to fundamental truths\n';
      request += '2. Question every assumption\n';
      request += '3. Rebuild from ground up\n\n';
      
      request += 'Example:\n';
      request += '  Assumption: "Storage is expensive"\n';
      request += '  First principle: Disk cost per GB\n';
      request += '  Reality: Penny per GB, assumption outdated\n';
      request += '```\n\n';
      
      request += '**5. Evaluate Solutions**\n\n';
      
      if (success) {
        request += `**Success Criteria:** ${success}\n\n`;
      }
      
      request += 'Decision matrix:\n';
      request += '```\n';
      request += '| Solution | Impact | Effort | Risk | Score |\n';
      request += '|----------|--------|--------|------|-------|\n';
      request += '| A        | High   | Low    | Low  | 9     |\n';
      request += '| B        | Medium | Medium | High | 5     |\n';
      request += '| C        | Low    | High   | Low  | 3     |\n';
      request += '```\n\n';
      
      request += 'Score each dimension:\n';
      request += '- Impact: How much does this help? (1-10)\n';
      request += '- Effort: How hard to implement? (1-10, lower is better)\n';
      request += '- Risk: What could go wrong? (1-10, lower is better)\n\n';
      
      request += 'Consider:\n';
      request += '```\n';
      request += 'Quick wins:\n';
      request += '  High impact + Low effort\n';
      request += '  → Do these first\n\n';
      
      request += 'Major projects:\n';
      request += '  High impact + High effort\n';
      request += '  → Plan carefully\n\n';
      
      request += 'Fill-ins:\n';
      request += '  Low impact + Low effort\n';
      request += '  → Do if time permits\n\n';
      
      request += 'Avoid:\n';
      request += '  Low impact + High effort\n';
      request += '  → Don\'t waste resources\n';
      request += '```\n\n';
      
      request += '**6. Prototype & Test**\n\n';
      
      request += 'Start small:\n';
      request += '```\n';
      request += 'Hypothesis:\n';
      request += '  "If we do X, then Y will improve"\n\n';
      
      request += 'Test:\n';
      request += '  • Smallest version possible\n';
      request += '  • Time-boxed (1 day? 1 week?)\n';
      request += '  • Measurable outcome\n\n';
      
      request += 'Learn:\n';
      request += '  • Did it work?\n';
      request += '  • What surprised us?\n';
      request += '  • What\'s the next iteration?\n';
      request += '```\n\n';
      
      request += 'Fail fast:\n';
      request += '- Test riskiest assumptions first\n';
      request += '- Define what would make you stop\n';
      request += '- Don\'t fall in love with solution\n\n';
      
      request += '**7. Implementation Plan**\n\n';
      
      request += 'Break into phases:\n';
      request += '```\n';
      request += 'Phase 1 (Week 1):\n';
      request += '  • [Specific milestone]\n';
      request += '  • Success: [Measurable outcome]\n\n';
      
      request += 'Phase 2 (Week 2-3):\n';
      request += '  • [Next milestone]\n';
      request += '  • Success: [Measurable outcome]\n\n';
      
      request += 'Phase 3 (Week 4):\n';
      request += '  • [Final milestone]\n';
      request += '  • Success: [Measurable outcome]\n';
      request += '```\n\n';
      
      request += 'Track progress:\n';
      request += '- Weekly check-ins\n';
      request += '- Clear success metrics\n';
      request += '- Adjust as you learn\n\n';
      
      request += '**8. Common Pitfalls**\n\n';
      
      request += 'Solving wrong problem:\n';
      request += '```\n';
      request += '❌ Jump to solution immediately\n';
      request += '✓ Spend time defining problem clearly\n';
      request += '```\n\n';
      
      request += 'Analysis paralysis:\n';
      request += '```\n';
      request += '❌ Research forever, never act\n';
      request += '✓ Time-box analysis, prototype quickly\n';
      request += '```\n\n';
      
      request += 'Sunk cost fallacy:\n';
      request += '```\n';
      request += '❌ "We\'ve invested so much already..."\n';
      request += '✓ "Is this still the right approach?"\n';
      request += '```\n\n';
      
      request += 'Complexity bias:\n';
      request += '```\n';
      request += '❌ Favor complex, clever solutions\n';
      request += '✓ Simple solution often best\n';
      request += '```\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Root cause identified (not just symptom)',
        'Problem clearly defined',
        'Constraints separated (real vs assumed)',
        'Problem decomposed into solvable parts',
        'Multiple solutions generated',
        'Solutions evaluated with criteria',
        'Prototype plan exists',
        'Implementation phases defined'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // THINKING - Structured analytical thinking
  // ═══════════════════════════════════════════════════════════════════════════
  
  thinking: {
    generateContext: (responses) => {
      const thinking = responses[0]?.trim() || '';
      const clarity = responses[1]?.trim() || '';
      
      let context = 'Thinking through:\n\n';
      
      if (thinking) {
        context += `**Topic:** ${thinking}\n\n`;
      }
      
      if (clarity) {
        context += `**Current Understanding:** ${clarity}\n\n`;
      }
      
      context += 'Thinking goals:\n';
      context += '- Clarify what we actually know\n';
      context += '- Identify what we don\'t know\n';
      context += '- Question assumptions\n';
      context += '- Find connections\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const stuck = responses[2]?.trim() || '';
      const need = responses[3]?.trim() || '';
      
      let request = 'Think systematically:\n\n';
      
      request += '**1. Clarify the Question**\n\n';
      
      request += 'What are we really asking?\n';
      request += '```\n';
      request += 'Vague: "What should we do about X?"\n';
      request += 'Clear: "Should we invest in X given Y constraints?"\n\n';
      
      request += 'Vague: "How can we improve?"\n';
      request += 'Clear: "How can we reduce churn by 20%?"\n';
      request += '```\n\n';
      
      request += 'Break down compound questions:\n';
      request += '```\n';
      request += 'Compound:\n';
      request += '  "Should we build feature X or Y and\n';
      request += '   how should we prioritize Z?"\n\n';
      
      request += 'Separated:\n';
      request += '  1. What criteria for choosing features?\n';
      request += '  2. How do X and Y score on criteria?\n';
      request += '  3. Where does Z fit in roadmap?\n';
      request += '```\n\n';
      
      if (stuck) {
        request += `**2. Current Block:** ${stuck}\n\n`;
      }
      
      request += 'Identify what\'s blocking:\n';
      request += '```\n';
      request += 'Missing information:\n';
      request += '  → What data would help?\n';
      request += '  → How can we get it?\n\n';
      
      request += 'Conflicting information:\n';
      request += '  → Which source is more reliable?\n';
      request += '  → Can both be true?\n\n';
      
      request += 'Too many variables:\n';
      request += '  → Which are most important?\n';
      request += '  → What can we hold constant?\n\n';
      
      request += 'Unclear tradeoffs:\n';
      request += '  → What are we optimizing for?\n';
      request += '  → What are we willing to sacrifice?\n';
      request += '```\n\n';
      
      request += '**3. Map What You Know**\n\n';
      
      request += 'Known knowns:\n';
      request += '```\n';
      request += 'Facts we\'re confident about:\n';
      request += '  • [Established fact]\n';
      request += '  • [Verified data]\n';
      request += '  • [Tested assumption]\n';
      request += '```\n\n';
      
      request += 'Known unknowns:\n';
      request += '```\n';
      request += 'Questions we can answer:\n';
      request += '  • [Research this]\n';
      request += '  • [Test this]\n';
      request += '  • [Ask expert]\n';
      request += '```\n\n';
      
      request += 'Unknown unknowns:\n';
      request += '```\n';
      request += 'What are we not considering?\n';
      request += '  • Ask: "What am I missing?"\n';
      request += '  • Get outside perspective\n';
      request += '  • Look at analogous situations\n';
      request += '```\n\n';
      
      if (need) {
        request += `**4. What You Need:** ${need}\n\n`;
      }
      
      request += '**5. Mental Models**\n\n';
      
      request += 'Apply useful frameworks:\n\n';
      
      request += 'First principles:\n';
      request += '```\n';
      request += '1. What are the fundamental truths?\n';
      request += '2. Strip away assumptions\n';
      request += '3. Rebuild reasoning from basics\n';
      request += '```\n\n';
      
      request += 'Inversion:\n';
      request += '```\n';
      request += 'Instead of: "How do we succeed?"\n';
      request += 'Ask: "How would we fail?"\n';
      request += 'Then: Avoid those failure modes\n';
      request += '```\n\n';
      
      request += 'Second-order thinking:\n';
      request += '```\n';
      request += 'Action → Immediate effect → Downstream effects\n\n';
      
      request += 'Example:\n';
      request += '  Action: Lower prices\n';
      request += '  → 1st order: More customers\n';
      request += '  → 2nd order: Lower margins, competitors respond\n';
      request += '  → 3rd order: Race to bottom, no one profits\n';
      request += '```\n\n';
      
      request += 'Opportunity cost:\n';
      request += '```\n';
      request += 'Every yes is a no to something else:\n';
      request += '  "If we do X, we can\'t do Y"\n';
      request += '  "What are we NOT doing?"\n';
      request += '```\n\n';
      
      request += '**6. Test Your Thinking**\n\n';
      
      request += 'Steel man test:\n';
      request += '```\n';
      request += 'Present strongest counter-argument:\n';
      request += '  • Why might I be wrong?\n';
      request += '  • What evidence contradicts this?\n';
      request += '  • How would critic respond?\n';
      request += '```\n\n';
      
      request += 'Red team:\n';
      request += '```\n';
      request += 'Actively try to break your logic:\n';
      request += '  • What assumptions are fragile?\n';
      request += '  • Where\'s the weakest link?\n';
      request += '  • What edge cases break this?\n';
      request += '```\n\n';
      
      request += 'Explain to others:\n';
      request += '```\n';
      request += 'If you can\'t explain simply:\n';
      request += '  → You don\'t understand it yet\n';
      request += '  → Keep thinking\n';
      request += '```\n\n';
      
      request += '**7. Avoid Common Errors**\n\n';
      
      request += 'Confirmation bias:\n';
      request += '```\n';
      request += '❌ Only seek supporting evidence\n';
      request += '✓ Actively seek disconfirming evidence\n';
      request += '```\n\n';
      
      request += 'Anchoring:\n';
      request += '```\n';
      request += '❌ Fixate on first number/idea\n';
      request += '✓ Consider multiple reference points\n';
      request += '```\n\n';
      
      request += 'Availability bias:\n';
      request += '```\n';
      request += '❌ Overweight recent/memorable events\n';
      request += '✓ Look at base rates, data\n';
      request += '```\n\n';
      
      request += 'False dichotomy:\n';
      request += '```\n';
      request += '❌ "Either A or B"\n';
      request += '✓ "What about C, D, or hybrid?"\n';
      request += '```\n\n';
      
      request += '**8. Document Your Thinking**\n\n';
      
      request += 'Write it down:\n';
      request += '```\n';
      request += 'Question:\n';
      request += '  [What you\'re thinking through]\n\n';
      
      request += 'Context:\n';
      request += '  [Relevant background]\n\n';
      
      request += 'Analysis:\n';
      request += '  [Your reasoning]\n\n';
      
      request += 'Conclusion:\n';
      request += '  [Tentative answer]\n\n';
      
      request += 'Confidence:\n';
      request += '  [How sure are you? What would change it?]\n';
      request += '```\n\n';
      
      request += 'Benefits:\n';
      request += '- Clarifies fuzzy thinking\n';
      request += '- Reveals gaps\n';
      request += '- Reference for later\n';
      request += '- Shows reasoning to others\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Question is specific and clear',
        'Known knowns mapped out',
        'Known unknowns identified',
        'Assumptions explicitly stated',
        'Counter-arguments considered',
        'Logic tested for weaknesses',
        'Cognitive biases checked',
        'Thinking documented'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // PLANNING - Strategic planning and execution
  // ═══════════════════════════════════════════════════════════════════════════
  
  planning: {
    generateContext: (responses) => {
      const goal = responses[0]?.trim() || '';
      const timeline = responses[1]?.trim() || '';
      const resources = responses[2]?.trim() || '';
      
      let context = '**PLANNING**\n\n';
      
      if (goal) {
        context += `**Goal:** ${goal}\n\n`;
      }
      
      if (timeline) {
        context += `**Timeline:** ${timeline}\n\n`;
      }
      
      if (resources) {
        context += `**Resources:** ${resources}\n\n`;
      }
      
      context += 'Planning essentials:\n';
      context += '- What success looks like\n';
      context += '- Major milestones\n';
      context += '- Dependencies and blockers\n';
      context += '- Risks and mitigation\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const constraints = responses[3]?.trim() || '';
      const risks = responses[4]?.trim() || '';
      
      let request = 'Create actionable plan:\n\n';
      
      request += '**1. Goal Decomposition**\n\n';
      
      request += 'Work backwards:\n';
      request += '```\n';
      request += 'Final goal: [Big outcome]\n';
      request += '  ↑\n';
      request += 'Milestone 3: [What must happen before]\n';
      request += '  ↑\n';
      request += 'Milestone 2: [And before that]\n';
      request += '  ↑\n';
      request += 'Milestone 1: [First step]\n';
      request += '  ↑\n';
      request += 'Start: [Current state]\n';
      request += '```\n\n';
      
      request += 'Make milestones SMART:\n';
      request += '```\n';
      request += 'Specific:     Concrete outcome\n';
      request += 'Measurable:   Clear success criteria\n';
      request += 'Achievable:   Realistic given resources\n';
      request += 'Relevant:     Moves toward goal\n';
      request += 'Time-bound:   Has deadline\n\n';
      
      request += 'Example:\n';
      request += '  ❌ "Improve performance"\n';
      request += '  ✓ "Reduce API latency to <200ms by Q2"\n';
      request += '```\n\n';
      
      if (constraints) {
        request += `**2. Constraints:** ${constraints}\n\n`;
      }
      
      request += 'Map constraints:\n';
      request += '```\n';
      request += 'Time:\n';
      request += '  • Hard deadline: [Date]\n';
      request += '  • Soft deadline: [Preferred date]\n';
      request += '  • Flexibility: [How much?]\n\n';
      
      request += 'Budget:\n';
      request += '  • Total: [$X]\n';
      request += '  • Breakdown: [How allocated]\n';
      request += '  • Buffer: [Contingency]\n\n';
      
      request += 'People:\n';
      request += '  • Team size: [Number]\n';
      request += '  • Availability: [% time]\n';
      request += '  • Skills: [What exists, what\'s missing]\n';
      request += '```\n\n';
      
      request += '**3. Task Breakdown**\n\n';
      
      request += 'For each milestone:\n';
      request += '```\n';
      request += 'Milestone: [Name]\n';
      request += 'Tasks:\n';
      request += '  1. [Task] - [Owner] - [Estimate] - [Dependencies]\n';
      request += '  2. [Task] - [Owner] - [Estimate] - [Dependencies]\n';
      request += '  3. [Task] - [Owner] - [Estimate] - [Dependencies]\n';
      request += '```\n\n';
      
      request += 'Estimation:\n';
      request += '```\n';
      request += 'Three-point estimate:\n';
      request += '  Best case:  [Optimistic time]\n';
      request += '  Most likely: [Realistic time]\n';
      request += '  Worst case: [Pessimistic time]\n\n';
      
      request += 'Expected: (Best + 4×Likely + Worst) / 6\n';
      request += '```\n\n';
      
      request += '**4. Dependencies & Critical Path**\n\n';
      
      request += 'Map dependencies:\n';
      request += '```\n';
      request += 'Task A → Task B → Task C\n';
      request += '         ↓\n';
      request += '       Task D → Task E\n\n';
      
      request += 'Critical path: A → B → C\n';
      request += '(Longest sequence, determines timeline)\n';
      request += '```\n\n';
      
      request += 'Identify bottlenecks:\n';
      request += '- Single person on critical path?\n';
      request += '- External dependency?\n';
      request += '- Resource conflict?\n\n';
      
      if (risks) {
        request += `**5. Risk Management:** ${risks}\n\n`;
      }
      
      request += 'Risk assessment:\n';
      request += '```\n';
      request += '| Risk | Probability | Impact | Mitigation |\n';
      request += '|------|------------|--------|------------|\n';
      request += '| A    | High       | High   | [Plan]     |\n';
      request += '| B    | Medium     | Low    | [Plan]     |\n';
      request += '```\n\n';
      
      request += 'For high-priority risks:\n';
      request += '```\n';
      request += 'Risk: [Specific risk]\n';
      request += 'Impact: [What happens if it occurs]\n';
      request += 'Probability: [Likelihood]\n';
      request += 'Mitigation: [How to prevent]\n';
      request += 'Contingency: [What to do if it happens]\n';
      request += '```\n\n';
      
      request += '**6. Resource Allocation**\n\n';
      
      request += 'Capacity planning:\n';
      request += '```\n';
      request += 'Person A: 80% on Project X (32h/week)\n';
      request += '  • Task 1: 10h\n';
      request += '  • Task 2: 15h\n';
      request += '  • Buffer: 7h\n\n';
      
      request += 'Person B: 50% on Project X (20h/week)\n';
      request += '  • Task 3: 12h\n';
      request += '  • Task 4: 8h\n';
      request += '```\n\n';
      
      request += 'Balance load:\n';
      request += '- No one at 100% (leaves no buffer)\n';
      request += '- Cross-train (reduce single points of failure)\n';
      request += '- Plan for vacation, sick days\n\n';
      
      request += '**7. Progress Tracking**\n\n';
      
      request += 'Weekly check-ins:\n';
      request += '```\n';
      request += 'Completed:\n';
      request += '  • [Task completed]\n';
      request += '  • [Milestone reached]\n\n';
      
      request += 'In progress:\n';
      request += '  • [Task ongoing - X% done]\n\n';
      
      request += 'Blocked:\n';
      request += '  • [Task blocked - reason]\n\n';
      
      request += 'Risks:\n';
      request += '  • [New risks identified]\n\n';
      
      request += 'Adjustments:\n';
      request += '  • [What changed in plan]\n';
      request += '```\n\n';
      
      request += 'Leading indicators:\n';
      request += '- Velocity (completing on time?)\n';
      request += '- Burn rate (spending vs budget)\n';
      request += '- Quality (rework needed?)\n';
      request += '- Morale (team health)\n\n';
      
      request += '**8. Adaptive Planning**\n\n';
      
      request += 'Plan to replan:\n';
      request += '```\n';
      request += 'When to adjust:\n';
      request += '  • 20% behind schedule\n';
      request += '  • Requirements change\n';
      request += '  • Resources change\n';
      request += '  • Risks materialize\n\n';
      
      request += 'How to adjust:\n';
      request += '  • Cut scope (MVP)\n';
      request += '  • Add resources\n';
      request += '  • Extend timeline\n';
      request += '  • Parallel work\n';
      request += '```\n\n';
      
      request += 'Retrospective:\n';
      request += '- What went well?\n';
      request += '- What didn\'t?\n';
      request += '- What surprised us?\n';
      request += '- What to do differently next time?\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Goal is specific and measurable',
        'Major milestones defined',
        'Tasks broken down with owners',
        'Dependencies mapped',
        'Critical path identified',
        'Risks assessed with mitigation',
        'Resource allocation realistic',
        'Progress tracking method defined'
      ];
    }
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // FEELING STUCK - Breaking through mental blocks
  // ═══════════════════════════════════════════════════════════════════════════
  
  stuck: {
    generateContext: (responses) => {
      const stuckOn = responses[0]?.trim() || '';
      const tried = responses[1]?.trim() || '';
      
      let context = '**FEELING STUCK**\n\n';
      
      if (stuckOn) {
        context += `**Stuck on:** ${stuckOn}\n\n`;
      }
      
      if (tried) {
        context += `**Already tried:** ${tried}\n\n`;
      }
      
      context += 'Common causes:\n';
      context += '- Solving wrong problem\n';
      context += '- Missing information\n';
      context += '- Overwhelmed by complexity\n';
      context += '- Mental fatigue\n';
      
      return context;
    },
    
    generateImplementation: (responses) => {
      const deadline = responses[2]?.trim() || '';
      
      let request = 'Break through the block:\n\n';
      
      request += '**1. Diagnose the Stuck**\n\n';
      
      request += 'What type of stuck?\n';
      request += '```\n';
      request += 'Analysis paralysis:\n';
      request += '  → Too much thinking, not enough doing\n';
      request += '  → Fix: Time-box decision, move forward\n\n';
      
      request += 'Missing clarity:\n';
      request += '  → Don\'t understand problem\n';
      request += '  → Fix: Clarify requirements, ask questions\n\n';
      
      request += 'Missing knowledge:\n';
      request += '  → Don\'t know how to do something\n';
      request += '  → Fix: Research, ask expert, prototype\n\n';
      
      request += 'Mental fatigue:\n';
      request += '  → Been at it too long\n';
      request += '  → Fix: Take break, come back fresh\n\n';
      
      request += 'Wrong approach:\n';
      request += '  → Current path isn\'t working\n';
      request += '  → Fix: Step back, try different angle\n';
      request += '```\n\n';
      
      request += '**2. Reframe the Problem**\n\n';
      
      request += 'Ask different questions:\n';
      request += '```\n';
      request += 'Instead of: "How do I solve X?"\n';
      request += 'Ask:\n';
      request += '  • "What if X isn\'t the real problem?"\n';
      request += '  • "What would someone else do?"\n';
      request += '  • "What if I did the opposite?"\n';
      request += '  • "What\'s the simplest version?"\n';
      request += '  • "What would this look like if it were easy?"\n';
      request += '```\n\n';
      
      request += 'Zoom in/out:\n';
      request += '```\n';
      request += 'Zoom out (bigger picture):\n';
      request += '  "Why am I doing this?"\n';
      request += '  "What\'s the actual goal?"\n\n';
      
      request += 'Zoom in (smaller step):\n';
      request += '  "What\'s the tiniest next action?"\n';
      request += '  "What can I do in 5 minutes?"\n';
      request += '```\n\n';
      
      request += '**3. Break the Pattern**\n\n';
      
      request += 'Change something:\n';
      request += '```\n';
      request += 'Physical:\n';
      request += '  • Take a walk\n';
      request += '  • Change location\n';
      request += '  • Stand up / sit down\n\n';
      
      request += 'Mental:\n';
      request += '  • Work on different task\n';
      request += '  • Explain to rubber duck\n';
      request += '  • Sleep on it\n\n';
      
      request += 'Social:\n';
      request += '  • Talk to someone\n';
      request += '  • Get fresh perspective\n';
      request += '  • Pair program/work\n';
      request += '```\n\n';
      
      request += '**4. Get Unstuck Fast**\n\n';
      
      if (deadline) {
        request += `**Deadline:** ${deadline}\n\n`;
      }
      
      request += 'Time-boxed approaches:\n';
      request += '```\n';
      request += '5-minute rule:\n';
      request += '  "Just work on it for 5 minutes"\n';
      request += '  → Often momentum builds\n\n';
      
      request += 'Pomodoro:\n';
      request += '  25 minutes focused work\n';
      request += '  5 minute break\n';
      request += '  → Prevents burnout\n\n';
      
      request += 'Timebox research:\n';
      request += '  "I\'ll spend 30 minutes researching,\n';
      request += '   then decide with what I have"\n';
      request += '  → Prevents analysis paralysis\n';
      request += '```\n\n';
      
      request += 'Good enough principle:\n';
      request += '```\n';
      request += 'Ship working version:\n';
      request += '  • 80% solution now\n';
      request += '  • Better than 100% never\n';
      request += '  • Iterate based on feedback\n';
      request += '```\n\n';
      
      request += '**5. Fresh Approaches**\n\n';
      
      request += 'Try opposite:\n';
      request += '```\n';
      request += 'Been thinking "add feature"?\n';
      request += '  → Try "remove feature"\n\n';
      
      request += 'Been optimizing for speed?\n';
      request += '  → Try optimizing for simplicity\n\n';
      
      request += 'Been working alone?\n';
      request += '  → Try collaborating\n';
      request += '```\n\n';
      
      request += 'Constraint creativity:\n';
      request += '```\n';
      request += 'Add artificial constraint:\n';
      request += '  "What if I only had 1 hour?"\n';
      request += '  "What if I couldn\'t use X?"\n';
      request += '  "What if it had to fit in 10 lines?"\n\n';
      
      request += 'Forces different thinking\n';
      request += '```\n\n';
      
      request += 'Analogies:\n';
      request += '```\n';
      request += '"How does [different domain] solve this?"\n';
      request += '  • Nature\n';
      request += '  • Other industries\n';
      request += '  • Historical examples\n';
      request += '```\n\n';
      
      request += '**6. Immediate Actions**\n\n';
      
      request += 'Right now:\n';
      request += '```\n';
      request += '1. Write down exact problem (1 sentence)\n';
      request += '2. List 3 things you could try (any quality)\n';
      request += '3. Pick easiest one\n';
      request += '4. Set timer for 25 minutes\n';
      request += '5. Try it\n';
      request += '6. Evaluate: Did it help?\n';
      request += '7. If no: Try next option\n';
      request += '   If yes: Keep going\n';
      request += '```\n\n';
      
      request += '**7. When to Ask for Help**\n\n';
      
      request += 'Get help if:\n';
      request += '```\n';
      request += '• Stuck >2 hours on same thing\n';
      request += '• Repeatedly hitting same wall\n';
      request += '• Need expertise you don\'t have\n';
      request += '• Fresh perspective would help\n';
      request += '• Deadline approaching\n';
      request += '```\n\n';
      
      request += 'How to ask:\n';
      request += '```\n';
      request += '1. What you\'re trying to do\n';
      request += '2. What you\'ve tried\n';
      request += '3. What happened\n';
      request += '4. What you think might work\n';
      request += '5. Specific question\n';
      request += '```\n\n';
      
      request += '**8. Prevent Future Stuck**\n\n';
      
      request += 'Build momentum:\n';
      request += '- Start sessions with easy wins\n';
      request += '- Keep list of "when stuck, try..."\n';
      request += '- Take breaks before exhausted\n';
      request += '- Document what worked\n';
      
      return request;
    },
    
    extractCheckpoints: (responses) => {
      return [
        'Type of stuck identified',
        'Problem reframed',
        'Pattern broken (changed approach)',
        'At least 3 options generated',
        'One option tried',
        'Progress made (any amount)',
        'Next action is clear'
      ];
    }
  }    
};
  
console.log(`Implementation Paths Loaded: All domains (${Object.keys(window.KumagaizoPathGenerators).length} categories)`);