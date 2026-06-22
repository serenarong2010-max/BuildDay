// Schools Page JavaScript

// Student List Management
let studentCount = 0;

function addStudent() {
    const studentList = document.getElementById('studentList');
    const newEntry = document.createElement('div');
    newEntry.className = 'student-entry';
    newEntry.innerHTML = `
        <input type="text" placeholder="Student Name" class="student-name">
        <input type="text" placeholder="Grade" class="student-grade">
        <button type="button" class="remove-student-btn" onclick="removeStudent(this)" title="Remove student">×</button>
    `;
    studentList.appendChild(newEntry);
    studentCount++;
    updateRegistrationSummary();
    
    // Animate the new entry
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        newEntry.style.transition = 'all 0.3s';
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 10);
}

function removeStudent(button) {
    const entry = button.parentElement;
    const studentList = document.getElementById('studentList');
    
    // Don't remove if it's the last entry
    if (studentList.children.length > 1) {
        entry.style.transition = 'all 0.3s';
        entry.style.opacity = '0';
        entry.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            entry.remove();
            studentCount--;
            updateRegistrationSummary();
        }, 300);
    }
}

function updateRegistrationSummary() {
    const studentList = document.getElementById('studentList');
    const summary = document.getElementById('registrationSummary');
    const totalStudents = document.getElementById('totalStudents');
    const schoolID = document.getElementById('schoolID');
    const summarySchoolID = document.getElementById('summarySchoolID');
    
    const entries = studentList.querySelectorAll('.student-entry');
    let filledEntries = 0;
    
    entries.forEach(entry => {
        const nameInput = entry.querySelector('.student-name');
        if (nameInput && nameInput.value.trim()) {
            filledEntries++;
        }
    });
    
    if (filledEntries > 0) {
        summary.style.display = 'block';
        totalStudents.textContent = filledEntries;
        summarySchoolID.textContent = schoolID.value || '-';
    } else {
        summary.style.display = 'none';
    }
}

// Update summary when school ID changes
const schoolIDInput = document.getElementById('schoolID');
if (schoolIDInput) {
    schoolIDInput.addEventListener('input', updateRegistrationSummary);
}

// Update summary when student names change
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('student-name')) {
        updateRegistrationSummary();
    }
});

function getStudentList() {
    const studentList = document.getElementById('studentList');
    const entries = studentList.querySelectorAll('.student-entry');
    const students = [];
    
    entries.forEach(entry => {
        const nameInput = entry.querySelector('.student-name');
        const gradeInput = entry.querySelector('.student-grade');
        
        if (nameInput && nameInput.value.trim()) {
            students.push({
                name: nameInput.value.trim(),
                grade: gradeInput ? gradeInput.value.trim() : ''
            });
        }
    });
    
    return students;
}

// School Registration Form Validation and Submission
const schoolRegisterForm = document.getElementById('schoolRegisterForm');
const schoolSuccessMessage = document.getElementById('schoolSuccessMessage');

if (schoolRegisterForm) {
    schoolRegisterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearSchoolErrors();
        
        // Validate form
        let isValid = true;
        
        // School Name validation
        const schoolName = document.getElementById('schoolName');
        if (!schoolName.value.trim()) {
            showSchoolError('schoolName', 'Please enter your school name');
            isValid = false;
        }
        
        // School ID validation
        const schoolID = document.getElementById('schoolID');
        if (!schoolID.value.trim()) {
            showSchoolError('schoolID', 'Please enter your school ID');
            isValid = false;
        }
        
        // School Type validation
        const schoolType = document.getElementById('schoolType');
        if (!schoolType.value) {
            showSchoolError('schoolType', 'Please select school type');
            isValid = false;
        }
        
        // School Address validation
        const schoolAddress = document.getElementById('schoolAddress');
        if (!schoolAddress.value.trim()) {
            showSchoolError('schoolAddress', 'Please enter school address');
            isValid = false;
        }
        
        // Contact Name validation
        const contactName = document.getElementById('contactName');
        if (!contactName.value.trim()) {
            showSchoolError('contactName', 'Please enter your name');
            isValid = false;
        }
        
        // Contact Title validation
        const contactTitle = document.getElementById('contactTitle');
        if (!contactTitle.value.trim()) {
            showSchoolError('contactTitle', 'Please enter your title/role');
            isValid = false;
        }
        
        // Contact Email validation
        const contactEmail = document.getElementById('contactEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!contactEmail.value.trim()) {
            showSchoolError('contactEmail', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(contactEmail.value)) {
            showSchoolError('contactEmail', 'Please enter a valid email');
            isValid = false;
        }
        
        // Contact Phone validation
        const contactPhone = document.getElementById('contactPhone');
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!contactPhone.value.trim()) {
            showSchoolError('contactPhone', 'Please enter phone number');
            isValid = false;
        } else if (!phoneRegex.test(contactPhone.value)) {
            showSchoolError('contactPhone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Student Count validation
        const studentCount = document.getElementById('studentCount');
        if (!studentCount.value) {
            showSchoolError('studentCount', 'Please enter number of students');
            isValid = false;
        } else if (studentCount.value < 1 || studentCount.value > 500) {
            showSchoolError('studentCount', 'Please enter a number between 1 and 500');
            isValid = false;
        }
        
        // Grade Levels validation
        const gradeLevels = document.getElementById('gradeLevels');
        if (!gradeLevels.value.trim()) {
            showSchoolError('gradeLevels', 'Please enter grade levels');
            isValid = false;
        }
        
        // Age Range validation
        const ageRange = document.getElementById('ageRange');
        if (!ageRange.value) {
            showSchoolError('ageRange', 'Please select age range');
            isValid = false;
        }
        
        // Terms agreement validation
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            showSchoolError('agreeTerms', 'You must confirm authorization');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            // In a real application, you would send this data to a server
            console.log('School registration submitted:', {
                schoolID: schoolID.value,
                schoolName: schoolName.value,
                schoolType: schoolType.value,
                schoolAddress: schoolAddress.value,
                contactName: contactName.value,
                contactTitle: contactTitle.value,
                contactEmail: contactEmail.value,
                contactPhone: contactPhone.value,
                studentCount: studentCount.value,
                gradeLevels: gradeLevels.value,
                ageRange: ageRange.value,
                priorExperience: document.getElementById('priorExperience').value,
                specialNeeds: document.getElementById('specialNeeds').value,
                goals: document.getElementById('goals').value,
                students: getStudentList()
            });
            
            // Hide form and show success message
            schoolRegisterForm.style.display = 'none';
            schoolSuccessMessage.style.display = 'block';
            
            // Scroll to success message
            schoolSuccessMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
}

function showSchoolError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.style.borderColor = '#E2231A';
        }
    }
}

function clearSchoolErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.register-form input, .register-form select, .register-form textarea');
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.style.borderColor = '#e0e0e0';
        }
    });
}

// Real-time validation feedback for school form
const schoolInputs = ['schoolName', 'contactEmail', 'contactPhone', 'studentCount'];
schoolInputs.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input) {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                if (fieldId === 'contactEmail') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        showSchoolError('contactEmail', 'Please enter a valid email');
                    }
                } else if (fieldId === 'contactPhone') {
                    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                    if (!phoneRegex.test(this.value)) {
                        showSchoolError('contactPhone', 'Please enter a valid phone number');
                    }
                } else if (fieldId === 'studentCount') {
                    if (this.value < 1 || this.value > 500) {
                        showSchoolError('studentCount', 'Please enter a number between 1 and 500');
                    }
                }
            }
        });
    }
});

// Smooth scrolling for schools page navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Mobile Navigation Toggle for schools page
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Active navigation highlighting for schools page
const sections = document.querySelectorAll('section[id]');

if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.style.color = '';
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref === `#${current}`) {
                link.style.color = 'var(--secondary-yellow)';
            }
        });
    });
}

// Navbar background on scroll for schools page
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(17, 17, 17, 0.98)';
        } else {
            navbar.style.background = 'var(--dark-bg)';
        }
    }
});
