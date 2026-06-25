import { z } from "zod";
import { clearAccessToken, clearRefreshToken, getAccessToken, refreshAccessTokenSilently, setAccessToken, setRefreshToken } from "./tokenStorage";

const LoginResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string().optional(),
	user: z
		.object({
			id: z.union([z.string(), z.number()]).transform(String),
			email: z.string().email().optional(),
			name: z.string().optional(),
			// extend as needed
		})
		.optional(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// ---------------------------------------------------------------------------
// Dev / mock credentials – used when the backend /auth/login is unreachable.
// Remove this block once the backend auth controller is implemented.
// ---------------------------------------------------------------------------
interface MockUser {
	id: string;
	email: string;
	name: string;
	password: string;
	role: string;
}

const MOCK_USERS: MockUser[] = [
	{
		id: "usr_admin_001",
		email: "admin@propvivo.com",
		password: "Admin@123",
		name: "Admin User",
		role: "Admin",
	},
	{
		id: "usr_test_001",
		email: "test@propvivo.com",
		password: "Test@123",
		name: "Test Employee",
		role: "Employee",
	},
];

function generateMockJwt(user: MockUser): string {
	// Create a simple base64-encoded token (NOT cryptographically secure – dev only)
	const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
	const payload = btoa(
		JSON.stringify({
			sub: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			iat: Math.floor(Date.now() / 1000),
			exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
		}),
	);
	const signature = btoa("dev-signature");
	return `${header}.${payload}.${signature}`;
}

function mockLogin(email: string, password: string): LoginResponse {
	const user = MOCK_USERS.find(
		(u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
	);
	if (!user) {
		throw new Error("Invalid email or password");
	}
	return {
		accessToken: generateMockJwt(user),
		refreshToken: `refresh_${user.id}_${Date.now()}`,
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
		},
	};
}

// ---------------------------------------------------------------------------

export async function loginWithPassword(email: string, password: string): Promise<LoginResponse> {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	// Attempt real backend login if API URL is configured
	if (baseUrl) {
		try {
			const res = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});
			if (res.ok) {
				const data = await res.json();
				const parsed = LoginResponseSchema.parse(data);
				setAccessToken(parsed.accessToken);
				if (parsed.refreshToken) setRefreshToken(parsed.refreshToken);
				return parsed;
			}
			// If the backend explicitly rejected credentials (401/403), throw immediately
			if (res.status === 401 || res.status === 403) {
				const message = await safeErrorMessage(res);
				throw new Error(message);
			}
			// For other errors (404, 500) fall through to mock auth in dev
		} catch (err: any) {
			// Network errors or non-auth HTTP errors → fall through to mock in dev
			if (err?.message === "Invalid email or password" || err?.message?.includes("401") || err?.message?.includes("403")) {
				throw err;
			}
			console.warn("[Auth] Backend /auth/login unreachable, using dev mock auth:", err?.message);
		}
	}

	// Fallback: dev mock authentication
	console.info("[Auth] Using development mock authentication");
	const result = mockLogin(email, password);
	setAccessToken(result.accessToken);
	if (result.refreshToken) setRefreshToken(result.refreshToken);
	return result;
}

export async function logout() {
	clearAccessToken();
	clearRefreshToken();
}

export async function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit, retryOn401 = true) {
	const withAuth = async (): Promise<Response> => {
		const token = getAccessToken();
		const headers = new Headers(init?.headers || {});
		if (token) headers.set("Authorization", `Bearer ${token}`);
		return fetch(input, { ...init, headers, credentials: "include" });
	};
	let res = await withAuth();
	if (res.status === 401 && retryOn401) {
		const token = await refreshAccessTokenSilently();
		if (token) {
			res = await withAuth();
		}
	}
	return res;
}

async function safeErrorMessage(res: Response): Promise<string> {
	try {
		const data = (await res.json());
		return data?.message || `Request failed with status ${res.status}`;
	} catch {
		return `Request failed with status ${res.status}`;
	}
}
