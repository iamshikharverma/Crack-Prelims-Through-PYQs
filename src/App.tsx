export default function App() {
  return (
    <div className="wrap">

      <div className="scene">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
        <div className="blob b5" />
      </div>

      <div className="noise" />

      <div className="center">
        <div className="card">

          <div className="sparkle s1" />
          <div className="sparkle s2" />
          <div className="sparkle s3" />
          <div className="sparkle s4" />

          <h1 className="main">
            This project is no longer actively maintained —
            due to rising costs &amp; time constraints.
          </h1>

          <p className="thanks">Thank you for being here.</p>

          <div className="divider"><div className="divider-gem" /></div>

          <p className="context">Saying goodbye with one of my favourite quotes</p>

          <div className="quote-wrap">
            <div className="quote-bar" />
            <div className="open-quote">"</div>
            <p className="quote">
              Kisi mahapurush ne kaha hai ki kamyab hone ke liye nahi, kabil hone
              ke liye padho. Success ke peeche mat bhago, excellence...
              excellence ka peecha karo, success jhak maar ke tumhare peeche aayegi.
            </p>
          </div>

          <p className="author">
            <span className="author-line" />
            <span className="author-name">Rancho, 3 Idiots</span>
            <span className="author-line" />
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          height: 100vh;
          height: 100dvh;
          background: #080a14;
          font-family: 'DM Sans', -apple-system, sans-serif;
          overflow: hidden;
        }

        .wrap {
          height: 100vh;
          height: 100dvh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .scene { position: fixed; inset: 0; z-index: 0; overflow: hidden; }
        .blob { position: absolute; border-radius: 50%; filter: blur(70px); mix-blend-mode: screen; }
        .b1 { width: 320px; height: 320px; background: #ff6ec7; top: -60px; left: -60px; opacity: 0.45; animation: drift1 14s ease-in-out infinite; }
        .b2 { width: 280px; height: 280px; background: #5b8cff; bottom: -50px; right: -50px; opacity: 0.5; animation: drift2 18s ease-in-out infinite; }
        .b3 { width: 220px; height: 220px; background: #00ffc3; top: 45%; left: 55%; opacity: 0.28; animation: drift3 22s ease-in-out infinite; }
        .b4 { width: 180px; height: 180px; background: #ffb347; bottom: 15%; left: -30px; opacity: 0.32; animation: drift4 16s ease-in-out infinite; }
        .b5 { width: 150px; height: 150px; background: #a855f7; top: 25%; right: 2%; opacity: 0.38; animation: drift1 20s ease-in-out infinite reverse; }

        @keyframes drift1 { 0%,100%{ transform: translate(0,0) scale(1); } 33%{ transform: translate(30px,-20px) scale(1.06); } 66%{ transform: translate(-15px,35px) scale(0.96); } }
        @keyframes drift2 { 0%,100%{ transform: translate(0,0) scale(1); } 33%{ transform: translate(-35px,20px) scale(1.08); } 66%{ transform: translate(20px,-30px) scale(0.93); } }
        @keyframes drift3 { 0%,100%{ transform: translate(0,0); } 50%{ transform: translate(-40px,30px); } }
        @keyframes drift4 { 0%,100%{ transform: translate(0,0) scale(1); } 50%{ transform: translate(20px,-35px) scale(1.1); } }

        .noise { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 180px 180px; }

        .center {
          position: relative; z-index: 2;
          width: 100%; height: 100vh; height: 100dvh;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }

        .card {
          background: rgba(10, 12, 30, 0.62);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-radius: 24px;
          padding: 32px 28px 26px;
          width: 100%; max-width: 480px;
          text-align: center;
          position: relative; overflow: hidden;
          animation: floatIn 1s cubic-bezier(0.22,1,0.36,1) forwards;
          opacity: 0;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        @keyframes floatIn { from { opacity: 0; transform: translateY(18px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .sparkle { position: absolute; border-radius: 50%; opacity: 0; pointer-events: none; animation: sparkleAnim 4s infinite ease-in-out; }
        .s1 { width: 3px; height: 3px; background: #ff9de2; top: 10%; left: 14%; animation-delay: 0s; }
        .s2 { width: 3px; height: 3px; background: #7eb3ff; top: 16%; right: 12%; animation-delay: 1.2s; }
        .s3 { width: 3px; height: 3px; background: #a0ffd8; bottom: 14%; left: 18%; animation-delay: 2.4s; }
        .s4 { width: 3px; height: 3px; background: #ffd580; bottom: 22%; right: 18%; animation-delay: 0.8s; }
        @keyframes sparkleAnim { 0%,100%{ opacity: 0; transform: scale(0); } 30%,70%{ opacity: 0.8; transform: scale(1); } 50%{ opacity: 1; transform: scale(1.4); } }

        .main {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(20px, 5.5vw, 26px);
          font-weight: 600; line-height: 1.35;
          margin-bottom: 14px; letter-spacing: -0.2px;
          background: linear-gradient(135deg, #ffffff 0%, #f9d1f5 40%, #b8d4ff 80%, #a5fff5 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: fadeSlide 0.9s 0.2s ease both;
        }

        .thanks {
          font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6;
          animation: fadeSlide 0.9s 0.3s ease both;
        }

        .divider { margin: 18px auto; display: flex; align-items: center; gap: 12px; animation: fadeSlide 0.9s 0.4s ease both; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); }
        .divider-gem { width: 5px; height: 5px; border: 1px solid rgba(255,255,255,0.28); transform: rotate(45deg); flex-shrink: 0; }

        .context {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.28); margin-bottom: 12px; font-weight: 500;
          animation: fadeSlide 0.9s 0.5s ease both;
        }

        .quote-wrap {
          position: relative; padding: 16px 18px 16px 22px;
          border-radius: 14px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          animation: fadeSlide 0.9s 0.6s ease both; overflow: hidden;
        }
        .quote-bar { position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 0; background: linear-gradient(180deg, #ff6ec7, #ffb347, #5b8cff); }
        .open-quote { font-family: 'Lora', serif; font-size: 60px; line-height: 1; position: absolute; top: -10px; left: 12px; background: linear-gradient(135deg, #ff6ec7, #ffb347); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; opacity: 0.4; pointer-events: none; }

        .quote {
          font-family: 'Lora', Georgia, serif; font-style: italic;
          font-size: clamp(12px, 3.2vw, 14px); line-height: 1.75;
          color: rgba(255,255,255,0.86); position: relative; text-align: left;
        }

        .author { margin-top: 14px; font-size: 11px; font-weight: 500; letter-spacing: 1px; animation: fadeSlide 0.9s 0.7s ease both; display: flex; align-items: center; justify-content: center; gap: 8px; color: #fff; }
        .author-line { display: inline-block; width: 20px; height: 1px; background: linear-gradient(90deg, #ff6ec7, #ffb347); }
        .author-name { background: linear-gradient(90deg, #ffb347, #ff6ec7); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 600; }

        @keyframes fadeSlide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-height: 640px) {
          .card { padding: 22px 20px 18px; }
          .main { margin-bottom: 10px; }
          .divider { margin: 12px auto; }
          .quote-wrap { padding: 12px 14px 12px 18px; }
          .author { margin-top: 10px; }
        }
      `}</style>
    </div>
  );
}