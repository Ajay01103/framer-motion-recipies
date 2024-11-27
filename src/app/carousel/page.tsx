"use client"

// you can use this same snippet in js without any modification

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
//@ts-expect-error no problem
import useKeypress from "react-use-keypress"

let images = [
  "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg",
  "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg",
  "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
  "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg",
]

let collapsedAspectRatio = 1 / 3
let fullAspectRatio = 3 / 2
let margin = 12
let gap = 2

export default function Page() {
  let [index, setIndex] = useState(0)

  useKeypress("ArrowRight", () => {
    if (index < images.length - 1) {
      setIndex(index + 1)
    }
  })

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      setIndex(index - 1)
    }
  })

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-8 gap-4 sm:p-8">
      <main className="flex flex-col gap-4 row-start-2 w-full items-center justify-center sm:items-start">
        <MotionConfig transition={{ duration: 1, ease: [0.39, 0.69, 0, 1] }}>
          <div className="h-[60vh] md:h-[75vh] lg:h-[80vh] max-w-5xl w-full mx-auto relative">
            <div className="mx-auto flex h-full flex-col justify-center">
              <div className="relative overflow-hidden">
                <motion.div
                  animate={{ x: `-${index * 100}%` }}
                  className="flex"
                >
                  {images.map((image, i) => (
                    <motion.img
                      key={image}
                      src={image}
                      animate={{ opacity: i === index ? 1 : 0.3 }}
                      className="aspect-[3/2] object-fill"
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
                      <ChevronLeftIcon className="h-6 w-6" />
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
                      <ChevronRightIcon className="h-6 w-6" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex w-full mt-6 h-14 justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  margin +
                  index * gap
                }%`,
              }}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`,
              }}
              className="flex"
            >
              {images.map((image, i) => (
                <motion.button
                  onClick={() => setIndex(i)}
                  initial={false}
                  whileHover={{ opacity: 1 }}
                  animate={i === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1,
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5,
                    },
                  }}
                  className="shrink-0"
                  key={image}
                >
                  <img
                    src={image}
                    className="h-full object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </MotionConfig>
      </main>
    </div>
  )
}
