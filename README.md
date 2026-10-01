# Dingin · Brave için yeni sekme

Dingin, Brave’de yeni bir sekme açtığında ortada saat ve arka planda sakin bir manzara gösterir. İstersen ismini ve o gün yapmak istediğin tek bir şeyi de ekleyebilirsin. Momentum’dan ilham alan, Türkçe ve bilgisayarında çalışan bağımsız bir eklentidir.

**Daha önce hiç eklenti kurmadıysan da aşağıdaki adımları izleyebilirsin. Kod yazmana veya terminal açmana gerek yok.**

## Başlamadan önce

İhtiyacın olan iki şey var:

- Bilgisayarında kurulu **Brave tarayıcısı**. Kurulu değilse [brave.com/download](https://brave.com/download/) adresinden indirip kurabilirsin.
- Bu projenin dosyaları; özellikle içindeki **`extension`** klasörü.

Kurulum ücretsizdir; hesap açman veya başka bir program yüklemen gerekmez. Bu yöntem **Windows, macOS ve Linux bilgisayarlar** içindir; telefondaki Brave için değildir.

> Eklenti şu an mağazadan değil, bilgisayarındaki dosyalardan yüklenir. Mağazaya yayınlama adımları bu rehberin konusu değildir.

## Brave’e adım adım ekleme

### 1. Eklenti klasörünü hazırla

Dosyalar sana ZIP dosyası olarak geldiyse önce ZIP’i aç:

- **Windows:** ZIP dosyasına sağ tıkla, **Tümünü ayıkla / Extract All** seçeneğine tıkla ve çıkarılan klasörü aç.
- **Mac:** ZIP dosyasına çift tıkla; yanında oluşan klasörü aç.
- **Linux:** ZIP dosyasına sağ tıklayıp dosya yöneticindeki **Buraya çıkar / Extract Here** seçeneğini kullan.

Dosyalar zaten normal bir klasördeyse ZIP açma adımını atlayabilirsin.

Proje klasörünün içinde **`extension`** adlı klasörü bul. İçini açınca şu dosyaları görmelisin:

```text
extension/
  manifest.json
  newtab.html
  newtab.css
  newtab.js
  model.js
  assets/
```

Dosyaları tek tek açmana gerek yok. Birazdan Brave’e **bu klasörün tamamını** seçeceksin.

**Bu bilgisayardaki mevcut klasör:**

```text
/Users/temelgunaydin/Projects/RelaxingBrave/extension
```

Bu adres yalnızca mevcut Mac için geçerlidir. Başka bir bilgisayardaysan kendi indirdiğin proje klasörünün içindeki `extension` klasörünü kullan.

> **Önemli:** Kurduktan sonra Brave dosyaları bu klasörden okumaya devam eder. Klasörü silme veya taşıma. İndirilenler klasörünü sık temizliyorsan kurulumdan **önce** projeyi Belgeler gibi kalıcı bir yere taşı.

### 2. Brave’i aç

Bilgisayarındaki Brave simgesine tıkla. Kurulumu normal bir Brave penceresinde yap; gizli pencere açmana gerek yok.

### 3. Eklentiler sayfasına git

1. Brave penceresinin **en üstündeki adres çubuğuna** tıkla. Burası web sitesi adreslerini yazdığın uzun kutudur; sayfa içindeki arama kutusu değildir.
2. İçindeki yazıyı silip aşağıdaki adresi yaz:
   ```text
   brave://extensions
   ```
3. Klavyeden **Enter** tuşuna bas.

Eklentilerini gösteren bir sayfa açılacak. Henüz eklentin yoksa sayfanın boş görünmesi normaldir.

### 4. Geliştirici modunu aç

Sayfanın sağ üstündeki **Geliştirici modu / Developer mode** anahtarına tıkla ve açık konuma getir.

Bu seçenek bilgisayarındaki eklenti dosyalarını yükleyebilmeni sağlar. Yazılım geliştiricisi olman gerekmez. Yalnızca kaynağına güvendiğin eklentileri yükle.

### 5. `extension` klasörünü seç

1. Sayfada beliren **Paketlenmemiş öğe yükle / Load unpacked** düğmesine tıkla.
2. Açılan klasör seçme penceresinde, 1. adımda bulduğun proje klasörüne git.
3. İçindeki **`extension`** klasörünü seç.
4. Penceredeki **Klasör seç / Select Folder** veya **Aç / Open** düğmesine tıkla. Düğmenin adı işletim sistemine göre değişebilir.

**Doğru seçim:** İçinde doğrudan `manifest.json` dosyası bulunan `extension` klasörü.

**Yanlış seçim:** ZIP dosyası, projenin tamamını içeren `RelaxingBrave` klasörü, `assets` klasörü veya tek bir `newtab.html` dosyası.

Yükleme başarılıysa eklentiler sayfasında **Dingin — Yeni Sekme** adlı bir kart göreceksin. Kartın açma/kapatma anahtarı açık olmalı.

### 6. Yeni bir sekme aç

Brave’in üstündeki sekmelerin yanındaki **+** düğmesine tıkla. İstersen şu kısayolu kullan:

- **Mac:** `⌘ + T`
- **Windows / Linux:** `Ctrl + T`

Brave yeni sekme sayfasının değiştiğini belirten bir uyarı gösterirse **Bu değişikliği koru / Keep it** seçeneğini kullan.

**Ortada büyük bir saat ve arkada göl manzarası görüyorsan kurulum tamamdır.** Bundan sonra yeni sekmelerde Dingin açılır; normal web sitelerini kullanmaya devam edebilirsin.

## İlk kullanım

### İsmini ve arka planını değiştirme

1. Dingin açıkken sağ alttaki **Kişiselleştir** düğmesine tıkla.
2. **Sana nasıl seslenelim?** alanına ismini yaz. Boş bırakman da mümkün.
3. **24 saat** (`14:00`) veya **12 saat** (`02:00 ÖS`) biçimini seç. ÖÖ öğleden önce, ÖS öğleden sonra anlamına gelir.
4. **Göl kenarı**, **Alacakaranlık** veya **Gece** arka planlarından birini seç.
5. **Kaydet** düğmesine tıkla.

Kaydetmeden çıkmak istersen sağ üstteki **×** düğmesine veya klavyedeki **Esc** tuşuna bas.

### Bugünün odağını ekleme

1. Saatin altında, **Bugün senin için önemli olan ne?** sorusunun altındaki yazı alanına tıkla.
2. Örneğin `Kitabımdan on sayfa okumak` yaz.
3. **Enter** tuşuna veya alanın sağındaki kaydet simgesine tıkla.
4. Bitirdiğinde yazının yanındaki **daireye** tıkla. Yazının üzeri çizilir; tekrar tıklarsan tamamlandı işareti kalkar.

Değiştirmek için yazının yanındaki **kalem simgesine** tıkla, metni değiştir ve Enter’a bas. Düzenlerken **Vazgeç / Esc** değişikliği iptal eder; **Kaldır** o günün odağını siler.

**Günlük odak, bilgisayarının yerel saatine göre gece yarısında yenilenir.** Ertesi gün yeni bir odak yazabilirsin. Bu alan geçmiş günlerin görevlerini saklayan bir yapılacaklar listesi değildir.

### Neler otomatik çalışır?

- Saat ve tarih bilgisayarındaki yerel saati kullanır; elle ayarlaman gerekmez.
- Karşılama sabah, gündüz, akşam ve geceye göre değişir.
- Sayfanın altındaki kısa hatırlatma her gün değişir.
- İsmin, görünüm tercihlerin ve o günün odağı sekmeyi kapatıp yeniden açınca korunur. Açık Dingin sekmeleri arasında da güncellenir.

Veriler kullandığın Brave profilinde saklanır; farklı bilgisayarlara veya tarayıcı profillerine aktarılmaz. Eklentiyi kaldırmak veya verilerini temizlemek kayıtlarını silebilir.

## Dosyalar güncellenirse ne yapmalıyım?

Bu yerel kurulum kendiliğinden yeni sürüm indirmez. Sana güncellenmiş dosyalar verildiyse:

1. Eklenti dosyalarını aynı `extension` klasöründe güncelle.
2. Brave’de `brave://extensions` adresini aç.
3. Dingin kartındaki **Yeniden yükle / Reload** düğmesine tıkla. Bu düğme daire şeklindeki ok simgesiyle görünebilir.
4. Yeni bir sekme aç.

## Eski Brave yeni sekmesine nasıl dönerim?

1. Brave’de `brave://extensions` adresini aç.
2. **Dingin — Yeni Sekme** kartını bul.
3. Karttaki açma/kapatma anahtarını **kapalı** konuma getir.
4. Yeni bir sekme aç. Dingin artık gösterilmez.

Tekrar kullanmak istersen aynı anahtarı aç. Tamamen kaldırmak için karttaki **Kaldır / Remove** düğmesine tıkla ve onayla. Kaldırmak kayıtlı tercihlerinin kaybolmasına neden olabilir.

## Sorun yaşarsan

| Sorun | Ne yapmalısın? |
| --- | --- |
| “Paketlenmemiş öğe yükle” düğmesini göremiyorum. | `brave://extensions` sayfasındaki **Geliştirici modu**nu aç. |
| “Manifest bulunamadı / okunamadı” hatası var. | ZIP’i çıkardığından ve doğrudan `manifest.json` içeren **`extension`** klasörünü seçtiğinden emin ol. |
| Dingin kartı var ama yeni sekmede açılmıyor. | Kartın anahtarını aç. Momentum gibi başka bir yeni sekme eklentisi varsa onu kapat. Brave değişikliği onaylamanı istediyse **Bu değişikliği koru** seçeneğini kullanıp yeni sekme aç. |
| Klasörü taşıdım veya sildim, eklenti çalışmıyor. | Dosyaları eski konumuna geri koyup Dingin kartından **Yeniden yükle**ye tıkla. Eski konumu kullanamıyorsan eklentiyi kaldırıp yeni konumdaki `extension` klasörünü yükle; kaldırmak kayıtlarını silebilir. |
| Saat veya tarih yanlış. | Bilgisayarının sistem ayarlarında saat, tarih ve saat dilimini kontrol et. Dingin bunları bilgisayardan alır. |
| Günlük odağım ertesi gün kayboldu. | Bu normaldir; günlük odak gece yarısında yenilenir. İsmin ve arka plan tercihin değişmez. |
| “Tarayıcı kayıt izni vermedi” uyarısı görüyorum. | Değişiklikler yalnızca açık sekmede kalır. Brave profilinin veya kullandığın gizlilik araçlarının yerel depolamayı engelleyip engellemediğini kontrol et; güvenlik ayarlarını tamamen kapatman gerekmez. |
| İş / okul bilgisayarında yüklemeye izin verilmiyor. | Kurumun eklenti kurulmasını kısıtlamış olabilir. Bilgi işlem sorumlusuna danış; bu rehber kurum kısıtlamalarını kaldırmaz. |

## Yerel ve özel

- Fotoğraf, simgeler, CSS ve JavaScript eklentinin içinde paketlidir. İnternet olmadan çalışır.
- Hesap, analiz, reklam, hava durumu servisi, uzaktan font veya CDN yoktur.
- Tarayıcı izni, site erişimi veya arka plan servisi istemez.
- Veriler yalnızca eklentinin `localStorage` alanına yazılır; sunucuya gönderilmez ve cihazlar arasında senkronize edilmez.
- İçerik güvenlik politikası ağ bağlantılarını kapatır (`connect-src 'none'`). Yalnızca fotoğrafın kaynak bağlantısına kendin tıklarsan Unsplash yeni sekmede açılır.
- Tarayıcı depolamayı engellerse saat çalışmaya devam eder; değişikliklerin yalnızca o sekmede kalacağını belirten bir uyarı gösterilir.

## Bu projeyi oluşturmak için örnek prompt

Aşağıdaki metin, projenin başlangıç fikrini ve ortaya çıkan özelliklerini bir araya getiren **yeniden yazılmış bir prompttur**; ilk konuşmanın birebir kopyası değildir. Benzer bir eklenti oluşturmak için bir yapay zekâ kodlama asistanına verebilirsin.

```text
Brave tarayıcısında bilgisayarımdan yükleyip kullanabileceğim, Momentum’dan
(https://momentumdash.com/) ilham alan bir yeni sekme eklentisi yap.
Momentum’un marka ve tasarımını birebir kopyalama; adı Dingin olsun.

Sade, sakin ve Türkçe bir arayüz istiyorum:
- Yeni sekme açıldığında ortada büyük, canlı bir saat ve yerel tarih görünsün.
- Arka planda güzel bir manzara olsun; fotoğraf eklentinin içinde bulunsun.
- Günün saatine göre karşılama gösterilsin ve kullanıcı ismini ekleyebilsin.
- Kullanıcı bugün için tek bir odak yazabilsin; bunu tamamlayabilsin,
  düzenleyebilsin veya silebilsin. Odak yerel gece yarısında yenilensin.
- Kişiselleştirme bölümünde isim, 12/24 saat biçimi ve üç arka plan seçilsin.
- Sayfanın altında her gün değişen kısa, sakin bir hatırlatma olsun.

Hesap, sunucu, API anahtarı, reklam veya takip istemiyorum. İnternet olmadan
çalışsın; fontlar, görseller ve kod dışarıdan yüklenmesin. İsim, tercihler ve
günlük odak yalnızca kullanıcının tarayıcısında saklansın. Açık eklenti
sekmeleri arasındaki değişiklikler eşitlensin. Gereksiz tarayıcı izni isteme.

Manifest V3, HTML, CSS ve JavaScript kullan. Kurulum için derleme veya
terminal komutu gerektirme; yüklenecek dosyaları extension klasörüne koy.
Küçük ekranlarda da okunaklı olsun ve klavyeyle kullanılabilsin.

Saatin ve günün değişmesini, kayıtların korunmasını, çevrimdışı çalışmayı
ve bozuk ya da engellenmiş depolama durumlarını test et. Son olarak,
eklentinin Brave’e nasıl ekleneceğini hiç bilmeyen birine anlatır gibi
adım adım açıklayan bir README hazırla.
```

> Bu prompt bir başlangıç örneğidir; aynı sonucu birebir garanti etmez. Üretilen kodu ve eklentinin istediği izinleri yüklemeden önce kontrol et.

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
