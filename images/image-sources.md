# Fonti Immagini - FlowMetrics Analytics

## 📋 Panoramica

Questo documento documenta tutte le immagini utilizzate nella landing page SaaS FlowMetrics Analytics, incluse le fonti, le licenze e le specifiche tecniche.

## 🖼️ Immagini Principali

### 1. Hero Section Background
- **File**: `hero-dashboard.jpg`
- **Dimensioni**: 1920x1080px
- **Formato**: JPG (con fallback WebP)
- **Fonte**: Creato con Figma/Photoshop
- **Licenza**: Copyright FlowMetrics Analytics
- **Descrizione**: Dashboard analytics con gradient background
- **Ottimizzazione**: Compressa per web, qualità 85%

### 2. Dashboard Mockup
- **File**: `dashboard-mockup.jpg`
- **Dimensioni**: 1200x800px
- **Formato**: JPG (con fallback WebP)
- **Fonte**: Mockup creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics
- **Descrizione**: Interface mockup del prodotto FlowMetrics
- **Ottimizzazione**: Compressa per web, qualità 90%

### 3. Testimonial Avatar
- **File**: `testimonial-avatar.jpg`
- **Dimensioni**: 150x150px
- **Formato**: JPG (con fallback WebP)
- **Fonte**: Foto stock professionale
- **Licenza**: Royalty-free stock photo
- **Model**: Marco Rossi (nome fittizio)
- **Descrizione**: Professional headshot per testimonial

### 4. Favicon
- **File**: `favicon.ico`
- **Dimensioni**: 32x32px, 16x16px
- **Formato**: ICO
- **Fonte**: Creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics
- **Descrizione**: Logo FlowMetrics semplificato

## 🏢 Client Logos

### 1. TechCorp
- **File**: `logo1.png`
- **Dimensioni**: 200x80px
- **Formato**: PNG con trasparenza
- **Fonte**: Logo creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics (uso fittizio)
- **Settore**: Technology/Software

### 2. DataFlow
- **File**: `logo2.png`
- **Dimensioni**: 200x80px
- **Formato**: PNG con trasparenza
- **Fonte**: Logo creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics (uso fittizio)
- **Settore**: Data Analytics

### 3. CloudBase
- **File**: `logo3.png`
- **Dimensioni**: 200x80px
- **Formato**: PNG con trasparenza
- **Fonte**: Logo creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics (uso fittizio)
- **Settore**: Cloud Services

### 4. InsightPro
- **File**: `logo4.png`
- **Dimensioni**: 200x80px
- **Formato**: PNG con trasparenza
- **Fonte**: Logo creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics (uso fittizio)
- **Settore**: Business Intelligence

### 5. Metrica
- **File**: `logo5.png`
- **Dimensioni**: 200x80px
- **Formato**: PNG con trasparenza
- **Fonte**: Logo creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics (uso fittizio)
- **Settore**: Metrics Platform

### 6. AnalyticsHub
- **File**: `logo6.png`
- **Dimensioni**: 200x80px
- **Formato**: PNG con trasparenza
- **Fonte**: Logo creato con Figma
- **Licenza**: Copyright FlowMetrics Analytics (uso fittizio)
- **Settore**: Dashboard Tool

## 📊 Specifiche Tecniche

### Compressione Immagini
- **Tool**: TinyPNG/Squoosh
- **Target**: <100KB per immagine hero
- **Qualità**: 85-90% (balance tra qualità e dimensione)
- **Formati**: WebP con fallback JPG/PNG

### Lazy Loading
- **Implementazione**: Native loading="lazy"
- **Placeholder**: CSS gradient con aspect ratio
- **Strategy**: Above-the-fold images critical, below-the-fold lazy

### Responsive Images
- **Srcset**: Implementato per immagini hero
- **Sizes**: Media queries per breakpoints
- **Breakpoints**: 320px, 768px, 1024px, 1280px

## 🔧 Implementazione nel Codice

### HTML Structure
```html
<!-- Hero con lazy loading -->
<img src="images/hero-dashboard.jpg" 
     alt="FlowMetrics Analytics Dashboard" 
     loading="lazy"
     width="1920" 
     height="1080">

<!-- Client logos con WebP fallback -->
<picture>
  <source srcset="images/client-logos/logo1.webp" type="image/webp">
  <img src="images/client-logos/logo1.png" 
       alt="TechCorp Logo" 
       loading="lazy">
</picture>
```

### CSS Optimization
```css
/* Aspect ratio preservation */
img {
  aspect-ratio: attr(width) / attr(height);
  object-fit: cover;
}

/* Lazy loading placeholder */
img[loading="lazy"] {
  background-color: var(--bg-light);
}
```

## 📈 Performance Impact

### Metriche Target
- **LCP (Largest Contentful Paint)**: <2.5s
- **CLS (Cumulative Layout Shift)**: <0.1
- **FID (First Input Delay)**: <100ms

### Ottimizzazioni Implementate
- Critical CSS inlining
- Preload per font e above-the-fold images
- WebP format con fallback
- Lazy loading per below-the-fold images
- Compressione avanzata

## 🔄 Processo di Aggiornamento

### Quando Aggiornare le Immagini
1. **Rebranding**: Cambio logo o colori
2. **Seasonal**: Aggiornamenti stagionali
3. **A/B Testing**: Test di diverse immagini
4. **Performance**: Ottimizzazioni di caricamento

### Checklist per Aggiornamento
- [ ] Mantenere aspect ratio
- [ ] Ottimizzare per web
- [ ] Testare su tutti i dispositivi
- [ ] Verificare accessibilità (alt text)
- [ ] Aggiornare documentazione

## 📝 Note Legali

### Licenze
- Tutte le immagini create internamente sono copyright FlowMetrics Analytics
- Le immagini stock sono royalty-free con licenza commerciale
- I loghi clienti sono uso fittizio per demo purposes

### Attribution
- Stock photos: Credit in footer se richiesto dalla licenza
- Icon libraries: Credit in documentation
- Fonts: Google Fonts (Open Source)

---

**Data Aggiornamento**: 6 Ottobre 2025  
**Versione**: 1.0.0  
**Responsabile**: Development Team