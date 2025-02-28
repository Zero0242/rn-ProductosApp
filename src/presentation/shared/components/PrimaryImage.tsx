import { Image, type ImageStyle, type StyleProp } from "react-native"

interface Props {
    images: string[]
    style?: StyleProp<ImageStyle>
}

export function PrimaryImage({ images, style }: Props) {
    const firstImage = images.at(0)

    return <Image
        src={firstImage}
        source={!firstImage ? require('@/assets/images/no-image.png') : undefined}
        style={style}
    />

}