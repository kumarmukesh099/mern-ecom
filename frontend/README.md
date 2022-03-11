# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


//Important details for refrence

//Rating without using materialui
  {/* <span>
                <i className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-start-half-alt' : 'far fa-star'}
                style={{color}}
                >
                </i>
            </span>
            <span>
                <i className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-start-half-alt' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-start-half-alt' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-start-half-alt' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-start-half-alt' : 'far fa-star'}>
                </i>
            </span> */}


Inner reducer initial value load first then the middleware reducer value


//we have dotenv to set the process.env in .env file
//redux-thunk allow us to make asyncronous request
//redux-thunk allow us to have function within a function
//react-redux we use to bring data into the components and globally
//we have the getState to access all the redux reducer data
//usefull
https://stackoverflow.com/questions/65810726/show-image-in-square-grid-react-material-ui-grid/65866258
//pm.environment.set("token", pm.response.json().token)
to save token in any route in postman


we can add a prehook on schema but we can't use it with virtual schema
//like a prehook
// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt)  

// })

//    await User.create({
//      game : 12,
//      name, //we can also use User.create({name, email,password})
//      email,
//      password
//    });


 [e.target.name] = e.target.value //you need square brackets to tell that this refers to dynamic key name 

user.create return data while user.UpdateOne return acknowledgement
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}

//to set token in postman
pm.environment.set("token", pm.response.json().token)
pm.environment.get("variable_key");


//we can use morgan to log the route & route time in the console

//multer to upload images

//react helmet allow us to add the meta tags

