import { Card, Text } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'
import { Product } from '../../../domain/entities'
import { useAppRouter } from '../../hooks'
import { FadeInImage } from '../ui/FadeInImage'

interface Props {
    product: Product
}

export function ProductCard({ product }: Props) {
    const navigation = useAppRouter()
    return (
        <Card style={{ flex: 1, margin: 3 }} onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}>
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

            <Text
                numberOfLines={2}
                style={{ textAlign: 'center' }}
            >
                {product.title}
            </Text>

        </Card>
    )
}