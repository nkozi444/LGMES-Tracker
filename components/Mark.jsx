export default function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M14 1L26 5.5V15C26 22.5 20.8 27.8 14 31C7.2 27.8 2 22.5 2 15V5.5L14 1Z"
        stroke="#B98B2E"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M14 6L20.5 8.6V15C20.5 19.2 17.8 22.4 14 24.5C10.2 22.4 7.5 19.2 7.5 15V8.6L14 6Z"
        fill="#B98B2E"
        fillOpacity="0.16"
      />
      <path d="M10 15.5L13 18.5L18.5 12" stroke="#B98B2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
