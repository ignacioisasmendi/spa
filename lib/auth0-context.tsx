'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  Auth0Client,
  Auth0ClientOptions,
  User,
  GetTokenSilentlyOptions,
  RedirectLoginOptions,
  LogoutOptions,
} from '@auth0/auth0-spa-js';

interface Auth0ContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
  error: Error | undefined;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  getAccessTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<string>;
  handleRedirectCallback: () => Promise<void>;
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined);

interface Auth0ProviderProps {
  children: ReactNode;
  domain: string;
  clientId: string;
  redirectUri: string;
  audience?: string;
  scope?: string;
  useRefreshTokens?: boolean;
  cacheLocation?: 'memory' | 'localstorage';
}

export function Auth0Provider({
  children,
  domain,
  clientId,
  redirectUri,
  audience,
  scope = 'openid profile email',
  useRefreshTokens = true,
  cacheLocation = 'memory',
}: Auth0ProviderProps) {
  const [auth0Client, setAuth0Client] = useState<Auth0Client | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const initAuth0 = async () => {
      try {
        const auth0Config: Auth0ClientOptions = {
          domain,
          clientId,
          authorizationParams: {
            redirect_uri: redirectUri,
            ...(audience && { audience }),
            scope,
          },
          useRefreshTokens,
          cacheLocation,
        };

        const client = new Auth0Client(auth0Config);
        setAuth0Client(client);

        // Check if user is authenticated
        const isAuth = await client.isAuthenticated();
        setIsAuthenticated(isAuth);

        if (isAuth) {
          const userProfile = await client.getUser();
          setUser(userProfile);
        }
      } catch (err) {
        console.error('Error initializing Auth0:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    initAuth0();
  }, [domain, clientId, redirectUri, audience, scope, useRefreshTokens, cacheLocation]);

  const loginWithRedirect = async (options?: RedirectLoginOptions) => {
    if (!auth0Client) {
      throw new Error('Auth0 client not initialized');
    }
    try {
      await auth0Client.loginWithRedirect({
        ...options,
        authorizationParams: {
          ...options?.authorizationParams,
          redirect_uri: redirectUri,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err : new Error('Login failed'));
      throw err;
    }
  };

  const logout = async (options?: LogoutOptions) => {
    if (!auth0Client) {
      throw new Error('Auth0 client not initialized');
    }
    try {
      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
          ...options?.logoutParams,
        },
      });
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err : new Error('Logout failed'));
      throw err;
    }
  };

  const getAccessTokenSilently = async (
    options?: GetTokenSilentlyOptions
  ): Promise<string> => {
    if (!auth0Client) {
      throw new Error('Auth0 client not initialized');
    }
    try {
      return await auth0Client.getTokenSilently(options);
    } catch (err) {
      console.error('Token error:', err);
      setError(err instanceof Error ? err : new Error('Failed to get token'));
      throw err;
    }
  };

  const handleRedirectCallback = async () => {
    if (!auth0Client) {
      throw new Error('Auth0 client not initialized');
    }
    try {
      setIsLoading(true);
      await auth0Client.handleRedirectCallback();
      
      const isAuth = await auth0Client.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        const userProfile = await auth0Client.getUser();
        setUser(userProfile);
      }
    } catch (err) {
      console.error('Callback error:', err);
      setError(err instanceof Error ? err : new Error('Callback handling failed'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value: Auth0ContextType = {
    isAuthenticated,
    isLoading,
    user,
    error,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    handleRedirectCallback,
  };

  return <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>;
}

export function useAuth0() {
  const context = useContext(Auth0Context);
  if (context === undefined) {
    throw new Error('useAuth0 must be used within an Auth0Provider');
  }
  return context;
}
