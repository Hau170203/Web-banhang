import { Outlet } from "react-router"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 ">
        <div className="container mx-auto  py-3">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
