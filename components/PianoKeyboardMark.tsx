type PianoKeyboardMarkProps = {
  className?: string;
};

export default function PianoKeyboardMark({ className = "" }: PianoKeyboardMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="6" width="44" height="36" rx="8" fill="#ffffff" stroke="#d8dbe1" strokeWidth="2" />
      <rect x="4" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="10" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="16" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="22" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="28" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="34" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="40" y="10" width="6" height="28" rx="2" fill="#f7f8fb" stroke="#d8dbe1" />
      <rect x="7.5" y="10" width="4" height="16" rx="1.3" fill="#1f2126" />
      <rect x="13.5" y="10" width="4" height="16" rx="1.3" fill="#1f2126" />
      <rect x="19.5" y="10" width="4" height="16" rx="1.3" fill="#1f2126" />
      <rect x="31.5" y="10" width="4" height="16" rx="1.3" fill="#1f2126" />
      <rect x="37.5" y="10" width="4" height="16" rx="1.3" fill="#1f2126" />
    </svg>
  );
}
