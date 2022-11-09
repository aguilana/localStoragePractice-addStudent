const studentForm = document.querySelector('#studentForm')
const studentContainer = document.querySelector('.students')

const nameInput = studentForm['name']
const ageInput = studentForm['age']
const rollInput = studentForm['roll']





// push elements into array when we need but also need to get items back on refresh
// parse will convert any string to any object ot array (need or) empty array
const students = JSON.parse(localStorage.getItem("students")) || [];

// addStudent will take 3 params - name, age, roll and push the object into the array
const addStudent = (name, age, roll) =>{
    students.push({
        name,
        age,
        roll,
    })

    // setting up local storage - takes a key and a value
    // students is an array so we need to convert to a string and then we need to get the student back
    localStorage.setItem('students', JSON.stringify(students))

    return { name, age, roll }
}


// create student will create the DOM element and append information
const createStudentElement = ( { name, age, roll } ) => {
    // main student container
    const studentSection = document.createElement('section')

    // 3 items to append to container
    const studentName = document.createElement('h2');
    const studentAge = document.createElement('p');
    const studentRoll = document.createElement('p');

    // innerText for DOM elements
    studentName.innerText = 'Student name: ' + name;
    studentAge.innerText = 'Student age: ' + age;
    studentRoll.innerText = 'Student roll: ' + roll;

    // classes for DOM elements
    studentSection.classList = `student-section student-${name}`

    // append student into to student container - Add to DOM
    studentSection.append(studentName, studentAge, studentRoll)

    // append student container to the main div - Add to DOM
    studentContainer.appendChild(studentSection)

    studentContainer.style.display = students.length > 0 ? 'flex' : 'none'
}

studentContainer.style.display = students.length > 0 ? 'flex' : 'none'

// loop through students array and run the createElement
students.forEach(createStudentElement)


studentForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    // create new Student with addStudent
    const newStudent = addStudent(
        nameInput.value,
        ageInput.value,
        rollInput.value
    );

    // once newStudent object is create then create Student Element (DOM element)
    createStudentElement(newStudent)

    nameInput.value = '';
    ageInput.value = '';
    rollInput.value = '';
})