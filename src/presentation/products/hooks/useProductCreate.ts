import { Product, ProductActions } from "@/src/core/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (data: Product) => ProductActions.createOrUpdateProduct(data),
	});

	const formik = useFormik({
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
		onSubmit: () => onSubmitAction(),
	});

	async function onSubmitAction() {
		const data = await mutation.mutateAsync(formik.values as any);
		if (data) {
			formik.resetForm();
			console.log("values", data);
			toast.success("Producto creado con exito");
			// * Tanstack validations
			queryClient.invalidateQueries({
				queryKey: ["products", "infinite", "q"],
			});
			queryClient.setQueryData(["product", "single", data.id], data);
		}
	}

	return {
		// * Properties
		values: formik.values,
		errors: formik.errors,
		// * Methods
		handleSubmit: formik.handleSubmit,
		handleChange: formik.handleChange,
		setFieldValue: formik.setFieldValue,
	};
};
