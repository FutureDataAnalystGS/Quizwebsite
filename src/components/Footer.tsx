import { Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-row items-center justify-center gap-4 border-t border-gray-200 pt-6">
                    <p className="text-gray-600 font-medium whitespace-nowrap">
                        © 2026 Gabriela Strojna
                    </p>
                    <a
                        href="mailto:strojna.ga@gmail.com"
                        className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center"
                        title="Email"
                    >
                        <Mail className="w-5 h-5 text-indigo-400" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/gabriela-strojna-312852222/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center"
                        title="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5 text-indigo-400" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
