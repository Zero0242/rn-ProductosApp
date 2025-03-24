import { ProductActions } from '@/src/core/products';
import { FullScreenLoader } from '@/src/presentation/shared';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';

export default function ProductPage() {
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
            <View className='items-center gap-2 px-3'>
                <Text className='font-bold text-3xl' >{data?.title}</Text>
                <View className='flex-row justify-between w-full'>
                    <Text className='font-bold text-md'>
                        Precio ${data?.price}
                    </Text>
                    <Text className='font-bold text-md'>
                        Stock: {data?.stock}
                    </Text>
                </View>
                <View className='flex-row justify-between w-full'>
                    <Text className='font-bold text-md'>
                        Tallas: {data?.sizes.map(e => `${e} `)}
                    </Text>
                    <Text className='font-bold text-md'>
                        Genero: {data?.gender}
                    </Text>
                </View>
                <Text className='font-medium text-lg' >{data?.description}</Text>
            </View>
        </ScrollView>
    )
}