import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-indigo-100 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.1)] py-4 px-6 animate-in fade-in slide-in-from-bottom-full duration-500">
            <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-indigo-50 p-2 rounded-full flex-shrink-0">
                            <Cookie className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-sm md:text-base leading-relaxed">
                            Strona korzysta z plików cookies i pamięci przeglądarki w celu realizacji usług.
                            Korzystanie z witryny oznacza zgodę na ich zapis lub zmianę ustawień przeglądarki.
                        </p>
                    </div>
                    <button
                        onClick={handleAccept}
                        className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap"
                    >
                        Rozumiem
                    </button>
                </div>
            </div>
        </div>
    );
}
