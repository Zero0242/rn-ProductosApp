import { ProductActions } from "@/src/core/products";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export const useProductFetch = () => {
	const queryClient = useQueryClient();
	const { data, isLoading, fetchNextPage } = useInfiniteQuery({
		staleTime: 1000 * 60 * 60,
		initialPageParam: 1,
		queryKey: ["products", "infinite", "q"],
		queryFn: (params) => ProductActions.getProducts(params.pageParam),
		getNextPageParam: (_, allPages) => allPages.length,
	});

	const refreshProducts = async () => {
		await new Promise((resolve) => setTimeout(resolve, 400));
		queryClient.invalidateQueries({
			queryKey: ["products", "infinite", "q"],
		});
	};

	return {
		// * Props
		products: data?.pages.flat() ?? [],
		isLoading: isLoading,
		// * Methods
		getNextPage: fetchNextPage,
		refreshProducts: refreshProducts,
	};
};
