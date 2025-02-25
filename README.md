# 📌 SmartAbsenceLoyola

**A Blockchain-Based Student Attendance System for SMA Kolese Loyola**

## 🚀 About the Project
SmartAbsenceLoyola is a **decentralized student attendance system** built on **blockchain technology**. It provides a **secure, transparent, and tamper-proof** way to track attendance using **Ethereum smart contracts**, **MetaMask wallet integration**, and **real-time attendance updates**.

## 🎯 Key Features
✅ **Blockchain-Powered Attendance** – Attendance data is securely stored on the blockchain.  
✅ **MetaMask Wallet Integration** – Students must connect their wallets to register and mark attendance.  
✅ **Real-Time Tracking** – Attendance records update instantly and can be downloaded as a CSV report.  
✅ **Apple-Inspired UI** – Clean, dark mode interface for a modern and sleek experience.  
✅ **Decentralized & Secure** – Eliminates the risk of data manipulation or unauthorized changes.  

## 🛠️ Technologies Used
- **Solidity** (Smart Contract Development)
- **Hardhat** (Ethereum Development Environment)
- **Ether.js** (Blockchain Interaction)
- **HTML, CSS, JavaScript** (Frontend Development)
- **MetaMask** (Wallet Authentication)

## 📂 Project Structure
```
├── Attendance.sol    # Solidity Smart Contract
├── index.html        # Frontend (User Interface)
├── styles.css        # Styling (Dark Mode, Apple UI Design)
├── app.js            # JavaScript Logic (Ether.js, Contract Interaction)
```

## 🔧 Installation & Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nrionugraha/nrionugraha.github.io
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Deploy Smart Contract (Using Hardhat):**
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network sepolia  # Replace with your network
   ```
4. **Update Contract Address:**
   - Replace the placeholder contract address in `app.js` with your deployed contract's address.

## 🖥️ How to Use
1. **Connect MetaMask Wallet** (Click `Connect Wallet` on the homepage).
2. **Register as a Student** (Enter your name and register using your wallet address).
3. **Mark Attendance** (Click `Mark Attendance`, and your record will be saved on the blockchain).
4. **View Attendance Records** (Live updates displayed in the table).
5. **Download Report** (CSV format available for easy export).

## 🎯 Future Enhancements
🔹 Mobile-Friendly UI Optimization  
🔹 Multi-Class Attendance Tracking  
🔹 Admin Dashboard for Better Management  
🔹 Gas Fee Optimization for Transactions  

## 🤝 Contributing
We welcome contributions! Feel free to fork the repository, submit pull requests, or open issues for improvements.

## 📜 License
This project is licensed under the MIT License - see the `LICENSE` file for details.

---

🚀 **Join us in revolutionizing attendance management with blockchain!**

📧 Contact: your.email@example.com  
🌎 GitHub: [Your GitHub Link]  
💡 Made for SMA Kolese Loyola 🎓

