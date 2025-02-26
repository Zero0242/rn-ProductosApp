import { ProductCard, useProductFetch } from '@/src/presentation/products'
import React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function Index() {
    const { products, getNextPage } = useProductFetch()

    return (
        <View>
            <FlatList
                numColumns={2}
                keyExtractor={({ id }, index) => id + `-${index}`}
                data={products}
                renderItem={({ item }) => <ProductCard product={item} />}
                onEndReachedThreshold={0.8}
                onEndReached={() => getNextPage()}
            />
        </View>
    )
}

