from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import re
from bson import ObjectId   
from werkzeug.security import generate_password_hash,check_password_hash
from datetime import datetime
client = MongoClient("mongodb://localhost:27017/")
db = client["saas_billing"]
users = db["users"] 
subscriptions = db["subscriptions"]
invoices_data=db["invoices"]
admins=db["admin"] 
app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "Flask Backend Running Succesfully"
# Dummy user data
users = db["users"]
subscriptions = db["subscriptions"]
invoices_data= db["invoices"]
# Register API


@app.route('/register', methods=['POST'])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")


 # Required fields
    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

 # Name validation
    if not re.match(r'^[A-Za-z ]+$', name):
        return jsonify({
            "success": False,
            "message": "Name should contain only letters"
        }), 400

# Email validation
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return jsonify({
            "success": False,
            "message": "Invalid email format"
        }), 400
    
     # Password validation
    if len(password) < 8:
        return jsonify({
            "success": False,
            "message": "Password must be at least 8 characters"
        }), 400
    
   # Check existing email
    existing_user = users.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 409

    # Hash password
    hashed_password = generate_password_hash(password)

    users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({
        "success": True,
        "message": "User Registered Successfully"
    }), 201


# Login API
@app.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    # Admin Check
    admin = admins.find_one({"email": email})

    if admin and admin["password"] == password:
        return jsonify({
            "success": True,
            "role": "admin",
            "message": "Admin Login Successful"
        }), 200

    # User Check
    user = users.find_one({"email": email})

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    if check_password_hash(user["password"], password):
        return jsonify({
            "success": True,
            "role": "user",
            "message": "Login Successful"
        }), 200

    return jsonify({
        "success": False,
        "message": "Invalid Password"
    }), 401
#admin dashboard API
@app.route("/admin/users", methods=["GET"])
def get_users():

    users_data = list(
        users.find({}, {"_id": 0})
    )

    return jsonify(users_data)
@app.route("/admin/stats")
def admin_stats():

    total_users = users.count_documents({})

    active_subscriptions = subscriptions.count_documents({
        "status": "Active"
    })

    total_revenue = 0

    for invoice in invoices_data.find():
        total_revenue += invoice.get("amount", 0)

    return jsonify({
        "totalUsers": total_users,
        "activeSubscriptions": active_subscriptions,
        "totalRevenue": total_revenue
    })

@app.route("/admin/subscriptions")
def admin_subscriptions():

    data = []

    for sub in subscriptions.find({}, {"_id": 0}):
        data.append(sub)

    return jsonify(data)

@app.route("/subscribe", methods=["POST"])
def subscribe():

    data = request.json

    user_email = data["user_email"]
    plan = data["plan"]
    price = data["price"]

    subscription = {
        "user_email": user_email,
        "plan": plan,
        "price": price,
        "status": "Active"
    }

    subscriptions.insert_one(subscription)

    invoice = {
        "user_email": user_email,
        "plan": plan,
        "amount": price,
        "status": "Paid",
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    print(invoice)

    invoices_data.insert_one(invoice)

    return jsonify({
        "message": "Subscription Created"
    })

@app.route("/my_subscription/<email>", methods=["GET"])
def my_subscription(email):

    subscription = subscriptions.find_one(
        {"user_email": email},
        {"_id": 0}
    )

    if subscription:
        return jsonify(subscription)

    return jsonify({"message": "No subscription found"}), 404

@app.route("/invoices/<email>", methods=["GET"])
def get_invoices(email):

    invoices = list(
        invoices_data.find(
            {"user_email": email},
            {"_id": 0}
        )
    )
    return jsonify(invoices)

@app.route("/admin/invoices")
def admin_invoices():
    data = []

    for invoice in invoices_data.find({}, {"_id": 0}):
        data.append(invoice)

    return jsonify(data)

#cancel subscription
@app.route("/admin/cancel-subscription", methods=["PUT"])
def cancel_subscription():
    data = request.json
    email = data.get("user_email")

    db.subscriptions.update_one(
        {"user_email": email},
        {"$set": {"status": "Cancelled"}}
    )

    return jsonify({"message": "Subscription cancelled"})
if __name__ == '__main__':
    print(app.url_map)
    app.run(debug=True)