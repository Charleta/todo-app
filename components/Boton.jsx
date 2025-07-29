export const Boton = ({ text, type }) => {
  return (
    <button
      onClick={type}
      className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {text}
    </button>
  );
};
