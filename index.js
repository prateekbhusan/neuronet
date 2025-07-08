import { useState } from "react";

const VALUES = [
  "Privacy",
  "Sustainability",
  "Time Management",
  "Work-Life Balance",
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState({ meeting: null, spam: null });

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 500, margin: "40px auto", background: "#181c2b", color: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 24px #0003" }}>
      <h1 style={{ textAlign: "center", fontSize: 32, marginBottom: 8 }}>neuronet</h1>
      <p style={{ textAlign: "center", fontStyle: "italic", color: "#8ef" }}>your mind, amplified.</p>
      <hr style={{ margin: "24px 0", borderColor: "#333" }} />
      {step === 1 && (
        <>
          <h2>Step 1: Set your values</h2>
          <p>Select what matters most to you:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {VALUES.map((v) => (
              <label key={v}>
                <input
                  type="checkbox"
                  checked={selected.includes(v)}
                  onChange={() =>
                    setSelected((prev) =>
                      prev.includes(v)
                        ? prev.filter((x) => x !== v)
                        : [...prev, v]
                    )
                  }
                />{" "}
                {v}
              </label>
            ))}
          </div>
          <button
            style={{ marginTop: 24, padding: "8px 24px", fontSize: 16, background: "#8ef", color: "#181c2b", border: "none", borderRadius: 8, cursor: "pointer" }}
            disabled={selected.length === 0}
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Step 2: Meeting Request</h2>
          <p>
            <b>Alice</b> requests a meeting on <b>Friday at 3pm</b>.
          </p>
          <p>
            <b>Agent Suggestion:</b> Can we do Friday at 10am instead? (You prefer mornings)
          </p>
          <button style={{ marginTop: 24 }} onClick={() => setStep(3)}>
            Next
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <h2>Step 3: Email Check</h2>
          <p>
            <b>From:</b> spammer@scam.com<br />
            <b>Subject:</b> Congratulations, you've won!
          </p>
          <p>
            <b>Agent Action:</b> This email is flagged as spam and moved to Junk.
          </p>
          <button style={{ marginTop: 24 }} onClick={() => setStep(4)}>
            Next
          </button>
        </>
      )}
      {step === 4 && (
        <>
          <h2>Step 4: Feedback</h2>
          <p>Was the meeting suggestion helpful?</p>
          <button style={{ marginRight: 16 }} onClick={() => { setFeedback(f => ({ ...f, meeting: true })); setStep(5); }}>👍 Yes</button>
          <button onClick={() => { setFeedback(f => ({ ...f, meeting: false })); setStep(5); }}>👎 No</button>
        </>
      )}
      {step === 5 && (
        <>
          <h2>Step 5: Feedback</h2>
          <p>Was the spam detection accurate?</p>
          <button style={{ marginRight: 16 }} onClick={() => { setFeedback(f => ({ ...f, spam: true })); setStep(6); }}>👍 Yes</button>
          <button onClick={() => { setFeedback(f => ({ ...f, spam: false })); setStep(6); }}>👎 No</button>
        </>
      )}
      {step === 6 && (
        <>
          <h2>Agent has learned!</h2>
          <p>
            neuronet is now more attuned to your needs.<br />
            <span style={{ color: "#8ef" }}>Thank you for your feedback.</span>
          </p>
          <button style={{ marginTop: 24 }} onClick={() => { setStep(1); setSelected([]); setFeedback({ meeting: null, spam: null }); }}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
}
