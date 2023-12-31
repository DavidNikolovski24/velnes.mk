const LinkedinIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.98292 7.1968C6.19132 7.1968 7.17092 6.2172 7.17092 5.0088C7.17092 3.8004 6.19132 2.8208 4.98292 2.8208C3.77452 2.8208 2.79492 3.8004 2.79492 5.0088C2.79492 6.2172 3.77452 7.1968 4.98292 7.1968Z"
        fill={color}
      />
      <path
        d="M9.2377 8.85518V20.9942H13.0067V14.9912C13.0067 13.4072 13.3047 11.8732 15.2687 11.8732C17.2057 11.8732 17.2297 13.6842 17.2297 15.0912V20.9952H21.0007V14.3382C21.0007 11.0682 20.2967 8.55518 16.4747 8.55518C14.6397 8.55518 13.4097 9.56218 12.9067 10.5152H12.8557V8.85518H9.2377ZM3.0957 8.85518H6.8707V20.9942H3.0957V8.85518Z"
        fill={color}
      />
    </svg>
  );
};

export default LinkedinIcon;
