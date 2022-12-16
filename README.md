## Description
This small project is an academy project. It was developed with native Web Development Languages. The project is subdivided in two parts such as: Front-end and Back-end. In Front-end, i build all user interfaces using basic HTML and CSS to draw layouts and controls and JavaScript to make some feedback with users and HTTP requests to back-end via Node.js. In Back-end, a simple Node.js API is developed to get and treat client requests. Express.js is used as a server to run this project. Note that each data is stored in a remote MySQL (PHP My Admin) database hosted on Web. The communication between Front-end and Back-end uses AJAX and data transfer uses JSON language. Sometime, a page reloading is required to make certain HTTP requests.

## Final result
This is the final result of the project:<br/><br/>
[![Watch the video](https://img.youtube.com/vi/MCtNSq67pv8/maxresdefault.jpg)](https://youtu.be/MCtNSq67pv8)

## Project installation

### <u>Install curl</u>:
```sh
sudo apt install curl
```

### <u>Install nodejs</u>:
```sh
cd ~
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
```
```sh
sudo bash /tmp/nodesource_setup.sh
```
```sh
sudo apt install nodejs
```
```sh
node -v
```

### <u>Install yarn with npm</u>:
NPM (Node Package Manager) is the default program that is automatically installed on Nodejs installation. You can use NPM directly when Nodejs is already installed.
```sh
sudo npm install yarn --global
```

### <u>Project cloning</u>:
```sh
git clone https://github.com/obrymec/Employees-Contracts-Manager employees-contracts-manager/
```

### <u>Install project dependencies</u>:
Go to the root folder of the project and run:
```sh
yarn install
```

### <u>Run project</u>:
Go to the root folder of the project and run:
```sh
yarn start
```
Go to your favorite browser and tap on the search bar the following link:
```sh
http://localhost:5000/
```

Enjoy :)
