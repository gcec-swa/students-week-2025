function showSection(sectionId) {
  const sections = document.querySelectorAll(".content");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}

window.onload = function () {
  showSection("home");
};

document.addEventListener("DOMContentLoaded", () => {
  const markdownContainer = document.getElementById("markdown-content");

  fetch("markdowns/home.md")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load Markdown file");
      }
      return response.text();
    })
    .then((markdown) => {
      // Convert Markdown to HTML
      const htmlContent = marked.parse(markdown);
      markdownContainer.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error loading Markdown:", error);
      markdownContainer.innerHTML = "<p>Failed to load content.</p>";
    });
});
