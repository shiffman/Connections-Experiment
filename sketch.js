const boxes = document.querySelectorAll('.box');
let draggedBox = null;

const colors = ['goldenrod', 'forestgreen', 'royalblue', 'indigo'];
updateColors();
adjustFontSize();

function updateColors() {
  boxes.forEach((box, index) => {
    const i = Math.floor(index / 4);
    box.style.backgroundColor = colors[i];
    box.style.color = 'white';
  });
}

function adjustFontSize() {
  boxes.forEach((box) => {
    let fontSize = 16; // Starting font size
    box.style.fontSize = `${fontSize}px`;
    while (box.scrollWidth > box.clientWidth && fontSize > 10) {
      fontSize -= 1;
      box.style.fontSize = `${fontSize}px`;
    }
  });
}

boxes.forEach((box) => {
  box.addEventListener('dragstart', handleDragStart);
  box.addEventListener('dragover', handleDragOver);
  box.addEventListener('drop', handleDrop);
  box.addEventListener('dragend', handleDragEnd);
  box.addEventListener('touchstart', handleTouchStart);
  box.addEventListener('touchmove', handleTouchMove);
  box.addEventListener('touchend', handleTouchEnd);
});

function handleDragStart(e) {
  draggedBox = e.target;
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const targetBox = e.target;
  if (targetBox !== draggedBox && targetBox.classList.contains('box')) {
    const temp = draggedBox.innerHTML;
    draggedBox.innerHTML = targetBox.innerHTML;
    targetBox.innerHTML = temp;
    updateColors();
    adjustFontSize();
  }
}

function handleDragEnd() {
  draggedBox = null;
}

function handleTouchStart(e) {
  draggedBox = e.target;
}

function handleTouchMove(e) {
  const touch = e.touches[0];
  const touched = document.elementFromPoint(touch.clientX, touch.clientY);

  if (touched && touched.classList.contains('box') && touched !== draggedBox) {
    touched.style.border = '2px dashed white';
  }
}

function handleTouchEnd(e) {
  const touch = e.changedTouches[0];
  const touched = document.elementFromPoint(touch.clientX, touch.clientY);

  if (touched && touched.classList.contains('box') && touched !== draggedBox) {
    const temp = draggedBox.innerHTML;
    draggedBox.innerHTML = touched.innerHTML;
    touched.innerHTML = temp;
    updateColors();
    adjustFontSize();
  }

  boxes.forEach((box) => (box.style.border = '2px solid #333'));
  draggedBox = null;
}
