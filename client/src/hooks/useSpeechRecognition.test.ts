import { renderHook, act } from '@testing-library/react';
import { useSpeechRecognition } from './useSpeechRecognition';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock SpeechRecognition
const mockStart = vi.fn();
const mockStop = vi.fn();

(window as any).SpeechRecognition = vi.fn(function () {
  this.start = mockStart;
  this.stop = mockStop;
  this.continuous = false;
  this.interimResults = false;
  this.onresult = null;
});

describe('useSpeechRecognition', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should toggle recording state', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.isRecording).toBe(false);

    act(() => {
      result.current.startRecording();
    });

    expect(result.current.isRecording).toBe(true);
    expect(mockStart).toHaveBeenCalled();

    act(() => {
      result.current.stopRecording();
    });

    expect(result.current.isRecording).toBe(false);
    expect(mockStop).toHaveBeenCalled();
  });
});
