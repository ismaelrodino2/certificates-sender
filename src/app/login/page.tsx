"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [id, setId] = useState("");
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (id === process.env.NEXT_PUBLIC_ID) {
      setIsAuthenticated(true);
      router.push("/");
    } else {
      toast.error("Invalid credentials", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-300">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
      />
      <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              className="block w-full px-4 py-3 text-lg text-gray-800 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your ID"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold text-lg rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
