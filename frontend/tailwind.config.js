/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      colors: {
        // Architectural color palette
        primary: {
          50: '#F3E9D2',    // Light cream
          100: '#E4DED4',   // Warm off-white
          200: '#C6CDB6',   // Soft sage
          300: '#A8B29E',   // Muted olive
          400: '#8A9686',   // Sage green
          500: '#6C7A6E',   // Forest green
          600: '#2A3625',   // Deep forest
          700: '#1D251A',   // Dark green
          800: '#101410',   // Very dark green
          900: '#0A0D08',   // Almost black green
        },
        accent: {
          50: '#F8F8F8',    // Pure light
          100: '#F0F0F0',   // Light gray
          200: '#E8E8E8',   // Soft gray
          300: '#D0D0D0',   // Medium gray
          400: '#A8A8A8',   // Gray
          500: '#808080',   // Mid gray
          600: '#404040',   // Dark gray
          700: '#202020',   // Very dark gray
          800: '#101010',   // Almost black
          900: '#010101',   // Deep black
        },
        neutral: {
          50: '#FAFAFA',    // White
          100: '#F5F5F5',   // Light neutral
          200: '#EEEEEE',   // Soft neutral
          300: '#E0E0E0',   // Light gray
          400: '#BDBDBD',   // Medium gray
          500: '#9E9E9E',   // Gray
          600: '#757575',   // Dark gray
          700: '#616161',   // Darker gray
          800: '#424242',   // Very dark gray
          900: '#212121',   // Near black
        },
        dark: {
          50: '#1A1A1A',    // Dark surface
          100: '#151515',   // Darker surface
          200: '#101010',   // Very dark
          300: '#0D0D0D',   // Almost black
          400: '#080808',   // Deep black
          500: '#050505',   // Deeper black
          600: '#030303',   // Very deep black
          700: '#020202',   // Near pure black
          800: '#010101',   // Pure black variant
          900: '#000000',   // Pure black
        }
      },      fontFamily: {
        'serif': ['Lora', 'Georgia', 'serif'],
        'sans': ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'Poppins', 'sans-serif'],
        'body': ['Open Sans', 'Inter', 'system-ui', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },      boxShadow: {
        'soft': '0px 2px 6px rgba(0, 0, 0, 0.05)',
        'medium': '0px 4px 12px rgba(0, 0, 0, 0.08)',
        'hard': '0px 8px 24px rgba(0, 0, 0, 0.12)',
        'architectural': '0px 8px 32px rgba(0, 0, 0, 0.06)',
        'architectural-hover': '0px 16px 48px rgba(0, 0, 0, 0.12)',
        'glow': '0px 0px 50px rgba(42, 54, 37, 0.15)',
        'glass': '0 0 15px rgba(255, 255, 255, 0.1)',
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'deep': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'floating': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.37, 0, 0.63, 1)',
        'luxury': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'blob': 'blob 7s infinite',
        'parallax': 'parallax 20s linear infinite',
        'reveal': 'reveal 0.8s luxury forwards',
        'scale-in': 'scaleIn 0.6s luxury forwards',
        'slide-right': 'slideRight 0.8s luxury forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        parallax: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100px)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
