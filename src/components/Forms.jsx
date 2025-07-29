import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Forms() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Жөнөтүү...");

    emailjs
      .sendForm(
        "service_0jae1dt",  // замени на свой
        "template_7iq0qmu", // замени на свой
        formRef.current,
        "hYA545z5tGCHxirK0"      // замени на свой (Public Key)
      )
      .then(
        () => {
          setStatus("✅ Чоң рахмат! Жообуңуз жөнөтүлдү.");
          formRef.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("❌ Жөнөтүү катасы.");
        }
      );
  };

  return (
    <div>
      <form ref={formRef} onSubmit={sendEmail}>
        <div className="form-group">
          <input
            className="wrapper_input"
            type="text"
            name="name"
            placeholder="Атыңыз"
            required
          />
        </div>
        <div className="form-group">
          <span>Катышуу:</span>
          <label>
            <input type="radio" name="attendance" value="Келем" required /> Келем
          </label>
          <label>
            <input type="radio" name="attendance" value="Экөөбүз келебиз" /> Экөөбүз келебиз
          </label>
          <label>
            <input type="radio" name="attendance" value="Тилек каршы, келе албайм" />
            Тилеке каршы, келе албайм
          </label>
        </div>
        <button type="submit">Жөнөтүү</button>
      </form>
      {status && <p style={{ marginBottom: "0px" }}>{status}</p>}
    </div>
  );
}
