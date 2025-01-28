import { addToBuffer } from "./BufferLogic";

// Handle generic click events
export function handleClick(e) {
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
}

// Handle button click events with redirection
export const handleButtonClick = (e, url) => {
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

  // Redirect to the specified URL
  window.location.href = url;
};