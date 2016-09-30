import * as React from "react";

export interface HelloProps {
  framework: string;
}

export class App extends React.Component<HelloProps, {}> {
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