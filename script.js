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
    image: 'DATA_URI_SUN_PLACEHOLDER',
    steps: [
      '1. 先畫一個大大的圓圈（太陽的臉）',
      '2. 在圓圈周圍畫許多直線，像光芒一樣',
      '3. 把圓圈塗成黃色或橙色',
      '4. 可以加點微笑讓太陽更開心！'
    ]
  }
];

// NOTE: Full content with all 5 data URIs is too large for this single call.
// The local file has the complete version. Please upload images folder manually
// or I will provide a smaller version.
