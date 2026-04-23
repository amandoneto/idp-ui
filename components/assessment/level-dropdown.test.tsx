import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LevelDropdown } from './level-dropdown';
import { AssessmentLevel } from '@/types/assessment';
import { TooltipProvider } from '@/components/ui/tooltip';

const mockLevels: AssessmentLevel[] = [
  { value: 1, description: 'Basic Knowledge' },
  { value: 2, description: 'Intermediate Knowledge' },
  { value: 3, description: 'Advanced Knowledge' },
];

describe('LevelDropdown', () => {
  it('renders correctly with no selection', () => {
    render(
      <TooltipProvider>
        <LevelDropdown levels={mockLevels} value={null} onChange={() => {}} />
      </TooltipProvider>
    );
    expect(screen.getByText(/Select.../i)).toBeDefined();
  });

  it('renders selected value', () => {
    render(
      <TooltipProvider>
        <LevelDropdown levels={mockLevels} value={2} onChange={() => {}} />
      </TooltipProvider>
    );
    expect(screen.getByText('2')).toBeDefined();
  });

  it('calls onChange when a level is selected', async () => {
    const handleChange = vi.fn();
    render(
      <TooltipProvider>
        <LevelDropdown levels={mockLevels} value={null} onChange={handleChange} />
      </TooltipProvider>
    );

    // Click trigger
    fireEvent.click(screen.getByRole('combobox'));

    // Find and click Level 3
    const level3 = await screen.findByText(/Level 3/i);
    fireEvent.click(level3);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <TooltipProvider>
        <LevelDropdown levels={mockLevels} value={2} onChange={() => {}} disabled={true} />
      </TooltipProvider>
    );
    const button = screen.getByRole('combobox');
    expect(button).toBeDisabled();
  });
});
