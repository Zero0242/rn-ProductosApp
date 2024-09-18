import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getProductsByPage } from '../../../actions/products'
import { ProductList } from '../../components/products'
import { FullLoad } from '../../components/ui'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> { }

export function HomeScreen({ navigation, route }: Props) {
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60,
        initialPageParam: 0,
        queryFn: async (params) => {
            return await getProductsByPage(params.pageParam)
        },
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

    return (
        <MainLayout
            title="Home"
            subtitle="Bienvenido a la aplicación"
        >
            {
                isLoading ? <FullLoad /> :
                    <ProductList
                        products={data?.pages.flat() ?? []}
                        fetchNextPage={fetchNextPage}
                    />
            }

        </MainLayout>
    )
}


