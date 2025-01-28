import { useBuffer } from '../BufferLogic';

// Handle generic click events
export function useClickHandler() {
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
  };

  return handleClick;
}
// Make sure this file is in your src directory
export const handleClick = (e) => {
  const data = {
    event: "clk",
    click_x: e.clientX,
    click_y: e.clientY,
  };
  // Your logic here
};

export const handleButtonClick = (e, url) => {
  const data = {
    event: "target",
    click_x: e.clientX,
    click_y: e.clientY,
  };
  // Your logic here
  window.location.href = url;
};

// Handle button click events with redirection
export function useButtonClickHandler() {
  const { addToBuffer, flushBuffer } = useBuffer();

  const handleClick = (e, url) => {
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

    // Ensure buffer is flushed before redirecting
    flushBuffer().then(() => {
      window.location.href = url;
    });
  };

  return handleClick;
}