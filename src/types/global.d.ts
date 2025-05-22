declare module '*.module.css' {
  const classes: { 
    [key: string]: string;
    expanded: string;
  };
  export default classes;
}

declare global {
  interface Window {
    scrollY: number;
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
  }
} 