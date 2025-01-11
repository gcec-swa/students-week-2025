function showSection(sectionId) {
  const sections = document.querySelectorAll('.content');
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = 'block';
  }
}

window.onload = function () {
  showSection('home');
};

document.addEventListener('DOMContentLoaded', () => {
  // Load Markdown content for the home section
  const markdownContainer = document.getElementById('markdown-content');

  fetch('markdowns/home.md')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load Markdown file');
      }
      return response.text();
    })
    .then((markdown) => {
      // Convert Markdown to HTML
      const htmlContent = marked.parse(markdown);
      markdownContainer.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error('Error loading Markdown:', error);
      markdownContainer.innerHTML = '<p>Failed to load content.</p>';
    });

  // Modal functionality for gallery section
  const modal = document.querySelector('.modal');
  const modalImage = document.querySelector('#gallery-modal-image');
  const modalName = document.getElementById('modal-name');
  const modalDept = document.getElementById('modal-dept');
  const modalRoll = document.getElementById('modal-roll');

  // Add click event listener to all gallery images
  document.querySelectorAll('.gallery img').forEach((img) => {
    img.addEventListener('click', (e) => {
      modalImage.src = e.target.src;

      // Populate modal details from data attributes
      modalName.textContent = e.target.dataset.name || 'N/A';
      modalDept.textContent = e.target.dataset.dept || 'N/A';
      modalRoll.textContent = e.target.dataset.roll || 'N/A';

      modal.style.display = 'block';
    });
  });

  // Close modal when clicked outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
