import * as React from "react";
import ReactDOM from 'react-dom/client';
import AppTabMob from './AppTabMob';
import AppWeb from './AppWeb';

const App = () => {
    // Declare a new state variable with the "useState" Hook
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1400;
  
    React.useEffect(() => {
      /* Inside of a "useEffect" hook add an event listener that updates
         the "width" state variable when the window size changes */
      window.addEventListener("resize", () => setWidth(window.innerWidth));
  
      /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
    }, []);
  
    return width < breakpoint ? <AppTabMob /> : <AppWeb />;}
export default App