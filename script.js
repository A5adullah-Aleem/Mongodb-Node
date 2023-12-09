const urlg = "http://localhost:3004/students";

function getStudents() {
  fetch(urlg)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const table = document.getElementById("table");
      table.innerHTML = `<tr>
                            <td class="bold">Name</td>
                            <td class="bold">Marks</td>
                            <td>Operation</td>
                        </tr>`;
      data.forEach((element) => {
        const row = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const delBtn = document.createElement("button");
        const editBtn = document.createElement("button");

        td1.innerHTML = element.Name;
        td2.innerHTML = element.Marks;

        row.elementId = element._id;
        row.appendChild(td1);
        row.appendChild(td2);

        delBtn.innerHTML = "Delete";
        editBtn.innerHTML = "Edit";

        td3.appendChild(delBtn);
        td3.appendChild(editBtn);
        row.appendChild(td3);

        delBtn.addEventListener("click", () => {
          fetch( urlg + "/" + element._id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(() => {
              getStudents();
            });
        });
        editBtn.addEventListener("click", () => {
            const modal = document.getElementById("editModal");
            modal.dataset.studentId = element._id;
            openModal();
        });
        
        table.appendChild(row);
      });
    });
}

document.getElementById("post").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const marks = document.getElementById("Marks").value;

  fetch(urlg, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ Name: name, Marks: marks }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      document.getElementById("name").value = "";
      document.getElementById("Marks").value = "";
      getStudents();
    });
});

getStudents();

//modal
function openModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

function updateStudent() {
  const newName = document.getElementById("editName").value;
  const newMarks = document.getElementById("editMarks").value;
  const studentId = document.getElementById("editModal").dataset.studentId;

  console.log("clicked");

  fetch(urlg + "/" + studentId, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ Name: newName, Marks: newMarks }),
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      return response.json();
  })
  .then(() => {
      closeModal();
      getStudents();
  }) 
  .catch((error) => {
      console.error("Error updating student:", error);
  });
}