import { AuthContext } from "@/contexts/auth/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loader } from "./Loader";

const schema = z.object({
	email: z.string().min(1, "Email is required!").email("Inform a valid email"),
	password: z.string().min(8, "The password must contain 8 characters"),
});
type FormFields = z.infer<typeof schema>;

export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	const handleLogin: SubmitHandler<FormFields> = async ({
		email,
		password,
	}) => {
		setIsLoading(true);
		setError(null);
		if (email && password) {
			const isLogged = await auth.signIn(email, password);
			if (isLogged) {
				navigate("/dashboard");
			} else {
				setError("Invalid email or password");
			}
		}
		setIsLoading(false);
	};

	return (
		<form
			className=" flex flex-col w-fit gap-5 self-center"
			onSubmit={handleSubmit(handleLogin)}
		>
			<label htmlFor="email" className="text-white  font-bold">
				Email:
			</label>
			<input
				{...register("email")}
				type="text"
				placeholder="Email"
				className="bg-white p-2 rounded-md"
				disabled={isLoading}
			/>
			{errors.email?.message && (
				<div className="text-red-500">{errors.email.message}</div>
			)}
			<label htmlFor="password" className="text-white  font-bold">
				Password:
			</label>
			<input
				{...register("password")}
				type="password"
				placeholder="Password"
				className="bg-white p-2 rounded-md"
				disabled={isLoading}
			/>
			{errors.password?.message && (
				<div className="text-red-500">{errors.password.message}</div>
			)}
			{error && <div className="text-red-500">{error}</div>}
			{isLoading ? (
				<Loader />
			) : (
				<button
					type="submit"
					className="bg-amber-600 rounded-md p-2 font-bold text-white"
				>
					Login
				</button>
			)}

			<p className="text-white">
				If you don't have an account:{" "}
				<Link to={"/register"} className="text-orange-600 font-bold">
					Sign Up
				</Link>
			</p>
		</form>
	);
};
