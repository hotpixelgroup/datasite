import { renderHook, waitFor } from '@testing-library/react';
import { useHealthCheck } from './useHealthCheck';

describe('useHealthCheck', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch health check data successfully', async () => {
    const mockResponse = { status: 'ok', timestamp: '2024-01-01T00:00:00.000Z' };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useHealthCheck());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Network error');
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useHealthCheck());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toEqual(mockError);
  });

  it('should use custom URL', async () => {
    const customUrl = 'http://example.com/health';
    const mockResponse = { status: 'ok', timestamp: '2024-01-01T00:00:00.000Z' };
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    renderHook(() => useHealthCheck(customUrl));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(customUrl));
  });
});
