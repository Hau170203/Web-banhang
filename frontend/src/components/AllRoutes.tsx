import { useRoutes } from "react-router"
import { routes } from "../routes"

export const AllRoutes = () => {
    const element = useRoutes(routes)
    return (
        <>
            {element}
        </>
    )
}
