import { createContext, useContext, useMemo, useState } from 'react';

const SepetContext = createContext(null);

export function SepetProvider({ children }) {
  const [sepet, setSepet] = useState([]);

  function sepeteEkle(urun) {
    setSepet((mevcut) => {
      const bulunan = mevcut.find((item) => item.id === urun.id);
      if (bulunan) {
        return mevcut.map((item) =>
          item.id === urun.id ? { ...item, adet: item.adet + 1 } : item
        );
      }
      return [...mevcut, { ...urun, adet: 1 }];
    });
  }

  function miktarDegistir(id, fark) {
    setSepet((mevcut) =>
      mevcut
        .map((item) => (item.id === id ? { ...item, adet: item.adet + fark } : item))
        .filter((item) => item.adet > 0)
    );
  }

  function sepettenSil(id) {
    setSepet((mevcut) => mevcut.filter((item) => item.id !== id));
  }

  const toplamAdet = useMemo(
    () => sepet.reduce((toplam, item) => toplam + item.adet, 0),
    [sepet]
  );
  const toplamTutar = useMemo(
    () => sepet.reduce((toplam, item) => toplam + item.price * item.adet, 0),
    [sepet]
  );

  return (
    <SepetContext.Provider
      value={{ sepet, sepeteEkle, miktarDegistir, sepettenSil, toplamAdet, toplamTutar }}
    >
      {children}
    </SepetContext.Provider>
  );
}

export function useSepet() {
  const context = useContext(SepetContext);
  if (!context) {
    throw new Error('useSepet, SepetProvider içinde kullanılmalıdır.');
  }
  return context;
}
