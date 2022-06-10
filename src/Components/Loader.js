
import * as React from 'react';
class Loader extends React.Component {
  render() {
    return (
      <div className='loader'>
        <video src="loader.mp4" muted loop autoPlay ></video>
        <p className='loader-text'>Please wait while we set up few things for you...</p>
        <p className='loader-text'> Illustrations taken from <a href="https://www.youtube.com/watch?v=eHwR9kTIMeI&ab_channel=PatrikPietschmann">
          Patrik Pietschmann
        </a> and  <a href="https://www.remotion.dev/docs/">
            Remotion</a> </p>

      </div>

    );
  }
}
export default Loader;