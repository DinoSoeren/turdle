import { useEffect, useRef } from 'react'

/** Adapted from https://blog.logrocket.com/accessing-previous-props-state-react-hooks/ */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value //assign the value of ref to the argument
  }, [value]) //this code will run when the value of 'value' changes
  return ref.current //in the end, return the current ref value.
}
