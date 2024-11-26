import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getProductsByPage } from '../../../actions/products'
import { AppConstants } from '../../../config/constants/app-constants'
import { ProductList } from '../../components/products'
import { Fab, FullLoad } from '../../components/ui'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'
import { useAuthStore } from '../../store'

interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> { }

export function HomeScreen({ navigation, route }: Props) {
    const logout = useAuthStore(store => store.logout)
    const queryClient = useQueryClient()
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60,
        initialPageParam: 0,
        queryFn: (params) => getProductsByPage(params.pageParam),
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

    return (
        <>
            <MainLayout
                title="Home"
                subtitle="Bienvenido a la aplicación"
                actions={{
                    icon: 'log-out-outline',
                    onPress: logout
                }}
            >
                {
                    isLoading ? <FullLoad /> :
                        <ProductList
                            onPullToRefresh={async () => {
                                await new Promise(res => setTimeout(res, 200))
                                queryClient.invalidateQueries({
                                    queryKey: ['products', 'infinite'],
                                })
                            }}
                            products={data?.pages.flat() ?? []}
                            fetchNextPage={fetchNextPage}
                        />
                }
            </MainLayout>
            <Fab
                iconName='plus'
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 30
                }}
                onPress={() => navigation.navigate('ProductScreen', { productId: AppConstants.blankProduct })}
            />
        </>
    )
}


