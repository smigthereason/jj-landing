import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';

// Configuration constants
const MAX_BUFFER_SIZE = 10;
const FLUSH_INTERVAL = 5000;

// Create context for buffer operations
const BufferContext = createContext(null);

// Buffer Provider component
export const BufferProvider = ({ children }) => {
  const [eventBuffer, setEventBuffer] = useState([]);
  const [bufferTimer, setBufferTimer] = useState(null);

  // Process the events in the buffer
  const processBuffer = useCallback(async () => {
    if (eventBuffer.length === 0) return;

    try {
      // Clone current buffer
      const eventsToProcess = [...eventBuffer];
      setEventBuffer([]); // Clear buffer

      // Send events to analytics endpoint
      await sendToAnalytics(eventsToProcess);
      
      // Clear timer
      if (bufferTimer) {
        clearTimeout(bufferTimer);
        setBufferTimer(null);
      }
    } catch (error) {
      console.error('Error processing buffer:', error);
      // Return failed events back to buffer
      setEventBuffer(prev => [...prev, ...eventsToProcess]);
    }
  }, [eventBuffer, bufferTimer]);

  // Send events to analytics endpoint
  const sendToAnalytics = async (events) => {
    try {
      const response = await fetch('your-analytics-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events,
          timestamp: Date.now(),
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to send events: ${error.message}`);
    }
  };

  // Start buffer timer
  const startBufferTimer = useCallback(() => {
    if (bufferTimer) return;
    
    const timer = setTimeout(() => {
      processBuffer();
    }, FLUSH_INTERVAL);
    
    setBufferTimer(timer);
  }, [bufferTimer, processBuffer]);

  // Add event to buffer
  const addToBuffer = useCallback((eventName, eventData) => {
    const event = {
      event_name: eventName,
      timestamp: Date.now(),
      ...eventData,
    };

    setEventBuffer(prev => {
      const newBuffer = [...prev, event];
      
      // Process buffer if it reaches maximum size
      if (newBuffer.length >= MAX_BUFFER_SIZE) {
        processBuffer();
        return newBuffer;
      }
      
      // Start timer for processing if not already started
      startBufferTimer();
      return newBuffer;
    });
  }, [processBuffer, startBufferTimer]);

  // Force process the buffer immediately
  const flushBuffer = useCallback(() => {
    processBuffer();
  }, [processBuffer]);

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushBuffer();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (bufferTimer) {
        clearTimeout(bufferTimer);
      }
    };
  }, [flushBuffer, bufferTimer]);

  // Testing utilities
  const getBufferSize = useCallback(() => eventBuffer.length, [eventBuffer]);
  
  const clearBuffer = useCallback(() => {
    setEventBuffer([]);
    if (bufferTimer) {
      clearTimeout(bufferTimer);
      setBufferTimer(null);
    }
  }, [bufferTimer]);

  const value = {
    addToBuffer,
    flushBuffer,
    getBufferSize,
    clearBuffer,
  };

  return (
    <BufferContext.Provider value={value}>
      {children}
    </BufferContext.Provider>
  );
};

// Custom hook to use buffer
export const useBuffer = () => {
  const context = useContext(BufferContext);
  if (!context) {
    throw new Error('useBuffer must be used within a BufferProvider');
  }
  return context;
};

// Click handler components
export const withBufferedClick = (WrappedComponent) => {
  return React.forwardRef((props, ref) => {
    const { addToBuffer } = useBuffer();

    const handleClick = (e) => {
      const data = {
        event: "clk",
        click_x: e.clientX,
        click_y: e.clientY,
      };

      addToBuffer(data.event, {
        custom_params: {
          click_x: data.click_x,
          click_y: data.click_y,
        },
      });

      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(e);
      }
    };

    return <WrappedComponent {...props} ref={ref} onClick={handleClick} />;
  });
};

// Button with buffered click and redirect
export const BufferedButton = React.forwardRef(({ url, onClick, ...props }, ref) => {
  const { addToBuffer } = useBuffer();

  const handleClick = (e) => {
    const data = {
      event: "target",
      click_x: e.clientX,
      click_y: e.clientY,
    };

    addToBuffer(data.event, {
      custom_params: {
        click_x: data.click_x,
        click_y: data.click_y,
      },
    });

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Redirect to URL
    if (url) {
      window.location.href = url;
    }
  };

  return <button {...props} ref={ref} onClick={handleClick} />;
});

BufferedButton.displayName = 'BufferedButton';