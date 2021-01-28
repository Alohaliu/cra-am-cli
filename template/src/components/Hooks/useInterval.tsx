import {useEffect, useRef } from 'react';

const useInterval = (callback:()=> void,delay:number) => {
  const savedCallback = useRef();
  useEffect(() => {
    (savedCallback as any).current = callback;
  });
  useEffect(() => {
    function tick() {
      (savedCallback as any).current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
