import React, { Component } from "react";
import Loading from "./Loading";
import Panel from "./Panel";

import classnames from "classnames";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  state = {
    loading: false,
    focused: null
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  selectPanel(id) {
    if (this.state.focused === id) {
      this.setState({
        focused: null
      });
    } else {
      this.setState({
        focused: id
       });
    }
   }

  render() {

    const panels = data
      .filter((panel) => {
        return this.state.focused === null || this.state.focused === panel.id
      })
      .map((panel) => {
        return(<Panel 
        key={panel.id}
        id={panel.id}
        label={panel.label}
        value={panel.value}
        onSelect={event => this.selectPanel(panel.id)}
        />);
    })

    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <main className={dashboardClasses}> 
          {panels}
        </main>
      );
    }
  }
}

export default Dashboard;
