import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import hero from "@/assets/hero3.jpg"
import { motion } from "framer-motion"
import SearchBar, { type SearchForm } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"

const Hero = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }
    return (
        <section className="relative w-full h-screen">
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img src={hero} alt="Delicious food background" className="w-full h-full object-cover object-center" />

                {/* Gradient overlays (soft, not solid black) */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/12 via-transparent to-transparent" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <div className="bg-transparent backdrop-blur-sm p-6 rounded-2xl sm:rounded-3xl">
                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2 max-w-lg ">
                                    Hot meals delivered to your door, fast.
                                </h1>
                                <p className="text-sm sm:text-base text-white/85 font-light mb-4 max-w-md">
                                    Order from local restaurants and get fresh food in minutes.
                                </p>
                            </motion.div>

                            {/* Search and CTA row (renders immediately) */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <div className="flex-1">
                                    <SearchBar
                                        placeHolder="Search by city or town"
                                        onSubmit={handleSearchSubmit}
                                    />
                                </div>

                                <motion.div whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <Button className="mt-0 sm:mt-0 ml-0 sm:ml-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 transform transition-transform duration-200">
                                        Order Now
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
