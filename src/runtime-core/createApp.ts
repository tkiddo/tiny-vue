import { render } from './render';

export function createApp(App) {
  return {
    mount: (container) => {
      const containerDom = document.querySelector(container);
      render(App, containerDom);
    }
  };
}
