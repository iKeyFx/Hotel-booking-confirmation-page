const copyButton = document.querySelector(".btn-copy");
const password = copyButton?.previousElementSibling?.textContent.trim();
const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebarClose = document.querySelector(".sidebar-close");
const sidebarBackdrop = document.querySelector(".sidebar-backdrop");

const setSidebarState = (isOpen) => {
  document.body.classList.toggle("sidebar-open", isOpen);
  sidebarToggle?.setAttribute("aria-expanded", String(isOpen));
  sidebarToggle?.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
};

sidebarToggle?.addEventListener("click", () => {
  setSidebarState(!document.body.classList.contains("sidebar-open"));
});

sidebarClose?.addEventListener("click", () => setSidebarState(false));
sidebarBackdrop?.addEventListener("click", () => setSidebarState(false));

const copyPassword = async () => {
  if (!copyButton || !password) {
    return;
  }

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(password);
    } else {
      const passwordInput = document.createElement("textarea");
      passwordInput.value = password;
      passwordInput.setAttribute("readonly", "");
      passwordInput.style.position = "fixed";
      passwordInput.style.opacity = "0";
      document.body.appendChild(passwordInput);
      passwordInput.select();
      document.execCommand("copy");
      passwordInput.remove();
    }

    copyButton.textContent = "Copied";
    copyButton.classList.add("is-copied");
    window.setTimeout(() => {
      copyButton.textContent = "Copy";
      copyButton.classList.remove("is-copied");
    }, 1500);
  } catch {
    copyButton.textContent = "Try again";
    window.setTimeout(() => {
      copyButton.textContent = "Copy";
    }, 1500);
  }
};

copyButton?.addEventListener("click", copyPassword);
