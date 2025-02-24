// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
    const Attendance = await ethers.getContractFactory("Attendance");
    const attendance = await Attendance.deploy();
    await attendance.waitForDeployment();
    console.log("Attendance contract deployed to:", await attendance.getAddress());
}

// Run the deploy script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });