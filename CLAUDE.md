# Kinland Frontend Guide

## Build/Dev Commands
- `npm install` - Install dependencies
- `npm run dev` - Serve with hot reload at localhost:3000
- `npm run build` - Build for production
- `npm start` - Launch production server
- `npm run generate:staging` - Generate static project for staging
- `npm run generate:production` - Generate static project for production

## Code Style Guidelines
- **Framework**: Vue 2 with Nuxt.js
- **CSS**: SCSS with BEM naming convention
- **Component Structure**: Template -> Script -> Style (scoped)
- **Props**: Always define type and default values
- **Naming**: PascalCase for components, camelCase for variables
- **Imports**: Group imports by type (components, utils, etc.)
- **Layout**: Use existing layout patterns with proper responsive design
- **Styling**: Use variables from _vars.scss, _mixins.scss, and _colours.scss
- **Sanity CMS**: Used for content, follow established data structures
- **Error Handling**: Use try/catch for async operations

## Project Structure
- `components/` - Reusable Vue components
- `pages/` - Route components (auto-generated based on folder structure)
- `assets/` - SCSS, fonts, and static resources
- `plugins/` - JS plugins (Vue plugins, client/server plugins)
- `store/` - Vuex store modules
- `layouts/` - Page layouts (default.vue is the base)