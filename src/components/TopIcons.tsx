interface Props { onSettingsClick?: () => void }

const TopIcons: React.FC<Props> = ({ onSettingsClick }) => {
  return (
    <div className="absolute top-5 right-5 flex gap-4">
      <span id="icon-bell"    className="text-2xl cursor-pointer select-none">🔔</span>
      <span id="icon-gear"    className="text-2xl cursor-pointer select-none" onClick={onSettingsClick}>⚙️</span>
    </div>
  );
};

export default TopIcons;
