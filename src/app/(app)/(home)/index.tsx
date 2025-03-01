import { ProductCard, useProductFetch } from '@/src/presentation/products'
import { FloatingActionButton } from '@/src/presentation/shared'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, RefreshControl, View } from 'react-native'

export default function Index() {
    const router = useRouter()
    const { products, getNextPage, isRefreshing, refreshProducts } = useProductFetch()

    return (
        <>
            <FlatList
                numColumns={2}
                keyExtractor={({ id }, index) => id + `-${index}`}
                data={products}
                renderItem={({ item }) => <ProductCard product={item} />}
                onEndReachedThreshold={0.8}
                onEndReached={() => getNextPage()}
                ListFooterComponent={<View style={{ height: 120 }} />}
                refreshControl={
                    <RefreshControl
                        onRefresh={() => refreshProducts()}
                        refreshing={isRefreshing}
                    />
                }
            />
            <FloatingActionButton
                iconName='add'
                onPress={() => router.push('product/new')}
            />
        </>
    )
}

