import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Steps from './Components/Steps';
import Loader from './Components/Loader';
import { OnsetsAndFrames } from '@magenta/music';
import * as React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      model:null,
      modelLoaded:false
    }
    this.loader=React.createRef(null);
  }
  componentDidMount(){

    this.model=new OnsetsAndFrames('https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni');

    this.model.initialize().then((data)=>{
      this.setState({modelLoaded:true});
          this.setState({model:this.model})  
      console.log('loaded')
        // this.loader.current.style.opacity=0
        // setTimeout(()=>{
        //   this.loader.current.style.display='none'
        // },250)
    })
}
  render(){
    return (
      <div className="App">
        <Header/>
        {
          !this.state.modelLoaded?
          <Loader ref={this.loader} />
          :
          <Steps model={this.state.model}/>
        }
      </div>
    );
  }
}

export default App;
