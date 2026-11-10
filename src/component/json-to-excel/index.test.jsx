// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

vi.mock('file-saver', () => ({ default: vi.fn() }));
import saveAs from 'file-saver';
import { JsonToExcel, exportToExcel } from './index.jsx';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('JsonToExcel', () => {
  it('renders without an "undefined" class and downloads on click', () => {
    render(<JsonToExcel data={[{ a: 1 }]} fileName='f' />);
    const btn = screen.getByRole('button', { name: 'Download' });
    expect(btn.className).not.toContain('undefined');
    fireEvent.click(btn);
    expect(saveAs).toHaveBeenCalledTimes(1);
    expect(saveAs.mock.calls[0][1]).toBe('f.xlsx');
  });
});

describe('exportToExcel', () => {
  it('defaults the file name', () => {
    exportToExcel([{ a: 1 }]);
    expect(saveAs.mock.calls[0][1]).toBe('download.xlsx');
  });

  it('handles multiple sheets with invalid/duplicate names', () => {
    expect(() =>
      exportToExcel(
        [
          { sheetName: 'a/b', details: [{ x: 1 }] },
          { sheetName: 'a/b', details: [{ x: 2 }] },
          { sheetName: 'x'.repeat(40), details: [] },
        ],
        'm',
        true
      )
    ).not.toThrow();
    expect(saveAs).toHaveBeenCalledTimes(1);
  });

  it('rejects non-array data', () => {
    expect(() => exportToExcel({}, 'x')).toThrow(TypeError);
  });
});
