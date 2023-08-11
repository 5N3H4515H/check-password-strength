import { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [weaknesses, setWeaknesses] = useState([]);
  const [strength, setStrength] = useState(100);
  const [isStrong, setIsStrong] = useState(false);

  const checkStrength = () => {
    const array = [
      checkLength(password),
      checkUppercase(password),
      checkLowercase(password),
      checkNumber(password),
      checkSpecialChar(password),
      checkRepeat(password),
    ];

    setWeaknesses(array.filter((value) => value !== null));
    calculateStrength(array);
  };

  const calculateStrength = (array) => {
    let strengthValue = 100;
    array.forEach((value) => {
      if (value !== null) {
        strengthValue -= value.id2;
      }
    });
    setStrength(strengthValue);
    setIsStrong(strengthValue >= 70);
  };

  const checkLength = (pwd) => {
    if (pwd.length <= 5) {
      return {
        id1: "Your password is too short",
        id2: 40,
      };
    } else if (pwd.length <= 10) {
      return {
        id1: "Your password could be longer",
        id2: 15,
      };
    }
    return null;
  };

  const checkType = (pwd, regex, type) => {
    const w = pwd.match(regex) || [];
    if (w.length === 0) {
      return {
        id1: `Your password has no ${type}`,
        id2: 20,
      };
    } else if (w.length <= 2) {
      return {
        id1: `Your password could use more ${type}`,
        id2: 5,
      };
    }
    return null;
  };

  const checkUppercase = (pwd) =>
    checkType(pwd, /[A-Z]/g, "Uppercase Characters");
  const checkLowercase = (pwd) =>
    checkType(pwd, /[a-z]/g, "Lowercase Characters");
  const checkNumber = (pwd) => checkType(pwd, /[0-9]/g, "Numbers");
  const checkSpecialChar = (pwd) =>
    checkType(pwd, /[^0-9A-Za-z]/g, "Special Characters");

  const checkRepeat = (pwd) => {
    const regex = /(.)\1/g;
    const w = pwd.match(regex) || [];
    if (w.length > 0) {
      return {
        id1: "Your password has repeat characters",
        id2: w.length * 5,
      };
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkStrength();
          }}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          Show Password
        </button>
      </div>

      <div className="progress" style={{ width: `${strength}%` }}></div>
      <div className="weaknesses">
        {weaknesses.map((value, index) => (
          <div key={index}>{value.id1}</div>
        ))}
        {isStrong && <div className="strong-message">Password is strong!</div>}
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
