MONGODB 
------------------------------------
    1. download mongoDB    cd ..
    2. download robomongo  https://robomongo.org/download
    3. install mongoDB     (No user auth)
    4. install robomongo   add local connection
    5. create nodall Database
    6. open ./resources/config.json verify db properties
    7. Uncomment in ./src/G.ts (global vars)
                 in method 'setupDBManager' -> this.createSomeUsers()
              to create 3 users on the nodall DB;
    8. Execute code once
    9. Comment in ./src/G.ts (global vars)
               in method 'setupDBManager' -> this.createSomeUsers()

FILES & FOLDERS (WORKSPACE)
------------------------------------
    ./_readme.txt                       // this file (maintain updated)
    ./gulpfile.js                       // gulp file config (build tool)
    ./package.json                      // local project definition              
    ./tsconfig.json                     // Typescript build configuration for 'tsify' browserify plugin  

    ./src                               // All TS source files 
    ./src/index.ts                      // Main Entry code
    ./src/IConfig.ts                    // Interface for ./src/resources/config.json file. All external data needed to execute the code
    ./src/G.ts                          // Global object for accessing to file config, db modules etc...
    ./src/resources                     // all external files needed by the server
    ./src/routes                        // definition in separate files for the different api routes
    ./src/db                            // mongoDB Manager and Collection Class
    ./src/db/models                     // create a folder foreach model.
                                            - [ModelName].ts            -> Model definition
    ./src/db/collections                // Create the mongoDB collection (class extend DBCollection<T>) for the model
                                        // We separate Model from collection because models will be in the future compiled as anindependent module for Web apps


GULP TASKS 
------------------------------------

    [ Main Commands ]    
    1. gulp clean               - remove "./dist/" folder
    2. gulp build-debug         - to "./bin/debug"   copy "src/www", build "src/style/", build "scr/app"
    3. gulp build-release       - to "./bin/release" copy "src/www", build "src/style/", build "scr/app"
    4. gulp building            - task build-debug and watch for any chandes in "scr/app" and "src/style"


START  
------------------------------------

    1. open command and execute         gulp watch_all (see gulp task description)
    2. Debug                            press 'F5' to start app in debug mode
    3. normal                           npm start (start without debug)
        