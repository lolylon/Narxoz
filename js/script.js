const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const calendar = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    selectedDay: null,
    condensed: false, // Новый флаг для отслеживания состояния
    
    render: function() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysGrid = document.getElementById('days');
        const monthYear = document.getElementById('monthYear');
        const weekdaysDiv = document.querySelector('.weekdays');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        
        monthYear.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        daysGrid.innerHTML = ''; // Очистка сетки дней
        
        const padding = (firstDay === 0) ? 6 : firstDay - 1;
        for (let i = 0; i < padding; i++) {
            const day = document.createElement('div');
            day.className = 'day inactive';
            daysGrid.appendChild(day);
        }

        // Добавляем все дни месяца
        for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = dayNumber;

            day.addEventListener('click', () => {
                this.selectDay(day);
            });

            daysGrid.appendChild(day);
        }

        if (this.condensed) {
            weekdaysDiv.style.display = 'none';
            prevMonthBtn.style.display = 'none';
            nextMonthBtn.style.display = 'none';

            const days = daysGrid.querySelectorAll('.day');
            days.forEach((day, index) => {
                day.style.display = index < 7 ? 'block' : 'none';
            });
        } else {
            weekdaysDiv.style.display = 'flex';
            prevMonthBtn.style.display = 'inline-block';
            nextMonthBtn.style.display = 'inline-block';

            // Показываем все дни
            const days = daysGrid.querySelectorAll('.day');
            days.forEach((day) => {
                day.style.display = 'block';
            });
        }
    },
    
    selectDay: function(day) {
        if (this.selectedDay) {
            this.selectedDay.style.background = '';
            this.selectedDay.style.color = '';
        }

        day.style.background = '#B72424';
        day.style.color = '#FFFFFF';
        this.selectedDay = day;
    },
    
    nextMonth: function() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear += 1;
        } else {
            this.currentMonth += 1;
        }
        this.selectedDay = null;
        this.render();
    },
    
    prevMonth: function() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear -= 1;
        } else {
            this.currentMonth -= 1;
        }
        this.selectedDay = null;
        this.render();
    },
    
    toggleCondensedView: function() {
        this.condensed = !this.condensed; // Переключение режима
        this.render();
    }
};

document.getElementById('nextMonth').addEventListener('click', () => {
    calendar.nextMonth();
});

document.getElementById('prevMonth').addEventListener('click', () => {
    calendar.prevMonth();
});

document.getElementById('monthYear').addEventListener('click', () => {
    calendar.toggleCondensedView(); // Переключение режима при клике
});


calendar.render(); // Инициализируем календарь
