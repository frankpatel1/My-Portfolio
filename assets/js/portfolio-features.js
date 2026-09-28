/**
 * Frank Patel Portfolio - Production Features
 * Includes:
 * 1. HTTPS Enforcement
 * 2. GDPR/ePrivacy Cookie Consent Banner & Preferences
 * 3. Privacy-Friendly Analytics & Event Tracking (GA4 Ready)
 * 4. Advanced Form Validation & Multi-Layer Anti-Spam Protection
 * 5. Outbound & Conversion Tracking
 */

(function () {
  "use strict";

  // ==========================================
  // 1. Enforce HTTPS in Production
  // ==========================================
  if (
    typeof window !== "undefined" &&
    location.protocol === "http:" &&
    location.hostname !== "localhost" &&
    location.hostname !== "127.0.0.1" &&
    location.hostname !== ""
  ) {
    location.replace(
      "https://" + location.host + location.pathname + location.search + location.hash
    );
  }

  // ==========================================
  // 2. Analytics Configuration & Helpers
  // ==========================================
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your live Google Analytics 4 ID

  window.trackPortfolioEvent = function (action, category, label, value) {
    try {
      const consent = getStoredConsent();
      if (!consent || consent.analytics !== true) {
        return; // Respect user consent
      }
      if (navigator.doNotTrack === "1" || window.doNotTrack === "1") {
        return; // Respect Do-Not-Track
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", action, {
          event_category: category || "engagement",
          event_label: label || "",
          value: value || 1,
        });
      }
    } catch (e) {
      // Fail silently to avoid interrupting UX
    }
  };

  function initAnalytics() {
    if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
      // Stub ready for user's real GA4 tag
      return;
    }
    if (document.getElementById("ga4-script")) return;

    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  }

  // ==========================================
  // 3. Cookie Consent Banner & Storage
  // ==========================================
  const CONSENT_STORAGE_KEY = "frankpatel_cookie_consent_v1";

  function getStoredConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setStoredConsent(consentData) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {}
  }

  function applyConsent(consent) {
    if (consent && consent.analytics === true) {
      initAnalytics();
    }
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", { detail: consent })
    );
  }

  function renderCookieBanner() {
    if (document.getElementById("cookie-consent-banner")) return;

    const banner = document.createElement("aside");
    banner.id = "cookie-consent-banner";
    banner.className = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie Consent Preferences");

    banner.innerHTML = `
      <div class="cookie-consent-inner">
        <div class="cookie-consent-content">
          <div class="cookie-consent-badge">
            <span class="cookie-dot"></span>
            <span>COOKIE CONSENT</span>
          </div>
          <p class="cookie-consent-text">
            We use essential cookies for basic navigation and anonymous analytics to improve your portfolio experience. Review our <a href="privacy-policy.html" class="cookie-policy-link">Privacy Policy</a> to learn more.
          </p>
        </div>
        <div class="cookie-consent-actions">
          <button type="button" id="cookie-accept-all" class="cookie-btn cookie-btn-primary">
            Accept All
          </button>
          <button type="button" id="cookie-decline" class="cookie-btn cookie-btn-outline">
            Decline
          </button>
          <button type="button" id="cookie-settings-btn" class="cookie-btn cookie-btn-outline">
            Settings
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Trigger smooth enter animation
    requestAnimationFrame(() => {
      banner.classList.add("is-visible");
    });

    document
      .getElementById("cookie-accept-all")
      ?.addEventListener("click", () => {
        const consent = {
          essential: true,
          analytics: true,
          timestamp: new Date().toISOString(),
        };
        setStoredConsent(consent);
        applyConsent(consent);
        dismissCookieBanner();
      });

    document
      .getElementById("cookie-decline")
      ?.addEventListener("click", () => {
        const consent = {
          essential: true,
          analytics: false,
          timestamp: new Date().toISOString(),
        };
        setStoredConsent(consent);
        applyConsent(consent);
        dismissCookieBanner();
      });

    document
      .getElementById("cookie-settings-btn")
      ?.addEventListener("click", () => {
        dismissCookieBanner();
        openCookiePreferencesModal();
      });
  }

  function dismissCookieBanner() {
    const banner = document.getElementById("cookie-consent-banner");
    if (!banner) return;
    banner.classList.remove("is-visible");
    banner.classList.add("is-hiding");
    setTimeout(() => {
      banner.remove();
    }, 350);
  }

  function openCookiePreferencesModal() {
    const existingModal = document.getElementById("cookie-preferences-modal");
    if (existingModal) {
      existingModal.classList.add("is-open");
      return;
    }

    const currentConsent = getStoredConsent() || { essential: true, analytics: false };

    const modal = document.createElement("div");
    modal.id = "cookie-preferences-modal";
    modal.className = "cookie-modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "cookie-modal-title");

    modal.innerHTML = `
      <div class="cookie-modal-container">
        <div class="cookie-modal-header">
          <div>
            <span class="cookie-eyebrow-pill">COOKIE SETTINGS</span>
            <h2 id="cookie-modal-title" class="cookie-modal-title">Privacy &amp; Cookie Preferences</h2>
          </div>
          <button type="button" id="cookie-modal-close" class="cookie-modal-close-btn" aria-label="Close preferences modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <p class="cookie-modal-intro">
          Customize which cookies and local storage tokens you allow while browsing. Necessary cookies are required for basic security and persistent preferences.
        </p>

        <div class="cookie-preference-list">
          <!-- Necessary Cookies -->
          <div class="cookie-pref-item">
            <div class="cookie-pref-info">
              <div class="cookie-pref-title-row">
                <span class="cookie-pref-name">Strictly Necessary</span>
                <span class="cookie-status-badge">Always Active</span>
              </div>
              <p class="cookie-pref-desc">
                Vital for site navigation, security features, session integrity, and local storage state memory. Cannot be disabled.
              </p>
            </div>
            <div class="cookie-toggle-wrap">
              <label class="cookie-switch">
                <input type="checkbox" checked disabled aria-label="Strictly necessary cookies (always active)" />
                <span class="cookie-slider is-disabled"></span>
              </label>
            </div>
          </div>

          <!-- Analytics & Performance Cookies -->
          <div class="cookie-pref-item">
            <div class="cookie-pref-info">
              <div class="cookie-pref-title-row">
                <span class="cookie-pref-name">Performance &amp; Telemetry</span>
                <span class="cookie-optional-badge">Optional</span>
              </div>
              <p class="cookie-pref-desc">
                Collects non-identifying telemetry (pages viewed, referrer sources, browser engine) to help assess technical portfolio engagement.
              </p>
            </div>
            <div class="cookie-toggle-wrap">
              <label class="cookie-switch" for="analytics-toggle">
                <input type="checkbox" id="analytics-toggle" ${currentConsent.analytics ? "checked" : ""} aria-label="Enable performance and telemetry cookies" />
                <span class="cookie-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div class="cookie-modal-footer">
          <button type="button" id="cookie-pref-save" class="cookie-btn cookie-btn-primary">
            Save Preferences
          </button>
          <button type="button" id="cookie-pref-accept-all" class="cookie-btn cookie-btn-outline">
            Accept All
          </button>
          <button type="button" id="cookie-pref-reject-all" class="cookie-btn cookie-btn-outline">
            Decline Non-Essential
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.classList.add("is-open");
    });

    const closeModal = () => {
      modal.classList.remove("is-open");
      setTimeout(() => {
        modal.remove();
      }, 300);
    };

    document.getElementById("cookie-modal-close")?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.getElementById("cookie-pref-save")?.addEventListener("click", () => {
      const analyticsChecked = document.getElementById("analytics-toggle")?.checked || false;
      const consent = {
        essential: true,
        analytics: analyticsChecked,
        timestamp: new Date().toISOString(),
      };
      setStoredConsent(consent);
      applyConsent(consent);
      closeModal();
    });

    document.getElementById("cookie-pref-accept-all")?.addEventListener("click", () => {
      const consent = {
        essential: true,
        analytics: true,
        timestamp: new Date().toISOString(),
      };
      setStoredConsent(consent);
      applyConsent(consent);
      closeModal();
    });

    document.getElementById("cookie-pref-reject-all")?.addEventListener("click", () => {
      const consent = {
        essential: true,
        analytics: false,
        timestamp: new Date().toISOString(),
      };
      setStoredConsent(consent);
      applyConsent(consent);
      closeModal();
    });
  }

  window.openCookiePreferences = function () {
    openCookiePreferencesModal();
  };

  // ==========================================
  // 4. Form Validation & Anti-Spam Protection
  // ==========================================
  let formInitTimestamp = Date.now();

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    // Reset timestamp on user focus
    form.addEventListener(
      "focusin",
      () => {
        if (!form.dataset.interacted) {
          form.dataset.interacted = "true";
          formInitTimestamp = Date.now();
        }
      },
      { once: true }
    );

    // Ensure Honeypot anti-spam field exists
    if (!form.querySelector('input[name="_gotcha"]')) {
      const hp = document.createElement("input");
      hp.type = "text";
      hp.name = "_gotcha";
      hp.tabIndex = -1;
      hp.autocomplete = "off";
      hp.className = "visually-hidden-hp";
      hp.style.cssText = "position:absolute!important;opacity:0!important;pointer-events:none!important;left:-9999px!important;top:0!important;height:0!important;width:0!important;";
      hp.setAttribute("aria-hidden", "true");
      form.prepend(hp);
    }

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const statusBox = document.getElementById("contact-status");
    const submitBtn = document.getElementById("contact-submit-btn");

    function validateField(input, testFn, errorElementId, message) {
      const errorEl = document.getElementById(errorElementId);
      const isValid = testFn(input.value.trim());

      if (!isValid) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        input.setAttribute("aria-invalid", "true");
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.style.display = "block";
        }
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        input.setAttribute("aria-invalid", "false");
        if (errorEl) {
          errorEl.style.display = "none";
        }
      }
      return isValid;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (nameInput) {
      nameInput.addEventListener("blur", () => {
        validateField(
          nameInput,
          (val) => val.length >= 2,
          "name-error",
          "Please enter your full name (minimum 2 characters)."
        );
      });
      nameInput.addEventListener("input", () => {
        if (nameInput.classList.contains("is-invalid")) {
          validateField(nameInput, (val) => val.length >= 2, "name-error", "");
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener("blur", () => {
        validateField(
          emailInput,
          (val) => emailRegex.test(val),
          "email-error",
          "Please enter a valid email address (e.g. name@domain.com)."
        );
      });
      emailInput.addEventListener("input", () => {
        if (emailInput.classList.contains("is-invalid")) {
          validateField(emailInput, (val) => emailRegex.test(val), "email-error", "");
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener("blur", () => {
        validateField(
          messageInput,
          (val) => val.length >= 10,
          "message-error",
          "Please enter a detailed message (minimum 10 characters)."
        );
      });
      messageInput.addEventListener("input", () => {
        if (messageInput.classList.contains("is-invalid")) {
          validateField(messageInput, (val) => val.length >= 10, "message-error", "");
        }
      });
    }

    // Submission handler
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // 1. Anti-Spam: Check Honeypot
      const hpField = form.querySelector('input[name="_gotcha"]');
      if (hpField && hpField.value.trim() !== "") {
        console.warn("Spam submission blocked via honeypot.");
        return;
      }

      // 2. Anti-Spam: Check submission time (minimum 2 seconds required)
      const elapsedSeconds = (Date.now() - formInitTimestamp) / 1000;
      if (elapsedSeconds < 2) {
        if (statusBox) {
          statusBox.className = "contact-status-box status-error";
          statusBox.textContent = "Submission was too fast. Please verify your message before sending.";
          statusBox.style.display = "block";
        }
        return;
      }

      // 3. Anti-Spam: Rate limiting (cooldown of 60 seconds per client)
      const lastSubmitTime = localStorage.getItem("fp_last_contact_submit");
      if (lastSubmitTime) {
        const timeSinceLast = (Date.now() - parseInt(lastSubmitTime, 10)) / 1000;
        if (timeSinceLast < 60) {
          const waitTime = Math.ceil(60 - timeSinceLast);
          if (statusBox) {
            statusBox.className = "contact-status-box status-warning";
            statusBox.textContent = `Please wait ${waitTime} seconds before sending another message.`;
            statusBox.style.display = "block";
          }
          return;
        }
      }

      // 4. Validate All Fields
      const isNameValid = validateField(
        nameInput,
        (val) => val.length >= 2,
        "name-error",
        "Please enter your full name (minimum 2 characters)."
      );
      const isEmailValid = validateField(
        emailInput,
        (val) => emailRegex.test(val),
        "email-error",
        "Please enter a valid email address."
      );
      const isMessageValid = validateField(
        messageInput,
        (val) => val.length >= 10,
        "message-error",
        "Please enter a message of at least 10 characters."
      );

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        if (statusBox) {
          statusBox.className = "contact-status-box status-error";
          statusBox.textContent = "Please resolve the highlighted errors before submitting.";
          statusBox.style.display = "block";
        }
        return;
      }

      // 5. Send message via Formspree API
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span> <i class="ph ph-spinner tw-animate-spin"></i>`;

      if (statusBox) {
        statusBox.style.display = "none";
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          localStorage.setItem("fp_last_contact_submit", Date.now().toString());

          // Track form submission conversion
          window.trackPortfolioEvent("submit_form", "lead_generation", "contact_form");

          form.reset();
          if (nameInput) nameInput.classList.remove("is-valid");
          if (emailInput) emailInput.classList.remove("is-valid");
          if (messageInput) messageInput.classList.remove("is-valid");

          submitBtn.innerHTML = `<span>Message Sent Successfully!</span> <i class="ph ph-check-circle"></i>`;
          submitBtn.style.backgroundColor = "#22c55e";

          if (statusBox) {
            statusBox.className = "contact-status-box status-success";
            statusBox.textContent = "Thank you! Your message has been delivered. Frank will respond within 24 hours.";
            statusBox.style.display = "block";
          }

          setTimeout(() => {
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.style.backgroundColor = "";
            submitBtn.disabled = false;
          }, 4500);
        } else {
          throw new Error("Formspree server response error");
        }
      } catch (err) {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.disabled = false;

        if (statusBox) {
          statusBox.className = "contact-status-box status-error";
          statusBox.innerHTML = `Unable to send message directly. Please email Frank directly at <a href="mailto:frankpatel33@gmail.com" class="text-underline">frankpatel33@gmail.com</a>.`;
          statusBox.style.display = "block";
        }
      }
    });
  }

  // ==========================================
  // 5. Conversion & Outbound Event Tracking
  // ==========================================
  function setupConversionTracking() {
    // Resume download tracking
    document.querySelectorAll('a[href*="Resume.pdf"]').forEach((link) => {
      link.addEventListener("click", () => {
        window.trackPortfolioEvent("download_resume", "conversion", "Frank_Patel_Resume.pdf");
      });
    });

    // Primary CTA clicks
    document.querySelectorAll('a[href="#contact"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        window.trackPortfolioEvent("click_cta", "conversion", "get_in_touch");
      });
    });

    document.querySelectorAll('a[href="#portfolio"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        window.trackPortfolioEvent("click_cta", "navigation", "view_projects");
      });
    });

    // GitHub outbound project links
    document.querySelectorAll('a[href*="github.com/frankpatel1"]').forEach((link) => {
      link.addEventListener("click", () => {
        window.trackPortfolioEvent("outbound_click", "github_repo", link.href);
      });
    });
  }

  // ==========================================
  // Initialization on DOMContentLoaded
  // ==========================================
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Check existing consent or prompt
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      applyConsent(storedConsent);
    } else {
      // Delay slightly for smooth page entry
      setTimeout(renderCookieBanner, 1200);
    }

    // 2. Setup form validation
    initContactForm();

    // 3. Setup conversion tracking
    setupConversionTracking();
  });
})();
