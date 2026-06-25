'use client';

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { loginWithPassword, logout } from "../lib/auth/authService";
import { setCredentials, clearCredentials, AuthUser } from "../store/authSlice";
import { getAccessToken } from "../lib/auth/tokenStorage";

export type SessionContextValue = {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: AuthUser | null;
	login: (args: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

const HRMS_USER_KEY = "hrms_user";

export function SessionProvider({ children }: PropsWithChildren) {
	const dispatch = useDispatch();
	const [user, setUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);
	const isAuthenticated = Boolean(user);

	// On first load, check if a token + saved user exists and rehydrate session
	useEffect(() => {
		const token = getAccessToken();
		if (token) {
			const stored = window.localStorage.getItem(HRMS_USER_KEY);
			if (stored) {
				try {
					const parsed: AuthUser = JSON.parse(stored);
					setUser(parsed);
					dispatch(setCredentials({ user: parsed }));
				} catch {
					// stored data was corrupted, ignore
				}
			}
		}
		setLoading(false);
	}, [dispatch]);

	const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
		const res = await loginWithPassword(email, password);
		const nextUser: AuthUser | null =
			res.user ? { id: res.user.id, name: res.user.name, email: res.user.email } : null;
		setUser(nextUser);
		dispatch(setCredentials({ user: nextUser }));
		// Save user to localStorage so session survives page refresh
		if (nextUser) {
			window.localStorage.setItem(HRMS_USER_KEY, JSON.stringify(nextUser));
		}
	}, [dispatch]);

	const signOut = useCallback(async () => {
		await logout();
		setUser(null);
		dispatch(clearCredentials());
		// Remove saved user on logout
		window.localStorage.removeItem(HRMS_USER_KEY);
	}, [dispatch]);

	const value = useMemo<SessionContextValue>(() => {
		return {
			isAuthenticated,
			isLoading: loading,
			user,
			login,
			logout: signOut,
		};
	}, [isAuthenticated, loading, login, signOut, user]);

	// Show a minimal loading state while checking localStorage
	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
				<div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700 dark:border-zinc-600 dark:border-t-zinc-300" />
			</div>
		);
	}

	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
	const ctx = useContext(SessionContext);
	if (!ctx) throw new Error("useSession must be used within SessionProvider");
	return ctx;
}