// Reference form and student list elements
var studentForm = document.getElementById("studentForm");
var studentList = document.getElementById("studentList");

// Load students from localStorage and display them in table
function loadStudents() {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  studentList.innerHTML = ""; // Clear existing rows

  students.forEach(function(student, index) {
    var row = studentList.insertRow();
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
  });
}

// Validate form input before adding or editing
function validateInput(name, id, email, contact) {
  var nameRegex = /^[A-Za-z ]+$/;         // Only letters and spaces
  var idRegex = /^[A-Za-z0-9]+$/;         // Alphanumeric ID like "RA78768"
  var contactRegex = /^\d{10}$/;          // Exactly 10 digits
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format

  return (
    nameRegex.test(name) &&
    idRegex.test(id) &&
    contactRegex.test(contact) &&
    emailRegex.test(email)
  );
}

// Handle form submission: add or update student
studentForm.onsubmit = function(e) {
  e.preventDefault(); // Prevent page reload

  // Get form values
  var name = document.getElementById("name").value.trim();
  var id = document.getElementById("studentId").value.trim();
  var email = document.getElementById("email").value.trim();
  var contact = document.getElementById("contact").value.trim();

  // Validate inputs
  if (!validateInput(name, id, email, contact)) {
    alert("Please enter valid input.");
    return;
  }

  // Retrieve or initialize students array
  var students = JSON.parse(localStorage.getItem("students")) || [];

  // Check if we're editing an existing entry
  if (studentForm.dataset.editing !== undefined) {
    var index = parseInt(studentForm.dataset.editing);
    students[index] = { name, id, email, contact };
    delete studentForm.dataset.editing;
  } else {
    students.push({ name, id, email, contact });
  }

  // Save updated list to localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Clear form and refresh list
  studentForm.reset();
  loadStudents();
}

// Delete student by index
function deleteStudent(index) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1); // Remove from array
  localStorage.setItem("students", JSON.stringify(students));
  loadStudents();
}

// Load student data into form for editing
function editStudent(index) {
  var students = JSON.parse(localStorage.getItem("students")) || [];
  var student = students[index];

  // Fill form fields
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  // Set form to edit mode
  studentForm.dataset.editing = index;
}

// Load student data on page load
loadStudents();
