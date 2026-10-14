const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const lessonPanel = document.getElementById('lesson-panel');
const lessonList = document.getElementById('lesson-list');
const lessonDetail = document.getElementById('lesson-detail');
const lessonImg = document.getElementById('lesson-img');
const lessonSteps = document.getElementById('lesson-steps');

let isDrawing = false;
let currentColor = '#000000';
let brushSize = 8;
let isEraser = false;
let undoStack = [];
let currentLesson = null;
let currentStep = 0;

const lessons = [
  {
    id: 'sun',
    title: '☀️ 畫太陽',
    image: 'images/sun.jpg',
    steps: [
      '1. 先畫一個大大的圓圈（太陽的臉）',
      '2. 在圓圈周圍畫許多直線，像光芒一樣',
      '3. 把圓圈塗成黃色或橙色',
      '4. 可以加點微笑讓太陽更開心！'
    ]
  },
  {
    id: 'house',
    title: '🏠 畫房子',
    image: 'images/house.jpg',
    steps: [
      '1. 畫一個長方形當房子身體',
      '2. 在上面畫一個三角形當屋頂',
      '3. 在長方形裡面畫一個小長方形當門',
      '4. 可以加窗戶和煙囱哦！'
    ]
  },
  {
    id: 'flower',
    title: '🌸 畫小花',
    image: 'images/flower.jpg',
    steps: [
      '1. 先畫一個小圓當花心',
      '2. 在花心周圍畫幾個橢圓或圓當花瓣',
      '3. 從花心往下畫一條直線當花莖',
      '4. 在莖的旁邊畫兩片葉子'
    ]
  },
  {
    id: 'cat',
    title: '🐱 畫小貓',
    image: 'images/cat.jpg',
    steps: [
      '1. 畫一個大圓當貓的臉',
      '2. 在上面加兩個三角形當耳朵',
      '3. 畫兩個大眼睛和一個小鼻子',
      '4. 加上嘴巴和鬍鬍，完成可愛的小貓！'
    ]
  },
  {
    id: 'star',
    title: '⭐ 畫星星',
    image: 'images/star.jpg',
    steps: [
      '1. 先畫一個向上的三角形',
      '2. 再在下面畫一個倒三角形，讓它們重疊',
      '3. 連接線條形成五角星',
      '4. 塗上你喜歡的顏色！'
    ]
  }
];

function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveState();
}

function saveState() {
  if (undoStack.length > 20) undoStack.shift();
  undoStack.push(canvas.toDataURL());
}

function undo() {
  if (undoStack.length > 1) {
    undoStack.pop();
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = undoStack[undoStack.length - 1];
  }
}

function startDraw(e) {
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = isEraser ? '#FFFFFF' : currentColor;
  ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
}

function draw(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getPos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function endDraw() {
  if (isDrawing) {
    isDrawing = false;
    saveState();
  }
}

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });
canvas.addEventListener('touchmove', draw, { passive: false });
canvas.addEventListener('touchend', endDraw);

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentColor = btn.dataset.color;
    isEraser = false;
    document.getElementById('eraser-btn').classList.remove('active');
  });
});

document.getElementById('color-picker').addEventListener('input', (e) => {
  currentColor = e.target.value;
  isEraser = false;
  document.getElementById('eraser-btn').classList.remove('active');
});

document.getElementById('brush-size').addEventListener('input', (e) => {
  brushSize = parseInt(e.target.value);
});

document.getElementById('eraser-btn').addEventListener('click', () => {
  isEraser = !isEraser;
  document.getElementById('eraser-btn').classList.toggle('active', isEraser);
});

document.getElementById('undo-btn').addEventListener('click', undo);

document.getElementById('clear-btn').addEventListener('click', () => {
  if (confirm('確定要清除畫布嗎？')) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }
});

document.getElementById('save-btn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = '我的畫作.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

document.getElementById('lessons-btn').addEventListener('click', () => {
  lessonPanel.classList.toggle('hidden');
  if (!lessonPanel.classList.contains('hidden')) {
    showLessonList();
  }
});

function showLessonList() {
  lessonList.innerHTML = '';
  lessonDetail.classList.add('hidden');
  lessonList.classList.remove('hidden');
  lessons.forEach(lesson => {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.innerHTML = `
      <img src="${lesson.image}" alt="${lesson.title}">
      <h3>${lesson.title}</h3>
    `;
    card.addEventListener('click', () => startLesson(lesson));
    lessonList.appendChild(card);
  });
}

function startLesson(lesson) {
  currentLesson = lesson;
  currentStep = 0;
  lessonList.classList.add('hidden');
  lessonDetail.classList.remove('hidden');
  lessonImg.src = lesson.image;
  updateStep();
}

function updateStep() {
  if (!currentLesson) return;
  lessonSteps.innerHTML = `<p><strong>${currentLesson.title}</strong></p><p>${currentLesson.steps[currentStep]}</p><p>步驟 ${currentStep + 1} / ${currentLesson.steps.length}</p>`;
}

document.getElementById('next-step').addEventListener('click', () => {
  if (currentLesson && currentStep < currentLesson.steps.length - 1) {
    currentStep++;
    updateStep();
  } else {
    alert('恭喜完成這個課程！你可以繼續自由創作。');
  }
});

document.getElementById('back-to-list').addEventListener('click', showLessonList);

document.getElementById('close-lesson').addEventListener('click', () => {
  lessonPanel.classList.add('hidden');
  currentLesson = null;
});

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', () => {
  resizeCanvas();
  document.querySelector('.color-btn').classList.add('active');
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW failed', err));
}
