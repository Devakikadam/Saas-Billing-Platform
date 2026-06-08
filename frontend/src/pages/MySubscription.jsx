import { useEffect, useState } from "react";
import axios from "axios";

function MySubscription({ setPage }) {

  const [subscription, setSubscription] = useState(null);

  
    useEffect(() => {
  const email = localStorage.getItem("email");

  axios
    .get(`http://127.0.0.1:5000/my_subscription/${email}`)
    .then((res) => {
      console.log(res.data);
      setSubscription(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
 

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        My Subscription
      </h1>

      {subscription && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-96 mx-auto">

          <h2 className="text-2xl font-bold">
            {subscription.plan}
          </h2>

          <p className="mt-3">
            Price : ₹{subscription.price}
          </p>

          <p>
            Status : {subscription.status}
          </p>

        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => setPage("dashboard")}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>

    </div>
  );
}

export default MySubscription;