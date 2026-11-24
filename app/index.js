import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';

const API_URL = 'https://dummyjson.com/products';

export default function Home() {
  const { sepeteEkle, toplamAdet } = useSepet();
  const [urunler, setUrunler] = useState([]);
  const [arama, setArama] = useState('');
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yenileniyor, setYenileniyor] = useState(false);
  const [hata, setHata] = useState('');

  async function urunleriGetir(query = '') {
    setHata('');
    try {
      const endpoint = query.trim()
        ? `${API_URL}/search?q=${encodeURIComponent(query.trim())}`
        : API_URL;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Ürünler alınamadı.');
      const data = await response.json();
      setUrunler(data.products || []);
    } catch (error) {
      setHata(error.message || 'Beklenmeyen bir hata oluştu.');
    } finally {
      setYukleniyor(false);
      setYenileniyor(false);
    }
  }

  useEffect(() => {
    urunleriGetir();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => urunleriGetir(arama), 350);
    return () => clearTimeout(timer);
  }, [arama]);

  function yenile() {
    setYenileniyor(true);
    urunleriGetir(arama);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>DUMMYJSON STORE</Text>
          <Text style={styles.heading}>Ürünleri keşfet</Text>
        </View>
        <Pressable onPress={() => router.push('/sepet')} style={styles.cartButton}>
          <Ionicons name="cart-outline" size={25} color="#fff" />
          {toplamAdet > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{toplamAdet}</Text></View>}
        </Pressable>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color="#64748b" />
        <TextInput
          value={arama}
          onChangeText={setArama}
          placeholder="Ürün ara..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          returnKeyType="search"
        />
        {!!arama && <Pressable onPress={() => setArama('')}><Ionicons name="close-circle" size={20} color="#94a3b8" /></Pressable>}
      </View>
      {yukleniyor ? (
        <ActivityIndicator size="large" color="#f7931a" style={styles.center} />
      ) : hata ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={46} color="#ef4444" />
          <Text style={styles.error}>{hata}</Text>
          <Pressable onPress={yenile} style={styles.retry}><Text style={styles.retryText}>Tekrar dene</Text></Pressable>
        </View>
      ) : (
        <FlatList
          data={urunler}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.columns}
          refreshControl={<RefreshControl refreshing={yenileniyor} onRefresh={yenile} tintColor="#f7931a" />}
          ListEmptyComponent={<Text style={styles.empty}>Aramanızla eşleşen ürün bulunamadı.</Text>}
          renderItem={({ item }) => (
            <UrunKarti
              urun={item}
              onPress={() => router.push(`/urun/${item.id}`)}
              onAdd={() => sepeteEkle(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff8ee' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 14 },
  eyebrow: { color: '#f7931a', fontSize: 11, fontWeight: '900', letterSpacing: 1.4 },
  heading: { color: '#171717', fontSize: 28, fontWeight: '900', marginTop: 6 },
  cartButton: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#f7931a', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', right: -4, top: -5, minWidth: 21, height: 21, borderRadius: 11, backgroundColor: '#171717', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff8ee' },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '900' },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, marginHorizontal: 20, marginBottom: 10, paddingHorizontal: 14, height: 50 },
  searchInput: { flex: 1, color: '#171717', fontSize: 15, marginLeft: 9 },
  list: { padding: 8, paddingBottom: 30 },
  columns: { justifyContent: 'space-between' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  error: { color: '#475569', textAlign: 'center', marginTop: 12 },
  retry: { backgroundColor: '#f7931a', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 11, marginTop: 16 },
  retryText: { color: '#fff', fontWeight: '800' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: 40 }
});
