// The studio inbox (Google Workspace). Every contact path on the site uses this.
export const studioEmail = "yojan@endlls.com";

// FormSubmit relays form posts to the inbox; no account, the first post sends an activation email.
export const inquiryEndpoint = `https://formsubmit.co/ajax/${studioEmail}`;
