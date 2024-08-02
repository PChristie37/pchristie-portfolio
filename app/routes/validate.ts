export type ContactForm = {
  data: {
    email: string;
    message: string;
    firstName: string;
    lastName: string;
    budget: string;
    website: string;
  };
};
export function validateContactForm({ data }: ContactForm) {
  let errors: {
    email?: string;
    firstName?: string;
    message?: string;
    lastName?: string;
    budget?: string;
    website?: string;
  } = {};

  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!data.email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message) {
    errors.message = "Message is required.";
  } else if (data.message.length < 6) {
    errors.message = "Message must be at least 6 characters.";
  }
  if (!data.firstName) {
    errors.firstName = "First name is required.";
  }
  if (!data.lastName) {
    errors.lastName = "Last name is required.";
  }
  if (!data.budget) {
    errors.budget = "Budget is required.";
  }
  if (!data.website) {
    errors.website = "Website is required.";
  } else if (!isValidUrl(data.website)) {
    errors.website = "Please enter a valid website URL.";
  }

  return Object.keys(errors).length ? errors : null;
}

function isValidUrl(url: string): boolean {
  // Regular expression to validate URL format
  const urlRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  return urlRegex.test(url);
}
