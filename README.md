# Website_Accessibility_Checker
A React-based accessibility auditing dashboard that analyzes HTML content, detects WCAG-related issues, and provides actionable recommendations to improve web accessibility.


## Features

### Accessibility Analysis

* Detects missing image alt attributes
* Identifies unlabeled form elements
* Finds empty buttons and links
* Checks heading hierarchy structure
* Detects duplicate IDs
* Validates page title presence
* Verifies language attributes
* Identifies missing ARIA labels
* Flags accessibility warnings and critical issues

### Accessibility Dashboard

* Overall Accessibility Score
* Critical Issues Summary
* Warning Count
* Passed Checks
* Issue Severity Breakdown
* Detailed Accessibility Reports

### Learning & Recommendations

* Explanation for every issue
* Why the issue matters
* Recommended solution
* Bad vs Correct code examples
* Accessibility best practices

### History Tracking

* Save previous scans
* View scan history
* Track accessibility improvements
* Clear or delete stored reports

### User Experience

* Responsive design
* Dark & Light themes
* Smooth animations
* Modern SaaS-style interface
* LocalStorage persistence

---

## Tech Stack

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* LocalStorage

---

## Project Structure

```bash
src/
├── components/
├── pages/
├── data/
├── utils/
├── App.jsx
├── main.jsx
```

---

## How It Works

1. User pastes HTML content.
2. The rule engine scans the content.
3. Accessibility issues are identified.
4. An accessibility score is generated.
5. Results are displayed in a visual dashboard.
6. Educational recommendations are provided.
7. Scan history is saved locally.

---

## Accessibility Checks Included

* Missing alt attributes
* Missing labels
* Empty buttons
* Empty links
* Missing ARIA attributes
* Invalid heading structure
* Missing document title
* Missing language declaration
* Duplicate IDs
* Accessibility best practice warnings

---

## Purpose

This project was created to demonstrate frontend development skills while promoting accessible web design practices. It combines UI development, state management, rule-based analysis, responsive design, and accessibility awareness into a practical developer tool.

---

## Future Enhancements

* WCAG compliance reporting
* Lighthouse-style scoring system
* PDF report export
* Advanced contrast analysis
* URL-based scanning
* Accessibility improvement tracking
* Team collaboration features

---

## Author

Developed as a frontend portfolio project to showcase React, JavaScript, accessibility auditing, dashboard design, and modern UI/UX development skills.

