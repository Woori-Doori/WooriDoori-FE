const SideIcons = () => {
  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-5">
      <span role="img" aria-label="game" className="text-xl cursor-pointer select-none">🎮</span>
      <span role="img" aria-label="food" className="text-xl cursor-pointer select-none">🍽️</span>
    </div>
  );
};

export default SideIcons;
