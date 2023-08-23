export function useDropdown() {
  const x = ref(0)
  const y = ref(0)
  const [showDropRef, setShowDropRef] = useToggle(false)
  const changePosition = (e: MouseEvent) => {
    const { clientX, clientY } = e
    until(showDropRef)
      .toBe(false)
      .then(() => {
        x.value = clientX
        y.value = clientY
        setShowDropRef(true)
      })
  }
  return {
    x,
    y,
    showDropRef,
    setShowDropRef,
    changePosition,
  }
}
