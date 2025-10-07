const Navbar = () => {
  const menus = [
    { label: "홈", id: "nav-home" },
    { label: "지도", id: "nav-map" },
    { label: "카드", id: "nav-card" },
    { label: "달력", id: "nav-calendar" },
  ];

  return (
    <nav className="w-full flex justify-around items-center bg-white border-t border-gray-300 py-3 fixed bottom-0">
      {menus.map((m) => (
        <button
          key={m.id}
          id={m.id}                                       
          className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
          onClick={() => console.log(`${m.label} 아이콘 클릭됨`)}
        >
          <div className="mb-1 text-[10px] text-gray-500">아이콘</div>
          <span>{m.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
