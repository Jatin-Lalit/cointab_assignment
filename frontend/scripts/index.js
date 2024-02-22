async function fetchAllUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    let html = "";

    users.forEach((user) => {
      html += `<div class="user-card">
                    <div class="user-info"><strong>Name:</strong> ${user.name}</div>
                    <div class="user-info"><strong>Email:</strong> ${user.email}</div>
                    <div class="user-info"><strong>Phone:</strong> ${user.phone}</div>
                    <div class="user-info"><strong>Website:</strong> ${user.website}</div>
                    <div class="user-info"><strong>City:</strong> ${user.address.city}</div>
                    <div class="user-info"><strong>Company:</strong> ${user.company.name}</div>
                    <button id="add_button_${user.id}" style="background-color: green; color: white;" onclick="addUser('${user.id}', '${user.name}', '${user.email}', '${user.phone}', '${user.website}', '${user.address.city}', '${user.company.name}')">Add</button>
<button id="open_button_${user.id}" style="display: none; background-color: yellow; color: black;" onclick="openUser(${user.id}, '${user.name}', '${user.company.name}')">Open</button>

                    
                </div>`;
    });

    document.getElementById("userList").innerHTML = html;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

async function addUser(id, name, email, phone, website, city, company) {
  const user_id = id;
  try {
    const response = await fetch("http://localhost:3000/user/add/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        name,
        email,
        phone,
        website,
        city,
        company,
      }),
    });

    if (response.ok) {
      alert("User added successfully");
    } else {
      const errorData = await response.json();
      alert(errorData.message);

      document.getElementById(`add_button_${user_id}`).style.display = "none";
      document.getElementById(`open_button_${user_id}`).style.display = "block";
    }
  } catch (err) {
    alert("Error adding user:", err);
  }
}

function openUser(userId, userName, companyName) {
  window.location.href = `post.html?userId=${userId}&userName=${userName}&companyName=${companyName}`;
}
