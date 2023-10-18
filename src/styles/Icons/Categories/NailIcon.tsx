const NailIcon = ({
  color = "black",
  size = 20,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 16C28 22.6276 22.6276 28 16 28C9.3724 28 4 22.6276 4 16C4 9.3724 9.3724 4 16 4"
        stroke={color}
      />
      <path
        d="M24.4011 7.2832L24.6069 7.9168H25.2729L24.7341 8.308L24.9399 8.9416L24.4011 8.5504L23.8623 8.9416L24.0681 8.308L23.5293 7.9168H24.1953L24.4011 7.2832Z"
        stroke={color}
      />
      <path
        d="M19.5984 12.9999C19.5984 11.0117 17.9867 9.3999 15.9984 9.3999C14.0102 9.3999 12.3984 11.0117 12.3984 12.9999V20.1999C12.3984 22.1881 14.0102 23.7999 15.9984 23.7999C17.9867 23.7999 19.5984 22.1881 19.5984 20.1999V12.9999Z"
        stroke={color}
      />
      <path
        d="M12.3984 16.6001C11.1984 16.6001 9.39844 17.8709 9.39844 20.2001V26.0705M19.5984 16.6001C20.7984 16.6001 22.5984 17.8709 22.5984 20.2001V25.9001"
        stroke={color}
      />
    </svg>
  );
};

export default NailIcon;
