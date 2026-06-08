import axios from "axios";

function Plans({ setPage }) {

  const handleSubscribe = async (plan, price) => {
    try {
      await axios.post(
        "http://127.0.0.1:5000/subscribe",
        {
          user_email: localStorage.getItem("email"),
          plan,
          price
        }
      );

      alert(`${plan} Subscription Created`);

    } catch (error) {
      console.log(error);
      alert("Subscription Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Subscription Plans
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Basic */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Basic</h2>

          <p className="text-4xl font-bold text-blue-600 mb-4">
            ₹499/month
          </p>

          <p>1 User</p>
          <p>Basic Support</p>
          <p>5 GB Storage</p>

          <button
            onClick={() => handleSubscribe("Basic", 499)}
            className="mt-5 bg-green-600 text-white px-5 py-2 rounded"
          >
            Subscribe
          </button>
        </div>

        {/* Premium */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Premium</h2>

          <p className="text-4xl font-bold text-blue-600 mb-4">
            ₹999/month
          </p>

          <p>5 Users</p>
          <p>Priority Support</p>
          <p>50 GB Storage</p>

          <button
            onClick={() => handleSubscribe("Premium", 999)}
            className="mt-5 bg-green-600 text-white px-5 py-2 rounded"
          >
            Subscribe
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Enterprise</h2>

          <p className="text-4xl font-bold text-blue-600 mb-4">
            ₹1999/month
          </p>

          <p>Unlimited Users</p>
          <p>24/7 Support</p>
          <p>Unlimited Storage</p>

          <button
            onClick={() => handleSubscribe("Enterprise", 1999)}
            className="mt-5 bg-green-600 text-white px-5 py-2 rounded"
          >
            Subscribe
          </button>
        </div>

      </div>

      <div className="text-center mt-8">
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

export default Plans;