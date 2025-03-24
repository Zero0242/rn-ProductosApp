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
            <View className="flex-1 m-1">
                <PrimaryImage
                    className="rounded-3xl h-[200px] w-full shadow-sm p-1"
                    images={product.images}
                />
                <Text
                    numberOfLines={2}
                    className="text-center"
                >
                    {product.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

