import { TextDecoder, TextEncoder  } from "node:util";

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  matchMedia: {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  },
  IntersectionObserver: {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
    })),
  }
});
