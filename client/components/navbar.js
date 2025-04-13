document.querySelectorAll('.nav-menu .nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});
 
// calender style
document.addEventListener('DOMContentLoaded', function() {
    const calendarBtn = document.getElementById('calendarBtn');
    const calendarContainer = document.getElementById('calendarContainer');
    const monthDisplay = document.getElementById('monthDisplay');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');

    let currentDate = new Date();
    let selectedDate = new Date();

    function generateCalendar(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startingDay = firstDay.getDay();
        const monthLength = lastDay.getDate();

        monthDisplay.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        calendarDays.innerHTML = '';

        // Previous month days
        const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            const dayElement = createDayElement(prevMonthLastDay - i, 'other-month');
            calendarDays.appendChild(dayElement);
        }

        // Current month days
        for (let i = 1; i <= monthLength; i++) {
            const isCurrentDay = i === currentDate.getDate() && 
                               date.getMonth() === currentDate.getMonth() && 
                               date.getFullYear() === currentDate.getFullYear();
            const dayElement = createDayElement(i, isCurrentDay ? 'current' : '');
            calendarDays.appendChild(dayElement);
        }

        // Next month days
        const remainingDays = 42 - (startingDay + monthLength);
        for (let i = 1; i <= remainingDays; i++) {
            const dayElement = createDayElement(i, 'other-month');
            calendarDays.appendChild(dayElement);
        }
    }

    function createDayElement(day, className) {
        const div = document.createElement('div');
        div.textContent = day;
        div.className = `calendar-day ${className}`;
        div.addEventListener('click', () => selectDate(day));
        return div;
    }

    function selectDate(day) {
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        generateCalendar(currentDate);
    }

    calendarBtn.addEventListener('click', () => {
        calendarContainer.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!calendarContainer.contains(e.target) && e.target !== calendarBtn) {
            calendarContainer.classList.remove('active');
        }
    });

    prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    generateCalendar(currentDate);
});