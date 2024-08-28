/**
 * This function is used to calculate the offsetTop of an element
 *
 * @param {HTMLElement} element
 * @returns {number}
 */
export function offsetTop(element) {
  if (!element) return 0;
  return offsetTop(element.offsetParent) + element.offsetTop;
}

/**
 * Function to use scroll event to calculate the progress of an element
 * The inspiration is from useScroll hook from framer-motion
 * This function only provides y scroll progress but doesn't handle x scroll
 *
 * You can make beautiful animations with this hook like parallax, progress bar, etc.
 *
 * @param {HTMLElement} element
 * @param {[string, string]} offset
 * @param {(scroll: number) => void} callback
 */
export default function useScroll(element, offset = ["0 0", "1 1"], callback) {
  const top = offsetTop(element);
  const { height: elementHeight } = element.getBoundingClientRect();

  const [start, end] = offset;
  let [startElement, startWindow] = start.split(" ");
  let [endElement, endWindow] = end.split(" ");

  window.addEventListener("scroll", () => {
    const { scrollY: scroll, innerHeight: height } = window;
    const elementStartTracking = top + elementHeight * parseFloat(startElement) - parseFloat(startWindow) * height;
    const elementEndTracking = top + elementHeight * parseFloat(endElement) - height - (parseFloat(endWindow) - 1) * height;

    const percentFactor = elementEndTracking - elementStartTracking;
    let progress = 0;
    if (scroll < elementStartTracking) {
      progress = 0;
    } else if (scroll >= elementStartTracking && scroll <= elementEndTracking) {
      progress = (scroll - elementStartTracking) / percentFactor;
    } else if (scroll > elementEndTracking) {
      progress = 1;
    }

    callback(progress);
  });
}
