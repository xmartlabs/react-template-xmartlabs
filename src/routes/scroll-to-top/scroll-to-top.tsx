import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: JSX.Element,
}

/*
  This component is useful to trigger a scroll to the top of
  the page each time the router triggers a route change.
*/
const ScrollToTop = (props: ScrollToTopProps) => {
  const location = useLocation();
  const { children } = props;
  const [previousUrl, setPreviousUrl] = useState('');

  const urlFromLocation = () => (
    `${location}${location.search}`
  );

  useEffect(() => {
    const currentUrl = urlFromLocation();
    if (currentUrl !== previousUrl) {
      window.scrollTo(0, 0);
    }
    setPreviousUrl(`${location}${location.search}`);
  }, [location]);

  return children;
};

export { ScrollToTop };
