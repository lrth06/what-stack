# whatStack?

This is a visual representation of a user's code usage. It utilizes an [Express](https://expressjs.com/) proxy server and [React](https://reactjs.com/) frontend. The proxy server will query the github API for a given user's repositories, then analyze their code usage within.

## To use

```bash
git clone https://github.com/lrth06/what-stack.git
cd what-stack
touch .env
echo "GITHUB_TOKEN=<your-github-token>" >> .env
yarn install
yarn start
```

in a new terminal window:

```bash
cd client
yarn install
yarn start
```

then visit http://localhost:3000/ in your browser.

### Server Only

```bash
git clone https://github.com/lrth06/what-stack.git
cd what-stack
touch .env
echo "GITHUB_TOKEN=<your-github-token>" >> .env
yarn install
yarn start
```

in a new terminal window:

```bash
curl http://localhost:5000/<username>
## response
[{"language":"Go","size":6775},{"language":"JavaScript","size":3429},{"language":"C","size":13},{"language":"Other","size":12},{"language":"HTML","size":7}]
```

---

> This project built with the assistance of [github copilot](https://copilot.github.com)
