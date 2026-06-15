import { jd } from "../jd.config";

export function PriceDisplay(prezzoModello, prezzoMotore = 0) {
    const totale = prezzoModello + prezzoMotore;
    return jd.div({ className: 'fixed bottom-0 left-0 w-full p-4 bg-primary text-white text-center font-bold text-xl' }, [
        `Prezzo Totale: ${totale.toLocaleString()} €`
    ]);
}