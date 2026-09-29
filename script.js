const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const copyButton = document.querySelector('#copy-citation');
const bibtex = document.querySelector('#bibtex');
const copyStatus = document.querySelector('#copy-status');

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(bibtex.innerText.trim());
    copyButton.textContent = 'Copied';
    copyStatus.textContent = 'Citation copied to clipboard.';
    window.setTimeout(() => {
      copyButton.textContent = 'Copy';
      copyStatus.textContent = '';
    }, 1800);
  } catch {
    copyStatus.textContent = 'Select the citation text to copy it.';
  }
});
