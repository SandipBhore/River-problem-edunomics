import React, { Component } from "react";

class Boat extends Component {
  constructor() {
    super();
    this.state = {
      r_velocity: 0,
      p_velocity: 0,
      angle_of_swim: 0,
      width_of_river: 0,
      total_time: 0,
    };
  }

  calculation() {
    var s = 0,
      value_s,
      resultant_velocity,
      rad_value;

    //when the input values are not given
    if (
      this.state.r_velocity == "" ||
      this.state.p_velocity == "" ||
      this.state.angle_of_swim == "" ||
      this.state.width_of_river == ""
    ) {
      alert("please enter reuired field");
    }

    //when the angle is between 90 to 180
    else if (this.state.angle_of_swim <= 180 && this.state.angle_of_swim > 90) {
      this.state.angle_of_swim = 180 - this.state.angle_of_swim;
      resultant_velocity = Math.sqrt(
        this.state.r_velocity ** 2 + this.state.p_velocity ** 2
      );

      rad_value = this.state.angle_of_swim * 0.0174533; // degree to radian value conversion
      value_s = Math.sin(rad_value);
      s = this.state.width_of_river / value_s;
      this.setState({ total_time: (s / resultant_velocity).toFixed(2) });

      //Graph

      var c = document.getElementById("graph");
      var ct = c.getContext("2d");
      ct.clearRect(0, 0, 600, 320);
      ct.beginPath();
      {
        this.state.angle_of_swim > 45
          ? ct.moveTo((270 + s * 0.1) * 2, 404)
          : ct.moveTo((270 + s) * 2, 404);
      }
      ct.lineTo(270, 0);
      ct.lineWidth = 3;
      ct.stroke();
    }

    //when the angle is less than or equal to 90
    else if (this.state.angle_of_swim <= 90) {
      resultant_velocity = Math.sqrt(
        this.state.r_velocity ** 2 + this.state.p_velocity ** 2
      );

      rad_value = this.state.angle_of_swim * 0.0174533; //degree to radian value conversion
      value_s = Math.sin(rad_value);
      s = this.state.width_of_river / value_s;
      this.setState({ total_time: (s / resultant_velocity).toFixed(2) });

      //Graph
      var c = document.getElementById("graph");
      var ct = c.getContext("2d");
      ct.clearRect(0, 0, 600, 320);
      ct.beginPath();
      {
        this.state.angle_of_swim > 45
          ? ct.moveTo((270 + s * 0.1) * 2, 404)
          : ct.moveTo((270 + s) * 2, 404);
      }
      ct.lineTo(270, 0);
      ct.lineWidth = 3;
      ct.strokeStyle = "rgb(255, 193, 7)";
      ct.stroke();
    }

    //For invalid Angle input
    else if (this.state.angle_of_swim > 180) {
      alert("You entered invalid angle.");
    }
  }

  render() {
    return (
      <div>
        <h3 className="text-center mt-2 text-light bg-secondary">
          Cross the River !
        </h3>
        <div className="row">
          <div className="col ">
            <label className="ml-3 text-info" for="">
              River velocity{" "}
            </label>
            <input
              type="text"
              className="m-3 border border-info"
              border="2px"
              placeholder=" m/s"
              onChange={(e) => {
                this.state.r_velocity = e.target.value;
              }}
            />
          </div>
          <div className="col ">
            <label className="ml-3 text-info" for="">
              Person velocity{" "}
            </label>
            <input
              type="text"
              required
              border="2px"
              className="m-3 border border-info"
              placeholder=" m/s"
              onChange={(e) => {
                this.state.p_velocity = e.target.value;
              }}
            />
          </div>
          <div className="col">
            <label className="ml-3 text-info" for="">
              Angle of swim{" "}
            </label>
            <input
              type="text"
              border="2px"
              className="m-3 border border-info"
              placeholder=" degrees"
              onChange={(e) => {
                this.state.angle_of_swim = e.target.value;
              }}
            />
          </div>
          <div className="col ">
            <label className="ml-3 text-info" for="">
              Width of river{" "}
            </label>
            <input
              type="text"
              border="2px"
              className="m-3 border border-info"
              placeholder=" mtr"
              onChange={(e) => {
                this.state.width_of_river = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="container-fluid text-center">
            <button
              className=" btn btn-info"
              onClick={() => this.calculation()}
            >
              {" "}
              Jump and Swim
            </button>
          </div>
        </div>
        <div className="row">
          <div className="container-fluid  mt-4 col-6">
            <div className="text-center">
              <h6>Trajectory of the Flow ---></h6>
            </div>
            <canvas
              id="graph"
              width="600"
              height="300"
              style={{ border: "3px solid #138496" }}
              className="mt-2 ml-3"
            />
          </div>

          <div className="container-fluid mt-3 text-center col-6 mt-5 pt-5 pr-5">
            {this.state.total_time !== 0 ? (
              <div>
                <h3>
                  Total time required to cross the river:{" "}
                  {this.state.total_time} sec
                </h3>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Boat;
