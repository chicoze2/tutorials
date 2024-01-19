
import { GlobalStyles } from "./styles/GlobalStyles"

import { Header } from "./components/Header/index"
import { Orders } from "./components/Orders/index"
import { Root } from "./components/Root/styles"

export function App() {
    return (
    <Root>
        <GlobalStyles/>
        <Header/>
        <Orders/>
    </Root>
    )
}
