const stepHeads = document.querySelectorAll(".step-head");
const stepContents = document.querySelectorAll(".step-content");
const mobileDc = document.querySelector(".mobile-dc");
const desktopDc = document.querySelector(".desktop-dc");
const notification = document.querySelector(".notification");
const bell = document.querySelector(".bell");
const alerts = document.querySelector(".alerts");
const desktopCancel = document.querySelector(".btn-x");
const mobileCancel = document.querySelector(".text-x");
const trailCallout = document.querySelector(".trail-callout");
const selectBtn = document.querySelector(".select-btn");
const stepContentBtn = document.querySelectorAll(".step-content-btn");
const importBtn = document.querySelector(".import-btn");

const allMenuItems = notification.querySelectorAll('[role="menuitem"]');

let activeStepIndex = 0;

stepHeads.forEach((stepHead, index) => {
  stepHead.addEventListener("click", () => {
    toggleStepDisplay(activeStepIndex, index);
    activeStepIndex = index;
  });
});

document.addEventListener("click", event => {
  if (!event.target.closest(".step")) {
    resetSteps();
    activeStepIndex = 0;
  }
});

desktopDc.addEventListener("click", handleDesktopDcClick);

mobileDc.addEventListener("click", handleMobileDcClick);

bell.addEventListener("click", handleBellClick);

mobileCancel.addEventListener("click", () =>
  trailCallout.classList.add("hidden")
);

desktopCancel.addEventListener("click", () =>
  trailCallout.classList.add("hidden")
);

stepContentBtn.forEach(button =>
  button.addEventListener("click", () => {
    button.classList.toggle("step-content-focus");
    importBtn.classList.remove("import-btn-focus");
  })
);

importBtn.addEventListener("click", () =>
  importBtn.classList.toggle("import-btn-focus")
);

function toggleStepDisplay(prevIndex, index) {
  stepHeads[prevIndex].style.display = "flex";
  stepContents[prevIndex].style.display = "none";
  stepContents[index].style.display = "flex";
  stepHeads[index].style.display = "none";
}

function resetSteps() {
  for (const content of stepContents) {
    content.style.display = "none";
  }

  for (const head of stepHeads) {
    head.style.display = "flex";
  }
}

function handleMenuItemArrowKeyPress(e, menuItemIndex) {
  // create some helpful variables
  const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;

  const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
  const previusMenuItem = allMenuItems.item(menuItemIndex - 1);

  // if the user pressed arrow right or arrow down
  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    // if the user is on last item, focus on first menuitem
    if (isLastMenuItem) {
      allMenuItems.item(0).focus();

      return;
    }

    // then focus on next menu item
    nextMenuItem.focus();
  }

  // if the user pressed arrow up or arrow left
  if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
    if (isFirstMenuItem) {
      allMenuItems.item(allMenuItems.length - 1).focus();

      return;
    }

    previusMenuItem.focus();
  }
  // then focus on the previous menu item
  // if the user is on first menu item, focus on last menuitem
}

function handleDesktopDcClick() {
  const isExpanded = desktopDc.attributes["aria-expanded"].value === "true";
  notification.classList.toggle("hidden");
  desktopDc.classList.toggle("active");

  if (isExpanded) {
    desktopDc.ariaExpanded = "false";
    desktopDc.focus();
  } else {
    desktopDc.ariaExpanded = "true";
    allMenuItems.item(0).focus();

    allMenuItems.forEach(function (menuItem, menuItemIndex) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && desktopDc.ariaExpanded === "true") {
        notification.classList.add("hidden");
        desktopDc.ariaExpanded = "false";
        desktopDc.classList.toggle("active");
        desktopDc.focus();
      }
    });
  }

  if (!alerts.classList.contains("hidden")) {
    alerts.classList.toggle("hidden");
    bell.classList.remove("bell-focus");
  }
}

function handleMobileDcClick() {
  const isExpanded = mobileDc.attributes["aria-expanded"].value === "true";
  notification.classList.toggle("hidden");
  mobileDc.classList.toggle("focus");

  if (isExpanded) {
    mobileDc.ariaExpanded = "false";
    mobileDc.focus();
  } else {
    mobileDc.ariaExpanded = "true";
    allMenuItems.item(0).focus();

    allMenuItems.forEach(function (menuItem, menuItemIndex) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });

    notification.addEventListener("keydown", e => {
      if (e.key === "Escape" && desktopDc.ariaExpanded === "true") {
        notification.classList.add("hidden");
        desktopDc.ariaExpanded = "false";
        desktopDc.focus();
      }
    });
  }

  if (!alerts.classList.contains("hidden")) {
    alerts.classList.toggle("hidden");
    bell.classList.remove("bell-focus");
  }
}

function handleBellClick() {
  const isExpanded =
    desktopDc.attributes["aria-expanded"].value === "true" ||
    mobileDc.attributes["aria-expanded"].value === "true";
  alerts.classList.toggle("hidden");
  bell.classList.toggle("bell-focus");

  if (!notification.classList.contains("hidden")) {
    notification.classList.toggle("hidden");
    desktopDc.classList.remove("active");
    mobileDc.classList.remove("focus");

    if (isExpanded) {
      desktopDc.ariaExpanded = "false";
      desktopDc.focus();
      mobileDc.ariaExpanded = "false";
      mobileDc.focus();
    } else {
      desktopDc.ariaExpanded = "true";
      allMenuItems.item(0).focus();
      mobileDc.ariaExpanded = "true";
      allMenuItems.item(0).focus();
    }
  }
}

const dottedCheckboxes = document.querySelector(".customize-dotted-checkbox");
const markedCheckboxes = document.querySelector(".customize-marked-checkbox");
const dottedCheckboxes1 = document.querySelector(
  ".customize-dotted-checkbox-1"
);
const markedCheckboxes1 = document.querySelector(
  ".customize-marked-checkbox-1"
);
const addDottedCheckbox = document.querySelector(".add-dotted-checkbox");
const addMarkedCheckbox = document.querySelector(".add-marked-checkbox");
const addDottedCheckbox1 = document.querySelector(".add-dotted-checkbox-1");
const addMarkedCheckbox1 = document.querySelector(".add-marked-checkbox-1");
const customDottedCheckbox = document.querySelector(".custom-dotted-checkbox");
const customMarkedCheckbox = document.querySelector(".custom-marked-checkbox");
const customDottedCheckbox1 = document.querySelector(
  ".custom-dotted-checkbox-1"
);
const customMarkedCheckbox1 = document.querySelector(
  ".custom-marked-checkbox-1"
);
const nameDottedCheckbox = document.querySelector(".name-dotted-checkbox");
const nameMarkedCheckbox = document.querySelector(".name-marked-checkbox");
const nameDottedCheckbox1 = document.querySelector(".name-dotted-checkbox-1");
const nameMarkedCheckbox1 = document.querySelector(".name-marked-checkbox-1");
const setupDottedCheckbox = document.querySelector(".setup-dotted-checkbox");
const setupMarkedCheckbox = document.querySelector(".setup-marked-checkbox");
const setupDottedCheckbox1 = document.querySelector(".setup-dotted-checkbox-1");
const setupMarkedCheckbox1 = document.querySelector(".setup-marked-checkbox-1");
const checkboxes = document.querySelectorAll(".checkbox");
const stepForm = document.querySelector(".step-form");
const arrow = document.querySelector(".arrow");
const customizeDotted = document.querySelectorAll(".customize-dotted");
const customizeMarked = document.querySelectorAll(".customize-marked");
const progressText = document.querySelector(".progress-text");
const progressBar = document.querySelector(".progress-bar");
const dotted = document.querySelectorAll(".dotted");
const marked = document.querySelectorAll(".marked");

let progress = 0;
let activeSteps = 0;

dotted.forEach(e => {
  e.addEventListener("click", () => {
    progress += 0.2;
    progressBar.style.width = `${progress * 100}%`;
    progressText.textContent = `${activeSteps + 1} / 5 completed`;

    activeSteps++;
  });
});

marked.forEach(e => {
  e.addEventListener("click", () => {
    progress -= 0.2;
    progressBar.style.width = `${progress * 100}%`;
    progressText.textContent = `${activeSteps - 1} / 5 completed`;

    activeSteps--;
  });
});

arrow.addEventListener("click", () => {
  arrow.classList.toggle("rotated");
  stepForm.classList.toggle("hidden");
});

dottedCheckboxes.addEventListener("click", () => {
  dottedCheckboxes.classList.toggle("hidden");
  markedCheckboxes.classList.toggle("hidden");
  dottedCheckboxes1.classList.toggle("hidden");
  markedCheckboxes1.classList.toggle("hidden");
});

markedCheckboxes.addEventListener("click", () => {
  markedCheckboxes.classList.toggle("hidden");
  dottedCheckboxes.classList.toggle("hidden");
  markedCheckboxes1.classList.toggle("hidden");
  dottedCheckboxes1.classList.toggle("hidden");
});

dottedCheckboxes1.addEventListener("click", () => {
  dottedCheckboxes1.classList.toggle("hidden");
  markedCheckboxes1.classList.toggle("hidden");
  dottedCheckboxes.classList.toggle("hidden");
  markedCheckboxes.classList.toggle("hidden");
});

markedCheckboxes1.addEventListener("click", () => {
  markedCheckboxes1.classList.toggle("hidden");
  dottedCheckboxes1.classList.toggle("hidden");
  markedCheckboxes.classList.toggle("hidden");
  dottedCheckboxes.classList.toggle("hidden");
});

addDottedCheckbox.addEventListener("click", () => {
  addDottedCheckbox.classList.toggle("hidden");
  addMarkedCheckbox.classList.toggle("hidden");
  addDottedCheckbox1.classList.toggle("hidden");
  addMarkedCheckbox1.classList.toggle("hidden");
});

addMarkedCheckbox.addEventListener("click", () => {
  addMarkedCheckbox.classList.toggle("hidden");
  addDottedCheckbox.classList.toggle("hidden");
  addMarkedCheckbox1.classList.toggle("hidden");
  addDottedCheckbox1.classList.toggle("hidden");
});

addDottedCheckbox1.addEventListener("click", () => {
  addDottedCheckbox1.classList.toggle("hidden");
  addMarkedCheckbox1.classList.toggle("hidden");
  addDottedCheckbox.classList.toggle("hidden");
  addMarkedCheckbox.classList.toggle("hidden");
});

addMarkedCheckbox1.addEventListener("click", () => {
  addMarkedCheckbox1.classList.toggle("hidden");
  addDottedCheckbox1.classList.toggle("hidden");
  addMarkedCheckbox.classList.toggle("hidden");
  addDottedCheckbox.classList.toggle("hidden");
});

customDottedCheckbox.addEventListener("click", () => {
  customDottedCheckbox.classList.toggle("hidden");
  customMarkedCheckbox.classList.toggle("hidden");
  customDottedCheckbox1.classList.toggle("hidden");
  customMarkedCheckbox1.classList.toggle("hidden");
});

customMarkedCheckbox.addEventListener("click", () => {
  customMarkedCheckbox.classList.toggle("hidden");
  customDottedCheckbox.classList.toggle("hidden");
  customMarkedCheckbox1.classList.toggle("hidden");
  customDottedCheckbox1.classList.toggle("hidden");
});

customDottedCheckbox1.addEventListener("click", () => {
  customDottedCheckbox1.classList.toggle("hidden");
  customMarkedCheckbox1.classList.toggle("hidden");
  customDottedCheckbox.classList.toggle("hidden");
  customMarkedCheckbox.classList.toggle("hidden");
});

customMarkedCheckbox1.addEventListener("click", () => {
  customMarkedCheckbox1.classList.toggle("hidden");
  customDottedCheckbox1.classList.toggle("hidden");
  customMarkedCheckbox.classList.toggle("hidden");
  customDottedCheckbox.classList.toggle("hidden");
});

nameDottedCheckbox.addEventListener("click", () => {
  nameDottedCheckbox.classList.toggle("hidden");
  nameMarkedCheckbox.classList.toggle("hidden");
  nameDottedCheckbox1.classList.toggle("hidden");
  nameMarkedCheckbox1.classList.toggle("hidden");
});

nameMarkedCheckbox.addEventListener("click", () => {
  nameMarkedCheckbox.classList.toggle("hidden");
  nameDottedCheckbox.classList.toggle("hidden");
  nameMarkedCheckbox1.classList.toggle("hidden");
  nameDottedCheckbox1.classList.toggle("hidden");
});

nameDottedCheckbox1.addEventListener("click", () => {
  nameDottedCheckbox1.classList.toggle("hidden");
  nameMarkedCheckbox1.classList.toggle("hidden");
  nameDottedCheckbox.classList.toggle("hidden");
  nameMarkedCheckbox.classList.toggle("hidden");
});

nameMarkedCheckbox1.addEventListener("click", () => {
  nameMarkedCheckbox1.classList.toggle("hidden");
  nameDottedCheckbox1.classList.toggle("hidden");
  nameMarkedCheckbox.classList.toggle("hidden");
  nameDottedCheckbox.classList.toggle("hidden");
});

setupDottedCheckbox.addEventListener("click", () => {
  setupDottedCheckbox.classList.toggle("hidden");
  setupMarkedCheckbox.classList.toggle("hidden");
  setupDottedCheckbox1.classList.toggle("hidden");
  setupMarkedCheckbox1.classList.toggle("hidden");
});

setupMarkedCheckbox.addEventListener("click", () => {
  setupMarkedCheckbox.classList.toggle("hidden");
  setupDottedCheckbox.classList.toggle("hidden");
  setupMarkedCheckbox1.classList.toggle("hidden");
  setupDottedCheckbox1.classList.toggle("hidden");
});

setupDottedCheckbox1.addEventListener("click", () => {
  setupDottedCheckbox1.classList.toggle("hidden");
  setupMarkedCheckbox1.classList.toggle("hidden");
  setupDottedCheckbox.classList.toggle("hidden");
  setupMarkedCheckbox.classList.toggle("hidden");
});

setupMarkedCheckbox1.addEventListener("click", () => {
  setupMarkedCheckbox1.classList.toggle("hidden");
  setupDottedCheckbox1.classList.toggle("hidden");
  setupMarkedCheckbox.classList.toggle("hidden");
  setupDottedCheckbox.classList.toggle("hidden");
});
