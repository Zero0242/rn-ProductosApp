import { Card } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'
import { Product } from '../../../domain/entities'
import { FadeInImage } from '../ui/FadeInImage'

interface Props {
    product: Product
}

export function ProductCard({ product }: Props) {
    return (
        <Card style={{ flex: 1, margin: 3 }}>
            {
                product.images.length === 0 ? <Image
                    source={require('../../../assets/no-product-image.png')}
                    style={{ height: 200, width: '100%' }}
                /> :
                    <FadeInImage
                        uri={product.images[0]}
                        style={{ height: 200, width: '100%' }}
                    />
            }

        </Card>
    )
}