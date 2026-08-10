import Link from "next/link";
import { lookingFor } from "@/lib/config";

export default function LookingFor() {
  return (
    <section id="looking-for" className="brutal-section">
      <div className="brutal-frame">
        <div className="brutal-header">
          <div className="brutal-num">/03</div>
          <div className="brutal-title">LOOKING FOR SOMEONE TO...</div>
          <div className="brutal-meta">JUMP TO THE RIGHT PROOF</div>
        </div>
        <div className="lookingfor-list">
          {lookingFor.map((intent) => (
            <Link className="lookingfor-row" href={intent.href} key={intent.label}>
              <span className="lookingfor-label">{intent.label}</span>
              <span className="lookingfor-body">{intent.body}</span>
              <span className="lookingfor-arrow">↗</span>
            </Link>
          ))}
        </div>
        <Link href="/#contact" className="method-proof method-roof" aria-label="Contact Peniel">
          <span className="method-proof-label">NEXT STEP</span>
          <strong>Looking for an engineer who can build, ship, and observe? Let&apos;s talk.</strong>
          <span className="method-cta">
            <span className="method-cta-text">contact me</span>
            <span className="method-cta-arrow" aria-hidden="true">↗</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
