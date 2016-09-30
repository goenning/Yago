import * as React from "react";

export interface AppProps {
  framework: string;
}

export interface AppState {
  value: string;
}

export class App extends React.Component<AppProps, AppState> {
  
  constructor() {
    super();
    this.setState({ value: "123" });
  }

  componentDidMount?(): void {
    $(".ui.dropdown").dropdown();
  }

  render() {
    return <div>
              <h1>Hello from {this.props.framework}!</h1>
              <select className="ui dropdown">
                <option value="">Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
          </div>;
  }
}