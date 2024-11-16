import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import userDummy from "@/data/user.json";
import { UserType } from "@/lib/types/user";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { toast } from "sonner";
import { useState } from "react";

const FormSchema = z.object({
	username: z.string().min(1, "username tidak boleh kosong"),
	password: z.string().min(1, "password tidak boleh kosong"),
});

const generateRandomToken = () => {
	return (
		Math.random().toString(36).substring(2) +
		Math.random().toString(36).substring(2)
	);
};

const LoginPage = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();

	const [errorLogin, setErrorLogin] = useState("");

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const formState = form.formState;

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		const dataUser = userDummy as UserType[];
		const findData = dataUser.find((item) => item.username === data.username);
		if (
			findData &&
			findData.username === data.username &&
			findData.password === data.password
		) {
			toast.success("Login Berhasil");
			cookies.set("dummyToken", generateRandomToken(), {
				path: "/",
				maxAge: 43200,
			});
			navigate("/");
			localStorage.setItem("user", JSON.stringify({ name: findData.name }));
		} else {
			toast.error("Login Gagal");
			setErrorLogin("Username atau Password yang anda masukkan salah!");
		}
	};

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<form
				className="space-y-5 w-[20rem] "
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<Controller
					name="username"
					control={form.control}
					render={({ field }) => (
						<TextInput
							label="Username"
							error={formState.errors.username?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field }) => (
						<div>
							{" "}
							<Group justify="space-between" mb={5}>
								<Text component="label" htmlFor="your-password" size="sm" fw={500}>
									Password
								</Text>
							</Group>
							<PasswordInput
								id="your-password"
								error={formState.errors.password?.message}
								{...field}
							/>
						</div>
					)}
				/>
				{errorLogin && (
					<p className="text-xs text-red-400 font-semibold">
						Username dan Password yang anda masukkan salah!
					</p>
				)}
				<div className="w-full flex justify-center">
					<Button type="submit" className="!bg-primary">
						Login
					</Button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
