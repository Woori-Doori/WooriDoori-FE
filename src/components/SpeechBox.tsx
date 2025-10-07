interface Props {
  text: string;
}

const SpeechBox: React.FC<Props> = ({ text }) => {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl px-6 py-3 text-center shadow-md text-gray-700 text-sm w-72">
      {text}
    </div>
  );
};

export default SpeechBox;
