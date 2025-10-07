import { Button } from "@material-tailwind/react";

function SeeMoreButton({ onClick, children = "Read More" }) {
  return (
    <Button
      variant="text"
      className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 p-3 px-6 rounded-2xl"
      onClick={onClick}
    >
      {children}{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </Button>
  );
}

export default SeeMoreButton;