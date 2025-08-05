interface QuickAccessCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const QuickAccessCard = ({ icon, title, description, onClick }: QuickAccessCardProps) => {
  return (
    <div 
      className="card hover-lift cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col space-y-4">
        {/* Icono */}
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 transition-all duration-200">
          <div className="text-primary-400 group-hover:text-primary-300 transition-colors duration-200">
            {icon}
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-2">
          <h3 className="text-heading text-lg text-secondary-100 group-hover:text-primary-300 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-body text-secondary-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Indicador de acción */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-secondary-500 group-hover:text-primary-400 transition-colors duration-200">
            Hacer clic para acceder
          </div>
          <div className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            →
          </div>
        </div>
      </div>
    </div>
  );
}; 