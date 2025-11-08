# Contributing to Let Me Ask AI For You

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/let-me-ask-ai.git
   cd let-me-ask-ai
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Workflow

### Running Locally

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style

- We use **ESLint** for linting
- We use **Prettier** for code formatting
- Run `npm run format` before committing

### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(ui): add dark mode toggle
fix(api): resolve rate limiting issue
docs(readme): update deployment instructions
```

## 🎯 What to Contribute

### Ideas for Contributions

- 🐛 **Bug fixes**: Fix reported issues
- ✨ **New features**: Add new AI platforms, templates, etc.
- 📝 **Documentation**: Improve README, add tutorials
- 🎨 **UI/UX**: Enhance design and user experience
- ⚡ **Performance**: Optimize code and loading times
- 🧪 **Tests**: Add unit and integration tests
- 🌐 **Translations**: Add internationalization support

### Adding a New AI Platform

1. Edit `src/utils/platforms.js`
2. Add your platform configuration:
   ```javascript
   {
     id: 'newai',
     name: 'New AI',
     color: 'bg-gradient-to-r from-red-500 to-pink-600',
     icon: '🔥',
     getUrl: (prompt) => `https://newai.com/?q=${encodeURIComponent(prompt)}`,
   }
   ```
3. Test thoroughly
4. Update documentation

### Adding a New Template

1. Edit `src/utils/templates.js`
2. Add your template:
   ```javascript
   {
     id: 'custom',
     name: 'Custom Template',
     prompt: 'Your template text...',
     category: 'Category',
   }
   ```
3. Test the template
4. Update documentation

## 🧪 Testing

Before submitting a PR:

1. **Test in demo mode**
   ```bash
   # Set VITE_APP_MODE=demo in .env
   npm run dev
   ```

2. **Test in production mode** (if applicable)
   - Set up Supabase
   - Test all CRUD operations
   - Verify rate limiting

3. **Test responsive design**
   - Mobile devices
   - Tablets
   - Desktop

4. **Test browser compatibility**
   - Chrome
   - Firefox
   - Safari
   - Edge

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** thoroughly
3. **Run linter and formatter**
   ```bash
   npm run lint
   npm run format
   ```
4. **Create a pull request** with:
   - Clear title and description
   - Screenshots (for UI changes)
   - Test results
   - Related issue number (if applicable)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested in demo mode
- [ ] Tested in production mode
- [ ] Tested on mobile
- [ ] Tested on desktop

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #123
```

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try the latest version
3. Test in both demo and production modes

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 120]
- Mode: [demo/production]
- Version: [e.g., 1.0.0]

## Screenshots
Add screenshots if applicable

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Any other relevant information
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism
- ✅ Focus on what's best for the community
- ❌ No harassment or trolling
- ❌ No spam or self-promotion
- ❌ No personal attacks

## 📞 Getting Help

- 💬 Open a discussion on GitHub
- 📧 Contact maintainers
- 📖 Check documentation

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the README

Thank you for contributing! 🙏

