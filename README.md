# github-clone

The web apps takes a valid github username, and returns the basic user information: from display picture to bio, and recent repositories. The application communicates with Github GraphQL API to pull data, the user interface is a github clone built with HTML and CSS.


To test it:

1) Get a personal access token from github at http://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token 
2) Create a .env file and store the personal access token in a variable named API_KEY
3) Run 'npm install' in terminal to get all the dependencies 
4) Run 'npm run build' in terminal to generate static assets
