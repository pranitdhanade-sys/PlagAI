# Security Policy

## Supported Versions

The following versions of PlagAI are currently supported with security updates.

| Version | Supported |
| -------- | --------- |
| Latest (main) | ✅ |
| Older releases | ❌ |

---

# Reporting a Vulnerability

If you discover a security vulnerability in PlagAI, please report it responsibly.

## How to Report

Please include the following information in your report:

- A clear description of the vulnerability.
- Steps required to reproduce the issue.
- The potential impact.
- Any suggested mitigation or fix (if available).
- Screenshots or proof-of-concept code (if applicable).

---

## What to Expect

After receiving your report, we will:

1. Acknowledge receipt within **3 business days**.
2. Investigate and validate the reported issue.
3. Develop and test a fix if the vulnerability is confirmed.
4. Release a patch as soon as possible.
5. Credit the reporter (if they wish) in the release notes.

---

## Responsible Disclosure

Please:

- Do not publicly disclose vulnerabilities before they have been addressed.
- Do not exploit vulnerabilities beyond what is necessary to demonstrate the issue.
- Do not access, modify, or delete data that does not belong to you.
- Respect the privacy and security of other users.

---

## Security Best Practices

When deploying PlagAI:

- Keep dependencies up to date.
- Use HTTPS in production.
- Store secrets using environment variables.
- Rotate API keys regularly.
- Enable authentication for administrative endpoints.
- Restrict database access to trusted hosts.
- Keep Docker images updated.
- Regularly back up important data.

---

## Scope

This policy covers:

- Frontend
- Backend APIs
- Authentication
- Database
- Docker deployment
- CI/CD configuration
- AI plagiarism detection services

---

## Contact

For security-related concerns, please open a **private security report** through GitHub Security Advisories or contact the project maintainers directly.

Thank you for helping keep PlagAI secure.


