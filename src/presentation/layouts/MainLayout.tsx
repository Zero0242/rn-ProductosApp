import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { AppIcon } from "../components/ui";
import { useAppRouter } from "../hooks";


interface Props {
    title: string
    subtitle: string
    children: React.ReactNode
}

export function MainLayout({ children, subtitle, title }: Props) {
    const { canGoBack, goBack } = useAppRouter()

    const backButton = () => {
        return <TopNavigationAction
            onPress={goBack}
            icon={() => <AppIcon name="arrow-back-outline" />}
        />
    }

    return (
        <Layout>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                accessoryLeft={canGoBack() ? backButton : undefined}
                alignment="center"
                style={{ backgroundColor: '#f9f9f9' }}
            />
            <Divider />
            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    )
}