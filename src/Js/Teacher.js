const url="http://localhost:8080/teachers"

async function addTeacher(){

    let addForm = document.getElementById('addTeacherForm');
    addForm.addEventListener('submit', () => {
        let formName = document.getElementById('name').value;
        let formEmail= document.getElementById('email').value;
        let newTeacherData = {
            name: formName,
            emailAddress: formEmail
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTeacherData),
        })
            .then(res => res.json())
            .then(response => console.log("Success: ", response))
            .catch(error => console.error("Error: ", error));
    });
}

const fetchTeachers = (url) => {
    return fetch(url)
        .then(res => res.json());
}

async function displayTeachers(){
    document.getElementById("specificTeacher").style.display="none"
    // document.getElementById("teacherByName").style.display="none"
    const teachers = await fetchTeachers(url)

    teachers.forEach(teacher => {
        document.getElementById("teachers").innerHTML +=
        `<table>
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
                <td>${teacher.id}</td>
                <td><input id="changeName" value="${teacher.name}"></td>
                <td><input id="changeEmail" value="${teacher.emailAddress}"></td>
                <td><button class="edit_button" onclick="editTeacher(${teacher.id})">Edit</button></td>
                <td><button class="delete_button"onclick="deleteTeacher(${teacher.id})">Delete</button></td>

            </tbody>
        </table> 
        `
    })
    document.getElementById("teachers").style.display = "block"
}

async function editTeacher(id) {
    const someData = {
        name: document.getElementById("changeName").value,
        emailAddress: document.getElementById("changeEmail").value
    }
    const putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(someData)
    }

    fetch(url+`/${id}`, putMethod)
        .then(response => response.json())
        .catch(err => console.log(err))

    document.location.reload();

}

async function deleteTeacher(id){
    const deleteTeacher= {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
    }
    fetch(url + `/${id}`, deleteTeacher)
        .catch(err => console.log(err))
    document.location.reload()
}

async function searchTeacherById(){
    document.getElementById("teachers").style.display="none"
    // document.getElementById("teacherByName").style.display="none"
    const id = document.getElementById("searchTeacherById").value
    const searchById = await fetchTeachers(url + `/${id}`)

    document.getElementById("specificTeacher").innerHTML =
        `<table>
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
            </thead>
            <tbody>
                <td>${searchById.id}</td>
                <td>${searchById.name}</td>
                <td>${searchById.emailAddress}</td>
            </tbody>
        </table> 
        `
    document.getElementById("specificTeacher").style.display="block"
}

// async function searchTeacherByName(){
//
//     document.getElementById("teachers").style.display="none"
//     document.getElementById("specificTeacher").style.display="none"
//
//     const name = document.getElementById("searchTeacherByName").value
//     const searchByName = await fetchTeachers(url + `/name?name=${name}`)
//
//     document.getElementById("teacherByName").innerHTML =
//         `<table>
//             <thead>
//                 <th>Id</th>
//                 <th>Name</th>
//                 <th>Email</th>
//             </thead>
//             <tbody>
//                 <td>${searchByName.id}</td>
//                 <td>${searchByName.name}</td>
//                 <td>${searchByName.emailAddress}</td>
//             </tbody>
//         </table>
//         `
//     document.getElementById("teacherByName").style.display="block"
// }

function showDiv(){
    if(document.querySelector(".hidden").style.display === "none"){
        document.querySelector(".hidden").style.display = "block";
    }
    else{
        document.querySelector(".hidden").style.display = "none"
    }
}

