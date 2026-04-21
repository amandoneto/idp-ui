# Implementation Plan - Assessment Details Page Refactor

Refactor the Assessment Details page to fetch assessment levels first, display questions in a table-like format, and add dropdown selectors for User and Tech Leader using shadcn UI components.

## Proposed Changes

### 1. API Integration
- Update `app/assessment/details/[uuid]/page.tsx` to fetch levels from `assessmentApi.getLevels()` before fetching assessment details.
- Store levels in a new state variable.

### 2. UI Components
- Replace the custom dropdown with a **shadcn Combobox** in `components/assessment/level-dropdown.tsx`:
  - Use `Popover` and `Command` components for a robust selection experience.
  - Implement **tooltips** using `@radix-ui/react-tooltip` to show level descriptions on hover.
  - Ensure `TooltipProvider` is available in `app/layout.tsx`.
  - Maintain the project's brutalist aesthetic (heavy borders, monochromatic colors).

### 3. Page Layout Refactor
- Modify `app/assessment/details/[uuid]/page.tsx`:
  - Replace the current vertical list of questions with a grid/table structure.
  - Columns: **Question**, **User Selection**, **Leader Selection** (conditional).
  - Only show the **Leader Selection** column if at least one answer in a category has a non-null `leaderLevelValue`.

### 4. Logic Updates
- Ensure `handleLevelChange` correctly handles the numeric values from the Combobox.
- Maintain and verify "Save Draft" functionality by converting level values to strings before sending to the API.

## Verification
- Verify levels are loaded sequentially before assessment details.
- Confirm tooltips appear correctly on hover in the level selection menu.
- Validate that the Leader selection column toggles correctly based on data availability.
- Ensure the "Save Draft" operation completes successfully with the new data types.
