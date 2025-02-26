import { ProductActions } from "@/src/core/products";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useProductFetch = () => {
	const queryClient = useQueryClient();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { data, isLoading, fetchNextPage } = useInfiniteQuery({
		staleTime: 1000 * 60 * 60,
		initialPageParam: 1,
		queryKey: ["products", "infinite", "q"],
		queryFn: (params) => ProductActions.getProducts(params.pageParam),
		getNextPageParam: (_, allPages) => allPages.length,
	});

	const refreshProducts = async () => {
		setIsRefreshing(true);
		await new Promise((resolve) => setTimeout(resolve, 400));
		queryClient.invalidateQueries({
			queryKey: ["products", "infinite", "q"],
		});
		setIsRefreshing(false);
	};

	return {
		// * Props
		products: data?.pages.flat() ?? [],
		isLoading: isLoading,
		isRefreshing: isRefreshing,
		// * Methods
		getNextPage: fetchNextPage,
		refreshProducts: refreshProducts,
	};
};
