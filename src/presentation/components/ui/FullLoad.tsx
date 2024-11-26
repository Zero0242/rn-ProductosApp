import { Layout, Spinner } from "@ui-kitten/components";

export function FullLoad() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
        </Layout>
    )
}