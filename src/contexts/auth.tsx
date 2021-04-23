// External
import React, { createContext, useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

// APIs
import {
  clearAuthHeader,
  setAuthHeader,
  registerUser,
  loginUser,
  socialLoginUser,
  verifyUser,
  socialRegisterUser,
} from "../api";

// Contexts
import { useApp } from "./app";

// Constants
import { unauthRoutes } from "../constants";

// Custom Component
import Loading from "../components/Loading";

// @ts-ignore
const context = createContext<Context>({});

export enum AuthState {
  "pending",
  "unAuthenticated",
  "authenticated",
}

export enum Roles {
  USERS = "users",
  ARTIST = "artist",
  STUDIO = "studio_manager",
  REGULAR = "regular",
}

/*
 Auth Flow: (TODO)

 - on app start ( when this component is mounted ):
   - call api /me to find if the localstorage token is still valid, if it is ( mark user as logged in & do nothing )
  - if token is missing or invalid: mark user as not logged in & redirect to '/login', while saving the page he was on ( or trying to access )
  - once he's logged in ( save token , mark as logged in & redirect to the page he was trying to access )
*/
export function AuthContext({ children }: Props) {
  const router = useRouter();
  const app = useApp();

  const user = useRef<User | undefined>(undefined);
  const [status, setStatus] = useState<AuthState>(AuthState.pending);
  const [previousPath, setPreviousPath] = useState("");

  // Normal login, by email and password
  async function login(email: string, password: string, preventRedirect = false): Promise<RestApi.Response> {
    try {
      const response = await loginUser(email, password);
      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        user.current = data.user;

        localStorage.setItem(TOKEN_KEY, data.auth_token);
        setAuthHeader(data.auth_token);

        // Update status
        setStatus(AuthState.authenticated);

        if (!preventRedirect) {
          // If user went to specific before
          if (previousPath !== "") {
            router.push(previousPath);
          } else {
            // Go to home page
            router.push("/dashboard");
          }
        }
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Login fail");
      }

      return response;
    } catch (error) {
      app.showErrorDialog(true, "Internal server. Please try again");
      // Unknown issue or code issues
      return { error: true, data: null, errors: "Internal server. Please try again" };
    }
  }

  // Login by token
  async function loginByToken(token: string, redirectAfterSuccess = true) {
    try {
      verifyUser(token)
        .then(({ data }) => {
          user.current = data;

          localStorage.setItem(TOKEN_KEY, token);
          setAuthHeader(token);
          setStatus(AuthState.authenticated);

          // Navigate to dashboard page if redirect allowed
          if (redirectAfterSuccess) {
            router.replace("/dashboard");
          }
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          clearAuthHeader();
          setStatus(AuthState.unAuthenticated);

          // Redirect to login page
          router.replace("/login");
        });
    } catch (error) {
      app.showErrorDialog(true, "Internal server. Please try again");
    }
  }

  // Social login, by just social id
  async function socialLogin(socialId: number, email: string, preventRedirect = false): Promise<RestApi.Response> {
    try {
      const response = await socialLoginUser(socialId, email);
      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        user.current = data.user;

        localStorage.setItem(TOKEN_KEY, data.auth_token);
        setAuthHeader(data.auth_token);

        // Update status
        setStatus(AuthState.authenticated);

        if (!preventRedirect) {
          // If user went to specific before
          if (previousPath !== "") {
            router.push(previousPath);
          } else {
            // Go to home page
            router.push("/dashboard");
          }
        }
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Login fail");
      }

      return response;
    } catch (error) {
      app.showErrorDialog(true, "Internal server. Please try again");
      // Unknown issue or code issues
      return { error: true, data: null, errors: "Internal server. Please try again" };
    }
  }

  // Normal register: by email and password
  async function register(payload: Register.ApiPayload) {
    try {
      const response = await registerUser(payload);

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        localStorage.setItem(TOKEN_KEY, data.auth_token);
        setAuthHeader(data.auth_token);

        // Update status
        setStatus(AuthState.authenticated);

        user.current = data.user;

        // Navigate to register selection page
        router.push("/artists");
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }

      return response;
    } catch (error) {
      app.showErrorDialog(true, "Internal server. Please try again");
      // Unknown issue or code issues
      return { error: true, data: null, errors: "Internal server. Please try again" };
    }
  }

  // Social register, by social id and email
  async function socialRegister(payload: Register.ApiSocialPayload): Promise<RestApi.Response> {
    try {
      const response = await socialRegisterUser(payload);

      const { error, data, errors } = response;
      // No error happens
      if (!error) {
        localStorage.setItem(TOKEN_KEY, data.auth_token);
        setAuthHeader(data.auth_token);

        // Update status
        setStatus(AuthState.authenticated);

        user.current = data.user;

        // Navigate to register selection page
        router.push("/dashboard");
      } else {
        app.showErrorDialog(true, errors ? errors.toString() : "Register fail");
      }

      return response;
    } catch (error) {
      app.showErrorDialog(true, "Internal server. Please try again");
      // Unknown issue or code issues
      return { error: true, data: null, errors: "Internal server. Please try again" };
    }
  }

  function updateUserData() {
    verifyUser()
      .then(({ data }) => {
        user.current = data;
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        clearAuthHeader();
        setStatus(AuthState.unAuthenticated);

        // Redirect to login page
        router.replace("/login");
      });
  }

  function logOut() {
    // Remove token from header
    setAuthHeader("");

    // Remove saved token value in local storage
    localStorage.removeItem(TOKEN_KEY);

    // Reset user value
    user.current = undefined;

    // Update status
    setStatus(AuthState.unAuthenticated);

    // Redirect to login page
    router.replace("/login");
  }

  useEffect(() => {
    // Only save auth router
    if (unauthRoutes.indexOf(router.pathname) === -1) {
      // Store this url to get back later
      setPreviousPath(router.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    // No token available
    if (!token) {
      setStatus(AuthState.unAuthenticated);

      // Any route is not defined as unauth route will be redirected to register page
      if (unauthRoutes.indexOf(router.pathname) === -1) {
        // Store this url to get back later
        setPreviousPath(router.pathname);

        // Redirect to home page
        router.replace("/artists");
      }

      return;
    }
    setAuthHeader(token);
    verifyUser()
      .then(({ data }) => {
        user.current = data;

        setStatus(AuthState.authenticated);

        // Navigate to artist page
        //TODO: This should be home page
        // router.replace("/artists");
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        clearAuthHeader();
        setStatus(AuthState.unAuthenticated);

        // Redirect to login page
        router.replace("/login");
      });
  }, []);

  return (
    <context.Provider
      value={{
        user: user.current,
        status,
        register,
        socialRegister,
        login,
        loginByToken,
        socialLogin,
        logOut,
        updateUserData,
        previousPath,
      }}
    >
      {status === AuthState.pending ? <Loading fixed /> : null}
      {status === AuthState.authenticated ? children : null}
      {status === AuthState.unAuthenticated ? children : null}
    </context.Provider>
  );
}

export function useAuth() {
  return useContext(context);
}

interface Props {
  children: JSX.Element;
}

export type User = {
  email: string;
  id: number;
  full_name: string;
  avatar: Resource.Image;
  role: Roles;
  artist?: Resource.ArtistDetail;
  studio?: Resource.StudioDetail;
};

interface Context {
  user?: User;
  login: (email: string, password: string, preventRedirect: boolean) => Promise<RestApi.Response>;
  loginByToken: (token: string, redirectAfterSuccess: boolean) => void;
  socialLogin: (socialId: number, email: string, preventRedirect: boolean) => Promise<RestApi.Response>;
  register: (payload: Register.ApiPayload) => void;
  socialRegister: (payload: Register.ApiSocialPayload) => Promise<RestApi.Response>;
  logOut: () => void;
  status: AuthState;
  previousPath: string;
  updateUserData: () => void;
}

const TOKEN_KEY = "AUTH_TOKEN";
