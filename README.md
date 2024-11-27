# Venezuelan News Aggregator

Welcome to the **Venezuelan News Aggregator**, a platform dedicated to reporting and sharing the latest news about Venezuela. This project gathers news by scraping content from trusted sources such as YouTube content creators, newspapers, independent journalists, and voices from exiled communities.

## 🎯 **Project Goals**

- **Provide Unbiased News**: Deliver timely and factual updates about Venezuela's socio-political and economic landscape.
- **Support Independent Voices**: Highlight content from exiled journalists, protestors, and independent creators who might otherwise go unheard.
- **Simplify Access**: Centralize news from various platforms to make it easily accessible for anyone interested in Venezuelan affairs.
- **Promote Awareness**: Raise global awareness about the struggles, resilience, and stories of the Venezuelan people.

---

## 🚀 **Features**

### 🔍 **Scraping and Aggregation**
- Automatically scrape news from:
  - **YouTube content creators** sharing updates and opinions about Venezuela.
  - **Newspapers** reporting on Venezuelan affairs, both locally and internationally.
  - **Exiled journalists and protestors**, amplifying voices from diaspora communities.

### 📜 **Categorized News**
- News is organized into categories such as:
  - Political developments
  - Economic updates
  - Human rights and protests
  - Cultural and social stories

### 🌐 **Multilingual Support**
- Content is available in Spanish and English to cater to a global audience.

### 📱 **User-Friendly Interface**
- Modern and responsive design for seamless navigation on desktop and mobile devices.

### 🔔 **Notifications**
- Optional notifications for breaking news and major events.

---

## 🛠️ **Technology Stack**

### **Frontend**
- **React.js**: For building a dynamic and responsive user interface.
- **CSS/SCSS**: For styling with animations like flag waves and smooth transitions.

### **Backend**
- **Node.js + Express**: For server-side logic and API management.
- **Supabase**: Used for real-time database management.

### **Web Scraping**
- **Puppeteer**: For scraping dynamic web content such as YouTube and newspaper websites.
- **Cheerio.js**: For parsing static HTML pages.
- **Cron Jobs**: For scheduling regular scraping tasks.

---

## 🔒 **Ethics and Compliance**

- **Respect for Copyright**: Ensures that scraped content is properly attributed to original creators.
- **Data Privacy**: No personal data is collected or stored from users.
- **Transparency**: Sources for all news content are clearly listed and linked.

---

## ⚙️ **Installation**

### Prerequisites
- Node.js (v16+)
- NPM or Yarn
- Supabase account for database setup

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/venezuelan-news-aggregator.git
   cd venezuelan-news-aggregator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` file with the following:
   - Supabase API URL and key
   - Scraping intervals and target URLs
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build the project for production:
   ```bash
   npm run build
   ```

---

## 📰 **News Sources**

The aggregator curates content from:
- **YouTube**: Channels by Venezuelan activists and creators.
- **Online Newspapers**: Including both local outlets and international coverage.
- **Independent Journalists**: Reporting from within Venezuela and in exile.
- **Community Blogs**: Voices of protestors, diaspora groups, and NGOs.

---

## 🤝 **Contributing**

We welcome contributions to improve the platform! Here’s how you can help:
1. Report bugs or suggest features via [issues](https://github.com/your-username/venezuelan-news-aggregator/issues).
2. Submit a pull request with your enhancements.
3. Propose additional sources or categories for aggregation.

---

## 🙌 **Acknowledgments**

This project is inspired by the resilience of Venezuelans, journalists, and activists working tirelessly to share the truth. Special thanks to the content creators and reporters whose work fuels this platform.

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 📧 **Contact**

Have feedback or want to collaborate? Reach out at:
- **Email**: contact@venezuelannewsaggregator.com
- **Twitter**: [@VenezNews](https://twitter.com/VenezNews)

Let’s amplify the voices of Venezuela together! 🌟