# BillSnap - Invoice Generator for Indian Kirana Stores

## Complete Project Structure

```
billsnap/
├── App.js                          # Main app entry with navigation
├── package.json                    # Dependencies
├── app.json                        # Expo configuration
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.js       # Stack navigator (Camera, Invoice Preview)
│   │   └── TabNavigator.js        # Bottom tabs (Home, Dashboard, Settings)
│   ├── screens/
│   │   ├── HomeScreen.js          # Today's sales, recent invoices, camera button
│   │   ├── CameraScreen.js        # Full-screen camera with flash, gallery
│   │   ├── InvoicePreviewScreen.js # Editable invoice with GST breakdown
│   │   ├── DashboardScreen.js     # Sales graphs, top products, GST reports
│   │   └── SettingsScreen.js      # Store details, GSTIN, language, theme
│   ├── components/
│   │   ├── PrimaryButton.js       # Reusable button (48px touch target)
│   │   ├── Card.js                # Material design card
│   │   ├── InvoiceItemRow.js      # Editable invoice line item
│   │   └── TextField.js           # Form input
│   ├── services/
│   │   ├── api.js                 # Axios API client
│   │   ├── syncService.js         # Auto-sync to cloud when online
│   │   ├── pdfService.js          # PDF generation and WhatsApp sharing
│   │   └── qrService.js           # UPI QR code scanner
│   ├── db/
│   │   ├── database.js            # SQLite initialization
│   │   └── migrations.js          # Database migrations
│   ├── i18n/
│   │   ├── index.js               # i18next setup
│   │   └── locales/
│   │       ├── en.json            # English translations
│   │       ├── hi.json            # Hindi translations
│   │       └── ta.json            # Tamil translations
│   ├── theme/
│   │   ├── colors.js              # Primary: #2563EB
│   │   ├── typography.js          # Font styles
│   │   └── spacing.js             # Layout spacing
│   └── hooks/
│       ├── useInvoices.js         # Custom hooks for invoices
│       ├── useOnlineStatus.js     # Network connectivity
│       └── useThemePreference.js  # Dark mode support
└── .gitignore
```

## Technology Stack

- **Framework**: React Native with Expo SDK 51+
- **Navigation**: @react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack
- **Database**: expo-sqlite (offline-first)
- **Storage**: @react-native-async-storage/async-storage
- **API**: Axios
- **Camera**: expo-camera
- **PDF**: react-native-pdf + expo-sharing
- **Localization**: react-i18next, i18next, expo-localization
- **QR Scanner**: react-native-qrcode-scanner

## Key Features

✅ **Offline-First Architecture**: All invoices saved locally in SQLite, auto-sync when internet available  
✅ **Multi-Language Support**: English, Hindi, Tamil with i18next  
✅ **Camera Integration**: Full-screen camera with auto-focus, flash toggle, gallery access  
✅ **PDF Generation**: Generate professional invoices and share via WhatsApp  
✅ **GST Compliance**: Automatic GST calculation and breakdown  
✅ **UPI QR Scanner**: Scan QR codes for UPI payments  
✅ **Dark Mode**: System-based theme switching  
✅ **Performance Optimized**: Works smoothly on 2GB RAM Android phones  
✅ **Dashboard Analytics**: Daily/weekly/monthly sales graphs, top products  

## Setup Instructions

### Prerequisites
```bash
node >= 18.0.0
npm or yarn
Expo CLI
```

### Installation

```bash
# Clone the repository
git clone https://github.com/kk590/BillSnap-Invoice-App.git
cd BillSnap-Invoice-App

# Install dependencies
npm install
# or
yarn install

# Start Expo development server
npx expo start
```

### Run on Device

**Android**:
```bash
npx expo run:android
```

**iOS**:
```bash
npx expo run:ios
```

**Web** (limited functionality):
```bash
npx expo start --web
```

## Database Schema

### Invoices Table
```sql
CREATE TABLE invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  store_name TEXT,
  store_gstin TEXT,
  store_address TEXT,
  customer_name TEXT,
  items_json TEXT,
  subtotal REAL,
  gst_percent REAL,
  gst_amount REAL,
  total REAL,
  created_at TEXT,
  synced INTEGER DEFAULT 0
);
```

### Settings Table
```sql
CREATE TABLE settings (
  id INTEGER PRIMARY KEY NOT NULL,
  store_name TEXT,
  store_gstin TEXT,
  store_address TEXT,
  language TEXT,
  theme TEXT
);
```

## Dependencies (package.json)

```json
{
  "name": "billsnap",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "^51.0.0",
    "expo-camera": "~15.0.0",
    "expo-file-system": "~17.0.0",
    "expo-sharing": "~12.0.0",
    "expo-localization": "~16.0.0",
    "expo-sqlite": "~15.0.0",
    "@react-native-async-storage/async-storage": "^1.22.0",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "react-native-gesture-handler": "~2.16.0",
    "react-native-reanimated": "~3.10.0",
    "react-native-safe-area-context": "4.10.0",
    "react-native-screens": "~4.9.0",
    "react-native-qrcode-scanner": "^1.5.5",
    "axios": "^1.7.0",
    "react": "18.2.0",
    "react-native": "0.74.0",
    "react-i18next": "^15.0.0",
    "i18next": "^23.0.0",
    "react-native-pdf": "^6.7.0"
  },
  "devDependencies": {
    "@babel/core": "^7.24.0"
  }
}
```

## UI Design Principles

- **Material Design**: Following Google's Material Design guidelines
- **Primary Color**: Blue (#2563EB)
- **Touch Targets**: Minimum 48px for ease of use by shopkeepers
- **Simple Interface**: Clutter-free, intuitive navigation
- **Bottom Tabs**: Easy thumb access on mobile devices
- **Large Text**: Readable font sizes for older shopkeepers

## Performance Optimizations

1. **Image Compression**: Compress images before upload to reduce bandwidth
2. **Lazy Loading**: Load invoice history on demand
3. **Data Caching**: Cache frequently used data in AsyncStorage
4. **SQLite Indexing**: Proper indexes on frequently queried columns
5. **Efficient Re-renders**: React.memo and useMemo for heavy components

## Offline-First Strategy

1. All invoices saved immediately to SQLite
2. Background sync service checks network status
3. When online, sync unsynced invoices to cloud
4. Mark synced invoices with `synced = 1`
5. Handle conflicts with "server wins" strategy

## Multi-Language Support

Supported languages:
- 🇬🇧 English (en)
- 🇮🇳 Hindi (hi)
- 🇮🇳 Tamil (ta)

Users can switch language from Settings screen. All UI text uses i18next translation keys.

## API Integration

**Backend Endpoints** (to be implemented):
```
POST /api/invoices/bulk-sync   - Sync local invoices to cloud
GET  /api/stats                - Fetch dashboard statistics
GET  /api/invoices/:id/pdf     - Generate PDF for invoice
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for commercial purposes.

## Contact

For support or queries, reach out:
- GitHub: [@kk590](https://github.com/kk590)
- Email: kkrakshan2006@gmail.com

---

**Note**: This is a starter template. For a complete working app, create all the individual files as per the structure above using the code snippets provided in the initial README response.
