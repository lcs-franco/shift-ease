import type { Role } from "@/types/enums";
import { createContext } from "react";

export type contextUser = {
	id: string;
	email: string;
	name: string;
	role: Role;
	department_id: string;
};

export type AuthContextType = {
	user: contextUser | null;
	signIn: (email: string, password: string) => Promise<boolean>;
	signOut: () => void;
	signUp: (
		name: string,
		email: string,
		password: string,
		departmentCode: string,
	) => Promise<boolean>;
};
const defaultContextValue: AuthContextType = {
	user: null,
	signIn: async () => false,
	signOut: () => {},
	signUp: async () => false,
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
