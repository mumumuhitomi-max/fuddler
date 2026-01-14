import { useEffect, useState } from "react";

let listeners = [];

export function triggerDataRefresh() {
  listeners.forEach((fn) => fn(Date.now()));
}

export function useDataRefresh() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const fn = (t) => setTick(t);
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  }, []);

  return tick;
}