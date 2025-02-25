import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { toast } from "sonner-native";
import { useAuthStore } from "../store/useAuthStore";

export const useAuthLogin = () => {
	const router = useRouter();
	const { login, stage } = useAuthStore();
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		onSubmit: async (values) => {
			await login(values.email, values.password);
			if (stage === "authenticated") {
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
