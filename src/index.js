import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

function BootstrapForm() {
  // ตัวแปร State
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const textUsername = useRef();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();

  const [item, setItem] = useState(1);
  const selectItem = useRef();

  const [data, setData] = useState("");

  // ตรวจสอบชื่อผู้ใช้งาน
  const checkUsername = () => {
    if (textUsername.current.value.length >= 4) {
      setUsername(textUsername.current.value);
      setUsernameError("");
    } else {
      setUsernameError("Username ต้องมีความยาว 4 ตัวอักษรขึ้นไป");
      setUsername("");
    }
  };

  // ตรวจสอบอีเมล
  function isValidEmail(email) {
    return /\S+@\S+.\S+/.test(email);
  }

  const checkEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailError("อีเมลไม่ถูกต้อง");
    } else {
      setEmailError("");
      setEmail(e.target.value);
    }
  };

  const checkItem = () => {
    setItem(selectItem.current.value);
  };

  const submitData = () => {
    setData(username + " " + email + " " + item);
  };

  return (
    <Row>
      <Col></Col>
      <Col>
        <h1>Login Form</h1>
        <hr></hr>
        <form>
          {/* ส่วน ชื่อผู้ใช้งาน */}
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            ref={textUsername}
            className="form-control mb-3"
            onChange={checkUsername}
            required
          ></input>
          <h6>{username}</h6>
          <h6 style={{ color: "red" }}>{usernameError}</h6>

          {/* ส่วน รหัสผ่าน */}
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control mb-3"
            required
          ></input>

          {/* ส่วน อีเมล */}
          <label htmlFor="email" className="form-label">
            E-mail
          </label>

          <input
            type="email"
            name="email"
            placeholder="your e-mail eg: panyawatn@gmail.com"
            className="form-control mb-3"
            onBlur={checkEmail}
            required
          ></input>
          <h6>{email}</h6>
          <h6 style={{ color: "red" }}>{emailError}</h6>

          {/* การเลือกไอเทม */}
          <label htmlFor="selectItem" className="form-label">
            Item
          </label>
          <select
            name="selectItem"
            className="form-select"
            ref={selectItem}
            onChange={checkItem}
          >
            <option></option>
            <option value="1"> Item1 </option>
            <option value="2"> Item2 </option>
            <option value="3"> Item3 </option>
          </select>

          {/* <Button type="submit" className="my-3"> */}
          <Button className="my-3" onClick={submitData}>
            Submit
          </Button>

          <h5>{data}</h5>
        </form>
      </Col>
      <Col></Col>
    </Row>
  );
}
// การใช้งาน HookForm
function HookForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const firstName = watch("firstName");
  const lastName = watch("lastNameName");
  const [data, setData] = useState("");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setData(firstName + "" + lastName);
      })}
    >
      <input
        type="text"
        {...register("firstName", {
          required: "ต้องใส่ข้อมูลช่องนี้",
          minLength: { value: 4, message: "ต้องมีความยาว 4 ตัวอักษรขึ้นไป" },
        })}
        placeholder="First Name"
      ></input>
      <p>{errors.firstName?.message}</p>
      <input
        type="text"
        {...register("lastName", {
          required: "ต้องใส่ข้อมูลช่องนี้",
          minLength: { value: 4, message: "ต้องมีความยาว 4 ตัวอักษรขึ้นไป" },
        })}
        placeholder="Last name"
      ></input>
      <p>{errors.lastName?.message}</p>
      <input type="submit"></input>
      <h4>{data}</h4>
    </form>
  );
}

function App() {
  return (
    <Container className="my-3">
      <BootstrapForm></BootstrapForm>
      <HookForm></HookForm>
    </Container>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
