"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { useState } from "react"
import useMeasure from "react-use-measure"

const CalendarPage = () => {
  let [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"))
  let [direction, setDirection] = useState<number | undefined>(undefined)
  let [isAnimating, setIsAnimating] = useState(false)
  let month = parse(monthString, "yyyy-MM", new Date())

  function nextMonth() {
    if (isAnimating) return

    let next = addMonths(month, 1)

    setMonthString(format(next, "yyyy-MM"))
    setDirection(1)
    setIsAnimating(true)
  }

  function previousMonth() {
    if (isAnimating) return

    let previous = subMonths(month, 1)

    setMonthString(format(previous, "yyyy-MM"))
    setDirection(-1)
    setIsAnimating(true)
  }

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  })

  return (
    <MotionConfig transition={transition}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={monthString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.p
                        variants={variants}
                        custom={direction}
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, "MMMM yyyy")}
                      </motion.p>
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)",
                        }}
                        variants={removeImmediately}
                      />
                    </header>

                    <motion.div
                      variants={removeImmediately}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>

                    <motion.div
                      variants={variants}
                      custom={direction}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8 text-sm"
                    >
                      {days.map((day: Date) => (
                        <span
                          className={`${
                            isSameMonth(day, month) ? "" : "text-stone-300"
                          } font-semibold`}
                          key={format(day, "yyyy-MM-dd")}
                        >
                          {format(day, "d")}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

// let transition = { type: "tween", ease: "easeOut", duration: 0.25 };
let transition = { type: "spring", bounce: 0, duration: 0.3 }
let variants = {
  enter: (direction: number) => {
    // console.log({ direction });
    return { x: `${100 * direction}%`, opacity: 0 }
    // return { x: "100%" };
  },
  middle: { x: "0%", opacity: 1 },
  // exit: { x: "-100%" },
  exit: (direction: number) => {
    // return { x: "-100%" };
    return { x: `${-100 * direction}%`, opacity: 0 }
  },
  // exit: (direction) => {
  //   console.log({ direction });
  //   return { x: `${-100 * direction}%` };
  // },
}

let removeImmediately = {
  exit: { visibility: "hidden" as const },
}

function ResizablePanel({ children }: { children: React.ReactNode }) {
  let [ref, bounds] = useMeasure()

  return (
    <motion.div animate={{ height: bounds.height > 0 ? bounds.height : 0 }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}

export default CalendarPage
