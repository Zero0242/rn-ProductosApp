import { Product } from "@/src/core/products"
import { useRouter } from "expo-router"
import { Image, Text, TouchableWithoutFeedback, View } from "react-native"

interface Props {
    product: Product
}

export function ProductCard({ product }: Props) {
    const router = useRouter()
    return (
        <TouchableWithoutFeedback onPress={() => router.push(`/product/${product.id}`)}>
            <View style={{ flex: 1, margin: 3 }} >
                <Image
                    src={product.images[0]}
                    style={{ height: 200, width: '100%' }}
                />
                <Text
                    numberOfLines={2}
                    style={{ textAlign: 'center' }}
                >
                    {product.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}