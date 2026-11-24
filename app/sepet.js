import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useSepet } from '../context/SepetContext';

export default function Sepet() {
  const { sepet, miktarDegistir, sepettenSil, toplamTutar } = useSepet();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={25} color="#171717" /></Pressable><Text style={styles.heading}>Sepetim</Text><View style={{ width: 25 }} /></View>
      {sepet.length === 0 ? (
        <View style={styles.empty}><Ionicons name="cart-outline" size={65} color="#94a3b8" /><Text style={styles.emptyTitle}>Sepetiniz boş</Text><Text style={styles.emptyText}>Beğendiğiniz ürünleri sepete ekleyin.</Text><Pressable onPress={() => router.replace('/')} style={styles.shop}><Text style={styles.shopText}>Alışverişe başla</Text></Pressable></View>
      ) : (
        <>
          <FlatList
            data={sepet}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.info}><Text style={styles.title} numberOfLines={2}>{item.title}</Text><Text style={styles.price}>${(item.price * item.adet).toFixed(2)}</Text></View>
                <View style={styles.controls}><Pressable onPress={() => miktarDegistir(item.id, -1)} style={styles.control}><Ionicons name="remove" size={18} color="#f7931a" /></Pressable><Text style={styles.quantity}>{item.adet}</Text><Pressable onPress={() => miktarDegistir(item.id, 1)} style={styles.control}><Ionicons name="add" size={18} color="#f7931a" /></Pressable><Pressable onPress={() => sepettenSil(item.id)} style={styles.delete}><Ionicons name="trash-outline" size={19} color="#ef4444" /></Pressable></View>
              </View>
            )}
          />
          <View style={styles.summary}><View style={styles.totalRow}><Text style={styles.totalLabel}>Toplam</Text><Text style={styles.total}>${toplamTutar.toFixed(2)}</Text></View><Pressable style={styles.checkout}><Text style={styles.checkoutText}>Siparişi tamamla</Text></Pressable></View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff8ee' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  heading: { color: '#171717', fontSize: 22, fontWeight: '900' },
  list: { padding: 14 },
  item: { backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: '#fbe7c8' },
  info: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#171717', fontWeight: '800', flex: 1, marginRight: 12 },
  price: { color: '#f7931a', fontWeight: '900' },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  control: { width: 31, height: 31, borderRadius: 10, backgroundColor: '#fff0d6', alignItems: 'center', justifyContent: 'center' },
  quantity: { color: '#171717', fontWeight: '900', width: 35, textAlign: 'center' },
  delete: { marginLeft: 'auto', padding: 6 },
  summary: { backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: '#64748b', fontSize: 16 },
  total: { color: '#171717', fontSize: 25, fontWeight: '900' },
  checkout: { backgroundColor: '#f7931a', borderRadius: 14, alignItems: 'center', padding: 16, marginTop: 15 },
  checkoutText: { color: '#fff', fontWeight: '900', fontSize: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25 },
  emptyTitle: { color: '#171717', fontSize: 22, fontWeight: '900', marginTop: 16 },
  emptyText: { color: '#64748b', marginTop: 7 },
  shop: { backgroundColor: '#f7931a', borderRadius: 13, paddingHorizontal: 20, paddingVertical: 13, marginTop: 20 },
  shopText: { color: '#fff', fontWeight: '800' }
});
