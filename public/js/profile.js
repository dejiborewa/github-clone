let username = localStorage.getItem("username");

const query = {
  query: `{
    user(login: "${username}") {
      id
      name
      bio
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      login
      repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          forks {
            totalCount
          }
          stargazers {
            totalCount
          }
         
          url
          pushedAt
          languages(first: 3, orderBy: {field: SIZE, direction: ASC}) {
            nodes {
              color
              name
            }
          }
        }
      }
      starredRepositories {
        totalCount
      }
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
    const img = document.createElement("img");

    const img_small = document.createElement("img");
    const arrayOfRepos = result.data.user.repositories.nodes;
    document.getElementById("my-name").textContent = result.data.user.name;
    document.getElementById("username").textContent = result.data.user.login;
    document.getElementById("bio").textContent = result.data.user.bio;
    document.getElementById("followers").textContent =
      result.data.user.followers.totalCount;
    document.getElementById("following").textContent =
      result.data.user.following.totalCount;
    document.getElementById("starredRepo").textContent =
      result.data.user.starredRepositories.totalCount;
    document.getElementById("repo-number").textContent =
      result.data.user.repositories.totalCount;
    img.src = result.data.user.avatarUrl;
    img_small.src = result.data.user.avatarUrl;
    img.loading = "eager";
    img.alt = "Change your avatar";
    document.getElementById("avatar").appendChild(img);
    document.getElementById("avatar-small").appendChild(img_small);

    arrayOfRepos.map((repo) => {
      // Dynamically creating DOM Elements
      const repositories = document.getElementById("repositories");
      const repoName = document.createElement("a");
      const repoDescription = document.createElement("div");
      const button = document.createElement("button");
      const labels = document.createElement("div");
      const pushedAt = document.createElement("span");
      const language = document.createElement("span");
      const languageColor = document.createElement("span");

      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      const pushedAtDate = repo.pushedAt;
      const pushedAtMonth = pushedAtDate.split("").splice(5, 2).join("");
      const pushedAtDay = pushedAtDate.split("").splice(8, 2).join("");
      const pushedAtYear = pushedAtDate.split("").splice(0, 4).join("");

      // Adding content to DOM Elements
      repoName.textContent = repo.name;
      repoName.href = repo.url;
      repoDescription.textContent = repo.description;
      pushedAt.textContent = `Updated on ${
        month[Number(pushedAtMonth) - 1]
      } ${pushedAtDay}, ${pushedAtYear}`;
      button.innerHTML = `<svg  height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" fill="#586069" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      <span>Star</span>`;

      // If repo has highlighted languages
      if (repo.languages.nodes.length >= 1) {
        language.textContent = repo.languages.nodes[0].name;
        languageColor.style.backgroundColor = repo.languages.nodes[0].color;

        language.classList.add("language");
        languageColor.classList.add("language-color");

        for (let i = 0; i < 1; i++) {
          labels.appendChild(languageColor);
          labels.appendChild(language);
        }
      }

      // if stars and forks are more than zero
      if (repo.stargazers.totalCount > 0) {
        const stars = document.createElement("span");
        const forks = document.createElement("span");

        stars.innerHTML = `<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" fill='#586069' d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                          <span>${repo.stargazers.totalCount}</span>`;
        forks.innerHTML = `<svg aria-label="fork" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" fill='#586069' d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg><span>${repo.forks.totalCount}</span>`;

        stars.classList.add("repo-star");
        forks.classList.add("repo-forks");

        for (let i = 0; i < 1; i++) {
          labels.appendChild(stars);
          labels.appendChild(forks);
        }
      }

      // Adding classes
      repoName.classList.add("repo-name");
      repoDescription.classList.add("repo-description");
      pushedAt.classList.add("pushedAt");
      button.classList.add("button-star");
      labels.classList.add("labels");

      // Creating variables for DOM elements with different multiple children
      const individualRepo = document.createElement("div");
      const individualRepoData = document.createElement("div");
      const individualRepoStar = document.createElement("div");

      individualRepo.classList.add("individualRepo");
      individualRepoData.classList.add("individualRepoData");
      individualRepoStar.classList.add("individualRepoStar");

      // Appending multiple elements to one DOM Element
      for (let i = 0; i < 1; i++) {
        individualRepoData.appendChild(repoName);
        individualRepoData.appendChild(repoDescription);
        labels.appendChild(pushedAt);
        individualRepoStar.appendChild(button);
      }

      individualRepo.appendChild(individualRepoData);
      individualRepo.appendChild(individualRepoStar);
      individualRepoData.appendChild(labels);
      repositories.appendChild(individualRepo);
    });
  } else {
    throw new Error(response.statusText);
  }
}

fetchData("https://api.github.com/graphql", options).catch((err) =>
  console.log(err)
);
