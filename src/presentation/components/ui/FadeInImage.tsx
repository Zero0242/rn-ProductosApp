import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    ImageStyle,
    StyleProp,
    View
} from 'react-native';
import { useAnimation } from '../../hooks';

interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style }: Props) => {
    const { animatedOpacity, fadeIn } = useAnimation();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false)
    const isMounted = useRef(true)

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && (
                <ActivityIndicator
                    style={{ position: 'absolute' }}
                    color="grey"
                    size={30}
                />
            )}

            {
                error ? <Image
                    source={require('../../../assets/no-product-image.png')}
                    style={[style, { objectFit: 'contain' }]}
                />
                    : <Animated.Image
                        source={{ uri }}
                        onError={() => {
                            if (isMounted.current) {
                                fadeIn({});
                                setIsLoading(false);
                                setError(true)
                            }
                        }}
                        onLoadEnd={() => {
                            if (isMounted.current) {
                                fadeIn({});
                                setIsLoading(false);
                            }
                        }}
                        style={[style, { opacity: animatedOpacity, objectFit: 'contain' }]}
                    />
            }
        </View>
    );
};