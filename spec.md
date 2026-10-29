# AI MYSTERY ROOM
## Product Specification — Single Source of Truth

**Document:** `SPEC.md`  
**Version:** 1.0.0  
**Status:** Initial Development Specification  
**Project Type:** AI-Powered Interactive Mystery Investigation Platform  
**Architecture:** MERN Stack  
**AI Provider:** Google Gemini  
**Primary Development Agent:** OpenAI Codex

---

# 1. PROJECT OVERVIEW

## 1.1 Product Vision

AI Mystery Room is an interactive mystery-solving website where users become investigators and solve fictional crimes using AI-generated evidence.

The user begins by submitting a short scenario, story, or mystery premise. The application uses Google Gemini to transform that input into a complete investigation containing a fictional crime, suspects, evidence, clues, a hidden culprit, and a logical solution.

The user investigates the case by examining different types of evidence, including:

- WhatsApp-style conversations.
- Photographs and crime-scene images.
- CCTV recordings or simulated CCTV footage.
- Suspect statements and interrogation transcripts.
- Timelines and alibis.
- Documents, reports, and other digital clues.

After examining the evidence, the user selects the person they believe committed the crime and submits their final accusation.

The system evaluates the accusation against the original hidden solution and presents the investigation outcome with an explanation of the evidence.

## 1.2 Core Concept

**User-provided story → AI-generated mystery → Interactive investigation → Evidence analysis → Culprit selection → Case resolution.**

The central experience should feel like investigating a real mystery rather than reading an AI-generated story.

Users should actively discover clues, compare conflicting statements, identify inconsistencies, and make decisions.

## 1.3 Product Objectives

1. Allow users to create mysteries from their own story ideas.
2. Generate coherent, interconnected fictional investigations.
3. Present evidence through realistic, interactive interfaces.
4. Ensure every mystery has one predetermined culprit.
5. Make evidence logically sufficient to support the correct solution.
6. Prevent users from accessing the solution before submitting their accusation.
7. Deliver an immersive, responsive, visually polished experience.
8. Support persistent cases and investigation progress.
9. Use Gemini for AI-powered content generation while keeping investigation logic under application control.
10. Make the codebase modular, testable, maintainable, and suitable for future expansion.

## 1.4 Non-Goals for Version 1

The following are outside the initial release unless explicitly added later:

- Real-world criminal investigation.
- Real police database integrations.
- Real WhatsApp account integrations.
- Real CCTV system integrations.
- Multiplayer investigations.
- Live multiplayer chat.
- User-generated public mystery marketplaces.
- Subscription billing and payments.
- Public leaderboards.
- Autonomous AI agents that can modify the application database.
- Unrestricted video generation through third-party AI video services.

The application generates fictional investigative content. Its evidence must not be represented as authentic evidence from a real investigation.

---

# 2. TARGET USERS

## 2.1 Primary Users

People who enjoy:

- Detective stories.
- Crime-solving puzzles.
- Escape rooms.
- Psychological mysteries.
- Interactive fiction.
- Logic and deduction games.
- AI-powered creative experiences.

## 2.2 User Expectations

Users should be able to:

1. Understand the game without reading lengthy instructions.
2. Create a mystery in a few simple steps.
3. Begin investigating without waiting unnecessarily.
4. Explore evidence in an intuitive interface.
5. Keep track of discovered clues and important details.
6. Accuse a suspect with confidence.
7. Understand why their answer was correct or incorrect.
8. Resume an investigation after leaving the website.

---

# 3. FUNCTIONAL REQUIREMENTS

## 3.1 Landing Page

The landing page introduces AI Mystery Room and encourages users to create their first mystery.

### Required elements

- Product logo and name.
- Navigation bar.
- Hero section.
- Primary CTA: "Create a Mystery".
- Secondary CTA: "Explore How It Works".
- Brief product explanation.
- Feature cards.
- Example evidence preview.
- Investigation workflow.
- Footer containing product information and applicable legal links.

### Hero section

Suggested headline:

"Every Mystery Has a Secret. Can You Find It?"

Suggested supporting text:

"Create your own mystery, uncover AI-generated evidence, question the suspects, and discover the truth hidden in the clues."

Primary button:

**Create Your Mystery**

### Behavior

- Clicking "Create Your Mystery" opens the mystery creation page.
- Navigation links must work.
- The layout must adapt to desktop, tablet, and mobile screens.
- The landing page must not expose case solutions or internal investigation data.

---

## 3.2 Mystery Creation

Users create a new investigation by describing the scenario they want to explore.

### Input fields

**A. Mystery Title**

- Optional.
- Maximum length: 100 characters.
- If omitted, the backend generates an appropriate title.

**B. Scenario Description**

- Required.
- Minimum length: 30 characters.
- Maximum length: 2,000 characters.
- Must be trimmed and validated by the backend.
- Should describe the premise, setting, people, incident, or mystery.

Example:

"A famous musician is found unconscious inside a locked recording studio. Three people were present in the building that evening: the manager, the sound engineer, and the musician's assistant. Everyone claims they left before the incident, but the studio's security records suggest otherwise."

**C. Mystery Category**

Supported categories:

- Murder Mystery.
- Theft.
- Missing Person.
- Corporate Mystery.
- Blackmail.
- Suspicious Incident.
- General Detective Mystery.

The category may be optional. If omitted, Gemini determines the most appropriate category.

**D. Difficulty**

Options:

- Easy.
- Medium.
- Hard.

Definitions:

| Difficulty | Expected experience |
|---|---|
| Easy | Clearer clues, fewer suspects, straightforward deduction. |
| Medium | Conflicting statements, several plausible suspects, interconnected clues. |
| Hard | Subtle inconsistencies, stronger red herrings, complex timelines and alibis. |

**E. Investigation Length**

Options:

- Short.
- Standard.
- Extended.

These settings control the number of suspects and evidence items.

| Setting | Suspects | Evidence items |
|---|---:|---:|
| Short | 3 | 6–8 |
| Standard | 4 | 9–12 |
| Extended | 5 | 13–16 |

Evidence item counts are targets. The backend may produce a small variation when needed for coherence.

### Creation flow

1. User enters the scenario.
2. User selects category, difficulty, and investigation length.
3. User clicks "Generate Mystery".
4. Frontend validates the form.
5. Backend creates a case-generation request.
6. Gemini generates a structured mystery.
7. Backend validates the generated mystery.
8. Backend stores the mystery in MongoDB.
9. Frontend receives the case identifier.
10. User is redirected to the investigation room.

### Loading experience

Display meaningful progress states:

- Preparing your case.
- Introducing the suspects.
- Building the evidence.
- Checking the clues.
- Opening the investigation room.

These messages are presentation states, not guarantees that Gemini has completed a particular internal operation.

The interface must handle timeouts and generation failures without losing the user's original scenario.

---

# 4. INVESTIGATION ROOM

The Investigation Room is the application's primary gameplay interface.

It should resemble a modern detective workspace containing case information, suspects, evidence, and investigation tools.

## 4.1 Layout

### Desktop

Use a three-column investigation workspace:

**Left Sidebar — Case Overview**

- Case title.
- Case identifier.
- Case status.
- Incident summary.
- Incident location.
- Incident date and time, when relevant.
- Suspect list.
- Investigation progress.

**Center Workspace — Evidence Viewer**

- Selected evidence item.
- Evidence description.
- Image or document preview.
- Conversation viewer.
- CCTV player or simulation.
- Timeline viewer.
- Previous/next evidence controls.

**Right Sidebar — Investigation Tools**

- Notebook.
- Saved clues.
- Investigation timeline.
- Evidence filters.
- Accusation button.

The layout may collapse into tabs or drawers on smaller screens.

## 4.2 Case Header

Display:

- Case title.
- Case ID.
- Difficulty.
- Number of suspects.
- Number of evidence items.
- Current investigation status.

Supported case statuses:

- `generating`
- `ready`
- `in_progress`
- `accused`
- `solved`
- `abandoned`

Status transitions must be validated by the backend.

## 4.3 Suspect Cards

Each suspect card displays:

- Fictional name.
- Portrait, if available.
- Age, if relevant.
- Occupation or relationship to the incident.
- Short background.
- Initial statement.
- Known alibi.
- Relevant evidence count.

Suspect cards must not reveal the culprit through labels, visual styling, sorting, hidden metadata, or frontend properties.

All suspects must be presented with consistent visual treatment.

Users can select a suspect to open their profile.

### Suspect profile

Include:

- Personal background.
- Relationship to the victim or incident.
- Statement.
- Claimed whereabouts.
- Motive information, if discovered.
- Contradictions found in evidence.
- Related evidence references.

Information should be revealed through legitimate evidence discovery, not by displaying the hidden solution.

---

# 5. EVIDENCE SYSTEM

Evidence is the central gameplay mechanic.

Each piece of evidence must contribute information to the investigation.

## 5.1 Supported Evidence Types

### A. WhatsApp-Style Conversations

Display fictional conversations in a familiar messaging interface.

Required fields:

- Conversation title.
- Participants.
- Message timestamps.
- Message content.
- Sender identity.
- Optional attachments.
- Related suspects.
- Related clues.

The interface should visually distinguish different participants.

Messages may reveal:

- Conflicting alibis.
- Hidden relationships.
- Suspicious timing.
- Motives.
- Attempts to conceal information.
- Contradictions with other evidence.

All conversations must be generated fictional content. Do not connect to real WhatsApp accounts or present simulated messages as authentic exports.

### B. Photographs

Display fictional investigative images.

Examples:

- A room containing suspicious objects.
- An object left at the scene.
- A damaged lock.
- A photograph with an overlooked detail.
- A location associated with a suspect.

Each image must have:

- Evidence title.
- Image URL or storage reference.
- Description.
- Timestamp, if relevant.
- Source or fictional origin.
- Associated clues.
- Related suspects.

Gemini-generated textual descriptions and image-generation services are separate capabilities.

**Important:** Gemini text generation alone does not guarantee the creation of actual image files.

For the initial version, support:

1. Real image generation through a separately configured image-generation provider, if available.
2. Deterministic fictional image assets or placeholders when image generation is unavailable.
3. AI-generated descriptions of the images.

Do not show a fabricated image as though it was generated by Gemini when no image-generation operation occurred.

### C. CCTV Recordings

Display a CCTV-style evidence viewer.

Supported representations:

- Actual generated video, if a compatible video-generation provider is configured.
- A simulated surveillance timeline with timestamped events.
- A sequence of still frames.
- A combination of images, timestamps, and textual observations.

For the MVP, simulated CCTV is acceptable and preferred.

A simulated recording may show:

- Camera identifier.
- Recording date.
- Timeline controls.
- Play/pause controls.
- Timestamped observations.
- Frame-by-frame navigation.
- Download disabled by default.

The interface must clearly distinguish a simulated reconstruction from actual video footage.

Do not implement a fake video player that claims to play a real recording when only textual events exist.

### D. Documents and Reports

Support fictional documents such as:

- Security reports.
- Incident reports.
- Receipts.
- Access logs.
- Emails.
- Handwritten-note transcriptions.
- Lab reports.
- Building entry records.

Each document must have a readable viewer and a clear connection to the case.

### E. Suspect Statements

Display statements collected from each suspect.

Include:

- Statement title.
- Suspect name.
- Interview timestamp.
- Statement text.
- Contradictions discovered.
- Related evidence.

### F. Timeline Evidence

Display a chronological sequence of events.

Include:

- Event timestamp.
- Event description.
- Source evidence.
- Related person or location.
- Whether the event is confirmed, claimed, or disputed.

The distinction between a suspect's claim and an independently supported event must be clear.

---

## 5.2 Evidence Metadata

Every evidence item must follow a consistent structure.

Example:

{
  "id": "evidence_001",
  "type": "chat",
  "title": "Messages Before the Incident",
  "description": "A conversation between two people connected to the case.",
  "createdAt": "2026-10-20T18:30:00Z",
  "participants": [],
  "content": {},
  "relatedSuspectIds": ["suspect_001"],
  "clueIds": ["clue_001"],
  "isUnlocked": true
}

This is an illustrative schema. Actual database documents must follow the final Mongoose models defined in the backend.

## 5.3 Evidence Interactions

Users must be able to:

- Open evidence.
- Close the evidence viewer.
- Move between evidence items.
- Filter evidence by type.
- Search evidence titles and descriptions.
- Mark evidence as reviewed.
- Save evidence to their notebook.
- Add private investigation notes.
- View related suspects.
- Follow references between evidence items.

Reviewed status, notes, and saved items must persist across page refreshes for authenticated users.

Evidence viewing must not automatically reveal all related clues if the game design requires users to discover them through interaction.

## 5.4 Clue Discovery

A clue is a meaningful deduction derived from one or more evidence items.

Examples:

- A suspect's stated departure time conflicts with a security log.
- A message establishes that two suspects knew each other.
- A photograph places an object in an unexpected location.
- A recorded event contradicts a suspect's alibi.

Each clue should contain:

- Clue ID.
- Short title.
- Explanation.
- Supporting evidence IDs.
- Related suspect IDs.
- Deduction significance.
- Discovery condition.

Clue significance may use:

- `low`
- `medium`
- `high`

The application must not automatically disclose the complete hidden solution when displaying a clue.

---

# 6. INVESTIGATION NOTEBOOK

The notebook helps users organize their reasoning.

## Required features

- Create a note.
- Edit a note.
- Delete a note.
- Save evidence references.
- Save discovered clues.
- View a suspect's associated notes.
- View all notes for the current case.

Notes must be scoped to the correct user and case.

The backend must verify ownership before allowing note operations.

The application must not assume that hiding another user's notes in the frontend is sufficient security.

---

# 7. CULPRIT SELECTION AND CASE RESOLUTION

## 7.1 Accusation Interface

Provide a dedicated accusation screen or modal.

Display:

- Suspect cards.
- Suspect names.
- Brief suspect summaries.
- A suspect selection control.
- Optional explanation field.
- Submit accusation button.

The explanation field allows the user to describe their reasoning.

It is optional in the MVP.

Suggested prompt:

"Who do you believe is responsible, and which clues led you to this conclusion?"

## 7.2 Submission Rules

When the user submits an accusation:

1. The frontend sends the selected suspect ID to the backend.
2. The backend validates the case and suspect.
3. The backend verifies that the user owns the case.
4. The backend checks whether the case permits an accusation.
5. The backend compares the selected suspect ID with the stored culprit ID.
6. The backend records the accusation.
7. The backend determines the result.
8. The frontend displays the appropriate result.

The correct culprit must be determined from the stored mystery solution.

**Never ask Gemini to independently decide whether the accusation is correct.**

This prevents the AI from changing the answer between requests.

## 7.3 Correct Accusation

Display:

- Case solved.
- Correct culprit.
- Full solution narrative.
- Explanation of the culprit's motive.
- Reconstruction of the incident.
- Explanation of important evidence.
- Explanation of misleading clues.
- Final case timeline.
- Restart or create-another-mystery option.

## 7.4 Incorrect Accusation

Display:

- Incorrect accusation.
- Selected suspect.
- Explanation of why the evidence does not establish the correct solution.
- Option to review evidence, if retries are permitted.
- Option to continue investigating, if retries are permitted.

The game must not reveal the actual culprit immediately after an incorrect accusation unless the user has exhausted their permitted attempts or the game rules explicitly allow it.

## 7.5 Retry Rules

For the MVP:

- Users receive three accusation attempts.
- An incorrect accusation reduces the remaining attempt count.
- A correct accusation marks the case as solved.
- When attempts reach zero, the system reveals the complete solution.
- A solved case cannot be accused again.
- An exhausted case cannot accept further accusations.
- Duplicate concurrent submissions must not cause attempts to be deducted twice.

The backend must enforce all attempt rules.

The frontend must never be the authority for attempt counts.

## 7.6 Case Evaluation

The outcome must be deterministic.

For every case:

- Exactly one culprit is selected.
- The culprit ID matches a stored suspect.
- The final explanation agrees with the stored solution.
- Important clues support the conclusion.
- Red herrings do not make the correct solution logically impossible.
- The culprit is not disclosed before the applicable reveal condition.

---

# 8. AI GENERATION ENGINE

## 8.1 AI Provider

Use the Google Gemini API through the official supported Google Gen AI SDK for Node.js.

The Gemini model name must be configurable using environment variables.

Do not hardcode a specific model throughout the codebase.

Suggested environment variable:

`GEMINI_MODEL`

The default model should be selected based on current API availability and project configuration.

The application must not depend on a model identifier that is unavailable to the configured API account.

## 8.2 AI Responsibilities

Gemini is responsible for generating:

- Mystery titles.
- Incident descriptions.
- Fictional locations.
- Suspect profiles.
- Suspect motives.
- Suspect statements.
- Evidence content.
- Conversation messages.
- Event timelines.
- Clues.
- Red herrings.
- Final solution narrative.
- Explanations connecting evidence to the solution.

Gemini is not responsible for:

- Authentication.
- Authorization.
- Database access.
- Case ownership.
- Accusation attempt counting.
- Correctness checks at submission time.
- Access-control decisions.
- Exposing solutions to clients.

These responsibilities belong to the backend application.

## 8.3 Structured Generation

Gemini must return structured JSON rather than unrestricted prose for the case-generation pipeline.

The backend must validate the generated JSON before storing the case.

Use a schema validation library such as Zod.

Do not trust AI-generated output merely because it appears to be valid JSON.

The backend must verify:

- Required fields exist.
- String lengths are within limits.
- Suspect IDs are unique.
- Evidence IDs are unique.
- Every evidence reference points to an existing object.
- Every clue reference points to valid evidence.
- The culprit ID matches an existing suspect.
- The timeline is internally consistent.
- The number of suspects and evidence items is within configured limits.
- User-supplied content has not overridden the system's generation requirements.

## 8.4 Mystery Generation Process

Implement the following pipeline:

**Step 1: Input validation**

Validate the user's story, settings, and category.

**Step 2: Generation request**

Send the validated scenario and game settings to Gemini with a controlled system instruction.

**Step 3: Structured response**

Request a JSON object matching the mystery schema.

**Step 4: Parsing**

Parse the model response.

Handle malformed JSON and incomplete responses safely.

**Step 5: Schema validation**

Validate the parsed object using Zod.

**Step 6: Referential validation**

Check all suspect, evidence, clue, and timeline references.

**Step 7: Logical validation**

Verify that the stored solution is consistent with the generated evidence.

**Step 8: Repair or regeneration**

If validation fails, request a limited repair or regenerate the mystery.

The retry count must be bounded. A recommended maximum is two repair attempts after the initial generation.

**Step 9: Persistence**

Save the complete validated case to MongoDB.

**Step 10: Client response**

Return only the case information and gameplay data authorized for the current user.

Never return the hidden solution through the normal case-creation response.

## 8.5 Generation Failure Handling

The application must handle:

- Gemini API errors.
- Invalid API credentials.
- Rate limits.
- Request timeouts.
- Malformed JSON.
- Safety-related model refusals.
- Incomplete responses.
- Schema validation failures.
- Database failures.

Provide a useful user-facing error message.

Never expose API keys, raw stack traces, private system prompts, or sensitive provider responses to the client.

The original scenario should remain available for retrying generation.

## 8.6 Token and Cost Management

- Enforce scenario-length limits.
- Keep output sizes bounded.
- Avoid regenerating the entire mystery when only a small correction is needed.
- Use a configurable timeout.
- Use a bounded retry policy.
- Prevent accidental duplicate generation requests.
- Consider rate limits per user.
- Record generation status and operational errors without logging unnecessary personal data.

## 8.7 Image and Video Generation Boundaries

Gemini text generation must not be treated as a general-purpose image or video storage system.

The architecture must separate:

1. Text and structured mystery generation.
2. Image generation.
3. Video generation.
4. Media storage.
5. Media delivery.

For Version 1, the application must remain fully playable even when image or video generation is unavailable.

Use simulated CCTV and approved static assets as fallback options.

---

# 9. MYSTERY DATA MODEL

The following describes the logical data model. Actual field definitions, validation rules, and indexes must be implemented in Mongoose schemas.

## 9.1 User

Fields:

- `_id`
- `name`
- `email`
- `passwordHash`, only if using email/password authentication
- `authProvider`
- `createdAt`
- `updatedAt`

Authentication may be implemented using a suitable provider or a secure email/password flow.

Never store plaintext passwords.

## 9.2 Mystery

Fields:

- `_id`
- `ownerId`
- `title`
- `scenario`
- `category`
- `difficulty`
- `length`
- `status`
- `suspects`
- `evidence`
- `clues`
- `timeline`
- `solution`
- `accusationAttempts`
- `maxAccusationAttempts`
- `generationMetadata`
- `createdAt`
- `updatedAt`
- `solvedAt`

### Solution object

The solution must be persisted separately from the public case representation.

Logical fields:

- `culpritSuspectId`
- `motive`
- `incidentReconstruction`
- `evidenceExplanation`
- `redHerringExplanation`
- `finalNarrative`

The actual culprit ID must be selected during generation and stored before the user starts investigating.

## 9.3 Suspect

Logical fields:

- `id`
- `name`
- `age`
- `occupation`
- `portraitUrl`
- `background`
- `relationshipToIncident`
- `initialStatement`
- `claimedAlibi`
- `motiveSummary`
- `relevantEvidenceIds`

Do not expose the internal culprit flag or solution-only information in public suspect objects.

## 9.4 Evidence

Logical fields:

- `id`
- `type`
- `title`
- `description`
- `content`
- `media`
- `createdAt`
- `sourceDescription`
- `relatedSuspectIds`
- `clueIds`
- `isInitiallyAvailable`

Supported `type` values:

- `chat`
- `image`
- `cctv`
- `document`
- `statement`
- `timeline`

The content structure may differ by evidence type but must be validated against a type-specific schema.

## 9.5 Clue

Logical fields:

- `id`
- `title`
- `description`
- `significance`
- `supportingEvidenceIds`
- `relatedSuspectIds`
- `discoveryCondition`

## 9.6 Accusation

For a more maintainable implementation, accusations may be embedded in the mystery document or stored in a separate collection.

Logical fields:

- `_id`
- `mysteryId`
- `userId`
- `selectedSuspectId`
- `reasoning`
- `isCorrect`
- `attemptNumber`
- `createdAt`

Use a transaction or another concurrency-safe update strategy when recording an accusation and decrementing remaining attempts.

## 9.7 Investigation Progress

Logical fields:

- `_id`
- `mysteryId`
- `userId`
- `reviewedEvidenceIds`
- `savedEvidenceIds`
- `discoveredClueIds`
- `notes`
- `lastViewedAt`
- `createdAt`
- `updatedAt`

Use an embedded document or separate collection according to the final implementation.

---

# 10. DATABASE AND PERSISTENCE

Use MongoDB as the primary database.

Mongoose provides schema definitions, validation, and model access.

Required collections:

- `users`
- `mysteries`
- `investigationprogress`

An optional `accusations` collection may be added if accusations are stored separately.

### Database requirements

- Use MongoDB connection strings through environment variables.
- Never commit database credentials.
- Validate database records before use.
- Add indexes for common queries.
- Use appropriate unique indexes where needed.
- Avoid returning complete internal mystery documents to the frontend.
- Apply pagination to case-history listings.
- Implement ownership checks in all private case endpoints.
- Handle unavailable database connections gracefully.

### Suggested indexes

For mysteries:

- `{ ownerId: 1, createdAt: -1 }`
- `{ ownerId: 1, status: 1 }`

For investigation progress:

- `{ userId: 1, mysteryId: 1 }` with a unique compound index.

For accusations:

- `{ userId: 1, mysteryId: 1, createdAt: -1 }`

The final indexes must match the selected persistence design.

---

# 11. API SPECIFICATION

Use a REST API with JSON request and response bodies.

Base path:

`/api/v1`

All routes must follow consistent response conventions.

## 11.1 Authentication

### POST `/api/v1/auth/register`

Creates a user account when email/password authentication is enabled.

Request:

{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "password": "example-password"
}

Response:

{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "Alex Morgan",
      "email": "alex@example.com"
    }
  }
}

Never return password hashes.

### POST `/api/v1/auth/login`

Authenticates a user.

### POST `/api/v1/auth/logout`

Invalidates the applicable session or refresh-token mechanism.

### GET `/api/v1/auth/me`

Returns the authenticated user's public profile.

If Google OAuth or another authentication provider is selected, implement the equivalent provider-specific flow while preserving the same authorization requirements.

## 11.2 Mystery Generation

### POST `/api/v1/mysteries`

Creates a mystery.

Request:

{
  "title": "The Studio Incident",
  "scenario": "A musician is found unconscious in a locked studio...",
  "category": "suspicious_incident",
  "difficulty": "medium",
  "length": "standard"
}

Response:

{
  "success": true,
  "data": {
    "mysteryId": "mystery_id",
    "status": "ready",
    "title": "The Studio Incident"
  }
}

The actual response must contain only authorized public information.

For synchronous generation, return the completed case's public representation or case identifier.

If generation takes too long for a normal request, implement an asynchronous generation workflow using a job identifier and polling endpoint.

Do not return the stored solution.

## 11.3 List Mysteries

### GET `/api/v1/mysteries`

Returns the authenticated user's cases.

Supported query parameters:

- `page`
- `limit`
- `status`
- `difficulty`
- `sort`

Only return cases belonging to the authenticated user.

## 11.4 Retrieve Mystery

### GET `/api/v1/mysteries/:id`

Returns the public representation of a mystery.

The response must exclude:

- Culprit ID.
- Hidden solution.
- Internal AI prompts.
- Private generation metadata.
- Secret evaluation fields.
- Internal-only clue conditions.

## 11.5 Delete Mystery

### DELETE `/api/v1/mysteries/:id`

Deletes or archives a mystery according to the selected product behavior.

The initial implementation may permanently delete the case and its associated progress, provided this behavior is documented and authorization is enforced.

## 11.6 Update Investigation Progress

### PATCH `/api/v1/mysteries/:id/progress`

Updates reviewed evidence, saved evidence, or investigation progress.

Example request:

{
  "reviewedEvidenceIds": ["evidence_001"],
  "savedEvidenceIds": ["evidence_002"]
}

The backend must validate every supplied evidence ID against the selected case.

## 11.7 Notebook

### GET `/api/v1/mysteries/:id/notes`

Returns the authenticated user's notes for the case.

### POST `/api/v1/mysteries/:id/notes`

Creates a note.

### PATCH `/api/v1/mysteries/:id/notes/:noteId`

Updates a note.

### DELETE `/api/v1/mysteries/:id/notes/:noteId`

Deletes a note.

## 11.8 Submit Accusation

### POST `/api/v1/mysteries/:id/accusations`

Request:

{
  "suspectId": "suspect_002",
  "reasoning": "The access log contradicts the suspect's statement."
}

Example response for an incorrect accusation:

{
  "success": true,
  "data": {
    "isCorrect": false,
    "attemptsRemaining": 2,
    "caseStatus": "in_progress",
    "message": "Your accusation does not match the solution. Review the evidence and try again."
  }
}

Example response for a correct accusation:

{
  "success": true,
  "data": {
    "isCorrect": true,
    "attemptsRemaining": 2,
    "caseStatus": "solved",
    "solution": {
      "culprit": {},
      "motive": "The explanation of the motive.",
      "incidentReconstruction": "The reconstruction of the incident.",
      "evidenceExplanation": []
    }
  }
}

The solution object must only be returned when the case's reveal rules permit it.

## 11.9 Reveal Solution

### POST `/api/v1/mysteries/:id/reveal-solution`

Reveals the solution after the applicable game condition has been satisfied.

The backend must reject attempts to reveal the solution prematurely.

## 11.10 Health Check

### GET `/api/v1/health`

Returns basic API health information.

Do not expose API keys, environment variables, database credentials, or sensitive infrastructure details.

---

# 12. API RESPONSE CONVENTIONS

Successful responses:

{
  "success": true,
  "data": {}
}

Error responses:

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be processed."
  }
}

Use appropriate HTTP status codes.

Examples:

- `200` — Successful retrieval or update.
- `201` — Resource created.
- `400` — Invalid request.
- `401` — Unauthenticated.
- `403` — Unauthorized operation.
- `404` — Resource not found.
- `409` — Invalid state transition or conflicting operation.
- `422` — Semantically invalid request, where appropriate.
- `429` — Rate limit exceeded.
- `500` — Unexpected server error.
- `502` — Upstream AI service failure.
- `503` — Temporarily unavailable service.
- `504` — Upstream timeout.

Do not expose private resources merely to distinguish unauthorized IDs from nonexistent IDs.

For protected resources, consistently return the chosen authorization response.

---

# 13. TECHNICAL ARCHITECTURE

## 13.1 Stack

### Frontend

- React.
- JavaScript.
- React Router.
- Tailwind CSS.
- Fetch API for HTTP requests.
- Lucide React for icons.
- A suitable state-management approach using React Context and component state initially.

### Backend

- Node.js.
- Express.js.
- MongoDB.
- Mongoose.
- Google Gen AI SDK.
- Zod for input and generated-data validation.
- A secure authentication solution.
- A suitable logging library.

### Infrastructure

- MongoDB Atlas or another supported MongoDB deployment.
- A suitable frontend hosting platform.
- A suitable Node.js backend hosting platform.
- An image-storage provider if generated or uploaded images are persisted.

Exact dependency versions should be selected at implementation time and pinned in the package manifests.

Do not introduce additional frameworks without a clear architectural reason.

## 13.2 Repository Structure

Use a monorepo:

ai-mystery-room/
│
├── SPEC.md
├── README.md
├── .gitignore
├── package.json
│
├── client/
│   ├── package.json
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── app/
│       │   ├── App.jsx
│       │   ├── router.jsx
│       │   └── providers.jsx
│       │
│       ├── components/
│       │   ├── layout/
│       │   ├── common/
│       │   ├── evidence/
│       │   ├── suspects/
│       │   └── investigation/
│       │
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── CreateMysteryPage.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── InvestigationPage.jsx
│       │   ├── CaseResultPage.jsx
│       │   └── NotFoundPage.jsx
│       │
│       ├── features/
│       │   ├── mysteries/
│       │   ├── evidence/
│       │   ├── suspects/
│       │   ├── notebook/
│       │   └── accusations/
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   ├── mysteryService.js
│       │   └── investigationService.js
│       │
│       ├── hooks/
│       ├── utils/
│       ├── styles/
│       └── main.jsx
│
└── server/
    ├── package.json
    ├── src/
    │   ├── app.js
    │   ├── server.js
    │   │
    │   ├── config/
    │   │   ├── database.js
    │   │   └── environment.js
    │   │
    │   ├── routes/
    │   ├── controllers/
    │   ├── services/
    │   ├── models/
    │   ├── middleware/
    │   ├── validators/
    │   ├── prompts/
    │   ├── schemas/
    │   ├── utils/
    │   └── tests/
    │
    └── .env.example

The structure may evolve as development progresses, but responsibilities must remain separated.

Do not place database logic, AI prompts, authentication logic, and route handlers into one large file.

---

# 14. FRONTEND DESIGN SYSTEM

## 14.1 Design Direction

The interface should combine the atmosphere of a detective's investigation room with the clarity of a modern SaaS application.

The product should feel immersive, intelligent, and premium.

Avoid a generic dashboard template or a cluttered game interface.

## 14.2 Visual Identity

Suggested design palette:

- Background: deep charcoal.
- Primary surfaces: dark slate.
- Secondary surfaces: slightly lighter slate.
- Primary accent: electric violet.
- Secondary accent: cyan.
- Evidence highlights: muted amber.
- Success: green.
- Errors: red.
- Primary text: off-white.
- Secondary text: cool gray.

Use CSS variables or a centralized theme configuration.

Example tokens:

--color-background
--color-surface
--color-surface-elevated
--color-primary
--color-secondary
--color-text-primary
--color-text-secondary
--color-border
--color-success
--color-warning
--color-danger

Avoid applying every accent color to every component.

## 14.3 Typography

Use a clean, modern sans-serif font.

Possible choices:

- Inter.
- Geist.
- Another suitable web font.

Use consistent typography scales for:

- Main headings.
- Section headings.
- Body text.
- Metadata.
- Buttons.
- Evidence timestamps.

## 14.4 Components

Build reusable components for:

- Buttons.
- Inputs.
- Textareas.
- Select controls.
- Cards.
- Modals.
- Drawers.
- Tabs.
- Badges.
- Toast notifications.
- Loading states.
- Empty states.
- Error states.
- Evidence cards.
- Suspect cards.
- Timeline events.
- Confirmation dialogs.

## 14.5 Interaction Design

Use restrained animations for:

- Opening evidence.
- Switching investigation tabs.
- Hovering over interactive cards.
- Updating progress.
- Revealing discovered clues.
- Transitioning between case states.

Animations must not delay important actions or make the interface difficult to use.

Respect reduced-motion preferences.

## 14.6 Responsive Design

The application must work at:

- 360px mobile width.
- 768px tablet width.
- 1024px laptop width.
- 1440px desktop width.

At mobile widths:

- Collapse the three-column workspace.
- Make evidence readable without horizontal scrolling.
- Move secondary panels into tabs or drawers.
- Keep the accusation action accessible.
- Make interactive elements touch-friendly.

## 14.7 Accessibility

Implement:

- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Accessible form labels.
- Appropriate ARIA attributes.
- Sufficient text contrast.
- Accessible modal behavior.
- Alternative text for meaningful images.
- Error messages associated with form controls.

Do not communicate information through color alone.

---

# 15. AUTHENTICATION AND SECURITY

Security is a core requirement.

## 15.1 Authentication

For the MVP, support user accounts so investigation progress can be saved securely.

A guest mode may be added later.

Authentication must be enforced by the backend, not just by protected frontend routes.

## 15.2 Session Management

Use an appropriate secure session or token-based authentication design.

If using cookies:

- Set `HttpOnly`.
- Set `Secure` in production.
- Configure an appropriate `SameSite` policy.
- Implement CSRF protection where applicable.
- Restrict credentialed CORS to approved origins.

Never store long-lived authentication secrets in browser local storage when a safer session design is practical.

## 15.3 API Keys

The Gemini API key must exist only on the backend.

Store it in:

`GEMINI_API_KEY`

Never expose it through:

- React environment variables bundled into the client.
- Public API responses.
- Source code.
- Git commits.
- Browser console logs.
- Client-side network requests directly to Gemini.

## 15.4 Authorization

Every private mystery operation must verify:

- The user is authenticated.
- The mystery exists.
- The user owns the mystery.
- The requested action is allowed in the current case state.

A frontend-provided owner ID must never be trusted.

Derive the user identity from the authenticated server-side session.

## 15.5 Input Security

Implement:

- Request body size limits.
- Validation of all request parameters.
- Input-length limits.
- Rate limiting.
- Appropriate CORS configuration.
- Secure HTTP headers.
- Database-query safety.
- Protection against NoSQL injection.
- Safe rendering of generated text.
- Error-message sanitization.

Do not render AI-generated HTML directly.

Use normal React text rendering or a properly sanitized rendering strategy.

## 15.6 AI Prompt Injection

Treat the user-provided scenario as untrusted data.

The backend must instruct Gemini to:

- Use the scenario as story material.
- Ignore instructions embedded in the scenario that attempt to override the mystery-generation rules.
- Produce only the expected structured output.
- Avoid revealing hidden implementation details.
- Follow applicable safety requirements.

Prompt instructions alone are not a security boundary. Validate the output and enforce all access-control rules in application code.

## 15.7 Hidden Solution Protection

The solution must never be included in:

- Public case responses.
- Frontend state before the solution is authorized for display.
- HTML source.
- Client-side JavaScript bundles.
- Browser storage.
- Public logs.
- Unprotected API endpoints.

The backend must use separate public-case serialization and solution-reveal logic.

---

# 16. APPLICATION STATE AND ERROR HANDLING

## 16.1 Loading States

Provide explicit loading states for:

- Authentication.
- Mystery generation.
- Dashboard retrieval.
- Case retrieval.
- Evidence retrieval.
- Notebook updates.
- Accusation submission.
- Solution reveal.

Prevent duplicate submissions while an operation is in progress.

## 16.2 Empty States

Provide meaningful empty states for:

- No mysteries created.
- No saved evidence.
- No discovered clues.
- No notebook entries.
- No search results.

## 16.3 Error States

Handle:

- Network disconnection.
- Expired authentication.
- Missing case.
- Unauthorized case access.
- Invalid evidence IDs.
- Gemini errors.
- Database unavailability.
- Rate limiting.
- Invalid accusation attempts.
- Duplicate submissions.

Errors must provide a useful message and an appropriate recovery action when possible.

## 16.4 Persistence

Persist:

- User account.
- Mystery.
- Evidence.
- Hidden solution.
- Accusation attempts.
- Case status.
- Reviewed evidence.
- Saved evidence.
- Notebook entries.
- Relevant timestamps.

A page refresh must not reset a user's case or accusation attempts.

---

# 17. TESTING REQUIREMENTS

## 17.1 Backend Unit Tests

Test:

- Input validation.
- Mystery schema validation.
- Suspect ID uniqueness.
- Evidence reference integrity.
- Culprit reference integrity.
- Case-state transitions.
- Accusation evaluation.
- Attempt counting.
- Solution-reveal conditions.
- User ownership.
- Authorization middleware.
- Progress updates.

## 17.2 API Integration Tests

Test:

- User registration and login.
- Mystery creation.
- Mystery retrieval.
- Mystery listing.
- Progress updates.
- Notebook CRUD operations.
- Correct accusations.
- Incorrect accusations.
- Exhausted attempts.
- Solution reveal.
- Unauthorized access.
- Invalid resource IDs.
- AI service failures.

Use a test database or isolated test environment.

Do not use production user data in automated tests.

## 17.3 Frontend Tests

Test:

- Landing-page navigation.
- Mystery creation form.
- Form validation.
- Loading states.
- Error messages.
- Suspect selection.
- Evidence filtering.
- Evidence viewer interactions.
- Notebook functionality.
- Accusation submission.
- Correct and incorrect results.
- Responsive navigation.

## 17.4 End-to-End Tests

The primary end-to-end scenario is:

1. Register or log in.
2. Create a mystery.
3. Wait for generation.
4. Open the investigation room.
5. Review evidence.
6. Save a clue.
7. Add a notebook note.
8. Select a suspect.
9. Submit an accusation.
10. Receive a result.
11. Verify the correct solution is revealed only when permitted.
12. Refresh the page.
13. Confirm that the case and its progress persist.

## 17.5 AI Evaluation Tests

Create a test suite of sample scenarios covering different categories and difficulty levels.

Evaluate generated cases for:

- Valid structured output.
- Correct suspect references.
- Unique IDs.
- One predetermined culprit.
- Evidence consistency.
- Timeline consistency.
- Plausible motives.
- Logical solvability.
- Appropriate difficulty.
- Consistency between the solution and final explanation.

AI output quality should be measured through repeatable evaluation criteria rather than subjective inspection alone.

---

# 18. ACCEPTANCE CRITERIA

The MVP is considered complete only when all critical requirements below pass.

### AC-01: Mystery Creation

A user can submit a valid scenario and generate a complete investigation.

### AC-02: Valid Case

Every successfully generated case contains a title, summary, suspects, evidence, clues, timeline, and hidden solution.

### AC-03: Single Culprit

Every case has exactly one predetermined culprit whose ID matches an existing suspect.

### AC-04: Evidence Variety

The application supports chat, image, CCTV, document, statement, and timeline evidence representations.

### AC-05: Honest Media Representation

The application never claims that simulated footage is actual generated video.

### AC-06: Investigation Interface

Users can browse suspects and evidence through a functional investigation workspace.

### AC-07: Notebook

Users can save notes and evidence references, and those changes persist.

### AC-08: Deterministic Evaluation

The same selected suspect produces the same correctness outcome for the same unchanged mystery.

### AC-09: Attempt Limits

The backend enforces the maximum number of accusation attempts.

### AC-10: Solution Security

The hidden solution cannot be obtained from public case APIs before the reveal condition.

### AC-11: Authorization

Users cannot read or modify another user's private cases.

### AC-12: AI Failure Recovery

Generation errors are handled without crashing the application or losing the original scenario.

### AC-13: Responsive Design

Core workflows function on mobile, tablet, and desktop screens.

### AC-14: Persistence

Cases and investigation progress survive page refreshes and new sessions.

### AC-15: Security

Secrets remain server-side, inputs are validated, and protected API operations require authorization.

### AC-16: Reproducible Setup

A developer can configure the project using the README and environment templates.

### AC-17: Automated Testing

Critical backend logic and case-resolution rules are covered by automated tests.

### AC-18: Production Build

The frontend builds successfully, the backend starts correctly, and the application can be deployed using documented configuration.

---

# 19. IMPLEMENTATION PHASES

Codex must implement the application in the following order.

## Phase 1: Project Foundation

- Create the monorepo.
- Configure React and Express.
- Configure MongoDB.
- Set up environment validation.
- Create shared error-handling conventions.
- Add health checks.
- Configure linting and testing.
- Create the README and `.env.example` files.

**Completion condition:** Both applications start successfully and the backend connects to the configured database.

## Phase 2: Authentication and Persistence

- Implement authentication.
- Create the user model.
- Create the mystery model.
- Implement authorization middleware.
- Add ownership checks.
- Create initial API tests.

**Completion condition:** Users can authenticate and access only their own private resources.

## Phase 3: Mystery Generation

- Integrate Gemini.
- Implement structured prompts.
- Define generation schemas.
- Validate generated content.
- Implement bounded repair attempts.
- Store validated cases.
- Implement public-case serialization.
- Add deterministic solution storage.

**Completion condition:** Valid cases can be generated, persisted, and retrieved without exposing the solution.

## Phase 4: Core Frontend

- Build the landing page.
- Build the dashboard.
- Build the mystery creation page.
- Implement API integration.
- Implement loading and error states.
- Add responsive layouts.

**Completion condition:** A user can create a case and reach the investigation room.

## Phase 5: Investigation Experience

- Build the case overview.
- Build suspect cards and profiles.
- Build the evidence viewer.
- Implement chat evidence.
- Implement document evidence.
- Implement image evidence.
- Implement simulated CCTV.
- Implement the investigation timeline.
- Implement evidence filtering and search.

**Completion condition:** Users can investigate a generated case through the supported evidence interfaces.

## Phase 6: Notebook and Progress

- Implement reviewed evidence.
- Implement saved evidence.
- Implement clue tracking.
- Implement notebook CRUD.
- Persist progress.

**Completion condition:** Investigation progress survives refreshes and authenticated sessions.

## Phase 7: Accusation and Resolution

- Implement suspect selection.
- Implement accusation API.
- Implement deterministic evaluation.
- Implement attempt limits.
- Implement correct and incorrect outcomes.
- Implement solution reveal.
- Test concurrency and state transitions.

**Completion condition:** The entire mystery-solving loop works correctly.

## Phase 8: Quality and Deployment

- Run unit tests.
- Run integration tests.
- Run end-to-end tests.
- Test mobile layouts.
- Review authorization.
- Review solution exposure.
- Review environment configuration.
- Document deployment.
- Fix critical defects.

**Completion condition:** All critical acceptance criteria pass.

---

# 20. ENVIRONMENT VARIABLES

Create separate environment templates for the frontend and backend.

## Backend `.env.example`

MONGODB_URI=

GEMINI_API_KEY=

GEMINI_MODEL=

PORT=5000

NODE_ENV=development

CLIENT_URL=http://localhost:5173

SESSION_SECRET=

Additional variables may be added for the selected authentication and media-storage providers.

Every required production variable must be documented.

The application must fail clearly when a mandatory environment variable is missing.

Never commit a populated `.env` file.

## Frontend `.env.example`

VITE_API_BASE_URL=http://localhost:5000/api/v1

Only public configuration belongs in the frontend environment.

Never place `GEMINI_API_KEY`, `MONGODB_URI`, or session secrets in frontend environment variables.

---

# 21. DEVELOPMENT RULES FOR CODEX

These rules are mandatory throughout implementation.

## Rule 1: This Specification Is the Source of Truth

Treat `SPEC.md` as the canonical product and technical specification.

Do not silently change gameplay rules, API contracts, security requirements, or the database model.

## Rule 2: Inspect Before Implementing

Before creating or modifying files:

- Inspect the existing repository.
- Read `SPEC.md`.
- Review existing package manifests.
- Identify implemented functionality.
- Identify missing functionality.
- Preserve working code unless changes are necessary.

Do not overwrite an existing project blindly.

## Rule 3: Implement Complete Features

Do not stop at static UI mockups.

Each implemented feature must include the necessary frontend, backend, validation, persistence, and error handling.

If a feature is intentionally mocked, clearly label it and document the limitation.

## Rule 4: Keep Responsibilities Separate

Use distinct modules for:

- Routes.
- Controllers.
- Services.
- Models.
- Validators.
- AI prompts.
- Authentication.
- Error handling.

Do not place the entire application in a single file.

## Rule 5: Never Expose the Culprit Prematurely

Treat the hidden solution as server-only data until the reveal condition is satisfied.

Use explicit response serializers to separate public and private mystery information.

## Rule 6: Do Not Trust AI Output

Validate all generated content.

Never assume that Gemini will always return valid JSON, unique IDs, consistent evidence, or a logically correct mystery.

## Rule 7: Deterministic Game Logic

Use application code for accusation evaluation, attempt counting, case-state transitions, and reveal permissions.

Do not use an additional AI request to determine whether the user's accusation is correct.

## Rule 8: No Fake Integrations

Do not claim that image generation, video generation, authentication, or persistence is functional unless it has actually been implemented and tested.

Use documented fallbacks when external capabilities are unavailable.

## Rule 9: Test Critical Changes

Whenever a change affects authentication, authorization, case generation, data persistence, accusation evaluation, or solution security, add or update appropriate tests.

Run relevant tests before considering the change complete.

## Rule 10: Maintain Documentation

Update the README when setup commands, dependencies, environment variables, or operational behavior change.

Update this specification only when a deliberate product or architectural decision requires a change.

## Rule 11: Avoid Unnecessary Dependencies

Use the existing stack and established dependencies.

Add new libraries only when they provide a clear benefit.

## Rule 12: Finish Each Phase Properly

After completing a phase:

- Summarize what was implemented.
- Identify files created or modified.
- Report tests executed and their results.
- List unresolved limitations.
- Verify the phase's completion condition.

Do not describe untested functionality as fully working.

---

# 22. DEFINITION OF DONE

The project is complete when:

1. The user can create an account and log in.
2. The user can submit a story and generate a mystery.
3. The AI generates interconnected suspects and evidence.
4. Each mystery has one fixed, stored culprit.
5. The investigation room supports the required evidence types.
6. The user can investigate, save evidence, and take notes.
7. Progress persists across sessions.
8. The user can accuse a suspect.
9. The backend evaluates the accusation deterministically.
10. The application enforces attempt limits.
11. The correct solution is revealed only when permitted.
12. The application is responsive and accessible.
13. Critical API, security, and gameplay tests pass.
14. Environment variables and deployment instructions are documented.
15. No critical acceptance criterion remains unmet.

---

# 23. FINAL PRODUCT PRINCIPLE

**AI creates the mystery. Evidence supports the truth. The user solves the case. The backend protects the answer.**

Every technical and design decision must reinforce this principle.

The experience must feel like a detective solving a carefully constructed mystery, not a chatbot inventing clues without consistency.

A smaller, coherent mystery with strong evidence is better than a large, visually impressive mystery with contradictory clues.

The quality of the investigation depends on the relationship between the culprit, motive, timeline, evidence, and final explanation.

That relationship is the foundation of AI Mystery Room.