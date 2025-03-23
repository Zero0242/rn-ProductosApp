import { ProductActions } from '@/src/core/products';
import { FullScreenLoader } from '@/src/presentation/shared';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, ScrollView, useWindowDimensions } from 'react-native';

export default function ProductPage() {
    const { width } = useWindowDimensions()
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const { isLoading, data } = useQuery({
        queryKey: ['product', 'single', id],
        queryFn: () => ProductActions.getOneProduct(id.toString())
    })

    useEffect(() => {
        if (data) {
            navigation.setOptions({ title: data.title })
        }
    }, [data])


    if (isLoading) return <FullScreenLoader />


    return (
        <ScrollView>
            <FlatList
                data={data?.images}
                keyExtractor={(image, index) => image + index.toString()}
                renderItem={({ item }) => <Image
                    key={item}
                    src={item}
                    className='h-[300px] w-screen shadow-sm p-2 rounded-lg'
                />}
                /* Modo Carrucel + Snapping */
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                decelerationRate="fast"
            />
        </ScrollView>
    )
}