import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './useAuth';
import { renderHook } from '@testing-library/react';

// Mock the API service
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('useAuth hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default loading state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: BrowserRouter,
    });
    expect(result.current.isLoading).toBe(false);
  });
});
