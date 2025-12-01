import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import hero from "@/assets/hero3.jpg"

const Hero = () => {
    return (
        <div className="relative">
            {/* Hero Image with Overlay */}
            <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                <img
                    src={hero}
                    alt="Delicious food"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-balance leading-tight">
                                Tuck into a takeaway today!
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
                                Food is just a click away! Browse hundreds of restaurants and get your favorites delivered fresh.
                            </p>
                            <Button
                                size="lg"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-lg shadow-xl"
                            >
                                Order Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
