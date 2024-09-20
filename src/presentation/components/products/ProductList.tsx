import { Layout, List } from '@ui-kitten/components'
import React, { useState } from 'react'
import { RefreshControl } from 'react-native'
import { Product } from '../../../domain/entities'
import { ProductCard } from './ProductCard'

interface Props {
    products: Product[]
    fetchNextPage: () => void
    onPullToRefresh?: () => Promise<void>
}

export function ProductList({ products, fetchNextPage, onPullToRefresh }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const onRefresh = async () => {
        setIsLoading(true)
        onPullToRefresh && await onPullToRefresh()
        setIsLoading(false)
    }

    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => <ProductCard product={item} />}
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.8}
            ListFooterComponent={<Layout style={{ height: 150 }} />}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                />
            }
        />
    )
}