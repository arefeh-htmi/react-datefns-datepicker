import React, { Component } from "react";
import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  format,
  subMonths
} from "date-fns";
import "./basicCalendar.scss";
class BasicCalendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM yyy";

    return (
      <>
        <button onClick={(e) => this.prevMonth(e)}>
          <div className="icon" onClick={this.prevMonth}>
            <i className="fas fa-angle-left"></i>
          </div>
        </button>

        <span>{format(new Date(), dateFormat)}</span>

        <button onClick={(e) => this.nextMonth(e)}>
          <div className="icon">
            <i className="fas fa-angle-right"></i>
          </div>
        </button>
      </>
    );
  }

  renderDays() {
    const dateFormat = "ccc";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="day" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="week day-labels">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`day ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "is-selected"
                : isSameDay(day, new Date())
                ? "is-today"
                : ""
            } `}
            key={day}
            onClick={(e) => {
              this.onDateClick(cloneDay);
              // isDisabled(day.dateValue) ? null : selectDay(day.dateValue)
            }}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <>{rows}</>;
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day
    });
  };
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <>
        <div className="my-calendar">
          <div className="my-calendar-header">{this.renderHeader()}</div>
          <div className="my-calendar-body">
            {this.renderDays()}
            {this.renderCells()}
          </div>
        </div>
      </>
    );
  }
}
export default BasicCalendar;
