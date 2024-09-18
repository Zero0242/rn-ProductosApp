import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { List, Text } from '@ui-kitten/components'
import { getProductsByPage } from '../../../actions/products'
import { FullLoad } from '../../components/ui'
import { MainLayout } from '../../layouts'
import { RootStackParams } from '../../router'

interface Props extends NativeStackScreenProps<RootStackParams, 'HomeScreen'> { }

export function HomeScreen({ navigation, route }: Props) {
    const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProductsByPage(0)
    })

    return (
        <MainLayout
            title="Home"
            subtitle="Bienvenido a la aplicación"
        >
            {
                isLoading ? <FullLoad />
                    : <List
                        data={products}
                        numColumns={2}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={({ item }) => <Text> Product {item.id} </Text>}
                    />
            }

        </MainLayout>
    )
}


