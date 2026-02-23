# Lendsqr Frontend Assessment (React + TypeScript + Vite)

This project is a responsive frontend implementation of the Lendsqr assessment UI, built with React, TypeScript, SCSS modules, and Vite.

It includes:
- Login flow with validation
- Protected routes
- Shared app layout (topbar + sidebar)
- Users dashboard (stats + table)
- User details page
- Responsive behavior across desktop/tablet/mobile
- Dashboard search (topbar-driven)
- Dashboard table filtering (multi-criteria)
- Unit testing with Vitest + React Testing Library

## Stack

- React 19
- TypeScript
- Vite
- React Router
- SCSS Modules
- Zod (form validation)
- React Hot Toast (notifications)
- Vitest
- React Testing Library
- JSDOM

## Getting Started

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Install

```bash
npm install
```

## Run (Development)

```bash
npm run dev
```

App starts at the Vite local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    Layout/
      AppLayout.tsx
      AppLayout.module.scss
      layoutConfig.ts
    common/
      UsersTable.tsx
      UsersTable.module.scss
      usersTable.utils.ts
  data/
    usersApi.ts
    userStore.ts
  pages/
    Login/
      login.utils.ts
    Dashboard/
      dashboardSearch.utils.ts
    UserDetail/
  routes/
    RequireAuth.tsx
  styles/
    global.scss
    variables.scss
    mixins.scss
  test/
    setup.ts
public/
  users.json
```

## Feature Walkthrough

## 1) Login

- Email + password form with Zod validation.
- Password visibility toggle (`SHOW` / `HIDE`).
- Auth check against records from `public/users.json`.
- On success:
  - stores `auth=true`
  - stores `authUser` (email)
  - stores `authFirstName` (for topbar display)
  - navigates to `/dashboard`

Main file:
- `src/pages/Login/Login.tsx`

## 2) Route Protection

- `RequireAuth` guards protected routes using `localStorage.auth`.
- Unauthenticated users are redirected to `/login`.

Main file:
- `src/routes/RequireAuth.tsx`

## 3) Shared Layout Refactor

Topbar + sidebar were extracted into a reusable layout so pages are children of a single shell.

Implemented with nested routing:
- `/dashboard`
- `/user-detail/:id`

Main files:
- `src/components/Layout/AppLayout.tsx`
- `src/components/Layout/AppLayout.module.scss`
- `src/components/Layout/layoutConfig.ts`
- `src/App.tsx`

## 4) Topbar Improvements

- Search input width constrained to match Figma (does not grow on large screens).
- Route-aware search placeholder:
  - dashboard/detail context uses `Search users`.
- Logged-in profile label displays dynamic first name from `authFirstName`.

## 5) Sidebar Behavior

- Active nav styling aligned to Figma.
- Full-width active highlight (no right inset gap).
- `Switch Organization` label preserved on one line.
- Mobile drawer sidebar added:
  - menu icon opens
  - X icon closes
  - backdrop tap closes

## 6) Dashboard

- Stats cards derived from loaded users:
  - Users
  - Active Users
  - Users with Loans
  - Users with Savings
- Users table with pagination and row actions menu.

Main file:
- `src/pages/Dashboard/Dashboard.tsx`

## 7) User Details

- Loads selected user by route `:id` from local store or fetched list.
- Sectioned details:
  - Personal Information
  - Education and Employment
  - Socials
  - Guarantor
- Layout and spacing adjusted to align with provided Figma screenshots.

Main file:
- `src/pages/UserDetail/UserDetail.tsx`

## 8) Dashboard Search

Search is driven from topbar and applied on dashboard users list.

Search fields:
- organization name
- username
- full name
- email
- phone number
- BVN
- status

Behavior:
- case-insensitive
- partial matching

## 9) Dashboard Filtering

Filter panel now works with real form state and applies AND-combined criteria:

- Organization (exact)
- Username (contains)
- Email (contains)
- Date joined (exact day)
- Phone number (digit contains)
- Status (exact)

Buttons:
- `Filter` applies selected filters and resets to page 1
- `Reset` clears all filters and resets to page 1

Pagination reflects filtered rows.

Main file:
- `src/components/common/UsersTable.tsx`
- `src/components/common/usersTable.utils.ts`

## 10) Responsiveness

Completed responsive pass across:
- Login
- Shared layout/topbar/sidebar
- Dashboard
- User detail
- Users table

Includes:
- breakpoint-specific spacing
- mobile sidebar drawer
- topbar item reflow
- mobile-safe table scrolling behavior
- desktop overflow fixes

## 11) Testing

Test tooling was added and configured with `jsdom`:
- Vitest
- React Testing Library
- `@testing-library/jest-dom`

Current test coverage includes:
- Login schema validation (positive + negative)
- Login first-name extraction helper
- Dashboard search helper
- Users table pagination helper
- Users table filtering helper (including AND-combined filters)
- Users table filter panel integration behavior (apply + reset)

Test files:
- `src/utils/schema.test.ts`
- `src/pages/Login/login.utils.test.ts`
- `src/pages/Dashboard/dashboardSearch.utils.test.ts`
- `src/components/common/usersTable.utils.test.ts`
- `src/components/common/UsersTable.test.tsx`

## Data Source and State

- Data source: `public/users.json`
- API adapter: `src/data/usersApi.ts`
- User detail cache: `src/data/userStore.ts`
- Auth/session state: `localStorage`

## Available Scripts

- `npm run dev` - start dev server
- `npm run build` - type-check + production build
- `npm run lint` - run ESLint
- `npm run test` - run unit/integration tests once
- `npm run test:watch` - run tests in watch mode
- `npm run preview` - preview production build

## Suggested Next Improvements

1. Connect filter/search state to URL query params for shareable views.
2. Add higher-level integration tests for login + protected route flow.
3. Add visual regression checks for stricter Figma parity validation.
4. Migrate Sass `@import` usage to `@use`/`@forward` to address Sass deprecation warnings.
