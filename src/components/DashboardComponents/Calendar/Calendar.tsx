import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";

interface StreakRange {
  start: number;
  end: number;
  month: number;
  year: number;
}

interface CalendarProps {
  currentDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [streakRanges, setStreakRanges] = useState<StreakRange[]>([]);

  useEffect(() => {
    const fetchStreakRanges = () => {
      setStreakRanges([
        { start: 10, end: 15, month: 10, year: 2024 }, 
        { start: 5, end: 8, month: 8, year: 2024 },  
        { start: 20, end: 25, month: 7, year: 2024 }, 
      ]);
    };

    fetchStreakRanges();
  }, []);

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartingDay = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startingDay = getStartingDay(currentMonth, currentYear);

  const isDayInStreak = (day: number, streak: StreakRange): boolean => {
    return (
      currentMonth === streak.month &&
      currentYear === streak.year &&
      day >= streak.start &&
      day <= streak.end
    );
  };

  const isStreakStart = (day: number): boolean => {
    return streakRanges.some(
      (streak) =>
        isDayInStreak(day, streak) &&
        currentMonth === streak.month &&
        currentYear === streak.year &&
        day === streak.start
    );
  };

  const isStreakEnd = (day: number): boolean => {
    return streakRanges.some(
      (streak) =>
        isDayInStreak(day, streak) &&
        currentMonth === streak.month &&
        currentYear === streak.year &&
        day === streak.end
    );
  };

  const isInStreak = (day: number): boolean => {
    return streakRanges.some((streak) => isDayInStreak(day, streak));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          className={styles.prevMonth}
          onClick={() => {
            setCurrentMonth((prevMonth) => {
              if (prevMonth === 0) {
                setCurrentYear((prevYear) => prevYear - 1);
                return 11;
              }
              return prevMonth - 1;
            });
          }}
        >
          &lt;
        </button>
        <div className={styles.monthYear}>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          className={styles.nextMonth}
          onClick={() => {
            setCurrentMonth((prevMonth) => {
              if (prevMonth === 11) {
                setCurrentYear((prevYear) => prevYear + 1);
                return 0;
              }
              return prevMonth + 1;
            });
          }}
        >
          &gt;
        </button>
      </div>
      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {Array.from({ length: startingDay }, () => null).map((_, index) => (
          <div key={`empty-${index}`} className={styles.day} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day) => (
            <div
              key={`day-${day}`}
              className={`${styles.day} ${
                isInStreak(day) ? styles.activeDay : ""
              } ${isStreakStart(day) ? styles.streakStart : ""} ${
                isStreakEnd(day) ? styles.streakEnd : ""
              }`}
            >
              {day}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
