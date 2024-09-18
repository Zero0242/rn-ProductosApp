import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
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

            <Animated.Image
                source={{ uri }}
                onLoadEnd={() => {
                    if (isMounted.current) {
                        fadeIn({});
                        setIsLoading(false);
                    }
                }}
                style={[style, { opacity: animatedOpacity, objectFit: 'contain' }]}
            />
        </View>
    );
};