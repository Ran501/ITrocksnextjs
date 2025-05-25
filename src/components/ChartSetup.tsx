import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  defaults
} from 'chart.js';

// Register the components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Set default font color to white for better visibility on dark background
defaults.color = '#fff';
defaults.font.family = "'Inter', sans-serif";
defaults.font.weight = 600;
defaults.font.size = 14;

// Set default border color for better visibility
defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

// Export the configured ChartJS instance
export { ChartJS };

// The component itself doesn't need to render anything
export default function ChartSetup() {
  return null;
} 