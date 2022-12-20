import { useState } from 'react'

const useModal = () => {
  const [isShowing, setShowing] = useState<boolean>(false)

  const toggle = () => {
    setShowing(!isShowing)
  }

  return {
    isShowing,
    toggle
  }
}

export default useModal;