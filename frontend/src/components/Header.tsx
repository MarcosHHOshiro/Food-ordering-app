import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import MainNav from "./MainNav"

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-orange-200 shadow-sm">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link
                    to="/"
                    className="text-2xl md:text-3xl font-extrabold tracking-tight text-orange-500 hover:text-orange-600 transition"
                >
                    Foodly<span className="text-zinc-800">.com</span>
                </Link>

                <div className="md:hidden">
                    <MobileNav />
                </div>

                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </header>
    )
}

export default Header
