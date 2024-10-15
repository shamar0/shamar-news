// getVisibleHeadlines.js

export function getVisibleHeadlines() {
    const visibleHeadlines = [];
  
    // Select all headline elements
    const headlineElements = document.querySelectorAll('.card-body .card-title');
  
    // Loop through the elements and check if they're in the viewport
    headlineElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  
      if (isVisible) {
        visibleHeadlines.push(el.textContent.trim());
      }
    });
  
    return visibleHeadlines;
  }
  