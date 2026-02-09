"use client"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip2"
const people = [
  {
    id: 1,
    name: "Kunal Ahire",
    designation: "Developer",
    image:
      "https://i.imgur.com/GBZkd9f.png",
    link: "https://github.com/kunalahire",
  },
  {
    id: 2,
    name: "Jahnavi Sonwane",
    designation: "Developer",
    image:
      "https://i.imgur.com/bBP1Xzk.png",
    link:"https://github.com/jahnavisonwane",
  }
]

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      {people.map((person) => (
        <a key={person.id} href={person.link} target="_blank" rel="noopener noreferrer">
          <AnimatedTooltip items={[person]} />
        </a>
      ))}
    </div>
  )
}
