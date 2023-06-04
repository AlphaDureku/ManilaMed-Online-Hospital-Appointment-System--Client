import { Row } from "react-bootstrap";
import { DatePicker } from "@mantine/dates";
import { useMediaQuery } from "@mantine/hooks";
export default function InsertStep1 () {
    const breakPointMobile = useMediaQuery("(max-width: 1000px)");

    return (
        <>
          <div className="insertAppointment-Content">
            <div className="mt-2" >
                <DatePicker
                    // getDayProps={getDayProps}
                    // onChange={handleDateSelect}
                    // value={selectedDate}
                    allowDeselect
                    size={breakPointMobile ? "xs" : "lg"}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                ></DatePicker>

            </div>
            <div>
              <Row className="legendRowleftInsert mt-3">
                <label className="headerlegendInsert ">Time</label>
                <label className="subheaderlegendInsert ">
                  Doctor's Available Time
                </label>

                <table className="table table-striped table-hover text-center mt-4 tableinsertapp">
                  <thead>
                    <tr>
                      <td>Date</td>
                      <td>Day</td>
                      <td>Time</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                       {/* Date */}
                       June 4, 2023
                      </td>
                      <td>
                        {/* Day */}
                        Sunday
                      </td>
                      <td>
                        {/* Time */}
                        11:00 AM - 02:00 PM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>
              <Row className="queuContainerInsert ">
                <span>
                  <span>
                    {" "}
                    Patient is number{" "}
                    <label className="queueNumber">
                     {/* Queue Number */}
                     1
                    </label>{" "}
                    in queue
                  </span>
                  <span>
                    <br />
                    <br />
                        Patient should be in the hospital on {" "}
                    <span className="recomGo">
                        {/* Sample */}
                        June 4, 2023 Sunday 11:00 AM
                    </span>
                  </span>
                </span>
              </Row>
             
            </div>
                    
            </div>
        
        
        
        
        
        
        </>




    );


}