interface TimelineEvent {
  date: string;
  event: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const getMonthAbbr = (date: string) => {
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[parseInt(month) - 1];
  };

  const getEventColor = (index: number) => {
    const colors = ['var(--cyber-accent)', 'var(--cyber-purple)', 'var(--cyber-green)'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--cyber-green)' }}>
        Journey Timeline
      </h3>
      
      {events.map((event, index) => (
        <div key={index} className="relative">
          {/* Timeline Line */}
          {index < events.length - 1 && (
            <div 
              className="absolute left-6 top-12 bottom-0 w-0.5" 
              style={{ backgroundColor: 'var(--cyber-accent)' }}
            />
          )}
          
          {/* Timeline Event */}
          <div className="relative flex items-start">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-sm cyber-glow"
              style={{ backgroundColor: getEventColor(index) }}
            >
              {getMonthAbbr(event.date)}
            </div>
            <div className="ml-6 project-card rounded-lg p-4 flex-1">
              <div 
                className="font-semibold"
                style={{ color: getEventColor(index) }}
              >
                {event.event}
              </div>
              <div className="text-gray-300 text-sm mt-1">
                {event.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
