const url="http://localhost:8080/courses"

const fetchCourses = (url) => {
    return fetch(url)
        .then(res => res.json());
}

async function displayCourses(){
    const courses = await fetchCourses(url)

    courses.forEach(course => {
        document.getElementById("courses").innerHTML +=
            `<table>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>ECTS Points</th>
                    <th>Max Students</th>
<!--                    <th>Teacher Id</th>-->
                </thead>
                <tbody>
                    <td>${course.id}</td>
                    <td>${course.name}</td>
                    <td>${course.startDate}</td>
                    <td>${course.endDate}</td>
                    <td>${course.ectsPoints}</td>
                    <td>${course.maxStudents}</td>
<!--                    <td>${course.teacherId}</td>-->
                </tbody>
            </table>`
    })
    document.getElementById("courses").style.display = "block"
}

async function addCourse(){
    // document.getElementById("courses").style.display = "none"

    let addForm = document.getElementById("addCourseForm");
    addForm.addEventListener("submit", () =>{
        let formName = document.getElementById("name").value;
        let formStart = document.getElementById("startDate").value;
        let formEnd = document.getElementById("endDate").value;
        let formPoints = document.getElementById("points").value;
        let formMaxStudents = document.getElementById("maxStudents").value;

        let newCourseData = {
            name: formName,
            startDate: formStart,
            endDate: formEnd,
            ectsPoints: formPoints,
            maxStudents: formMaxStudents,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCourseData),
        })
            .then(res => res.json())
            .then(response => console.log("Success: ", response))
            .catch(error => console.error("Error: ", error))
    });

    document.getElementById("courses").style.display = "none"
}

function showDiv(){
    if(document.querySelector(".hidden").style.display === "none"){
        document.querySelector(".hidden").style.display = "block";
    }
    else{
        document.querySelector(".hidden").style.display = "none"
    }
}