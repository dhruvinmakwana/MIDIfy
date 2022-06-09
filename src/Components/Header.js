
import * as React from 'react';
class Header extends React.Component {
    render() {
      return (
          <div className='header'>
              <img src='logo.jpg' className='logo'></img>
              <p className='loader-text'>MIDIfy</p>
          </div>
      );
    }
  }
export default Header;