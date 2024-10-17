import { useState, useEffect } from "react";

const ORIGIN_LAT = 22.5726;
const ORIGIN_LNG = 88.3639;

const HeroSection = () => {
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [distance, setDistance] = useState(null);

    const fetchAddressFromPincode = async (pincode) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
            );
            const data = await response.json();
            if (data.length > 0) {
                const { display_name, lat, lon } = data[0];
                setAddress(display_name);
                const distanceInKm = calculateDistance(
                    ORIGIN_LAT, ORIGIN_LNG, parseFloat(lat), parseFloat(lon)
                );
                setDistance(`${distanceInKm.toFixed(2)} km`);
                determineDeliveryTime(distanceInKm);
            } else {
                resetState("Invalid pincode. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            resetState("Error fetching address. Try again later.");
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const determineDeliveryTime = (distanceInKm) => {
        const today = new Date();
        let deliveryTimeInMinutes;

        if (distanceInKm < 1) {
            deliveryTimeInMinutes = 2;
        } else if (distanceInKm < 5) {
            deliveryTimeInMinutes = 8;
        } else if (distanceInKm < 10) {
            deliveryTimeInMinutes = 12;
        } else if (distanceInKm < 15) {
            deliveryTimeInMinutes = 17;
        } else {
            setDeliveryDate(formatDate(addDays(today, 2)));
            setCountdown(0);
            return;
        }

        setDeliveryDate(`Estimated Delivery in ${deliveryTimeInMinutes} minutes`);
        setCountdown(deliveryTimeInMinutes * 60);
    };

    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const formatDate = (date) =>
        date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });

    const resetState = (msg) => {
        setAddress(msg);
        setDistance(null);
        setDeliveryDate("");
        setCountdown(0);
    };

    useEffect(() => {
        if (pincode.length === 6) fetchAddressFromPincode(pincode);
    }, [pincode]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <div className="hero-section min-h-screen bg-gradient-to-br from-blue-50 to-white p-8 lg:p-16">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src="/img/pharmacy3.png"
                    alt="Pharmacy"
                    className="w-full h-64 object-cover"
                />
                <div className="p-6 lg:p-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Check Delivery Availability
                    </h2>

                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />

                    {address && (
                        <p className="mt-4 text-lg text-blue-600 font-medium">
                            Address: {address}
                        </p>
                    )}

                    {distance && (
                        <p className="mt-2 text-lg text-black">
                            Distance: {distance}
                        </p>
                    )}

                    {deliveryDate && (
                        <div className="mt-4">
                            <p className="text-lg text-green-600 font-semibold">
                                {deliveryDate}
                            </p>

                            {countdown > 0 && (
                                <p className="text-lg text-red-500">
                                    Countdown: {formatTime(countdown)}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
