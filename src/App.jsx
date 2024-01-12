import './App.css'

const now = new Date();
const thisDate = now.getDate();

const months = {
  0: {
    firstName: 'январь',
    secondName: 'января',
    duration: 31
  },
  1: {
    firstName: 'февраль',
    secondName: 'февраля',
    duration: 28,
    leapDuration: 29
  },
  2: {
    firstName: 'март',
    secondName: 'марта',
    duration: 31
  },
  3: {
    firstName: 'апрель',
    secondName: 'апреля',
    duration: 30
  },
  4: {
    firstName: 'май',
    secondName: 'мая',
    duration: 31
  },
  5: {
    firstName: 'июнь',
    secondName: 'июня',
    duration: 30
  },
  6: {
    firstName: 'июль',
    secondName: 'июля',
    duration: 31
  },
  7: {
    firstName: 'август',
    secondName: 'августа',
    duration: 31
  },
  8: {
    firstName: 'сентябрь',
    secondName: 'сентября',
    duration: 30
  },
  9: {
    firstName: 'октябрь',
    secondName: 'октября',
    duration: 31
  },
  10: {
    firstName: 'ноябрь',
    secondName: 'ноября',
    duration: 30
  },
  11: {
    firstName: 'декабрь',
    secondName: 'декабря',
    duration: 31
  },
}

const week = {
  0: 'воскресенье',
  1: 'понедельник',
  2: 'вторник',
  3: 'среда',
  4: 'четверг',
  5: 'пятница',
  6: 'суббота',
}

function CreateTd (props) {
  if(props.value === thisDate) {
    return (
      <td className="ui-datepicker-today" key={props.value.toString()}>{props.value}</td>
    )
  } else {
    return (
      <td key={props.value.toString()}>{props.value}</td>
    )
  }
}

function GenerateListDays(props) {
  const result = [];
  let lastValue = null;

  const firstWeek = [];  
  for (let j = 1; j < 8; j += 1) {
    if(j < props.index) {
      const value = props.lengthLast - props.index + j + 1;
      firstWeek.push(<td key={`last${value}`} className="ui-datepicker-other-month">{value}</td>);
    } else if(j === props.index) {
      firstWeek.push(<CreateTd value={1}/>)
    } else if(j > props.index) {
      const value = j - props.index + 1;
      firstWeek.push(<CreateTd value={value}/>);
    }
    if(j === 7) lastValue  = j - props.index + 1;
  }

  let keyTr = 1;
  result.push(<tr key={`week${keyTr}`}>{firstWeek}</tr>);

  for(let u = 0; u < props.lengthNow/7; u += 1) {
    const otherWeek = [];
    for(let o = 1; o < 8; o += 1) {
      let value = lastValue + o;
      if(value < props.lengthNow) {
        otherWeek.push(<CreateTd value={value}/>);
        if(o === 7) lastValue = value;
      }
    }
    if(otherWeek.length === 7) {
      keyTr += 1;
      result.push(<tr key={`week${keyTr}`}>{otherWeek}</tr>);
    }
  }

  if(lastValue < props.lengthNow) {
    const lastWeek = [];
    let toggle = true;
    for(let l = 1; l < 8; l += 1) {
      if(toggle) {
        const value = lastValue + l;
        lastWeek.push(<CreateTd value={value}/>);
        if(value === props.lengthNow) {
          toggle = false;
          lastValue = 0;
        }
      } else {
        lastValue += 1;
        lastWeek.push(<td key={`next${lastValue}`} className="ui-datepicker-other-month">{lastValue}</td>);
      }
      
    }
    keyTr += 1;
    result.push(<tr key={`week${keyTr}`}>{lastWeek}</tr>);
  }

  return (result)
}

function Calendar(props) {
  const numberThisMonth = props.date.getMonth();
  const thisMonth = months[numberThisMonth];
  const monthTitle = thisMonth.firstName[0].toUpperCase() + thisMonth.firstName.slice(1);

  const thisDay = props.date.getDay();
  const dayTitle = week[thisDay][0].toUpperCase() + week[thisDay].slice(1);

  const thisYear = props.date.getUTCFullYear();

  const dateBeginMonth = new Date(thisYear, numberThisMonth, 1)
  const dayNumber = dateBeginMonth.getDay();

  const numberLastMonth = numberThisMonth === 0 ? 11 : numberThisMonth - 1;

  let durationNow = null;
  if(numberThisMonth === 1 && (thisYear % 4) === 0) {
    durationNow = months[numberThisMonth].leapDuration;
  } else {
    durationNow = months[numberThisMonth].duration;
  }
  const durationLast = months[numberLastMonth].duration;
  
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{dayTitle}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{thisDate}</div>
          <div className="ui-datepicker-material-month">{thisMonth.secondName}</div>
          <div className="ui-datepicker-material-year">{thisYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{monthTitle}</span>&nbsp;<span className="ui-datepicker-year">{thisYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col/>
          <col/>
          <col className="ui-datepicker-week-end"/>
          <col className="ui-datepicker-week-end"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          <GenerateListDays index={dayNumber} lengthLast={durationLast} lengthNow={durationNow}/>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  return (
    <>
      <Calendar date={now} />
    </>
  )
}

export default App
