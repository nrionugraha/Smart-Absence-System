const { ethers } = window.ethers;

let provider;
let signer;
let attendanceContract;
const attendanceAddress = "0xF605558831a53e358964256695c91eCdC0d35918"; // Replace with your deployed contract address

async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
        alert("Please install MetaMask to use this application.");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Request account access
    try {
        await provider.send("eth_requestAccounts", []);
    } catch (error) {
        console.error("User  denied account access:", error);
        return;
    }

    signer = provider.getSigner();
    attendanceContract = new ethers.Contract(attendanceAddress, [
        "function registerStudent(string memory name) public",
        "function markAttendance() public",
        "function getAttendanceRecords() public view returns (tuple(string studentName, uint256 timestamp)[])",
        "function students(address) public view returns (string memory, address, bool)",
        "event AttendanceMarked(string studentName, uint256 timestamp)"
    ], signer);


    // Load previous attendance records
    await updateAttendanceRecords();
    document.getElementById("registerButton").style.display = "inline-block";
    document.getElementById("markAttendanceButton").style.display = "inline-block";
    document.getElementById("downloadButton").style.display = "inline-block";

    await displayStudentName();
    
    // Listen for AttendanceMarked events
    attendanceContract.on("AttendanceMarked", (studentName, timestamp) => {
        console.log("Attendance marked:", studentName, timestamp);
        updateAttendanceRecords(); // Update records when attendance is marked
    });
}

async function connectWallet() {
    // Disconnect the current provider
    provider = null;
    signer = null;
    attendanceContract = null;

    await init();
}

async function registerStudent() {
    const name = prompt("Enter your name:");
    if (name) {
        try {
            await attendanceContract.registerStudent(name);
            alert("Student registered successfully!");
        } catch (error) {
            console.error("Error registering student:", error);
            alert("Failed to register student. Please check the console for details.");
        }
    }
}

async function displayStudentName() {
    try {
        const address = await signer.getAddress(); // Get the connected wallet address
        console.log("Fetching student for address:", address);
        
        const student = await attendanceContract.students(address); // Fetch student data
        
        const studentNameElement = document.getElementById("studentName");

        if (student[2]) { // Check if registered (boolean at index 2)
            studentNameElement.innerText = `Registered Student: ${student[0]}`;
        } else {
            studentNameElement.innerText = "No student registered for this wallet.";
        }
    } catch (error) {
        console.error("Error fetching student name:", error);
        document.getElementById("studentName").innerText = "Error fetching student name.";
    }
}



async function markAttendance() {
    try {
        await attendanceContract.markAttendance();
        alert("Attendance marked successfully!");
        // No need to call updateAttendanceRecords here, as it will be called via the event listener
    } catch (error) {
        console.error("Error marking attendance:", error);
        alert("Failed to mark attendance. Please check the console for details.");
    }
}

async function updateAttendanceRecords() {
    try {
        const records = await attendanceContract.getAttendanceRecords();
        const attendanceBody = document.getElementById("attendanceBody");
        attendanceBody.innerHTML = ""; // Clear existing records

        // Get today's date
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        records.forEach(record => {
            const recordDate = new Date(record.timestamp * 1000).toISOString().split('T')[0]; // Format: YYYY-MM-DD
            if (recordDate === todayString) { // Check if the record date matches today's date
                const row = document.createElement("tr");
                row.innerHTML = `<td>${record.studentName}</td><td>${new Date(record.timestamp * 1000).toLocaleDateString()}</td><td>${new Date(record.timestamp * 1000).toLocaleTimeString()}</td>`;
                attendanceBody.appendChild(row);
            }
        });
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        alert("Failed to load attendance records. Please check the console for details.");
    }
}


document.getElementById("downloadButton").onclick = async function() {
    const records = await attendanceContract.getAttendanceRecords();
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Date,Timestamp\n";

    records.forEach(record => {
        const date = new Date(record.timestamp * 1000).toLocaleDateString();
        const time = new Date(record.timestamp * 1000).toLocaleTimeString();
        csvContent += `${record.studentName},${date},${time}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

document.getElementById("connectWalletButton").onclick = connectWallet;
document.getElementById("registerButton").onclick = registerStudent;
document.getElementById("markAttendanceButton").onclick = markAttendance;

// Remove the automatic init call on window load
//window.onload = init;