# Project Info
Needed installed programs : MongoDB(DataBase Name : OMM; Collection Name : monuments) , some node packages
Monument Schema:
{
    "name": String,
    "description": String,
    "address": String,
    "date": Date
    "monumentView": String,
    "registryNumber": int64
}
# Start project
git clone https://github.com/EgorOnufreychuk/omm_playground.git -b Egor - clone branch
# Start MongoDB server 
1. cd omm_playground/api
2. npm i express mongoose
3. nodemon server (autoreload , if something changed)
# Start React project
1. cd omm_playground/client
2. npm i - install node packages
3. npm start - start 
