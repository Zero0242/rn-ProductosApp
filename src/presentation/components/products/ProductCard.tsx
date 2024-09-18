import { Card } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'
import { Product } from '../../../domain/entities'

interface Props {
    product: Product
}

export function ProductCard({ product }: Props) {
    return (
        <Card>
            <Image
                source={{ uri: product.images[0] }}
                height={250}
                width={250}
            />

        </Card>
    )
}