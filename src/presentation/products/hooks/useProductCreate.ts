import { useFormik } from "formik";
import { toast } from "sonner-native";
import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
	title: Yup.string().required("Este campo es obligatorio"),
	slug: Yup.string().required("Este campo es obligatorio"),
	description: Yup.string().required("Este campo es obligatorio"),
	price: Yup.string().required("Este campo es obligatorio"),
	stock: Yup.string().required("Este campo es obligatorio"),
	gender: Yup.string().required("Este campo es obligatorio"),
	sizes: Yup.array()
		.of(Yup.string())
		.min(1, "Debe seleccionar al menos una talla")
		.required("Este campo es obligatorio"),
});

export const useProductCreate = () => {
	// const queryClient = useQueryClient();
	// const mutation = useMutation({});

	const {
		values,
		handleSubmit,
		handleChange,
		setFieldValue,
		errors,
		resetForm,
	} = useFormik({
		validationSchema: createProductSchema,
		validateOnMount: false,
		validateOnChange: false,
		initialValues: {
			title: "",
			description: "",
			price: "",
			stock: "",
			sizes: [],
			slug: "",
			gender: "kid",
		},
		onSubmit: (values) => {
			console.log("values", values);
			toast.success("Hola mundo");
			resetForm();
		},
	});

	return {
		// * Properties
		values,
		errors,
		// * Methods
		handleSubmit,
		handleChange,
		setFieldValue,
	};
};
