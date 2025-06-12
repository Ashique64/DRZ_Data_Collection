import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.clear();
        navigate("/", { replace: true });
      } else {
        const timeout = (decoded.exp - currentTime) * 1000; // ms
        const timer = setTimeout(() => {
          localStorage.clear();
          navigate("/", { replace: true });
        }, timeout);

        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.clear();
      navigate("/", { replace: true });
    }
  }, [navigate]);
};

export default useAutoLogout;
