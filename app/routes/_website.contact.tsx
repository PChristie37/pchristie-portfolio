import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Resend } from "resend";
import { ContactForm, validateContactForm } from "./validate";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let values = Object.fromEntries(formData);
  let formValues = { data: values } as ContactForm;
  let errors = await validateContactForm(formValues);
  if (errors) {
    return json({ ok: false, errors }, 400);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["peter.christie.dev@gmail.com"],
    subject: `New Contact Form Submission ${values.firstName} ${values.lastName} - (Pschristie.com)`,
    html: `${values.firstName} ${values.lastName} has submitted a new contact form submission. <br> Here are the details: <br> Budget: ${values.budget} <br> Website: ${values.website} <br> Email ${values.email} <br> Message: ${values.message}`
  });

  if (error) {
    return json({ error, errors }, 400);
  }

  return json({ success: true, errors: null });
}

export default function ContactPage() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  return (
    <div className="transition-colors duration-1000 relative isolate dark:bg-black bg-white px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg
          x="50%"
          y={-64}
          className="overflow-visible dark:fill-gray-500 fill-gray-50"
        >
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      {actionData && (actionData as Record<string, unknown>).success ? (
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <h2 className="text-4xl font-bold tracking-tight dark:text-gray-200 text-gray-900">
            Thanks for reaching out!
          </h2>
          <p className="mt-2 text-lg leading-8 dark:text-gray-400 text-gray-600">
            I will respond to your email as soon as possible.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <h2 className="text-4xl font-bold tracking-tight dark:text-gray-200 text-gray-900">
            Let’s talk about your project
          </h2>
          <p className="mt-2 text-lg leading-8 dark:text-gray-400 text-gray-600">
            I help companies and individuals build out their websites to connect
            with their audiences.
          </p>
          <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
            {/* <form action="#" method="POST" className="lg:flex-auto"> */}
            <Form method="post" className="lg:flex-auto">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  >
                    First name{" "}
                    {actionData?.errors?.firstName && (
                      <span
                        id="firstName-error"
                        className="text-red-500 text-xs"
                      >
                        {actionData.errors.firstName}
                      </span>
                    )}
                  </label>

                  <div className="mt-2.5">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      className={`block w-full dark:bg-gray-700 rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ${actionData?.errors?.firstName ? `dark:ring-red-500 ring-red-500` : `dark:ring-indigo-500 ring-gray-300`} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  >
                    Last name{" "}
                    {actionData?.errors?.lastName && (
                      <span
                        id="lastName-error"
                        className="text-red-500 text-xs"
                      >
                        {actionData.errors.lastName}
                      </span>
                    )}
                  </label>

                  <div className="mt-2.5">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      className={`block w-full dark:bg-gray-700 rounded-md border-0 px-3.5 py-2  dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ${actionData?.errors?.lastName ? `dark:ring-red-500 ring-red-500` : `dark:ring-indigo-500 ring-gray-300`} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  >
                    Budget{" "}
                    {actionData?.errors?.budget && (
                      <span id="budget-error" className="text-red-500 text-xs">
                        {actionData.errors.budget}
                      </span>
                    )}
                  </label>

                  <div className="mt-2.5">
                    <input
                      id="budget"
                      name="budget"
                      type="text"
                      className={`block w-full dark:bg-gray-700 rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ${actionData?.errors?.budget ? `dark:ring-red-500 ring-red-500` : `dark:ring-indigo-500 ring-gray-300`} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  >
                    Website{" "}
                    {actionData?.errors?.website && (
                      <span id="website-error" className="text-red-500 text-xs">
                        {actionData.errors.website}
                      </span>
                    )}
                  </label>

                  <div className="mt-2.5">
                    <input
                      id="website"
                      name="website"
                      type="text"
                      className={`block w-full dark:bg-gray-700 rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ${actionData?.errors?.website ? `dark:ring-red-500 ring-red-500` : `dark:ring-indigo-500 ring-gray-300`} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  >
                    Message{" "}
                    {actionData?.errors?.message && (
                      <span id="message-error" className="text-red-500 text-xs">
                        {actionData.errors.message}
                      </span>
                    )}
                  </label>

                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`block w-full dark:bg-gray-700 rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset ${actionData?.errors?.message ? `dark:ring-red-500 ring-red-500` : `dark:ring-indigo-500 ring-gray-300`} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
                  >
                    Email{" "}
                    {actionData?.errors?.email && (
                      <span id="email-error" className="text-red-500 text-xs">
                        {actionData.errors.email}
                      </span>
                    )}
                  </label>

                  <div className="mt-2.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`block w-full dark:bg-gray-700 rounded-md border-0 px-3.5 py-2 dark:text-gray-200 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${actionData?.errors?.email ? `dark:ring-red-500 ring-red-500` : `dark:ring-indigo-500 ring-gray-300`} focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={navigation.state === "submitting"}
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Let’s talk
                </button>
              </div>
            </Form>
            <div className="lg:mt-6 lg:w-80 lg:flex-none">
              {/* <img
              alt=""
              src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg"
              className="h-12 w-auto"
            /> */}
              <figure className="mt-10">
                <blockquote className="text-lg font-semibold leading-8 dark:text-gray-200 text-gray-900">
                  <p>
                    Understanding your goals, requirements, and expectations is
                    crucial for us to provide the best possible solutions.
                    Please provide details such as the nature of your business,
                    target audience, desired features, and any specific design
                    preferences. Let us know about your timeline and budget
                    constraints.
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex gap-x-6">
                  <img
                    alt=""
                    src="https://media.licdn.com/dms/image/C5103AQHKMkV-njvIDQ/profile-displayphoto-shrink_800_800/0/1517487982122?e=1727913600&v=beta&t=J6Hz9ii5f_9weHoG6dP6kXBnHMz2r4LKb5H7hCICrZQ"
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div>
                    <div className="text-base font-semibold dark:text-gray-200 text-gray-900">
                      Peter Christie
                    </div>
                    <div className="text-sm leading-6 text-gray-600">
                      CEO of his desk
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
