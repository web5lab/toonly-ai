import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#e9e2d6] min-h-screen text-[#3a2e23]">
      <header className="border-b sticky top-0 bg-[#a87b5d]/80 backdrop-blur-md z-10 playful-shadow">
        <div className="container flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img
              src="https://i.imgur.com/B7ptMnm.png"
              alt="ToonlyAI Logo"
              className="h-12 w-12 object-contain"
              onError={(e) => {
                console.error("Error loading logo:", e);
                e.currentTarget.style.display = 'none';
              }}
            />
            <h1 className="text-2xl font-bold text-white">ToonlyAI</h1>
          </div>
          {/* Optional: Add navigation back to home page */}
          <a href="/" className="text-white hover:underline">Home</a>
        </div>
      </header>

      <main className="container py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#6d4c30]">Privacy Policy</h1>

        <div className="bg-[#f4efe4]/80 backdrop-blur-sm p-8 rounded-lg playful-shadow playful-border space-y-6">
          <section>
            <p className="text-sm text-center text-[#8b5e3c] mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">1. Data We Collect</h2>
            <p>
              ToonlyAI does not collect or store any personal data beyond what's necessary for account management. All your image data is processed temporarily and stored locally on your device. Specifically, the app may temporarily process image data solely for the purpose of generating AI transformations. Image data is not stored or retained on our servers after the transformation process is complete.
            </p>
            <p className="mt-2">
              The images you upload and prompts you enter are deleted from our servers as soon as the image transformation is completed. If you do not download the transformed image, it will be lost when you exit the app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">2. Image Data Processing</h2>
            <p>
              We do not retain any image data. The images uploaded by users are temporarily processed to generate AI transformations and are deleted immediately after processing. The data is not stored, retained, or shared with any third-party for marketing or any other purposes.
            </p>
            <p className="mt-2">
              All image processing happens in real-time, and no copies of your original or transformed images are kept on our servers beyond the time necessary to complete the transformation and deliver the result to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">3. Third-Party Services</h2>
            <p>
              The app uses third-party AI processing services (such as xAI, OpenAI) to generate image transformations. These services may temporarily process the images you upload for the purpose of generating AI transformations. These services do not retain or store image data beyond the necessary time required for processing.
            </p>
            <p className="mt-2">
              We have agreements with these third-party services to ensure they follow the same data protection standards and do not use your data for any purpose other than providing the transformation service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">4. Data Security</h2>
            <p>
              We do not store or retain any personal image data on our servers. All personal data remains secure on your device. The transformation process uses encrypted connections and secure processing environments.
            </p>
            <p className="mt-2">
              If you choose not to download the generated transformation, the data will be automatically deleted from our temporary processing systems within minutes of completion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">5. No Sharing with Third Parties</h2>
            <p>
              We do not share, sell, or disclose any image data or personal information to third parties for marketing or any other purposes. Any data processed through third-party APIs is done solely for the purpose of generating transformations and is deleted once the process is completed.
            </p>
            <p className="mt-2">
              Your images are never used for training AI models, marketing purposes, or any other use beyond providing you with the transformation service you requested.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">6. Account Information</h2>
            <p>
              For users who create accounts, we only collect and store the minimum information necessary: email address for authentication and account management, and usage statistics for billing purposes (number of transformations used).
            </p>
            <p className="mt-2">
              Account data is stored securely and is never shared with third parties. You can delete your account at any time, which will permanently remove all associated data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">7. Your Privacy Rights</h2>
            <p>
              Since we do not retain image data, most traditional data rights (access, correction, deletion) are not applicable to the core transformation service. However, for account information, you have the right to access, correct, or delete your account data at any time.
            </p>
            <p className="mt-2">
              You can contact us with any privacy-related questions or concerns about our data handling practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">8. Updates to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date at the top of this policy. We will notify users of any significant changes through the app or via email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-[#8b5e3c]">9. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding this privacy policy, you can contact us at: <strong>bhyte.llc@gmail.com</strong>
            </p>
            <p className="mt-2">
              We are committed to protecting your privacy and will respond to all inquiries within 48 hours.
            </p>
          </section>
        </div>
      </main>

       <footer className="mt-16 pt-8 text-center text-sm text-[#5D4037] border-t border-[#a87b5d]/30">
        <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
          <Link to="/privacy-policy" className="hover:text-[#3a2e23] transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms-of-service" className="hover:text-[#3a2e23] transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link to="/legal" className="hover:text-[#3a2e23] transition-colors">Legal</Link>
        </div>
        
        <p className="text-[#5D4037]/80 mb-3">Built with ❤️ by Bhyte Labs</p>
        
        <div className="mb-4">
          <p className="text-[#5D4037]/70 text-xs">
            We also built: 
            <a href="https://usemidas.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100 ml-1">Midas</a> <span className="mx-3">•</span> 
            <a href="https://astrae.design" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">Astrae</a> <span className="mx-3">•</span> 
            <a href="https://usepapermind.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">Papermind AI</a> <span className="mx-3">•</span> 
            <a href="https://builtwithatlas.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">Atlas Labs</a> <span className="mx-3">•</span> 
            <a href="https://studioix.agency" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a2e23] transition-colors opacity-80 hover:opacity-100">Studio IX</a>
          </p>
        </div>
        <p className="mb-4">© {new Date().getFullYear()} ToonlyAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;