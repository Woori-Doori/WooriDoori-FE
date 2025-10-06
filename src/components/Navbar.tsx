const Navbar = () => {
  const menus = ["홈", "지도", "카드", "달력"];

  return (
    <nav className="w-full flex justify-around items-center bg-white border-t border-gray-300 py-3 fixed bottom-0">
      {menus.map((label) => (
        <button
          key={label}
          className="flex flex-col items-center text-xs text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
          onClick={() => console.log(`${label} 아이콘 클릭됨`)} // 클릭 반응만 확인용
        >
          <div className="mb-1 text-[10px] text-gray-500">아이콘</div>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
