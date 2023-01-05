import React, {Component} from 'react';
import Logo from './components/Logo/Logo';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import 'tachyons';
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'
import Particles from './components/Particles/Particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'


// FACE_DETECT_MODEL: "a403429f2ddf4b49b307e318f00e528b"
 // console.log(Clarifai);
// PAT f6e3ba661a594f1a813b049522f44b5d
// const app = new Clarifai.App ({
//   apiKey: '67fec3af62c2414a85e7da97a07aed42'
// });
  const USER_ID = 'laab19';
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'f6e3ba661a594f1a813b049522f44b5d';
  const APP_ID = 'my-first-application';
  // Change these to whatever model and image input you want to use
  const MODEL_ID = 'a403429f2ddf4b49b307e318f00e528b';
  const MODEL_VERSION_ID = '34ce21a40cc24b6b96ffee54aabff139';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }

    }
  }

loadUser = (data) => {
  this.setState({user :{
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBorder = (box) => {

    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const raw = JSON.stringify({
       "user_app_id": {
           "user_id": USER_ID,
           "app_id": APP_ID
       },
       "inputs": [
           {
               "data": {
                   "image": {
                       "url":  this.state.input
                   }
               }
           }
       ]
   });

   const requestOptions = {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Authorization': 'Key ' + PAT
       },
       body: raw
   };



   fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
       .then(response => response.json())
       .then(result => this.displayFaceBorder(this.calculateFaceLocation(result)))
       .catch(error => console.log('error', error));

 }
  render() {
    const {imageUrl, box, route, isSignedIn} = this.state;
    return (
      <div >

        <Particles />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        {route === 'home'
        ?  <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImgLinkForm
              onInputChange = {this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl = {imageUrl}/>
            </div>

        :  this.state.route ==='signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        : this.state.route === 'register'
          ? <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        : <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />

        }
      </div>
    );
  }
  }

export default App;
