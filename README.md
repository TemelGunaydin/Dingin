# Dingin · Brave için yeni sekme

Momentum’dan ilham alan, Türkçe ve tamamen yerel bir yeni sekme eklentisi. Ortada canlı saat, sakin bir manzara ve bugünün tek odağı. Hesap, API anahtarı veya derleme gerektirmez.

## Brave’e kurulum

1. Adres çubuğunda **`brave://extensions`** sayfasını aç.
2. Sağ üstte **Geliştirici modu**nu etkinleştir.
3. **Paketlenmemiş öğe yükle / Load unpacked** düğmesine tıkla.
4. Bu projenin içindeki **`extension`** klasörünü seç:
   ```text
   /Users/temelgunaydin/Projects/RelaxingBrave/extension
   ```
   `manifest.json` bu klasörün doğrudan içinde olmalı; proje kökünü seçme.
5. Yeni bir sekme aç (`⌘T` / `Ctrl+T`). Brave değişikliği onaylamanı isterse **Bu değişikliği koru / Keep it** seçeneğini kullan.

Başka bir yeni sekme eklentisi varsa onu devre dışı bırak. Eklenti klasörünü kurulumdan sonra silme veya taşıma. Kodu değiştirdiğinde `brave://extensions` sayfasında Dingin kartının **Yeniden yükle** düğmesine tıklayıp yeni sekme aç.

Eski Brave yeni sekmesine dönmek için aynı sayfada Dingin’i devre dışı bırakman yeterli. Asıl tarayıcı profiline bu proje tarafından otomatik kurulum veya değişiklik yapılmaz.

## Kullanım

- **Saat ve tarih:** Bilgisayarının yerel saatini kullanır. Karşılama günün saatine göre değişir.
- **Günlük odak:** Bir niyet yaz, Enter’a bas. Daireyi işaretleyerek tamamla; kalemle düzenle. Düzenlerken **Vazgeç / Esc** değişikliği iptal eder, **Kaldır** odağı siler. Odak yerel saatle gece yarısında yenilenir.
- **Kişiselleştir:** İsmini, 12/24 saat biçimini ve üç arka plandan birini seç. **Kaydet** ile uygulanır; Esc ile kaydetmeden kapanır.
- **Günün küçük notu:** Her gün farklı, kısa bir hatırlatma.

Tercihler ve o günün odağı yeniden açılan sekmelerde korunur; açık Dingin sekmeleri arasında eşitlenir. Gizli pencere/farklı tarayıcı profilleri ayrı depolama kullanır. Eklentiyi kaldırmak veya verilerini temizlemek kayıtlarını silebilir.

## Yerel ve özel

- Fotoğraf, simgeler, CSS ve JavaScript eklentinin içinde paketlidir. İnternet olmadan çalışır.
- Hesap, analiz, reklam, hava durumu servisi, uzaktan font veya CDN yoktur.
- Tarayıcı izni, site erişimi veya arka plan servisi istemez.
- Veriler yalnızca eklentinin `localStorage` alanına yazılır; sunucuya gönderilmez ve cihazlar arasında senkronize edilmez.
- İçerik güvenlik politikası ağ bağlantılarını kapatır (`connect-src 'none'`). Yalnızca fotoğrafın kaynak bağlantısına kendin tıklarsan Unsplash yeni sekmede açılır.
- Tarayıcı depolamayı engellerse saat çalışmaya devam eder; değişikliklerin yalnızca o sekmede kalacağını belirten bir uyarı gösterilir.

## Dosyalar

```text
extension/
  manifest.json       # Manifest V3, yeni sekme tanımı
  newtab.html         # Arayüz
  newtab.css          # Görünüm ve küçük ekran düzeni
  newtab.js           # Saat, tercihler, odak ve sekme eşitleme
  model.js            # Tarih, biçimlendirme ve veri doğrulama
  assets/             # Paketlenmiş fotoğraf ve simgeler
```

## Geliştirici testleri (kurulum için gerekmez)

Node.js 20+ ile:

```bash
npm ci
npm test
npm run test:browser
```

Tarayıcı testleri macOS’te kurulu Brave’i **ayrı, geçici bir profille** açar; kişisel tarayıcı verilerine dokunmaz. Başka bir sistemde Brave çalıştırılabilir dosyasını belirt:

```bash
BROWSER_PATH="/path/to/brave" npm run test:browser
```

Brave yoksa Playwright Chromium ile de çalıştırabilirsin:

```bash
npx playwright install chromium
npm run test:browser
```

Testler gerçek yeni sekme değişimini, çevrimdışı fotoğrafı, saat/gün değişimini, odak işlemlerini, tercihlerin kalıcılığını, sekmeler arası eşitlemeyi, bozuk/engellenmiş depolamayı ve dar ekran düzenini kontrol eder. Görsel önizlemeler `test-results/` klasörüne kaydedilir.

## Fotoğraf

**Braies Gölü, İtalya** — [Pietro De Grandi / Unsplash](https://unsplash.com/photos/T7K4aEPoGGk), [Unsplash lisansı](https://unsplash.com/license). [Kaynak dosya](https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2560&q=88) indirilip eklentiye dahil edilmiştir; kullanım sırasında tekrar indirilmez.

Dingin bağımsız bir projedir; Momentum veya Brave’in resmî ürünü değildir.
