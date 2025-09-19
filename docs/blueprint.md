# **App Name**: UUID Hunter

## Core Features:

- UUID Input Form: A simple form with a single input field for users to enter a UUID.
- Submission Handling: Handle form submissions and compare the input UUID with the pre-configured target UUID.
- Brute Force Detection: Implement a rate-limiting mechanism to detect and mitigate brute force attempts.
- Guess Validation Tool: An LLM analyzes each submitted UUID against known patterns or entropy levels typical of UUIDs to prevent obvious non-UUID submissions. This tool filters invalid submissions before comparison with the target.
- Success/Failure Indicator: Display a clear message indicating whether the submitted UUID matches the target UUID.

## Style Guidelines:

- Primary color: Dark blue (#3F51B5) to convey a sense of seriousness and security.
- Background color: Light gray (#F5F5F5) to provide a clean and neutral backdrop.
- Accent color: Orange (#FF9800) to highlight important elements and call-to-action buttons.
- Body and headline font: 'Inter' sans-serif for a modern, machined feel that maintains legibility.
- Simple, single-column layout with a prominent input field. Center-align the content for better focus.
- Subtle animations when displaying the success/failure message.