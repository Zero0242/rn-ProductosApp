import { Layout } from '@ui-kitten/components'
import React from 'react'
import { FlatList, Image } from 'react-native'
import { FadeInImage } from '../ui'

interface Props {
    images: string[]
}

export function ProductGallery({ images }: Props) {
    return (
        <Layout>
            {
                /* Esto es para usar la imagen x defecto que tira con el error */
                images.length === 0 ? (
                    <Image
                        source={require('../../../assets/no-product-image.png')}
                        style={{ height: 300, width: 300, marginHorizontal: 5, alignSelf: 'center' }}
                    />)
                    : (
                        <FlatList
                            data={images}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item}
                            renderItem={({ item }) =>
                                <FadeInImage
                                    uri={item}
                                    style={{ height: 300, width: 300, marginHorizontal: 5 }}
                                />
                            }
                        />)
            }
        </Layout>
    )
}