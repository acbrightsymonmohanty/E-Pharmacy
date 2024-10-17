import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import Carousal from "../carousal/Carousal";
import myContext from "../../context/myContext";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [filterOpen, setFilterOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [sortOrder, setSortOrder] = useState('lowToHigh');

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const filteredProducts = getAllProduct
        .filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
        .sort((a, b) => {
            if (sortOrder === 'lowToHigh') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="mb-5">
                    <Carousal />
                    <h1 className="text-center text-2xl font-semibold">All Products</h1>
                </div>

                {/* Filter */}
                <div className="md:hidden mb-4">
                    <button className="bg-gray-200 px-4 py-2 rounded-md" onClick={() => setFilterOpen(!filterOpen)}>
                        {filterOpen ? "Close Filter" : "Open Filter"}
                    </button>
                </div>
                <div className={`md:block ${filterOpen ? "block" : "hidden"} fixed left-0 top-25 h-auto md:h-auto md:static bg-white shadow-md md:shadow-none z-10 w-2/4 md:w-1/4 p-4 overflow-y-auto`}>
                    <button onClick={() => setFilterOpen(false)} className="md:hidden mb-4">Close</button>
                    <h2 className="font-bold text-lg mb-4">Filter Products</h2>
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700">
                            Sort Order
                        </label>
                        <select
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">Price Range</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                className="mb-4 p-2 border rounded w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Products */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filteredProducts.map((item, index) => (
                                <div key={index} className="border p-4">
                                    <img
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        src={item.productImageUrl}
                                        alt={item.title}
                                        className="w-70 h-60 object-cover cursor-pointer items-center"
                                    />
                                    <div className="mt-2">
                                        <h3 className="font-bold">{item.title}</h3>
                                        <p>₹{item.price}</p>
                                        <div className="flex justify-center mt-2">
                                            {cartItems.some((p) => p.id === item.id) ? (
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="bg-red-700 text-white px-4 py-2 rounded-md"
                                                >
                                                    Remove from Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addCart(item)}
                                                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
