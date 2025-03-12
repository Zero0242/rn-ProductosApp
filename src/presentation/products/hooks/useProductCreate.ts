import { useFormik } from "formik";
import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
	title: Yup.string().required("Este campo es obligatorio"),
	description: Yup.string().required("Este campo es obligatorio"),
	price: Yup.string().required("Este campo es obligatorio"),
	stock: Yup.string().required("Este campo es obligatorio"),
	sizes: Yup.array()
		.of(Yup.string())
		.min(1, "Debe seleccionar al menos una talla")
		.required("Este campo es obligatorio"),
	genders: Yup.array()
		.of(Yup.string())
		.min(1, "Debe seleccionar al menos un género")
		.required("Este campo es obligatorio"),
});

export const useProductCreate = () => {
	// const queryClient = useQueryClient();
	// const mutation = useMutation({});

	const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
		validationSchema: createProductSchema,
		initialValues: {
			title: "",
			description: "",
			price: "",
			stock: "",
			sizes: [],
			genders: [],
		},
		onSubmit: (values) => {
			console.log("values", values);
		},
	});

	return {
		// * Properties
		values,
		// * Methods
		handleSubmit,
		handleChange,
		setFieldValue,
	};
};
