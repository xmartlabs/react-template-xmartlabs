import { useEffect, useRef, type ReactNode } from "react";
import type { Location } from "react-router";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  children: ReactNode;
}

const urlFromLocation = (location?: Location) =>
  location ? `${location.pathname}${location.search}` : "";

/*
  This component is useful to trigger a scroll to the top of
  the page each time the router triggers a route change.
*/
const ScrollToTop = (props: ScrollToTopProps) => {
  const location: Location = useLocation();
  const { children } = props;
  const previousUrl = useRef<string>(urlFromLocation(location));

  useEffect(() => {
    const currentUrl = urlFromLocation(location);
    if (currentUrl !== previousUrl.current) {
      window.scrollTo(0, 0);
    }
    previousUrl.current = currentUrl;
  }, [location]);

  return children;
};

export { ScrollToTop };
