interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({ children, onClick, type = 'button', disabled = false }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="button"
    >
      {children}
    </button>
  );
};