// ---------------- TIMER ---------------- 
let focusTime = 25 * 60;
let breakTime = 5 * 60;
let time = focusTime;
let timer;
let isRunning = false;
let isFocus = true;

const alarmSound = document.getElementById("alarmSound");

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  document.getElementById("mode").textContent = isFocus ? "Focus Time" : "Break Time";
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;

        alarmSound.play(); // ⏰ Play alarm immediately

        // ✅ Delay popup slightly to allow sound to play
        setTimeout(() => {
          if (isFocus) {
            const startBreak = confirm("Focus session over! Start your break?");
            if (startBreak) {
              isFocus = false;
              time = breakTime;
              updateDisplay();
              startTimer();
            }
          } else {
            const backToWork = confirm("Break over! Start another focus session?");
            if (backToWork) {
              isFocus = true;
              time = focusTime;
              updateDisplay();
              startTimer();
            }
          }
        }, 500); // ⏳ Half a second delay
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  const customFocus = parseInt(document.getElementById("focusMinutes").value);
  const customBreak = parseInt(document.getElementById("breakMinutes").value);

  focusTime = isNaN(customFocus) ? 25 * 60 : customFocus * 60;
  breakTime = isNaN(customBreak) ? 5 * 60 : customBreak * 60;

  isFocus = true;
  time = focusTime;
  updateDisplay();
}

resetTimer(); // Initialize on load



// ---------------- SELF-CARE ROUTINE ----------------


// ---------------- STUDY TOPIC PLANNER ----------------
const form = document.getElementById('topicForm');
const topicList = document.getElementById('topicList');
const totalTimeDisplay = document.getElementById('totalTimeDisplay');
let topics = JSON.parse(localStorage.getItem('topics')) || [];

function saveTopics() {
  localStorage.setItem('topics', JSON.stringify(topics));
}

function renderTopics() {
  topicList.innerHTML = '';
  let totalTime = 0;

  topics.forEach((t, index) => {
    totalTime += t.time;

    const div = document.createElement('div');
    div.className = 'topic-card';
    div.innerHTML = `
      <strong>${t.topic}</strong><br>
      Study Time: ${t.time} min | Marks: ${t.marks}
      <br><br>
      <button onclick="editTopic(${index})">✏️ Edit</button>
      <button onclick="deleteTopic(${index})">❌ Delete</button>
    `;
    topicList.appendChild(div);
  });

  totalTimeDisplay.textContent = `Total Study Time Planned: ${totalTime} minutes`;
  saveTopics();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const topic = document.getElementById('topic').value;
  const time = parseInt(document.getElementById('time').value);
  const marks = parseInt(document.getElementById('marks').value);

  topics.push({ topic, time, marks });
  topics.sort((a, b) => b.marks - a.marks);

  renderTopics();
  form.reset();
});

function editTopic(index) {
  const topic = topics[index];
  const newTopic = prompt("Edit Topic Name:", topic.topic);
  const newTime = prompt("Edit Study Time (minutes):", topic.time);
  const newMarks = prompt("Edit Marks:", topic.marks);

  if (newTopic && newTime && newMarks) {
    topics[index] = {
      topic: newTopic,
      time: parseInt(newTime),
      marks: parseInt(newMarks)
    };
    topics.sort((a, b) => b.marks - a.marks);
    renderTopics();
  }
}

function deleteTopic(index) {
  if (confirm("Are you sure you want to delete this topic?")) {
    topics.splice(index, 1);
    renderTopics();
  }
}

window.onload = renderTopics;

// ---------------- EXAM COUNTDOWN ----------------
document.getElementById('examDate').addEventListener('change', () => {
  const examDate = new Date(document.getElementById('examDate').value);
  const today = new Date();
  const timeDiff = examDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const daysLeftDisplay = document.getElementById('daysLeft');
  const message = document.getElementById('message');

  if (daysLeft < 0) {
    daysLeftDisplay.textContent = "📚 Exam already passed!";
    message.textContent = "";
  } else {
    daysLeftDisplay.textContent = `📅 ${daysLeft} day(s) left until your exam`;
    if (daysLeft >= 30) {
      message.textContent = "Plenty of time. Let’s plan wisely!";
    } else if (daysLeft >= 7) {
      message.textContent = "Stay focused. You got this!";
    } else if (daysLeft > 0) {
      message.textContent = "Lock in. Final stretch!";
    } else {
      message.textContent = "Today is the day. Believe in yourself!";
    }
  }
});

// ---------------- TASK PLANNER ----------------
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const priority = document.getElementById("priority").value;

  if (!name) return;

  const taskCard = document.createElement("div");
  taskCard.className = `task-card priority-${priority}`;
  taskCard.innerHTML = `<span>${name}</span> <button>Done</button>`;

  taskCard.querySelector("button").addEventListener("click", () => {
    taskCard.classList.toggle("completed");
  });

  document.getElementById("taskList").appendChild(taskCard);
  document.getElementById("taskForm").reset();
});

// ---------------- TIME BLOCKING ----------------
document.getElementById("timeBlockForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const task = document.getElementById("blockTask").value.trim();
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  if (!task || !start || !end || start >= end) {
    alert("Please enter valid task times.");
    return;
  }

  const block = document.createElement("div");
  block.className = "block";
  block.innerHTML = `<span>${task}</span><small>${start} - ${end}</small>`;

  document.getElementById("schedule").appendChild(block);
  this.reset();
});

/*Meal & Planner*/
const mealForm = document.getElementById('mealForm');
const mealList = document.getElementById('mealList');

mealForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const meal = document.getElementById('meal').value;
  const time = document.getElementById('time').value;

  const div = document.createElement('div');
  div.className = 'meal-item';
  div.innerHTML = `<strong>${time}</strong>: ${meal}`;

  mealList.appendChild(div);

  mealForm.reset();
});
/*Self Care*/
const routineList = document.getElementById("routineList");

  function addSelfCareTask() {
    const time = document.getElementById("timeOfDay").value;
    const type = document.getElementById("careType").value;
    const task = document.getElementById("customTask").value.trim();

    if (task) {
      const listItem = document.createElement("li");
      listItem.textContent = `${time.charAt(0).toUpperCase() + time.slice(1)} - ${type.charAt(0).toUpperCase() + type.slice(1)}: ${task}`;
      routineList.appendChild(listItem);
      document.getElementById("customTask").value = "";
    }
  }

  function downloadRoutine() {
    let content = "Self-Care Routine:\n";
    document.querySelectorAll("#routineList li").forEach((item) => {
      content += `- ${item.textContent}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "self_care_routine.txt";
    link.click();
  }
  /*Gratituted*/
  const today = new Date().toISOString().split('T')[0];

    function saveEntry() {
      const entry = document.getElementById('entry').value.trim();
      const status = document.getElementById('status');

      if (!entry) {
        status.textContent = "Please write something you're grateful for.";
        status.style.color = 'red';
        return;
      }

      if (localStorage.getItem('gratitude-' + today)) {
        status.textContent = "You've already written a gratitude entry for today. Come back tomorrow!";
        status.style.color = 'orange';
        return;
      }

      localStorage.setItem('gratitude-' + today, entry);
      status.textContent = "Your gratitude has been saved for today. 💛";
      status.style.color = 'green';
      document.getElementById('entry').value = '';
    } 