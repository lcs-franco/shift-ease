import { AuthContext } from "@/contexts/auth/AuthContext";
import { useApiDepartment } from "@/hooks/useApiDepartment";
import type { Department } from "@/types/department";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loader } from "./Loader";

const schema = z.object({
	name: z.string().min(1, "Name is Required!"),
	email: z.string().min(1, "Email is required!").email("Inform a valid email"),
	password: z.string().min(8, "The password must contain 8 characters"),
	departmentCode: z.string().min(1, "Department is required!"),
});
type FormFields = z.infer<typeof schema>;

export const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [departments, setDepartments] = useState<Department[]>([]);
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const apiDepartment = useMemo(() => useApiDepartment(), []);

	useEffect(() => {
		const getDepartments = async () => {
			const departmentList = await apiDepartment.getAllDepartments();
			setDepartments(departmentList || []);
		};
		getDepartments();
	}, [apiDepartment]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	const handleRegister: SubmitHandler<FormFields> = async ({
		name,
		email,
		password,
		departmentCode,
	}) => {
		setIsLoading(true);
		setError(null);
		try {
			const isRegistered = await auth.signUp(
				name,
				email,
				password,
				departmentCode,
			);
			if (isRegistered) {
				navigate("/dashboard");
			} else {
				setError("Registration has failed. Check your details.");
			}
		} catch (error) {
			setError("An error ocurred during the registration");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className=" flex flex-col w-fit gap-5 self-center"
			onSubmit={handleSubmit(handleRegister)}
		>
			<label htmlFor="name" className="text-white font-bold">
				Name:
			</label>
			<input
				{...register("name")}
				type="text"
				placeholder="Name"
				className="bg-white p-2 rounded-md"
				disabled={isLoading}
			/>
			{errors.name?.message && (
				<div className="text-red-500">{errors.name.message}</div>
			)}

			<label htmlFor="email" className="text-white  font-bold">
				Email:
			</label>
			<input
				{...register("email")}
				type="text"
				placeholder="Email"
				className="bg-white p-2 rounded-md"
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
			/>
			{errors.password?.message && (
				<div className="text-red-500">{errors.password.message}</div>
			)}

			<label htmlFor="departmentCode" className="text-white font-bold">
				Department
			</label>
			<select
				{...register("departmentCode")}
				className="bg-white p-2 rounded-md"
				disabled={isLoading}
			>
				{departments?.map((department) => (
					<option key={department.code} value={department.code}>
						{department.name}
					</option>
				))}
			</select>
			{errors.departmentCode?.message && (
				<div className="text-red-500">{errors.departmentCode.message}</div>
			)}

			{error && <div className="text-red-500">{error}</div>}
			{isLoading ? (
				<Loader />
			) : (
				<button
					type="submit"
					className="bg-amber-600 rounded-md p-2 font-bold text-white"
				>
					Register
				</button>
			)}

			<p className="text-white">
				Already have an account?{" "}
				<Link to={"/login"} className="text-orange-600 font-bold">
					Sign In
				</Link>
			</p>
		</form>
	);
};
