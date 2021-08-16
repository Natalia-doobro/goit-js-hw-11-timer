class CountdownTimer {
  constructor({selector,targetDate}) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerId = null;
  }

  start() {
    const startTime = this.targetDate.getTime();

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const {days, hours, mins, secs} = this.onTimeComponents(deltaTime);
      
      onDateClock({ days, hours, mins, secs });

      if (deltaTime < 0) {
            clearInterval(this.timerId);
            document.getElementById(this.selector).innerHTML = "Акция истекла";
      }
    }, 1000);
  }


  onTimeComponents(time) {
    /*
    * Дні, що залишилися: ділимо значення UTC на 1000 * 60 * 60 * 24, кількість
    * мілісекунд в один день (мілісекунди * секунди * хвилини * години)
    */
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
    * Решта годин: отримуємо залишок від попереднього розрахунку за допомогою оператора
    * залишку% і ділимо його на кількість мілісекунд в одній годині
    * (1000 * 60 * 60 = мілісекунди * хвилини * секунди)
    */
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

    /*
    * Решта хвилин: отримуємо хвилини, що залишилися і ділимо їх на кількість
    * мілісекунд в одній хвилині (1000 * 60 = мілісекунди * секунди)
    */
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
    * Решта секунд: отримуємо секунди, які залишилися і ділимо їх на кількість
    * миллисекунд в одной секунде (1000)
    */
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs};
  }
};

const timer = new CountdownTimer({
  selector: 'timer-1',
  targetDate: new Date('Jul 17, 2022'),
});

timer.start();


const timeDays = document.querySelector('span[data-value="days"]');
const timeHours = document.querySelector('span[data-value="hours"]');
const timeMins = document.querySelector('span[data-value="mins"]');
const timeSecs = document.querySelector('span[data-value="secs"]');


function pad(value) {
  return String(value).padStart(2, '0');
}
function onDateClock({days, hours, mins, secs}){
  timeDays.textContent = `${days}`;
  timeHours.textContent = `${hours}`;
  timeMins.textContent = `${mins}`;
  timeSecs.textContent = `${secs}`;
}

