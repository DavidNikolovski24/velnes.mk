function ReviewStar({
  color = "#0D0D0D",
  size = 20,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.88832 17.9392C3.47264 18.1504 3.00095 17.7803 3.08495 17.3078L3.97878 12.2626L0.184854 8.68298C-0.169447 8.34806 0.0147034 7.73581 0.489617 7.66968L5.76429 6.9273L8.11624 2.31199C8.32839 1.896 8.90238 1.896 9.11453 2.31199L11.4665 6.9273L16.7412 7.66968C17.2161 7.73581 17.4002 8.34806 17.0459 8.68298L13.252 12.2626L14.1458 17.3078C14.2298 17.7803 13.7581 18.1504 13.3424 17.9392L8.61377 15.5329L3.88724 17.9392H3.88832Z"
        fill={color}
      />
    </svg>
  );
}

export default ReviewStar;
