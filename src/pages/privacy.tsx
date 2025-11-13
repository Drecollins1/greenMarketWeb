// pages/privacy.tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const PrivacyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Greenmarket.com.ng</title>
        <meta name="description" content="Privacy Policy for Greenmarket.com.ng" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.
            </p>
          </header>

          <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who we are</h2>
              <p className="text-sm text-gray-700">
                Our website address is: <a href="https://greenmarket.com.ng" className="text-blue-600 hover:underline">https://greenmarket.com.ng</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What personal data we collect and why we collect it</h2>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comments</h3>
                <p className="text-sm text-gray-700 mb-2">
                  When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here:{' '}
                  <a href="https://automattic.com/privacy/" className="text-blue-600 hover:underline">https://automattic.com/privacy/</a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Media</h3>
                <p className="text-sm text-gray-700">
                  If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact forms</h3>
                <p className="text-sm text-gray-700">
                  {/* Placeholder for contact forms content if needed */}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cookies</h3>
                <p className="text-sm text-gray-700 mb-2">
                  If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  If you have an account and you log in to this site, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
                </p>
                <p className="text-sm text-gray-700">
                  If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Embedded content from other websites</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                </p>
                <p className="text-sm text-gray-700">
                  These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-700">
                  {/* Placeholder for analytics content if needed */}
                </p>
              </section>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who we share your data with</h2>
              <p className="text-sm text-gray-700">
                {/* Content for data sharing if provided */}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How long we retain your data</h2>
              <p className="text-sm text-gray-700 mb-2">
                If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
              </p>
              <p className="text-sm text-gray-700 mb-2">
                For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What rights you have over your data</h2>
              <p className="text-sm text-gray-700">
                If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Where we send your data</h2>
              <p className="text-sm text-gray-700">
                Visitor comments may be checked through an automated spam detection service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your contact information</h2>
              <p className="text-sm text-gray-700">
                {/* Content for contact information if needed */}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional information</h2>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How we protect your data</h3>
                <p className="text-sm text-gray-700">
                  {/* Content for data protection if needed */}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What data breach procedures we have in place</h3>
                <p className="text-sm text-gray-700">
                  {/* Content for data breach procedures if needed */}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What third parties we receive data from</h3>
                <p className="text-sm text-gray-700">
                  {/* Content for third parties if needed */}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">What automated decision making and/or profiling we do with user data</h3>
                <p className="text-sm text-gray-700">
                  {/* Content for automated decisions if needed */}
                </p>
              </section>

              <section className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry regulatory disclosure requirements</h3>
                <p className="text-sm text-gray-700">
                  {/* Content for regulatory disclosures if needed */}
                </p>
              </section>
            </section>

            <footer className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: November 07, 2025
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;