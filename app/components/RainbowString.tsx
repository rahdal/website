'use client';

import { useEffect, useRef, useState } from 'react';

export default function RainbowString() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pre-render the strings immediately on component mount
  useEffect(() => {
    // Set loaded state to trigger immediate rendering
    setIsLoaded(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full width and height
    const resizeCanvas = () => {
      // Use a fixed reference size for consistent appearance across devices
      const referenceWidth = Math.max(1920, window.innerWidth);
      const referenceHeight = Math.max(1080, window.innerHeight);
      
      // Set canvas dimensions to match the viewport
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redraw when resizing
      drawDiagonalStrings(ctx, canvas, referenceWidth, referenceHeight);
    };

    // Initial setup and draw
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Function to draw static diagonal strings
  const drawDiagonalStrings = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement,
    referenceWidth: number,
    referenceHeight: number
  ) => {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate diagonal line parameters based on reference size
    // This ensures the same visual appearance regardless of screen size
    const startX = 0;
    const startY = referenceHeight * 0.7; // Start from lower left
    const endX = referenceWidth;
    const endY = referenceHeight * 0.2; // End at upper right
    
    // Calculate scale factor to maintain consistent string size
    const scaleX = canvas.width / referenceWidth;
    const scaleY = canvas.height / referenceHeight;
    
    // Apply transformation to maintain consistent appearance
    ctx.save();
    ctx.scale(scaleX, scaleY);
    
    // Number of vibration strings
    const numStrings = 10;
    
    // Amplitude of the vibration effect - fixed size regardless of screen
    const baseAmplitude = 35;
    
    // Draw multiple strings with slight variations to create vibration effect
    for (let i = 0; i < numStrings; i++) {
      // Brighter opacity for each string
      const opacity = 0.4 + (i % 3) * 0.15;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      
      // Use a palette with more purple
      if (i % 3 === 0) {
        // Purple dominant
        gradient.addColorStop(0, `rgba(180, 100, 255, ${opacity})`); // Purple
        gradient.addColorStop(0.4, `rgba(120, 180, 255, ${opacity})`); // Blue-purple
        gradient.addColorStop(0.7, `rgba(70, 220, 255, ${opacity})`); // Cyan
        gradient.addColorStop(1, `rgba(255, 130, 220, ${opacity})`); // Pink
      } else if (i % 3 === 1) {
        // Cyan-purple mix
        gradient.addColorStop(0, `rgba(130, 200, 255, ${opacity})`); // Light blue
        gradient.addColorStop(0.3, `rgba(160, 100, 255, ${opacity})`); // Purple
        gradient.addColorStop(0.6, `rgba(70, 255, 220, ${opacity})`); // Cyan
        gradient.addColorStop(1, `rgba(200, 100, 255, ${opacity})`); // Light purple
      } else {
        // Teal with purple
        gradient.addColorStop(0, `rgba(70, 255, 220, ${opacity})`); // Teal
        gradient.addColorStop(0.4, `rgba(150, 120, 255, ${opacity})`); // Purple-blue
        gradient.addColorStop(0.8, `rgba(200, 100, 255, ${opacity})`); // Light purple
        gradient.addColorStop(1, `rgba(255, 130, 200, ${opacity})`); // Pink
      }
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2; // Consistent line width
      
      // Enhanced glow effect matching the gradient colors
      ctx.shadowColor = 'rgba(255, 140, 90, 0.7)'; // Orange glow
      ctx.shadowBlur = 12;
      
      // Draw the vibrating string
      ctx.beginPath();
      
      // Calculate a slight vertical offset for each string
      const verticalOffset = (i - numStrings / 2) * 3;
      
      // Start point
      ctx.moveTo(startX, startY + verticalOffset);
      
      // Draw the diagonal line with a vibration effect
      const segments = 200;
      const segmentLength = (endX - startX) / segments;
      
      // Use fixed seed for consistent pattern
      const seed = i * 100;
      
      for (let j = 1; j <= segments; j++) {
        const x = startX + j * segmentLength;
        
        // Calculate the y position along the diagonal
        const baseY = startY + (endY - startY) * (j / segments) + verticalOffset;
        
        // Add vibration effect - different frequencies for a more natural look
        const vibration1 = Math.sin(j * 0.3 + seed) * baseAmplitude * (0.7 + Math.sin(j * 0.05) * 0.3);
        const vibration2 = Math.sin(j * 0.7 + seed * 0.5) * baseAmplitude * 0.5;
        
        // Combine vibrations
        const y = baseY + vibration1 + vibration2;
        
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    }
    
    // Restore the context to remove transformations
    ctx.restore();
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        opacity: 1.0,
        visibility: isLoaded ? 'visible' : 'visible' // Always visible for immediate display
      }}
    />
  );
} 