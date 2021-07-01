document.getElementById("submit-btn").addEventListener("submit", (event) => {
  event.preventDefault();

  let username = document.getElementById("username-main").value;
  localStorage.setItem("username", username);

  const query = {
    query: `{
      user(login: "${username}") {
        id
      }
  }`,
  };

  const queryJSON = JSON.stringify(query);

  const options = {
    method: "post",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: queryJSON,
  };

  async function fetchData(url, options) {
    const response = await fetch(url, options);

    if (response.status === 200) {
      const result = await response.json();
      /*if (result.data.user.id) {
        window.location.href = "./profile.html";
      }*/

      if (result.data.user === null) {
        window.location.href = "./error.html";
      } else {
        window.location.href = "./profile.html";
      }
    } else {
      throw new Error(response.statusText);
    }
  }

  fetchData("https://api.github.com/graphql", options).catch((err) =>
    console.log(err)
  );
});
