import { useEffect, useState } from 'react';

interface TimerProps {
  time: string;
  isDarkMode: boolean;
}

interface TimeUnit {
  value: number;
  label: string;
  max: number;
}

export function Timer3D({ time, isDarkMode }: TimerProps) {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const [days, hours, minutes, seconds] = time.split(':').map(Number);
    setTimeUnits([
      { value: days, label: 'DAYS', max: 30 },
      { value: hours, label: 'HOURS', max: 24 },
      { value: minutes, label: 'MINUTES', max: 60 },
      { value: seconds, label: 'SECONDS', max: 60 },
    ]);

    // Calculate total progress
    const totalSeconds = 30 * 24 * 60 * 60; // 30 days in seconds
    const remainingSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
    const progressPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    setProgress(progressPercentage);
  }, [time]);

  // Theme variables
  const bgCircleColor = isDarkMode ? "#1a3a1a" : "#e0f2e0";
  const progressCircleColor = isDarkMode ? "#4ade80" : "#16a34a";
  const textColor = isDarkMode ? "text-white" : "text-green-950";
  const labelColor = isDarkMode ? "text-green-200" : "text-green-700";
  const progressBgColor = isDarkMode ? "bg-green-950" : "bg-green-100";
  const progressFillColor = isDarkMode ? "bg-green-500" : "bg-green-600";
  const progressLabelBg = isDarkMode ? "bg-green-900/50" : "bg-green-200";
  const progressLabelText = isDarkMode ? "text-green-200" : "text-green-800";
  const shadowColor = isDarkMode 
    ? "rgba(74, 222, 128, 0.5)" 
    : "rgba(22, 163, 74, 0.5)";

  const CircularProgress = ({ value, max, label }: TimeUnit) => {
    const radius = 50;
    const strokeWidth = 5;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
      <div className="flex flex-col items-center gap-">
        <div className="relative w-[120px] h-[120px]">
          <svg className="rotate-[-90deg]" width="120" height="120">
            {/* Background circle */}
            <circle
              stroke={bgCircleColor}
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx="60"
              cy="60"
            />
            {/* Progress circle */}
            <circle
              stroke={progressCircleColor}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset, filter: `drop-shadow(0 0 6px ${progressCircleColor})` }}
              r={normalizedRadius}
              cx="60"
              cy="60"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-5xl font-bold ${textColor}`} style={{ textShadow: `0 0 12px ${shadowColor}` }}>
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <span className={`text-base font-medium tracking-wider ${labelColor}`}>{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-wrap justify-center gap-10 p-4">
        {timeUnits.map((unit, index) => (
          <CircularProgress key={index} {...unit} />
        ))}
      </div>
      
      {/* Loading Bar */}
<div className="w-full max-w-4xl px-4">
  <div className="relative pt-4">
    <div className="flex mb-3 items-center justify-between">
      {/* Label removed for now */}
      <div className="text-right">
        <span className={`text-sm font-semibold inline-block ${progressLabelText}`}>
          {Math.min(100, Math.max(0, Math.round(progress)))}%
        </span>
      </div>
    </div>
    
    {/* Increased height here */}
    <div className={`overflow-hidden h-5 mb-4 text-xs flex rounded-full ${progressBgColor}`}> 
      <div
        style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}
        className={`shadow-lg shadow-green-500/50 flex flex-col text-center whitespace-nowrap text-white justify-center ${progressFillColor}`}
      ></div>
    </div>
  </div>
</div>
    </div>
  );
}