/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Attendance {
    struct Student {
        string name;
        address walletAddress;
        bool registered;
    }

    struct AttendanceRecord {
        string studentName;
        uint256 timestamp;
    }

    mapping(address => Student) public students;
    AttendanceRecord[] public attendanceRecords;

    event StudentRegistered(string name, address walletAddress);
    event AttendanceMarked(string studentName, uint256 timestamp);

    // Function to register a student
    function registerStudent(string memory name) public {
        require(!students[msg.sender].registered, "Student already registered");
        students[msg.sender] = Student(name, msg.sender, true);
        emit StudentRegistered(name, msg.sender);
    }

    // Function to mark attendance
    function markAttendance() public {
        require(students[msg.sender].registered, "Student not registered");
        attendanceRecords.push(AttendanceRecord(students[msg.sender].name, block.timestamp));
        emit AttendanceMarked(students[msg.sender].name, block.timestamp);
    }

    // Function to get attendance records
    function getAttendanceRecords() public view returns (AttendanceRecord[] memory) {
        return attendanceRecords;
    }
}