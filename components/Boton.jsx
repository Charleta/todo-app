export const Boton = ({ text, type, className }) => {
  return (
    <button
      onClick={type}
      className={className}
    >
      {text}
    </button>
  );
};
