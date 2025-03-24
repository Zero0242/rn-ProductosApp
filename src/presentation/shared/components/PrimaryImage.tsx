import { Image, type ImageStyle, type StyleProp } from "react-native"

interface Props {
    images: string[]
    className?: string
    style?: StyleProp<ImageStyle>
}

export function PrimaryImage({ images, style, className }: Props) {
    const firstImage = images.at(0)

    return <Image
        className={className}
        src={firstImage}
        source={!firstImage ? require('@/assets/images/no-image.png') : undefined}
        style={style}
    />

}