import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const teacher_jwtToken = sessionStorage.getItem("teacher-jwtToken");
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [allGrades, setAllGrades] = useState([]);
  const [allBatch, setAllBatch] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

  const [batches, setBatches] = useState([]);

  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    batchId: "",
    userId: admin ? admin.id : teacher.id,
  });

  useEffect(() => {
    const getGradeData = async () => {
      const allGradeData = await retrieveAllGradeData();
      if (allGradeData && allGradeData.grades) {
        setAllGrades(allGradeData.grades);
      }
      if (allGradeData && allGradeData.batches) {
        setAllBatch(allGradeData.batches);
      }
    };

    getGradeData();
  }, []);

  const retrieveAllGradeData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/grade-wise/detail"
    );
    console.log(JSON.stringify(response.data));
    return response.data;
  };

  useEffect(() => {
    if (document.URL.indexOf("student") != -1) {
      user.role = "Student";
    } else if (document.URL.indexOf("teacher") != -1) {
      user.role = "Teacher";
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    let jwtToken;

    if (user.role === "Student" && user.batchId === "") {
      alert("Please select the Batch!!!!");
    } else {
      fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //     Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(user),
      })
        .then((result) => {
          console.log("result", result);
          result.json().then((res) => {
            if (res.success) {
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                navigate("/user/login");
              }, 1000);
            } else if (!res.success) {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                window.location.reload(true);
              }, 1000); // Redirect after 3 seconds
            } else {
              toast.error("It seems server is down", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                window.location.reload(true);
              }, 1000); // Redirect after 3 seconds
            }
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Register Here!!!</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="title" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                  />
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="title" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                  />
                </div>

                {(() => {
                  if (document.URL.indexOf("student") != -1) {
                    return (
                      <div class="col-md-6 mb-3 text-color">
                        <select
                          name="gradeId"
                          onChange={(e) => {
                            setSelectedGradeId(e.target.value);

                            // Filter batches based on the selected grade
                            const filteredBatches = allBatch.filter(
                              (batch) =>
                                batch.grade.id === Number(e.target.value)
                            );

                            // Update state variables with filtered batches and courses
                            setBatches(filteredBatches || []);
                          }}
                          className="form-control"
                          required
                        >
                          <option value="">Select Grades</option>

                          {allGrades.map((grade) => {
                            return (
                              <option value={grade.id}> {grade.name} </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  }
                })()}

                {(() => {
                  if (document.URL.indexOf("student") != -1) {
                    return (
                      <div class="col-md-6 mb-3 text-color">
                        <select
                          name="batchId"
                          onChange={(e) => {
                            if (!selectedGradeId) {
                              toast.error("Please select Grade!!!", {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                              return;
                            }
                            user.batchId = e.target.value;
                          }}
                          className="form-control"
                          required
                        >
                          <option value="">Select Batch</option>

                          {batches.map((batch) => {
                            return (
                              <option value={batch.id}> {batch.name} </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  }
                })()}

                <div className="col-md-6 mb-3 text-color">
                  <b>
                    <label className="form-label">Email Id</label>
                  </b>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                  />
                </div>

                {/* <div className="col-md-6 mb-3">
                  <label htmlFor="quantity" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                  />
                </div> */}

                <div className="col-md-6 mb-3">
                  <label htmlFor="contact" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b> Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register User"
                  />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
