import React, { useState, useEffect, useId } from 'react';

export interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number; // Total cycle duration
  delay?: number;    // Start offset within cycle
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3, 
  delay = 0,    
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  
  // Gradient Animation Coordinates
  const [gradientCoords, setGradientCoords] = useState({
      x1_start: 0, y1_start: 0, x2_start: 0, y2_start: 0,
      x1_end: 0, y1_end: 0, x2_end: 0, y2_end: 0
  });

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        // Calculate Node Centers relative to Container
        const startX = rectA.left - containerRect.left + rectA.width / 2;
        const startY = rectA.top - containerRect.top + rectA.height / 2;
        const endX = rectB.left - containerRect.left + rectB.width / 2;
        const endY = rectB.top - containerRect.top + rectB.height / 2;

        const isVertical = Math.abs(endY - startY) > Math.abs(endX - startX);
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // 1. Set Path D
        if (!isVertical) {
          const controlY = midY - curvature;
          setPathD(`M ${startX},${startY} Q ${midX},${controlY} ${endX},${endY}`);
        } else {
          const controlX = midX + curvature;
          setPathD(`M ${startX},${startY} Q ${controlX},${midY} ${endX},${endY}`);
        }

        // 2. Calculate Gradient Vector Coordinates
        const bulletLength = 150; 
        const halfBullet = bulletLength / 2;

        if (!isVertical) {
             // Horizontal Sweep
             setGradientCoords({
                 x1_start: startX - halfBullet, y1_start: 0, x2_start: startX + halfBullet, y2_start: 0,
                 x1_end: endX - halfBullet, y1_end: 0, x2_end: endX + halfBullet, y2_end: 0
             });
        } else {
             // Vertical Sweep
             setGradientCoords({
                 x1_start: 0, y1_start: startY - halfBullet, x2_start: 0, y2_start: startY + halfBullet,
                 x1_end: 0, y1_end: endY - halfBullet, x2_end: 0, y2_end: endY + halfBullet
             });
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    
    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);

    updatePath();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, reverse]);

  // --- Animation Timing Logic ---
  const flightDuration = duration / 2; // Beam travels in half the cycle time
  
  // Calculate percentage points in the total cycle
  const startPct = Math.min(delay / duration, 1);
  const endPct = Math.min((delay + flightDuration) / duration, 1);

  const generateKeyframes = (startVal: number, endVal: number) => {
      const times: string[] = [];
      const values: string[] = [];

      // 1. Initial State
      times.push("0");
      values.push(startVal.toString());

      // 2. Wait for Delay
      if (startPct > 0.001) {
          times.push(startPct.toFixed(3));
          values.push(startVal.toString());
      }

      // 3. Move to End
      times.push(endPct.toFixed(3));
      values.push(endVal.toString());

      // 4. Hold at End until cycle repeats
      if (endPct < 0.999) {
          times.push("1");
          values.push(endVal.toString());
      }

      return { keyTimes: times.join(";"), values: values.join(";") };
  };

  const generateOpacityKeyframes = () => {
      const times: string[] = [];
      const values: string[] = [];

      // Start
      times.push("0");
      values.push(startPct === 0 ? "1" : "0");

      if (startPct > 0.001) {
          times.push((startPct - 0.001).toFixed(3));
          values.push("0");
          times.push(startPct.toFixed(3));
          values.push("1");
      }

      times.push(endPct.toFixed(3));
      values.push("1");

      if (endPct < 0.999) {
          times.push((endPct + 0.001).toFixed(3));
          values.push("0");
          times.push("1");
          values.push("0");
      }

      return { keyTimes: times.join(";"), values: values.join(";") };
  }

  const animX1 = generateKeyframes(gradientCoords.x1_start, gradientCoords.x1_end);
  const animX2 = generateKeyframes(gradientCoords.x2_start, gradientCoords.x2_end);
  const animY1 = generateKeyframes(gradientCoords.y1_start, gradientCoords.y1_end);
  const animY2 = generateKeyframes(gradientCoords.y2_start, gradientCoords.y2_end);
  const animOpacity = generateOpacityKeyframes();

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 pointer-events-none w-full h-full z-0 overflow-visible"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="20%" stopColor={gradientStartColor} stopOpacity="1">
              <animate attributeName="stop-opacity" values={animOpacity.values} keyTimes={animOpacity.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor="white" stopOpacity="1">
              <animate attributeName="stop-opacity" values={animOpacity.values} keyTimes={animOpacity.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="80%" stopColor={gradientStopColor} stopOpacity="1">
              <animate attributeName="stop-opacity" values={animOpacity.values} keyTimes={animOpacity.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
          
          <animate attributeName="x1" values={animX1.values} keyTimes={animX1.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
          <animate attributeName="x2" values={animX2.values} keyTimes={animX2.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
          <animate attributeName="y1" values={animY1.values} keyTimes={animY1.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
          <animate attributeName="y2" values={animY2.values} keyTimes={animY2.keyTimes} dur={`${duration}s`} repeatCount="indefinite" />
        </linearGradient>
      </defs>
    </svg>
  );
};