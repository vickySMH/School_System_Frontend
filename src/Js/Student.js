const url="http://localhost:8080/students"

async function addStudent(){

    let addForm = document.getElementById("addStudentForm");
    addForm.addEventListener("submit", () =>{
        let formName = document.getElementById("name").value;
        let formEmail = document.getElementById("email").value;

        let newStudentData = {
            name: formName,
            emailAddress: formEmail
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStudentData),
        })
            .then(res => res.json())
            .then(response => console.log("Success: ", response))
            .catch(error => console.error("Error: ", error))
    });
}

const fetchStudents = (url) => {
    return fetch(url)
        .then(res => res.json());
}

async function displayStudents(){
    const students = await fetchStudents(url)

    students.forEach(student => {
        document.getElementById("students").innerHTML +=
            `<table>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.emailAddress}</td>
                </tbody>
        </table> 
        `
    })
    document.getElementById("students").style.display = "block"
}

function showDiv(){
    if(document.querySelector(".hidden").style.display === "none"){
        document.querySelector(".hidden").style.display = "block";
    }
    else{
        document.querySelector(".hidden").style.display = "none"
    }
}