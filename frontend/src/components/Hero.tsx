import hero from "../assets/hero.png"

const Hero = () => {
    return (
        <>
            <div className="flex flex-col">
                <img src={hero} className="w-full max-h-[600px] object-cover" />
            </div>
            <div className="bg-white rounded-lg shadow-md py-8 flex-col gap-5 text-center -mt-16 inline mx-auto p-5">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway today!
                </h1>
                <span className="text-xl">Food is just a click away!</span>
            </div>
        </>

    )
}

export default Hero