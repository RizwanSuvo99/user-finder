let allUsers = [];

const users = document.querySelector("#users");
const searchUser = document.querySelector("#searchUser");
const searchUserBtn = document.querySelector("#searchUserBtn");

const url = "https://jsonplaceholder.typicode.com/users";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    allUsers = data;
    viewUsers(allUsers);
  });

searchUserBtn.addEventListener("click", () => {
  const inputData = searchUser.value.toLowerCase();

  const filterUser = allUsers.filter((user) => {
    const isNameMatched = user.name.toLowerCase() == inputData;
    const isUsernameMatched = user.username.toLowerCase() == inputData;
    const isEmailMatched = user.email.toLowerCase() == inputData;

    if (isNameMatched || isUsernameMatched || isEmailMatched) {
      return user;
    }
  });
  viewUsers(filterUser);
});

function viewUsers(data = []) {
  users.innerHTML = "";
  for (const user of data) {
    users.appendChild(userCard(user));
  }
}

function userCard(userData) {
  const div = document.createElement("div");
  div.className = "col-xl-3 col-md-6";
  div.innerHTML = `<div class="card">
  <img
    src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${userData?.name}</h5>
    <p class="card-text">
     <b> Email: </b>${userData?.email}
    </p>
    <p>
      <b>ID: </b>${userData?.id}
    </p>
  </div>
  <button
    type="button"
    class="btn btn-primary mb-3 mx-3"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal${userData?.id}"
  >
    More Details
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal${userData?.id}"
    tabindex="-1"
    aria-labelledby="exampleModalLabel${userData?.id}"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel${userData?.id}">
            Leanne Graham
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: ${userData?.username}</li>
            <li class="list-group-item">Email: ${userData?.email}</li>
            <li class="list-group-item">Phone: ${userData?.phone}</li>
            <li class="list-group-item">Website: ${userData?.website}</li>
          </ul>
          <p><strong>Address</strong><br/> street: ${userData?.address?.street}<br/>
          suite: ${userData?.address?.suite}<br/>
          city: ${userData?.address?.city}<br/>
          zipcode: ${userData?.address?.zipcode}<br/>
          </p>
          <p><strong>Company:</strong><br/> name: ${userData?.company?.name}<br/>
          catchPhrase: ${userData?.company?.catchPhrase}<br/>
          bs: ${userData?.company?.bs}<br/>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>`;

  return div;
}