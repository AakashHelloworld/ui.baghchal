import { useCallback, useState, useEffect } from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(
    defaultTranslate
  );
  const [dimensions, setDimensions] = useState();

  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setTranslate({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [dimensions, translate, containerRef] ; // Ensure TypeScript infers tuple correctly
};
