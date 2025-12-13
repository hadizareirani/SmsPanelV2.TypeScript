import { beforeEach, afterEach, vi } from 'vitest';
import { Smsir } from '../../src/index';

/**
 * Creates a test instance of Smsir with test credentials
 * @returns Smsir instance for testing
 */
export function createTestSmsir(): Smsir {
  return new Smsir('test-api-key', 30007732000000);
}

/**
 * Sets up common test hooks for Smsir tests
 * Clears mocks before each test and restores them after
 * 
 * @example
 * ```typescript
 * describe("My Test", () => {
 *   const { getSmsir } = setupSmsirTest();
 *   
 *   test("my test", () => {
 *     const smsir = getSmsir();
 *     // use smsir
 *   });
 * });
 * ```
 */
export function setupSmsirTest() {
  let smsir: Smsir;

  beforeEach(() => {
    smsir = createTestSmsir();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  return {
    getSmsir: () => smsir,
  };
}

/**
 * Creates a mock fetch response
 * @param data - The response data
 * @param status - HTTP status code (default: 1)
 * @param message - Response message (default: "success")
 */
export function createMockResponse<T>(
  data: T,
  status: number = 1,
  message: string = 'عملیات با موفقیت انجام شد'
) {
  return {
    status,
    message,
    data,
  };
}

/**
 * Mocks the global fetch function with a successful response
 * @param responseData - The data to return in the response
 */
export function mockFetchSuccess<T>(responseData: T) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => responseData,
  });
}

/**
 * Mocks the global fetch function with an error response
 * @param statusCode - HTTP status code (default: 401)
 */
export function mockFetchError(statusCode: number = 401) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: statusCode,
  });
}

/**
 * Mocks the global fetch function with a network error
 * @param errorMessage - Error message (default: "Network error")
 */
export function mockFetchNetworkError(errorMessage: string = 'Network error') {
  global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));
}
