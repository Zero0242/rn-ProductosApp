import { Product } from "@/src/core/products"
import { useRouter } from "expo-router"
import { Text, TouchableWithoutFeedback, View } from "react-native"
import { PrimaryImage } from "../../shared"

interface Props {
    product: Product
}

export function ProductCard({ product }: Props) {
    const router = useRouter()

    return (
        <TouchableWithoutFeedback onPress={() => router.push(`/product/${product.id}`)}>
            <View style={{ flex: 1, margin: 3 }} >
                <PrimaryImage
                    images={product.images}
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

