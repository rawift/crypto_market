import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Home = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // Connect to Socket.io server
    const socket = io("http://localhost:8000");

    // Listen for real-time updates from the server
    socket.on("cryptoUpdate", (data) => {
      console.log(data)
      setCryptoData(Object.values(data)); // Update state with new data
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1>Real-Time Cryptocurrency Prices</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Cryptocurrency</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Market Cap</th>
                <th className="px-4 py-2 text-left">1 Hour Change</th>
                <th className="px-4 py-2 text-left">24 Hours Change</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr key={index} className="border-b hover:bg-gray-700">
                  <td className="px-4 py-2">{crypto.name}</td>
                  <td className="px-4 py-2">{crypto.price}</td>
                  <td className="px-4 py-2">{crypto.marketCap}</td>
                  <td className="px-4 py-2">{crypto.change1h}</td>
                  <td className="px-4 py-2">{crypto.change24h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="bg-gray-800 text-center py-4">
        <p>&copy; 2024 CryptoTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
