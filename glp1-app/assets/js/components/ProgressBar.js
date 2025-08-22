// Componente ProgressBar
export function ProgressBar({ current, total, className = "" }) {
  const percentage = Math.min((current / total) * 100, 100);
  
  return `
    <div class="progress-bar ${className}">
      <div class="progress-bar-fill" style="width: ${percentage}%"></div>
    </div>
  `;
}

