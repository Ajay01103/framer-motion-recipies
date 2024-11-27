// carousel.tsx
"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion"
import { useEffect, useState } from "react"

let images = [
  //   "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg",
  "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg",
  //   "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg",
  //   "https://images.pexels.com/photos/982263/pexels-photo-982263.jpeg",
  //   "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
  //   "https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg",
  "https://images.pexels.com/photos/50594/sea-bay-waterfront-beach-50594.jpeg",
  "https://images.pexels.com/photos/568236/pexels-photo-568236.jpeg",
  "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg",
  "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg",
  "https://images.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg",
  //   "https://images.pexels.com/photos/226424/pexels-photo-226424.jpeg",
  //   "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg",
]

export default function Carousel() {
  let [index, setIndex] = useState(0)

  let x = index * 100
  let xSpring = useSpring(x, { bounce: 0 })
  let xPercentage = useMotionTemplate`-${xSpring}%`

  useEffect(() => {
    xSpring.set(x)
  }, [x, xSpring])

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        if (index > 0) {
          setIndex(index - 1)
        }
      } else if (e.key === "ArrowRight") {
        if (index < images.length - 1) {
          setIndex(index + 1)
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [index])

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0 }}>
      <div className="flex h-full flex-col justify-between">
        <div className="relative mt-6 overflow-hidden md:mt-10">
          <motion.div
            style={{ x: xPercentage }}
            className="flex"
          >
            {images.map((image, i) => (
              <motion.img
                key={image}
                src={image}
                animate={{ opacity: i === index ? 1 : 0.4 }}
                className="aspect-[1.85] h-screen max-h-[70vh] w-full flex-shrink-0 object-cover"
              />
            ))}
          </motion.div>

          <AnimatePresence initial={false}>
            {index > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => setIndex(index - 1)}
              >
                <ChevronLeftIcon className="h-6 w-6 text-black" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {index + 1 < images.length && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0, pointerEvents: "none" }}
                whileHover={{ opacity: 1 }}
                className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                onClick={() => setIndex(index + 1)}
              >
                <ChevronRightIcon className="h-6 w-6 text-black" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <Thumbnails
          index={index}
          setIndex={setIndex}
        />
      </div>
    </MotionConfig>
  )
}

const COLLAPSED_ASPECT_RATIO = 0.5
const FULL_ASPECT_RATIO = 3 / 2
const MARGIN = 24
const GAP = 2

function Thumbnails({
  index,
  setIndex,
}: {
  index: number
  setIndex: (value: number) => void
}) {
  let x =
    index * 100 * (COLLAPSED_ASPECT_RATIO / FULL_ASPECT_RATIO) + MARGIN + index * GAP
  let xSpring = useSpring(x, { bounce: 0 })
  let xPercentage = useMotionTemplate`-${xSpring}%`

  useEffect(() => {
    xSpring.set(x)
  }, [x, xSpring])

  return (
    <div className="mb-6 flex h-14 my-12 justify-center overflow-hidden">
      <motion.div
        style={{
          aspectRatio: FULL_ASPECT_RATIO,
          gap: `${GAP}%`,
          x: xPercentage,
        }}
        className="flex min-w-0"
      >
        {images.map((image, i) => (
          <motion.button
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active: {
                aspectRatio: FULL_ASPECT_RATIO,
                marginLeft: `${MARGIN}%`,
                marginRight: `${MARGIN}%`,
              },
              inactive: {
                aspectRatio: COLLAPSED_ASPECT_RATIO,
                marginLeft: 0,
                marginRight: 0,
              },
            }}
            className="h-full shrink-0"
            key={image}
          >
            <img
              alt=""
              src={image}
              className="h-full object-cover"
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
