# Pokédx - Interactive JavaScript Application
![GitHub issues](https://img.shields.io/github/issues/eahowell/pokedex-js-app?color=yellow)
![GitHub Repo stars](https://img.shields.io/github/stars/eahowell/pokedex-js-app)
![GitHub forks](https://img.shields.io/github/forks/eahowell/pokedex-js-app)
![GitHub watchers](https://img.shields.io/github/watchers/eahowell/pokedex-js-app)
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://eahowell.github.io/pokedex-js-app/)

<div align="center">
  <img src="img/PokedexLogo.png" alt="Pokédex Logo" width="300"/>
  
  **A responsive web application that brings the world of Pokémon to your browser**
  
  [🚀 Live Demo](https://eahowell.github.io/pokedex-js-app/) • [🎞️ Video Demo](https://www.loom.com/share/7889e085290949048d8cbc50869483cb?sid=0f539126-e3f8-4a19-8161-a62412b9bffc) • [🐛 Report Bug](https://github.com/eahowell/pokedex-js-app/issues) • [✨ Request Feature](https://github.com/eahowell/pokedex-js-app/issues)
</div>

## 📖 About The Project

The Pokédex is an interactive web application that allows users to explore the fascinating world of Pokémon. Built with vanilla JavaScript, HTML, and CSS, this project demonstrates modern web development practices while maintaining compatibility with older browsers.

### ✨ Key Features

- **🔍 Browse Pokémon**: Explore a comprehensive list of 771+ Pokémon
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎯 Interactive Details**: Click any Pokémon to view detailed information in a modal
- **🔎 Filtering**: Filter Pokémon by name using the dropdown selector
- **🎨 Modern UI**: Clean, intuitive interface with Bootstrap styling
- **🌐 Cross-Browser Support**: Works on Chrome, Firefox, Safari, Edge, and Internet Explorer 11

### 🏗️ Built With

#### Core Technologies
- **JavaScript ES6+** - Core application logic
- **HTML5** - Semantic markup structure
- **CSS3** - Custom styling with CSS variables

#### Libraries & Frameworks
- **[jQuery 3.3.1](https://jquery.com/)** - DOM manipulation and event handling
- **[Bootstrap 4.3.1](https://getbootstrap.com/docs/4.3/)** - Responsive UI components
- **[Popper.js](https://popper.js.org/)** - Tooltip and popover positioning

#### Browser Compatibility
- **Promise Polyfill** - ES6 Promise support for older browsers
- **Fetch Polyfill** - Modern HTTP client for legacy browser support

#### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **GitHub Pages** - Deployment and hosting

## 🚀 Getting Started

### Prerequisites

No installation required! This is a client-side application that runs entirely in the browser.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eahowell/pokedex-js-app.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd pokedex-js-app
   ```

3. **Open the application**
   - Open `index.html` in your preferred web browser
   - Or use a local development server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

## 🎮 Usage

### Basic Navigation
1. **Browse Pokémon**: Scroll through the list of Pokémon on the main page
2. **View Details**: Click any Pokémon button to open a detailed modal with:
   - High-quality Pokémon image
   - Height information
   - Type classification
   - Special abilities
   - Size classification

### Advanced Features
- **Filter by Name**: Use the dropdown menu to filter and find specific Pokémon
- **Return to Top**: Click the Pokéball icon in the navigation to scroll to the top
- **External Resources**: Access the Pokémon API and documentation through the navigation links

## 🗂️ Project Structure

```
pokedex-js-app/
├── css/
│   └── styles.css          # Custom styles and CSS variables
├── dist/                   # Minified production files
├── img/                    # Images and logos
├── js/
│   ├── scripts.js          # Main application logic
│   ├── fetch-polyfill.js   # Fetch API polyfill
│   └── promise-polyfill.js # Promise polyfill
├── .eslintrc              # ESLint configuration
├── .gitattributes         # Git configuration
└── index.html             # Main HTML file
```

## 🔌 API Integration

This application integrates with the **[PokéAPI](https://pokeapi.co/)**, a comprehensive RESTful API that provides:

- **Endpoint**: `https://pokeapi.co/api/v2/pokemon/?limit=771`
- **Data Retrieved**:
  - Pokémon names and IDs
  - Detailed statistics and attributes
  - High-resolution images
  - Type information and abilities
- **Rate Limiting**: Respects API rate limits with efficient caching
- **Error Handling**: Graceful fallbacks for network issues

## 🤝 Contributing
1. Fork the repo  
2. Create a feature branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add some feature"`  
4. Push to branch: `git push origin feature/your-feature-name`  
5. Open a pull request 

### Development Guidelines

- Follow the existing code style (ESLint configuration provided)
- Test across multiple browsers before submitting
- Update documentation for new features
- Keep commits atomic and well-described

## 🐛 Known Issues

- Modal images may take time to load on slower connections
- Internet Explorer 11 requires polyfills (included)
- Large dataset may impact performance on very old devices

## ✉️ Contact

**Developer:** [Elizabeth Howell](ehowell.webdev@gmail.com)  
**Website:** [Portfolio](http://ehowell-dev.me/PortfolioWebsite/)  
**Twitter:** [ehowell_webdev](https://x.com/ehowell_webdev)  
**GitHub:** [eahowell](https://github.com/eahowell)
  

## 🙏 Acknowledgments

### Icons & Graphics
- **Pokémon Icon**: [Nikita Golubev - Flaticon](https://www.flaticon.com/free-icons/pokeball)
- **Pikachu Icon**: [Roundicons Freebies - Flaticon](https://www.flaticon.com/free-icons/pikachu)

### Fonts
- **Roboto Slab**: [Google Fonts](https://fonts.google.com/specimen/Roboto+Slab)

### Special Thanks
- **[PokéAPI](https://pokeapi.co/)** - For providing comprehensive Pokémon data
- **[Career Foundry](https://careerfoundry.com/)** - For the project inspiration and guidelines
- **The Pokémon Company** - For creating the amazing world of Pokémon

---

<div align="center">
  <p>Made with ❤️ for Pokémon fans everywhere</p>
  <p>
    <a href="#top">⬆️ Back to Top</a>
  </p>
</div>