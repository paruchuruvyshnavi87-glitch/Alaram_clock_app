let alarms = [];
let ringingAlarm = null;
const alarmSound = new Audio("alarm_beep.mp3");

/* ---------- CLOCK ---------- */
function updateClock() {
    const now = new Date();

    document.getElementById("currentTime").innerText =
        now.toLocaleTimeString();

    document.getElementById("currentDate").innerText =
        now.toDateString();

    checkAlarms(now);
}

setInterval(updateClock, 1000);

/* ---------- ADD ALARM ---------- */
function addAlarm() {
    const alarmTime = document.getElementById("alarmTime").value;

    if (!alarmTime) {
        alert("Select alarm time");
        return;
    }

    alarms.push({
        time: alarmTime,
        active: true
    });

    displayAlarms();
    document.getElementById("alarmTime").value = "";
}

/* ---------- DISPLAY ALARMS ---------- */
function displayAlarms() {
    const list = document.getElementById("alarmList");
    list.innerHTML = "";

    alarms.forEach((alarm, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${alarm.time}
            <button onclick="deleteAlarm(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}

/* ---------- CHECK ALARMS ---------- */
function checkAlarms(now) {
    const currentTime =
        now.toTimeString().slice(0,5);

    alarms.forEach((alarm) => {
        if (alarm.time === currentTime && alarm.active) {
            ringAlarm(alarm);
        }
    });
}

/* ---------- RING ---------- */
function ringAlarm(alarm) {
    ringingAlarm = alarm;
    alarm.active = false;

    alarmSound.loop = true;
    alarmSound.play();

    document.getElementById("alarmModal").style.display = "block";
}

/* ---------- SNOOZE ---------- */
function snoozeAlarm() {
    alarmSound.pause();
    document.getElementById("alarmModal").style.display = "none";

    const now = new Date();
    now.setMinutes(now.getMinutes() + 5);

    const snoozeTime =
        now.toTimeString().slice(0,5);

    ringingAlarm.time = snoozeTime;
    ringingAlarm.active = true;

    displayAlarms();
}

/* ---------- STOP ---------- */
function stopAlarm() {
    alarmSound.pause();
    document.getElementById("alarmModal").style.display = "none";
}

/* ---------- DELETE ---------- */
function deleteAlarm(index) {
    alarms.splice(index, 1);
    displayAlarms();
}
