import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import styles from "../css/date_picker.css"; 

export default class  extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDays: [],
    };
  }

  handleDayClick(day, { selected }) {
    const selectedDays = day; 
    this.setState({ selectedDays });
    this.props.setSelectedDays({ selectedDays }); 
  }

  render() {
    return (
      <div>
        <DayPicker
          classNames={styles.rdp}
          numberOfMonths={1}
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
          disabledDays={[
            {
              before: new Date(),
            },
          ]}
        />
      </div>
    );
  }
}