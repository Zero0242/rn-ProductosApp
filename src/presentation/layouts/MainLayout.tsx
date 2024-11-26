import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "../components/ui";
import { useAppRouter } from "../hooks";


interface Props {
    title: string
    subtitle?: string
    children: React.ReactNode
    actions?: {
        icon: string
        onPress: () => void
    }
}

export function MainLayout({ children, subtitle, title, actions }: Props) {
    const { canGoBack, goBack } = useAppRouter()
    const { top } = useSafeAreaInsets()

    const backButton = () => {
        return <TopNavigationAction
            onPress={goBack}
            icon={() => <AppIcon name="arrow-back-outline" />}
        />
    }

    const RightButton = () => {
        if (!actions) return undefined
        return <TopNavigationAction
            icon={() => <AppIcon name={actions.icon} />}
            onPress={actions.onPress}
        />
    }

    return (
        <Layout>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                accessoryLeft={canGoBack() ? backButton : undefined}
                accessoryRight={() => <RightButton />}
                alignment="center"
                style={{ backgroundColor: '#f9f9f9', paddingTop: top }}
            />
            <Divider />
            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    )
}