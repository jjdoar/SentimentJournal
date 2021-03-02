import React from "react";

export const sparkMessages = [
  {
    text:
      "Once you replace negative thoughts with positive ones, you'll start having positive results.",
    author: "-Willie Nelson",
  },
  {
    text:
      "Few things in the world are more powerful than a positive push. A smile. A world of optimism and hope. A 'you can do it' when things are tough.",
    author: "-Richard M. DeVos",
  },
  {
    text:
      "If you're not making mistakes, then you're not doing anything. I'm positive that a doer makes mistakes.",
    author: "-John Wooden",
  },
  {
    text:
      "It's a wonderful thing to be optimistic. It keeps you healthy and it keeps you resilient.",
    author: "-Daniel Kahneman",
  },
  {
    text: "Positive anything is better than negative nothing.",
    author: "-Elbert Hubbard",
  },
];

export function getSpark(index) {
  return (
    <div>
      <p>{sparkMessages[index].text}</p>
      <br />
      <p>{sparkMessages[index].author}</p>
    </div>
  );
}
