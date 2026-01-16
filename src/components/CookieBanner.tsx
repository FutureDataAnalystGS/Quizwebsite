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
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-xl shadow-2xl border border-indigo-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-indigo-100 p-3 rounded-full flex-shrink-0">
                            <Cookie className="w-6 h-6 text-indigo-600" />
                        </div>
                        <p className="text-sm md:text-base leading-relaxed">
                            Strona korzysta z plików cookies i pamięci przeglądarki w celu realizacji usług.
                            Korzystanie z witryny oznacza zgodę na ich zapis lub zmianę ustawień przeglądarki.
                        </p>
                    </div>
                    <button
                        onClick={handleAccept}
                        className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 whitespace-nowrap"
                    >
                        Rozumiem
                    </button>
                </div>
            </div>
        </div>
    );
}
