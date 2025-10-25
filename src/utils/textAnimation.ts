import anime from 'animejs';

/**
 * Initializes a blur reveal text animation using Anime.js
 * Splits text into individual characters and animates each with a staggered delay
 * 
 * @param elementId - The ID of the HTML element containing the text to animate
 */
export function initBlurRevealAnimation(elementId: string): void {
  const titleElement = document.getElementById(elementId);
  if (!titleElement) return;

  const text = titleElement.textContent || '';
  titleElement.innerHTML = '';
  
  // Split text into individual characters and wrap in spans
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
    span.style.display = 'inline-block';
    span.classList.add('letter');
    titleElement.appendChild(span);
  });

  // Anime.js blur reveal animation
  anime.timeline({ loop: false })
    .add({
      targets: `#${elementId} .letter`,
      opacity: [0, 1],
      translateY: [30, 0],
      filter: ['blur(10px)', 'blur(0px)'],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: (el, i) => 40 * i
    });
}

/**
 * Initialize animation on page load
 * Call this function with the element ID you want to animate
 */
export function initTextAnimationOnLoad(elementId: string): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initBlurRevealAnimation(elementId));
  } else {
    initBlurRevealAnimation(elementId);
  }
}
