# VaympStore - E-Commerce React Native App

A modern e-commerce application built with React Native, featuring product browsing, shopping cart management with Redux Toolkit, and persistent storage using AsyncStorage.

## Features

✅ **Product Browsing** - Browse products with filtering and sorting  
✅ **Shopping Cart** - Add/remove items with Redux Toolkit state management  
✅ **Wishlist** - Save favorite products  
✅ **Persistent Storage** - Cart data saved across app restarts  
✅ **Search & Filter** - Find products by name, category, price  
✅ **Quantity Management** - Increase/decrease product quantity  
✅ **Responsive UI** - Optimized for all Android/iOS devices  

## Tech Stack

- **React Native** 0.86.0
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management for shopping cart
- **AsyncStorage** - Local persistent data storage
- **Axios** - API calls for product data
- **React Navigation** - Bottom tab navigation

## Project Structure

```
VaympStore/
├── src/
│   ├── screens/
│   │   ├── ProductsScreen.js      # Product listing with search/filter
│   │   ├── ProductDetailScreen.js # Product detail view
│   │   ├── BagScreen.js           # Shopping cart
│   │   └── LikedScreen.js         # Wishlist
│   ├── components/
│   │   ├── ProductCard.js         # Product card component
│   │   ├── FilterModal.js         # Filter options
│   │   ├── SortModal.js           # Sort options
│   │   ├── BottomActionBar.js     # Bottom navigation bar
│   │   └── ProductDetailView.js   # Product detail view
│   ├── services/
│   │   └── api.js                 # API calls for products
│   ├── store/
│   │   ├── index.ts               # Redux store configuration
│   │   └── bagSlice.ts            # Shopping bag Redux slice
│   ├── assets/                    # Images and icons
│   └── AppContent.tsx             # Main app logic with Redux
├── App.tsx                        # Redux Provider wrapper
├── android/                       # Android-specific configuration
├── ios/                          # iOS-specific configuration
└── package.json                  # Dependencies
```

## Installation & Setup

### Prerequisites

- Node.js >= 22.11.0
- npm or yarn
- Android SDK (for Android)
- Java Development Kit (JDK) 17+

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd VaympStore
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Metro Bundler

```bash
npm start
# or
npx react-native start --reset-cache
```

### Step 4: Run on Android

In a new terminal:

```bash
npm run android
# or
npx react-native run-android
```

### Step 5: Run on iOS (Optional)

```bash
cd ios
pod install
cd ..
npm run ios
```

## Redux Store Configuration

Shopping cart state is managed using Redux Toolkit.

### Redux Actions (src/store/bagSlice.ts)

- **addToBag(item)** - Add product to shopping bag
- **removeFromBag(bagId)** - Remove item from bag
- **increaseQuantity(bagId)** - Increase item quantity by 1
- **decreaseQuantity(bagId)** - Decrease item quantity by 1
- **clearBag()** - Clear entire shopping cart
- **setBagItems(items)** - Set bag items (for loading from storage)

### Usage Example

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { addToBag, removeFromBag } from './store/bagSlice';
import type { RootState } from './store';

function MyComponent() {
  const dispatch = useDispatch();
  const bagItems = useSelector((state: RootState) => state.bag.items);

  const handleAdd = () => {
    dispatch(addToBag({
      id: 1,
      title: 'Product Name',
      price: 99.99,
      image: 'url',
      size: 'M',
      quantity: 1,
      bagId: 'unique-id'
    }));
  };

  return (
    <View>
      <Text>Items in bag: {bagItems.length}</Text>
      <Button title="Add to Bag" onPress={handleAdd} />
    </View>
  );
}
```

## AsyncStorage Persistence

Cart and wishlist data are automatically persisted and restored.

**Storage Keys:**
- `bagItems` - Shopping cart items
- `likedItems` - Wishlist items

## Building Release APK

### 1. Generate Keystore (First Time Only)

```bash
cd android
keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias release
```

When prompted, enter password: `vaymp@123`

### 2. Build Release APK

```bash
cd android
./gradlew assembleRelease
```

APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### 3. Install on Device

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### If App Already Installed

```bash
adb uninstall com.vaympstore
adb install android/app/build/outputs/apk/release/app-release.apk
```

## Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run linter
npm run lint

# Run tests
npm run test
```

## API Integration

Products are fetched from **FakeStore API**:
```
https://fakestoreapi.com/products
```

**Configuration** (src/services/api.js):

```javascript
export const getProducts = async () => {
  try {
    const response = await axios.get(BASE_URL, { timeout: 15000 });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.message);
    return [];
  }
};
```

## Key Features

### 1. Product Browsing
- Browse all products from API
- Search by name, description, category
- Filter by price, gender, brand, fabric, fit, size, color
- Sort by price or rating

### 2. Shopping Cart (Redux)
- Add/remove products
- Adjust quantities with +/- buttons
- View total price
- Persistent across restarts
- One-tap checkout

### 3. Product Detail
- Full product information
- Size selection
- Quantity adjustment
- Add to cart/wishlist

### 4. Wishlist
- Save favorite products
- Remove from wishlist
- Persistent storage

### 5. Bottom Navigation
- Quick navigation between screens
- Badge count on cart/wishlist

## Troubleshooting

### Products not loading?

```bash
# Reset cache and restart
npm start --reset-cache

# Check if API is reachable
curl https://fakestoreapi.com/products
```

### Redux not persisting?

- Ensure AsyncStorage is installed
- Check device storage permissions
- Verify Redux slice configuration

### Build errors?

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### Installation conflicts?

```bash
adb uninstall com.vaympstore
npm run android
```

## Development Guidelines

- Use TypeScript for type safety
- Follow Redux patterns for state management
- Use AsyncStorage for persistence
- Optimize with FlatList for long lists
- Test on both Android and iOS

## License

MIT

---

**Version:** 1.0.0  
**Last Updated:** June 18, 2026  
**Developer:** Kumar Saurabh Yadav
