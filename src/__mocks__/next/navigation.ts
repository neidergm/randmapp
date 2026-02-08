export const useRouter = jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
}));

export const useSearchParams = jest.fn(() => new URLSearchParams());

export const usePathname = jest.fn(() => '/');

export const redirect = jest.fn();

export const RedirectType = { push: 'push', replace: 'replace' };
