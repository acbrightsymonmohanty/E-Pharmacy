import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";
import myContext from "../../context/myContext";
import Whatsapp from "../home/whatsapp/Whatsapp";

const VendorDashboard = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const context = useContext(myContext);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    company:user?.name,
    price: "",
    productImageUrl: "",
    userid: user.uid,
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "products"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAddProduct(false);
    try {
      await addDoc(collection(fireDB, "vendor"), product);
      await addDoc(collection(fireDB, "products"), product);
      setSuccessMessage("Product added successfully!");
      setProduct({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        userid: user.uid,
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product.");
    }
  };

  // Calculate total products
  const totalProducts = products.filter((product) => product?.userid === user.uid).length;

  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="top mb-5 px-5 mt-5">
        <div className="bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h1 className="text-center text-2xl font-bold text-pink-500">Vendor Dashboard</h1>
        </div>
      </div>
      <div className="px-5">
        <div className="mid mb-5">
          <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
            <div className="flex justify-center">
              <img
                className="w-24"
                src={
                  user && user.name
                    ? `https://avatar.iran.liara.run/public/boy?username=${user.name}`
                    : "https://via.placeholder.com/128"
                }
                alt="User Icon"
              />
            </div>
            <div>
              <h1 className="text-center text-lg">
                <span className="font-bold">Name : </span>
                {user?.name}
              </h1>
              <h1 className="text-center text-lg">
                <span className="font-bold">Email : </span>
                {user?.email}
              </h1>
              <h1 className="text-center text-lg">
                <span className="font-bold">Date : </span>
                {user?.date}
              </h1>
              <h1 className="text-center text-lg">
                <span className="font-bold">Role : </span>
                {user?.role}
              </h1>
              <button className="bg-white hover:bg-blue-700 text-black hover:text-white font-bold py-2 px-4 rounded">
                <Link to="/">Go to Home</Link>
              </button>
              <button
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowAddProduct(true)}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
        {showAddProduct && (
          <form
            className="bg-white p-5 rounded shadow-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-bold mb-4">Add a New Product</h2>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={product.title}
              onChange={handleChange}
              className="mb-4 p-2 w-full border rounded  border-pink-300"
            />
            <label className="block mb-2">Product URL:</label>
            <input
              type="text"
              name="productImageUrl"
              placeholder="Product URL"
              value={product.productImageUrl}
              onChange={handleChange}
              className="mb-4 p-2 w-full border rounded border-pink-300"
            />
            <label className="block mb-2">Price:</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="mb-4 p-2 w-full border rounded border-pink-300"
            />
            <label className="block mb-2">Category:</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mb-4 p-2 w-full border rounded border-pink-300"
            >
              <option value="">Select Category</option>
              <option value="Medicine">Medicine</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Elderly Care">Elderly Care</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Food and Drinks">Food and Drinks</option>
              <option value="Sexual Wellness">Sexual Wellness</option>
              <option value="Ayurvedic Care">Ayurvedic Care</option>
              <option value="Home Care">Home Care</option>
            </select>
            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              className="mb-4 p-2 w-full border rounded border-pink-300"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
        <div className="mt-8 overflow-x-auto">
          <h2 className="text-lg font-bold mb-4">Product Details</h2>
          <p>Total Products: {totalProducts}</p>
          <div>
          <table className="table-auto border-collapse border border-purple-800 w-full h-full">
            <thead>
              <tr>
                <th className="border border-purple-600 px-4 py-2">Image</th>
                <th className="border border-purple-600 px-4 py-2">Title</th>
                <th className="border border-purple-600 px-4 py-2">Price</th>
                <th className="border border-purple-600 px-4 py-2">Category</th>
                <th className="border border-purple-600 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product?.userid === user.uid)
                .map((vendor) => (
                  <tr key={vendor.id}>
                    <td className="border border-purple-600 px-4 py-2">
                      <img
                        src={vendor?.productImageUrl}
                        alt={vendor.title}
                        className="h-16 w-16 object-cover"
                      />
                    </td>
                    <td className="border border-purple-600 px-4 py-2">{vendor?.title}</td>
                    <td className="border border-purple-600 px-4 py-2">{vendor?.price}</td>
                    <td className="border border-purple-600 px-4 py-2">{vendor?.category}</td>
                    <td className="border border-purple-600 px-4 py-2">{vendor?.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
        <Whatsapp />
        <div>
        <h2 className='text-center text-2xl text-white bg-pink-300'>Any problem contact with adminer
        <p className='text-sm'>contact +918455943905 epharma@gmail.com</p>
        </h2>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
