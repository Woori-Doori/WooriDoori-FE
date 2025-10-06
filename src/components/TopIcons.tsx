const TopIcons = () => {
  return (
    <div className="absolute top-5 right-5 flex gap-4">
      <span role="img" aria-label="bell" className="text-2xl cursor-pointer">
        🔔
      </span>
      <span role="img" aria-label="settings" className="text-2xl cursor-pointer">
        ⚙️
      </span>
    </div>
  );
};

export default TopIcons;
