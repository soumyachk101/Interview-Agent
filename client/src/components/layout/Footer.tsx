export const Footer = () => {
    return (
        <footer className="bg-mahogany-900 bg-leather mt-auto border-t border-mahogany-700">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center space-x-6 md:order-2 text-mahogany-200 text-sm">
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Support</span>
                </div>
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-xs leading-5 text-mahogany-400">
                        &copy; 2026 Interview Agent, Inc. All rights reserved. Crafted with precision for career growth.
                    </p>
                </div>
            </div>
        </footer>
    );
};
