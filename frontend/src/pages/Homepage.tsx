import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway today!
                </h1>
                <span className="text-xl">Food is just a click away!</span>
            </div>
            {/* How It Works Section */}
            <div className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center text-gray-600 mb-12 text-lg"
                    >
                        Get your favorite food delivered in 3 simple steps
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                number: "1",
                                title: "Choose Your Meal",
                                description: "Browse through our wide selection of restaurants and dishes",
                            },
                            {
                                number: "2",
                                title: "Quick Preparation",
                                description: "Your order is prepared fresh by our partner restaurants",
                            },
                            {
                                number: "3",
                                title: "Fast Delivery",
                                description: "We deliver hot and fresh food right to your doorstep",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card className="border-orange-200 hover:shadow-lg transition-shadow h-full">
                                    <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center"
                                        >
                                            <span className="text-3xl font-bold text-white">{step.number}</span>
                                        </motion.div>
                                        <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div className="py-16 px-4 bg-orange-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900"
                    >
                        Why Choose Us?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center text-gray-600 mb-12 text-lg"
                    >
                        We're committed to delivering the best experience
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: "500+", label: "Restaurants" },
                            { value: "30min", label: "Average Delivery" },
                            { value: "50k+", label: "Happy Customers" },
                            { value: "4.8★", label: "Average Rating" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-lg shadow-md text-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                    className="text-4xl font-bold text-orange-500 mb-2"
                                >
                                    {stat.value}
                                </motion.div>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance"
                    >
                        Ready to Order?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-orange-50 mb-8"
                    >
                        Join thousands of satisfied customers and get your favorite food delivered now!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button size="lg" className="bg-white text-orange-500 hover:bg-orange-50">
                            Start Ordering
                        </Button>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}

export default HomePage