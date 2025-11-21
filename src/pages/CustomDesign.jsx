import React from "react"
import { useState } from "react";
import { Check, ChevronRight, Car, Calendar, Wrench, Settings } from "lucide-react";
import customRadiator from "../assets/whiteblue.png"
import unknownradiator from "../assets/unknownradiator.png"
// import { addToCart } from "../stores/cartStore";
// import { toast } from "../components/ui/use-toast";
import { useCart } from "../contexts/CartContext";

function CustomDesign() {

    const [config, setConfig] = useState({
        brand: "",
        model: "",
        year: "",
        material: "",
        coreType: "2-row",
    })

    // const brandOptions = [{ id: "toyota", name: "Toyota", price: 0 },
    // { id: "honda", name: "Honda", price: 0 },
    // { id: "nissan", name: "Nissan", price: 0 },
    // { id: "mazda", name: "Mazda", price: 0 },
    // { id: "mitsubishi", name: "Mitsubishi", price: 0 },
    // { id: "isuzu", name: "Isuzu", price: 0 },]

    const brands = {
        toyota: [
            { id: "camry", name: "Camry", price: 0 },
            { id: "corolla", name: "Corolla", price: 0 },
            { id: "hilux", name: "Hilux", price: 0 },
            { id: "fortuner", name: "Fortuner", price: 0 },
        ],
        honda: [
            { id: "civic", name: "Civic", price: 0 },
            { id: "accord", name: "Accord", price: 0 },
            { id: "crv", name: "CR-V", price: 0 },
            { id: "city", name: "City", price: 0 },
        ],
        nissan: [
            { id: "navara", name: "Navara", price: 0 },
            { id: "almera", name: "Almera", price: 0 },
            { id: "xtrail", name: "X-Trail", price: 0 },
            { id: "teana", name: "Teana", price: 0 },
        ],
        mazda: [
            { id: "mazda2", name: "Mazda 2", price: 0 },
            { id: "mazda3", name: "Mazda 3", price: 0 },
            { id: "cx5", name: "CX-5", price: 0 },
            { id: "bt50", name: "BT-50", price: 0 },
        ],
        mitsubishi: [
            { id: "triton", name: "Triton", price: 0 },
            { id: "pajero", name: "Pajero Sport", price: 0 },
            { id: "attrage", name: "Attrage", price: 0 },
            { id: "xpander", name: "Xpander", price: 0 },
        ],
        isuzu: [
            { id: "dmax", name: "D-Max", price: 0 },
            { id: "mux", name: "MU-X", price: 0 },
            { id: "vcross", name: "V-Cross", price: 0 },
        ],
    };

    const years = [
        { id: "2024", name: "2024", price: 0 },
        { id: "2023", name: "2023", price: 0 },
        { id: "2022", name: "2022", price: 0 },
        { id: "2021", name: "2021", price: 0 },
        { id: "2020", name: "2020", price: 0 },
        { id: "2019", name: "2019", price: 0 },
        { id: "2018", name: "2018", price: 0 },
        { id: "2017", name: "2017", price: 0 },
        { id: "2016", name: "2016", price: 0 },
        { id: "2015", name: "2015", price: 0 },
    ];

    const materials = [
        { id: "aluminum", name: "Aluminum", description: "Lightweight and efficient", price: 199, image: customRadiator },
        { id: "copper", name: "Copper/Brass", description: "Classic and durable", price: 249, image: customRadiator },
        // { id: "performance", name: "Performance Alloy", description: "Maximum cooling", price: 299, image: customRadiator },
    ];

    const coreTypes = [
        { id: "standard", name: "Standard Fins", description: "10 fins/inch", price: 0 },
        { id: "dense", name: "Dense Fins", description: "14 fins/inch", price: 50 },
        { id: "ultra-dense", name: "Ultra Dense", description: "16 fins/inch", price: 100 },
    ];

    const getAvailableModels = () => {
        if (!config.brand) return [];
        return brands[config.brand] || [];
    };

    const calculateTotal = () => {
        const material = materials.find((m) => m.id === config.material);
        const coreType = coreTypes.find((c) => c.id === config.coreType);
        return (material?.price || 0) + (coreType?.price || 0);
    };

    const getCurrentImage = () => {
        const material = materials.find((m) => m.id === config.material);
        return material?.image || unknownradiator;
    };

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!config.brand || !config.model || !config.year) {
            // toast({
            //     title: "Please complete your selection",
            //     description: "Select brand, model, and year first.",
            //     variant: "destructive",
            // });
            return;
        }
        // const brand = brands.find((b) => b.id === config.brand);
        const brand = brands[config.brand]?.find(
            (m) => m.id === config.model
        );

        const model = getAvailableModels().find((m) => m.id === config.model);
        const material = materials.find((m) => m.id === config.material);
        const total = calculateTotal();

        addToCart({
            id: Date.now(),
            title: `${brand?.name} ${model?.name} ${config.year} - ${material?.name} Radiator`,
            price: `$${total}`,
            image: getCurrentImage(),
        });

        // toast({
        //     title: "Added to cart",
        //     description: "Your custom radiator has been added to cart.",
        // });
    };

    const getStepStatus = (step) => {
        if (step === 1) return config.brand ? 'completed' : 'current';
        if (step === 2) return config.model ? 'completed' : config.brand ? 'current' : 'pending';
        if (step === 3) return config.year ? 'completed' : config.model ? 'current' : 'pending';
        if (step === 4) return config.material ? 'completed' : config.year ? 'current' : 'pending';
        return 'pending';
    };

    const steps = [
        { number: 1, icon: Car, label: 'Brands', completed: !!config.brand },
        { number: 2, icon: Settings, label: 'Models', completed: !!config.model },
        { number: 3, icon: Calendar, label: 'Years', completed: !!config.year },
        { number: 4, icon: Wrench, label: 'Material', completed: !!config.material },
    ];

    return (
        <>
            <div className=" min-h-screen bg-matt via-background  ">

                <div className="container mx-auto px-4 py-8 md:py-16">
                    {/* Header with Gradient */}
                    <div className="text-center mb-16 relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <div className="w-96 h-96 bg-primary rounded-full blur-3xl" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text  text-gray-200">
                            Custom your Radiator
                        </h1>
                        <p className="text-xl text-gray-300 md:text-2xl max-w-2xl mx-auto">
                            Select config for your car radiator step by step.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="max-w-4xl mx-auto mb-12 sticky top-2 z-20">
                        <div className="flex items-center justify-between relative">
                            {/* Progress Bar Background */}
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
                            <div
                                className="absolute top-6 left-0 h-0.5 bg-red-500 transition-all duration-500"
                                style={{
                                    width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%`
                                }}
                            />

                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const status = getStepStatus(step.number);

                                return (
                                    <div key={step.number} className="flex flex-col items-center gap-3 relative z-10">
                                        <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 
                    ${step.completed
                                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                                                : status === 'current'
                                                    ? 'bg-red-800 text-red-500 border-2 border-primary animate-pulse'
                                                    : 'bg-light-matt text-gray-500'
                                            }
                                        `}>
                                            {step.completed ? (
                                                <Check className="h-5 w-5" />
                                            ) : (
                                                <Icon className="h-5 w-5" />
                                            )}
                                        </div>
                                        <span className={`text-xs md:text-sm font-medium whitespace-nowrap ${step.completed || status === 'current' ? 'text-white' : 'text-gray-600'
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                        {/* Preview Section - Takes 2 columns */}
                        <div className="lg:col-span-2">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Image Preview Card */}
                                <div className="bg-gradient-to-br bg-light-matt rounded-3xl p-8 border border-border/50 drop-shadow-2xl drop-shadow- backdrop-blur-sm">
                                    <div className="aspect-square rounded-2xl  p-8 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={getCurrentImage()}
                                            alt="Custom Radiator Preview"
                                            className="w-full h-full object-contain transition-all duration-700 hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Price Card */}
                                <div className="bg-gradient-to-br from-black  to-red-900 rounded-3xl p-8 border-2 border-primary/20 backdrop-blur-sm">
                                    <div className="text-center space-y-2">
                                        <p className="text-sm text-gray-400 uppercase tracking-wider">ราคาเริ่มต้น</p>
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span className="text-6xl font-bold  bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-red-500">
                                                {calculateTotal()}<span className="text-3xl"> THB</span>
                                            </span>
                                        </div>
                                        {config.brand && config.model && (
                                            <p className="text-sm text-gray-400  pt-2">
                                                {brands[config.brand]?.name} {getAvailableModels().find(m => m.id === config.model)?.name} {config.year}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Configuration Section - Takes 3 columns */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Brand Selection */}
                            <div className="bg-light-matt backdrop-blur-sm rounded-3xl p-8 border  transition-all duration-300 hover:scale-101">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-red-700/10 flex items-center justify-center">
                                        <Car className="h-5 w-5 text-red-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">Brands</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {/* {brands.map((brand) => (
                                        <button
                                            key={brand.id}
                                            onClick={() => setConfig({ ...config, brand: brand.id, model: "", year: "" })}
                                            className={`group relative p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${config.brand === brand.id
                                                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                                : "border-border hover:border-primary/50 hover:bg-card"
                                                }`}
                                        >
                                            {config.brand === brand.id && (
                                                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                                                    <Check className="h-3.5 w-3.5" />
                                                </div>
                                            )}
                                            <h3 className="font-bold text-center group-hover:text-primary transition-colors">{brand.name}</h3>
                                        </button>
                                    ))} */}
                                    {Object.keys(brands).map((brandId) => (
                                        <button
                                            key={brandId}
                                            onClick={() =>
                                                setConfig({ ...config, brand: brandId, model: "", year: "" })
                                            }
                                            className={`group relative p-5 rounded-xl border-2 transition-all  duration-300 hover:scale-105 ${config.brand === brandId
                                                ? "border-red-500 bg-red-700/10 shadow-lg shadow-red-500/20 text-red-500    "
                                                : "border-gray-700 hover:border-red-700/50 hover:text-red-600 text-white"
                                                }`}
                                        >
                                            {config.brand === brandId && (
                                                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                                                    <Check className="h-3.5 w-3.5" />
                                                </div>
                                            )}
                                            <h3 className="font-bold text-center group-hover:text-primary transition-colors">
                                                {brandId.charAt(0).toUpperCase() + brandId.slice(1)}
                                            </h3>
                                        </button>
                                    ))
                                    }
                                </div>
                            </div>

                            {/* Model Selection */}
                            {config.brand && (
                                <div className="bg-light-matt backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-101">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-700/10 flex items-center justify-center">
                                            <Settings className="h-5 w-5 text-red-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Models</h2>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {getAvailableModels().map((model) => (
                                            <button
                                                key={model.id}
                                                onClick={() => setConfig({ ...config, model: model.id, year: "" })}
                                                className={`group relative p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${config.model === model.id
                                                    ? "border-red-500 bg-red-700/10 shadow-lg shadow-red-500/20 text-red-500"
                                                    : "border-gray-700 hover:border-red-700/50  hover:text-red-600 text-white"
                                                    }`}
                                            >
                                                {config.model === model.id && (
                                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                                                        <Check className="h-3.5 w-3.5" />
                                                    </div>
                                                )}
                                                <h3 className="font-bold text-center text-sm group-hover:text-primary transition-colors">{model.name}</h3>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Year Selection */}
                            {config.model && (
                                <div className="bg-light-matt backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-101">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-700/10 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-red-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Years</h2>
                                    </div>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {years.map((year) => (
                                            <button
                                                key={year.id}
                                                onClick={() => setConfig({ ...config, year: year.id })}
                                                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${config.year === year.id
                                                    ? "border-red-500 bg-red-700/10 shadow-lg shadow-red-500/20 text-red-500"
                                                    : "border-gray-700 hover:border-red-700/50  hover:text-red-600 text-white"
                                                    }`}
                                            >
                                                {config.year === year.id && (
                                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                                                        <Check className="h-3.5 w-3.5" />
                                                    </div>
                                                )}
                                                <h3 className="font-bold text-center group-hover:text-primary transition-colors">{year.name}</h3>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Material Selection */}
                            {config.year && (
                                <div className="bg-light-matt backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:scale-101">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-700/10 flex items-center justify-center">
                                            <Wrench className="h-5 w-5 text-red-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Material</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {materials.map((material) => (
                                            <button
                                                key={material.id}
                                                onClick={() => setConfig({ ...config, material: material.id })}
                                                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left ${config.material === material.id
                                                    ? "border-red-500 bg-red-700/10 shadow-lg shadow-red-500/20 text-red-500"
                                                    : "border-gray-700 hover:border-red-700/50  hover:text-red-600 text-white"
                                                    }`}
                                            >
                                                {config.material === material.id && (
                                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                                                        <Check className="h-3.5 w-3.5" />
                                                    </div>
                                                )}
                                                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{material.name}</h3>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {material.description}
                                                </p>
                                                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                                    ${material.price}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Core Type (Fin Density) */}
                            {config.material && (
                                <div className="bg-light-matt backdrop-blur-sm rounded-3xl p-8 border border-gray-500 shadow-2xs shadow-gray-600 transition-all duration-300 hover:scale-101">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-red-700/10 flex items-center justify-center">
                                            <Settings className="h-5 w-5 text-red-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Cooling channel frequency</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {coreTypes.map((core) => (
                                            <button
                                                key={core.id}
                                                onClick={() => setConfig({ ...config, coreType: core.id })}
                                                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-left ${config.coreType === core.id
                                                    ? "border-red-500 bg-red-700/10 shadow-lg shadow-red-500/20 text-red-500"
                                                    : "border-gray-700 hover:border-red-700/50  hover:text-red-600 text-white"
                                                    }`}
                                            >
                                                {config.coreType === core.id && (
                                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg">
                                                        <Check className="h-3.5 w-3.5" />
                                                    </div>
                                                )}
                                                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{core.name}</h3>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {core.description}
                                                </p>
                                                <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${core.price > 0
                                                    ? 'bg-red-600/10 text-red-600'
                                                    : 'bg-gray-700 text-gray-300'
                                                    }`}>
                                                    {core.price > 0 ? `+$${core.price}` : "รวมอยู่แล้ว"}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Add to Cart Button - Fixed at bottom */}
                            <div className="sticky bottom-0 bg-gradient-to-t from-background via-red- to-transparent pt-8 pb-6">
                                <div
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="flex w-full text-lg h-14 bg-gradient-to-b from-red-900 via-red-800 to-red-900 text-white rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 group"
                                >
                                    <div className="mt-3 ml-4">Add to cart</div>
                                    <ChevronRight className="ml-2 h-14 w-5 group-hover:translate-x-1 transition-transform" />
                                    <span className="ml-auto font-bold mt-3 mr-4">{calculateTotal()} THB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CustomDesign