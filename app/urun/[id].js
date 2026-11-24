import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSepet } from '../../context/SepetContext';

export default function UrunDetay() {
  const { id } = useLocalSearchParams();
  const { sepeteEkle } = useSepet();
  const [urun, setUrun] = useState(null);
  const [hata, setHata] = useState('');

  useEffect(() => {
    let aktif = true;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Ürün bulunamadı.');
        return response.json();
      })
      .then((data) => aktif && setUrun(data))
      .catch((error) => aktif && setHata(error.message));
    return () => { aktif = false; };
  }, [id]);

  if (!urun && !hata) return <View style={styles.center}><ActivityIndicator size="large" color="#f7931a" /></View>;
  if (hata) return <View style={styles.center}><Text style={styles.error}>{hata}</Text><Pressable onPress={() => router.back()}><Text style={styles.backText}>Geri dön</Text></Pressable></View>;

  const indirimliFiyat = urun.price * (1 - urun.discountPercentage / 100);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={24} color="#171717" /></Pressable>
        <Image source={{ uri: urun.thumbnail }} style={styles.image} resizeMode="contain" />
        <Text style={styles.category}>{urun.category}</Text>
        <Text style={styles.title}>{urun.title}</Text>
        <View style={styles.rating}><Ionicons name="star" size={17} color="#f59e0b" /><Text style={styles.ratingText}>{urun.rating.toFixed(1)} / 5</Text><Text style={styles.stock}>{urun.stock} stokta</Text></View>
        <Text style={styles.description}>{urun.description}</Text>
        <View style={styles.priceBox}>
          <View><Text style={styles.oldPrice}>${urun.price.toFixed(2)}</Text><Text style={styles.price}>${indirimliFiyat.toFixed(2)}</Text></View>
          <Text style={styles.discount}>%{urun.discountPercentage.toFixed(0)} indirim</Text>
        </View>
        <Pressable onPress={() => sepeteEkle(urun)} style={styles.add}><Ionicons name="cart-outline" size={21} color="#fff" /><Text style={styles.addText}>Sepete ekle</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff8ee' },
  content: { padding: 20, paddingBottom: 35 },
  back: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#fff', borderWidth: 1, borderColor: '#fbe7c8', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  image: { width: '100%', height: 280, backgroundColor: '#fff', borderRadius: 22 },
  category: { color: '#f7931a', fontSize: 12, fontWeight: '900', textTransform: 'uppercase', marginTop: 20 },
  title: { color: '#171717', fontSize: 29, fontWeight: '900', marginTop: 5 },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  ratingText: { color: '#475569', marginLeft: 5, fontWeight: '700' },
  stock: { color: '#16a34a', marginLeft: 15, fontWeight: '700' },
  description: { color: '#64748b', fontSize: 15, lineHeight: 23, marginTop: 18 },
  priceBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 17, padding: 16, marginTop: 22 },
  oldPrice: { color: '#94a3b8', textDecorationLine: 'line-through', fontSize: 13 },
  price: { color: '#f7931a', fontSize: 28, fontWeight: '900', marginTop: 2 },
  discount: { color: '#16a34a', backgroundColor: '#dcfce7', borderRadius: 9, padding: 8, fontWeight: '800' },
  add: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#171717', borderRadius: 15, padding: 16, marginTop: 16 },
  addText: { color: '#fff', fontSize: 16, fontWeight: '900', marginLeft: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25 },
  error: { color: '#475569', marginBottom: 15 },
  backText: { color: '#f7931a', fontWeight: '800' }
});
