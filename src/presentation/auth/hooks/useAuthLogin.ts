import { AuthActions } from "@/src/core/auth";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { toast } from "sonner-native";
import { useAuthStore } from "../store/useAuthStore";

export const useAuthLogin = () => {
	const router = useRouter();
	const login = useAuthStore((state) => state.login);
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		onSubmit: async (values) => {
			const response = await AuthActions.login(values);
			if (response != null) {
				await login(response.token, response.user);
				router.replace("/");
			} else {
				toast.error("Credenciales incorrectas");
			}
		},
	});

	return {
		values: formik.values,
		handleSubmit: formik.handleSubmit,
		handleChange: formik.handleChange,
	};
};
