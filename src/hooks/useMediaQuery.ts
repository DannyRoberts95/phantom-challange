import { useEffect, useState } from 'react';

// screen sizes
const screens = {
  xs: `360px`,
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
};

// media breakpoints
const breakpoints: {
  xs: string[];
  sm: string[];
  md: string[];
  lg: string[];
  xl: string[];
} = {
  xs: [`xs`],
  sm: [`xs`, `sm`],
  md: [`xs`, `sm`, `md`],
  lg: [`xs`, `sm`, `md`, `lg`],
  xl: [`xs`, `sm`, `md`, `lg`, `xl`],
};

//grab a media breakpoint px value
const getBreakpointValue = (value: string): number =>
  +screens[value].slice(0, screens[value].indexOf(`px`));

// Get the current breakpoint of the screen
const getCurrentBreakpoint = (): string => {
  let currentBreakpoint: string = Object.keys(screens)[0];
  let biggestBreakpointValue = 0;
  Object.keys(screens).forEach((breakpointKey) => {
    const breakpointValue = getBreakpointValue(breakpointKey);
    if (
      // if the breakpoint is bigger then the last one checked and is less then the window width...
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      // update the stored the breakpoint value
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpointKey;
    }
  });
  return currentBreakpoint;
};

export default function useMediaQuery(size: string) {
  const [media, setMedia] = useState(false);
  const [screenWidth, setScreenWidth] = useState();

  const handleResize = () => {
    const { innerWidth } = window;
    setScreenWidth(innerWidth);
  };

  //Add resize event listner to update breakpoint on screen change
  useEffect(() => {
    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  //Check current breakpoint whenever the requested size of screen size changes
  useEffect(() => {
    const currentBreakpoint = getCurrentBreakpoint();
    let val =
      breakpoints[
        Object.keys(breakpoints)[Object.keys(breakpoints).length - 1]
      ];
    if (breakpoints[currentBreakpoint]) {
      val = breakpoints[currentBreakpoint].includes(size);
    }
    setMedia(val);
  }, [screenWidth, size]);

  return media;
}
