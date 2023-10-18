import React from "react";

const TwitterXIcon = ({ color, size }: { color: string; size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.053 7.988L15.684 16.012H14.187L8.566 7.988H10.053ZM21 6V18C21 19.657 19.657 21 18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6ZM17.538 17L13.352 11.01L16.774 7H15.463L12.759 10.16L10.552 7H6.702L10.643 12.633L6.906 17H8.239L11.24 13.484L13.698 17H17.538Z"
        fill={color}
      />
    </svg>
  );
};

export default TwitterXIcon;
