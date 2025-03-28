import { AuthActions } from "@/src/core/auth";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { toast } from "sonner-native";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(2, "Muy corto")
		.max(50, "Muy largo")
		.required("Este campo es obligatorio"),
	password: Yup.string()
		.min(6, "Muy corto")
		.required("Este campo es obligatorio"),
	email: Yup.string()
		.email("Email invalido")
		.required("Este campo es obligatorio"),
});

export const useAuthSignUp = () => {
	const router = useRouter();
	const formik = useFormik({
		validationSchema: signupSchema,
		initialValues: {
			fullName: "",
			password: "",
			email: "",
		},
		onSubmit: async (values) => {
			const response = await AuthActions.register(values);
			if (response != null) {
				toast.success("Cuenta registrada con exito");
				return router.back();
			}
			toast.error("Error al crear cuenta");
		},
	});

	return {
		values: formik.values,
		errors: formik.errors,
		handleSubmit: formik.handleSubmit,
		handleChange: formik.handleChange,
	};
};
