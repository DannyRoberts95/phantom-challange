import { useEffect, useState } from 'react';

// screen sizes
type ScreenTypes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};
const screens: ScreenTypes = {
  xs: `360px`,
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
};

// media breakpoints
type BreakPointTypes = {
  xs: string[];
  sm: string[];
  md: string[];
  lg: string[];
  xl: string[];
};
const breakpoints: BreakPointTypes = {
  xs: [`xs`],
  sm: [`xs`, `sm`],
  md: [`xs`, `sm`, `md`],
  lg: [`xs`, `sm`, `md`, `lg`],
  xl: [`xs`, `sm`, `md`, `lg`, `xl`],
};

//grab a media breakpoint px value
const getBreakpointValue = (value: string): number =>
  +screens[value as keyof ScreenTypes].slice(
    0,
    screens[value as keyof ScreenTypes].indexOf(`px`),
  );

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
  const [screenWidth, setScreenWidth] = useState<number>();

  const handleResize = () => {
    const { innerWidth } = window;
    setScreenWidth(innerWidth);
  };

  //Add resize event listner to update breakpoint on screen change
  useEffect(() => {
    window.addEventListener(`resize`, handleResize);
    return () => window.removeEventListener(`resize`, handleResize);
  }, []);

  // //Check current breakpoint whenever the requested size of screen size changes
  // useEffect(() => {
  //   const currentBreakpoint = getCurrentBreakpoint();
  //   let val = false;
  //   //default to largest breakpoint
  //   const breakpoint =
  //     breakpoints[
  //       Object.keys(breakpoints)[
  //         Object.keys(breakpoints).length - 1
  //       ] as keyof BreakPointTypes
  //     ];

  //   if (breakpoints[currentBreakpoint as keyof BreakPointTypes]) {
  //     val =
  //       breakpoints[currentBreakpoint as keyof BreakPointTypes].includes(size);
  //   }
  //   setMedia(val);
  // }, [screenWidth, size]);

  //Check current breakpoint whenever the requested size of screen size changes
  useEffect(() => {
    // get the current breakpoint
    const currentBreakpoint = getCurrentBreakpoint();
    // declare a val to get updated as we check the current breakpoint against the one passed
    let val = false;

    if (breakpoints[currentBreakpoint as keyof BreakPointTypes]) {
      val =
        breakpoints[currentBreakpoint as keyof BreakPointTypes].includes(size);
    }
    setMedia(val);
  }, [screenWidth, size]);

  return media;
}
