<img src="./datasite-logo.svg" width="225">

---

## 📋 For Datasite Engineers & Engineering Directors

> **Action required:** Before sharing this repository with a candidate, replace the **Take-Home Challenge** section below with the specific challenge you want the candidate to complete. Use the placeholder comments as a guide for what to include.

When defining a challenge, consider covering:

- **Context** — a brief description of the problem domain (e.g. a simplified version of a real Datasite workflow)
- **Requirements** — functional and non-functional requirements the candidate must address
- **Deliverables** — what the candidate should submit (e.g. a PR, a written design doc, a working prototype)
- **Evaluation criteria** — what you will assess (e.g. system design, code quality, scalability, trade-offs)
- **Time expectation** — a recommended time budget so candidates can scope their effort appropriately
- **Submission instructions** — how and where to submit (e.g. fork the repo and open a PR, email a zip, etc.)

Once the challenge is defined, remove this internal guidance block before sending the repo to the candidate.

---

## 🏗️ Take-Home Architecture Challenge — Senior Engineer

<!-- TODO (Engineering Director / Hiring Manager): Replace this section with your challenge brief. -->
<!-- Describe the problem, requirements, deliverables, evaluation criteria, time budget, and submission instructions. -->

> **[Challenge details to be added by the hiring team]**

---

## Run tasks

To run the dev server for each app, use:

**Frontend (React):**

```sh
npx nx serve datasite
```

**API (Express):**

```sh
npx nx serve api
```

**API (NestJS):**

```sh
npx nx serve nest-api
```

To create a production bundle:

```sh
npx nx build <app-name>
```

For example: `npx nx build datasite`

To run all services simultaneously (frontend and Express API), use:

```sh
npm run dev
```
