import React, { useState, useEffect, useRef } from "react";
import "../assets/css/signIn.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMesage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(""); // State to hold error message
  const formRef = useRef(null);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            username,
            password,
        });

        // Kiểm tra nếu đăng nhập thành công
        if (response.status === 200) {
            const { data } = response.data; // Lấy dữ liệu từ phản hồi
            const token = data.token; // Lấy token
            const role = data.role; // Lấy vai trò

            // Lưu token và vai trò vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === 'ADMIN') {
                alert("Đăng nhập thành công với quyền admin!");
                navigate('/product');
            } else {
                alert("Đăng nhập thành công!");
                navigate('/product');
                // Chuyển hướng đến trang người dùng
            }
        }
    } catch (error) {
        setErrorMessage('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        console.error("Error during login:", error);
    }
};

  useEffect(() => {
    window.scrollTo({ top: formRef.current.offsetTop, behavior: "smooth" });
  }, []);

  return (
    <div className="container-fluid px-0">
      <Header />

      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          {/* Left */}
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="featured-image mb-3">
              <img
                src={require("../assets/images/experience-gfx.webp")}
                alt="Experience"
                className="img-fluid"
                style={{ width: "500px" }}
              />
            </div>
          </div>

          {/* Right */}
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4 text-center">
                <h2>Chào mừng bạn trở lại</h2>
                <p>Sô cô la – một món quà ngọt ngào dành cho chính bạn.</p>
              </div>

              {/* Form đăng nhập */}
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    name="username"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required // Thêm thuộc tính required
                  />
                </div>

                <div className="input-group mb-1">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    name="password"
                    placeholder="Mật Khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required // Thêm thuộc tính required
                  />
                </div>

                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="formCheck"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label
                      htmlFor="formCheck"
                      className="form-check-label text-secondary"
                    >
                      <small>Ghi nhớ mật khẩu</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <a href="/forgot-password">Quên mật khẩu?</a>{" "}
                      {/* Cập nhật đường dẫn */}
                    </small>
                  </div>
                </div>

                {/* Hi ển thị thông báo lỗi nếu đăng nhập thất bại */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="input-group mb-3">
                  <button
                    className="btn btn-lg btn-dark w-100 fs-6"
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>

              <div className="row">
                <small>
                  Bạn chưa có tài khoản?
                  <a href="/sign-up" name="signUp">
                    {/* Cập nhật đường dẫn */}
                    Đăng ký
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
