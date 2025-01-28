// Maximum size of the buffer before triggering a flush
const MAX_BUFFER_SIZE = 10;

// Buffer to store events
let eventBuffer = [];

// Timer for periodic flush
let flushTimer = null;

// Endpoint for sending events
const EVENT_ENDPOINT = process.env.REACT_APP_EVENT_ENDPOINT || 'https://api.example.com/events';

/**
 * Sends the buffered events to the server
 * @returns {Promise} Promise that resolves when events are sent
 */
const flushBuffer = async () => {
  if (eventBuffer.length === 0) return;

  try {
    const response = await fetch(EVENT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: eventBuffer,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Clear the buffer after successful send
    eventBuffer = [];
  } catch (error) {
    console.error('Error flushing event buffer:', error);
    // Optionally implement retry logic here
  }
};

/**
 * Starts the periodic flush timer
 */
const startFlushTimer = () => {
  if (flushTimer) return;
  flushTimer = setInterval(flushBuffer, 30000); // Flush every 30 seconds
};

/**
 * Stops the flush timer
 */
const stopFlushTimer = () => {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
};

/**
 * Adds an event to the buffer and manages buffer state
 * @param {string} eventType - Type of event (e.g., 'clk', 'target')
 * @param {Object} eventData - Event data including custom parameters
 */
export const addToBuffer = (eventType, eventData) => {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    pageUrl: window.location.href,
    ...eventData,
  };

  eventBuffer.push(event);

  // Start timer if not already running
  startFlushTimer();

  // Flush immediately if buffer is full
  if (eventBuffer.length >= MAX_BUFFER_SIZE) {
    flushBuffer();
  }
};

// Setup cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopFlushTimer();
  if (eventBuffer.length > 0) {
    // Use synchronous xhr for unload flush
    const xhr = new XMLHttpRequest();
    xhr.open('POST', EVENT_ENDPOINT, false); // Synchronous request
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      events: eventBuffer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }));
  }
});

// Optional: Export additional functions if needed for testing or manual control
export const __testing = {
  flushBuffer,
  getBufferSize: () => eventBuffer.length,
  clearBuffer: () => { eventBuffer = []; },
};