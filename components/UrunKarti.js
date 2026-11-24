import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function UrunKarti({ urun, onPress, onAdd }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: urun.thumbnail }} style={styles.image} resizeMode="contain" />
      <View style={styles.body}>
        <Text style={styles.category}>{urun.category}</Text>
        <Text style={styles.title} numberOfLines={2}>{urun.title}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#f59e0b" />
          <Text style={styles.ratingText}>{urun.rating?.toFixed(1) || '—'}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${urun.price.toFixed(2)}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${urun.title} ürününü sepete ekle`}
            onPress={(event) => {
              event.stopPropagation();
              onAdd();
            }}
            style={styles.addButton}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', margin: 6, borderWidth: 1, borderColor: '#fbe7c8', elevation: 2 },
  pressed: { opacity: 0.8 },
  image: { width: '100%', height: 145, backgroundColor: '#fffaf3' },
  body: { padding: 12 },
  category: { color: '#64748b', fontSize: 11, textTransform: 'uppercase', fontWeight: '700' },
  title: { color: '#171717', fontSize: 15, fontWeight: '800', minHeight: 40, marginTop: 5 },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { color: '#64748b', fontSize: 12, marginLeft: 4 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  price: { color: '#f7931a', fontSize: 17, fontWeight: '900' },
  addButton: { width: 34, height: 34, borderRadius: 12, backgroundColor: '#f7931a', alignItems: 'center', justifyContent: 'center' }
});
